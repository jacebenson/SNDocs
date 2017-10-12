/*! RESOURCE: /scripts/doctype/js_includes_doctype.js */
/*! RESOURCE: /scripts/lib/prototype.min.js */
/*!
 *  Prototype JavaScript framework, version 1.7
 *  (c) 2005-2010 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://www.prototypejs.org/
 *
 */
var Prototype = {
  Version: "1.7",
  Browser: (function() {
    var b = navigator.userAgent;
    var a = Object.prototype.toString.call(window.opera) == "[object Opera]";
    return {
      IE: !!window.attachEvent && !a,
      Opera: a,
      WebKit: b.indexOf("AppleWebKit/") > -1,
      Gecko: b.indexOf("Gecko") > -1 && b.indexOf("KHTML") === -1,
      MobileSafari: /Apple.*Mobile/.test(b)
    }
  })(),
  BrowserFeatures: {
    XPath: !!document.evaluate,
    SelectorsAPI: !!document.querySelector,
    ElementExtensions: (function() {
      var a = window.Element || window.HTMLElement;
      return !!(a && a.prototype)
    })(),
    SpecificElementExtensions: (function() {
      if (typeof window.HTMLDivElement !== "undefined") {
        return true
      }
      var c = document.createElement("div"),
        b = document.createElement("form"),
        a = false;
      if (c.__proto__ && (c.__proto__ !== b.__proto__)) {
        a = true
      }
      c = b = null;
      return a
    })()
  },
  ScriptFragment: "<script[^>]*>([\\S\\s]*?)<\/script>",
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
  emptyFunction: function() {},
  K: function(a) {
    return a
  }
};
if (Prototype.Browser.MobileSafari) {
  Prototype.BrowserFeatures.SpecificElementExtensions = false
}
var Abstract = {};
var Try = {
  these: function() {
    var c;
    for (var b = 0, d = arguments.length; b < d; b++) {
      var a = arguments[b];
      try {
        c = a();
        break
      } catch (f) {}
    }
    return c
  }
};
var Class = (function() {
  var d = (function() {
    for (var e in {
        toString: 1
      }) {
      if (e === "toString") {
        return false
      }
    }
    return true
  })();

  function a() {}

  function b() {
    var h = null,
      g = $A(arguments);
    if (Object.isFunction(g[0])) {
      h = g.shift()
    }

    function e() {
      this.initialize.apply(this, arguments)
    }
    Object.extend(e, Class.Methods);
    e.superclass = h;
    e.subclasses = [];
    if (h) {
      a.prototype = h.prototype;
      e.prototype = new a;
      h.subclasses.push(e)
    }
    for (var f = 0, j = g.length; f < j; f++) {
      e.addMethods(g[f])
    }
    if (!e.prototype.initialize) {
      e.prototype.initialize = Prototype.emptyFunction
    }
    e.prototype.constructor = e;
    return e
  }

  function c(l) {
    var g = this.superclass && this.superclass.prototype,
      f = Object.keys(l);
    if (d) {
      if (l.toString != Object.prototype.toString) {
        f.push("toString")
      }
      if (l.valueOf != Object.prototype.valueOf) {
        f.push("valueOf")
      }
    }
    for (var e = 0, h = f.length; e < h; e++) {
      var k = f[e],
        j = l[k];
      if (g && Object.isFunction(j) && j.argumentNames()[0] == "$super") {
        var m = j;
        j = (function(i) {
          return function() {
            return g[i].apply(this, arguments)
          }
        })(k).wrap(m);
        j.valueOf = m.valueOf.bind(m);
        j.toString = m.toString.bind(m)
      }
      this.prototype[k] = j
    }
    return this
  }
  return {
    create: b,
    Methods: {
      addMethods: c
    }
  }
})();
(function() {
  var C = Object.prototype.toString,
    B = "Null",
    o = "Undefined",
    v = "Boolean",
    f = "Number",
    s = "String",
    H = "Object",
    t = "[object Function]",
    y = "[object Boolean]",
    g = "[object Number]",
    l = "[object String]",
    h = "[object Array]",
    x = "[object Date]",
    i = window.JSON && typeof JSON.stringify === "function" && JSON.stringify(0) === "0" && typeof JSON.stringify(Prototype.K) === "undefined";

  function k(J) {
    switch (J) {
      case null:
        return B;
      case (void 0):
        return o
    }
    var I = typeof J;
    switch (I) {
      case "boolean":
        return v;
      case "number":
        return f;
      case "string":
        return s
    }
    return H
  }

  function z(I, K) {
    for (var J in K) {
      I[J] = K[J]
    }
    return I
  }

  function G(I) {
    try {
      if (c(I)) {
        return "undefined"
      }
      if (I === null) {
        return "null"
      }
      return I.inspect ? I.inspect() : String(I)
    } catch (J) {
      if (J instanceof RangeError) {
        return "..."
      }
      throw J
    }
  }

  function D(I) {
    return F("", {
      "": I
    }, [])
  }

  function F(R, O, P) {
    var Q = O[R],
      N = typeof Q;
    if (k(Q) === H && typeof Q.toJSON === "function") {
      Q = Q.toJSON(R)
    }
    var K = C.call(Q);
    switch (K) {
      case g:
      case y:
      case l:
        Q = Q.valueOf()
    }
    switch (Q) {
      case null:
        return "null";
      case true:
        return "true";
      case false:
        return "false"
    }
    N = typeof Q;
    switch (N) {
      case "string":
        return Q.inspect(true);
      case "number":
        return isFinite(Q) ? String(Q) : "null";
      case "object":
        for (var J = 0, I = P.length; J < I; J++) {
          if (P[J] === Q) {
            throw new TypeError()
          }
        }
        P.push(Q);
        var M = [];
        if (K === h) {
          for (var J = 0, I = Q.length; J < I; J++) {
            var L = F(J, Q, P);
            M.push(typeof L === "undefined" ? "null" : L)
          }
          M = "[" + M.join(",") + "]"
        } else {
          var S = Object.keys(Q);
          for (var J = 0, I = S.length; J < I; J++) {
            var R = S[J],
              L = F(R, Q, P);
            if (typeof L !== "undefined") {
              M.push(R.inspect(true) + ":" + L)
            }
          }
          M = "{" + M.join(",") + "}"
        }
        P.pop();
        return M
    }
  }

  function w(I) {
    return JSON.stringify(I)
  }

  function j(I) {
    return $H(I).toQueryString()
  }

  function p(I) {
    return I && I.toHTML ? I.toHTML() : String.interpret(I)
  }

  function r(I) {
    if (k(I) !== H) {
      throw new TypeError()
    }
    var J = [];
    for (var K in I) {
      if (I.hasOwnProperty(K)) {
        J.push(K)
      }
    }
    return J
  }

  function d(I) {
    var J = [];
    for (var K in I) {
      J.push(I[K])
    }
    return J
  }

  function A(I) {
    return z({}, I)
  }

  function u(I) {
    return !!(I && I.nodeType == 1)
  }

  function m(I) {
    return C.call(I) === h
  }
  var b = (typeof Array.isArray == "function") && Array.isArray([]) && !Array.isArray({});
  if (b) {
    m = Array.isArray
  }

  function e(I) {
    return I instanceof Hash
  }

  function a(I) {
    return C.call(I) === t
  }

  function n(I) {
    return C.call(I) === l
  }

  function q(I) {
    return C.call(I) === g
  }

  function E(I) {
    return C.call(I) === x
  }

  function c(I) {
    return typeof I === "undefined"
  }
  z(Object, {
    extend: z,
    inspect: G,
    toJSON: i ? w : D,
    toQueryString: j,
    toHTML: p,
    keys: Object.keys || r,
    values: d,
    clone: A,
    isElement: u,
    isArray: m,
    isHash: e,
    isFunction: a,
    isString: n,
    isNumber: q,
    isDate: E,
    isUndefined: c
  })
})();
Object.extend(Function.prototype, (function() {
  var k = Array.prototype.slice;

  function d(o, l) {
    var n = o.length,
      m = l.length;
    while (m--) {
      o[n + m] = l[m]
    }
    return o
  }

  function i(m, l) {
    m = k.call(m, 0);
    return d(m, l)
  }

  function g() {
    var l = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, "").replace(/\s+/g, "").split(",");
    return l.length == 1 && !l[0] ? [] : l
  }

  function h(n) {
    if (arguments.length < 2 && Object.isUndefined(arguments[0])) {
      return this
    }
    var l = this,
      m = k.call(arguments, 1);
    return function() {
      var o = i(m, arguments);
      return l.apply(n, o)
    }
  }

  function f(n) {
    var l = this,
      m = k.call(arguments, 1);
    return function(p) {
      var o = d([p || window.event], m);
      return l.apply(n, o)
    }
  }

  function j() {
    if (!arguments.length) {
      return this
    }
    var l = this,
      m = k.call(arguments, 0);
    return function() {
      var n = i(m, arguments);
      return l.apply(this, n)
    }
  }

  function e(n) {
    var l = this,
      m = k.call(arguments, 1);
    n = n * 1000;
    return window.setTimeout(function() {
      return l.apply(l, m)
    }, n)
  }

  function a() {
    var l = d([0.01], arguments);
    return this.delay.apply(this, l)
  }

  function c(m) {
    var l = this;
    return function() {
      var n = d([l.bind(this)], arguments);
      return m.apply(this, n)
    }
  }

  function b() {
    if (this._methodized) {
      return this._methodized
    }
    var l = this;
    return this._methodized = function() {
      var m = d([this], arguments);
      return l.apply(null, m)
    }
  }
  return {
    argumentNames: g,
    bind: h,
    bindAsEventListener: f,
    curry: j,
    delay: e,
    defer: a,
    wrap: c,
    methodize: b
  }
})());
(function(c) {
  function b() {
    return this.getUTCFullYear() + "-" + (this.getUTCMonth() + 1).toPaddedString(2) + "-" + this.getUTCDate().toPaddedString(2) + "T" + this.getUTCHours().toPaddedString(2) + ":" + this.getUTCMinutes().toPaddedString(2) + ":" + this.getUTCSeconds().toPaddedString(2) + "Z"
  }

  function a() {
    return this.toISOString()
  }
  if (!c.toISOString) {
    c.toISOString = b
  }
  if (!c.toJSON) {
    c.toJSON = a
  }
})(Date.prototype);
RegExp.prototype.match = RegExp.prototype.test;
RegExp.escape = function(a) {
  return String(a).replace(/([.*+?^=!:()|[\]\/\\])/g, "\\$1")
};
var PeriodicalExecuter = Class.create({
  initialize: function(b, a) {
    this.callback = b;
    this.frequency = a;
    this.currentlyExecuting = false;
    this.registerCallback()
  },
  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000)
  },
  execute: function() {
    this.callback(this)
  },
  stop: function() {
    if (!this.timer) {
      return
    }
    clearInterval(this.timer);
    this.timer = null
  },
  onTimerEvent: function() {
    if (!this.currentlyExecuting) {
      try {
        this.currentlyExecuting = true;
        this.execute();
        this.currentlyExecuting = false
      } catch (a) {
        this.currentlyExecuting = false;
        throw a
      }
    }
  }
});
Object.extend(String, {
  interpret: function(a) {
    return a == null ? "" : String(a)
  },
  specialChar: {
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "\\": "\\\\"
  }
});
Object.extend(String.prototype, (function() {
  var NATIVE_JSON_PARSE_SUPPORT = window.JSON && typeof JSON.parse === "function" && JSON.parse('{"test": true}').test;

  function prepareReplacement(replacement) {
    if (Object.isFunction(replacement)) {
      return replacement
    }
    var template = new Template(replacement);
    return function(match) {
      return template.evaluate(match)
    }
  }

  function gsub(pattern, replacement) {
    var result = "",
      source = this,
      match;
    replacement = prepareReplacement(replacement);
    if (Object.isString(pattern)) {
      pattern = RegExp.escape(pattern)
    }
    if (!(pattern.length || pattern.source)) {
      replacement = replacement("");
      return replacement + source.split("").join(replacement) + replacement
    }
    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source = source.slice(match.index + match[0].length)
      } else {
        result += source, source = ""
      }
    }
    return result
  }

  function sub(pattern, replacement, count) {
    replacement = prepareReplacement(replacement);
    count = Object.isUndefined(count) ? 1 : count;
    return this.gsub(pattern, function(match) {
      if (--count < 0) {
        return match[0]
      }
      return replacement(match)
    })
  }

  function scan(pattern, iterator) {
    this.gsub(pattern, iterator);
    return String(this)
  }

  function truncate(length, truncation) {
    length = length || 30;
    truncation = Object.isUndefined(truncation) ? "..." : truncation;
    return this.length > length ? this.slice(0, length - truncation.length) + truncation : String(this)
  }

  function strip() {
    return this.replace(/^\s+/, "").replace(/\s+$/, "")
  }

  function stripTags() {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "")
  }

  function stripScripts() {
    return this.replace(new RegExp(Prototype.ScriptFragment, "img"), "")
  }

  function extractScripts() {
    var matchAll = new RegExp(Prototype.ScriptFragment, "img"),
      matchOne = new RegExp(Prototype.ScriptFragment, "im");
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ["", ""])[1]
    })
  }

  function evalScripts() {
    return this.extractScripts().map(function(script) {
      return eval(script)
    })
  }

  function escapeHTML() {
    return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  function unescapeHTML() {
    return this.stripTags().replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
  }

  function toQueryParams(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) {
      return {}
    }
    return match[1].split(separator || "&").inject({}, function(hash, pair) {
      if ((pair = pair.split("="))[0]) {
        var key = decodeURIComponent(pair.shift()),
          value = pair.length > 1 ? pair.join("=") : pair[0];
        if (value != undefined) {
          value = decodeURIComponent(value)
        }
        if (key in hash) {
          if (!Object.isArray(hash[key])) {
            hash[key] = [hash[key]]
          }
          hash[key].push(value)
        } else {
          hash[key] = value
        }
      }
      return hash
    })
  }

  function toArray() {
    return this.split("")
  }

  function succ() {
    return this.slice(0, this.length - 1) + String.fromCharCode(this.charCodeAt(this.length - 1) + 1)
  }

  function times(count) {
    return count < 1 ? "" : new Array(count + 1).join(this)
  }

  function camelize() {
    return this.replace(/-+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : ""
    })
  }

  function capitalize() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
  }

  function underscore() {
    return this.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/-/g, "_").toLowerCase()
  }

  function dasherize() {
    return this.replace(/_/g, "-")
  }

  function inspect(useDoubleQuotes) {
    var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character) {
      if (character in String.specialChar) {
        return String.specialChar[character]
      }
      return "\\u00" + character.charCodeAt().toPaddedString(2, 16)
    });
    if (useDoubleQuotes) {
      return '"' + escapedString.replace(/"/g, '\\"') + '"'
    }
    return "'" + escapedString.replace(/'/g, "\\'") + "'"
  }

  function unfilterJSON(filter) {
    return this.replace(filter || Prototype.JSONFilter, "$1")
  }

  function isJSON() {
    var str = this;
    if (str.blank()) {
      return false
    }
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@");
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]");
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
    return (/^[\],:{}\s]*$/).test(str)
  }

  function evalJSON(sanitize) {
    var json = this.unfilterJSON(),
      cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    if (cx.test(json)) {
      json = json.replace(cx, function(a) {
        return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
      })
    }
    try {
      if (!sanitize || json.isJSON()) {
        return eval("(" + json + ")")
      }
    } catch (e) {}
    throw new SyntaxError("Badly formed JSON string: " + this.inspect())
  }

  function parseJSON() {
    var json = this.unfilterJSON();
    return JSON.parse(json)
  }

  function include(pattern) {
    return this.indexOf(pattern) > -1
  }

  function startsWith(pattern) {
    return this.lastIndexOf(pattern, 0) === 0
  }

  function endsWith(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.indexOf(pattern, d) === d
  }

  function empty() {
    return this == ""
  }

  function blank() {
    return /^\s*$/.test(this)
  }

  function interpolate(object, pattern) {
    return new Template(this, pattern).evaluate(object)
  }
  return {
    gsub: gsub,
    sub: sub,
    scan: scan,
    truncate: truncate,
    strip: String.prototype.trim || strip,
    stripTags: stripTags,
    stripScripts: stripScripts,
    extractScripts: extractScripts,
    evalScripts: evalScripts,
    escapeHTML: escapeHTML,
    unescapeHTML: unescapeHTML,
    toQueryParams: toQueryParams,
    parseQuery: toQueryParams,
    toArray: toArray,
    succ: succ,
    times: times,
    camelize: camelize,
    capitalize: capitalize,
    underscore: underscore,
    dasherize: dasherize,
    inspect: inspect,
    unfilterJSON: unfilterJSON,
    isJSON: isJSON,
    evalJSON: NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
    include: include,
    startsWith: startsWith,
    endsWith: endsWith,
    empty: empty,
    blank: blank,
    interpolate: interpolate
  }
})());
var Template = Class.create({
  initialize: function(a, b) {
    this.template = a.toString();
    this.pattern = b || Template.Pattern
  },
  evaluate: function(a) {
    if (a && Object.isFunction(a.toTemplateReplacements)) {
      a = a.toTemplateReplacements()
    }
    return this.template.gsub(this.pattern, function(d) {
      if (a == null) {
        return (d[1] + "")
      }
      var f = d[1] || "";
      if (f == "\\") {
        return d[2]
      }
      var b = a,
        g = d[3],
        e = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
      d = e.exec(g);
      if (d == null) {
        return f
      }
      while (d != null) {
        var c = d[1].startsWith("[") ? d[2].replace(/\\\\]/g, "]") : d[1];
        b = b[c];
        if (null == b || "" == d[3]) {
          break
        }
        g = g.substring("[" == d[3] ? d[1].length : d[0].length);
        d = e.exec(g)
      }
      return f + String.interpret(b)
    })
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
var $break = {};
var Enumerable = (function() {
  function c(y, x) {
    var w = 0;
    try {
      this._each(function(A) {
        y.call(x, A, w++)
      })
    } catch (z) {
      if (z != $break) {
        throw z
      }
    }
    return this
  }

  function r(z, y, x) {
    var w = -z,
      A = [],
      B = this.toArray();
    if (z < 1) {
      return B
    }
    while ((w += z) < B.length) {
      A.push(B.slice(w, w + z))
    }
    return A.collect(y, x)
  }

  function b(y, x) {
    y = y || Prototype.K;
    var w = true;
    this.each(function(A, z) {
      w = w && !!y.call(x, A, z);
      if (!w) {
        throw $break
      }
    });
    return w
  }

  function i(y, x) {
    y = y || Prototype.K;
    var w = false;
    this.each(function(A, z) {
      if (w = !!y.call(x, A, z)) {
        throw $break
      }
    });
    return w
  }

  function j(y, x) {
    y = y || Prototype.K;
    var w = [];
    this.each(function(A, z) {
      w.push(y.call(x, A, z))
    });
    return w
  }

  function t(y, x) {
    var w;
    this.each(function(A, z) {
      if (y.call(x, A, z)) {
        w = A;
        throw $break
      }
    });
    return w
  }

  function h(y, x) {
    var w = [];
    this.each(function(A, z) {
      if (y.call(x, A, z)) {
        w.push(A)
      }
    });
    return w
  }

  function g(z, y, x) {
    y = y || Prototype.K;
    var w = [];
    if (Object.isString(z)) {
      z = new RegExp(RegExp.escape(z))
    }
    this.each(function(B, A) {
      if (z.match(B)) {
        w.push(y.call(x, B, A))
      }
    });
    return w
  }

  function a(w) {
    if (Object.isFunction(this.indexOf)) {
      if (this.indexOf(w) != -1) {
        return true
      }
    }
    var x = false;
    this.each(function(y) {
      if (y == w) {
        x = true;
        throw $break
      }
    });
    return x
  }

  function q(x, w) {
    w = Object.isUndefined(w) ? null : w;
    return this.eachSlice(x, function(y) {
      while (y.length < x) {
        y.push(w)
      }
      return y
    })
  }

  function l(w, y, x) {
    this.each(function(A, z) {
      w = y.call(x, w, A, z)
    });
    return w
  }

  function v(x) {
    var w = $A(arguments).slice(1);
    return this.map(function(y) {
      return y[x].apply(y, w)
    })
  }

  function p(y, x) {
    y = y || Prototype.K;
    var w;
    this.each(function(A, z) {
      A = y.call(x, A, z);
      if (w == null || A >= w) {
        w = A
      }
    });
    return w
  }

  function n(y, x) {
    y = y || Prototype.K;
    var w;
    this.each(function(A, z) {
      A = y.call(x, A, z);
      if (w == null || A < w) {
        w = A
      }
    });
    return w
  }

  function e(z, x) {
    z = z || Prototype.K;
    var y = [],
      w = [];
    this.each(function(B, A) {
      (z.call(x, B, A) ? y : w).push(B)
    });
    return [y, w]
  }

  function f(x) {
    var w = [];
    this.each(function(y) {
      w.push(y[x])
    });
    return w
  }

  function d(y, x) {
    var w = [];
    this.each(function(A, z) {
      if (!y.call(x, A, z)) {
        w.push(A)
      }
    });
    return w
  }

  function m(x, w) {
    return this.map(function(z, y) {
      return {
        value: z,
        criteria: x.call(w, z, y)
      }
    }).sort(function(B, A) {
      var z = B.criteria,
        y = A.criteria;
      return z < y ? -1 : z > y ? 1 : 0
    }).pluck("value")
  }

  function o() {
    return this.map()
  }

  function s() {
    var x = Prototype.K,
      w = $A(arguments);
    if (Object.isFunction(w.last())) {
      x = w.pop()
    }
    var y = [this].concat(w).map($A);
    return this.map(function(A, z) {
      return x(y.pluck(z))
    })
  }

  function k() {
    return this.toArray().length
  }

  function u() {
    return "#<Enumerable:" + this.toArray().inspect() + ">"
  }
  return {
    each: c,
    eachSlice: r,
    all: b,
    every: b,
    any: i,
    some: i,
    collect: j,
    map: j,
    detect: t,
    findAll: h,
    select: h,
    filter: h,
    grep: g,
    include: a,
    member: a,
    inGroupsOf: q,
    inject: l,
    invoke: v,
    max: p,
    min: n,
    partition: e,
    pluck: f,
    reject: d,
    sortBy: m,
    toArray: o,
    entries: o,
    zip: s,
    size: k,
    inspect: u,
    find: t
  }
})();

function $A(c) {
  if (!c) {
    return []
  }
  if ("toArray" in Object(c)) {
    return c.toArray()
  }
  var b = c.length || 0,
    a = new Array(b);
  while (b--) {
    a[b] = c[b]
  }
  return a
}

function $w(a) {
  if (!Object.isString(a)) {
    return []
  }
  a = a.strip();
  return a ? a.split(/\s+/) : []
}
Array.from = $A;
(function() {
  var r = Array.prototype,
    m = r.slice,
    o = r.forEach;

  function b(w, v) {
    for (var u = 0, x = this.length >>> 0; u < x; u++) {
      if (u in this) {
        w.call(v, this[u], u, this)
      }
    }
  }
  if (!o) {
    o = b
  }

  function l() {
    this.length = 0;
    return this
  }

  function d() {
    return this[0]
  }

  function g() {
    return this[this.length - 1]
  }

  function i() {
    return this.select(function(u) {
      return u != null
    })
  }

  function t() {
    return this.inject([], function(v, u) {
      if (Object.isArray(u)) {
        return v.concat(u.flatten())
      }
      v.push(u);
      return v
    })
  }

  function h() {
    var u = m.call(arguments, 0);
    return this.select(function(v) {
      return !u.include(v)
    })
  }

  function f(u) {
    return (u === false ? this.toArray() : this)._reverse()
  }

  function k(u) {
    return this.inject([], function(x, w, v) {
      if (0 == v || (u ? x.last() != w : !x.include(w))) {
        x.push(w)
      }
      return x
    })
  }

  function p(u) {
    return this.uniq().findAll(function(v) {
      return u.detect(function(w) {
        return v === w
      })
    })
  }

  function q() {
    return m.call(this, 0)
  }

  function j() {
    return this.length
  }

  function s() {
    return "[" + this.map(Object.inspect).join(", ") + "]"
  }

  function a(w, u) {
    u || (u = 0);
    var v = this.length;
    if (u < 0) {
      u = v + u
    }
    for (; u < v; u++) {
      if (this[u] === w) {
        return u
      }
    }
    return -1
  }

  function n(v, u) {
    u = isNaN(u) ? this.length : (u < 0 ? this.length + u : u) + 1;
    var w = this.slice(0, u).reverse().indexOf(v);
    return (w < 0) ? w : u - w - 1
  }

  function c() {
    var z = m.call(this, 0),
      x;
    for (var v = 0, w = arguments.length; v < w; v++) {
      x = arguments[v];
      if (Object.isArray(x) && !("callee" in x)) {
        for (var u = 0, y = x.length; u < y; u++) {
          z.push(x[u])
        }
      } else {
        z.push(x)
      }
    }
    return z
  }
  Object.extend(r, Enumerable);
  if (!r._reverse) {
    r._reverse = r.reverse
  }
  Object.extend(r, {
    _each: o,
    clear: l,
    first: d,
    last: g,
    compact: i,
    flatten: t,
    without: h,
    reverse: f,
    uniq: k,
    intersect: p,
    clone: q,
    toArray: q,
    size: j,
    inspect: s
  });
  var e = (function() {
    return [].concat(arguments)[0][0] !== 1
  })(1, 2);
  if (e) {
    r.concat = c
  }
  if (!r.indexOf) {
    r.indexOf = a
  }
  if (!r.lastIndexOf) {
    r.lastIndexOf = n
  }
})();

function $H(a) {
  return new Hash(a)
}
var Hash = Class.create(Enumerable, (function() {
  function e(p) {
    this._object = Object.isHash(p) ? p.toObject() : Object.clone(p)
  }

  function f(q) {
    for (var p in this._object) {
      var r = this._object[p],
        s = [p, r];
      s.key = p;
      s.value = r;
      q(s)
    }
  }

  function j(p, q) {
    return this._object[p] = q
  }

  function c(p) {
    if (this._object[p] !== Object.prototype[p]) {
      return this._object[p]
    }
  }

  function m(p) {
    var q = this._object[p];
    delete this._object[p];
    return q
  }

  function o() {
    return Object.clone(this._object)
  }

  function n() {
    return this.pluck("key")
  }

  function l() {
    return this.pluck("value")
  }

  function g(q) {
    var p = this.detect(function(r) {
      return r.value === q
    });
    return p && p.key
  }

  function i(p) {
    return this.clone().update(p)
  }

  function d(p) {
    return new Hash(p).inject(this, function(q, r) {
      q.set(r.key, r.value);
      return q
    })
  }

  function b(p, q) {
    if (Object.isUndefined(q)) {
      return p
    }
    return p + "=" + encodeURIComponent(String.interpret(q))
  }

  function a() {
    return this.inject([], function(t, w) {
      var s = encodeURIComponent(w.key),
        q = w.value;
      if (q && typeof q == "object") {
        if (Object.isArray(q)) {
          var v = [];
          for (var r = 0, p = q.length, u; r < p; r++) {
            u = q[r];
            v.push(b(s, u))
          }
          return t.concat(v)
        }
      } else {
        t.push(b(s, q))
      }
      return t
    }).join("&")
  }

  function k() {
    return "#<Hash:{" + this.map(function(p) {
      return p.map(Object.inspect).join(": ")
    }).join(", ") + "}>"
  }

  function h() {
    return new Hash(this)
  }
  return {
    initialize: e,
    _each: f,
    set: j,
    get: c,
    unset: m,
    toObject: o,
    toTemplateReplacements: o,
    keys: n,
    values: l,
    index: g,
    merge: i,
    update: d,
    toQueryString: a,
    inspect: k,
    toJSON: o,
    clone: h
  }
})());
Hash.from = $H;
Object.extend(Number.prototype, (function() {
  function d() {
    return this.toPaddedString(2, 16)
  }

  function b() {
    return this + 1
  }

  function h(j, i) {
    $R(0, this, true).each(j, i);
    return this
  }

  function g(k, j) {
    var i = this.toString(j || 10);
    return "0".times(k - i.length) + i
  }

  function a() {
    return Math.abs(this)
  }

  function c() {
    return Math.round(this)
  }

  function e() {
    return Math.ceil(this)
  }

  function f() {
    return Math.floor(this)
  }
  return {
    toColorPart: d,
    succ: b,
    times: h,
    toPaddedString: g,
    abs: a,
    round: c,
    ceil: e,
    floor: f
  }
})());

function $R(c, a, b) {
  return new ObjectRange(c, a, b)
}
var ObjectRange = Class.create(Enumerable, (function() {
  function b(f, d, e) {
    this.start = f;
    this.end = d;
    this.exclusive = e
  }

  function c(d) {
    var e = this.start;
    while (this.include(e)) {
      d(e);
      e = e.succ()
    }
  }

  function a(d) {
    if (d < this.start) {
      return false
    }
    if (this.exclusive) {
      return d < this.end
    }
    return d <= this.end
  }
  return {
    initialize: b,
    _each: c,
    include: a
  }
})());
var Ajax = {
  getTransport: function() {
    return Try.these(function() {
      return new XMLHttpRequest()
    }, function() {
      return new ActiveXObject("Msxml2.XMLHTTP")
    }, function() {
      return new ActiveXObject("Microsoft.XMLHTTP")
    }) || false
  },
  activeRequestCount: 0
};
Ajax.Responders = {
  responders: [],
  _each: function(a) {
    this.responders._each(a)
  },
  register: function(a) {
    if (!this.include(a)) {
      this.responders.push(a)
    }
  },
  unregister: function(a) {
    this.responders = this.responders.without(a)
  },
  dispatch: function(d, b, c, a) {
    this.each(function(f) {
      if (Object.isFunction(f[d])) {
        try {
          f[d].apply(f, [b, c, a])
        } catch (g) {}
      }
    })
  }
};
Object.extend(Ajax.Responders, Enumerable);
Ajax.Responders.register({
  onCreate: function() {
    Ajax.activeRequestCount++
  },
  onComplete: function() {
    Ajax.activeRequestCount--
  }
});
Ajax.Base = Class.create({
  initialize: function(a) {
    this.options = {
      method: "post",
      asynchronous: true,
      contentType: "application/x-www-form-urlencoded",
      encoding: "UTF-8",
      parameters: "",
      evalJSON: true,
      evalJS: true
    };
    Object.extend(this.options, a || {});
    this.options.method = this.options.method.toLowerCase();
    if (Object.isHash(this.options.parameters)) {
      this.options.parameters = this.options.parameters.toObject()
    }
  }
});
Ajax.Request = Class.create(Ajax.Base, {
  _complete: false,
  initialize: function($super, b, a) {
    $super(a);
    this.transport = Ajax.getTransport();
    this.request(b)
  },
  request: function(b) {
    this.url = b;
    this.method = this.options.method;
    var d = Object.isString(this.options.parameters) ? this.options.parameters : Object.toQueryString(this.options.parameters);
    if (!["get", "post"].include(this.method)) {
      d += (d ? "&" : "") + "_method=" + this.method;
      this.method = "post"
    }
    if (d && this.method === "get") {
      this.url += (this.url.include("?") ? "&" : "?") + d
    }
    this.parameters = d.toQueryParams();
    try {
      var a = new Ajax.Response(this);
      if (this.options.onCreate) {
        this.options.onCreate(a)
      }
      Ajax.Responders.dispatch("onCreate", this, a);
      this.transport.open(this.method.toUpperCase(), this.url, this.options.asynchronous);
      if (this.options.asynchronous) {
        this.respondToReadyState.bind(this).defer(1)
      }
      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();
      this.body = this.method == "post" ? (this.options.postBody || d) : null;
      this.transport.send(this.body);
      if (!this.options.asynchronous && this.transport.overrideMimeType) {
        this.onStateChange()
      }
    } catch (c) {
      this.dispatchException(c)
    }
  },
  onStateChange: function() {
    var a = this.transport.readyState;
    if (a > 1 && !((a == 4) && this._complete)) {
      this.respondToReadyState(this.transport.readyState)
    }
  },
  setRequestHeaders: function() {
    var e = {
      "X-Requested-With": "XMLHttpRequest",
      "X-Prototype-Version": Prototype.Version,
      Accept: "text/javascript, text/html, application/xml, text/xml, */*"
    };
    if (this.method == "post") {
      e["Content-type"] = this.options.contentType + (this.options.encoding ? "; charset=" + this.options.encoding : "");
      if (this.transport.overrideMimeType && (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0, 2005])[1] < 2005) {
        e.Connection = "close"
      }
    }
    if (typeof this.options.requestHeaders == "object") {
      var c = this.options.requestHeaders;
      if (Object.isFunction(c.push)) {
        for (var b = 0, d = c.length; b < d; b += 2) {
          e[c[b]] = c[b + 1]
        }
      } else {
        $H(c).each(function(f) {
          e[f.key] = f.value
        })
      }
    }
    for (var a in e) {
      this.transport.setRequestHeader(a, e[a])
    }
  },
  success: function() {
    var a = this.getStatus();
    return !a || (a >= 200 && a < 300) || a == 304
  },
  getStatus: function() {
    try {
      if (this.transport.status === 1223) {
        return 204
      }
      return this.transport.status || 0
    } catch (a) {
      return 0
    }
  },
  respondToReadyState: function(a) {
    var c = Ajax.Request.Events[a],
      b = new Ajax.Response(this);
    if (c == "Complete") {
      try {
        this._complete = true;
        (this.options["on" + b.status] || this.options["on" + (this.success() ? "Success" : "Failure")] || Prototype.emptyFunction)(b, b.headerJSON)
      } catch (d) {
        this.dispatchException(d)
      }
      var f = b.getHeader("Content-type");
      if (this.options.evalJS == "force" || (this.options.evalJS && this.isSameOrigin() && f && f.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i))) {
        this.evalResponse()
      }
    }
    try {
      (this.options["on" + c] || Prototype.emptyFunction)(b, b.headerJSON);
      Ajax.Responders.dispatch("on" + c, this, b, b.headerJSON)
    } catch (d) {
      this.dispatchException(d)
    }
    if (c == "Complete") {
      this.transport.onreadystatechange = Prototype.emptyFunction
    }
  },
  isSameOrigin: function() {
    var a = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return !a || (a[0] == "#{protocol}//#{domain}#{port}".interpolate({
      protocol: location.protocol,
      domain: document.domain,
      port: location.port ? ":" + location.port : ""
    }))
  },
  getHeader: function(a) {
    try {
      return this.transport.getResponseHeader(a) || null
    } catch (b) {
      return null
    }
  },
  evalResponse: function() {
    try {
      return eval((this.transport.responseText || "").unfilterJSON())
    } catch (e) {
      this.dispatchException(e)
    }
  },
  dispatchException: function(a) {
    (this.options.onException || Prototype.emptyFunction)(this, a);
    Ajax.Responders.dispatch("onException", this, a)
  }
});
Ajax.Request.Events = ["Uninitialized", "Loading", "Loaded", "Interactive", "Complete"];
Ajax.Response = Class.create({
  initialize: function(c) {
    this.request = c;
    var d = this.transport = c.transport,
      a = this.readyState = d.readyState;
    if ((a > 2 && !Prototype.Browser.IE) || a == 4) {
      this.status = this.getStatus();
      this.statusText = this.getStatusText();
      this.responseText = String.interpret(d.responseText);
      this.headerJSON = this._getHeaderJSON()
    }
    if (a == 4) {
      var b = d.responseXML;
      this.responseXML = Object.isUndefined(b) ? null : b;
      this.responseJSON = this._getResponseJSON()
    }
  },
  status: 0,
  statusText: "",
  getStatus: Ajax.Request.prototype.getStatus,
  getStatusText: function() {
    try {
      return this.transport.statusText || ""
    } catch (a) {
      return ""
    }
  },
  getHeader: Ajax.Request.prototype.getHeader,
  getAllHeaders: function() {
    try {
      return this.getAllResponseHeaders()
    } catch (a) {
      return null
    }
  },
  getResponseHeader: function(a) {
    return this.transport.getResponseHeader(a)
  },
  getAllResponseHeaders: function() {
    return this.transport.getAllResponseHeaders()
  },
  _getHeaderJSON: function() {
    var a = this.getHeader("X-JSON");
    if (!a) {
      return null
    }
    a = decodeURIComponent(escape(a));
    try {
      return a.evalJSON(this.request.options.sanitizeJSON || !this.request.isSameOrigin())
    } catch (b) {
      this.request.dispatchException(b)
    }
  },
  _getResponseJSON: function() {
    var a = this.request.options;
    if (!a.evalJSON || (a.evalJSON != "force" && !(this.getHeader("Content-type") || "").include("application/json")) || this.responseText.blank()) {
      return null
    }
    try {
      return this.responseText.evalJSON(a.sanitizeJSON || !this.request.isSameOrigin())
    } catch (b) {
      this.request.dispatchException(b)
    }
  }
});
Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function($super, a, c, b) {
    this.container = {
      success: (a.success || a),
      failure: (a.failure || (a.success ? null : a))
    };
    b = Object.clone(b);
    var d = b.onComplete;
    b.onComplete = (function(e, f) {
      this.updateContent(e.responseText);
      if (Object.isFunction(d)) {
        d(e, f)
      }
    }).bind(this);
    $super(c, b)
  },
  updateContent: function(d) {
    var c = this.container[this.success() ? "success" : "failure"],
      a = this.options;
    if (!a.evalScripts) {
      d = d.stripScripts()
    }
    if (c = $(c)) {
      if (a.insertion) {
        if (Object.isString(a.insertion)) {
          var b = {};
          b[a.insertion] = d;
          c.insert(b)
        } else {
          a.insertion(c, d)
        }
      } else {
        c.update(d)
      }
    }
  }
});
Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function($super, a, c, b) {
    $super(b);
    this.onComplete = this.options.onComplete;
    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);
    this.updater = {};
    this.container = a;
    this.url = c;
    this.start()
  },
  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent()
  },
  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments)
  },
  updateComplete: function(a) {
    if (this.options.decay) {
      this.decay = (a.responseText == this.lastText ? this.decay * this.options.decay : 1);
      this.lastText = a.responseText
    }
    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency)
  },
  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options)
  }
});

function $(b) {
  if (arguments.length > 1) {
    for (var a = 0, d = [], c = arguments.length; a < c; a++) {
      d.push($(arguments[a]))
    }
    return d
  }
  if (Object.isString(b)) {
    b = document.getElementById(b)
  }
  return Element.extend(b)
}
if (Prototype.BrowserFeatures.XPath) {
  document._getElementsByXPath = function(f, a) {
    var c = [];
    var e = document.evaluate(f, $(a) || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var b = 0, d = e.snapshotLength; b < d; b++) {
      c.push(Element.extend(e.snapshotItem(b)))
    }
    return c
  }
}
if (!Node) {
  var Node = {}
}
if (!Node.ELEMENT_NODE) {
  Object.extend(Node, {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  })
}(function(c) {
  function d(f, e) {
    if (f === "select") {
      return false
    }
    if ("type" in e) {
      return false
    }
    return true
  }
  var b = (function() {
    try {
      var e = document.createElement('<input name="x">');
      return e.tagName.toLowerCase() === "input" && e.name === "x"
    } catch (f) {
      return false
    }
  })();
  var a = c.Element;
  c.Element = function(g, f) {
    f = f || {};
    g = g.toLowerCase();
    var e = Element.cache;
    if (b && f.name) {
      g = "<" + g + ' name="' + f.name + '">';
      delete f.name;
      return Element.writeAttribute(document.createElement(g), f)
    }
    if (!e[g]) {
      e[g] = Element.extend(document.createElement(g))
    }
    var h = d(g, f) ? e[g].cloneNode(false) : document.createElement(g);
    return Element.writeAttribute(h, f)
  };
  Object.extend(c.Element, a || {});
  if (a) {
    c.Element.prototype = a.prototype
  }
})(this);
Element.idCounter = 1;
Element.cache = {};
Element._purgeElement = function(b) {
  var a = b._prototypeUID;
  if (a) {
    Element.stopObserving(b);
    b._prototypeUID = void 0;
    delete Element.Storage[a]
  }
};
Element.Methods = {
  visible: function(a) {
    return $(a).style.display != "none"
  },
  toggle: function(a) {
    a = $(a);
    Element[Element.visible(a) ? "hide" : "show"](a);
    return a
  },
  hide: function(a) {
    a = $(a);
    a.style.display = "none";
    return a
  },
  show: function(a) {
    a = $(a);
    a.style.display = "";
    return a
  },
  remove: function(a) {
    a = $(a);
    a.parentNode.removeChild(a);
    return a
  },
  update: (function() {
    var d = (function() {
      var g = document.createElement("select"),
        h = true;
      g.innerHTML = '<option value="test">test</option>';
      if (g.options && g.options[0]) {
        h = g.options[0].nodeName.toUpperCase() !== "OPTION"
      }
      g = null;
      return h
    })();
    var b = (function() {
      try {
        var g = document.createElement("table");
        if (g && g.tBodies) {
          g.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
          var i = typeof g.tBodies[0] == "undefined";
          g = null;
          return i
        }
      } catch (h) {
        return true
      }
    })();
    var a = (function() {
      try {
        var g = document.createElement("div");
        g.innerHTML = "<link>";
        var i = (g.childNodes.length === 0);
        g = null;
        return i
      } catch (h) {
        return true
      }
    })();
    var c = d || b || a;
    var f = (function() {
      var g = document.createElement("script"),
        i = false;
      try {
        g.appendChild(document.createTextNode(""));
        i = !g.firstChild || g.firstChild && g.firstChild.nodeType !== 3
      } catch (h) {
        i = true
      }
      g = null;
      return i
    })();

    function e(l, m) {
      l = $(l);
      var g = Element._purgeElement;
      var n = l.getElementsByTagName("*"),
        k = n.length;
      while (k--) {
        g(n[k])
      }
      if (m && m.toElement) {
        m = m.toElement()
      }
      if (Object.isElement(m)) {
        return l.update().insert(m)
      }
      m = Object.toHTML(m);
      var j = l.tagName.toUpperCase();
      if (j === "SCRIPT" && f) {
        l.text = m;
        return l
      }
      if (c) {
        if (j in Element._insertionTranslations.tags) {
          while (l.firstChild) {
            l.removeChild(l.firstChild)
          }
          Element._getContentFromAnonymousElement(j, m.stripScripts()).each(function(i) {
            l.appendChild(i)
          })
        } else {
          if (a && Object.isString(m) && m.indexOf("<link") > -1) {
            while (l.firstChild) {
              l.removeChild(l.firstChild)
            }
            var h = Element._getContentFromAnonymousElement(j, m.stripScripts(), true);
            h.each(function(i) {
              l.appendChild(i)
            })
          } else {
            l.innerHTML = m.stripScripts()
          }
        }
      } else {
        l.innerHTML = m.stripScripts()
      }
      m.evalScripts.bind(m).defer();
      return l
    }
    return e
  })(),
  replace: function(b, c) {
    b = $(b);
    if (c && c.toElement) {
      c = c.toElement()
    } else {
      if (!Object.isElement(c)) {
        c = Object.toHTML(c);
        var a = b.ownerDocument.createRange();
        a.selectNode(b);
        c.evalScripts.bind(c).defer();
        c = a.createContextualFragment(c.stripScripts())
      }
    }
    b.parentNode.replaceChild(c, b);
    return b
  },
  insert: function(c, e) {
    c = $(c);
    if (Object.isString(e) || Object.isNumber(e) || Object.isElement(e) || (e && (e.toElement || e.toHTML))) {
      e = {
        bottom: e
      }
    }
    var d, f, b, g;
    for (var a in e) {
      d = e[a];
      a = a.toLowerCase();
      f = Element._insertionTranslations[a];
      if (d && d.toElement) {
        d = d.toElement()
      }
      if (Object.isElement(d)) {
        f(c, d);
        continue
      }
      d = Object.toHTML(d);
      b = ((a == "before" || a == "after") ? c.parentNode : c).tagName.toUpperCase();
      g = Element._getContentFromAnonymousElement(b, d.stripScripts());
      if (a == "top" || a == "after") {
        g.reverse()
      }
      g.each(f.curry(c));
      d.evalScripts.bind(d).defer()
    }
    return c
  },
  wrap: function(b, c, a) {
    b = $(b);
    if (Object.isElement(c)) {
      $(c).writeAttribute(a || {})
    } else {
      if (Object.isString(c)) {
        c = new Element(c, a)
      } else {
        c = new Element("div", c)
      }
    }
    if (b.parentNode) {
      b.parentNode.replaceChild(c, b)
    }
    c.appendChild(b);
    return c
  },
  inspect: function(b) {
    b = $(b);
    var a = "<" + b.tagName.toLowerCase();
    $H({
      id: "id",
      className: "class"
    }).each(function(f) {
      var e = f.first(),
        c = f.last(),
        d = (b[e] || "").toString();
      if (d) {
        a += " " + c + "=" + d.inspect(true)
      }
    });
    return a + ">"
  },
  recursivelyCollect: function(a, c, d) {
    a = $(a);
    d = d || -1;
    var b = [];
    while (a = a[c]) {
      if (a.nodeType == 1) {
        b.push(Element.extend(a))
      }
      if (b.length == d) {
        break
      }
    }
    return b
  },
  ancestors: function(a) {
    return Element.recursivelyCollect(a, "parentNode")
  },
  descendants: function(a) {
    return Element.select(a, "*")
  },
  firstDescendant: function(a) {
    a = $(a).firstChild;
    while (a && a.nodeType != 1) {
      a = a.nextSibling
    }
    return $(a)
  },
  immediateDescendants: function(b) {
    var a = [],
      c = $(b).firstChild;
    while (c) {
      if (c.nodeType === 1) {
        a.push(Element.extend(c))
      }
      c = c.nextSibling
    }
    return a
  },
  previousSiblings: function(a, b) {
    return Element.recursivelyCollect(a, "previousSibling")
  },
  nextSiblings: function(a) {
    return Element.recursivelyCollect(a, "nextSibling")
  },
  siblings: function(a) {
    a = $(a);
    return Element.previousSiblings(a).reverse().concat(Element.nextSiblings(a))
  },
  match: function(b, a) {
    b = $(b);
    if (Object.isString(a)) {
      return Prototype.Selector.match(b, a)
    }
    return a.match(b)
  },
  up: function(b, d, a) {
    b = $(b);
    if (arguments.length == 1) {
      return $(b.parentNode)
    }
    var c = Element.ancestors(b);
    return Object.isNumber(d) ? c[d] : Prototype.Selector.find(c, d, a)
  },
  down: function(b, c, a) {
    b = $(b);
    if (arguments.length == 1) {
      return Element.firstDescendant(b)
    }
    return Object.isNumber(c) ? Element.descendants(b)[c] : Element.select(b, c)[a || 0]
  },
  previous: function(b, c, a) {
    b = $(b);
    if (Object.isNumber(c)) {
      a = c, c = false
    }
    if (!Object.isNumber(a)) {
      a = 0
    }
    if (c) {
      return Prototype.Selector.find(b.previousSiblings(), c, a)
    } else {
      return b.recursivelyCollect("previousSibling", a + 1)[a]
    }
  },
  next: function(b, d, a) {
    b = $(b);
    if (Object.isNumber(d)) {
      a = d, d = false
    }
    if (!Object.isNumber(a)) {
      a = 0
    }
    if (d) {
      return Prototype.Selector.find(b.nextSiblings(), d, a)
    } else {
      var c = Object.isNumber(a) ? a + 1 : 1;
      return b.recursivelyCollect("nextSibling", a + 1)[a]
    }
  },
  select: function(a) {
    a = $(a);
    var b = Array.prototype.slice.call(arguments, 1).join(", ");
    return Prototype.Selector.select(b, a)
  },
  adjacent: function(a) {
    a = $(a);
    var b = Array.prototype.slice.call(arguments, 1).join(", ");
    return Prototype.Selector.select(b, a.parentNode).without(a)
  },
  identify: function(a) {
    a = $(a);
    var b = Element.readAttribute(a, "id");
    if (b) {
      return b
    }
    do {
      b = "anonymous_element_" + Element.idCounter++
    } while ($(b));
    Element.writeAttribute(a, "id", b);
    return b
  },
  readAttribute: function(c, a) {
    c = $(c);
    if (Prototype.Browser.IE) {
      var b = Element._attributeTranslations.read;
      if (b.values[a]) {
        return b.values[a](c, a)
      }
      if (b.names[a]) {
        a = b.names[a]
      }
      if (a.include(":")) {
        return (!c.attributes || !c.attributes[a]) ? null : c.attributes[a].value
      }
    }
    return c.getAttribute(a)
  },
  writeAttribute: function(e, c, f) {
    e = $(e);
    var b = {},
      d = Element._attributeTranslations.write;
    if (typeof c == "object") {
      b = c
    } else {
      b[c] = Object.isUndefined(f) ? true : f
    }
    for (var a in b) {
      c = d.names[a] || a;
      f = b[a];
      if (d.values[a]) {
        c = d.values[a](e, f)
      }
      if (f === false || f === null) {
        e.removeAttribute(c)
      } else {
        if (f === true) {
          e.setAttribute(c, c)
        } else {
          e.setAttribute(c, f)
        }
      }
    }
    return e
  },
  getHeight: function(a) {
    return Element.getDimensions(a).height
  },
  getWidth: function(a) {
    return Element.getDimensions(a).width
  },
  classNames: function(a) {
    return new Element.ClassNames(a)
  },
  hasClassName: function(a, b) {
    if (!(a = $(a))) {
      return
    }
    var c = a.className;
    return (c.length > 0 && (c == b || new RegExp("(^|\\s)" + b + "(\\s|$)").test(c)))
  },
  addClassName: function(a, b) {
    if (!(a = $(a))) {
      return
    }
    if (!Element.hasClassName(a, b)) {
      a.className += (a.className ? " " : "") + b
    }
    return a
  },
  removeClassName: function(a, b) {
    if (!(a = $(a))) {
      return
    }
    a.className = a.className.replace(new RegExp("(^|\\s+)" + b + "(\\s+|$)"), " ").strip();
    return a
  },
  toggleClassName: function(a, b) {
    if (!(a = $(a))) {
      return
    }
    return Element[Element.hasClassName(a, b) ? "removeClassName" : "addClassName"](a, b)
  },
  cleanWhitespace: function(b) {
    b = $(b);
    var c = b.firstChild;
    while (c) {
      var a = c.nextSibling;
      if (c.nodeType == 3 && !/\S/.test(c.nodeValue)) {
        b.removeChild(c)
      }
      c = a
    }
    return b
  },
  empty: function(a) {
    return $(a).innerHTML.blank()
  },
  descendantOf: function(b, a) {
    b = $(b), a = $(a);
    if (b.compareDocumentPosition) {
      return (b.compareDocumentPosition(a) & 8) === 8
    }
    if (a.contains) {
      return a.contains(b) && a !== b
    }
    while (b = b.parentNode) {
      if (b == a) {
        return true
      }
    }
    return false
  },
  scrollTo: function(a) {
    a = $(a);
    var b = Element.cumulativeOffset(a);
    window.scrollTo(b[0], b[1]);
    return a
  },
  getStyle: function(b, c) {
    b = $(b);
    c = c == "float" ? "cssFloat" : c.camelize();
    var d = b.style[c];
    if (!d || d == "auto") {
      var a = document.defaultView.getComputedStyle(b, null);
      d = a ? a[c] : null
    }
    if (c == "opacity") {
      return d ? parseFloat(d) : 1
    }
    return d == "auto" ? null : d
  },
  getOpacity: function(a) {
    return $(a).getStyle("opacity")
  },
  setStyle: function(b, c) {
    b = $(b);
    var e = b.style,
      a;
    if (Object.isString(c)) {
      b.style.cssText += ";" + c;
      return c.include("opacity") ? b.setOpacity(c.match(/opacity:\s*(\d?\.?\d*)/)[1]) : b
    }
    for (var d in c) {
      if (d == "opacity") {
        b.setOpacity(c[d])
      } else {
        e[(d == "float" || d == "cssFloat") ? (Object.isUndefined(e.styleFloat) ? "cssFloat" : "styleFloat") : d] = c[d]
      }
    }
    return b
  },
  setOpacity: function(a, b) {
    a = $(a);
    a.style.opacity = (b == 1 || b === "") ? "" : (b < 0.00001) ? 0 : b;
    return a
  },
  makePositioned: function(a) {
    a = $(a);
    var b = Element.getStyle(a, "position");
    if (b == "static" || !b) {
      a._madePositioned = true;
      a.style.position = "relative";
      if (Prototype.Browser.Opera) {
        a.style.top = 0;
        a.style.left = 0
      }
    }
    return a
  },
  undoPositioned: function(a) {
    a = $(a);
    if (a._madePositioned) {
      a._madePositioned = undefined;
      a.style.position = a.style.top = a.style.left = a.style.bottom = a.style.right = ""
    }
    return a
  },
  makeClipping: function(a) {
    a = $(a);
    if (a._overflow) {
      return a
    }
    a._overflow = Element.getStyle(a, "overflow") || "auto";
    if (a._overflow !== "hidden") {
      a.style.overflow = "hidden"
    }
    return a
  },
  undoClipping: function(a) {
    a = $(a);
    if (!a._overflow) {
      return a
    }
    a.style.overflow = a._overflow == "auto" ? "" : a._overflow;
    a._overflow = null;
    return a
  },
  clonePosition: function(b, d) {
    var a = Object.extend({
      setLeft: true,
      setTop: true,
      setWidth: true,
      setHeight: true,
      offsetTop: 0,
      offsetLeft: 0
    }, arguments[2] || {});
    d = $(d);
    var e = Element.viewportOffset(d),
      f = [0, 0],
      c = null;
    b = $(b);
    if (Element.getStyle(b, "position") == "absolute") {
      c = Element.getOffsetParent(b);
      f = Element.viewportOffset(c)
    }
    if (c == document.body) {
      f[0] -= document.body.offsetLeft;
      f[1] -= document.body.offsetTop
    }
    if (a.setLeft) {
      b.style.left = (e[0] - f[0] + a.offsetLeft) + "px"
    }
    if (a.setTop) {
      b.style.top = (e[1] - f[1] + a.offsetTop) + "px"
    }
    if (a.setWidth) {
      b.style.width = d.offsetWidth + "px"
    }
    if (a.setHeight) {
      b.style.height = d.offsetHeight + "px"
    }
    return b
  }
};
Object.extend(Element.Methods, {
  getElementsBySelector: Element.Methods.select,
  childElements: Element.Methods.immediateDescendants
});
Element._attributeTranslations = {
  write: {
    names: {
      className: "class",
      htmlFor: "for"
    },
    values: {}
  }
};
if (Prototype.Browser.Opera) {
  Element.Methods.getStyle = Element.Methods.getStyle.wrap(function(d, b, c) {
    switch (c) {
      case "height":
      case "width":
        if (!Element.visible(b)) {
          return null
        }
        var e = parseInt(d(b, c), 10);
        if (e !== b["offset" + c.capitalize()]) {
          return e + "px"
        }
        var a;
        if (c === "height") {
          a = ["border-top-width", "padding-top", "padding-bottom", "border-bottom-width"]
        } else {
          a = ["border-left-width", "padding-left", "padding-right", "border-right-width"]
        }
        return a.inject(e, function(f, g) {
          var h = d(b, g);
          return h === null ? f : f - parseInt(h, 10)
        }) + "px";
      default:
        return d(b, c)
    }
  });
  Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(function(c, a, b) {
    if (b === "title") {
      return a.title
    }
    return c(a, b)
  })
} else {
  if (Prototype.Browser.IE) {
    Element.Methods.getStyle = function(a, b) {
      a = $(a);
      b = (b == "float" || b == "cssFloat") ? "styleFloat" : b.camelize();
      var c = a.style[b];
      if (!c && a.currentStyle) {
        c = a.currentStyle[b]
      }
      if (b == "opacity") {
        if (c = (a.getStyle("filter") || "").match(/alpha\(opacity=(.*)\)/)) {
          if (c[1]) {
            return parseFloat(c[1]) / 100
          }
        }
        return 1
      }
      if (c == "auto") {
        if ((b == "width" || b == "height") && (a.getStyle("display") != "none")) {
          return a["offset" + b.capitalize()] + "px"
        }
        return null
      }
      return c
    };
    Element.Methods.setOpacity = function(b, e) {
      function f(g) {
        return g.replace(/alpha\([^\)]*\)/gi, "")
      }
      b = $(b);
      var a = b.currentStyle;
      if ((a && !a.hasLayout) || (!a && b.style.zoom == "normal")) {
        b.style.zoom = 1
      }
      var d = b.getStyle("filter"),
        c = b.style;
      if (e == 1 || e === "") {
        (d = f(d)) ? c.filter = d: c.removeAttribute("filter");
        return b
      } else {
        if (e < 0.00001) {
          e = 0
        }
      }
      c.filter = f(d) + "alpha(opacity=" + (e * 100) + ")";
      return b
    };
    Element._attributeTranslations = (function() {
      var b = "className",
        a = "for",
        c = document.createElement("div");
      c.setAttribute(b, "x");
      if (c.className !== "x") {
        c.setAttribute("class", "x");
        if (c.className === "x") {
          b = "class"
        }
      }
      c = null;
      c = document.createElement("label");
      c.setAttribute(a, "x");
      if (c.htmlFor !== "x") {
        c.setAttribute("htmlFor", "x");
        if (c.htmlFor === "x") {
          a = "htmlFor"
        }
      }
      c = null;
      return {
        read: {
          names: {
            "class": b,
            className: b,
            "for": a,
            htmlFor: a
          },
          values: {
            _getAttr: function(d, e) {
              return d.getAttribute(e)
            },
            _getAttr2: function(d, e) {
              return d.getAttribute(e, 2)
            },
            _getAttrNode: function(d, f) {
              var e = d.getAttributeNode(f);
              return e ? e.value : ""
            },
            _getEv: (function() {
              var d = document.createElement("div"),
                g;
              d.onclick = Prototype.emptyFunction;
              var e = d.getAttribute("onclick");
              if (String(e).indexOf("{") > -1) {
                g = function(f, h) {
                  h = f.getAttribute(h);
                  if (!h) {
                    return null
                  }
                  h = h.toString();
                  h = h.split("{")[1];
                  h = h.split("}")[0];
                  return h.strip()
                }
              } else {
                if (e === "") {
                  g = function(f, h) {
                    h = f.getAttribute(h);
                    if (!h) {
                      return null
                    }
                    return h.strip()
                  }
                }
              }
              d = null;
              return g
            })(),
            _flag: function(d, e) {
              return $(d).hasAttribute(e) ? e : null
            },
            style: function(d) {
              return d.style.cssText.toLowerCase()
            },
            title: function(d) {
              return d.title
            }
          }
        }
      }
    })();
    Element._attributeTranslations.write = {
      names: Object.extend({
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing"
      }, Element._attributeTranslations.read.names),
      values: {
        checked: function(a, b) {
          a.checked = !!b
        },
        style: function(a, b) {
          a.style.cssText = b ? b : ""
        }
      }
    };
    Element._attributeTranslations.has = {};
    $w("colSpan rowSpan vAlign dateTime accessKey tabIndex encType maxLength readOnly longDesc frameBorder").each(function(a) {
      Element._attributeTranslations.write.names[a.toLowerCase()] = a;
      Element._attributeTranslations.has[a.toLowerCase()] = a
    });
    (function(a) {
      Object.extend(a, {
        href: a._getAttr2,
        src: a._getAttr2,
        type: a._getAttr,
        action: a._getAttrNode,
        disabled: a._flag,
        checked: a._flag,
        readonly: a._flag,
        multiple: a._flag,
        onload: a._getEv,
        onunload: a._getEv,
        onclick: a._getEv,
        ondblclick: a._getEv,
        onmousedown: a._getEv,
        onmouseup: a._getEv,
        onmouseover: a._getEv,
        onmousemove: a._getEv,
        onmouseout: a._getEv,
        onfocus: a._getEv,
        onblur: a._getEv,
        onkeypress: a._getEv,
        onkeydown: a._getEv,
        onkeyup: a._getEv,
        onsubmit: a._getEv,
        onreset: a._getEv,
        onselect: a._getEv,
        onchange: a._getEv
      })
    })(Element._attributeTranslations.read.values);
    if (Prototype.BrowserFeatures.ElementExtensions) {
      (function() {
        function a(e) {
          var b = e.getElementsByTagName("*"),
            d = [];
          for (var c = 0, f; f = b[c]; c++) {
            if (f.tagName !== "!") {
              d.push(f)
            }
          }
          return d
        }
        Element.Methods.down = function(c, d, b) {
          c = $(c);
          if (arguments.length == 1) {
            return c.firstDescendant()
          }
          return Object.isNumber(d) ? a(c)[d] : Element.select(c, d)[b || 0]
        }
      })()
    }
  } else {
    if (Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent)) {
      Element.Methods.setOpacity = function(a, b) {
        a = $(a);
        a.style.opacity = (b == 1) ? 0.999999 : (b === "") ? "" : (b < 0.00001) ? 0 : b;
        return a
      }
    } else {
      if (Prototype.Browser.WebKit) {
        Element.Methods.setOpacity = function(a, b) {
          a = $(a);
          a.style.opacity = (b == 1 || b === "") ? "" : (b < 0.00001) ? 0 : b;
          if (b == 1) {
            if (a.tagName.toUpperCase() == "IMG" && a.width) {
              a.width++;
              a.width--
            } else {
              try {
                var d = document.createTextNode(" ");
                a.appendChild(d);
                a.removeChild(d)
              } catch (c) {}
            }
          }
          return a
        }
      }
    }
  }
}
if ("outerHTML" in document.documentElement) {
  Element.Methods.replace = function(c, e) {
    c = $(c);
    if (e && e.toElement) {
      e = e.toElement()
    }
    if (Object.isElement(e)) {
      c.parentNode.replaceChild(e, c);
      return c
    }
    e = Object.toHTML(e);
    var d = c.parentNode,
      b = d.tagName.toUpperCase();
    if (Element._insertionTranslations.tags[b]) {
      var f = c.next(),
        a = Element._getContentFromAnonymousElement(b, e.stripScripts());
      d.removeChild(c);
      if (f) {
        a.each(function(g) {
          d.insertBefore(g, f)
        })
      } else {
        a.each(function(g) {
          d.appendChild(g)
        })
      }
    } else {
      c.outerHTML = e.stripScripts()
    }
    e.evalScripts.bind(e).defer();
    return c
  }
}
Element._returnOffset = function(b, c) {
  var a = [b, c];
  a.left = b;
  a.top = c;
  return a
};
Element._getContentFromAnonymousElement = function(e, d, f) {
  var g = new Element("div"),
    c = Element._insertionTranslations.tags[e];
  var a = false;
  if (c) {
    a = true
  } else {
    if (f) {
      a = true;
      c = ["", "", 0]
    }
  }
  if (a) {
    g.innerHTML = "&nbsp;" + c[0] + d + c[1];
    g.removeChild(g.firstChild);
    for (var b = c[2]; b--;) {
      g = g.firstChild
    }
  } else {
    g.innerHTML = d
  }
  return $A(g.childNodes)
};
Element._insertionTranslations = {
  before: function(a, b) {
    a.parentNode.insertBefore(b, a)
  },
  top: function(a, b) {
    a.insertBefore(b, a.firstChild)
  },
  bottom: function(a, b) {
    a.appendChild(b)
  },
  after: function(a, b) {
    a.parentNode.insertBefore(b, a.nextSibling)
  },
  tags: {
    TABLE: ["<table>", "</table>", 1],
    TBODY: ["<table><tbody>", "</tbody></table>", 2],
    TR: ["<table><tbody><tr>", "</tr></tbody></table>", 3],
    TD: ["<table><tbody><tr><td>", "</td></tr></tbody></table>", 4],
    SELECT: ["<select>", "</select>", 1]
  }
};
(function() {
  var a = Element._insertionTranslations.tags;
  Object.extend(a, {
    THEAD: a.TBODY,
    TFOOT: a.TBODY,
    TH: a.TD
  })
})();
Element.Methods.Simulated = {
  hasAttribute: function(a, c) {
    c = Element._attributeTranslations.has[c] || c;
    var b = $(a).getAttributeNode(c);
    return !!(b && b.specified)
  }
};
Element.Methods.ByTag = {};
Object.extend(Element, Element.Methods);
(function(a) {
  if (!Prototype.BrowserFeatures.ElementExtensions && a.__proto__) {
    window.HTMLElement = {};
    window.HTMLElement.prototype = a.__proto__;
    Prototype.BrowserFeatures.ElementExtensions = true
  }
  a = null
})(document.createElement("div"));
Element.extend = (function() {
  function c(g) {
    if (typeof window.Element != "undefined") {
      var i = window.Element.prototype;
      if (i) {
        var k = "_" + (Math.random() + "").slice(2),
          h = document.createElement(g);
        i[k] = "x";
        var j = (h[k] !== "x");
        delete i[k];
        h = null;
        return j
      }
    }
    return false
  }

  function b(h, g) {
    for (var j in g) {
      var i = g[j];
      if (Object.isFunction(i) && !(j in h)) {
        h[j] = i.methodize()
      }
    }
  }
  var d = c("object");
  if (Prototype.BrowserFeatures.SpecificElementExtensions) {
    if (d) {
      return function(h) {
        if (h && typeof h._extendedByPrototype == "undefined") {
          var g = h.tagName;
          if (g && (/^(?:object|applet|embed)$/i.test(g))) {
            b(h, Element.Methods);
            b(h, Element.Methods.Simulated);
            b(h, Element.Methods.ByTag[g.toUpperCase()])
          }
        }
        return h
      }
    }
    return Prototype.K
  }
  var a = {},
    e = Element.Methods.ByTag;
  var f = Object.extend(function(i) {
    if (!i || typeof i._extendedByPrototype != "undefined" || i.nodeType != 1 || i == window) {
      return i
    }
    var g = Object.clone(a),
      h = i.tagName.toUpperCase();
    if (e[h]) {
      Object.extend(g, e[h])
    }
    b(i, g);
    i._extendedByPrototype = Prototype.emptyFunction;
    return i
  }, {
    refresh: function() {
      if (!Prototype.BrowserFeatures.ElementExtensions) {
        Object.extend(a, Element.Methods);
        Object.extend(a, Element.Methods.Simulated)
      }
    }
  });
  f.refresh();
  return f
})();
if (document.documentElement.hasAttribute) {
  Element.hasAttribute = function(a, b) {
    return a.hasAttribute(b)
  }
} else {
  Element.hasAttribute = Element.Methods.Simulated.hasAttribute
}
Element.addMethods = function(c) {
  var i = Prototype.BrowserFeatures,
    d = Element.Methods.ByTag;
  if (!c) {
    Object.extend(Form, Form.Methods);
    Object.extend(Form.Element, Form.Element.Methods);
    Object.extend(Element.Methods.ByTag, {
      FORM: Object.clone(Form.Methods),
      INPUT: Object.clone(Form.Element.Methods),
      SELECT: Object.clone(Form.Element.Methods),
      TEXTAREA: Object.clone(Form.Element.Methods),
      BUTTON: Object.clone(Form.Element.Methods)
    })
  }
  if (arguments.length == 2) {
    var b = c;
    c = arguments[1]
  }
  if (!b) {
    Object.extend(Element.Methods, c || {})
  } else {
    if (Object.isArray(b)) {
      b.each(g)
    } else {
      g(b)
    }
  }

  function g(k) {
    k = k.toUpperCase();
    if (!Element.Methods.ByTag[k]) {
      Element.Methods.ByTag[k] = {}
    }
    Object.extend(Element.Methods.ByTag[k], c)
  }

  function a(m, l, k) {
    k = k || false;
    for (var o in m) {
      var n = m[o];
      if (!Object.isFunction(n)) {
        continue
      }
      if (!k || !(o in l)) {
        l[o] = n.methodize()
      }
    }
  }

  function e(n) {
    var k;
    var m = {
      OPTGROUP: "OptGroup",
      TEXTAREA: "TextArea",
      P: "Paragraph",
      FIELDSET: "FieldSet",
      UL: "UList",
      OL: "OList",
      DL: "DList",
      DIR: "Directory",
      H1: "Heading",
      H2: "Heading",
      H3: "Heading",
      H4: "Heading",
      H5: "Heading",
      H6: "Heading",
      Q: "Quote",
      INS: "Mod",
      DEL: "Mod",
      A: "Anchor",
      IMG: "Image",
      CAPTION: "TableCaption",
      COL: "TableCol",
      COLGROUP: "TableCol",
      THEAD: "TableSection",
      TFOOT: "TableSection",
      TBODY: "TableSection",
      TR: "TableRow",
      TH: "TableCell",
      TD: "TableCell",
      FRAMESET: "FrameSet",
      IFRAME: "IFrame"
    };
    if (m[n]) {
      k = "HTML" + m[n] + "Element"
    }
    if (window[k]) {
      return window[k]
    }
    k = "HTML" + n + "Element";
    if (window[k]) {
      return window[k]
    }
    k = "HTML" + n.capitalize() + "Element";
    if (window[k]) {
      return window[k]
    }
    var l = document.createElement(n),
      o = l.__proto__ || l.constructor.prototype;
    l = null;
    return o
  }
  var h = window.HTMLElement ? HTMLElement.prototype : Element.prototype;
  if (i.ElementExtensions) {
    a(Element.Methods, h);
    a(Element.Methods.Simulated, h, true)
  }
  if (i.SpecificElementExtensions) {
    for (var j in Element.Methods.ByTag) {
      var f = e(j);
      if (Object.isUndefined(f)) {
        continue
      }
      a(d[j], f.prototype)
    }
  }
  Object.extend(Element, Element.Methods);
  delete Element.ByTag;
  if (Element.extend.refresh) {
    Element.extend.refresh()
  }
  Element.cache = {}
};
document.viewport = {
  getDimensions: function() {
    return {
      width: this.getWidth(),
      height: this.getHeight()
    }
  },
  getScrollOffsets: function() {
    return Element._returnOffset(window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
  }
};
(function(b) {
  var g = Prototype.Browser,
    e = document,
    c, d = {};

  function a() {
    if (g.WebKit && !e.evaluate) {
      return document
    }
    if (g.Opera && window.parseFloat(window.opera.version()) < 9.5) {
      return document.body
    }
    return document.documentElement
  }

  function f(h) {
    if (!c) {
      c = a()
    }
    d[h] = "client" + h;
    b["get" + h] = function() {
      return c[d[h]]
    };
    return b["get" + h]()
  }
  b.getWidth = f.curry("Width");
  b.getHeight = f.curry("Height")
})(document.viewport);
Element.Storage = {
  UID: 1
};
Element.addMethods({
  getStorage: function(b) {
    if (!(b = $(b))) {
      return
    }
    var a;
    if (b === window) {
      a = 0
    } else {
      if (typeof b._prototypeUID === "undefined") {
        b._prototypeUID = Element.Storage.UID++
      }
      a = b._prototypeUID
    }
    if (!Element.Storage[a]) {
      Element.Storage[a] = $H()
    }
    return Element.Storage[a]
  },
  store: function(b, a, c) {
    if (!(b = $(b))) {
      return
    }
    if (arguments.length === 2) {
      Element.getStorage(b).update(a)
    } else {
      Element.getStorage(b).set(a, c)
    }
    return b
  },
  retrieve: function(c, b, a) {
    if (!(c = $(c))) {
      return
    }
    var e = Element.getStorage(c),
      d = e.get(b);
    if (Object.isUndefined(d)) {
      e.set(b, a);
      d = a
    }
    return d
  },
  clone: function(c, a) {
    if (!(c = $(c))) {
      return
    }
    var e = c.cloneNode(a);
    e._prototypeUID = void 0;
    if (a) {
      var d = Element.select(e, "*"),
        b = d.length;
      while (b--) {
        d[b]._prototypeUID = void 0
      }
    }
    return Element.extend(e)
  },
  purge: function(c) {
    if (!(c = $(c))) {
      return
    }
    var a = Element._purgeElement;
    a(c);
    var d = c.getElementsByTagName("*"),
      b = d.length;
    while (b--) {
      a(d[b])
    }
    return null
  }
});
(function() {
  function h(v) {
    var u = v.match(/^(\d+)%?$/i);
    if (!u) {
      return null
    }
    return (Number(u[1]) / 100)
  }

  function o(F, G, v) {
    var y = null;
    if (Object.isElement(F)) {
      y = F;
      F = y.getStyle(G)
    }
    if (F === null) {
      return null
    }
    if ((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(F)) {
      return window.parseFloat(F)
    }
    var A = F.include("%"),
      w = (v === document.viewport);
    if (/\d/.test(F) && y && y.runtimeStyle && !(A && w)) {
      var u = y.style.left,
        E = y.runtimeStyle.left;
      y.runtimeStyle.left = y.currentStyle.left;
      y.style.left = F || 0;
      F = y.style.pixelLeft;
      y.style.left = u;
      y.runtimeStyle.left = E;
      return F
    }
    if (y && A) {
      v = v || y.parentNode;
      var x = h(F);
      var B = null;
      var z = y.getStyle("position");
      var D = G.include("left") || G.include("right") || G.include("width");
      var C = G.include("top") || G.include("bottom") || G.include("height");
      if (v === document.viewport) {
        if (D) {
          B = document.viewport.getWidth()
        } else {
          if (C) {
            B = document.viewport.getHeight()
          }
        }
      } else {
        if (D) {
          B = $(v).measure("width")
        } else {
          if (C) {
            B = $(v).measure("height")
          }
        }
      }
      return (B === null) ? 0 : B * x
    }
    return 0
  }

  function g(u) {
    if (Object.isString(u) && u.endsWith("px")) {
      return u
    }
    return u + "px"
  }

  function j(v) {
    var u = v;
    while (v && v.parentNode) {
      var w = v.getStyle("display");
      if (w === "none") {
        return false
      }
      v = $(v.parentNode)
    }
    return true
  }
  var d = Prototype.K;
  if ("currentStyle" in document.documentElement) {
    d = function(u) {
      if (!u.currentStyle.hasLayout) {
        u.style.zoom = 1
      }
      return u
    }
  }

  function f(u) {
    if (u.include("border")) {
      u = u + "-width"
    }
    return u.camelize()
  }
  Element.Layout = Class.create(Hash, {
    initialize: function($super, v, u) {
      $super();
      this.element = $(v);
      Element.Layout.PROPERTIES.each(function(w) {
        this._set(w, null)
      }, this);
      if (u) {
        this._preComputing = true;
        this._begin();
        Element.Layout.PROPERTIES.each(this._compute, this);
        this._end();
        this._preComputing = false
      }
    },
    _set: function(v, u) {
      return Hash.prototype.set.call(this, v, u)
    },
    set: function(v, u) {
      throw "Properties of Element.Layout are read-only."
    },
    get: function($super, v) {
      var u = $super(v);
      return u === null ? this._compute(v) : u
    },
    _begin: function() {
      if (this._prepared) {
        return
      }
      var y = this.element;
      if (j(y)) {
        this._prepared = true;
        return
      }
      var A = {
        position: y.style.position || "",
        width: y.style.width || "",
        visibility: y.style.visibility || "",
        display: y.style.display || ""
      };
      y.store("prototype_original_styles", A);
      var B = y.getStyle("position"),
        u = y.getStyle("width");
      if (u === "0px" || u === null) {
        y.style.display = "block";
        u = y.getStyle("width")
      }
      var v = (B === "fixed") ? document.viewport : y.parentNode;
      y.setStyle({
        position: "absolute",
        visibility: "hidden",
        display: "block"
      });
      var w = y.getStyle("width");
      var x;
      if (u && (w === u)) {
        x = o(y, "width", v)
      } else {
        if (B === "absolute" || B === "fixed") {
          x = o(y, "width", v)
        } else {
          var C = y.parentNode,
            z = $(C).getLayout();
          x = z.get("width") - this.get("margin-left") - this.get("border-left") - this.get("padding-left") - this.get("padding-right") - this.get("border-right") - this.get("margin-right")
        }
      }
      y.setStyle({
        width: x + "px"
      });
      this._prepared = true
    },
    _end: function() {
      var v = this.element;
      var u = v.retrieve("prototype_original_styles");
      v.store("prototype_original_styles", null);
      v.setStyle(u);
      this._prepared = false
    },
    _compute: function(v) {
      var u = Element.Layout.COMPUTATIONS;
      if (!(v in u)) {
        throw "Property not found."
      }
      return this._set(v, u[v].call(this, this.element))
    },
    toObject: function() {
      var u = $A(arguments);
      var v = (u.length === 0) ? Element.Layout.PROPERTIES : u.join(" ").split(" ");
      var w = {};
      v.each(function(x) {
        if (!Element.Layout.PROPERTIES.include(x)) {
          return
        }
        var y = this.get(x);
        if (y != null) {
          w[x] = y
        }
      }, this);
      return w
    },
    toHash: function() {
      var u = this.toObject.apply(this, arguments);
      return new Hash(u)
    },
    toCSS: function() {
      var u = $A(arguments);
      var w = (u.length === 0) ? Element.Layout.PROPERTIES : u.join(" ").split(" ");
      var v = {};
      w.each(function(x) {
        if (!Element.Layout.PROPERTIES.include(x)) {
          return
        }
        if (Element.Layout.COMPOSITE_PROPERTIES.include(x)) {
          return
        }
        var y = this.get(x);
        if (y != null) {
          v[f(x)] = y + "px"
        }
      }, this);
      return v
    },
    inspect: function() {
      return "#<Element.Layout>"
    }
  });
  Object.extend(Element.Layout, {
    PROPERTIES: $w("height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height"),
    COMPOSITE_PROPERTIES: $w("padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height"),
    COMPUTATIONS: {
      height: function(w) {
        if (!this._preComputing) {
          this._begin()
        }
        var u = this.get("border-box-height");
        if (u <= 0) {
          if (!this._preComputing) {
            this._end()
          }
          return 0
        }
        var x = this.get("border-top"),
          v = this.get("border-bottom");
        var z = this.get("padding-top"),
          y = this.get("padding-bottom");
        if (!this._preComputing) {
          this._end()
        }
        return u - x - v - z - y
      },
      width: function(w) {
        if (!this._preComputing) {
          this._begin()
        }
        var v = this.get("border-box-width");
        if (v <= 0) {
          if (!this._preComputing) {
            this._end()
          }
          return 0
        }
        var z = this.get("border-left"),
          u = this.get("border-right");
        var x = this.get("padding-left"),
          y = this.get("padding-right");
        if (!this._preComputing) {
          this._end()
        }
        return v - z - u - x - y
      },
      "padding-box-height": function(v) {
        var u = this.get("height"),
          x = this.get("padding-top"),
          w = this.get("padding-bottom");
        return u + x + w
      },
      "padding-box-width": function(u) {
        var v = this.get("width"),
          w = this.get("padding-left"),
          x = this.get("padding-right");
        return v + w + x
      },
      "border-box-height": function(v) {
        if (!this._preComputing) {
          this._begin()
        }
        var u = v.offsetHeight;
        if (!this._preComputing) {
          this._end()
        }
        return u
      },
      "border-box-width": function(u) {
        if (!this._preComputing) {
          this._begin()
        }
        var v = u.offsetWidth;
        if (!this._preComputing) {
          this._end()
        }
        return v
      },
      "margin-box-height": function(v) {
        var u = this.get("border-box-height"),
          w = this.get("margin-top"),
          x = this.get("margin-bottom");
        if (u <= 0) {
          return 0
        }
        return u + w + x
      },
      "margin-box-width": function(w) {
        var v = this.get("border-box-width"),
          x = this.get("margin-left"),
          u = this.get("margin-right");
        if (v <= 0) {
          return 0
        }
        return v + x + u
      },
      top: function(u) {
        var v = u.positionedOffset();
        return v.top
      },
      bottom: function(u) {
        var x = u.positionedOffset(),
          v = u.getOffsetParent(),
          w = v.measure("height");
        var y = this.get("border-box-height");
        return w - y - x.top
      },
      left: function(u) {
        var v = u.positionedOffset();
        return v.left
      },
      right: function(w) {
        var y = w.positionedOffset(),
          x = w.getOffsetParent(),
          u = x.measure("width");
        var v = this.get("border-box-width");
        return u - v - y.left
      },
      "padding-top": function(u) {
        return o(u, "paddingTop")
      },
      "padding-bottom": function(u) {
        return o(u, "paddingBottom")
      },
      "padding-left": function(u) {
        return o(u, "paddingLeft")
      },
      "padding-right": function(u) {
        return o(u, "paddingRight")
      },
      "border-top": function(u) {
        return o(u, "borderTopWidth")
      },
      "border-bottom": function(u) {
        return o(u, "borderBottomWidth")
      },
      "border-left": function(u) {
        return o(u, "borderLeftWidth")
      },
      "border-right": function(u) {
        return o(u, "borderRightWidth")
      },
      "margin-top": function(u) {
        return o(u, "marginTop")
      },
      "margin-bottom": function(u) {
        return o(u, "marginBottom")
      },
      "margin-left": function(u) {
        return o(u, "marginLeft")
      },
      "margin-right": function(u) {
        return o(u, "marginRight")
      }
    }
  });
  if ("getBoundingClientRect" in document.documentElement) {
    Object.extend(Element.Layout.COMPUTATIONS, {
      right: function(v) {
        var w = d(v.getOffsetParent());
        var x = v.getBoundingClientRect(),
          u = w.getBoundingClientRect();
        return (u.right - x.right).round()
      },
      bottom: function(v) {
        var w = d(v.getOffsetParent());
        var x = v.getBoundingClientRect(),
          u = w.getBoundingClientRect();
        return (u.bottom - x.bottom).round()
      }
    })
  }
  Element.Offset = Class.create({
    initialize: function(v, u) {
      this.left = v.round();
      this.top = u.round();
      this[0] = this.left;
      this[1] = this.top
    },
    relativeTo: function(u) {
      return new Element.Offset(this.left - u.left, this.top - u.top)
    },
    inspect: function() {
      return "#<Element.Offset left: #{left} top: #{top}>".interpolate(this)
    },
    toString: function() {
      return "[#{left}, #{top}]".interpolate(this)
    },
    toArray: function() {
      return [this.left, this.top]
    }
  });

  function r(v, u) {
    return new Element.Layout(v, u)
  }

  function b(u, v) {
    return $(u).getLayout().get(v)
  }

  function n(v) {
    v = $(v);
    var z = Element.getStyle(v, "display");
    if (z && z !== "none") {
      return {
        width: v.offsetWidth,
        height: v.offsetHeight
      }
    }
    var w = v.style;
    var u = {
      visibility: w.visibility,
      position: w.position,
      display: w.display
    };
    var y = {
      visibility: "hidden",
      display: "block"
    };
    if (u.position !== "fixed") {
      y.position = "absolute"
    }
    Element.setStyle(v, y);
    var x = {
      width: v.offsetWidth,
      height: v.offsetHeight
    };
    Element.setStyle(v, u);
    return x
  }

  function l(u) {
    u = $(u);
    if (e(u) || c(u) || m(u) || k(u)) {
      return $(document.body)
    }
    var v = (Element.getStyle(u, "display") === "inline");
    if (!v && u.offsetParent) {
      return $(u.offsetParent)
    }
    while ((u = u.parentNode) && u !== document.body) {
      if (Element.getStyle(u, "position") !== "static") {
        return k(u) ? $(document.body) : $(u)
      }
    }
    return $(document.body)
  }

  function t(v) {
    v = $(v);
    var u = 0,
      w = 0;
    if (v.parentNode) {
      do {
        u += v.offsetTop || 0;
        w += v.offsetLeft || 0;
        v = v.offsetParent
      } while (v)
    }
    return new Element.Offset(w, u)
  }

  function p(v) {
    v = $(v);
    var w = v.getLayout();
    var u = 0,
      y = 0;
    do {
      u += v.offsetTop || 0;
      y += v.offsetLeft || 0;
      v = v.offsetParent;
      if (v) {
        if (m(v)) {
          break
        }
        var x = Element.getStyle(v, "position");
        if (x !== "static") {
          break
        }
      }
    } while (v);
    y -= w.get("margin-top");
    u -= w.get("margin-left");
    return new Element.Offset(y, u)
  }

  function a(v) {
    var u = 0,
      w = 0;
    do {
      u += v.scrollTop || 0;
      w += v.scrollLeft || 0;
      v = v.parentNode
    } while (v);
    return new Element.Offset(w, u)
  }

  function s(y) {
    v = $(v);
    var u = 0,
      x = 0,
      w = document.body;
    var v = y;
    do {
      u += v.offsetTop || 0;
      x += v.offsetLeft || 0;
      if (v.offsetParent == w && Element.getStyle(v, "position") == "absolute") {
        break
      }
    } while (v = v.offsetParent);
    v = y;
    do {
      if (v != w) {
        u -= v.scrollTop || 0;
        x -= v.scrollLeft || 0
      }
    } while (v = v.parentNode);
    return new Element.Offset(x, u)
  }

  function q(u) {
    u = $(u);
    if (Element.getStyle(u, "position") === "absolute") {
      return u
    }
    var y = l(u);
    var x = u.viewportOffset(),
      v = y.viewportOffset();
    var z = x.relativeTo(v);
    var w = u.getLayout();
    u.store("prototype_absolutize_original_styles", {
      left: u.getStyle("left"),
      top: u.getStyle("top"),
      width: u.getStyle("width"),
      height: u.getStyle("height")
    });
    u.setStyle({
      position: "absolute",
      top: z.top + "px",
      left: z.left + "px",
      width: w.get("width") + "px",
      height: w.get("height") + "px"
    });
    return u
  }

  function i(v) {
    v = $(v);
    if (Element.getStyle(v, "position") === "relative") {
      return v
    }
    var u = v.retrieve("prototype_absolutize_original_styles");
    if (u) {
      v.setStyle(u)
    }
    return v
  }
  if (Prototype.Browser.IE) {
    l = l.wrap(function(w, v) {
      v = $(v);
      if (e(v) || c(v) || m(v) || k(v)) {
        return $(document.body)
      }
      var u = v.getStyle("position");
      if (u !== "static") {
        return w(v)
      }
      v.setStyle({
        position: "relative"
      });
      var x = w(v);
      v.setStyle({
        position: u
      });
      return x
    });
    p = p.wrap(function(x, v) {
      v = $(v);
      if (!v.parentNode) {
        return new Element.Offset(0, 0)
      }
      var u = v.getStyle("position");
      if (u !== "static") {
        return x(v)
      }
      var w = v.getOffsetParent();
      if (w && w.getStyle("position") === "fixed") {
        d(w)
      }
      v.setStyle({
        position: "relative"
      });
      var y = x(v);
      v.setStyle({
        position: u
      });
      return y
    })
  } else {
    if (Prototype.Browser.Webkit) {
      t = function(v) {
        v = $(v);
        var u = 0,
          w = 0;
        do {
          u += v.offsetTop || 0;
          w += v.offsetLeft || 0;
          if (v.offsetParent == document.body) {
            if (Element.getStyle(v, "position") == "absolute") {
              break
            }
          }
          v = v.offsetParent
        } while (v);
        return new Element.Offset(w, u)
      }
    }
  }
  Element.addMethods({
    getLayout: r,
    measure: b,
    getDimensions: n,
    getOffsetParent: l,
    cumulativeOffset: t,
    positionedOffset: p,
    cumulativeScrollOffset: a,
    viewportOffset: s,
    absolutize: q,
    relativize: i
  });

  function m(u) {
    return u.nodeName.toUpperCase() === "BODY"
  }

  function k(u) {
    return u.nodeName.toUpperCase() === "HTML"
  }

  function e(u) {
    return u.nodeType === Node.DOCUMENT_NODE
  }

  function c(u) {
    return u !== document.body && !Element.descendantOf(u, document.body)
  }
  if ("getBoundingClientRect" in document.documentElement) {
    Element.addMethods({
      viewportOffset: function(u) {
        u = $(u);
        if (c(u)) {
          return new Element.Offset(0, 0)
        }
        var v = u.getBoundingClientRect(),
          w = document.documentElement;
        return new Element.Offset(v.left - w.clientLeft, v.top - w.clientTop)
      }
    })
  }
})();
window.$$ = function() {
  var a = $A(arguments).join(", ");
  return Prototype.Selector.select(a, document)
};
Prototype.Selector = (function() {
  function a() {
    throw new Error('Method "Prototype.Selector.select" must be defined.')
  }

  function c() {
    throw new Error('Method "Prototype.Selector.match" must be defined.')
  }

  function d(l, m, h) {
    h = h || 0;
    var g = Prototype.Selector.match,
      k = l.length,
      f = 0,
      j;
    for (j = 0; j < k; j++) {
      if (g(l[j], m) && h == f++) {
        return Element.extend(l[j])
      }
    }
  }

  function e(h) {
    for (var f = 0, g = h.length; f < g; f++) {
      Element.extend(h[f])
    }
    return h
  }
  var b = Prototype.K;
  return {
    select: a,
    match: c,
    find: d,
    extendElements: (Element.extend === b) ? b : e,
    extendElement: Element.extend
  }
})();
Prototype._original_property = window.Sizzle;
/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function() {
  var q = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
    j = 0,
    d = Object.prototype.toString,
    o = false,
    i = true;
  [0, 0].sort(function() {
    i = false;
    return 0
  });
  var b = function(E, u, B, w) {
    B = B || [];
    var e = u = u || document;
    if (u.nodeType !== 1 && u.nodeType !== 9) {
      return []
    }
    if (!E || typeof E !== "string") {
      return B
    }
    var C = [],
      D, z, I, H, A, t, s = true,
      x = p(u),
      G = E;
    while ((q.exec(""), D = q.exec(G)) !== null) {
      G = D[3];
      C.push(D[1]);
      if (D[2]) {
        t = D[3];
        break
      }
    }
    if (C.length > 1 && k.exec(E)) {
      if (C.length === 2 && f.relative[C[0]]) {
        z = g(C[0] + C[1], u)
      } else {
        z = f.relative[C[0]] ? [u] : b(C.shift(), u);
        while (C.length) {
          E = C.shift();
          if (f.relative[E]) {
            E += C.shift()
          }
          z = g(E, z)
        }
      }
    } else {
      if (!w && C.length > 1 && u.nodeType === 9 && !x && f.match.ID.test(C[0]) && !f.match.ID.test(C[C.length - 1])) {
        var J = b.find(C.shift(), u, x);
        u = J.expr ? b.filter(J.expr, J.set)[0] : J.set[0]
      }
      if (u) {
        var J = w ? {
          expr: C.pop(),
          set: a(w)
        } : b.find(C.pop(), C.length === 1 && (C[0] === "~" || C[0] === "+") && u.parentNode ? u.parentNode : u, x);
        z = J.expr ? b.filter(J.expr, J.set) : J.set;
        if (C.length > 0) {
          I = a(z)
        } else {
          s = false
        }
        while (C.length) {
          var v = C.pop(),
            y = v;
          if (!f.relative[v]) {
            v = ""
          } else {
            y = C.pop()
          }
          if (y == null) {
            y = u
          }
          f.relative[v](I, y, x)
        }
      } else {
        I = C = []
      }
    }
    if (!I) {
      I = z
    }
    if (!I) {
      throw "Syntax error, unrecognized expression: " + (v || E)
    }
    if (d.call(I) === "[object Array]") {
      if (!s) {
        B.push.apply(B, I)
      } else {
        if (u && u.nodeType === 1) {
          for (var F = 0; I[F] != null; F++) {
            if (I[F] && (I[F] === true || I[F].nodeType === 1 && h(u, I[F]))) {
              B.push(z[F])
            }
          }
        } else {
          for (var F = 0; I[F] != null; F++) {
            if (I[F] && I[F].nodeType === 1) {
              B.push(z[F])
            }
          }
        }
      }
    } else {
      a(I, B)
    }
    if (t) {
      b(t, e, B, w);
      b.uniqueSort(B)
    }
    return B
  };
  b.uniqueSort = function(s) {
    if (c) {
      o = i;
      s.sort(c);
      if (o) {
        for (var e = 1; e < s.length; e++) {
          if (s[e] === s[e - 1]) {
            s.splice(e--, 1)
          }
        }
      }
    }
    return s
  };
  b.matches = function(e, s) {
    return b(e, null, null, s)
  };
  b.find = function(y, e, z) {
    var x, v;
    if (!y) {
      return []
    }
    for (var u = 0, t = f.order.length; u < t; u++) {
      var w = f.order[u],
        v;
      if ((v = f.leftMatch[w].exec(y))) {
        var s = v[1];
        v.splice(1, 1);
        if (s.substr(s.length - 1) !== "\\") {
          v[1] = (v[1] || "").replace(/\\/g, "");
          x = f.find[w](v, e, z);
          if (x != null) {
            y = y.replace(f.match[w], "");
            break
          }
        }
      }
    }
    if (!x) {
      x = e.getElementsByTagName("*")
    }
    return {
      set: x,
      expr: y
    }
  };
  b.filter = function(B, A, E, u) {
    var t = B,
      G = [],
      y = A,
      w, e, x = A && A[0] && p(A[0]);
    while (B && A.length) {
      for (var z in f.filter) {
        if ((w = f.match[z].exec(B)) != null) {
          var s = f.filter[z],
            F, D;
          e = false;
          if (y == G) {
            G = []
          }
          if (f.preFilter[z]) {
            w = f.preFilter[z](w, y, E, G, u, x);
            if (!w) {
              e = F = true
            } else {
              if (w === true) {
                continue
              }
            }
          }
          if (w) {
            for (var v = 0;
              (D = y[v]) != null; v++) {
              if (D) {
                F = s(D, w, v, y);
                var C = u ^ !!F;
                if (E && F != null) {
                  if (C) {
                    e = true
                  } else {
                    y[v] = false
                  }
                } else {
                  if (C) {
                    G.push(D);
                    e = true
                  }
                }
              }
            }
          }
          if (F !== undefined) {
            if (!E) {
              y = G
            }
            B = B.replace(f.match[z], "");
            if (!e) {
              return []
            }
            break
          }
        }
      }
      if (B == t) {
        if (e == null) {
          throw "Syntax error, unrecognized expression: " + B
        } else {
          break
        }
      }
      t = B
    }
    return y
  };
  var f = b.selectors = {
    order: ["ID", "NAME", "TAG"],
    match: {
      ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
      CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
      NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
      ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
      TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
      CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
      POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
      PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
    },
    leftMatch: {},
    attrMap: {
      "class": "className",
      "for": "htmlFor"
    },
    attrHandle: {
      href: function(e) {
        return e.getAttribute("href")
      }
    },
    relative: {
      "+": function(y, e, x) {
        var v = typeof e === "string",
          z = v && !/\W/.test(e),
          w = v && !z;
        if (z && !x) {
          e = e.toUpperCase()
        }
        for (var u = 0, t = y.length, s; u < t; u++) {
          if ((s = y[u])) {
            while ((s = s.previousSibling) && s.nodeType !== 1) {}
            y[u] = w || s && s.nodeName === e ? s || false : s === e
          }
        }
        if (w) {
          b.filter(e, y, true)
        }
      },
      ">": function(x, s, y) {
        var v = typeof s === "string";
        if (v && !/\W/.test(s)) {
          s = y ? s : s.toUpperCase();
          for (var t = 0, e = x.length; t < e; t++) {
            var w = x[t];
            if (w) {
              var u = w.parentNode;
              x[t] = u.nodeName === s ? u : false
            }
          }
        } else {
          for (var t = 0, e = x.length; t < e; t++) {
            var w = x[t];
            if (w) {
              x[t] = v ? w.parentNode : w.parentNode === s
            }
          }
          if (v) {
            b.filter(s, x, true)
          }
        }
      },
      "": function(u, s, w) {
        var t = j++,
          e = r;
        if (!/\W/.test(s)) {
          var v = s = w ? s : s.toUpperCase();
          e = n
        }
        e("parentNode", s, t, u, v, w)
      },
      "~": function(u, s, w) {
        var t = j++,
          e = r;
        if (typeof s === "string" && !/\W/.test(s)) {
          var v = s = w ? s : s.toUpperCase();
          e = n
        }
        e("previousSibling", s, t, u, v, w)
      }
    },
    find: {
      ID: function(s, t, u) {
        if (typeof t.getElementById !== "undefined" && !u) {
          var e = t.getElementById(s[1]);
          return e ? [e] : []
        }
      },
      NAME: function(t, w, x) {
        if (typeof w.getElementsByName !== "undefined") {
          var s = [],
            v = w.getElementsByName(t[1]);
          for (var u = 0, e = v.length; u < e; u++) {
            if (v[u].getAttribute("name") === t[1]) {
              s.push(v[u])
            }
          }
          return s.length === 0 ? null : s
        }
      },
      TAG: function(e, s) {
        return s.getElementsByTagName(e[1])
      }
    },
    preFilter: {
      CLASS: function(u, s, t, e, x, y) {
        u = " " + u[1].replace(/\\/g, "") + " ";
        if (y) {
          return u
        }
        for (var v = 0, w;
          (w = s[v]) != null; v++) {
          if (w) {
            if (x ^ (w.className && (" " + w.className + " ").indexOf(u) >= 0)) {
              if (!t) {
                e.push(w)
              }
            } else {
              if (t) {
                s[v] = false
              }
            }
          }
        }
        return false
      },
      ID: function(e) {
        return e[1].replace(/\\/g, "")
      },
      TAG: function(s, e) {
        for (var t = 0; e[t] === false; t++) {}
        return e[t] && p(e[t]) ? s[1] : s[1].toUpperCase()
      },
      CHILD: function(e) {
        if (e[1] == "nth") {
          var s = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2] == "even" && "2n" || e[2] == "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
          e[2] = (s[1] + (s[2] || 1)) - 0;
          e[3] = s[3] - 0
        }
        e[0] = j++;
        return e
      },
      ATTR: function(v, s, t, e, w, x) {
        var u = v[1].replace(/\\/g, "");
        if (!x && f.attrMap[u]) {
          v[1] = f.attrMap[u]
        }
        if (v[2] === "~=") {
          v[4] = " " + v[4] + " "
        }
        return v
      },
      PSEUDO: function(v, s, t, e, w) {
        if (v[1] === "not") {
          if ((q.exec(v[3]) || "").length > 1 || /^\w/.test(v[3])) {
            v[3] = b(v[3], null, null, s)
          } else {
            var u = b.filter(v[3], s, t, true ^ w);
            if (!t) {
              e.push.apply(e, u)
            }
            return false
          }
        } else {
          if (f.match.POS.test(v[0]) || f.match.CHILD.test(v[0])) {
            return true
          }
        }
        return v
      },
      POS: function(e) {
        e.unshift(true);
        return e
      }
    },
    filters: {
      enabled: function(e) {
        return e.disabled === false && e.type !== "hidden"
      },
      disabled: function(e) {
        return e.disabled === true
      },
      checked: function(e) {
        return e.checked === true
      },
      selected: function(e) {
        e.parentNode.selectedIndex;
        return e.selected === true
      },
      parent: function(e) {
        return !!e.firstChild
      },
      empty: function(e) {
        return !e.firstChild
      },
      has: function(t, s, e) {
        return !!b(e[3], t).length
      },
      header: function(e) {
        return /h\d/i.test(e.nodeName)
      },
      text: function(e) {
        return "text" === e.type
      },
      radio: function(e) {
        return "radio" === e.type
      },
      checkbox: function(e) {
        return "checkbox" === e.type
      },
      file: function(e) {
        return "file" === e.type
      },
      password: function(e) {
        return "password" === e.type
      },
      submit: function(e) {
        return "submit" === e.type
      },
      image: function(e) {
        return "image" === e.type
      },
      reset: function(e) {
        return "reset" === e.type
      },
      button: function(e) {
        return "button" === e.type || e.nodeName.toUpperCase() === "BUTTON"
      },
      input: function(e) {
        return /input|select|textarea|button/i.test(e.nodeName)
      }
    },
    setFilters: {
      first: function(s, e) {
        return e === 0
      },
      last: function(t, s, e, u) {
        return s === u.length - 1
      },
      even: function(s, e) {
        return e % 2 === 0
      },
      odd: function(s, e) {
        return e % 2 === 1
      },
      lt: function(t, s, e) {
        return s < e[3] - 0
      },
      gt: function(t, s, e) {
        return s > e[3] - 0
      },
      nth: function(t, s, e) {
        return e[3] - 0 == s
      },
      eq: function(t, s, e) {
        return e[3] - 0 == s
      }
    },
    filter: {
      PSEUDO: function(x, t, u, y) {
        var s = t[1],
          v = f.filters[s];
        if (v) {
          return v(x, u, t, y)
        } else {
          if (s === "contains") {
            return (x.textContent || x.innerText || "").indexOf(t[3]) >= 0
          } else {
            if (s === "not") {
              var w = t[3];
              for (var u = 0, e = w.length; u < e; u++) {
                if (w[u] === x) {
                  return false
                }
              }
              return true
            }
          }
        }
      },
      CHILD: function(e, u) {
        var x = u[1],
          s = e;
        switch (x) {
          case "only":
          case "first":
            while ((s = s.previousSibling)) {
              if (s.nodeType === 1) {
                return false
              }
            }
            if (x == "first") {
              return true
            }
            s = e;
          case "last":
            while ((s = s.nextSibling)) {
              if (s.nodeType === 1) {
                return false
              }
            }
            return true;
          case "nth":
            var t = u[2],
              A = u[3];
            if (t == 1 && A == 0) {
              return true
            }
            var w = u[0],
              z = e.parentNode;
            if (z && (z.sizcache !== w || !e.nodeIndex)) {
              var v = 0;
              for (s = z.firstChild; s; s = s.nextSibling) {
                if (s.nodeType === 1) {
                  s.nodeIndex = ++v
                }
              }
              z.sizcache = w
            }
            var y = e.nodeIndex - A;
            if (t == 0) {
              return y == 0
            } else {
              return (y % t == 0 && y / t >= 0)
            }
        }
      },
      ID: function(s, e) {
        return s.nodeType === 1 && s.getAttribute("id") === e
      },
      TAG: function(s, e) {
        return (e === "*" && s.nodeType === 1) || s.nodeName === e
      },
      CLASS: function(s, e) {
        return (" " + (s.className || s.getAttribute("class")) + " ").indexOf(e) > -1
      },
      ATTR: function(w, u) {
        var t = u[1],
          e = f.attrHandle[t] ? f.attrHandle[t](w) : w[t] != null ? w[t] : w.getAttribute(t),
          x = e + "",
          v = u[2],
          s = u[4];
        return e == null ? v === "!=" : v === "=" ? x === s : v === "*=" ? x.indexOf(s) >= 0 : v === "~=" ? (" " + x + " ").indexOf(s) >= 0 : !s ? x && e !== false : v === "!=" ? x != s : v === "^=" ? x.indexOf(s) === 0 : v === "$=" ? x.substr(x.length - s.length) === s : v === "|=" ? x === s || x.substr(0, s.length + 1) === s + "-" : false
      },
      POS: function(v, s, t, w) {
        var e = s[2],
          u = f.setFilters[e];
        if (u) {
          return u(v, t, s, w)
        }
      }
    }
  };
  var k = f.match.POS;
  for (var m in f.match) {
    f.match[m] = new RegExp(f.match[m].source + /(?![^\[]*\])(?![^\(]*\))/.source);
    f.leftMatch[m] = new RegExp(/(^(?:.|\r|\n)*?)/.source + f.match[m].source)
  }
  var a = function(s, e) {
    s = Array.prototype.slice.call(s, 0);
    if (e) {
      e.push.apply(e, s);
      return e
    }
    return s
  };
  try {
    Array.prototype.slice.call(document.documentElement.childNodes, 0)
  } catch (l) {
    a = function(v, u) {
      var s = u || [];
      if (d.call(v) === "[object Array]") {
        Array.prototype.push.apply(s, v)
      } else {
        if (typeof v.length === "number") {
          for (var t = 0, e = v.length; t < e; t++) {
            s.push(v[t])
          }
        } else {
          for (var t = 0; v[t]; t++) {
            s.push(v[t])
          }
        }
      }
      return s
    }
  }
  var c;
  if (document.documentElement.compareDocumentPosition) {
    c = function(s, e) {
      if (!s.compareDocumentPosition || !e.compareDocumentPosition) {
        if (s == e) {
          o = true
        }
        return 0
      }
      var t = s.compareDocumentPosition(e) & 4 ? -1 : s === e ? 0 : 1;
      if (t === 0) {
        o = true
      }
      return t
    }
  } else {
    if ("sourceIndex" in document.documentElement) {
      c = function(s, e) {
        if (!s.sourceIndex || !e.sourceIndex) {
          if (s == e) {
            o = true
          }
          return 0
        }
        var t = s.sourceIndex - e.sourceIndex;
        if (t === 0) {
          o = true
        }
        return t
      }
    } else {
      if (document.createRange) {
        c = function(u, s) {
          if (!u.ownerDocument || !s.ownerDocument) {
            if (u == s) {
              o = true
            }
            return 0
          }
          var t = u.ownerDocument.createRange(),
            e = s.ownerDocument.createRange();
          t.setStart(u, 0);
          t.setEnd(u, 0);
          e.setStart(s, 0);
          e.setEnd(s, 0);
          var v = t.compareBoundaryPoints(Range.START_TO_END, e);
          if (v === 0) {
            o = true
          }
          return v
        }
      }
    }
  }(function() {
    var s = document.createElement("div"),
      t = "script" + (new Date).getTime();
    s.innerHTML = "<a name='" + t + "'/>";
    var e = document.documentElement;
    e.insertBefore(s, e.firstChild);
    if (!!document.getElementById(t)) {
      f.find.ID = function(v, w, x) {
        if (typeof w.getElementById !== "undefined" && !x) {
          var u = w.getElementById(v[1]);
          return u ? u.id === v[1] || typeof u.getAttributeNode !== "undefined" && u.getAttributeNode("id").nodeValue === v[1] ? [u] : undefined : []
        }
      };
      f.filter.ID = function(w, u) {
        var v = typeof w.getAttributeNode !== "undefined" && w.getAttributeNode("id");
        return w.nodeType === 1 && v && v.nodeValue === u
      }
    }
    e.removeChild(s);
    e = s = null
  })();
  (function() {
    var e = document.createElement("div");
    e.appendChild(document.createComment(""));
    if (e.getElementsByTagName("*").length > 0) {
      f.find.TAG = function(s, w) {
        var v = w.getElementsByTagName(s[1]);
        if (s[1] === "*") {
          var u = [];
          for (var t = 0; v[t]; t++) {
            if (v[t].nodeType === 1) {
              u.push(v[t])
            }
          }
          v = u
        }
        return v
      }
    }
    e.innerHTML = "<a href='#'></a>";
    if (e.firstChild && typeof e.firstChild.getAttribute !== "undefined" && e.firstChild.getAttribute("href") !== "#") {
      f.attrHandle.href = function(s) {
        return s.getAttribute("href", 2)
      }
    }
    e = null
  })();
  if (document.querySelectorAll) {
    (function() {
      var e = b,
        t = document.createElement("div");
      t.innerHTML = "<p class='TEST'></p>";
      if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) {
        return
      }
      b = function(x, w, u, v) {
        w = w || document;
        if (!v && w.nodeType === 9 && !p(w)) {
          try {
            return a(w.querySelectorAll(x), u)
          } catch (y) {}
        }
        return e(x, w, u, v)
      };
      for (var s in e) {
        b[s] = e[s]
      }
      t = null
    })()
  }
  if (document.getElementsByClassName && document.documentElement.getElementsByClassName) {
    (function() {
      var e = document.createElement("div");
      e.innerHTML = "<div class='test e'></div><div class='test'></div>";
      if (e.getElementsByClassName("e").length === 0) {
        return
      }
      e.lastChild.className = "e";
      if (e.getElementsByClassName("e").length === 1) {
        return
      }
      f.order.splice(1, 0, "CLASS");
      f.find.CLASS = function(s, t, u) {
        if (typeof t.getElementsByClassName !== "undefined" && !u) {
          return t.getElementsByClassName(s[1])
        }
      };
      e = null
    })()
  }

  function n(s, x, w, B, y, A) {
    var z = s == "previousSibling" && !A;
    for (var u = 0, t = B.length; u < t; u++) {
      var e = B[u];
      if (e) {
        if (z && e.nodeType === 1) {
          e.sizcache = w;
          e.sizset = u
        }
        e = e[s];
        var v = false;
        while (e) {
          if (e.sizcache === w) {
            v = B[e.sizset];
            break
          }
          if (e.nodeType === 1 && !A) {
            e.sizcache = w;
            e.sizset = u
          }
          if (e.nodeName === x) {
            v = e;
            break
          }
          e = e[s]
        }
        B[u] = v
      }
    }
  }

  function r(s, x, w, B, y, A) {
    var z = s == "previousSibling" && !A;
    for (var u = 0, t = B.length; u < t; u++) {
      var e = B[u];
      if (e) {
        if (z && e.nodeType === 1) {
          e.sizcache = w;
          e.sizset = u
        }
        e = e[s];
        var v = false;
        while (e) {
          if (e.sizcache === w) {
            v = B[e.sizset];
            break
          }
          if (e.nodeType === 1) {
            if (!A) {
              e.sizcache = w;
              e.sizset = u
            }
            if (typeof x !== "string") {
              if (e === x) {
                v = true;
                break
              }
            } else {
              if (b.filter(x, [e]).length > 0) {
                v = e;
                break
              }
            }
          }
          e = e[s]
        }
        B[u] = v
      }
    }
  }
  var h = document.compareDocumentPosition ? function(s, e) {
    return s.compareDocumentPosition(e) & 16
  } : function(s, e) {
    return s !== e && (s.contains ? s.contains(e) : true)
  };
  var p = function(e) {
    return e.nodeType === 9 && e.documentElement.nodeName !== "HTML" || !!e.ownerDocument && e.ownerDocument.documentElement.nodeName !== "HTML"
  };
  var g = function(e, y) {
    var u = [],
      v = "",
      w, t = y.nodeType ? [y] : y;
    while ((w = f.match.PSEUDO.exec(e))) {
      v += w[0];
      e = e.replace(f.match.PSEUDO, "")
    }
    e = f.relative[e] ? e + "*" : e;
    for (var x = 0, s = t.length; x < s; x++) {
      b(e, t[x], u)
    }
    return b.filter(v, u)
  };
  window.Sizzle = b
})();
(function(c) {
  var d = Prototype.Selector.extendElements;

  function a(e, f) {
    return d(c(e, f || document))
  }

  function b(f, e) {
    return c.matches(e, [f]).length == 1
  }
  Prototype.Selector.engine = c;
  Prototype.Selector.select = a;
  Prototype.Selector.match = b
})(Sizzle);
window.Sizzle = Prototype._original_property;
delete Prototype._original_property;
var Form = {
  reset: function(a) {
    a = $(a);
    a.reset();
    return a
  },
  serializeElements: function(h, d) {
    if (typeof d != "object") {
      d = {
        hash: !!d
      }
    } else {
      if (Object.isUndefined(d.hash)) {
        d.hash = true
      }
    }
    var e, g, a = false,
      f = d.submit,
      b, c;
    if (d.hash) {
      c = {};
      b = function(i, j, k) {
        if (j in i) {
          if (!Object.isArray(i[j])) {
            i[j] = [i[j]]
          }
          i[j].push(k)
        } else {
          i[j] = k
        }
        return i
      }
    } else {
      c = "";
      b = function(i, j, k) {
        return i + (i ? "&" : "") + encodeURIComponent(j) + "=" + encodeURIComponent(k)
      }
    }
    return h.inject(c, function(i, j) {
      if (!j.disabled && j.name) {
        e = j.name;
        g = $(j).getValue();
        if (g != null && j.type != "file" && (j.type != "submit" || (!a && f !== false && (!f || e == f) && (a = true)))) {
          i = b(i, e, g)
        }
      }
      return i
    })
  }
};
Form.Methods = {
  serialize: function(b, a) {
    return Form.serializeElements(Form.getElements(b), a)
  },
  getElements: function(e) {
    var f = $(e).getElementsByTagName("*"),
      d, a = [],
      c = Form.Element.Serializers;
    for (var b = 0; d = f[b]; b++) {
      a.push(d)
    }
    return a.inject([], function(g, h) {
      if (c[h.tagName.toLowerCase()]) {
        g.push(Element.extend(h))
      }
      return g
    })
  },
  getInputs: function(g, c, d) {
    g = $(g);
    var a = g.getElementsByTagName("input");
    if (!c && !d) {
      return $A(a).map(Element.extend)
    }
    for (var e = 0, h = [], f = a.length; e < f; e++) {
      var b = a[e];
      if ((c && b.type != c) || (d && b.name != d)) {
        continue
      }
      h.push(Element.extend(b))
    }
    return h
  },
  disable: function(a) {
    a = $(a);
    Form.getElements(a).invoke("disable");
    return a
  },
  enable: function(a) {
    a = $(a);
    Form.getElements(a).invoke("enable");
    return a
  },
  findFirstElement: function(b) {
    var c = $(b).getElements().findAll(function(d) {
      return "hidden" != d.type && !d.disabled
    });
    var a = c.findAll(function(d) {
      return d.hasAttribute("tabIndex") && d.tabIndex >= 0
    }).sortBy(function(d) {
      return d.tabIndex
    }).first();
    return a ? a : c.find(function(d) {
      return /^(?:input|select|textarea)$/i.test(d.tagName)
    })
  },
  focusFirstElement: function(b) {
    b = $(b);
    var a = b.findFirstElement();
    if (a) {
      a.activate()
    }
    return b
  },
  request: function(b, a) {
    b = $(b), a = Object.clone(a || {});
    var d = a.parameters,
      c = b.readAttribute("action") || "";
    if (c.blank()) {
      c = window.location.href
    }
    a.parameters = b.serialize(true);
    if (d) {
      if (Object.isString(d)) {
        d = d.toQueryParams()
      }
      Object.extend(a.parameters, d)
    }
    if (b.hasAttribute("method") && !a.method) {
      a.method = b.method
    }
    return new Ajax.Request(c, a)
  }
};
Form.Element = {
  focus: function(a) {
    $(a).focus();
    return a
  },
  select: function(a) {
    $(a).select();
    return a
  }
};
Form.Element.Methods = {
  serialize: function(a) {
    a = $(a);
    if (!a.disabled && a.name) {
      var b = a.getValue();
      if (b != undefined) {
        var c = {};
        c[a.name] = b;
        return Object.toQueryString(c)
      }
    }
    return ""
  },
  getValue: function(a) {
    a = $(a);
    var b = a.tagName.toLowerCase();
    return Form.Element.Serializers[b](a)
  },
  setValue: function(a, b) {
    a = $(a);
    var c = a.tagName.toLowerCase();
    Form.Element.Serializers[c](a, b);
    return a
  },
  clear: function(a) {
    $(a).value = "";
    return a
  },
  present: function(a) {
    return $(a).value != ""
  },
  activate: function(a) {
    a = $(a);
    try {
      a.focus();
      if (a.select && (a.tagName.toLowerCase() != "input" || !(/^(?:button|reset|submit)$/i.test(a.type)))) {
        a.select()
      }
    } catch (b) {}
    return a
  },
  disable: function(a) {
    a = $(a);
    a.disabled = true;
    return a
  },
  enable: function(a) {
    a = $(a);
    a.disabled = false;
    return a
  }
};
var Field = Form.Element;
var $F = Form.Element.Methods.getValue;
Form.Element.Serializers = (function() {
  function b(h, i) {
    switch (h.type.toLowerCase()) {
      case "checkbox":
      case "radio":
        return f(h, i);
      default:
        return e(h, i)
    }
  }

  function f(h, i) {
    if (Object.isUndefined(i)) {
      return h.checked ? h.value : null
    } else {
      h.checked = !!i
    }
  }

  function e(h, i) {
    if (Object.isUndefined(i)) {
      return h.value
    } else {
      h.value = i
    }
  }

  function a(k, n) {
    if (Object.isUndefined(n)) {
      return (k.type === "select-one" ? c : d)(k)
    }
    var j, l, o = !Object.isArray(n);
    for (var h = 0, m = k.length; h < m; h++) {
      j = k.options[h];
      l = this.optionValue(j);
      if (o) {
        if (l == n) {
          j.selected = true;
          return
        }
      } else {
        j.selected = n.include(l)
      }
    }
  }

  function c(i) {
    var h = i.selectedIndex;
    return h >= 0 ? g(i.options[h]) : null
  }

  function d(l) {
    var h, m = l.length;
    if (!m) {
      return null
    }
    for (var k = 0, h = []; k < m; k++) {
      var j = l.options[k];
      if (j.selected) {
        h.push(g(j))
      }
    }
    return h
  }

  function g(h) {
    return Element.hasAttribute(h, "value") ? h.value : h.text
  }
  return {
    input: b,
    inputSelector: f,
    textarea: e,
    select: a,
    selectOne: c,
    selectMany: d,
    optionValue: g,
    button: e
  }
})();
Abstract.TimedObserver = Class.create(PeriodicalExecuter, {
  initialize: function($super, a, b, c) {
    $super(c, b);
    this.element = $(a);
    this.lastValue = this.getValue()
  },
  execute: function() {
    var a = this.getValue();
    if (Object.isString(this.lastValue) && Object.isString(a) ? this.lastValue != a : String(this.lastValue) != String(a)) {
      this.callback(this.element, a);
      this.lastValue = a
    }
  }
});
Form.Element.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element)
  }
});
Form.Observer = Class.create(Abstract.TimedObserver, {
  getValue: function() {
    return Form.serialize(this.element)
  }
});
Abstract.EventObserver = Class.create({
  initialize: function(a, b) {
    this.element = $(a);
    this.callback = b;
    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == "form") {
      this.registerFormCallbacks()
    } else {
      this.registerCallback(this.element)
    }
  },
  onElementEvent: function() {
    var a = this.getValue();
    if (this.lastValue != a) {
      this.callback(this.element, a);
      this.lastValue = a
    }
  },
  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback, this)
  },
  registerCallback: function(a) {
    if (a.type) {
      switch (a.type.toLowerCase()) {
        case "checkbox":
        case "radio":
          Event.observe(a, "click", this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(a, "change", this.onElementEvent.bind(this));
          break
      }
    }
  }
});
Form.Element.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.Element.getValue(this.element)
  }
});
Form.EventObserver = Class.create(Abstract.EventObserver, {
  getValue: function() {
    return Form.serialize(this.element)
  }
});
(function() {
  var C = {
    KEY_BACKSPACE: 8,
    KEY_TAB: 9,
    KEY_RETURN: 13,
    KEY_ESC: 27,
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_DELETE: 46,
    KEY_HOME: 36,
    KEY_END: 35,
    KEY_PAGEUP: 33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT: 45,
    cache: {}
  };
  var f = document.documentElement;
  var D = "onmouseenter" in f && "onmouseleave" in f;
  var a = function(E) {
    return false
  };
  if (window.attachEvent) {
    if (window.addEventListener) {
      a = function(E) {
        return !(E instanceof window.Event)
      }
    } else {
      a = function(E) {
        return true
      }
    }
  }
  var r;

  function A(F, E) {
    return F.which ? (F.which === E + 1) : (F.button === E)
  }
  var o = {
    0: 1,
    1: 4,
    2: 2
  };

  function y(F, E) {
    return F.button === o[E]
  }

  function B(F, E) {
    switch (E) {
      case 0:
        return F.which == 1 && !F.metaKey;
      case 1:
        return F.which == 2 || (F.which == 1 && F.metaKey);
      case 2:
        return F.which == 3;
      default:
        return false
    }
  }
  if (window.attachEvent) {
    if (!window.addEventListener) {
      r = y
    } else {
      r = function(F, E) {
        return a(F) ? y(F, E) : A(F, E)
      }
    }
  } else {
    if (Prototype.Browser.WebKit) {
      r = B
    } else {
      r = A
    }
  }

  function v(E) {
    return r(E, 0)
  }

  function t(E) {
    return r(E, 1)
  }

  function n(E) {
    return r(E, 2)
  }

  function d(G) {
    G = C.extend(G);
    var F = G.target,
      E = G.type,
      H = G.currentTarget;
    if (H && H.tagName) {
      if (E === "load" || E === "error" || (E === "click" && H.tagName.toLowerCase() === "input" && H.type === "radio")) {
        F = H
      }
    }
    if (F.nodeType == Node.TEXT_NODE) {
      F = F.parentNode
    }
    return Element.extend(F)
  }

  function p(F, G) {
    var E = C.element(F);
    if (!G) {
      return E
    }
    while (E) {
      if (Object.isElement(E) && Prototype.Selector.match(E, G)) {
        return Element.extend(E)
      }
      E = E.parentNode
    }
  }

  function s(E) {
    return {
      x: c(E),
      y: b(E)
    }
  }

  function c(G) {
    var F = document.documentElement,
      E = document.body || {
        scrollLeft: 0
      };
    return G.pageX || (G.clientX + (F.scrollLeft || E.scrollLeft) - (F.clientLeft || 0))
  }

  function b(G) {
    var F = document.documentElement,
      E = document.body || {
        scrollTop: 0
      };
    return G.pageY || (G.clientY + (F.scrollTop || E.scrollTop) - (F.clientTop || 0))
  }

  function q(E) {
    C.extend(E);
    E.preventDefault();
    E.stopPropagation();
    E.stopped = true
  }
  C.Methods = {
    isLeftClick: v,
    isMiddleClick: t,
    isRightClick: n,
    element: d,
    findElement: p,
    pointer: s,
    pointerX: c,
    pointerY: b,
    stop: q
  };
  var x = Object.keys(C.Methods).inject({}, function(E, F) {
    E[F] = C.Methods[F].methodize();
    return E
  });
  if (window.attachEvent) {
    function i(F) {
      var E;
      switch (F.type) {
        case "mouseover":
        case "mouseenter":
          E = F.fromElement;
          break;
        case "mouseout":
        case "mouseleave":
          E = F.toElement;
          break;
        default:
          return null
      }
      return Element.extend(E)
    }
    var u = {
      stopPropagation: function() {
        this.cancelBubble = true
      },
      preventDefault: function() {
        this.returnValue = false
      },
      inspect: function() {
        return "[object Event]"
      }
    };
    C.extend = function(F, E) {
      if (!F) {
        return false
      }
      if (!a(F)) {
        return F
      }
      if (F._extendedByPrototype) {
        return F
      }
      F._extendedByPrototype = Prototype.emptyFunction;
      var G = C.pointer(F);
      Object.extend(F, {
        target: F.srcElement || E,
        relatedTarget: i(F),
        pageX: G.x,
        pageY: G.y
      });
      Object.extend(F, x);
      Object.extend(F, u);
      return F
    }
  } else {
    C.extend = Prototype.K
  }
  if (window.addEventListener) {
    C.prototype = window.Event.prototype || document.createEvent("HTMLEvents").__proto__;
    Object.extend(C.prototype, x)
  }

  function m(I, H, J) {
    var G = Element.retrieve(I, "prototype_event_registry");
    if (Object.isUndefined(G)) {
      e.push(I);
      G = Element.retrieve(I, "prototype_event_registry", $H())
    }
    var E = G.get(H);
    if (Object.isUndefined(E)) {
      E = [];
      G.set(H, E)
    }
    if (E.pluck("handler").include(J)) {
      return false
    }
    var F;
    if (H.include(":")) {
      F = function(K) {
        if (Object.isUndefined(K.eventName)) {
          return false
        }
        if (K.eventName !== H) {
          return false
        }
        C.extend(K, I);
        J.call(I, K)
      }
    } else {
      if (!D && (H === "mouseenter" || H === "mouseleave")) {
        if (H === "mouseenter" || H === "mouseleave") {
          F = function(L) {
            C.extend(L, I);
            var K = L.relatedTarget;
            while (K && K !== I) {
              try {
                K = K.parentNode
              } catch (M) {
                K = I
              }
            }
            if (K === I) {
              return
            }
            J.call(I, L)
          }
        }
      } else {
        F = function(K) {
          C.extend(K, I);
          J.call(I, K)
        }
      }
    }
    F.handler = J;
    E.push(F);
    return F
  }

  function h() {
    for (var E = 0, F = e.length; E < F; E++) {
      C.stopObserving(e[E]);
      e[E] = null
    }
  }
  var e = [];
  if (Prototype.Browser.IE) {
    window.attachEvent("onunload", h)
  }
  if (Prototype.Browser.WebKit) {
    window.addEventListener("unload", Prototype.emptyFunction, false)
  }
  var l = Prototype.K,
    g = {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    };
  if (!D) {
    l = function(E) {
      return (g[E] || E)
    }
  }

  function w(H, G, I) {
    H = $(H);
    var F = m(H, G, I);
    if (!F) {
      return H
    }
    if (G.include(":")) {
      if (H.addEventListener) {
        H.addEventListener("dataavailable", F, false)
      } else {
        H.attachEvent("ondataavailable", F);
        H.attachEvent("onlosecapture", F)
      }
    } else {
      var E = l(G);
      if (H.addEventListener) {
        H.addEventListener(E, F, false)
      } else {
        H.attachEvent("on" + E, F)
      }
    }
    return H
  }

  function k(K, H, L) {
    K = $(K);
    var G = Element.retrieve(K, "prototype_event_registry");
    if (!G) {
      return K
    }
    if (!H) {
      G.each(function(N) {
        var M = N.key;
        k(K, M)
      });
      return K
    }
    var I = G.get(H);
    if (!I) {
      return K
    }
    if (!L) {
      I.each(function(M) {
        k(K, H, M.handler)
      });
      return K
    }
    var J = I.length,
      F;
    while (J--) {
      if (I[J].handler === L) {
        F = I[J];
        break
      }
    }
    if (!F) {
      return K
    }
    if (H.include(":")) {
      if (K.removeEventListener) {
        K.removeEventListener("dataavailable", F, false)
      } else {
        K.detachEvent("ondataavailable", F);
        K.detachEvent("onlosecapture", F)
      }
    } else {
      var E = l(H);
      if (K.removeEventListener) {
        K.removeEventListener(E, F, false)
      } else {
        K.detachEvent("on" + E, F)
      }
    }
    G.set(H, I.without(F));
    return K
  }

  function z(H, G, F, E) {
    H = $(H);
    if (Object.isUndefined(E)) {
      E = true
    }
    if (H == document && document.createEvent && !H.dispatchEvent) {
      H = document.documentElement
    }
    var I;
    if (document.createEvent) {
      I = document.createEvent("HTMLEvents");
      I.initEvent("dataavailable", E, true)
    } else {
      I = document.createEventObject();
      I.eventType = E ? "ondataavailable" : "onlosecapture"
    }
    I.eventName = G;
    I.memo = F || {};
    if (document.createEvent) {
      H.dispatchEvent(I)
    } else {
      H.fireEvent(I.eventType, I)
    }
    return C.extend(I)
  }
  C.Handler = Class.create({
    initialize: function(G, F, E, H) {
      this.element = $(G);
      this.eventName = F;
      this.selector = E;
      this.callback = H;
      this.handler = this.handleEvent.bind(this)
    },
    start: function() {
      C.observe(this.element, this.eventName, this.handler);
      return this
    },
    stop: function() {
      C.stopObserving(this.element, this.eventName, this.handler);
      return this
    },
    handleEvent: function(F) {
      var E = C.findElement(F, this.selector);
      if (E) {
        this.callback.call(this.element, F, E)
      }
    }
  });

  function j(G, F, E, H) {
    G = $(G);
    if (Object.isFunction(E) && Object.isUndefined(H)) {
      H = E, E = null
    }
    return new C.Handler(G, F, E, H).start()
  }
  Object.extend(C, C.Methods);
  Object.extend(C, {
    fire: z,
    observe: w,
    stopObserving: k,
    on: j
  });
  Element.addMethods({
    fire: z,
    observe: w,
    stopObserving: k,
    on: j
  });
  Object.extend(document, {
    fire: z.methodize(),
    observe: w.methodize(),
    stopObserving: k.methodize(),
    on: j.methodize(),
    loaded: false
  });
  if (window.Event) {
    Object.extend(window.Event, C)
  } else {
    window.Event = C
  }
})();
(function() {
  var d;

  function a() {
    if (document.loaded) {
      return
    }
    if (d) {
      window.clearTimeout(d)
    }
    document.loaded = true;
    document.fire("dom:loaded")
  }

  function c() {
    if (document.readyState === "complete") {
      document.stopObserving("readystatechange", c);
      a()
    }
  }

  function b() {
    try {
      document.documentElement.doScroll("left")
    } catch (f) {
      d = b.defer();
      return
    }
    a()
  }
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", a, false)
  } else {
    document.observe("readystatechange", c);
    if (window == top) {
      d = b.defer()
    }
  }
  Event.observe(window, "load", a)
})();
Element.addMethods();
Hash.toQueryString = Object.toQueryString;
var Toggle = {
  display: Element.toggle
};
Element.Methods.childOf = Element.Methods.descendantOf;
var Insertion = {
  Before: function(a, b) {
    return Element.insert(a, {
      before: b
    })
  },
  Top: function(a, b) {
    return Element.insert(a, {
      top: b
    })
  },
  Bottom: function(a, b) {
    return Element.insert(a, {
      bottom: b
    })
  },
  After: function(a, b) {
    return Element.insert(a, {
      after: b
    })
  }
};
var $continue = new Error('"throw $continue" is deprecated, use "return" instead');
var Position = {
  includeScrollOffsets: false,
  prepare: function() {
    this.deltaX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    this.deltaY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  },
  within: function(b, a, c) {
    if (this.includeScrollOffsets) {
      return this.withinIncludingScrolloffsets(b, a, c)
    }
    this.xcomp = a;
    this.ycomp = c;
    this.offset = Element.cumulativeOffset(b);
    return (c >= this.offset[1] && c < this.offset[1] + b.offsetHeight && a >= this.offset[0] && a < this.offset[0] + b.offsetWidth)
  },
  withinIncludingScrolloffsets: function(b, a, d) {
    var c = Element.cumulativeScrollOffset(b);
    this.xcomp = a + c[0] - this.deltaX;
    this.ycomp = d + c[1] - this.deltaY;
    this.offset = Element.cumulativeOffset(b);
    return (this.ycomp >= this.offset[1] && this.ycomp < this.offset[1] + b.offsetHeight && this.xcomp >= this.offset[0] && this.xcomp < this.offset[0] + b.offsetWidth)
  },
  overlap: function(b, a) {
    if (!b) {
      return 0
    }
    if (b == "vertical") {
      return ((this.offset[1] + a.offsetHeight) - this.ycomp) / a.offsetHeight
    }
    if (b == "horizontal") {
      return ((this.offset[0] + a.offsetWidth) - this.xcomp) / a.offsetWidth
    }
  },
  cumulativeOffset: Element.Methods.cumulativeOffset,
  positionedOffset: Element.Methods.positionedOffset,
  absolutize: function(a) {
    Position.prepare();
    return Element.absolutize(a)
  },
  relativize: function(a) {
    Position.prepare();
    return Element.relativize(a)
  },
  realOffset: Element.Methods.cumulativeScrollOffset,
  offsetParent: Element.Methods.getOffsetParent,
  page: Element.Methods.viewportOffset,
  clone: function(b, c, a) {
    a = a || {};
    return Element.clonePosition(c, b, a)
  }
};
if (!document.getElementsByClassName) {
  document.getElementsByClassName = function(b) {
    function a(c) {
      return c.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + c + " ')]"
    }
    b.getElementsByClassName = Prototype.BrowserFeatures.XPath ? function(c, e) {
      e = e.toString().strip();
      var d = /\s/.test(e) ? $w(e).map(a).join("") : a(e);
      return d ? document._getElementsByXPath(".//*" + d, c) : []
    } : function(e, f) {
      f = f.toString().strip();
      var g = [],
        h = (/\s/.test(f) ? $w(f) : null);
      if (!h && !f) {
        return g
      }
      var c = $(e).getElementsByTagName("*");
      f = " " + f + " ";
      for (var d = 0, k, j; k = c[d]; d++) {
        if (k.className && (j = " " + k.className + " ") && (j.include(f) || (h && h.all(function(i) {
            return !i.toString().blank() && j.include(" " + i + " ")
          })))) {
          g.push(Element.extend(k))
        }
      }
      return g
    };
    return function(d, c) {
      return $(c || document.body).getElementsByClassName(d)
    }
  }(Element.Methods)
}
Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(a) {
    this.element = $(a)
  },
  _each: function(a) {
    this.element.className.split(/\s+/).select(function(b) {
      return b.length > 0
    })._each(a)
  },
  set: function(a) {
    this.element.className = a
  },
  add: function(a) {
    if (this.include(a)) {
      return
    }
    this.set($A(this).concat(a).join(" "))
  },
  remove: function(a) {
    if (!this.include(a)) {
      return
    }
    this.set($A(this).without(a).join(" "))
  },
  toString: function() {
    return $A(this).join(" ")
  }
};
Object.extend(Element.ClassNames.prototype, Enumerable);
(function() {
  window.Selector = Class.create({
    initialize: function(a) {
      this.expression = a.strip()
    },
    findElements: function(a) {
      return Prototype.Selector.select(this.expression, a)
    },
    match: function(a) {
      return Prototype.Selector.match(a, this.expression)
    },
    toString: function() {
      return this.expression
    },
    inspect: function() {
      return "#<Selector: " + this.expression + ">"
    }
  });
  Object.extend(Selector, {
    matchElements: function(f, g) {
      var a = Prototype.Selector.match,
        d = [];
      for (var c = 0, e = f.length; c < e; c++) {
        var b = f[c];
        if (a(b, g)) {
          d.push(Element.extend(b))
        }
      }
      return d
    },
    findElement: function(f, g, b) {
      b = b || 0;
      var a = 0,
        d;
      for (var c = 0, e = f.length; c < e; c++) {
        d = f[c];
        if (Prototype.Selector.match(d, g) && b === a++) {
          return Element.extend(d)
        }
      }
    },
    findChildElements: function(b, c) {
      var a = c.toArray().join(", ");
      return Prototype.Selector.select(a, b || document)
    }
  })
})();
/*! RESOURCE: /scripts/lib/glide_updates/prototype.js */
Object.extendsObject = function() {
  return Class.create.apply(null, arguments).prototype;
}
Prototype.ScriptFragmentDetailed = '<script(?:[^>]*type=\"([^>]*?)\")?(?:[^>]*src=\"([^>]*?)\")?[^>]*>([\\S\\s]*?)<\/script>';
var g_evalScriptCache = {};
Object.extend(String.prototype, (function() {
  function extractScriptsDetailed() {
    var matchAll = new RegExp(Prototype.ScriptFragmentDetailed, 'img');
    var matchOne = new RegExp(Prototype.ScriptFragmentDetailed, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      var m = scriptTag.match(matchOne) || ['', '', '', ''];
      if (m[1] == 'application/xml')
        return;
      if (m[1] == 'text/html')
        return;
      if (m[1] == 'text/ng-template')
        return;
      return {
        script: m[3],
        src: m[2]
      };
    });
  }

  function evalScripts(evalGlobal) {
    (function _executer(scripts) {
      if (!scripts || scripts.length == 0)
        return;
      var script = scripts.shift();
      if (!script)
        return _executer(scripts);
      if (script.src) {
        if (!g_evalScriptCache[script.src]) {
          g_evalScriptCache[script.src] = {
            state: 'loading',
            scripts: scripts
          };
          ajaxRequest(script.src, null, true, function(r) {
            g_evalScriptCache[script.src].state = 'loaded';
            var toEvalScripts = g_evalScriptCache[script.src].scripts;
            if (r && r.responseText)
              evalScript(r.responseText, evalGlobal);
            return _executer(toEvalScripts);
          });
        } else if (g_evalScriptCache[script.src].state == 'loading') {
          g_evalScriptCache[script.src].scripts = g_evalScriptCache[script.src].scripts.concat(scripts);
          return;
        } else if (g_evalScriptCache[script.src].state == 'loaded')
          return _executer(scripts);
      } else {
        if (script.script)
          evalScript(script.script, evalGlobal);
        return _executer(scripts);
      }
    })(this.extractScriptsDetailed());
  }
  return {
    evalScripts: evalScripts,
    extractScriptsDetailed: extractScriptsDetailed
  };
})());

function evalScript(s, evalGlobal) {
  if (s.length == 0)
    return;
  if (!evalGlobal)
    return eval(s);
  if (window.execScript)
    return window.execScript(s);
  return window.eval ? window.eval(s) : eval(s);
}
if (document.getElementsByClassName && typeof Element.Methods.getElementsByClassName === "function")
  document.getElementsByClassName = function(instanceMethods) {
    function iter(name) {
      return name.blank() ? null : "[contains(concat(' ', @class, ' '), ' " + name + " ')]";
    }
    instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ? function(element, className) {
      className = className.toString().strip();
      var cond = /\s/.test(className) ? $w(className).map(iter).join('') : iter(className);
      return cond ? document._getElementsByXPath('.//*' + cond, element) : [];
    } : function(element, className) {
      className = className.toString().strip();
      var elements = [],
        classNames = (/\s/.test(className) ? $w(className) : null);
      if (!classNames && !className)
        return elements;
      if (Object.isString(element))
        element = document.getElementById(element);
      Element.extend(element);
      var nodes = element.getElementsByTagName('*');
      className = ' ' + className + ' ';
      for (var i = 0, child, cn; child = nodes[i]; i++) {
        if (child.className && (cn = ' ' + child.className + ' ') &&
          (cn.include(className) || (classNames && classNames.all(function(name) {
            return !name.toString().blank() && cn.include(' ' + name + ' ');
          }))))
          elements.push(Element.extend(child));
      }
      return elements;
    };
    return function(className, parentElement) {
      return $(parentElement || document.body).getElementsByClassName(className);
    };
  }(Element.Methods);
Object.equals = function(o1, o2) {
  var i1 = 0,
    i2 = 0;
  for (var p in o1) {
    if (!o1 || !o2 || typeof o1[p] !== typeof o2[p] || ((o1[p] === null) !== (o2[p] === null)))
      return false;
    switch (typeof o1[p]) {
      case 'undefined':
        if (typeof o2[p] != 'undefined')
          return false;
        break;
      case 'object':
        if (o1[p] !== null && o2[p] !== null && (o1[p].constructor.toString() !== o2[p].constructor.toString() || !Object.equals(o1[p], o2[p])))
          return false;
        break;
      case 'function':
        if (p != 'equals' && o1[p].toString() != o2[p].toString())
          return false;
        break;
      default:
        if (o1[p] !== o2[p])
          return false;
    }
    i1++;
  }
  for (var p in o2) i2++;
  if (i1 != i2)
    return false;
  return true;
}
document.viewport['getDimensions'] = function() {
  var el = window.document.compatMode === 'CSS1Compat' && (!Prototype.Browser.Opera ||
    window.parseFloat(window.opera.version()) < 9.5) ? window.document.documentElement : window.document.body;
  return {
    width: el.clientWidth,
    height: el.clientHeight
  };
};;
/*! RESOURCE: /scripts/lib/glide_updates/prototype.template.js */
var Template = Class.create({
  initialize: function(template) {
    this.template = template.toString();
    this.pattern = /(^|.|\r|\n)(#\{((JS|HTML):)?(.*?)\})/;
  },
  evaluate: function(object) {
    if (object && Object.isFunction(object.toTemplateReplacements))
      object = object.toTemplateReplacements();
    return this.template.gsub(this.pattern, function(match) {
      if (object === null)
        return (match[1] + '');
      var before = match[1] || '';
      if (before === '\\')
        return match[2];
      var ctx = object,
        expr = match[5],
        escape = match[4],
        pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
      match = pattern.exec(expr);
      if (match === null)
        return before;
      while (match != null) {
        var comp = match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') : match[1];
        ctx = ctx[comp];
        if (null === ctx || '' === match[3])
          break;
        expr = expr.substring('[' === match[3] ? match[1].length : match[0].length);
        match = pattern.exec(expr);
      }
      ctx = ctx || '';
      switch (escape || '') {
        case 'HTML':
          ctx = ctx.replace(/'/g, '&#39;').replace(/"/g, '&#34;').replace(/&(?![#|l|g])/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
          break;
        case 'JS':
          ctx = ctx.replace(/'/g, '&#39;').replace(/"/g, '&#34;');
          break;
      }
      return before + String.interpret(ctx);
    });
  }
});
var XMLTemplate = Class.create(Template, {
  initialize: function($super, id) {
    var s = $(id);
    $super(s && s.innerHTML ? s.innerHTML.replace(/%7B/g, '{').replace(/%7D/g, '}') : '');
  },
  toString: function() {
    'XMLTemplate';
  }
});;
/*! RESOURCE: /scripts/lib/glide_updates/prototype.plugin.js */
var Plugin = (function() {
  function create(name) {
    var args = $A(arguments);
    args.shift();
    var klass = function(argumentArray) {
      this.initialize.apply(this, argumentArray);
    };
    Object.extend(klass, Class.Methods);
    Object.extend(klass.prototype, args[0] || {});
    if (!klass.prototype.initialize)
      klass.prototype.initialize = Prototype.emptyFunction;
    klass.prototype.constructor = klass;
    var methods = {};
    methods[name] = function(elem) {
      new klass(arguments);
      return elem;
    }.bind(this);
    Element.addMethods(methods);
  };
  return {
    create: create
  };
})();;
/*! RESOURCE: /scripts/lib/labjs/LAB.min.js */
/*! LAB.js (LABjs :: Loading And Blocking JavaScript)
    v2.0.3 (c) Kyle Simpson
    MIT License
*/
(function(o) {
  var K = o.$LAB,
    y = "UseLocalXHR",
    z = "AlwaysPreserveOrder",
    u = "AllowDuplicates",
    A = "CacheBust",
    B = "BasePath",
    C = /^[^?#]*\//.exec(location.href)[0],
    D = /^\w+\:\/\/\/?[^\/]+/.exec(C)[0],
    i = document.head || document.getElementsByTagName("head"),
    L = (o.opera && Object.prototype.toString.call(o.opera) == "[object Opera]") || ("MozAppearance" in document.documentElement.style),
    q = document.createElement("script"),
    E = typeof q.preload == "boolean",
    r = E || (q.readyState && q.readyState == "uninitialized"),
    F = !r && q.async === true,
    M = !r && !F && !L;

  function G(a) {
    return Object.prototype.toString.call(a) == "[object Function]"
  }

  function H(a) {
    return Object.prototype.toString.call(a) == "[object Array]"
  }

  function N(a, c) {
    var b = /^\w+\:\/\//;
    if (/^\/\/\/?/.test(a)) {
      a = location.protocol + a
    } else if (!b.test(a) && a.charAt(0) != "/") {
      a = (c || "") + a
    }
    return b.test(a) ? a : ((a.charAt(0) == "/" ? D : C) + a)
  }

  function s(a, c) {
    for (var b in a) {
      if (a.hasOwnProperty(b)) {
        c[b] = a[b]
      }
    }
    return c
  }

  function O(a) {
    var c = false;
    for (var b = 0; b < a.scripts.length; b++) {
      if (a.scripts[b].ready && a.scripts[b].exec_trigger) {
        c = true;
        a.scripts[b].exec_trigger();
        a.scripts[b].exec_trigger = null
      }
    }
    return c
  }

  function t(a, c, b, d) {
    a.onload = a.onreadystatechange = function() {
      if ((a.readyState && a.readyState != "complete" && a.readyState != "loaded") || c[b]) return;
      a.onload = a.onreadystatechange = null;
      d()
    }
  }

  function I(a) {
    a.ready = a.finished = true;
    for (var c = 0; c < a.finished_listeners.length; c++) {
      a.finished_listeners[c]()
    }
    a.ready_listeners = [];
    a.finished_listeners = []
  }

  function P(d, f, e, g, h) {
    setTimeout(function() {
      var a, c = f.real_src,
        b;
      if ("item" in i) {
        if (!i[0]) {
          setTimeout(arguments.callee, 25);
          return
        }
        i = i[0]
      }
      a = document.createElement("script");
      if (f.type) a.type = f.type;
      if (f.charset) a.charset = f.charset;
      if (h) {
        if (r) {
          e.elem = a;
          if (E) {
            a.preload = true;
            a.onpreload = g
          } else {
            a.onreadystatechange = function() {
              if (a.readyState == "loaded") g()
            }
          }
          a.src = c
        } else if (h && c.indexOf(D) == 0 && d[y]) {
          b = new XMLHttpRequest();
          b.onreadystatechange = function() {
            if (b.readyState == 4) {
              b.onreadystatechange = function() {};
              e.text = b.responseText + "\n//@ sourceURL=" + c;
              g()
            }
          };
          b.open("GET", c);
          b.send()
        } else {
          a.type = "text/cache-script";
          t(a, e, "ready", function() {
            i.removeChild(a);
            g()
          });
          a.src = c;
          i.insertBefore(a, i.firstChild)
        }
      } else if (F) {
        a.async = false;
        t(a, e, "finished", g);
        a.src = c;
        i.insertBefore(a, i.firstChild)
      } else {
        t(a, e, "finished", g);
        a.src = c;
        i.insertBefore(a, i.firstChild)
      }
    }, 0)
  }

  function J() {
    var l = {},
      Q = r || M,
      n = [],
      p = {},
      m;
    l[y] = true;
    l[z] = false;
    l[u] = false;
    l[A] = false;
    l[B] = "";

    function R(a, c, b) {
      var d;

      function f() {
        if (d != null) {
          d = null;
          I(b)
        }
      }
      if (p[c.src].finished) return;
      if (!a[u]) p[c.src].finished = true;
      d = b.elem || document.createElement("script");
      if (c.type) d.type = c.type;
      if (c.charset) d.charset = c.charset;
      t(d, b, "finished", f);
      if (b.elem) {
        b.elem = null
      } else if (b.text) {
        d.onload = d.onreadystatechange = null;
        d.text = b.text
      } else {
        d.src = c.real_src
      }
      i.insertBefore(d, i.firstChild);
      if (b.text) {
        f()
      }
    }

    function S(c, b, d, f) {
      var e, g, h = function() {
          b.ready_cb(b, function() {
            R(c, b, e)
          })
        },
        j = function() {
          b.finished_cb(b, d)
        };
      b.src = N(b.src, c[B]);
      b.real_src = b.src + (c[A] ? ((/\?.*$/.test(b.src) ? "&_" : "?_") + ~~(Math.random() * 1E9) + "=") : "");
      if (!p[b.src]) p[b.src] = {
        items: [],
        finished: false
      };
      g = p[b.src].items;
      if (c[u] || g.length == 0) {
        e = g[g.length] = {
          ready: false,
          finished: false,
          ready_listeners: [h],
          finished_listeners: [j]
        };
        P(c, b, e, ((f) ? function() {
          e.ready = true;
          for (var a = 0; a < e.ready_listeners.length; a++) {
            e.ready_listeners[a]()
          }
          e.ready_listeners = []
        } : function() {
          I(e)
        }), f)
      } else {
        e = g[0];
        if (e.finished) {
          j()
        } else {
          e.finished_listeners.push(j)
        }
      }
    }

    function v() {
      var e, g = s(l, {}),
        h = [],
        j = 0,
        w = false,
        k;

      function T(a, c) {
        a.ready = true;
        a.exec_trigger = c;
        x()
      }

      function U(a, c) {
        a.ready = a.finished = true;
        a.exec_trigger = null;
        for (var b = 0; b < c.scripts.length; b++) {
          if (!c.scripts[b].finished) return
        }
        c.finished = true;
        x()
      }

      function x() {
        while (j < h.length) {
          if (G(h[j])) {
            try {
              h[j++]()
            } catch (err) {}
            continue
          } else if (!h[j].finished) {
            if (O(h[j])) continue;
            break
          }
          j++
        }
        if (j == h.length) {
          w = false;
          k = false
        }
      }

      function V() {
        if (!k || !k.scripts) {
          h.push(k = {
            scripts: [],
            finished: true
          })
        }
      }
      e = {
        script: function() {
          for (var f = 0; f < arguments.length; f++) {
            (function(a, c) {
              var b;
              if (!H(a)) {
                c = [a]
              }
              for (var d = 0; d < c.length; d++) {
                V();
                a = c[d];
                if (G(a)) a = a();
                if (!a) continue;
                if (H(a)) {
                  b = [].slice.call(a);
                  b.unshift(d, 1);
                  [].splice.apply(c, b);
                  d--;
                  continue
                }
                if (typeof a == "string") a = {
                  src: a
                };
                a = s(a, {
                  ready: false,
                  ready_cb: T,
                  finished: false,
                  finished_cb: U
                });
                k.finished = false;
                k.scripts.push(a);
                S(g, a, k, (Q && w));
                w = true;
                if (g[z]) e.wait()
              }
            })(arguments[f], arguments[f])
          }
          return e
        },
        wait: function() {
          if (arguments.length > 0) {
            for (var a = 0; a < arguments.length; a++) {
              h.push(arguments[a])
            }
            k = h[h.length - 1]
          } else k = false;
          x();
          return e
        }
      };
      return {
        script: e.script,
        wait: e.wait,
        setOptions: function(a) {
          s(a, g);
          return e
        }
      }
    }
    m = {
      setGlobalDefaults: function(a) {
        s(a, l);
        return m
      },
      setOptions: function() {
        return v().setOptions.apply(null, arguments)
      },
      script: function() {
        return v().script.apply(null, arguments)
      },
      wait: function() {
        return v().wait.apply(null, arguments)
      },
      queueScript: function() {
        n[n.length] = {
          type: "script",
          args: [].slice.call(arguments)
        };
        return m
      },
      queueWait: function() {
        n[n.length] = {
          type: "wait",
          args: [].slice.call(arguments)
        };
        return m
      },
      runQueue: function() {
        var a = m,
          c = n.length,
          b = c,
          d;
        for (; --b >= 0;) {
          d = n.shift();
          a = a[d.type].apply(null, d.args)
        }
        return a
      },
      noConflict: function() {
        o.$LAB = K;
        return m
      },
      sandbox: function() {
        return J()
      }
    };
    return m
  }
  o.$LAB = J();
  (function(a, c, b) {
    if (document.readyState == null && document[a]) {
      document.readyState = "loading";
      document[a](c, b = function() {
        document.removeEventListener(c, b, false);
        document.readyState = "complete"
      }, false)
    }
  })("addEventListener", "DOMContentLoaded")
})(this);
/*! RESOURCE: /scripts/ScriptLoader.js */
var ScriptLoader = {
  getScripts: function(scripts, callback) {
    if (!(scripts instanceof Array))
      scripts = [scripts];
    for (var i = 0; i < scripts.length; i++)
      $LAB.queueScript(scripts[i]);
    $LAB.queueWait(callback);
    $LAB.runQueue();
  }
};;
/*! RESOURCE: /scripts/consts/GlideEvent.js */
var GlideEvent = {
  WINDOW_CLICKED: 'glide:window_clicked',
  WINDOW_BLURRED: 'glide:window_blurred',
  WINDOW_FOCUSED: 'glide:window_focused',
  IMAGE_PICKED: 'glide:image_picked',
  NAV_MANAGER_LOADED: 'glide:nav_manager_loaded',
  NAV_FORM_DIRTY_CANCEL_STAY: 'glide:nav_form_dirty_cancel_stay',
  NAV_SYNC_LIST_WITH_FORM: 'glide:nav_sync_list_with_form',
  NAV_LOAD_FORM_FROM_LIST: 'glide:nav_load_form_from_list',
  NAV_SAVE_PREFERENCES: 'glide:nav_save_preferences',
  NAV_UPDATE_EDGE_BUTTON_STATES: 'glide:nav_update_edge_button_states',
  NAV_OPEN_URL: 'glide:nav_open_url',
  NAV_ADD_BOOKMARK: 'glide:nav_add_bookmark',
  NAV_REMOVE_BOOKMARK: 'glide:nav_remove_bookmark',
  NAV_UPDATE_BOOKMARK: 'glide:nav_update_bookmark',
  NAV_DRAGGING_BOOKMARK_START: 'glide:nav_dragging_bookmark_start',
  NAV_DRAGGING_BOOKMARK_STOP: 'glide:nav_dragging_bookmark_stop',
  NAV_HIDE_ALL_TOOLTIPS: 'glide:nav_hide_all_tooltips',
  NAV_QUEUE_BOOKMARK_OPEN_FLYOUT: 'glide:nav_queue_bookmark_open_flyout',
  NAV_OPEN_BOOKMARK: 'glide:nav_open_bookmark',
  NAV_BOOKMARK_ADDED: 'glide:nav_bookmark_added',
  NAV_BOOKMARK_REMOVED: 'glide:nav_bookmark_removed',
  NAV_EAST_PANE_RESIZED: 'glide:nav_east_pane_resized',
  NAV_ADD_FLYOUT: 'glide:nav_add_flyout',
  NAV_REMOVE_FLYOUT: 'glide:nav_remove_flyout',
  NAV_TOGGLE_FLYOUT: 'glide:nav_toggle_flyout',
  NAV_HIDE_FLYOUTS: 'glide:nav_hide_flyouts',
  NAV_PANE_CLICKED: 'glide:nav_window_clicked'
};;
/*! RESOURCE: /scripts/functions/textutil.js */
function htmlEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/'/g, "&#39;").replace(/"/g, "&quot;").replace(/</g, "&#60;").replace(/>/g, "&#62;");
}

function htmlEscapeQuote(s) {
  return s.replace(/'/g, "&#39;");
}

function htmlEscapeDoubleQuote(s) {
  return s.replace(/"/g, "&quot;");
}

function loadXML(r) {
  var xml = r.responseXML;
  if (typeof xml != 'undefined')
    return xml;
  var dom = null;
  if (window.DOMParser) {
    try {
      dom = (new DOMParser()).parseFromString(r, 'text/xml');
    } catch (e) {
      dom = null;
    }
  } else if (window.ActiveXObject) {
    try {
      dom = new ActiveXObject('Microsoft.XMLDOM');
      dom.async = false;
      if (!dom.loadXML(r))
        jslog('ERROR: ' + dom.parseError.reason + dom.parseError.srcText);
    } catch (e) {
      dom = null;
    }
  } else
    jslog('ERROR: Cannot parse xml string - "' + r + '".');
  return dom;
};
/*! RESOURCE: /scripts/doctype/functions_bootstrap14.js */
var userAgentLowerCase = navigator.userAgent.toLowerCase();
var isMSIE = userAgentLowerCase.indexOf("msie") >= 0;
var ie5 = false;
var isMSIE6 = false
var isMSIE7 = false;
var isMSIE8 = false;
var isMSIE9 = userAgentLowerCase.indexOf("msie 9") >= 0;
var isMSIE10 = userAgentLowerCase.indexOf("msie 10") >= 0;
var isMSIE11 = userAgentLowerCase.indexOf("rv:11.0") > 0;
var isChrome = userAgentLowerCase.indexOf("chrome") >= 0;
var isFirefox = userAgentLowerCase.indexOf("firefox") >= 0;
var isSafari = !isChrome && (userAgentLowerCase.indexOf("safari") >= 0);
var isSafari5 = false;
if (isSafari) {
  try {
    var reSafariVersion = new RegExp("version/([\\d\\.]{3,5}) safari/");
    var results = reSafariVersion.exec(userAgentLowerCase);
    if (results.length > 0) {
      var reMajor = new RegExp("([\\d]).");
      var results = reMajor.exec(results[1]);
      if (results.length > 0) {
        var mv = parseInt(results[1]);
        isSafari5 = mv < 6;
      }
    }
  } catch (e) {}
}
var isMacintosh = userAgentLowerCase.indexOf("macintosh") >= 0;
var isWebKit = navigator.userAgent.indexOf("WebKit") >= 0;
var isTouchDevice = navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPad') > -1;
var GJSV = 1.0;
(function() {
  var defined = {};
  var waiting = {};

  function listen(id, then) {
    if (typeof id !== 'string')
      listenMany(id, then);
    if (defined[id]) {
      return then(defined[id]);
    }
    if (!waiting[id]) {
      waiting[id] = [];
    }
    waiting[id].push(then);
  }

  function emit(id, data) {
    defined[id] = data;
    var listeners = waiting[id];
    if (!listeners) {
      return;
    }
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i](data);
    }
    waiting[id] = [];
  }

  function listenMany(dependencies, then) {
    if (typeof dependencies.length === 'undefined') {
      return;
    }
    var unDef = {
      isUndefined: true
    };
    var resolved = [];

    function resolve(dep, i) {
      resolved[i] = dep;
      for (var i = 0, l = resolved.length; i < l; i++) {
        if (resolved[i] === unDef)
          return;
      }
      then.apply(undefined, resolved);
    };
    dependencies.forEach(function(depId, idx) {
      resolved[idx] = unDef;
      listen(depId, function(dep) {
        resolve(dep, idx);
      });
    });
  }
  window.CachedEvent = {
    after: listen,
    emit: emit
  };
})();
var g_afterPageLoadedFunctions = [];
window.g_render_functions = window.g_render_functions || [];
window.g_load_functions = window.g_load_functions || [];
window.g_late_load_functions = window.g_late_load_functions || [];

function runBeforeRender() {
  _runInlineScripts();
  jslog("runBeforeRender");
  for (var i = 0; i != g_render_functions.length; i++) {
    var f = g_render_functions[i];
    f.call();
  }
}

function _runInlineScripts() {
  var inlineScripts = $j('script[type="application/javascript-deferred"]');
  jslog("running inline scripts, count: " + inlineScripts.length);
  inlineScripts.each(function(index, item) {
    var script = $j(item).text();
    try {
      $j.globalEval(script);
    } catch (e) {
      jslog("error in script " + script);
    }
  });
}
window.g_hasRunAfterAllLoaded = false;

function runAfterAllLoaded() {
  if (g_hasRunAfterAllLoaded) {
    jslog("Redundant call to runAfterAllLoaded");
    return;
  }
  g_hasRunAfterAllLoaded = true;
  var sw = new StopWatch();
  jslog("runAfterAllLoaded, functions: " + g_load_functions.length);
  for (var i = 0; i != g_load_functions.length; i++) {
    var f = g_load_functions[i];
    var t = new Date().getTime();
    f.call();
    t = new Date().getTime() - t;
    if (t > 5000)
      jslog("Time: " + t + " for: [" + i + "] " + f);
  }
  jslog("late load functions: " + g_late_load_functions.length);
  for (var i = 0; i != g_late_load_functions.length; i++) {
    var f = g_late_load_functions[i];
    f.call();
  }
  window.self.loaded = true;
  sw.jslog("runAfterAllLoaded finished");
}

function addLoadEvent(func) {
  if (window.self.loaded) {
    setTimeout(func, 0);
    return;
  }
  g_load_functions.push(func);
}

function addLateLoadEvent(func) {
  if (window.self.loaded) {
    setTimeout(func, 0);
    return;
  }
  g_late_load_functions.push(func);
}

function pageLoaded() {
  CustomEvent.observe("body_clicked", contextMenuHide);
  setMandatoryExplained.defer();
}

function addRenderEvent(func) {
  if (isRenderEventRegistered(func))
    return;
  addRenderEventToArray(func);
}

function addRenderEventToArray(func) {
  if (window.self.loaded) {
    setTimeout(func, 0);
    return;
  }
  g_render_functions.push(func);
}

function isRenderEventRegistered(func) {
  var s = func.toString();
  for (var i = 0; i < g_render_functions.length; i++)
    if (g_render_functions[i].toString() == s)
      return true;
  return false;
}

function addRenderEventLogged(func, name, funcname) {
  addRenderEventToArray(function() {
    CustomEvent.fire('glide_optics_inspect_put_cs_context', funcname, 'load');
    var sw = new StopWatch();
    var __rtmr = new Date();
    try {
      func();
    } catch (e) {
      jslog('***************************************************');
      jslog('A script has encountered an error in render events');
      jslog(e.toString());
      jslog('Script ends. Continuing happily');
      jslog('***************************************************');
    }
    CustomEvent.fire('page_timing', {
      name: 'CSOL',
      child: {
        description: name.substr(7),
        sys_id: g_event_handler_ids[funcname],
        source_table: 'sys_script_client'
      },
      startTime: __rtmr,
      win: window
    });
    sw.jslog(name);
    CustomEvent.fire('glide_optics_inspect_pop_cs_context', funcname, 'load');
  });
}

function addTopRenderEvent(func) {
  if (window.self.loaded) {
    setTimeout(func, 0);
    return;
  }
  g_render_functions.unshift(func);
}

function addAfterPageLoadedEvent(func) {
  if (window.self.loaded) {
    setTimeout(func, 0);
    return;
  }
  g_afterPageLoadedFunctions.push(func);
}

function runAfterPageLoadedEvents() {
  jslog("after page loaded starting");
  var sw = new StopWatch();
  for (var i = 0; i != g_afterPageLoadedFunctions.length; i++) {
    var f = g_afterPageLoadedFunctions[i];
    f.call();
  }
  sw.jslog("after page loaded complete, functions called: " + g_afterPageLoadedFunctions.length);
  g_afterPageLoadedFunctions = [];
}
addLateLoadEvent(function() {
  setTimeout(runAfterPageLoadedEvents, 30);
});

function addUnloadEvent(func) {
  Event.observe(window, 'unload', func, false);
}

function addTinymceLoadEvent(id, func) {
  CachedEvent.after('tinyeditor_init.' + id, func);
}

function fireTinymceLoadEvent(id, ed) {
  CachedEvent.emit('tinyeditor_init.' + id, ed);
}

function gel(id) {
  if (typeof id != 'string')
    return id;
  return document.getElementById(id);
}

function cel(name, parent) {
  var e = document.createElement(name);
  if (arguments.length > 1)
    parent.appendChild(e);
  return e;
}

function rel(id) {
  var e = gel(id);
  if (e)
    e.parentNode.removeChild(e);
}

function addChild(element) {
  getFormContentParent().appendChild(element);
}

function inner(id, data) {
  var el = gel(id);
  if (el != null)
    el.innerHTML = data;
}

function clearNodes(t) {
  if (!t)
    return;
  while (t.hasChildNodes())
    t.removeChild(t.childNodes[0]);
}

function getTopWindow() {
  var topWindow = window.self;
  try {
    while (topWindow.GJSV && topWindow != topWindow.parent && topWindow.parent.GJSV) {
      topWindow = topWindow.parent;
    }
  } catch (e) {}
  return topWindow;
}

function inFrame() {
  return getTopWindow() != window.self;
}

function getMainWindow() {
  var topWindow = getTopWindow();
  return topWindow['gsft_main'];
}

function getMainFormWindow() {
  var topWindow = getTopWindow();
  return topWindow['gsft_main_form'];
}

function getNavWindow() {
  var topWindow = getTopWindow();
  return topWindow['gsft_nav'];
}

function reloadWindow(win) {
  var href = win.location.href;
  var len = href.length;
  if (win.frames['iframe_live_feed'] && href.endsWith('#') && len > 2)
    href = href.substring(0, len - 2)
  href = addDomainParameters(href);
  win.location.href = href;
}

function addDomainParameters(href) {
  var url = new GlideURL(href);
  if (url.getParam('sysparm_domain') == 'picker') {
    url.deleteParam('sysparm_domain');
  } else {
    var domainElement = gel('sysparm_domain');
    if (domainElement) {
      if (domainElement.value != 'picker') {
        url.addParam('sysparm_domain', domainElement.value);
        var domainScope = gel('sysparm_domain_scope');
        if (domainScope) {
          url.addParam('sysparm_domain_scope', domainScope.value);
        }
      }
    }
  }
  url.addParam('sysparm_nostack', 'true');
  url.setEncode(false);
  return url.getURL();
}

function addOnSubmitEvent(form, func, funcname) {
  if (!form)
    return;
  var oldonsubmit = form.onsubmit;
  if (typeof form.onsubmit != 'function')
    form.onsubmit = func;
  else {
    form.onsubmit = function() {
      var formFuncCalled = false;
      try {
        if (oldonsubmit() == false)
          return false;
        CustomEvent.fire('glide_optics_inspect_put_cs_context', funcname, 'submit');
        formFuncCalled = true;
        var returnvalue = func();
        formFuncCalled = false;
        CustomEvent.fire('glide_optics_inspect_pop_cs_context', funcname, 'submit');
        if (returnvalue == false)
          return false;
        return true;
      } catch (ex) {
        if (formFuncCalled)
          CustomEvent.fire('glide_optics_inspect_pop_cs_context', funcname, 'load');
        formFuncError("onSubmit", func, ex);
        return false;
      }
    }
  }
  form = null;
}

function formFuncError(type, func, ex) {
  var funcStr = func.toString();
  funcStr = funcStr.replace(/onSubmit[a-fA-F0-9]{32}\(/, "onSubmit(");
  var msg;
  if (g_user.hasRole("client_script_admin"))
    msg = type + " script error: " + ex.toString() + ":<br/>" + funcStr.replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;");
  else
    msg = "Submit canceled due to a script error - please contact your System Administrator";
  g_form.addErrorMessage(msg);
  CustomEvent.fire('glideform:script_error', type + " script error: " + ex.toString() + "\n" + funcStr);
}

function hide(element) {
  var e = typeof element === "string" ? gel(element) : element;
  if (!e)
    return;
  e.style.display = 'none';
  _frameChanged();
}

function show(element) {
  var e = typeof element === "string" ? gel(element) : element;
  if (!e)
    return;
  if (e.tagName == "TR")
    e.style.display = 'table-row';
  else
    e.style.display = 'block';
  _frameChanged();
}

function hideObject(o, visibilityOnly) {
  if (!o)
    return;
  o.style.visibility = "hidden";
  if (!visibilityOnly)
    o.style.display = "none";
  _frameChanged();
}

function showObject(o, visibilityOnly) {
  if (!o)
    return;
  o.style.visibility = "visible";
  if (!visibilityOnly)
    o.style.display = "block";
  _frameChanged();
}

function showObjectInline(o) {
  if (!o)
    return;
  o.style.visibility = "visible";
  o.style.display = "inline";
  _frameChanged();
}

function showObjectInlineBlock(o) {
  if (!o)
    return;
  o.style.visibility = "visible";
  o.style.display = "inline-block";
  _frameChanged();
}

function focusFirstElement(form) {
  try {
    var e = findFirstEditableElement(form);
    if (e) {
      Field.activate(e);
      triggerEvent(e, 'focus', true);
    }
  } catch (ex) {}
}

function findFirstEditableElement(form) {
  var tags = ['input', 'select', 'textarea'];
  var elements = form.getElementsByTagName('*');
  for (var i = 0, n = elements.length; i < n; i++) {
    var element = elements[i];
    if (element.type == 'hidden')
      continue;
    var tagName = element.tagName.toLowerCase();
    if (!tags.include(tagName))
      continue;
    element = $(element);
    var formGroup = element.up('.form-group');
    if (!element.disabled &&
      !element.readOnly &&
      element.style.visibility != 'hidden' &&
      element.style.display != 'none' &&
      element.offsetParent != null &&
      formGroup &&
      formGroup.style.display != 'none')
      return element;
  }
  return null;
}

function triggerEvent(element, eventType, canBubble) {
  canBubble = (typeof(canBubble) == undefined) ? true : canBubble;
  if (element && element.disabled && eventType == "change" && element.onchange) {
    element.onchange.call(element);
    return;
  }
  if (element.fireEvent) {
    element.fireEvent('on' + eventType);
  } else {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent(eventType, canBubble, true);
    element.dispatchEvent(evt);
  }
}
var g_form_dirty_message;

function onWindowClose() {
  if (typeof g_form == 'undefined')
    return;
  if (!g_form.submitted && g_form.modified) {
    g_submitted = false;
    setTimeout(function() {
      CustomEvent.fireTop('glide:nav_form_dirty_cancel_stay', window);
    }, 750);
    return g_form_dirty_message;
  }
  g_form.submitted = false;
}

function jslog(msg, src, dateTime) {
  try {
    if (!src) {
      var path = window.self.location.pathname;
      src = path.substring(path.lastIndexOf('/') + 1);
    }
    if (window.self.opener && window != window.self.opener) {
      if (window.self.opener.jslog) {
        window.self.opener.jslog(msg, src, dateTime);
      }
    } else if (parent && parent.jslog && jslog != parent.jslog) {
      parent.jslog(msg, src, dateTime);
    } else if (parent.parent && parent.parent.jslog && jslog != parent.parent.jslog) {
      parent.parent.jslog(msg, src, dateTime);
    } else {
      if (window.console && window.console.log)
        console.log(msg);
    }
  } catch (e) {}
}

function getXMLIsland(name) {
  var xml = gel(name);
  if (xml == null)
    return null;
  xml = "<xml>" + xml.innerHTML + "</xml>";
  xml = loadXML(xml);
  return xml;
}

function lock(me, ref, edit_id, nonedit_id, current_value_id, update_id) {
  if (me)
    me.style.display = "none";
  var unlock = gel(ref + '_unlock');
  unlock.style.display = "";
  var edit_span = gel(edit_id);
  edit_span.style.display = "none";
  var nonedit_span = gel(nonedit_id);
  nonedit_span.style.display = "inline-block";
  var current_value = gel(current_value_id);
  var the_value = "";
  if (current_value.options) {
    for (var i = 0; i < current_value.options.length; i++) {
      if (i > 0)
        the_value += g_glide_list_separator;
      the_value += current_value.options[i].text;
    }
  } else
    the_value = current_value.value;
  var update_element = gel(update_id);
  if (update_element.href)
    update_element.href = the_value;
  update_element.innerHTML = htmlEscape(the_value);
}

function unlock(me, ref, edit_id, nonedit_id) {
  if (me)
    me.style.display = "none";
  var unlock = gel(ref + '_lock');
  if (unlock)
    showObjectInlineBlock(unlock);
  var edit_span = gel(edit_id);
  edit_span.style.display = "";
  var nonedit_span = gel(nonedit_id);
  nonedit_span.style.display = "none";
  var list_foc = gel("sys_display." + ref);
  if (list_foc) {
    try {
      list_foc.focus();
    } catch (e) {}
  }
}

function setMandatoryExplained(enforce) {
  var showexp = gel('mandatory_explained');
  if (!showexp)
    return;
  if (enforce || foundAMandatoryField())
    showexp.style.display = "inline";
  else
    showexp.style.display = "none";
}

function foundAMandatoryField() {
  var spanTags = document.getElementsByTagName('span');
  if (!spanTags)
    return false;
  for (var c = 0, n = spanTags.length; c != n; ++c) {
    var spanTag = spanTags[c];
    var id = spanTag.id;
    if (!id)
      continue;
    if (id.indexOf('status.') == 0) {
      var mandatory = spanTag.getAttribute("mandatory") + "";
      if (mandatory == 'true')
        return true;
    }
  }
  return false;
}
var _frameChangedTimer = null;

function _frameChanged() {
  if (_frameChangedTimer)
    clearTimeout(_frameChangedTimer);
  _frameChangedTimer = setTimeout(function() {
    _frameChangedTimer = null;
    CustomEvent.fire('frame.resized');
    CustomEvent.fire('refresh.event');
  }, 300);
}

function getFormContentParent() {
  var glideOverlay = $(document.body).select("div.glide_overlay");
  var exposeMask = $('glide_expose_mask');
  if (glideOverlay.length > 0 && exposeMask && exposeMask.visible())
    return glideOverlay[0];
  if (typeof g_section_contents == 'undefined' || !g_section_contents)
    g_section_contents = $(document.body).select(".section_header_content_no_scroll");
  if (g_section_contents.length > 0)
    return g_section_contents[0];
  return document.body;
}

function addClassName(element, name) {
  if (!element)
    return;
  $(element).addClassName(name);
}

function removeClassName(element, name) {
  if (!element)
    return;
  $(element).removeClassName(name);
}

function hasClassName(element, name) {
  if (!element)
    return;
  if (!element.hasClassName)
    return;
  return $(element).hasClassName(name);
}

function getIFrameDocument(iframe) {
  return iframe.contentWindow ? iframe.contentWindow.document : (iframe.contentDocument || null);
}

function writeTitle(element, title) {
  element.title = title;
  if (element.alt)
    element.alt = title;
  if (element.getAttribute('disabled') == 'disabled')
    element.style.pointerEvents = 'auto';
}

function contextMenuHide(e) {
  if (typeof contextHide === 'undefined')
    return;
  if (!isMSIE && e) {
    if (isTouchDevice && !isTouchRightClick(e)) {
      if (e.type == 'touchend' && $(e.target).up('.context_menu'))
        return;
      contextHide();
    } else if (isLeftClick(e)) {
      contextHide();
    }
  } else
    contextHide();
}

function trim(s) {
  return s.replace(/^\s+|\s+$/g, '');
}

function htmlEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/'/g, "&#39;").replace(/"/g,
    "&quot;").replace(/</g, "&#60;").replace(/>/g, "&#62;");
}

function htmlEscapeQuote(s) {
  return s.replace(/'/g, "&#39;");
}

function htmlEscapeDoubleQuote(s) {
  return s.replace(/"/g, "&quot;");
}

function loadXML(r) {
  var xml = r.responseXML;
  if (typeof xml != 'undefined')
    return xml;
  var dom = null;
  try {
    dom = new DOMParser().parseFromString(r, 'text/xml');
  } catch (e) {}
  return dom;
}
if (!window.GwtDateTimePicker) {
  window.GwtDateTimePicker = function(name, format, showTime) {
    ScriptLoader.getScripts('scripts/classes/GwtDateTimePicker.js', function() {
      new GwtDateTimePicker(name, format, showTime);
    });
  }
};
/*! RESOURCE: /scripts/functions/xmlhttp.js */
var isMicrosoftXMLHTTP = false;
var XML_HTTP = "xmlhttp.do";

function AJAXEvaluateSynchronously(expression) {
  var ajax = new GlideAjax("AJAXEvaluator");
  ajax.addParam("sysparm_expression", expression);
  ajax.getXMLWait();
  return ajax.getAnswer();
}

function AJAXEvaluate(expression, callbackAndArgs) {
  var ajax = new GlideAjax("AJAXEvaluator");
  ajax.addParam("sysparm_expression", expression);
  ajax.getXML(AJAXEvaluateResponse, "", callbackAndArgs);
}

function AJAXEvaluateResponse(response, callbackAndArgs) {
  var xml = response.responseXML;
  var answer = xml.documentElement.getAttribute("answer");
  if (callbackAndArgs != null) {
    var callback = callbackAndArgs;
    var args = new Array();
    if (typeof callbackAndArgs != "function" && callbackAndArgs.length > 1) {
      callback = callbackAndArgs.splice(0, 1)[0];
      args = callbackAndArgs;
    }
    callback.call(answer, answer, response, args);
  }
}

function AJAXFunction(func, args, callback, callbackArgs) {
  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] == "function")
      continue;
    args[i] = args[i].replace(/"/g, "\\\"");
  }
  var expression = func + '("' + args.join('","') + '");';
  var newArgs = new Array();
  newArgs.push(callback);
  newArgs = newArgs.concat(callbackArgs);
  AJAXEvaluate(expression, newArgs);
}

function serverRequest(url, loadedFunction, args) {
  ajaxRequest(url, null, true, loadedFunction, args);
}

function serverRequestWait(url, postString) {
  var req = ajaxRequest(url, postString, false);
  if (req.status == 200)
    return req;
}

function serverRequestPost(url, postString, loadedFunction, args) {
  ajaxRequest(url, postString, true, loadedFunction, args);
}

function ajaxRequest(url, postString, async, responseFunction, responseFunctionArgs) {
  var req = getRequest();
  showLoading();
  if (req) {
    if (async && (responseFunction != null))
      req.onreadystatechange = function() {
        processReqChange(req, responseFunction, responseFunctionArgs);
      };
    req.open((postString ? "POST" : "GET"), url, async);
    if (typeof g_ck != 'undefined' && g_ck != "")
      req.setRequestHeader('X-UserToken', g_ck);
    if (postString) {
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      req.send(postString);
    } else {
      if (isMicrosoftXMLHTTP)
        req.send();
      else
        req.send(null);
    }
  }
  if (!async)
    hideLoading();
  return req;
}

function getRequest() {
  var req = null;
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    isMicrosoftXMLHTTP = true;
    req = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return req;
}

function processReqChange(r, docLoadedFunction, docLoadedFunctionArgs) {
  if (r.readyState == 4) {
    hideLoading();
    if (r.status == 200) {
      lastActivity = new Date();
      docLoadedFunction(r, docLoadedFunctionArgs);
    } else {
      try {
        window.status = "There was a problem retrieving the XML data: " + r.statusText;
      } catch (e) {}
    }
  }
}

function showLoading() {
  try {
    CustomEvent.fireAll("ajax.loading.start");
  } catch (e) {}
}

function hideLoading() {
  try {
    CustomEvent.fireAll("ajax.loading.end");
  } catch (e) {}
};
/*! RESOURCE: /scripts/classes/event/GwtObservable.js */
var GwtObservable = Class.create({
  initialize: function() {
    this.events = {};
  },
  on: function(name, func) {
    if (!func || typeof func != 'function')
      return;
    this.events = this.events || {};
    if (!this.events[name])
      this.events[name] = [];
    this.events[name].push(func);
  },
  forward: function(name, element, func) {
    GwtObservable.prototype.on.call(this, name, func);
    Event.observe(element, name, function(e) {
      this.fireEvent(e.type, this, e);
    }.bind(this));
  },
  un: function(name, func) {
    if (!this.events[name])
      return;
    var i = this.events[name].indexOf(func);
    if (i !== -1)
      this.events[name].splice(i, 1);
  },
  unAll: function(name) {
    if (this.events[name])
      delete this.events[name];
  },
  isFiring: function() {
    return this._isFiring;
  },
  fireEvent: function() {
    if (this.suppressEvents === true)
      return true;
    this.events = this.events || {};
    var args = $A(arguments);
    var name = args.shift();
    var eventList = this.events[name];
    if (!eventList)
      return true;
    var event = eventList.slice();
    this._isFiring = true;
    for (var i = 0, l = event.length; i < l; i++) {
      var ev = event[i];
      if (ev == null)
        continue;
      if (ev.apply(this, args) === false) {
        this._isFiring = false;
        return false;
      }
    }
    this._isFiring = false;
    return true;
  },
  toString: function() {
    return 'GwtObservable';
  }
});;
/*! RESOURCE: /scripts/doctype/CustomEventManager.js */
var NOW = NOW || {};
var CustomEventManager = (function(existingCustomEvent) {
  "use strict";
  var events = (existingCustomEvent && existingCustomEvent.events) || {};
  var isFiringFlag = false;
  var trace = false;
  var suppressEvents = false;
  var NOW_MSG = 'NOW.PostMessage';

  function observe(eventName, fn) {
    if (trace)
      jslog("$CustomEventManager observing: " + eventName);
    on(eventName, fn);
  }

  function on(name, func) {
    if (!func || typeof func !== 'function')
      return;
    if (typeof name === 'undefined')
      return;
    if (!events[name])
      events[name] = [];
    events[name].push(func);
  }

  function un(name, func) {
    if (!events[name])
      return;
    var idx = -1;
    for (var i = 0; i < events[name].length; i++) {
      if (events[name][i] === func) {
        idx = i;
        break;
      }
    }
    if (idx >= 0)
      events[name].splice(idx, 1)
  }

  function unAll(name) {
    if (events[name])
      delete events[name];
  }

  function fire(eventName, args) {
    if (trace)
      jslog("$CustomEventManager firing: " + eventName + " args: " + arguments.length);
    return fireEvent.apply(null, arguments);
  }

  function fireUp(eventName, args) {
    var win = window;
    while (win) {
      try {
        if (win.CustomEvent.fireEvent.apply(null, arguments) === false)
          return;
        win = win.parent === win ? null : win.parent;
      } catch (e) {
        return;
      }
    }
  }

  function fireEvent() {
    if (suppressEvents)
      return true;
    var args = Array.prototype.slice.apply(arguments);
    var name = args.shift();
    var eventList = events[name];
    if (!eventList)
      return true;
    var event = eventList.slice();
    isFiringFlag = true;
    for (var i = 0, l = event.length; i < l; i++) {
      var ev = event[i];
      if (!ev)
        continue;
      if (ev.apply(null, args) === false) {
        isFiringFlag = false;
        return false;
      }
    }
    isFiringFlag = false;
    return true;
  }

  function isFiring() {
    return isFiringFlag;
  }

  function forward(name, element, func) {
    on(name, func);
    element.addEventListener(name, function(e) {
      fireEvent(e.type, this, e);
    }.bind(api));
  }

  function registerPostMessageEvent() {
    if (NOW.registeredPostMessageEvent) {
      return;
    }
    if (!window.postMessage) {
      return;
    }
    window.addEventListener('message', function(event) {
      var nowMessageJSON = event.data;
      var nowMessage;
      try {
        nowMessage = JSON.parse(nowMessageJSON.toString());
      } catch (e) {
        return;
      }
      if (!nowMessage.type == NOW_MSG) {
        return;
      }
      fire(nowMessage.eventName, nowMessage.args);
    }, false);
    NOW.registeredPostMessageEvent = true;
  }

  function doPostMessage(win, event, msg, targetOrigin) {
    var nowMessage = {
      type: NOW_MSG,
      eventName: event,
      args: msg
    };
    var nowMessageJSON;
    if (!win || !win.postMessage) {
      return
    }
    nowMessageJSON = JSON.stringify(nowMessage);
    win.postMessage(nowMessageJSON, targetOrigin);
  }

  function fireTop(eventName, args) {
    if (trace)
      jslog("$CustomEventManager firing: " + eventName + " args: " + arguments.length);
    fireEvent.apply(null, arguments);
    var t = getTopWindow();
    if (t !== null && window !== t)
      t.CustomEvent.fire(eventName, args);
  }

  function fireAll(eventName, args) {
    if (trace)
      jslog("$CustomEventManager firing: " + eventName + " args: " + arguments.length);
    var topWindow = getTopWindow();
    notifyAllFrom(topWindow);

    function notifyAllFrom(rootFrame) {
      var childFrame;
      rootFrame.CustomEvent.fireEvent(eventName, args);
      for (var i = 0; i < rootFrame.length; i++) {
        try {
          childFrame = rootFrame[i];
          if (!childFrame)
            continue;
          if (childFrame.CustomEvent && typeof childFrame.CustomEvent.fireEvent === "function") {
            notifyAllFrom(childFrame);
          }
        } catch (e) {}
      }
    }
  }

  function fireToWindow(targetWindow, eventName, args, usePostMessage, targetOrigin) {
    if (trace)
      jslog("$CustomEventManager firing: " + eventName + " args: " + args.length);
    if (usePostMessage) {
      doPostMessage(targetWindow, eventName, args, targetOrigin);
    } else {
      targetWindow.CustomEvent.fireEvent(eventName, args);
    }
  }

  function getTopWindow() {
    var topWindow = window.self;
    try {
      while (topWindow.CustomEvent.fireEvent && topWindow !== topWindow.parent && topWindow.parent.CustomEvent.fireEvent) {
        topWindow = topWindow.parent;
      }
    } catch (e) {}
    return topWindow;
  }

  function isTopWindow() {
    return getTopWindow() == window.self;
  }

  function jslog(msg, src, dateTime) {
    try {
      if (!src) {
        var path = window.self.location.pathname;
        src = path.substring(path.lastIndexOf('/') + 1);
      }
      if (window.self.opener && window != window.self.opener) {
        if (window.self.opener.jslog) {
          window.self.opener.jslog(msg, src, dateTime);
        }
      } else if (parent && parent.jslog && jslog != parent.jslog) {
        parent.jslog(msg, src, dateTime);
      } else {
        if (window.console && window.console.log)
          console.log(msg);
      }
    } catch (e) {}
  }
  var api = {
    set trace(value) {
      trace = !!value;
    },
    get trace() {
      return trace;
    },
    set suppressEvents(value) {
      suppressEvents = !!value;
    },
    get suppressEvents() {
      return suppressEvents;
    },
    get events() {
      return events;
    },
    on: on,
    un: un,
    unAll: unAll,
    forward: forward,
    isFiring: isFiring,
    fireEvent: fireEvent,
    observe: observe,
    fire: fire,
    fireTop: fireTop,
    fireAll: fireAll,
    fireToWindow: fireToWindow,
    isTopWindow: isTopWindow,
    fireUp: fireUp,
    toString: function() {
      return 'CustomEventManager';
    }
  };
  registerPostMessageEvent();
  return api;
})(NOW.CustomEvent);
NOW.CustomEvent = CustomEventManager;
if (typeof CustomEvent !== "undefined") {
  CustomEvent.observe = NOW.CustomEvent.observe.bind(NOW.CustomEvent);
  CustomEvent.fire = NOW.CustomEvent.fire.bind(NOW.CustomEvent);
  CustomEvent.fireUp = NOW.CustomEvent.fireUp.bind(NOW.CustomEvent);
  CustomEvent.fireTop = NOW.CustomEvent.fireTop.bind(NOW.CustomEvent);
  CustomEvent.fireAll = NOW.CustomEvent.fireAll.bind(NOW.CustomEvent);
  CustomEvent.fireToWindow = NOW.CustomEvent.fireToWindow.bind(NOW.CustomEvent);
  CustomEvent.on = NOW.CustomEvent.on.bind(NOW.CustomEvent);
  CustomEvent.un = NOW.CustomEvent.un.bind(NOW.CustomEvent);
  CustomEvent.unAll = NOW.CustomEvent.unAll.bind(NOW.CustomEvent);
  CustomEvent.forward = NOW.CustomEvent.forward.bind(NOW.CustomEvent);
  CustomEvent.isFiring = NOW.CustomEvent.isFiring.bind(NOW.CustomEvent);
  CustomEvent.fireEvent = NOW.CustomEvent.fireEvent.bind(NOW.CustomEvent);
  CustomEvent.events = NOW.CustomEvent.events;
  CustomEvent.isTopWindow = NOW.CustomEvent.isTopWindow.bind(NOW.CustomEvent);
} else {
  window.CustomEvent = NOW.CustomEvent;
};
/*! RESOURCE: /scripts/classes/ui/Point.js */
var Point = Class.create();
Point.prototype = {
  initialize: function(x, y) {
    this.x = x;
    this.y = y;
  },
  getX: function() {
    return this.x;
  },
  getY: function() {
    return this.y;
  }
};
/*! RESOURCE: /scripts/classes/util/CookieJar.js */
var CookieJar = Class.create({
  appendString: "__CJ_",
  initialize: function(options) {
    this.options = {
      expires: 3600,
      path: '',
      domain: '',
      secure: ''
    };
    Object.extend(this.options, options || {});
    if (this.options.expires != '') {
      var date = new Date();
      date = new Date(date.getTime() + (this.options.expires * 1000));
      this.options.expires = '; expires=' + date.toGMTString();
    }
    if (this.options.path != '') {
      this.options.path = '; path=' + escape(this.options.path);
    }
    if (this.options.domain != '') {
      this.options.domain = '; domain=' + escape(this.options.domain);
    }
    if (this.options.secure == 'secure') {
      this.options.secure = '; secure';
    } else {
      this.options.secure = '';
    }
  },
  put: function(name, value) {
    name = this.appendString + name;
    cookie = this.options;
    var type = typeof value;
    switch (type) {
      case 'undefined':
      case 'function':
      case 'unknown':
        return false;
      case 'boolean':
      case 'string':
      case 'number':
        value = String(value.toString());
    }
    var cookie_str = name + "=" + escape(Object.toJSON(value));
    try {
      document.cookie = cookie_str + cookie.expires + cookie.path + cookie.domain + cookie.secure;
    } catch (e) {
      return false;
    }
    return true;
  },
  get: function(name) {
    name = this.appendString + name;
    var cookies = document.cookie.match(name + '=(.*?)(;|$)');
    if (cookies) {
      return (unescape(cookies[1])).evalJSON();
    } else {
      return null;
    }
  }
});;
/*! RESOURCE: /scripts/list_filter.js */
var runFilterHandlers = {}

function setImage(element, src) {
  element = $(element);
  if (!element)
    return;
  element.src = src;
}

function swapImage(imgId, newSrc) {
  return function() {
    setImage(imgId, newSrc);
  };
}

function setDisplay(element, display) {
  var i = $(element);
  i.style.display = display;
}

function runFilter(name) {
  if (queueFilters[name]) {
    columnsGet(name, runFilterCallBack);
    return;
  }
  runFilter0(name);
}

function runFilterCallBack() {
  queueFilters[mainFilterTable] = null;
  runFilter0(mainFilterTable);
}

function runFilter0(name) {
  var filter = getFilter(name);
  if (name.endsWith('.'))
    name = name.substring(0, name.length - 1);
  if (!runFilterHandlers[name])
    return;
  runFilterHandlers[name](name, filter);
}

function saveFilterRadioChange() {
  var div = gel('savefiltergroupref');
  var grp = getMessage('Group');
  if (getGroupSaveOption() == grp)
    div.style.display = "inline";
  else
    div.style.display = "none";
}

function getFilterVisibility() {
  var vis = getGroupSaveOption();
  var me = getMessage('Me');
  var eone = getMessage('Everyone');
  var grp = getMessage('Group');
  if (vis == me)
    return vis;
  if (vis == eone)
    return "GLOBAL";
  if (vis != grp)
    return me;
  var vis = '';
  var e = gel('save_filter_ref_id').value;
  var e = gel(e);
  if (e)
    vis = e.value;
  if (!vis)
    return me;
  return vis;
}

function getGroupSaveOption() {
  var rb = gel('MeRadio');
  if (rb && rb.checked)
    return rb.value;
  rb = gel('EveryoneRadio');
  if (rb && rb.checked)
    return rb.value;
  rb = gel('GroupRadio');
  if (rb && rb.checked)
    return rb.value;
  return getMessage('Me');
};
/*! RESOURCE: /scripts/doctype/simpleStorage.js */
(function(root, factory) {
  "use strict";
  if (typeof define === 'function' && define.amd)
    define(factory);
  else
    root.simpleStorage = factory();
}(this, function() {
  "use strict";
  var VERSION = "0.1.2",
    _storage = false,
    _storage_size = 0,
    _storage_available = false,
    _ttl_timeout = null;

  function _init() {
    window.localStorage.setItem("__simpleStorageInitTest", "tmpval");
    window.localStorage.removeItem("__simpleStorageInitTest");
    _load_storage();
    _handleTTL();
    _setupUpdateObserver();
    if ("addEventListener" in window) {
      window.addEventListener("pageshow", function(event) {
        if (event.persisted) {
          _reloadData();
        }
      }, false);
    }
    _storage_available = true;
  }

  function _setupUpdateObserver() {
    if ("addEventListener" in window)
      window.addEventListener("storage", _reloadData, false);
    else
      document.attachEvent("onstorage", _reloadData);
  }

  function _reloadData() {
    try {
      _load_storage();
    } catch (E) {
      _storage_available = false;
      return;
    }
    _handleTTL();
  }

  function _load_storage() {
    var source = localStorage.getItem("simpleStorage");
    try {
      _storage = JSON.parse(source) || {};
    } catch (E) {
      _storage = {};
    }
    _storage_size = _get_storage_size();
  }

  function _save() {
    try {
      localStorage.setItem("simpleStorage", JSON.stringify(_storage));
      _storage_size = _get_storage_size();
    } catch (E) {
      return E;
    }
    return true;
  }

  function _get_storage_size() {
    var source = localStorage.getItem("simpleStorage");
    return source ? String(source).length : 0;
  }

  function _handleTTL() {
    var curtime, i, len, expire, keys, nextExpire = Infinity,
      expiredKeysCount = 0;
    clearTimeout(_ttl_timeout);
    if (!_storage || !_storage.__simpleStorage_meta || !_storage.__simpleStorage_meta.TTL)
      return;
    curtime = +new Date();
    keys = _storage.__simpleStorage_meta.TTL.keys || [];
    expire = _storage.__simpleStorage_meta.TTL.expire || {};
    for (i = 0, len = keys.length; i < len; i++) {
      if (expire[keys[i]] <= curtime) {
        expiredKeysCount++;
        delete _storage[keys[i]];
        delete expire[keys[i]];
      } else {
        if (expire[keys[i]] < nextExpire) {
          nextExpire = expire[keys[i]];
        }
        break;
      }
    }
    if (nextExpire != Infinity) {
      _ttl_timeout = setTimeout(_handleTTL, Math.min(nextExpire - curtime, 0x7FFFFFFF));
    }
    if (expiredKeysCount) {
      keys.splice(0, expiredKeysCount);
      _cleanMetaObject();
      _save();
    }
  }

  function _setTTL(key, ttl) {
    var curtime = +new Date(),
      i, len, added = false;
    ttl = Number(ttl) || 0;
    if (ttl !== 0) {
      if (_storage.hasOwnProperty(key)) {
        if (!_storage.__simpleStorage_meta)
          _storage.__simpleStorage_meta = {};
        if (!_storage.__simpleStorage_meta.TTL)
          _storage.__simpleStorage_meta.TTL = {
            expire: {},
            keys: []
          };
        _storage.__simpleStorage_meta.TTL.expire[key] = curtime + ttl;
        if (_storage.__simpleStorage_meta.TTL.expire.hasOwnProperty(key)) {
          for (i = 0, len = _storage.__simpleStorage_meta.TTL.keys.length; i < len; i++) {
            if (_storage.__simpleStorage_meta.TTL.keys[i] == key) {
              _storage.__simpleStorage_meta.TTL.keys.splice(i);
            }
          }
        }
        for (i = 0, len = _storage.__simpleStorage_meta.TTL.keys.length; i < len; i++) {
          if (_storage.__simpleStorage_meta.TTL.expire[_storage.__simpleStorage_meta.TTL.keys[i]] > curtime + ttl) {
            _storage.__simpleStorage_meta.TTL.keys.splice(i, 0, key);
          }
        }
        if (!added)
          _storage.__simpleStorage_meta.TTL.keys.push(key);
      } else
        return false;
    } else {
      if (_storage && _storage.__simpleStorage_meta && _storage.__simpleStorage_meta.TTL) {
        if (_storage.__simpleStorage_meta.TTL.expire.hasOwnProperty(key)) {
          delete _storage.__simpleStorage_meta.TTL.expire[key];
          for (i = 0, len = _storage.__simpleStorage_meta.TTL.keys.length; i < len; i++) {
            if (_storage.__simpleStorage_meta.TTL.keys[i] == key) {
              _storage.__simpleStorage_meta.TTL.keys.splice(i, 1);
              break;
            }
          }
        }
        _cleanMetaObject();
      }
    }
    clearTimeout(_ttl_timeout);
    if (_storage && _storage.__simpleStorage_meta && _storage.__simpleStorage_meta.TTL && _storage.__simpleStorage_meta.TTL.keys.length) {
      _ttl_timeout = setTimeout(_handleTTL, Math.min(Math.max(_storage.__simpleStorage_meta.TTL.expire[_storage.__simpleStorage_meta.TTL.keys[0]] - curtime, 0), 0x7FFFFFFF));
    }
    return true;
  }

  function _cleanMetaObject() {
    var updated = false,
      hasProperties = false,
      i;
    if (!_storage || !_storage.__simpleStorage_meta)
      return updated;
    if (_storage.__simpleStorage_meta.TTL && !_storage.__simpleStorage_meta.TTL.keys.length) {
      delete _storage.__simpleStorage_meta.TTL;
      updated = true;
    }
    for (i in _storage.__simpleStorage_meta) {
      if (_storage.__simpleStorage_meta.hasOwnProperty(i)) {
        hasProperties = true;
        break;
      }
    }
    if (!hasProperties) {
      delete _storage.__simpleStorage_meta;
      updated = true;
    }
    return updated;
  }
  try {
    _init();
  } catch (E) {}
  return {
    version: VERSION,
    canUse: function() {
      return !!_storage_available;
    },
    set: function(key, value, options) {
      if (key == "__simpleStorage_meta")
        return false;
      if (!_storage)
        return false;
      if (typeof value == "undefined")
        return this.deleteKey(key);
      options = options || {};
      try {
        value = JSON.parse(JSON.stringify(value));
      } catch (E) {
        return E;
      }
      _storage[key] = value;
      _setTTL(key, options.TTL || 0);
      return _save();
    },
    get: function(key) {
      if (!_storage)
        return false;
      if (_storage.hasOwnProperty(key) &&
        key != "__simpleStorage_meta") {
        if (this.getTTL(key)) {
          return _storage[key];
        }
      }
    },
    deleteKey: function(key) {
      if (!_storage)
        return false;
      if (key in _storage) {
        delete _storage[key];
        _setTTL(key, 0);
        return _save();
      }
      return false;
    },
    setTTL: function(key, ttl) {
      if (!_storage)
        return false;
      _setTTL(key, ttl);
      return _save();
    },
    getTTL: function(key) {
      if (!_storage)
        return false;
      if (_storage.hasOwnProperty(key)) {
        if (_storage.__simpleStorage_meta &&
          _storage.__simpleStorage_meta.TTL &&
          _storage.__simpleStorage_meta.TTL.expire &&
          _storage.__simpleStorage_meta.TTL.expire
          .hasOwnProperty(key)) {
          var ttl = Math.max(_storage.__simpleStorage_meta.TTL.expire[key] - (+new Date()) || 0, 0);
          return ttl || false;
        } else {
          return Infinity;
        }
      }
      return false;
    },
    flush: function() {
      if (!_storage)
        return false;
      _storage = {};
      _storage_size = 0;
      try {
        localStorage.removeItem("simpleStorage");
        return true;
      } catch (E) {
        return E;
      }
    },
    index: function() {
      if (!_storage)
        return false;
      var index = [],
        i;
      for (i in _storage) {
        if (_storage.hasOwnProperty(i) &&
          i != "__simpleStorage_meta") {
          index.push(i);
        }
      }
      return index;
    },
    storageSize: function() {
      return _storage_size;
    },
    getStorage: function() {
      return _storage;
    }
  };
}));;
/*! RESOURCE: /scripts/doctype/GwtMessage14.js */
var GwtMessage = Class.create({
  DEFAULT_LANGUAGE: "en",
  PREFETCH_ENTRY_KEY: "PREFETCH_ENTRY_KEY",
  initialize: function() {},
  set: function(n, v) {
    if (!v)
      GwtMessage._messages[n] = true;
    else
      GwtMessage._messages[n] = v;
  },
  format: function(msg) {
    if (!msg)
      return "";
    var str = msg;
    for (var i = 1; i < arguments.length; i++) {
      var paramIndex = i - 1;
      var rx = new RegExp("\{[" + paramIndex + "]\}", "g");
      str = str.replace(rx, arguments[i]);
    }
    return str;
  },
  getMessage: function(strVal) {
    var valList = [];
    valList.push(strVal);
    var messages = this.getMessages(valList);
    var msg = messages[strVal];
    if (arguments.length > 1) {
      var realArray = [].slice.call(arguments, 0);
      realArray[0] = msg;
      msg = this.format.apply(this, realArray);
    }
    return msg;
  },
  getMessages: function(resolveList) {
    var pageMsgs = {};
    var dataRequiringAjaxCall = [];
    var results = {};
    for (var i = 0; i < resolveList.length; i++) {
      var v = GwtMessage._messages[resolveList[i]];
      if (v === true)
        pageMsgs[resolveList[i]] = resolveList[i];
      else if (v)
        pageMsgs[resolveList[i]] = v;
      else
        dataRequiringAjaxCall.push(resolveList[i]);
    }
    if (dataRequiringAjaxCall.length > 0) {
      this._loadNewMessages(dataRequiringAjaxCall);
      results = this._buildListFromCache(dataRequiringAjaxCall);
    }
    for (var key in pageMsgs)
      results[key] = pageMsgs[key];
    return results;
  },
  _loadNewMessages: function(resolveList) {
    var cachedMessages = this._findCachedKeys(resolveList);
    var keysToResolve = this._removeCachedEntries(resolveList, cachedMessages);
    if (keysToResolve.length == 0)
      return;
    var ajax = new GlideAjax("SysMessageAjax");
    ajax.addParam("sysparm_keys", keysToResolve.length);
    ajax.addParam("sysparm_prefetch", this._shouldPrefetch() ? "true" : "false");
    for (var i = 0; i < keysToResolve.length; i++) {
      var keyVal = "key" + i;
      ajax.addParam(keyVal, keysToResolve[i]);
    }
    var rxml = ajax.getXMLWait();
    this._processResponse(rxml);
  },
  _removeCachedEntries: function(resolveList) {
    var messagesToResolve = new Array();
    for (var i = 0; i < resolveList.length; i++) {
      var key = resolveList[i];
      if (this._getCache().get(key))
        continue;
      messagesToResolve.push(key);
    }
    return messagesToResolve;
  },
  _processResponse: function(rxml) {
    this._processItems(rxml, "preitem");
    this._processItems(rxml, "item");
  },
  _shouldPrefetch: function() {
    var pf = this._getCache().get(this._PREFETCH_ENTRY_KEY);
    var now = new Date().getTime();
    if (typeof pf == 'undefined' || (pf + 60000) < now) {
      this._getCache().put(this._PREFETCH_ENTRY_KEY, now);
      return true;
    }
    return false;
  },
  _processItems: function(xml, name) {
    var items = xml.getElementsByTagName(name);
    for (var i = 0; i < items.length; i++) {
      var key = items[i].getAttribute("key");
      var value = items[i].getAttribute("value");
      this.setMessage(key, value);
    }
  },
  setMessage: function(key, msg) {
    this._getCache().put(key, msg);
  },
  isDefaultLanguage: function() {
    return this.getLanguage() == this.getDefaultLanguage();
  },
  getLanguage: function() {
    return g_lang;
  },
  getDefaultLanguage: function() {
    return this.DEFAULT_LANGUAGE;
  },
  _findCachedKeys: function(resolveList) {
    var answer = new Array();
    var cache = this._getCache();
    for (var i = 0; i < resolveList.length; i++) {
      var key = resolveList[i];
      var value = cache.get(key);
      if (value)
        answer.push(key);
    }
    return answer;
  },
  _buildListFromCache: function(resolveList) {
    var answer = {};
    var cache = this._getCache();
    for (var i = 0; i < resolveList.length; i++) {
      var key = resolveList[i];
      var value = cache.get(key);
      answer[key] = value;
    }
    return answer;
  },
  _getCache: function() {
    if (NOW.useSimpleStorage && simpleStorage.canUse()) {
      var synch = simpleStorage.get("simpleStorageSynch");
      if (NOW.simpleStorageSynch != synch) {
        jslog("*** simpleStorageSynch, size: " + simpleStorage.storageSize());
        simpleStorage.flush();
        simpleStorage.set("simpleStorageSynch", NOW.simpleStorageSynch);
      }
      return {
        put: function(key, value) {
          return simpleStorage.set("MSG_" + NOW.language + "_" + key, value);
        },
        get: function(key) {
          return simpleStorage.get("MSG_" + NOW.language + "_" + key);
        }
      }
    }
    try {
      if (getTopWindow().g_cache_message)
        return getTopWindow().g_cache_message;
    } catch (e) {}
    if (typeof(g_cache_message) != "undefined")
      return g_cache_message;
    g_cache_message = new GlideClientCache(500);
    return g_cache_message;
  },
  fetch: function(resolveList, callback) {
    var cachedMessages = this._findCachedKeys(resolveList);
    var keysToResolve = this._removeCachedEntries(resolveList, cachedMessages);
    if (keysToResolve.length == 0) {
      var answer = this.getMessages(resolveList);
      callback(answer);
      return;
    }
    var ajax = new GlideAjax("SysMessageAjax");
    ajax.addParam("sysparm_keys", keysToResolve.length);
    ajax.addParam("sysparm_prefetch", this._shouldPrefetch() ? "true" : "false");
    for (var i = 0; i < keysToResolve.length; i++) {
      var keyVal = "key" + i;
      ajax.addParam(keyVal, keysToResolve[i]);
    }
    ajax.getXML(this.fetched.bind(this), null, {
      fn: callback,
      list: resolveList
    });
  },
  fetched: function(response, parms) {
    this._processResponse(response.responseXML);
    var answer = this.getMessages(parms.list);
    parms.fn(answer);
  }
});
GwtMessage._messages = {};

function getMessage(msg, callback) {
  if (typeof callback == "function") {
    if (typeof msg == "object")
      new GwtMessage().fetch(msg, callback);
    else
      new GwtMessage().fetch([msg], function(o) {
        callback(o[msg]);
      });
  } else {
    if (typeof msg == "object")
      return new GwtMessage().getMessages(msg);
    return new GwtMessage().getMessage(msg);
  }
}

function getMessages(msgs) {
  return new GwtMessage().getMessages(msgs);
};
/*! RESOURCE: /scripts/classes/GlideFilterDescription.js */
var GlideFilterDescription = Class.create({
  initialize: function() {},
  choices: null,
  setParsedQuery: function(strVal) {
    this.parsedQuery = strVal;
  },
  getParsedQuery: function() {
    return this.parsedQuery;
  },
  setBaseLine: function(value) {
    this.baseLine = value;
  },
  getBaseLine: function() {
    return this.baseLine;
  },
  setMetaData: function(value) {
    this.metaData = value;
  },
  getMetaData: function() {
    return this.metaData;
  },
  setPreferenceParam: function(value) {
    this.preference = value;
  },
  getPreferenceParam: function() {
    return this.preference;
  },
  setExpanded: function(value) {
    this.expanded = value;
  },
  getExpanded: function() {
    return this.expanded;
  },
  setName: function(value) {
    this.name = value;
  },
  getName: function() {
    return this.name;
  },
  setFilter: function(value) {
    this.filter = value;
  },
  getFilter: function() {
    return this.filter;
  },
  setTableName: function(value) {
    this.tableName = value;
  },
  getTableName: function() {
    return this.tableName;
  },
  setPinned: function(value) {
    this.pinned = value;
  },
  getPinned: function() {
    return this.pinned;
  },
  setMainFilterTable: function(filterTable) {
    this.mainFilterTable = filterTable;
  },
  getMainFilterTable: function() {
    return this.mainFilterTable;
  },
  setPinnable: function(value) {
    this.pinnable = value;
  },
  getPinnable: function() {
    return this.pinnable;
  },
  setShowRelated: function(value) {
    this.showRelated = value;
  },
  getShowRelated: function() {
    return this.showRelated;
  },
  setChoiceListMap: function(value) {
    this.choiceList = value;
  },
  getChoiceList: function(table) {
    if (typeof this.choiceList == 'undefined')
      return null;
    return this.choiceList[table];
  }
});;
/*! RESOURCE: /scripts/classes/GlideFilterHandlers.js */
var GlideFilterHandler = Class.create({
  MAP_OPEN: "$" + "{",
  filterClass: "",
  initialize: function(tableName, item, mappingId) {
    this.maxValues = 0;
    this.tableName = tableName;
    this.item = item;
    this.isRightOperandShowingRelatedFields = false;
    this.lastOperator = null;
    this.mappingId = mappingId;
  },
  destroy: function() {
    if (this.tr) {
      if (this.tr.operSel)
        this.tr.operSel.onchange = null;
      this.tr = null;
    }
    for (i = 0; i < this.inputCnt; i++) {
      this.inputs[i].onkeypress = null;
      this.inputs[i].onchange = null;
      this.inputs[i] = null;
    }
    this.destroyMappingSupport();
  },
  create: function(tr, values, filterClass) {
    this.tr = tr;
    if (values && values.indexOf(this.MAP_OPEN) != -1) {
      console.log("implement GlideFilterHandler#create mapping support");
    }
    this._setup(values);
    this._init(values);
    this._build(filterClass);
    if (this.listenForOperChange)
      this.tr.operSel.onchange = this._operOnChange.bind(this);
    this.isRightOperandShowingRelatedFields = false;
    this.lastOperator = this._getOperator();
  },
  _setup: function(values) {},
  getTableName: function() {
    return this.tableName;
  },
  getFilterText: function(oper) {
    return '';
  },
  _init: function(values) {
    this._initValues(values);
    this._initialMappingValue = values;
    this._initInputs();
  },
  _initValues: function(values) {
    var op = this._getOperator();
    if (!values)
      this.values = [];
    else if (this.tr && this.tr.varType === "variables" && !this.userDateFormat) {
      this.values = [values];
    } else
      this.values = values.split("@");
    for (var i = this.values.length; i < this.maxValues; i++)
      this.values[i] = "";
  },
  _initInputs: function() {
    this.inputCnt = 0;
    this.inputs = [];
    for (var i = 0; i < this.maxValues; i++)
      this.inputs[i] = null;
  },
  _clearValues: function() {
    this.values = [];
    for (var i = 0; i < this.maxValues; i++)
      this.values[i] = "";
  },
  _isEmptyOper: function() {
    var op = this._getOperator();
    if (op == 'ISEMPTY' || op == 'ISNOTEMPTY' || op == 'ANYTHING' || op == 'EMPTYSTRING' || op == 'VALCHANGES') {
      this._clearValues();
      return true;
    }
    return false;
  },
  _getOperator: function() {
    return getSelectedOption(this.tr.operSel).value;
  },
  _getInputValue: function(el) {
    var value = "";
    if (el == null)
      return value;
    if (el.tagName.toUpperCase() == "TEXTAREA")
      return el.value;
    if (el.tagName.toUpperCase() == "INPUT")
      return this._escapeIfRequired(el.value);
    var options = el.options;
    if (el.multiple) {
      var vals = [];
      for (var i = 0; i < options.length; i++) {
        if (options[i].selected)
          vals.push(options[i].value);
      }
      return vals.join(",");
    }
    return options[el.selectedIndex].value;
  },
  _escapeIfRequired: function(value) {
    if (this._getOperator() == "BETWEEN") {
      if (value == null) {
        for (var i = 0; i < this.values; i++)
          this.values[i] = this._escape(this.values[i]);
        return this.values;
      }
      return this._escape(value);
    }
    return value;
  },
  _escape: function(value) {
    if (value == null)
      return;
    value = value.replace(/\\/g, "\\\\")
    value = value.replace(/@/g, "\\@")
    return value;
  },
  _unescapeIfRequired: function() {
    if (this._getOperator() == "BETWEEN")
      for (var i = 0; i < this.values.length; i++)
        this.values[i] = this._unescape(this.values[i]);
  },
  _unescape: function(value) {
    return this._parseValues(value, '@')[0];
  },
  _addTextInput: function(type, td) {
    if (!td)
      td = this.tr.tdValue;
    var input = addTextInput(td, this.values[this.inputCnt], type);
    this.inputs[this.inputCnt] = input;
    this.inputCnt++;
    return input;
  },
  _addBetweenTextInput: function(type, td) {
    if (!td)
      td = this.tr.tdValue;
    var input = addTextInput(td, this.values[this.inputCnt], type);
    this.inputs[this.inputCnt] = input;
    this.inputCnt++;
    return input;
  },
  _addTextArea: function() {
    var input = addTextArea(this.tr.tdValue, this.values[this.inputCnt]);
    this.inputs[this.inputCnt] = input;
    this.inputCnt++;
    return input;
  },
  _addSelect: function(width, multi, size) {
    var s = _createFilterSelect(width, multi, size);
    this.tr.tdValue.appendChild(s);
    this.inputs[this.inputCnt] = s;
    this.inputCnt++;
    return s;
  },
  _operOnChange: function() {
    var lastOp = this.lastOperator;
    this.lastOperator = this._getOperator();
    if ((fieldComparisonOperators.indexOf(lastOp) >= 0) != (fieldComparisonOperators.indexOf(this.lastOperator) >= 0) || lastOp == "DYNAMIC") {
      this.inputCnt = 0;
      this.input = [];
    }
    this.getValues();
    this._unescapeIfRequired();
    this._build();
  },
  _isTemplate: function() {
    var t = this.tr;
    while (t) {
      t = findParentByTag(t, 'table');
      if (t) {
        var id = t.id + '';
        if (id.indexOf('filters_table') != -1)
          break;
      }
    }
    if (!t)
      return false;
    return t.getAttribute('gsft_template') == 'true';
  },
  _renderDynamicOperandInput: function(op) {
    if (typeof g_dynamic_filter_options == "undefined")
      return false;
    if (op != "DYNAMIC")
      return false;
    var addedReferenceInput = false;
    var arr = g_dynamic_filter_options.split("##");
    for (var i = 0; i < arr.length; i++) {
      var aItem = arr[i];
      if (aItem.length == 0)
        continue;
      var aItemArr = aItem.split("::");
      if (aItemArr.length < 3)
        continue;
      var isExclusiveDynamic = typeof gtf_exclusive_dynamics != 'undefined' && gtf_exclusive_dynamics == "true";
      if (!isExclusiveDynamic && this.item && this.item.getReference() == aItemArr[2] || this.originalTableName == aItemArr[3]) {
        if (!addedReferenceInput)
          var input = this._addSelect(180, false, 1);
        var arrInput = [];
        arrInput.push(aItemArr[1]);
        var translated = getMessages(arrInput);
        addOption(input, aItemArr[0], translated[aItemArr[1]], this.rightOperand == aItemArr[0]);
        addedReferenceInput = true;
      }
    }
    return addedReferenceInput;
  },
  setOriginalTable: function(tableNameFull) {
    if (tableNameFull.indexOf(".") == -1)
      this.originalTableName = tableNameFull;
    else
      this.originalTableName = tableNameFull.split(".")[1];
  },
  getValues: function() {
    this._clearValues();
    if (this.inputCnt == 0)
      return "";
    for (var i = 0; i < this.maxValues; i++)
      this.values[i] = this._getInputValue(this.inputs[i]);
    if (this._isMappingEnabled)
      return this.getMappingValue();
    if (this.inputCnt == 1)
      return this.values[0];
    else
      return this.values.join("@");
  },
  _populateRightOperandChoices: function() {
    var field = this.item.name;
    var table = "";
    if (typeof mainFilterTable == "undefined")
      table = firstTable;
    else
      table = mainFilterTable;
    var selection = this.values[0];
    if (null != table && "" != table && null != field && "" != field) {
      var s = this._addSelect(this.width, false, 1);
      s.onchange = this.rightOperandfieldOnChange.bind(s, table, this);
      var completeSelection = "";
      if (selection)
        completeSelection = table + '.' + selection;
      else
        completeSelection = table;
      var showRelatedFields = "no";
      if (this.isRightOperandShowingRelatedFields || (selection && selection.indexOf(".") >= 0))
        showRelatedFields = "yes";
      this.addChoices(s, completeSelection, "",
        this._filterRightOperand, selection, null,
        showRelatedFields, this.item);
      if (null != selection)
        this.selectRightOperand(s, selection);
    }
  },
  selectRightOperand: function(select, selection) {
    var o = getSelectedOption(select);
    var options = select.options;
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      if (null != option && option.value == selection) {
        option.innerHTML = getFullLabel(option);
        option.style.color = 'green';
        option.wasSelected = 'true';
        select.style.width = "240px";
        option.selected = true;
        select.selectedIndex = i;
        break;
      }
    }
  },
  _getReportTable: function() {
    return firstTable;
  },
  rightOperandfieldOnChange: function(table, t) {
    var fieldName = this.value;
    var idx = fieldName.indexOf("...");
    var f = fieldName.substring(0, idx);
    if (f != table)
      f = table + "." + f;
    f = f + ".";
    if (idx != -1) {
      if (fieldName == '...Show Related Fields...') {
        t.isRightOperandShowingRelatedFields = true;
        t.addChoices(this, f, "", t._filterRightOperand,
          fieldName, null, "yes", t.item);
      } else if (fieldName == '...Remove Related Fields...') {
        t.isRightOperandShowingRelatedFields = false;
        t.addChoices(this, f, "", t._filterRightOperand,
          fieldName, null, "no", t.item);
      } else {
        t.isRightOperandShowingRelatedFields = true;
        t.addChoices(this, f, "", t._filterRightOperand,
          fieldName, null, "yes", t.item);
      }
      return;
    }
    var o = getSelectedOption(this);
    var fieldName = o.value;
    var name = currentTable = getTableFromOption(o);
    var options = this.options;
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      if (optionWasSelected(option)) {
        option.innerHTML = getNormalLabel(option);
        option.style.color = 'black';
        option.wasSelected = 'false';
        break;
      }
    }
    if (setup(name) == false)
      return;
    var tr = this.parentNode.parentNode;
    o.normalLabel = o.innerHTML;
    o.innerHTML = getFullLabel(o);
    o.style.color = 'green';
    o.wasSelected = 'true';
    this.style.width = "240px";
  },
  addChoices: function(s, target, fValue, filterMethod, fieldName, filter, showRelated, leftOperandElement) {
    var forFilter;
    var onlyRestrictedFields;
    if (filter) {
      forFilter = filter.getOpsWanted();
      onlyRestrictedFields = filter.onlyRestrictedFields;
    }
    var messages = getMessages(MESSAGES_CONDITION_RELATED_FILES);
    while (s.length > 0)
      s.remove(0);
    var placeholder = false;
    var selindex = 0;
    var indentLabel = false;
    var savedItems = new Object();
    var savedLabels = new Array();
    var labelPrefix = '';
    var headersAdded = false;
    var parts = target.split(".");
    var tableName = parts[0];
    var tableDef = getTableReference(tableName);
    var extension = '';
    var prefix = '';
    if (parts.length > 1 && parts[1] != null && parts[1] != '') {
      var o = null;
      if (filterExpanded && parts.length > 2) {
        var tableLabel = tableDef.getLabel();
        if (tableLabel == null)
          tableLabel = "Parent";
        o = addOption(s, tableDef.getName() + "...", tableLabel +
          " " + messages['lowercase_fields'], false);
        o.tableName = tableDef.getName();
        o.style.color = 'blue';
      }
      if (parts[1] == PLACEHOLDERFIELD) {
        o = addOption(s, PLACEHOLDER,
          messages['-- choose field --'], true);
        o.style.color = 'blue';
        o.tableName = tableDef.getName();
        o.fullLabel = messages['-- choose field --'];
        placeholder = true;
      }
      var sPeriod = "";
      var cname = '';
      for (var i = 1; i < parts.length - 1; i++) {
        var f = parts[i];
        if (f == null || f == '')
          break;
        var elementDef = tableDef.getElement(parts[i]);
        if (elementDef == null)
          break;
        var childTable = tableName;
        if (elementDef.isReference()) {
          childTable = elementDef.getReference();
          if (elementDef.isExtensionElement())
            extension = childTable;
          else
            extension = '';
        } else {
          if (fieldName != null && fieldName.indexOf("...") > -1) {
            childTable = parts[0];
          } else {
            break;
          }
        }
        var parentTable = (extension != '') ? extension : elementDef.getTable().getName();
        var tableDef = getTableReference(childTable, parentTable);
        if (cname.length)
          cname = cname + ".";
        cname += elementDef.getName();
        sPeriod = "." + sPeriod;
        var clabel = sPeriod + elementDef.getLabel() + "-->" +
          elementDef.getRefLabel() + " " +
          messages['lowercase_fields'];
        o = addOption(s, cname + "...", clabel, false);
        o.tablename = tableDef.getName();
        o.style.color = 'blue';
        selindex++;
        indentLabel = true;
        headersAdded = true;
        if (labelPrefix.length)
          labelPrefix += ".";
        labelPrefix += elementDef.getLabel();
        if (prefix.length)
          prefix += ".";
        prefix += elementDef.getName();
      }
    }
    columns = tableDef.getColumns();
    queueColumns[tableDef.getName()] = columns;
    var textIndex = false;
    if (!noOps && !indentLabel) {
      var root = columns.getElementsByTagName("xml");
      if (root != null && root.length == 1) {
        root = root[0];
        textIndex = root.getAttribute("textIndex");
      }
    }
    var items = (extension != '') ? tableDef.getTableElements(extension) : tableDef.getElements();
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var t = item.getName();
      if (filterMethod != null && t != fValue) {
        if (filterMethod(leftOperandElement, item,
            this.isRightOperandShowingRelatedFields) == true) {
          continue;
        }
      }
      var t = item.getName();
      if (prefix != '')
        t = prefix + '.' + t;
      if (!noOps && item.getAttribute("filterable") == "no" && !allowConditionsForJournal(item.getAttribute("type"), filter))
        continue;
      if (!item.canRead()) {
        if (t != fValue) {
          continue;
        } else {
          item.setCanRead('yes');
        }
      }
      if (!item.isActive()) {
        if (t != fValue) {
          continue;
        } else {
          item.setActive('yes');
        }
      }
      var label = item.getLabel();
      if ((!elementDef || elementDef.getType() != "glide_var") &&
        !item.isReference()) {
        savedItems[label] = t;
        savedLabels[savedLabels.length] = label;
      }
      if (item.isReference() && leftOperandElement.isReference()) {
        if (item.getReference() == leftOperandElement.getReference()) {
          savedItems[label] = t;
          savedLabels[savedLabels.length] = label;
        }
      }
      if (item.isReference() && !item.isRefRotated() &&
        item.getType() != 'glide_list' && filterExpanded &&
        showRelated == 'yes') {
        label += "-->" + item.getRefLabel();
        label += " " + messages['lowercase_fields'];
        t += "...";
        savedItems[label] = t;
        savedLabels[savedLabels.length] = label;
      }
    }
    items = tableDef.getExtensions();
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var label = item.getLabel() + " (+)";
      t = item.getExtName() + "...";
      if (prefix != '')
        t = prefix + '.' + t;
      savedItems[label] = t;
      savedLabels[savedLabels.length] = label;
    }
    if (!onlyRestrictedFields &&
      ((fValue == TEXTQUERY || textIndex) &&
        filterMethod == null || forFilter)) {
      o = addOption(s, TEXTQUERY, messages['Keywords'], (fValue == TEXTQUERY));
      o.fullLabel = messages['Keywords'];
    }
    for (var i = 0; i < savedLabels.length; i++) {
      var sname = savedLabels[i];
      var o = addOption(s, savedItems[sname], sname, savedItems[sname] == fValue);
      o.tableName = tableDef.getName();
      if (labelPrefix != '')
        o.fullLabel = labelPrefix + "." + sname;
      else
        o.fullLabel = sname;
      if (indentLabel) {
        var yyy = o.innerHTML;
        o.innerHTML = "&nbsp;&nbsp;&nbsp;" + yyy;
      }
      var v = o.value;
      if (v.indexOf("...") != -1)
        if (o.fullLabel.indexOf("(+)") == -1)
          o.style.color = 'blue';
        else
          o.style.color = 'darkred';
    }
    if (filterExpanded && !onlyRestrictedFields) {
      if (showRelated != 'yes') {
        var o = addOption(s, "...Show Related Fields...", messages['Show Related Fields'], false);
        o.style.color = 'blue';
      } else {
        var o = addOption(s, "...Remove Related Fields...", messages['Remove Related Fields'], false);
        o.style.color = 'blue';
      }
    }
    if (!placeholder && (s.selectedIndex == 0 && ((textIndex && fValue != TEXTQUERY) || headersAdded)))
      s.selectedIndex = selindex;
    if (s.selectedIndex >= 0) {
      fValue = getSelectedOption(s).value;
    }
    return s;
  },
  _filterRightOperand: function(leftOperandElement, rightOperandElement, isRightOperandShowingRelatedFields) {
    var filterOut = true;
    if (null != leftOperandElement && null != rightOperandElement) {
      var leftType = leftOperandElement.getType();
      var rightType = rightOperandElement.getType();
      if ('reference' != leftType) {
        if ('reference' == rightType && isRightOperandShowingRelatedFields)
          filterOut = false;
        if (leftType == rightType)
          filterOut = false;
      } else {
        if ('reference' == rightType)
          filterOut = false;
      }
    }
    return filterOut;
  },
  _renderRightOperandAsFieldList: function(operation) {
    if ("SAMEAS" == operation || "NSAMEAS" == operation ||
      "GT_FIELD" == operation || "LT_FIELD" == operation ||
      "GT_OR_EQUALS_FIELD" == operation ||
      "LT_OR_EQUALS_FIELD" == operation)
      return true;
    return false;
  },
  _addSameAsLabels: function(t, op) {
    if (op == 'SAMEAS' || op == 'NSAMEAS') {
      var ASMSG = getMessage('as');
      var FROMMSG = getMessage('from');
      var span = cel("span", t.tr.tdValue);
      span.style.marginLeft = "3px";
      span.style.marginRight = "5px";
      if (op == 'SAMEAS')
        span.innerHTML = ASMSG;
      else
        span.innerHTML = FROMMSG;
    }
  },
  _parseValues: function(value, delimiter) {
    var sb = "";
    var parts = [];
    if (value == null)
      value = ""
    var escapeChar = '\\';
    var escaped = false;
    for (var i = 0; i < value.length; i++) {
      var checkChar = value.substr(i, 1);
      if (!escaped) {
        if (checkChar == escapeChar) {
          escaped = true;
          continue;
        }
        if (checkChar == delimiter) {
          parts.push(sb);
          sb = "";
          continue;
        }
      } else
        escaped = false;
      sb += checkChar;
    }
    parts.push(sb);
    return parts;
  },
  setFilterClass: function(filterClass) {
    this.filterClass = filterClass;
  },
  getFilterClass: function() {
    return this.filterClass;
  },
  initMappingSupport: function(shouldEnable, type, mappingMgr) {
    var that = this;
    var td = this.tr.tdMapping;
    this._parentMappingMgr = mappingMgr;
    if (!td || !mappingMgr)
      return;
    this.mappingType = type;
    if (shouldEnable) {
      td.innerHTML = '<input type="hidden" class="mapping_condition_input" >';
    } else {
      td.innerHTML = "";
    }
    this.mappingInput = td.querySelector(".mapping_condition_input");
    var value = this._initialMappingValue || "";
    this._initMappingValue(value);
    this._initialMappingValue = null;
    this._parentMappingMgr.initElement(this);
  },
  _initMappingValue: function(value) {
    if (value.indexOf("{{") !== -1) {
      this.setMappingValue(value);
      this.activateMapping();
    } else {
      this.deactivateMapping();
    }
  },
  destroyMappingSupport: function() {
    if (this._parentMappingMgr && typeof this._parentMappingMgr.destroyElement === "function")
      this._parentMappingMgr.destroyElement(this);
  },
  activateMapping: function() {
    this._isMappingEnabled = true;
    if (!this.tr)
      return;
    this.tr.tdValue.style.display = "none";
    addClassName(this.tr.tdMapping, "active");
    if (this._parentMappingMgr && typeof this._parentMappingMgr.notifyStateChange === "function")
      this._parentMappingMgr.notifyStateChange(this);
  },
  deactivateMapping: function() {
    this._isMappingEnabled = false;
    if (!this.tr)
      return;
    this.tr.tdValue.style.display = "";
    removeClassName(this.tr.tdMapping, "active");
    if (this._parentMappingMgr && typeof this._parentMappingMgr.notifyStateChange === "function")
      this._parentMappingMgr.notifyStateChange(this);
  },
  _getMappingInput: function() {
    return this.tr.tdMapping.querySelector(".mapping_condition_input");
  },
  getMappingValue: function() {
    return this._getMappingInput().value;
  },
  setMappingValue: function(value) {
    this._getMappingInput().value = value;
  }
});
var GlideFilterString = Class.create(GlideFilterHandler, {
  _setup: function(values) {
    this.maxValues = 2;
    this.listenForOperChange = true;
    this.rightOperand = values;
  },
  _build: function() {
    clearNodes(this.tr.tdValue);
    this.inputCnt = 0;
    if (this._isEmptyOper())
      return;
    var op = this._getOperator();
    if (this._renderDynamicOperandInput(op))
      return;
    if (this._renderRightOperandAsFieldList(op)) {
      this._addSameAsLabels(this, op);
      this._populateRightOperandChoices();
    } else if (op == 'IN') {
      var saveMe = useTextareas;
      useTextareas = true;
      var inp = this._addTextArea();
      inp.style.width = '20em';
      var v = this.values[this.inputCnt - 1];
      if (this._isTemplate()) {
        inp.value = v;
      } else {
        if (v) {
          if (isMSIE)
            v = v.replace(/,/g, '\n\r');
          else
            v = v.replace(/,/g, '\n');
          inp.value = v;
        }
      }
      useTextareas = saveMe;
    } else
      this._addTextInput();
    if (op == "BETWEEN") {
      var txt = document.createTextNode(" " + getMessage('and') + " ");
      this.tr.tdValue.appendChild(txt);
      this._addTextInput();
    }
  },
  _getInputValue: function(el) {
    if (el == null)
      return '';
    if (!(el.tagName.toUpperCase() == "TEXTAREA"))
      return GlideFilterHandler.prototype._getInputValue.call(this, el);
    var value = el.value + '';
    if (!this._isTemplate()) {
      value = value.replace(/[\n\t]/g, ',');
      value = value.replace(/\r/g, '');
    }
    return this._escapeIfRequired(value);
  },
  _initMappingValue: function(value) {
    this.setMappingValue(value);
    this.activateMapping();
  },
  getValues: function() {
    this._clearValues();
    if (this.inputCnt == 0)
      return "";
    for (var i = 0; i < this.maxValues; i++)
      this.values[i] = this._getInputValue(this.inputs[i]);
    if (this._isMappingEnabled)
      return this.getMappingValue();
    if (this.inputCnt == 1)
      return this.values[0];
    else {
      this._escapeIfRequired();
      return this.values.join("@");
    }
  },
  _initInputs: function() {
    if (this._getOperator() == "DYNAMIC") {
      this.inputCnt = 1;
      this.maxValues = 1;
    } else
      this.inputCnt = 0;
    this.inputs = [];
    for (var i = 0; i < this.maxValues; i++)
      this.inputs[i] = null;
  },
  _initValues: function(values) {
    var op = this._getOperator();
    if (op == "BETWEEN") {
      if (!values)
        this.values = [];
      else
        this.values = this._parseValues(values, "@");
      for (var i = this.values.length; i < this.maxValues; i++)
        this.values[i] = "";
    } else {
      this.values = [];
      this.values[0] = values;
    }
  }
});
var GlideFilterNumber = Class.create(GlideFilterString, {
  _initValues: function(values) {
    var op = this._getOperator();
    if (op == "BETWEEN") {
      if (!values)
        this.values = [];
      else
        this.values = values.split("@");
      for (var i = this.values.length; i < this.maxValues; i++)
        this.values[i] = "";
    } else {
      this.values = [];
      this.values[0] = values;
    }
  }
});
var GlideFilterDuration = Class.create(GlideFilterHandler, {
  _setup: function(values) {
    this.maxValues = 2;
    var valueArray = this._parseValues(values, "@");
    this.duration = new GlideDuration(valueArray[0], this.item);
    if (this._getOperator() == "BETWEEN") {
      this.maxValues = 2;
      if (valueArray.length > 1)
        this.durationTo = new GlideDuration(valueArray[1], this.item);
      else
        this.durationTo = new GlideDuration(valueArray[0], this.item);
    }
    this.listenForOperChange = true;
  },
  destroy: function() {
    if (this.tr)
      this.tr.tdValue.innerHTML = "";
    this.inputCnt = 0;
    GlideFilterHandler.prototype.destroy.call(this);
  },
  _initValues: function(values) {
    this.values = new Array();
    this.values[0] = this.duration.getDays();
    this.values[1] = this.duration.getHours();
    this.values[2] = this.duration.getMinutes();
    this.values[3] = this.duration.getSeconds();
    this.inputCnt = 4;
    if (this._getOperator() == "BETWEEN") {
      this.values[4] = this.duration.getDays();
      this.values[5] = this.duration.getHours();
      this.values[6] = this.duration.getMinutes();
      this.values[7] = this.duration.getSeconds();
      this.inputCnt = 8;
    }
  },
  getValues: function() {
    this._clearValues();
    if (this.inputCnt == 0)
      return "";
    var answer = this.duration.getValue();
    this.values[0] = this.duration.getDays();
    this.values[1] = this.duration.getHours();
    this.values[2] = this.duration.getMinutes();
    this.values[3] = this.duration.getSeconds();
    if (this._isMappingEnabled)
      return this.getMappingValue();
    if (this._getOperator() == "BETWEEN") {
      if (this.durationTo) {
        var answer1 = this.durationTo.getValue();
        this.values[4] = this.durationTo.getDays();
        this.values[5] = this.durationTo.getHours();
        this.values[6] = this.durationTo.getMinutes();
        this.values[7] = this.durationTo.getSeconds();
        return "javascript:gs.getDurationDate('" + answer + "')@javascript:gs.getDurationDate('" + answer1 + "')";
      }
    }
    return "javascript:gs.getDurationDate('" + answer + "')";
  },
  _build: function() {
    clearNodes(this.tr.tdValue);
    this.inputCnt = 0;
    if (this._isEmptyOper())
      return;
    if (this._renderRightOperandAsFieldList(this._getOperator())) {
      this._addSameAsLabels(this, this._getOperator());
      this._populateRightOperandChoices();
    } else {
      this.inputCnt = 1;
      this.duration.buildHTML(this.tr.tdValue);
      if (this._getOperator() == "BETWEEN" && this.maxValues == 2) {
        var txt = document.createTextNode(" " + getMessage('and') + " ");
        this.tr.tdValue.appendChild(txt);
        if (!this.durationTo)
          this.durationTo = new GlideDuration();
        this.durationTo.buildHTML(this.tr.tdValue);
      }
    }
  }
});
var GlideFilterStringMulti = Class.create(GlideFilterString, {
  _setup: function(values) {
    this.maxValues = 1;
    this.listenForOperChange = true;
  },
  _build: function() {
    clearNodes(this.tr.tdValue);
    this.inputCnt = 0;
    if (this._isEmptyOper())
      return;
    if (this._renderDynamicOperandInput(this._getOperator()))
      return;
    if (this._renderRightOperandAsFieldList(this._getOperator())) {
      this._addSameAsLabels(this, this._getOperator());
      this._populateRightOperandChoices();
    } else
      this._addTextArea();
  }
});
var GlideFilterChoice = Class.create(GlideFilterHandler, {
  _setup: function(values) {
    this.maxValues = 2;
    this.listenForOperChange = true;
  },
  setChoices: function(choices) {
    this.choices = choices;
  },
  setWidth: function(width) {
    this.width = width;
  },
  setMulti: function(multi) {
    this.multi = multi;
  },
  setSize: function(size) {
    this.size = size;
  },
  _build: function() {
    clearNodes(this.tr.tdValue);
    this.inputCnt = 0;
    if (this._isEmptyOper())
      return;
    if (this._renderRightOperandAsFieldList(this._getOperator())) {
      this._addSameAsLabels(this, this._getOperator());
      this._populateRightOperandChoices();
    } else {
      var s = this._addSelect(this.width, this.multi, this.size);
      this._fillSelect();
    }
  },
  _fillSelect: function(inputIndex) {
    if (inputIndex == null)
      inputIndex = 0;
    var vars = {};
    if (this.values[inputIndex]) {
      var valSplit = this.values[inputIndex].split(',');
      for (var i = 0; i < valSplit.length; i++) {
        vars[valSplit[i]] = true;
      }
    }
    var removeNone = false;
    var oper = this._getOperator();
    if ((oper == 'IN') || (oper == 'NOT IN'))
      removeNone = true;
    if (isMSIE && this.inputs[0].multiple) {
      var isIE6 = /MSIE 6/.test(navigator.userAgent);
      if (isIE6)
        this.inputs[0].focus();
    }
    for (var i = 0; i < this.choices.length; i++) {
      var option = this.choices[i];
      if (option[0] == '' && removeNone)
        continue;
      var selected = (vars[option[0]] != null || this.values[inputIndex] == option[0]);
      addOption(this.inputs[inputIndex], option[0], option[1], selected);
    }
  }
});
var GlideFilterChoiceDynamic = Class.create(GlideFilterChoice, {
  _setup: function(values) {
    this.size = 4;
    this.maxValues = 2;
    this.listenForOperChange = true;
  },
  setChoices: function(choices) {
    this.choices = choices;
  },
  _initMappingValue: function(value) {
    this.mappingType = 'choice';
    if (value.indexOf("{{") !== -1) {
      this.setMappingValue(value);
      this.activateMapping();
    } else {
      this.deactivateMapping();
    }
  },
  _build: function() {
    clearNodes(this.tr.tdValue);
    this.inputCnt = 0;
    if (this._isEmptyOper())
      return;
    var oper = this._getOperator();
    if (this._renderRightOperandAsFieldList(oper)) {
      this._addSameAsLabels(this, oper);
      this._populateRightOperandChoices();
    } else if ((oper == 'LIKE') || (oper == 'STARTSWITH') || (oper == 'ENDSWITH') || (oper == 'NOT LIKE')) {
      if (this.prevOper && (this.prevOper != 'LIKE') && (this.prevOper != 'STARTSWITH') && (this.prevOper != 'ENDSWITH'))
        this._clearValues();
      this._addTextInput();
    } else if ((oper == 'IN') || (oper == 'NOT IN')) {
      this.multi = true;
      var s = this._addSelect(this.width, this.multi, this.size);
      if (!this.hasChoices) {
        s.disabled = true;
        this._getChoices();
      } else
        this._fillSelect();
    } else if (oper == 'BETWEEN') {
      this.multi = false;
      var s = this._addSelect(this.width, this.multi, 1);
      if (!this.hasChoices) {
        s.disabled = true;
        this._getChoices();
      } else
        this._fillSelect();
      var txt = document.createTextNode(" " + getMessage('and') + " ");
      this.tr.tdValue.appendChild(txt);
      this.multi = false;
      var s = this._addSelect(this.width, this.multi, 1);
      if (!this.hasChoices) {
        s.disabled = true;
        this._getChoices();
      } else
        this._fillSelect(1);
    } else {
      this.multi = false;
      var s = this._addSelect(this.width, this.multi, 1);
      if (!this.hasChoices) {
        s.disabled = true;
        this._getChoices();
      } else
        this._fillSelect();
    }
    this.prevOper = oper;
  },
  _getChoices: function() {
    if (typeof g_filter_description != 'undefined' && g_filter_description.getChoiceList(this.tr.tableField) != null) {
      var response = loadXML(g_filter_description.getChoiceList(this.tr.tableField));
      this._addChoices(response);
    } else {
      var ajax = new GlideAjax('PickList');
      ajax.addParam('sysparm_chars', '*');
      ajax.addParam('sysparm_nomax', 'true');
      ajax.addParam('sysparm_name', this.tr.tableField);
      var response = ajax.getXMLWait();
      this._addChoices(response);
    }
  },
  _addChoices: function(xml) {
    if (!xml)
      return;
    var msg = new GwtMessage();
    var select = this.inputs[0];
    select.disabled = false;
    select.options.length = 0;
    this.choices = [];
    this.hasChoices = true;
    var root = xml.documentElement;
    var dep = root.getAttribute("dependent");
    var items = xml.getElementsByTagName("item");
    var addNone = true;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.getAttribute("value") == '')
        addNone = false;
    }
    if (addNone)
      this.choices[0] = ['', msg.getMessage('-- None --')];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var v = item.getAttribute("value");
      var l = item.getAttribute("label");
      var option = [v, l];
      this.choices.push(option);
    }
    if (dep != null) {
      this.choices = this.choices
        .sort(function(a, b) {
          if ((a[1].toLowerCase() + "") < (b[1]
              .toLowerCase() + "")) {
            return -1;
          }
          if ((a[1].toLowerCase() + "") > (b[1]
              .toLowerCase() + "")) {
            return 1;
          }
          return 0;
        });
      for (var i = 0; i < this.choices.length - 1; i++) {
        if (this.choices[i][1] == this.choices[i + 1][1])
          i = this.amendLabel(i);
      }
    }
    this._fillSelect();
  },
  amendLabel: function(i) {
    var dupe = this.choices[i][1];
    while (i < this.choices.length && this.choices[i][1] == dupe) {
      var c = this.choices[i];
      c[1] = c[1] + " - " + c[0];
      i++;
    }
    return i - 1;
  }
});
var GlideFilterCurrency = Class.create(GlideFilterString, {
  initialize: function(tableName, item) {
    GlideFilterHandler.prototype.initialize.call(this, tableName, item);
  },
  _operOnChange: function() {
    var lastOp = this.lastOperator;
    this.lastOperator = this._getOperator();
    if ((fieldComparisonOperators.indexOf(lastOp) >= 0) != (fieldComparisonOperators.indexOf(this.lastOperator) >= 0)) {
      this.inputCnt = 0;
      this.input = [];
    }
    this.getValues();
    if (lastOp != 'BETWEEN' && this._getOperator() == 'BETWEEN') {
      this.values[2] = this.values[1];
      this.values[1] = '';
    }
    this._unescapeIfRequired();
    this._build();
  },
  _setup: function(values) {
    this.maxValues = 2;
    this.id = this.tr.tableField + "." + guid();
    this.listenForOperChange = true;
  },
  _build: function() {
    GlideFilterString.prototype._build.call(this);
    var s = this._addSelect(60, false, 1);
    this._getCurrencies(s);
  },
  _getCurrencies: function(s) {
    var currencies = new Array();
    if (currencies.length != 0)
      return currencies;
    var ajax = new GlideAjax("CurrencyConverter");
    ajax.addParam("sysparm_name", "getCurrencies");
    ajax.getXMLAnswer(this._getCurrenciesResponse.bind(this), null, s);
  },
  _getCurrenciesResponse: function(answer, s) {
    var values = answer;
    var currencies = values.split(",");
    var cache = this._getCache();
    cache.put("currencies", values);
    for (var i = 0; i < currencies.length; i++)
      addOption(s, currencies[i], currencies[i]);
    this.currency_widget = s;
    this._parseValue();
  },
  _resolveFromCache: function() {
    var cache = this._getCache();
    var value = cache.get("currencies");
    if (value)
      return value.split(",");
    return [];
  },
  _getCache: function() {
    if (typeof(g_cache_currency) != "undefined")
      return g_cache_currency;
    g_cache_currency = new GlideClientCache(1);
    return g_cache_currency;
  },
  _parseValue: function() {
    if (this.inputs.length == 0)
      return;
    var processSelect = false;
    for (var i = 0; i < this.inputs.length; i++) {
      var v = this.inputs[i].value;
      if (!v)
        continue;
      if (v.indexOf('javascript') < 0)
        continue;
      processSelect = true;
      var sa = v.split(';');
      var first = sa[0].split('\'');
      var currency = first[first.length - 1];
      var price = sa[sa.length - 1];
      var priceIndex = price.indexOf('\'');
      price = price.substring(0, priceIndex);
      this.inputs[i].value = price;
    }
    if (!processSelect)
      return;
    var sel = new Select(this.currency_widget);
    sel.selectValue(currency);
  },
  getValues: function() {
    if (this._isMappingEnabled)
      return this.getMappingValue();
    if (!this.currency_widget)
      return '';
    var v = GlideFilterString.prototype.getValues.call(this);
    var tn = this.item.table.tableName;
    var fn = this.item.name;
    var valList = v.split('@');
    var fromVal = 'javascript:global.getCurrencyFilter(\'' + tn + '\',\'' + fn + '\', \'' + this.currency_widget.value + ';' + valList[0] + '\')'
    if ((valList.length > 1 && this._getOperator() == 'BETWEEN') || (valList.length > 2))
      return fromVal + '@javascript:global.getCurrencyFilter(\'' + tn + '\',\'' + fn + '\', \'' + this.currency_widget.value + ';' + valList[1] + '\')'
    return fromVal;
  },
  destroy: function() {
    GlideFilterString.prototype.destroy.call(this);
    this.currency_widget = null;
  },
  z: null
});;
/*! RESOURCE: /scripts/classes/GlideDuration.js */
var GlideDuration = Class.create({
  MS_IN_DAY: 86400000,
  MAX_UNIT_DAYS: 4,
  MAX_UNIT_HOURS: 3,
  MAX_UNIT_MINUTES: 2,
  MAX_UNIT_SECONDS: 1,
  initialize: function(value, item) {
    this.values = new Array();
    var gMessage = new GwtMessage();
    var values = ["Days", "Hours", "Minutes", "Seconds"];
    var answer = gMessage.getMessages(values);
    this.daysMessage = answer["Days"];
    this.hourMessage = answer["Hours"];
    this.minutesMessage = answer["Minutes"];
    this.secondsMessage = answer["Seconds"];
    this.maxLevel = this.MAX_UNIT_DAYS;
    if (item) {
      this.item = item;
      this.maxLevel = this._parseMaxUnit(this.item.getNamedAttribute('max_unit'));
    }
    if (value) {
      if (value.indexOf("javascript:") == 0) {
        var s = value.split("'");
        value = s[1];
      }
      this.values = value.split(" ");
      if (this.values.length == 2) {
        var times = this.values[1].split(":");
        for (var i = 0; i < times.length; i++)
          this.values[1 + i] = times[i];
        var dateParts = this.values[0].split("-");
        if (dateParts.length == 3)
          this.values[0] = parseInt(Date.parse(dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0] + ' 00:00:00 UTC')) / this.MS_IN_DAY;
      }
    }
    for (var i = this.values.length; i < 4; i++)
      this.values[i] = "0";
  },
  buildHTML: function(parent) {
    this.parent = parent;
    this.days = 0;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    if (this.maxLevel == this.MAX_UNIT_DAYS) {
      this._addSpan(this.daysMessage);
      this.days = this._addInput("dur_day", this.getDays());
      this.days.maxLength = "5";
      this.days.style.marginRight = "5px";
    } else
      this.hour = (this.getDays() * 24);
    if (this.maxLevel >= this.MAX_UNIT_HOURS) {
      this._addSpan(this.hourMessage);
      this.hour = this._addInput("dur_hour", this.hour + parseInt(this.getHours(), 10));
      if (this.maxLevel == this.MAX_UNIT_HOURS)
        this.hour.maxLength = "7";
      this._addSpan(":");
    } else
      this.minute = ((this.hour + parseInt(this.getHours(), 10)) * 60);
    if (this.maxLevel == this.MAX_UNIT_MINUTES)
      this._addSpan(this.minutesMessage);
    if (this.maxLevel >= this.MAX_UNIT_MINUTES) {
      this.minute = this._addInput("dur_min", this.minute + parseInt(this.getMinutes(), 10));
      if (this.maxLevel == this.MAX_UNIT_MINUTES)
        this.minute.maxLength = "9";
      this._addSpan(":");
    } else
      this.second = ((this.minute + parseInt(this.getMinutes(), 10)) * 60);
    if (this.maxLevel == this.MAX_UNIT_SECONDS)
      this._addSpan(this.secondsMessage);
    this.second = this._addInput("dur_sec", this.second + parseInt(this.getSeconds(), 10));
    if (this.maxLevel == this.MAX_UNIT_SECONDS)
      this.second.maxLength = "10";
  },
  _addInput: function(id, value) {
    var ic = cel("input", this.parent);
    ic.className = 'filerTableInput form-control';
    ic.id = id;
    ic.size = "2";
    ic.maxLength = "2";
    ic.value = value;
    return ic;
  },
  _addSpan: function(text) {
    var sp = cel("label", this.parent);
    sp.className = 'condition';
    sp.innerHTML = text;
  },
  getDays: function() {
    return this.values[0];
  },
  getHours: function() {
    return this.values[1];
  },
  getMinutes: function() {
    return this.values[2];
  },
  getSeconds: function() {
    return this.values[3];
  },
  getValue: function() {
    var day = 0;
    var hour = 0;
    var min = 0;
    var sec = 0;
    if (this.maxLevel == this.MAX_UNIT_DAYS)
      day = parseInt(this.days.value, 10);
    if (this.maxLevel >= this.MAX_UNIT_HOURS)
      hour = parseInt(this.hour.value, 10);
    if (this.maxLevel >= this.MAX_UNIT_MINUTES)
      min = parseInt(this.minute.value, 10);
    if (this.maxLevel >= this.MAX_UNIT_SECONDS)
      sec = parseInt(this.second.value, 10);
    if (sec >= 60) {
      min += Math.floor(sec / 60);
      sec = sec % 60;
    }
    if (min >= 60) {
      hour += Math.floor(min / 60);
      min = min % 60;
    }
    if (hour >= 24) {
      day += Math.floor(hour / 24);
      hour = hour % 24;
    }
    if (!day || day == null)
      day = 0;
    if (!hour || hour == null)
      hour = 0;
    if (!min || min == null)
      min = 0;
    if (!sec || sec == null)
      sec = 0;
    this.values[0] = day + '';
    this.values[1] = hour + '';
    this.values[2] = min + '';
    this.values[3] = sec + '';
    return day + " " + hour + ":" + min + ":" + sec;
  },
  _parseMaxUnit: function(max_unit) {
    switch (max_unit) {
      case 'hours':
        maxLevel = this.MAX_UNIT_HOURS;
        break;
      case 'minutes':
        maxLevel = this.MAX_UNIT_MINUTES;
        break;
      case 'seconds':
        maxLevel = this.MAX_UNIT_SECONDS;
        break;
      default:
        maxLevel = this.MAX_UNIT_DAYS;
    }
    return maxLevel;
  }
});;
/*! RESOURCE: /scripts/classes/GlideFilterReference.js */
var GlideFilterReference = Class.create(GlideFilterHandler, {
  _setup: function(values) {
    this.maxValues = 1;
    this.tableField = this.tr.tableField;
    this.id = this.tableField + "." + guid();
    this.listenForOperChange = true;
    this.rightOperand = values;
  },
  _initValues: function(values) {
    this.values = [];
    if (values)
      this.values[0] = values;
  },
  _build: function() {
    clearNodes(this.tr.tdValue);
    var inDoctypeMode = (document.documentElement.getAttribute('data-doctype') == 'true');
    this.inputCnt = 0;
    if (this._isEmptyOper())
      return;
    var op = this._getOperator();
    var input = this._addTextInput("hidden");
    input.id = this.id;
    if (this._renderRightOperandAsFieldList(op)) {
      this._addSameAsLabels(this, op);
      this._populateRightOperandChoices();
      return;
    }
    if (this._renderDynamicOperandInput(op))
      return;
    input = this._addTextInput();
    input.id = "sys_display." + this.id;
    input.onfocus = this._onFocus.bind(this);
    input.onkeydown = this._onKeyDown.bindAsEventListener(this);
    input.onkeypress = this._onKeyPress.bindAsEventListener(this);
    input.onkeyup = this._onKeyUp.bindAsEventListener(this);
    input.autocomplete = "off";
    input.ac_columns = "";
    input.ac_order_by = "";
    if (inDoctypeMode) {
      input.setAttribute("class", "pull-left form-control filter-reference-input");
    }
    setAttributeValue(input, 'autocomplete', 'off');
    var displayValue = gel('fancy.' + this.values[0]);
    if (displayValue && displayValue.value != '')
      this.inputs[1].value = displayValue.value;
    else if (this.values) {
      this.inputs[1].value = this.values;
      this._resolveReference();
    }
    var view = $$("[name='sysparm_view']")[0];
    if (view && (view.value == "sys_ref_list"))
      return;
    if (inDoctypeMode) {
      var btn = cel("button");
      btn.setAttribute("class", "icon-search btn btn-default filerTableAction");
      btn.setAttribute("style", "margin-left: 2px");
      btn.onclick = this._refListOpen.bindAsEventListener(this);
      this.tr.tdValue.style.minWidth = "200px";
      this.tr.tdValue.appendChild(btn);
    } else {
      var image = createImage("images/reference_list.gifx", "Lookup using list", this, this._refListOpen);
      image.setAttribute("class", "filerTableAction");
      this.tr.tdValue.appendChild(image);
    }
  },
  _refListOpen: function() {
    reflistOpen(this.id, this.item.getName(), this.item.getReference());
    return false;
  },
  getValues: function() {
    this._clearValues();
    if (this._isMappingEnabled)
      return this.getMappingValue();
    if (this._isEmptyOper())
      return '';
    var oper = this._getOperator();
    var input = this.inputs[0];
    if (this.inputCnt == 2) {
      var userInput = this.inputs[1];
      var userInputVal = userInput.value;
      if (userInputVal != null && (userInputVal.indexOf("javascript:") > -1))
        input = userInput;
      else if (this._useDisplayValue(oper)) {
        input = userInput;
      }
    }
    if (input) {
      return input.value;
    } else
      return '';
  },
  _useDisplayValue: function(oper) {
    return this.item.getType() != 'glide_list' && oper != '=' && oper != '!=' && oper != "CHANGESFROM" && oper != "CHANGESTO";
  },
  _resolveReference: function() {
    if (this.values[0]) {
      var ajax = new GlideAjax("ResolveRef");
      ajax.addParam("sysparm_name", this.tableField);
      ajax.addParam("sysparm_value", this.values[0]);
      ajax.getXML(this._resolveReferenceResponse.bind(this));
    }
  },
  _resolveReferenceResponse: function(request) {
    if (!request)
      return;
    var xml = request.responseXML;
    if (!xml)
      return;
    if (xml) {
      var items = xml.getElementsByTagName("item");
      if (items && items.length > 0 && items[0] && this.inputs[1])
        this.inputs[1].value = items[0].getAttribute("label");
    }
  },
  _onFocus: function(evt) {
    if (!this.inputs[1].ac) {
      var partialSearchFilterTypes = ',STARTSWITH,ENDSWITH,LIKE,NOT LIKE,';
      var tdOper = this.inputs[1].up(1).tdOper;
      var currentFilterType = (tdOper.firstElementChild || tdOper.children[0] || {}).value;
      if (partialSearchFilterTypes.indexOf(',' + currentFilterType + ',') > -1)
        this.inputs[1].setAttribute('is_filter_using_contains', 'true');
      this.inputs[1].ac = new AJAXReferenceCompleter(this.inputs[1], this.id, '');
      this.inputs[1].ac.elementName = this.tableField;
      this.inputs[1].ac.clearDerivedFields = true;
      this.inputs[1].ac.setIgnoreRefQual(true);
    }
  },
  _onKeyDown: function(evt) {
    return acReferenceKeyDown(this.inputs[1], evt);
  },
  _onKeyPress: function(evt) {
    return acReferenceKeyPress(this.inputs[1], evt);
  },
  _onKeyUp: function(evt) {
    return acReferenceKeyUp(this.inputs[1], evt);
  },
  z: null
});;
/*! RESOURCE: /scripts/classes/GlideFilterVariables.js */
var GlideFilterVariables = Class.create(GlideFilterHandler, {
  _setup: function(values) {
    this.maxValues = 1;
    this.id = this.tr.tableField + "." + guid();
    this.catID = "item_option_new.cat_item." + guid();
    this.listenForOperChange = true;
    this.rightOperand = values;
  },
  _initValues: function(values) {
    this.values = [];
    this.varValue = '';
    if (values) {
      this.values[0] = values.substring(0, 32);
      this.refQuery = values.substring(32);
      var query = new GlideEncodedQuery(this.tableName, "IO:" + this.values[0] + this.refQuery, null);
      query.parse();
      var terms = query.getTerms();
      var term = terms[0];
      this.varOp = term.getOperator();
      this.varValue = term.getValue();
    }
  },
  _build: function() {
    this.queryID = this.tr.tdValue.queryID;
    clearNodes(this.tr.tdValue);
    this.inputCnt = 0;
    if (this._isEmptyOper())
      return;
    this._hideOperators();
    var input = this._addTextInput("hidden");
    input.id = this.id;
    input = this._addTextInput();
    input.id = "sys_display." + this.id;
    input.onfocus = this._onFocus.bind(this);
    input.onRefPick = this._onFocus.bind(this);
    input.onkeydown = this._onKeyDown.bindAsEventListener(this);
    input.onkeypress = this._onKeyPress.bindAsEventListener(this);
    input.onkeyup = this._onKeyUp.bindAsEventListener(this);
    input.autocomplete = "off";
    input.data_completer = "AJAXTableCompleter";
    input.ac_columns = "cat_item;category";
    input.ac_order_by = "";
    input.placeholder = getMessage("Select Variable");
    setAttributeValue(input, 'autocomplete', 'off');
    var displayValue = gel('fancy.' + this.values[0]);
    if (displayValue && displayValue.value != '')
      this.inputs[1].value = displayValue.value;
    else if (this.values) {
      this.inputs[1].value = this.values;
      this._resolveReference();
    }
    if (document.documentElement.getAttribute('data-doctype') == 'true') {
      var btn = cel("button");
      btn.setAttribute("class", "icon-search btn btn-default filerTableAction");
      btn.onclick = this._refListOpen.bindAsEventListener(this);
      this.tr.tdValue.appendChild(btn);
    } else {
      var image = createImage("images/reference_list.gifx", "Lookup using list", this, this._refListOpen);
      image.setAttribute("class", "filerTableAction")
      this.tr.tdValue.appendChild(image);
    }
    this._buildCatItemReference();
    this._makeCatItemFirst();
    if (!this.values[0])
      return;
    this._getVariableType(this.values[0]);
  },
  _buildCatItemReference: function() {
    var queryID = this.queryID;
    td = this.tr.conditionRow.addTD(this.tr, queryID);
    td.nowrap = true;
    this.tr.catTD = td;
    var input = this._addTextInput("hidden", td);
    input.id = this.catID;
    input = this._addTextInput("", td);
    input.id = "sys_display." + this.catID;
    input.onfocus = this._onFocusCat.bind(this);
    input.onRefPick = this._onFocusCat.bind(this);
    input.onkeydown = this._onKeyDownCat.bindAsEventListener(this);
    input.onkeypress = this._onKeyPressCat.bindAsEventListener(this);
    input.onkeyup = this._onKeyUpCat.bindAsEventListener(this);
    input.autocomplete = "off";
    input.data_completer = "AJAXTableCompleter";
    input.ac_columns = "cat_item;category";
    input.ac_order_by = "";
    input.placeholder = getMessage("Select Item");
    setAttributeValue(input, 'autocomplete', 'off');
    if (document.documentElement.getAttribute('data-doctype') == 'true') {
      var btn = cel("button");
      btn.setAttribute("class", "icon-search btn btn-default filerTableAction");
      btn.onclick = this._refListOpenCat.bindAsEventListener(this);
      td.addClassName("form-inline");
      td.appendChild(btn);
    } else {
      var image = createImage("images/reference_list.gifx", "Lookup using list", this, this._refListOpenCat);
      image.setAttribute("class", "filerTableAction");
      td.appendChild(image);
    }
  },
  destroy: function() {
    this.inputCnt = 0;
    if (this.tr) {
      this.tr.tdValue.innerHTML = "";
      if (this.tr.variableID) {
        this.tr.removeChild(this.tr.variableID);
        this.tr.variableID = null;
      }
      if (this.tr.catTD) {
        this.tr.removeChild(this.tr.catTD);
        this.tr.catTD = null;
      }
      var td = this.tr.tdOper;
      if (td)
        td.style.display = "inline";
    }
    GlideFilterHandler.prototype.destroy.call(this);
  },
  setOriginalTable: function(tableName) {
    this.originalTableName = tableName;
  },
  _hideOperators: function() {
    if (this.tr.tdOper)
      this.tr.tdOper.style.display = "none";
  },
  _refListOpen: function() {
    if (this.values[2])
      reflistOpen(this.id, this.item.getName(), this.item.getReference(), "", false, "", "cat_item=" + this.variableRefQual);
    else
      reflistOpen(this.id, this.item.getName(), this.item.getReference());
    return false;
  },
  _refListOpenCat: function() {
    reflistOpen(this.catID, "cat_item", "sc_cat_item");
    return false;
  },
  getValues: function() {
    this._clearValues();
    if (this._isMappingEnabled)
      return this.getMappingValue();
    var oper = this._getOperator();
    var input = this.inputs[0];
    if (input) {
      return input.value;
    } else
      return '';
  },
  getFilterText: function(oper) {
    if (!this.variableFilter)
      return '';
    return "variables." + this.getValues() + oper + this.variableFilter.getValues();
  },
  _useDisplayValue: function(oper) {
    return this.item.getType() != 'glide_list' && oper != '=' && oper != '!=' && oper != "CHANGESFROM" && oper != "CHANGESTO";
  },
  _resolveReference: function() {
    if (this.values[0]) {
      var ajax = new GlideAjax("ResolveRef");
      ajax.addParam("sysparm_name", this.tr.tableField);
      ajax.addParam("sysparm_value", this.values[0]);
      ajax.getXML(this._resolveReferenceResponse.bind(this));
    }
  },
  _resolveReferenceResponse: function(request) {
    if (!request)
      return;
    var xml = request.responseXML;
    if (!xml)
      return;
    if (xml) {
      var items = xml.getElementsByTagName("item");
      if (items && items.length > 0 && items[0] && this.inputs[1])
        this.inputs[1].value = items[0].getAttribute("label");
    }
  },
  _resolveReferenceCat: function() {
    if (this.values[2]) {
      var ajax = new GlideAjax("ResolveRef");
      ajax.addParam("sysparm_name", "item_option_new.cat_item");
      ajax.addParam("sysparm_value", this.values[2]);
      ajax.getXML(this._resolveReferenceResponseCat.bind(this));
    }
  },
  _resolveReferenceResponseCat: function(request) {
    if (!request)
      return;
    var xml = request.responseXML;
    if (!xml)
      return;
    if (xml) {
      var items = xml.getElementsByTagName("item");
      if (items && items.length > 0 && items[0]) {
        this.inputs[3].value = items[0].getAttribute("label");
        this.values[3] = this.inputs[3].value;
      }
    }
  },
  _onFocus: function(evt) {
    if (!this.inputs[1].ac) {
      this.inputs[1].ac = new AJAXTableCompleter(this.inputs[1], this.id, '');
      this.inputs[1].ac.setFilterCallBack(this._refValueChange.bind(this));
      this.inputs[1].ac.elementName = this.tr.tableField;
      this.inputs[1].ac.setAdditionalValue("ac_columns", "cat_item;category");
      if (this.values[2])
        this.inputs[1].ac.setAdditionalValue("sysparm_ref_qual", "cat_item=" + this.variableRefQual);
      else
        this.inputs[1].ac.setAdditionalValue("sysparm_ref_qual", "");
      this.inputs[1].ac.clearDerivedFields = true;
    }
  },
  _refValueChange: function() {
    var ref = this.inputs[1].ac;
    var e = ref.getKeyElement();
    var id = e.value;
    this._clearQuery();
    this.values[0] = id;
    if (id)
      this._getVariableType(id);
  },
  _catValueSet: function(catValue) {
    if (this.values[2] == catValue)
      return;
    this.values[2] = catValue;
    this.variableRefQual = catValue;
    this.values[3] = catValue;
    this._resolveReferenceCat();
    this._setQualifier(this.inputs[1].ac, this.values[2]);
  },
  _refValueChangeCat: function() {
    var ref = this.inputs[3].ac;
    var e = ref.getKeyElement();
    var id = e.value;
    this.values[2] = id;
    this.variableRefQual = id;
    this._clearVariable();
    this._hideOperators();
    this._clearHandler();
    this._filterVariableReference();
  },
  _clearVariable: function() {
    var e = gel(this.id);
    if (e)
      e.value = '';
    e = gel("sys_display." + this.id);
    if (e)
      e.value = '';
  },
  _clearHandler: function() {
    if (!this.vType)
      return;
    this.variableFilter = this._getHandler();
    var conditionRow = this.tr.conditionRow;
    var td = this.tr.tdOper;
    if (td)
      this.tr.removeChild(td);
    this.tr.tdOper = null;
    if (this.tr.tdValue && this.tr.variableID) {
      this.tr.removeChild(this.tr.tdValue);
      this.tr.tdValue = null;
    }
  },
  _filterVariableReference: function() {
    this._onFocus();
    if (this.values[2])
      this._setQualifier(this.inputs[1].ac, this.values[2]);
    else
      this.inputs[1].ac.setAdditionalValue("sysparm_ref_qual", "");
    this._clearQuery();
  },
  _setQualifier: function(ac, catItem) {
    if (ac)
      ac.setAdditionalValue("sysparm_ref_qual", "cat_item=" + catItem);
    this._addVariableSets(ac, catItem);
  },
  _addVariableSets: function(ac, catItem) {
    var sets = new GlideRecord('io_set_item');
    var callback = this._getSetResponse.bind(this, ac, catItem, sets)
    var fn = function(gr) {
      callback(ac, catItem, sets);
    };
    sets.query('sc_cat_item', catItem, fn);
  },
  _getSetResponse: function(ac, catItem, sets) {
    if (!sets.hasNext())
      return;
    var setList = new Array();
    while (sets.next())
      setList.push(sets.variable_set + '');
    this.variableRefQual = catItem + "^OR" + "variable_setIN" + setList.join(",");
    if (ac)
      ac.setAdditionalValue("sysparm_ref_qual", "cat_item=" + this.variableRefQual);
  },
  _clearQuery: function() {
    this.values[0] = "";
    this.refQuery = ""
    this.varOp = ""
    this.varValue = ""
  },
  _getVariableType: function(id) {
    this.grVariable = new GlideRecord('item_option_new');
    var callback = this._getVariableResponse.bind(this)
    var fn = function(gr) {
      callback();
    };
    this.grVariable.query('sys_id', id, fn);
  },
  _getVariableResponse: function() {
    if (!this.grVariable.next()) {
      this.grVariable = null;
      this._buildStringType();
    } else
      this._buildType(this.grVariable);
    this._setFilterBasedOnType();
    if (this.grVariable && this.grVariable.cat_item)
      this._catValueSet(this.grVariable.cat_item);
  },
  _buildStringType: function() {
    this.vItem = new TableElement("string", "String");
    this.vItem.setType("string");
  },
  _setFilterBasedOnType: function() {
    this.variableFilter = this._getHandler();
    var conditionRow = this.tr.conditionRow;
    var td = this.tr.tdOper;
    if (td)
      this.tr.removeChild(td);
    td = conditionRow.addTD(this.tr, this.queryID);
    conditionRow.tdOper = td;
    td.id = "oper";
    this.tr.tdOper = td;
    td.style.width = "99px";
    if (!this.tr.variableID) {
      this.tr.tdValue.id = "variableid";
      this.tr.variableID = this.tr.tdValue;
      this.tr.tdValue = null;
    }
    if (this.tr.tdValue)
      this.tr.removeChild(this.tr.tdValue);
    td = conditionRow.addTD(this.tr, this.queryID);
    conditionRow.tdValue = td;
    td.id = "value";
    td.noWrap = true;
    this.tr.tdValue = td;
    this._moveButtons();
    var operSel = addOperators(this.tr.tdOper, this.vType, this.varOp, this.isChoice, false, false);
    this.tr.operSel = operSel;
    var tid = this.tr.tableField;
    this.tr.tableField = "IO:" + this.values[0];
    this.variableFilter.create(this.tr, this.varValue);
    this.tr.tableField = tid;
  },
  _makeCatItemFirst: function() {
    var td = this.tr.tdValue;
    this.tr.removeChild(td);
    this.tr.appendChild(td);
    this._moveButtons();
  },
  _moveButtons: function() {
    var td = this.tr.tdOrButton;
    this.tr.removeChild(td);
    this.tr.appendChild(td);
    td = this.tr.tdRemoveButton;
    this.tr.removeChild(td);
    this.tr.appendChild(td);
  },
  _buildType: function(gr) {
    this.vItem = new TableElement(gr.type, gr.type);
    if (gr.type == "1")
      this.vItem.setType("boolean");
    else if (gr.type == "8") {
      this.vItem.setType("reference");
      this.vItem.setReference(gr.reference);
    } else if (gr.type == "10") {
      this.vItem.setType("calendar");
    } else if (gr.type == "7") {
      this.vItem.setType("checkbox");
    } else if (gr.type == "18" || gr.type == "22" || gr.type == "3") {
      this.vItem.setType("multiple_choice");
    } else if (gr.type == "5") {
      this.vItem.setType("select");
    } else if (gr.type == "4") {
      this.vItem.setType("numeric_scale");
    } else if (gr.type == "9") {
      this.vItem.setType("calendar");
    } else
      this._buildStringType();
  },
  _getHandler: function() {
    if (this.vItem.type == "boolean") {
      this.vType = "boolean";
      var handler = new GlideFilterChoice(this.tableName, this.item);
      handler.setChoices(sysvalues["catalog_boolean"]);
      return handler;
    }
    if (this.vItem.type == "checkbox") {
      this.vType = "boolean";
      var handler = new GlideFilterChoice(this.tableName, this.item);
      handler.setChoices(sysvalues["boolean"]);
      return handler;
    }
    if (this.vItem.type == "multiple_choice") {
      this.vType = "referencechoice";
      var handler = new GlideFilterVariablesChoiceDynamic("var.IO:" + this.values[0], this.item);
      return handler;
    }
    if (this.vItem.type == "select") {
      this.vType = "referencechoice";
      var handler = new GlideFilterVariablesChoiceDynamic("var.IO:" + this.values[0], this.item);
      return handler;
    }
    if (this.vItem.type == "numeric_scale") {
      this.vType = "integer";
      this.isChoice = true;
      var handler = new GlideFilterVariablesChoiceDynamic("var.IO:" + this.values[0], this.item);
      return handler;
    }
    if (this.vItem.type == "reference") {
      this.vType = "referencevariable";
      var handler = new GlideFilterReference("var.IO:" + this.values[0], this.vItem);
      return handler;
    }
    if (this.vItem.type == "calendar") {
      this.vType = "calendar";
      var handler = new GlideFilterDate(this.tableName, this.vItem);
      return handler;
    }
    this.vType = "string";
    return new GlideFilterString(this.tableName, this.item);
  },
  _onKeyDown: function(evt) {
    return acReferenceKeyDown(this.inputs[1], evt);
  },
  _onKeyPress: function(evt) {
    return acReferenceKeyPress(this.inputs[1], evt);
  },
  _onKeyUp: function(evt) {
    return acReferenceKeyUp(this.inputs[1], evt);
  },
  _onKeyDownCat: function(evt) {
    return acReferenceKeyDown(this.inputs[3], evt);
  },
  _onKeyPressCat: function(evt) {
    return acReferenceKeyPress(this.inputs[3], evt);
  },
  _onKeyUpCat: function(evt) {
    return acReferenceKeyUp(this.inputs[3], evt);
  },
  _onFocusCat: function(evt) {
    if (!this.inputs[3].ac) {
      this.inputs[3].ac = new AJAXTableCompleter(this.inputs[3], this.catID, '');
      this.inputs[3].ac.setFilterCallBack(this._refValueChangeCat.bind(this));
      this.inputs[3].ac.elementName = "item_option_new.cat_item";
      this.inputs[3].ac.setAdditionalValue("ac_columns", "short_description;category");
      this.inputs[3].ac.setAdditionalValue("sysparm_ref_qual", "active=true");
      this.inputs[3].ac.clearDerivedFields = true;
    }
  },
  z: null
});
var GlideFilterVariablesChoiceDynamic = Class.create(GlideFilterChoiceDynamic, {
  _getChoices: function() {
    var ajax = new GlideAjax('PickList');
    ajax.addParam('sysparm_chars', '*');
    ajax.addParam('sysparm_nomax', 'true');
    ajax.addParam('sysparm_name', this.tableName);
    var response = ajax.getXMLWait();
    this._addChoices(response);
  }
});;
/*! RESOURCE: /scripts/classes/GlideFilterQuestions.js */
var GlideFilterQuestions = Class.create(GlideFilterVariables, {
  getFilterText: function(oper) {
    if (!this.variableFilter)
      return '';
    return "variablesHASQUESTION:" + this.getValues() + oper + this.variableFilter.getValues();
  },
  _refListOpenCat: function() {
    reflistOpen(this.catID, "cat_item", "sc_cat_item_producer");
    return false;
  },
  _onFocusCat: function(evt) {
    if (!this.inputs[3].ac) {
      this.inputs[3].ac = new AJAXTableCompleter(this.inputs[3], this.catID, '');
      this.inputs[3].ac.setFilterCallBack(this._refValueChangeCat.bind(this));
      this.inputs[3].ac.elementName = "item_option_new.cat_item";
      this.inputs[3].ac.setAdditionalValue("ac_columns", "short_description;category");
      this.inputs[3].ac.setAdditionalValue("sysparm_ref_qual", "active=true^sys_class_name=sc_cat_item_producer");
      this.inputs[3].ac.clearDerivedFields = true;
    }
  },
  z: null
});;
/*! RESOURCE: /scripts/classes/GlideFilterItemVariables.js */
var GlideFilterItemVariables = Class.create(GlideFilterVariables, {
  getFilterText: function(oper) {
    if (!this.variableFilter)
      return '';
    return "variablesHASITEMVARIABLE:" + this.getValues() + oper + this.variableFilter.getValues();
  },
  z: null
});;
/*! RESOURCE: /scripts/classes/GlideFilterVariableMap.js */
var GlideFilterVariableMap = Class.create(GlideFilterHandler, {
  _setup: function(values) {
    this.maxValues = 1;
    this.id = this.tr.tableField + "." + guid();
    this.selectedOption = values;
    this.usedFields = {};
    this.varTypes = {
      1: ['string']
    };
  },
  _build: function() {
    this.queryID = this.tr.tdValue.queryID;
    clearNodes(this.tr.tdValue);
    this.inputCnt = 0;
    if (this._isEmptyOper())
      return;
    this._hideOperators();
    this.select = this._addSelect(380, false, 1);
    this.select.onchange = this._updateFields.bind(this);
    var displayValue = gel('fancy.' + this.values[0]);
    if (displayValue && displayValue.value != '')
      this.select.value = displayValue.value;
    else if (this.values) {
      this.select.value = this.values;
    }
    this._buildVariableSelect();
    $(this.select).addClassName('filter_type');
    var $select = $j(this.select);
    if (!$select.data('select2'))
      $select.select2();
  },
  _buildVariableSelect: function() {
    if (this.values.length == 0 || this.values == '-- value --')
      addOption(this.select, this.values, getMessage("-- Select Variable --"), true);
    if (this.item == null)
      return;
    var arr = g_dynamic_filter_variable_options.split("##");
    for (var i = 0; i < arr.length; i++) {
      var aItem = arr[i];
      if (aItem.length == 0)
        continue;
      var aItemArr = aItem.split("::");
      if (aItemArr.length < 3)
        continue;
      var arrInput = [];
      arrInput.push(aItemArr[1]);
      var translated = getMessages(arrInput);
      addOption(this.select, aItemArr[0], translated[aItemArr[1]], this.selectedOption == aItemArr[0]);
    }
  },
  _hideOperators: function() {
    if (this.tr.tdOper)
      this.tr.tdOper.style.display = "none";
  },
  getValues: function() {
    this._clearValues();
    if (this._isMappingEnabled)
      return this.getMappingValue();
    var oper = this._getOperator();
    var input = this.inputs[0];
    if (input) {
      return input.value;
    } else
      return '';
  },
  _updateFields: function() {},
  _clearFieldUsed: function(name, condition) {
    this.usedFields[name] = false;
  },
  _buildType: function(gr) {
    this.vItem = new TableElement(gr.type, gr.type);
    if (gr.type == "1")
      this.vItem.setType("boolean");
    else if (gr.type == "8") {
      this.vItem.setType("reference");
      this.vItem.setReference(gr.reference);
    } else if (gr.type == "10") {
      this.vItem.setType("calendar");
    } else if (gr.type == "7") {
      this.vItem.setType("checkbox");
    } else if (gr.type == "18" || gr.type == "22" || gr.type == "3") {
      this.vItem.setType("multiple_choice");
    } else if (gr.type == "5") {
      this.vItem.setType("select");
    } else if (gr.type == "4") {
      this.vItem.setType("numeric_scale");
    } else if (gr.type == "9") {
      this.vItem.setType("calendar");
    }
  },
  z: null
});;
/*! RESOURCE: /scripts/classes/GlideFilterLabels.js */
var GlideFilterLabels = Class.create(GlideFilterHandler, {
  _setup: function(values) {
    this.maxValues = 1;
    this.id = this.tr.tableField + "." + guid();
    this.labID = "label_entry.label." + guid();
    this.listenForOperChange = true;
    this.rightOperand = values;
  },
  _initValues: function(values) {
    this.values = [];
    this.varValue = '';
    if (values) {
      this.values[0] = values.substring(0, 32);
      this.refQuery = values.substring(32);
      this.varValue = this.refQuery;
    }
  },
  _build: function() {
    this.queryID = this.tr.tdValue.queryID;
    clearNodes(this.tr.tdValue);
    this.inputCnt = 0;
    if (this._isEmptyOper())
      return;
    this._hideOperators();
    var inDoctypeMode = (document.documentElement.getAttribute('data-doctype') == 'true');
    var input = this._addTextInput("hidden");
    input.id = this.labID;
    input = this._addTextInput();
    input.id = "sys_display." + this.labID;
    input.onfocus = this._onFocus.bind(this);
    input.onRefPick = this._onFocus.bind(this);
    input.onkeydown = this._onKeyDown.bindAsEventListener(this);
    input.onkeypress = this._onKeyPress.bindAsEventListener(this);
    input.onkeyup = this._onKeyUp.bindAsEventListener(this);
    input.autocomplete = "off";
    input.data_completer = "AJAXTableCompleter";
    input.ac_columns = "short_description";
    input.ac_order_by = "";
    input.placeholder = getMessage("Select Label");
    setAttributeValue(input, 'autocomplete', 'off');
    var displayValue = gel('fancy.' + this.values[0]);
    if (displayValue && displayValue.value != '')
      this.inputs[1].value = displayValue.value;
    else if (this.values) {
      this.inputs[1].value = this.values;
      this._resolveReference();
    }
    if (inDoctypeMode) {
      var btn = cel("button");
      btn.setAttribute("class", "icon-search btn btn-default filerTableAction");
      btn.setAttribute("style", "margin-left: 2px");
      btn.onclick = this._refListOpen.bindAsEventListener(this);
      this.tr.tdValue.appendChild(btn);
    } else {
      var image = createImage("images/reference_list.gifx", "Lookup using list", this, this._refListOpen);
      image.setAttribute("class", "filerTableAction")
      this.tr.tdValue.appendChild(image);
    }
    if (!this.varValue)
      return;
    this._getVariableType(this.values[0]);
  },
  destroy: function() {
    this.inputCnt = 0;
    if (this.tr) {
      this.tr.tdValue.innerHTML = "";
      if (this.tr.variableID) {
        this.tr.removeChild(this.tr.variableID);
        this.tr.variableID = null;
      }
      var td = this.tr.tdOper;
      if (td)
        td.style.display = "block";
    }
    GlideFilterHandler.prototype.destroy.call(this);
  },
  setOriginalTable: function(tableName) {
    this.originalTableName = tableName;
  },
  _hideOperators: function() {
    if (this.tr.tdOper)
      this.tr.tdOper.style.display = "none";
  },
  _refListOpen: function() {
    reflistOpen(this.labID, this.item.getName(), "label");
    return false;
  },
  getValues: function() {
    this._clearValues();
    if (this._isMappingEnabled)
      return this.getMappingValue();
    if (this._isEmptyOper())
      return '';
    var oper = this._getOperator();
    var input = this.inputs[0];
    if (input) {
      return input.value;
    } else
      return '';
  },
  getFilterText: function(oper) {
    return "sys_tags." + this.getValues() + '=' + this.getValues();
  },
  _useDisplayValue: function(oper) {
    return this.item.getType() != 'glide_list' && oper != '=' && oper != '!=' && oper != "CHANGESFROM" && oper != "CHANGESTO";
  },
  _resolveReference: function() {
    if (this.values[0]) {
      var ajax = new GlideAjax("ResolveRef");
      ajax.addParam("sysparm_name", "label_entry.label");
      ajax.addParam("sysparm_value", this.values[0]);
      ajax.getXML(this._resolveReferenceResponse.bind(this));
    }
  },
  _resolveReferenceResponse: function(request) {
    if (!request)
      return;
    var xml = request.responseXML;
    if (!xml)
      return;
    if (xml) {
      var items = xml.getElementsByTagName("item");
      if (items && items.length > 0 && items[0] && this.inputs[1])
        this.inputs[1].value = items[0].getAttribute("label");
    }
  },
  _onFocus: function(evt) {
    if (!this.inputs[1].ac) {
      this.inputs[1].ac = new AJAXTableCompleter(this.inputs[1], this.labID, '');
      this.inputs[1].ac.setFilterCallBack(this._refValueChange.bind(this));
      this.inputs[1].ac.elementName = "label_entry.label";
      this.inputs[1].ac.setAdditionalValue("ac_columns", "short_description");
      this.inputs[1].ac.clearDerivedFields = true;
    }
  },
  _refValueChange: function() {
    var ref = this.inputs[1].ac;
    var e = ref.getKeyElement();
    var id = e.value;
    this.values[0] = id;
  },
  _moveButtons: function() {
    var td = this.tr.tdOrButton;
    this.tr.removeChild(td);
    this.tr.appendChild(td);
    td = this.tr.tdRemoveButton;
    this.tr.removeChild(td);
    this.tr.appendChild(td);
  },
  _onKeyDown: function(evt) {
    return acReferenceKeyDown(this.inputs[1], evt);
  },
  _onKeyPress: function(evt) {
    return acReferenceKeyPress(this.inputs[1], evt);
  },
  _onKeyUp: function(evt) {
    return acReferenceKeyUp(this.inputs[1], evt);
  },
  _onKeyDownCat: function(evt) {
    return acReferenceKeyDown(this.inputs[3], evt);
  },
  z: null
});;
/*! RESOURCE: /scripts/classes/GlideFilterReferenceMulti.js */
var GlideFilterReferenceMulti = Class.create(GlideFilterReference, {
  _setup: function(values) {
    this.maxValues = 20;
    this.id = this.tr.tableField + "." + guid();
    this.listenForOperChange = true;
  },
  _initAutoCompleter: function() {
    if (!this.inputs[1].ac) {
      if (this.item.getReference("reference") == "sys_user") {
        $(this.inputs[1]).setAttribute('allow_invalid', true)
        $(this.inputs[1]).setAttribute('reference', "sys_user");
      }
      this.inputs[1].ac = new AJAXReferenceCompleterMulti(this.inputs[1], this.id, '');
      this.inputs[1].ac.elementName = this.tr.tableField;
      this.inputs[1].ac.clearDerivedFields = true;
    }
  },
  _onFocus: function(evt) {
    this._initAutoCompleter();
  },
  _resolveReference: function() {
    if (this.values) {
      var ajax = new GlideAjax("ResolveRefMulti");
      ajax.addParam("sysparm_name", this.tr.tableField);
      ajax.addParam("sysparm_value", this.values);
      ajax.getXML(this._resolveReferenceResponse.bind(this));
    }
  },
  _resolveReferenceResponse: function(request) {
    if (!request)
      return;
    var xml = request.responseXML;
    if (!xml)
      return;
    if (xml) {
      var items = xml.getElementsByTagName("item");
      if (items && items.length > 0) {
        this._initAutoCompleter();
        this.inputs[1].ac._hash = new Hash();
        for (var i = 0; i < items.length; i++) {
          this.inputs[1].ac._hash.set(items[i].getAttribute("label"), items[i].getAttribute("name"));
        }
        this.inputs[1].ac._setFormValues();
      }
    }
  },
  getValues: function() {
    this._initAutoCompleter();
    return this.inputs[1].ac.getKeyValue();
  },
  _initValues: function(values) {
    if (!values)
      this.values = [];
    else
      this.values = values;
  }
});;
/*! RESOURCE: /scripts/classes/GlideFilterDate.js */
var GlideFilterDate = Class.create(GlideFilterHandler, {
  SYS_DATE_FORMAT: "yyyy-MM-dd",
  SYS_TIME_FORMAT: "HH:mm:ss",
  SYS_DATE_TIME_FORMAT: "yyyy-MM-dd HH:mm:ss",
  _setup: function(values) {
    this.maxValues = 4;
    this.listenForOperChange = true;
    this.userDateFormat = g_user_date_format;
    this.userTimeFormat = g_user_date_time_format.substring(g_user_date_format.length + 1);
    this.userDateTimeFormat = g_user_date_time_format;
    this.id = "GwtGFD_" + guid();
    this.allowTime = this.item.isDateTime();
  },
  _build: function() {
    this.ANDMSG = getMessage('and');
    this.FROMMSG = getMessage('from');
    this.ASMSG = getMessage('as');
    clearNodes(this.tr.tdValue);
    this.inputCnt = 0;
    if (this._isEmptyOper())
      return;
    var oper = this._getOperator();
    if (this.prevOper && (this.prevOper != oper))
      this._clearValues();
    switch (oper) {
      case 'SAMEAS':
      case 'NSAMEAS':
        if (this.getFilterClass() != "GlideTemplateFilter") {
          this._addDateSelect("1", sysvalues['calendar']['TRENDVALUES_WITH_FIELDS'], this.values[1], [1]);
          var span = cel("span", this.tr.tdValue);
          span.style.marginLeft = "3px";
          span.style.marginRight = "5px";
          if (oper == 'SAMEAS')
            span.innerHTML = this.ASMSG;
          else
            span.innerHTML = this.FROMMSG;
        }
        this._populateRightOperandChoices();
        break;
      case '=':
        var input = this._addCalendar("1");
        this.inputs = [input];
        input.type = "text";
        input.value = (this.values[0].indexOf("{{") !== -1 ? "" : this.values[0]);
        input.id = this.id + "_input_1";
        input.allowTime = this.allowTime
        this.inputCnt = 1;
        break;
      case '!=':
      case 'ON':
      case 'NOTON':
        var val = this.values[0];
        if (val)
          val += "@" + this.values[1] + "@" + this.values[2];
        this._addDateChoices("1", val, [0, 1, 2], false);
        break;
      case '<':
      case '>=':
        var pos = 1;
        this._addDateChoices("1", this.values[0], [pos], this.allowTime, 'start');
        break;
      case '>':
      case '<=':
        var pos = 3;
        this._addDateChoices("1", this.values[0], [pos], this.allowTime, 'end');
        break;
      case 'BETWEEN':
        this._addDateChoices("1", this.values[0], [1], this.allowTime, 'start');
        var span = cel("span", this.tr.tdValue);
        span.style.marginLeft = "3px";
        span.style.marginRight = "5px";
        span.className = "filter-inline-label";
        span.innerHTML = this.ANDMSG;
        this._addDateChoices("2", this.values[1], [3], this.allowTime, 'end');
        this.initBetweenMapping(this.values[0], this.values[1]);
        break;
      case 'DATEPART':
        var trendOper = "EE";
        if (this.values[1]) {
          var parts = this.values[1].split(",");
          if (parts.length == 3)
            trendOper = parts[2].substring(1, 3);
        }
        this._addDateSelect("1", sysvalues['calendar']['RELATIVE'], trendOper, [1]);
        this._addDateSelect("2", sysvalues['calendar']['DATEPART'], this.values[0], [0]);
        break;
      case 'RELATIVE':
        this._addDateSelect("1", sysvalues['calendar']['RELATIVE'], this.values[0], [1]);
        var input = this._addTextInput();
        input.value = this.values[3];
        input.style.width = "30px";
        input.maxLength = 5;
        this._addDateSelect("2", sysvalues['calendar']['TRENDVALUES'], this.values[1], [1]);
        this._addDateSelect("3", sysvalues['calendar']['WHEN'], this.values[2], [1]);
        break;
      case 'MORETHAN':
      case 'LESSTHAN':
        var input = this._addTextInput();
        if (null == this.values[3] || "" == this.values[3])
          this.values[3] = 0;
        if (isMSIE)
          input.style.marginTop = "-1px";
        input.value = this.values[3];
        input.style.width = "30px";
        input.style.marginRight = "2px";
        input.maxLength = 2;
        this._addDateSelect("2", sysvalues['calendar']['TRENDVALUES_WITH_FIELDS_PLURIAL'], this.values[1], [1]);
        this._addDateSelect("3", sysvalues['calendar']['WHEN_WITH_FIELDS'], this.values[2], [1]);
        this._populateRightOperandChoices();
        break;
      case 'SINCE':
        var s = this._addSelect(this.width, this.multi, this.size);
        s.style.marginRight = "3px";
        s.id = this.id + "_select_1";
        var base = new GlideRecord('cmdb_baseline');
        base.addOrderBy('name');
        base.query();
        while (base.next()) {
          var selected = false;
          var value = "javascript:getBaseFilter('" + base.name + "')";
          if (value == this.values[0])
            selected = true;
          var o = addOption(s, value, base.name, selected);
        }
        break;
      case 'ANYTHING':
        break;
    }
    this.prevOper = oper;
    if (notOneOf('BETWEEN ANYTHING RELATIVE SINCE MORETHAN LESSTHAN SAMEAS NSAMEAS DATEPART')) {
      this.initAlphaMapping(this.values[0]);
    }

    function notOneOf(str) {
      return str.split(' ').indexOf(oper) == -1;
    }
  },
  getValues: function() {
    if (this.inputCnt == 0)
      return "";
    for (var i = 0; i < this.maxValues; i++)
      this.values[i] = this._getInputValue(this.inputs[i]);
    if (this.supportsMapping) {
      if (this._getOperator() == 'BETWEEN') {
        var $td = $j(this.tr.tdValue);
        var $in1 = $td.find('#em_input_1');
        var $in2 = $td.find('#em_input_2');
        if ($in1.val() || $in2.val()) {
          return (
            ($in1.val() || this._getDateGenerate(this._convertDate(this.values[0]), 'start')) +
            "@" +
            ($in2.val() || this._getDateGenerate(this._convertDate(this.values[1]), 'end'))
          );
        }
      } else {
        var gemVal = $j(this.tr.tdValue).find('#em_input_1').val();
        if (gemVal) {
          return gemVal;
        }
      }
    }
    switch (this._getOperator()) {
      case 'ON':
      case 'NOTON':
        if (this.values[0].indexOf('@') != -1)
          return this.values[0];
        var value = this._convertDate(this.values[0]);
        return value + "@" + this._getDateGenerate(value, 'start') + "@" + this._getDateGenerate(value, 'end');
      case '<':
      case '<=':
        var value = this._convertDate(this.values[0]);
        return this._getDateGenerate(value, 'start');
      case '>':
      case '>=':
        var value = this._convertDate(this.values[0]);
        return this._getDateGenerate(value, 'end');
      case 'BETWEEN':
        var start = this._convertDate(this.values[0]);
        start = this._getDateGenerate(start, 'start');
        var end = this._convertDate(this.values[1]);
        end = this._getDateGenerate(end, 'end');
        return start + "@" + end;
      case 'DATEPART':
        var trendOper = this.values[0];
        var datePart = this.values[1];
        var values = sysvalues['calendar']['DATEPART'];
        for (var i = 0; i < values.length; i++) {
          if (datePart == values[i][0]) {
            datePart = values[i][1];
            break;
          }
        }
        datePart = datePart.split(")")[0] + ",'" + trendOper + "')";
        return this.values[1] + "@" + datePart;
        break;
      case '=':
      case '!=':
        return this.values[0];
        break;
      case 'RELATIVE':
        return this.values[0] + "@" + this.values[2] + "@" + this.values[3] + "@" + this.values[1];
        break;
      case 'SAMEAS':
      case 'NSAMEAS':
        if (this.values[1] == "")
          return this.values[0];
        return this.values[1] + "@" + this.values[0];
        break;
      case 'MORETHAN':
      case 'LESSTHAN':
        if (isNaN(this.values[0]))
          this.values[0] = 0;
        return this.values[3] + "@" + this.values[1] + "@" + this.values[2] + "@" + this.values[0];
        break;
      case 'SINCE':
        return this.values[0];
        break;
      case 'ANYTHING':
        return "";
        break;
      default:
        if (this.inputCnt == 1)
          return this.values[0];
        else
          return this.values.join("@");
    }
  },
  _addDateSelect: function(id, values, matchValue, positions, dynamicOptions) {
    var s = this._addSelect(this.width, this.multi, this.size);
    s.style.marginRight = "3px";
    s.id = this.id + "_select_" + id;
    this._addDateSelectOptions(s, values, matchValue, positions);
    if (dynamicOptions)
      this._addDateSelectOptions(s, dynamicOptions, matchValue, positions);
    return s;
  },
  _addDateSelectOptions: function(select, values, matchValue, positions) {
    if (!values)
      return;
    var map = getMessages(buildMap(values, 0));
    var previousValue = null;
    for (var i = 0; i < values.length; i++) {
      var option = values[i];
      var value = "";
      for (var pos = 0; pos < positions.length; pos++) {
        if (pos > 0)
          value += "@";
        value += option[positions[pos]];
      }
      if (previousValue == null || previousValue != value)
        addOption(select, value, map[option[0]], value == matchValue);
      previousValue = value;
    }
  },
  _addDateChoices: function(id, matchValue, positions, allowTime, defaultTime) {
    var dynamicOptions = this._getDynamicCalendarOption();
    var select = this._addDateSelect(id, sysvalues['calendar'], matchValue, positions, dynamicOptions);
    this._addDatePicker(id, select, matchValue, allowTime, defaultTime);
  },
  _getDynamicCalendarOption: function() {
    if (typeof g_dynamic_filter_options_calendar == 'undefined' || g_dynamic_filter_options_calendar == '')
      return [];
    var dynamicOptions = [];
    var items = g_dynamic_filter_options_calendar.split('##');
    for (var i = 0; i < items.length; i++) {
      if (items[i].length <= 0)
        continue;
      var option = items[i].split('::');
      dynamicOptions.push(option);
    }
    return dynamicOptions;
  },
  _addDatePicker: function(id, select, value, allowTime, defaultTime) {
    var found = (select.selectedIndex != -1);
    if ((select.selectedIndex == 0) && (value) && (value != select.options[0].value))
      found = false;
    if (!found) {
      value = this._getDateFromValue(value);
      addOption(select, value, value, true);
    }
    select.allowTime = allowTime;
    select.defaultTime = defaultTime;
    this._addCalendar(id);
  },
  _addCalendar: function(id) {
    var chooseDate = getMessage('Choose date...');
    if (document.documentElement.getAttribute('data-doctype') == 'true') {
      var input = addTextInput(this.tr.tdValue, "", "hidden");
      var cal = cel("button", this.tr.tdValue);
      cal.id = "cal_" + id;
      cal.name = cal.id;
      cal.alt = chooseDate;
      cal.title = chooseDate;
      cal.onclick = this._calendarPopup.bind(this, id, cal);
      cal.style.marginRight = "1px";
      cal.style.verticalAlign = "top";
      cal.className = "btn btn-default icon-calendar";
      input.id = this.id + "_input_" + id;
      input.onchange = this._dateTimeComplete.bind(this, id);
    } else {
      var cal = cel("img", this.tr.tdValue);
      cal.id = "cal_" + id;
      cal.name = cal.id;
      cal.src = "images/small_calendar.gifx";
      cal.alt = chooseDate;
      cal.title = chooseDate;
      cal.onclick = this._calendarPopup.bind(this, id);
      cal.style.marginLeft = "2px";
      cal.className = "button";
      var input = addTextInput(this.tr.tdValue, "", "hidden");
      input.id = this.id + "_input_" + id;
      input.onchange = this._dateTimeComplete.bind(this, id);
    }
    return input;
  },
  _getDateFromValue: function(value) {
    var value = value.split("@")[0];
    var prefixString = "javascript:gs.dateGenerate(";
    if (value.indexOf(prefixString) == 0) {
      var parts = value.split("'");
      if (parts.length == 5) {
        value = parts[1];
        if (isDate(parts[3], this.SYS_TIME_FORMAT)) {
          var dt = getDateFromFormat(parts[3], this.SYS_TIME_FORMAT);
          value += " " + formatDate(new Date(dt), this.SYS_TIME_FORMAT);
        }
      }
    }
    if (isDate(value, this.SYS_DATE_TIME_FORMAT)) {
      var dt = getDateFromFormat(value, this.SYS_DATE_TIME_FORMAT);
      value = formatDate(new Date(dt), this.userDateTimeFormat);
    } else if (isDate(value, this.SYS_DATE_FORMAT)) {
      var dt = getDateFromFormat(value, this.SYS_DATE_FORMAT);
      value = formatDate(new Date(dt), this.userDateFormat);
    }
    return value;
  },
  _getDateGenerate: function(value, tag) {
    if (value.indexOf("javascript:") != -1)
      return value;
    if (isDate(value, this.SYS_DATE_TIME_FORMAT)) {
      var dt = getDateFromFormat(value, this.SYS_DATE_TIME_FORMAT);
      value = formatDate(new Date(dt), this.SYS_DATE_FORMAT);
      tag = formatDate(new Date(dt), this.SYS_TIME_FORMAT);
    }
    return "javascript:gs.dateGenerate('" + value + "','" + tag + "')";
  },
  _convertDate: function(value) {
    if (value.indexOf("javascript:") != -1)
      return value;
    if (isDate(value, this.userDateTimeFormat)) {
      var dt = getDateFromFormat(value, this.userDateTimeFormat);
      value = formatDate(new Date(dt), this.SYS_DATE_TIME_FORMAT);
    } else if (isDate(value, this.userDateFormat)) {
      var dt = getDateFromFormat(value, this.userDateFormat);
      value = formatDate(new Date(dt), this.SYS_DATE_FORMAT);
    }
    return value;
  },
  _calendarPopup: function(id, btn) {
    var select = gel(this.id + "_select_" + id);
    var currentDate = '';
    var defaultTime = "start";
    var allowTime = this.allowTime;
    if (select) {
      if (select && select.value.indexOf('javascript') == -1)
        currentDate = select.value;
      defaultTime = select.defaultTime
      allowTime = select.allowTime;
    }
    var format;
    if (allowTime) {
      format = this.userDateTimeFormat;
      if (!isDate(currentDate, format)) {
        var dt = new Date();
        if (isDate(currentDate, this.userDateFormat))
          dt = new Date(getDateFromFormat(currentDate, this.userDateFormat));
        if (defaultTime == 'end')
          dt.setHours(23, 59, 59);
        else
          dt.setHours(0, 0, 0);
        currentDate = formatDate(dt, this.userDateTimeFormat);
      }
    } else {
      format = this.userDateFormat;
    }
    var input = gel(this.id + "_input_" + id);
    input.value = currentDate;
    ScriptLoader.getScripts('scripts/classes/GwtDateTimePicker.js', function() {
      new GwtDateTimePicker(input.id, format, allowTime, select || input);
    })
    return false;
  },
  _dateTimeComplete: function(id) {
    var select = gel(this.id + "_select_" + id);
    var input = gel(this.id + "_input_" + id);
    if (!select)
      return;
    var option = select.options[select.selectedIndex];
    var value = option.value;
    if (isDate(value, this.userDateFormat) || isDate(value, this.userDateTimeFormat)) {
      option.value = input.value;
      option.text = input.value;
    } else
      addOption(select, input.value, input.value, true);
  },
  initBetweenMapping: function(value1, value2) {
    if (!window.$j)
      return;
    var $td = $j(this.tr.tdValue);
    var $btn1 = this.emTemplate.makeBtn();
    var $field1 = this.emTemplate.makeField();
    var $input1 = this.emTemplate.makeInput('em_input_1', value1);
    var $nativeInput1 = $j(this.inputs[0]);
    var $dateBtn = $td.find('#cal_1');
    $dateBtn.after($btn1);
    $dateBtn.after($field1);
    $dateBtn.after($input1);
    this._initMappingComponent($field1, $btn1, {
      glideType: 'calendar',
      isMultiText: false,
      originalMapping: value1.indexOf("{{") !== -1 ? value1 : "",
      parent: {
        show: function() {
          $td.find('#cal_1, select[id*="_select_1"]').show();
        },
        hide: function() {
          $td.find('#cal_1, select[id*="_select_1"]').hide();
        },
        onValue: function(msg) {
          var value = msg.wrappedValue;
          $input1.val(value);
          if (value.indexOf("{{") == -1) {
            $nativeInput1.val($nativeInput1.find("option:first").val());
          }
        }
      }
    });
    var $btn2 = this.emTemplate.makeBtn();
    var $field2 = this.emTemplate.makeField();
    var $input2 = this.emTemplate.makeInput('em_input_2', value2);
    var $nativeInput2 = $j(this.inputs[1]);
    $btn2.css({
      "margin-right": "90px"
    })
    $td.append($input2);
    $td.append($field2);
    $td.append($btn2);
    this._initMappingComponent($field2, $btn2, {
      glideType: 'calendar',
      isMultiText: false,
      originalMapping: value2.indexOf("{{") !== -1 ? value2 : "",
      parent: {
        show: function() {
          $td.find('#cal_2, select[id*="_select_2"]').show();
        },
        hide: function() {
          $td.find('#cal_2, select[id*="_select_2"]').hide();
        },
        onValue: function(msg) {
          var value = msg.wrappedValue;
          $input2.val(value);
          if (value.indexOf("{{") == -1) {
            $nativeInput2.val($nativeInput2.find("option:first").val());
          }
        }
      }
    });
    $j(this.tr.tdValue)[this.supportsMapping ? 'removeClass' : 'addClass']("gem-unsupported");
    this._removePlaceholderBtn();
  },
  initAlphaMapping: function(value) {
    if (!window.$j)
      return;
    value = value.indexOf("{{") !== -1 ? value : "";
    var $td = $j(this.tr.tdValue);
    var $btn = this.emTemplate.makeBtn();
    var $field = this.emTemplate.makeField();
    var $input = this.emTemplate.makeInput('em_input_1', value);
    $td.append($field).append($btn).append($input);
    var $nativeInput = $j(this.inputs[0]);
    var oper = this._getOperator();
    this._initMappingComponent($field, $btn, {
      glideType: 'calendar',
      isMultiText: false,
      originalMapping: value.indexOf("{{") !== -1 ? value : "",
      parent: {
        show: function() {
          $td.find('#cal_1, select[id*="_select_1"]').show();
          if (oper == "=")
            $td.find('input[id*="_input_1"]').show();
        },
        hide: function() {
          $td.find('#cal_1, select[id*="_select_1"]').hide();
          if (oper == "=")
            $td.find('input[id*="_input_1"]').hide();
        },
        onValue: function(msg) {
          var value = msg.wrappedValue;
          $input.val(value);
          if (value.indexOf("{{") == -1) {
            $nativeInput.val($nativeInput.find("option:first").val());
          }
        }
      }
    });
    $j(this.tr.tdValue)[this.supportsMapping ? 'removeClass' : 'addClass']("gem-unsupported");
    this._removePlaceholderBtn();
  },
  _removePlaceholderBtn: function() {
    $j(this.tr.tdMapping).html("")
  },
  emTemplate: {
    makeBtn: function() {
      return $j(
        '<button role="button" class="btn btn-default em-field-toggle em-alt-btn em-icon-em gem-unsupported-target" ' +
        'title="Set date from a contextual value"' +
        'style="vertical-align: top;">' +
        '</button>'
      );
    },
    makeField: function() {
      return $j(
        '<em-alt-input class="hidden gem-unsupported-target"></em-alt-input>'
      );
    },
    makeInput: function(id, value) {
      var x = $j('<input type="hidden" id="' + id + '">');
      x.val(value || "");
      return x;
    }
  },
  _initMappingComponent: function($field, $btn, opts) {
    if (window.g_elementMappingMgr) {
      g_elementMappingMgr.initSubField($field, $btn, this.mappingId, opts)
    }
  },
  initMappingSupport: function(shouldEnable, type, mappingMgr) {
    var td = this.tr.tdMapping;
    if (!td || !mappingMgr)
      return;
    this.mappingType = type;
    this.supportsMapping = !!shouldEnable;
    $j(this.tr.tdValue)[this.supportsMapping ? 'removeClass' : 'addClass']("gem-unsupported");
  },
  destroyMappingSupport: function() {},
  activateMapping: function() {},
  deactivateMapping: function() {},
  _initMappingValue: function(value) {},
  type: 'GlideFilterDate'
});;
/*! RESOURCE: /scripts/classes/GlideEventHandler.js */
var GlideEventHandler = Class.create({
  initialize: function(handlerName, handler, fieldName) {
    this.handlerName = handlerName;
    this.handler = handler;
    this.fieldName = fieldName;
  }
});;
/*! RESOURCE: /scripts/classes/GlideUIElement.js */
var GlideUIElement = Class.create({
  CACHE_ELEMENTS: true,
  ENABLE_CHILD_WALKING: false,
  initialize: function(tableName, fieldName, type, mandatory, reference, attributes, scope) {
    this.tableName = tableName;
    this.fieldName = fieldName;
    this.type = type;
    this.mandatory = mandatory;
    this.reference = reference;
    this.attributes = attributes;
    this.elementFetched = false;
    this.elementParentNode;
    this.fetchedNodes = {};
    this.scope = scope || "global";
  },
  getType: function() {
    return this.type;
  },
  getID: function() {
    return this.tableName + '.' + this.fieldName;
  },
  getElementParentNode: function() {
    if (!this.elementFetched) {
      this.elementParentNode = gel('element.' + this.getID());
      this.elementFetched = true;
    }
    return this.elementParentNode;
  },
  getElement: function() {
    return this.getChildElementById(this.getID());
  },
  getLabelElement: function() {
    var parentElementNode = this.getElementParentNode();
    if (!parentElementNode)
      parentElementNode = document;
    var labels = parentElementNode.getElementsByTagName('label');
    for (var i = 0;
      (label = labels[i]); i++) {
      if (label.htmlFor == this.getID())
        return label;
    }
    return this.getStatusElement();
  },
  getStatusElement: function() {
    return this.getChildElementById('status.' + this.getID());
  },
  getChildElementById: function(id) {
    if (this.fetchedNodes[id])
      return this.fetchedNodes[id];
    var element = this.getChildElementById0(id);
    if (element)
      this.fetchedNodes[id] = element;
    return element;
  },
  getChildElementById0: function(id) {
    var element;
    if (this.ENABLE_CHILD_WALKING) {
      element = this._findSubChild(this.getElementParentNode(), id);
      if (element)
        return element;
    }
    return gel(id);
  },
  isMandatory: function() {
    return this.mandatory;
  },
  isDerived: function() {
    if (!this.fieldName)
      return false;
    return this.fieldName.indexOf('.') > -1;
  },
  setMandatory: function(mandatory) {
    this.mandatory = mandatory;
  },
  getScope: function() {
    return this.scope;
  },
  _findSubChild: function(startNode, id) {
    if (!startNode || (startNode.id && startNode.id == id))
      return startNode;
    var childNodes = startNode.children || startNode.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
      var foundNode = this._findSubChild(childNodes[i], id);
      if (foundNode)
        return foundNode;
    }
    return;
  },
  type: "GlideUIElement"
});;
/*! RESOURCE: /scripts/classes/GlideUser.js */
var GlideUser = Class.create({
  initialize: function(userName, firstName, lastName, nonDefaultRoles, userID, departmentID) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.setFullName(this.firstName + " " + this.lastName);
    this.setRoles(nonDefaultRoles);
    this.userID = userID;
    this.departmentID = departmentID;
    this.preferences = new Object();
    this.clientData = new Object();
  },
  hasRoleExactly: function(role, includeDefaults) {
    if (!role || typeof role != 'string')
      return false;
    var rolesToCheck = this.roles;
    if (includeDefaults)
      rolesToCheck = this.allRoles;
    for (var x = 0, l = rolesToCheck.length; x < l; x++) {
      if (rolesToCheck[x].toLowerCase() == role.toLowerCase())
        return true;
    }
    return false;
  },
  hasRoles: function(includeDefaults) {
    if (includeDefaults)
      return (this.allRoles.length > 0);
    else
      return (this.roles.length > 0);
  },
  hasRole: function(role, includeDefaults) {
    if (this.hasRoleExactly('maint', includeDefaults))
      return true;
    if (this.hasRoleExactly(role, includeDefaults))
      return true;
    if (role == 'maint')
      return false;
    if (this.hasRoleExactly('admin', includeDefaults))
      return true;
    return false;
  },
  hasRoleFromList: function(roles, includeDefaults) {
    var rolesToMatch = new Array();
    if (roles)
      rolesToMatch = roles.split(/\s*,\s*/);
    if (rolesToMatch.length == 0)
      return true;
    for (var i = 0; i < rolesToMatch.length; i++) {
      var r = rolesToMatch[i];
      if (r && this.hasRole(r, includeDefaults))
        return true;
    }
    return false;
  },
  getFullName: function() {
    return this.fullName;
  },
  getUserName: function() {
    return this.userName;
  },
  getUserID: function() {
    return this.userID;
  },
  getDepartmentID: function() {
    return this.departmentID;
  },
  setFullName: function(fn) {
    this.fullName = fn;
  },
  getRoles: function(includeDefaults) {
    if (includeDefaults)
      return this.allRoles;
    return this.roles;
  },
  getAvailableElevatedRoles: function() {
    return this.elevatedRoles;
  },
  setRoles: function(r, includeDefaults) {
    if (includeDefaults) {
      if (r)
        this.allRoles = r.split(/\s*,\s*/);
      else
        this.allRoles = new Array();
    } else {
      if (r)
        this.roles = r.split(/\s*,\s*/);
      else
        this.roles = new Array();
    }
  },
  setElevatedRoles: function(r) {
    if (r)
      this.elevatedRoles = r.split(/\s*,\s*/);
    else
      this.elevatedRoles = new Array();
  },
  setActiveElevatedRoles: function(r) {
    if (r)
      this.activeElevatedRoles = r.split(/\s*,\s*/);
    else
      this.activeElevatedRoles = new Array();
  },
  getActiveElevatedRoles: function() {
    return this.activeElevatedRoles;
  },
  setDomain: function(d) {
    this.domain = d;
  },
  getPreference: function(n) {
    return this.preferences[n];
  },
  setPreference: function(n, v) {
    this.preferences[n] = v;
  },
  deletePreference: function(n) {
    delete this.preferences[n];
  },
  getClientData: function(n) {
    return this.clientData[n];
  },
  setClientData: function(n, v) {
    this.clientData[n] = v;
  },
  setBannerImage: function(s) {
    this.bannerImage = s;
  },
  getBannerImage: function() {
    return this.bannerImage;
  },
  setBannerText: function(s) {
    this.bannerText = s;
  },
  getBannerText: function() {
    return this.bannerText;
  },
  setHomePages: function(s) {
    this.homePages = s;
  },
  getHomePages: function() {
    return this.homePages;
  },
  type: "GlideUser"
});;
/*! RESOURCE: /scripts/doctype/GlideForm14.js */
function default_on_submit() {
  if (!g_form)
    return true;
  return g_form.onSubmit();
}
var GlideForm = Class.create({
  INFO_CLASS: "fieldmsg notification notification-info",
  ERROR_CLASS: "fieldmsg notification notification-error",
  WARNING_CLASS: "fieldmsg notification notification-warning",
  MSG_ROW: "_message_row",
  initialize: function(tableName, mandatory, checkMandatory, checkNumeric, checkInteger, isSearch) {
    this.tableName = tableName;
    this.modified = false;
    this.modifiedFields = {};
    this.mandatoryOnlyIfModified = false;
    this.elements = [];
    this.mandatory = mandatory;
    this.checkMandatory = checkMandatory;
    this.checkNumeric = checkNumeric;
    this.checkInteger = checkInteger;
    this.nameMap = [];
    this.attributes = [];
    this.validators = [];
    this.disabledFields = [];
    this.securityReadOnlyFields = [];
    this.elementHandlers = {};
    this.prefixHandlers = {};
    this.derivedWaiting = [];
    this.newRecord = gel('sys_row') && gel('sys_row').value == "-1";
    this.personalizeHiddenFields = null;
    this.personalizePrefKey = "personalize_" + this.tableName + "_" + this.getViewName();
    this._isLiveUpdating = false;
    if (!isSearch)
      CachedEvent.emit('glideform.initialized', this);
    else
      setTimeout(function() {
        CachedEvent.emit('glideform.initialized', this)
      }, 0);
  },
  fieldChanged: function(elementName, changeFlag) {
    if (!this._internalChange) {
      if (changeFlag) {
        this.modified = true;
        this.modifiedFields[elementName] = true;
      } else if (this.modifiedFields[elementName]) {
        this.modifiedFields[elementName] = false;
        this._checkModified();
      }
    }
    var uniqueValue = this.getUniqueValue();
    CustomEvent.fireAll('form.isModified', {
      uniqueValue: uniqueValue,
      isModified: this.modified
    });
  },
  _checkModified: function() {
    for (var n in this.modifiedFields) {
      if (this.modifiedFields[n]) {
        this.modified = true;
        return;
      }
    }
    this.modified = false;
  },
  setMandatoryOnlyIfModified: function() {
    this.mandatoryOnlyIfModified = true;
  },
  addNameMapEntry: function(entry) {
    this.nameMap.push(entry);
  },
  addGlideUIElement: function(ed) {
    this.elements.push(ed);
  },
  registerHandler: function(id, handler) {
    this.elementHandlers[id] = handler;
  },
  registerPrefixHandler: function(prefix, handlerObject) {
    var handler = new GlideFormPrefixHandler(handlerObject);
    this.prefixHandlers[prefix] = handler;
  },
  getPrefixHandler: function(id) {
    if (!id)
      return;
    if (id.indexOf('.') < 0)
      id = 'variables.' + id;
    var idSplit = id.split(".");
    var handler = this.prefixHandlers[idSplit[0]];
    if (typeof handler == "undefined")
      return;
    handler.setFieldName(id);
    return handler;
  },
  getElement: function(id) {
    if (this.elementHandlers[id] && (typeof this.elementHandlers[id].getElement == "function"))
      return this.elementHandlers[id].getElement();
    else
      return this.getControl(id);
  },
  getParameter: function(parm) {
    if (!(parm.substr(0, 8) == 'sysparm_'))
      parm = 'sysparm_' + parm;
    var pcel = gel(parm);
    if (pcel)
      return pcel.value;
    else
      return '';
  },
  hasAttribute: function(s) {
    if (this.attributes[s])
      return true;
    return false;
  },
  addAttribute: function(s) {
    this.attributes[s] = s;
  },
  addValidator: function(fieldType, validator) {
    this.validators[fieldType] = validator;
  },
  _getPersonalizeHiddenFields: function() {
    if (this.personalizeHiddenFields == null) {
      var prefVal = NOW[this.personalizePrefKey] || getPreference(this.personalizePrefKey);
      if ('false' == prefVal)
        this.personalizeHiddenFields = [];
      else if (prefVal.length)
        this.personalizeHiddenFields = prefVal.split(",");
      else
        this.personalizeHiddenFields = [];
    }
    return this.personalizeHiddenFields;
  },
  resetPersonalizeHiddenFields: function() {
    this.personalizeHiddenFields = [];
    this._savePersonalizeHiddenFields(function() {
      window.reloadWindow(window);
    });
  },
  _savePersonalizeHiddenFields: function(callback) {
    setPreference(this.personalizePrefKey, this.personalizeHiddenFields.join(","), callback);
  },
  isUserPersonalizedField: function(fieldName) {
    fieldName = this.removeCurrentPrefix(fieldName);
    return this.personalizeHiddenFields === null ? false : this.personalizeHiddenFields.indexOf(fieldName) != -1;
  },
  setUserDisplay: function(fieldName, display) {
    fieldName = this.removeCurrentPrefix(fieldName);
    this._getPersonalizeHiddenFields();
    for (var i = this.personalizeHiddenFields.length - 1; i >= 0; i--) {
      if (this.personalizeHiddenFields[i] === fieldName) {
        this.personalizeHiddenFields.splice(i, 1);
      }
    }
    this.setDisplay(fieldName, display);
    if ((display === false || display === 'false') && !this.isMandatory(fieldName))
      this.personalizeHiddenFields.push(fieldName);
    this._savePersonalizeHiddenFields();
  },
  setDisplay: function(fieldName, display) {
    fieldName = this.removeCurrentPrefix(fieldName);
    this._setDisplay(fieldName, display, this.isMandatory(fieldName), this.getValue(fieldName));
  },
  _setDisplay: function(fieldName, display, isMandatory, fieldValue) {
    var s = this.tableName + '.' + fieldName;
    var control = this.getControl(fieldName);
    if (!control) {
      var handler = this.getPrefixHandler(fieldName);
      if (handler)
        handler.getObject().setDisplay(handler.getFieldName(), display);
      return;
    }
    var displayValue = 'none';
    if (display == 'true' || display == true) {
      display = true;
      displayValue = '';
    }
    if ((display != true) && isMandatory && fieldValue == '')
      return;
    var theElement = control;
    if (this.elementHandlers[control.id] && (typeof this.elementHandlers[control.id].getElement == "function"))
      theElement = this.elementHandlers[control.id].getElement();
    if (this.elementHandlers[control.id] && (typeof this.elementHandlers[control.id].setDisplay == "function")) {
      this.elementHandlers[control.id].setDisplay(display ? '' : 'none');
    } else {
      this.changeElementStyle(fieldName, 'display', displayValue);
    }
    this.setSensitiveDisplayValue(s + ".ui_policy_sensitive", displayValue);
    var glideElement = this.getGlideUIElement(fieldName);
    if (glideElement)
      if (glideElement.type == 'script' || glideElement.type == 'script_plain' || glideElement.type == 'xml')
        CustomEvent.fire('element_script_display_' + display, {
          'element': glideElement
        });
    _frameChanged();
  },
  setSensitiveDisplayValue: function(name, displayValue) {
    var elements = document.getElementsByName(name);
    for (i = 0; i < elements.length; i++) {
      elements[i].style.display = displayValue;
    }
  },
  setValidation: function(fieldName, validate) {
    fieldName = this.removeCurrentPrefix(fieldName);
    var control = this.getControl(fieldName);
    if (!control)
      return;
    if (validate == 'false')
      validate = false;
    if (validate != false) {
      control.removeAttribute('validate');
      return;
    }
    control.setAttribute('validate', 'false');
  },
  getViewName: function() {
    var sysparmView = gel('sysparm_view');
    var view = "default";
    if (sysparmView && sysparmView.value)
      view = sysparmView.value;
    return view;
  },
  setVisible: function(fieldName, visibility) {
    fieldName = this.removeCurrentPrefix(fieldName);
    var control = this.getControl(fieldName);
    if (!control) {
      var handler = this.getPrefixHandler(fieldName);
      if (handler)
        handler.getObject().setVisible(handler.getFieldName(),
          visibility);
      return;
    }
    var v = 'hidden';
    if (visibility == 'true')
      visibility = true;
    if (visibility)
      v = 'visible';
    if ((visibility != true) && this.isMandatory(fieldName) && (this.getValue(fieldName) == ''))
      return;
    this.changeElementStyle(fieldName, 'visibility', v);
  },
  changeElementStyle: function(fieldName, name, value) {
    var ge = this.getGlideUIElement(fieldName);
    if (!ge)
      return;
    if (this.changeElementParent(ge, name, value))
      return;
    var labelElement = ge.getLabelElement();
    if (labelElement)
      labelElement.parentNode.parentNode.style[name] = value;
    var parentTR = findParentByTag(ge.getElement(), "tr");
    if (parentTR && parentTR != labelElement)
      parentTR.style[name] = value;
  },
  changeElementParent: function(ge, name, value) {
    var element = ge.getElementParentNode();
    if (element) {
      element.style[name] = value;
      var decoration = $(element).select(".reference_decoration, .btn-ref");
      var isEmptyRef = ge.type == 'reference' && this.getValue(ge.fieldName) == '';
      if (decoration && decoration.length > 0) {
        for (var i = 0; i < decoration.length; i++) {
          if (isEmptyRef && (decoration[i].getAttribute('data-type') == 'reference_popup'))
            decoration[i].style[name] = 'none';
          else
            decoration[i].style[name] = value;
        }
      }
      return true;
    }
    return false;
  },
  getLabel: function(id) {
    id = this.removeCurrentPrefix(id);
    var label;
    var labels = document.getElementsByTagName('label');
    for (var i = 0;
      (label = labels[i]); i++) {
      if (label.htmlFor.endsWith(id)) {
        return label;
      }
    }
    return false;
  },
  isNewRecord: function() {
    return this.newRecord;
  },
  isMandatory: function(fieldName) {
    fieldName = this.removeCurrentPrefix(fieldName);
    var thisElement = this.getGlideUIElement(fieldName);
    if (!thisElement) {
      var handler = this.getPrefixHandler(fieldName);
      if (handler)
        return handler.getObject().isMandatory(handler.getFieldName());
      else
        return false;
    }
    return thisElement.isMandatory();
  },
  addSecurityReadOnlyFields: function(fields) {
    this.securityReadOnlyFields = fields.split(',');
  },
  setRequiredChecked: function(fieldName, required) {
    if (!fieldName || !fieldName.startsWith('ni.VE')) {
      jslog("Invalid variable id");
      return;
    }
    var handler = this.getPrefixHandler(this.resolvePrettyNameMap(fieldName));
    if (!handler) {
      jslog("Invalid variable id");
      return;
    }
    handler.getObject().setRequiredChecked(fieldName, required);
  },
  setMandatory: function(fieldName, mandatory) {
    var thisElement = this.getGlideUIElement(fieldName);
    if (!thisElement) {
      var handler = this.getPrefixHandler(fieldName);
      if (handler)
        handler.getObject().setMandatory(handler.getFieldName(), mandatory);
      return;
    }
    if (this.securityReadOnlyFields.indexOf(this.tableName + "." + fieldName) >= 0)
      return;
    thisElement.setMandatory(mandatory);
    var e = thisElement.getElement();
    if (e) {
      e.setAttribute("mandatory", mandatory);
      onChangeLabelProcessByEl(e, thisElement.getStatusElement());
    }
    var control = this.getControl(fieldName);
    if (control && control.id && this.elementHandlers[control.id] && (typeof this.elementHandlers[control.id].setMandatory == "function"))
      this.elementHandlers[control.id].setMandatory(mandatory);
    if (mandatory) {
      setMandatoryExplained(true);
      var value = this.getValue(fieldName);
      if (value == '') {
        this._setDisplay(fieldName, true, true, '');
        this._setReadonly(fieldName, false, true, '');
      }
    }
    opticsLog(this.getTableName(), fieldName, "Mandatory set to " + mandatory);
  },
  setDisabled: function(fieldName, disabled) {
    this.setReadonly(fieldName, disabled);
    opticsLog(this.getTableName(), fieldName, "Disabled set to " + disabled);
  },
  setReadOnly: function(fieldName, disabled) {
    this.setReadonly(fieldName, disabled);
  },
  setReadonly: function(fieldName, disabled) {
    fieldName = this.removeCurrentPrefix(fieldName);
    this._setReadonly(fieldName, disabled, this.isMandatory(fieldName), this.getValue(fieldName));
    opticsLog(this.getTableName(), fieldName, "ReadOnly set to " + disabled);
  },
  _setReadonly: function(fieldName, disabled, isMandatory, fieldValue) {
    var s = this.tableName + '.' + fieldName;
    var control = this.getControl(fieldName);
    if (!control) {
      var handler = this.getPrefixHandler(fieldName);
      if (handler)
        handler.getObject()._setReadonly(
          handler.getFieldName(), disabled, isMandatory,
          fieldValue);
      return;
    }
    var ge = this.getGlideUIElement(fieldName);
    if (!ge)
      return;
    this._setReadonly0(ge, control, s, fieldName, disabled, isMandatory, fieldValue);
  },
  _setReadonly0: function(ge, control, s, fieldName, disabled, isMandatory, fieldValue) {
    if (disabled && isMandatory && fieldValue == '')
      return;
    if (control.getAttribute('gsftlocked') == 'true')
      return;
    if (this.elementHandlers[control.id] && (typeof this.elementHandlers[control.id].setReadOnly == "function")) {
      if (this.elementHandlers[control.id].setReadOnly(disabled) == true)
        return;
    } else
      this.setDisabledControl(control, disabled);
    this._setDisabledField(control, disabled);
    onChangeLabelProcessByEl(control, ge.getStatusElement());
    this._setFieldReadOnly(ge, "sys_display." + s, disabled);
    this._setFieldReadOnly(ge, "sys_select." + s, disabled);
    var $inputGroup = $j(ge.getElementParentNode()).find(".input-group");
    if ($inputGroup.length) {
      if (disabled)
        $inputGroup.addClass('input-group-disabled');
      else
        $inputGroup.removeClass('input-group-disabled');
    }
    this.setSensitiveDisplayValue(s + ".ui_policy_sensitive", disabled ? 'none' : '');
    this._setFieldReadOnly(ge, "ni." + this.tableName + "." + fieldName, disabled);
    if (this.tableName == "ni")
      this._setFieldReadOnly(ge, "ni." + ge.fieldName, disabled);
    var suggestionExists = gel('ni.dependent_reverse.' + this.tableName + '.' + fieldName);
    if (suggestionExists) {
      this._setFieldReadOnly(ge, "lookup." + this.tableName + "." + fieldName, disabled, true);
    }
  },
  _setFieldReadOnly: function(ge, s, disabled, skipProcessLabelChange) {
    var control = ge.getChildElementById(s);
    if (control) {
      this.setDisabledControl(control, disabled);
      this._setDisabledField(control, disabled);
      if (!skipProcessLabelChange)
        onChangeLabelProcessByEl(control, ge.getStatusElement());
    }
  },
  setDisabledControl: function(control, disabled) {
    if (disabled) {
      control.setAttribute("readonly", "readonly");
      addClassName(control, 'disabled');
    } else {
      control.removeAttribute("readonly");
      removeClassName(control, 'disabled');
    }
    var name = control.tagName.toLowerCase();
    var type = control.getAttribute('type');
    if ((isFirefox && (name == 'input' && (type == 'text' || type == null))) || name == 'textarea')
      control.disabled = false;
    else
      control.disabled = disabled;
  },
  _setDisabledField: function(control, disabled) {
    if (disabled) {
      addClassName(control, 'disabled');
      addClassName(control, 'readonly');
      this._addDisabledField(control);
    } else {
      removeClassName(control, 'disabled');
      removeClassName(control, 'readonly');
      this._removeDisabledField(control);
    }
  },
  _addDisabledField: function(control) {
    var n = this.disabledFields.length;
    this.disabledFields[n] = control;
  },
  _removeDisabledField: function(control) {
    var n = this.disabledFields.length;
    for (i = 0; i < n; i++) {
      if (this.disabledFields[i] == control) {
        this.disabledFields.splice(i, 1);
        break;
      }
    }
  },
  onSubmit: function() {
    this.getFormElement().addClassName('form-submitted');
    var action = this.getActionName();
    if (action && !action.startsWith("sysverb_no_update"))
      this.submitted = true;
    if (action == 'sysverb_back' || action == 'sysverb_cancel' || action == 'sysverb_delete' || action == 'sysverb_query')
      return true;
    var rc = this.mandatoryCheck();
    if (rc && typeof g_sc_form != "undefined")
      rc = g_sc_form.mandatoryCheck() && g_sc_form.catalogOnSubmit();
    rc = rc && this.validate();
    return rc;
  },
  enableUIPolicyFields: function() {
    for (i = 0; i < this.disabledFields.length; i++) {
      var disabledID = this.disabledFields[i].id;
      if (!this._isDerivedWaiting(disabledID))
        this.disabledFields[i].disabled = false;
      else
        jslog("Did not re-enable " + disabledID + " as it is derived waiting for AJAX lookup");
    }
  },
  mandatoryCheck: function() {
    if (!this.checkMandatory || (!this.modified && this.mandatoryOnlyIfModified))
      return true;
    var rc = true;
    var invalidFields = new Array();
    var labels = new Array();
    var missing = this.getMissingFields();
    for (var i = 0; i < missing.length; i++) {
      rc = false;
      var field = missing[i];
      var widget = this.getControl(field);
      if (i == 0) {
        var tryLabel = !$j(widget).is(':visible');
        if (!tryLabel) {
          try {
            widget.focus();
          } catch (e) {
            tryLabel = true;
          }
        }
        if (tryLabel) {
          var displayWidget = this.getDisplayBox(field);
          if (displayWidget) {
            try {
              displayWidget.focus();
            } catch (exception) {}
          }
        }
      }
      labels.push(this.tableName + '.' + field);
      var widgetLabel = this.getLabelOf(field);
      var shortLabel = trim(widgetLabel + '');
      invalidFields.push(shortLabel);
    }
    if (!rc) {
      var theText = invalidFields.join(', ');
      theText = getMessage('The following mandatory fields are not filled in') + ': ' + theText;
      try {
        alert(theText);
        this.submitted = false;
      } catch (e) {}
    }
    for (var i = 0; i < labels.length; i++) {
      this.flash(labels[i], "#FFFACD", 0);
    }
    return rc;
  },
  setVariablesReadOnly: function(readOnly) {
    for (var x = 0; x < g_form.elements.length; x++) {
      for (var i = 0; i < this.nameMap.length; i++) {
        var entry = this.nameMap[i];
        var element = g_form.elements[x];
        if (entry.realName == element.fieldName && element.tableName == "variable") {
          if (typeof g_sc_form == "undefined" || !g_sc_form)
            this.setReadOnly(entry.prettyName, readOnly);
          else
            g_sc_form.setReadOnly(entry.prettyName, readOnly);
        }
      }
    }
  },
  getHelpTextControl: function(variableName) {
    var handler = this.getPrefixHandler(variableName);
    var ele;
    if (handler) {
      var handlerObject = handler.getObject();
      ele = handlerObject.getHelpTextControl(handlerObject.removeCurrentPrefix(variableName));
    }
    if (!ele) {
      jslog("getHelpTextControl is supported for only Service Catalog Variables");
      return;
    }
    return ele;
  },
  getEditableFields: function() {
    var fa = this.elements;
    var answer = [];
    for (var i = 0; i < fa.length; i++) {
      var ed = fa[i];
      var widget = this.getControl(ed.fieldName);
      if (!widget)
        continue;
      if (this.isEditableField(ed, widget))
        answer.push(ed.fieldName);
    }
    return answer;
  },
  isEditableField: function(ge, control) {
    if (!this.isTemplateCompatible(ge, control)) {
      return false;
    }
    if (!this.isVisible(ge, control))
      return false;
    if (this.isReadOnly(ge, control))
      return false;
    if (this.isDisplayNone(ge, control))
      return false;
    return true;
  },
  isTemplateCompatible: function(ge, control) {
    if (this.elementHandlers[control.id]) {
      if (typeof this.elementHandlers[control.id].isTemplatable == "function") {
        return this.elementHandlers[control.id].isTemplatable();
      } else {
        return true;
      }
    } else {
      return true;
    }
  },
  isVisible: function(ge, control) {
    if (this.isDisplayNone(ge, control))
      return false;
    if (this.elementHandlers[control.id])
      if (typeof this.elementHandlers[control.id].isVisible == "function")
        return this.elementHandlers[control.id].isVisible();
    if (ge.getType() != "glide_duration" && ge.getType != "glide_time") {
      var xx = control.style['visibility'];
      if (xx == 'hidden')
        return false;
    }
    xx = this._getElementStyle(ge, 'visibility');
    if (xx == 'hidden')
      return false;
    return true;
  },
  isDisabled: function(fieldName) {
    fieldName = this.removeCurrentPrefix(fieldName);
    var control = this.getControl(fieldName);
    if (!control)
      return true;
    if (this.elementHandlers[control.id])
      if (typeof this.elementHandlers[control.id].isDisabled == "function")
        return this.elementHandlers[control.id].isDisabled();
    return this.isReadOnly("", control);
  },
  isReadOnly: function(ge, control) {
    if (!control)
      return true;
    if (this.elementHandlers[control.id])
      if (typeof this.elementHandlers[control.id].isReadOnly == "function")
        return this.elementHandlers[control.id].isReadOnly();
    return control.disabled || control.readOnly || control.hasClassName("readonly");
  },
  isDisplayNone: function(ge, control) {
    var parentNode = ge.getElementParentNode();
    if (parentNode && parentNode.style.display == 'none')
      return true;
    if (ge.getType() == 'html' || ge.getType() == 'translated_html' || ge.getType() == 'composite_name' || ge.getType() == 'url')
      return false;
    if (!control)
      return;
    var xx = control.style['display'];
    if (xx == 'none')
      return true;
    var xx = this._getElementStyle(ge, 'display');
    if (xx == 'none')
      return true;
    return false;
  },
  _getElementStyle: function(ge, style) {
    var element = ge.getElementParentNode();
    if (element)
      return element.style[style];
    var labelElement = ge.getLabelElement();
    if (labelElement)
      return labelElement.parentNode.parentNode.style[style];
    var parentTR = findParentByTag(ge.getElement(), "tr");
    if (parentTR && parentTR != labelElement)
      return parentTR.style[name];
    return "";
  },
  getMissingFields: function() {
    var fa = this.elements;
    var answer = [];
    for (var i = 0; i < fa.length; i++) {
      var ed = fa[i];
      if (!ed.mandatory)
        continue;
      var widget = this.getControl(ed.fieldName);
      if (!widget)
        continue;
      if (this._isMandatoryFieldEmpty(ed))
        answer.push(ed.fieldName);
    }
    if (typeof g_sc_form != "undefined" && g_sc_form)
      g_sc_form.getMissingFields(answer);
    return answer;
  },
  _isMandatoryFieldEmpty: function(ed) {
    var widgetValue = this.getValue(ed.fieldName);
    if (widgetValue != null && widgetValue != '')
      return false;
    if (ed.supportsMapping) {
      var id = "sys_mapping." + ed.tableName + "." + ed.fieldName;
      var mappingValue = this.getValue(id);
      if (mappingValue.trim())
        return false;
      var nonMappedFieldValue = this.getValue(ed.tableName + "." + ed.fieldName);
      if (nonMappedFieldValue.trim())
        return false;
      return true;
    }
    var displayBox = this.getDisplayBox(ed.fieldName);
    if (displayBox != null) {
      var displayValue = displayBox.value;
      if (displayValue != null && displayValue != '' && displayBox.getAttribute('data-ref-dynamic') == 'true') {
        return false;
      }
    }
    if ((this.isNewRecord() || this.mandatory) && !ed.isDerived())
      return true;
    widgetName = "sys_original." + this.tableName + '.' + ed.fieldName;
    widget = gel(widgetName);
    if (widget) {
      widgetValue = widget.value;
      if ((widgetValue == null || widgetValue == '') && ed.type != "journal_input")
        return false;
    }
    return true;
  },
  resolveNameMap: function(prettyName) {
    var rc = prettyName;
    for (var i = 0; i < this.nameMap.length; i++) {
      var entry = this.nameMap[i];
      if (entry.prettyName == prettyName) {
        rc = entry.realName;
      }
    }
    return rc;
  },
  resolvePrettyNameMap: function(realName) {
    var pname = realName;
    for (var i = 0; i < this.nameMap.length; i++)
      if ('ni.VE' + this.nameMap[i].realName == realName) {
        pname = this.nameMap[i].prettyName;
        break;
      }
    return pname;
  },
  getFormElement: function() {
    return gel(this.tableName + '.do');
  },
  getControl: function(fieldName) {
    var ge = this.getGlideUIElement(fieldName);
    if (ge) {
      var widget = ge.getElement();
      if (widget) {
        return widget;
      }
    }
    return this.getControlByForm(fieldName);
  },
  getControlByForm: function(fieldName) {
    var form = this.getFormElement();
    if (!form)
      return;
    widget = form[this.tableName + '.' + fieldName];
    if (!widget)
      widget = form[fieldName];
    if (widget && typeof widget != 'string' && widget.length && widget.tagName != "SELECT") {
      for (var i = 0; i < widget.length; i++) {
        if (widget[i].checked)
          return widget[i];
      }
      var wt = widget[0].type;
      if (typeof wt != 'undefined' && wt == 'radio')
        return widget[0];
    }
    return widget;
  },
  _tryLabelRow: function(fieldName) {
    var element = this._tryLabelRowElement(fieldName);
    if (element)
      return element.innerText || element.textContent;
    return null;
  },
  _tryLabelRowElement: function(fieldName) {
    var id = "label_" + fieldName;
    var row = gel(id);
    if (row) {
      var child = row.firstChild;
      if (child) {
        return child;
      }
    }
    return null;
  },
  getLabelOf: function(fieldName) {
    var fieldid = this.tableName + '.' + fieldName;
    var widgetLabel = this.getLabel(fieldid);
    var labelContent = "";
    if (widgetLabel) {
      labelContent = $j(widgetLabel).find('.label-text').text() ||
        widgetLabel.innerText ||
        widgetLabel.textContent;
      if (labelContent.indexOf('*') == 0 &&
        document.documentElement.getAttribute('data-doctype') == 'true')
        labelContent = labelContent.toString().substring(1);
      if ((labelContent.lastIndexOf(":") + 1) == labelContent.length)
        labelContent = labelContent.toString().substring(0, (labelContent.length - 1));
    }
    if (labelContent == null || labelContent == '')
      labelContent = this._tryLabelRow(fieldName);
    if (labelContent == null || labelContent == '') {
      var handler = this.getPrefixHandler(this.resolvePrettyNameMap(fieldName));
      if (handler)
        labelContent = handler.getObject().getLabelOf(fieldName);
      else
        labelContent = fieldName;
    }
    return labelContent.trim();
  },
  setLabelOf: function(fieldName, value) {
    var control = g_form.getControl(fieldName);
    var setLabelOfSomething = false;
    if (this.elementHandlers[control.id] && (typeof this.elementHandlers[control.id].setLabelOf == "function"))
      setLabelOfSomething = this.elementHandlers[control.id].setLabelOf(value);
    var labelEl = this._getLabelEl(fieldName);
    if (labelEl) {
      $j(labelEl).find('.label-text').text(value);
      setLabelOfSomething = true;
    }
    return setLabelOfSomething;
  },
  _getLabelEl: function(fieldName) {
    var fieldID = this.tableName + '.' + fieldName;
    var labelEl = this.getLabel(fieldID);
    if (labelEl)
      return labelEl;
    labelEl = this._tryLabelRowElement(fieldName);
    if (labelEl)
      return labelEl;
    return false;
  },
  _getDecorationsEl: function(field) {
    var label = (field instanceof jQuery) ? field : $j(this._getLabelEl(field));
    if (!label.length)
      return null;
    var decorations = label.find('.field_decorations');
    if (!decorations.length) {
      $j('<span class="field_decorations" data-label-decorations="[]" />').prependTo(label);
      decorations = label.find('.field_decorations');
    }
    return decorations;
  },
  _getDecorations: function(fieldName) {
    var attrName = 'data-label-decorations';
    var decorations = this._getDecorationsEl(fieldName);
    if (decorations && decorations.length) {
      var raw = decorations.attr(attrName);
      var json = JSON.parse(raw);
      if (json)
        return json;
    }
    return [];
  },
  _setDecorations: function(fieldName, decorations) {
    var isArr = Array.isArray || function(obj) {
      return $j.type(obj) === "array";
    };
    if (!isArr(decorations))
      return false;
    var attrName = 'data-label-decorations';
    var labelEl = this._getLabelEl(fieldName);
    if (labelEl) {
      var raw = JSON.stringify(decorations);
      var decorEl = this._getDecorationsEl($j(labelEl));
      decorEl.empty();
      decorEl.attr(attrName, raw);
      for (var i = 0; i < decorations.length; i++) {
        var dec = decorations[i];
        var $dec = $j('<span class="field_decoration ' + dec.icon + ' ' + dec.color + '" ' +
          'title="' + dec.text + '" ' +
          'data-placement="right" data-container=".touch_scroll"></span>')
        decorEl.append($dec);
        $dec.tooltip().hideFix();
      }
      return true;
    }
    return false;
  },
  addDecoration: function(field, icon, text, color) {
    text = text || '';
    color = color || '';
    var decorations = this._getDecorations(field);
    var deco = {
      icon: icon,
      text: text,
      color: color
    };
    var isDuplicate = false;
    var maxi = decorations.length;
    for (var i = 0; i < maxi; i++) {
      var dec = decorations[i];
      if (dec.icon == icon &&
        dec.text == text &&
        dec.color == color) {
        isDuplicate = true;
      }
    }
    if (!isDuplicate)
      decorations.push(deco);
    this._setDecorations(field, decorations);
  },
  removeDecoration: function(field, icon, text, color) {
    text = text || '';
    color = color || '';
    var decorations = this._getDecorations(field);
    var out = [];
    var maxi = decorations.length;
    for (var i = 0; i < maxi; i++) {
      var dec = decorations[i];
      if (!(dec.icon == icon &&
          dec.text == text &&
          dec.color == color)) {
        out.push(dec);
      }
    }
    this._setDecorations(field, out);
  },
  removeAllDecorations: function() {
    $j('.field_decorations').remove();
  },
  getSectionNames: function() {
    return g_tabs2Sections.tabNames;
  },
  setSectionDisplay: function(name, display) {
    var index = g_tabs2Sections.findTabIndexByName(name);
    if (index === -1)
      return false;
    if (display)
      g_tabs2Sections.showTab(index);
    else
      g_tabs2Sections.hideTab(index);
    return true;
  },
  isSectionVisible: function(name) {
    var index = g_tabs2Sections.findTabIndexByName(name);
    if (index !== -1)
      return g_tabs2Sections.isVisible(index);
    return false;
  },
  activateTab: function(name) {
    var index = g_tabs2Sections.findTabIndexByName(name);
    if (index !== -1)
      return g_tabs2Sections.setActive(index);
    return false;
  },
  getTabNameForField: function(fieldName) {
    if (!g_form.hasField(fieldName))
      return null;
    var control = g_form.getControl(fieldName);
    return this._getTabNameForElement(control);
  },
  _getTabNameForElement: function(element) {
    var sectionId = $j(element).closest('[data-section-id]').attr('id');
    if (sectionId) {
      var tabIndex = g_tabs2Sections.findTabIndexByID(sectionId);
      return g_tabs2Sections.tabNames[tabIndex];
    }
    return null;
  },
  validate: function() {
    var fa = this.elements;
    var rc = true;
    var labels = [];
    for (var i = 0; i < fa.length; i++) {
      var ed = fa[i];
      var widgetName = this.tableName + '.' + ed.fieldName;
      var widget = this.getControl(ed.fieldName);
      if (!widget)
        continue;
      if (!this.isEditableField(ed, widget))
        continue;
      if (widget.getAttribute("validate") == "false")
        continue;
      var widgetValue = widget.value;
      var widgetType = ed.type;
      var specialType = widget.getAttribute("specialtype");
      if (specialType)
        widgetType = specialType;
      var validator = this.validators[widgetType];
      if (!validator)
        continue;
      this.hideFieldMsg(widget);
      var isValid = validator.call(this, widgetValue);
      if (isValid != null && isValid != true) {
        var widgetLabel = this.getLabelOf(ed.fieldName);
        labels.push(widgetName);
        rc = false;
        if (isValid == false || isValid == "false")
          isValid = getMessage("Invalid text");
        this.showFieldMsg(widget, isValid, 'error');
      }
    }
    for (var i = 0; i < labels.length; i++)
      this.flash(labels[i], "#FFFACD", 0);
    return rc;
  },
  removeCurrentPrefix: function(id) {
    if (id) {
      if (id.indexOf('current.') == 0) {
        id = id.substring(8);
      }
      return id;
    }
  },
  isNumeric: function(internaltype) {
    if (internaltype == 'decimal')
      return true;
    if (internaltype == 'float')
      return true;
    if (internaltype == 'integer')
      return true;
    if (internaltype == 'numeric')
      return true;
    return false;
  },
  isInteger: function(internaltype) {
    if (internaltype == 'integer')
      return true;
    return false;
  },
  setTemplateValue: function(fieldName, value, displayValue) {
    fieldName = this.removeCurrentPrefix(fieldName);
    var control = this.getControl(fieldName);
    if (control)
      control.templateValue = 'true';
    var text = "Field modified by template";
    this.setValue(fieldName, value, displayValue);
    this.addDecoration(fieldName, 'icon-success', text);
  },
  setValue: function(fieldName, value, displayValue) {
    var oldValue = this.getValue(fieldName);
    fieldName = this.removeCurrentPrefix(fieldName);
    var control = this.getControl(fieldName);
    if (!control) {
      var handler = this.getPrefixHandler(fieldName);
      if (handler)
        handler.getObject().setValue(handler.getFieldName(),
          value, displayValue);
      return;
    } else {
      if (control.options && control.options.length) {
        for (var i = 0; i < control.options.length; i++) {
          control.options[i].removeAttribute('selected');
        }
      }
    }
    this._internalChange = true;
    this._setValue(fieldName, value, displayValue, true);
    this._internalChange = false;
    this._opticsInspectorLog(fieldName, oldValue);
  },
  getNiBox: function(fieldName) {
    var niName = 'ni.' + this.tableName + '.' + fieldName;
    return gel(niName);
  },
  getDisplayBox: function(fieldName) {
    var dName = 'sys_display.' + this.tableName + '.' + fieldName;
    var field = gel(dName);
    if (field)
      return field;
    dName = 'sys_display.' + fieldName;
    field = gel(dName);
    if (field)
      return field;
    var handler = this.getPrefixHandler(fieldName);
    if (handler) {
      var handlerObject = handler.getObject();
      return handlerObject.getDisplayBox(handlerObject.removeCurrentPrefix(fieldName));
    }
    return;
  },
  clearValue: function(fieldName) {
    fieldName = this.removeCurrentPrefix(fieldName);
    var control = this.getControl(fieldName);
    if (!control)
      return;
    if (!control.options) {
      this._setValue(fieldName, '');
      return;
    }
    var selindex = control.selectedIndex;
    if (selindex != -1) {
      var option = control.options[selindex];
      option.selected = false;
    }
    var options = control.options;
    for (i = 0; i < options.length; i++) {
      var option = options[i];
      var optval = option.value;
      if (optval == '') {
        option.selected = true;
        break;
      }
    }
  },
  _sanitizeFieldName: function(fieldName) {
    if (fieldName) {
      fieldName = this.removeCurrentPrefix(fieldName);
      fieldName = this._removeTableName(fieldName);
    }
    return fieldName;
  },
  _removeTableName: function(fieldName) {
    if (fieldName.indexOf(this.tableName + ".") === 0) {
      var length = this.tableName.length + 1;
      fieldName = fieldName.substring(length);
    }
    return fieldName;
  },
  _setValue: function(fieldName, value, displayValue, updateRelated) {
    fieldName = this._sanitizeFieldName(fieldName);
    var control = this.getControl(fieldName);
    if (typeof control === 'undefined')
      return;
    var readOnlyField = gel('sys_readonly.' + control.id);
    if (readOnlyField) {
      if (readOnlyField.tagName == "SPAN") {
        var fieldType = readOnlyField.getAttribute('gsft_fieldtype');
        if (fieldType && fieldType.indexOf("html") > -1)
          readOnlyField.innerHTML = value;
        else
          readOnlyField.innerHTML = htmlEscape(value);
      } else
      if (displayValue && readOnlyField.tagName != "SELECT")
        readOnlyField.value = displayValue;
      else {
        readOnlyField.value = value;
        control.value = value;
        onChange(this.tableName + "." + fieldName);
        if (readOnlyField.tagName == "SELECT")
          $j(readOnlyField).trigger('change');
      }
    } else {
      readOnlyField = gel(control.id + "_label");
      if (readOnlyField) {
        displayValue = this._ensureDisplayValue(fieldName, value, displayValue);
        if (readOnlyField.tagName == 'SPAN')
          readOnlyField.innerHTML = displayValue;
        else
          readOnlyField.value = displayValue;
      }
    }
    if (control && control.id && this.elementHandlers[control.id] && (typeof this.elementHandlers[control.id].setValue == "function")) {
      this.elementHandlers[control.id].setValue(value, displayValue);
    } else if ('select2' in $j(control).data()) {
      $j(control).select2('val', value);
      onChange(this.tableName + "." + fieldName);
    } else if (control.options) {
      var i = this._getSelectedIndex(control, value, displayValue);
      control.selectedIndex = i;
      onChange(this.tableName + "." + fieldName);
    } else if (control.type == 'hidden') {
      var nibox = this.getNiBox(fieldName);
      if (nibox && nibox.type == 'checkbox') {
        if (value && value == '0')
          value = 'false';
        if (value && value == '1')
          value = 'true';
        control.value = value;
        onChange(this.tableName + "." + fieldName);
        if (value && value == 'false')
          nibox.checked = null;
        else if (value || value == 'true')
          nibox.checked = 'true';
        else
          nibox.checked = null;
        setCheckBox(nibox);
        return;
      }
      var displaybox = this.getDisplayBox(fieldName);
      if (displaybox) {
        var sel = gel("sys_select." + this.tableName + "." + fieldName);
        if (typeof(displayValue) == 'undefined' && value)
          displayValue = this._ensureDisplayValue(fieldName, value, displayValue);
        if (typeof(displayValue) != 'undefined') {
          control.value = value;
          displaybox.value = displayValue;
          onChange(this.tableName + "." + fieldName);
          removeClassName(displaybox, 'ref_invalid');
          removeClassName(displaybox, 'ref_dynamic');
          displaybox.title = "";
          this._setReferenceSelect(control, sel, value, displayValue);
          refFlipImage(displaybox, control.id);
          if (updateRelated) {
            updateRelatedGivenNameAndValue(this.tableName + '.' + fieldName, value);
          }
          return;
        }
        control.value = value;
        onChange(this.tableName + "." + fieldName);
        if (value == null || value == '') {
          displaybox.value = '';
          this._setReferenceSelect(control, sel, value, '');
          refFlipImage(displaybox, control.id);
          return;
        }
        displaybox.value = displayValue;
        this._setReferenceSelect(control, sel, value, displayValue);
        refFlipImage(displaybox, control.id);
        updateRelatedGivenNameAndValue(this.tableName + '.' + fieldName, value);
      } else if ($(control).hasClassName('glide_destroy_filter') || $(control).hasClassName('glideform-set-value')) {
        $j(control).val(value);
        onChange(this.tableName + "." + fieldName);
      }
    } else {
      control.value = value;
      onChange(this.tableName + "." + fieldName);
    }
  },
  _setReferenceSelect: function(control, sel, value, displayValue) {
    if (control && !control.options && sel) {
      var i = this._getSelectedIndex(sel, value, displayValue);
      sel.selectedIndex = i;
    }
  },
  _getSelectedIndex: function(control, value, displayValue) {
    var options = control.options;
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      if (option.value == value) {
        return i;
      }
    }
    var dv = value;
    if (typeof(displayValue) != 'undefined')
      dv = displayValue;
    var newOption = new Option(dv, value);
    control.options[control.options.length] = newOption;
    return control.options.length - 1;
  },
  _ensureDisplayValue: function(fieldName, value, displayValue) {
    if (displayValue)
      return displayValue;
    var ed = this.getGlideUIElement(fieldName);
    if (!ed)
      return displayValue;
    if (ed.type != 'reference' && ed.type != 'domain_id')
      return displayValue;
    var ga = new GlideAjax('AjaxClientHelper');
    ga.addParam('sysparm_name', 'getDisplay');
    ga.addParam('sysparm_table', ed.reference);
    ga.addParam('sysparm_value', value);
    ga.getXMLWait();
    return ga.getAnswer();
  },
  getUniqueValue: function() {
    return this.getValue('sys_uniqueValue');
  },
  getTitle: function() {
    return this.getValue('sys_titleValue');
  },
  getValue: function(fieldName) {
    fieldName = this.removeCurrentPrefix(fieldName);
    var control = this.getControl(fieldName);
    if (!control) {
      var handler = this.getPrefixHandler(fieldName);
      if (handler)
        return handler.getObject().getValue(
          handler.getFieldName());
      return '';
    }
    return this._getValueFromControl(control);
  },
  getDisplayValue: function() {
    return this.getValue('sys_displayValue');
  },
  _getValueFromControl: function(control) {
    var value;
    if (this.elementHandlers[control.id] && (typeof this.elementHandlers[control.id].getValue == "function")) {
      value = this.elementHandlers[control.id].getValue();
    } else {
      value = control.value;
    }
    return (typeof value !== 'undefined') ? value.toString() : '';
  },
  getIntValue: function(fieldName) {
    var val = this.getValue(fieldName);
    if (!val || val.length == 0)
      return 0;
    return parseInt(formatClean(val));
  },
  getDecimalValue: function(fieldName) {
    var val = this.getValue(fieldName);
    if (!val || val.length == 0)
      return 0;
    var fc = formatClean(val);
    fc = fc.replace(/,/g, '.');
    return parseFloat(fc);
  },
  getBooleanValue: function(fieldName) {
    var val = this.getValue(fieldName);
    val = val ? val + '' : val;
    if (!val || val.length == 0 || val == "false")
      return false;
    return true;
  },
  addOption: function(fieldName, choiceValue, choiceLabel, choiceIndex) {
    fieldName = this.removeCurrentPrefix(fieldName);
    var control = this.getControl(fieldName);
    if (!control) {
      var handler = this.getPrefixHandler(fieldName);
      if (handler)
        handler.getObject().addOption(handler.getFieldName(), choiceValue, choiceLabel, choiceIndex);
      return;
    }
    if (!control.options)
      return;
    var len = control.options.length;
    for (i = 0; i < len; i++) {
      if (control.options[i].text == choiceLabel) {
        return;
      }
    }
    if (choiceIndex == undefined)
      choiceIndex = len;
    if (choiceIndex < 0 || choiceIndex > len)
      choiceIndex = len;
    var newOption = new Option(choiceLabel, choiceValue);
    var value = choiceValue;
    if (len > 0) {
      value = this.getValue(fieldName);
      control.options[len] = new Option('', '');
      for (var i = len; i > choiceIndex; i--) {
        control.options[i].text = control.options[i - 1].text;
        control.options[i].value = control.options[i - 1].value;
      }
    }
    control.options[choiceIndex] = newOption;
    this.setValue(fieldName, value);
  },
  enableOption: function(control, choiceValue, choiceLabel) {
    var len = control.options.length;
    for (var i = len - 1; i >= 0; i--) {
      if (control.options[i].text == choiceLabel && control.options[i].value == choiceValue) {
        control.options[i].disabled = false;
        return true;
      }
    }
    return false;
  },
  clearOptions: function(fieldName) {
    fieldName = this.removeCurrentPrefix(fieldName);
    var control = this.getControl(fieldName);
    if (control && !control.options) {
      var name = "sys_select." + this.tableName + "." + fieldName;
      control = gel(name);
    }
    if (!control) {
      var handler = this.getPrefixHandler(fieldName);
      if (handler)
        handler.getObject().clearOptions(handler.getFieldName());
      return;
    }
    if (!control.options)
      return;
    control.innerHTML = '';
  },
  getOptionControl: function(fieldName, choiceValue) {
    var noPrefix = this.removeCurrentPrefix(fieldName);
    var control = this.getControl(noPrefix);
    if (control && !control.options) {
      var name = "sys_select." + this.tableName + "." + noPrefix;
      control = gel(name);
    }
    return control;
  },
  removeOption: function(fieldName, choiceValue) {
    var control = this.getOptionControl(fieldName, choiceValue);
    if (!control)
      return;
    if (!control.options)
      return;
    var options = control.options;
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      if (option.value == choiceValue) {
        control.options[i] = null;
        break;
      }
    }
  },
  getOption: function(fieldName, choiceValue) {
    var control = this.getOptionControl(fieldName, choiceValue);
    if (!control)
      return null;
    if (!control.options)
      return null;
    var options = control.options;
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      if (option.value == choiceValue)
        return option;
    }
    return null;
  },
  removeContextItem: function(itemID) {
    for (av in contextMenus) {
      if (contextMenus[av]) {
        var menu = contextMenus[av];
        var c = menu.context;
        if (c)
          this.removeItem(menu, itemID);
      }
    }
  },
  removeItem: function(menu, itemID) {
    var items = menu.childNodes;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.innerHTML == itemID) {
        menu.removeChild(item);
        clearNodes(item);
        break;
      }
    }
    return;
  },
  getGlideUIElement: function(fieldName) {
    fieldName = this.removeCurrentPrefix(fieldName);
    for (var i = 0; i < this.elements.length; i++) {
      var thisElement = this.elements[i];
      if (thisElement.fieldName == fieldName)
        return thisElement;
    }
  },
  getDerivedFields: function(fieldName) {
    var parts = fieldName.split(".");
    parts.shift();
    fieldName = parts.join(".") + ".";
    var list = new Array();
    for (var i = 0; i < this.elements.length; i++) {
      var thisElement = this.elements[i];
      if (thisElement.fieldName.indexOf(fieldName) == 0) {
        var target = thisElement.fieldName.substring(fieldName.length);
        list.push(target);
      }
    }
    if (list.length == 0)
      return null;
    return list;
  },
  _addDerivedWaiting: function(fieldName) {
    this.derivedWaiting.push(fieldName);
  },
  _isDerivedWaiting: function(fieldName) {
    var tablePrefix = this.tableName + ".";
    if (fieldName.startsWith(tablePrefix))
      fieldName = fieldName.substring(tablePrefix.length);
    var index = this.derivedWaiting.indexOf(fieldName);
    return (index != -1);
  },
  _removeDerivedWaiting: function(fieldName) {
    var index = this.derivedWaiting.indexOf(fieldName);
    if (index > -1)
      this.derivedWaiting.splice(index, 1);
  },
  getReference: function(fieldName, callback) {
    var opticsContext = null;
    if (window['g_optics_inspect_handler'] && g_optics_inspect_handler.opticsContextStack.length > 0)
      opticsContext = g_optics_inspect_handler.opticsContextStack[g_optics_inspect_handler.opticsContextStack.length - 1];
    fieldName = this.removeCurrentPrefix(fieldName);
    var ed = this.getGlideUIElement(fieldName);
    if (!ed) {
      var handler = this.getPrefixHandler(fieldName);
      if (handler)
        return handler.getObject().getReference(handler.getFieldName(), callback);
      return;
    }
    if (ed.type != 'reference' && ed.type != 'domain_id')
      return;
    var value = this.getValue(fieldName);
    var gr = new GlideRecord(ed.reference);
    if (value == "") {
      if (callback)
        callback(gr);
      return gr;
    }
    gr.addQuery('sys_id', value);
    if (callback) {
      var fn = function(gr) {
        gr.next();
        if (opticsContext)
          CustomEvent.fire('glide_optics_inspect_put_context', opticsContext["category"], opticsContext["name"], opticsContext["sys_id"]);
        callback(gr);
        if (opticsContext)
          CustomEvent.fire('glide_optics_inspect_pop_context');
      };
      gr.query(fn);
      return;
    } else {
      var sw = new StopWatch();
      sw.jslog("*** WARNING *** GlideForm: synchronous getReference call on " + this.getTableName());
    }
    gr.query();
    gr.next();
    return gr;
  },
  submit: function(actionName) {
    actionName = actionName || 'sysverb_update';
    var action = gel(actionName);
    if (!action)
      action = this._getLinkActionByAttribute(actionName);
    if (action)
      return gsftSubmit(action);
  },
  _getLinkActionByAttribute: function(actionName, attribute) {
    var attr = attribute || 'gsft_action_name';
    var selector = 'a[' + attr + '="' + actionName + '"]';
    var el = $j(selector);
    if (el.length === 0)
      return;
    return el[0];
  },
  save: function() {
    return this.submit('sysverb_update_and_stay');
  },
  getActionName: function() {
    var form = this.getFormElement();
    if (form) {
      var theButton = form.sys_action;
      if (theButton)
        return theButton.value;
    }
    return this.action;
  },
  getTableName: function() {
    return this.tableName;
  },
  getSections: function() {
    return $$('form span.tabs2_section span[data-header-only="false"]');
  },
  serialize: function(filterFunc) {
    var formName = this.tableName + '.do';
    if (!filterFunc)
      return Form.serialize(gel(formName)) + this._serializeDisabled();
    var elements = Form.getElements(gel(formName));
    var queryComponents = new Array();
    for (var i = 0; i < elements.length; i++) {
      if (filterFunc(elements[i])) {
        var queryComponent;
        if (elements[i].disabled)
          queryComponent = elements[i].id + '=' + encodeURIComponent(elements[i].value);
        else
          queryComponent = Form.Element.serialize(elements[i]);
        if (queryComponent)
          queryComponents.push(queryComponent);
      }
    }
    return queryComponents.join('&');
  },
  _serializeDisabled: function() {
    var n = this.disabledFields.length;
    var dfa = [];
    for (var i = 0; i < n; i++) {
      var e = this.disabledFields[i];
      if (!e.value || !e.id)
        continue;
      dfa.push(e.id + '=' + encodeURIComponent(e.value));
    }
    if (dfa.length)
      return '&' + dfa.join('&');
    return '';
  },
  serializeChanged: function() {
    var s = this.serializeTargetFields();
    var f = this.serialize(this.changedFieldsFilter.bind(this));
    if (f)
      f = "&" + f;
    return s + f;
  },
  serializeChangedAll: function() {
    var s = this.serializeTargetFields();
    var f = this.serialize(this.allChangedFieldsFilter.bind(this));
    if (f)
      f = "&" + f;
    return s + f;
  },
  serializeTargetFields: function() {
    var s = this._serializeElement("sys_target");
    s += this._serializeElement("sys_uniqueValue");
    s += this._serializeElement("sys_row");
    s += this._serializeElement("sysparm_encoded_record");
    return s;
  },
  _serializeElement: function(id) {
    var e = gel(id);
    if (e) {
      var queryComponent = Form.Element.serialize(e);
      if (queryComponent)
        return "&" + queryComponent;
    }
    return "";
  },
  changedFieldsFilter: function(element) {
    if (element.changed &&
      element.id.startsWith(this.getTableName() + ".") &&
      (element.tagName.toUpperCase() != "TEXTAREA"))
      return true;
    if (element.id.startsWith("ni.VE"))
      return true;
    if (element.name.startsWith("ni.WATERMARK"))
      return true;
    return false;
  },
  allChangedFieldsFilter: function(element) {
    if (element.changed && element.id.startsWith(this.getTableName() + "."))
      return true;
    return false;
  },
  flash: function(widgetName, color, count) {
    var row = null;
    var labels = new Array();
    var realLabel = this.getLabel(widgetName);
    if (realLabel)
      row = $(realLabel.parentNode.parentNode);
    else {
      jslog("flash() called for '" + widgetName + "' but there is no label for it")
      return;
    }
    var temp = row.select('.label_left');
    for (var i = 0; i < temp.length; i++)
      labels.push(temp[i]);
    temp = row.select('.label_right');
    for (var i = 0; i < temp.length; i++)
      labels.push(temp[i]);
    temp = row.select('.label');
    for (var i = 0; i < temp.length; i++)
      labels.push(temp[i]);
    temp = row.select('.control-label');
    for (var i = 0; i < temp.length; i++)
      labels.push(temp[i]);
    count = count + 1;
    for (var i = 0; i < labels.length; i++) {
      var widget = labels[i];
      if (widget) {
        var originalColor = widget.style.backgroundColor;
        widget.style.backgroundColor = color;
      }
    }
    if (count < 4)
      setTimeout('g_form.flash("' + widgetName + '", "' + originalColor + '", ' + count + ')', 500);
  },
  enable: function() {
    var form = this.getFormElement();
    if (form)
      for (var i = 0; i < form.elements.length; i++)
        form.elements[i].disabled = false;
  },
  disable: function() {
    var form = this.getFormElement();
    if (form)
      for (var i = 0; i < form.elements.length; i++)
        form.elements[i].disabled = true;
  },
  showRelatedList: function(listTableName) {
    CustomEvent.fire('related_lists.show', listTableName);
  },
  hideRelatedList: function(listTableName) {
    CustomEvent.fire('related_lists.hide', listTableName);
  },
  getRelatedListNames: function() {
    if (window.NOW.g_relatedLists)
      return window.NOW.g_relatedLists.lists;
    if (window.g_tabs2List) {
      var relatedListNames = [];
      var trimmedNames = g_tabs2List.tabIDs;
      for (var i = 0; i < trimmedNames.length; i++)
        relatedListNames.push(trimmedNames[i].split('.').slice(1).join('.'));
      return relatedListNames;
    }
    var listWrapper = gel("related_lists_wrapper");
    if (!listWrapper)
      return [];
    var forthcomingTabs = listWrapper.getAttribute('data-lists');
    if (!forthcomingTabs)
      return [];
    return forthcomingTabs.split(',');
  },
  _getRelatedListID: function(listTableName) {
    var relatedList = this.findV2RelatedListName(listTableName);
    var relatedListId;
    if (relatedList)
      relatedListId = relatedList.getAttribute("id");
    if (!relatedListId)
      relatedListId = this.getTableName() + "." + listTableName;
    return relatedListId;
  },
  findV2RelatedListName: function(listTableName) {
    var tableName = this.getTableName();
    var compareId = tableName + "." + listTableName;
    var rlw = gel("related_lists_wrapper");
    if (!rlw)
      return "";
    for (var i = 0; i < rlw.childNodes.length; i++) {
      var node = rlw.childNodes[i];
      if (node.nodeName != "DIV")
        continue;
      var idName = node.getAttribute("id");
      if (idName.length == 0)
        continue;
      if (idName.indexOf(compareId) > -1)
        return node;
    }
    if (typeof GlideLists2 == "undefined")
      return;
    for (var id in GlideLists2) {
      var list = GlideLists2[id];
      if (list.getTableName() == listTableName && list.getParentTable() == tableName)
        return list.getContainer();
    }
    return "";
  },
  showRelatedLists: function() {
    var listNames = g_form.getRelatedListNames();
    for (var i = 0; i < listNames.length; i++) {
      this.showRelatedList(listNames[i]);
    }
  },
  hideRelatedLists: function() {
    var listNames = g_form.getRelatedListNames();
    for (var i = 0; i < listNames.length; i++) {
      this.hideRelatedList(listNames[i]);
    }
  },
  addInfoMessage: function(msg, id) {
    this._addFormMessage(msg, "info", id);
  },
  addWarningMessage: function(msg, id) {
    this._addFormMessage(msg, "warning", id);
  },
  addErrorMessage: function(msg, id) {
    this._addFormMessage(msg, "error", id);
  },
  _addFormMessage: function(msg, type, id) {
    GlideUI.get().addOutputMessage({
      msg: msg,
      type: type,
      id: id
    });
    var scrollDiv = getFormContentParent();
    scrollDiv.scrollTop = 0;
  },
  clearMessages: function() {
    GlideUI.get().clearOutputMessages();
  },
  showFieldMsg: function(input, message, type, scrollForm) {
    var msgClass;
    var msgImage;
    var msgImageAlt;
    var msgRowType;
    switch (type) {
      case "info":
        msgClass = this.INFO_CLASS;
        msgRowType = 'info' + this.MSG_ROW;
        break;
      case "error":
        msgClass = this.ERROR_CLASS;
        msgRowType = 'error' + this.MSG_ROW;
        break;
      case "warning":
        msgClass = this.WARNING_CLASS;
        msgRowType = 'warning' + this.MSG_ROW;
        break;
      default:
        type = 'info';
        msgClass = this.INFO_CLASS;
        msgRowType = 'info' + this.MSG_ROW;
        break;
    }
    var inputElement = input;
    if (typeof(inputElement) == "string")
      inputElement = this.getControl(inputElement);
    if (!inputElement) {
      var handler = this.getPrefixHandler(input);
      if (handler) {
        var handlerObject = handler.getObject();
        var fieldName = handler.getFieldName();
        var actualName = handlerObject.getActualName(fieldName);
        inputElement = handlerObject.getControl(actualName);
      }
    }
    if (!inputElement || !message) {
      jslog("ERROR: invalid field or missing message passed to g_form.showFieldMsg('" + input + "','" + message + "')");
      return;
    }
    if (inputElement.id && this.elementHandlers[inputElement.id] && (typeof this.elementHandlers[inputElement.id].showFieldMsg == "function"))
      this.elementHandlers[inputElement.id].showFieldMsg(input, message, type);
    var positionedCursor = this._positionCursorAtError(inputElement, message);
    var fieldRowId = "element." + inputElement.id;
    var fieldRow = document.getElementById(fieldRowId);
    var doc;
    var isVariable = false;
    var variableMsgRow = null;
    if (!fieldRow) {
      var parent = inputElement.parentNode;
      while (parent != null) {
        if (parent.nodeName.toUpperCase() == 'TR') {
          fieldRow = parent;
          isVariable = true;
          break;
        }
        parent = parent.parentNode;
      }
    }
    if (!fieldRow) {
      jslog("Error adding field message. Couldn't find the row to add the field message to.");
      return;
    }
    doc = fieldRow.ownerDocument;
    var inputContainer = inputElement.up('.form-field');
    if (!inputContainer)
      inputContainer = inputElement.up();
    var fieldMsgContainer = inputContainer.down('.fieldmsg-container');
    if (!fieldMsgContainer) {
      fieldMsgContainer = doc.createElement('div');
      fieldMsgContainer.className = 'fieldmsg-container';
      if (isVariable)
        fieldMsgContainer.className = 'variable-field-msg';
      fieldMsgContainer.id = inputElement.id + '_fieldmsg';
      inputContainer.insert(fieldMsgContainer);
      inputElement.setAttribute('aria-describedby', fieldMsgContainer.id);
    }
    var fieldMsgRow = doc.createElement('DIV');
    fieldMsgRow.className = msgClass;
    fieldMsgRow.hasFieldmsg = true;
    var fieldmsgMsg = doc.createTextNode(message);
    fieldMsgRow.appendChild(fieldmsgMsg);
    fieldMsgContainer.insert(fieldMsgRow);
    if (!positionedCursor)
      this._scrollToElementTR(fieldRow, fieldMsgRow, scrollForm);
    _frameChanged();
  },
  _scrollToElementTR: function(labelTR, msgTR, scrollForm) {
    var scroll = scrollForm;
    if (typeof scroll == "undefined") {
      var scrollToMsg = gel("ni.scroll_to_messsage_field");
      if (scrollToMsg == null)
        scroll = true;
      else {
        if (scrollToMsg.value != "false")
          scroll = true;
        else
          scroll = false;
      }
    }
    if (!scroll)
      return;
    var scrollDiv = getFormContentParent();
    var refControl = gel("sys_target");
    var ref;
    var titleDiv;
    if (refControl != null) {
      ref = refControl.value;
      titleDiv = gel(ref + ".form_header");
    } else {
      titleDiv = gel("form_header");
    }
    var headerHeight = 0;
    if (titleDiv && titleDiv.clientHeight)
      headerHeight = titleDiv.clientHeight;
    var topOfLabel = grabOffsetTop(labelTR);
    var needToScroll = false;
    if (topOfLabel > scrollDiv.scrollTop + scrollDiv.clientHeight)
      needToScroll = true;
    else if (topOfLabel < scrollDiv.scrollTop + headerHeight)
      needToScroll = true;
    else {
      var topOfMsg = grabOffsetTop(msgTR);
      if (topOfMsg > scrollDiv.scrollTop + scrollDiv.clientHeight)
        needToScroll = true;
    }
    if (!needToScroll)
      return;
    var scrollTopSetting = topOfLabel - headerHeight;
    if (scrollDiv.id)
      setTimeout("$('" + scrollDiv.id + "').scrollTop = " + scrollTopSetting, 100);
    else
      scrollDiv.scrollTop = scrollTopSetting;
  },
  showErrorBox: function(input, message, scrollForm) {
    this.showFieldMsg(input, message, "error", scrollForm);
  },
  hideFieldMsg: function(input, clearAll) {
    var inputElement = input;
    if (typeof(inputElement) == "string")
      inputElement = this.getControl(inputElement);
    if (!inputElement) {
      var handler = this.getPrefixHandler(input);
      if (handler) {
        var handlerObject = handler.getObject();
        var fieldName = handler.getFieldName();
        var actualName = handlerObject.getActualName(fieldName);
        inputElement = handlerObject.getControl(actualName);
      }
    }
    if (!inputElement) {
      jslog("ERROR: invalid field ('" + input + "') passed to g_form.hideFieldMsg");
      return;
    }
    if (inputElement.id && this.elementHandlers[inputElement.id] && (typeof this.elementHandlers[inputElement.id].hideFieldMsg == "function"))
      this.elementHandlers[inputElement.id].hideFieldMsg(input, clearAll);
    var fieldTrId = "element." + inputElement.id;
    var tr = document.getElementById(fieldTrId);
    if (!tr) {
      var parent = inputElement.up("div.form-field.input_controls");
      if (!parent)
        parent = inputElement.up("td");
      if (parent) {
        var msgs = $(parent).select(".variable-field-msg");
        if (msgs)
          for (var i = 0; i < msgs.length; i++) {
            parent.removeChild(msgs[i]);
            if (!clearAll)
              return;
          }
      }
    }
    if (tr == null)
      return;
    var msgContainer = tr.down('.fieldmsg-container');
    if (!msgContainer)
      return;
    if (clearAll)
      msgContainer.update('');
    else {
      var messages = msgContainer.select('.fieldmsg');
      if (messages[0])
        messages[0].remove();
    }
  },
  hasFieldMsgs: function(type) {
    var formHasFieldMsgs = false;
    if (type) {
      var msgTRs = $(document.body).select('.fieldmsg.notification-' + type);
      formHasFieldMsgs = msgTRs.length > 0;
    } else {
      var msgTRs = $(document.body).select('.fieldmsg');
      formHasFieldMsgs = msgTRs.length > 0;
    }
    return formHasFieldMsgs;
  },
  hideAllFieldMsgs: function(type) {
    if (type) {
      var msgTRs = $(document.body).select('.fieldmsg.notification-' + type);
      for (var i = 0; i < msgTRs.length; i++) {
        msgTRs[i].parentNode.removeChild(msgTRs[i]);
      }
    } else {
      var msgTRs = $(document.body).select('.fieldmsg');
      for (var i = 0; i < msgTRs.length; i++) {
        msgTRs[i].parentNode.removeChild(msgTRs[i]);
      }
    }
    CustomEvent.fire('sn.form.hide_all_field_msg', type);
  },
  hideErrorBox: function(input) {
    this.hideFieldMsg(input);
  },
  setStreamJournalFieldsDisplay: function(show) {
    CustomEvent.fire('sn.stream.change_input_display', this.getTableName(), show);
    CustomEvent.fire('sn.form.change_input_display', !show);
  },
  _positionCursorAtError: function(elem, message) {
    if (typeof elem == "undefined" || elem.disabled)
      return false;
    var index = message.indexOf("line (");
    if (index > -1) {
      var parenIndex = message.indexOf(")", index + 6);
      if (parenIndex > -1) {
        var lineNo = message.substring(index + 6, parenIndex);
        lineNo = parseInt(lineNo, 10);
        index = message.indexOf("(", parenIndex);
        if (index > -1) {
          parenIndex = message.indexOf(")", index);
          if (parenIndex > -1) {
            var columnNo = message.substring(index + 1, parenIndex);
            columnNo = parseInt(columnNo, 10);
            return this._setCaretPositionLineColumn(elem, lineNo, columnNo);
          }
        } else
          return this._setCaretPositionLineColumn(elem, lineNo, 1);
      }
    }
    return false;
  },
  _setCaretPositionLineColumn: function(elem, lineNo, columnNo) {
    var pl = 1;
    var data = elem.value;
    var len = data.length;
    var position = 0;
    while (pl < lineNo && position > -1) {
      position = data.indexOf('\n', position);
      if (position > -1)
        position++;
      pl++;
    }
    if (position == -1) {
      jslog("Failed to find editor caret position for error");
      return false;
    }
    position += columnNo - 1;
    if (elem.createTextRange)
      position -= lineNo - 1;
    try {
      this._setCaretPosition(elem, position);
    } catch (err) {
      jslog("Failed to position cursor at the error");
      return false;
    }
    return true;
  },
  _setCaretPosition: function(elem, caretPos) {
    if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else {
      if (elem.setSelectionRange) {
        if (caretPos == 0)
          caretPos = 1;
        elem.setSelectionRange(caretPos, caretPos + 1);
        if (isSafari || isChrome)
          elem.focus();
        else {
          var ev = document.createEvent("KeyEvents");
          ev.initKeyEvent("keypress", true, true, window, false, false, false, false, 0, elem.value.charCodeAt(caretPos - 1));
          elem.dispatchEvent(ev);
          elem.focus();
        }
      } else
        elem.focus();
    }
  },
  disableAttachments: function() {
    var icon = gel("header_add_attachment");
    if (icon)
      icon.style.display = 'none';
    AttachmentUploader.disableAttachments();
  },
  enableAttachments: function() {
    var icon = gel("header_add_attachment");
    if (icon)
      icon.style.display = '';
    AttachmentUploader.enableAttachments();
  },
  hasField: function(fieldName) {
    return !!this.getControl(fieldName);
  },
  setAction: function(action) {
    this.action = action;
  },
  getAction: function() {
    return this.action;
  },
  setScope: function(scope) {
    this.scope = scope;
  },
  getScope: function() {
    return this.scope;
  },
  setLiveUpdating: function(isLiveUpdating) {
    this._isLiveUpdating = isLiveUpdating;
  },
  isLiveUpdating: function() {
    return this._isLiveUpdating;
  },
  _opticsInspectorLog: function(fieldName, oldValue) {
    var value = this.getValue(fieldName);
    opticsLog(this.getTableName(), fieldName, null, oldValue, value);
  },
  type: "GlideForm"
});
var GlideFormPrefixHandler = Class.create({
  initialize: function(handlerObject) {
    this.handlerObject = handlerObject;
    this.fieldName = "";
  },
  getObject: function() {
    return this.handlerObject;
  },
  getFieldName: function() {
    return this.fieldName;
  },
  setFieldName: function(id) {
    this.fieldName = id;
  },
  type: "GlideFormPrefixHandler"
});;
/*! RESOURCE: /scripts/doctype/GwtContextMenu.js */
var gActiveContext;
var contextMenus = new Object();
var shortcuts = new Object();
var GwtContextMenu = Class.create({
  SUBMENU_INDICATOR: "<img src='images/context_arrow.gifx' class='context_item_menu_img' alt='Add' />",
  initialize: function(id, useBodyAsParent) {
    this.timeout = null;
    this.properties = new Object();
    this.setID(id);
    this.getMenu();
    this.onshow = null;
    this.onhide = null;
    this.beforehide = null;
    this.docRoot = this._getDocRoot();
    this.hasItems = false;
    this.hideOnlySelf = false;
    this.trackSelected = false;
    if (typeof useBodyAsParent == "undefined")
      useBodyAsParent = false;
    this._getParentElement(useBodyAsParent);
  },
  isEmpty: function() {
    return !this.hasItems;
  },
  _getParentElement: function(useBodyAsParent) {
    if (useBodyAsParent) {
      this.parentElement = document.body;
      return;
    }
    this.parentElement = getFormContentParent();
  },
  _getDocRoot: function() {
    var docRoot = window.location.protocol + "//" + window.location.host;
    if (window.location.pathname.indexOf("/") > -1) {
      var fp = window.location.pathname;
      fp = fp.substring(0, fp.lastIndexOf("/"));
      if (fp.substring(0, 1).indexOf("/") != -1)
        docRoot = docRoot + fp;
      else
        docRoot = docRoot + "/" + fp;
    }
    docRoot += "/";
    return docRoot;
  },
  add: function(label, id, keys) {
    this.hasItems = true;
    var m = this.getMenu();
    var d = document.createElement("div");
    d.setAttribute("item_id", id);
    d.className = "context_item";
    d.isMenuItem = true;
    var l = !keys ? label : (label + ' (' + keys + ')');
    d.innerHTML = l;
    if (keys)
      d.setAttribute("data-label", label);
    m.appendChild(d);
    return d;
  },
  addHref: function(label, href, img, title, id, keys) {
    keys = this.addKeyShortcut(keys, href);
    var d = this.add(label, id, keys);
    d.setAttribute("href", href);
    if (title && title != null)
      d.setAttribute("title", title);
    this.setImage(d, img);
    return d;
  },
  addFunc: function(label, func, id) {
    var d = this.add(label, id);
    d.setAttribute("func_set", "true");
    d.func = func;
    return d;
  },
  addURL: function(label, url, target, id) {
    var d = this.add(label, id);
    url = this._updateURL(d, label, url);
    d.setAttribute("url", url);
    if (target)
      d.setAttribute("target", target);
    return d;
  },
  addHrefNoSort: function(label, href, id) {
    var item = this.addHref(label, href, null, null, id);
    item.setAttribute("not_sortable", "true");
    return item;
  },
  addHrefNoFilter: function(label, href, id) {
    var item = this.addHref(label, href, null, null, id);
    item.setAttribute("not_filterable", "true");
    return item;
  },
  addMenu: function(label, menu, id) {
    var item = this.add(label + this.SUBMENU_INDICATOR, id);
    item.setAttribute("label", "true");
    menu.setParent(this);
    item.subMenu = menu;
    return item;
  },
  addAction: function(label, action, id) {
    return this.addHref(label, "contextAction('" + this.getTableName() + "', '" + action + "')", null, null, id);
  },
  addConfirmedAction: function(label, action, id) {
    return this.addHref(label, "contextConfirm('" + this.getTableName() + "', '" + action + "')", null, null, id);
  },
  addLine: function() {
    this.hasItems = true;
    var m = this.getMenu();
    var d = document.createElement("div");
    d.className = "context_item_hr";
    d.isMenuItem = true;
    d.disabled = "disabled";
    m.appendChild(d);
    return d;
  },
  addLabel: function(label, id) {
    var m = this.getMenu();
    var d = document.createElement("div");
    d.setAttribute("item_id", id);
    d.className = "context_item";
    d.isMenuItem = true;
    d.innerHTML = label;
    d.disabled = "disabled";
    m.appendChild(d);
    return d;
  },
  addKeyShortcut: function(keys, href) {
    var topWindow = getTopWindow();
    var keyboardEnabled = topWindow.com && topWindow.com.glide && topWindow.com.glide.ui && topWindow.com.glide.ui.keyboard;
    if (!keyboardEnabled)
      return null;
    if (!keys)
      return keys;
    if (shortcuts[keys])
      return keys;
    shortcuts[keys] = {};
    var callback = function(e) {
      var start = e.data.href.indexOf('javascript:') == 0 ? 11 : 0;
      var startParen = e.data.href.indexOf('(');
      var functionName = startParen > start ? e.data.href.substring(start, startParen) : {};
      var func = eval(functionName);
      if (typeof func == 'function')
        eval(e.data.href);
      else
        document.location.href = e.data.href;
    };
    addLoadEvent(function() {
      var keyboard = getTopWindow().com.glide.ui.keyboard;
      var isMainFrame = window.frameElement.id == keyboard.mainFrame;
      var isFormFrame = window.frameElement.id == keyboard.formFrame;
      if (isMainFrame)
        shortcuts[keys] = keyboard.bind(keys, callback, {
          href: href
        }).global(keyboard.formFrame);
      else if (isFormFrame)
        shortcuts[keys] = keyboard.bind(keys, callback, {
          href: href
        }).formFrame();
      else
        shortcuts[keys] = null;
    });
    return keys;
  },
  getItem: function(itemId) {
    var items = this.getMenu().getElementsByTagName("div");
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.getAttribute("item_id") == itemId)
        return item;
    }
    return null;
  },
  setImage: function(item, img) {
    if (item && img) {
      item.style.backgroundImage = "url(" + this.docRoot + img + ")";
      item.style.backgroundRepeat = "no-repeat";
    }
  },
  setChecked: function(item) {
    if (item)
      this.setImage(item, "images/checked.pngx");
  },
  clearImage: function(item) {
    if (item) {
      item.style.backgroundImage = "";
      item.style.backgroundRepeat = "";
    }
  },
  setDisabled: function(item) {
    if (!item)
      return;
    this._dullItem(item);
  },
  setEnabled: function(item) {
    if (!item)
      return;
    this._undullItem(item);
  },
  setHidden: function(item) {
    if (!item)
      return;
    this._hideItem(item);
  },
  setVisible: function(item) {
    if (!item)
      return;
    this._showItem(item);
  },
  setLabel: function(item, label) {
    if (item)
      item.innerHTML = label;
  },
  setHideOnlySelf: function(hideSelf) {
    this.hideOnlySelf = hideSelf;
  },
  clearSelected: function() {
    var items = this.getMenu().getElementsByTagName("div");
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.isMenuItem)
        this.clearImage(item);
    }
  },
  clear: function() {
    var m = this.getMenu();
    clearNodes(m);
    this._setMinWidth();
    this.hasItems = false;
  },
  destroy: function() {
    this.parentElement = null;
    this.menu.context = null;
    this.menu.onmouseover = null;
    this.menu.onmouseout = null;
    this.menu.onclick = null;
    if (isMSIE)
      this.menu.outerHTML = null;
    this.parentMenu = null;
    this.onshow = null;
    this.onhide = null;
    this.properties = null;
    this.timeout = null;
    this.menu = null;
  },
  display: function(e) {
    if (!this.getParent())
      CustomEvent.fireAll('body_clicked', null);
    menuSort = true;
    this._dullMenu();
    this._toggleMenuItems("not_sortable", this.getProperty('sortable'));
    this._toggleMenuItems("not_filterable", this.getProperty('filterable'));
    this.setFiringObject(this._getElement(e));
    e = this._getRealEvent(e);
    var menu = this.getMenu();
    if (this._isEmpty(menu))
      return;
    menu.style.left = "0";
    menu.style.top = "0";
    this.parentElement.appendChild(menu);
    if (this.getProperty("top") > 0 && ((this.getProperty("left") > 0) || (this.getProperty("right") > 0))) {
      menu.style.visibility = 'hidden';
      menu.style.display = 'block';
      this.moveMenuToXY(e, this.getProperty("left"), this.getProperty("top"), this.getProperty("right"));
    } else if (this.getParent()) {
      var x = this._getElement(e);
      menu.style.visibility = 'hidden';
      menu.style.display = 'block';
      this.moveMenuToParent(e, x);
    } else {
      var x = this._getElement(e);
      menu.style.visibility = 'hidden';
      menu.style.display = 'block';
      this.moveMenuToCursor(e);
    }
    gActiveContext = this;
    showObject(menu);
  },
  hide: function() {
    gActiveContext = "";
    hideObject(this.getMenu());
    if (this.getMenu().parentNode)
      this.getMenu().parentNode.removeChild(this.getMenu());
    if (this.onhide)
      this.onhide();
    CustomEvent.fire('refresh.event');
  },
  hideAll: function() {
    var m = this;
    while (m) {
      m.hide();
      m = m.getParent();
    }
  },
  execute: function(e) {
    var x = this._getElement(e);
    if (x.isMenuItem && !x.disabled) {
      if (x.getAttribute("label") == "true") {
        this._getRealEvent(e).cancelBubble = true;
        return;
      }
      if (x.getAttribute("target")) {
        window.open(x.getAttribute("url"), x.getAttribute("target"));
      } else if (x.getAttribute("href")) {
        var expression = x.getAttribute("href");
        gActiveContext = this;
        eval(expression);
      } else if (x.getAttribute("func_set") == "true") {
        x.func();
      } else {
        window.location = x.getAttribute("url");
      }
      if (this.trackSelected) {
        this.clearSelected();
        this.setChecked(x);
      }
    }
    if (x.subMenu)
      x.subMenu.hideAll();
    else
      this.hideAll();
    return false;
  },
  menuLowLight: function(e) {
    var x = this._getElement(e);
    this._handleTimeout(false, x);
    if (!x.isMenuItem)
      return;
    if (!x.subMenu || x.subMenu.getMenu().style.display == 'none')
      this._disableItem(x);
    window.status = '';
    CustomEvent.fire('refresh.event');
  },
  menuHighLight: function(e) {
    var x = this._getElement(e);
    this._handleTimeout(true, x);
    if (!x.isMenuItem)
      return;
    this._hideAllSubs(x.parentNode);
    this._enableItem(x);
    if (x.subMenu) {
      x.subMenu.setParent(this);
      x.subMenu.display(e);
    }
  },
  moveMenuToXY: function(e, left, top, right) {
    var menu = this.getMenu();
    if (right)
      left = right - menu.offsetWidth;
    var offsetTop = window.pageYOffset + top;
    var offsetLeft = window.pageXOffset + left;
    this.moveMenu(top, left, 0, 0, offsetTop, offsetLeft);
  },
  moveMenuToCursor: function(e) {
    var offsetTop = 0;
    var offsetLeft = 0;
    if (isTouchDevice) {
      offsetTop = e.pageY;
      offsetLeft = e.pageX;
    } else {
      offsetTop = e.clientY;
      offsetLeft = e.clientX;
    }
    this.moveMenu(e.clientY, e.clientX, 0, 0, offsetTop, offsetLeft);
  },
  moveMenuToParent: function(e, firingObject) {
    var parent = this.getParent().getMenu();
    var offsetTop = grabOffsetTop(firingObject) - parent.scrollTop;
    var borderLeftWidth = parseInt($j(this.getParent().getMenu()).css('border-right-width'), 10);
    var offsetLeft = grabOffsetLeft(parent) - borderLeftWidth;
    this.moveMenu(offsetTop, offsetLeft, firingObject.offsetHeight, parent.offsetWidth, offsetTop, offsetLeft);
  },
  moveMenu: function(top, left, height, width, offsetTop, offsetLeft) {
    var menu = this.getMenu();
    menu.style.overflowY = "visible";
    menu.setAttribute('gsft_has_scroll', false);
    if (menu.getAttribute('gsft_width'))
      menu.style.width = menu.getAttribute('gsft_width') + "px";
    if (menu.getAttribute('gsft_height'))
      menu.style.height = menu.getAttribute('gsft_height') + "px";
    var leftPos;
    var viewport = new WindowSize();
    if ((left + width + menu.offsetWidth) > viewport.width)
      leftPos = offsetLeft - menu.offsetWidth;
    else
      leftPos = offsetLeft + width;
    menu.style.left = leftPos + "px";
    var scrollOffsets = this._getScrollOffsets(this.parentElement);
    var scrollTop = scrollOffsets.top;
    var direction = 'down';
    var clip = 0;
    if ((top + menu.offsetHeight) > viewport.height) {
      var bottomClip = menu.offsetHeight - (viewport.height - top);
      var topClip = menu.offsetHeight - top + height;
      if (topClip < bottomClip) {
        direction = 'up';
        clip = topClip;
      } else
        clip = bottomClip;
    }
    var topPos;
    if (direction == 'up') {
      var mHeight = menu.offsetHeight;
      var bottomEdge = offsetTop + height;
      topPos = (bottomEdge > mHeight) ? (bottomEdge - mHeight) : 0;
    } else
      topPos = offsetTop;
    if ((topPos - scrollTop + menu.offsetHeight) > viewport.height)
      clip = (topPos - scrollTop + menu.offsetHeight) - viewport.height;
    menu.style.top = topPos + "px";
    if (clip > 0) {
      if (!menu.getAttribute('gsft_width')) {
        menu.setAttribute('gsft_width', menu.offsetWidth);
        menu.setAttribute('gsft_height', menu.offsetHeight);
      }
      menu.setAttribute('gsft_has_scroll', true);
      menu.style.overflowY = "auto";
      var w = menu.offsetWidth + 18;
      menu.style.width = w + "px";
      var h = menu.offsetHeight - clip - 4;
      menu.style.height = h + "px";
    }
  },
  _getScrollOffsets: function(e) {
    var offsets = {};
    if (e.nodeName.toUpperCase() == "BODY") {
      offsets.top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      offsets.left = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
    } else {
      offsets.top = e.scrollTop;
      offsets.left = e.scrollLeft;
    }
    return offsets;
  },
  getFiringObject: function() {
    return this.eventObject;
  },
  getID: function() {
    return this.id;
  },
  getMenu: function() {
    if (!this.menu) {
      this.menu = contextMenus[this.getID()];
      if (!this.menu)
        this._createMenu();
      this._setMenuAttrs();
      this._setMinWidth();
    }
    return this.menu;
  },
  getParent: function() {
    return this.parentMenu;
  },
  getProperty: function(c) {
    if (this.properties)
      return this.properties[c];
    else
      return "";
  },
  getTableName: function() {
    return this.tableName;
  },
  setFiringObject: function(e) {
    this.eventObject = e;
  },
  setID: function(id) {
    this.id = id;
  },
  setOnShow: function(onshow) {
    this.onshow = onshow;
  },
  setOnHide: function(oh) {
    this.onhide = oh;
  },
  setBeforeHide: function(beforeHide) {
    this.beforehide = beforeHide;
  },
  setParent: function(m) {
    this.parentMenu = m;
    this.parentElement = m.parentElement;
  },
  setProperty: function(c, v) {
    this.properties[c] = v;
  },
  setTableName: function(name) {
    this.tableName = name;
  },
  setTimeout: function(t) {
    this.timeout = t;
  },
  setTrackSelected: function(flag) {
    this.trackSelected = flag;
  },
  _createMenu: function() {
    this.menu = document.createElement("div");
    this.menu.name = this.menu.id = this.getID();
    contextMenus[this.getID()] = this.menu;
  },
  _disableItem: function(item) {
    if (item && !item.disabled) {
      removeClassName(item, "context_menu_hover");
    }
  },
  _dullMenu: function() {
    var items = this.getMenu().childNodes;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      this._disableItem(item);
    }
  },
  _enableItem: function(item) {
    if (item && !item.disabled) {
      addClassName(item, "context_menu_hover");
    }
  },
  _getElement: function(e) {
    var x = e.target;
    try {
      if (!x.isMenuItem && x.parentNode.isMenuItem)
        x = x.parentNode;
    } catch (err) {}
    return x;
  },
  _getRealEvent: function(e) {
    return e;
  },
  _handleTimeout: function(lght, firingObject) {
    if (this.getProperty("timeout") > 0) {
      if (lght) {
        clearTimeout(this.timeout);
      } else {
        if (!firingObject.subMenu || firingObject.subMenu != gActiveContext)
          this.timeout = setTimeout('contextHide()', this.getProperty("timeout"));
      }
    }
  },
  _hideAllSubs: function(el) {
    var list = el.getElementsByTagName("div");
    for (var i = 0; i < list.length; i++) {
      var element = list[i];
      if (element.subMenu) {
        var subMenu = element.subMenu.getMenu();
        this._hideAllSubs(element.subMenu.getMenu());
        hideObject(subMenu);
        this._disableItem(element);
      }
    }
  },
  _setMenuAttrs: function() {
    this.menu.context = this;
    this.menu.className = "context_menu";
    this.menu.style.display = "none";
    this.menu.style.zIndex = (this.getParent() ? GwtContextMenu.zIndex + 1 : GwtContextMenu.zIndex);
    this.menu.onmouseover = this.menuHighLight.bind(this);
    this.menu.onmouseout = this.menuLowLight.bind(this);
    if ("ontouchstart" in window && (typeof FastButton != 'undefined'))
      new FastButton(this.menu, this.execute.bind(this));
    else
      this.menu.onclick = this.execute.bind(this);
  },
  _setMinWidth: function() {
    var widther = document.createElement("div");
    widther.style.width = "120px";
    widther.style.height = "1px";
    widther.style.overflow = "hidden";
    this.menu.appendChild(widther);
  },
  _toggleMenuItems: function(attr, enabled) {
    var items = this.getMenu().childNodes;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.getAttribute(attr) == "true") {
        if (enabled) {
          this._undullItem(item);
        } else {
          this._dullItem(item);
        }
      }
    }
  },
  _dullItem: function(item) {
    item.disabled = "disabled";
    item.style.color = "#cccccc";
    removeClassName(item, "context_menu_hover");
  },
  _undullItem: function(item) {
    item.disabled = "";
    item.style.color = "";
  },
  _hideItem: function(item) {
    item.style.display = 'none';
  },
  _showItem: function(item) {
    item.style.display = '';
  },
  _isEmpty: function(menu) {
    if (!menu)
      return true;
    if (!menu.firstChild)
      return true;
    return false;
  },
  _updateURL: function(d, label, url) {
    if (typeof GlideTransactionScope != 'undefined') {
      GlideTransactionScope.appendTransactionScope(function(name, value) {
        url += "&" + name + "=" + value;
      });
      return url;
    }
    if (typeof g_form != 'undefined') {
      this.dmap = this.dmap || {};
      this.dmap[label] = d;
      $(g_form.getFormElement()).observe('glidescope:initialized', function(e) {
        e.memo.gts.appendTransactionScope(function(name, value) {
          var _d = this.dmap[label];
          var _url = _d.getAttribute("url");
          _url += "&" + name + "=" + value;
          _d.setAttribute("url", _url);
        }.bind(this));
      }.bind(this));
    }
    return url;
  },
  z: function() {}
});
GwtContextMenu.zIndex = 1100;

function displayContextMenu(e, name, filterable) {
  if (!getMenuByName(name))
    return;
  var contextMenu = getMenuByName(name).context;
  contextMenu.setProperty('sortable', true);
  contextMenu.setProperty('filterable', filterable);
  contextMenu.display(e);
}

function contextShow(e, tableName, timeoutValue, ttop, lleft, rright) {
  var frameWindow = null;
  try {
    frameWindow = window.frameElement;
    if (frameWindow && frameWindow.id == "dialog_frame" && frameWindow.noContext == true)
      return true;
  } catch (err) {}
  if (shouldSkipContextMenu(e))
    return true;
  e = getRealEvent(e);
  menuTable = tableName;
  var name = tableName;
  if (name && name.substring(0, 8) != "context_")
    name = "context_" + name;
  if (document.readyState && document.readyState != "complete" && document.readyState != "interactive" && typeof window.g_hasCompleted == "undefined") {
    jslog("Ignored context menu show for " + name + " because document was not ready");
    return false;
  }
  window.g_hasCompleted = true;
  if (getMenuByName(name)) {
    var contextMenu = getMenuByName(name).context;
    contextMenu.setProperty('timeout', timeoutValue);
    contextMenu.setProperty('top', ttop);
    contextMenu.setProperty('left', lleft);
    contextMenu.setProperty('right', rright);
    if (contextMenu.menu.style.display == "block")
      contextMenu.menu.style.display = "none";
    else
      contextMenu.display(e);
    if (contextMenu.onshow)
      contextMenu.onshow();
  }
  return false;
}

function contextQuestionLabel(e, sys_id) {
  if (shouldSkipContextMenu(e))
    return true;
  e = getRealEvent(e);
  var name = "context_question_label";
  menuTable = "not_important";
  menuField = "not_important";
  rowSysId = sys_id;
  if (getMenuByName(name)) {
    var contextMenu = getMenuByName(name).context;
    contextMenu.setProperty('sysparm_sys_id', sys_id);
    contextMenu.display(e);
  }
  return false;
}

function shouldSkipContextMenu(e) {
  if (e.ctrlKey && trustCtrlKeyResponse())
    return true;
  return false;
}

function trustCtrlKeyResponse() {
  return isMacintosh || !isSafari;
}

function contextTimeout(e, tableName, waitCount) {
  var name = "context_" + tableName;
  if (!getMenuByName(name))
    return;
  var contextMenu = getMenuByName(name).context;
  if (typeof waitCount == "undefined")
    waitCount = 500;
  contextMenu.setProperty("timeout", waitCount);
  var hideParam;
  if (contextMenu.hideOnlySelf == true)
    hideParam = '"' + name + '"';
  contextMenu.setTimeout(setTimeout('contextHide(' + hideParam + ')', waitCount));
}

function getMenuByName(name) {
  return contextMenus[name];
}

function getRowID(e) {
  var id = null;
  var cell = e.srcElement;
  if (cell == null)
    cell = e.target;
  var row = cell.parentNode;
  var id = row.id;
  if (id == null || id.length == 0)
    id = row.parentNode.id;
  return id;
}

function contextHide(name) {
  if (!gActiveContext)
    return;
  if (typeof name != "undefined" && gActiveContext.getID() != name)
    return;
  if (gActiveContext.beforehide) {
    if (gActiveContext.beforehide() == false)
      return;
  }
  gActiveContext.hideAll();
}

function elementAction(e, event, gcm) {
  var type = e.getAttribute("type");
  var choice = e.getAttribute("choice");
  var id = e.id;
  var fName = id.substring(id.indexOf('.') + 1);
  var tableName = fName.substring(0, fName.indexOf('.'));
  var haveAccess = $("personalizer_" + tableName);
  if (typeof(g_user) != 'undefined') {
    var count = 1;
    if (!gcm)
      gcm = addActionItems(fName, tableName, type, choice);
    if (gcm)
      return contextShow(event, gcm.getID(), -1, 0, 0);
  }
  return true;
}

function addActionItems(id, table, type, choice) {
  var jr = new GlideAjax("AJAXJellyRunner", "AJAXJellyRunner.do");
  jr.addParam('template', 'element_context.xml');
  jr.addParam('sysparm_id', id);
  jr.addParam('sysparm_table', table);
  jr.addParam('sysparm_type', type);
  jr.addParam('sysparm_choice', choice);
  jr.addParam('sysparm_contextual_security', g_form.hasAttribute('contextual_security'));
  jr.setWantRequestObject(true);
  var response = jr.getXMLWait();
  if (!response)
    return;
  var html = response.responseText;
  html.evalScripts(true);
  return gcm;
}
Event.observe(window, 'unload', clearMenus, false);
Event.observe(window, 'scroll', debounceContextScroll(100));

function debounceContextScroll(ms) {
  var timeout;
  return function() {
    if (timeout)
      clearTimeout(timeout);
    timeout = setTimeout(function() {
      contextMenuHide();
      timeout = null;
    }, ms);
  }
}

function clearMenus() {
  for (av in contextMenus) {
    if (contextMenus[av]) {
      var c = contextMenus[av].context;
      if (c) {
        c.destroy();
      }
      contextMenus[av] = null;
    }
  }
  for (var keys in shortcuts) {
    if (shortcuts[keys])
      shortcuts[keys].clear();
  }
  shortcuts = null;
};
/*! RESOURCE: /scripts/doctype/functions.js */
function isDoctype() {
  return true;
}

function gsftSubmitBack() {
  var backButton = document.getElementById('sysverb_back');
  checkDirtyForm(function save() {
    if (isDirtyFormAutosave())
      gsftSubmit(backButton);
    else
      gsftSubmit(null, $j(backButton).closest('form')[0], 'sysverb_check_save');
  }, function discard() {
    gsftSubmit(backButton);
  });
}

function gsftSubmit(control, form, action_name) {
  var f;
  if (typeof form == "undefined") {
    f = findParentByTag(control, 'form');
    if (typeof form == "undefined") {
      var sectionFormId = $("section_form_id");
      if (sectionFormId)
        f = $(sectionFormId.value);
    }
  } else
    f = form;
  if (g_submitted)
    return false;
  if (typeof action_name == "undefined" && control)
    action_name = control.id;
  if (action_name == 'sysverb_delete') {
    if (!confirm(getMessage("Delete this record") + "?")) {
      g_submitted = false;
      return false;
    }
  }
  f.sys_action.value = action_name;
  if (typeof f.onsubmit == "function" && action_name != 'sysverb_back') {
    var rc = f.onsubmit();
    if (rc === false) {
      g_submitted = g_form.submitted = false;
      return false;
    }
  }
  if (control && control.getAttribute('gsft_id')) {
    action_name = control.getAttribute('gsft_id');
    f.sys_action.value = action_name;
  }
  if (action_name == 'sysverb_back')
    g_submitted = false;
  else
    g_submitted = true;
  if (typeof g_form != 'undefined' && g_form && g_submitted)
    g_form.enableUIPolicyFields();
  CustomEvent.fire("glide:form_submitted");
  try {
    GlideAjax.disableSessionMessages();
    f.submit();
  } catch (ex) {
    GlideAjax.enableSessionMessages();
    if (ex.message.indexOf('Unspecified') == -1)
      throw ex;
  }
  return false;
}

function setCheckBox(box) {
  var name = box.name;
  var id = name.substring(3);
  var frm = box.form;
  if (frm)
    frm[id].value = box.checked;
  else {
    var widget = $(id);
    if (widget)
      widget.value = box.checked;
  }
  if (box['onchange'])
    box.onchange();
}

function populateParmQuery(form, prefix, defaultNULL, action) {
  var keys = ['No records selected', 'Delete the selected item?', 'Delete these', 'items?'];
  var msgs = getMessages(keys);
  var keyset = getChecked(form);
  if (!action)
    action = form.sys_action.value;
  if (action.indexOf("sysverb") != 0) {
    if (keyset == '') {
      if (!alert(msgs["No records selected"]))
        return false;
    } else {
      if (action == "delete_checked") {
        var items = keyset.split(",");
        if (items.length == 1) {
          if (!confirm(msgs["Delete the selected item?"]))
            return false;
        } else if (items.length > 0) {
          if (!confirm(msgs["Delete these"] + " " + items.length + " " + msgs["items?"]))
            return false;
        }
      }
    }
  } else if (form.sys_action.value == "sysverb_new") {
    addInput(form, 'HIDDEN', 'sys_id', '-1');
  }
  if (keyset == '' && defaultNULL)
    keyset = defaultNULL;
  if (prefix)
    keyset = prefix + keyset;
  addInput(form, 'HIDDEN', 'sysparm_checked_items', keyset);
  return true;
}

function getChecked(form) {
  var keyset = '';
  var lookup = form;
  for (i = 0; i < lookup.elements.length; i++) {
    if (lookup.elements[i].type != "checkbox")
      continue;
    var v = lookup.elements[i];
    if (v.checked) {
      var id = v.id.substring(3);
      var skip = v.name.substring(0, 4);
      if (skip == "SKIP")
        continue;
      if (id == "all")
        continue;
      if (keyset == '')
        keyset = id;
      else
        keyset = keyset + ',' + id;
    }
  }
  return keyset;
}

function iterateList(e, row, value, update) {
  update = (typeof update === 'undefined') ? true : update;
  if (update)
    g_form.setMandatoryOnlyIfModified(true);
  var form = g_form.getFormElement();
  form.sys_action.value = value;
  var query = e.getAttribute("query");
  addInput(form, 'HIDDEN', 'sys_record_row', row);
  addInput(form, 'HIDDEN', 'sys_record_list', query);
  if (update && typeof form.onsubmit == "function") {
    var rc = form.onsubmit();
    if (!rc) {
      g_submitted = false;
      return false;
    }
  }
  try {
    form.submit();
  } catch (ex) {
    if (ex.message.indexOf('Unspecified') == -1)
      throw ex;
  }
  return false;
}

function refreshNav() {
  CustomEvent.fireTop('navigator.refresh');
}

function checkSave(tableName, urlBase, idField, refKey) {
  var sysid = document.getElementsByName(idField)[0].value;
  checkSaveID(tableName, urlBase, sysid, refKey);
}

function checkSaveID(tableName, urlBase, sysid, refKey) {
  sysid = trim(sysid);
  var url = urlBase + "?sys_id=" + sysid;
  if (refKey)
    url += "&sysparm_refkey=" + refKey;
  var view = $('sysparm_view');
  if (view != null) {
    view = view.value;
    if (view != '')
      url += "&sysparm_view=" + view;
  }
  var nameOfStack = $('sysparm_nameofstack');
  if (nameOfStack != null) {
    nameOfStack = nameOfStack.value;
    if (nameOfStack != '')
      url += "&sysparm_nameofstack=" + nameOfStack;
  }
  if (typeof GlideTransactionScope != 'undefined') {
    GlideTransactionScope.appendTransactionScope(function(name, value) {
      url += "&" + name + "=" + value;
    });
  }
  return checkSaveURL(tableName, url);
}

function isDirtyFormAutosave() {
  return !window.g_form_dirty_support || window.g_form_dirty_autosave || !window.g_form || !g_form.modified;
}

function checkDirtyForm(successCallback, discardCallback) {
  if (isDirtyFormAutosave()) {
    successCallback();
    return;
  }
  var gm = new GlideModal();
  gm.setSize(200);
  gm.setTitle(getMessage('Save changes'));
  var content = $j(new XMLTemplate('dirty_form_modal').evaluate({
    displayValue: g_form.getDisplayValue()
  }));
  content.on('click', 'button', function(evt) {
    var button = evt.target;
    if (button.getAttribute('data-action') == 'discard') {
      g_form.modified = false;
      discardCallback();
    } else if (button.getAttribute('data-action') == 'save') {
      successCallback();
    }
  });
  gm.renderWithContent(content);
}

function checkSaveURL(tableName, url) {
  checkDirtyForm(function save() {
    saveAndRedirect(tableName, url);
  }, function discard() {
    g_navigation.open(url);
  });
}

function saveAndRedirect(tableName, url) {
  if (g_submitted)
    return false;
  var f = document.getElementById(tableName + ".do");
  if (g_form.getTableName() == tableName) {
    var fs = document.forms;
    for (var z = 0; z < fs.length; z++) {
      if (typeof fs[z].sys_uniqueValue != 'undefined') {
        f = fs[z];
        break;
      }
    }
  }
  if (!g_form.isNewRecord())
    g_form.setMandatoryOnlyIfModified(true);
  f.sys_action.value = 'sysverb_check_save';
  addInput(f, 'HIDDEN', 'sysparm_goto_url', url);
  if (typeof f.onsubmit == "function") {
    var rc = f.onsubmit();
    if (!rc) {
      g_submitted = false;
      return false;
    }
  }
  g_submitted = true;
  if (typeof g_form != 'undefined' && g_form)
    g_form.enableUIPolicyFields();
  f.submit();
  return false;
}

function submitTextSearch(event, tableName) {
  if (event != true && event.keyCode != 13)
    return;
  var form = getControlForm(tableName);
  addHidden(form, 'sysverb_textsearch', form['sys_searchtext'].value);
  addHidden(form, 'sysparm_query', '');
  addHidden(form, 'sysparm_referring_url', '');
  form.submit();
}

function getControlForm(name) {
  var form = document.forms[name + '_control'];
  if (isSafari || isChrome) {
    if (form) {
      var collectionType = form.toString();
      if (collectionType != "[object HTMLFormElement]")
        form = form[0];
    }
  }
  return form;
}

function getFormForList(listId) {
  return $(listId + "_control");
}

function getFormForElement(element) {
  var f = element.form;
  if (f)
    return f;
  return findParentByTag(element, "form");
}

function hideReveal(sectionName, imagePrefix, snap) {
  var el = $(sectionName);
  if (!el)
    return;
  var $s = $j('#section-' + sectionName);
  if ($s.length == 0)
    return _hideRevealDirect(sectionName, imagePrefix, snap);
  var $b = $j(".section-content", $s);
  if ($s.hasClass("state-closed"))
    $b.show("medium");
  else
    $b.hide("medium");
  $s.toggleClass('state-closed');
  setPreference("collapse.section." + sectionName, $s.hasClass('state-closed') ? "true" : "false");
}

function _hideRevealDirect(sectionName, imagePrefix, snap) {
  var el = $(sectionName);
  if (!el)
    return;
  var img = $("img." + sectionName);
  var imageName = "section";
  if (imagePrefix)
    imageName = imagePrefix;
  if (el.style.display == "block") {
    hide(el);
    if (img) {
      img.src = "images/" + imageName + "_hide.gifx";
      img.alt = getMessage("Display / Hide");
    }
  } else {
    show(el);
    if (img) {
      img.src = "images/" + imageName + "_reveal.gifx";
      img.alt = getMessage("Display / Hide");
    }
  }
}

function hideRevealWithTitle(name, hideMsg, showMsg) {
  var el = $(name);
  if (!el)
    return;
  var img = $("img." + name);
  if (el.style.display == "block") {
    el.style.display = "none";
    img.src = "images/section_hide.gifx"
    img.title = showMsg;
    img.alt = showMsg;
  } else {
    el.style.display = "block";
    img.src = "images/section_reveal.gifx"
    img.title = hideMsg;
    img.alt = hideMsg;
  }
}

function forceHideWithTitle(name, msg) {
  var el = $(name);
  if (!el)
    return;
  var img = $("img." + name);
  el.style.display = "none";
  img.src = "images/section_hide.gifx"
  img.title = msg;
  img.alt = msg;
}

function forceHide(sectionName) {
  var el = $(sectionName);
  if (!el)
    return;
  var img = $("img." + sectionName);
  el.style.display = "none";
  img.src = "images/section_hide.gifx";
  img.alt = getMessage("Collapse");
}

function forceReveal(sectionName, sectionNameStarts, tagName) {
  var els = $$(tagName);
  if (els) {
    for (var c = 0; c < els.length; ++c) {
      if (els[c].id.indexOf(sectionNameStarts) == 0) {
        forceHide(els[c].id);
      }
    }
  }
  var el = $(sectionName);
  if (!el)
    return;
  var img = $("img." + sectionName);
  el.style.display = "block";
  img.src = "images/section_reveal.gif";
  img.alt = getMessage("Expand");
  window.location = '#' + sectionName;
}

function insertAtCursor(textField, value) {
  if (document.selection) {
    textField.focus();
    sel = document.selection.createRange();
    sel.text = value;
  } else if (textField.selectionStart || textField.selectionStart == 0) {
    var startPos = textField.selectionStart;
    var endPos = textField.selectionEnd;
    textField.value = textField.value.substring(0, startPos) + value +
      textField.value.substring(endPos, textField.value.length);
  } else {
    textField.value += value;
  }
}

function insertScriptVar(textBoxName, selectBoxName) {
  var textBox = $(textBoxName);
  var select = $(selectBoxName);
  var options = select.options;
  for (var i = 0; i != select.length; i++) {
    var option = options[i];
    if (!option.selected)
      continue;
    var label = option.text;
    var v = option.value.split('.');
    v = 'current.' + v[1];
    insertAtCursor(textBox, v);
  }
}

function fieldTyped(me) {
  formChangeKeepAlive();
}

function setPreference(name, value, func) {
  var u = getActiveUser();
  if (u)
    u.setPreference(name, value);
  var url = new GlideAjax("UserPreference");
  url.addParam("sysparm_type", "set");
  url.addParam("sysparm_name", name);
  url.addParam("sysparm_value", value);
  url.getXML(func);
}

function deletePreference(name) {
  var u = getActiveUser();
  if (u)
    u.deletePreference(name);
  var url = new GlideAjax("UserPreference");
  url.addParam("sysparm_type", "delete");
  url.addParam("sysparm_name", name);
  url.getXML(doNothing);
}

function getPreference(name) {
  var u = getActiveUser();
  if (u) {
    var opinion = u.getPreference(name);
    if (typeof opinion != 'undefined')
      return opinion;
  }
  var url = new GlideAjax("UserPreference");
  url.addParam("sysparm_type", "get");
  url.addParam("sysparm_name", name);
  var xml = url.getXMLWait();
  if (!xml)
    return '';
  var items = xml.getElementsByTagName("item");
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var value = item.getAttribute("value");
    if (u)
      u.setPreference(name, value);
    return value;
  }
  return '';
}

function getActiveUser() {
  return getTopWindow().g_active_user || window.g_user;
}

function labelClicked(label, elementType) {
  var hFor = label.htmlFor;
  if (hFor) {
    var elpaco = $("sys_display." + hFor);
    if (!elpaco || elpaco.type == "hidden")
      elpaco = $(hFor);
    if (elpaco && elpaco.type != "hidden" && elpaco.style.visibility != "hidden") {
      if (elpaco.disabled != true)
        if (elementType == "html" || elementType == "translated_html") {
          var handler = g_form.elementHandlers[hFor];
          if (handler)
            handler.focusEditor();
        } else
          elpaco.focus();
    }
  }
  return false;
}

function insertFieldName(textBoxName, label) {
  var textBox = $(textBoxName);
  var index = label.indexOf(":");
  if (index > -1)
    insertAtCursor(textBox, "\n" + label);
  else
    insertAtCursor(textBox, label);
  var form = textBox.up('form');
  if (form) {
    var onChangeData = {
      id: textBox.id,
      value: textBox.value,
      modified: true
    };
    form.fire('glideform:onchange', onChangeData);
  }
}

function replaceRegEx(text, doc, tableName) {
  var s = "";
  var re = new RegExp("%\\{\\w+[\\}]");
  var m = re.exec(text);
  if (m != null) {
    for (i = 0; i < m.length; i++) {
      s = s + m[i];
    }
  }
  if (tableName.indexOf('.') > 0)
    tableName = tableName.split('.')[0];
  if (s.length > 0) {
    var field = s.substring(2, s.length - 1);
    var obj = doc.getElementById("sys_display." + tableName + "." + field);
    var val = "?";
    if (obj != null)
      val = obj.value;
    if (val.length == 0) {
      var labelText = "?";
      var labels = doc.getElementsByTagName("label");
      for (i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == tableName + "." + field) {
          labelText = labels[i].innerHTML;
          break;
        }
      }
      if (labelText.indexOf(':') > 0)
        labelText = labelText.split(':')[0];
      val = labelText;
    }
    re = new RegExp("%\\{" + field + "[\\}]", "g");
    var result = text.replace(re, val);
    if (result.indexOf("%{") > 0)
      result = replaceRegEx(result, doc, tableName);
    return result;
  }
  return text;
}

function toggleInline(name) {
  _toggleDisplay(name, 'inline');
}

function _toggleDisplay(name, displayType) {
  var e = $(name);
  if (e.style.display == 'none') {
    e.style.display = displayType;
    setPreference(name, displayType, null);
  } else {
    e.style.display = 'none';
    setPreference(name, 'none', null);
  }
}

function textareaResizer(id, change) {
  objectResizer(id, change, 'rows');
}

function textareaSizer(id, rows) {
  var element = $(id);
  if (element)
    setAttributeValue(element, 'rows', rows);
}

function selectResizer(id, change) {
  objectResizer(id, change, 'size');
}

function objectResizer(id, change, attrName) {
  var element = $(id);
  if (!element)
    return;
  var value = parseInt(element.style.height, 10)
  value += change;
  if (value < 1)
    value = 1;
  if (element.tagName == 'INPUT') {
    element = $("div." + id);
    if (element) {
      if (change > 0) {
        element.show();
      } else {
        element.hide();
        value = 1;
      }
    }
  } else {
    var oldRows = element.rows;
    element.style.height = value + 'px';
    handleMaxMinHeights(element, value);
    resizeTextAreaIframe(true, id, value);
  }
  setPreference('rows.' + id, value);
  _frameChanged();
}

function handleMaxMinHeights(element, height) {
  if (!element || !height)
    return;
  var $element = $(element),
    maxHeight = parseInt($element.getStyle('maxHeight'), 10),
    minHeight = parseInt($element.getStyle('minHeight'), 10),
    id = getAttributeValue($element, 'id');
  if (height >= maxHeight) {
    $('sizer_plus_' + id).addClassName('disabled');
    $element.setStyle({
      overflowY: 'auto'
    });
    return;
  }
  if (height <= minHeight) {
    $('sizer_minus_' + id).addClassName('disabled');
    return;
  }
  $('sizer_plus_' + id).removeClassName('disabled');
  $('sizer_minus_' + id).removeClassName('disabled');
}

function resizeTextAreaIframe() {
  var args = Array.prototype.slice.call(arguments, 0),
    tf = $("textarea_iframe." + id),
    doctype = args[0],
    id = args[1],
    height,
    oldRows,
    rows;
  if (doctype) {
    height = args[2];
  } else {
    rows = args[2];
    oldRows = args[3];
  }
  if (!tf) {
    tf = $(id + '_ifr');
    if (!tf)
      tf = $('textarea_iframe.' + id);
    if (tf) {
      var tbl = $(id + '_tbl');
      var readOnlyDiv = $(id + '_readOnlyDiv');
      if (doctype) {
        tf.style.height = (height + 60) + "px";
        if (tbl) {
          tbl.style.height = (height + 60) + "px";
        }
        if (readOnlyDiv) {
          readOnlyDiv.style.height = (height + 60) + "px";
        }
      } else {
        var elHeight = parseInt(tf.clientHeight);
        if (elHeight == 0 && readOnlyDiv)
          elHeight = parseInt(readOnlyDiv.style.height);
        var pixelsPerRow = 12;
        var newHeight = elHeight + (rows - oldRows) * pixelsPerRow;
        tf.style.height = newHeight + "px";
        if (tbl) {
          tbl.style.height = (parseInt(tbl.style.height) + (newHeight - elHeight)) + "px";
        }
        if (readOnlyDiv) {
          readOnlyDiv.style.height = newHeight + "px";
        }
      }
    }
  }
  if (!tf)
    return;
  if (!tf.parentNode)
    return;
  if (!tf.parentNode.nextSibling)
    return;
  var nid = tf.parentNode.nextSibling.id;
  if (nid != id)
    return;
  var elHeight = tf.clientHeight;
  var pixelsPerRow = Math.round(elHeight / oldRows);
  tf.style.height = rows * pixelsPerRow + "px";
}

function toggleQuestionRows(thisclass, display, fl) {
  forcelabels = false;
  if (fl == true)
    forcelabels = true;
  var rows = $(document.body).select('.' + thisclass);
  for (i = 0; i < rows.length; i++) {
    var element = rows[i];
    var id = element.id;
    if ('CATEGORY_LABEL' != id || forcelabels)
      element.style.display = display;
  }
  var openStyle = 'none';
  var closedStyle = 'none';
  if ('none' == display)
    openStyle = '';
  else
    closedStyle = '';
  var s = $(thisclass + 'CLOSED');
  s.style.display = closedStyle;
  s = $(thisclass + 'OPEN');
  s.style.display = openStyle;
}

function toggleWorkflow(id, expandPref) {
  var map = getMessages(['Expand', 'Collapse']);
  var table = $("workflow." + id);
  var spans = table.getElementsByTagName("span");
  for (var i = 0; i != spans.length; i++) {
    var span = spans[i];
    if (!span.getAttribute("stage"))
      continue;
    var spanImage = $(span.id + '.image');
    var spanText = $(span.id + '.text');
    if (span.getAttribute("selected") == 'true')
      spanText.style.color = "#2050d0";
    var filterImg = $('filterimg.' + id);
    if (expandPref == "false") {
      span.style.display = "";
      spanText.style.display = "none";
      filterImg.src = "images/filter_hide16.gifx";
      filterImg.title = map["Expand"];
      filterImg.alt = map["Expand"];
    } else {
      span.style.display = "block";
      spanText.style.display = "";
      filterImg.src = "images/filter_reveal16.gifx";
      filterImg.title = map["Collapse"];
      filterImg.alt = map["Collapse"];
    }
  }
  _frameChanged();
}

function togglePreference(id) {
  toggleItems(id);
}

function toggleItems(id, force) {
  var tables = $$("table");
  for (var i = 0; i < tables.length; i++) {
    var tableId = tables[i].id;
    if (tableId.indexOf("workflow.") == -1)
      continue;
    var idParts = tables[i].id.split(".");
    if (id && tableId != "workflow." + id)
      continue;
    var pref = getPref(idParts[1]);
    if (force != pref)
      toggleWorkflow(idParts[1], pref);
    if (id)
      break;
  }
}

function getPref(id) {
  var filterImgSrc = $('filterimg.' + id).src
  if (filterImgSrc.indexOf('filter_hide') != -1)
    return "true";
  return "false";
}
document.addEventListener('keyup', checkForClientKeystroke);

function checkForClientKeystroke(evt) {
  if (evt.keyCode == 27 && window.g_popup_manager) {
    g_popup_manager.destroypopDiv();
    return;
  }
  if (evt.shiftKey && evt.ctrlKey && evt.keyCode == 74) {
    var gWindow = new GlideDialogWindow("client_js");
    gWindow.setTitle("JavaScript Executor");
    gWindow.setPreference('table', 'javascript_executor');
    gWindow.render();
    Event.stop(evt);
    return;
  }
  try {
    if (typeof parent.navVisible == "function") {
      if (evt.ctrlKey && evt.keyCode == 190 && !evt.shiftKey && !evt.altKey) {
        Event.stop(evt);
        if (parent.navVisible()) {
          parent.hideNav();
          parent.hide("banner_top_left");
          parent.hide("banner_top_right");
        } else {
          parent.showNav();
          parent.show("banner_top_left");
          parent.show("banner_top_right");
        }
      }
    }
  } catch (e) {}
}

function toggleHelp(name) {
  var wrapper = $('help_' + name + '_wrapper');
  var image = $('img.help_' + name + '_wrapper');
  if (wrapper.style.display == "block") {
    wrapper.style.display = "none";
    image.src = "images/filter_hide16.gifx";
  } else {
    wrapper.style.display = "block";
    image.src = "images/filter_reveal16.gifx";
  }
  image.alt = getMessage("Display / Hide");
  _frameChanged();
}

function validateHex(field) {
  var num = field.value;
  var valid = isHex(num);
  if (!valid) {
    var sName = '';
    if (field.name != null)
      sName = ' of ' + field.name + ' ';
    alert("The entered value " + sName + "is not hex.  Please correct.");
  }
}

function isHex(num) {
  var str = num.replace(new RegExp('[0-9a-fA-F]', 'g'), '');
  if (str.length > 0)
    return false;
  return true;
}

function setLightWeightLink(name) {
  var v = $(name);
  if (!v)
    return;
  var link = $(name + "LINK");
  if (!link)
    return;
  var vis = "hidden";
  if (v.value != '')
    vis = "";
  link.style.visibility = vis;
  link.style.display = vis == 'hidden' ? 'none' : '';
}

function toggleDebug(id) {
  id = id.split('.')[1];
  for (var i = 0; i < 1000; i++) {
    var widgetName = 'debug.' + id + '.' + i;
    var w = $(widgetName);
    if (!w)
      return;
    w.toggle();
  }
}

function enterSubmitsForm(e, enter_submits_form) {
  if (e.keyCode != 13)
    return true;
  if (e.ctrlKey == true)
    return false;
  var source = Event.element(e);
  if (source.getAttribute("data-type") && e.keyCode == 13 && source.getAttribute("data-type") == 'ac_reference_input')
    return false;
  if (source && source.type == "textarea")
    return true;
  if (source && source.type == "submit") {
    if (source.disabled == false && source.onclick) {
      source.onclick();
      return false;
    }
  }
  if (enter_submits_form == 'false')
    return false;
  var headerElements = $(document.body).select(".header");
  var eSize = headerElements.length;
  for (var i = 0; i < eSize; i++) {
    var element = headerElements[i];
    if (element.type == "submit") {
      if (element.disabled == false) {
        source.blur();
        setTimeout(function() {
          element.onclick();
        }, 0);
        return false;
      }
    }
  }
  return false;
}

function gsftPrompt(title, question, onPromptComplete, onPromptCancel) {
  var dialog = new GlideDialogWindow('glide_prompt', false);
  dialog.setTitle(title);
  dialog.setPreference('title', question);
  dialog.setPreference('onPromptComplete', onPromptComplete);
  dialog.setPreference('onPromptCancel', onPromptCancel);
  dialog.render();
}

function gsftConfirm(title, question, onPromptSave, onPromptCancel, onPromptDiscard) {
  var width, dialogClass = GlideDialogWindow;
  if (window.GlideModal) {
    dialogClass = GlideModal;
    width = 400;
  }
  var dialog = new dialogClass('glide_confirm', false, width);
  dialog.setTitle(title);
  dialog.setPreference('title', question);
  dialog.setPreference('onPromptSave', onPromptSave);
  dialog.setPreference('onPromptCancel', onPromptCancel);
  dialog.setPreference('onPromptDiscard', onPromptDiscard);
  dialog.render();
}

function tsIndexCreatorPopup(tableName) {
  var gDialog = new GlideDialogWindow("dialog_text_index_creator");
  gDialog.setSize(400, 250);
  gDialog.setPreference("table_name", tableName);
  if (tableName != "")
    gDialog.setTitle('Generate Text Index');
  else
    gDialog.setTitle('Regenerate All Text Indexes');
  gDialog.render();
}

function isTextDirectionRTL() {
  return g_text_direction == 'rtl' ? true : false;
}

function simpleRemoveOption(sourceSelect) {
  var sourceOptions = sourceSelect.options;
  var selectedIds = [];
  var index = 0;
  for (var i = 0; i < sourceSelect.length; i++) {
    option = sourceOptions[i];
    if (option.selected) {
      selectedIds[index] = i;
      index++;
    }
  }
  for (var i = selectedIds.length - 1; i > -1; i--)
    sourceSelect.remove(selectedIds[i]);
  sourceSelect.disabled = true;
  sourceSelect.disabled = false;
}

function saveAllSelected(fromSelectArray, toArray, delim, escape, emptyLabel, doEscape) {
  var translatedEmptyLabel = getMessage(emptyLabel);
  for (var i = 0; i < fromSelectArray.length; i++) {
    if (typeof fromSelectArray[i] == 'undefined') {
      toArray[i].value = '';
      continue;
    }
    var toValue = "";
    for (var j = 0; j < fromSelectArray[i].length; j++) {
      if (!(fromSelectArray[i].length == 1 && fromSelectArray[i].options[0].value == translatedEmptyLabel)) {
        var val = fromSelectArray[i].options[j].value;
        if (doEscape)
          val = encodeURIComponent(val);
        toValue += val.replace(new RegExp(delim, "g"), escape + delim);
      }
      if (j + 1 < fromSelectArray[i].length)
        toValue += delim;
    }
    toArray[i].value = toValue;
  }
}

function sortSelect(obj) {
  var maxSort = obj.getAttribute("max_sort");
  if (!maxSort || maxSort == 0)
    maxSort = 500;
  if (obj.length > maxSort && isMSIE && !isMSIE9) {
    return;
  }
  if (!sortSupported(obj)) {
    return;
  }
  if (!hasOptions(obj)) {
    return;
  }
  var o = [];
  var o2 = [];
  var o3 = [];
  for (var i = 0; i < obj.options.length; i++) {
    var newOption = new Option(obj.options[i].text, obj.options[i].value, obj.options[i].defaultSelected, obj.options[i].selected);
    copyAttributes(obj.options[i], newOption);
    if (newOption.value.indexOf('split') > 0)
      o2[o2.length] = newOption;
    else if (newOption.value && newOption.value.substr(0, 2) !== "u_" && (newOption.value.indexOf('formatter') > 0 || newOption.value.indexOf('component') > 0 ||
        newOption.value.indexOf('annotation') > 0 || newOption.value.indexOf('chart') > 0))
      o3[o3.length] = newOption;
    else
      o[o.length] = newOption;
  }
  if (o.length == 0)
    return;
  o = o.sort(
    function(a, b) {
      if ((a.text.toLowerCase() + "") < (b.text.toLowerCase() + "")) {
        return -1;
      }
      if ((a.text.toLowerCase() + "") > (b.text.toLowerCase() + "")) {
        return 1;
      }
      return 0;
    }
  );
  o3 = o3.sort(
    function(a, b) {
      if ((a.text.toLowerCase() + "") < (b.text.toLowerCase() + "")) {
        return -1;
      }
      if ((a.text.toLowerCase() + "") > (b.text.toLowerCase() + "")) {
        return 1;
      }
      return 0;
    }
  );
  for (var i = 0; i < o.length; i++) {
    var newOption = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
    copyAttributes(o[i], newOption);
    obj.options[i] = newOption;
  }
  var counter = 0;
  for (var i = o.length; i < (o.length + o2.length); i++) {
    var newOption = new Option(o2[counter].text, o2[counter].value, o2[counter].defaultSelected, o2[counter].selected);
    copyAttributes(o2[counter], newOption);
    obj.options[i] = newOption;
    counter++;
  }
  var counter = 0;
  for (var i = (o.length + o2.length); i < (o.length + o2.length + o3.length); i++) {
    var newOption = new Option(o3[counter].text, o3[counter].value, o3[counter].defaultSelected, o3[counter].selected);
    copyAttributes(o3[counter], newOption);
    obj.options[i] = newOption;
    counter++;
  }
}

function copyAttributes(from, to) {
  var attributes = from.attributes;
  for (var n = 0; n < attributes.length; n++) {
    var attr = attributes[n];
    var aname = attr.nodeName;
    var avalue = attr.nodeValue;
    to.setAttribute(aname, avalue);
  }
  if (from.style.cssText)
    to.style.cssText = from.style.cssText;
}

function hasOptions(obj) {
  if (obj != null && obj.options != null)
    return true;
  return false;
}

function sortSupported(obj) {
  if (obj == null)
    return false;
  var noSort = obj.no_sort || obj.getAttribute('no_sort');
  if (noSort) {
    return false;
  }
  return true;
};
/*! RESOURCE: /scripts/scoped_object_generators.js */
function ScopedGlideAjaxGenerator(scope) {
  var ScopedGlideAjax = function() {
    ScopedGlideAjax.prototype.initialize.apply(this, arguments);
  };
  ScopedGlideAjax.prototype = classExtendForScope({}, window.GlideAjax.prototype, {
    scope: scope,
    initialize: function(endpoint, url) {
      GlideAjax.prototype.initialize.call(this, endpoint, url);
      this.setScope(this.scope);
    },
    getXMLWait: function() {
      var err_options = {
        text: "Access to getXMLWait is not available in scoped applications.",
        type: "system",
        attributes: {
          type: "error"
        }
      };
      if (typeof GlideUI != 'undefined')
        GlideUI.get().fire(new GlideUINotification(err_options));
    },
    setScope: function(newScope) {
      if (newScope != this.scope && newScope !== "global") {
        var err_options = {
          text: "Scoped applications cannot impersonate other scopes.",
          type: "system",
          attributes: {
            type: "error"
          }
        };
        if (typeof GlideUI != 'undefined')
          GlideUI.get().fire(new GlideUINotification(err_options));
        return;
      }
      return GlideAjax.prototype.setScope.call(this, scope);
    },
    addParam: function(param, value) {
      if (param == "sysparm_scope" && value != this.scope && value != "global") {
        var err_options = {
          text: "Scoped applications cannot impersonate other scopes.",
          type: "system",
          attributes: {
            type: "error"
          }
        };
        if (typeof GlideUI != 'undefined')
          GlideUI.get().fire(new GlideUINotification(err_options));
        return;
      }
      return window.GlideAjax.prototype.addParam.call(this, param, value);
    }
  })
  return ScopedGlideAjax;
}

function ScopedGFormGenerator(scope) {
  var ScopedGForm = function() {};
  if ("undefined" == typeof g_form) {
    return ScopedGForm;
  }
  ScopedGForm.prototype = g_form;
  var scoped_g_form = new ScopedGForm();

  function inScope(fieldName) {
    try {
      if (scope == g_form.getGlideUIElement(fieldName).getScope())
        return true;
      if (g_form.getGlideUIElement(fieldName).isInherited && (scope == g_form.getScope()))
        return true;
    } catch (e) {
      jslog(e);
    }
    return false;
  }

  function _noCallbackError(displayName, fieldName) {
    var text = displayName + " for " + fieldName + " not allowed: missing callback function as parameter";
    var err_options = {
      text: text,
      type: "system",
      attributes: {
        type: "error"
      }
    }
    jslog(text);
    if (typeof GlideUI != 'undefined')
      GlideUI.get().fire(new GlideUINotification(err_options));
  }

  function _showScopeError(displayName, fieldName, value) {
    var text = displayName + " " + value + " not set on field " + fieldName + ": cross-scope access denied.";
    var err_options = {
      text: text,
      type: "system",
      attributes: {
        type: "error"
      }
    }
    opticsLog(scoped_g_form.getTableName(), fieldName, text);
    jslog(text);
    if (typeof GlideUI != 'undefined')
      GlideUI.get().fire(new GlideUINotification(err_options));
  }

  function validField(fieldName) {
    fieldName = g_form.removeCurrentPrefix(fieldName);
    return g_form.hasField(fieldName) || g_form.getPrefixHandler(fieldName);
  }
  scoped_g_form.setReadOnly = function(fieldName, disabled) {
    if (!validField(fieldName))
      return;
    if (inScope(fieldName))
      return g_form.setReadOnly(fieldName, disabled);
    _showScopeError("ReadOnly", fieldName, disabled);
  }
  scoped_g_form.setReadonly = function(fieldName, disabled) {
    if (!validField(fieldName))
      return;
    if (inScope(fieldName))
      return g_form.setReadonly(fieldName, disabled);
    _showScopeError("ReadOnly", fieldName, disabled);
  }
  scoped_g_form.setMandatory = function(fieldName, mandatory) {
    if (!validField(fieldName))
      return;
    if (inScope(fieldName))
      return g_form.setMandatory(fieldName, mandatory);
    _showScopeError("Mandatory", fieldName, mandatory);
  }
  scoped_g_form.setDisplay = function(fieldName, display) {
    if (!validField(fieldName))
      return;
    if (inScope(fieldName))
      return g_form.setDisplay(fieldName, display);
    _showScopeError("Display", fieldName, display);
  }
  scoped_g_form.setDisabled = function(fieldName, disabled) {
    if (!validField(fieldName))
      return;
    if (inScope(fieldName))
      return g_form.setDisabled(fieldName, disabled);
    _showScopeError("Disabled", fieldName, disabled);
  }
  scoped_g_form.getReference = function(fieldName, callBack) {
    if (!validField(fieldName))
      return;
    if ('function' == typeof callBack)
      return g_form.getReference(fieldName, callBack);
    _noCallbackError("getReference", fieldName, false);
  }
  return scoped_g_form;
}

function ScopedGlideDialogWindowGenerator(scope) {
  var extendFrom = window.GlideDialogWindow ? GlideDialogWindow.prototype : GlideModal.prototype;
  var ScopedGlideDialogWindow = function() {
    ScopedGlideDialogWindow.prototype.initialize.apply(this, arguments);
  };
  ScopedGlideDialogWindow.prototype = classExtendForScope({}, extendFrom, {
    scope: scope,
    initialize: function(id, readOnly, width, height) {
      extendFrom.initialize.call(this, id, readOnly, width, height);
      this.setScope(this.scope);
    }
  });
  return ScopedGlideDialogWindow;
}

function classExtendForScope(extended, defaults, options) {
  if (window.jQuery)
    return jQuery.extend(extended, defaults, options);
  var prop;
  for (prop in defaults) {
    extended[prop] = defaults[prop];
  }
  for (prop in options) {
    extended[prop] = options[prop];
  }
  return extended;
};;
/*! RESOURCE: /scripts/functions_reference.js */
function updateAndFlip(select, elementName) {
  var option = setSelectValue(select, elementName);
  onChange(elementName);
  refFlipImage(option, elementName);
}

function setSelectValue(select, elementName) {
  var value = '';
  var text = '';
  var option;
  if (select.selectedIndex != -1) {
    option = select.options[select.selectedIndex];
    value = option.value;
    text = option.text;
  }
  var id = gel(elementName);
  id.value = value;
  var idd = gel('sys_display.' + elementName);
  if (value == '')
    idd.value = '';
  else
    idd.value = text;
  return option;
}

function refFlipImage(element, elementName, useText) {
  var viewField = gel("view." + elementName);
  if (!viewField)
    return;
  var viewRField = gel("viewr." + elementName);
  var viewHideField = gel("view." + elementName + ".no");
  var refid = gel(elementName);
  var value = element.value;
  if (!value) {
    hideObject(viewField);
    hideObject(viewRField);
    showObjectInline(viewHideField);
  } else {
    if (isDoctype()) {
      showObjectInlineBlock(viewField);
      showObjectInlineBlock(viewRField);
    } else {
      showObjectInline(viewField);
      showObjectInline(viewRField);
    }
    hideObject(viewHideField);
  }
}

function refFlipImageDisplay(element, dsp) {
  if (element)
    element.style.display = dsp;
};
/*! RESOURCE: /scripts/functions_onchange.js */
function onChange(elementName) {
  var eChanged,
    eOriginal,
    eDisplay,
    isMappingField = ifFieldHasElementMappingPrefix(elementName);
  if (isMappingField) {
    elementName = removeMappingPrefix(elementName);
    eChanged = gel(elementName);
    eOriginal = gel("sys_mapping.original." + elementName);
    eDisplay = gel("sys_mapping." + elementName);
  } else {
    eChanged = gel(elementName);
    eOriginal = gel("sys_original." + elementName);
    eDisplay = gel("sys_display." + elementName);
    if (eOriginal == null) {
      return;
    }
  }
  var vOriginal = eOriginal.value;
  var vChanged = eChanged.value;
  var vDisplay = eDisplay ? eDisplay.value : null;
  if (isMappingField && !isFilterField(eChanged))
    eChanged.changed = (vDisplay != vOriginal);
  else
    eChanged.changed = (vOriginal != vChanged);
  if (!elementName.startsWith("IO:") && !elementName.startsWith("ni.VE")) {
    onChangeLabelProcess(elementName);
  }
  setMandatoryExplained();
  if (hasDepends != null && hasDepends(elementName))
    onSelChange(elementName);
  clientScriptOnChange(elementName, eChanged, vOriginal, vChanged);
  fieldChanged(elementName, eChanged.changed);
  var onChangeData = {
    id: elementName,
    value: vChanged,
    modified: eChanged.changed
  };
  if (vDisplay)
    onChangeData.displayValue = vDisplay;
  var parentForm = $(elementName).up('form');
  parentForm && parentForm.fire('glideform:onchange', onChangeData);
}

function isFilterField(element) {
  if (element && element.nextSibling)
    return element.nextSibling.getAttribute('gsft_template');
  return false;
}

function ifFieldHasElementMappingPrefix(fieldName) {
  if (fieldName === undefined) {
    return false;
  }
  return fieldName.indexOf('sys_mapping.') !== -1;
}

function removeMappingPrefix(fieldName) {
  return fieldName.replace("sys_mapping.", "");
}

function onChangeLabelProcess(elementName, value) {
  var el = gel(elementName);
  var statusNode = gel('status.' + elementName);
  onChangeLabelProcessByEl(el, statusNode, value);
}

function onChangeLabelProcessByEl(elementNode, statusLabel, value) {
  if (!elementNode || !statusLabel)
    return;
  var mandatory = elementNode.getAttribute("mandatory") + "";
  var readonly = elementNode.disabled || hasClassName(elementNode, 'disabled');
  if (mandatory == null || mandatory == "null")
    mandatory = statusLabel.getAttribute("mandatory") + "";
  else
    statusLabel.setAttribute("mandatory", mandatory);
  var newClassName = statusLabel.getAttribute("oclass");
  var newFieldClassName = "";
  var newTitle = statusLabel.getAttribute("title");
  if (value == undefined)
    value = elementNode.value;
  if (mandatory == "true") {
    var currencySuffix = ";0.00";
    if (typeof value != 'undefined' && (value == "" || value.indexOf(currencySuffix, value.length - currencySuffix.length) != -1)) {
      newClassName = "mandatory";
      newFieldClassName = "is-required";
      newTitle = getMessage("Mandatory - must be populated before Submit");
    } else if (elementNode.changed) {
      newClassName = "changed";
      newFieldClassName = "is-filled";
      newTitle = getMessage("Field value has changed since last update");
    } else if (!readonly) {
      newClassName = "mandatory_populated";
      newFieldClassName = "is-prefilled";
      newTitle = getMessage("Mandatory - preloaded with saved data");
    } else {
      newClassName = "read_only";
      newTitle = getMessage("Read only - cannot be modified");
    }
  } else {
    if (elementNode.changed) {
      newClassName = "changed";
      newTitle = getMessage("Field value has changed since last update");
    } else if (readonly) {
      newClassName = "read_only";
      if (newTitle == "" || newTitle == null)
        newTitle = "Read only - cannot be modified";
    } else if (newClassName != "read_only" && newClassName != "changed") {
      newClassName = "";
      newTitle = "";
    }
  }
  var slm = gel("section508." + elementNode.id);
  if (slm) {
    slm.setAttribute("title", statusLabel.getAttribute("title"));
    slm.setAttribute("alt", statusLabel.getAttribute("title"));
  }
  newClassName += ' label_description';
  if (statusLabel.className == newClassName)
    return;
  var parentElement = gel("element." + elementNode.id);
  if (statusLabel.className.indexOf("required-marker") > -1)
    var previousMandatory = true;
  statusLabel.className = newClassName;
  if (previousMandatory && statusLabel.className.indexOf("required-marker") == -1 && parentElement && parentElement.className.indexOf("is-required") > -1)
    gel("element." + elementNode.id).className = parentElement.className.replace("is-required", "");
  statusLabel.setAttribute("title", newTitle);
  if (document.documentElement.getAttribute('data-doctype') == 'true') {
    if (mandatory == 'true') {
      statusLabel.className = "required-marker label_description";
    }
    if (newFieldClassName) {
      var formGroup = elementNode.up('.form-group');
      formGroup.removeClassName('is-prefilled');
      formGroup.removeClassName('is-required');
      formGroup.removeClassName('is-filled');
      formGroup.addClassName(newFieldClassName);
    }
    statusLabel.setAttribute('aria-label', newTitle);
  }
  CustomEvent.fire("mandatory.changed", elementNode.id, newClassName);
}

function clientScriptOnChange(elementName, eChanged, vOriginal, vChanged) {
  var splitMe = elementName.split('.');
  var tableName = splitMe[0];
  var fieldName = splitMe.slice(1).join('.');
  callChangeHandlers(tableName, fieldName, eChanged, vOriginal, vChanged);
}

function callChangeHandlers(tableName, fieldName, eChanged, vOriginal, vChanged) {
  var widgetName = tableName + "." + fieldName;
  if (typeof(g_form) != "undefined")
    g_form.hideFieldMsg(fieldName, true);
  template = false;
  if (eChanged.templateValue == 'true')
    template = true;
  eChanged.templateValue = 'false';
  for (var i = 0; i < g_event_handlers.length; i++) {
    var handler = g_event_handlers[i];
    if (handler.fieldName != widgetName && handler.fieldName != fieldName)
      continue;
    callChangeHandler(handler, this, eChanged, vOriginal, vChanged, false, template);
  }
  CustomEvent.fire("change.handlers.run", tableName, fieldName);
}

function fireAllChangeHandlers() {
  for (var x = 0; x < g_event_handlers.length; x++) {
    var handler = g_event_handlers[x];
    var elementName = handler.fieldName;
    var theWidget = gel(elementName);
    if (!theWidget)
      continue;
    var original = gel("sys_original." + elementName);
    var oldVal = 'unknown';
    if (original)
      oldVal = original.value;
    var newVal;
    if ($(theWidget).getAttribute("type") == "radio") {
      newVal = oldVal;
      var elems = $$('#' + $(theWidget).getAttribute("id")).each(function(el) {
        var checkedValue = el.getAttribute("checked");
        if (checkedValue != null && checkedValue.length > 0)
          newVal = el.value;
      });
    } else
      newVal = theWidget.value;
    callChangeHandler(handler, this, theWidget, oldVal, newVal, true, false);
  }
  CustomEvent.fire("change.handlers.run.all");
}

function callChangeHandler(handler, control, theWidget, oldVal, newVal, loading, template) {
  try {
    callChangeHandler0(handler, control, theWidget, oldVal, newVal, loading, template);
  } catch (ex) {
    if (g_user.hasRole('client_script_admin')) {
      g_form.showFieldMsg(theWidget, "onChange script error: " + ex.toString() + "\n" +
        handler.handler.toString(), "error", false);
    } else {
      g_form.showFieldMsg(theWidget,
        "Script error encountered when changing this field - please contact your System Administrator",
        "error", false);
    }
    CustomEvent.fire('glideform:script_error', "onChange script error: " + ex.toString() + "\n" + handler.handler.toString());
  }
}

function callChangeHandler0(handler, control, theWidget, oldVal, newVal, loading, template) {
  CustomEvent.fire('glide_optics_inspect_put_cs_context', handler.handlerName, 'change');
  var startTimer = new Date();
  handler.handler.call(control, theWidget, oldVal, newVal, loading, template);
  var n = g_event_handlers_onChange[handler.handlerName];
  if (n)
    CustomEvent.fire('page_timing', {
      name: 'CSOC',
      child: {
        description: n,
        sys_id: g_event_handler_ids[handler.handlerName],
        source_table: 'sys_script_client'
      },
      startTime: startTimer,
      win: window
    });
  CustomEvent.fire('glide_optics_inspect_pop_cs_context', handler.handlerName, 'change');
}

function multiKeyDown(me) {
  if ($(me.id).getAttribute("isquestionhtml") == "true")
    return;
  var eOriginal = 'g_' + me.id.replace(/\./g, '_');
  var eOriginalSet = eval("typeof " + eOriginal + " != 'undefined'");
  if (eOriginalSet)
    return;
  var oValue = escape(me.value);
  eval(eOriginal + '="' + oValue + '";');
  var form = findParentByTag(me, "form");
  if (me.id && form) {
    var elementName = me.id;
    if (gel("sys_original." + elementName)) {
      gel("sys_original." + elementName).value = "XXmultiChangeXX"
    } else {
      addInput(form, 'hidden', "sys_original." + elementName, "XXmultiChangeXX");
    }
  }
}

function multiModified(me, type, currentValue) {
  if ($(me.id).getAttribute("isquestionhtml") == "true") {
    $(me.id).onchange();
    return;
  }
  multiKeyDown(me);
  var form = findParentByTag(me, "form");
  var changeFlag = true;
  if (me.id && form) {
    var elementName = me.id;
    var vOriginal = unescape(eval('g_' + me.id.replace(/\./g, '_')));
    if (currentValue == undefined)
      currentValue = me.value;
    if (type == undefined)
      type = 'htmlarea';
    if (currentValue == vOriginal)
      changeFlag = false;
    me.changed = changeFlag;
    onChangeLabelProcess(elementName, currentValue);
    if (type == 'tinymce') {
      clientScriptOnChange(elementName, me, 'unknown', currentValue);
    } else {
      if ((typeof me.isFocused) == "boolean")
        if (me.isFocused == false)
          clientScriptOnChange(elementName, me, 'unknown', currentValue);
    }
  }
  fieldChanged(elementName, changeFlag);
  var onChangeData = {
    id: me.id,
    value: me.value,
    modified: me.changed
  };
  $(me.up('form')).fire('glideform:onchange', onChangeData);
}

function formChangeKeepAlive() {
  var AJAX_KEEPALIVE_TIMEOUT = 900;
  var nowsecs = parseInt((new Date()).getTime() / 1000);
  var secs = parseInt(lastActivity.getTime() / 1000);
  var difference = nowsecs - secs;
  if (difference > AJAX_KEEPALIVE_TIMEOUT) {
    var aj = new GlideAjax("GlideSystemAjax");
    aj.addParam("sysparm_name", "isLoggedIn");
    aj.getXML(doNothing);
    lastActivity = new Date();
  }
}

function fieldChanged(elementName, changeFlag) {
  formChangeKeepAlive();
  if (typeof(g_form) != "undefined")
    g_form.fieldChanged(elementName, changeFlag);
}

function addOnChangeEvent(fields, tableName, callfunc) {
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    if (typeof field == "string") {
      if (tableName)
        field = tableName + "." + field;
      field = gel(field);
    }
    if (field && field.tagName)
      Event.observe(field, 'change', callfunc);
  }
}

function setColorSwatch(fieldName) {
  var colorValue = $(fieldName).value;
  var colorDisplay = $("color_swatch." + fieldName);
  try {
    colorDisplay.style.backgroundColor = colorValue;
  } catch (ex) {
    g_form.showErrorBox(fieldName, getMessage("Invalid color") + ":" + colorValue);
    $(fieldName).value = "";
    colorDisplay.style.backgroundColor = "";
  }
};
/*! RESOURCE: /scripts/functions_fontsizer.js */
function setPreferredFontSize(increment) {
  var ruleStart = "BODY, TABLE, INPUT, SELECT, BUTTON, INPUT.TEXT, TEXTAREA, INPUT.button {font-size: "
  var ruleEnd = "}";
  var t = g_fontSize;
  if (g_fontSizePreference)
    t = g_fontSizePreference;
  var t = t.split('p')[0];
  t = parseInt(t) + increment;
  if (6 > t || t > 18)
    return;
  t += "pt";
  if (g_fontSizePreference != t) {
    g_fontSizePreference = t;
    setPreference('font-size', g_fontSizePreference);
    var al = getFontWindowList();
    for (var i = 0; i != al.length; i++) {
      var w = al[i];
      if (typeof w.deleteStyleSheet == 'function') {
        w.deleteStyleSheet("font_size");
        w.createStyleSheet(ruleStart + t + ruleEnd, "font_size");
      }
    }
  }
  deleteStyleSheet("font_size");
  createStyleSheet(ruleStart + t + ruleEnd, "font_size");
  if (increment) {
    var e = $("font_pref_text");
    if (e)
      e.innerHTML = "(" + g_fontSizePreference + ")";
  }
  CustomEvent.fireAll("fontsize.change");
}

function getFontWindowList() {
  var answer = new Array();
  var m = getMainWindow();
  if (m)
    answer.push(m);
  var m = getMainFormWindow();
  if (m)
    answer.push(m);
  var m = getNavWindow();
  if (m)
    answer.push(m);
  return answer;
}

function deleteStyleSheet(id) {
  var sheet = document.getElementById(id);
  if (sheet) {
    var head = document.getElementsByTagName("head")[0];
    head.removeChild(sheet);
  }
}

function createStyleSheet(cssText, id) {
  var head = document.getElementsByTagName("head")[0];
  var rules = document.createElement("style");
  rules.setAttribute("type", "text/css");
  if (id)
    rules.setAttribute("id", id);
  if (navigator.userAgent.toLowerCase().indexOf("msie") >= 0) {
    head.appendChild(rules);
    var ss = rules.styleSheet;
    ss.cssText = cssText;
  } else {
    try {
      rules.appendChild(document.createTextNode(cssText));
    } catch (e) {
      rules.cssText = cssText;
    }
    head.appendChild(rules);
  }
}

function setPreferredFont() {
  var t = getPreference('font-size');
  if (!t)
    return;
  g_fontSizePreference = t;
  setPreferredFontSize(0);
};
/*! RESOURCE: /scripts/functions_attachments.js */
function addAttachmentNameToForm(sysid, name, hoverText, image, showRename, showView, showPopup) {
  var modified = $("attachments_modified");
  if (modified)
    modified.value = "true";
  showObjectInline($("header_attachment_list_label"));
  var line = $("header_attachment_line");
  if (line)
    line.setStyle({
      visibility: 'visible',
      display: ''
    });
  var span = $(cel('span'));
  span.id = "attachment_" + sysid;
  span.style.marginRight = "10px";
  span.innerHTML = '<a href="sys_attachment.do?sys_id=' + sysid + '" title="' + hoverText + '" style="margin-right:4px;"><img src="' + image + '" alt="" /></a>';
  var txt = $(cel('a'));
  if ('innerText' in txt)
    txt.innerText = name;
  else
    txt.textContent = name;
  txt.href = '#';
  txt.onkeydown = function(event) {
    return allowInPlaceEditModification(txt, event);
  };
  txt.href = 'sys_attachment.do?sys_id=' + sysid;
  txt.setAttribute('data-id', sysid);
  txt.style.display = 'inline';
  txt.inPlaceEdit({
    selectOnStart: true,
    turnClickEditingOff: true,
    onAfterEdit: function(newName) {
      var oldName = this.oldValue;
      var ga = new GlideAjax('AttachmentAjax');
      ga.addParam('sysparm_type', 'initialRename');
      ga.addParam('sysparm_value', sysid);
      ga.addParam('sysparm_name', newName);
      ga.getXML(function(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");
        if (answer !== '0')
          alert(new GwtMessage().getMessage("Renaming attachment {0} to new name {1} is not allowed", oldName, newName));
        $$('a[data-id="' + sysid + '"]').each(function(elem) {
          if ('innerText' in elem)
            elem.innerText = (answer === '0') ? newName : oldName;
          else
            elem.textContent = (answer === '0') ? newName : oldName;
        });
      });
    }
  });
  txt.style.marginRight = "5px";
  span.appendChild(txt);
  if (showRename == 'true') {
    var renameAttachment = $(cel('a'));
    renameAttachment.className = 'attachment';
    renameAttachment.onclick = function() {
      txt.beginEdit();
    };
    renameAttachment.innerHTML = getMessage('[rename]');
    span.appendChild(renameAttachment);
  }
  if (showView == "true") {
    var blank = document.createTextNode(" ");
    span.appendChild(blank);
    var view = cel("a");
    var newText = document.createTextNode(getMessage('[view]'));
    view.appendChild(newText);
    view.className = "attachment";
    if (showPopup == "false")
      view.href = "sys_attachment.do?sys_id=" + sysid + "&view=true";
    else
      view.onclick = function() {
        tearOffAttachment(sysid)
      };
    span.appendChild(view);
    span.appendChild(blank);
  }
  var storage = cel('li');
  storage.className = 'attachment_list_items';
  storage.appendChild(span);
  var attachList = $("header_attachment_list");
  if (attachList)
    attachList.appendChild(storage);
  var header_attachment = $('header_attachment');
  if (header_attachment) {
    _frameChanged();
  }
  var ga = new GlideAjax('AttachmentAjax');
  ga.addParam('sysparm_type', 'attachmentParentSysId');
  ga.addParam('sysparm_value', sysid);
  ga.getXMLAnswer(changeCount, null, 'increase');
  addEllipsesToAttachments();
}

function addEllipsesToAttachments() {
  var list = document.getElementById('header_attachment_list');
  if (!list)
    return;
  var more = document.getElementById('more_attachments');
  if (list.scrollHeight > list.clientHeight * 2)
    setElementStyle(more, 'display:block');
  else
    setElementStyle(more, 'display:none');
}

function setElementStyle(elm, rules) {
  window.requestAnimationFrame(function() {
    elm.style.cssText = rules;
  });
}

function addAttachmentNameToDialog(id, fileName, canDelete, createdBy, createdOn, contentType, iconPath) {
  if ($('attachment') == null)
    return;
  var encryptCheck = gel("encrypt_checkbox");
  if (encryptCheck) {
    encryptCheck.checked = false;
    $('sysparm_encryption_context').value = "";
  }
  gel("please_wait").style.display = "none";
  if (typeof id == "undefined")
    return;
  var noAttachments = gel("no_attachments");
  if (noAttachments.style.display == "block")
    noAttachments.style.display = "none";
  var table = gel("attachment_table_body");
  var tr = cel("tr");
  var td = cel("td");
  td.style.whiteSpace = "nowrap";
  td.colspan = "2";
  if (canDelete) {
    var input = cel("input");
    var checkId = "sys_id_" + id;
    input.name = checkId;
    input.id = checkId;
    input.type = "checkbox";
    input.onclick = function() {
      setRemoveButton(gel(checkId));
    };
    td.appendChild(input);
    gel("delete_button_span").style.display = "inline";
    var text = document.createTextNode(" ");
    td.appendChild(text);
    input = cel("input");
    input.type = "hidden";
    input.name = "Name";
    input.value = "false";
    td.appendChild(input);
  }
  var anchor = cel("a");
  anchor.style.marginRight = "4px";
  anchor.href = "sys_attachment.do?sys_id=" + id;
  anchor.title = " " + createdBy + "  " + createdOn;
  var imgSrc = iconPath;
  var img = cel("img");
  img.src = imgSrc;
  img.alt = anchor.title;
  anchor.appendChild(img);
  var text = $(cel('a'));
  text.style.display = "inline";
  text.href = '#';
  text.href = "sys_attachment.do?sys_id=" + id;
  text.onkeydown = function(event) {
    return allowInPlaceEditModification(text, event);
  };
  text.style.marginRight = "5px";
  text.style.maxWidth = "75%";
  text.style.display = "inline-block";
  text.style.overflow = "hidden";
  text.style.verticalAlign = "middle";
  if ('innerText' in text)
    text.innerText = fileName;
  else
    text.textContent = fileName;
  text.setAttribute("data-id", id);
  text.inPlaceEdit({
    selectOnStart: true,
    turnClickEditingOff: true,
    onAfterEdit: function(newName) {
      var ga = new GlideAjax('AttachmentAjax');
      ga.addParam('sysparm_type', 'rename');
      ga.addParam('sysparm_value', id);
      ga.addParam('sysparm_name', newName);
      ga.getXML();
      $$('a[data-id="' + id + '"]').each(function(elem) {
        if ('innerText' in elem)
          elem.innerText = newName;
        else
          elem.textContent = newName;
      });
      $$('span[data-id="' + id + '"]').each(function(el) {
        if ('innerText' in el)
          el.innerText = newName;
        else
          el.textContent = newName;
      });
    }
  });
  if (contentType == "text/html")
    anchor.target = "_blank";
  td.appendChild(anchor);
  td.appendChild(text);
  if ($('ni.show_rename_link').value) {
    var renameAttachment = $(cel('a'));
    renameAttachment.className = 'attachment';
    renameAttachment.onclick = function() {
      text.beginEdit();
    };
    renameAttachment.innerHTML = getMessage('[rename]');
    td.appendChild(renameAttachment);
  }
  var showView = gel("ni.show_attachment_view").value;
  if (showView == "true") {
    var blank = document.createTextNode(" ");
    tr.appendChild(blank);
    var view = cel("a");
    var newText = document.createTextNode(getMessage("[view]"));
    view.appendChild(newText);
    view.className = "attachment";
    if (showPopup == "false")
      view.href = "sys_attachment.do?sys_id=" + id + "&view=true";
    else
      view.onclick = function() {
        tearOffAttachment(id)
      };
    td.appendChild(blank);
    td.appendChild(view);
  }
  var showPopup = gel("ni.show_attachment_popup").value;
  tr.appendChild(td);
  table.appendChild(tr);
  var alert508 = "$[GlideAccessibility.isEnabled()]";
  if (alert508 == 'true')
    alert(fileName + " " + anchor.title);
}

function computeAttachmentWidth() {
  var temp = $('header_attachment_list').select('li');
  var totalWidth = 0;
  for (var i = 0; i < temp.length; i++) {
    totalWidth += temp[i].getWidth();
  }
  return totalWidth;
}

function updateAttachmentCount(sysid) {
  var ga = new GlideAjax('AttachmentAjax');
  ga.addParam('sysparm_type', 'attachmentCount');
  ga.addParam('sysparm_value', sysid);
  ga.getXMLAnswer(numberOfAttachments, null, sysid);
}

function numberOfAttachments(answer, sysid) {
  var number = parseInt(answer);
  var buttons = $$('.attachmentNumber_' + sysid);
  if (buttons[0] == undefined)
    $('header_attachment_list_label').down().innerHTML = number;
  else {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].innerHTML = number;
    }
  }
}

function getCurrentAttachmentNumber(sysid) {
  if ($$('.attachmentNumber_' + sysid)[0] == undefined) {
    if ($('header_attachment_list_label') == undefined)
      return undefined;
    else
      return $('header_attachment_list_label').down().innerHTML;
  }
  return $$('.attachmentNumber_' + sysid)[0].innerHTML;
}

function updateAttachmentCount2(number, sysid) {
  var buttons = $$('.attachmentNumber_' + sysid);
  if (buttons[0] == undefined)
    $('header_attachment_list_label').down().innerHTML = number;
  else {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].innerHTML = number;
    }
  }
}

function changeCount(sysid, type) {
  var number = getCurrentAttachmentNumber(sysid);
  if (number != undefined) {
    if (type == 'increase')
      number++;
    else
      number--;
    updateAttachmentCount2(number, sysid);
  }
}

function deleteAttachment(sysid) {
  var gr = new GlideRecord('sys_attachment');
  var parentRecord = recordAttachmentBelongsTo(sysid);
  gr.addQuery('sys_id', sysid);
  gr.query();
  if (gr.next()) {
    if (confirmDeletion(gr.file_name, sysid)) {
      var ol = GlideOverlay.get('attachment_manager_overlay');
      alert(ol._box.select('div[data-id="' + sysid + '"]')[0].up().up().inspect());
      ol._box.select('div[data-id="' + sysid + '"]')[0].up().up().remove();
      ol.autoDimension();
      $("attachment_" + sysid).remove();
      if (numberOfAttachments(gr.table_sys_id) == 1) {
        hideObject($("header_attachment_list_label"));
        var line = $("header_attachment_line");
        if (line) {
          line.setStyle({
            visibility: "hidden",
            display: "none"
          });
        }
        $("header_attachment").style.height = "auto";
        ol.close();
      }
      gr.deleteRecord();
      updateAttachmentCount(parentRecord);
    }
  }
}

function saveAttachment(tableName, sys_id, allowAttachment) {
  var g_dialog = new GlideModal('attachment', false, 500);
  g_dialog.setTitle(getMessage('Attachments'));
  g_dialog.setPreference('target_table', tableName);
  g_dialog.setPreference('target_sys_id', sys_id);
  if (allowAttachment)
    g_dialog.setPreference('sc_override', 'true');
  g_dialog.setPreference('attachment_disabled',
    (window["AttachmentUploader"] ? AttachmentUploader.isAttachmentDisabled() : "false"));
  g_dialog.on("closeconfirm", _saveAttachmentConfirm);
  g_dialog.render();
}

function _saveAttachmentConfirm(dialog) {
  var attachmentRows = $$('.attachmentRow');
  var value = '';
  for (var i = 0; i < attachmentRows.length; i++) {
    if (isMSIE) {
      var files = attachmentRows[i].select('input')[0].getValue();
      if (!files.empty())
        value += files + "\n";
    } else {
      var files = attachmentRows[i].select('input')[0].files;
      for (var j = 0; j < files.length; j++) {
        if (files[j] != null) {
          value += files[j].name + "\n";
        }
      }
    }
  }
  if (!value.empty())
    if (!confirm(getMessage("Close before uploading attachments?") + "\n" + value.substring(0, value.length - 1)))
      return false;
  _saveAttachmentClose();
  return true;
}

function _saveAttachmentClose() {
  var modified = $("attachments_modified");
  if (modified) {
    var attachmentsModified = modified.value;
    if (attachmentsModified != "true")
      return;
  }
  if (typeof g_form == "undefined")
    return;
  if (g_form.newRecord)
    g_form.modified = true;
  if (typeof GlideLists2 == "undefined")
    return;
  for (var id in GlideLists2) {
    var list = GlideLists2[id];
    if (list.getTableName() === 'sys_attachment')
      list.refresh();
  }
}

function allowInPlaceEditModification(elem, event) {
  var length = (elem.textContent != null) ? elem.textContent.length : elem.innerText.length;
  var max_length = maximumCharacterLimit();
  if (length >= max_length) {
    var keyCode = (event) ? event.keyCode : window.event.keyCode;
    console.log(keyCode);
    switch (keyCode) {
      case Event.KEY_LEFT:
      case Event.KEY_RIGHT:
      case Event.KEY_UP:
      case Event.KEY_DOWN:
      case Event.KEY_BACKSPACE:
      case Event.KEY_DELETE:
        return true;
      default:
        alert("Filename has reached the character limit of " + max_length + ".");
        return false;
    }
  }
  return true;
}

function maximumCharacterLimit() {
  var f = $('header_attachment_list');
  if (f)
    return f.getAttribute('data-max-filename-length');
  return 100;
}

function confirmDeletion(file_name, sysid) {
  var r = confirm("Are you sure you want to delete " +
    file_name +
    "?");
  return r;
};
/*! RESOURCE: /scripts/functions_calendar.js */
function nextCalendarAction(duration, year, month, day, calendarID, styleField, event) {
  var form = document.getElementsByName('dash_form')[0];
  if (form) {
    var name = form.dashboard_name.value;
    var url = "sys_dashboard_template.do?";
    url += "sysparm_query=name=" + name;
    url += "&sysparm_calview=" + duration;
    url += "&sysparm_year=" + year;
    url += "&sysparm_month=" + month;
    url += "&sysparm_day=" + day;
    var viewwidget = form['sysparm_view'];
    if (viewwidget)
      url += '&sysparm_view=' + viewwidget.value;
    window.location = url;
  } else {
    form = document.getElementsByName('calendarform')[0];
    if (form == null) {
      if (typeof $j != "undefined" && calendarID != null && calendarID.length) {
        var element = event.srcElement;
        if (!element)
          element = event.target;
        var content = $j(element).closest(".report_content");
        if (content.length) {
          var cstyle = null;
          media = document.getElementsByName('sysparm_calstyle_choice');
          if (media != null) {
            for (var i = 0; i < media.length; i++) {
              var r = media[i];
              if (r.checked) {
                cstyle = r.value;
                break;
              }
            }
          }
          if (!cstyle) {
            media = $("sysparm_calstyle" + calendarID);
            if (media != null)
              cstyle = media.value;
          }
          var params = "sysparm_calview=" + duration;
          params += "&sysparm_year=" + year;
          params += "&sysparm_month=" + month;
          params += "&sysparm_day=" + day;
          params += "&sysparm_calstyle=" + cstyle;
          drillReport(content.parent(), calendarID, "", params);
          return;
        }
      }
      form = document.getElementsByName('reportform_control')[0];
    }
    if (form == null) {
      form = document.getElementsByName('history')[0];
      if (form != null) {
        addInput(form, 'HIDDEN', 'sysparm_stack', "no");
      }
    }
    if (form != null) {
      addInput(form, 'HIDDEN', 'sysparm_calview', duration);
      addInput(form, 'HIDDEN', 'sysparm_year', year);
      addInput(form, 'HIDDEN', 'sysparm_month', month);
      addInput(form, 'HIDDEN', 'sysparm_day', day);
      var media = $('sysparm_media');
      if (media != null) {
        addInput(form, 'HIDDEN', 'sysparm_media', media.value);
      }
      media = $('sysparm_view');
      if (media != null) {
        addInput(form, 'HIDDEN', 'sysparm_view', media.value);
      }
      media = document.getElementsByName('sysparm_calstyle_choice');
      if (media != null) {
        for (var i = 0; i < media.length; i++) {
          var r = media[i];
          if (r.checked) {
            addInput(form, 'HIDDEN', 'sysparm_calstyle', r.value);
            break;
          }
        }
      }
      media = $('sysparm_calstyle');
      if (media != null) {
        addInput(form, 'HIDDEN', 'sysparm_calstyle', media.value);
      }
      if (typeof form.onsubmit == "function")
        form.onsubmit();
      form.submit();
    } else {
      var url = "calendar_view.do?";
      url += "sysparm_calview=" + duration;
      url += "&sysparm_year=" + year;
      url += "&sysparm_month=" + month;
      url += "&sysparm_day=" + day;
      if (styleField)
        url += "&sysparm_calstyle=" + styleField;
      window.location = url;
    }
  }
};
/*! RESOURCE: /scripts/functions_email.js */
function sendEmail() {
  var form = document.forms['emailclient'];
  addInput(form, 'HIDDEN', 'EMAIL-CLIENT', 'send');
  if (typeof form.onsubmit == "function") {
    form.onsubmit();
  }
  form.submit();
}

function mailTo(field) {
  var nameField = $(field);
  if (nameField && nameField.value) {
    window.top.location = "mailto:" + nameField.value;
  }
}

function setCannedText(selectBox, isPlainText) {
  var theOption = selectBox.options[selectBox.selectedIndex];
  var messageText = theOption.value;
  var body = $('message.text');
  if (tiny_html_editor && typeof tinymce != "undefined") {
    if (isPlainText) {
      tinymce.EditorManager.activeEditor.setContent("");
      tinymce.EditorManager.activeEditor.plugins.paste.clipboard.pasteText(messageText)
    } else
      tinymce.EditorManager.activeEditor.setContent(messageText);
  } else {
    body.value = messageText;
    if (body.htmlArea)
      body.htmlArea._doc.body.innerHTML = messageText;
  }
}

function isEmailValid(value) {
  var problemMsg = isEmailValidWithReason(value);
  if (problemMsg != "") {
    jslog("isEmailValid: " + problemMsg);
    return false;
  }
  return true;
}

function isEmailValidWithReason(value) {
  var localPartChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%*/?|^{}`~&'+-=_.";
  var domainChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.";
  if (value.indexOf("@") == -1)
    return "missing @ sign";
  var s = value.split("@");
  if (s.length != 2)
    return "too many at signs";
  if (!containsOnlyChars(localPartChars, s[0]))
    return "invalid character before the at sign";
  if (s[0].length < 1)
    return "at least one character must be before the at sign";
  if (s[0].substr(0, 1) == ".")
    return "period cannot be the first character";
  if (s[0].substr(s[0].length - 1, 1) == ".")
    return "period cannot be the last character before the at sign";
  if (!containsOnlyChars(domainChars, s[1]))
    return "invalid character after the at sign";
  var periodIndex = s[1].indexOf(".");
  if (periodIndex == -1)
    return "missing period after the at sign";
  if (periodIndex == 0)
    return "period cannot be the first character after the at sign";
  var periods = s[1].split(".");
  var lastPeriod = periods[periods.length - 1];
  if (lastPeriod.length < 1)
    return "must be at least 1 character after the last period";
  if (!isAlphaNum(s[1].substr(0, 1)))
    return "the first character after the at sign must be alphanumeric";
  if (!isAlphaNum(s[1].substr(s[1].length - 1, 1)))
    return "the last character must be alphanumeric";
  return "";
};
/*! RESOURCE: /scripts/functions_user_image.js */
function saveUserImage(tableName, gotourl) {
  var form = document.forms[tableName + '.do'];
  var viewwidget = form['sysparm_view'];
  if (viewwidget)
    gotourl += '&sysparm_view=' + viewwidget.value;
  form.sys_action.value = 'sysverb_check_save';
  addInput(form, 'HIDDEN', 'sysparm_goto_url', gotourl);
  var okToSubmit = true;
  if (typeof form.onsubmit == "function")
    okToSubmit = form.onsubmit();
  if (okToSubmit)
    form.submit();
  return false;
}

function validateVideoFileName(fileExtensions) {
  var fileName = getAttachedFileName();
  var isvalid = validateWithExtensions(fileName, fileExtensions);
  if (!isvalid) {
    alert(fileName + " isn't a recognized video format");
  }
  return isvalid;
}

function validateAudioFileName(fileExtensions) {
  var fileName = getAttachedFileName();
  var isvalid = validateWithExtensions(fileName, fileExtensions);
  if (!isvalid) {
    alert(fileName + " isn't a recognized audio format");
  }
  return isvalid;
}

function getAttachedFileName() {
  var widget = $("attachFile");
  if (!widget)
    return false;
  return widget.value;
}

function validateWithExtensions(fileName, fileExtensions) {
  var action = $('sys_action');
  if ('sysverb_cancel' == action.value)
    return true;
  return endsWithVideoExtension(fileName, fileExtensions);
}

function endsWithVideoExtension(fileName, fileExtensions) {
  var extensionArray = fileExtensions.split(",");
  var dot = fileName.lastIndexOf('.') + 1;
  var suffix = fileName.substring(dot);
  suffix = suffix.toLowerCase();
  for (var i = 0; i < extensionArray.length; i++) {
    var element = extensionArray[i];
    if (element == suffix)
      return true;
  }
  return false;
}

function validateImageFileName() {
  var action = $('sys_action');
  if ('sysverb_cancel' == action.value)
    return true;
  var widget = $("attachFile");
  if (!widget)
    return false;
  var filename = widget.value;
  var isvalid = endsWithImageExtension(filename);
  if (!isvalid) {
    alert(filename + " isn't a recognized image file format");
  }
  return isvalid;
}
var VALID_IMAGE_SUFFIX = ["jpg", "jpeg", "png", "bmp", "gif", "ico", "svg"];

function endsWithImageExtension(filename) {
  var dot = filename.lastIndexOf('.') + 1;
  var suffix = filename.substring(dot);
  suffix = suffix.toLowerCase();
  for (var i = 0; i < VALID_IMAGE_SUFFIX.length; i++) {
    var element = VALID_IMAGE_SUFFIX[i];
    element = element.toLowerCase();
    if (element == suffix)
      return true;
  }
  return false;
}

function deleteUserImage(image_id, replacement) {
  var ajax = new GlideAjax("AttachmentAjax");
  ajax.addParam("sysparm_value", image_id);
  ajax.addParam("sysparm_type", "delete");
  ajax.getXML(doNothing);
  var image = $(image_id);
  if (image) {
    image.src = "images/s.gif";
    image.alt = "";
  }
  var delspan = $(image_id + "_delete");
  if (delspan)
    delspan.innerHTML = '';
  var addanchor = $(image_id + "_update");
  if (addanchor)
    addanchor.innerHTML = "";
  var imagespan = $(image_id + "_image");
  if (imagespan)
    imagespan.style.visibiity = "hidden";
  var noimagespan = $(image_id + "_noimage");
  if (noimagespan)
    noimagespan.style.visibility = "";
  return false;
};
/*! RESOURCE: /scripts/formatting.js */
function formatPhone(field) {
  field.value = trim(field.value);
  var ov = field.value;
  var v = "";
  var x = -1;
  if (0 < ov.length && '+' != ov.charAt(0)) {
    var n = 0;
    if ('1' == ov.charAt(0)) {
      ov = ov.substring(1, ov.length);
    }
    for (i = 0; i < ov.length; i++) {
      var ch = ov.charAt(i);
      if (ch >= '0' && ch <= '9') {
        if (n == 0) v += "(";
        else if (n == 3) v += ") ";
        else if (n == 6) v += "-";
        v += ch;
        n++;
      }
      if (!(ch >= '0' && ch <= '9') && ch != ' ' && ch != '-' && ch != '.' && ch != '(' && ch != ')') {
        x = i;
        break;
      }
    }
    if (x >= 0) v += " " + ov.substring(x, ov.length);
    if (n == 10 && v.length <= 40) field.value = v;
  }
  return true;
}

function formatClean(num) {
  var sVal = '';
  var nVal = num.length;
  var sChar = '';
  try {
    for (i = 0; i < nVal; i++) {
      sChar = num.charAt(i);
      nChar = sChar.charCodeAt(0);
      if (sChar == '-' || sChar == getDecimalSeparator() || ((nChar >= 48) && (nChar <= 57))) {
        sVal += num.charAt(i);
      }
    }
  } catch (exception) {
    alertError("formatClean", exception);
  }
  return sVal;
}

function formatCurrency(num) {
  var sVal = '';
  var minus = '';
  if (num.lastIndexOf("-") == 0) {
    minus = '-';
  }
  if (num.lastIndexOf(".") < 0) {
    num = num + '00';
  }
  num = formatClean(num);
  sVal = minus + formatDollar(num, getGroupingSeparator()) + getDecimalSeparator() + formatCents(num);
  return sVal;
}

function formatNumber(num) {
  if (num.length == 0)
    return num;
  num = new String(num);
  var sVal = '';
  var minus = '';
  try {
    if (num.lastIndexOf("-") == 0) {
      minus = '-';
    }
    num = formatClean(num);
    if (num.indexOf("-") == 0)
      num = num.substring(1);
    num = "0" + num;
    var fraction = parseFraction(new String(num));
    num = parseInt(num, 10);
    var samount = new String(num);
    for (var i = 0; i < Math.floor((samount.length - (1 + i)) / 3); i++) {
      samount = samount.substring(0, samount.length - (4 * i + 3)) + getGroupingSeparator() + samount.substring(samount.length - (4 * i + 3));
    }
    if (fraction.length > 0) {
      fraction = getDecimalSeparator() + fraction;
      samount += fraction;
    }
  } catch (exception) {
    alertError("Format Number", exception);
  }
  return minus + samount;
}

function parseFraction(num) {
  var index = num.indexOf(getDecimalSeparator());
  if (index == -1)
    return "";
  return num.substring(index + 1);
}

function formatCents(amount) {
  var cents = '';
  try {
    amount = parseInt(amount, 10);
    var samount = new String(amount);
    if (samount.length == 0) {
      return '00';
    }
    if (samount.length == 1) {
      return '0' + samount;
    }
    if (samount.length == 2) {
      return samount;
    }
    cents = samount.substring(samount.length - 2, samount.length);
  } catch (exception) {
    alertError("Format Cents", e);
  }
  return cents;
}

function formatDollar(amount) {
  try {
    amount = parseInt(amount, 10);
    var samount = new String(amount);
    if (samount.length < 3)
      return 0;
    samount = samount.substring(0, samount.length - 2);
    for (var i = 0; i < Math.floor((samount.length - (1 + i)) / 3); i++) {
      samount = samount.substring(0, samount.length - (4 * i + 3)) + getGroupingSeparator() + samount.substring(samount.length - (4 * i + 3));
    }
  } catch (exception) {
    alertError("Format Dollar", e);
  }
  return samount;
}

function padLeft(value, width, fill) {
  value = value + '';
  while (value.length < width)
    value = fill + value;
  return value;
}

function getDecimalSeparator() {
  if (g_user_decimal_separator)
    return g_user_decimal_separator;
  return ".";
}

function getGroupingSeparator() {
  if (g_user_grouping_separator)
    return g_user_grouping_separator;
  return ",";
}

function alertError(MethodName, e) {
  if (e.description == null) {
    alert(MethodName + " Exception: " + e.message);
  } else {
    alert(MethodName + " Exception: " + e.description);
  }
};
/*! RESOURCE: /scripts/doctype/utils14.js */
function doNothing() {}

function valueExistsInArray(val, array) {
  for (var i = 0; i < array.length; i++) {
    if (val == array[i])
      return true;
  }
  return false;
}

function doubleDigitFormat(num) {
  return padLeft(num, 2, "0");
}

function tripleDigitFormat(num) {
  return padLeft(num, 3, "0");
}

function sGetHours(totalSecs) {
  return parseInt(totalSecs / (60 * 60), 10);
}

function sGetMinutes(totalSecs) {
  totalSecs -= (60 * 60) * sGetHours(totalSecs);
  return parseInt(totalSecs / 60, 10);
}

function sGetSeconds(totalSecs) {
  totalSecs -= (60 * 60) * sGetHours(totalSecs);
  totalSecs -= (60) * sGetMinutes(totalSecs);
  return parseInt(totalSecs, 10);
}

function isNumber(test) {
  if (!test)
    return false;
  test = new String(test);
  var _numer = test.search("[^0-9]");
  return _numer == -1;
}

function isAlphaNum(thchar) {
  return isAlpha(thchar) || isDigit(thchar);
}

function isAlpha(thchar) {
  return (thchar >= 'a' && thchar <= 'z\uffff') || (thchar >= 'A' && thchar <= 'Z\uffff') || thchar == '_';
}

function isDigit(thchar) {
  return (thchar >= '0' && thchar <= '9');
}

function containsOnlyChars(validChars, sText) {
  if (!sText)
    return true;
  for (var i = 0; i < sText.length; i++) {
    var c = sText.charAt(i);
    if (validChars.indexOf(c) == -1)
      return false;
  }
  return true;
}

function getAttributeValue(element, attrName) {
  return element.getAttribute(attrName);
}

function setAttributeValue(element, attrName, value) {
  element.setAttribute(attrName, value);
}

function toggleDivDisplayAndReturn(divName) {
  if (!divName)
    return;
  var div = $(divName);
  if (!div)
    return;
  if (div.style.display == "none")
    showObject(div);
  else
    hideObject(div);
  return div;
}

function toggleDivDisplay(divName) {
  toggleDivDisplayAndReturn(divName);
}

function findParentByTag(element, tag) {
  var ret;
  while (element && element.parentNode && element.parentNode.tagName) {
    element = element.parentNode;
    if (element.tagName.toLowerCase() == tag.toLowerCase())
      return element;
  }
  return ret;
}

function replaceAll(str, from, to) {
  var idx = str.indexOf(from);
  while (idx > -1) {
    str = str.replace(from, to);
    idx = str.indexOf(from);
  }
  return str;
}

function useAnimation() {
  if (isTouchDevice)
    return false;
  return true;
}

function expandEffect(el, duration, steps, stepCallback, completionCallback) {
  if (!useAnimation()) {
    showObject(el);
    if (completionCallback)
      completionCallback(el);
    return;
  }
  var h;
  if (el.originalHeight)
    h = el.originalHeight;
  else {
    h = getHeight(el);
    if (h == 0) {
      showObject(el);
      return;
    }
    el.originalHeight = h;
  }
  if (!duration)
    duration = 70;
  if (!steps)
    steps = 14;
  el.style.overflow = "hidden";
  el.style.height = "1px";
  el.style.display = "block";
  el.style.visibility = "visible";
  expandAnimationEffect(el, h, duration, steps, stepCallback, completionCallback);
  return h;
}

function expandAnimationEffect(el, height, duration, steps, stepCallback, completionCallback) {
  new Rico.Effect.Size(el.id, null, height, duration, steps, {
    step: function() {
      if (stepCallback)
        stepCallback(el);
    },
    complete: function() {
      _expandComplete(el, completionCallback);
    }
  });
}

function _expandComplete(el, completionCallback) {
  el.style.overflow = "";
  el.style.height = "auto";
  if (completionCallback)
    completionCallback(el);
  _frameChanged();
}

function collapseEffect(el, duration, steps) {
  if (!useAnimation()) {
    hideObject(el);
    return;
  }
  var h;
  if (el.originalHeight)
    h = el.originalHeight;
  else {
    h = el.offsetHeight;
    el.originalHeight = h;
  }
  if (!duration)
    duration = 70;
  if (!steps)
    steps = 14;
  if (!h)
    h = el.offsetHeight;
  el.style.overflow = "hidden";
  collapseAnimationEffect(el, h, duration, steps);
}

function collapseAnimationEffect(el, height, duration, steps) {
  new Rico.Effect.Size(el.id, null, 1, duration, steps, {
    complete: function() {
      _collapseComplete(el, height);
    }
  });
}

function _collapseComplete(el, height) {
  el.style.display = "none";
  el.style.overflow = "";
  el.style.height = height;
  _frameChanged();
}

function getHeight(el) {
  var item;
  try {
    item = el.cloneNode(true);
  } catch (e) {
    jslog("getHeight blew up... we caught the error and returned 0")
    return 0;
  }
  var height = 0;
  item.style.visibility = "hidden";
  item.style.display = "block";
  item.style.position = "absolute";
  item.style.top = 0;
  item.style.left = 0;
  document.body.appendChild(item);
  height = item.offsetHeight;
  document.body.removeChild(item);
  return height;
}

function getWidth(el) {
  var item = el.cloneNode(true);
  var width = 0;
  item.style.visibility = "hidden";
  item.style.display = "block";
  item.style.position = "absolute";
  item.style.top = 0;
  item.style.left = 0;
  document.body.appendChild(item);
  width = item.offsetWidth;
  document.body.removeChild(item);
  return width;
}

function grabOffsetLeft(item) {
  return getOffset(item, "offsetLeft")
}

function grabOffsetTop(item) {
  return getOffset(item, "offsetTop")
}

function getOffset(item, attr) {
  var parentElement = getFormContentParent();
  var wb = 0;
  while (item) {
    wb += item[attr];
    item = item.offsetParent;
    if (item == parentElement)
      break;
  }
  return wb;
}

function grabScrollLeft(item) {
  return getScrollOffset(item, "scrollLeft")
}

function grabScrollTop(item) {
  return getScrollOffset(item, "scrollTop")
}

function getScrollOffset(item, attr) {
  var parentElement = getFormContentParent();
  var wb = 0;
  while (item && item.tagName && item != parentElement) {
    wb += item[attr];
    if (isMSIE)
      item = item.offsetParent;
    else
      item = item.parentNode;
  }
  return wb;
}

function getValue(evt) {
  var elem = evt.target;
  if (!elem)
    return null;
  try {
    return elem.options[elem.selectedIndex].value;
  } catch (e) {
    var msg = (typeof e == "string") ? e : ((e.message) ? e.message : "Unknown Error");
    alert("Unable to get data:\n" + msg);
  }
  return null;
}

function getEvent(event) {
  return event;
}

function getEventCoords(e) {
  var fudge = getFormContentParent();
  var answer = Event.pointer(e);
  answer = new Point(answer.x, answer.y);
  if (fudge == document.body)
    return answer;
  answer.x += fudge.scrollLeft;
  answer.y += fudge.scrollTop;
  var fudgeTop = fudge.getStyle('top');
  var fudgePos = fudge.getStyle('position');
  if (fudgePos == 'absolute' && fudgeTop && fudgeTop.indexOf('px'))
    answer.y -= parseInt(fudgeTop.replace('px', ''));
  return answer;
}

function getRelativeTop() {
  var port = document.viewport;
  var topLeft = new Point(port.getScrollOffsets().left, port.getScrollOffsets().top)
  var fudge = getFormContentParent();
  if (fudge != document.body) {
    topLeft.x += fudge.scrollLeft;
    topLeft.y += fudge.scrollTop;
  }
  return topLeft;
}

function getRealEvent(e) {
  if (isTouchDevice && isTouchEvent(e)) {
    e = e.changedTouches[0];
  }
  return e;
}

function isTouchEvent(e) {
  if (typeof e == 'undefined' || typeof e.changedTouches == 'undefined')
    return false;
  return true;
}

function isTouchRightClick(e) {
  if (!isTouchEvent(e))
    return false;
  var hasTwoFingers = e.changedTouches.length > 1;
  return hasTwoFingers;
}

function getTextValue(node) {
  if (node.textContent)
    return node.textContent;
  var firstNode = node.childNodes[0];
  if (!firstNode)
    return null;
  if (firstNode.data)
    return firstNode.data;
  return firstNode.nodeValue;
}

function getScrollX() {
  return window.pageXOffset;
}

function getScrollY() {
  return window.pageYOffset;
}

function getSrcElement(evt) {
  return evt.target;
}

function addForm() {
  var form = cel('form');
  document.body.appendChild(form);
  if (window.g_ck)
    addHidden(form, "sysparm_ck", g_ck);
  return form;
}

function addHidden(form, name, value) {
  addInput(form, 'HIDDEN', name, value);
}

function addInput(form, type, name, value) {
  var inputs = Form.getInputs(form, '', name);
  if (inputs.length > 0) {
    inputs[0].value = value;
    return;
  }
  var opt = document.createElement('input');
  opt.type = type;
  opt.name = name;
  opt.id = name;
  opt.value = value;
  form.appendChild(opt);
}

function getHiddenInputValuesMap(parent) {
  var valuesMap = {}
  var inputs = parent.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    if (input.type.toLowerCase() != "hidden")
      continue;
    valuesMap[input.id] = input.value;
  }
  return valuesMap;
}

function appendSelectOption(select, value, label, index) {
  var opt = document.createElement("option");
  opt.value = value;
  opt.appendChild(label);
  if (index >= 0 && index != select.length)
    select.insertBefore(opt, select.children[index]);
  else
    select.appendChild(opt);
  return opt;
}

function copySelectOptionToIndex(select, opt, index) {
  var label = opt.text;
  opt.innerHTML = "";
  opt.appendChild(document.createTextNode(label));
  if (index >= 0 && index != select.length)
    select.insertBefore(opt, select.children[index]);
  else
    select.appendChild(opt);
  return opt;
}

function selectMenuItem(id, selectName) {
  var selectMenu = document.getElementById(selectName);
  if (!selectMenu)
    return -1;
  var options = selectMenu.options;
  var selectItem = selectMenu.selectedIndex;
  if (id) {
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      if (option.value == id) {
        selectItem = i;
        break;
      }
    }
  }
  if (selectItem > 0) {
    selectMenu.selectedIndex = selectItem;
    if (selectMenu["onchange"]) {
      selectMenu.onchange();
    }
  }
  return selectItem;
}

function menuIsEmpty(selectName) {
  var selectMenu = document.getElementById(selectName);
  if (!selectMenu || selectMenu.selectedIndex <= 0)
    return true;
  return false;
}

function getBounds(obj, addScroll) {
  var x = grabOffsetLeft(obj);
  var y = grabOffsetTop(obj);
  if (addScroll) {
    x += getScrollX();
    y += getScrollY();
  }
  this.absoluteRect = {
    top: y,
    left: x,
    bottom: y + obj.offsetHeight,
    right: x + obj.offsetWidth,
    height: obj.offsetHeight,
    width: obj.offsetWidth,
    middleX: x + (obj.offsetWidth / 2),
    middleY: y + (obj.offsetHeight / 2),
    cbottom: y + obj.clientHeight,
    cright: x + obj.clientWidth
  };
  return this.absoluteRect;
}

function guid(l) {
  var l = l || 32,
    strResult = '';
  while (strResult.length < l)
    strResult += (((1 + Math.rando