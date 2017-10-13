/*! RESOURCE: /scripts/app.magellan/fast/concourseNavigatorService.js */
angular.module('Magellan').factory('concourseNavigatorService', function(
  $q,
  $window,
  glideUrlBuilder,
  userPreferences
) {
  'use strict';
  var DEBUG_LOG = 'concourseNavigatorService';
  var DEBUG_METRICS = false;
  var ALLOW_SINGLE_CHAR = "" === "true";
  var STATE_INITIALIZING = 'INIT';
  var STATE_ALL = 'ALL';
  var STATE_FILTERING = 'FILTERING';
  var STATE_REMOVING_FILTERING = 'REMOVING';
  var STATE_ADDING_FILTERING = 'ADDING';
  var _state = STATE_INITIALIZING;
  var TYPE_APP = 'APP';
  var TYPE_MODULE = 'MODULE';
  var TYPE_SEPARATOR = 'SEPARATOR';
  var TYPE_PARENT = 'PARENT';
  var APP_PREFIX = 'concourse_application_';
  var MODULE_PREFIX = 'concourse_module_';
  var EVENT_CHANGE_APPS = 'apps';
  var EVENT_CHANGE_VISIBILITY = 'visibility';
  var _eventSubscribers = {};
  var _navigatorApps = [];
  var _parentsById = {};
  var _filterTerm = '';
  var _filteredVisibility = {};
  var IS_ADMIN = $window.NOW.user.roles && $window.NOW.user.roles.split(',').indexOf('admin') !== -1;

  function canEdit() {
    return IS_ADMIN;
  }

  function setApplications(apps) {
    _navigatorApps.length = 0;
    _parentsById = {};
    DEBUG_METRICS && console.time(DEBUG_LOG + ':Create applications');
    _createApplications(apps);
    DEBUG_METRICS && console.timeEnd(DEBUG_LOG + ':Create applications');
    _fireEvent(EVENT_CHANGE_APPS, _navigatorApps);
    if (_state === STATE_FILTERING) {
      _filteredVisibility = {};
      var visibilityDelta = _filterApplications(_filterTerm);
      _fireEvent(EVENT_CHANGE_VISIBILITY, visibilityDelta);
    } else {
      _state = STATE_ALL;
    }
  }

  function setOpenState(type, sysId, isOpen) {
    if (_state !== STATE_ALL) {
      return;
    }
    var key = _getKey(type, sysId);
    _parentsById[key].open = isOpen;
    switch (type) {
      case TYPE_APP:
        userPreferences.setPreference('menu.' + sysId + '.expanded', isOpen ? 'true' : '');
        break;
      case TYPE_PARENT:
        userPreferences.setPreference('collapse.section.' + sysId, isOpen ? '' : 'true');
        break;
    }
  }

  function setFilterTerm(value) {
    if (!angular.isString(value)) {
      value = '';
    }
    if (!ALLOW_SINGLE_CHAR && value.length === 1) {
      return;
    }
    if (_filterTerm === value) {
      return;
    }
    var _isFiltering = value.length > 0;
    if (_isFiltering) {
      if (_state === STATE_ALL) {
        _filteredVisibility = {};
        _state = STATE_ADDING_FILTERING;
      }
    } else {
      if (_state === STATE_FILTERING) {
        _state = STATE_REMOVING_FILTERING;
      }
    }
    DEBUG_METRICS && console.time(DEBUG_LOG + ':Get visibility delta');
    var _visibilityDelta = _isFiltering ? _filterApplications(value) : _unfilterApplications();
    DEBUG_METRICS && console.timeEnd(DEBUG_LOG + ':Get visibility delta');
    _fireEvent(EVENT_CHANGE_VISIBILITY, _visibilityDelta);
    _filterTerm = value;
    if (_isFiltering) {
      _state = STATE_FILTERING;
    } else {
      _state = STATE_ALL;
    }
  }

  function getVisibleModuleCountByType(app) {
    var visibleChildren = 0;
    var visibleSeparators = 0;
    if (app.open && app.modules) {
      app.modules.forEach(function(module) {
        switch (module.type) {
          case TYPE_SEPARATOR:
            visibleSeparators++;
            break;
          default:
            visibleChildren++;
            break;
        }
        if (module.open && module.modules) {
          visibleChildren += module.modules.length;
        }
      });
    }
    return {
      modules: visibleChildren,
      separators: visibleSeparators
    };
  }

  function _getKey(type, sysId) {
    return angular.isDefined(sysId) ? type + '_' + sysId : type.type + '_' + type.id;
  }

  function _createApplications(apps) {
    var newApps = [];
    apps.forEach(function(app) {
      var newApp = _createApplication(app);
      newApps.push(newApp);
      var key = _getKey(newApp);
      _parentsById[key] = newApp;
    });
    _navigatorApps.push.apply(_navigatorApps, newApps);
  }

  function _createApplication(application) {
    var open = application.open;
    if (angular.isUndefined(open)) {
      open = false;
    }
    return {
      id: application.id,
      type: TYPE_APP,
      title: application.title,
      hint: application.hint,
      color: application.color,
      favorited: application.favorited,
      open: open,
      modules: _createModules(application.modules)
    };
  }

  function _createModules(modules) {
    var appModules = [];
    if (!modules || modules.length == 0) {
      return appModules;
    }
    modules.forEach(function(module) {
      var appModule = _createModule(module);
      appModules.push(appModule);
      switch (appModule.type) {
        case TYPE_SEPARATOR:
          if (angular.isUndefined(module.title) || module.title === '') {
            appModules.push.apply(appModules, appModule.modules);
            appModule.modules = [];
          } else {
            appModule.type = TYPE_PARENT;
            var key = _getKey(appModule);
            _parentsById[key] = appModule;
          }
          break;
      }
    });
    return appModules;
  }

  function _createModule(module) {
    var appModule = {
      name: module.name,
      filter: module.filter,
      type: module.type,
      id: module.id,
      title: module.title,
      hint: module.hint,
      viewName: module.viewName,
      uri: _buildModuleURI(module),
      open: module.open,
      windowName: module.windowName || 'gsft_main',
      favorited: module.favorited,
      modules: _createModules(module.modules)
    };
    return appModule;
  }

  function _buildModuleURI(module) {
    if (typeof module === 'undefined') {
      return;
    }
    if (module.type === 'FILTER') {
      module.uri = module.name + "_list.do?sysparm_view=" + module.viewName + "&sysparm_filter_only=true&sysparm_query=" + module.filter;
    }
    var uri = module.cancelable === 'true' ? glideUrlBuilder.getCancelableLink(module.uri) : module.uri;
    if (module.type !== 'LIST') {
      return uri;
    }
    return _appendClearStack(uri);
  }

  function _appendClearStack(link) {
    var nextChar = link.indexOf('?') > -1 ? '&' : '?';
    link += nextChar + "sysparm_clear_stack=true";
    return link;
  }

  function _unfilterApplications() {
    var visibilityDelta = [];
    _navigatorApps.forEach(function(app) {
      _restoreVisibility(app, visibilityDelta);
      _eachChild(app, function(module) {
        _restoreVisibility(module, visibilityDelta);
      });
    });
    return {
      items: visibilityDelta,
      apps: []
    };
  }

  function _filterApplications(filterText) {
    filterText = filterText.toLowerCase();
    var filteredItems = [];
    var visibleApps = [];
    _navigatorApps.forEach(function(app) {
      var showApp = _computeFilteredVisibility(filterText, app, filteredItems);
      if (showApp) {
        visibleApps.push(app);
      }
      _setFilteredVisibility(app, showApp, filteredItems);
    });
    return {
      items: filteredItems,
      apps: visibleApps
    };
  }

  function _computeFilteredVisibility(filterText, parent, filteredItems) {
    var showParent = angular.isDefined(parent.title) && parent.title.toLowerCase().indexOf(filterText) >= 0;
    if (showParent) {
      _eachChild(parent, function(child) {
        _setFilteredVisibility(child, true, filteredItems);
      });
    } else {
      _eachChild(parent, function(child) {
        var showChild = _computeFilteredVisibility(filterText, child, filteredItems);
        _setFilteredVisibility(child, showChild, filteredItems);
        if (showChild) {
          showParent = true;
        }
      }, true);
    }
    return showParent;
  }

  function _eachChild(app, iterator, directChildrenOnly) {
    var modules = app.modules;
    if (!modules || modules.length === 0) {
      return;
    }
    modules.forEach(function(module) {
      iterator(module, app);
      if (!directChildrenOnly) {
        _eachChild(module, iterator);
      }
    });
  }

  function _restoreVisibility(item, delta) {
    delta.push({
      type: item.type,
      id: (item.type === TYPE_APP ? APP_PREFIX : MODULE_PREFIX) + item.id,
      visible: true,
      open: item.open
    });
  }

  function _setFilteredVisibility(item, visible, delta) {
    var key = item.id;
    switch (_state) {
      case STATE_REMOVING_FILTERING:
      case STATE_INITIALIZING:
      case STATE_ALL:
        throw 'Should not be called in this state';
      case STATE_ADDING_FILTERING:
      case STATE_FILTERING:
        if (_filteredVisibility[key] === visible) {
          return;
        }
        _filteredVisibility[key] = visible;
        break;
    }
    delta.push({
      type: item.type,
      id: (item.type === TYPE_APP ? APP_PREFIX : MODULE_PREFIX) + item.id,
      visible: visible,
      open: visible
    });
  }

  function _addEventSubscriber(type, subscriber) {
    if (!_eventSubscribers[type]) {
      _eventSubscribers[type] = [];
    }
    _eventSubscribers[type].push(subscriber);
  }

  function _fireEvent(type, data) {
    var subscribers = _eventSubscribers[type];
    if (subscribers && subscribers.length) {
      subscribers.forEach(function(subscriber) {
        subscriber(data);
      });
    }
  }
  return {
    get DEBUG_METRICS() {
      return DEBUG_METRICS;
    },
    set filterTerm(value) {
      setFilterTerm(value);
    },
    set applications(apps) {
      setApplications(apps);
    },
    get applications() {
      return _navigatorApps;
    },
    getVisibleModuleCountByType: getVisibleModuleCountByType,
    canEdit: canEdit,
    setOpenState: setOpenState,
    onChangeApps: function(subscriber) {
      _addEventSubscriber(EVENT_CHANGE_APPS, subscriber);
      if (_navigatorApps.length) {
        subscriber(_navigatorApps);
      }
    },
    onChangeVisibility: function(subscriber) {
      _addEventSubscriber(EVENT_CHANGE_VISIBILITY, subscriber);
    }
  };
});;