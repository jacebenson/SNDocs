/*! RESOURCE: /scripts/angular_1.5.11/angular-cookies.js */
(function(window, angular) {
    'use strict';
    angular.module('ngCookies', ['ng']).
    provider('$cookies', [function $CookiesProvider() {
        var defaults = this.defaults = {};

        function calcOptions(options) {
            return options ? angular.extend({}, defaults, options) : defaults;
        }
        this.$get = ['$$cookieReader', '$$cookieWriter', function($$cookieReader, $$cookieWriter) {
            return {
                get: function(key) {
                    return $$cookieReader()[key];
                },
                getObject: function(key) {
                    var value = this.get(key);
                    return value ? angular.fromJson(value) : value;
                },
                getAll: function() {
                    return $$cookieReader();
                },
                put: function(key, value, options) {
                    $$cookieWriter(key, value, calcOptions(options));
                },
                putObject: function(key, value, options) {
                    this.put(key, angular.toJson(value), options);
                },
                remove: function(key, options) {
                    $$cookieWriter(key, undefined, calcOptions(options));
                }
            };
        }];
    }]);
    angular.module('ngCookies').
    factory('$cookieStore', ['$cookies', function($cookies) {
        return {
            get: function(key) {
                return $cookies.getObject(key);
            },
            put: function(key, value) {
                $cookies.putObject(key, value);
            },
            remove: function(key) {
                $cookies.remove(key);
            }
        };
    }]);

    function $$CookieWriter($document, $log, $browser) {
        var cookiePath = $browser.baseHref();
        var rawDocument = $document[0];

        function buildCookieString(name, value, options) {
            var path, expires;
            options = options || {};
            expires = options.expires;
            path = angular.isDefined(options.path) ? options.path : cookiePath;
            if (angular.isUndefined(value)) {
                expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
                value = '';
            }
            if (angular.isString(expires)) {
                expires = new Date(expires);
            }
            var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
            str += path ? ';path=' + path : '';
            str += options.domain ? ';domain=' + options.domain : '';
            str += expires ? ';expires=' + expires.toUTCString() : '';
            str += options.secure ? ';secure' : '';
            var cookieLength = str.length + 1;
            if (cookieLength > 4096) {
                $log.warn('Cookie \'' + name +
                    '\' possibly not set or overflowed because it was too large (' +
                    cookieLength + ' > 4096 bytes)!');
            }
            return str;
        }
        return function(name, value, options) {
            rawDocument.cookie = buildCookieString(name, value, options);
        };
    }
    $$CookieWriter.$inject = ['$document', '$log', '$browser'];
    angular.module('ngCookies').provider('$$cookieWriter', function $$CookieWriterProvider() {
        this.$get = $$CookieWriter;
    });
})(window, window.angular);;