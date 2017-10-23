/*! RESOURCE: /scripts/angular-ui-tinymce.js */
angular.module('ui.tinymce', [])
  .value('uiTinymceConfig', {})
  .directive('uiTinymce', ['$rootScope', '$compile', '$timeout', '$window', '$sce', 'uiTinymceConfig', function($rootScope, $compile, $timeout, $window, $sce, uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    var ID_ATTR = 'ui-tinymce';
    if (uiTinymceConfig.baseUrl) {
      tinymce.baseURL = uiTinymceConfig.baseUrl;
    }
    return {
      require: ['ngModel', '^?form'],
      priority: 599,
      link: function(scope, element, attrs, ctrls) {
        if (!$window.tinymce) {
          return;
        }
        var ngModel = ctrls[0],
          form = ctrls[1] || null;
        var expression, options = {
            debounce: true
          },
          tinyInstance,
          updateView = function(editor) {
            var content = editor.getContent({
              format: options.format
            }).trim();
            content = $sce.trustAsHtml(content);
            ngModel.$setViewValue(content);
            if (!$rootScope.$$phase) {
              scope.$digest();
            }
          };

        function toggleDisable(disabled) {
          if (disabled) {
            ensureInstance();
            if (tinyInstance) {
              tinyInstance.getBody().setAttribute('contenteditable', false);
            }
          } else {
            ensureInstance();
            if (tinyInstance && !tinyInstance.settings.readonly) {
              tinyInstance.getBody().setAttribute('contenteditable', true);
            }
          }
        }
        attrs.$set('id', ID_ATTR + '-' + generatedIds++);
        expression = {};
        angular.extend(expression, scope.$eval(attrs.uiTinymce));
        var debouncedUpdate = (function(debouncedUpdateDelay) {
          var debouncedUpdateTimer;
          return function(ed) {
            $timeout.cancel(debouncedUpdateTimer);
            debouncedUpdateTimer = $timeout(function() {
              return (function(ed) {
                if (ed.isDirty()) {
                  ed.save();
                  updateView(ed);
                }
              })(ed);
            }, debouncedUpdateDelay);
          };
        })(400);
        var setupOptions = {
          setup: function(ed) {
            ed.on('init', function() {
              ngModel.$render();
              ngModel.$setPristine();
              ngModel.$setUntouched();
              if (form) {
                form.$setPristine();
              }
            });
            ed.on('ExecCommand change NodeChange ObjectResized', function() {
              if (!options.debounce) {
                ed.save();
                updateView(ed);
                return;
              }
              debouncedUpdate(ed);
            });
            ed.on('blur', function() {
              element[0].blur();
              ngModel.$setTouched();
              if (!$rootScope.$$phase) {
                scope.$digest();
              }
            });
            ed.on('remove', function() {
              element.remove();
            });
            if (uiTinymceConfig.setup) {
              uiTinymceConfig.setup(ed, {
                updateView: updateView
              });
            }
            if (expression.setup) {
              expression.setup(ed, {
                updateView: updateView
              });
            }
          },
          format: expression.format || 'html',
          selector: '#' + attrs.id
        };
        angular.extend(options, uiTinymceConfig, expression, setupOptions);
        $timeout(function() {
          if (options.baseURL) {
            tinymce.baseURL = options.baseURL;
          }
          tinymce.init(options);
          toggleDisable(scope.$eval(attrs.ngDisabled));
        });
        ngModel.$formatters.unshift(function(modelValue) {
          return modelValue ? $sce.trustAsHtml(modelValue) : '';
        });
        ngModel.$parsers.unshift(function(viewValue) {
          return viewValue ? $sce.getTrustedHtml(viewValue) : '';
        });
        ngModel.$render = function() {
          ensureInstance();
          var viewValue = ngModel.$viewValue ?
            $sce.getTrustedHtml(ngModel.$viewValue) : '';
          if (tinyInstance &&
            tinyInstance.getDoc()
          ) {
            tinyInstance.setContent(viewValue);
            tinyInstance.fire('change');
          }
        };
        attrs.$observe('disabled', toggleDisable);
        scope.$on('$tinymce:refresh', function(e, id) {
          var eid = attrs.id;
          if (angular.isUndefined(id) || id === eid) {
            var parentElement = element.parent();
            var clonedElement = element.clone();
            clonedElement.removeAttr('id');
            clonedElement.removeAttr('style');
            clonedElement.removeAttr('aria-hidden');
            tinymce.execCommand('mceRemoveEditor', false, eid);
            parentElement.append($compile(clonedElement)(scope));
          }
        });
        scope.$on('$destroy', function() {
          ensureInstance();
          if (tinyInstance) {
            tinyInstance.remove();
            tinyInstance = null;
          }
        });

        function ensureInstance() {
          if (!tinyInstance) {
            tinyInstance = tinymce.get(attrs.id);
          }
        }
      }
    };
  }]);;