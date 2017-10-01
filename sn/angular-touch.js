/*! RESOURCE: /scripts/angular_1.5.11/angular-touch.js */
(function(window, angular) {
    'use strict';
    var ngTouch = angular.module('ngTouch', []);
    ngTouch.provider('$touch', $TouchProvider);

    function nodeName_(element) {
        return angular.lowercase(element.nodeName || (element[0] && element[0].nodeName));
    }
    $TouchProvider.$inject = ['$provide', '$compileProvider'];

    function $TouchProvider($provide, $compileProvider) {
        var ngClickOverrideEnabled = false;
        var ngClickDirectiveAdded = false;
        this.ngClickOverrideEnabled = function(enabled) {
            if (angular.isDefined(enabled)) {
                if (enabled && !ngClickDirectiveAdded) {
                    ngClickDirectiveAdded = true;
                    ngTouchClickDirectiveFactory.$$moduleName = 'ngTouch';
                    $compileProvider.directive('ngClick', ngTouchClickDirectiveFactory);
                    $provide.decorator('ngClickDirective', ['$delegate', function($delegate) {
                        if (ngClickOverrideEnabled) {
                            $delegate.shift();
                        } else {
                            var i = $delegate.length - 1;
                            while (i >= 0) {
                                if ($delegate[i].$$moduleName === 'ngTouch') {
                                    $delegate.splice(i, 1);
                                    break;
                                }
                                i--;
                            }
                        }
                        return $delegate;
                    }]);
                }
                ngClickOverrideEnabled = enabled;
                return this;
            }
            return ngClickOverrideEnabled;
        };
        this.$get = function() {
            return {
                ngClickOverrideEnabled: function() {
                    return ngClickOverrideEnabled;
                }
            };
        };
    }
    ngTouch.factory('$swipe', [function() {
        var MOVE_BUFFER_RADIUS = 10;
        var POINTER_EVENTS = {
            'mouse': {
                start: 'mousedown',
                move: 'mousemove',
                end: 'mouseup'
            },
            'touch': {
                start: 'touchstart',
                move: 'touchmove',
                end: 'touchend',
                cancel: 'touchcancel'
            },
            'pointer': {
                start: 'pointerdown',
                move: 'pointermove',
                end: 'pointerup',
                cancel: 'pointercancel'
            }
        };

        function getCoordinates(event) {
            var originalEvent = event.originalEvent || event;
            var touches = originalEvent.touches && originalEvent.touches.length ? originalEvent.touches : [originalEvent];
            var e = (originalEvent.changedTouches && originalEvent.changedTouches[0]) || touches[0];
            return {
                x: e.clientX,
                y: e.clientY
            };
        }

        function getEvents(pointerTypes, eventType) {
            var res = [];
            angular.forEach(pointerTypes, function(pointerType) {
                var eventName = POINTER_EVENTS[pointerType][eventType];
                if (eventName) {
                    res.push(eventName);
                }
            });
            return res.join(' ');
        }
        return {
            bind: function(element, eventHandlers, pointerTypes) {
                var totalX, totalY;
                var startCoords;
                var lastPos;
                var active = false;
                pointerTypes = pointerTypes || ['mouse', 'touch', 'pointer'];
                element.on(getEvents(pointerTypes, 'start'), function(event) {
                    startCoords = getCoordinates(event);
                    active = true;
                    totalX = 0;
                    totalY = 0;
                    lastPos = startCoords;
                    if (eventHandlers['start']) {
                        eventHandlers['start'](startCoords, event);
                    }
                });
                var events = getEvents(pointerTypes, 'cancel');
                if (events) {
                    element.on(events, function(event) {
                        active = false;
                        if (eventHandlers['cancel']) {
                            eventHandlers['cancel'](event);
                        }
                    });
                }
                element.on(getEvents(pointerTypes, 'move'), function(event) {
                    if (!active) return;
                    if (!startCoords) return;
                    var coords = getCoordinates(event);
                    totalX += Math.abs(coords.x - lastPos.x);
                    totalY += Math.abs(coords.y - lastPos.y);
                    lastPos = coords;
                    if (totalX < MOVE_BUFFER_RADIUS && totalY < MOVE_BUFFER_RADIUS) {
                        return;
                    }
                    if (totalY > totalX) {
                        active = false;
                        if (eventHandlers['cancel']) {
                            eventHandlers['cancel'](event);
                        }
                        return;
                    } else {
                        event.preventDefault();
                        if (eventHandlers['move']) {
                            eventHandlers['move'](coords, event);
                        }
                    }
                });
                element.on(getEvents(pointerTypes, 'end'), function(event) {
                    if (!active) return;
                    active = false;
                    if (eventHandlers['end']) {
                        eventHandlers['end'](getCoordinates(event), event);
                    }
                });
            }
        };
    }]);
    var ngTouchClickDirectiveFactory = ['$parse', '$timeout', '$rootElement',
        function($parse, $timeout, $rootElement) {
            var TAP_DURATION = 750;
            var MOVE_TOLERANCE = 12;
            var PREVENT_DURATION = 2500;
            var CLICKBUSTER_THRESHOLD = 25;
            var ACTIVE_CLASS_NAME = 'ng-click-active';
            var lastPreventedTime;
            var touchCoordinates;
            var lastLabelClickCoordinates;

            function hit(x1, y1, x2, y2) {
                return Math.abs(x1 - x2) < CLICKBUSTER_THRESHOLD && Math.abs(y1 - y2) < CLICKBUSTER_THRESHOLD;
            }

            function checkAllowableRegions(touchCoordinates, x, y) {
                for (var i = 0; i < touchCoordinates.length; i += 2) {
                    if (hit(touchCoordinates[i], touchCoordinates[i + 1], x, y)) {
                        touchCoordinates.splice(i, i + 2);
                        return true;
                    }
                }
                return false;
            }

            function onClick(event) {
                if (Date.now() - lastPreventedTime > PREVENT_DURATION) {
                    return;
                }
                var touches = event.touches && event.touches.length ? event.touches : [event];
                var x = touches[0].clientX;
                var y = touches[0].clientY;
                if (x < 1 && y < 1) {
                    return;
                }
                if (lastLabelClickCoordinates &&
                    lastLabelClickCoordinates[0] === x && lastLabelClickCoordinates[1] === y) {
                    return;
                }
                if (lastLabelClickCoordinates) {
                    lastLabelClickCoordinates = null;
                }
                if (nodeName_(event.target) === 'label') {
                    lastLabelClickCoordinates = [x, y];
                }
                if (checkAllowableRegions(touchCoordinates, x, y)) {
                    return;
                }
                event.stopPropagation();
                event.preventDefault();
                if (event.target && event.target.blur) {
                    event.target.blur();
                }
            }

            function onTouchStart(event) {
                var touches = event.touches && event.touches.length ? event.touches : [event];
                var x = touches[0].clientX;
                var y = touches[0].clientY;
                touchCoordinates.push(x, y);
                $timeout(function() {
                    for (var i = 0; i < touchCoordinates.length; i += 2) {
                        if (touchCoordinates[i] === x && touchCoordinates[i + 1] === y) {
                            touchCoordinates.splice(i, i + 2);
                            return;
                        }
                    }
                }, PREVENT_DURATION, false);
            }

            function preventGhostClick(x, y) {
                if (!touchCoordinates) {
                    $rootElement[0].addEventListener('click', onClick, true);
                    $rootElement[0].addEventListener('touchstart', onTouchStart, true);
                    touchCoordinates = [];
                }
                lastPreventedTime = Date.now();
                checkAllowableRegions(touchCoordinates, x, y);
            }
            return function(scope, element, attr) {
                var clickHandler = $parse(attr.ngClick),
                    tapping = false,
                    tapElement,
                    startTime,
                    touchStartX,
                    touchStartY;

                function resetState() {
                    tapping = false;
                    element.removeClass(ACTIVE_CLASS_NAME);
                }
                element.on('touchstart', function(event) {
                    tapping = true;
                    tapElement = event.target ? event.target : event.srcElement;
                    if (tapElement.nodeType === 3) {
                        tapElement = tapElement.parentNode;
                    }
                    element.addClass(ACTIVE_CLASS_NAME);
                    startTime = Date.now();
                    var originalEvent = event.originalEvent || event;
                    var touches = originalEvent.touches && originalEvent.touches.length ? originalEvent.touches : [originalEvent];
                    var e = touches[0];
                    touchStartX = e.clientX;
                    touchStartY = e.clientY;
                });
                element.on('touchcancel', function(event) {
                    resetState();
                });
                element.on('touchend', function(event) {
                    var diff = Date.now() - startTime;
                    var originalEvent = event.originalEvent || event;
                    var touches = (originalEvent.changedTouches && originalEvent.changedTouches.length) ?
                        originalEvent.changedTouches :
                        ((originalEvent.touches && originalEvent.touches.length) ? originalEvent.touches : [originalEvent]);
                    var e = touches[0];
                    var x = e.clientX;
                    var y = e.clientY;
                    var dist = Math.sqrt(Math.pow(x - touchStartX, 2) + Math.pow(y - touchStartY, 2));
                    if (tapping && diff < TAP_DURATION && dist < MOVE_TOLERANCE) {
                        preventGhostClick(x, y);
                        if (tapElement) {
                            tapElement.blur();
                        }
                        if (!angular.isDefined(attr.disabled) || attr.disabled === false) {
                            element.triggerHandler('click', [event]);
                        }
                    }
                    resetState();
                });
                element.onclick = function(event) {};
                element.on('click', function(event, touchend) {
                    scope.$apply(function() {
                        clickHandler(scope, {
                            $event: (touchend || event)
                        });
                    });
                });
                element.on('mousedown', function(event) {
                    element.addClass(ACTIVE_CLASS_NAME);
                });
                element.on('mousemove mouseup', function(event) {
                    element.removeClass(ACTIVE_CLASS_NAME);
                });
            };
        }
    ];

    function makeSwipeDirective(directiveName, direction, eventName) {
        ngTouch.directive(directiveName, ['$parse', '$swipe', function($parse, $swipe) {
            var MAX_VERTICAL_DISTANCE = 75;
            var MAX_VERTICAL_RATIO = 0.3;
            var MIN_HORIZONTAL_DISTANCE = 30;
            return function(scope, element, attr) {
                var swipeHandler = $parse(attr[directiveName]);
                var startCoords, valid;

                function validSwipe(coords) {
                    if (!startCoords) return false;
                    var deltaY = Math.abs(coords.y - startCoords.y);
                    var deltaX = (coords.x - startCoords.x) * direction;
                    return valid &&
                        deltaY < MAX_VERTICAL_DISTANCE &&
                        deltaX > 0 &&
                        deltaX > MIN_HORIZONTAL_DISTANCE &&
                        deltaY / deltaX < MAX_VERTICAL_RATIO;
                }
                var pointerTypes = ['touch'];
                if (!angular.isDefined(attr['ngSwipeDisableMouse'])) {
                    pointerTypes.push('mouse');
                }
                $swipe.bind(element, {
                    'start': function(coords, event) {
                        startCoords = coords;
                        valid = true;
                    },
                    'cancel': function(event) {
                        valid = false;
                    },
                    'end': function(coords, event) {
                        if (validSwipe(coords)) {
                            scope.$apply(function() {
                                element.triggerHandler(eventName);
                                swipeHandler(scope, {
                                    $event: event
                                });
                            });
                        }
                    }
                }, pointerTypes);
            };
        }]);
    }
    makeSwipeDirective('ngSwipeLeft', -1, 'swipeleft');
    makeSwipeDirective('ngSwipeRight', 1, 'swiperight');
})(window, window.angular);;