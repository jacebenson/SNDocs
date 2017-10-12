/*! RESOURCE: /scripts/angular_1.5.3/angular-animate.js */
(function(window, angular, undefined) {
    'use strict';
    var noop = angular.noop;
    var copy = angular.copy;
    var extend = angular.extend;
    var jqLite = angular.element;
    var forEach = angular.forEach;
    var isArray = angular.isArray;
    var isString = angular.isString;
    var isObject = angular.isObject;
    var isUndefined = angular.isUndefined;
    var isDefined = angular.isDefined;
    var isFunction = angular.isFunction;
    var isElement = angular.isElement;
    var ELEMENT_NODE = 1;
    var COMMENT_NODE = 8;
    var ADD_CLASS_SUFFIX = '-add';
    var REMOVE_CLASS_SUFFIX = '-remove';
    var EVENT_CLASS_PREFIX = 'ng-';
    var ACTIVE_CLASS_SUFFIX = '-active';
    var PREPARE_CLASS_SUFFIX = '-prepare';
    var NG_ANIMATE_CLASSNAME = 'ng-animate';
    var NG_ANIMATE_CHILDREN_DATA = '$$ngAnimateChildren';
    var CSS_PREFIX = '',
      TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;
    if (isUndefined(window.ontransitionend) && isDefined(window.onwebkittransitionend)) {
      CSS_PREFIX = '-webkit-';
      TRANSITION_PROP = 'WebkitTransition';
      TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';
    } else {
      TRANSITION_PROP = 'transition';
      TRANSITIONEND_EVENT = 'transitionend';
    }
    if (isUndefined(window.onanimationend) && isDefined(window.onwebkitanimationend)) {
      CSS_PREFIX = '-webkit-';
      ANIMATION_PROP = 'WebkitAnimation';
      ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';
    } else {
      ANIMATION_PROP = 'animation';
      ANIMATIONEND_EVENT = 'animationend';
    }
    var DURATION_KEY = 'Duration';
    var PROPERTY_KEY = 'Property';
    var DELAY_KEY = 'Delay';
    var TIMING_KEY = 'TimingFunction';
    var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';
    var ANIMATION_PLAYSTATE_KEY = 'PlayState';
    var SAFE_FAST_FORWARD_DURATION_VALUE = 9999;
    var ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY;
    var ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY;
    var TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY;
    var TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY;
    var isPromiseLike = function(p) {
      return p && p.then ? true : false;
    };
    var ngMinErr = angular.$$minErr('ng');

    function assertArg(arg, name, reason) {
      if (!arg) {
        throw ngMinErr('areq', "Argument '{0}' is {1}", (name || '?'), (reason || "required"));
      }
      return arg;
    }

    function mergeClasses(a, b) {
      if (!a && !b) return '';
      if (!a) return b;
      if (!b) return a;
      if (isArray(a)) a = a.join(' ');
      if (isArray(b)) b = b.join(' ');
      return a + ' ' + b;
    }

    function packageStyles(options) {
      var styles = {};
      if (options && (options.to || options.from)) {
        styles.to = options.to;
        styles.from = options.from;
      }
      return styles;
    }

    function pendClasses(classes, fix, isPrefix) {
      var className = '';
      classes = isArray(classes) ?
        classes :
        classes && isString(classes) && classes.length ?
        classes.split(/\s+/) :
        [];
      forEach(classes, function(klass, i) {
        if (klass && klass.length > 0) {
          className += (i > 0) ? ' ' : '';
          className += isPrefix ? fix + klass :
            klass + fix;
        }
      });
      return className;
    }

    function removeFromArray(arr, val) {
      var index = arr.indexOf(val);
      if (val >= 0) {
        arr.splice(index, 1);
      }
    }

    function stripCommentsFromElement(element) {
      if (element instanceof jqLite) {
        switch (element.length) {
          case 0:
            return [];
            break;
          case 1:
            if (element[0].nodeType === ELEMENT_NODE) {
              return element;
            }
            break;
          default:
            return jqLite(extractElementNode(element));
            break;
        }
      }
      if (element.nodeType === ELEMENT_NODE) {
        return jqLite(element);
      }
    }

    function extractElementNode(element) {
      if (!element[0]) return element;
      for (var i = 0; i < element.length; i++) {
        var elm = element[i];
        if (elm.nodeType == ELEMENT_NODE) {
          return elm;
        }
      }
    }

    function $$addClass($$jqLite, element, className) {
      forEach(element, function(elm) {
        $$jqLite.addClass(elm, className);
      });
    }

    function $$removeClass($$jqLite, element, className) {
      forEach(element, function(elm) {
        $$jqLite.removeClass(elm, className);
      });
    }

    function applyAnimationClassesFactory($$jqLite) {
      return function(element, options) {
        if (options.addClass) {
          $$addClass($$jqLite, element, options.addClass);
          options.addClass = null;
        }
        if (options.removeClass) {
          $$removeClass($$jqLite, element, options.removeClass);
          options.removeClass = null;
        }
      }
    }

    function prepareAnimationOptions(options) {
      options = options || {};
      if (!options.$$prepared) {
        var domOperation = options.domOperation || noop;
        options.domOperation = function() {
          options.$$domOperationFired = true;
          domOperation();
          domOperation = noop;
        };
        options.$$prepared = true;
      }
      return options;
    }

    function applyAnimationStyles(element, options) {
      applyAnimationFromStyles(element, options);
      applyAnimationToStyles(element, options);
    }

    function applyAnimationFromStyles(element, options) {
      if (options.from) {
        element.css(options.from);
        options.from = null;
      }
    }

    function applyAnimationToStyles(element, options) {
      if (options.to) {
        element.css(options.to);
        options.to = null;
      }
    }

    function mergeAnimationDetails(element, oldAnimation, newAnimation) {
      var target = oldAnimation.options || {};
      var newOptions = newAnimation.options || {};
      var toAdd = (target.addClass || '') + ' ' + (newOptions.addClass || '');
      var toRemove = (target.removeClass || '') + ' ' + (newOptions.removeClass || '');
      var classes = resolveElementClasses(element.attr('class'), toAdd, toRemove);
      if (newOptions.preparationClasses) {
        target.preparationClasses = concatWithSpace(newOptions.preparationClasses, target.preparationClasses);
        delete newOptions.preparationClasses;
      }
      var realDomOperation = target.domOperation !== noop ? target.domOperation : null;
      extend(target, newOptions);
      if (realDomOperation) {
        target.domOperation = realDomOperation;
      }
      if (classes.addClass) {
        target.addClass = classes.addClass;
      } else {
        target.addClass = null;
      }
      if (classes.removeClass) {
        target.removeClass = classes.removeClass;
      } else {
        target.removeClass = null;
      }
      oldAnimation.addClass = target.addClass;
      oldAnimation.removeClass = target.removeClass;
      return target;
    }

    function resolveElementClasses(existing, toAdd, toRemove) {
      var ADD_CLASS = 1;
      var REMOVE_CLASS = -1;
      var flags = {};
      existing = splitClassesToLookup(existing);
      toAdd = splitClassesToLookup(toAdd);
      forEach(toAdd, function(value, key) {
        flags[key] = ADD_CLASS;
      });
      toRemove = splitClassesToLookup(toRemove);
      forEach(toRemove, function(value, key) {
        flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS;
      });
      var classes = {
        addClass: '',
        removeClass: ''
      };
      forEach(flags, function(val, klass) {
        var prop, allow;
        if (val === ADD_CLASS) {
          prop = 'addClass';
          allow = !existing[klass];
        } else if (val === REMOVE_CLASS) {
          prop = 'removeClass';
          allow = existing[klass];
        }
        if (allow) {
          if (classes[prop].length) {
            classes[prop] += ' ';
          }
          classes[prop] += klass;
        }
      });

      function splitClassesToLookup(classes) {
        if (isString(classes)) {
          classes = classes.split(' ');
        }
        var obj = {};
        forEach(classes, function(klass) {
          if (klass.length) {
            obj[klass] = true;
          }
        });
        return obj;
      }
      return classes;
    }

    function getDomNode(element) {
      return (element instanceof angular.element) ? element[0] : element;
    }

    function applyGeneratedPreparationClasses(element, event, options) {
      var classes = '';
      if (event) {
        classes = pendClasses(event, EVENT_CLASS_PREFIX, true);
      }
      if (options.addClass) {
        classes = concatWithSpace(classes, pendClasses(options.addClass, ADD_CLASS_SUFFIX));
      }
      if (options.removeClass) {
        classes = concatWithSpace(classes, pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX));
      }
      if (classes.length) {
        options.preparationClasses = classes;
        element.addClass(classes);
      }
    }

    function clearGeneratedClasses(element, options) {
      if (options.preparationClasses) {
        element.removeClass(options.preparationClasses);
        options.preparationClasses = null;
      }
      if (options.activeClasses) {
        element.removeClass(options.activeClasses);
        options.activeClasses = null;
      }
    }

    function blockTransitions(node, duration) {
      var value = duration ? '-' + duration + 's' : '';
      applyInlineStyle(node, [TRANSITION_DELAY_PROP, value]);
      return [TRANSITION_DELAY_PROP, value];
    }

    function blockKeyframeAnimations(node, applyBlock) {
      var value = applyBlock ? 'paused' : '';
      var key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;
      applyInlineStyle(node, [key, value]);
      return [key, value];
    }

    function applyInlineStyle(node, styleTuple) {
      var prop = styleTuple[0];
      var value = styleTuple[1];
      node.style[prop] = value;
    }

    function concatWithSpace(a, b) {
      if (!a) return b;
      if (!b) return a;
      return a + ' ' + b;
    }
    var $$rAFSchedulerFactory = ['$$rAF', function($$rAF) {
      var queue, cancelFn;

      function scheduler(tasks) {
        queue = queue.concat(tasks);
        nextTick();
      }
      queue = scheduler.queue = [];
      scheduler.waitUntilQuiet = function(fn) {
        if (cancelFn) cancelFn();
        cancelFn = $$rAF(function() {
          cancelFn = null;
          fn();
          nextTick();
        });
      };
      return scheduler;

      function nextTick() {
        if (!queue.length) return;
        var items = queue.shift();
        for (var i = 0; i < items.length; i++) {
          items[i]();
        }
        if (!cancelFn) {
          $$rAF(function() {
            if (!cancelFn) nextTick();
          });
        }
      }
    }];
    var $$AnimateChildrenDirective = ['$interpolate', function($interpolate) {
      return {
        link: function(scope, element, attrs) {
          var val = attrs.ngAnimateChildren;
          if (angular.isString(val) && val.length === 0) {
            element.data(NG_ANIMATE_CHILDREN_DATA, true);
          } else {
            setData($interpolate(val)(scope));
            attrs.$observe('ngAnimateChildren', setData);
          }

          function setData(value) {
            value = value === 'on' || value === 'true';
            element.data(NG_ANIMATE_CHILDREN_DATA, value);
          }
        }
      };
    }];
    var ANIMATE_TIMER_KEY = '$$animateCss';
    var ONE_SECOND = 1000;
    var BASE_TEN = 10;
    var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;
    var CLOSING_TIME_BUFFER = 1.5;
    var DETECT_CSS_PROPERTIES = {
      transitionDuration: TRANSITION_DURATION_PROP,
      transitionDelay: TRANSITION_DELAY_PROP,
      transitionProperty: TRANSITION_PROP + PROPERTY_KEY,
      animationDuration: ANIMATION_DURATION_PROP,
      animationDelay: ANIMATION_DELAY_PROP,
      animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY
    };
    var DETECT_STAGGER_CSS_PROPERTIES = {
      transitionDuration: TRANSITION_DURATION_PROP,
      transitionDelay: TRANSITION_DELAY_PROP,
      animationDuration: ANIMATION_DURATION_PROP,
      animationDelay: ANIMATION_DELAY_PROP
    };

    function getCssKeyframeDurationStyle(duration) {
      return [ANIMATION_DURATION_PROP, duration + 's'];
    }

    function getCssDelayStyle(delay, isKeyframeAnimation) {
      var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;
      return [prop, delay + 's'];
    }

    function computeCssStyles($window, element, properties) {
      var styles = Object.create(null);
      var detectedStyles = $window.getComputedStyle(element) || {};
      forEach(properties, function(formalStyleName, actualStyleName) {
        var val = detectedStyles[formalStyleName];
        if (val) {
          var c = val.charAt(0);
          if (c === '-' || c === '+' || c >= 0) {
            val = parseMaxTime(val);
          }
          if (val === 0) {
            val = null;
          }
          styles[actualStyleName] = val;
        }
      });
      return styles;
    }

    function parseMaxTime(str) {
      var maxValue = 0;
      var values = str.split(/\s*,\s*/);
      forEach(values, function(value) {
        if (value.charAt(value.length - 1) == 's') {
          value = value.substring(0, value.length - 1);
        }
        value = parseFloat(value) || 0;
        maxValue = maxValue ? Math.max(value, maxValue) : value;
      });
      return maxValue;
    }

    function truthyTimingValue(val) {
      return val === 0 || val != null;
    }

    function getCssTransitionDurationStyle(duration, applyOnlyDuration) {
      var style = TRANSITION_PROP;
      var value = duration + 's';
      if (applyOnlyDuration) {
        style += DURATION_KEY;
      } else {
        value += ' linear all';
      }
      return [style, value];
    }

    function createLocalCacheLookup() {
      var cache = Object.create(null);
      return {
        flush: function() {
          cache = Object.create(null);
        },
        count: function(key) {
          var entry = cache[key];
          return entry ? entry.total : 0;
        },
        get: function(key) {
          var entry = cache[key];
          return entry && entry.value;
        },
        put: function(key, value) {
          if (!cache[key]) {
            cache[key] = {
              total: 1,
              value: value
            };
          } else {
            cache[key].total++;
          }
        }
      };
    }

    function registerRestorableStyles(backup, node, properties) {
      forEach(properties, function(prop) {
        backup[prop] = isDefined(backup[prop]) ?
          backup[prop] :
          node.style.getPropertyValue(prop);
      });
    }
    var $AnimateCssProvider = ['$animateProvider', function($animateProvider) {
      var gcsLookup = createLocalCacheLookup();
      var gcsStaggerLookup = createLocalCacheLookup();
      this.$get = ['$window', '$$jqLite', '$$AnimateRunner', '$timeout',
        '$$forceReflow', '$sniffer', '$$rAFScheduler', '$$animateQueue',
        function($window, $$jqLite, $$AnimateRunner, $timeout,
          $$forceReflow, $sniffer, $$rAFScheduler, $$animateQueue) {
          var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
          var parentCounter = 0;

          function gcsHashFn(node, extraClasses) {
            var KEY = "$$ngAnimateParentKey";
            var parentNode = node.parentNode;
            var parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);
            return parentID + '-' + node.getAttribute('class') + '-' + extraClasses;
          }

          function computeCachedCssStyles(node, className, cacheKey, properties) {
            var timings = gcsLookup.get(cacheKey);
            if (!timings) {
              timings = computeCssStyles($window, node, properties);
              if (timings.animationIterationCount === 'infinite') {
                timings.animationIterationCount = 1;
              }
            }
            gcsLookup.put(cacheKey, timings);
            return timings;
          }

          function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {
            var stagger;
            if (gcsLookup.count(cacheKey) > 0) {
              stagger = gcsStaggerLookup.get(cacheKey);
              if (!stagger) {
                var staggerClassName = pendClasses(className, '-stagger');
                $$jqLite.addClass(node, staggerClassName);
                stagger = computeCssStyles($window, node, properties);
                stagger.animationDuration = Math.max(stagger.animationDuration, 0);
                stagger.transitionDuration = Math.max(stagger.transitionDuration, 0);
                $$jqLite.removeClass(node, staggerClassName);
                gcsStaggerLookup.put(cacheKey, stagger);
              }
            }
            return stagger || {};
          }
          var cancelLastRAFRequest;
          var rafWaitQueue = [];

          function waitUntilQuiet(callback) {
            rafWaitQueue.push(callback);
            $$rAFScheduler.waitUntilQuiet(function() {
              gcsLookup.flush();
              gcsStaggerLookup.flush();
              var pageWidth = $$forceReflow();
              for (var i = 0; i < rafWaitQueue.length; i++) {
                rafWaitQueue[i](pageWidth);
              }
              rafWaitQueue.length = 0;
            });
          }

          function computeTimings(node, className, cacheKey) {
            var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES);
            var aD = timings.animationDelay;
            var tD = timings.transitionDelay;
            timings.maxDelay = aD && tD ?
              Math.max(aD, tD) :
              (aD || tD);
            timings.maxDuration = Math.max(
              timings.animationDuration * timings.animationIterationCount,
              timings.transitionDuration);
            return timings;
          }
          return function init(element, initialOptions) {
            var options = initialOptions || {};
            if (!options.$$prepared) {
              options = prepareAnimationOptions(copy(options));
            }
            var restoreStyles = {};
            var node = getDomNode(element);
            if (!node ||
              !node.parentNode ||
              !$$animateQueue.enabled()) {
              return closeAndReturnNoopAnimator();
            }
            var temporaryStyles = [];
            var classes = element.attr('class');
            var styles = packageStyles(options);
            var animationClosed;
            var animationPaused;
            var animationCompleted;
            var runner;
            var runnerHost;
            var maxDelay;
            var maxDelayTime;
            var maxDuration;
            var maxDurationTime;
            var startTime;
            var events = [];
            if (options.duration === 0 || (!$sniffer.animations && !$sniffer.transitions)) {
              return closeAndReturnNoopAnimator();
            }
            var method = options.event && isArray(options.event) ?
              options.event.join(' ') :
              options.event;
            var isStructural = method && options.structural;
            var structuralClassName = '';
            var addRemoveClassName = '';
            if (isStructural) {
              structuralClassName = pendClasses(method, EVENT_CLASS_PREFIX, true);
            } else if (method) {
              structuralClassName = method;
            }
            if (options.addClass) {
              addRemoveClassName += pendClasses(options.addClass, ADD_CLASS_SUFFIX);
            }
            if (options.removeClass) {
              if (addRemoveClassName.length) {
                addRemoveClassName += ' ';
              }
              addRemoveClassName += pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX);
            }
            if (options.applyClassesEarly && addRemoveClassName.length) {
              applyAnimationClasses(element, options);
            }
            var preparationClasses = [structuralClassName, addRemoveClassName].join(' ').trim();
            var fullClassName = classes + ' ' + preparationClasses;
            var activeClasses = pendClasses(preparationClasses, ACTIVE_CLASS_SUFFIX);
            var hasToStyles = styles.to && Object.keys(styles.to).length > 0;
            var containsKeyframeAnimation = (options.keyframeStyle || '').length > 0;
            if (!containsKeyframeAnimation &&
              !hasToStyles &&
              !preparationClasses) {
              return closeAndReturnNoopAnimator();
            }
            var cacheKey, stagger;
            if (options.stagger > 0) {
              var staggerVal = parseFloat(options.stagger);
              stagger = {
                transitionDelay: staggerVal,
                animationDelay: staggerVal,
                transitionDuration: 0,
                animationDuration: 0
              };
            } else {
              cacheKey = gcsHashFn(node, fullClassName);
              stagger = computeCachedCssStaggerStyles(node, preparationClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);
            }
            if (!options.$$skipPreparationClasses) {
              $$jqLite.addClass(element, preparationClasses);
            }
            var applyOnlyDuration;
            if (options.transitionStyle) {
              var transitionStyle = [TRANSITION_PROP, options.transitionStyle];
              applyInlineStyle(node, transitionStyle);
              temporaryStyles.push(transitionStyle);
            }
            if (options.duration >= 0) {
              applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;
              var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);
              applyInlineStyle(node, durationStyle);
              temporaryStyles.push(durationStyle);
            }
            if (options.keyframeStyle) {
              var keyframeStyle = [ANIMATION_PROP, options.keyframeStyle];
              applyInlineStyle(node, keyframeStyle);
              temporaryStyles.push(keyframeStyle);
            }
            var itemIndex = stagger ?
              options.staggerIndex >= 0 ?
              options.staggerIndex :
              gcsLookup.count(cacheKey) :
              0;
            var isFirst = itemIndex === 0;
            if (isFirst && !options.skipBlocking) {
              blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);
            }
            var timings = computeTimings(node, fullClassName, cacheKey);
            var relativeDelay = timings.maxDelay;
            maxDelay = Math.max(relativeDelay, 0);
            maxDuration = timings.maxDuration;
            var flags = {};
            flags.hasTransitions = timings.transitionDuration > 0;
            flags.hasAnimations = timings.animationDuration > 0;
            flags.hasTransitionAll = flags.hasTransitions && timings.transitionProperty == 'all';
            flags.applyTransitionDuration = hasToStyles && (
              (flags.hasTransitions && !flags.hasTransitionAll) ||
              (flags.hasAnimations && !flags.hasTransitions));
            flags.applyAnimationDuration = options.duration && flags.hasAnimations;
            flags.applyTransitionDelay = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions);
            flags.applyAnimationDelay = truthyTimingValue(options.delay) && flags.hasAnimations;
            flags.recalculateTimingStyles = addRemoveClassName.length > 0;
            if (flags.applyTransitionDuration || flags.applyAnimationDuration) {
              maxDuration = options.duration ? parseFloat(options.duration) : maxDuration;
              if (flags.applyTransitionDuration) {
                flags.hasTransitions = true;
                timings.transitionDuration = maxDuration;
                applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0;
                temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration));
              }
              if (flags.applyAnimationDuration) {
                flags.hasAnimations = true;
                timings.animationDuration = maxDuration;
                temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration));
              }
            }
            if (maxDuration === 0 && !flags.recalculateTimingStyles) {
              return closeAndReturnNoopAnimator();
            }
            if (options.delay != null) {
              var delayStyle;
              if (typeof options.delay !== "boolean") {
                delayStyle = parseFloat(options.delay);
                maxDelay = Math.max(delayStyle, 0);
              }
              if (flags.applyTransitionDelay) {
                temporaryStyles.push(getCssDelayStyle(delayStyle));
              }
              if (flags.applyAnimationDelay) {
                temporaryStyles.push(getCssDelayStyle(delayStyle, true));
              }
            }
            if (options.duration == null && timings.transitionDuration > 0) {
              flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst;
            }
            maxDelayTime = maxDelay * ONE_SECOND;
            maxDurationTime = maxDuration * ONE_SECOND;
            if (!options.skipBlocking) {
              flags.blockTransition = timings.transitionDuration > 0;
              flags.blockKeyframeAnimation = timings.animationDuration > 0 &&
                stagger.animationDelay > 0 &&
                stagger.animationDuration === 0;
            }
            if (options.from) {
              if (options.cleanupStyles) {
                registerRestorableStyles(restoreStyles, node, Object.keys(options.from));
              }
              applyAnimationFromStyles(element, options);
            }
            if (flags.blockTransition || flags.blockKeyframeAnimation) {
              applyBlocking(maxDuration);
            } else if (!options.skipBlocking) {
              blockTransitions(node, false);
            }
            return {
              $$willAnimate: true,
              end: endFn,
              start: function() {
                if (animationClosed) return;
                runnerHost = {
                  end: endFn,
                  cancel: cancelFn,
                  resume: null,
                  pause: null
                };
                runner = new $$AnimateRunner(runnerHost);
                waitUntilQuiet(start);
                return runner;
              }
            };

            function endFn() {
              close();
            }

            function cancelFn() {
              close(true);
            }

            function close(rejected) {
              if (animationClosed || (animationCompleted && animationPaused)) return;
              animationClosed = true;
              animationPaused = false;
              if (!options.$$skipPreparationClasses) {
                $$jqLite.removeClass(element, preparationClasses);
              }
              $$jqLite.removeClass(element, activeClasses);
              blockKeyframeAnimations(node, false);
              blockTransitions(node, false);
              forEach(temporaryStyles, function(entry) {
                node.style[entry[0]] = '';
              });
              applyAnimationClasses(element, options);
              applyAnimationStyles(element, options);
              if (Object.keys(restoreStyles).length) {
                forEach(restoreStyles, function(value, prop) {
                  value ? node.style.setProperty(prop, value) :
                    node.style.removeProperty(prop);
                });
              }
              if (options.onDone) {
                options.onDone();
              }
              if (events && events.length) {
                element.off(events.join(' '), onAnimationProgress);
              }
              var animationTimerData = element.data(ANIMATE_TIMER_KEY);
              if (animationTimerData) {
                $timeout.cancel(animationTimerData[0].timer);
                element.removeData(ANIMATE_TIMER_KEY);
              }
              if (runner) {
                runner.complete(!rejected);
              }
            }

            function applyBlocking(duration) {
              if (flags.blockTransition) {
                blockTransitions(node, duration);
              }
              if (flags.blockKeyframeAnimation) {
                blockKeyframeAnimations(node, !!duration);
              }
            }

            function closeAndReturnNoopAnimator() {
              runner = new $$AnimateRunner({
                end: endFn,
                cancel: cancelFn
              });
              waitUntilQuiet(noop);
              close();
              return {
                $$willAnimate: false,
                start: function() {
                  return runner;
                },
                end: endFn
              };
            }

            function onAnimationProgress(event) {
              event.stopPropagation();
              var ev = event.originalEvent || event;
              var timeStamp = ev.$manualTimeStamp || Date.now();
              var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));
              if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {
                animationCompleted = true;
                close();
              }
            }

            function start() {
              if (animationClosed) return;
              if (!node.parentNode) {
                close();
                return;
              }
              var playPause = function(playAnimation) {
                if (!animationCompleted) {
                  animationPaused = !playAnimation;
                  if (timings.animationDuration) {
                    var value = blockKeyframeAnimations(node, animationPaused);
                    animationPaused
                      ?
                      temporaryStyles.push(value) :
                      removeFromArray(temporaryStyles, value);
                  }
                } else if (animationPaused && playAnimation) {
                  animationPaused = false;
                  close();
                }
              };
              var maxStagger = itemIndex > 0 &&
                ((timings.transitionDuration && stagger.transitionDuration === 0) ||
                  (timings.animationDuration && stagger.animationDuration === 0)) &&
                Math.max(stagger.animationDelay, stagger.transitionDelay);
              if (maxStagger) {
                $timeout(triggerAnimationStart,
                  Math.floor(maxStagger * itemIndex * ONE_SECOND),
                  false);
              } else {
                triggerAnimationStart();
              }
              runnerHost.resume = function() {
                playPause(true);
              };
              runnerHost.pause = function() {
                playPause(false);
              };

              function triggerAnimationStart() {
                if (animationClosed) return;
                applyBlocking(false);
                forEach(temporaryStyles, function(entry) {
                  var key = entry[0];
                  var value = entry[1];
                  node.style[key] = value;
                });
                applyAnimationClasses(element, options);
                $$jqLite.addClass(element, activeClasses);
                if (flags.recalculateTimingStyles) {
                  fullClassName = node.className + ' ' + preparationClasses;
                  cacheKey = gcsHashFn(node, fullClassName);
                  timings = computeTimings(node, fullClassName, cacheKey);
                  relativeDelay = timings.maxDelay;
                  maxDelay = Math.max(relativeDelay, 0);
                  maxDuration = timings.maxDuration;
                  if (maxDuration === 0) {
                    close();
                    return;
                  }
                  flags.hasTransitions = timings.transitionDuration > 0;
                  flags.hasAnimations = timings.animationDuration > 0;
                }
                if (flags.applyAnimationDelay) {
                  relativeDelay = typeof options.delay !== "boolean" && truthyTimingValue(options.delay) ?
                    parseFloat(options.delay) :
                    relativeDelay;
                  maxDelay = Math.max(relativeDelay, 0);
                  timings.animationDelay = relativeDelay;
                  delayStyle = getCssDelayStyle(relativeDelay, true);
                  temporaryStyles.push(delayStyle);
                  node.style[delayStyle[0]] = delayStyle[1];
                }
                maxDelayTime = maxDelay * ONE_SECOND;
                maxDurationTime = maxDuration * ONE_SECOND;
                if (options.easing) {
                  var easeProp, easeVal = options.easing;
                  if (flags.hasTransitions) {
                    easeProp = TRANSITION_PROP + TIMING_KEY;
                    temporaryStyles.push([easeProp, easeVal]);
                    node.style[easeProp] = easeVal;
                  }
                  if (flags.hasAnimations) {
                    easeProp = ANIMATION_PROP + TIMING_KEY;
                    temporaryStyles.push([easeProp, easeVal]);
                    node.style[easeProp] = easeVal;
                  }
                }
                if (timings.transitionDuration) {
                  events.push(TRANSITIONEND_EVENT);
                }
                if (timings.animationDuration) {
                  events.push(ANIMATIONEND_EVENT);
                }
                startTime = Date.now();
                var timerTime = maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime;
                var endTime = startTime + timerTime;
                var animationsData = element.data(ANIMATE_TIMER_KEY) || [];
                var setupFallbackTimer = true;
                if (animationsData.length) {
                  var currentTimerData = animationsData[0];
                  setupFallbackTimer = endTime > currentTimerData.expectedEndTime;
                  if (setupFallbackTimer) {
                    $timeout.cancel(currentTimerData.timer);
                  } else {
                    animationsData.push(close);
                  }
                }
                if (setupFallbackTimer) {
                  var timer = $timeout(onAnimationExpired, timerTime, false);
                  animationsData[0] = {
                    timer: timer,
                    expectedEndTime: endTime
                  };
                  animationsData.push(close);
                  element.data(ANIMATE_TIMER_KEY, animationsData);
                }
                if (events.length) {
                  element.on(events.join(' '), onAnimationProgress);
                }
                if (options.to) {
                  if (options.cleanupStyles) {
                    registerRestorableStyles(restoreStyles, node, Object.keys(options.to));
                  }
                  applyAnimationToStyles(element, options);
                }
              }

              function onAnimationExpired() {
                var animationsData = element.data(ANIMATE_TIMER_KEY);
                if (animationsData) {
                  for (var i = 1; i < animationsData.length; i++) {
                    animationsData[i]();
                  }
                  element.removeData(ANIMATE_TIMER_KEY);
                }
              }
            }
          };
        }
      ];
    }];
    var $$AnimateCssDriverProvider = ['$$animationProvider', function($$animationProvider) {
      $$animationProvider.drivers.push('$$animateCssDriver');
      var NG_ANIMATE_SHIM_CLASS_NAME = 'ng-animate-shim';
      var NG_ANIMATE_ANCHOR_CLASS_NAME = 'ng-anchor';
      var NG_OUT_ANCHOR_CLASS_NAME = 'ng-anchor-out';
      var NG_IN_ANCHOR_CLASS_NAME = 'ng-anchor-in';

      function isDocumentFragment(node) {
        return node.parentNode && node.parentNode.nodeType === 11;
      }
      this.$get = ['$animateCss', '$rootScope', '$$AnimateRunner', '$rootElement', '$sniffer', '$$jqLite', '$document',
        function($animateCss, $rootScope, $$AnimateRunner, $rootElement, $sniffer, $$jqLite, $document) {
          if (!$sniffer.animations && !$sniffer.transitions) return noop;
          var bodyNode = $document[0].body;
          var rootNode = getDomNode($rootElement);
          var rootBodyElement = jqLite(
            isDocumentFragment(rootNode) || bodyNode.contains(rootNode) ? rootNode : bodyNode
          );
          var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
          return function initDriverFn(animationDetails) {
            return animationDetails.from && animationDetails.to ?
              prepareFromToAnchorAnimation(animationDetails.from,
                animationDetails.to,
                animationDetails.classes,
                animationDetails.anchors) :
              prepareRegularAnimation(animationDetails);
          };

          function filterCssClasses(classes) {
            return classes.replace(/\bng-\S+\b/g, '');
          }

          function getUniqueValues(a, b) {
            if (isString(a)) a = a.split(' ');
            if (isString(b)) b = b.split(' ');
            return a.filter(function(val) {
              return b.indexOf(val) === -1;
            }).join(' ');
          }

          function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {
            var clone = jqLite(getDomNode(outAnchor).cloneNode(true));
            var startingClasses = filterCssClasses(getClassVal(clone));
            outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);
            inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);
            clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME);
            rootBodyElement.append(clone);
            var animatorIn, animatorOut = prepareOutAnimation();
            if (!animatorOut) {
              animatorIn = prepareInAnimation();
              if (!animatorIn) {
                return end();
              }
            }
            var startingAnimator = animatorOut || animatorIn;
            return {
              start: function() {
                var runner;
                var currentAnimation = startingAnimator.start();
                currentAnimation.done(function() {
                  currentAnimation = null;
                  if (!animatorIn) {
                    animatorIn = prepareInAnimation();
                    if (animatorIn) {
                      currentAnimation = animatorIn.start();
                      currentAnimation.done(function() {
                        currentAnimation = null;
                        end();
                        runner.complete();
                      });
                      return currentAnimation;
                    }
                  }
                  end();
                  runner.complete();
                });
                runner = new $$AnimateRunner({
                  end: endFn,
                  cancel: endFn
                });
                return runner;

                function endFn() {
                  if (currentAnimation) {
                    currentAnimation.end();
                  }
                }
              }
            };

            function calculateAnchorStyles(anchor) {
              var styles = {};
              var coords = getDomNode(anchor).getBoundingClientRect();
              forEach(['width', 'height', 'top', 'left'], function(key) {
                var value = coords[key];
                switch (key) {
                  case 'top':
                    value += bodyNode.scrollTop;
                    break;
                  case 'left':
                    value += bodyNode.scrollLeft;
                    break;
                }
                styles[key] = Math.floor(value) + 'px';
              });
              return styles;
            }

            function prepareOutAnimation() {
              var animator = $animateCss(clone, {
                addClass: NG_OUT_ANCHOR_CLASS_NAME,
                delay: true,
                from: calculateAnchorStyles(outAnchor)
              });
              return animator.$$willAnimate ? animator : null;
            }

            function getClassVal(element) {
              return element.attr('class') || '';
            }

            function prepareInAnimation() {
              var endingClasses = filterCssClasses(getClassVal(inAnchor));
              var toAdd = getUniqueValues(endingClasses, startingClasses);
              var toRemove = getUniqueValues(startingClasses, endingClasses);
              var animator = $animateCss(clone, {
                to: calculateAnchorStyles(inAnchor),
                addClass: NG_IN_ANCHOR_CLASS_NAME + ' ' + toAdd,
                removeClass: NG_OUT_ANCHOR_CLASS_NAME + ' ' + toRemove,
                delay: true
              });
              return animator.$$willAnimate ? animator : null;
            }

            function end() {
              clone.remove();
              outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
              inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
            }
          }

          function prepareFromToAnchorAnimation(from, to, classes, anchors) {
            var fromAnimation = prepareRegularAnimation(from, noop);
            var toAnimation = prepareRegularAnimation(to, noop);
            var anchorAnimations = [];
            forEach(anchors, function(anchor) {
              var outElement = anchor['out'];
              var inElement = anchor['in'];
              var animator = prepareAnchoredAnimation(classes, outElement, inElement);
              if (animator) {
                anchorAnimations.push(animator);
              }
            });
            if (!fromAnimation && !toAnimation && anchorAnimations.length === 0) return;
            return {
              start: function() {
                var animationRunners = [];
                if (fromAnimation) {
                  animationRunners.push(fromAnimation.start());
                }
                if (toAnimation) {
                  animationRunners.push(toAnimation.start());
                }
                forEach(anchorAnimations, function(animation) {
                  animationRunners.push(animation.start());
                });
                var runner = new $$AnimateRunner({
                  end: endFn,
                  cancel: endFn
                });
                $$AnimateRunner.all(animationRunners, function(status) {
                  runner.complete(status);
                });
                return runner;

                function endFn() {
                  forEach(animationRunners, function(runner) {
                    runner.end();
                  });
                }
              }
            };
          }

          function prepareRegularAnimation(animationDetails) {
            var element = animationDetails.element;
            var options = animationDetails.options || {};
            if (animationDetails.structural) {
              options.event = animationDetails.event;
              options.structural = true;
              options.applyClassesEarly = true;
              if (animationDetails.event === 'leave') {
                options.onDone = options.domOperation;
              }
            }
            if (options.preparationClasses) {
              options.event = concatWithSpace(options.event, options.preparationClasses);
            }
            var animator = $animateCss(element, options);
            return animator.$$willAnimate ? animator : null;
          }
        }
      ];
    }];
    var $$AnimateJsProvider = ['$animateProvider', function($animateProvider) {
          this.$get = ['$injector', '$$AnimateRunner', '$$jqLite',
              function($injector, $$AnimateRunner, $$jqLite) {
                var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
                return function(element, event, classes, options) {
                    var animationClosed = false;
                    if (arguments.length === 3 && isObject(classes)) {
                      options = classes;
                      classes = null;
                    }
                    options = prepareAnimationOptions(options);
                    if (!classes) {
                      classes = element.attr('class') || '';
                      if (options.addClass) {
                        classes += ' ' + options.addClass;
                      }
                      if (options.removeClass) {
                        classes += ' ' + options.removeClass;
                      }
                    }
                    var classesToAdd = options.addClass;
                    var classesToRemove = options.removeClass;
                    var animations = lookupAnimations(classes);
                    var before, after;
                    if (animations.length) {
                      var afterFn, beforeFn;
                      if (event == 'leave') {
                        beforeFn = 'leave';
                        afterFn = 'afterLeave';
                      } else {
                        beforeFn = 'before' + event.charAt(0).toUpperCase() + event.substr(1);
                        afterFn = event;
                      }
                      if (event !== 'enter' && event !== 'move') {
                        before = packageAnimations(element, event, options, animations, beforeFn);
                      }
                      after = packageAnimations(element, event, options, animations, afterFn);
                    }
                    if (!before && !after) return;

                    function applyOptions() {
                      options.domOperation();
                      applyAnimationClasses(element, options);
                    }

                    function close() {
                      animationClosed = true;
                      applyOptions();
                      applyAnimationStyles(element, options);
                    }
                    var runner;
                    return {
                      $$willAnimate: true,
                      end: function() {
                        if (runner) {
                          runner.end();
                        } else {
                          close();
                          runner = new $$AnimateRunner();
                          runner.complete(true);
                        }
                        return runner;
                      },
                      start: function() {
                          if (runner) {
                            return runner;
                          }
                          runner = new $$AnimateRunner();
                          var closeActiveAnimations;
                          var chain = [];
                          if (before) {
                            chain.push(function(fn) {
                              closeActiveAnimations = before(fn);
                            });
                          }
                          if (chain.length) {
                            chain.push(function(fn) {
                              applyOptions();
                              fn(true);
                            });
                          } else {
                            applyOptions();
                          }
                          if (after) {
                            chain.push(function(fn) {
                              closeActiveAnimations = after(fn);
                            });
                          }
                          runner.set