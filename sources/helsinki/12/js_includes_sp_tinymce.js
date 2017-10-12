/*! RESOURCE: /scripts/js_includes_sp_tinymce.js */
/*! RESOURCE: /scripts/sp-tinymce/tinymce.min.js */
// 4.3.3 (2016-01-14)
! function(e, t) {
  "use strict";

  function n(e, t) {
    for (var n, r = [], i = 0; i < e.length; ++i) {
      if (n = s[e[i]] || o(e[i]), !n) throw "module definition dependecy not found: " + e[i];
      r.push(n)
    }
    t.apply(null, r)
  }

  function r(e, r, i) {
    if ("string" != typeof e) throw "invalid module definition, module id must be defined and be a string";
    if (r === t) throw "invalid module definition, dependencies must be specified";
    if (i === t) throw "invalid module definition, definition function must be specified";
    n(r, function() {
      s[e] = i.apply(null, arguments)
    })
  }

  function i(e) {
    return !!s[e]
  }

  function o(t) {
    for (var n = e, r = t.split(/[.\/]/), i = 0; i < r.length; ++i) {
      if (!n[r[i]]) return;
      n = n[r[i]]
    }
    return n
  }

  function a(n) {
    var r, i, o, a, l;
    for (r = 0; r < n.length; r++) {
      i = e, o = n[r], a = o.split(/[.\/]/);
      for (var c = 0; c < a.length - 1; ++c) i[a[c]] === t && (i[a[c]] = {}), i = i[a[c]];
      i[a[a.length - 1]] = s[o]
    }
    if (e.AMDLC_TESTS) {
      l = e.privateModules || {};
      for (o in s) l[o] = s[o];
      for (r = 0; r < n.length; r++) delete l[n[r]];
      e.privateModules = l
    }
  }
  var s = {},
    l = "tinymce/geom/Rect",
    c = "tinymce/util/Promise",
    u = "tinymce/util/Delay",
    d = "tinymce/dom/EventUtils",
    f = "tinymce/dom/Sizzle",
    h = "tinymce/Env",
    p = "tinymce/util/Arr",
    m = "tinymce/util/Tools",
    g = "tinymce/dom/DomQuery",
    v = "tinymce/html/Styles",
    y = "tinymce/dom/TreeWalker",
    b = "tinymce/dom/Range",
    C = "tinymce/html/Entities",
    x = "tinymce/dom/StyleSheetLoader",
    w = "tinymce/dom/DOMUtils",
    E = "tinymce/dom/ScriptLoader",
    N = "tinymce/AddOnManager",
    _ = "tinymce/dom/NodeType",
    S = "tinymce/text/Zwsp",
    k = "tinymce/caret/CaretContainer",
    T = "tinymce/dom/RangeUtils",
    R = "tinymce/NodeChange",
    A = "tinymce/html/Node",
    B = "tinymce/html/Schema",
    D = "tinymce/html/SaxParser",
    M = "tinymce/html/DomParser",
    L = "tinymce/html/Writer",
    P = "tinymce/html/Serializer",
    H = "tinymce/dom/Serializer",
    O = "tinymce/dom/TridentSelection",
    I = "tinymce/util/VK",
    F = "tinymce/dom/ControlSelection",
    z = "tinymce/util/Fun",
    W = "tinymce/caret/CaretCandidate",
    V = "tinymce/geom/ClientRect",
    U = "tinymce/text/ExtendingChar",
    $ = "tinymce/caret/CaretPosition",
    q = "tinymce/caret/CaretBookmark",
    j = "tinymce/dom/BookmarkManager",
    Y = "tinymce/dom/Selection",
    X = "tinymce/dom/ElementUtils",
    K = "tinymce/fmt/Preview",
    G = "tinymce/Formatter",
    J = "tinymce/UndoManager",
    Q = "tinymce/EnterKey",
    Z = "tinymce/ForceBlocks",
    ee = "tinymce/EditorCommands",
    te = "tinymce/util/URI",
    ne = "tinymce/util/Class",
    re = "tinymce/util/EventDispatcher",
    ie = "tinymce/data/Binding",
    oe = "tinymce/util/Observable",
    ae = "tinymce/data/ObservableObject",
    se = "tinymce/ui/Selector",
    le = "tinymce/ui/Collection",
    ce = "tinymce/ui/DomUtils",
    ue = "tinymce/ui/BoxUtils",
    de = "tinymce/ui/ClassList",
    fe = "tinymce/ui/ReflowQueue",
    he = "tinymce/ui/Control",
    pe = "tinymce/ui/Factory",
    me = "tinymce/ui/KeyboardNavigation",
    ge = "tinymce/ui/Container",
    ve = "tinymce/ui/DragHelper",
    ye = "tinymce/ui/Scrollable",
    be = "tinymce/ui/Panel",
    Ce = "tinymce/ui/Movable",
    xe = "tinymce/ui/Resizable",
    we = "tinymce/ui/FloatPanel",
    Ee = "tinymce/ui/Window",
    Ne = "tinymce/ui/MessageBox",
    _e = "tinymce/WindowManager",
    Se = "tinymce/ui/Tooltip",
    ke = "tinymce/ui/Widget",
    Te = "tinymce/ui/Progress",
    Re = "tinymce/ui/Notification",
    Ae = "tinymce/NotificationManager",
    Be = "tinymce/dom/NodePath",
    De = "tinymce/util/Quirks",
    Me = "tinymce/EditorObservable",
    Le = "tinymce/Mode",
    Pe = "tinymce/Shortcuts",
    He = "tinymce/file/Uploader",
    Oe = "tinymce/file/Conversions",
    Ie = "tinymce/file/ImageScanner",
    Fe = "tinymce/file/BlobCache",
    ze = "tinymce/EditorUpload",
    We = "tinymce/caret/CaretUtils",
    Ve = "tinymce/caret/CaretWalker",
    Ue = "tinymce/caret/FakeCaret",
    $e = "tinymce/dom/Dimensions",
    qe = "tinymce/caret/LineWalker",
    je = "tinymce/caret/LineUtils",
    Ye = "tinymce/DragDropOverrides",
    Xe = "tinymce/SelectionOverrides",
    Ke = "tinymce/Editor",
    Ge = "tinymce/util/I18n",
    Je = "tinymce/FocusManager",
    Qe = "tinymce/EditorManager",
    Ze = "tinymce/LegacyInput",
    et = "tinymce/util/XHR",
    tt = "tinymce/util/JSON",
    nt = "tinymce/util/JSONRequest",
    rt = "tinymce/util/JSONP",
    it = "tinymce/util/LocalStorage",
    ot = "tinymce/Compat",
    at = "tinymce/ui/Layout",
    st = "tinymce/ui/AbsoluteLayout",
    lt = "tinymce/ui/Button",
    ct = "tinymce/ui/ButtonGroup",
    ut = "tinymce/ui/Checkbox",
    dt = "tinymce/ui/ComboBox",
    ft = "tinymce/ui/ColorBox",
    ht = "tinymce/ui/PanelButton",
    pt = "tinymce/ui/ColorButton",
    mt = "tinymce/util/Color",
    gt = "tinymce/ui/ColorPicker",
    vt = "tinymce/ui/Path",
    yt = "tinymce/ui/ElementPath",
    bt = "tinymce/ui/FormItem",
    Ct = "tinymce/ui/Form",
    xt = "tinymce/ui/FieldSet",
    wt = "tinymce/ui/FilePicker",
    Et = "tinymce/ui/FitLayout",
    Nt = "tinymce/ui/FlexLayout",
    _t = "tinymce/ui/FlowLayout",
    St = "tinymce/ui/FormatControls",
    kt = "tinymce/ui/GridLayout",
    Tt = "tinymce/ui/Iframe",
    Rt = "tinymce/ui/Label",
    At = "tinymce/ui/Toolbar",
    Bt = "tinymce/ui/MenuBar",
    Dt = "tinymce/ui/MenuButton",
    Mt = "tinymce/ui/MenuItem",
    Lt = "tinymce/ui/Menu",
    Pt = "tinymce/ui/ListBox",
    Ht = "tinymce/ui/Radio",
    Ot = "tinymce/ui/ResizeHandle",
    It = "tinymce/ui/SelectBox",
    Ft = "tinymce/ui/Slider",
    zt = "tinymce/ui/Spacer",
    Wt = "tinymce/ui/SplitButton",
    Vt = "tinymce/ui/StackLayout",
    Ut = "tinymce/ui/TabPanel",
    $t = "tinymce/ui/TextBox",
    qt = "tinymce/ui/Throbber";
  r(l, [], function() {
      function e(e, t, n) {
        var r, i, a, s, l, u;
        return r = t.x, i = t.y, a = e.w, s = e.h, l = t.w, u = t.h, n = (n || "").split(""), "b" === n[0] && (i += u), "r" === n[1] && (r += l), "c" === n[0] && (i += c(u / 2)), "c" === n[1] && (r += c(l / 2)), "b" === n[3] && (i -= s), "r" === n[4] && (r -= a), "c" === n[3] && (i -= c(s / 2)), "c" === n[4] && (r -= c(a / 2)), o(r, i, a, s)
      }

      function t(t, n, r, i) {
        var o, a;
        for (a = 0; a < i.length; a++)
          if (o = e(t, n, i[a]), o.x >= r.x && o.x + o.w <= r.w + r.x && o.y >= r.y && o.y + o.h <= r.h + r.y) return i[a];
        return null
      }

      function n(e, t, n) {
        return o(e.x - t, e.y - n, e.w + 2 * t, e.h + 2 * n)
      }

      function r(e, t) {
        var n, r, i, a;
        return n = l(e.x, t.x), r = l(e.y, t.y), i = s(e.x + e.w, t.x + t.w), a = s(e.y + e.h, t.y + t.h), 0 > i - n || 0 > a - r ? null : o(n, r, i - n, a - r)
      }

      function i(e, t, n) {
        var r, i, a, s, c, u, d, f, h, p;
        return c = e.x, u = e.y, d = e.x + e.w, f = e.y + e.h, h = t.x + t.w, p = t.y + t.h, r = l(0, t.x - c), i = l(0, t.y - u), a = l(0, d - h), s = l(0, f - p), c += r, u += i, n && (d += r, f += i, c -= a, u -= s), d -= a, f -= s, o(c, u, d - c, f - u)
      }

      function o(e, t, n, r) {
        return {
          x: e,
          y: t,
          w: n,
          h: r
        }
      }

      function a(e) {
        return o(e.left, e.top, e.width, e.height)
      }
      var s = Math.min,
        l = Math.max,
        c = Math.round;
      return {
        inflate: n,
        relativePosition: e,
        findBestRelativePosition: t,
        intersect: r,
        clamp: i,
        create: o,
        fromClientRect: a
      }
    }), r(c, [], function() {
      function e(e, t) {
        return function() {
          e.apply(t, arguments)
        }
      }

      function t(t) {
        if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof t) throw new TypeError("not a function");
        this._state = null, this._value = null, this._deferreds = [], s(t, e(r, this), e(i, this))
      }

      function n(e) {
        var t = this;
        return null === this._state ? void this._deferreds.push(e) : void l(function() {
          var n = t._state ? e.onFulfilled : e.onRejected;
          if (null === n) return void(t._state ? e.resolve : e.reject)(t._value);
          var r;
          try {
            r = n(t._value)
          } catch (i) {
            return void e.reject(i)
          }
          e.resolve(r)
        })
      }

      function r(t) {
        try {
          if (t === this) throw new TypeError("A promise cannot be resolved with itself.");
          if (t && ("object" == typeof t || "function" == typeof t)) {
            var n = t.then;
            if ("function" == typeof n) return void s(e(n, t), e(r, this), e(i, this))
          }
          this._state = !0, this._value = t, o.call(this)
        } catch (a) {
          i.call(this, a)
        }
      }

      function i(e) {
        this._state = !1, this._value = e, o.call(this)
      }

      function o() {
        for (var e = 0, t = this._deferreds.length; t > e; e++) n.call(this, this._deferreds[e]);
        this._deferreds = null
      }

      function a(e, t, n, r) {
        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.resolve = n, this.reject = r
      }

      function s(e, t, n) {
        var r = !1;
        try {
          e(function(e) {
            r || (r = !0, t(e))
          }, function(e) {
            r || (r = !0, n(e))
          })
        } catch (i) {
          if (r) return;
          r = !0, n(i)
        }
      }
      if (window.Promise) return window.Promise;
      var l = t.immediateFn || "function" == typeof setImmediate && setImmediate || function(e) {
          setTimeout(e, 1)
        },
        c = Array.isArray || function(e) {
          return "[object Array]" === Object.prototype.toString.call(e)
        };
      return t.prototype["catch"] = function(e) {
        return this.then(null, e)
      }, t.prototype.then = function(e, r) {
        var i = this;
        return new t(function(t, o) {
          n.call(i, new a(e, r, t, o))
        })
      }, t.all = function() {
        var e = Array.prototype.slice.call(1 === arguments.length && c(arguments[0]) ? arguments[0] : arguments);
        return new t(function(t, n) {
          function r(o, a) {
            try {
              if (a && ("object" == typeof a || "function" == typeof a)) {
                var s = a.then;
                if ("function" == typeof s) return void s.call(a, function(e) {
                  r(o, e)
                }, n)
              }
              e[o] = a, 0 === --i && t(e)
            } catch (l) {
              n(l)
            }
          }
          if (0 === e.length) return t([]);
          for (var i = e.length, o = 0; o < e.length; o++) r(o, e[o])
        })
      }, t.resolve = function(e) {
        return e && "object" == typeof e && e.constructor === t ? e : new t(function(t) {
          t(e)
        })
      }, t.reject = function(e) {
        return new t(function(t, n) {
          n(e)
        })
      }, t.race = function(e) {
        return new t(function(t, n) {
          for (var r = 0, i = e.length; i > r; r++) e[r].then(t, n)
        })
      }, t
    }), r(u, [c], function(e) {
      function t(e, t) {
        function n(e) {
          window.setTimeout(e, 0)
        }
        var r, i = window.requestAnimationFrame,
          o = ["ms", "moz", "webkit"];
        for (r = 0; r < o.length && !i; r++) i = window[o[r] + "RequestAnimationFrame"];
        i || (i = n), i(e, t)
      }

      function n(e, t) {
        return "number" != typeof t && (t = 0), setTimeout(e, t)
      }

      function r(e, t) {
        return "number" != typeof t && (t = 0), setInterval(e, t)
      }

      function i(e) {
        return clearTimeout(e)
      }

      function o(e) {
        return clearInterval(e)
      }
      var a;
      return {
        requestAnimationFrame: function(n, r) {
          return a ? void a.then(n) : void(a = new e(function(e) {
            r || (r = document.body), t(e, r)
          }).then(n))
        },
        setTimeout: n,
        setInterval: r,
        setEditorTimeout: function(e, t, r) {
          return n(function() {
            e.removed || t()
          }, r)
        },
        setEditorInterval: function(e, t, n) {
          var i;
          return i = r(function() {
            e.removed ? clearInterval(i) : t()
          }, n)
        },
        throttle: function(e, t) {
          var r;
          return function() {
            var i = arguments;
            clearTimeout(r), r = n(function() {
              e.apply(this, i)
            }, t)
          }
        },
        clearInterval: o,
        clearTimeout: i
      }
    }), r(d, [u], function(e) {
      function t(e, t, n, r) {
        e.addEventListener ? e.addEventListener(t, n, r || !1) : e.attachEvent && e.attachEvent("on" + t, n)
      }

      function n(e, t, n, r) {
        e.removeEventListener ? e.removeEventListener(t, n, r || !1) : e.detachEvent && e.detachEvent("on" + t, n)
      }

      function r(e, t) {
        function n() {
          return !1
        }

        function r() {
          return !0
        }
        var i, o = t || {},
          a;
        for (i in e) l[i] || (o[i] = e[i]);
        if (o.target || (o.target = o.srcElement || document), e && s.test(e.type) && e.pageX === a && e.clientX !== a) {
          var c = o.target.ownerDocument || document,
            u = c.documentElement,
            d = c.body;
          o.pageX = e.clientX + (u && u.scrollLeft || d && d.scrollLeft || 0) - (u && u.clientLeft || d && d.clientLeft || 0), o.pageY = e.clientY + (u && u.scrollTop || d && d.scrollTop || 0) - (u && u.clientTop || d && d.clientTop || 0)
        }
        return o.preventDefault = function() {
          o.isDefaultPrevented = r, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        }, o.stopPropagation = function() {
          o.isPropagationStopped = r, e && (e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0)
        }, o.stopImmediatePropagation = function() {
          o.isImmediatePropagationStopped = r, o.stopPropagation()
        }, o.isDefaultPrevented || (o.isDefaultPrevented = n, o.isPropagationStopped = n, o.isImmediatePropagationStopped = n), "undefined" == typeof o.metaKey && (o.metaKey = !1), o
      }

      function i(r, i, o) {
        function a() {
          o.domLoaded || (o.domLoaded = !0, i(u))
        }

        function s() {
          ("complete" === c.readyState || "interactive" === c.readyState && c.body) && (n(c, "readystatechange", s), a())
        }

        function l() {
          try {
            c.documentElement.doScroll("left")
          } catch (t) {
            return void e.setTimeout(l)
          }
          a()
        }
        var c = r.document,
          u = {
            type: "ready"
          };
        return o.domLoaded ? void i(u) : (c.addEventListener ? "complete" === c.readyState ? a() : t(r, "DOMContentLoaded", a) : (t(c, "readystatechange", s), c.documentElement.doScroll && r.self === r.top && l()), void t(r, "load", a))
      }

      function o() {
        function e(e, t) {
          var n, r, i, o, a = s[t];
          if (n = a && a[e.type])
            for (r = 0, i = n.length; i > r; r++)
              if (o = n[r], o && o.func.call(o.scope, e) === !1 && e.preventDefault(), e.isImmediatePropagationStopped()) return
        }
        var o = this,
          s = {},
          l, c, u, d, f;
        c = a + (+new Date).toString(32), d = "onmouseenter" in document.documentElement, u = "onfocusin" in document.documentElement, f = {
          mouseenter: "mouseover",
          mouseleave: "mouseout"
        }, l = 1, o.domLoaded = !1, o.events = s, o.bind = function(n, a, h, p) {
          function m(t) {
            e(r(t || E.event), g)
          }
          var g, v, y, b, C, x, w, E = window;
          if (n && 3 !== n.nodeType && 8 !== n.nodeType) {
            for (n[c] ? g = n[c] : (g = l++, n[c] = g, s[g] = {}), p = p || n, a = a.split(" "), y = a.length; y--;) b = a[y], x = m, C = w = !1, "DOMContentLoaded" === b && (b = "ready"), o.domLoaded && "ready" === b && "complete" == n.readyState ? h.call(p, r({
              type: b
            })) : (d || (C = f[b], C && (x = function(t) {
              var n, i;
              if (n = t.currentTarget, i = t.relatedTarget, i && n.contains) i = n.contains(i);
              else
                for (; i && i !== n;) i = i.parentNode;
              i || (t = r(t || E.event), t.type = "mouseout" === t.type ? "mouseleave" : "mouseenter", t.target = n, e(t, g))
            })), u || "focusin" !== b && "focusout" !== b || (w = !0, C = "focusin" === b ? "focus" : "blur", x = function(t) {
              t = r(t || E.event), t.type = "focus" === t.type ? "focusin" : "focusout", e(t, g)
            }), v = s[g][b], v ? "ready" === b && o.domLoaded ? h({
              type: b
            }) : v.push({
              func: h,
              scope: p
            }) : (s[g][b] = v = [{
              func: h,
              scope: p
            }], v.fakeName = C, v.capture = w, v.nativeHandler = x, "ready" === b ? i(n, x, o) : t(n, C || b, x, w)));
            return n = v = 0, h
          }
        }, o.unbind = function(e, t, r) {
          var i, a, l, u, d, f;
          if (!e || 3 === e.nodeType || 8 === e.nodeType) return o;
          if (i = e[c]) {
            if (f = s[i], t) {
              for (t = t.split(" "), l = t.length; l--;)
                if (d = t[l], a = f[d]) {
                  if (r)
                    for (u = a.length; u--;)
                      if (a[u].func === r) {
                        var h = a.nativeHandler,
                          p = a.fakeName,
                          m = a.capture;
                        a = a.slice(0, u).concat(a.slice(u + 1)), a.nativeHandler = h, a.fakeName = p, a.capture = m, f[d] = a
                      }
                  r && 0 !== a.length || (delete f[d], n(e, a.fakeName || d, a.nativeHandler, a.capture))
                }
            } else {
              for (d in f) a = f[d], n(e, a.fakeName || d, a.nativeHandler, a.capture);
              f = {}
            }
            for (d in f) return o;
            delete s[i];
            try {
              delete e[c]
            } catch (g) {
              e[c] = null
            }
          }
          return o
        }, o.fire = function(t, n, i) {
          var a;
          if (!t || 3 === t.nodeType || 8 === t.nodeType) return o;
          i = r(null, i), i.type = n, i.target = t;
          do a = t[c], a && e(i, a), t = t.parentNode || t.ownerDocument || t.defaultView || t.parentWindow; while (t && !i.isPropagationStopped());
          return o
        }, o.clean = function(e) {
          var t, n, r = o.unbind;
          if (!e || 3 === e.nodeType || 8 === e.nodeType) return o;
          if (e[c] && r(e), e.getElementsByTagName || (e = e.document), e && e.getElementsByTagName)
            for (r(e), n = e.getElementsByTagName("*"), t = n.length; t--;) e = n[t], e[c] && r(e);
          return o
        }, o.destroy = function() {
          s = {}
        }, o.cancel = function(e) {
          return e && (e.preventDefault(), e.stopImmediatePropagation()), !1
        }
      }
      var a = "mce-data-",
        s = /^(?:mouse|contextmenu)|click/,
        l = {
          keyLocation: 1,
          layerX: 1,
          layerY: 1,
          returnValue: 1,
          webkitMovementX: 1,
          webkitMovementY: 1
        };
      return o.Event = new o, o.Event.bind(window, "ready", function() {}), o
    }), r(f, [], function() {
      function e(e, t, n, r) {
        var i, o, a, s, l, c, d, h, p, m;
        if ((t ? t.ownerDocument || t : z) !== D && B(t), t = t || D, n = n || [], !e || "string" != typeof e) return n;
        if (1 !== (s = t.nodeType) && 9 !== s) return [];
        if (L && !r) {
          if (i = ve.exec(e))
            if (a = i[1]) {
              if (9 === s) {
                if (o = t.getElementById(a), !o || !o.parentNode) return n;
                if (o.id === a) return n.push(o), n
              } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && I(t, o) && o.id === a) return n.push(o), n
            } else {
              if (i[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
              if ((a = i[3]) && x.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(a)), n
            }
          if (x.qsa && (!P || !P.test(e))) {
            if (h = d = F, p = t, m = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
              for (c = _(e), (d = t.getAttribute("id")) ? h = d.replace(be, "\\$&") : t.setAttribute("id", h), h = "[id='" + h + "'] ", l = c.length; l--;) c[l] = h + f(c[l]);
              p = ye.test(e) && u(t.parentNode) || t, m = c.join(",")
            }
            if (m) try {
              return Z.apply(n, p.querySelectorAll(m)), n
            } catch (g) {} finally {
              d || t.removeAttribute("id")
            }
          }
        }
        return k(e.replace(se, "$1"), t, n, r)
      }

      function n() {
        function e(n, r) {
          return t.push(n + " ") > w.cacheLength && delete e[t.shift()], e[n + " "] = r
        }
        var t = [];
        return e
      }

      function r(e) {
        return e[F] = !0, e
      }

      function i(e) {
        var t = D.createElement("div");
        try {
          return !!e(t)
        } catch (n) {
          return !1
        } finally {
          t.parentNode && t.parentNode.removeChild(t), t = null
        }
      }

      function o(e, t) {
        for (var n = e.split("|"), r = e.length; r--;) w.attrHandle[n[r]] = t
      }

      function a(e, t) {
        var n = t && e,
          r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || X) - (~e.sourceIndex || X);
        if (r) return r;
        if (n)
          for (; n = n.nextSibling;)
            if (n === t) return -1;
        return e ? 1 : -1
      }

      function s(e) {
        return function(t) {
          var n = t.nodeName.toLowerCase();
          return "input" === n && t.type === e
        }
      }

      function l(e) {
        return function(t) {
          var n = t.nodeName.toLowerCase();
          return ("input" === n || "button" === n) && t.type === e
        }
      }

      function c(e) {
        return r(function(t) {
          return t = +t, r(function(n, r) {
            for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
          })
        })
      }

      function u(e) {
        return e && typeof e.getElementsByTagName !== Y && e
      }

      function d() {}

      function f(e) {
        for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
        return r
      }

      function h(e, t, n) {
        var r = t.dir,
          i = n && "parentNode" === r,
          o = V++;
        return t.first ? function(t, n, o) {
          for (; t = t[r];)
            if (1 === t.nodeType || i) return e(t, n, o)
        } : function(t, n, a) {
          var s, l, c = [W, o];
          if (a) {
            for (; t = t[r];)
              if ((1 === t.nodeType || i) && e(t, n, a)) return !0
          } else
            for (; t = t[r];)
              if (1 === t.nodeType || i) {
                if (l = t[F] || (t[F] = {}), (s = l[r]) && s[0] === W && s[1] === o) return c[2] = s[2];
                if (l[r] = c, c[2] = e(t, n, a)) return !0
              }
        }
      }

      function p(e) {
        return e.length > 1 ? function(t, n, r) {
          for (var i = e.length; i--;)
            if (!e[i](t, n, r)) return !1;
          return !0
        } : e[0]
      }

      function m(t, n, r) {
        for (var i = 0, o = n.length; o > i; i++) e(t, n[i], r);
        return r
      }

      function g(e, t, n, r, i) {
        for (var o, a = [], s = 0, l = e.length, c = null != t; l > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), c && t.push(s));
        return a
      }

      function v(e, t, n, i, o, a) {
        return i && !i[F] && (i = v(i)), o && !o[F] && (o = v(o, a)), r(function(r, a, s, l) {
          var c, u, d, f = [],
            h = [],
            p = a.length,
            v = r || m(t || "*", s.nodeType ? [s] : s, []),
            y = !e || !r && t ? v : g(v, f, e, s, l),
            b = n ? o || (r ? e : p || i) ? [] : a : y;
          if (n && n(y, b, s, l), i)
            for (c = g(b, h), i(c, [], s, l), u = c.length; u--;)(d = c[u]) && (b[h[u]] = !(y[h[u]] = d));
          if (r) {
            if (o || e) {
              if (o) {
                for (c = [], u = b.length; u--;)(d = b[u]) && c.push(y[u] = d);
                o(null, b = [], c, l)
              }
              for (u = b.length; u--;)(d = b[u]) && (c = o ? te.call(r, d) : f[u]) > -1 && (r[c] = !(a[c] = d))
            }
          } else b = g(b === a ? b.splice(p, b.length) : b), o ? o(null, a, b, l) : Z.apply(a, b)
        })
      }

      function y(e) {
        for (var t, n, r, i = e.length, o = w.relative[e[0].type], a = o || w.relative[" "], s = o ? 1 : 0, l = h(function(e) {
            return e === t
          }, a, !0), c = h(function(e) {
            return te.call(t, e) > -1
          }, a, !0), u = [function(e, n, r) {
            return !o && (r || n !== T) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
          }]; i > s; s++)
          if (n = w.relative[e[s].type]) u = [h(p(u), n)];
          else {
            if (n = w.filter[e[s].type].apply(null, e[s].matches), n[F]) {
              for (r = ++s; i > r && !w.relative[e[r].type]; r++);
              return v(s > 1 && p(u), s > 1 && f(e.slice(0, s - 1).concat({
                value: " " === e[s - 2].type ? "*" : ""
              })).replace(se, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && f(e))
            }
            u.push(n)
          }
        return p(u)
      }

      function b(t, n) {
        var i = n.length > 0,
          o = t.length > 0,
          a = function(r, a, s, l, c) {
            var u, d, f, h = 0,
              p = "0",
              m = r && [],
              v = [],
              y = T,
              b = r || o && w.find.TAG("*", c),
              C = W += null == y ? 1 : Math.random() || .1,
              x = b.length;
            for (c && (T = a !== D && a); p !== x && null != (u = b[p]); p++) {
              if (o && u) {
                for (d = 0; f = t[d++];)
                  if (f(u, a, s)) {
                    l.push(u);
                    break
                  }
                c && (W = C)
              }
              i && ((u = !f && u) && h--, r && m.push(u))
            }
            if (h += p, i && p !== h) {
              for (d = 0; f = n[d++];) f(m, v, a, s);
              if (r) {
                if (h > 0)
                  for (; p--;) m[p] || v[p] || (v[p] = J.call(l));
                v = g(v)
              }
              Z.apply(l, v), c && !r && v.length > 0 && h + n.length > 1 && e.uniqueSort(l)
            }
            return c && (W = C, T = y), m
          };
        return i ? r(a) : a
      }
      var C, x, w, E, N, _, S, k, T, R, A, B, D, M, L, P, H, O, I, F = "sizzle" + -new Date,
        z = window.document,
        W = 0,
        V = 0,
        U = n(),
        $ = n(),
        q = n(),
        j = function(e, t) {
          return e === t && (A = !0), 0
        },
        Y = typeof t,
        X = 1 << 31,
        K = {}.hasOwnProperty,
        G = [],
        J = G.pop,
        Q = G.push,
        Z = G.push,
        ee = G.slice,
        te = G.indexOf || function(e) {
          for (var t = 0, n = this.length; n > t; t++)
            if (this[t] === e) return t;
          return -1
        },
        ne = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        re = "[\\x20\\t\\r\\n\\f]",
        ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        oe = "\\[" + re + "*(" + ie + ")(?:" + re + "*([*^$|!~]?=)" + re + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + re + "*\\]",
        ae = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
        se = new RegExp("^" + re + "+|((?:^|[^\\\\])(?:\\\\.)*)" + re + "+$", "g"),
        le = new RegExp("^" + re + "*," + re + "*"),
        ce = new RegExp("^" + re + "*([>+~]|" + re + ")" + re + "*"),
        ue = new RegExp("=" + re + "*([^\\]'\"]*?)" + re + "*\\]", "g"),
        de = new RegExp(ae),
        fe = new RegExp("^" + ie + "$"),
        he = {
          ID: new RegExp("^#(" + ie + ")"),
          CLASS: new RegExp("^\\.(" + ie + ")"),
          TAG: new RegExp("^(" + ie + "|[*])"),
          ATTR: new RegExp("^" + oe),
          PSEUDO: new RegExp("^" + ae),
          CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + re + "*(even|odd|(([+-]|)(\\d*)n|)" + re + "*(?:([+-]|)" + re + "*(\\d+)|))" + re + "*\\)|)", "i"),
          bool: new RegExp("^(?:" + ne + ")$", "i"),
          needsContext: new RegExp("^" + re + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + re + "*((?:-\\d)?\\d*)" + re + "*\\)|)(?=[^-]|$)", "i")
        },
        pe = /^(?:input|select|textarea|button)$/i,
        me = /^h\d$/i,
        ge = /^[^{]+\{\s*\[native \w/,
        ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ye = /[+~]/,
        be = /'|\\/g,
        Ce = new RegExp("\\\\([\\da-f]{1,6}" + re + "?|(" + re + ")|.)", "ig"),
        xe = function(e, t, n) {
          var r = "0x" + t - 65536;
          return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        };
      try {
        Z.apply(G = ee.call(z.childNodes), z.childNodes), G[z.childNodes.length].nodeType
      } catch (we) {
        Z = {
          apply: G.length ? function(e, t) {
            Q.apply(e, ee.call(t))
          } : function(e, t) {
            for (var n = e.length, r = 0; e[n++] = t[r++];);
            e.length = n - 1
          }
        }
      }
      x = e.support = {}, N = e.isXML = function(e) {
        var t = e && (e.ownerDocument || e).documentElement;
        return t ? "HTML" !== t.nodeName : !1
      }, B = e.setDocument = function(e) {
        var t, n = e ? e.ownerDocument || e : z,
          r = n.defaultView;
        return n !== D && 9 === n.nodeType && n.documentElement ? (D = n, M = n.documentElement, L = !N(n), r && r !== r.top && (r.addEventListener ? r.addEventListener("unload", function() {
          B()
        }, !1) : r.attachEvent && r.attachEvent("onunload", function() {
          B()
        })), x.attributes = i(function(e) {
          return e.className = "i", !e.getAttribute("className")
        }), x.getElementsByTagName = i(function(e) {
          return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
        }), x.getElementsByClassName = ge.test(n.getElementsByClassName), x.getById = i(function(e) {
          return M.appendChild(e).id = F, !n.getElementsByName || !n.getElementsByName(F).length
        }), x.getById ? (w.find.ID = function(e, t) {
          if (typeof t.getElementById !== Y && L) {
            var n = t.getElementById(e);
            return n && n.parentNode ? [n] : []
          }
        }, w.filter.ID = function(e) {
          var t = e.replace(Ce, xe);
          return function(e) {
            return e.getAttribute("id") === t
          }
        }) : (delete w.find.ID, w.filter.ID = function(e) {
          var t = e.replace(Ce, xe);
          return function(e) {
            var n = typeof e.getAttributeNode !== Y && e.getAttributeNode("id");
            return n && n.value === t
          }
        }), w.find.TAG = x.getElementsByTagName ? function(e, t) {
          return typeof t.getElementsByTagName !== Y ? t.getElementsByTagName(e) : void 0
        } : function(e, t) {
          var n, r = [],
            i = 0,
            o = t.getElementsByTagName(e);
          if ("*" === e) {
            for (; n = o[i++];) 1 === n.nodeType && r.push(n);
            return r
          }
          return o
        }, w.find.CLASS = x.getElementsByClassName && function(e, t) {
          return L ? t.getElementsByClassName(e) : void 0
        }, H = [], P = [], (x.qsa = ge.test(n.querySelectorAll)) && (i(function(e) {
          e.innerHTML = "<select msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && P.push("[*^$]=" + re + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || P.push("\\[" + re + "*(?:value|" + ne + ")"), e.querySelectorAll(":checked").length || P.push(":checked")
        }), i(function(e) {
          var t = n.createElement("input");
          t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && P.push("name" + re + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || P.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), P.push(",.*:")
        })), (x.matchesSelector = ge.test(O = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && i(function(e) {
          x.disconnectedMatch = O.call(e, "div"), O.call(e, "[s!='']:x"), H.push("!=", ae)
        }), P = P.length && new RegExp(P.join("|")), H = H.length && new RegExp(H.join("|")), t = ge.test(M.compareDocumentPosition), I = t || ge.test(M.contains) ? function(e, t) {
          var n = 9 === e.nodeType ? e.documentElement : e,
            r = t && t.parentNode;
          return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
        } : function(e, t) {
          if (t)
            for (; t = t.parentNode;)
              if (t === e) return !0;
          return !1
        }, j = t ? function(e, t) {
          if (e === t) return A = !0, 0;
          var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
          return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !x.sortDetached && t.compareDocumentPosition(e) === r ? e === n || e.ownerDocument === z && I(z, e) ? -1 : t === n || t.ownerDocument === z && I(z, t) ? 1 : R ? te.call(R, e) - te.call(R, t) : 0 : 4 & r ? -1 : 1)
        } : function(e, t) {
          if (e === t) return A = !0, 0;
          var r, i = 0,
            o = e.parentNode,
            s = t.parentNode,
            l = [e],
            c = [t];
          if (!o || !s) return e === n ? -1 : t === n ? 1 : o ? -1 : s ? 1 : R ? te.call(R, e) - te.call(R, t) : 0;
          if (o === s) return a(e, t);
          for (r = e; r = r.parentNode;) l.unshift(r);
          for (r = t; r = r.parentNode;) c.unshift(r);
          for (; l[i] === c[i];) i++;
          return i ? a(l[i], c[i]) : l[i] === z ? -1 : c[i] === z ? 1 : 0
        }, n) : D
      }, e.matches = function(t, n) {
        return e(t, null, null, n)
      }, e.matchesSelector = function(t, n) {
        if ((t.ownerDocument || t) !== D && B(t), n = n.replace(ue, "='$1']"), x.matchesSelector && L && (!H || !H.test(n)) && (!P || !P.test(n))) try {
          var r = O.call(t, n);
          if (r || x.disconnectedMatch || t.document && 11 !== t.document.nodeType) return r
        } catch (i) {}
        return e(n, D, null, [t]).length > 0
      }, e.contains = function(e, t) {
        return (e.ownerDocument || e) !== D && B(e), I(e, t)
      }, e.attr = function(e, n) {
        (e.ownerDocument || e) !== D && B(e);
        var r = w.attrHandle[n.toLowerCase()],
          i = r && K.call(w.attrHandle, n.toLowerCase()) ? r(e, n, !L) : t;
        return i !== t ? i : x.attributes || !L ? e.getAttribute(n) : (i = e.getAttributeNode(n)) && i.specified ? i.value : null
      }, e.error = function(e) {
        throw new Error("Syntax error, unrecognized expression: " + e)
      }, e.uniqueSort = function(e) {
        var t, n = [],
          r = 0,
          i = 0;
        if (A = !x.detectDuplicates, R = !x.sortStable && e.slice(0), e.sort(j), A) {
          for (; t = e[i++];) t === e[i] && (r = n.push(i));
          for (; r--;) e.splice(n[r], 1)
        }
        return R = null, e
      }, E = e.getText = function(e) {
        var t, n = "",
          r = 0,
          i = e.nodeType;
        if (i) {
          if (1 === i || 9 === i || 11 === i) {
            if ("string" == typeof e.textContent) return e.textContent;
            for (e = e.firstChild; e; e = e.nextSibling) n += E(e)
          } else if (3 === i || 4 === i) return e.nodeValue
        } else
          for (; t = e[r++];) n += E(t);
        return n
      }, w = e.selectors = {
        cacheLength: 50,
        createPseudo: r,
        match: he,
        attrHandle: {},
        find: {},
        relative: {
          ">": {
            dir: "parentNode",
            first: !0
          },
          " ": {
            dir: "parentNode"
          },
          "+": {
            dir: "previousSibling",
            first: !0
          },
          "~": {
            dir: "previousSibling"
          }
        },
        preFilter: {
          ATTR: function(e) {
            return e[1] = e[1].replace(Ce, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(Ce, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
          },
          CHILD: function(t) {
            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
          },
          PSEUDO: function(e) {
            var t, n = !e[6] && e[2];
            return he.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = _(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
          }
        },
        filter: {
          TAG: function(e) {
            var t = e.replace(Ce, xe).toLowerCase();
            return "*" === e ? function() {
              return !0
            } : function(e) {
              return e.nodeName && e.nodeName.toLowerCase() === t
            }
          },
          CLASS: function(e) {
            var t = U[e + " "];
            return t || (t = new RegExp("(^|" + re + ")" + e + "(" + re + "|$)")) && U(e, function(e) {
              return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== Y && e.getAttribute("class") || "")
            })
          },
          ATTR: function(t, n, r) {
            return function(i) {
              var o = e.attr(i, t);
              return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
            }
          },
          CHILD: function(e, t, n, r, i) {
            var o = "nth" !== e.slice(0, 3),
              a = "last" !== e.slice(-4),
              s = "of-type" === t;
            return 1 === r && 0 === i ? function(e) {
              return !!e.parentNode
            } : function(t, n, l) {
              var c, u, d, f, h, p, m = o !== a ? "nextSibling" : "previousSibling",
                g = t.parentNode,
                v = s && t.nodeName.toLowerCase(),
                y = !l && !s;
              if (g) {
                if (o) {
                  for (; m;) {
                    for (d = t; d = d[m];)
                      if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                    p = m = "only" === e && !p && "nextSibling"
                  }
                  return !0
                }
                if (p = [a ? g.firstChild : g.lastChild], a && y) {
                  for (u = g[F] || (g[F] = {}), c = u[e] || [], h = c[0] === W && c[1], f = c[0] === W && c[2], d = h && g.childNodes[h]; d = ++h && d && d[m] || (f = h = 0) || p.pop();)
                    if (1 === d.nodeType && ++f && d === t) {
                      u[e] = [W, h, f];
                      break
                    }
                } else if (y && (c = (t[F] || (t[F] = {}))[e]) && c[0] === W) f = c[1];
                else
                  for (;
                    (d = ++h && d && d[m] || (f = h = 0) || p.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++f || (y && ((d[F] || (d[F] = {}))[e] = [W, f]), d !== t)););
                return f -= i, f === r || f % r === 0 && f / r >= 0
              }
            }
          },
          PSEUDO: function(t, n) {
            var i, o = w.pseudos[t] || w.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
            return o[F] ? o(n) : o.length > 1 ? (i = [t, t, "", n], w.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function(e, t) {
              for (var r, i = o(e, n), a = i.length; a--;) r = te.call(e, i[a]), e[r] = !(t[r] = i[a])
            }) : function(e) {
              return o(e, 0, i)
            }) : o
          }
        },
        pseudos: {
          not: r(function(e) {
            var t = [],
              n = [],
              i = S(e.replace(se, "$1"));
            return i[F] ? r(function(e, t, n, r) {
              for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
            }) : function(e, r, o) {
              return t[0] = e, i(t, null, o, n), !n.pop()
            }
          }),
          has: r(function(t) {
            return function(n) {
              return e(t, n).length > 0
            }
          }),
          contains: r(function(e) {
            return e = e.replace(Ce, xe),
              function(t) {
                return (t.textContent || t.innerText || E(t)).indexOf(e) > -1
              }
          }),
          lang: r(function(t) {
            return fe.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(Ce, xe).toLowerCase(),
              function(e) {
                var n;
                do
                  if (n = L ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                return !1
              }
          }),
          target: function(e) {
            var t = window.location && window.location.hash;
            return t && t.slice(1) === e.id
          },
          root: function(e) {
            return e === M
          },
          focus: function(e) {
            return e === D.activeElement && (!D.hasFocus || D.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
          },
          enabled: function(e) {
            return e.disabled === !1
          },
          disabled: function(e) {
            return e.disabled === !0
          },
          checked: function(e) {
            var t = e.nodeName.toLowerCase();
            return "input" === t && !!e.checked || "option" === t && !!e.selected
          },
          selected: function(e) {
            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
          },
          empty: function(e) {
            for (e = e.firstChild; e; e = e.nextSibling)
              if (e.nodeType < 6) return !1;
            return !0
          },
          parent: function(e) {
            return !w.pseudos.empty(e)
          },
          header: function(e) {
            return me.test(e.nodeName)
          },
          input: function(e) {
            return pe.test(e.nodeName)
          },
          button: function(e) {
            var t = e.nodeName.toLowerCase();
            return "input" === t && "button" === e.type || "button" === t
          },
          text: function(e) {
            var t;
            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
          },
          first: c(function() {
            return [0]
          }),
          last: c(function(e, t) {
            return [t - 1]
          }),
          eq: c(function(e, t, n) {
            return [0 > n ? n + t : n]
          }),
          even: c(function(e, t) {
            for (var n = 0; t > n; n += 2) e.push(n);
            return e
          }),
          odd: c(function(e, t) {
            for (var n = 1; t > n; n += 2) e.push(n);
            return e
          }),
          lt: c(function(e, t, n) {
            for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
            return e
          }),
          gt: c(function(e, t, n) {
            for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
            return e
          })
        }
      }, w.pseudos.nth = w.pseudos.eq;
      for (C in {
          radio: !0,
          checkbox: !0,
          file: !0,
          password: !0,
          image: !0
        }) w.pseudos[C] = s(C);
      for (C in {
          submit: !0,
          reset: !0
        }) w.pseudos[C] = l(C);
      return d.prototype = w.filters = w.pseudos, w.setFilters = new d, _ = e.tokenize = function(t, n) {
        var r, i, o, a, s, l, c, u = $[t + " "];
        if (u) return n ? 0 : u.slice(0);
        for (s = t, l = [], c = w.preFilter; s;) {
          (!r || (i = le.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(o = [])), r = !1, (i = ce.exec(s)) && (r = i.shift(), o.push({
            value: r,
            type: i[0].replace(se, " ")
          }), s = s.slice(r.length));
          for (a in w.filter) !(i = he[a].exec(s)) || c[a] && !(i = c[a](i)) || (r = i.shift(), o.push({
            value: r,
            type: a,
            matches: i
          }), s = s.slice(r.length));
          if (!r) break
        }
        return n ? s.length : s ? e.error(t) : $(t, l).slice(0)
      }, S = e.compile = function(e, t) {
        var n, r = [],
          i = [],
          o = q[e + " "];
        if (!o) {
          for (t || (t = _(e)), n = t.length; n--;) o = y(t[n]), o[F] ? r.push(o) : i.push(o);
          o = q(e, b(i, r)), o.selector = e
        }
        return o
      }, k = e.select = function(e, t, n, r) {
        var i, o, a, s, l, c = "function" == typeof e && e,
          d = !r && _(e = c.selector || e);
        if (n = n || [], 1 === d.length) {
          if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && x.getById && 9 === t.nodeType && L && w.relative[o[1].type]) {
            if (t = (w.find.ID(a.matches[0].replace(Ce, xe), t) || [])[0], !t) return n;
            c && (t = t.parentNode), e = e.slice(o.shift().value.length)
          }
          for (i = he.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !w.relative[s = a.type]);)
            if ((l = w.find[s]) && (r = l(a.matches[0].replace(Ce, xe), ye.test(o[0].type) && u(t.parentNode) || t))) {
              if (o.splice(i, 1), e = r.length && f(o), !e) return Z.apply(n, r), n;
              break
            }
        }
        return (c || S(e, d))(r, t, !L, n, ye.test(e) && u(t.parentNode) || t), n
      }, x.sortStable = F.split("").sort(j).join("") === F, x.detectDuplicates = !!A, B(), x.sortDetached = i(function(e) {
        return 1 & e.compareDocumentPosition(D.createElement("div"))
      }), i(function(e) {
        return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
      }) || o("type|href|height|width", function(e, t, n) {
        return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
      }), x.attributes && i(function(e) {
        return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
      }) || o("value", function(e, t, n) {
        return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
      }), i(function(e) {
        return null == e.getAttribute("disabled")
      }) || o(ne, function(e, t, n) {
        var r;
        return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
      }), e
    }), r(h, [], function() {
      function e(e) {
        return "matchMedia" in window ? matchMedia(e).matches : !1
      }
      var t = navigator,
        n = t.userAgent,
        r, i, o, a, s, l, c, u, d, f, h, p;
      r = window.opera && window.opera.buildNumber, d = /Android/.test(n), i = /WebKit/.test(n), o = !i && !r && /MSIE/gi.test(n) && /Explorer/gi.test(t.appName), o = o && /MSIE (\w+)\./.exec(n)[1], a = -1 == n.indexOf("Trident/") || -1 == n.indexOf("rv:") && -1 == t.appName.indexOf("Netscape") ? !1 : 11, s = -1 == n.indexOf("Edge/") || o || a ? !1 : 12, o = o || a || s, l = !i && !a && /Gecko/.test(n), c = -1 != n.indexOf("Mac"),
        u = /(iPad|iPhone)/.test(n), f = "FormData" in window && "FileReader" in window && "URL" in window && !!URL.createObjectURL, h = e("only screen and (max-device-width: 480px)") && (d || u), p = e("only screen and (min-width: 800px)") && (d || u), s && (i = !1);
      var m = !u || f || n.match(/AppleWebKit\/(\d*)/)[1] >= 534;
      return {
        opera: r,
        webkit: i,
        ie: o,
        gecko: l,
        mac: c,
        iOS: u,
        android: d,
        contentEditable: m,
        transparentSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        caretAfter: 8 != o,
        range: window.getSelection && "Range" in window,
        documentMode: o && !s ? document.documentMode || 7 : 10,
        fileApi: f,
        ceFalse: o === !1 || o > 8,
        desktop: !h && !p
      }
    }), r(p, [], function() {
      function e(e) {
        var t = e,
          n, r;
        if (!u(e))
          for (t = [], n = 0, r = e.length; r > n; n++) t[n] = e[n];
        return t
      }

      function n(e, n, r) {
        var i, o;
        if (!e) return 0;
        if (r = r || e, e.length !== t) {
          for (i = 0, o = e.length; o > i; i++)
            if (n.call(r, e[i], i, e) === !1) return 0
        } else
          for (i in e)
            if (e.hasOwnProperty(i) && n.call(r, e[i], i, e) === !1) return 0;
        return 1
      }

      function r(e, t) {
        var r = [];
        return n(e, function(n, i) {
          r.push(t(n, i, e))
        }), r
      }

      function i(e, t) {
        var r = [];
        return n(e, function(n, i) {
          (!t || t(n, i, e)) && r.push(n)
        }), r
      }

      function o(e, t) {
        var n, r;
        if (e)
          for (n = 0, r = e.length; r > n; n++)
            if (e[n] === t) return n;
        return -1
      }

      function a(e, t, n, r) {
        var i = 0;
        for (arguments.length < 3 && (n = e[0]); i < e.length; i++) n = t.call(r, n, e[i], i);
        return n
      }

      function s(e, t, n) {
        var r, i;
        for (r = 0, i = e.length; i > r; r++)
          if (t.call(n, e[r], r, e)) return r;
        return -1
      }

      function l(e, n, r) {
        var i = s(e, n, r);
        return -1 !== i ? e[i] : t
      }

      function c(e) {
        return e[e.length - 1]
      }
      var u = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
      };
      return {
        isArray: u,
        toArray: e,
        each: n,
        map: r,
        filter: i,
        indexOf: o,
        reduce: a,
        findIndex: s,
        find: l,
        last: c
      }
    }), r(m, [h, p], function(e, n) {
      function r(e) {
        return null === e || e === t ? "" : ("" + e).replace(h, "")
      }

      function i(e, r) {
        return r ? "array" == r && n.isArray(e) ? !0 : typeof e == r : e !== t
      }

      function o(e, t, n) {
        var r;
        for (e = e || [], t = t || ",", "string" == typeof e && (e = e.split(t)), n = n || {}, r = e.length; r--;) n[e[r]] = {};
        return n
      }

      function a(e, t, n) {
        var r = this,
          i, o, a, s, l, c = 0;
        if (e = /^((static) )?([\w.]+)(:([\w.]+))?/.exec(e), a = e[3].match(/(^|\.)(\w+)$/i)[2], o = r.createNS(e[3].replace(/\.\w+$/, ""), n), !o[a]) {
          if ("static" == e[2]) return o[a] = t, void(this.onCreate && this.onCreate(e[2], e[3], o[a]));
          t[a] || (t[a] = function() {}, c = 1), o[a] = t[a], r.extend(o[a].prototype, t), e[5] && (i = r.resolve(e[5]).prototype, s = e[5].match(/\.(\w+)$/i)[1], l = o[a], c ? o[a] = function() {
            return i[s].apply(this, arguments)
          } : o[a] = function() {
            return this.parent = i[s], l.apply(this, arguments)
          }, o[a].prototype[a] = o[a], r.each(i, function(e, t) {
            o[a].prototype[t] = i[t]
          }), r.each(t, function(e, t) {
            i[t] ? o[a].prototype[t] = function() {
              return this.parent = i[t], e.apply(this, arguments)
            } : t != a && (o[a].prototype[t] = e)
          })), r.each(t["static"], function(e, t) {
            o[a][t] = e
          })
        }
      }

      function s(e, n) {
        var r, i, o, a = arguments,
          s;
        for (r = 1, i = a.length; i > r; r++) {
          n = a[r];
          for (o in n) n.hasOwnProperty(o) && (s = n[o], s !== t && (e[o] = s))
        }
        return e
      }

      function l(e, t, r, i) {
        i = i || this, e && (r && (e = e[r]), n.each(e, function(e, n) {
          return t.call(i, e, n, r) === !1 ? !1 : void l(e, t, r, i)
        }))
      }

      function c(e, t) {
        var n, r;
        for (t = t || window, e = e.split("."), n = 0; n < e.length; n++) r = e[n], t[r] || (t[r] = {}), t = t[r];
        return t
      }

      function u(e, t) {
        var n, r;
        for (t = t || window, e = e.split("."), n = 0, r = e.length; r > n && (t = t[e[n]], t); n++);
        return t
      }

      function d(e, t) {
        return !e || i(e, "array") ? e : n.map(e.split(t || ","), r)
      }

      function f(t) {
        var n = e.cacheSuffix;
        return n && (t += (-1 === t.indexOf("?") ? "?" : "&") + n), t
      }
      var h = /^\s*|\s*$/g;
      return {
        trim: r,
        isArray: n.isArray,
        is: i,
        toArray: n.toArray,
        makeMap: o,
        each: n.each,
        map: n.map,
        grep: n.filter,
        inArray: n.indexOf,
        extend: s,
        create: a,
        walk: l,
        createNS: c,
        resolve: u,
        explode: d,
        _addCacheSuffix: f
      }
    }), r(g, [d, f, m, h], function(e, n, r, i) {
      function o(e) {
        return "undefined" != typeof e
      }

      function a(e) {
        return "string" == typeof e
      }

      function s(e) {
        return e && e == e.window
      }

      function l(e, t) {
        var n, r, i;
        for (t = t || w, i = t.createElement("div"), n = t.createDocumentFragment(), i.innerHTML = e; r = i.firstChild;) n.appendChild(r);
        return n
      }

      function c(e, t, n, r) {
        var i;
        if (a(t)) t = l(t, v(e[0]));
        else if (t.length && !t.nodeType) {
          if (t = f.makeArray(t), r)
            for (i = t.length - 1; i >= 0; i--) c(e, t[i], n, r);
          else
            for (i = 0; i < t.length; i++) c(e, t[i], n, r);
          return e
        }
        if (t.nodeType)
          for (i = e.length; i--;) n.call(e[i], t);
        return e
      }

      function u(e, t) {
        return e && t && -1 !== (" " + e.className + " ").indexOf(" " + t + " ")
      }

      function d(e, t, n) {
        var r, i;
        return t = f(t)[0], e.each(function() {
          var e = this;
          n && r == e.parentNode ? i.appendChild(e) : (r = e.parentNode, i = t.cloneNode(!1), e.parentNode.insertBefore(i, e), i.appendChild(e))
        }), e
      }

      function f(e, t) {
        return new f.fn.init(e, t)
      }

      function h(e, t) {
        var n;
        if (t.indexOf) return t.indexOf(e);
        for (n = t.length; n--;)
          if (t[n] === e) return n;
        return -1
      }

      function p(e) {
        return null === e || e === k ? "" : ("" + e).replace(P, "")
      }

      function m(e, t) {
        var n, r, i, o, a;
        if (e)
          if (n = e.length, n === o) {
            for (r in e)
              if (e.hasOwnProperty(r) && (a = e[r], t.call(a, r, a) === !1)) break
          } else
            for (i = 0; n > i && (a = e[i], t.call(a, i, a) !== !1); i++);
        return e
      }

      function g(e, t) {
        var n = [];
        return m(e, function(e, r) {
          t(r, e) && n.push(r)
        }), n
      }

      function v(e) {
        return e ? 9 == e.nodeType ? e : e.ownerDocument : w
      }

      function y(e, n, r) {
        var i = [],
          o = e[n];
        for ("string" != typeof r && r instanceof f && (r = r[0]); o && 9 !== o.nodeType;) {
          if (r !== t) {
            if (o === r) break;
            if ("string" == typeof r && f(o).is(r)) break
          }
          1 === o.nodeType && i.push(o), o = o[n]
        }
        return i
      }

      function b(e, n, r, i) {
        var o = [];
        for (i instanceof f && (i = i[0]); e; e = e[n])
          if (!r || e.nodeType === r) {
            if (i !== t) {
              if (e === i) break;
              if ("string" == typeof i && f(e).is(i)) break
            }
            o.push(e)
          }
        return o
      }

      function C(e, t, n) {
        for (e = e[t]; e; e = e[t])
          if (e.nodeType == n) return e;
        return null
      }

      function x(e, t, n) {
        m(n, function(n, r) {
          e[n] = e[n] || {}, e[n][t] = r
        })
      }
      var w = document,
        E = Array.prototype.push,
        N = Array.prototype.slice,
        _ = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        S = e.Event,
        k, T = r.makeMap("children,contents,next,prev"),
        R = r.makeMap("fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom", " "),
        A = r.makeMap("checked compact declare defer disabled ismap multiple nohref noshade nowrap readonly selected", " "),
        B = {
          "for": "htmlFor",
          "class": "className",
          readonly: "readOnly"
        },
        D = {
          "float": "cssFloat"
        },
        M = {},
        L = {},
        P = /^\s*|\s*$/g;
      return f.fn = f.prototype = {
        constructor: f,
        selector: "",
        context: null,
        length: 0,
        init: function(e, t) {
          var n = this,
            r, i;
          if (!e) return n;
          if (e.nodeType) return n.context = n[0] = e, n.length = 1, n;
          if (t && t.nodeType) n.context = t;
          else {
            if (t) return f(e).attr(t);
            n.context = t = document
          }
          if (a(e)) {
            if (n.selector = e, r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : _.exec(e), !r) return f(t).find(e);
            if (r[1])
              for (i = l(e, v(t)).firstChild; i;) E.call(n, i), i = i.nextSibling;
            else {
              if (i = v(t).getElementById(r[2]), !i) return n;
              if (i.id !== r[2]) return n.find(e);
              n.length = 1, n[0] = i
            }
          } else this.add(e, !1);
          return n
        },
        toArray: function() {
          return r.toArray(this)
        },
        add: function(e, t) {
          var n = this,
            r, i;
          if (a(e)) return n.add(f(e));
          if (t !== !1)
            for (r = f.unique(n.toArray().concat(f.makeArray(e))), n.length = r.length, i = 0; i < r.length; i++) n[i] = r[i];
          else E.apply(n, f.makeArray(e));
          return n
        },
        attr: function(e, t) {
          var n = this,
            r;
          if ("object" == typeof e) m(e, function(e, t) {
            n.attr(e, t)
          });
          else {
            if (!o(t)) {
              if (n[0] && 1 === n[0].nodeType) {
                if (r = M[e], r && r.get) return r.get(n[0], e);
                if (A[e]) return n.prop(e) ? e : k;
                t = n[0].getAttribute(e, 2), null === t && (t = k)
              }
              return t
            }
            this.each(function() {
              var n;
              if (1 === this.nodeType) {
                if (n = M[e], n && n.set) return void n.set(this, t);
                null === t ? this.removeAttribute(e, 2) : this.setAttribute(e, t, 2)
              }
            })
          }
          return n
        },
        removeAttr: function(e) {
          return this.attr(e, null)
        },
        prop: function(e, t) {
          var n = this;
          if (e = B[e] || e, "object" == typeof e) m(e, function(e, t) {
            n.prop(e, t)
          });
          else {
            if (!o(t)) return n[0] && n[0].nodeType && e in n[0] ? n[0][e] : t;
            this.each(function() {
              1 == this.nodeType && (this[e] = t)
            })
          }
          return n
        },
        css: function(e, t) {
          function n(e) {
            return e.replace(/-(\D)/g, function(e, t) {
              return t.toUpperCase()
            })
          }

          function r(e) {
            return e.replace(/[A-Z]/g, function(e) {
              return "-" + e
            })
          }
          var i = this,
            a, s;
          if ("object" == typeof e) m(e, function(e, t) {
            i.css(e, t)
          });
          else if (o(t)) e = n(e), "number" != typeof t || R[e] || (t += "px"), i.each(function() {
            var n = this.style;
            if (s = L[e], s && s.set) return void s.set(this, t);
            try {
              this.style[D[e] || e] = t
            } catch (i) {}(null === t || "" === t) && (n.removeProperty ? n.removeProperty(r(e)) : n.removeAttribute(e))
          });
          else {
            if (a = i[0], s = L[e], s && s.get) return s.get(a);
            if (a.ownerDocument.defaultView) try {
              return a.ownerDocument.defaultView.getComputedStyle(a, null).getPropertyValue(r(e))
            } catch (l) {
              return k
            } else if (a.currentStyle) return a.currentStyle[n(e)]
          }
          return i
        },
        remove: function() {
          for (var e = this, t, n = this.length; n--;) t = e[n], S.clean(t), t.parentNode && t.parentNode.removeChild(t);
          return this
        },
        empty: function() {
          for (var e = this, t, n = this.length; n--;)
            for (t = e[n]; t.firstChild;) t.removeChild(t.firstChild);
          return this
        },
        html: function(e) {
          var t = this,
            n;
          if (o(e)) {
            n = t.length;
            try {
              for (; n--;) t[n].innerHTML = e
            } catch (r) {
              f(t[n]).empty().append(e)
            }
            return t
          }
          return t[0] ? t[0].innerHTML : ""
        },
        text: function(e) {
          var t = this,
            n;
          if (o(e)) {
            for (n = t.length; n--;) "innerText" in t[n] ? t[n].innerText = e : t[0].textContent = e;
            return t
          }
          return t[0] ? t[0].innerText || t[0].textContent : ""
        },
        append: function() {
          return c(this, arguments, function(e) {
            1 === this.nodeType && this.appendChild(e)
          })
        },
        prepend: function() {
          return c(this, arguments, function(e) {
            1 === this.nodeType && this.insertBefore(e, this.firstChild)
          }, !0)
        },
        before: function() {
          var e = this;
          return e[0] && e[0].parentNode ? c(e, arguments, function(e) {
            this.parentNode.insertBefore(e, this)
          }) : e
        },
        after: function() {
          var e = this;
          return e[0] && e[0].parentNode ? c(e, arguments, function(e) {
            this.parentNode.insertBefore(e, this.nextSibling)
          }, !0) : e
        },
        appendTo: function(e) {
          return f(e).append(this), this
        },
        prependTo: function(e) {
          return f(e).prepend(this), this
        },
        replaceWith: function(e) {
          return this.before(e).remove()
        },
        wrap: function(e) {
          return d(this, e)
        },
        wrapAll: function(e) {
          return d(this, e, !0)
        },
        wrapInner: function(e) {
          return this.each(function() {
            f(this).contents().wrapAll(e)
          }), this
        },
        unwrap: function() {
          return this.parent().each(function() {
            f(this).replaceWith(this.childNodes)
          })
        },
        clone: function() {
          var e = [];
          return this.each(function() {
            e.push(this.cloneNode(!0))
          }), f(e)
        },
        addClass: function(e) {
          return this.toggleClass(e, !0)
        },
        removeClass: function(e) {
          return this.toggleClass(e, !1)
        },
        toggleClass: function(e, t) {
          var n = this;
          return "string" != typeof e ? n : (-1 !== e.indexOf(" ") ? m(e.split(" "), function() {
            n.toggleClass(this, t)
          }) : n.each(function(n, r) {
            var i, o;
            o = u(r, e), o !== t && (i = r.className, o ? r.className = p((" " + i + " ").replace(" " + e + " ", " ")) : r.className += i ? " " + e : e)
          }), n)
        },
        hasClass: function(e) {
          return u(this[0], e)
        },
        each: function(e) {
          return m(this, e)
        },
        on: function(e, t) {
          return this.each(function() {
            S.bind(this, e, t)
          })
        },
        off: function(e, t) {
          return this.each(function() {
            S.unbind(this, e, t)
          })
        },
        trigger: function(e) {
          return this.each(function() {
            "object" == typeof e ? S.fire(this, e.type, e) : S.fire(this, e)
          })
        },
        show: function() {
          return this.css("display", "")
        },
        hide: function() {
          return this.css("display", "none")
        },
        slice: function() {
          return new f(N.apply(this, arguments))
        },
        eq: function(e) {
          return -1 === e ? this.slice(e) : this.slice(e, +e + 1)
        },
        first: function() {
          return this.eq(0)
        },
        last: function() {
          return this.eq(-1)
        },
        find: function(e) {
          var t, n, r = [];
          for (t = 0, n = this.length; n > t; t++) f.find(e, this[t], r);
          return f(r)
        },
        filter: function(e) {
          return f("function" == typeof e ? g(this.toArray(), function(t, n) {
            return e(n, t)
          }) : f.filter(e, this.toArray()))
        },
        closest: function(e) {
          var t = [];
          return e instanceof f && (e = e[0]), this.each(function(n, r) {
            for (; r;) {
              if ("string" == typeof e && f(r).is(e)) {
                t.push(r);
                break
              }
              if (r == e) {
                t.push(r);
                break
              }
              r = r.parentNode
            }
          }), f(t)
        },
        offset: function(e) {
          var t, n, r, i = 0,
            o = 0,
            a;
          return e ? this.css(e) : (t = this[0], t && (n = t.ownerDocument, r = n.documentElement, t.getBoundingClientRect && (a = t.getBoundingClientRect(), i = a.left + (r.scrollLeft || n.body.scrollLeft) - r.clientLeft, o = a.top + (r.scrollTop || n.body.scrollTop) - r.clientTop)), {
            left: i,
            top: o
          })
        },
        push: E,
        sort: [].sort,
        splice: [].splice
      }, r.extend(f, {
        extend: r.extend,
        makeArray: function(e) {
          return s(e) || e.nodeType ? [e] : r.toArray(e)
        },
        inArray: h,
        isArray: r.isArray,
        each: m,
        trim: p,
        grep: g,
        find: n,
        expr: n.selectors,
        unique: n.uniqueSort,
        text: n.getText,
        contains: n.contains,
        filter: function(e, t, n) {
          var r = t.length;
          for (n && (e = ":not(" + e + ")"); r--;) 1 != t[r].nodeType && t.splice(r, 1);
          return t = 1 === t.length ? f.find.matchesSelector(t[0], e) ? [t[0]] : [] : f.find.matches(e, t)
        }
      }), m({
        parent: function(e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
          return y(e, "parentNode")
        },
        next: function(e) {
          return C(e, "nextSibling", 1)
        },
        prev: function(e) {
          return C(e, "previousSibling", 1)
        },
        children: function(e) {
          return b(e.firstChild, "nextSibling", 1)
        },
        contents: function(e) {
          return r.toArray(("iframe" === e.nodeName ? e.contentDocument || e.contentWindow.document : e).childNodes)
        }
      }, function(e, t) {
        f.fn[e] = function(n) {
          var r = this,
            i = [];
          return r.each(function() {
            var e = t.call(i, this, n, i);
            e && (f.isArray(e) ? i.push.apply(i, e) : i.push(e))
          }), this.length > 1 && (T[e] || (i = f.unique(i)), 0 === e.indexOf("parents") && (i = i.reverse())), i = f(i), n ? i.filter(n) : i
        }
      }), m({
        parentsUntil: function(e, t) {
          return y(e, "parentNode", t)
        },
        nextUntil: function(e, t) {
          return b(e, "nextSibling", 1, t).slice(1)
        },
        prevUntil: function(e, t) {
          return b(e, "previousSibling", 1, t).slice(1)
        }
      }, function(e, t) {
        f.fn[e] = function(n, r) {
          var i = this,
            o = [];
          return i.each(function() {
            var e = t.call(o, this, n, o);
            e && (f.isArray(e) ? o.push.apply(o, e) : o.push(e))
          }), this.length > 1 && (o = f.unique(o), (0 === e.indexOf("parents") || "prevUntil" === e) && (o = o.reverse())), o = f(o), r ? o.filter(r) : o
        }
      }), f.fn.is = function(e) {
        return !!e && this.filter(e).length > 0
      }, f.fn.init.prototype = f.fn, f.overrideDefaults = function(e) {
        function t(r, i) {
          return n = n || e(), 0 === arguments.length && (r = n.element), i || (i = n.context), new t.fn.init(r, i)
        }
        var n;
        return f.extend(t, this), t
      }, i.ie && i.ie < 8 && (x(M, "get", {
        maxlength: function(e) {
          var t = e.maxLength;
          return 2147483647 === t ? k : t
        },
        size: function(e) {
          var t = e.size;
          return 20 === t ? k : t
        },
        "class": function(e) {
          return e.className
        },
        style: function(e) {
          var t = e.style.cssText;
          return 0 === t.length ? k : t
        }
      }), x(M, "set", {
        "class": function(e, t) {
          e.className = t
        },
        style: function(e, t) {
          e.style.cssText = t
        }
      })), i.ie && i.ie < 9 && (D["float"] = "styleFloat", x(L, "set", {
        opacity: function(e, t) {
          var n = e.style;
          null === t || "" === t ? n.removeAttribute("filter") : (n.zoom = 1, n.filter = "alpha(opacity=" + 100 * t + ")")
        }
      })), f.attrHooks = M, f.cssHooks = L, f
    }), r(v, [], function() {
      return function(e, t) {
        function n(e, t, n, r) {
          function i(e) {
            return e = parseInt(e, 10).toString(16), e.length > 1 ? e : "0" + e
          }
          return "#" + i(t) + i(n) + i(r)
        }
        var r = /rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,
          i = /(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,
          o = /\s*([^:]+):\s*([^;]+);?/g,
          a = /\s+$/,
          s, l, c = {},
          u, d, f, h = "\ufeff";
        for (e = e || {}, t && (d = t.getValidStyles(), f = t.getInvalidStyles()), u = ("\\\" \\' \\; \\: ; : " + h).split(" "), l = 0; l < u.length; l++) c[u[l]] = h + l, c[h + l] = u[l];
        return {
          toHex: function(e) {
            return e.replace(r, n)
          },
          parse: function(t) {
            function s(e, t, n) {
              var r, i, o, a;
              if (r = m[e + "-top" + t], r && (i = m[e + "-right" + t], i && (o = m[e + "-bottom" + t], o && (a = m[e + "-left" + t])))) {
                var s = [r, i, o, a];
                for (l = s.length - 1; l-- && s[l] === s[l + 1];);
                l > -1 && n || (m[e + t] = -1 == l ? s[0] : s.join(" "), delete m[e + "-top" + t], delete m[e + "-right" + t], delete m[e + "-bottom" + t], delete m[e + "-left" + t])
              }
            }

            function u(e) {
              var t = m[e],
                n;
              if (t) {
                for (t = t.split(" "), n = t.length; n--;)
                  if (t[n] !== t[0]) return !1;
                return m[e] = t[0], !0
              }
            }

            function d(e, t, n, r) {
              u(t) && u(n) && u(r) && (m[e] = m[t] + " " + m[n] + " " + m[r], delete m[t], delete m[n], delete m[r])
            }

            function f(e) {
              return b = !0, c[e]
            }

            function h(e, t) {
              return b && (e = e.replace(/\uFEFF[0-9]/g, function(e) {
                return c[e]
              })), t || (e = e.replace(/\\([\'\";:])/g, "$1")), e
            }

            function p(t, n, r, i, o, a) {
              if (o = o || a) return o = h(o), "'" + o.replace(/\'/g, "\\'") + "'";
              if (n = h(n || r || i), !e.allow_script_urls) {
                var s = n.replace(/[\s\r\n]+/, "");
                if (/(java|vb)script:/i.test(s)) return "";
                if (!e.allow_svg_data_urls && /^data:image\/svg/i.test(s)) return ""
              }
              return C && (n = C.call(x, n, "style")), "url('" + n.replace(/\'/g, "\\'") + "')"
            }
            var m = {},
              g, v, y, b, C = e.url_converter,
              x = e.url_converter_scope || this;
            if (t) {
              for (t = t.replace(/[\u0000-\u001F]/g, ""), t = t.replace(/\\[\"\';:\uFEFF]/g, f).replace(/\"[^\"]+\"|\'[^\']+\'/g, function(e) {
                  return e.replace(/[;:]/g, f)
                }); g = o.exec(t);) {
                if (v = g[1].replace(a, "").toLowerCase(), y = g[2].replace(a, ""), y = y.replace(/\\[0-9a-f]+/g, function(e) {
                    return String.fromCharCode(parseInt(e.substr(1), 16))
                  }), v && y.length > 0) {
                  if (!e.allow_script_urls && ("behavior" == v || /expression\s*\(|\/\*|\*\//.test(y))) continue;
                  "font-weight" === v && "700" === y ? y = "bold" : ("color" === v || "background-color" === v) && (y = y.toLowerCase()), y = y.replace(r, n), y = y.replace(i, p), m[v] = b ? h(y, !0) : y
                }
                o.lastIndex = g.index + g[0].length
              }
              s("border", "", !0), s("border", "-width"), s("border", "-color"), s("border", "-style"), s("padding", ""), s("margin", ""), d("border", "border-width", "border-style", "border-color"), "medium none" === m.border && delete m.border, "none" === m["border-image"] && delete m["border-image"]
            }
            return m
          },
          serialize: function(e, t) {
            function n(t) {
              var n, r, o, a;
              if (n = d[t])
                for (r = 0, o = n.length; o > r; r++) t = n[r], a = e[t], a !== s && a.length > 0 && (i += (i.length > 0 ? " " : "") + t + ": " + a + ";")
            }

            function r(e, t) {
              var n;
              return n = f["*"], n && n[e] ? !1 : (n = f[t], n && n[e] ? !1 : !0)
            }
            var i = "",
              o, a;
            if (t && d) n("*"), n(t);
            else
              for (o in e) a = e[o], a !== s && a.length > 0 && (!f || r(o, t)) && (i += (i.length > 0 ? " " : "") + o + ": " + a + ";");
            return i
          }
        }
      }
    }), r(y, [], function() {
      return function(e, t) {
        function n(e, n, r, i) {
          var o, a;
          if (e) {
            if (!i && e[n]) return e[n];
            if (e != t) {
              if (o = e[r]) return o;
              for (a = e.parentNode; a && a != t; a = a.parentNode)
                if (o = a[r]) return o
            }
          }
        }
        var r = e;
        this.current = function() {
          return r
        }, this.next = function(e) {
          return r = n(r, "firstChild", "nextSibling", e)
        }, this.prev = function(e) {
          return r = n(r, "lastChild", "previousSibling", e)
        }
      }
    }), r(b, [m], function(e) {
      function t(n) {
        function r() {
          return P.createDocumentFragment()
        }

        function i(e, t) {
          E(F, e, t)
        }

        function o(e, t) {
          E(z, e, t)
        }

        function a(e) {
          i(e.parentNode, j(e))
        }

        function s(e) {
          i(e.parentNode, j(e) + 1)
        }

        function l(e) {
          o(e.parentNode, j(e))
        }

        function c(e) {
          o(e.parentNode, j(e) + 1)
        }

        function u(e) {
          e ? (L[U] = L[V], L[$] = L[W]) : (L[V] = L[U], L[W] = L[$]), L.collapsed = F
        }

        function d(e) {
          a(e), c(e)
        }

        function f(e) {
          i(e, 0), o(e, 1 === e.nodeType ? e.childNodes.length : e.nodeValue.length)
        }

        function h(e, t) {
          var n = L[V],
            r = L[W],
            i = L[U],
            o = L[$],
            a = t.startContainer,
            s = t.startOffset,
            l = t.endContainer,
            c = t.endOffset;
          return 0 === e ? w(n, r, a, s) : 1 === e ? w(i, o, a, s) : 2 === e ? w(i, o, l, c) : 3 === e ? w(n, r, l, c) : void 0
        }

        function p() {
          N(I)
        }

        function m() {
          return N(H)
        }

        function g() {
          return N(O)
        }

        function v(e) {
          var t = this[V],
            r = this[W],
            i, o;
          3 !== t.nodeType && 4 !== t.nodeType || !t.nodeValue ? (t.childNodes.length > 0 && (o = t.childNodes[r]), o ? t.insertBefore(e, o) : 3 == t.nodeType ? n.insertAfter(e, t) : t.appendChild(e)) : r ? r >= t.nodeValue.length ? n.insertAfter(e, t) : (i = t.splitText(r), t.parentNode.insertBefore(e, i)) : t.parentNode.insertBefore(e, t)
        }

        function y(e) {
          var t = L.extractContents();
          L.insertNode(e), e.appendChild(t), L.selectNode(e)
        }

        function b() {
          return q(new t(n), {
            startContainer: L[V],
            startOffset: L[W],
            endContainer: L[U],
            endOffset: L[$],
            collapsed: L.collapsed,
            commonAncestorContainer: L.commonAncestorContainer
          })
        }

        function C(e, t) {
          var n;
          if (3 == e.nodeType) return e;
          if (0 > t) return e;
          for (n = e.firstChild; n && t > 0;) --t, n = n.nextSibling;
          return n ? n : e
        }

        function x() {
          return L[V] == L[U] && L[W] == L[$]
        }

        function w(e, t, r, i) {
          var o, a, s, l, c, u;
          if (e == r) return t == i ? 0 : i > t ? -1 : 1;
          for (o = r; o && o.parentNode != e;) o = o.parentNode;
          if (o) {
            for (a = 0, s = e.firstChild; s != o && t > a;) a++, s = s.nextSibling;
            return a >= t ? -1 : 1
          }
          for (o = e; o && o.parentNode != r;) o = o.parentNode;
          if (o) {
            for (a = 0, s = r.firstChild; s != o && i > a;) a++, s = s.nextSibling;
            return i > a ? -1 : 1
          }
          for (l = n.findCommonAncestor(e, r), c = e; c && c.parentNode != l;) c = c.parentNode;
          for (c || (c = l), u = r; u && u.parentNode != l;) u = u.parentNode;
          if (u || (u = l), c == u) return 0;
          for (s = l.firstChild; s;) {
            if (s == c) return -1;
            if (s == u) return 1;
            s = s.nextSibling
          }
        }

        function E(e, t, r) {
          var i, o;
          for (e ? (L[V] = t, L[W] = r) : (L[U] = t, L[$] = r), i = L[U]; i.parentNode;) i = i.parentNode;
          for (o = L[V]; o.parentNode;) o = o.parentNode;
          o == i ? w(L[V], L[W], L[U], L[$]) > 0 && L.collapse(e) : L.collapse(e), L.collapsed = x(), L.commonAncestorContainer = n.findCommonAncestor(L[V], L[U])
        }

        function N(e) {
          var t, n = 0,
            r = 0,
            i, o, a, s, l, c;
          if (L[V] == L[U]) return _(e);
          for (t = L[U], i = t.parentNode; i; t = i, i = i.parentNode) {
            if (i == L[V]) return S(t, e);
            ++n
          }
          for (t = L[V], i = t.parentNode; i; t = i, i = i.parentNode) {
            if (i == L[U]) return k(t, e);
            ++r
          }
          for (o = r - n, a = L[V]; o > 0;) a = a.parentNode, o--;
          for (s = L[U]; 0 > o;) s = s.parentNode, o++;
          for (l = a.parentNode, c = s.parentNode; l != c; l = l.parentNode, c = c.parentNode) a = l, s = c;
          return T(a, s, e)
        }

        function _(e) {
          var t, n, i, o, a, s, l, c, u;
          if (e != I && (t = r()), L[W] == L[$]) return t;
          if (3 == L[V].nodeType) {
            if (n = L[V].nodeValue, i = n.substring(L[W], L[$]), e != O && (o = L[V], c = L[W], u = L[$] - L[W], 0 === c && u >= o.nodeValue.length - 1 ? o.parentNode.removeChild(o) : o.deleteData(c, u), L.collapse(F)), e == I) return;
            return i.length > 0 && t.appendChild(P.createTextNode(i)), t
          }
          for (o = C(L[V], L[W]), a = L[$] - L[W]; o && a > 0;) s = o.nextSibling, l = D(o, e), t && t.appendChild(l), --a, o = s;
          return e != O && L.collapse(F), t
        }

        function S(e, t) {
          var n, i, o, a, s, l;
          if (t != I && (n = r()), i = R(e, t), n && n.appendChild(i), o = j(e), a = o - L[W], 0 >= a) return t != O && (L.setEndBefore(e), L.collapse(z)), n;
          for (i = e.previousSibling; a > 0;) s = i.previousSibling, l = D(i, t), n && n.insertBefore(l, n.firstChild), --a, i = s;
          return t != O && (L.setEndBefore(e), L.collapse(z)), n
        }

        function k(e, t) {
          var n, i, o, a, s, l;
          for (t != I && (n = r()), o = A(e, t), n && n.appendChild(o), i = j(e), ++i, a = L[$] - i, o = e.nextSibling; o && a > 0;) s = o.nextSibling, l = D(o, t), n && n.appendChild(l), --a, o = s;
          return t != O && (L.setStartAfter(e), L.collapse(F)), n
        }

        function T(e, t, n) {
          var i, o, a, s, l, c, u;
          for (n != I && (o = r()), i = A(e, n), o && o.appendChild(i), a = j(e), s = j(t), ++a, l = s - a, c = e.nextSibling; l > 0;) u = c.nextSibling, i = D(c, n), o && o.appendChild(i), c = u, --l;
          return i = R(t, n), o && o.appendChild(i), n != O && (L.setStartAfter(e), L.collapse(F)), o
        }

        function R(e, t) {
          var n = C(L[U], L[$] - 1),
            r, i, o, a, s, l = n != L[U];
          if (n == e) return B(n, l, z, t);
          for (r = n.parentNode, i = B(r, z, z, t); r;) {
            for (; n;) o = n.previousSibling, a = B(n, l, z, t), t != I && i.insertBefore(a, i.firstChild), l = F, n = o;
            if (r == e) return i;
            n = r.previousSibling, r = r.parentNode, s = B(r, z, z, t), t != I && s.appendChild(i), i = s
          }
        }

        function A(e, t) {
          var n = C(L[V], L[W]),
            r = n != L[V],
            i, o, a, s, l;
          if (n == e) return B(n, r, F, t);
          for (i = n.parentNode, o = B(i, z, F, t); i;) {
            for (; n;) a = n.nextSibling, s = B(n, r, F, t), t != I && o.appendChild(s), r = F, n = a;
            if (i == e) return o;
            n = i.nextSibling, i = i.parentNode, l = B(i, z, F, t), t != I && l.appendChild(o), o = l
          }
        }

        function B(e, t, r, i) {
          var o, a, s, l, c;
          if (t) return D(e, i);
          if (3 == e.nodeType) {
            if (o = e.nodeValue, r ? (l = L[W], a = o.substring(l), s = o.substring(0, l)) : (l = L[$], a = o.substring(0, l), s = o.substring(l)), i != O && (e.nodeValue = s), i == I) return;
            return c = n.clone(e, z), c.nodeValue = a, c
          }
          if (i != I) return n.clone(e, z)
        }

        function D(e, t) {
          return t != I ? t == O ? n.clone(e, F) : e : void e.parentNode.removeChild(e)
        }

        function M() {
          return n.create("body", null, g()).outerText
        }
        var L = this,
          P = n.doc,
          H = 0,
          O = 1,
          I = 2,
          F = !0,
          z = !1,
          W = "startOffset",
          V = "startContainer",
          U = "endContainer",
          $ = "endOffset",
          q = e.extend,
          j = n.nodeIndex;
        return q(L, {
          startContainer: P,
          startOffset: 0,
          endContainer: P,
          endOffset: 0,
          collapsed: F,
          commonAncestorContainer: P,
          START_TO_START: 0,
          START_TO_END: 1,
          END_TO_END: 2,
          END_TO_START: 3,
          setStart: i,
          setEnd: o,
          setStartBefore: a,
          setStartAfter: s,
          setEndBefore: l,
          setEndAfter: c,
          collapse: u,
          selectNode: d,
          selectNodeContents: f,
          compareBoundaryPoints: h,
          deleteContents: p,
          extractContents: m,
          cloneContents: g,
          insertNode: v,
          surroundContents: y,
          cloneRange: b,
          toStringIE: M
        }), L
      }
      return t.prototype.toString = function() {
        return this.toStringIE()
      }, t
    }), r(C, [m], function(e) {
      function t(e) {
        var t;
        return t = document.createElement("div"), t.innerHTML = e, t.textContent || t.innerText || e
      }

      function n(e, t) {
        var n, r, i, a = {};
        if (e) {
          for (e = e.split(","), t = t || 10, n = 0; n < e.length; n += 2) r = String.fromCharCode(parseInt(e[n], t)), o[r] || (i = "&" + e[n + 1] + ";", a[r] = i, a[i] = r);
          return a
        }
      }
      var r = e.makeMap,
        i, o, a, s = /[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        l = /[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        c = /[<>&\"\']/g,
        u = /&#([a-z0-9]+);?|&([a-z0-9]+);/gi,
        d = {
          128: "\u20ac",
          130: "\u201a",
          131: "\u0192",
          132: "\u201e",
          133: "\u2026",
          134: "\u2020",
          135: "\u2021",
          136: "\u02c6",
          137: "\u2030",
          138: "\u0160",
          139: "\u2039",
          140: "\u0152",
          142: "\u017d",
          145: "\u2018",
          146: "\u2019",
          147: "\u201c",
          148: "\u201d",
          149: "\u2022",
          150: "\u2013",
          151: "\u2014",
          152: "\u02dc",
          153: "\u2122",
          154: "\u0161",
          155: "\u203a",
          156: "\u0153",
          158: "\u017e",
          159: "\u0178"
        };
      o = {
        '"': "&quot;",
        "'": "&#39;",
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "`": "&#96;"
      }, a = {
        "&lt;": "<",
        "&gt;": ">",
        "&amp;": "&",
        "&quot;": '"',
        "&apos;": "'"
      }, i = n("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro", 32);
      var f = {
        encodeRaw: function(e, t) {
          return e.replace(t ? s : l, function(e) {
            return o[e] || e
          })
        },
        encodeAllRaw: function(e) {
          return ("" + e).replace(c, function(e) {
            return o[e] || e
          })
        },
        encodeNumeric: function(e, t) {
          return e.replace(t ? s : l, function(e) {
            return e.length > 1 ? "&#" + (1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320) + 65536) + ";" : o[e] || "&#" + e.charCodeAt(0) + ";"
          })
        },
        encodeNamed: function(e, t, n) {
          return n = n || i, e.replace(t ? s : l, function(e) {
            return o[e] || n[e] || e
          })
        },
        getEncodeFunc: function(e, t) {
          function a(e, n) {
            return e.replace(n ? s : l, function(e) {
              return o[e] || t[e] || "&#" + e.charCodeAt(0) + ";" || e
            })
          }

          function c(e, n) {
            return f.encodeNamed(e, n, t)
          }
          return t = n(t) || i, e = r(e.replace(/\+/g, ",")), e.named && e.numeric ? a : e.named ? t ? c : f.encodeNamed : e.numeric ? f.encodeNumeric : f.encodeRaw
        },
        decode: function(e) {
          return e.replace(u, function(e, n) {
            return n ? (n = "x" === n.charAt(0).toLowerCase() ? parseInt(n.substr(1), 16) : parseInt(n, 10), n > 65535 ? (n -= 65536, String.fromCharCode(55296 + (n >> 10), 56320 + (1023 & n))) : d[n] || String.fromCharCode(n)) : a[e] || i[e] || t(e)
          })
        }
      };
      return f
    }), r(x, [m, u], function(e, t) {
      return function(n, r) {
        function i(e) {
          n.getElementsByTagName("head")[0].appendChild(e)
        }

        function o(r, o, c) {
          function u() {
            for (var e = b.passed, t = e.length; t--;) e[t]();
            b.status = 2, b.passed = [], b.failed = []
          }

          function d() {
            for (var e = b.failed, t = e.length; t--;) e[t]();
            b.status = 3, b.passed = [], b.failed = []
          }

          function f() {
            var e = navigator.userAgent.match(/WebKit\/(\d*)/);
            return !!(e && e[1] < 536)
          }

          function h(e, n) {
            e() || ((new Date).getTime() - y < l ? t.setTimeout(n) : d())
          }

          function p() {
            h(function() {
              for (var e = n.styleSheets, t, r = e.length, i; r--;)
                if (t = e[r], i = t.ownerNode ? t.ownerNode : t.owningElement, i && i.id === g.id) return u(), !0
            }, p)
          }

          function m() {
            h(function() {
              try {
                var e = v.sheet.cssRules;
                return u(), !!e
              } catch (t) {}
            }, m)
          }
          var g, v, y, b;
          if (r = e._addCacheSuffix(r), s[r] ? b = s[r] : (b = {
              passed: [],
              failed: []
            }, s[r] = b), o && b.passed.push(o), c && b.failed.push(c), 1 != b.status) {
            if (2 == b.status) return void u();
            if (3 == b.status) return void d();
            if (b.status = 1, g = n.createElement("link"), g.rel = "stylesheet", g.type = "text/css", g.id = "u" + a++, g.async = !1, g.defer = !1, y = (new Date).getTime(), "onload" in g && !f()) g.onload = p, g.onerror = d;
            else {
              if (navigator.userAgent.indexOf("Firefox") > 0) return v = n.createElement("style"), v.textContent = '@import "' + r + '"', m(), void i(v);
              p()
            }
            i(g), g.href = r
          }
        }
        var a = 0,
          s = {},
          l;
        r = r || {}, l = r.maxLoadTime || 5e3, this.load = o
      }
    }), r(w, [f, g, v, d, y, b, C, h, m, x], function(e, n, r, i, o, a, s, l, c, u) {
      function d(e, t) {
        var n = {},
          r = t.keep_values,
          i;
        return i = {
          set: function(n, r, i) {
            t.url_converter && (r = t.url_converter.call(t.url_converter_scope || e, r, i, n[0])), n.attr("data-mce-" + i, r).attr(i, r)
          },
          get: function(e, t) {
            return e.attr("data-mce-" + t) || e.attr(t)
          }
        }, n = {
          style: {
            set: function(e, t) {
              return null !== t && "object" == typeof t ? void e.css(t) : (r && e.attr("data-mce-style", t), void e.attr("style", t))
            },
            get: function(t) {
              var n = t.attr("data-mce-style") || t.attr("style");
              return n = e.serializeStyle(e.parseStyle(n), t[0].nodeName)
            }
          }
        }, r && (n.href = n.src = i), n
      }

      function f(e, t) {
        var n = t.attr("style");
        n = e.serializeStyle(e.parseStyle(n), t[0].nodeName), n || (n = null), t.attr("data-mce-style", n)
      }

      function h(e, t) {
        var n = 0,
          r, i;
        if (e)
          for (r = e.nodeType, e = e.previousSibling; e; e = e.previousSibling) i = e.nodeType, (!t || 3 != i || i != r && e.nodeValue.length) && (n++, r = i);
        return n
      }

      function p(e, t) {
        var o = this,
          a;
        o.doc = e, o.win = window, o.files = {}, o.counter = 0, o.stdMode = !b || e.documentMode >= 8, o.boxModel = !b || "CSS1Compat" == e.compatMode || o.stdMode, o.styleSheetLoader = new u(e), o.boundEvents = [], o.settings = t = t || {}, o.schema = t.schema, o.styles = new r({
          url_converter: t.url_converter,
          url_converter_scope: t.url_converter_scope
        }, t.schema), o.fixDoc(e), o.events = t.ownEvents ? new i(t.proxy) : i.Event, o.attrHooks = d(o, t), a = t.schema ? t.schema.getBlockElements() : {}, o.$ = n.overrideDefaults(function() {
          return {
            context: e,
            element: o.getRoot()
          }
        }), o.isBlock = function(e) {
          if (!e) return !1;
          var t = e.nodeType;
          return t ? !(1 !== t || !a[e.nodeName]) : !!a[e]
        }
      }
      var m = c.each,
        g = c.is,
        v = c.grep,
        y = c.trim,
        b = l.ie,
        C = /^([a-z0-9],?)+$/i,
        x = /^[ \t\r\n]*$/;
      return p.prototype = {
        $$: function(e) {
          return "string" == typeof e && (e = this.get(e)), this.$(e)
        },
        root: null,
        fixDoc: function(e) {
          var t = this.settings,
            n;
          if (b && t.schema) {
            "abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video".replace(/\w+/g, function(t) {
              e.createElement(t)
            });
            for (n in t.schema.getCustomElements()) e.createElement(n)
          }
        },
        clone: function(e, t) {
          var n = this,
            r, i;
          return !b || 1 !== e.nodeType || t ? e.cloneNode(t) : (i = n.doc, t ? r.firstChild : (r = i.createElement(e.nodeName), m(n.getAttribs(e), function(t) {
            n.setAttrib(r, t.nodeName, n.getAttrib(e, t.nodeName))
          }), r))
        },
        getRoot: function() {
          var e = this;
          return e.settings.root_element || e.doc.body
        },
        getViewPort: function(e) {
          var t, n;
          return e = e ? e : this.win, t = e.document, n = this.boxModel ? t.documentElement : t.body, {
            x: e.pageXOffset || n.scrollLeft,
            y: e.pageYOffset || n.scrollTop,
            w: e.innerWidth || n.clientWidth,
            h: e.innerHeight || n.clientHeight
          }
        },
        getRect: function(e) {
          var t = this,
            n, r;
          return e = t.get(e), n = t.getPos(e), r = t.getSize(e), {
            x: n.x,
            y: n.y,
            w: r.w,
            h: r.h
          }
        },
        getSize: function(e) {
          var t = this,
            n, r;
          return e = t.get(e), n = t.getStyle(e, "width"), r = t.getStyle(e, "height"), -1 === n.indexOf("px") && (n = 0), -1 === r.indexOf("px") && (r = 0), {
            w: parseInt(n, 10) || e.offsetWidth || e.clientWidth,
            h: parseInt(r, 10) || e.offsetHeight || e.clientHeight
          }
        },
        getParent: function(e, t, n) {
          return this.getParents(e, t, n, !1)
        },
        getParents: function(e, n, r, i) {
          var o = this,
            a, s = [];
          for (e = o.get(e), i = i === t, r = r || ("BODY" != o.getRoot().nodeName ? o.getRoot().parentNode : null), g(n, "string") && (a = n, n = "*" === n ? function(e) {
              return 1 == e.nodeType
            } : function(e) {
              return o.is(e, a)
            }); e && e != r && e.nodeType && 9 !== e.nodeType;) {
            if (!n || n(e)) {
              if (!i) return e;
              s.push(e)
            }
            e = e.parentNode
          }
          return i ? s : null
        },
        get: function(e) {
          var t;
          return e && this.doc && "string" == typeof e && (t = e, e = this.doc.getElementById(e), e && e.id !== t) ? this.doc.getElementsByName(t)[1] : e
        },
        getNext: function(e, t) {
          return this._findSib(e, t, "nextSibling")
        },
        getPrev: function(e, t) {
          return this._findSib(e, t, "previousSibling")
        },
        select: function(t, n) {
          var r = this;
          return e(t, r.get(n) || r.settings.root_element || r.doc, [])
        },
        is: function(n, r) {
          var i;
          if (n.length === t) {
            if ("*" === r) return 1 == n.nodeType;
            if (C.test(r)) {
              for (r = r.toLowerCase().split(/,/), n = n.nodeName.toLowerCase(), i = r.length - 1; i >= 0; i--)
                if (r[i] == n) return !0;
              return !1
            }
          }
          if (n.nodeType && 1 != n.nodeType) return !1;
          var o = n.nodeType ? [n] : n;
          return e(r, o[0].ownerDocument || o[0], null, o).length > 0;
        },
        add: function(e, t, n, r, i) {
          var o = this;
          return this.run(e, function(e) {
            var a;
            return a = g(t, "string") ? o.doc.createElement(t) : t, o.setAttribs(a, n), r && (r.nodeType ? a.appendChild(r) : o.setHTML(a, r)), i ? a : e.appendChild(a)
          })
        },
        create: function(e, t, n) {
          return this.add(this.doc.createElement(e), e, t, n, 1)
        },
        createHTML: function(e, t, n) {
          var r = "",
            i;
          r += "<" + e;
          for (i in t) t.hasOwnProperty(i) && null !== t[i] && "undefined" != typeof t[i] && (r += " " + i + '="' + this.encode(t[i]) + '"');
          return "undefined" != typeof n ? r + ">" + n + "</" + e + ">" : r + " />"
        },
        createFragment: function(e) {
          var t, n, r = this.doc,
            i;
          for (i = r.createElement("div"), t = r.createDocumentFragment(), e && (i.innerHTML = e); n = i.firstChild;) t.appendChild(n);
          return t
        },
        remove: function(e, t) {
          return e = this.$$(e), t ? e.each(function() {
            for (var e; e = this.firstChild;) 3 == e.nodeType && 0 === e.data.length ? this.removeChild(e) : this.parentNode.insertBefore(e, this)
          }).remove() : e.remove(), e.length > 1 ? e.toArray() : e[0]
        },
        setStyle: function(e, t, n) {
          e = this.$$(e).css(t, n), this.settings.update_styles && f(this, e)
        },
        getStyle: function(e, n, r) {
          return e = this.$$(e), r ? e.css(n) : (n = n.replace(/-(\D)/g, function(e, t) {
            return t.toUpperCase()
          }), "float" == n && (n = l.ie && l.ie < 12 ? "styleFloat" : "cssFloat"), e[0] && e[0].style ? e[0].style[n] : t)
        },
        setStyles: function(e, t) {
          e = this.$$(e).css(t), this.settings.update_styles && f(this, e)
        },
        removeAllAttribs: function(e) {
          return this.run(e, function(e) {
            var t, n = e.attributes;
            for (t = n.length - 1; t >= 0; t--) e.removeAttributeNode(n.item(t))
          })
        },
        setAttrib: function(e, t, n) {
          var r = this,
            i, o, a = r.settings;
          "" === n && (n = null), e = r.$$(e), i = e.attr(t), e.length && (o = r.attrHooks[t], o && o.set ? o.set(e, n, t) : e.attr(t, n), i != n && a.onSetAttrib && a.onSetAttrib({
            attrElm: e,
            attrName: t,
            attrValue: n
          }))
        },
        setAttribs: function(e, t) {
          var n = this;
          n.$$(e).each(function(e, r) {
            m(t, function(e, t) {
              n.setAttrib(r, t, e)
            })
          })
        },
        getAttrib: function(e, t, n) {
          var r = this,
            i, o;
          return e = r.$$(e), e.length && (i = r.attrHooks[t], o = i && i.get ? i.get(e, t) : e.attr(t)), "undefined" == typeof o && (o = n || ""), o
        },
        getPos: function(e, t) {
          var r = this,
            i = 0,
            o = 0,
            a, s = r.doc,
            l = s.body,
            c;
          if (e = r.get(e), t = t || l, e) {
            if (t === l && e.getBoundingClientRect && "static" === n(l).css("position")) return c = e.getBoundingClientRect(), t = r.boxModel ? s.documentElement : l, i = c.left + (s.documentElement.scrollLeft || l.scrollLeft) - t.clientLeft, o = c.top + (s.documentElement.scrollTop || l.scrollTop) - t.clientTop, {
              x: i,
              y: o
            };
            for (a = e; a && a != t && a.nodeType;) i += a.offsetLeft || 0, o += a.offsetTop || 0, a = a.offsetParent;
            for (a = e.parentNode; a && a != t && a.nodeType;) i -= a.scrollLeft || 0, o -= a.scrollTop || 0, a = a.parentNode
          }
          return {
            x: i,
            y: o
          }
        },
        parseStyle: function(e) {
          return this.styles.parse(e)
        },
        serializeStyle: function(e, t) {
          return this.styles.serialize(e, t)
        },
        addStyle: function(e) {
          var t = this,
            n = t.doc,
            r, i;
          if (t !== p.DOM && n === document) {
            var o = p.DOM.addedStyles;
            if (o = o || [], o[e]) return;
            o[e] = !0, p.DOM.addedStyles = o
          }
          i = n.getElementById("mceDefaultStyles"), i || (i = n.createElement("style"), i.id = "mceDefaultStyles", i.type = "text/css", r = n.getElementsByTagName("head")[0], r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i)), i.styleSheet ? i.styleSheet.cssText += e : i.appendChild(n.createTextNode(e))
        },
        loadCSS: function(e) {
          var t = this,
            n = t.doc,
            r;
          return t !== p.DOM && n === document ? void p.DOM.loadCSS(e) : (e || (e = ""), r = n.getElementsByTagName("head")[0], void m(e.split(","), function(e) {
            var i;
            e = c._addCacheSuffix(e), t.files[e] || (t.files[e] = !0, i = t.create("link", {
              rel: "stylesheet",
              href: e
            }), b && n.documentMode && n.recalc && (i.onload = function() {
              n.recalc && n.recalc(), i.onload = null
            }), r.appendChild(i))
          }))
        },
        addClass: function(e, t) {
          this.$$(e).addClass(t)
        },
        removeClass: function(e, t) {
          this.toggleClass(e, t, !1)
        },
        hasClass: function(e, t) {
          return this.$$(e).hasClass(t)
        },
        toggleClass: function(e, t, r) {
          this.$$(e).toggleClass(t, r).each(function() {
            "" === this.className && n(this).attr("class", null)
          })
        },
        show: function(e) {
          this.$$(e).show()
        },
        hide: function(e) {
          this.$$(e).hide()
        },
        isHidden: function(e) {
          return "none" == this.$$(e).css("display")
        },
        uniqueId: function(e) {
          return (e ? e : "mce_") + this.counter++
        },
        setHTML: function(e, t) {
          e = this.$$(e), b ? e.each(function(e, r) {
            if (r.canHaveHTML !== !1) {
              for (; r.firstChild;) r.removeChild(r.firstChild);
              try {
                r.innerHTML = "<br>" + t, r.removeChild(r.firstChild)
              } catch (i) {
                n("<div>").html("<br>" + t).contents().slice(1).appendTo(r)
              }
              return t
            }
          }) : e.html(t)
        },
        getOuterHTML: function(e) {
          return e = this.get(e), 1 == e.nodeType && "outerHTML" in e ? e.outerHTML : n("<div>").append(n(e).clone()).html()
        },
        setOuterHTML: function(e, t) {
          var r = this;
          r.$$(e).each(function() {
            try {
              if ("outerHTML" in this) return void(this.outerHTML = t)
            } catch (e) {}
            r.remove(n(this).html(t), !0)
          })
        },
        decode: s.decode,
        encode: s.encodeAllRaw,
        insertAfter: function(e, t) {
          return t = this.get(t), this.run(e, function(e) {
            var n, r;
            return n = t.parentNode, r = t.nextSibling, r ? n.insertBefore(e, r) : n.appendChild(e), e
          })
        },
        replace: function(e, t, n) {
          var r = this;
          return r.run(t, function(t) {
            return g(t, "array") && (e = e.cloneNode(!0)), n && m(v(t.childNodes), function(t) {
              e.appendChild(t)
            }), t.parentNode.replaceChild(e, t)
          })
        },
        rename: function(e, t) {
          var n = this,
            r;
          return e.nodeName != t.toUpperCase() && (r = n.create(t), m(n.getAttribs(e), function(t) {
            n.setAttrib(r, t.nodeName, n.getAttrib(e, t.nodeName))
          }), n.replace(r, e, 1)), r || e
        },
        findCommonAncestor: function(e, t) {
          for (var n = e, r; n;) {
            for (r = t; r && n != r;) r = r.parentNode;
            if (n == r) break;
            n = n.parentNode
          }
          return !n && e.ownerDocument ? e.ownerDocument.documentElement : n
        },
        toHex: function(e) {
          return this.styles.toHex(c.trim(e))
        },
        run: function(e, t, n) {
          var r = this,
            i;
          return "string" == typeof e && (e = r.get(e)), e ? (n = n || this, e.nodeType || !e.length && 0 !== e.length ? t.call(n, e) : (i = [], m(e, function(e, o) {
            e && ("string" == typeof e && (e = r.get(e)), i.push(t.call(n, e, o)))
          }), i)) : !1
        },
        getAttribs: function(e) {
          var t;
          if (e = this.get(e), !e) return [];
          if (b) {
            if (t = [], "OBJECT" == e.nodeName) return e.attributes;
            "OPTION" === e.nodeName && this.getAttrib(e, "selected") && t.push({
              specified: 1,
              nodeName: "selected"
            });
            var n = /<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi;
            return e.cloneNode(!1).outerHTML.replace(n, "").replace(/[\w:\-]+/gi, function(e) {
              t.push({
                specified: 1,
                nodeName: e
              })
            }), t
          }
          return e.attributes
        },
        isEmpty: function(e, t) {
          var n = this,
            r, i, a, s, l, c = 0;
          if (e = e.firstChild) {
            s = new o(e, e.parentNode), t = t || (n.schema ? n.schema.getNonEmptyElements() : null);
            do {
              if (a = e.nodeType, 1 === a) {
                if (e.getAttribute("data-mce-bogus")) continue;
                if (l = e.nodeName.toLowerCase(), t && t[l]) {
                  if ("br" === l) {
                    c++;
                    continue
                  }
                  return !1
                }
                for (i = n.getAttribs(e), r = i.length; r--;)
                  if (l = i[r].nodeName, "name" === l || "data-mce-bookmark" === l) return !1
              }
              if (8 == a) return !1;
              if (3 === a && !x.test(e.nodeValue)) return !1
            } while (e = s.next())
          }
          return 1 >= c
        },
        createRng: function() {
          var e = this.doc;
          return e.createRange ? e.createRange() : new a(this)
        },
        nodeIndex: h,
        split: function(e, t, n) {
          function r(e) {
            function t(e) {
              var t = e.previousSibling && "SPAN" == e.previousSibling.nodeName,
                n = e.nextSibling && "SPAN" == e.nextSibling.nodeName;
              return t && n
            }
            var n, o = e.childNodes,
              a = e.nodeType;
            if (1 != a || "bookmark" != e.getAttribute("data-mce-type")) {
              for (n = o.length - 1; n >= 0; n--) r(o[n]);
              if (9 != a) {
                if (3 == a && e.nodeValue.length > 0) {
                  var s = y(e.nodeValue).length;
                  if (!i.isBlock(e.parentNode) || s > 0 || 0 === s && t(e)) return
                } else if (1 == a && (o = e.childNodes, 1 == o.length && o[0] && 1 == o[0].nodeType && "bookmark" == o[0].getAttribute("data-mce-type") && e.parentNode.insertBefore(o[0], e), o.length || /^(br|hr|input|img)$/i.test(e.nodeName))) return;
                i.remove(e)
              }
              return e
            }
          }
          var i = this,
            o = i.createRng(),
            a, s, l;
          return e && t ? (o.setStart(e.parentNode, i.nodeIndex(e)), o.setEnd(t.parentNode, i.nodeIndex(t)), a = o.extractContents(), o = i.createRng(), o.setStart(t.parentNode, i.nodeIndex(t) + 1), o.setEnd(e.parentNode, i.nodeIndex(e) + 1), s = o.extractContents(), l = e.parentNode, l.insertBefore(r(a), e), n ? l.insertBefore(n, e) : l.insertBefore(t, e), l.insertBefore(r(s), e), i.remove(e), n || t) : void 0
        },
        bind: function(e, t, n, r) {
          var i = this;
          if (c.isArray(e)) {
            for (var o = e.length; o--;) e[o] = i.bind(e[o], t, n, r);
            return e
          }
          return !i.settings.collect || e !== i.doc && e !== i.win || i.boundEvents.push([e, t, n, r]), i.events.bind(e, t, n, r || i)
        },
        unbind: function(e, t, n) {
          var r = this,
            i;
          if (c.isArray(e)) {
            for (i = e.length; i--;) e[i] = r.unbind(e[i], t, n);
            return e
          }
          if (r.boundEvents && (e === r.doc || e === r.win))
            for (i = r.boundEvents.length; i--;) {
              var o = r.boundEvents[i];
              e != o[0] || t && t != o[1] || n && n != o[2] || this.events.unbind(o[0], o[1], o[2])
            }
          return this.events.unbind(e, t, n)
        },
        fire: function(e, t, n) {
          return this.events.fire(e, t, n)
        },
        getContentEditable: function(e) {
          var t;
          return e && 1 == e.nodeType ? (t = e.getAttribute("data-mce-contenteditable"), t && "inherit" !== t ? t : "inherit" !== e.contentEditable ? e.contentEditable : null) : null
        },
        getContentEditableParent: function(e) {
          for (var t = this.getRoot(), n = null; e && e !== t && (n = this.getContentEditable(e), null === n); e = e.parentNode);
          return n
        },
        destroy: function() {
          var t = this;
          if (t.boundEvents) {
            for (var n = t.boundEvents.length; n--;) {
              var r = t.boundEvents[n];
              this.events.unbind(r[0], r[1], r[2])
            }
            t.boundEvents = null
          }
          e.setDocument && e.setDocument(), t.win = t.doc = t.root = t.events = t.frag = null
        },
        isChildOf: function(e, t) {
          for (; e;) {
            if (t === e) return !0;
            e = e.parentNode
          }
          return !1
        },
        dumpRng: function(e) {
          return "startContainer: " + e.startContainer.nodeName + ", startOffset: " + e.startOffset + ", endContainer: " + e.endContainer.nodeName + ", endOffset: " + e.endOffset
        },
        _findSib: function(e, t, n) {
          var r = this,
            i = t;
          if (e)
            for ("string" == typeof i && (i = function(e) {
                return r.is(e, t)
              }), e = e[n]; e; e = e[n])
              if (i(e)) return e;
          return null
        }
      }, p.DOM = new p(document), p.nodeIndex = h, p
    }), r(E, [w, m], function(e, t) {
      function n() {
        function e(e, n) {
          function i() {
            a.remove(l), s && (s.onreadystatechange = s.onload = s = null), n()
          }

          function o() {
            "undefined" != typeof console && console.log && console.log("Failed to load: " + e)
          }
          var a = r,
            s, l;
          l = a.uniqueId(), s = document.createElement("script"), s.id = l, s.type = "text/javascript", s.src = t._addCacheSuffix(e), "onreadystatechange" in s ? s.onreadystatechange = function() {
            /loaded|complete/.test(s.readyState) && i()
          } : s.onload = i, s.onerror = o, (document.getElementsByTagName("head")[0] || document.body).appendChild(s)
        }
        var n = 0,
          a = 1,
          s = 2,
          l = {},
          c = [],
          u = {},
          d = [],
          f = 0,
          h;
        this.isDone = function(e) {
          return l[e] == s
        }, this.markDone = function(e) {
          l[e] = s
        }, this.add = this.load = function(e, t, r) {
          var i = l[e];
          i == h && (c.push(e), l[e] = n), t && (u[e] || (u[e] = []), u[e].push({
            func: t,
            scope: r || this
          }))
        }, this.loadQueue = function(e, t) {
          this.loadScripts(c, e, t)
        }, this.loadScripts = function(t, n, r) {
          function c(e) {
            i(u[e], function(e) {
              e.func.call(e.scope)
            }), u[e] = h
          }
          var p;
          d.push({
            func: n,
            scope: r || this
          }), (p = function() {
            var n = o(t);
            t.length = 0, i(n, function(t) {
              return l[t] == s ? void c(t) : void(l[t] != a && (l[t] = a, f++, e(t, function() {
                l[t] = s, f--, c(t), p()
              })))
            }), f || (i(d, function(e) {
              e.func.call(e.scope)
            }), d.length = 0)
          })()
        }
      }
      var r = e.DOM,
        i = t.each,
        o = t.grep;
      return n.ScriptLoader = new n, n
    }), r(N, [E, m], function(e, n) {
      function r() {
        var e = this;
        e.items = [], e.urls = {}, e.lookup = {}
      }
      var i = n.each;
      return r.prototype = {
        get: function(e) {
          return this.lookup[e] ? this.lookup[e].instance : t
        },
        dependencies: function(e) {
          var t;
          return this.lookup[e] && (t = this.lookup[e].dependencies), t || []
        },
        requireLangPack: function(t, n) {
          var i = r.language;
          if (i && r.languageLoad !== !1) {
            if (n)
              if (n = "," + n + ",", -1 != n.indexOf("," + i.substr(0, 2) + ",")) i = i.substr(0, 2);
              else if (-1 == n.indexOf("," + i + ",")) return;
            e.ScriptLoader.add(this.urls[t] + "/langs/" + i + ".js")
          }
        },
        add: function(e, t, n) {
          return this.items.push(t), this.lookup[e] = {
            instance: t,
            dependencies: n
          }, t
        },
        createUrl: function(e, t) {
          return "object" == typeof t ? t : {
            prefix: e.prefix,
            resource: t,
            suffix: e.suffix
          }
        },
        addComponents: function(t, n) {
          var r = this.urls[t];
          i(n, function(t) {
            e.ScriptLoader.add(r + "/" + t)
          })
        },
        load: function(n, o, a, s) {
          function l() {
            var r = c.dependencies(n);
            i(r, function(e) {
              var n = c.createUrl(o, e);
              c.load(n.resource, n, t, t)
            }), a && (s ? a.call(s) : a.call(e))
          }
          var c = this,
            u = o;
          c.urls[n] || ("object" == typeof o && (u = o.prefix + o.resource + o.suffix), 0 !== u.indexOf("/") && -1 == u.indexOf("://") && (u = r.baseURL + "/" + u), c.urls[n] = u.substring(0, u.lastIndexOf("/")), c.lookup[n] ? l() : e.ScriptLoader.add(u, l, s))
        }
      }, r.PluginManager = new r, r.ThemeManager = new r, r
    }), r(_, [], function() {
      function e(e) {
        return function(t) {
          return !!t && t.nodeType == e
        }
      }

      function t(e) {
        return e = e.toLowerCase().split(" "),
          function(t) {
            var n, r;
            if (t && t.nodeType)
              for (r = t.nodeName.toLowerCase(), n = 0; n < e.length; n++)
                if (r === e[n]) return !0;
            return !1
          }
      }

      function n(e, t) {
        return t = t.toLowerCase().split(" "),
          function(n) {
            var r, i;
            if (s(n))
              for (r = 0; r < t.length; r++)
                if (i = getComputedStyle(n, null).getPropertyValue(e), i === t[r]) return !0;
            return !1
          }
      }

      function r(e, t) {
        return function(n) {
          return s(n) && n[e] === t
        }
      }

      function i(e, t) {
        return function(n) {
          return s(n) && n.getAttribute(e) === t
        }
      }

      function o(e) {
        return s(e) && e.hasAttribute("data-mce-bogus")
      }

      function a(e) {
        return function(t) {
          if (s(t)) {
            if (t.contentEditable === e) return !0;
            if (t.getAttribute("data-mce-contenteditable") === e) return !0
          }
          return !1
        }
      }
      var s = e(1);
      return {
        isText: e(3),
        isElement: s,
        isComment: e(8),
        isBr: t("br"),
        isContentEditableTrue: a("true"),
        isContentEditableFalse: a("false"),
        matchNodeNames: t,
        hasPropValue: r,
        hasAttributeValue: i,
        matchStyleValues: n,
        isBogus: o
      }
    }), r(S, [], function() {
      function e(e) {
        return e == n
      }

      function t(e) {
        return e.replace(new RegExp(n, "g"), "")
      }
      var n = "\u200b";
      return {
        isZwsp: e,
        ZWSP: n,
        trim: t
      }
    }), r(k, [_, S], function(e, t) {
      function n(e) {
        return d(e) && (e = e.parentNode), u(e) && e.hasAttribute("data-mce-caret")
      }

      function r(e) {
        return d(e) && t.isZwsp(e.data)
      }

      function i(e) {
        return n(e) || r(e)
      }

      function o(e, n) {
        var r, o, a, s;
        if (r = e.ownerDocument, a = r.createTextNode(t.ZWSP), s = e.parentNode, n) {
          if (o = e.previousSibling, d(o)) {
            if (i(o)) return o;
            if (c(o)) return o.splitText(o.data.length - 1)
          }
          s.insertBefore(a, e)
        } else {
          if (o = e.nextSibling, d(o)) {
            if (i(o)) return o;
            if (l(o)) return o.splitText(1), o
          }
          e.nextSibling ? s.insertBefore(a, e.nextSibling) : s.appendChild(a)
        }
        return a
      }

      function a(e, t, n) {
        var r, i, o;
        return r = t.ownerDocument, i = r.createElement(e), i.setAttribute("data-mce-caret", n ? "before" : "after"), i.setAttribute("data-mce-bogus", "all"), i.appendChild(r.createTextNode("\xa0")), o = t.parentNode, n ? o.insertBefore(i, t) : t.nextSibling ? o.insertBefore(i, t.nextSibling) : o.appendChild(i), i
      }

      function s(e) {
        var n;
        u(e) && i(e) && ("&nbsp;" != e.innerHTML ? e.removeAttribute("data-mce-caret") : e.parentNode && e.parentNode.removeChild(e)), d(e) && (n = t.trim(e.data), 0 === n.length && e.parentNode && e.parentNode.removeChild(e), e.nodeValue = n)
      }

      function l(e) {
        return d(e) && e.data[0] == t.ZWSP
      }

      function c(e) {
        return d(e) && e.data[e.data.length - 1] == t.ZWSP
      }
      var u = e.isElement,
        d = e.isText;
      return {
        isCaretContainer: i,
        isCaretContainerBlock: n,
        isCaretContainerInline: r,
        insertInline: o,
        insertBlock: a,
        remove: s,
        startsWithCaretContainer: l,
        endsWithCaretContainer: c
      }
    }), r(T, [m, y, _, k], function(e, t, n, r) {
      function i(e, t) {
        var n = e.childNodes;
        return t--, t > n.length - 1 ? t = n.length - 1 : 0 > t && (t = 0), n[t] || e
      }

      function o(e) {
        this.walk = function(t, n) {
          function r(e) {
            var t;
            return t = e[0], 3 === t.nodeType && t === c && u >= t.nodeValue.length && e.splice(0, 1), t = e[e.length - 1], 0 === f && e.length > 0 && t === d && 3 === t.nodeType && e.splice(e.length - 1, 1), e
          }

          function o(e, t, n) {
            for (var r = []; e && e != n; e = e[t]) r.push(e);
            return r
          }

          function a(e, t) {
            do {
              if (e.parentNode == t) return e;
              e = e.parentNode
            } while (e)
          }

          function l(e, t, i) {
            var a = i ? "nextSibling" : "previousSibling";
            for (g = e, v = g.parentNode; g && g != t; g = v) v = g.parentNode, y = o(g == e ? g : g[a], a), y.length && (i || y.reverse(), n(r(y)))
          }
          var c = t.startContainer,
            u = t.startOffset,
            d = t.endContainer,
            f = t.endOffset,
            h, p, m, g, v, y, b;
          if (b = e.select("td.mce-item-selected,th.mce-item-selected"), b.length > 0) return void s(b, function(e) {
            n([e])
          });
          if (1 == c.nodeType && c.hasChildNodes() && (c = c.childNodes[u]), 1 == d.nodeType && d.hasChildNodes() && (d = i(d, f)), c == d) return n(r([c]));
          for (h = e.findCommonAncestor(c, d), g = c; g; g = g.parentNode) {
            if (g === d) return l(c, h, !0);
            if (g === h) break
          }
          for (g = d; g; g = g.parentNode) {
            if (g === c) return l(d, h);
            if (g === h) break
          }
          p = a(c, h) || c, m = a(d, h) || d, l(c, p, !0), y = o(p == c ? p : p.nextSibling, "nextSibling", m == d ? m.nextSibling : m), y.length && n(r(y)), l(d, m)
        }, this.split = function(e) {
          function t(e, t) {
            return e.splitText(t)
          }
          var n = e.startContainer,
            r = e.startOffset,
            i = e.endContainer,
            o = e.endOffset;
          return n == i && 3 == n.nodeType ? r > 0 && r < n.nodeValue.length && (i = t(n, r), n = i.previousSibling, o > r ? (o -= r, n = i = t(i, o).previousSibling, o = i.nodeValue.length, r = 0) : o = 0) : (3 == n.nodeType && r > 0 && r < n.nodeValue.length && (n = t(n, r), r = 0), 3 == i.nodeType && o > 0 && o < i.nodeValue.length && (i = t(i, o).previousSibling, o = i.nodeValue.length)), {
            startContainer: n,
            startOffset: r,
            endContainer: i,
            endOffset: o
          }
        }, this.normalize = function(n) {
          function r(r) {
            function a(e) {
              return e && /^(TD|TH|CAPTION)$/.test(e.nodeName)
            }

            function s(n, r) {
              for (var i = new t(n, e.getParent(n.parentNode, e.isBlock) || g); n = i[r ? "prev" : "next"]();)
                if ("BR" === n.nodeName) return !0
            }

            function u(e) {
              for (; e && e != g;) {
                if (l(e)) return !0;
                e = e.parentNode
              }
              return !1
            }

            function d(e, t) {
              return e.previousSibling && e.previousSibling.nodeName == t
            }

            function f(n, r) {
              var a, s, l;
              if (r = r || h, l = e.getParent(r.parentNode, e.isBlock) || g, n && "BR" == r.nodeName && C && e.isEmpty(l)) return h = r.parentNode, p = e.nodeIndex(r), void(i = !0);
              for (a = new t(r, l); v = a[n ? "prev" : "next"]();) {
                if ("false" === e.getContentEditableParent(v) || c(v)) return;
                if (3 === v.nodeType && v.nodeValue.length > 0) return h = v, p = n ? v.nodeValue.length : 0, void(i = !0);
                if (e.isBlock(v) || y[v.nodeName.toLowerCase()]) return;
                s = v
              }
              o && s && (h = s, i = !0, p = 0)
            }
            var h, p, m, g = e.getRoot(),
              v, y, b, C;
            if (h = n[(r ? "start" : "end") + "Container"], p = n[(r ? "start" : "end") + "Offset"], C = 1 == h.nodeType && p === h.childNodes.length, y = e.schema.getNonEmptyElements(), b = r, !c(h)) {
              if (1 == h.nodeType && p > h.childNodes.length - 1 && (b = !1), 9 === h.nodeType && (h = e.getRoot(), p = 0), h === g) {
                if (b && (v = h.childNodes[p > 0 ? p - 1 : 0])) {
                  if (c(v)) return;
                  if (y[v.nodeName] || "TABLE" == v.nodeName) return
                }
                if (h.hasChildNodes()) {
                  if (p = Math.min(!b && p > 0 ? p - 1 : p, h.childNodes.length - 1), h = h.childNodes[p], p = 0, u(h) || c(h)) return;
                  if (h.hasChildNodes() && !/TABLE/.test(h.nodeName)) {
                    v = h, m = new t(h, g);
                    do {
                      if (l(v) || c(v)) {
                        i = !1;
                        break
                      }
                      if (3 === v.nodeType && v.nodeValue.length > 0) {
                        p = b ? 0 : v.nodeValue.length, h = v, i = !0;
                        break
                      }
                      if (y[v.nodeName.toLowerCase()] && !a(v)) {
                        p = e.nodeIndex(v), h = v.parentNode, "IMG" != v.nodeName || b || p++, i = !0;
                        break
                      }
                    } while (v = b ? m.next() : m.prev())
                  }
                }
              }
              o && (3 === h.nodeType && 0 === p && f(!0), 1 === h.nodeType && (v = h.childNodes[p], v || (v = h.childNodes[p - 1]), !v || "BR" !== v.nodeName || d(v, "A") || s(v) || s(v, !0) || f(!0, v))), b && !o && 3 === h.nodeType && p === h.nodeValue.length && f(!1), i && n["set" + (r ? "Start" : "End")](h, p)
            }
          }
          var i, o;
          return o = n.collapsed, r(!0), o || r(), i && o && n.collapse(!0), i
        }
      }

      function a(t, n, r) {
        var i, o, a;
        if (i = r.elementFromPoint(t, n), o = r.body.createTextRange(), "HTML" == i.tagName && (i = r.body), o.moveToElementText(i), a = e.toArray(o.getClientRects()), a = a.sort(function(e, t) {
            return e = Math.abs(Math.max(e.top - n, e.bottom - n)), t = Math.abs(Math.max(t.top - n, t.bottom - n)), e - t
          }), a.length > 0) {
          n = (a[0].bottom + a[0].top) / 2;
          try {
            return o.moveToPoint(t, n), o.collapse(!0), o
          } catch (s) {}
        }
        return null
      }
      var s = e.each,
        l = n.isContentEditableFalse,
        c = r.isCaretContainer;
      return o.compareRanges = function(e, t) {
        if (e && t) {
          if (!e.item && !e.duplicate) return e.startContainer == t.startContainer && e.startOffset == t.startOffset;
          if (e.item && t.item && e.item(0) === t.item(0)) return !0;
          if (e.isEqual && t.isEqual && t.isEqual(e)) return !0
        }
        return !1
      }, o.getCaretRangeFromPoint = function(e, t, n) {
        var r, i;
        if (n.caretPositionFromPoint) i = n.caretPositionFromPoint(e, t), r = n.createRange(), r.setStart(i.offsetNode, i.offset), r.collapse(!0);
        else if (n.caretRangeFromPoint) r = n.caretRangeFromPoint(e, t);
        else if (n.body.createTextRange) {
          r = n.body.createTextRange();
          try {
            r.moveToPoint(e, t), r.collapse(!0)
          } catch (o) {
            r = a(e, t, n)
          }
        }
        return r
      }, o.getSelectedNode = function(e) {
        var t = e.startContainer,
          n = e.startOffset;
        return t.hasChildNodes() && e.endOffset == n + 1 ? t.childNodes[n] : null
      }, o.getNode = function(e, t) {
        return 1 == e.nodeType && e.hasChildNodes() && (t >= e.childNodes.length && (t = e.childNodes.length - 1), e = e.childNodes[t]), e
      }, o
    }), r(R, [T, h, u], function(e, t, n) {
      return function(r) {
        function i(e) {
          var t, n;
          if (n = r.$(e).parentsUntil(r.getBody()).add(e), n.length === a.length) {
            for (t = n.length; t >= 0 && n[t] === a[t]; t--);
            if (-1 === t) return a = n, !0
          }
          return a = n, !1
        }
        var o, a = [];
        "onselectionchange" in r.getDoc() || r.on("NodeChange Click MouseUp KeyUp Focus", function(t) {
          var n, i;
          n = r.selection.getRng(), i = {
            startContainer: n.startContainer,
            startOffset: n.startOffset,
            endContainer: n.endContainer,
            endOffset: n.endOffset
          }, "nodechange" != t.type && e.compareRanges(i, o) || r.fire("SelectionChange"), o = i
        }), r.on("contextmenu", function() {
          r.fire("SelectionChange")
        }), r.on("SelectionChange", function() {
          var e = r.selection.getStart(!0);
          (t.range || !r.selection.isCollapsed()) && !i(e) && r.dom.isChildOf(e, r.getBody()) && r.nodeChanged({
            selectionChange: !0
          })
        }), r.on("MouseUp", function(e) {
          e.isDefaultPrevented() || ("IMG" == r.selection.getNode().nodeName ? n.setEditorTimeout(r, function() {
            r.nodeChanged()
          }) : r.nodeChanged())
        }), this.nodeChanged = function(e) {
          var t = r.selection,
            n, i, o;
          r.initialized && t && !r.settings.disable_nodechange && !r.readonly && (o = r.getBody(), n = t.getStart() || o, n = n.ownerDocument != r.getDoc() ? r.getBody() : n, "IMG" == n.nodeName && t.isCollapsed() && (n = n.parentNode), i = [], r.dom.getParent(n, function(e) {
            return e === o ? !0 : void i.push(e)
          }), e = e || {}, e.element = n, e.parents = i, r.fire("NodeChange", e))
        }
      }
    }), r(A, [], function() {
      function e(e, t, n) {
        var r, i, o = n ? "lastChild" : "firstChild",
          a = n ? "prev" : "next";
        if (e[o]) return e[o];
        if (e !== t) {
          if (r = e[a]) return r;
          for (i = e.parent; i && i !== t; i = i.parent)
            if (r = i[a]) return r
        }
      }

      function t(e, t) {
        this.name = e, this.type = t, 1 === t && (this.attributes = [], this.attributes.map = {})
      }
      var n = /^[ \t\r\n]*$/,
        r = {
          "#text": 3,
          "#comment": 8,
          "#cdata": 4,
          "#pi": 7,
          "#doctype": 10,
          "#document-fragment": 11
        };
      return t.prototype = {
        replace: function(e) {
          var t = this;
          return e.parent && e.remove(), t.insert(e, t), t.remove(), t
        },
        attr: function(e, t) {
          var n = this,
            r, i, o;
          if ("string" != typeof e) {
            for (i in e) n.attr(i, e[i]);
            return n
          }
          if (r = n.attributes) {
            if (t !== o) {
              if (null === t) {
                if (e in r.map)
                  for (delete r.map[e], i = r.length; i--;)
                    if (r[i].name === e) return r = r.splice(i, 1), n;
                return n
              }
              if (e in r.map) {
                for (i = r.length; i--;)
                  if (r[i].name === e) {
                    r[i].value = t;
                    break
                  }
              } else r.push({
                name: e,
                value: t
              });
              return r.map[e] = t, n
            }
            return r.map[e]
          }
        },
        clone: function() {
          var e = this,
            n = new t(e.name, e.type),
            r, i, o, a, s;
          if (o = e.attributes) {
            for (s = [], s.map = {}, r = 0, i = o.length; i > r; r++) a = o[r], "id" !== a.name && (s[s.length] = {
              name: a.name,
              value: a.value
            }, s.map[a.name] = a.value);
            n.attributes = s
          }
          return n.value = e.value, n.shortEnded = e.shortEnded, n
        },
        wrap: function(e) {
          var t = this;
          return t.parent.insert(e, t), e.append(t), t
        },
        unwrap: function() {
          var e = this,
            t, n;
          for (t = e.firstChild; t;) n = t.next, e.insert(t, e, !0), t = n;
          e.remove()
        },
        remove: function() {
          var e = this,
            t = e.parent,
            n = e.next,
            r = e.prev;
          return t && (t.firstChild === e ? (t.firstChild = n, n && (n.prev = null)) : r.next = n, t.lastChild === e ? (t.lastChild = r, r && (r.next = null)) : n.prev = r, e.parent = e.next = e.prev = null), e
        },
        append: function(e) {
          var t = this,
            n;
          return e.parent && e.remove(), n = t.lastChild, n ? (n.next = e, e.prev = n, t.lastChild = e) : t.lastChild = t.firstChild = e, e.parent = t, e
        },
        insert: function(e, t, n) {
          var r;
          return e.parent && e.remove(), r = t.parent || this, n ? (t === r.firstChild ? r.firstChild = e : t.prev.next = e, e.prev = t.prev, e.next = t, t.prev = e) : (t === r.lastChild ? r.lastChild = e : t.next.prev = e, e.next = t.next, e.prev = t, t.next = e), e.parent = r, e
        },
        getAll: function(t) {
          var n = this,
            r, i = [];
          for (r = n.firstChild; r; r = e(r, n)) r.name === t && i.push(r);
          return i
        },
        empty: function() {
          var t = this,
            n, r, i;
          if (t.firstChild) {
            for (n = [], i = t.firstChild; i; i = e(i, t)) n.push(i);
            for (r = n.length; r--;) i = n[r], i.parent = i.firstChild = i.lastChild = i.next = i.prev = null
          }
          return t.firstChild = t.lastChild = null, t
        },
        isEmpty: function(t) {
          var r = this,
            i = r.firstChild,
            o, a;
          if (i)
            do {
              if (1 === i.type) {
                if (i.attributes.map["data-mce-bogus"]) continue;
                if (t[i.name]) return !1;
                for (o = i.attributes.length; o--;)
                  if (a = i.attributes[o].name, "name" === a || 0 === a.indexOf("data-mce-bookmark")) return !1
              }
              if (8 === i.type) return !1;
              if (3 === i.type && !n.test(i.value)) return !1
            } while (i = e(i, r));
          return !0
        },
        walk: function(t) {
          return e(this, null, t)
        }
      }, t.create = function(e, n) {
        var i, o;
        if (i = new t(e, r[e] || 1), n)
          for (o in n) i.attr(o, n[o]);
        return i
      }, t
    }), r(B, [m], function(e) {
      function t(e, t) {
        return e ? e.split(t || " ") : []
      }

      function n(e) {
        function n(e, n, r) {
          function i(e, t) {
            var n = {},
              r, i;
            for (r = 0, i = e.length; i > r; r++) n[e[r]] = t || {};
            return n
          }
          var s, c, u, d = arguments;
          for (r = r || [], n = n || "", "string" == typeof r && (r = t(r)), c = 3; c < d.length; c++) "string" == typeof d[c] && (d[c] = t(d[c])), r.push.apply(r, d[c]);
          for (e = t(e), s = e.length; s--;) u = [].concat(l, t(n)), a[e[s]] = {
            attributes: i(u),
            attributesOrder: u,
            children: i(r, o)
          }
        }

        function r(e, n) {
          var r, i, o, s;
          for (e = t(e), r = e.length, n = t(n); r--;)
            for (i = a[e[r]], o = 0, s = n.length; s > o; o++) i.attributes[n[o]] = {}, i.attributesOrder.push(n[o])
        }
        var a = {},
          l, c, u, d, f, h;
        return i[e] ? i[e] : (l = t("id accesskey class dir lang style tabindex title"), c = t("address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul"), u = t("a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd label map noscript object q s samp script select small span strong sub sup textarea u var #text #comment"), "html4" != e && (l.push.apply(l, t("contenteditable contextmenu draggable dropzone hidden spellcheck translate")), c.push.apply(c, t("article aside details dialog figure header footer hgroup section nav")), u.push.apply(u, t("audio canvas command datalist mark meter output picture progress time wbr video ruby bdi keygen"))), "html5-strict" != e && (l.push("xml:lang"), h = t("acronym applet basefont big font strike tt"), u.push.apply(u, h), s(h, function(e) {
          n(e, "", u)
        }), f = t("center dir isindex noframes"), c.push.apply(c, f), d = [].concat(c, u), s(f, function(e) {
          n(e, "", d)
        })), d = d || [].concat(c, u), n("html", "manifest", "head body"), n("head", "", "base command link meta noscript script style title"), n("title hr noscript br"), n("base", "href target"), n("link", "href rel media hreflang type sizes hreflang"), n("meta", "name http-equiv content charset"), n("style", "media type scoped"), n("script", "src async defer type charset"), n("body", "onafterprint onbeforeprint onbeforeunload onblur onerror onfocus onhashchange onload onmessage onoffline ononline onpagehide onpageshow onpopstate onresize onscroll onstorage onunload", d), n("address dt dd div caption", "", d), n("h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn", "", u), n("blockquote", "cite", d), n("ol", "reversed start type", "li"), n("ul", "", "li"), n("li", "value", d), n("dl", "", "dt dd"), n("a", "href target rel media hreflang type", u), n("q", "cite", u), n("ins del", "cite datetime", d), n("img", "src sizes srcset alt usemap ismap width height"), n("iframe", "src name width height", d), n("embed", "src type width height"), n("object", "data type typemustmatch name usemap form width height", d, "param"), n("param", "name value"), n("map", "name", d, "area"), n("area", "alt coords shape href target rel media hreflang type"), n("table", "border", "caption colgroup thead tfoot tbody tr" + ("html4" == e ? " col" : "")), n("colgroup", "span", "col"), n("col", "span"), n("tbody thead tfoot", "", "tr"), n("tr", "", "td th"), n("td", "colspan rowspan headers", d), n("th", "colspan rowspan headers scope abbr", d), n("form", "accept-charset action autocomplete enctype method name novalidate target", d), n("fieldset", "disabled form name", d, "legend"), n("label", "form for", u), n("input", "accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"), n("button", "disabled form formaction formenctype formmethod formnovalidate formtarget name type value", "html4" == e ? d : u), n("select", "disabled form multiple name required size", "option optgroup"), n("optgroup", "disabled label", "option"), n("option", "disabled label selected value"), n("textarea", "cols dirname disabled form maxlength name readonly required rows wrap"), n("menu", "type label", d, "li"), n("noscript", "", d), "html4" != e && (n("wbr"), n("ruby", "", u, "rt rp"), n("figcaption", "", d), n("mark rt rp summary bdi", "", u), n("canvas", "width height", d), n("video", "src crossorigin poster preload autoplay mediagroup loop muted controls width height buffered", d, "track source"), n("audio", "src crossorigin preload autoplay mediagroup loop muted controls buffered volume", d, "track source"), n("picture", "", "img source"), n("source", "src srcset type media sizes"), n("track", "kind src srclang label default"), n("datalist", "", u, "option"), n("article section nav aside header footer", "", d), n("hgroup", "", "h1 h2 h3 h4 h5 h6"), n("figure", "", d, "figcaption"), n("time", "datetime", u), n("dialog", "open", d), n("command", "type label icon disabled checked radiogroup command"), n("output", "for form name", u), n("progress", "value max", u), n("meter", "value min max low high optimum", u), n("details", "open", d, "summary"), n("keygen", "autofocus challenge disabled form keytype name")), "html5-strict" != e && (r("script", "language xml:space"), r("style", "xml:space"), r("object", "declare classid code codebase codetype archive standby align border hspace vspace"), r("embed", "align name hspace vspace"), r("param", "valuetype type"), r("a", "charset name rev shape coords"), r("br", "clear"), r("applet", "codebase archive code object alt name width height align hspace vspace"), r("img", "name longdesc align border hspace vspace"), r("iframe", "longdesc frameborder marginwidth marginheight scrolling align"), r("font basefont", "size color face"), r("input", "usemap align"), r("select", "onchange"), r("textarea"), r("h1 h2 h3 h4 h5 h6 div p legend caption", "align"), r("ul", "type compact"), r("li", "type"), r("ol dl menu dir", "compact"), r("pre", "width xml:space"), r("hr", "align noshade size width"), r("isindex", "prompt"), r("table", "summary width frame rules cellspacing cellpadding align bgcolor"), r("col", "width align char charoff valign"), r("colgroup", "width align char charoff valign"), r("thead", "align char charoff valign"), r("tr", "align char charoff valign bgcolor"), r("th", "axis align char charoff valign nowrap bgcolor width height"), r("form", "accept"), r("td", "abbr axis scope align char charoff valign nowrap bgcolor width height"), r("tfoot", "align char charoff valign"), r("tbody", "align char charoff valign"), r("area", "nohref"), r("body", "background bgcolor text link vlink alink")), "html4" != e && (r("input button select textarea", "autofocus"), r("input textarea", "placeholder"), r("a", "download"), r("link script img", "crossorigin"), r("iframe", "sandbox seamless allowfullscreen")), s(t("a form meter progress dfn"), function(e) {
          a[e] && delete a[e].children[e]
        }), delete a.caption.children.table, delete a.script, i[e] = a, a)
      }

      function r(e, t) {
        var n;
        return e && (n = {}, "string" == typeof e && (e = {
          "*": e
        }), s(e, function(e, r) {
          n[r] = n[r.toUpperCase()] = "map" == t ? a(e, /[, ]/) : c(e, /[, ]/)
        })), n
      }
      var i = {},
        o = {},
        a = e.makeMap,
        s = e.each,
        l = e.extend,
        c = e.explode,
        u = e.inArray;
      return function(e) {
        function o(t, n, r) {
          var o = e[t];
          return o ? o = a(o, /[, ]/, a(o.toUpperCase(), /[, ]/)) : (o = i[t], o || (o = a(n, " ", a(n.toUpperCase(), " ")), o = l(o, r), i[t] = o)), o
        }

        function d(e) {
          return new RegExp("^" + e.replace(/([?+*])/g, ".$1") + "$")
        }

        function f(e) {
          var n, r, i, o, s, l, c, f, h, p, m, g, v, b, x, w, E, N, _, S = /^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)\])?$/,
            k = /^([!\-])?(\w+::\w+|[^=:<]+)?(?:([=:<])(.*))?$/,
            T = /[*?+]/;
          if (e)
            for (e = t(e, ","), y["@"] && (w = y["@"].attributes, E = y["@"].attributesOrder), n = 0, r = e.length; r > n; n++)
              if (s = S.exec(e[n])) {
                if (b = s[1], h = s[2], x = s[3], f = s[5], g = {}, v = [], l = {
                    attributes: g,
                    attributesOrder: v
                  }, "#" === b && (l.paddEmpty = !0), "-" === b && (l.removeEmpty = !0), "!" === s[4] && (l.removeEmptyAttrs = !0), w) {
                  for (N in w) g[N] = w[N];
                  v.push.apply(v, E)
                }
                if (f)
                  for (f = t(f, "|"), i = 0, o = f.length; o > i; i++)
                    if (s = k.exec(f[i])) {
                      if (c = {}, m = s[1], p = s[2].replace(/::/g, ":"), b = s[3], _ = s[4], "!" === m && (l.attributesRequired = l.attributesRequired || [], l.attributesRequired.push(p), c.required = !0), "-" === m) {
                        delete g[p], v.splice(u(v, p), 1);
                        continue
                      }
                      b && ("=" === b && (l.attributesDefault = l.attributesDefault || [], l.attributesDefault.push({
                        name: p,
                        value: _
                      }), c.defaultValue = _), ":" === b && (l.attributesForced = l.attributesForced || [], l.attributesForced.push({
                        name: p,
                        value: _
                      }), c.forcedValue = _), "<" === b && (c.validValues = a(_, "?"))), T.test(p) ? (l.attributePatterns = l.attributePatterns || [], c.pattern = d(p), l.attributePatterns.push(c)) : (g[p] || v.push(p), g[p] = c)
                    }
                w || "@" != h || (w = g, E = v), x && (l.outputName = h, y[x] = l), T.test(h) ? (l.pattern = d(h), C.push(l)) : y[h] = l
              }
        }

        function h(e) {
          y = {}, C = [], f(e), s(E, function(e, t) {
            b[t] = e.children
          })
        }

        function p(e) {
          var n = /^(~)?(.+)$/;
          e && (i.text_block_elements = i.block_elements = null, s(t(e, ","), function(e) {
            var t = n.exec(e),
              r = "~" === t[1],
              i = r ? "span" : "div",
              o = t[2];
            if (b[o] = b[i], L[o] = i, r || (R[o.toUpperCase()] = {}, R[o] = {}), !y[o]) {
              var a = y[i];
              a = l({}, a), delete a.removeEmptyAttrs, delete a.removeEmpty, y[o] = a
            }
            s(b, function(e, t) {
              e[i] && (b[t] = e = l({}, b[t]), e[o] = e[i])
            })
          }))
        }

        function m(n) {
          var r = /^([+\-]?)(\w+)\[([^\]]+)\]$/;
          i[e.schema] = null, n && s(t(n, ","), function(e) {
            var n = r.exec(e),
              i, o;
            n && (o = n[1], i = o ? b[n[2]] : b[n[2]] = {
              "#comment": {}
            }, i = b[n[2]], s(t(n[3], "|"), function(e) {
              "-" === o ? delete i[e] : i[e] = {}
            }))
          })
        }

        function g(e) {
          var t = y[e],
            n;
          if (t) return t;
          for (n = C.length; n--;)
            if (t = C[n], t.pattern.test(e)) return t
        }
        var v = this,
          y = {},
          b = {},
          C = [],
          x, w, E, N, _, S, k, T, R, A, B, D, M, L = {},
          P = {};
        e = e || {}, E = n(e.schema), e.verify_html === !1 && (e.valid_elements = "*[*]"),
          x = r(e.valid_styles), w = r(e.invalid_styles, "map"), T = r(e.valid_classes, "map"), N = o("whitespace_elements", "pre script noscript style textarea video audio iframe object"), _ = o("self_closing_elements", "colgroup dd dt li option p td tfoot th thead tr"), S = o("short_ended_elements", "area base basefont br col frame hr img input isindex link meta param embed source wbr track"), k = o("boolean_attributes", "checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls"), A = o("non_empty_elements", "td th iframe video audio object script", S), B = o("move_caret_before_on_enter_elements", "table", A), D = o("text_block_elements", "h1 h2 h3 h4 h5 h6 p div address pre form blockquote center dir fieldset header footer article section hgroup aside nav figure"), R = o("block_elements", "hr table tbody thead tfoot th tr td li ol ul caption dl dt dd noscript menu isindex option datalist select optgroup figcaption", D), M = o("text_inline_elements", "span strong b em i font strike u var cite dfn code mark q sup sub samp"), s((e.special || "script noscript style textarea").split(" "), function(e) {
            P[e] = new RegExp("</" + e + "[^>]*>", "gi")
          }), e.valid_elements ? h(e.valid_elements) : (s(E, function(e, t) {
            y[t] = {
              attributes: e.attributes,
              attributesOrder: e.attributesOrder
            }, b[t] = e.children
          }), "html5" != e.schema && s(t("strong/b em/i"), function(e) {
            e = t(e, "/"), y[e[1]].outputName = e[0]
          }), y.img.attributesDefault = [{
            name: "alt",
            value: ""
          }], s(t("ol ul sub sup blockquote span font a table tbody tr strong em b i"), function(e) {
            y[e] && (y[e].removeEmpty = !0)
          }), s(t("p h1 h2 h3 h4 h5 h6 th td pre div address caption"), function(e) {
            y[e].paddEmpty = !0
          }), s(t("span"), function(e) {
            y[e].removeEmptyAttrs = !0
          })), p(e.custom_elements), m(e.valid_children), f(e.extended_valid_elements), m("+ol[ul|ol],+ul[ul|ol]"), e.invalid_elements && s(c(e.invalid_elements), function(e) {
            y[e] && delete y[e]
          }), g("span") || f("span[!data-mce-type|*]"), v.children = b, v.getValidStyles = function() {
            return x
          }, v.getInvalidStyles = function() {
            return w
          }, v.getValidClasses = function() {
            return T
          }, v.getBoolAttrs = function() {
            return k
          }, v.getBlockElements = function() {
            return R
          }, v.getTextBlockElements = function() {
            return D
          }, v.getTextInlineElements = function() {
            return M
          }, v.getShortEndedElements = function() {
            return S
          }, v.getSelfClosingElements = function() {
            return _
          }, v.getNonEmptyElements = function() {
            return A
          }, v.getMoveCaretBeforeOnEnterElements = function() {
            return B
          }, v.getWhiteSpaceElements = function() {
            return N
          }, v.getSpecialElements = function() {
            return P
          }, v.isValidChild = function(e, t) {
            var n = b[e];
            return !(!n || !n[t])
          }, v.isValid = function(e, t) {
            var n, r, i = g(e);
            if (i) {
              if (!t) return !0;
              if (i.attributes[t]) return !0;
              if (n = i.attributePatterns)
                for (r = n.length; r--;)
                  if (n[r].pattern.test(e)) return !0
            }
            return !1
          }, v.getElementRule = g, v.getCustomElements = function() {
            return L
          }, v.addValidElements = f, v.setValidElements = h, v.addCustomElements = p, v.addValidChildren = m, v.elements = y
      }
    }), r(D, [B, C, m], function(e, t, n) {
      function r(e, t, n) {
        var r = 1,
          i, o, a, s;
        for (s = e.getShortEndedElements(), a = /<([!?\/])?([A-Za-z0-9\-_\:\.]+)((?:\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\/|\s+)>/g, a.lastIndex = i = n; o = a.exec(t);) {
          if (i = a.lastIndex, "/" === o[1]) r--;
          else if (!o[1]) {
            if (o[2] in s) continue;
            r++
          }
          if (0 === r) break
        }
        return i
      }

      function i(i, a) {
        function s() {}
        var l = this;
        i = i || {}, l.schema = a = a || new e, i.fix_self_closing !== !1 && (i.fix_self_closing = !0), o("comment cdata text start end pi doctype".split(" "), function(e) {
          e && (l[e] = i[e] || s)
        }), l.parse = function(e) {
          function o(e) {
            var t, n;
            for (t = h.length; t-- && h[t].name !== e;);
            if (t >= 0) {
              for (n = h.length - 1; n >= t; n--) e = h[n], e.valid && l.end(e.name);
              h.length = t
            }
          }

          function s(e, t, n, r, o) {
            var a, s, l = /[\s\u0000-\u001F]+/g;
            if (t = t.toLowerCase(), n = t in x ? t : z(n || r || o || ""), E && !y && 0 !== t.indexOf("data-")) {
              if (a = T[t], !a && R) {
                for (s = R.length; s-- && (a = R[s], !a.pattern.test(t));); - 1 === s && (a = null)
              }
              if (!a) return;
              if (a.validValues && !(n in a.validValues)) return
            }
            if (V[t] && !i.allow_script_urls) {
              var c = n.replace(l, "");
              try {
                c = decodeURIComponent(c)
              } catch (u) {
                c = unescape(c)
              }
              if (U.test(c)) return;
              if (!i.allow_html_data_urls && $.test(c) && !/^data:image\//i.test(c)) return
            }
            p.map[t] = n, p.push({
              name: t,
              value: n
            })
          }
          var l = this,
            c, u = 0,
            d, f, h = [],
            p, m, g, v, y, b, C, x, w, E, N, _, S, k, T, R, A, B, D, M, L, P, H, O, I, F = 0,
            z = t.decode,
            W, V = n.makeMap("src,href,data,background,formaction,poster"),
            U = /((java|vb)script|mhtml):/i,
            $ = /^data:/i;
          for (P = new RegExp("<(?:(?:!--([\\w\\W]*?)-->)|(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|(?:!DOCTYPE([\\w\\W]*?)>)|(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|(?:\\/([^>]+)>)|(?:([A-Za-z0-9\\-_\\:\\.]+)((?:\\s+[^\"'>]+(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>]*))*|\\/|\\s+)>))", "g"), H = /([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:[^\"])*)\")|(?:\'((?:[^\'])*)\')|([^>\s]+)))?/g, C = a.getShortEndedElements(), L = i.self_closing_elements || a.getSelfClosingElements(), x = a.getBoolAttrs(), E = i.validate, b = i.remove_internals, W = i.fix_self_closing, O = a.getSpecialElements(); c = P.exec(e);) {
            if (u < c.index && l.text(z(e.substr(u, c.index - u))), d = c[6]) d = d.toLowerCase(), ":" === d.charAt(0) && (d = d.substr(1)), o(d);
            else if (d = c[7]) {
              if (d = d.toLowerCase(), ":" === d.charAt(0) && (d = d.substr(1)), w = d in C, W && L[d] && h.length > 0 && h[h.length - 1].name === d && o(d), !E || (N = a.getElementRule(d))) {
                if (_ = !0, E && (T = N.attributes, R = N.attributePatterns), (k = c[8]) ? (y = -1 !== k.indexOf("data-mce-type"), y && b && (_ = !1), p = [], p.map = {}, k.replace(H, s)) : (p = [], p.map = {}), E && !y) {
                  if (A = N.attributesRequired, B = N.attributesDefault, D = N.attributesForced, M = N.removeEmptyAttrs, M && !p.length && (_ = !1), D)
                    for (m = D.length; m--;) S = D[m], v = S.name, I = S.value, "{$uid}" === I && (I = "mce_" + F++), p.map[v] = I, p.push({
                      name: v,
                      value: I
                    });
                  if (B)
                    for (m = B.length; m--;) S = B[m], v = S.name, v in p.map || (I = S.value, "{$uid}" === I && (I = "mce_" + F++), p.map[v] = I, p.push({
                      name: v,
                      value: I
                    }));
                  if (A) {
                    for (m = A.length; m-- && !(A[m] in p.map);); - 1 === m && (_ = !1)
                  }
                  if (S = p.map["data-mce-bogus"]) {
                    if ("all" === S) {
                      u = r(a, e, P.lastIndex), P.lastIndex = u;
                      continue
                    }
                    _ = !1
                  }
                }
                _ && l.start(d, p, w)
              } else _ = !1;
              if (f = O[d]) {
                f.lastIndex = u = c.index + c[0].length, (c = f.exec(e)) ? (_ && (g = e.substr(u, c.index - u)), u = c.index + c[0].length) : (g = e.substr(u), u = e.length), _ && (g.length > 0 && l.text(g, !0), l.end(d)), P.lastIndex = u;
                continue
              }
              w || (k && k.indexOf("/") == k.length - 1 ? _ && l.end(d) : h.push({
                name: d,
                valid: _
              }))
            } else(d = c[1]) ? (">" === d.charAt(0) && (d = " " + d), i.allow_conditional_comments || "[if" !== d.substr(0, 3) || (d = " " + d), l.comment(d)) : (d = c[2]) ? l.cdata(d) : (d = c[3]) ? l.doctype(d) : (d = c[4]) && l.pi(d, c[5]);
            u = c.index + c[0].length
          }
          for (u < e.length && l.text(z(e.substr(u))), m = h.length - 1; m >= 0; m--) d = h[m], d.valid && l.end(d.name)
        }
      }
      var o = n.each;
      return i.findEndTag = r, i
    }), r(M, [A, B, D, m], function(e, t, n, r) {
      var i = r.makeMap,
        o = r.each,
        a = r.explode,
        s = r.extend;
      return function(r, l) {
        function c(t) {
          var n, r, o, a, s, c, d, f, h, p, m, g, v, y, b;
          for (m = i("tr,td,th,tbody,thead,tfoot,table"), p = l.getNonEmptyElements(), g = l.getTextBlockElements(), v = l.getSpecialElements(), n = 0; n < t.length; n++)
            if (r = t[n], r.parent && !r.fixed)
              if (g[r.name] && "li" == r.parent.name) {
                for (y = r.next; y && g[y.name];) y.name = "li", y.fixed = !0, r.parent.insert(y, r.parent), y = y.next;
                r.unwrap(r)
              } else {
                for (a = [r], o = r.parent; o && !l.isValidChild(o.name, r.name) && !m[o.name]; o = o.parent) a.push(o);
                if (o && a.length > 1) {
                  for (a.reverse(), s = c = u.filterNode(a[0].clone()), h = 0; h < a.length - 1; h++) {
                    for (l.isValidChild(c.name, a[h].name) ? (d = u.filterNode(a[h].clone()), c.append(d)) : d = c, f = a[h].firstChild; f && f != a[h + 1];) b = f.next, d.append(f), f = b;
                    c = d
                  }
                  s.isEmpty(p) ? o.insert(r, a[0], !0) : (o.insert(s, a[0], !0), o.insert(r, s)), o = a[0], (o.isEmpty(p) || o.firstChild === o.lastChild && "br" === o.firstChild.name) && o.empty().remove()
                } else if (r.parent) {
                  if ("li" === r.name) {
                    if (y = r.prev, y && ("ul" === y.name || "ul" === y.name)) {
                      y.append(r);
                      continue
                    }
                    if (y = r.next, y && ("ul" === y.name || "ul" === y.name)) {
                      y.insert(r, y.firstChild, !0);
                      continue
                    }
                    r.wrap(u.filterNode(new e("ul", 1)));
                    continue
                  }
                  l.isValidChild(r.parent.name, "div") && l.isValidChild("div", r.name) ? r.wrap(u.filterNode(new e("div", 1))) : v[r.name] ? r.empty().remove() : r.unwrap()
                }
              }
        }
        var u = this,
          d = {},
          f = [],
          h = {},
          p = {};
        r = r || {}, r.validate = "validate" in r ? r.validate : !0, r.root_name = r.root_name || "body", u.schema = l = l || new t, u.filterNode = function(e) {
          var t, n, r;
          n in d && (r = h[n], r ? r.push(e) : h[n] = [e]), t = f.length;
          for (; t--;) n = f[t].name, n in e.attributes.map && (r = p[n], r ? r.push(e) : p[n] = [e]);
          return e
        }, u.addNodeFilter = function(e, t) {
          o(a(e), function(e) {
            var n = d[e];
            n || (d[e] = n = []), n.push(t)
          })
        }, u.addAttributeFilter = function(e, t) {
          o(a(e), function(e) {
            var n;
            for (n = 0; n < f.length; n++)
              if (f[n].name === e) return void f[n].callbacks.push(t);
            f.push({
              name: e,
              callbacks: [t]
            })
          })
        }, u.parse = function(t, o) {
          function a() {
            function e(e) {
              e && (t = e.firstChild, t && 3 == t.type && (t.value = t.value.replace(R, "")), t = e.lastChild, t && 3 == t.type && (t.value = t.value.replace(D, "")))
            }
            var t = y.firstChild,
              n, i;
            if (l.isValidChild(y.name, I.toLowerCase())) {
              for (; t;) n = t.next, 3 == t.type || 1 == t.type && "p" !== t.name && !T[t.name] && !t.attr("data-mce-type") ? i ? i.append(t) : (i = u(I, 1), i.attr(r.forced_root_block_attrs), y.insert(i, t), i.append(t)) : (e(i), i = null), t = n;
              e(i)
            }
          }

          function u(t, n) {
            var r = new e(t, n),
              i;
            return t in d && (i = h[t], i ? i.push(r) : h[t] = [r]), r
          }

          function m(e) {
            var t, n, r, i, o = l.getBlockElements();
            for (t = e.prev; t && 3 === t.type;) {
              if (r = t.value.replace(D, ""), r.length > 0) return void(t.value = r);
              if (n = t.next) {
                if (3 == n.type && n.value.length) {
                  t = t.prev;
                  continue
                }
                if (!o[n.name] && "script" != n.name && "style" != n.name) {
                  t = t.prev;
                  continue
                }
              }
              i = t.prev, t.remove(), t = i
            }
          }

          function g(e) {
            var t, n = {};
            for (t in e) "li" !== t && "p" != t && (n[t] = e[t]);
            return n
          }
          var v, y, b, C, x, w, E, N, _, S, k, T, R, A = [],
            B, D, M, L, P, H, O, I;
          if (o = o || {}, h = {}, p = {}, T = s(i("script,style,head,html,body,title,meta,param"), l.getBlockElements()), O = l.getNonEmptyElements(), H = l.children, k = r.validate, I = "forced_root_block" in o ? o.forced_root_block : r.forced_root_block, P = l.getWhiteSpaceElements(), R = /^[ \t\r\n]+/, D = /[ \t\r\n]+$/, M = /[ \t\r\n]+/g, L = /^[ \t\r\n]+$/, v = new n({
              validate: k,
              allow_script_urls: r.allow_script_urls,
              allow_conditional_comments: r.allow_conditional_comments,
              self_closing_elements: g(l.getSelfClosingElements()),
              cdata: function(e) {
                b.append(u("#cdata", 4)).value = e
              },
              text: function(e, t) {
                var n;
                B || (e = e.replace(M, " "), b.lastChild && T[b.lastChild.name] && (e = e.replace(R, ""))), 0 !== e.length && (n = u("#text", 3), n.raw = !!t, b.append(n).value = e)
              },
              comment: function(e) {
                b.append(u("#comment", 8)).value = e
              },
              pi: function(e, t) {
                b.append(u(e, 7)).value = t, m(b)
              },
              doctype: function(e) {
                var t;
                t = b.append(u("#doctype", 10)), t.value = e, m(b)
              },
              start: function(e, t, n) {
                var r, i, o, a, s;
                if (o = k ? l.getElementRule(e) : {}) {
                  for (r = u(o.outputName || e, 1), r.attributes = t, r.shortEnded = n, b.append(r), s = H[b.name], s && H[r.name] && !s[r.name] && A.push(r), i = f.length; i--;) a = f[i].name, a in t.map && (_ = p[a], _ ? _.push(r) : p[a] = [r]);
                  T[e] && m(r), n || (b = r), !B && P[e] && (B = !0)
                }
              },
              end: function(t) {
                var n, r, i, o, a;
                if (r = k ? l.getElementRule(t) : {}) {
                  if (T[t] && !B) {
                    if (n = b.firstChild, n && 3 === n.type)
                      if (i = n.value.replace(R, ""), i.length > 0) n.value = i, n = n.next;
                      else
                        for (o = n.next, n.remove(), n = o; n && 3 === n.type;) i = n.value, o = n.next, (0 === i.length || L.test(i)) && (n.remove(), n = o), n = o;
                    if (n = b.lastChild, n && 3 === n.type)
                      if (i = n.value.replace(D, ""), i.length > 0) n.value = i, n = n.prev;
                      else
                        for (o = n.prev, n.remove(), n = o; n && 3 === n.type;) i = n.value, o = n.prev, (0 === i.length || L.test(i)) && (n.remove(), n = o), n = o
                  }
                  if (B && P[t] && (B = !1), (r.removeEmpty || r.paddEmpty) && b.isEmpty(O))
                    if (r.paddEmpty) b.empty().append(new e("#text", "3")).value = "\xa0";
                    else if (!b.attributes.map.name && !b.attributes.map.id) return a = b.parent, T[b.name] ? b.empty().remove() : b.unwrap(), void(b = a);
                  b = b.parent
                }
              }
            }, l), y = b = new e(o.context || r.root_name, 11), v.parse(t), k && A.length && (o.context ? o.invalid = !0 : c(A)), I && ("body" == y.name || o.isRootContent) && a(), !o.invalid) {
            for (S in h) {
              for (_ = d[S], C = h[S], E = C.length; E--;) C[E].parent || C.splice(E, 1);
              for (x = 0, w = _.length; w > x; x++) _[x](C, S, o)
            }
            for (x = 0, w = f.length; w > x; x++)
              if (_ = f[x], _.name in p) {
                for (C = p[_.name], E = C.length; E--;) C[E].parent || C.splice(E, 1);
                for (E = 0, N = _.callbacks.length; N > E; E++) _.callbacks[E](C, _.name, o)
              }
          }
          return y
        }, r.remove_trailing_brs && u.addNodeFilter("br", function(t) {
          var n, r = t.length,
            i, o = s({}, l.getBlockElements()),
            a = l.getNonEmptyElements(),
            c, u, d, f, h, p;
          for (o.body = 1, n = 0; r > n; n++)
            if (i = t[n], c = i.parent, o[i.parent.name] && i === c.lastChild) {
              for (d = i.prev; d;) {
                if (f = d.name, "span" !== f || "bookmark" !== d.attr("data-mce-type")) {
                  if ("br" !== f) break;
                  if ("br" === f) {
                    i = null;
                    break
                  }
                }
                d = d.prev
              }
              i && (i.remove(), c.isEmpty(a) && (h = l.getElementRule(c.name), h && (h.removeEmpty ? c.remove() : h.paddEmpty && (c.empty().append(new e("#text", 3)).value = "\xa0"))))
            } else {
              for (u = i; c && c.firstChild === u && c.lastChild === u && (u = c, !o[c.name]);) c = c.parent;
              u === c && (p = new e("#text", 3), p.value = "\xa0", i.replace(p))
            }
        }), r.allow_html_in_named_anchor || u.addAttributeFilter("id,name", function(e) {
          for (var t = e.length, n, r, i, o; t--;)
            if (o = e[t], "a" === o.name && o.firstChild && !o.attr("href")) {
              i = o.parent, n = o.lastChild;
              do r = n.prev, i.insert(n, o), n = r; while (n)
            }
        }), r.validate && l.getValidClasses() && u.addAttributeFilter("class", function(e) {
          for (var t = e.length, n, r, i, o, a, s = l.getValidClasses(), c, u; t--;) {
            for (n = e[t], r = n.attr("class").split(" "), a = "", i = 0; i < r.length; i++) o = r[i], u = !1, c = s["*"], c && c[o] && (u = !0), c = s[n.name], !u && c && c[o] && (u = !0), u && (a && (a += " "), a += o);
            a.length || (a = null), n.attr("class", a)
          }
        })
      }
    }), r(L, [C, m], function(e, t) {
      var n = t.makeMap;
      return function(t) {
        var r = [],
          i, o, a, s, l;
        return t = t || {}, i = t.indent, o = n(t.indent_before || ""), a = n(t.indent_after || ""), s = e.getEncodeFunc(t.entity_encoding || "raw", t.entities), l = "html" == t.element_format, {
          start: function(e, t, n) {
            var c, u, d, f;
            if (i && o[e] && r.length > 0 && (f = r[r.length - 1], f.length > 0 && "\n" !== f && r.push("\n")), r.push("<", e), t)
              for (c = 0, u = t.length; u > c; c++) d = t[c], r.push(" ", d.name, '="', s(d.value, !0), '"');
            !n || l ? r[r.length] = ">" : r[r.length] = " />", n && i && a[e] && r.length > 0 && (f = r[r.length - 1], f.length > 0 && "\n" !== f && r.push("\n"))
          },
          end: function(e) {
            var t;
            r.push("</", e, ">"), i && a[e] && r.length > 0 && (t = r[r.length - 1], t.length > 0 && "\n" !== t && r.push("\n"))
          },
          text: function(e, t) {
            e.length > 0 && (r[r.length] = t ? e : s(e))
          },
          cdata: function(e) {
            r.push("<![CDATA[", e, "]]>")
          },
          comment: function(e) {
            r.push("<!--", e, "-->")
          },
          pi: function(e, t) {
            t ? r.push("<?", e, " ", s(t), "?>") : r.push("<?", e, "?>"), i && r.push("\n")
          },
          doctype: function(e) {
            r.push("<!DOCTYPE", e, ">", i ? "\n" : "")
          },
          reset: function() {
            r.length = 0
          },
          getContent: function() {
            return r.join("").replace(/\n$/, "")
          }
        }
      }
    }), r(P, [L, B], function(e, t) {
      return function(n, r) {
        var i = this,
          o = new e(n);
        n = n || {}, n.validate = "validate" in n ? n.validate : !0, i.schema = r = r || new t, i.writer = o, i.serialize = function(e) {
          function t(e) {
            var n = i[e.type],
              s, l, c, u, d, f, h, p, m;
            if (n) n(e);
            else {
              if (s = e.name, l = e.shortEnded, c = e.attributes, a && c && c.length > 1 && (f = [], f.map = {}, m = r.getElementRule(e.name))) {
                for (h = 0, p = m.attributesOrder.length; p > h; h++) u = m.attributesOrder[h], u in c.map && (d = c.map[u], f.map[u] = d, f.push({
                  name: u,
                  value: d
                }));
                for (h = 0, p = c.length; p > h; h++) u = c[h].name, u in f.map || (d = c.map[u], f.map[u] = d, f.push({
                  name: u,
                  value: d
                }));
                c = f
              }
              if (o.start(e.name, c, l), !l) {
                if (e = e.firstChild)
                  do t(e); while (e = e.next);
                o.end(s)
              }
            }
          }
          var i, a;
          return a = n.validate, i = {
            3: function(e) {
              o.text(e.value, e.raw)
            },
            8: function(e) {
              o.comment(e.value)
            },
            7: function(e) {
              o.pi(e.name, e.value)
            },
            10: function(e) {
              o.doctype(e.value)
            },
            4: function(e) {
              o.cdata(e.value)
            },
            11: function(e) {
              if (e = e.firstChild)
                do t(e); while (e = e.next)
            }
          }, o.reset(), 1 != e.type || n.inner ? i[11](e) : t(e), o.getContent()
        }
      }
    }), r(H, [w, M, D, C, P, A, B, h, m, S], function(e, t, n, r, i, o, a, s, l, c) {
      function u(e) {
        function t(e) {
          return e && "br" === e.name
        }
        var n, r;
        n = e.lastChild, t(n) && (r = n.prev, t(r) && (n.remove(), r.remove()))
      }
      var d = l.each,
        f = l.trim,
        h = e.DOM,
        p = new RegExp(["<span[^>]+data-mce-bogus[^>]+>[\u200b\ufeff]+<\\/span>", '\\s?data-mce-selected="[^"]+"'].join("|"), "gi");
      return function(e, o) {
        function l() {
          var e = o.getBody().innerHTML,
            t = /<(\w+) [^>]*data-mce-bogus="all"[^>]*>/g,
            r, i, a, s, l, u = o.schema;
          for (e = c.trim(e.replace(p, "")), l = u.getShortEndedElements(); s = t.exec(e);) i = t.lastIndex, a = s[0].length, r = l[s[1]] ? i : n.findEndTag(u, e, i), e = e.substring(0, i - a) + e.substring(r), t.lastIndex = i - a;
          return f(e)
        }
        var m, g, v;
        return o && (m = o.dom, g = o.schema), m = m || h, g = g || new a(e), e.entity_encoding = e.entity_encoding || "named", e.remove_trailing_brs = "remove_trailing_brs" in e ? e.remove_trailing_brs : !0, v = new t(e, g), v.addAttributeFilter("data-mce-tabindex", function(e, t) {
          for (var n = e.length, r; n--;) r = e[n], r.attr("tabindex", r.attributes.map["data-mce-tabindex"]), r.attr(t, null)
        }), v.addAttributeFilter("src,href,style", function(t, n) {
          for (var r = t.length, i, o, a = "data-mce-" + n, s = e.url_converter, l = e.url_converter_scope, c; r--;) i = t[r], o = i.attributes.map[a], o !== c ? (i.attr(n, o.length > 0 ? o : null), i.attr(a, null)) : (o = i.attributes.map[n], "style" === n ? o = m.serializeStyle(m.parseStyle(o), i.name) : s && (o = s.call(l, o, n, i.name)), i.attr(n, o.length > 0 ? o : null))
        }), v.addAttributeFilter("class", function(e) {
          for (var t = e.length, n, r; t--;) n = e[t], r = n.attr("class"), r && (r = n.attr("class").replace(/(?:^|\s)mce-item-\w+(?!\S)/g, ""), n.attr("class", r.length > 0 ? r : null))
        }), v.addAttributeFilter("data-mce-type", function(e, t, n) {
          for (var r = e.length, i; r--;) i = e[r], "bookmark" !== i.attributes.map["data-mce-type"] || n.cleanup || i.remove()
        }), v.addNodeFilter("noscript", function(e) {
          for (var t = e.length, n; t--;) n = e[t].firstChild, n && (n.value = r.decode(n.value))
        }), v.addNodeFilter("script,style", function(e, t) {
          function n(e) {
            return e.replace(/(<!--\[CDATA\[|\]\]-->)/g, "\n").replace(/^[\r\n]*|[\r\n]*$/g, "").replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi, "").replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g, "")
          }
          for (var r = e.length, i, o, a; r--;) i = e[r], o = i.firstChild ? i.firstChild.value : "", "script" === t ? (a = i.attr("type"), a && i.attr("type", "mce-no/type" == a ? null : a.replace(/^mce\-/, "")), o.length > 0 && (i.firstChild.value = "// <![CDATA[\n" + n(o) + "\n// ]]>")) : o.length > 0 && (i.firstChild.value = "<!--\n" + n(o) + "\n-->")
        }), v.addNodeFilter("#comment", function(e) {
          for (var t = e.length, n; t--;) n = e[t], 0 === n.value.indexOf("[CDATA[") ? (n.name = "#cdata", n.type = 4, n.value = n.value.replace(/^\[CDATA\[|\]\]$/g, "")) : 0 === n.value.indexOf("mce:protected ") && (n.name = "#text", n.type = 3, n.raw = !0, n.value = unescape(n.value).substr(14))
        }), v.addNodeFilter("xml:namespace,input", function(e, t) {
          for (var n = e.length, r; n--;) r = e[n], 7 === r.type ? r.remove() : 1 === r.type && ("input" !== t || "type" in r.attributes.map || r.attr("type", "text"))
        }), e.fix_list_elements && v.addNodeFilter("ul,ol", function(e) {
          for (var t = e.length, n, r; t--;) n = e[t], r = n.parent, ("ul" === r.name || "ol" === r.name) && n.prev && "li" === n.prev.name && n.prev.append(n)
        }), v.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style,data-mce-selected,data-mce-expando,data-mce-type,data-mce-resize", function(e, t) {
          for (var n = e.length; n--;) e[n].attr(t, null)
        }), {
          schema: g,
          addNodeFilter: v.addNodeFilter,
          addAttributeFilter: v.addAttributeFilter,
          serialize: function(t, n) {
            var r = this,
              o, a, l, h, p, y;
            return s.ie && m.select("script,style,select,map").length > 0 ? (p = t.innerHTML, t = t.cloneNode(!1), m.setHTML(t, p)) : t = t.cloneNode(!0), o = t.ownerDocument.implementation, o.createHTMLDocument && (a = o.createHTMLDocument(""), d("BODY" == t.nodeName ? t.childNodes : [t], function(e) {
              a.body.appendChild(a.importNode(e, !0))
            }), t = "BODY" != t.nodeName ? a.body.firstChild : a.body, l = m.doc, m.doc = a), n = n || {}, n.format = n.format || "html", n.selection && (n.forced_root_block = ""), n.no_events || (n.node = t, r.onPreProcess(n)), y = v.parse(f(n.getInner ? t.innerHTML : m.getOuterHTML(t)), n), u(y), h = new i(e, g), n.content = h.serialize(y), n.cleanup || (n.content = c.trim(n.content), n.content = n.content.replace(/\uFEFF/g, "")), n.no_events || r.onPostProcess(n), l && (m.doc = l), n.node = null, n.content
          },
          addRules: function(e) {
            g.addValidElements(e)
          },
          setRules: function(e) {
            g.setValidElements(e)
          },
          onPreProcess: function(e) {
            o && o.fire("PreProcess", e)
          },
          onPostProcess: function(e) {
            o && o.fire("PostProcess", e)
          },
          getTrimmedContent: l
        }
      }
    }), r(O, [], function() {
      function e(e) {
        function t(t, n) {
          var r, i = 0,
            o, a, s, l, c, u, d = -1,
            f;
          if (r = t.duplicate(), r.collapse(n), f = r.parentElement(), f.ownerDocument === e.dom.doc) {
            for (;
              "false" === f.contentEditable;) f = f.parentNode;
            if (!f.hasChildNodes()) return {
              node: f,
              inside: 1
            };
            for (s = f.children, o = s.length - 1; o >= i;)
              if (u = Math.floor((i + o) / 2), l = s[u], r.moveToElementText(l), d = r.compareEndPoints(n ? "StartToStart" : "EndToEnd", t), d > 0) o = u - 1;
              else {
                if (!(0 > d)) return {
                  node: l
                };
                i = u + 1
              }
            if (0 > d)
              for (l ? r.collapse(!1) : (r.moveToElementText(f), r.collapse(!0), l = f, a = !0), c = 0; 0 !== r.compareEndPoints(n ? "StartToStart" : "StartToEnd", t) && 0 !== r.move("character", 1) && f == r.parentElement();) c++;
            else
              for (r.collapse(!0), c = 0; 0 !== r.compareEndPoints(n ? "StartToStart" : "StartToEnd", t) && 0 !== r.move("character", -1) && f == r.parentElement();) c++;
            return {
              node: l,
              position: d,
              offset: c,
              inside: a
            }
          }
        }

        function n() {
          function n(e) {
            var n = t(o, e),
              r, i, s = 0,
              l, c, u;
            if (r = n.node, i = n.offset, n.inside && !r.hasChildNodes()) return void a[e ? "setStart" : "setEnd"](r, 0);
            if (i === c) return void a[e ? "setStartBefore" : "setEndAfter"](r);
            if (n.position < 0) {
              if (l = n.inside ? r.firstChild : r.nextSibling, !l) return void a[e ? "setStartAfter" : "setEndAfter"](r);
              if (!i) return void(3 == l.nodeType ? a[e ? "setStart" : "setEnd"](l, 0) : a[e ? "setStartBefore" : "setEndBefore"](l));
              for (; l;) {
                if (3 == l.nodeType && (u = l.nodeValue, s += u.length, s >= i)) {
                  r = l, s -= i, s = u.length - s;
                  break
                }
                l = l.nextSibling
              }
            } else {
              if (l = r.previousSibling, !l) return a[e ? "setStartBefore" : "setEndBefore"](r);
              if (!i) return void(3 == r.nodeType ? a[e ? "setStart" : "setEnd"](l, r.nodeValue.length) : a[e ? "setStartAfter" : "setEndAfter"](l));
              for (; l;) {
                if (3 == l.nodeType && (s += l.nodeValue.length, s >= i)) {
                  r = l, s -= i;
                  break
                }
                l = l.previousSibling
              }
            }
            a[e ? "setStart" : "setEnd"](r, s)
          }
          var o = e.getRng(),
            a = i.createRng(),
            s, l, c, u, d;
          if (s = o.item ? o.item(0) : o.parentElement(), s.ownerDocument != i.doc) return a;
          if (l = e.isCollapsed(), o.item) return a.setStart(s.parentNode, i.nodeIndex(s)), a.setEnd(a.startContainer, a.startOffset + 1), a;
          try {
            n(!0), l || n()
          } catch (f) {
            if (-2147024809 != f.number) throw f;
            d = r.getBookmark(2), c = o.duplicate(), c.collapse(!0), s = c.parentElement(), l || (c = o.duplicate(), c.collapse(!1), u = c.parentElement(), u.innerHTML = u.innerHTML), s.innerHTML = s.innerHTML, r.moveToBookmark(d), o = e.getRng(), n(!0), l || n()
          }
          return a
        }
        var r = this,
          i = e.dom,
          o = !1;
        this.getBookmark = function(n) {
          function r(e) {
            var t, n, r, o, a = [];
            for (t = e.parentNode, n = i.getRoot().parentNode; t != n && 9 !== t.nodeType;) {
              for (r = t.children, o = r.length; o--;)
                if (e === r[o]) {
                  a.push(o);
                  break
                }
              e = t, t = t.parentNode
            }
            return a
          }

          function o(e) {
            var n;
            return n = t(a, e), n ? {
              position: n.position,
              offset: n.offset,
              indexes: r(n.node),
              inside: n.inside
            } : void 0
          }
          var a = e.getRng(),
            s = {};
          return 2 === n && (a.item ? s.start = {
            ctrl: !0,
            indexes: r(a.item(0))
          } : (s.start = o(!0), e.isCollapsed() || (s.end = o()))), s
        }, this.moveToBookmark = function(e) {
          function t(e) {
            var t, n, r, o;
            for (t = i.getRoot(), n = e.length - 1; n >= 0; n--) o = t.children, r = e[n], r <= o.length - 1 && (t = o[r]);
            return t
          }

          function n(n) {
            var i = e[n ? "start" : "end"],
              a, s, l, c;
            i && (a = i.position > 0, s = o.createTextRange(), s.moveToElementText(t(i.indexes)), c = i.offset, c !== l ? (s.collapse(i.inside || a), s.moveStart("character", a ? -c : c)) : s.collapse(n), r.setEndPoint(n ? "StartToStart" : "EndToStart", s), n && r.collapse(!0))
          }
          var r, o = i.doc.body;
          e.start && (e.start.ctrl ? (r = o.createControlRange(), r.addElement(t(e.start.indexes)), r.select()) : (r = o.createTextRange(), n(!0), n(), r.select()))
        }, this.addRange = function(t) {
          function n(e) {
            var t, n, a, d, p;
            a = i.create("a"), t = e ? s : c, n = e ? l : u, d = r.duplicate(), (t == f || t == f.documentElement) && (t = h, n = 0), 3 == t.nodeType ? (t.parentNode.insertBefore(a, t), d.moveToElementText(a), d.moveStart("character", n), i.remove(a), r.setEndPoint(e ? "StartToStart" : "EndToEnd", d)) : (p = t.childNodes, p.length ? (n >= p.length ? i.insertAfter(a, p[p.length - 1]) : t.insertBefore(a, p[n]), d.moveToElementText(a)) : t.canHaveHTML && (t.innerHTML = "<span>&#xFEFF;</span>", a = t.firstChild, d.moveToElementText(a), d.collapse(o)), r.setEndPoint(e ? "StartToStart" : "EndToEnd", d), i.remove(a))
          }
          var r, a, s, l, c, u, d, f = e.dom.doc,
            h = f.body,
            p, m;
          if (s = t.startContainer, l = t.startOffset, c = t.endContainer, u = t.endOffset, r = h.createTextRange(), s == c && 1 == s.nodeType) {
            if (l == u && !s.hasChildNodes()) {
              if (s.canHaveHTML) return d = s.previousSibling, d && !d.hasChildNodes() && i.isBlock(d) ? d.innerHTML = "&#xFEFF;" : d = null, s.innerHTML = "<span>&#xFEFF;</span><span>&#xFEFF;</span>", r.moveToElementText(s.lastChild), r.select(), i.doc.selection.clear(), s.innerHTML = "", void(d && (d.innerHTML = ""));
              l = i.nodeIndex(s), s = s.parentNode
            }
            if (l == u - 1) try {
              if (m = s.childNodes[l], a = h.createControlRange(), a.addElement(m), a.select(), p = e.getRng(), p.item && m === p.item(0)) return
            } catch (g) {}
          }
          n(!0), n(), r.select()
        }, this.getRangeAt = n
      }
      return e
    }), r(I, [h], function(e) {
      return {
        BACKSPACE: 8,
        DELETE: 46,
        DOWN: 40,
        ENTER: 13,
        LEFT: 37,
        RIGHT: 39,
        SPACEBAR: 32,
        TAB: 9,
        UP: 38,
        modifierPressed: function(e) {
          return e.shiftKey || e.ctrlKey || e.altKey || this.metaKeyPressed(e)
        },
        metaKeyPressed: function(t) {
          return e.mac ? t.metaKey : t.ctrlKey && !t.altKey
        }
      }
    }), r(F, [I, m, u, h, _], function(e, t, n, r, i) {
      var o = i.isContentEditableFalse;
      return function(i, a) {
        function s(e) {
          var t = a.settings.object_resizing;
          return t === !1 || r.iOS ? !1 : ("string" != typeof t && (t = "table,img,div"), "false" === e.getAttribute("data-mce-resize") ? !1 : e == a.getBody() ? !1 : a.dom.is(e, t))
        }

        function l(t) {
          var n, r, i, o, s;
          n = t.screenX - B, r = t.screenY - D, F = n * R[2] + P, z = r * R[3] + H, F = 5 > F ? 5 : F, z = 5 > z ? 5 : z, i = "IMG" == _.nodeName && a.settings.resize_img_proportional !== !1 ? !e.modifierPressed(t) : e.modifierPressed(t) || "IMG" == _.nodeName && R[2] * R[3] !== 0, i && ($(n) > $(r) ? (z = q(F * O), F = q(z / O)) : (F = q(z / O), z = q(F * O))), E.setStyles(S, {
            width: F,
            height: z
          }), o = R.startPos.x + n, s = R.startPos.y + r, o = o > 0 ? o : 0, s = s > 0 ? s : 0, E.setStyles(k, {
            left: o,
            top: s,
            display: "block"
          }), k.innerHTML = F + " &times; " + z, R[2] < 0 && S.clientWidth <= F && E.setStyle(S, "left", M + (P - F)), R[3] < 0 && S.clientHeight <= z && E.setStyle(S, "top", L + (H - z)), n = j.scrollWidth - Y, r = j.scrollHeight - X, n + r !== 0 && E.setStyles(k, {
            left: o - n,
            top: s - r
          }), I || (a.fire("ObjectResizeStart", {
            target: _,
            width: P,
            height: H
          }), I = !0)
        }

        function c() {
          function e(e, t) {
            t && (_.style[e] || !a.schema.isValid(_.nodeName.toLowerCase(), e) ? E.setStyle(_, e, t) : E.setAttrib(_, e, t))
          }
          I = !1, e("width", F), e("height", z), E.unbind(W, "mousemove", l), E.unbind(W, "mouseup", c), V != W && (E.unbind(V, "mousemove", l), E.unbind(V, "mouseup", c)), E.remove(S), E.remove(k), U && "TABLE" != _.nodeName || u(_), a.fire("ObjectResized", {
            target: _,
            width: F,
            height: z
          }), E.setAttrib(_, "style", E.getAttrib(_, "style")), a.nodeChanged()
        }

        function u(e, t, n) {
          var i, o, u, f, h;
          d(), b(), i = E.getPos(e, j), M = i.x, L = i.y, h = e.getBoundingClientRect(), o = h.width || h.right - h.left, u = h.height || h.bottom - h.top, _ != e && (y(), _ = e, F = z = 0), f = a.fire("ObjectSelected", {
            target: e
          }), s(e) && !f.isDefaultPrevented() ? N(T, function(e, i) {
            function a(t) {
              B = t.screenX, D = t.screenY, P = _.clientWidth, H = _.clientHeight, O = H / P, R = e, e.startPos = {
                x: o * e[0] + M,
                y: u * e[1] + L
              }, Y = j.scrollWidth, X = j.scrollHeight, S = _.cloneNode(!0), E.addClass(S, "mce-clonedresizable"), E.setAttrib(S, "data-mce-bogus", "all"), S.contentEditable = !1, S.unSelectabe = !0, E.setStyles(S, {
                left: M,
                top: L,
                margin: 0
              }), S.removeAttribute("data-mce-selected"), j.appendChild(S), E.bind(W, "mousemove", l), E.bind(W, "mouseup", c), V != W && (E.bind(V, "mousemove", l), E.bind(V, "mouseup", c)), k = E.add(j, "div", {
                "class": "mce-resize-helper",
                "data-mce-bogus": "all"
              }, P + " &times; " + H)
            }
            var s;
            return t ? void(i == t && a(n)) : (s = E.get("mceResizeHandle" + i), s && E.remove(s), s = E.add(j, "div", {
              id: "mceResizeHandle" + i,
              "data-mce-bogus": "all",
              "class": "mce-resizehandle",
              unselectable: !0,
              style: "cursor:" + i + "-resize; margin:0; padding:0"
            }), r.ie && (s.contentEditable = !1), E.bind(s, "mousedown", function(e) {
              e.stopImmediatePropagation(), e.preventDefault(), a(e)
            }), e.elm = s, void E.setStyles(s, {
              left: o * e[0] + M - s.offsetWidth / 2,
              top: u * e[1] + L - s.offsetHeight / 2
            }))
          }) : d(), _.setAttribute("data-mce-selected", "1")
        }

        function d() {
          var e, t;
          b(), _ && _.removeAttribute("data-mce-selected");
          for (e in T) t = E.get("mceResizeHandle" + e), t && (E.unbind(t), E.remove(t))
        }

        function f(e) {
          function t(e, t) {
            if (e)
              do
                if (e === t) return !0; while (e = e.parentNode)
          }
          var n, r;
          if (!I && !a.removed) return N(E.select("img[data-mce-selected],hr[data-mce-selected]"), function(e) {
            e.removeAttribute("data-mce-selected")
          }), r = "mousedown" == e.type ? e.target : i.getNode(), r = E.$(r).closest(U ? "table" : "table,img,hr")[0], t(r, j) && (C(), n = i.getStart(!0), t(n, r) && t(i.getEnd(!0), r) && (!U || r != n && "IMG" !== n.nodeName)) ? void u(r) : void d()
        }

        function h(e, t, n) {
          e && e.attachEvent && e.attachEvent("on" + t, n)
        }

        function p(e, t, n) {
          e && e.detachEvent && e.detachEvent("on" + t, n)
        }

        function m(e) {
          var t = e.srcElement,
            n, r, i, o, s, l, c;
          n = t.getBoundingClientRect(), l = A.clientX - n.left, c = A.clientY - n.top;
          for (r in T)
            if (i = T[r], o = t.offsetWidth * i[0], s = t.offsetHeight * i[1], $(o - l) < 8 && $(s - c) < 8) {
              R = i;
              break
            }
          I = !0, a.fire("ObjectResizeStart", {
            target: _,
            width: _.clientWidth,
            height: _.clientHeight
          }), a.getDoc().selection.empty(), u(t, r, A)
        }

        function g(e) {
          e.preventDefault ? e.preventDefault() : e.returnValue = !1
        }

        function v(e) {
          var t = e.srcElement;
          if (o(t)) return void g(e);
          if (t != _) {
            if (a.fire("ObjectSelected", {
                target: t
              }), y(), 0 === t.id.indexOf("mceResizeHandle")) return void(e.returnValue = !1);
            ("IMG" == t.nodeName || "TABLE" == t.nodeName) && (d(), _ = t, h(t, "resizestart", m))
          }
        }

        function y() {
          p(_, "resizestart", m)
        }

        function b() {
          for (var e in T) {
            var t = T[e];
            t.elm && (E.unbind(t.elm), delete t.elm)
          }
        }

        function C() {
          try {
            a.getDoc().execCommand("enableObjectResizing", !1, !1)
          } catch (e) {}
        }

        function x(e) {
          var t;
          if (U) {
            t = W.body.createControlRange();
            try {
              return t.addElement(e), t.select(), !0
            } catch (n) {}
          }
        }

        function w() {
          _ = S = null, U && (y(), p(j, "controlselect", v))
        }
        var E = a.dom,
          N = t.each,
          _, S, k, T, R, A, B, D, M, L, P, H, O, I, F, z, W = a.getDoc(),
          V = document,
          U = r.ie && r.ie < 11,
          $ = Math.abs,
          q = Math.round,
          j = a.getBody(),
          Y, X;
        T = {
          nw: [0, 0, -1, -1],
          ne: [1, 0, 1, -1],
          se: [1, 1, 1, 1],
          sw: [0, 1, -1, 1]
        };
        var K = ".mce-content-body";
        return a.contentStyles.push(K + " div.mce-resizehandle {position: absolute;border: 1px solid black;background: #FFF;width: 7px;height: 7px;z-index: 10000}" + K + " .mce-resizehandle:hover {background: #000}" + K + " *[data-mce-selected] {outline: 1px solid black;resize: none}" + K + " .mce-clonedresizable {position: absolute;" + (r.gecko ? "" : "outline: 1px dashed black;") + "opacity: .5;filter: alpha(opacity=50);z-index: 10000}" + K + " .mce-resize-helper {background: #555;background: rgba(0,0,0,0.75);border-radius: 3px;border: 1px;color: white;display: none;font-family: sans-serif;font-size: 12px;white-space: nowrap;line-height: 14px;margin: 5px 10px;padding: 5px;position: absolute;z-index: 10001}"), a.on("init", function() {
          U ? (a.on("ObjectResized", function(e) {
            "TABLE" != e.target.nodeName && (d(), x(e.target))
          }), h(j, "controlselect", v), a.on("mousedown", function(e) {
            A = e
          })) : (C(), r.ie >= 11 && (a.on("mousedown click", function(e) {
            var t = e.target.nodeName;
            !I && /^(TABLE|IMG|HR)$/.test(t) && (a.selection.select(e.target, "TABLE" == t), "mousedown" == e.type && a.nodeChanged())
          }), a.dom.bind(j, "mscontrolselect", function(e) {
            function t(e) {
              n.setEditorTimeout(a, function() {
                a.selection.select(e)
              })
            }
            return o(e.target) ? (e.preventDefault(), void t(e.target)) : void(/^(TABLE|IMG|HR)$/.test(e.target.nodeName) && (e.preventDefault(), "IMG" == e.target.tagName && t(e.target)))
          })));
          var e = n.throttle(f);
          a.on("nodechange ResizeEditor ResizeWindow drop", e), a.on("keydown keyup", function(t) {
            _ && "TABLE" == _.nodeName && e(t)
          }), a.on("hide blur", d)
        }), a.on("remove", b), {
          isResizable: s,
          showResizeRect: u,
          hideResizeRect: d,
          updateResizeRect: f,
          controlSelect: x,
          destroy: w
        }
      }
    }), r(z, [], function() {
      function e(e) {
        return function() {
          return e
        }
      }

      function t(e) {
        return function(t) {
          return !e(t)
        }
      }

      function n(e, t) {
        return function(n) {
          return e(t(n))
        }
      }

      function r() {
        var e = a.call(arguments);
        return function(t) {
          for (var n = 0; n < e.length; n++)
            if (e[n](t)) return !0;
          return !1
        }
      }

      function i() {
        var e = a.call(arguments);
        return function(t) {
          for (var n = 0; n < e.length; n++)
            if (!e[n](t)) return !1;
          return !0
        }
      }

      function o(e) {
        var t = a.call(arguments);
        return t.length - 1 >= e.length ? e.apply(this, t.slice(1)) : function() {
          var e = t.concat([].slice.call(arguments));
          return o.apply(this, e)
        }
      }
      var a = [].slice;
      return {
        constant: e,
        negate: t,
        and: i,
        or: r,
        curry: o,
        compose: n
      }
    }), r(W, [_, p, k], function(e, t, n) {
      function r(e) {
        return m(e) ? !1 : d(e) ? f(e.parentNode) ? !1 : !0 : h(e) || u(e) || p(e) || c(e)
      }

      function i(e, t) {
        for (e = e.parentNode; e && e != t; e = e.parentNode) {
          if (c(e)) return !1;
          if (l(e)) return !0
        }
        return !0
      }

      function o(e) {
        return c(e) ? t.reduce(e.getElementsByTagName("*"), function(e, t) {
          return e || l(t)
        }, !1) !== !0 : !1
      }

      function a(e) {
        return h(e) || o(e)
      }

      function s(e, t) {
        return r(e) && i(e, t)
      }
      var l = e.isContentEditableTrue,
        c = e.isContentEditableFalse,
        u = e.isBr,
        d = e.isText,
        f = e.matchNodeNames("script style textarea"),
        h = e.matchNodeNames("img input textarea hr iframe video audio object"),
        p = e.matchNodeNames("table"),
        m = n.isCaretContainer;
      return {
        isCaretCandidate: r,
        isInEditable: i,
        isAtomic: a,
        isEditableCaretCandidate: s
      }
    }), r(V, [], function() {
      function e(e) {
        return e ? {
          left: c(e.left),
          top: c(e.top),
          bottom: c(e.bottom),
          right: c(e.right),
          width: c(e.width),
          height: c(e.height)
        } : {
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          width: 0,
          height: 0
        }
      }

      function t(t, n) {
        return t = e(t), n ? t.right = t.left : (t.left = t.left + t.width, t.right = t.left), t.width = 0, t
      }

      function n(e, t) {
        return e.left === t.left && e.top === t.top && e.bottom === t.bottom && e.right === t.right
      }

      function r(e, t, n) {
        return e >= 0 && e <= Math.min(t.height, n.height) / 2;
      }

      function i(e, t) {
        return e.bottom < t.top ? !0 : e.top > t.bottom ? !1 : r(t.top - e.bottom, e, t)
      }

      function o(e, t) {
        return e.top > t.bottom ? !0 : e.bottom < t.top ? !1 : r(t.bottom - e.top, e, t)
      }

      function a(e, t) {
        return e.left < t.left
      }

      function s(e, t) {
        return e.right > t.right
      }

      function l(e, t) {
        return i(e, t) ? -1 : o(e, t) ? 1 : a(e, t) ? -1 : s(e, t) ? 1 : 0
      }
      var c = Math.round;
      return {
        clone: e,
        collapse: t,
        isEqual: n,
        isAbove: i,
        isBelow: o,
        isLeft: a,
        isRight: s,
        compare: l
      }
    }), r(U, [], function() {
      function e(e) {
        return "string" == typeof e && e.charCodeAt(0) >= 768 && t.test(e)
      }
      var t = new RegExp("[\u0300-\u036f\u0483-\u0487\u0488-\u0489\u0591-\u05bd\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e3-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962-\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2-\u09e3\u0a01-\u0a02\u0a3c\u0a41-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a51\u0a70-\u0a71\u0a75\u0a81-\u0a82\u0abc\u0ac1-\u0ac5\u0ac7-\u0ac8\u0acd\u0ae2-\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62-\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c00\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c62-\u0c63\u0c81\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc-\u0ccd\u0cd5-\u0cd6\u0ce2-\u0ce3\u0d01\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62-\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039-\u103a\u103d-\u103e\u1058-\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17b4-\u17b5\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193b\u1a17-\u1a18\u1a1b\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1ab0-\u1abd\u1abe\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80-\u1b81\u1ba2-\u1ba5\u1ba8-\u1ba9\u1bab-\u1bad\u1be6\u1be8-\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1cf4\u1cf8-\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u200c-\u200d\u20d0-\u20dc\u20dd-\u20e0\u20e1\u20e2-\u20e4\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302d\u302e-\u302f\u3099-\u309a\ua66f\ua670-\ua672\ua674-\ua67d\ua69e-\ua69f\ua6f0-\ua6f1\ua802\ua806\ua80b\ua825-\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\ua9e5\uaa29-\uaa2e\uaa31-\uaa32\uaa35-\uaa36\uaa43\uaa4c\uaa7c\uaab0\uaab2-\uaab4\uaab7-\uaab8\uaabe-\uaabf\uaac1\uaaec-\uaaed\uaaf6\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\uff9e-\uff9f]");
      return {
        isExtendingChar: e
      }
    }), r($, [z, _, w, T, W, V, U], function(e, t, n, r, i, o, a) {
      function s(e) {
        return e && /[\r\n\t ]/.test(e)
      }

      function l(e) {
        var t = e.startContainer,
          n = e.startOffset,
          r;
        return s(e.toString()) && g(t.parentNode) && (r = t.data, s(r[n - 1]) || s(r[n + 1])) ? !0 : !1
      }

      function c(e) {
        function t(e) {
          var t = e.ownerDocument,
            n = t.createRange(),
            r = t.createTextNode("\xa0"),
            i = e.parentNode,
            a;
          return i.insertBefore(r, e), n.setStart(r, 0), n.setEnd(r, 1), a = o.clone(n.getBoundingClientRect()), i.removeChild(r), a
        }

        function n(e) {
          var n, r;
          return r = e.getClientRects(), n = r.length > 0 ? o.clone(r[0]) : o.clone(e.getBoundingClientRect()), y(e) && 0 === n.left ? t(e) : n
        }

        function r(e, t) {
          return e = o.collapse(e, t), e.width = 1, e.right = e.left + 1, e
        }

        function i(e) {
          0 !== e.height && (c.length > 0 && o.isEqual(e, c[c.length - 1]) || c.push(e))
        }

        function s(e, t) {
          var o = e.ownerDocument.createRange();
          return t < e.data.length && a.isExtendingChar(e.data[t]) ? c : (t > 0 && (o.setStart(e, t - 1), o.setEnd(e, t), l(o) || i(r(n(o), !1))), void(t < e.data.length && (o.setStart(e, t), o.setEnd(e, t + 1), l(o) || i(r(n(o), !0)))))
        }
        var c = [],
          u, f;
        if (v(e.container())) return s(e.container(), e.offset()), c;
        if (d(e.container()))
          if (e.isAtEnd()) f = C(e.container(), e.offset()), v(f) && s(f, f.data.length), m(f) && !y(f) && i(r(n(f), !1));
          else {
            if (f = C(e.container(), e.offset()), v(f) && s(f, 0), m(f) && e.isAtEnd()) return i(r(n(f), !1)), c;
            u = C(e.container(), e.offset() - 1), m(u) && !y(u) && (h(u) || h(f) || !m(f)) && i(r(n(u), !1)), m(f) && i(r(n(f), !0))
          }
        return c
      }

      function u(t, n, r) {
        function i() {
          return v(t) ? 0 === n : 0 === n
        }

        function o() {
          return v(t) ? n >= t.data.length : n >= t.childNodes.length
        }

        function a() {
          var e;
          return e = t.ownerDocument.createRange(), e.setStart(t, n), e.setEnd(t, n), e
        }

        function s() {
          return r || (r = c(new u(t, n))), r
        }

        function l() {
          return s().length > 0
        }

        function d(e) {
          return e && t === e.container() && n === e.offset()
        }

        function f(e) {
          return C(t, e ? n - 1 : n)
        }
        return {
          container: e.constant(t),
          offset: e.constant(n),
          toRange: a,
          getClientRects: s,
          isVisible: l,
          isAtStart: i,
          isAtEnd: o,
          isEqual: d,
          getNode: f
        }
      }
      var d = t.isElement,
        f = i.isCaretCandidate,
        h = t.matchStyleValues("display", "block table"),
        p = t.matchStyleValues("float", "left right"),
        m = e.and(d, f, e.negate(p)),
        g = e.negate(t.matchStyleValues("white-space", "pre pre-line pre-wrap")),
        v = t.isText,
        y = t.isBr,
        b = n.nodeIndex,
        C = r.getNode;
      return u.fromRangeStart = function(e) {
        return new u(e.startContainer, e.startOffset)
      }, u.fromRangeEnd = function(e) {
        return new u(e.endContainer, e.endOffset)
      }, u.after = function(e) {
        return new u(e.parentNode, b(e) + 1)
      }, u.before = function(e) {
        return new u(e.parentNode, b(e))
      }, u
    }), r(q, [_, w, z, p, $], function(e, t, n, r, i) {
      function o(e) {
        var t = e.parentNode;
        return v(t) ? o(t) : t
      }

      function a(e) {
        return e ? r.reduce(e.childNodes, function(e, t) {
          return v(t) && "BR" != t.nodeName ? e = e.concat(a(t)) : e.push(t), e
        }, []) : []
      }

      function s(e, t) {
        for (;
          (e = e.previousSibling) && g(e);) t += e.data.length;
        return t
      }

      function l(e) {
        return function(t) {
          return e === t
        }
      }

      function c(t) {
        var n, i, s;
        return n = a(o(t)), i = r.findIndex(n, l(t), t), n = n.slice(0, i + 1), s = r.reduce(n, function(e, t, r) {
          return g(t) && g(n[r - 1]) && e++, e
        }, 0), n = r.filter(n, e.matchNodeNames(t.nodeName)), i = r.findIndex(n, l(t), t), i - s
      }

      function u(e) {
        var t;
        return t = g(e) ? "text()" : e.nodeName.toLowerCase(), t + "[" + c(e) + "]"
      }

      function d(e, t, n) {
        var r = [];
        for (t = t.parentNode; t != e && (!n || !n(t)); t = t.parentNode) r.push(t);
        return r
      }

      function f(t, i) {
        var o, a, l = [],
          c, f, h;
        return o = i.container(), a = i.offset(), g(o) ? c = s(o, a) : (f = o.childNodes, a >= f.length ? (c = "after", a = f.length - 1) : c = "before", o = f[a]), l.push(u(o)), h = d(t, o), h = r.filter(h, n.negate(e.isBogus)), l = l.concat(r.map(h, function(e) {
          return u(e)
        })), l.reverse().join("/") + "," + c
      }

      function h(t, n, i) {
        var o = a(t);
        return o = r.filter(o, function(e, t) {
          return !g(e) || !g(o[t - 1])
        }), o = r.filter(o, e.matchNodeNames(n)), o[i]
      }

      function p(e, t) {
        for (var n = e, r = 0, o; g(n);) {
          if (o = n.data.length, t >= r && r + o >= t) {
            e = n, t -= r;
            break
          }
          if (!g(n.nextSibling)) {
            e = n, t = o;
            break
          }
          r += o, n = n.nextSibling
        }
        return t > e.data.length && (t = e.data.length), new i(e, t)
      }

      function m(e, t) {
        var n, o, a;
        return t ? (n = t.split(","), t = n[0].split("/"), a = n.length > 1 ? n[1] : "before", o = r.reduce(t, function(e, t) {
          return (t = /([\w\-\(\)]+)\[([0-9]+)\]/.exec(t)) ? ("text()" === t[1] && (t[1] = "#text"), h(e, t[1], parseInt(t[2], 10))) : null
        }, e), o ? g(o) ? p(o, parseInt(a, 10)) : (a = "after" === a ? y(o) + 1 : y(o), new i(o.parentNode, a)) : null) : null
      }
      var g = e.isText,
        v = e.isBogus,
        y = t.nodeIndex;
      return {
        create: f,
        resolve: m
      }
    }), r(j, [h, m, k, q, $, _], function(e, t, n, r, i, o) {
      function a(a) {
        var l = a.dom;
        this.getBookmark = function(e, c) {
          function u(e, n) {
            var r = 0;
            return t.each(l.select(e), function(e) {
              return "all" !== e.getAttribute("data-mce-bogus") ? e == n ? !1 : void r++ : void 0
            }), r
          }

          function d(e) {
            function t(t) {
              var n, r, i, o = t ? "start" : "end";
              n = e[o + "Container"], r = e[o + "Offset"], 1 == n.nodeType && "TR" == n.nodeName && (i = n.childNodes, n = i[Math.min(t ? r : r - 1, i.length - 1)], n && (r = t ? 0 : n.childNodes.length, e["set" + (t ? "Start" : "End")](n, r)))
            }
            return t(!0), t(), e
          }

          function f(e) {
            function t(e, t) {
              var r = e[t ? "startContainer" : "endContainer"],
                i = e[t ? "startOffset" : "endOffset"],
                o = [],
                a, s, u = 0;
              if (3 == r.nodeType) {
                if (c)
                  for (a = r.previousSibling; a && 3 == a.nodeType; a = a.previousSibling) i += a.nodeValue.length;
                o.push(i)
              } else s = r.childNodes, i >= s.length && s.length && (u = 1, i = Math.max(0, s.length - 1)), o.push(l.nodeIndex(s[i], c) + u);
              for (; r && r != n; r = r.parentNode) o.push(l.nodeIndex(r, c));
              return o
            }
            var n = l.getRoot(),
              r = {};
            return r.start = t(e, !0), a.isCollapsed() || (r.end = t(e)), r
          }

          function h(e) {
            function t(e) {
              var t;
              if (n.isCaretContainer(e)) {
                if (o.isText(e) && n.isCaretContainerBlock(e) && (e = e.parentNode), t = e.previousSibling, s(t)) return t;
                if (t = e.nextSibling, s(t)) return t
              }
            }
            return t(e.startContainer) || t(e.endContainer)
          }
          var p, m, g, v, y, b, C = "&#xFEFF;",
            x;
          if (2 == e) return b = a.getNode(), y = b ? b.nodeName : null, p = a.getRng(), s(b) || "IMG" == y ? {
            name: y,
            index: u(y, b)
          } : a.tridentSel ? a.tridentSel.getBookmark(e) : (b = h(p), b ? (y = b.tagName, {
            name: y,
            index: u(y, b)
          }) : f(p));
          if (3 == e) return p = a.getRng(), {
            start: r.create(l.getRoot(), i.fromRangeStart(p)),
            end: r.create(l.getRoot(), i.fromRangeEnd(p))
          };
          if (e) return {
            rng: a.getRng()
          };
          if (p = a.getRng(), g = l.uniqueId(), v = a.isCollapsed(), x = "overflow:hidden;line-height:0px", p.duplicate || p.item) {
            if (p.item) return b = p.item(0), y = b.nodeName, {
              name: y,
              index: u(y, b)
            };
            m = p.duplicate();
            try {
              p.collapse(), p.pasteHTML('<span data-mce-type="bookmark" id="' + g + '_start" style="' + x + '">' + C + "</span>"), v || (m.collapse(!1), p.moveToElementText(m.parentElement()), 0 === p.compareEndPoints("StartToEnd", m) && m.move("character", -1), m.pasteHTML('<span data-mce-type="bookmark" id="' + g + '_end" style="' + x + '">' + C + "</span>"))
            } catch (w) {
              return null
            }
          } else {
            if (b = a.getNode(), y = b.nodeName, "IMG" == y) return {
              name: y,
              index: u(y, b)
            };
            m = d(p.cloneRange()), v || (m.collapse(!1), m.insertNode(l.create("span", {
              "data-mce-type": "bookmark",
              id: g + "_end",
              style: x
            }, C))), p = d(p), p.collapse(!0), p.insertNode(l.create("span", {
              "data-mce-type": "bookmark",
              id: g + "_start",
              style: x
            }, C))
          }
          return a.moveToBookmark({
            id: g,
            keep: 1
          }), {
            id: g
          }
        }, this.moveToBookmark = function(n) {
          function i(e) {
            var t = n[e ? "start" : "end"],
              r, i, o, a;
            if (t) {
              for (o = t[0], i = d, r = t.length - 1; r >= 1; r--) {
                if (a = i.childNodes, t[r] > a.length - 1) return;
                i = a[t[r]]
              }
              3 === i.nodeType && (o = Math.min(t[0], i.nodeValue.length)), 1 === i.nodeType && (o = Math.min(t[0], i.childNodes.length)), e ? u.setStart(i, o) : u.setEnd(i, o)
            }
            return !0
          }

          function o(r) {
            var i = l.get(n.id + "_" + r),
              o, a, s, c, u = n.keep;
            if (i && (o = i.parentNode, "start" == r ? (u ? (o = i.firstChild, a = 1) : a = l.nodeIndex(i), f = h = o, p = m = a) : (u ? (o = i.firstChild, a = 1) : a = l.nodeIndex(i), h = o, m = a), !u)) {
              for (c = i.previousSibling, s = i.nextSibling, t.each(t.grep(i.childNodes), function(e) {
                  3 == e.nodeType && (e.nodeValue = e.nodeValue.replace(/\uFEFF/g, ""))
                }); i = l.get(n.id + "_" + r);) l.remove(i, 1);
              c && s && c.nodeType == s.nodeType && 3 == c.nodeType && !e.opera && (a = c.nodeValue.length, c.appendData(s.nodeValue), l.remove(s), "start" == r ? (f = h = c, p = m = a) : (h = c, m = a))
            }
          }

          function s(t) {
            return !l.isBlock(t) || t.innerHTML || e.ie || (t.innerHTML = '<br data-mce-bogus="1" />'), t
          }

          function c() {
            var e, t;
            return e = l.createRng(), t = r.resolve(l.getRoot(), n.start), e.setStart(t.container(), t.offset()), t = r.resolve(l.getRoot(), n.end), e.setEnd(t.container(), t.offset()), e
          }
          var u, d, f, h, p, m;
          if (n)
            if (t.isArray(n.start)) {
              if (u = l.createRng(), d = l.getRoot(), a.tridentSel) return a.tridentSel.moveToBookmark(n);
              i(!0) && i() && a.setRng(u)
            } else "string" == typeof n.start ? a.setRng(c(n)) : n.id ? (o("start"), o("end"), f && (u = l.createRng(), u.setStart(s(f), p), u.setEnd(s(h), m), a.setRng(u))) : n.name ? a.select(l.select(n.name)[n.index]) : n.rng && a.setRng(n.rng)
        }
      }
      var s = o.isContentEditableFalse;
      return a.isBookmarkNode = function(e) {
        return e && "SPAN" === e.tagName && "bookmark" === e.getAttribute("data-mce-type")
      }, a
    }), r(Y, [y, O, F, T, j, _, h, m], function(e, n, r, i, o, a, s, l) {
      function c(e, t, i, a) {
        var s = this;
        s.dom = e, s.win = t, s.serializer = i, s.editor = a, s.bookmarkManager = new o(s), s.controlSelection = new r(s, a), s.win.getSelection || (s.tridentSel = new n(s))
      }
      var u = l.each,
        d = l.trim,
        f = s.ie;
      return c.prototype = {
        setCursorLocation: function(e, t) {
          var n = this,
            r = n.dom.createRng();
          e ? (r.setStart(e, t), r.setEnd(e, t), n.setRng(r), n.collapse(!1)) : (n._moveEndPoint(r, n.editor.getBody(), !0), n.setRng(r))
        },
        getContent: function(e) {
          var n = this,
            r = n.getRng(),
            i = n.dom.create("body"),
            o = n.getSel(),
            a, s, l;
          return e = e || {}, a = s = "", e.get = !0, e.format = e.format || "html", e.selection = !0, n.editor.fire("BeforeGetContent", e), "text" == e.format ? n.isCollapsed() ? "" : r.text || (o.toString ? o.toString() : "") : (r.cloneContents ? (l = r.cloneContents(), l && i.appendChild(l)) : r.item !== t || r.htmlText !== t ? (i.innerHTML = "<br>" + (r.item ? r.item(0).outerHTML : r.htmlText), i.removeChild(i.firstChild)) : i.innerHTML = r.toString(), /^\s/.test(i.innerHTML) && (a = " "), /\s+$/.test(i.innerHTML) && (s = " "), e.getInner = !0, e.content = n.isCollapsed() ? "" : a + n.serializer.serialize(i, e) + s, n.editor.fire("GetContent", e), e.content)
        },
        setContent: function(e, t) {
          var n = this,
            r = n.getRng(),
            i, o = n.win.document,
            a, s;
          if (t = t || {
              format: "html"
            }, t.set = !0, t.selection = !0, t.content = e, t.no_events || n.editor.fire("BeforeSetContent", t), e = t.content, r.insertNode) {
            e += '<span id="__caret">_</span>', r.startContainer == o && r.endContainer == o ? o.body.innerHTML = e : (r.deleteContents(), 0 === o.body.childNodes.length ? o.body.innerHTML = e : r.createContextualFragment ? r.insertNode(r.createContextualFragment(e)) : (a = o.createDocumentFragment(), s = o.createElement("div"), a.appendChild(s), s.outerHTML = e, r.insertNode(a))), i = n.dom.get("__caret"), r = o.createRange(), r.setStartBefore(i), r.setEndBefore(i), n.setRng(r), n.dom.remove("__caret");
            try {
              n.setRng(r)
            } catch (l) {}
          } else r.item && (o.execCommand("Delete", !1, null), r = n.getRng()), /^\s+/.test(e) ? (r.pasteHTML('<span id="__mce_tmp">_</span>' + e), n.dom.remove("__mce_tmp")) : r.pasteHTML(e);
          t.no_events || n.editor.fire("SetContent", t)
        },
        getStart: function(e) {
          var t = this,
            n = t.getRng(),
            r, i, o, a;
          if (n.duplicate || n.item) {
            if (n.item) return n.item(0);
            for (o = n.duplicate(), o.collapse(1), r = o.parentElement(), r.ownerDocument !== t.dom.doc && (r = t.dom.getRoot()), i = a = n.parentElement(); a = a.parentNode;)
              if (a == r) {
                r = i;
                break
              }
            return r
          }
          return r = n.startContainer, 1 == r.nodeType && r.hasChildNodes() && (e && n.collapsed || (r = r.childNodes[Math.min(r.childNodes.length - 1, n.startOffset)])), r && 3 == r.nodeType ? r.parentNode : r
        },
        getEnd: function(e) {
          var t = this,
            n = t.getRng(),
            r, i;
          return n.duplicate || n.item ? n.item ? n.item(0) : (n = n.duplicate(), n.collapse(0), r = n.parentElement(), r.ownerDocument !== t.dom.doc && (r = t.dom.getRoot()), r && "BODY" == r.nodeName ? r.lastChild || r : r) : (r = n.endContainer, i = n.endOffset, 1 == r.nodeType && r.hasChildNodes() && (e && n.collapsed || (r = r.childNodes[i > 0 ? i - 1 : i])), r && 3 == r.nodeType ? r.parentNode : r)
        },
        getBookmark: function(e, t) {
          return this.bookmarkManager.getBookmark(e, t)
        },
        moveToBookmark: function(e) {
          return this.bookmarkManager.moveToBookmark(e)
        },
        select: function(e, t) {
          var n = this,
            r = n.dom,
            i = r.createRng(),
            o;
          if (n.lastFocusBookmark = null, e) {
            if (!t && n.controlSelection.controlSelect(e)) return;
            o = r.nodeIndex(e), i.setStart(e.parentNode, o), i.setEnd(e.parentNode, o + 1), t && (n._moveEndPoint(i, e, !0), n._moveEndPoint(i, e)), n.setRng(i)
          }
          return e
        },
        isCollapsed: function() {
          var e = this,
            t = e.getRng(),
            n = e.getSel();
          return !t || t.item ? !1 : t.compareEndPoints ? 0 === t.compareEndPoints("StartToEnd", t) : !n || t.collapsed
        },
        collapse: function(e) {
          var t = this,
            n = t.getRng(),
            r;
          n.item && (r = n.item(0), n = t.win.document.body.createTextRange(), n.moveToElementText(r)), n.collapse(!!e), t.setRng(n)
        },
        getSel: function() {
          var e = this.win;
          return e.getSelection ? e.getSelection() : e.document.selection
        },
        getRng: function(e) {
          function t(e, t, n) {
            try {
              return t.compareBoundaryPoints(e, n)
            } catch (r) {
              return -1
            }
          }
          var n = this,
            r, i, o, a, s, l;
          if (!n.win) return null;
          if (a = n.win.document, !e && n.lastFocusBookmark) {
            var c = n.lastFocusBookmark;
            return c.startContainer ? (i = a.createRange(), i.setStart(c.startContainer, c.startOffset), i.setEnd(c.endContainer, c.endOffset)) : i = c, i
          }
          if (e && n.tridentSel) return n.tridentSel.getRangeAt(0);
          try {
            (r = n.getSel()) && (i = r.rangeCount > 0 ? r.getRangeAt(0) : r.createRange ? r.createRange() : a.createRange())
          } catch (u) {}
          if (l = n.editor.fire("GetSelectionRange", {
              range: i
            }), l.range !== i) return l.range;
          if (f && i && i.setStart && a.selection) {
            try {
              s = a.selection.createRange()
            } catch (u) {}
            s && s.item && (o = s.item(0), i = a.createRange(), i.setStartBefore(o), i.setEndAfter(o))
          }
          return i || (i = a.createRange ? a.createRange() : a.body.createTextRange()), i.setStart && 9 === i.startContainer.nodeType && i.collapsed && (o = n.dom.getRoot(), i.setStart(o, 0), i.setEnd(o, 0)), n.selectedRange && n.explicitRange && (0 === t(i.START_TO_START, i, n.selectedRange) && 0 === t(i.END_TO_END, i, n.selectedRange) ? i = n.explicitRange : (n.selectedRange = null, n.explicitRange = null)), i
        },
        setRng: function(e, t) {
          var n = this,
            r, i, o;
          if (e)
            if (e.select) {
              n.explicitRange = null;
              try {
                e.select()
              } catch (a) {}
            } else if (n.tridentSel) {
            if (e.cloneRange) try {
              n.tridentSel.addRange(e)
            } catch (a) {}
          } else {
            if (r = n.getSel(), o = n.editor.fire("SetSelectionRange", {
                range: e
              }), e = o.range, r) {
              n.explicitRange = e;
              try {
                r.removeAllRanges(), r.addRange(e)
              } catch (a) {}
              t === !1 && r.extend && (r.collapse(e.endContainer, e.endOffset), r.extend(e.startContainer, e.startOffset)), n.selectedRange = r.rangeCount > 0 ? r.getRangeAt(0) : null
            }
            e.collapsed || e.startContainer != e.endContainer || !r.setBaseAndExtent || s.ie || e.endOffset - e.startOffset < 2 && e.startContainer.hasChildNodes() && (i = e.startContainer.childNodes[e.startOffset], i && "IMG" == i.tagName && n.getSel().setBaseAndExtent(i, 0, i, 1))
          }
        },
        setNode: function(e) {
          var t = this;
          return t.setContent(t.dom.getOuterHTML(e)), e
        },
        getNode: function() {
          function e(e, t) {
            for (var n = e; e && 3 === e.nodeType && 0 === e.length;) e = t ? e.nextSibling : e.previousSibling;
            return e || n
          }
          var t = this,
            n = t.getRng(),
            r, i = n.startContainer,
            o = n.endContainer,
            a = n.startOffset,
            s = n.endOffset,
            l = t.dom.getRoot();
          return n ? n.setStart ? (r = n.commonAncestorContainer, !n.collapsed && (i == o && 2 > s - a && i.hasChildNodes() && (r = i.childNodes[a]), 3 === i.nodeType && 3 === o.nodeType && (i = i.length === a ? e(i.nextSibling, !0) : i.parentNode, o = 0 === s ? e(o.previousSibling, !1) : o.parentNode, i && i === o)) ? i : r && 3 == r.nodeType ? r.parentNode : r) : (r = n.item ? n.item(0) : n.parentElement(), r.ownerDocument !== t.win.document && (r = l), r) : l
        },
        getSelectedBlocks: function(t, n) {
          var r = this,
            i = r.dom,
            o, a, s = [];
          if (a = i.getRoot(), t = i.getParent(t || r.getStart(), i.isBlock), n = i.getParent(n || r.getEnd(), i.isBlock), t && t != a && s.push(t), t && n && t != n) {
            o = t;
            for (var l = new e(t, a);
              (o = l.next()) && o != n;) i.isBlock(o) && s.push(o)
          }
          return n && t != n && n != a && s.push(n), s
        },
        isForward: function() {
          var e = this.dom,
            t = this.getSel(),
            n, r;
          return t && t.anchorNode && t.focusNode ? (n = e.createRng(), n.setStart(t.anchorNode, t.anchorOffset), n.collapse(!0), r = e.createRng(), r.setStart(t.focusNode, t.focusOffset), r.collapse(!0), n.compareBoundaryPoints(n.START_TO_START, r) <= 0) : !0
        },
        normalize: function() {
          var e = this,
            t = e.getRng();
          return s.range && new i(e.dom).normalize(t) && e.setRng(t, e.isForward()), t
        },
        selectorChanged: function(e, t) {
          var n = this,
            r;
          return n.selectorChangedData || (n.selectorChangedData = {}, r = {}, n.editor.on("NodeChange", function(e) {
            var t = e.element,
              i = n.dom,
              o = i.getParents(t, null, i.getRoot()),
              a = {};
            u(n.selectorChangedData, function(e, t) {
              u(o, function(n) {
                return i.is(n, t) ? (r[t] || (u(e, function(e) {
                  e(!0, {
                    node: n,
                    selector: t,
                    parents: o
                  })
                }), r[t] = e), a[t] = e, !1) : void 0
              })
            }), u(r, function(e, n) {
              a[n] || (delete r[n], u(e, function(e) {
                e(!1, {
                  node: t,
                  selector: n,
                  parents: o
                })
              }))
            })
          })), n.selectorChangedData[e] || (n.selectorChangedData[e] = []), n.selectorChangedData[e].push(t), n
        },
        getScrollContainer: function() {
          for (var e, t = this.dom.getRoot(); t && "BODY" != t.nodeName;) {
            if (t.scrollHeight > t.clientHeight) {
              e = t;
              break
            }
            t = t.parentNode
          }
          return e
        },
        scrollIntoView: function(e, t) {
          function n(e) {
            for (var t = 0, n = 0, r = e; r && r.nodeType;) t += r.offsetLeft || 0, n += r.offsetTop || 0, r = r.offsetParent;
            return {
              x: t,
              y: n
            }
          }
          var r, i, o = this,
            s = o.dom,
            l = s.getRoot(),
            c, u, d = 0;
          if (a.isElement(e)) {
            if (t === !1 && (d = e.offsetHeight), "BODY" != l.nodeName) {
              var f = o.getScrollContainer();
              if (f) return r = n(e).y - n(f).y + d, u = f.clientHeight, c = f.scrollTop, void((c > r || r + 25 > c + u) && (f.scrollTop = c > r ? r : r - u + 25))
            }
            i = s.getViewPort(o.editor.getWin()), r = s.getPos(e).y + d, c = i.y, u = i.h, (r < i.y || r + 25 > c + u) && o.editor.getWin().scrollTo(0, c > r ? r : r - u + 25)
          }
        },
        placeCaretAt: function(e, t) {
          this.setRng(i.getCaretRangeFromPoint(e, t, this.editor.getDoc()))
        },
        _moveEndPoint: function(t, n, r) {
          var i = n,
            o = new e(n, i),
            a = this.dom.schema.getNonEmptyElements();
          do {
            if (3 == n.nodeType && 0 !== d(n.nodeValue).length) return void(r ? t.setStart(n, 0) : t.setEnd(n, n.nodeValue.length));
            if (a[n.nodeName] && !/^(TD|TH)$/.test(n.nodeName)) return void(r ? t.setStartBefore(n) : "BR" == n.nodeName ? t.setEndBefore(n) : t.setEndAfter(n));
            if (s.ie && s.ie < 11 && this.dom.isBlock(n) && this.dom.isEmpty(n)) return void(r ? t.setStart(n, 0) : t.setEnd(n, 0))
          } while (n = r ? o.next() : o.prev());
          "BODY" == i.nodeName && (r ? t.setStart(i, 0) : t.setEnd(i, i.childNodes.length))
        },
        destroy: function() {
          this.win = null, this.controlSelection.destroy()
        }
      }, c
    }), r(X, [j, m], function(e, t) {
      function n(t) {
        this.compare = function(n, i) {
          function o(e) {
            var n = {};
            return r(t.getAttribs(e), function(r) {
              var i = r.nodeName.toLowerCase();
              0 !== i.indexOf("_") && "style" !== i && "data-mce-style" !== i && (n[i] = t.getAttrib(e, i))
            }), n
          }

          function a(e, t) {
            var n, r;
            for (r in e)
              if (e.hasOwnProperty(r)) {
                if (n = t[r], "undefined" == typeof n) return !1;
                if (e[r] != n) return !1;
                delete t[r]
              }
            for (r in t)
              if (t.hasOwnProperty(r)) return !1;
            return !0
          }
          return n.nodeName != i.nodeName ? !1 : a(o(n), o(i)) && a(t.parseStyle(t.getAttrib(n, "style")), t.parseStyle(t.getAttrib(i, "style"))) ? !e.isBookmarkNode(n) && !e.isBookmarkNode(i) : !1
        }
      }
      var r = t.each;
      return n
    }), r(K, [m], function(e) {
      function t(e, t) {
        function r(e) {
          return e.replace(/%(\w+)/g, "")
        }
        var i, o, a = e.dom,
          s = "",
          l, c;
        if (c = e.settings.preview_styles, c === !1) return "";
        if (c || (c = "font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow"), "string" == typeof t) {
          if (t = e.formatter.get(t), !t) return;
          t = t[0]
        }
        return i = t.block || t.inline || "span", o = a.create(i), n(t.styles, function(e, t) {
          e = r(e), e && a.setStyle(o, t, e)
        }), n(t.attributes, function(e, t) {
          e = r(e), e && a.setAttrib(o, t, e)
        }), n(t.classes, function(e) {
          e = r(e), a.hasClass(o, e) || a.addClass(o, e)
        }), e.fire("PreviewFormats"), a.setStyles(o, {
          position: "absolute",
          left: -65535
        }), e.getBody().appendChild(o), l = a.getStyle(e.getBody(), "fontSize", !0), l = /px$/.test(l) ? parseInt(l, 10) : 0, n(c.split(" "), function(t) {
          var n = a.getStyle(o, t, !0);
          if (!("background-color" == t && /transparent|rgba\s*\([^)]+,\s*0\)/.test(n) && (n = a.getStyle(e.getBody(), t, !0), "#ffffff" == a.toHex(n).toLowerCase()) || "color" == t && "#000000" == a.toHex(n).toLowerCase())) {
            if ("font-size" == t && /em|%$/.test(n)) {
              if (0 === l) return;
              n = parseFloat(n, 10) / (/%$/.test(n) ? 100 : 1), n = n * l + "px"
            }
            "border" == t && n && (s += "padding:0 2px;"), s += t + ":" + n + ";"
          }
        }), e.fire("AfterPreviewFormats"), a.remove(o), s
      }
      var n = e.each;
      return {
        getCssText: t
      }
    }), r(G, [y, T, j, X, m, K], function(e, t, n, r, i, o) {
      return function(a) {
        function s(e) {
          return e.nodeType && (e = e.nodeName), !!a.schema.getTextBlockElements()[e.toLowerCase()]
        }

        function l(e) {
          return /^(TH|TD)$/.test(e.nodeName)
        }

        function c(e) {
          return e && /^(IMG)$/.test(e.nodeName)
        }

        function u(e, t) {
          return q.getParents(e, t, q.getRoot())
        }

        function d(e) {
          return 1 === e.nodeType && "_mce_caret" === e.id
        }

        function f() {
          m({
            valigntop: [{
              selector: "td,th",
              styles: {
                verticalAlign: "top"
              }
            }],
            valignmiddle: [{
              selector: "td,th",
              styles: {
                verticalAlign: "middle"
              }
            }],
            valignbottom: [{
              selector: "td,th",
              styles: {
                verticalAlign: "bottom"
              }
            }],
            alignleft: [{
              selector: "figure.image",
              collapsed: !1,
              classes: "align-left",
              ceFalseOverride: !0
            }, {
              selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",
              styles: {
                textAlign: "left"
              },
              defaultBlock: "div"
            }, {
              selector: "img,table",
              collapsed: !1,
              styles: {
                "float": "left"
              }
            }],
            aligncenter: [{
              selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",
              styles: {
                textAlign: "center"
              },
              defaultBlock: "div"
            }, {
              selector: "figure.image",
              collapsed: !1,
              classes: "align-center",
              ceFalseOverride: !0
            }, {
              selector: "img",
              collapsed: !1,
              styles: {
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }
            }, {
              selector: "table",
              collapsed: !1,
              styles: {
                marginLeft: "auto",
                marginRight: "auto"
              }
            }],
            alignright: [{
              selector: "figure.image",
              collapsed: !1,
              classes: "align-right",
              ceFalseOverride: !0
            }, {
              selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",
              styles: {
                textAlign: "right"
              },
              defaultBlock: "div"
            }, {
              selector: "img,table",
              collapsed: !1,
              styles: {
                "float": "right"
              }
            }],
            alignjustify: [{
              selector: "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",
              styles: {
                textAlign: "justify"
              },
              defaultBlock: "div"
            }],
            bold: [{
              inline: "strong",
              remove: "all"
            }, {
              inline: "span",
              styles: {
                fontWeight: "bold"
              }
            }, {
              inline: "b",
              remove: "all"
            }],
            italic: [{
              inline: "em",
              remove: "all"
            }, {
              inline: "span",
              styles: {
                fontStyle: "italic"
              }
            }, {
              inline: "i",
              remove: "all"
            }],
            underline: [{
              inline: "span",
              styles: {
                textDecoration: "underline"
              },
              exact: !0
            }, {
              inline: "u",
              remove: "all"
            }],
            strikethrough: [{
              inline: "span",
              styles: {
                textDecoration: "line-through"
              },
              exact: !0
            }, {
              inline: "strike",
              remove: "all"
            }],
            forecolor: {
              inline: "span",
              styles: {
                color: "%value"
              },
              links: !0,
              remove_similar: !0
            },
            hilitecolor: {
              inline: "span",
              styles: {
                backgroundColor: "%value"
              },
              links: !0,
              remove_similar: !0
            },
            fontname: {
              inline: "span",
              styles: {
                fontFamily: "%value"
              }
            },
            fontsize: {
              inline: "span",
              styles: {
                fontSize: "%value"
              }
            },
            fontsize_class: {
              inline: "span",
              attributes: {
                "class": "%value"
              }
            },
            blockquote: {
              block: "blockquote",
              wrapper: 1,
              remove: "all"
            },
            subscript: {
              inline: "sub"
            },
            superscript: {
              inline: "sup"
            },
            code: {
              inline: "code"
            },
            link: {
              inline: "a",
              selector: "a",
              remove: "all",
              split: !0,
              deep: !0,
              onmatch: function() {
                return !0
              },
              onformat: function(e, t, n) {
                le(n, function(t, n) {
                  q.setAttrib(e, n, t)
                })
              }
            },
            removeformat: [{
              selector: "b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins",
              remove: "all",
              split: !0,
              expand: !1,
              block_expand: !0,
              deep: !0
            }, {
              selector: "span",
              attributes: ["style", "class"],
              remove: "empty",
              split: !0,
              expand: !1,
              deep: !0
            }, {
              selector: "*",
              attributes: ["style", "class"],
              split: !1,
              expand: !1,
              deep: !0
            }]
          }), le("p h1 h2 h3 h4 h5 h6 div address pre div dt dd samp".split(/\s/), function(e) {
            m(e, {
              block: e,
              remove: "all"
            })
          }), m(a.settings.formats)
        }

        function h() {
          a.addShortcut("meta+b", "bold_desc", "Bold"), a.addShortcut("meta+i", "italic_desc", "Italic"), a.addShortcut("meta+u", "underline_desc", "Underline");
          for (var e = 1; 6 >= e; e++) a.addShortcut("access+" + e, "", ["FormatBlock", !1, "h" + e]);
          a.addShortcut("access+7", "", ["FormatBlock", !1, "p"]), a.addShortcut("access+8", "", ["FormatBlock", !1, "div"]), a.addShortcut("access+9", "", ["FormatBlock", !1, "address"])
        }

        function p(e) {
          return e ? $[e] : $
        }

        function m(e, t) {
          e && ("string" != typeof e ? le(e, function(e, t) {
            m(t, e)
          }) : (t = t.length ? t : [t], le(t, function(e) {
            e.deep === re && (e.deep = !e.selector), e.split === re && (e.split = !e.selector || e.inline), e.remove === re && e.selector && !e.inline && (e.remove = "none"), e.selector && e.inline && (e.mixed = !0, e.block_expand = !0), "string" == typeof e.classes && (e.classes = e.classes.split(/\s+/))
          }), $[e] = t))
        }

        function g(e) {
          return e && $[e] && delete $[e], $
        }

        function v(e) {
          var t;
          return a.dom.getParent(e, function(e) {
            return t = a.dom.getStyle(e, "text-decoration"), t && "none" !== t
          }), t
        }

        function y(e) {
          var t;
          1 === e.nodeType && e.parentNode && 1 === e.parentNode.nodeType && (t = v(e.parentNode), a.dom.getStyle(e, "color") && t ? a.dom.setStyle(e, "text-decoration", t) : a.dom.getStyle(e, "text-decoration") === t && a.dom.setStyle(e, "text-decoration", null))
        }

        function b(t, n, r) {
          function i(e, t) {
            if (t = t || u, e) {
              if (t.onformat && t.onformat(e, t, n, r), le(t.styles, function(t, r) {
                  q.setStyle(e, r, D(t, n))
                }), t.styles) {
                var i = q.getAttrib(e, "style");
                i && e.setAttribute("data-mce-style", i)
              }
              le(t.attributes, function(t, r) {
                q.setAttrib(e, r, D(t, n))
              }), le(t.classes, function(t) {
                t = D(t, n), q.hasClass(e, t) || q.addClass(e, t)
              })
            }
          }

          function o() {
            function t(t, n) {
              var i = new e(n);
              for (r = i.current(); r; r = i.prev())
                if (r.childNodes.length > 1 || r == t || "BR" == r.tagName) return r
            }
            var n = a.selection.getRng(),
              i = n.startContainer,
              o = n.endContainer;
            if (i != o && 0 === n.endOffset) {
              var s = t(i, o),
                l = 3 == s.nodeType ? s.length : s.childNodes.length;
              n.setEnd(s, l)
            }
            return n
          }

          function l(e, r, o) {
            var a = [],
              l, f, h = !0;
            l = u.inline || u.block, f = q.create(l), i(f), Y.walk(e, function(e) {
              function r(e) {
                var g, v, y, b, C;
                return C = h, g = e.nodeName.toLowerCase(), v = e.parentNode.nodeName.toLowerCase(), 1 === e.nodeType && ie(e) && (C = h, h = "true" === ie(e), b = !0), R(g, "br") ? (p = 0, void(u.block && q.remove(e))) : u.wrapper && w(e, t, n) ? void(p = 0) : h && !b && u.block && !u.wrapper && s(g) && X(v, l) ? (e = q.rename(e, l), i(e), a.push(e), void(p = 0)) : u.selector && (le(c, function(t) {
                  return "collapsed" in t && t.collapsed !== m ? void 0 : q.is(e, t.selector) && !d(e) ? (i(e, t), y = !0, !1) : void 0
                }), !u.inline || y) ? void(p = 0) : void(!h || b || !X(l, g) || !X(v, l) || !o && 3 === e.nodeType && 1 === e.nodeValue.length && 65279 === e.nodeValue.charCodeAt(0) || d(e) || u.inline && K(e) ? (p = 0, le(ce(e.childNodes), r), b && (h = C), p = 0) : (p || (p = q.clone(f, ee), e.parentNode.insertBefore(p, e), a.push(p)), p.appendChild(e)))
              }
              var p;
              le(e, r)
            }), u.links === !0 && le(a, function(e) {
              function t(e) {
                "A" === e.nodeName && i(e, u), le(ce(e.childNodes), t)
              }
              t(e)
            }), le(a, function(e) {
              function r(e) {
                var t = 0;
                return le(e.childNodes, function(e) {
                  M(e) || se(e) || t++
                }), t
              }

              function o(e) {
                var t, n;
                return le(e.childNodes, function(e) {
                  return 1 != e.nodeType || se(e) || d(e) ? void 0 : (t = e, ee)
                }), t && !se(t) && T(t, u) && (n = q.clone(t, ee), i(n), q.replace(n, e, te), q.remove(t, 1)), n || e
              }
              var s;
              if (s = r(e), (a.length > 1 || !K(e)) && 0 === s) return void q.remove(e, 1);
              if (u.inline || u.wrapper) {
                if (u.exact || 1 !== s || (e = o(e)), le(c, function(t) {
                    le(q.select(t.inline, e), function(e) {
                      se(e) || O(t, n, e, t.exact ? e : null)
                    })
                  }), w(e.parentNode, t, n)) return q.remove(e, 1), e = 0, te;
                u.merge_with_parents && q.getParent(e.parentNode, function(r) {
                  return w(r, t, n) ? (q.remove(e, 1), e = 0, te) : void 0
                }), e && u.merge_siblings !== !1 && (e = z(F(e), e), e = z(e, F(e, te)))
              }
            })
          }
          var c = p(t),
            u = c[0],
            f, h, m = !r && j.isCollapsed();
          if ("false" !== ie(j.getNode())) {
            if (u)
              if (r) r.nodeType ? (h = q.createRng(), h.setStartBefore(r), h.setEndAfter(r), l(P(h, c), null, !0)) : l(r, null, !0);
              else if (m && u.inline && !q.select("td.mce-item-selected,th.mce-item-selected").length) V("apply", t, n);
            else {
              var g = a.selection.getNode();
              G || !c[0].defaultBlock || q.getParent(g, q.isBlock) || b(c[0].defaultBlock), a.selection.setRng(o()), f = j.getBookmark(), l(P(j.getRng(te), c), f), u.styles && (u.styles.color || u.styles.textDecoration) && (ue(g, y, "childNodes"), y(g)), j.moveToBookmark(f), U(j.getRng(te)), a.nodeChanged()
            }
          } else {
            r = j.getNode();
            for (var v = 0, C = c.length; C > v; v++)
              if (c[v].ceFalseOverride && q.is(r, c[v].selector)) return void i(r, c[v])
          }
        }

        function C(e, t, n, r) {
          function i(e) {
            var n, r, o, a, s;
            if (1 === e.nodeType && ie(e) && (a = b, b = "true" === ie(e), s = !0), n = ce(e.childNodes), b && !s)
              for (r = 0, o = h.length; o > r && !O(h[r], t, e, e); r++);
            if (m.deep && n.length) {
              for (r = 0, o = n.length; o > r; r++) i(n[r]);
              s && (b = a)
            }
          }

          function o(n) {
            var i;
            return le(u(n.parentNode).reverse(), function(n) {
              var o;
              i || "_start" == n.id || "_end" == n.id || (o = w(n, e, t, r), o && o.split !== !1 && (i = n))
            }), i
          }

          function s(e, n, r, i) {
            var o, a, s, l, c, u;
            if (e) {
              for (u = e.parentNode, o = n.parentNode; o && o != u; o = o.parentNode) {
                for (a = q.clone(o, ee), c = 0; c < h.length; c++)
                  if (O(h[c], t, a, a)) {
                    a = 0;
                    break
                  }
                a && (s && a.appendChild(s), l || (l = a), s = a)
              }!i || m.mixed && K(e) || (n = q.split(e, n)), s && (r.parentNode.insertBefore(s, r), l.appendChild(r))
            }
            return n
          }

          function c(e) {
            return s(o(e), e, e, !0)
          }

          function d(e) {
            var t = q.get(e ? "_start" : "_end"),
              n = t[e ? "firstChild" : "lastChild"];
            return se(n) && (n = n[e ? "firstChild" : "lastChild"]), 3 == n.nodeType && 0 === n.data.length && (n = e ? t.previousSibling || t.nextSibling : t.nextSibling || t.previousSibling), q.remove(t, !0), n
          }

          function f(e) {
            var t, n, r = e.commonAncestorContainer;
            if (e = P(e, h, te), m.split) {
              if (t = W(e, te), n = W(e), t != n) {
                if (/^(TR|TH|TD)$/.test(t.nodeName) && t.firstChild && (t = "TR" == t.nodeName ? t.firstChild.firstChild || t : t.firstChild || t), r && /^T(HEAD|BODY|FOOT|R)$/.test(r.nodeName) && l(n) && n.firstChild && (n = n.firstChild || n), q.isChildOf(t, n) && !K(n) && !l(t) && !l(n)) return t = L(t, "span", {
                  id: "_start",
                  "data-mce-type": "bookmark"
                }), c(t), void(t = d(te));
                t = L(t, "span", {
                  id: "_start",
                  "data-mce-type": "bookmark"
                }), n = L(n, "span", {
                  id: "_end",
                  "data-mce-type": "bookmark"
                }), c(t), c(n), t = d(te), n = d()
              } else t = n = c(t);
              e.startContainer = t.parentNode ? t.parentNode : t, e.startOffset = J(t), e.endContainer = n.parentNode ? n.parentNode : n, e.endOffset = J(n) + 1
            }
            Y.walk(e, function(e) {
              le(e, function(e) {
                i(e), 1 === e.nodeType && "underline" === a.dom.getStyle(e, "text-decoration") && e.parentNode && "underline" === v(e.parentNode) && O({
                  deep: !1,
                  exact: !0,
                  inline: "span",
                  styles: {
                    textDecoration: "underline"
                  }
                }, null, e)
              })
            })
          }
          var h = p(e),
            m = h[0],
            g, y, b = !0;
          if (n) return void(n.nodeType ? (y = q.createRng(), y.setStartBefore(n), y.setEndAfter(n), f(y)) : f(n));
          if ("false" !== ie(j.getNode())) j.isCollapsed() && m.inline && !q.select("td.mce-item-selected,th.mce-item-selected").length ? V("remove", e, t, r) : (g = j.getBookmark(), f(j.getRng(te)), j.moveToBookmark(g), m.inline && E(e, t, j.getStart()) && U(j.getRng(!0)), a.nodeChanged());
          else {
            n = j.getNode();
            for (var C = 0, x = h.length; x > C && (!h[C].ceFalseOverride || !O(h[C], t, n, n)); C++);
          }
        }

        function x(e, t, n) {
          var r = p(e);
          !E(e, t, n) || "toggle" in r[0] && !r[0].toggle ? b(e, t, n) : C(e, t, n)
        }

        function w(e, t, n, r) {
          function i(e, t, i) {
            var o, a, s = t[i],
              l;
            if (t.onmatch) return t.onmatch(e, t, i);
            if (s)
              if (s.length === re) {
                for (o in s)
                  if (s.hasOwnProperty(o)) {
                    if (a = "attributes" === i ? q.getAttrib(e, o) : A(e, o), r && !a && !t.exact) return;
                    if ((!r || t.exact) && !R(a, B(D(s[o], n), o))) return
                  }
              } else
                for (l = 0; l < s.length; l++)
                  if ("attributes" === i ? q.getAttrib(e, s[l]) : A(e, s[l])) return t;
            return t
          }
          var o = p(t),
            a, s, l;
          if (o && e)
            for (s = 0; s < o.length; s++)
              if (a = o[s], T(e, a) && i(e, a, "attributes") && i(e, a, "styles")) {
                if (l = a.classes)
                  for (s = 0; s < l.length; s++)
                    if (!q.hasClass(e, l[s])) return;
                return a
              }
        }

        function E(e, t, n) {
          function r(n) {
            var r = q.getRoot();
            return n === r ? !1 : (n = q.getParent(n, function(n) {
              return n.parentNode === r || !!w(n, e, t, !0)
            }), w(n, e, t))
          }
          var i;
          return n ? r(n) : (n = j.getNode(), r(n) ? te : (i = j.getStart(), i != n && r(i) ? te : ee))
        }

        function N(e, t) {
          var n, r = [],
            i = {};
          return n = j.getStart(), q.getParent(n, function(n) {
            var o, a;
            for (o = 0; o < e.length; o++) a = e[o], !i[a] && w(n, a, t) && (i[a] = !0, r.push(a))
          }, q.getRoot()), r
        }

        function _(e) {
          var t = p(e),
            n, r, i, o, a;
          if (t)
            for (n = j.getStart(), r = u(n), o = t.length - 1; o >= 0; o--) {
              if (a = t[o].selector, !a || t[o].defaultBlock) return te;
              for (i = r.length - 1; i >= 0; i--)
                if (q.is(r[i], a)) return te
            }
          return ee
        }

        function S(e, t, n) {
          var r;
          return ne || (ne = {}, r = {}, a.on("NodeChange", function(e) {
            var t = u(e.element),
              n = {};
            t = i.grep(t, function(e) {
              return 1 == e.nodeType && !e.getAttribute("data-mce-bogus")
            }), le(ne, function(e, i) {
              le(t, function(o) {
                return w(o, i, {}, e.similar) ? (r[i] || (le(e, function(e) {
                  e(!0, {
                    node: o,
                    format: i,
                    parents: t
                  })
                }), r[i] = e), n[i] = e, !1) : void 0
              })
            }), le(r, function(i, o) {
              n[o] || (delete r[o], le(i, function(n) {
                n(!1, {
                  node: e.element,
                  format: o,
                  parents: t
                })
              }))
            })
          })), le(e.split(","), function(e) {
            ne[e] || (ne[e] = [], ne[e].similar = n), ne[e].push(t)
          }), this
        }

        function k(e) {
          return o.getCssText(a, e)
        }

        function T(e, t) {
          return R(e, t.inline) ? te : R(e, t.block) ? te : t.selector ? 1 == e.nodeType && q.is(e, t.selector) : void 0
        }

        function R(e, t) {
          return e = e || "", t = t || "", e = "" + (e.nodeName || e), t = "" + (t.nodeName || t), e.toLowerCase() == t.toLowerCase()
        }

        function A(e, t) {
          return B(q.getStyle(e, t), t)
        }

        function B(e, t) {
          return ("color" == t || "backgroundColor" == t) && (e = q.toHex(e)), "fontWeight" == t && 700 == e && (e = "bold"), "fontFamily" == t && (e = e.replace(/[\'\"]/g, "").replace(/,\s+/g, ",")), "" + e
        }

        function D(e, t) {
          return "string" != typeof e ? e = e(t) : t && (e = e.replace(/%(\w+)/g, function(e, n) {
            return t[n] || e
          })), e
        }

        function M(e) {
          return e && 3 === e.nodeType && /^([\t \r\n]+|)$/.test(e.nodeValue)
        }

        function L(e, t, n) {
          var r = q.create(t, n);
          return e.parentNode.insertBefore(r, e), r.appendChild(e), r
        }

        function P(t, n, r) {
          function i(e) {
            function t(e) {
              return "BR" == e.nodeName && e.getAttribute("data-mce-bogus") && !e.nextSibling
            }
            var r, i, o, a, s;
            if (r = i = e ? g : y, a = e ? "previousSibling" : "nextSibling", s = q.getRoot(), 3 == r.nodeType && !M(r) && (e ? v > 0 : b < r.nodeValue.length)) return r;
            for (;;) {
              if (!n[0].block_expand && K(i)) return i;
              for (o = i[a]; o; o = o[a])
                if (!se(o) && !M(o) && !t(o)) return i;
              if (i == s || i.parentNode == s) {
                r = i;
                break
              }
              i = i.parentNode
            }
            return r
          }

          function o(e, t) {
            for (t === re && (t = 3 === e.nodeType ? e.length : e.childNodes.length); e && e.hasChildNodes();) e = e.childNodes[t], e && (t = 3 === e.nodeType ? e.length : e.childNodes.length);
            return {
              node: e,
              offset: t
            }
          }

          function l(e) {
            for (var t = e; t;) {
              if (1 === t.nodeType && ie(t)) return "false" === ie(t) ? t : e;
              t = t.parentNode
            }
            return e
          }

          function c(t, n, i) {
            function o(e, t) {
              var n, o, a = e.nodeValue;
              return "undefined" == typeof t && (t = i ? a.length : 0), i ? (n = a.lastIndexOf(" ", t), o = a.lastIndexOf("\xa0", t), n = n > o ? n : o, -1 === n || r || n++) : (n = a.indexOf(" ", t), o = a.indexOf("\xa0", t), n = -1 !== n && (-1 === o || o > n) ? n : o), n
            }
            var s, l, c, u;
            if (3 === t.nodeType) {
              if (c = o(t, n), -1 !== c) return {
                container: t,
                offset: c
              };
              u = t
            }
            for (s = new e(t, q.getParent(t, K) || a.getBody()); l = s[i ? "prev" : "next"]();)
              if (3 === l.nodeType) {
                if (u = l, c = o(l), -1 !== c) return {
                  container: l,
                  offset: c
                }
              } else if (K(l)) break;
            return u ? (n = i ? 0 : u.length, {
              container: u,
              offset: n
            }) : void 0
          }

          function d(e, r) {
            var i, o, a, s;
            for (3 == e.nodeType && 0 === e.nodeValue.length && e[r] && (e = e[r]), i = u(e), o = 0; o < i.length; o++)
              for (a = 0; a < n.length; a++)
                if (s = n[a], !("collapsed" in s && s.collapsed !== t.collapsed) && q.is(i[o], s.selector)) return i[o];
            return e
          }

          function f(e, t) {
            var r, i = q.getRoot();
            if (n[0].wrapper || (r = q.getParent(e, n[0].block, i)), r || (r = q.getParent(3 == e.nodeType ? e.parentNode : e, function(e) {
                return e != i && s(e)
              })), r && n[0].wrapper && (r = u(r, "ul,ol").reverse()[0] || r), !r)
              for (r = e; r[t] && !K(r[t]) && (r = r[t], !R(r, "br")););
            return r || e
          }
          var h, p, m, g = t.startContainer,
            v = t.startOffset,
            y = t.endContainer,
            b = t.endOffset;
          if (1 == g.nodeType && g.hasChildNodes() && (h = g.childNodes.length - 1, g = g.childNodes[v > h ? h : v], 3 == g.nodeType && (v = 0)), 1 == y.nodeType && y.hasChildNodes() && (h = y.childNodes.length - 1, y = y.childNodes[b > h ? h : b - 1], 3 == y.nodeType && (b = y.nodeValue.length)), g = l(g), y = l(y), (se(g.parentNode) || se(g)) && (g = se(g) ? g : g.parentNode, g = g.nextSibling || g, 3 == g.nodeType && (v = 0)), (se(y.parentNode) || se(y)) && (y = se(y) ? y : y.parentNode, y = y.previousSibling || y, 3 == y.nodeType && (b = y.length)), n[0].inline && (t.collapsed && (m = c(g, v, !0), m && (g = m.container, v = m.offset), m = c(y, b), m && (y = m.container, b = m.offset)), p = o(y, b), p.node)) {
            for (; p.node && 0 === p.offset && p.node.previousSibling;) p = o(p.node.previousSibling);
            p.node && p.offset > 0 && 3 === p.node.nodeType && " " === p.node.nodeValue.charAt(p.offset - 1) && p.offset > 1 && (y = p.node, y.splitText(p.offset - 1))
          }
          return (n[0].inline || n[0].block_expand) && (n[0].inline && 3 == g.nodeType && 0 !== v || (g = i(!0)), n[0].inline && 3 == y.nodeType && b !== y.nodeValue.length || (y = i())), n[0].selector && n[0].expand !== ee && !n[0].inline && (g = d(g, "previousSibling"), y = d(y, "nextSibling")), (n[0].block || n[0].selector) && (g = f(g, "previousSibling"), y = f(y, "nextSibling"), n[0].block && (K(g) || (g = i(!0)), K(y) || (y = i()))), 1 == g.nodeType && (v = J(g), g = g.parentNode), 1 == y.nodeType && (b = J(y) + 1, y = y.parentNode), {
            startContainer: g,
            startOffset: v,
            endContainer: y,
            endOffset: b
          }
        }

        function H(e, t) {
          return t.links && "A" == e.tagName
        }

        function O(e, t, n, r) {
          var i, o, a;
          if (!T(n, e) && !H(n, e)) return ee;
          if ("all" != e.remove)
            for (le(e.styles, function(i, o) {
                i = B(D(i, t), o), "number" == typeof o && (o = i, r = 0), (e.remove_similar || !r || R(A(r, o), i)) && q.setStyle(n, o, ""), a = 1
              }), a && "" === q.getAttrib(n, "style") && (n.removeAttribute("style"), n.removeAttribute("data-mce-style")), le(e.attributes, function(e, i) {
                var o;
                if (e = D(e, t), "number" == typeof i && (i = e, r = 0), !r || R(q.getAttrib(r, i), e)) {
                  if ("class" == i && (e = q.getAttrib(n, i), e && (o = "", le(e.split(/\s+/), function(e) {
                      /mce\-\w+/.test(e) && (o += (o ? " " : "") + e)
                    }), o))) return void q.setAttrib(n, i, o);
                  "class" == i && n.removeAttribute("className"), Z.test(i) && n.removeAttribute("data-mce-" + i), n.removeAttribute(i)
                }
              }), le(e.classes, function(e) {
                e = D(e, t), (!r || q.hasClass(r, e)) && q.removeClass(n, e)
              }), o = q.getAttribs(n), i = 0; i < o.length; i++)
              if (0 !== o[i].nodeName.indexOf("_")) return ee;
          return "none" != e.remove ? (I(n, e), te) : void 0
        }

        function I(e, t) {
          function n(e, t, n) {
            return e = F(e, t, n), !e || "BR" == e.nodeName || K(e)
          }
          var r = e.parentNode,
            i;
          t.block && (G ? r == q.getRoot() && (t.list_block && R(e, t.list_block) || le(ce(e.childNodes), function(e) {
            X(G, e.nodeName.toLowerCase()) ? i ? i.appendChild(e) : (i = L(e, G), q.setAttribs(i, a.settings.forced_root_block_attrs)) : i = 0
          })) : K(e) && !K(r) && (n(e, ee) || n(e.firstChild, te, 1) || e.insertBefore(q.create("br"), e.firstChild), n(e, te) || n(e.lastChild, ee, 1) || e.appendChild(q.create("br")))), t.selector && t.inline && !R(t.inline, e) || q.remove(e, 1)
        }

        function F(e, t, n) {
          if (e)
            for (t = t ? "nextSibling" : "previousSibling", e = n ? e : e[t]; e; e = e[t])
              if (1 == e.nodeType || !M(e)) return e
        }

        function z(e, t) {
          function n(e, t) {
            for (i = e; i; i = i[t]) {
              if (3 == i.nodeType && 0 !== i.nodeValue.length) return e;
              if (1 == i.nodeType && !se(i)) return i
            }
            return e
          }
          var i, o, a = new r(q);
          if (e && t && (e = n(e, "previousSibling"), t = n(t, "nextSibling"), a.compare(e, t))) {
            for (i = e.nextSibling; i && i != t;) o = i, i = i.nextSibling, e.appendChild(o);
            return q.remove(t), le(ce(t.childNodes), function(t) {
              e.appendChild(t)
            }), e
          }
          return t
        }

        function W(t, n) {
          var r, i, o;
          return r = t[n ? "startContainer" : "endContainer"], i = t[n ? "startOffset" : "endOffset"], 1 == r.nodeType && (o = r.childNodes.length - 1, !n && i && i--, r = r.childNodes[i > o ? o : i]), 3 === r.nodeType && n && i >= r.nodeValue.length && (r = new e(r, a.getBody()).next() || r), 3 !== r.nodeType || n || 0 !== i || (r = new e(r, a.getBody()).prev() || r), r
        }

        function V(t, n, r, i) {
          function o(e) {
            var t = q.create("span", {
              id: g,
              "data-mce-bogus": !0,
              style: v ? "color:red" : ""
            });
            return e && t.appendChild(a.getDoc().createTextNode(Q)), t
          }

          function l(e, t) {
            for (; e;) {
              if (3 === e.nodeType && e.nodeValue !== Q || e.childNodes.length > 1) return !1;
              t && 1 === e.nodeType && t.push(e), e = e.firstChild
            }
            return !0
          }

          function c(e) {
            for (; e;) {
              if (e.id === g) return e;
              e = e.parentNode
            }
          }

          function u(t) {
            var n;
            if (t)
              for (n = new e(t, t), t = n.current(); t; t = n.next())
                if (3 === t.nodeType) return t
          }

          function d(e, t) {
            var n, r;
            if (e) r = j.getRng(!0), l(e) ? (t !== !1 && (r.setStartBefore(e), r.setEndBefore(e)), q.remove(e)) : (n = u(e), n.nodeValue.charAt(0) === Q && (n.deleteData(0, 1), r.startContainer == n && r.startOffset > 0 && r.setStart(n, r.startOffset - 1), r.endContainer == n && r.endOffset > 0 && r.setEnd(n, r.endOffset - 1)), q.remove(e, 1)), j.setRng(r);
            else if (e = c(j.getStart()), !e)
              for (; e = q.get(g);) d(e, !1)
          }

          function f() {
            var e, t, i, a, s, l, d;
            e = j.getRng(!0), a = e.startOffset, l = e.startContainer, d = l.nodeValue, t = c(j.getStart()), t && (i = u(t)), d && a > 0 && a < d.length && /\w/.test(d.charAt(a)) && /\w/.test(d.charAt(a - 1)) ? (s = j.getBookmark(), e.collapse(!0), e = P(e, p(n)), e = Y.split(e), b(n, r, e), j.moveToBookmark(s)) : (t && i.nodeValue === Q ? b(n, r, t) : (t = o(!0), i = t.firstChild, e.insertNode(t), a = 1, b(n, r, t)), j.setCursorLocation(i, a))
          }

          function h() {
            var e = j.getRng(!0),
              t, a, l, c, u, d, f = [],
              h, m;
            for (t = e.startContainer, a = e.startOffset, u = t, 3 == t.nodeType && (a != t.nodeValue.length && (c = !0), u = u.parentNode); u;) {
              if (w(u, n, r, i)) {
                d = u;
                break
              }
              u.nextSibling && (c = !0), f.push(u), u = u.parentNode
            }
            if (d)
              if (c) l = j.getBookmark(), e.collapse(!0), e = P(e, p(n), !0), e = Y.split(e), C(n, r, e), j.moveToBookmark(l);
              else {
                for (m = o(), u = m, h = f.length - 1; h >= 0; h--) u.appendChild(q.clone(f[h], !1)), u = u.firstChild;
                u.appendChild(q.doc.createTextNode(Q)), u = u.firstChild;
                var g = q.getParent(d, s);
                g && q.isEmpty(g) ? d.parentNode.replaceChild(m, d) : q.insertAfter(m, d), j.setCursorLocation(u, 1), q.isEmpty(d) && q.remove(d)
              }
          }

          function m() {
            var e;
            e = c(j.getStart()), e && !q.isEmpty(e) && ue(e, function(e) {
              1 != e.nodeType || e.id === g || q.isEmpty(e) || q.setAttrib(e, "data-mce-bogus", null)
            }, "childNodes")
          }
          var g = "_mce_caret",
            v = a.settings.caret_debug;
          a._hasCaretEvents || (ae = function() {
            var e = [],
              t;
            if (l(c(j.getStart()), e))
              for (t = e.length; t--;) q.setAttrib(e[t], "data-mce-bogus", "1")
          }, oe = function(e) {
            var t = e.keyCode;
            d(), 8 == t && j.isCollapsed() && j.getStart().innerHTML == Q && d(c(j.getStart())), (37 == t || 39 == t) && d(c(j.getStart())), m()
          }, a.on("SetContent", function(e) {
            e.selection && m()
          }), a._hasCaretEvents = !0), "apply" == t ? f() : h()
        }

        function U(t) {
          var n = t.startContainer,
            r = t.startOffset,
            i, o, a, s, l;
          if ((t.startContainer != t.endContainer || !c(t.startContainer.childNodes[t.startOffset])) && (3 == n.nodeType && r >= n.nodeValue.length && (r = J(n), n = n.parentNode, i = !0), 1 == n.nodeType))
            for (s = n.childNodes, n = s[Math.min(r, s.length - 1)], o = new e(n, q.getParent(n, q.isBlock)), (r > s.length - 1 || i) && o.next(), a = o.current(); a; a = o.next())
              if (3 == a.nodeType && !M(a)) return l = q.create("a", {
                "data-mce-bogus": "all"
              }, Q), a.parentNode.insertBefore(l, a), t.setStart(a, 0), j.setRng(t), void q.remove(l)
        }
        var $ = {},
          q = a.dom,
          j = a.selection,
          Y = new t(q),
          X = a.schema.isValidChild,
          K = q.isBlock,
          G = a.settings.forced_root_block,
          J = q.nodeIndex,
          Q = "\ufeff",
          Z = /^(src|href|style)$/,
          ee = !1,
          te = !0,
          ne, re, ie = q.getContentEditable,
          oe, ae, se = n.isBookmarkNode,
          le = i.each,
          ce = i.grep,
          ue = i.walk,
          de = i.extend;
        de(this, {
          get: p,
          register: m,
          unregister: g,
          apply: b,
          remove: C,
          toggle: x,
          match: E,
          matchAll: N,
          matchNode: w,
          canApply: _,
          formatChanged: S,
          getCssText: k
        }), f(), h(), a.on("BeforeGetContent", function(e) {
          ae && "raw" != e.format && ae()
        }), a.on("mouseup keydown", function(e) {
          oe && oe(e)
        })
      }
    }), r(J, [I, h], function(e, t) {
      return function(e) {
        function n() {
          return e.serializer.getTrimmedContent()
        }

        function r(t) {
          e.setDirty(t)
        }

        function i(e) {
          o.typing = !1, o.add({}, e)
        }
        var o = this,
          a = 0,
          s = [],
          l, c, u = 0;
        return e.on("init", function() {
          o.add()
        }), e.on("BeforeExecCommand", function(e) {
          var t = e.command;
          "Undo" != t && "Redo" != t && "mceRepaint" != t && o.beforeChange()
        }), e.on("ExecCommand", function(e) {
          var t = e.command;
          "Undo" != t && "Redo" != t && "mceRepaint" != t && i(e)
        }), e.on("ObjectResizeStart Cut", function() {
          o.beforeChange()
        }), e.on("SaveContent ObjectResized blur", i), e.on("DragEnd", i), e.on("KeyUp", function(a) {
          var l = a.keyCode;
          a.isDefaultPrevented() || ((l >= 33 && 36 >= l || l >= 37 && 40 >= l || 45 == l || 13 == l || a.ctrlKey) && (i(), e.nodeChanged()), (46 == l || 8 == l || t.mac && (91 == l || 93 == l)) && e.nodeChanged(), c && o.typing && (e.isDirty() || (r(s[0] && n() != s[0].content), e.isDirty() && e.fire("change", {
            level: s[0],
            lastLevel: null
          })), e.fire("TypingUndo"), c = !1, e.nodeChanged()))
        }), e.on("KeyDown", function(e) {
          var t = e.keyCode;
          if (!e.isDefaultPrevented()) {
            if (t >= 33 && 36 >= t || t >= 37 && 40 >= t || 45 == t) return void(o.typing && i(e));
            var n = e.ctrlKey && !e.altKey || e.metaKey;
            !(16 > t || t > 20) || 224 == t || 91 == t || o.typing || n || (o.beforeChange(), o.typing = !0, o.add({}, e), c = !0)
          }
        }), e.on("MouseDown", function(e) {
          o.typing && i(e)
        }), e.addShortcut("meta+z", "", "Undo"), e.addShortcut("meta+y,meta+shift+z", "", "Redo"), e.on("AddUndo Undo Redo ClearUndos", function(t) {
          t.isDefaultPrevented() || e.nodeChanged()
        }), o = {
          data: s,
          typing: !1,
          beforeChange: function() {
            u || (l = e.selection.getBookmark(2, !0))
          },
          add: function(t, i) {
            var o, c = e.settings,
              d;
            if (t = t || {}, t.content = n(), u || e.removed) return null;
            if (d = s[a], e.fire("BeforeAddUndo", {
                level: t,
                lastLevel: d,
                originalEvent: i
              }).isDefaultPrevented()) return null;
            if (d && d.content == t.content) return null;
            if (s[a] && (s[a].beforeBookmark = l), c.custom_undo_redo_levels && s.length > c.custom_undo_redo_levels) {
              for (o = 0; o < s.length - 1; o++) s[o] = s[o + 1];
              s.length--, a = s.length
            }
            t.bookmark = e.selection.getBookmark(2, !0), a < s.length - 1 && (s.length = a + 1), s.push(t), a = s.length - 1;
            var f = {
              level: t,
              lastLevel: d,
              originalEvent: i
            };
            return e.fire("AddUndo", f), a > 0 && (r(!0), e.fire("change", f)), t
          },
          undo: function() {
            var t;
            return o.typing && (o.add(), o.typing = !1), a > 0 && (t = s[--a], e.setContent(t.content, {
              format: "raw"
            }), e.selection.moveToBookmark(t.beforeBookmark), r(!0), e.fire("undo", {
              level: t
            })), t
          },
          redo: function() {
            var t;
            return a < s.length - 1 && (t = s[++a], e.setContent(t.content, {
              format: "raw"
            }), e.selection.moveToBookmark(t.bookmark), r(!0), e.fire("redo", {
              level: t
            })), t
          },
          clear: function() {
            s = [], a = 0, o.typing = !1, e.fire("ClearUndos")
          },
          hasUndo: function() {
            return a > 0 || o.typing && s[0] && n() != s[0].content
          },
          hasRedo: function() {
            return a < s.length - 1 && !this.typing
          },
          transact: function(e) {
            o.beforeChange();
            try {
              u++, e()
            } finally {
              u--
            }
            o.add()
          }
        }
      }
    }), r(Q, [y, T, h], function(e, t, n) {
      var r = n.ie && n.ie < 11;
      return function(i) {
        function o(o) {
          function h(e) {
            return e && a.isBlock(e) && !/^(TD|TH|CAPTION|FORM)$/.test(e.nodeName) && !/^(fixed|absolute)/i.test(e.style.position) && "true" !== a.getContentEditable(e)
          }

          function p(e) {
            return e && /^(TD|TH|CAPTION)$/.test(e.nodeName)
          }

          function m(e) {
            var t;
            a.isBlock(e) && (t = s.getRng(), e.appendChild(a.create("span", null, "\xa0")), s.select(e), e.lastChild.outerHTML = "", s.setRng(t))
          }

          function g(e) {
            var t = e,
              n = [],
              r;
            if (t) {
              for (; t = t.firstChild;) {
                if (a.isBlock(t)) return;
                1 != t.nodeType || d[t.nodeName.toLowerCase()] || n.push(t)
              }
              for (r = n.length; r--;) t = n[r], !t.hasChildNodes() || t.firstChild == t.lastChild && "" === t.firstChild.nodeValue ? a.remove(t) : "A" == t.nodeName && " " === (t.innerText || t.textContent) && a.remove(t)
            }
          }

          function v(t) {
            function r(e) {
              for (; e;) {
                if (1 == e.nodeType || 3 == e.nodeType && e.data && /[\r\n\s]/.test(e.data)) return e;
                e = e.nextSibling
              }
            }
            var i, o, l, c = t,
              u;
            if (t) {
              if (n.ie && n.ie < 9 && L && L.firstChild && L.firstChild == L.lastChild && "BR" == L.firstChild.tagName && a.remove(L.firstChild), /^(LI|DT|DD)$/.test(t.nodeName)) {
                var d = r(t.firstChild);
                d && /^(UL|OL|DL)$/.test(d.nodeName) && t.insertBefore(a.doc.createTextNode("\xa0"), t.firstChild)
              }
              if (l = a.createRng(), n.ie || t.normalize(), t.hasChildNodes()) {
                for (i = new e(t, t); o = i.current();) {
                  if (3 == o.nodeType) {
                    l.setStart(o, 0), l.setEnd(o, 0);
                    break
                  }
                  if (f[o.nodeName.toLowerCase()]) {
                    l.setStartBefore(o), l.setEndBefore(o);
                    break
                  }
                  c = o, o = i.next()
                }
                o || (l.setStart(c, 0), l.setEnd(c, 0))
              } else "BR" == t.nodeName ? t.nextSibling && a.isBlock(t.nextSibling) ? ((!P || 9 > P) && (u = a.create("br"), t.parentNode.insertBefore(u, t)), l.setStartBefore(t), l.setEndBefore(t)) : (l.setStartAfter(t), l.setEndAfter(t)) : (l.setStart(t, 0), l.setEnd(t, 0));
              s.setRng(l), a.remove(u), s.scrollIntoView(t)
            }
          }

          function y(e) {
            var t = l.forced_root_block;
            t && t.toLowerCase() === e.tagName.toLowerCase() && a.setAttribs(e, l.forced_root_block_attrs)
          }

          function b(e) {
            e.innerHTML = r ? "" : '<br data-mce-bogus="1">'
          }

          function C(e) {
            var t = D,
              n, i, o, s = u.getTextInlineElements();
            if (e || "TABLE" == z ? (n = a.create(e || V), y(n)) : n = L.cloneNode(!1), o = n, l.keep_styles !== !1)
              do
                if (s[t.nodeName]) {
                  if ("_mce_caret" == t.id) continue;
                  i = t.cloneNode(!1), a.setAttrib(i, "id", ""), n.hasChildNodes() ? (i.appendChild(n.firstChild), n.appendChild(i)) : (o = i, n.appendChild(i))
                }
            while (t = t.parentNode);
            return r || (o.innerHTML = '<br data-mce-bogus="1">'), n
          }

          function x(t) {
            var n, r, i;
            if (3 == D.nodeType && (t ? M > 0 : M < D.nodeValue.length)) return !1;
            if (D.parentNode == L && U && !t) return !0;
            if (t && 1 == D.nodeType && D == L.firstChild) return !0;
            if ("TABLE" === D.nodeName || D.previousSibling && "TABLE" == D.previousSibling.nodeName) return U && !t || !U && t;
            for (n = new e(D, L), 3 == D.nodeType && (t && 0 === M ? n.prev() : t || M != D.nodeValue.length || n.next()); r = n.current();) {
              if (1 === r.nodeType) {
                if (!r.getAttribute("data-mce-bogus") && (i = r.nodeName.toLowerCase(), d[i] && "br" !== i)) return !1
              } else if (3 === r.nodeType && !/^[ \t\r\n]*$/.test(r.nodeValue)) return !1;
              t ? n.prev() : n.next()
            }
            return !0
          }

          function w(e, t) {
            var n, r, o, s, l, c, d = V || "P";
            if (r = a.getParent(e, a.isBlock), !r || !h(r)) {
              if (r = r || B, c = r == i.getBody() || p(r) ? r.nodeName.toLowerCase() : r.parentNode.nodeName.toLowerCase(), !r.hasChildNodes()) return n = a.create(d), y(n), r.appendChild(n), R.setStart(n, 0), R.setEnd(n, 0), n;
              for (s = e; s.parentNode != r;) s = s.parentNode;
              for (; s && !a.isBlock(s);) o = s, s = s.previousSibling;
              if (o && u.isValidChild(c, d.toLowerCase())) {
                for (n = a.create(d), y(n), o.parentNode.insertBefore(n, o), s = o; s && !a.isBlock(s);) l = s.nextSibling, n.appendChild(s), s = l;
                R.setStart(e, t), R.setEnd(e, t)
              }
            }
            return e
          }

          function E() {
            function e(e) {
              for (var t = F[e ? "firstChild" : "lastChild"]; t && 1 != t.nodeType;) t = t[e ? "nextSibling" : "previousSibling"];
              return t === L
            }

            function t() {
              var e = F.parentNode;
              return /^(LI|DT|DD)$/.test(e.nodeName) ? e : F
            }
            if (F != i.getBody()) {
              var n = F.parentNode.nodeName;
              /^(OL|UL|LI)$/.test(n) && (V = "LI"), O = V ? C(V) : a.create("BR"), e(!0) && e() ? "LI" == n ? a.insertAfter(O, t()) : a.replace(O, F) : e(!0) ? "LI" == n ? (a.insertAfter(O, t()), O.appendChild(a.doc.createTextNode(" ")), O.appendChild(F)) : F.parentNode.insertBefore(O, F) : e() ? (a.insertAfter(O, t()), m(O)) : (F = t(), A = R.cloneRange(), A.setStartAfter(L), A.setEndAfter(F), I = A.extractContents(), "LI" == V && "LI" == I.firstChild.nodeName ? (O = I.firstChild, a.insertAfter(I, F)) : (a.insertAfter(I, F), a.insertAfter(O, F))), a.remove(L), v(O), c.add()
            }
          }

          function N() {
            i.execCommand("InsertLineBreak", !1, o)
          }

          function _(e) {
            do 3 === e.nodeType && (e.nodeValue = e.nodeValue.replace(/^[\r\n]+/, "")), e = e.firstChild; while (e)
          }

          function S(e) {
            var t = a.getRoot(),
              n, r;
            for (n = e; n !== t && "false" !== a.getContentEditable(n);) "true" === a.getContentEditable(n) && (r = n), n = n.parentNode;
            return n !== t ? r : t
          }

          function k(e) {
            var t;
            r || (e.normalize(), t = e.lastChild, (!t || /^(left|right)$/gi.test(a.getStyle(t, "float", !0))) && a.add(e, "br"))
          }

          function T() {
            O = /^(H[1-6]|PRE|FIGURE)$/.test(z) && "HGROUP" != W ? C(V) : C(), l.end_container_on_empty_block && h(F) && a.isEmpty(L) ? O = a.split(F, L) : a.insertAfter(O, L), v(O)
          }
          var R, A, B, D, M, L, P, H, O, I, F, z, W, V, U;
          if (R = s.getRng(!0), !o.isDefaultPrevented()) {
            if (!R.collapsed) return void i.execCommand("Delete");
            if (new t(a).normalize(R), D = R.startContainer, M = R.startOffset, V = (l.force_p_newlines ? "p" : "") || l.forced_root_block, V = V ? V.toUpperCase() : "", P = a.doc.documentMode, H = o.shiftKey, 1 == D.nodeType && D.hasChildNodes() && (U = M > D.childNodes.length - 1, D = D.childNodes[Math.min(M, D.childNodes.length - 1)] || D, M = U && 3 == D.nodeType ? D.nodeValue.length : 0), B = S(D)) {
              if (c.beforeChange(), !a.isBlock(B) && B != a.getRoot()) return void((!V || H) && N());
              if ((V && !H || !V && H) && (D = w(D, M)), L = a.getParent(D, a.isBlock), F = L ? a.getParent(L.parentNode, a.isBlock) : null, z = L ? L.nodeName.toUpperCase() : "", W = F ? F.nodeName.toUpperCase() : "", "LI" != W || o.ctrlKey || (L = F, z = W), /^(LI|DT|DD)$/.test(z)) {
                if (!V && H) return void N();
                if (a.isEmpty(L)) return void E()
              }
              if ("PRE" == z && l.br_in_pre !== !1) {
                if (!H) return void N()
              } else if (!V && !H && "LI" != z || V && H) return void N();
              V && L === i.getBody() || (V = V || "P", x() ? T() : x(!0) ? (O = L.parentNode.insertBefore(C(), L), m(O), v(L)) : (A = R.cloneRange(), A.setEndAfter(L), I = A.extractContents(), _(I), O = I.firstChild, a.insertAfter(I, L), g(O), k(L), a.isEmpty(L) && b(L), O.normalize(), a.isEmpty(O) ? (a.remove(O), T()) : v(O)), a.setAttrib(O, "id", ""), i.fire("NewBlock", {
                newBlock: O
              }), c.add())
            }
          }
        }
        var a = i.dom,
          s = i.selection,
          l = i.settings,
          c = i.undoManager,
          u = i.schema,
          d = u.getNonEmptyElements(),
          f = u.getMoveCaretBeforeOnEnterElements();
        i.on("keydown", function(e) {
          13 == e.keyCode && o(e) !== !1 && e.preventDefault()
        })
      }
    }), r(Z, [], function() {
      return function(e) {
        function t() {
          var t = i.getStart(),
            s = e.getBody(),
            l, c, u, d, f, h, p, m = -16777215,
            g, v, y, b, C;
          if (C = n.forced_root_block, t && 1 === t.nodeType && C) {
            for (; t && t != s;) {
              if (a[t.nodeName]) return;
              t = t.parentNode
            }
            if (l = i.getRng(), l.setStart) {
              c = l.startContainer, u = l.startOffset, d = l.endContainer, f = l.endOffset;
              try {
                v = e.getDoc().activeElement === s
              } catch (x) {}
            } else l.item && (t = l.item(0), l = e.getDoc().body.createTextRange(), l.moveToElementText(t)), v = l.parentElement().ownerDocument === e.getDoc(), y = l.duplicate(), y.collapse(!0), u = -1 * y.move("character", m), y.collapsed || (y = l.duplicate(), y.collapse(!1), f = -1 * y.move("character", m) - u);
            for (t = s.firstChild, b = s.nodeName.toLowerCase(); t;)
              if ((3 === t.nodeType || 1 == t.nodeType && !a[t.nodeName]) && o.isValidChild(b, C.toLowerCase())) {
                if (3 === t.nodeType && 0 === t.nodeValue.length) {
                  p = t, t = t.nextSibling, r.remove(p);
                  continue
                }
                h || (h = r.create(C, e.settings.forced_root_block_attrs), t.parentNode.insertBefore(h, t), g = !0), p = t, t = t.nextSibling, h.appendChild(p)
              } else h = null, t = t.nextSibling;
            if (g && v) {
              if (l.setStart) l.setStart(c, u), l.setEnd(d, f), i.setRng(l);
              else try {
                l = e.getDoc().body.createTextRange(), l.moveToElementText(s), l.collapse(!0), l.moveStart("character", u), f > 0 && l.moveEnd("character", f), l.select()
              } catch (x) {}
              e.nodeChanged()
            }
          }
        }
        var n = e.settings,
          r = e.dom,
          i = e.selection,
          o = e.schema,
          a = o.getBlockElements();
        n.forced_root_block && e.on("NodeChange", t)
      }
    }), r(ee, [P, h, m, X, T, y], function(e, n, r, i, o, a) {
      var s = r.each,
        l = r.extend,
        c = r.map,
        u = r.inArray,
        d = r.explode,
        f = n.ie,
        h = n.ie && n.ie < 11,
        p = !0,
        m = !1;
      return function(r) {
        function g(e, t, n, i) {
          var o, a, l = 0;
          if (/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(e) || i && i.skip_focus || r.focus(), i = r.fire("BeforeExecCommand", {
              command: e,
              ui: t,
              value: n
            }), i.isDefaultPrevented()) return !1;
          if (a = e.toLowerCase(), o = M.exec[a]) return o(a, t, n), r.fire("ExecCommand", {
            command: e,
            ui: t,
            value: n
          }), !0;
          if (s(r.plugins, function(i) {
              return i.execCommand && i.execCommand(e, t, n) ? (r.fire("ExecCommand", {
                command: e,
                ui: t,
                value: n
              }), l = !0, !1) : void 0
            }), l) return l;
          if (r.theme && r.theme.execCommand && r.theme.execCommand(e, t, n)) return r.fire("ExecCommand", {
            command: e,
            ui: t,
            value: n
          }), !0;
          try {
            l = r.getDoc().execCommand(e, t, n)
          } catch (c) {}
          return l ? (r.fire("ExecCommand", {
            command: e,
            ui: t,
            value: n
          }), !0) : !1
        }

        function v(e) {
          var t;
          if (!r._isHidden()) {
            if (e = e.toLowerCase(), t = M.state[e]) return t(e);
            try {
              return r.getDoc().queryCommandState(e)
            } catch (n) {}
            return !1
          }
        }

        function y(e) {
          var t;
          if (!r._isHidden()) {
            if (e = e.toLowerCase(), t = M.value[e]) return t(e);
            try {
              return r.getDoc().queryCommandValue(e)
            } catch (n) {}
          }
        }

        function b(e, t) {
          t = t || "exec", s(e, function(e, n) {
            s(n.toLowerCase().split(","), function(n) {
              M[t][n] = e
            })
          })
        }

        function C(e, t, n) {
          e = e.toLowerCase(), M.exec[e] = function(e, i, o, a) {
            return t.call(n || r, i, o, a)
          }
        }

        function x(e) {
          if (e = e.toLowerCase(), M.exec[e]) return !0;
          try {
            return r.getDoc().queryCommandSupported(e)
          } catch (t) {}
          return !1
        }

        function w(e, t, n) {
          e = e.toLowerCase(), M.state[e] = function() {
            return t.call(n || r)
          }
        }

        function E(e, t, n) {
          e = e.toLowerCase(), M.value[e] = function() {
            return t.call(n || r)
          }
        }

        function N(e) {
          return e = e.toLowerCase(), !!M.exec[e]
        }

        function _(e, n, i) {
          return n === t && (n = m), i === t && (i = null), r.getDoc().execCommand(e, n, i)
        }

        function S(e) {
          return D.match(e)
        }

        function k(e, n) {
          D.toggle(e, n ? {
            value: n
          } : t), r.nodeChanged()
        }

        function T(e) {
          P = B.getBookmark(e)
        }

        function R() {
          B.moveToBookmark(P)
        }
        var A, B, D, M = {
            state: {},
            exec: {},
            value: {}
          },
          L = r.settings,
          P;
        r.on("PreInit", function() {
          A = r.dom, B = r.selection, L = r.settings, D = r.formatter
        }), l(this, {
          execCommand: g,
          queryCommandState: v,
          queryCommandValue: y,
          queryCommandSupported: x,
          addCommands: b,
          addCommand: C,
          addQueryStateHandler: w,
          addQueryValueHandler: E,
          hasCustomCommand: N
        }), b({
          "mceResetDesignMode,mceBeginUndoLevel": function() {},
          "mceEndUndoLevel,mceAddUndoLevel": function() {
            r.undoManager.add()
          },
          "Cut,Copy,Paste": function(e) {
            var t = r.getDoc(),
              i;
            try {
              _(e)
            } catch (o) {
              i = p
            }
            if (i || !t.queryCommandSupported(e)) {
              var a = r.translate("Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.");
              n.mac && (a = a.replace(/Ctrl\+/g, "\u2318+")), r.notificationManager.open({
                text: a,
                type: "error"
              })
            }
          },
          unlink: function() {
            if (B.isCollapsed()) {
              var e = B.getNode();
              return void("A" == e.tagName && r.dom.remove(e, !0))
            }
            D.remove("link")
          },
          "JustifyLeft,JustifyCenter,JustifyRight,JustifyFull,JustifyNone": function(e) {
            var t = e.substring(7);
            "full" == t && (t = "justify"), s("left,center,right,justify".split(","), function(e) {
              t != e && D.remove("align" + e)
            }), "none" != t && k("align" + t)
          },
          "InsertUnorderedList,InsertOrderedList": function(e) {
            var t, n;
            _(e), t = A.getParent(B.getNode(), "ol,ul"), t && (n = t.parentNode, /^(H[1-6]|P|ADDRESS|PRE)$/.test(n.nodeName) && (T(), A.split(n, t), R()))
          },
          "Bold,Italic,Underline,Strikethrough,Superscript,Subscript": function(e) {
            k(e)
          },
          "ForeColor,HiliteColor,FontName": function(e, t, n) {
            k(e, n)
          },
          FontSize: function(e, t, n) {
            var r, i;
            n >= 1 && 7 >= n && (i = d(L.font_size_style_values), r = d(L.font_size_classes), n = r ? r[n - 1] || n : i[n - 1] || n), k(e, n)
          },
          RemoveFormat: function(e) {
            D.remove(e)
          },
          mceBlockQuote: function() {
            k("blockquote")
          },
          FormatBlock: function(e, t, n) {
            return k(n || "p")
          },
          mceCleanup: function() {
            var e = B.getBookmark();
            r.setContent(r.getContent({
              cleanup: p
            }), {
              cleanup: p
            }), B.moveToBookmark(e)
          },
          mceRemoveNode: function(e, t, n) {
            var i = n || B.getNode();
            i != r.getBody() && (T(), r.dom.remove(i, p), R())
          },
          mceSelectNodeDepth: function(e, t, n) {
            var i = 0;
            A.getParent(B.getNode(), function(e) {
              return 1 == e.nodeType && i++ == n ? (B.select(e), m) : void 0
            }, r.getBody())
          },
          mceSelectNode: function(e, t, n) {
            B.select(n)
          },
          mceInsertContent: function(t, n, o) {
            function a(e) {
              function t(e) {
                return r[e] && 3 == r[e].nodeType
              }
              var n, r, i;
              return n = B.getRng(!0), r = n.startContainer, i = n.startOffset, 3 == r.nodeType && (i > 0 ? e = e.replace(/^&nbsp;/, " ") : t("previousSibling") || (e = e.replace(/^ /, "&nbsp;")), i < r.length ? e = e.replace(/&nbsp;(<br>|)$/, " ") : t("nextSibling") || (e = e.replace(/(&nbsp;| )(<br>|)$/, "&nbsp;"))), e
            }

            function l() {
              var e, t, n;
              e = B.getRng(!0), t = e.startContainer, n = e.startOffset, 3 == t.nodeType && e.collapsed && ("\xa0" === t.data[n] ? (t.deleteData(n, 1), /[\u00a0| ]$/.test(o) || (o += " ")) : "\xa0" === t.data[n - 1] && (t.deleteData(n - 1, 1), /[\u00a0| ]$/.test(o) || (o = " " + o)))
            }

            function c(e) {
              if (N)
                for (x = e.firstChild; x; x = x.walk(!0)) S[x.name] && x.attr("data-mce-new", "true")
            }

            function u() {
              if (N) {
                var e = r.getBody(),
                  t = new i(A);
                s(A.select("*[data-mce-new]"), function(n) {
                  n.removeAttribute("data-mce-new");
                  for (var r = n.parentNode; r && r != e; r = r.parentNode) t.compare(r, n) && A.remove(n, !0)
                })
              }
            }

            function d(e) {
              function t(e) {
                for (var t = r.getBody(); e && e !== t; e = e.parentNode)
                  if ("false" === r.dom.getContentEditable(e)) return e;
                return null
              }
              var n;
              if (e) {
                if (B.scrollIntoView(e), n = t(e)) return A.remove(e), void B.select(n);
                C = A.createRng(), x = e.previousSibling, x && 3 == x.nodeType ? (C.setStart(x, x.nodeValue.length), f || (w = e.nextSibling, w && 3 == w.nodeType && (x.appendData(w.data), w.parentNode.removeChild(w)))) : (C.setStartBefore(e), C.setEndBefore(e)), A.remove(e), B.setRng(C)
              }
            }
            var h, p, m, g, v, y, b, C, x, w, E, N, _, S = r.schema.getTextInlineElements();
            "string" != typeof o && (N = o.merge, _ = o.data, o = o.content), /^ | $/.test(o) && (o = a(o)), h = r.parser, p = new e({
              validate: L.validate
            }, r.schema), E = '<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;&#x200B;</span>', y = {
              content: o,
              format: "html",
              selection: !0
            }, r.fire("BeforeSetContent", y), o = y.content, -1 == o.indexOf("{$caret}") && (o += "{$caret}"), o = o.replace(/\{\$caret\}/, E), C = B.getRng();
            var k = C.startContainer || (C.parentElement ? C.parentElement() : null),
              T = r.getBody();
            k === T && B.isCollapsed() && A.isBlock(T.firstChild) && A.isEmpty(T.firstChild) && (C = A.createRng(), C.setStart(T.firstChild, 0), C.setEnd(T.firstChild, 0), B.setRng(C)), B.isCollapsed() || (r.selection.setRng(r.selection.getRng()), r.getDoc().execCommand("Delete", !1, null), l()), m = B.getNode();
            var R = {
              context: m.nodeName.toLowerCase(),
              data: _
            };
            if (v = h.parse(o, R), c(v), x = v.lastChild, "mce_marker" == x.attr("id"))
              for (b = x, x = x.prev; x; x = x.walk(!0))
                if (3 == x.type || !A.isBlock(x.name)) {
                  r.schema.isValidChild(x.parent.name, "span") && x.parent.insert(b, x, "br" === x.name);
                  break
                }
            if (r._selectionOverrides.showBlockCaretContainer(m), R.invalid) {
              for (B.setContent(E), m = B.getNode(), g = r.getBody(), 9 == m.nodeType ? m = x = g : x = m; x !== g;) m = x, x = x.parentNode;
              o = m == g ? g.innerHTML : A.getOuterHTML(m), o = p.serialize(h.parse(o.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i, function() {
                return p.serialize(v)
              }))), m == g ? A.setHTML(g, o) : A.setOuterHTML(m, o)
            } else o = p.serialize(v), x = m.firstChild, w = m.lastChild, !x || x === w && "BR" === x.nodeName ? A.setHTML(m, o) : B.setContent(o);
            u(), d(A.get("mce_marker")), r.fire("SetContent", y), r.addVisual()
          },
          mceInsertRawHTML: function(e, t, n) {
            B.setContent("tiny_mce_marker"), r.setContent(r.getContent().replace(/tiny_mce_marker/g, function() {
              return n
            }))
          },
          mceToggleFormat: function(e, t, n) {
            k(n)
          },
          mceSetContent: function(e, t, n) {
            r.setContent(n)
          },
          "Indent,Outdent": function(e) {
            var t, n, i;
            t = L.indentation, n = /[a-z%]+$/i.exec(t), t = parseInt(t, 10), v("InsertUnorderedList") || v("InsertOrderedList") ? _(e) : (L.forced_root_block || A.getParent(B.getNode(), A.isBlock) || D.apply("div"), s(B.getSelectedBlocks(), function(o) {
              if ("false" !== A.getContentEditable(o) && "LI" != o.nodeName) {
                var a = r.getParam("indent_use_margin", !1) ? "margin" : "padding";
                a += "rtl" == A.getStyle(o, "direction", !0) ? "Right" : "Left", "outdent" == e ? (i = Math.max(0, parseInt(o.style[a] || 0, 10) - t), A.setStyle(o, a, i ? i + n : "")) : (i = parseInt(o.style[a] || 0, 10) + t + n, A.setStyle(o, a, i))
              }
            }))
          },
          mceRepaint: function() {},
          InsertHorizontalRule: function() {
            r.execCommand("mceInsertContent", !1, "<hr />")
          },
          mceToggleVisualAid: function() {
            r.hasVisual = !r.hasVisual, r.addVisual()
          },
          mceReplaceContent: function(e, t, n) {
            r.execCommand("mceInsertContent", !1, n.replace(/\{\$selection\}/g, B.getContent({
              format: "text"
            })))
          },
          mceInsertLink: function(e, t, n) {
            var r;
            "string" == typeof n && (n = {
              href: n
            }), r = A.getParent(B.getNode(), "a"), n.href = n.href.replace(" ", "%20"), r && n.href || D.remove("link"), n.href && D.apply("link", n, r)
          },
          selectAll: function() {
            var e = A.getRoot(),
              t;
            B.getRng().setStart ? (t = A.createRng(), t.setStart(e, 0), t.setEnd(e, e.childNodes.length), B.setRng(t)) : (t = B.getRng(), t.item || (t.moveToElementText(e), t.select()))
          },
          "delete": function() {
            _("Delete");
            var e = r.getBody();
            A.isEmpty(e) && (r.setContent(""), e.firstChild && A.isBlock(e.firstChild) ? r.selection.setCursorLocation(e.firstChild, 0) : r.selection.setCursorLocation(e, 0))
          },
          mceNewDocument: function() {
            r.setContent("")
          },
          InsertLineBreak: function(e, t, n) {
            function i() {
              for (var e = new a(m, v), t, n = r.schema.getNonEmptyElements(); t = e.next();)
                if (n[t.nodeName.toLowerCase()] || t.length > 0) return !0
            }
            var s = n,
              l, c, u, d = B.getRng(!0);
            new o(A).normalize(d);
            var f = d.startOffset,
              m = d.startContainer;
            if (1 == m.nodeType && m.hasChildNodes()) {
              var g = f > m.childNodes.length - 1;
              m = m.childNodes[Math.min(f, m.childNodes.length - 1)] || m, f = g && 3 == m.nodeType ? m.nodeValue.length : 0
            }
            var v = A.getParent(m, A.isBlock),
              y = v ? v.nodeName.toUpperCase() : "",
              b = v ? A.getParent(v.parentNode, A.isBlock) : null,
              C = b ? b.nodeName.toUpperCase() : "",
              x = s && s.ctrlKey;
            "LI" != C || x || (v = b, y = C), m && 3 == m.nodeType && f >= m.nodeValue.length && (h || i() || (l = A.create("br"), d.insertNode(l), d.setStartAfter(l), d.setEndAfter(l), c = !0)), l = A.create("br"), d.insertNode(l);
            var w = A.doc.documentMode;
            return h && "PRE" == y && (!w || 8 > w) && l.parentNode.insertBefore(A.doc.createTextNode("\r"), l), u = A.create("span", {}, "&nbsp;"), l.parentNode.insertBefore(u, l), B.scrollIntoView(u), A.remove(u), c ? (d.setStartBefore(l), d.setEndBefore(l)) : (d.setStartAfter(l), d.setEndAfter(l)), B.setRng(d), r.undoManager.add(), p
          }
        }), b({
          "JustifyLeft,JustifyCenter,JustifyRight,JustifyFull": function(e) {
            var t = "align" + e.substring(7),
              n = B.isCollapsed() ? [A.getParent(B.getNode(), A.isBlock)] : B.getSelectedBlocks(),
              r = c(n, function(e) {
                return !!D.matchNode(e, t)
              });
            return -1 !== u(r, p)
          },
          "Bold,Italic,Underline,Strikethrough,Superscript,Subscript": function(e) {
            return S(e)
          },
          mceBlockQuote: function() {
            return S("blockquote")
          },
          Outdent: function() {
            var e;
            if (L.inline_styles) {
              if ((e = A.getParent(B.getStart(), A.isBlock)) && parseInt(e.style.paddingLeft, 10) > 0) return p;
              if ((e = A.getParent(B.getEnd(), A.isBlock)) && parseInt(e.style.paddingLeft, 10) > 0) return p
            }
            return v("InsertUnorderedList") || v("InsertOrderedList") || !L.inline_styles && !!A.getParent(B.getNode(), "BLOCKQUOTE")
          },
          "InsertUnorderedList,InsertOrderedList": function(e) {
            var t = A.getParent(B.getNode(), "ul,ol");
            return t && ("insertunorderedlist" === e && "UL" === t.tagName || "insertorderedlist" === e && "OL" === t.tagName)
          }
        }, "state"), b({
          "FontSize,FontName": function(e) {
            var t = 0,
              n;
            return (n = A.getParent(B.getNode(), "span")) && (t = "fontsize" == e ? n.style.fontSize : n.style.fontFamily.replace(/, /g, ",").replace(/[\'\"]/g, "").toLowerCase()), t
          }
        }, "value"), b({
          Undo: function() {
            r.undoManager.undo()
          },
          Redo: function() {
            r.undoManager.redo()
          }
        })
      }
    }), r(te, [m], function(e) {
      function t(e, o) {
        var a = this,
          s, l;
        if (e = r(e),
          o = a.settings = o || {}, s = o.base_uri, /^([\w\-]+):([^\/]{2})/i.test(e) || /^\s*#/.test(e)) return void(a.source = e);
        var c = 0 === e.indexOf("//");
        0 !== e.indexOf("/") || c || (e = (s ? s.protocol || "http" : "http") + "://mce_host" + e), /^[\w\-]*:?\/\//.test(e) || (l = o.base_uri ? o.base_uri.path : new t(location.href).directory, "" === o.base_uri.protocol ? e = "//mce_host" + a.toAbsPath(l, e) : (e = /([^#?]*)([#?]?.*)/.exec(e), e = (s && s.protocol || "http") + "://mce_host" + a.toAbsPath(l, e[1]) + e[2])), e = e.replace(/@@/g, "(mce_at)"), e = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e), n(i, function(t, n) {
          var r = e[n];
          r && (r = r.replace(/\(mce_at\)/g, "@@")), a[t] = r
        }), s && (a.protocol || (a.protocol = s.protocol), a.userInfo || (a.userInfo = s.userInfo), a.port || "mce_host" !== a.host || (a.port = s.port), a.host && "mce_host" !== a.host || (a.host = s.host), a.source = ""), c && (a.protocol = "")
      }
      var n = e.each,
        r = e.trim,
        i = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" "),
        o = {
          ftp: 21,
          http: 80,
          https: 443,
          mailto: 25
        };
      return t.prototype = {
        setPath: function(e) {
          var t = this;
          e = /^(.*?)\/?(\w+)?$/.exec(e), t.path = e[0], t.directory = e[1], t.file = e[2], t.source = "", t.getURI()
        },
        toRelative: function(e) {
          var n = this,
            r;
          if ("./" === e) return e;
          if (e = new t(e, {
              base_uri: n
            }), "mce_host" != e.host && n.host != e.host && e.host || n.port != e.port || n.protocol != e.protocol && "" !== e.protocol) return e.getURI();
          var i = n.getURI(),
            o = e.getURI();
          return i == o || "/" == i.charAt(i.length - 1) && i.substr(0, i.length - 1) == o ? i : (r = n.toRelPath(n.path, e.path), e.query && (r += "?" + e.query), e.anchor && (r += "#" + e.anchor), r)
        },
        toAbsolute: function(e, n) {
          return e = new t(e, {
            base_uri: this
          }), e.getURI(n && this.isSameOrigin(e))
        },
        isSameOrigin: function(e) {
          if (this.host == e.host && this.protocol == e.protocol) {
            if (this.port == e.port) return !0;
            var t = o[this.protocol];
            if (t && (this.port || t) == (e.port || t)) return !0
          }
          return !1
        },
        toRelPath: function(e, t) {
          var n, r = 0,
            i = "",
            o, a;
          if (e = e.substring(0, e.lastIndexOf("/")), e = e.split("/"), n = t.split("/"), e.length >= n.length)
            for (o = 0, a = e.length; a > o; o++)
              if (o >= n.length || e[o] != n[o]) {
                r = o + 1;
                break
              }
          if (e.length < n.length)
            for (o = 0, a = n.length; a > o; o++)
              if (o >= e.length || e[o] != n[o]) {
                r = o + 1;
                break
              }
          if (1 === r) return t;
          for (o = 0, a = e.length - (r - 1); a > o; o++) i += "../";
          for (o = r - 1, a = n.length; a > o; o++) i += o != r - 1 ? "/" + n[o] : n[o];
          return i
        },
        toAbsPath: function(e, t) {
          var r, i = 0,
            o = [],
            a, s;
          for (a = /\/$/.test(t) ? "/" : "", e = e.split("/"), t = t.split("/"), n(e, function(e) {
              e && o.push(e)
            }), e = o, r = t.length - 1, o = []; r >= 0; r--) 0 !== t[r].length && "." !== t[r] && (".." !== t[r] ? i > 0 ? i-- : o.push(t[r]) : i++);
          return r = e.length - i, s = 0 >= r ? o.reverse().join("/") : e.slice(0, r).join("/") + "/" + o.reverse().join("/"), 0 !== s.indexOf("/") && (s = "/" + s), a && s.lastIndexOf("/") !== s.length - 1 && (s += a), s
        },
        getURI: function(e) {
          var t, n = this;
          return (!n.source || e) && (t = "", e || (t += n.protocol ? n.protocol + "://" : "//", n.userInfo && (t += n.userInfo + "@"), n.host && (t += n.host), n.port && (t += ":" + n.port)), n.path && (t += n.path), n.query && (t += "?" + n.query), n.anchor && (t += "#" + n.anchor), n.source = t), n.source
        }
      }, t.parseDataUri = function(e) {
        var t, n;
        return e = decodeURIComponent(e).split(","), n = /data:([^;]+)/.exec(e[0]), n && (t = n[1]), {
          type: t,
          data: e[1]
        }
      }, t
    }), r(ne, [m], function(e) {
      function t() {}
      var n = e.each,
        r = e.extend,
        i, o;
      return t.extend = i = function(e) {
        function t() {
          var e, t, n, r = this;
          if (!o && (r.init && r.init.apply(r, arguments), t = r.Mixins))
            for (e = t.length; e--;) n = t[e], n.init && n.init.apply(r, arguments)
        }

        function a() {
          return this
        }

        function s(e, t) {
          return function() {
            var n = this,
              r = n._super,
              i;
            return n._super = c[e], i = t.apply(n, arguments), n._super = r, i
          }
        }
        var l = this,
          c = l.prototype,
          u, d, f;
        o = !0, u = new l, o = !1, e.Mixins && (n(e.Mixins, function(t) {
          t = t;
          for (var n in t) "init" !== n && (e[n] = t[n])
        }), c.Mixins && (e.Mixins = c.Mixins.concat(e.Mixins))), e.Methods && n(e.Methods.split(","), function(t) {
          e[t] = a
        }), e.Properties && n(e.Properties.split(","), function(t) {
          var n = "_" + t;
          e[t] = function(e) {
            var t = this,
              r;
            return e !== r ? (t[n] = e, t) : t[n]
          }
        }), e.Statics && n(e.Statics, function(e, n) {
          t[n] = e
        }), e.Defaults && c.Defaults && (e.Defaults = r({}, c.Defaults, e.Defaults));
        for (d in e) f = e[d], "function" == typeof f && c[d] ? u[d] = s(d, f) : u[d] = f;
        return t.prototype = u, t.constructor = t, t.extend = i, t
      }, t
    }), r(re, [m], function(e) {
      function t(t) {
        function n() {
          return !1
        }

        function r() {
          return !0
        }

        function i(e, i) {
          var o, s, l, c;
          if (e = e.toLowerCase(), i = i || {}, i.type = e, i.target || (i.target = u), i.preventDefault || (i.preventDefault = function() {
              i.isDefaultPrevented = r
            }, i.stopPropagation = function() {
              i.isPropagationStopped = r
            }, i.stopImmediatePropagation = function() {
              i.isImmediatePropagationStopped = r
            }, i.isDefaultPrevented = n, i.isPropagationStopped = n, i.isImmediatePropagationStopped = n), t.beforeFire && t.beforeFire(i), o = d[e])
            for (s = 0, l = o.length; l > s; s++) {
              if (c = o[s], c.once && a(e, c.func), i.isImmediatePropagationStopped()) return i.stopPropagation(), i;
              if (c.func.call(u, i) === !1) return i.preventDefault(), i
            }
          return i
        }

        function o(t, r, i, o) {
          var a, s, l;
          if (r === !1 && (r = n), r)
            for (r = {
                func: r
              }, o && e.extend(r, o), s = t.toLowerCase().split(" "), l = s.length; l--;) t = s[l], a = d[t], a || (a = d[t] = [], f(t, !0)), i ? a.unshift(r) : a.push(r);
          return c
        }

        function a(e, t) {
          var n, r, i, o, a;
          if (e)
            for (o = e.toLowerCase().split(" "), n = o.length; n--;) {
              if (e = o[n], r = d[e], !e) {
                for (i in d) f(i, !1), delete d[i];
                return c
              }
              if (r) {
                if (t)
                  for (a = r.length; a--;) r[a].func === t && (r = r.slice(0, a).concat(r.slice(a + 1)), d[e] = r);
                else r.length = 0;
                r.length || (f(e, !1), delete d[e])
              }
            } else {
              for (e in d) f(e, !1);
              d = {}
            }
          return c
        }

        function s(e, t, n) {
          return o(e, t, n, {
            once: !0
          })
        }

        function l(e) {
          return e = e.toLowerCase(), !(!d[e] || 0 === d[e].length)
        }
        var c = this,
          u, d = {},
          f;
        t = t || {}, u = t.scope || c, f = t.toggleEvent || n, c.fire = i, c.on = o, c.off = a, c.once = s, c.has = l
      }
      var n = e.makeMap("focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange mouseout mouseenter mouseleave wheel keydown keypress keyup input contextmenu dragstart dragend dragover draggesture dragdrop drop drag submit compositionstart compositionend compositionupdate touchstart touchend", " ");
      return t.isNative = function(e) {
        return !!n[e.toLowerCase()]
      }, t
    }), r(ie, [], function() {
      function e(e) {
        this.create = e.create
      }
      return e.create = function(t, n) {
        return new e({
          create: function(e, r) {
            function i(t) {
              e.set(r, t.value)
            }

            function o(e) {
              t.set(n, e.value)
            }
            var a;
            return e.on("change:" + r, o), t.on("change:" + n, i), a = e._bindings, a || (a = e._bindings = [], e.on("destroy", function() {
              for (var e = a.length; e--;) a[e]()
            })), a.push(function() {
              t.off("change:" + n, i)
            }), t.get(n)
          }
        })
      }, e
    }), r(oe, [re], function(e) {
      function t(t) {
        return t._eventDispatcher || (t._eventDispatcher = new e({
          scope: t,
          toggleEvent: function(n, r) {
            e.isNative(n) && t.toggleNativeEvent && t.toggleNativeEvent(n, r)
          }
        })), t._eventDispatcher
      }
      return {
        fire: function(e, n, r) {
          var i = this;
          if (i.removed && "remove" !== e) return n;
          if (n = t(i).fire(e, n, r), r !== !1 && i.parent)
            for (var o = i.parent(); o && !n.isPropagationStopped();) o.fire(e, n, !1), o = o.parent();
          return n
        },
        on: function(e, n, r) {
          return t(this).on(e, n, r)
        },
        off: function(e, n) {
          return t(this).off(e, n)
        },
        once: function(e, n) {
          return t(this).once(e, n)
        },
        hasEventListeners: function(e) {
          return t(this).has(e)
        }
      }
    }), r(ae, [ie, oe, ne, m], function(e, t, n, r) {
      function i(e) {
        return e.nodeType > 0
      }

      function o(e, t) {
        var n, a;
        if (e === t) return !0;
        if (null === e || null === t) return e === t;
        if ("object" != typeof e || "object" != typeof t) return e === t;
        if (r.isArray(t)) {
          if (e.length !== t.length) return !1;
          for (n = e.length; n--;)
            if (!o(e[n], t[n])) return !1
        }
        if (i(e) || i(t)) return e === t;
        a = {};
        for (n in t) {
          if (!o(e[n], t[n])) return !1;
          a[n] = !0
        }
        for (n in e)
          if (!a[n] && !o(e[n], t[n])) return !1;
        return !0
      }
      return n.extend({
        Mixins: [t],
        init: function(t) {
          var n, r;
          t = t || {};
          for (n in t) r = t[n], r instanceof e && (t[n] = r.create(this, n));
          this.data = t
        },
        set: function(t, n) {
          var r, i, a = this.data[t];
          if (n instanceof e && (n = n.create(this, t)), "object" == typeof t) {
            for (r in t) this.set(r, t[r]);
            return this
          }
          return o(a, n) || (this.data[t] = n, i = {
            target: this,
            name: t,
            value: n,
            oldValue: a
          }, this.fire("change:" + t, i), this.fire("change", i)), this
        },
        get: function(e) {
          return this.data[e]
        },
        has: function(e) {
          return e in this.data
        },
        bind: function(t) {
          return e.create(this, t)
        },
        destroy: function() {
          this.fire("destroy")
        }
      })
    }), r(se, [ne], function(e) {
      function t(e) {
        for (var t = [], n = e.length, r; n--;) r = e[n], r.__checked || (t.push(r), r.__checked = 1);
        for (n = t.length; n--;) delete t[n].__checked;
        return t
      }
      var n = /^([\w\\*]+)?(?:#([\w\\]+))?(?:\.([\w\\\.]+))?(?:\[\@?([\w\\]+)([\^\$\*!~]?=)([\w\\]+)\])?(?:\:(.+))?/i,
        r = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        i = /^\s*|\s*$/g,
        o, a = e.extend({
          init: function(e) {
            function t(e) {
              return e ? (e = e.toLowerCase(), function(t) {
                return "*" === e || t.type === e
              }) : void 0
            }

            function o(e) {
              return e ? function(t) {
                return t._name === e
              } : void 0
            }

            function a(e) {
              return e ? (e = e.split("."), function(t) {
                for (var n = e.length; n--;)
                  if (!t.classes.contains(e[n])) return !1;
                return !0
              }) : void 0
            }

            function s(e, t, n) {
              return e ? function(r) {
                var i = r[e] ? r[e]() : "";
                return t ? "=" === t ? i === n : "*=" === t ? i.indexOf(n) >= 0 : "~=" === t ? (" " + i + " ").indexOf(" " + n + " ") >= 0 : "!=" === t ? i != n : "^=" === t ? 0 === i.indexOf(n) : "$=" === t ? i.substr(i.length - n.length) === n : !1 : !!n
              } : void 0
            }

            function l(e) {
              var t;
              return e ? (e = /(?:not\((.+)\))|(.+)/i.exec(e), e[1] ? (t = u(e[1], []), function(e) {
                return !d(e, t)
              }) : (e = e[2], function(t, n, r) {
                return "first" === e ? 0 === n : "last" === e ? n === r - 1 : "even" === e ? n % 2 === 0 : "odd" === e ? n % 2 === 1 : t[e] ? t[e]() : !1
              })) : void 0
            }

            function c(e, r, c) {
              function u(e) {
                e && r.push(e)
              }
              var d;
              return d = n.exec(e.replace(i, "")), u(t(d[1])), u(o(d[2])), u(a(d[3])), u(s(d[4], d[5], d[6])), u(l(d[7])), r.pseudo = !!d[7], r.direct = c, r
            }

            function u(e, t) {
              var n = [],
                i, o, a;
              do
                if (r.exec(""), o = r.exec(e), o && (e = o[3], n.push(o[1]), o[2])) {
                  i = o[3];
                  break
                }
              while (o);
              for (i && u(i, t), e = [], a = 0; a < n.length; a++) ">" != n[a] && e.push(c(n[a], [], ">" === n[a - 1]));
              return t.push(e), t
            }
            var d = this.match;
            this._selectors = u(e, [])
          },
          match: function(e, t) {
            var n, r, i, o, a, s, l, c, u, d, f, h, p;
            for (t = t || this._selectors, n = 0, r = t.length; r > n; n++) {
              for (a = t[n], o = a.length, p = e, h = 0, i = o - 1; i >= 0; i--)
                for (c = a[i]; p;) {
                  if (c.pseudo)
                    for (f = p.parent().items(), u = d = f.length; u-- && f[u] !== p;);
                  for (s = 0, l = c.length; l > s; s++)
                    if (!c[s](p, u, d)) {
                      s = l + 1;
                      break
                    }
                  if (s === l) {
                    h++;
                    break
                  }
                  if (i === o - 1) break;
                  p = p.parent()
                }
              if (h === o) return !0
            }
            return !1
          },
          find: function(e) {
            function n(e, t, i) {
              var o, a, s, l, c, u = t[i];
              for (o = 0, a = e.length; a > o; o++) {
                for (c = e[o], s = 0, l = u.length; l > s; s++)
                  if (!u[s](c, o, a)) {
                    s = l + 1;
                    break
                  }
                if (s === l) i == t.length - 1 ? r.push(c) : c.items && n(c.items(), t, i + 1);
                else if (u.direct) return;
                c.items && n(c.items(), t, i)
              }
            }
            var r = [],
              i, s, l = this._selectors;
            if (e.items) {
              for (i = 0, s = l.length; s > i; i++) n(e.items(), l[i], 0);
              s > 1 && (r = t(r))
            }
            return o || (o = a.Collection), new o(r)
          }
        });
      return a
    }), r(le, [m, se, ne], function(e, t, n) {
      var r, i, o = Array.prototype.push,
        a = Array.prototype.slice;
      return i = {
        length: 0,
        init: function(e) {
          e && this.add(e)
        },
        add: function(t) {
          var n = this;
          return e.isArray(t) ? o.apply(n, t) : t instanceof r ? n.add(t.toArray()) : o.call(n, t), n
        },
        set: function(e) {
          var t = this,
            n = t.length,
            r;
          for (t.length = 0, t.add(e), r = t.length; n > r; r++) delete t[r];
          return t
        },
        filter: function(e) {
          var n = this,
            i, o, a = [],
            s, l;
          for ("string" == typeof e ? (e = new t(e), l = function(t) {
              return e.match(t)
            }) : l = e, i = 0, o = n.length; o > i; i++) s = n[i], l(s) && a.push(s);
          return new r(a)
        },
        slice: function() {
          return new r(a.apply(this, arguments))
        },
        eq: function(e) {
          return -1 === e ? this.slice(e) : this.slice(e, +e + 1)
        },
        each: function(t) {
          return e.each(this, t), this
        },
        toArray: function() {
          return e.toArray(this)
        },
        indexOf: function(e) {
          for (var t = this, n = t.length; n-- && t[n] !== e;);
          return n
        },
        reverse: function() {
          return new r(e.toArray(this).reverse())
        },
        hasClass: function(e) {
          return this[0] ? this[0].classes.contains(e) : !1
        },
        prop: function(e, t) {
          var n = this,
            r, i;
          return t !== r ? (n.each(function(n) {
            n[e] && n[e](t)
          }), n) : (i = n[0], i && i[e] ? i[e]() : void 0)
        },
        exec: function(t) {
          var n = this,
            r = e.toArray(arguments).slice(1);
          return n.each(function(e) {
            e[t] && e[t].apply(e, r)
          }), n
        },
        remove: function() {
          for (var e = this.length; e--;) this[e].remove();
          return this
        },
        addClass: function(e) {
          return this.each(function(t) {
            t.classes.add(e)
          })
        },
        removeClass: function(e) {
          return this.each(function(t) {
            t.classes.remove(e)
          })
        }
      }, e.each("fire on off show hide append prepend before after reflow".split(" "), function(t) {
        i[t] = function() {
          var n = e.toArray(arguments);
          return this.each(function(e) {
            t in e && e[t].apply(e, n)
          }), this
        }
      }), e.each("text name disabled active selected checked visible parent value data".split(" "), function(e) {
        i[e] = function(t) {
          return this.prop(e, t)
        }
      }), r = n.extend(i), t.Collection = r, r
    }), r(ce, [m, w], function(e, t) {
      var n = 0;
      return {
        id: function() {
          return "mceu_" + n++
        },
        createFragment: function(e) {
          return t.DOM.createFragment(e)
        },
        getWindowSize: function() {
          return t.DOM.getViewPort()
        },
        getSize: function(e) {
          var t, n;
          if (e.getBoundingClientRect) {
            var r = e.getBoundingClientRect();
            t = Math.max(r.width || r.right - r.left, e.offsetWidth), n = Math.max(r.height || r.bottom - r.bottom, e.offsetHeight)
          } else t = e.offsetWidth, n = e.offsetHeight;
          return {
            width: t,
            height: n
          }
        },
        getPos: function(e, n) {
          return t.DOM.getPos(e, n)
        },
        getViewPort: function(e) {
          return t.DOM.getViewPort(e)
        },
        get: function(e) {
          return document.getElementById(e)
        },
        addClass: function(e, n) {
          return t.DOM.addClass(e, n)
        },
        removeClass: function(e, n) {
          return t.DOM.removeClass(e, n)
        },
        hasClass: function(e, n) {
          return t.DOM.hasClass(e, n)
        },
        toggleClass: function(e, n, r) {
          return t.DOM.toggleClass(e, n, r)
        },
        css: function(e, n, r) {
          return t.DOM.setStyle(e, n, r)
        },
        getRuntimeStyle: function(e, n) {
          return t.DOM.getStyle(e, n, !0)
        },
        on: function(e, n, r, i) {
          return t.DOM.bind(e, n, r, i)
        },
        off: function(e, n, r) {
          return t.DOM.unbind(e, n, r)
        },
        fire: function(e, n, r) {
          return t.DOM.fire(e, n, r)
        },
        innerHtml: function(e, n) {
          t.DOM.setHTML(e, n)
        }
      }
    }), r(ue, [], function() {
      return {
        parseBox: function(e) {
          var t, n = 10;
          if (e) return "number" == typeof e ? (e = e || 0, {
            top: e,
            left: e,
            bottom: e,
            right: e
          }) : (e = e.split(" "), t = e.length, 1 === t ? e[1] = e[2] = e[3] = e[0] : 2 === t ? (e[2] = e[0], e[3] = e[1]) : 3 === t && (e[3] = e[1]), {
            top: parseInt(e[0], n) || 0,
            right: parseInt(e[1], n) || 0,
            bottom: parseInt(e[2], n) || 0,
            left: parseInt(e[3], n) || 0
          })
        },
        measureBox: function(e, t) {
          function n(t) {
            var n = document.defaultView;
            return n ? (t = t.replace(/[A-Z]/g, function(e) {
              return "-" + e
            }), n.getComputedStyle(e, null).getPropertyValue(t)) : e.currentStyle[t]
          }

          function r(e) {
            var t = parseFloat(n(e), 10);
            return isNaN(t) ? 0 : t
          }
          return {
            top: r(t + "TopWidth"),
            right: r(t + "RightWidth"),
            bottom: r(t + "BottomWidth"),
            left: r(t + "LeftWidth")
          }
        }
      }
    }), r(de, [m], function(e) {
      function t() {}

      function n(e) {
        this.cls = [], this.cls._map = {}, this.onchange = e || t, this.prefix = ""
      }
      return e.extend(n.prototype, {
        add: function(e) {
          return e && !this.contains(e) && (this.cls._map[e] = !0, this.cls.push(e), this._change()), this
        },
        remove: function(e) {
          if (this.contains(e)) {
            for (var t = 0; t < this.cls.length && this.cls[t] !== e; t++);
            this.cls.splice(t, 1), delete this.cls._map[e], this._change()
          }
          return this
        },
        toggle: function(e, t) {
          var n = this.contains(e);
          return n !== t && (n ? this.remove(e) : this.add(e), this._change()), this
        },
        contains: function(e) {
          return !!this.cls._map[e]
        },
        _change: function() {
          delete this.clsValue, this.onchange.call(this)
        }
      }), n.prototype.toString = function() {
        var e;
        if (this.clsValue) return this.clsValue;
        e = "";
        for (var t = 0; t < this.cls.length; t++) t > 0 && (e += " "), e += this.prefix + this.cls[t];
        return e
      }, n
    }), r(fe, [u], function(e) {
      var t = {},
        n;
      return {
        add: function(r) {
          var i = r.parent();
          if (i) {
            if (!i._layout || i._layout.isNative()) return;
            t[i._id] || (t[i._id] = i), n || (n = !0, e.requestAnimationFrame(function() {
              var e, r;
              n = !1;
              for (e in t) r = t[e], r.state.get("rendered") && r.reflow();
              t = {}
            }, document.body))
          }
        },
        remove: function(e) {
          t[e._id] && delete t[e._id]
        }
      }
    }), r(he, [ne, m, re, ae, le, ce, g, ue, de, fe], function(e, t, n, r, i, o, a, s, l, c) {
      function u(e) {
        return e._eventDispatcher || (e._eventDispatcher = new n({
          scope: e,
          toggleEvent: function(t, r) {
            r && n.isNative(t) && (e._nativeEvents || (e._nativeEvents = {}), e._nativeEvents[t] = !0, e.state.get("rendered") && d(e))
          }
        })), e._eventDispatcher
      }

      function d(e) {
        function t(t) {
          var n = e.getParentCtrl(t.target);
          n && n.fire(t.type, t)
        }

        function n() {
          var e = c._lastHoverCtrl;
          e && (e.fire("mouseleave", {
            target: e.getEl()
          }), e.parents().each(function(e) {
            e.fire("mouseleave", {
              target: e.getEl()
            })
          }), c._lastHoverCtrl = null)
        }

        function r(t) {
          var n = e.getParentCtrl(t.target),
            r = c._lastHoverCtrl,
            i = 0,
            o, a, s;
          if (n !== r) {
            if (c._lastHoverCtrl = n, a = n.parents().toArray().reverse(), a.push(n), r) {
              for (s = r.parents().toArray().reverse(), s.push(r), i = 0; i < s.length && a[i] === s[i]; i++);
              for (o = s.length - 1; o >= i; o--) r = s[o], r.fire("mouseleave", {
                target: r.getEl()
              })
            }
            for (o = i; o < a.length; o++) n = a[o], n.fire("mouseenter", {
              target: n.getEl()
            })
          }
        }

        function i(t) {
          t.preventDefault(), "mousewheel" == t.type ? (t.deltaY = -1 / 40 * t.wheelDelta, t.wheelDeltaX && (t.deltaX = -1 / 40 * t.wheelDeltaX)) : (t.deltaX = 0, t.deltaY = t.detail), t = e.fire("wheel", t)
        }
        var o, s, l, c, u, d;
        if (u = e._nativeEvents) {
          for (l = e.parents().toArray(), l.unshift(e), o = 0, s = l.length; !c && s > o; o++) c = l[o]._eventsRoot;
          for (c || (c = l[l.length - 1] || e), e._eventsRoot = c, s = o, o = 0; s > o; o++) l[o]._eventsRoot = c;
          var p = c._delegates;
          p || (p = c._delegates = {});
          for (d in u) {
            if (!u) return !1;
            "wheel" !== d || h ? ("mouseenter" === d || "mouseleave" === d ? c._hasMouseEnter || (a(c.getEl()).on("mouseleave", n).on("mouseover", r), c._hasMouseEnter = 1) : p[d] || (a(c.getEl()).on(d, t), p[d] = !0), u[d] = !1) : f ? a(e.getEl()).on("mousewheel", i) : a(e.getEl()).on("DOMMouseScroll", i)
          }
        }
      }
      var f = "onmousewheel" in document,
        h = !1,
        p = "mce-",
        m, g = 0,
        v = {
          Statics: {
            classPrefix: p
          },
          isRtl: function() {
            return m.rtl
          },
          classPrefix: p,
          init: function(e) {
            function n(e) {
              var t;
              for (e = e.split(" "), t = 0; t < e.length; t++) i.classes.add(e[t])
            }
            var i = this,
              o, c;
            i.settings = e = t.extend({}, i.Defaults, e), i._id = e.id || "mceu_" + g++, i._aria = {
              role: e.role
            }, i._elmCache = {}, i.$ = a, i.state = new r({
              visible: !0,
              active: !1,
              disabled: !1,
              value: ""
            }), i.data = new r(e.data), i.classes = new l(function() {
              i.state.get("rendered") && (i.getEl().className = this.toString())
            }), i.classes.prefix = i.classPrefix, o = e.classes, o && (i.Defaults && (c = i.Defaults.classes, c && o != c && n(c)), n(o)), t.each("title text name visible disabled active value".split(" "), function(t) {
              t in e && i[t](e[t])
            }), i.on("click", function() {
              return i.disabled() ? !1 : void 0
            }), i.settings = e, i.borderBox = s.parseBox(e.border), i.paddingBox = s.parseBox(e.padding), i.marginBox = s.parseBox(e.margin), e.hidden && i.hide()
          },
          Properties: "parent,name",
          getContainerElm: function() {
            return document.body
          },
          getParentCtrl: function(e) {
            for (var t, n = this.getRoot().controlIdLookup; e && n && !(t = n[e.id]);) e = e.parentNode;
            return t
          },
          initLayoutRect: function() {
            var e = this,
              t = e.settings,
              n, r, i = e.getEl(),
              a, l, c, u, d, f, h, p;
            n = e.borderBox = e.borderBox || s.measureBox(i, "border"), e.paddingBox = e.paddingBox || s.measureBox(i, "padding"), e.marginBox = e.marginBox || s.measureBox(i, "margin"), p = o.getSize(i), f = t.minWidth, h = t.minHeight, c = f || p.width, u = h || p.height, a = t.width, l = t.height, d = t.autoResize, d = "undefined" != typeof d ? d : !a && !l, a = a || c, l = l || u;
            var m = n.left + n.right,
              g = n.top + n.bottom,
              v = t.maxWidth || 65535,
              y = t.maxHeight || 65535;
            return e._layoutRect = r = {
              x: t.x || 0,
              y: t.y || 0,
              w: a,
              h: l,
              deltaW: m,
              deltaH: g,
              contentW: a - m,
              contentH: l - g,
              innerW: a - m,
              innerH: l - g,
              startMinWidth: f || 0,
              startMinHeight: h || 0,
              minW: Math.min(c, v),
              minH: Math.min(u, y),
              maxW: v,
              maxH: y,
              autoResize: d,
              scrollW: 0
            }, e._lastLayoutRect = {}, r
          },
          layoutRect: function(e) {
            var t = this,
              n = t._layoutRect,
              r, i, o, a, s, l;
            return n || (n = t.initLayoutRect()), e ? (o = n.deltaW, a = n.deltaH, e.x !== s && (n.x = e.x), e.y !== s && (n.y = e.y), e.minW !== s && (n.minW = e.minW), e.minH !== s && (n.minH = e.minH), i = e.w, i !== s && (i = i < n.minW ? n.minW : i, i = i > n.maxW ? n.maxW : i, n.w = i, n.innerW = i - o), i = e.h, i !== s && (i = i < n.minH ? n.minH : i, i = i > n.maxH ? n.maxH : i, n.h = i, n.innerH = i - a), i = e.innerW, i !== s && (i = i < n.minW - o ? n.minW - o : i, i = i > n.maxW - o ? n.maxW - o : i, n.innerW = i, n.w = i + o), i = e.innerH, i !== s && (i = i < n.minH - a ? n.minH - a : i, i = i > n.maxH - a ? n.maxH - a : i, n.innerH = i, n.h = i + a), e.contentW !== s && (n.contentW = e.contentW), e.contentH !== s && (n.contentH = e.contentH), r = t._lastLayoutRect, (r.x !== n.x || r.y !== n.y || r.w !== n.w || r.h !== n.h) && (l = m.repaintControls, l && l.map && !l.map[t._id] && (l.push(t), l.map[t._id] = !0), r.x = n.x, r.y = n.y, r.w = n.w, r.h = n.h), t) : n
          },
          repaint: function() {
            var e = this,
              t, n, r, i, o, a, s, l, c, u;
            c = document.createRange ? function(e) {
              return e
            } : Math.round, t = e.getEl().style, i = e._layoutRect, l = e._lastRepaintRect || {}, o = e.borderBox, a = o.left + o.right, s = o.top + o.bottom, i.x !== l.x && (t.left = c(i.x) + "px", l.x = i.x), i.y !== l.y && (t.top = c(i.y) + "px", l.y = i.y), i.w !== l.w && (u = c(i.w - a), t.width = (u >= 0 ? u : 0) + "px", l.w = i.w), i.h !== l.h && (u = c(i.h - s), t.height = (u >= 0 ? u : 0) + "px", l.h = i.h), e._hasBody && i.innerW !== l.innerW && (u = c(i.innerW), r = e.getEl("body"), r && (n = r.style, n.width = (u >= 0 ? u : 0) + "px"), l.innerW = i.innerW), e._hasBody && i.innerH !== l.innerH && (u = c(i.innerH), r = r || e.getEl("body"), r && (n = n || r.style, n.height = (u >= 0 ? u : 0) + "px"), l.innerH = i.innerH), e._lastRepaintRect = l, e.fire("repaint", {}, !1)
          },
          on: function(e, t) {
            function n(e) {
              var t, n;
              return "string" != typeof e ? e : function(i) {
                return t || r.parentsAndSelf().each(function(r) {
                  var i = r.settings.callbacks;
                  return i && (t = i[e]) ? (n = r, !1) : void 0
                }), t ? t.call(n, i) : (i.action = e, void this.fire("execute", i))
              }
            }
            var r = this;
            return u(r).on(e, n(t)), r
          },
          off: function(e, t) {
            return u(this).off(e, t), this
          },
          fire: function(e, t, n) {
            var r = this;
            if (t = t || {}, t.control || (t.control = r), t = u(r).fire(e, t), n !== !1 && r.parent)
              for (var i = r.parent(); i && !t.isPropagationStopped();) i.fire(e, t, !1), i = i.parent();
            return t
          },
          hasEventListeners: function(e) {
            return u(this).has(e)
          },
          parents: function(e) {
            var t = this,
              n, r = new i;
            for (n = t.parent(); n; n = n.parent()) r.add(n);
            return e && (r = r.filter(e)), r
          },
          parentsAndSelf: function(e) {
            return new i(this).add(this.parents(e))
          },
          next: function() {
            var e = this.parent().items();
            return e[e.indexOf(this) + 1]
          },
          prev: function() {
            var e = this.parent().items();
            return e[e.indexOf(this) - 1]
          },
          innerHtml: function(e) {
            return this.$el.html(e), this
          },
          getEl: function(e) {
            var t = e ? this._id + "-" + e : this._id;
            return this._elmCache[t] || (this._elmCache[t] = a("#" + t)[0]), this._elmCache[t]
          },
          show: function() {
            return this.visible(!0)
          },
          hide: function() {
            return this.visible(!1)
          },
          focus: function() {
            try {
              this.getEl().focus()
            } catch (e) {}
            return this
          },
          blur: function() {
            return this.getEl().blur(), this
          },
          aria: function(e, t) {
            var n = this,
              r = n.getEl(n.ariaTarget);
            return "undefined" == typeof t ? n._aria[e] : (n._aria[e] = t, n.state.get("rendered") && r.setAttribute("role" == e ? e : "aria-" + e, t), n)
          },
          encode: function(e, t) {
            return t !== !1 && (e = this.translate(e)), (e || "").replace(/[&<>"]/g, function(e) {
              return "&#" + e.charCodeAt(0) + ";"
            })
          },
          translate: function(e) {
            return m.translate ? m.translate(e) : e
          },
          before: function(e) {
            var t = this,
              n = t.parent();
            return n && n.insert(e, n.items().indexOf(t), !0), t
          },
          after: function(e) {
            var t = this,
              n = t.parent();
            return n && n.insert(e, n.items().indexOf(t)), t
          },
          remove: function() {
            var e = this,
              t = e.getEl(),
              n = e.parent(),
              r, i;
            if (e.items) {
              var o = e.items().toArray();
              for (i = o.length; i--;) o[i].remove()
            }
            n && n.items && (r = [], n.items().each(function(t) {
              t !== e && r.push(t)
            }), n.items().set(r), n._lastRect = null), e._eventsRoot && e._eventsRoot == e && a(t).off();
            var s = e.getRoot().controlIdLookup;
            return s && delete s[e._id], t && t.parentNode && t.parentNode.removeChild(t), e.state.set("rendered", !1), e.state.destroy(), e.fire("remove"), e
          },
          renderBefore: function(e) {
            return a(e).before(this.renderHtml()), this.postRender(), this
          },
          renderTo: function(e) {
            return a(e || this.getContainerElm()).append(this.renderHtml()), this.postRender(), this
          },
          preRender: function() {},
          render: function() {},
          renderHtml: function() {
            return '<div id="' + this._id + '" class="' + this.classes + '"></div>'
          },
          postRender: function() {
            var e = this,
              t = e.settings,
              n, r, i, o, s;
            e.$el = a(e.getEl()), e.state.set("rendered", !0);
            for (o in t) 0 === o.indexOf("on") && e.on(o.substr(2), t[o]);
            if (e._eventsRoot) {
              for (i = e.parent(); !s && i; i = i.parent()) s = i._eventsRoot;
              if (s)
                for (o in s._nativeEvents) e._nativeEvents[o] = !0
            }
            d(e), t.style && (n = e.getEl(), n && (n.setAttribute("style", t.style), n.style.cssText = t.style)), e.settings.border && (r = e.borderBox, e.$el.css({
              "border-top-width": r.top,
              "border-right-width": r.right,
              "border-bottom-width": r.bottom,
              "border-left-width": r.left
            }));
            var l = e.getRoot();
            l.controlIdLookup || (l.controlIdLookup = {}), l.controlIdLookup[e._id] = e;
            for (var u in e._aria) e.aria(u, e._aria[u]);
            e.state.get("visible") === !1 && (e.getEl().style.display = "none"), e.bindStates(), e.state.on("change:visible", function(t) {
              var n = t.value,
                r;
              e.state.get("rendered") && (e.getEl().style.display = n === !1 ? "none" : "", e.getEl().getBoundingClientRect()), r = e.parent(), r && (r._lastRect = null), e.fire(n ? "show" : "hide"), c.add(e)
            }), e.fire("postrender", {}, !1)
          },
          bindStates: function() {},
          scrollIntoView: function(e) {
            function t(e, t) {
              var n, r, i = e;
              for (n = r = 0; i && i != t && i.nodeType;) n += i.offsetLeft || 0, r += i.offsetTop || 0, i = i.offsetParent;
              return {
                x: n,
                y: r
              }
            }
            var n = this.getEl(),
              r = n.parentNode,
              i, o, a, s, l, c, u = t(n, r);
            return i = u.x, o = u.y, a = n.offsetWidth, s = n.offsetHeight, l = r.clientWidth, c = r.clientHeight, "end" == e ? (i -= l - a, o -= c - s) : "center" == e && (i -= l / 2 - a / 2, o -= c / 2 - s / 2), r.scrollLeft = i, r.scrollTop = o, this
          },
          getRoot: function() {
            for (var e = this, t, n = []; e;) {
              if (e.rootControl) {
                t = e.rootControl;
                break
              }
              n.push(e), t = e, e = e.parent()
            }
            t || (t = this);
            for (var r = n.length; r--;) n[r].rootControl = t;
            return t
          },
          reflow: function() {
            c.remove(this);
            var e = this.parent();
            return e._layout && !e._layout.isNative() && e.reflow(), this
          }
        };
      return t.each("text title visible disabled active value".split(" "), function(e) {
        v[e] = function(t) {
          return 0 === arguments.length ? this.state.get(e) : ("undefined" != typeof t && this.state.set(e, t), this)
        }
      }), m = e.extend(v)
    }), r(pe, [], function() {
      var e = {},
        t;
      return {
        add: function(t, n) {
          e[t.toLowerCase()] = n
        },
        has: function(t) {
          return !!e[t.toLowerCase()]
        },
        create: function(n, r) {
          var i, o, a;
          if (!t) {
            a = tinymce.ui;
            for (o in a) e[o.toLowerCase()] = a[o];
            t = !0
          }
          if ("string" == typeof n ? (r = r || {}, r.type = n) : (r = n, n = r.type), n = n.toLowerCase(), i = e[n], !i) throw new Error("Could not find control by type: " + n);
          return i = new i(r), i.type = n, i
        }
      }
    }), r(me, [], function() {
      return function(e) {
        function t(e) {
          return e && 1 === e.nodeType
        }

        function n(e) {
          return e = e || C, t(e) ? e.getAttribute("role") : null
        }

        function r(e) {
          for (var t, r = e || C; r = r.parentNode;)
            if (t = n(r)) return t
        }

        function i(e) {
          var n = C;
          return t(n) ? n.getAttribute("aria-" + e) : void 0
        }

        function o(e) {
          var t = e.tagName.toUpperCase();
          return "INPUT" == t || "TEXTAREA" == t
        }

        function a(e) {
          return o(e) && !e.hidden ? !0 : /^(button|menuitem|checkbox|tab|menuitemcheckbox|option|gridcell)$/.test(n(e)) ? !0 : !1
        }

        function s(e) {
          function t(e) {
            if (1 == e.nodeType && "none" != e.style.display) {
              a(e) && n.push(e);
              for (var r = 0; r < e.childNodes.length; r++) t(e.childNodes[r])
            }
          }
          var n = [];
          return t(e || b.getEl()), n
        }

        function l(e) {
          var t, n;
          e = e || x, n = e.parents().toArray(), n.unshift(e);
          for (var r = 0; r < n.length && (t = n[r], !t.settings.ariaRoot); r++);
          return t
        }

        function c(e) {
          var t = l(e),
            n = s(t.getEl());
          t.settings.ariaRemember && "lastAriaIndex" in t ? u(t.lastAriaIndex, n) : u(0, n)
        }

        function u(e, t) {
          return 0 > e ? e = t.length - 1 : e >= t.length && (e = 0), t[e] && t[e].focus(), e
        }

        function d(e, t) {
          var n = -1,
            r = l();
          t = t || s(r.getEl());
          for (var i = 0; i < t.length; i++) t[i] === C && (n = i);
          n += e, r.lastAriaIndex = u(n, t)
        }

        function f() {
          var e = r();
          "tablist" == e ? d(-1, s(C.parentNode)) : x.parent().submenu ? v() : d(-1)
        }

        function h() {
          var e = n(),
            t = r();
          "tablist" == t ? d(1, s(C.parentNode)) : "menuitem" == e && "menu" == t && i("haspopup") ? y() : d(1)
        }

        function p() {
          d(-1)
        }

        function m() {
          var e = n(),
            t = r();
          "menuitem" == e && "menubar" == t ? y() : "button" == e && i("haspopup") ? y({
            key: "down"
          }) : d(1)
        }

        function g(e) {
          var t = r();
          if ("tablist" == t) {
            var n = s(x.getEl("body"))[0];
            n && n.focus()
          } else d(e.shiftKey ? -1 : 1)
        }

        function v() {
          x.fire("cancel")
        }

        function y(e) {
          e = e || {}, x.fire("click", {
            target: C,
            aria: e
          })
        }
        var b = e.root,
          C, x;
        try {
          C = document.activeElement
        } catch (w) {
          C = document.body
        }
        return x = b.getParentCtrl(C), b.on("keydown", function(e) {
          function t(e, t) {
            o(C) || t(e) !== !1 && e.preventDefault()
          }
          if (!e.isDefaultPrevented()) switch (e.keyCode) {
            case 37:
              t(e, f);
              break;
            case 39:
              t(e, h);
              break;
            case 38:
              t(e, p);
              break;
            case 40:
              t(e, m);
              break;
            case 27:
              v();
              break;
            case 14:
            case 13:
            case 32:
              t(e, y);
              break;
            case 9:
              g(e) !== !1 && e.preventDefault()
          }
        }), b.on("focusin", function(e) {
          C = e.target, x = e.control
        }), {
          focusFirst: c
        }
      }
    }), r(ge, [he, le, se, pe, me, m, g, de, fe], function(e, t, n, r, i, o, a, s, l) {
      var c = {};
      return e.extend({
        init: function(e) {
          var n = this;
          n._super(e), e = n.settings, e.fixed && n.state.set("fixed", !0), n._items = new t, n.isRtl() && n.classes.add("rtl"), n.bodyClasses = new s(function() {
            n.state.get("rendered") && (n.getEl("body").className = this.toString())
          }), n.bodyClasses.prefix = n.classPrefix, n.classes.add("container"), n.bodyClasses.add("container-body"), e.containerCls && n.classes.add(e.containerCls), n._layout = r.create((e.layout || "") + "layout"), n.settings.items ? n.add(n.settings.items) : n.add(n.render()), n._hasBody = !0
        },
        items: function() {
          return this._items
        },
        find: function(e) {
          return e = c[e] = c[e] || new n(e), e.find(this)
        },
        add: function(e) {
          var t = this;
          return t.items().add(t.create(e)).parent(t), t
        },
        focus: function(e) {
          var t = this,
            n, r, i;
          return e && (r = t.keyboardNav || t.parents().eq(-1)[0].keyboardNav) ? void r.focusFirst(t) : (i = t.find("*"), t.statusbar && i.add(t.statusbar.items()), i.each(function(e) {
            return e.settings.autofocus ? (n = null, !1) : void(e.canFocus && (n = n || e))
          }), n && n.focus(), t)
        },
        replace: function(e, t) {
          for (var n, r = this.items(), i = r.length; i--;)
            if (r[i] === e) {
              r[i] = t;
              break
            }
          i >= 0 && (n = t.getEl(), n && n.parentNode.removeChild(n), n = e.getEl(), n && n.parentNode.removeChild(n)), t.parent(this)
        },
        create: function(t) {
          var n = this,
            i, a = [];
          return o.isArray(t) || (t = [t]), o.each(t, function(t) {
            t && (t instanceof e || ("string" == typeof t && (t = {
              type: t
            }), i = o.extend({}, n.settings.defaults, t), t.type = i.type = i.type || t.type || n.settings.defaultType || (i.defaults ? i.defaults.type : null), t = r.create(i)), a.push(t))
          }), a
        },
        renderNew: function() {
          var e = this;
          return e.items().each(function(t, n) {
            var r;
            t.parent(e), t.state.get("rendered") || (r = e.getEl("body"), r.hasChildNodes() && n <= r.childNodes.length - 1 ? a(r.childNodes[n]).before(t.renderHtml()) : a(r).append(t.renderHtml()), t.postRender(), l.add(t))
          }), e._layout.applyClasses(e.items().filter(":visible")), e._lastRect = null, e
        },
        append: function(e) {
          return this.add(e).renderNew()
        },
        prepend: function(e) {
          var t = this;
          return t.items().set(t.create(e).concat(t.items().toArray())), t.renderNew()
        },
        insert: function(e, t, n) {
          var r = this,
            i, o, a;
          return e = r.create(e), i = r.items(), !n && t < i.length - 1 && (t += 1), t >= 0 && t < i.length && (o = i.slice(0, t).toArray(), a = i.slice(t).toArray(), i.set(o.concat(e, a))), r.renderNew()
        },
        fromJSON: function(e) {
          var t = this;
          for (var n in e) t.find("#" + n).value(e[n]);
          return t
        },
        toJSON: function() {
          var e = this,
            t = {};
          return e.find("*").each(function(e) {
            var n = e.name(),
              r = e.value();
            n && "undefined" != typeof r && (t[n] = r)
          }), t
        },
        renderHtml: function() {
          var e = this,
            t = e._layout,
            n = this.settings.role;
          return e.preRender(), t.preRender(e), '<div id="' + e._id + '" class="' + e.classes + '"' + (n ? ' role="' + this.settings.role + '"' : "") + '><div id="' + e._id + '-body" class="' + e.bodyClasses + '">' + (e.settings.html || "") + t.renderHtml(e) + "</div></div>"
        },
        postRender: function() {
          var e = this,
            t;
          return e.items().exec("postRender"), e._super(), e._layout.postRender(e), e.state.set("rendered", !0), e.settings.style && e.$el.css(e.settings.style), e.settings.border && (t = e.borderBox, e.$el.css({
            "border-top-width": t.top,
            "border-right-width": t.right,
            "border-bottom-width": t.bottom,
            "border-left-width": t.left
          })), e.parent() || (e.keyboardNav = new i({
            root: e
          })), e
        },
        initLayoutRect: function() {
          var e = this,
            t = e._super();
          return e._layout.recalc(e), t
        },
        recalc: function() {
          var e = this,
            t = e._layoutRect,
            n = e._lastRect;
          return n && n.w == t.w && n.h == t.h ? void 0 : (e._layout.recalc(e), t = e.layoutRect(), e._lastRect = {
            x: t.x,
            y: t.y,
            w: t.w,
            h: t.h
          }, !0)
        },
        reflow: function() {
          var t;
          if (l.remove(this), this.visible()) {
            for (e.repaintControls = [], e.repaintControls.map = {}, this.recalc(), t = e.repaintControls.length; t--;) e.repaintControls[t].repaint();
            "flow" !== this.settings.layout && "stack" !== this.settings.layout && this.repaint(), e.repaintControls = []
          }
          return this
        }
      })
    }), r(ve, [g], function(e) {
      function t(e) {
        var t, n, r, i, o, a, s, l, c = Math.max;
        return t = e.documentElement, n = e.body, r = c(t.scrollWidth, n.scrollWidth), i = c(t.clientWidth, n.clientWidth), o = c(t.offsetWidth, n.offsetWidth), a = c(t.scrollHeight, n.scrollHeight), s = c(t.clientHeight, n.clientHeight), l = c(t.offsetHeight, n.offsetHeight), {
          width: o > r ? i : r,
          height: l > a ? s : a
        }
      }

      function n(e) {
        var t, n;
        if (e.changedTouches)
          for (t = "screenX screenY pageX pageY clientX clientY".split(" "), n = 0; n < t.length; n++) e[t[n]] = e.changedTouches[0][t[n]]
      }
      return function(r, i) {
        function o() {
          return s.getElementById(i.handle || r)
        }
        var a, s = i.document || document,
          l, c, u, d, f, h;
        i = i || {}, c = function(r) {
          var c = t(s),
            p, m;
          n(r), r.preventDefault(), l = r.button, p = o(), f = r.screenX, h = r.screenY, m = window.getComputedStyle ? window.getComputedStyle(p, null).getPropertyValue("cursor") : p.runtimeStyle.cursor, a = e("<div>").css({
            position: "absolute",
            top: 0,
            left: 0,
            width: c.width,
            height: c.height,
            zIndex: 2147483647,
            opacity: 1e-4,
            cursor: m
          }).appendTo(s.body), e(s).on("mousemove touchmove", d).on("mouseup touchend", u), i.start(r)
        }, d = function(e) {
          return n(e), e.button !== l ? u(e) : (e.deltaX = e.screenX - f, e.deltaY = e.screenY - h, e.preventDefault(), void i.drag(e))
        }, u = function(t) {
          n(t), e(s).off("mousemove touchmove", d).off("mouseup touchend", u), a.remove(), i.stop && i.stop(t)
        }, this.destroy = function() {
          e(o()).off()
        }, e(o()).on("mousedown touchstart", c);
      }
    }), r(ye, [g, ve], function(e, t) {
      return {
        init: function() {
          var e = this;
          e.on("repaint", e.renderScroll)
        },
        renderScroll: function() {
          function n() {
            function t(t, a, s, l, c, u) {
              var d, f, h, p, m, g, v, y, b;
              if (f = i.getEl("scroll" + t)) {
                if (y = a.toLowerCase(), b = s.toLowerCase(), e(i.getEl("absend")).css(y, i.layoutRect()[l] - 1), !c) return void e(f).css("display", "none");
                e(f).css("display", "block"), d = i.getEl("body"), h = i.getEl("scroll" + t + "t"), p = d["client" + s] - 2 * o, p -= n && r ? f["client" + u] : 0, m = d["scroll" + s], g = p / m, v = {}, v[y] = d["offset" + a] + o, v[b] = p, e(f).css(v), v = {}, v[y] = d["scroll" + a] * g, v[b] = p * g, e(h).css(v)
              }
            }
            var n, r, a;
            a = i.getEl("body"), n = a.scrollWidth > a.clientWidth, r = a.scrollHeight > a.clientHeight, t("h", "Left", "Width", "contentW", n, "Height"), t("v", "Top", "Height", "contentH", r, "Width")
          }

          function r() {
            function n(n, r, a, s, l) {
              var c, u = i._id + "-scroll" + n,
                d = i.classPrefix;
              e(i.getEl()).append('<div id="' + u + '" class="' + d + "scrollbar " + d + "scrollbar-" + n + '"><div id="' + u + 't" class="' + d + 'scrollbar-thumb"></div></div>'), i.draghelper = new t(u + "t", {
                start: function() {
                  c = i.getEl("body")["scroll" + r], e("#" + u).addClass(d + "active")
                },
                drag: function(e) {
                  var t, u, d, f, h = i.layoutRect();
                  u = h.contentW > h.innerW, d = h.contentH > h.innerH, f = i.getEl("body")["client" + a] - 2 * o, f -= u && d ? i.getEl("scroll" + n)["client" + l] : 0, t = f / i.getEl("body")["scroll" + a], i.getEl("body")["scroll" + r] = c + e["delta" + s] / t
                },
                stop: function() {
                  e("#" + u).removeClass(d + "active")
                }
              })
            }
            i.classes.add("scroll"), n("v", "Top", "Height", "Y", "Width"), n("h", "Left", "Width", "X", "Height")
          }
          var i = this,
            o = 2;
          i.settings.autoScroll && (i._hasScroll || (i._hasScroll = !0, r(), i.on("wheel", function(e) {
            var t = i.getEl("body");
            t.scrollLeft += 10 * (e.deltaX || 0), t.scrollTop += 10 * e.deltaY, n()
          }), e(i.getEl("body")).on("scroll", n)), n())
        }
      }
    }), r(be, [ge, ye], function(e, t) {
      return e.extend({
        Defaults: {
          layout: "fit",
          containerCls: "panel"
        },
        Mixins: [t],
        renderHtml: function() {
          var e = this,
            t = e._layout,
            n = e.settings.html;
          return e.preRender(), t.preRender(e), "undefined" == typeof n ? n = '<div id="' + e._id + '-body" class="' + e.bodyClasses + '">' + t.renderHtml(e) + "</div>" : ("function" == typeof n && (n = n.call(e)), e._hasBody = !1), '<div id="' + e._id + '" class="' + e.classes + '" hidefocus="1" tabindex="-1" role="group">' + (e._preBodyHtml || "") + n + "</div>"
        }
      })
    }), r(Ce, [ce], function(e) {
      function t(t, n, r) {
        var i, o, a, s, l, c, u, d, f, h;
        return f = e.getViewPort(), o = e.getPos(n), a = o.x, s = o.y, t.state.get("fixed") && "static" == e.getRuntimeStyle(document.body, "position") && (a -= f.x, s -= f.y), i = t.getEl(), h = e.getSize(i), l = h.width, c = h.height, h = e.getSize(n), u = h.width, d = h.height, r = (r || "").split(""), "b" === r[0] && (s += d), "r" === r[1] && (a += u), "c" === r[0] && (s += Math.round(d / 2)), "c" === r[1] && (a += Math.round(u / 2)), "b" === r[3] && (s -= c), "r" === r[4] && (a -= l), "c" === r[3] && (s -= Math.round(c / 2)), "c" === r[4] && (a -= Math.round(l / 2)), {
          x: a,
          y: s,
          w: l,
          h: c
        }
      }
      return {
        testMoveRel: function(n, r) {
          for (var i = e.getViewPort(), o = 0; o < r.length; o++) {
            var a = t(this, n, r[o]);
            if (this.state.get("fixed")) {
              if (a.x > 0 && a.x + a.w < i.w && a.y > 0 && a.y + a.h < i.h) return r[o]
            } else if (a.x > i.x && a.x + a.w < i.w + i.x && a.y > i.y && a.y + a.h < i.h + i.y) return r[o]
          }
          return r[0]
        },
        moveRel: function(e, n) {
          "string" != typeof n && (n = this.testMoveRel(e, n));
          var r = t(this, e, n);
          return this.moveTo(r.x, r.y)
        },
        moveBy: function(e, t) {
          var n = this,
            r = n.layoutRect();
          return n.moveTo(r.x + e, r.y + t), n
        },
        moveTo: function(t, n) {
          function r(e, t, n) {
            return 0 > e ? 0 : e + n > t ? (e = t - n, 0 > e ? 0 : e) : e
          }
          var i = this;
          if (i.settings.constrainToViewport) {
            var o = e.getViewPort(window),
              a = i.layoutRect();
            t = r(t, o.w + o.x, a.w), n = r(n, o.h + o.y, a.h)
          }
          return i.state.get("rendered") ? i.layoutRect({
            x: t,
            y: n
          }).repaint() : (i.settings.x = t, i.settings.y = n), i.fire("move", {
            x: t,
            y: n
          }), i
        }
      }
    }), r(xe, [ce], function(e) {
      return {
        resizeToContent: function() {
          this._layoutRect.autoResize = !0, this._lastRect = null, this.reflow()
        },
        resizeTo: function(t, n) {
          if (1 >= t || 1 >= n) {
            var r = e.getWindowSize();
            t = 1 >= t ? t * r.w : t, n = 1 >= n ? n * r.h : n
          }
          return this._layoutRect.autoResize = !1, this.layoutRect({
            minW: t,
            minH: n,
            w: t,
            h: n
          }).reflow()
        },
        resizeBy: function(e, t) {
          var n = this,
            r = n.layoutRect();
          return n.resizeTo(r.w + e, r.h + t)
        }
      }
    }), r(we, [be, Ce, xe, ce, g, u], function(e, t, n, r, i, o) {
      function a(e, t) {
        for (; e;) {
          if (e == t) return !0;
          e = e.parent()
        }
      }

      function s(e) {
        for (var t = v.length; t--;) {
          var n = v[t],
            r = n.getParentCtrl(e.target);
          if (n.settings.autohide) {
            if (r && (a(r, n) || n.parent() === r)) continue;
            e = n.fire("autohide", {
              target: e.target
            }), e.isDefaultPrevented() || n.hide()
          }
        }
      }

      function l() {
        p || (p = function(e) {
          2 != e.button && s(e)
        }, i(document).on("click touchstart", p))
      }

      function c() {
        m || (m = function() {
          var e;
          for (e = v.length; e--;) d(v[e])
        }, i(window).on("scroll", m))
      }

      function u() {
        if (!g) {
          var e = document.documentElement,
            t = e.clientWidth,
            n = e.clientHeight;
          g = function() {
            document.all && t == e.clientWidth && n == e.clientHeight || (t = e.clientWidth, n = e.clientHeight, C.hideAll())
          }, i(window).on("resize", g)
        }
      }

      function d(e) {
        function t(t, n) {
          for (var r, i = 0; i < v.length; i++)
            if (v[i] != e)
              for (r = v[i].parent(); r && (r = r.parent());) r == e && v[i].fixed(t).moveBy(0, n).repaint()
        }
        var n = r.getViewPort().y;
        e.settings.autofix && (e.state.get("fixed") ? e._autoFixY > n && (e.fixed(!1).layoutRect({
          y: e._autoFixY
        }).repaint(), t(!1, e._autoFixY - n)) : (e._autoFixY = e.layoutRect().y, e._autoFixY < n && (e.fixed(!0).layoutRect({
          y: 0
        }).repaint(), t(!0, n - e._autoFixY))))
      }

      function f(e, t) {
        var n, r = C.zIndex || 65535,
          o;
        if (e) y.push(t);
        else
          for (n = y.length; n--;) y[n] === t && y.splice(n, 1);
        if (y.length)
          for (n = 0; n < y.length; n++) y[n].modal && (r++, o = y[n]), y[n].getEl().style.zIndex = r, y[n].zIndex = r, r++;
        var a = document.getElementById(t.classPrefix + "modal-block");
        o ? i(a).css("z-index", o.zIndex - 1) : a && (a.parentNode.removeChild(a), b = !1), C.currentZIndex = r
      }

      function h(e) {
        var t;
        for (t = v.length; t--;) v[t] === e && v.splice(t, 1);
        for (t = y.length; t--;) y[t] === e && y.splice(t, 1)
      }
      var p, m, g, v = [],
        y = [],
        b, C = e.extend({
          Mixins: [t, n],
          init: function(e) {
            var t = this;
            t._super(e), t._eventsRoot = t, t.classes.add("floatpanel"), e.autohide && (l(), u(), v.push(t)), e.autofix && (c(), t.on("move", function() {
              d(this)
            })), t.on("postrender show", function(e) {
              if (e.control == t) {
                var n, r = t.classPrefix;
                t.modal && !b && (n = i("#" + r + "modal-block"), n[0] || (n = i('<div id="' + r + 'modal-block" class="' + r + "reset " + r + 'fade"></div>').appendTo(t.getContainerElm())), o.setTimeout(function() {
                  n.addClass(r + "in"), i(t.getEl()).addClass(r + "in")
                }), b = !0), f(!0, t)
              }
            }), t.on("show", function() {
              t.parents().each(function(e) {
                return e.state.get("fixed") ? (t.fixed(!0), !1) : void 0
              })
            }), e.popover && (t._preBodyHtml = '<div class="' + t.classPrefix + 'arrow"></div>', t.classes.add("popover").add("bottom").add(t.isRtl() ? "end" : "start"))
          },
          fixed: function(e) {
            var t = this;
            if (t.state.get("fixed") != e) {
              if (t.state.get("rendered")) {
                var n = r.getViewPort();
                e ? t.layoutRect().y -= n.y : t.layoutRect().y += n.y
              }
              t.classes.toggle("fixed", e), t.state.set("fixed", e)
            }
            return t
          },
          show: function() {
            var e = this,
              t, n = e._super();
            for (t = v.length; t-- && v[t] !== e;);
            return -1 === t && v.push(e), n
          },
          hide: function() {
            return h(this), f(!1, this), this._super()
          },
          hideAll: function() {
            C.hideAll()
          },
          close: function() {
            var e = this;
            return e.fire("close").isDefaultPrevented() || (e.remove(), f(!1, e)), e
          },
          remove: function() {
            h(this), this._super()
          },
          postRender: function() {
            var e = this;
            return e.settings.bodyRole && this.getEl("body").setAttribute("role", e.settings.bodyRole), e._super()
          }
        });
      return C.hideAll = function() {
        for (var e = v.length; e--;) {
          var t = v[e];
          t && t.settings.autohide && (t.hide(), v.splice(e, 1))
        }
      }, C
    }), r(Ee, [we, be, ce, g, ve, ue, h, u], function(e, t, n, r, i, o, a, s) {
      function l(e) {
        var t = "width=device-width,initial-scale=1.0,user-scalable=0,minimum-scale=1.0,maximum-scale=1.0",
          n = r("meta[name=viewport]")[0],
          i;
        a.overrideViewPort !== !1 && (n || (n = document.createElement("meta"), n.setAttribute("name", "viewport"), document.getElementsByTagName("head")[0].appendChild(n)), i = n.getAttribute("content"), i && "undefined" != typeof f && (f = i), n.setAttribute("content", e ? t : f))
      }

      function c(e) {
        for (var t = 0; t < d.length; t++)
          if (d[t]._fullscreen) return;
        r([document.documentElement, document.body]).removeClass(e + "fullscreen")
      }

      function u() {
        function e() {
          var e, t = n.getWindowSize(),
            r;
          for (e = 0; e < d.length; e++) r = d[e].layoutRect(), d[e].moveTo(d[e].settings.x || Math.max(0, t.w / 2 - r.w / 2), d[e].settings.y || Math.max(0, t.h / 2 - r.h / 2))
        }
        var t = {
          w: window.innerWidth,
          h: window.innerHeight
        };
        s.setInterval(function() {
          var e = window.innerWidth,
            n = window.innerHeight;
          (t.w != e || t.h != n) && (t = {
            w: e,
            h: n
          }, r(window).trigger("resize"))
        }, 100), r(window).on("resize", e)
      }
      var d = [],
        f = "",
        h = e.extend({
          modal: !0,
          Defaults: {
            border: 1,
            layout: "flex",
            containerCls: "panel",
            role: "dialog",
            callbacks: {
              submit: function() {
                this.fire("submit", {
                  data: this.toJSON()
                })
              },
              close: function() {
                this.close()
              }
            }
          },
          init: function(e) {
            var n = this;
            n._super(e), n.isRtl() && n.classes.add("rtl"), n.classes.add("window"), n.bodyClasses.add("window-body"), n.state.set("fixed", !0), e.buttons && (n.statusbar = new t({
              layout: "flex",
              border: "1 0 0 0",
              spacing: 3,
              padding: 10,
              align: "center",
              pack: n.isRtl() ? "start" : "end",
              defaults: {
                type: "button"
              },
              items: e.buttons
            }), n.statusbar.classes.add("foot"), n.statusbar.parent(n)), n.on("click", function(e) {
              -1 != e.target.className.indexOf(n.classPrefix + "close") && n.close()
            }), n.on("cancel", function() {
              n.close()
            }), n.aria("describedby", n.describedBy || n._id + "-none"), n.aria("label", e.title), n._fullscreen = !1
          },
          recalc: function() {
            var e = this,
              t = e.statusbar,
              r, i, o, a;
            e._fullscreen && (e.layoutRect(n.getWindowSize()), e.layoutRect().contentH = e.layoutRect().innerH), e._super(), r = e.layoutRect(), e.settings.title && !e._fullscreen && (i = r.headerW, i > r.w && (o = r.x - Math.max(0, i / 2), e.layoutRect({
              w: i,
              x: o
            }), a = !0)), t && (t.layoutRect({
              w: e.layoutRect().innerW
            }).recalc(), i = t.layoutRect().minW + r.deltaW, i > r.w && (o = r.x - Math.max(0, i - r.w), e.layoutRect({
              w: i,
              x: o
            }), a = !0)), a && e.recalc()
          },
          initLayoutRect: function() {
            var e = this,
              t = e._super(),
              r = 0,
              i;
            if (e.settings.title && !e._fullscreen) {
              i = e.getEl("head");
              var o = n.getSize(i);
              t.headerW = o.width, t.headerH = o.height, r += t.headerH
            }
            e.statusbar && (r += e.statusbar.layoutRect().h), t.deltaH += r, t.minH += r, t.h += r;
            var a = n.getWindowSize();
            return t.x = e.settings.x || Math.max(0, a.w / 2 - t.w / 2), t.y = e.settings.y || Math.max(0, a.h / 2 - t.h / 2), t
          },
          renderHtml: function() {
            var e = this,
              t = e._layout,
              n = e._id,
              r = e.classPrefix,
              i = e.settings,
              o = "",
              a = "",
              s = i.html;
            return e.preRender(), t.preRender(e), i.title && (o = '<div id="' + n + '-head" class="' + r + 'window-head"><div id="' + n + '-title" class="' + r + 'title">' + e.encode(i.title) + '</div><button type="button" class="' + r + 'close" aria-hidden="true">\xd7</button><div id="' + n + '-dragh" class="' + r + 'dragh"></div></div>'), i.url && (s = '<iframe src="' + i.url + '" tabindex="-1"></iframe>'), "undefined" == typeof s && (s = t.renderHtml(e)), e.statusbar && (a = e.statusbar.renderHtml()), '<div id="' + n + '" class="' + e.classes + '" hidefocus="1"><div class="' + e.classPrefix + 'reset" role="application">' + o + '<div id="' + n + '-body" class="' + e.bodyClasses + '">' + s + "</div>" + a + "</div></div>"
          },
          fullscreen: function(e) {
            var t = this,
              i = document.documentElement,
              a, l = t.classPrefix,
              c;
            if (e != t._fullscreen)
              if (r(window).on("resize", function() {
                  var e;
                  if (t._fullscreen)
                    if (a) t._timer || (t._timer = s.setTimeout(function() {
                      var e = n.getWindowSize();
                      t.moveTo(0, 0).resizeTo(e.w, e.h), t._timer = 0
                    }, 50));
                    else {
                      e = (new Date).getTime();
                      var r = n.getWindowSize();
                      t.moveTo(0, 0).resizeTo(r.w, r.h), (new Date).getTime() - e > 50 && (a = !0)
                    }
                }), c = t.layoutRect(), t._fullscreen = e, e) {
                t._initial = {
                  x: c.x,
                  y: c.y,
                  w: c.w,
                  h: c.h
                }, t.borderBox = o.parseBox("0"), t.getEl("head").style.display = "none", c.deltaH -= c.headerH + 2, r([i, document.body]).addClass(l + "fullscreen"), t.classes.add("fullscreen");
                var u = n.getWindowSize();
                t.moveTo(0, 0).resizeTo(u.w, u.h)
              } else t.borderBox = o.parseBox(t.settings.border), t.getEl("head").style.display = "", c.deltaH += c.headerH, r([i, document.body]).removeClass(l + "fullscreen"), t.classes.remove("fullscreen"), t.moveTo(t._initial.x, t._initial.y).resizeTo(t._initial.w, t._initial.h);
            return t.reflow()
          },
          postRender: function() {
            var e = this,
              t;
            setTimeout(function() {
              e.classes.add("in")
            }, 0), e._super(), e.statusbar && e.statusbar.postRender(), e.focus(), this.dragHelper = new i(e._id + "-dragh", {
              start: function() {
                t = {
                  x: e.layoutRect().x,
                  y: e.layoutRect().y
                }
              },
              drag: function(n) {
                e.moveTo(t.x + n.deltaX, t.y + n.deltaY)
              }
            }), e.on("submit", function(t) {
              t.isDefaultPrevented() || e.close()
            }), d.push(e), l(!0)
          },
          submit: function() {
            return this.fire("submit", {
              data: this.toJSON()
            })
          },
          remove: function() {
            var e = this,
              t;
            for (e.dragHelper.destroy(), e._super(), e.statusbar && this.statusbar.remove(), t = d.length; t--;) d[t] === e && d.splice(t, 1);
            l(d.length > 0), c(e.classPrefix)
          },
          getContentWindow: function() {
            var e = this.getEl().getElementsByTagName("iframe")[0];
            return e ? e.contentWindow : null
          }
        });
      return a.desktop || u(), h
    }), r(Ne, [Ee], function(e) {
      var t = e.extend({
        init: function(e) {
          e = {
            border: 1,
            padding: 20,
            layout: "flex",
            pack: "center",
            align: "center",
            containerCls: "panel",
            autoScroll: !0,
            buttons: {
              type: "button",
              text: "Ok",
              action: "ok"
            },
            items: {
              type: "label",
              multiline: !0,
              maxWidth: 500,
              maxHeight: 200
            }
          }, this._super(e)
        },
        Statics: {
          OK: 1,
          OK_CANCEL: 2,
          YES_NO: 3,
          YES_NO_CANCEL: 4,
          msgBox: function(n) {
            function r(e, t, n) {
              return {
                type: "button",
                text: e,
                subtype: n ? "primary" : "",
                onClick: function(e) {
                  e.control.parents()[1].close(), o(t)
                }
              }
            }
            var i, o = n.callback || function() {};
            switch (n.buttons) {
              case t.OK_CANCEL:
                i = [r("Ok", !0, !0), r("Cancel", !1)];
                break;
              case t.YES_NO:
              case t.YES_NO_CANCEL:
                i = [r("Yes", 1, !0), r("No", 0)], n.buttons == t.YES_NO_CANCEL && i.push(r("Cancel", -1));
                break;
              default:
                i = [r("Ok", !0, !0)]
            }
            return new e({
              padding: 20,
              x: n.x,
              y: n.y,
              minWidth: 300,
              minHeight: 100,
              layout: "flex",
              pack: "center",
              align: "center",
              buttons: i,
              title: n.title,
              role: "alertdialog",
              items: {
                type: "label",
                multiline: !0,
                maxWidth: 500,
                maxHeight: 200,
                text: n.text
              },
              onPostRender: function() {
                this.aria("describedby", this.items()[0]._id)
              },
              onClose: n.onClose,
              onCancel: function() {
                o(!1)
              }
            }).renderTo(document.body).reflow()
          },
          alert: function(e, n) {
            return "string" == typeof e && (e = {
              text: e
            }), e.callback = n, t.msgBox(e)
          },
          confirm: function(e, n) {
            return "string" == typeof e && (e = {
              text: e
            }), e.callback = n, e.buttons = t.OK_CANCEL, t.msgBox(e)
          }
        }
      });
      return t
    }), r(_e, [Ee, Ne], function(e, t) {
      return function(n) {
        function r() {
          return o.length ? o[o.length - 1] : void 0
        }
        var i = this,
          o = [];
        i.windows = o, n.on("remove", function() {
          for (var e = o.length; e--;) o[e].close()
        }), i.open = function(t, r) {
          var i;
          return n.editorManager.setActive(n), t.title = t.title || " ", t.url = t.url || t.file, t.url && (t.width = parseInt(t.width || 320, 10), t.height = parseInt(t.height || 240, 10)), t.body && (t.items = {
            defaults: t.defaults,
            type: t.bodyType || "form",
            items: t.body
          }), t.url || t.buttons || (t.buttons = [{
            text: "Ok",
            subtype: "primary",
            onclick: function() {
              i.find("form")[0].submit()
            }
          }, {
            text: "Cancel",
            onclick: function() {
              i.close()
            }
          }]), i = new e(t), o.push(i), i.on("close", function() {
            for (var e = o.length; e--;) o[e] === i && o.splice(e, 1);
            o.length || n.focus()
          }), t.data && i.on("postRender", function() {
            this.find("*").each(function(e) {
              var n = e.name();
              n in t.data && e.value(t.data[n])
            })
          }), i.features = t || {}, i.params = r || {}, 1 === o.length && n.nodeChanged(), i.renderTo().reflow()
        }, i.alert = function(e, r, i) {
          t.alert(e, function() {
            r ? r.call(i || this) : n.focus()
          })
        }, i.confirm = function(e, n, r) {
          t.confirm(e, function(e) {
            n.call(r || this, e)
          })
        }, i.close = function() {
          r() && r().close()
        }, i.getParams = function() {
          return r() ? r().params : null
        }, i.setParams = function(e) {
          r() && (r().params = e)
        }, i.getWindows = function() {
          return o
        }
      }
    }), r(Se, [he, Ce], function(e, t) {
      return e.extend({
        Mixins: [t],
        Defaults: {
          classes: "widget tooltip tooltip-n"
        },
        renderHtml: function() {
          var e = this,
            t = e.classPrefix;
          return '<div id="' + e._id + '" class="' + e.classes + '" role="presentation"><div class="' + t + 'tooltip-arrow"></div><div class="' + t + 'tooltip-inner">' + e.encode(e.state.get("text")) + "</div></div>"
        },
        bindStates: function() {
          var e = this;
          return e.state.on("change:text", function(t) {
            e.getEl().lastChild.innerHTML = e.encode(t.value)
          }), e._super()
        },
        repaint: function() {
          var e = this,
            t, n;
          t = e.getEl().style, n = e._layoutRect, t.left = n.x + "px", t.top = n.y + "px", t.zIndex = 131070
        }
      })
    }), r(ke, [he, Se], function(e, t) {
      var n, r = e.extend({
        init: function(e) {
          var t = this;
          t._super(e), e = t.settings, t.canFocus = !0, e.tooltip && r.tooltips !== !1 && (t.on("mouseenter", function(n) {
            var r = t.tooltip().moveTo(-65535);
            if (n.control == t) {
              var i = r.text(e.tooltip).show().testMoveRel(t.getEl(), ["bc-tc", "bc-tl", "bc-tr"]);
              r.classes.toggle("tooltip-n", "bc-tc" == i), r.classes.toggle("tooltip-nw", "bc-tl" == i), r.classes.toggle("tooltip-ne", "bc-tr" == i), r.moveRel(t.getEl(), i)
            } else r.hide()
          }), t.on("mouseleave mousedown click", function() {
            t.tooltip().hide()
          })), t.aria("label", e.ariaLabel || e.tooltip)
        },
        tooltip: function() {
          return n || (n = new t({
            type: "tooltip"
          }), n.renderTo()), n
        },
        postRender: function() {
          var e = this,
            t = e.settings;
          e._super(), e.parent() || !t.width && !t.height || (e.initLayoutRect(), e.repaint()), t.autofocus && e.focus()
        },
        bindStates: function() {
          function e(e) {
            n.aria("disabled", e), n.classes.toggle("disabled", e)
          }

          function t(e) {
            n.aria("pressed", e), n.classes.toggle("active", e)
          }
          var n = this;
          return n.state.on("change:disabled", function(t) {
            e(t.value)
          }), n.state.on("change:active", function(e) {
            t(e.value)
          }), n.state.get("disabled") && e(!0), n.state.get("active") && t(!0), n._super()
        },
        remove: function() {
          this._super(), n && (n.remove(), n = null)
        }
      });
      return r
    }), r(Te, [ke], function(e) {
      return e.extend({
        Defaults: {
          value: 0
        },
        init: function(e) {
          var t = this;
          t._super(e), t.classes.add("progress"), t.settings.filter || (t.settings.filter = function(e) {
            return Math.round(e)
          })
        },
        renderHtml: function() {
          var e = this,
            t = e._id,
            n = this.classPrefix;
          return '<div id="' + t + '" class="' + e.classes + '"><div class="' + n + 'bar-container"><div class="' + n + 'bar"></div></div><div class="' + n + 'text">0%</div></div>'
        },
        postRender: function() {
          var e = this;
          return e._super(), e.value(e.settings.value), e
        },
        bindStates: function() {
          function e(e) {
            e = t.settings.filter(e), t.getEl().lastChild.innerHTML = e + "%", t.getEl().firstChild.firstChild.style.width = e + "%"
          }
          var t = this;
          return t.state.on("change:value", function(t) {
            e(t.value)
          }), e(t.state.get("value")), t._super()
        }
      })
    }), r(Re, [he, Ce, Te], function(e, t, n) {
      return e.extend({
        Mixins: [t],
        Defaults: {
          classes: "widget notification"
        },
        init: function(e) {
          var t = this;
          t._super(e), e.text && t.text(e.text), e.icon && (t.icon = e.icon), e.color && (t.color = e.color), e.type && t.classes.add("notification-" + e.type), e.timeout && (e.timeout < 0 || e.timeout > 0) && !e.closeButton ? t.closeButton = !1 : (t.classes.add("has-close"), t.closeButton = !0), e.progressBar && (t.progressBar = new n), t.on("click", function(e) {
            -1 != e.target.className.indexOf(t.classPrefix + "close") && t.close()
          })
        },
        renderHtml: function() {
          var e = this,
            t = e.classPrefix,
            n = "",
            r = "",
            i = "",
            o = "";
          return e.icon && (n = '<i class="' + t + "ico " + t + "i-" + e.icon + '"></i>'), e.color && (o = ' style="background-color: ' + e.color + '"'), e.closeButton && (r = '<button type="button" class="' + t + 'close" aria-hidden="true">\xd7</button>'), e.progressBar && (i = e.progressBar.renderHtml()), '<div id="' + e._id + '" class="' + e.classes + '"' + o + ' role="presentation">' + n + '<div class="' + t + 'notification-inner">' + e.state.get("text") + "</div>" + i + r + "</div>"
        },
        bindStates: function() {
          var e = this;
          return e.state.on("change:text", function(t) {
            e.getEl().childNodes[1].innerHTML = t.value
          }), e.progressBar && e.progressBar.bindStates(), e._super()
        },
        close: function() {
          var e = this;
          return e.fire("close").isDefaultPrevented() || e.remove(), e
        },
        repaint: function() {
          var e = this,
            t, n;
          t = e.getEl().style, n = e._layoutRect, t.left = n.x + "px", t.top = n.y + "px", t.zIndex = 131070
        }
      })
    }), r(Ae, [Re, u], function(e, t) {
      return function(n) {
        function r() {
          return l.length ? l[l.length - 1] : void 0
        }

        function i() {
          t.requestAnimationFrame(function() {
            o(), a()
          })
        }

        function o() {
          for (var e = 0; e < l.length; e++) l[e].moveTo(0, 0)
        }

        function a() {
          if (l.length > 0) {
            var e = l.slice(0, 1)[0],
              t = n.inline ? n.getElement() : n.getContentAreaContainer();
            if (e.moveRel(t, "tc-tc"), l.length > 1)
              for (var r = 1; r < l.length; r++) l[r].moveRel(l[r - 1].getEl(), "bc-tc")
          }
        }
        var s = this,
          l = [];
        s.notifications = l, n.on("remove", function() {
          for (var e = l.length; e--;) l[e].close()
        }), n.on("ResizeEditor", a), n.on("ResizeWindow", i), s.open = function(t) {
          var r;
          return n.editorManager.setActive(n), r = new e(t), l.push(r), t.timeout > 0 && (r.timer = setTimeout(function() {
            r.close()
          }, t.timeout)), r.on("close", function() {
            var e = l.length;
            for (r.timer && n.getWin().clearTimeout(r.timer); e--;) l[e] === r && l.splice(e, 1);
            a()
          }), r.renderTo(), a(), r
        }, s.close = function() {
          r() && r().close()
        }, s.getNotifications = function() {
          return l
        }
      }
    }), r(Be, [w], function(e) {
      function t(t, n, r) {
        for (var i = []; n && n != t; n = n.parentNode) i.push(e.nodeIndex(n, r));
        return i
      }

      function n(e, t) {
        var n, r, i;
        for (r = e, n = t.length - 1; n >= 0; n--) {
          if (i = r.childNodes, t[n] > i.length - 1) return null;
          r = i[t[n]]
        }
        return r
      }
      return {
        create: t,
        resolve: n
      }
    }), r(De, [I, T, y, Be, A, C, h, m, u, k], function(e, t, n, r, i, o, a, s, l, c) {
      return function(u) {
        function d(e, t) {
          try {
            u.getDoc().execCommand(e, !1, t)
          } catch (n) {}
        }

        function f() {
          var e = u.getDoc().documentMode;
          return e ? e : 6
        }

        function h(e) {
          return e.isDefaultPrevented()
        }

        function p(e) {
          var t, n;
          e.dataTransfer && (u.selection.isCollapsed() && "IMG" == e.target.tagName && Q.select(e.target), t = u.selection.getContent(), t.length > 0 && (n = oe + escape(u.id) + "," + escape(t), e.dataTransfer.setData(ae, n)))
        }

        function m(e) {
          var t;
          return e.dataTransfer && (t = e.dataTransfer.getData(ae), t && t.indexOf(oe) >= 0) ? (t = t.substr(oe.length).split(","), {
            id: unescape(t[0]),
            html: unescape(t[1])
          }) : null
        }

        function g(e) {
          u.queryCommandSupported("mceInsertClipboardContent") ? u.execCommand("mceInsertClipboardContent", !1, {
            content: e
          }) : u.execCommand("mceInsertContent", !1, e)
        }

        function v() {
          function i(e) {
            var t = C.schema.getBlockElements(),
              n = u.getBody();
            if ("BR" != e.nodeName) return !1;
            for (e = e; e != n && !t[e.nodeName]; e = e.parentNode)
              if (e.nextSibling) return !1;
            return !0
          }

          function o(e, t) {
            var n;
            for (n = e.nextSibling; n && n != t; n = n.nextSibling)
              if ((3 != n.nodeType || 0 !== X.trim(n.data).length) && n !== t) return !1;
            return n === t
          }

          function a(e, t, r) {
            var o, a, s;
            for (s = C.schema.getNonEmptyElements(), o = new n(r || e, e); a = o[t ? "next" : "prev"]();) {
              if (s[a.nodeName] && !i(a)) return a;
              if (3 == a.nodeType && a.data.length > 0) return a
            }
          }

          function c(e) {
            var n, r, i, o, s;
            if (!e.collapsed && (n = C.getParent(t.getNode(e.startContainer, e.startOffset), C.isBlock), r = C.getParent(t.getNode(e.endContainer, e.endOffset), C.isBlock), s = u.schema.getTextBlockElements(), n != r && s[n.nodeName] && s[r.nodeName] && "false" !== C.getContentEditable(n) && "false" !== C.getContentEditable(r))) return e.deleteContents(), i = a(n, !1), o = a(r, !0), C.isEmpty(r) || X(n).append(r.childNodes), X(r).remove(), i ? 1 == i.nodeType ? "BR" == i.nodeName ? (e.setStartBefore(i), e.setEndBefore(i)) : (e.setStartAfter(i), e.setEndAfter(i)) : (e.setStart(i, i.data.length), e.setEnd(i, i.data.length)) : o && (1 == o.nodeType ? (e.setStartBefore(o), e.setEndBefore(o)) : (e.setStart(o, 0), e.setEnd(o, 0))), x.setRng(e), !0
          }

          function d(e, n) {
            var r, i, s, l, c, d;
            if (!e.collapsed) return e;
            if (c = e.startContainer, d = e.startOffset, 3 == c.nodeType)
              if (n) {
                if (d < c.data.length) return e
              } else if (d > 0) return e;
            if (r = t.getNode(e.startContainer, e.startOffset), s = C.getParent(r, C.isBlock), i = a(u.getBody(), n, r), l = C.getParent(i, C.isBlock), !r || !i) return e;
            if (l && s != l)
              if (n) {
                if (!o(s, l)) return e;
                1 == r.nodeType ? "BR" == r.nodeName ? e.setStartBefore(r) : e.setStartAfter(r) : e.setStart(r, r.data.length), 1 == i.nodeType ? e.setEnd(i, 0) : e.setEndBefore(i)
              } else {
                if (!o(l, s)) return e;
                1 == i.nodeType ? "BR" == i.nodeName ? e.setStartBefore(i) : e.setStartAfter(i) : e.setStart(i, i.data.length), 1 == r.nodeType ? e.setEnd(r, 0) : e.setEndBefore(r)
              }
            return e
          }

          function f(e) {
            var t = x.getRng();
            return t = d(t, e), c(t) ? !0 : void 0
          }

          function v(e, t) {
            function n(e, n) {
              return m = X(n).parents().filter(function(e, t) {
                return !!u.schema.getTextInlineElements()[t.nodeName]
              }), l = e.cloneNode(!1), m = s.map(m, function(e) {
                return e = e.cloneNode(!1), l.hasChildNodes() ? (e.appendChild(l.firstChild), l.appendChild(e)) : l.appendChild(e), l.appendChild(e), e
              }), m.length ? (p = C.create("br"), m[0].appendChild(p), C.replace(l, e), t.setStartBefore(p), t.setEndBefore(p), u.selection.setRng(t), p) : null
            }

            function i(e) {
              return e && u.schema.getTextBlockElements()[e.tagName]
            }
            var o, a, l, c, d, f, h, p, m;
            if (t.collapsed && (f = t.startContainer, h = t.startOffset, a = C.getParent(f, C.isBlock), i(a)))
              if (1 == f.nodeType) {
                if (f = f.childNodes[h], f && "BR" != f.tagName) return;
                if (d = e ? a.nextSibling : a.previousSibling, C.isEmpty(a) && i(d) && C.isEmpty(d) && n(a, f)) return C.remove(d), !0
              } else if (3 == f.nodeType) {
              if (o = r.create(a, f), c = a.cloneNode(!0), f = r.resolve(c, o), e) {
                if (h >= f.data.length) return;
                f.deleteData(h, 1)
              } else {
                if (0 >= h) return;
                f.deleteData(h - 1, 1)
              }
              if (C.isEmpty(c)) return n(a, f)
            }
          }

          function y(e) {
            var t, n, r;
            f(e) || (s.each(u.getBody().getElementsByTagName("*"), function(e) {
              "SPAN" == e.tagName && e.setAttribute("mce-data-marked", 1), !e.hasAttribute("data-mce-style") && e.hasAttribute("style") && u.dom.setAttrib(e, "style", u.dom.getAttrib(e, "style"))
            }), t = new w(function() {}), t.observe(u.getDoc(), {
              childList: !0,
              attributes: !0,
              subtree: !0,
              attributeFilter: ["style"]
            }), u.getDoc().execCommand(e ? "ForwardDelete" : "Delete", !1, null), n = u.selection.getRng(), r = n.startContainer.parentNode, s.each(t.takeRecords(), function(e) {
              if (C.isChildOf(e.target, u.getBody())) {
                if ("style" == e.attributeName) {
                  var t = e.target.getAttribute("data-mce-style");
                  t ? e.target.setAttribute("style", t) : e.target.removeAttribute("style")
                }
                s.each(e.addedNodes, function(e) {
                  if ("SPAN" == e.nodeName && !e.getAttribute("mce-data-marked")) {
                    var t, i;
                    e == r && (t = n.startOffset, i = e.firstChild), C.remove(e, !0), i && (n.setStart(i, t), n.setEnd(i, t), u.selection.setRng(n))
                  }
                })
              }
            }), t.disconnect(), s.each(u.dom.select("span[mce-data-marked]"), function(e) {
              e.removeAttribute("mce-data-marked")
            }))
          }
          var b = u.getDoc(),
            C = u.dom,
            x = u.selection,
            w = window.MutationObserver,
            E, N;
          w || (E = !0, w = function() {
            function e(e) {
              var t = e.relatedNode || e.target;
              n.push({
                target: t,
                addedNodes: [t]
              })
            }

            function t(e) {
              var t = e.relatedNode || e.target;
              n.push({
                target: t,
                attributeName: e.attrName
              })
            }
            var n = [],
              r;
            this.observe = function(n) {
              r = n, r.addEventListener("DOMSubtreeModified", e, !1), r.addEventListener("DOMNodeInsertedIntoDocument", e, !1), r.addEventListener("DOMNodeInserted", e, !1), r.addEventListener("DOMAttrModified", t, !1)
            }, this.disconnect = function() {
              r.removeEventListener("DOMSubtreeModified", e, !1), r.removeEventListener("DOMNodeInsertedIntoDocument", e, !1), r.removeEventListener("DOMNodeInserted", e, !1), r.removeEventListener("DOMAttrModified", t, !1)
            }, this.takeRecords = function() {
              return n
            }
          }), u.on("keydown", function(e) {
            var t = e.keyCode == G,
              n = e.ctrlKey || e.metaKey;
            if (!h(e) && (t || e.keyCode == K)) {
              var r = u.selection.getRng(),
                i = r.startContainer,
                o = r.startOffset;
              if (t && e.shiftKey) return;
              if (v(t, r)) return void e.preventDefault();
              if (!n && r.collapsed && 3 == i.nodeType && (t ? o < i.data.length : o > 0)) return;
              e.preventDefault(), n && u.selection.getSel().modify("extend", t ? "forward" : "backward", e.metaKey ? "lineboundary" : "word"), y(t)
            }
          }), u.on("keypress", function(t) {
            if (!h(t) && !x.isCollapsed() && t.charCode > 31 && !e.metaKeyPressed(t)) {
              var n, r, i, o, a, s;
              n = u.selection.getRng(), s = String.fromCharCode(t.charCode), t.preventDefault(), r = X(n.startContainer).parents().filter(function(e, t) {
                return !!u.schema.getTextInlineElements()[t.nodeName]
              }), y(!0), r = r.filter(function(e, t) {
                return !X.contains(u.getBody(), t)
              }), r.length ? (i = C.createFragment(), r.each(function(e, t) {
                t = t.cloneNode(!1), i.hasChildNodes() ? (t.appendChild(i.firstChild), i.appendChild(t)) : (a = t, i.appendChild(t)), i.appendChild(t)
              }), a.appendChild(u.getDoc().createTextNode(s)), o = C.getParent(n.startContainer, C.isBlock), C.isEmpty(o) ? X(o).empty().append(i) : n.insertNode(i), n.setStart(a.firstChild, 1), n.setEnd(a.firstChild, 1), u.selection.setRng(n)) : u.selection.setContent(s)
            }
          }), u.addCommand("Delete", function() {
            y()
          }), u.addCommand("ForwardDelete", function() {
            y(!0)
          }), E || (u.on("dragstart", function(e) {
            N = x.getRng(), p(e)
          }), u.on("drop", function(e) {
            if (!h(e)) {
              var n = m(e);
              n && (e.preventDefault(), l.setEditorTimeout(u, function() {
                var r = t.getCaretRangeFromPoint(e.x, e.y, b);
                N && (x.setRng(N), N = null), y(), x.setRng(r), g(n.html)
              }))
            }
          }), u.on("cut", function(e) {
            h(e) || !e.clipboardData || u.selection.isCollapsed() || (e.preventDefault(), e.clipboardData.clearData(), e.clipboardData.setData("text/html", u.selection.getContent()), e.clipboardData.setData("text/plain", u.selection.getContent({
              format: "text"
            })), l.setEditorTimeout(u, function() {
              y(!0)
            }))
          }))
        }

        function y() {
          function e(e) {
            var t = J.create("body"),
              n = e.cloneContents();
            return t.appendChild(n), Q.serializer.serialize(t, {
              format: "html"
            })
          }

          function n(n) {
            if (!n.setStart) {
              if (n.item) return !1;
              var r = n.duplicate();
              return r.moveToElementText(u.getBody()), t.compareRanges(n, r)
            }
            var i = e(n),
              o = J.createRng();
            o.selectNode(u.getBody());
            var a = e(o);
            return i === a
          }
          u.on("keydown", function(e) {
            var t = e.keyCode,
              r, i;
            if (!h(e) && (t == G || t == K)) {
              if (r = u.selection.isCollapsed(), i = u.getBody(), r && !J.isEmpty(i)) return;
              if (!r && !n(u.selection.getRng())) return;
              e.preventDefault(), u.setContent(""), i.firstChild && J.isBlock(i.firstChild) ? u.selection.setCursorLocation(i.firstChild, 0) : u.selection.setCursorLocation(i, 0), u.nodeChanged()
            }
          })
        }

        function b() {
          u.shortcuts.add("meta+a", null, "SelectAll")
        }

        function C() {
          u.settings.content_editable || J.bind(u.getDoc(), "mousedown mouseup", function(e) {
            var t;
            if (e.target == u.getDoc().documentElement)
              if (t = Q.getRng(), u.getBody().focus(), "mousedown" == e.type) {
                if (c.isCaretContainer(t.startContainer)) return;
                Q.placeCaretAt(e.clientX, e.clientY)
              } else Q.setRng(t)
          })
        }

        function x() {
          u.on("keydown", function(e) {
            if (!h(e) && e.keyCode === K) {
              if (!u.getBody().getElementsByTagName("hr").length) return;
              if (Q.isCollapsed() && 0 === Q.getRng(!0).startOffset) {
                var t = Q.getNode(),
                  n = t.previousSibling;
                if ("HR" == t.nodeName) return J.remove(t), void e.preventDefault();
                n && n.nodeName && "hr" === n.nodeName.toLowerCase() && (J.remove(n), e.preventDefault())
              }
            }
          })
        }

        function w() {
          window.Range.prototype.getClientRects || u.on("mousedown", function(e) {
            if (!h(e) && "HTML" === e.target.nodeName) {
              var t = u.getBody();
              t.blur(), l.setEditorTimeout(u, function() {
                t.focus()
              })
            }
          })
        }

        function E() {
          u.on("click", function(e) {
            var t = e.target;
            /^(IMG|HR)$/.test(t.nodeName) && "false" !== J.getContentEditableParent(t) && (e.preventDefault(), Q.getSel().setBaseAndExtent(t, 0, t, 1), u.nodeChanged()), "A" == t.nodeName && J.hasClass(t, "mce-item-anchor") && (e.preventDefault(), Q.select(t))
          })
        }

        function N() {
          function e() {
            var e = J.getAttribs(Q.getStart().cloneNode(!1));
            return function() {
              var t = Q.getStart();
              t !== u.getBody() && (J.setAttrib(t, "style", null), Y(e, function(e) {
                t.setAttributeNode(e.cloneNode(!0))
              }))
            }
          }

          function t() {
            return !Q.isCollapsed() && J.getParent(Q.getStart(), J.isBlock) != J.getParent(Q.getEnd(), J.isBlock)
          }
          u.on("keypress", function(n) {
            var r;
            return h(n) || 8 != n.keyCode && 46 != n.keyCode || !t() ? void 0 : (r = e(), u.getDoc().execCommand("delete", !1, null), r(), n.preventDefault(), !1)
          }), J.bind(u.getDoc(), "cut", function(n) {
            var r;
            !h(n) && t() && (r = e(), l.setEditorTimeout(u, function() {
              r()
            }))
          })
        }

        function _() {
          document.body.setAttribute("role", "application")
        }

        function S() {
          u.on("keydown", function(e) {
            if (!h(e) && e.keyCode === K && Q.isCollapsed() && 0 === Q.getRng(!0).startOffset) {
              var t = Q.getNode().previousSibling;
              if (t && t.nodeName && "table" === t.nodeName.toLowerCase()) return e.preventDefault(), !1
            }
          })
        }

        function k() {
          f() > 7 || (d("RespectVisibilityInDesign", !0), u.contentStyles.push(".mceHideBrInPre pre br {display: none}"), J.addClass(u.getBody(), "mceHideBrInPre"), ee.addNodeFilter("pre", function(e) {
            for (var t = e.length, n, r, o, a; t--;)
              for (n = e[t].getAll("br"), r = n.length; r--;) o = n[r], a = o.prev, a && 3 === a.type && "\n" != a.value.charAt(a.value - 1) ? a.value += "\n" : o.parent.insert(new i("#text", 3), o, !0).value = "\n"
          }), te.addNodeFilter("pre", function(e) {
            for (var t = e.length, n, r, i, o; t--;)
              for (n = e[t].getAll("br"), r = n.length; r--;) i = n[r], o = i.prev, o && 3 == o.type && (o.value = o.value.replace(/\r?\n$/, ""))
          }))
        }

        function T() {
          J.bind(u.getBody(), "mouseup", function() {
            var e, t = Q.getNode();
            "IMG" == t.nodeName && ((e = J.getStyle(t, "width")) && (J.setAttrib(t, "width", e.replace(/[^0-9%]+/g, "")), J.setStyle(t, "width", "")), (e = J.getStyle(t, "height")) && (J.setAttrib(t, "height", e.replace(/[^0-9%]+/g, "")), J.setStyle(t, "height", "")))
          })
        }

        function R() {
          u.on("keydown", function(t) {
            var n, r, i, o, a;
            if (!h(t) && t.keyCode == e.BACKSPACE && (n = Q.getRng(), r = n.startContainer, i = n.startOffset, o = J.getRoot(), a = r, n.collapsed && 0 === i)) {
              for (; a && a.parentNode && a.parentNode.firstChild == a && a.parentNode != o;) a = a.parentNode;
              "BLOCKQUOTE" === a.tagName && (u.formatter.toggle("blockquote", null, a), n = J.createRng(), n.setStart(r, 0), n.setEnd(r, 0), Q.setRng(n))
            }
          })
        }

        function A() {
          function e() {
            u._refreshContentEditable(), d("StyleWithCSS", !1), d("enableInlineTableEditing", !1), Z.object_resizing || d("enableObjectResizing", !1)
          }
          Z.readonly || u.on("BeforeExecCommand MouseDown", e)
        }

        function B() {
          function e() {
            Y(J.select("a"), function(e) {
              var t = e.parentNode,
                n = J.getRoot();
              if (t.lastChild === e) {
                for (; t && !J.isBlock(t);) {
                  if (t.parentNode.lastChild !== t || t === n) return;
                  t = t.parentNode
                }
                J.add(t, "br", {
                  "data-mce-bogus": 1
                })
              }
            })
          }
          u.on("SetContent ExecCommand", function(t) {
            ("setcontent" == t.type || "mceInsertLink" === t.command) && e()
          })
        }

        function D() {
          Z.forced_root_block && u.on("init", function() {
            d("DefaultParagraphSeparator", Z.forced_root_block)
          })
        }

        function M() {
          u.on("keydown", function(e) {
            var t;
            h(e) || e.keyCode != K || (t = u.getDoc().selection.createRange(), t && t.item && (e.preventDefault(), u.undoManager.beforeChange(), J.remove(t.item(0)), u.undoManager.add()))
          })
        }

        function L() {
          var e;
          f() >= 10 && (e = "", Y("p div h1 h2 h3 h4 h5 h6".split(" "), function(t, n) {
            e += (n > 0 ? "," : "") + t + ":empty"
          }), u.contentStyles.push(e + "{padding-right: 1px !important}"))
        }

        function P() {
          f() < 9 && (ee.addNodeFilter("noscript", function(e) {
            for (var t = e.length, n, r; t--;) n = e[t], r = n.firstChild, r && n.attr("data-mce-innertext", r.value)
          }), te.addNodeFilter("noscript", function(e) {
            for (var t = e.length, n, r, a; t--;) n = e[t], r = e[t].firstChild, r ? r.value = o.decode(r.value) : (a = n.attributes.map["data-mce-innertext"], a && (n.attr("data-mce-innertext", null), r = new i("#text", 3), r.value = a, r.raw = !0, n.append(r)))
          }))
        }

        function H() {
          function e(e, t) {
            var n = i.createTextRange();
            try {
              n.moveToPoint(e, t)
            } catch (r) {
              n = null
            }
            return n
          }

          function t(t) {
            var r;
            t.button ? (r = e(t.x, t.y), r && (r.compareEndPoints("StartToStart", a) > 0 ? r.setEndPoint("StartToStart", a) : r.setEndPoint("EndToEnd", a), r.select())) : n()
          }

          function n() {
            var e = r.selection.createRange();
            a && !e.item && 0 === e.compareEndPoints("StartToEnd", e) && a.select(), J.unbind(r, "mouseup", n), J.unbind(r, "mousemove", t), a = o = 0
          }
          var r = J.doc,
            i = r.body,
            o, a, s;
          r.documentElement.unselectable = !0, J.bind(r, "mousedown contextmenu", function(i) {
            if ("HTML" === i.target.nodeName) {
              if (o && n(), s = r.documentElement, s.scrollHeight > s.clientHeight) return;
              o = 1, a = e(i.x, i.y), a && (J.bind(r, "mouseup", n), J.bind(r, "mousemove", t), J.getRoot().focus(), a.select())
            }
          })
        }

        function O() {
          u.on("keyup focusin mouseup", function(t) {
            65 == t.keyCode && e.metaKeyPressed(t) || Q.normalize()
          }, !0)
        }

        function I() {
          u.contentStyles.push("img:-moz-broken {-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")
        }

        function F() {
          u.inline || u.on("keydown", function() {
            document.activeElement == document.body && u.getWin().focus()
          })
        }

        function z() {
          u.inline || (u.contentStyles.push("body {min-height: 150px}"), u.on("click", function(e) {
            var t;
            if ("HTML" == e.target.nodeName) {
              if (a.ie > 11) return void u.getBody().focus();
              t = u.selection.getRng(), u.getBody().focus(), u.selection.setRng(t), u.selection.normalize(), u.nodeChanged()
            }
          }))
        }

        function W() {
          a.mac && u.on("keydown", function(t) {
            !e.metaKeyPressed(t) || t.shiftKey || 37 != t.keyCode && 39 != t.keyCode || (t.preventDefault(), u.selection.getSel().modify("move", 37 == t.keyCode ? "backward" : "forward", "lineboundary"))
          })
        }

        function V() {
          d("AutoUrlDetect", !1)
        }

        function U() {
          u.on("click", function(e) {
            var t = e.target;
            do
              if ("A" === t.tagName) return void e.preventDefault(); while (t = t.parentNode)
          }), u.contentStyles.push(".mce-content-body {-webkit-touch-callout: none}")
        }

        function $() {
          u.on("init", function() {
            u.dom.bind(u.getBody(), "submit", function(e) {
              e.preventDefault()
            })
          })
        }

        function q() {
          ee.addNodeFilter("br", function(e) {
            for (var t = e.length; t--;) "Apple-interchange-newline" == e[t].attr("class") && e[t].remove()
          })
        }

        function j() {
          u.on("dragstart", function(e) {
            p(e)
          }), u.on("drop", function(e) {
            if (!h(e)) {
              var n = m(e);
              if (n && n.id != u.id) {
                e.preventDefault();
                var r = t.getCaretRangeFromPoint(e.x, e.y, u.getDoc());
                Q.setRng(r), g(n.html)
              }
            }
          })
        }
        var Y = s.each,
          X = u.$,
          K = e.BACKSPACE,
          G = e.DELETE,
          J = u.dom,
          Q = u.selection,
          Z = u.settings,
          ee = u.parser,
          te = u.serializer,
          ne = a.gecko,
          re = a.ie,
          ie = a.webkit,
          oe = "data:text/mce-internal,",
          ae = re ? "Text" : "URL";
        R(), y(), O(), ie && (v(), C(), E(), D(), $(), S(), q(), a.iOS ? (F(), z(), U()) : b()), re && a.ie < 11 && (x(), _(), k(), T(), M(), L(), P(), H()), a.ie >= 11 && (z(), S()), a.ie && (b(), V(), j()), ne && (x(), w(), N(), A(), B(), I(), W(), S())
      }
    }), r(Me, [oe, w, m], function(e, t, n) {
      function r(e, t) {
        return "selectionchange" == t ? e.getDoc() : !e.inline && /^mouse|click|contextmenu|drop|dragover|dragend/.test(t) ? e.getDoc().documentElement : e.settings.event_root ? (e.eventRoot || (e.eventRoot = o.select(e.settings.event_root)[0]), e.eventRoot) : e.getBody()
      }

      function i(e, t) {
        function n(e) {
          return !e.hidden && !e.readonly
        }
        var i = r(e, t),
          s;
        if (e.delegates || (e.delegates = {}), !e.delegates[t])
          if (e.settings.event_root) {
            if (a || (a = {}, e.editorManager.on("removeEditor", function() {
                var t;
                if (!e.editorManager.activeEditor && a) {
                  for (t in a) e.dom.unbind(r(e, t));
                  a = null
                }
              })), a[t]) return;
            s = function(r) {
              for (var i = r.target, a = e.editorManager.editors, s = a.length; s--;) {
                var l = a[s].getBody();
                (l === i || o.isChildOf(i, l)) && n(a[s]) && a[s].fire(t, r)
              }
            }, a[t] = s, o.bind(i, t, s)
          } else s = function(r) {
            n(e) && e.fire(t, r)
          }, o.bind(i, t, s), e.delegates[t] = s
      }
      var o = t.DOM,
        a, s = {
          bindPendingEventDelegates: function() {
            var e = this;
            n.each(e._pendingNativeEvents, function(t) {
              i(e, t)
            })
          },
          toggleNativeEvent: function(e, t) {
            var n = this;
            "focus" != e && "blur" != e && (t ? n.initialized ? i(n, e) : n._pendingNativeEvents ? n._pendingNativeEvents.push(e) : n._pendingNativeEvents = [e] : n.initialized && (n.dom.unbind(r(n, e), e, n.delegates[e]), delete n.delegates[e]))
          },
          unbindAllNativeEvents: function() {
            var e = this,
              t;
            if (e.delegates) {
              for (t in e.delegates) e.dom.unbind(r(e, t), t, e.delegates[t]);
              delete e.delegates
            }
            e.inline || (e.getBody().onload = null, e.dom.unbind(e.getWin()), e.dom.unbind(e.getDoc())), e.dom.unbind(e.getBody()), e.dom.unbind(e.getContainer())
          }
        };
      return s = n.extend({}, e, s)
    }), r(Le, [], function() {
      function e(e, t, n) {
        try {
          e.getDoc().execCommand(t, !1, n)
        } catch (r) {}
      }

      function t(t, n) {
        var r = t.readonly ? "readonly" : "design";
        n != r && ("readonly" == n ? (t.selection.controlSelection.hideResizeRect(), t.readonly = !0, t.getBody().contentEditable = !1) : (t.readonly = !1, t.getBody().contentEditable = !0, e(t, "StyleWithCSS", !1), e(t, "enableInlineTableEditing", !1), e(t, "enableObjectResizing", !1), t.focus(), t.nodeChanged()), t.fire("SwitchMode", {
          mode: n
        }))
      }
      return {
        setMode: t
      }
    }), r(Pe, [m, h], function(e, t) {
      var n = e.each,
        r = e.explode,
        i = {
          f9: 120,
          f10: 121,
          f11: 122
        },
        o = e.makeMap("alt,ctrl,shift,meta,access");
      return function(a) {
        function s(e, s, l, c) {
          var u, d, f;
          f = {
            func: l,
            scope: c || a,
            desc: a.translate(s)
          }, n(r(e, "+"), function(e) {
            e in o ? f[e] = !0 : /^[0-9]{2,}$/.test(e) ? f.keyCode = parseInt(e, 10) : (f.charCode = e.charCodeAt(0), f.keyCode = i[e] || e.toUpperCase().charCodeAt(0))
          }), u = [f.keyCode];
          for (d in o) f[d] ? u.push(d) : f[d] = !1;
          return f.id = u.join(","), f.access && (f.alt = !0, t.mac ? f.ctrl = !0 : f.shift = !0), f.meta && (t.mac ? f.meta = !0 : (f.ctrl = !0, f.meta = !1)), f
        }
        var l = this,
          c = {};
        a.on("keyup keypress keydown", function(e) {
          (e.altKey || e.ctrlKey || e.metaKey) && !e.isDefaultPrevented() && n(c, function(t) {
            return t.ctrl == e.ctrlKey && t.meta == e.metaKey && t.alt == e.altKey && t.shift == e.shiftKey && (e.keyCode == t.keyCode || e.charCode && e.charCode == t.charCode) ? (e.preventDefault(), "keydown" == e.type && t.func.call(t.scope), !0) : void 0
          })
        }), l.add = function(t, i, o, l) {
          var u;
          return u = o, "string" == typeof o ? o = function() {
            a.execCommand(u, !1, null)
          } : e.isArray(u) && (o = function() {
            a.execCommand(u[0], u[1], u[2])
          }), n(r(t.toLowerCase()), function(e) {
            var t = s(e, i, o, l);
            c[t.id] = t
          }), !0
        }, l.remove = function(e) {
          var t = s(e);
          return c[t.id] ? (delete c[t.id], !0) : !1
        }
      }
    }), r(He, [c, m, z], function(e, t, n) {
      return function(r) {
        function i(e) {
          var t, n;
          return n = {
            "image/jpeg": "jpg",
            "image/jpg": "jpg",
            "image/gif": "gif",
            "image/png": "png"
          }, t = n[e.blob().type.toLowerCase()] || "dat", e.id() + "." + t
        }

        function o(e, t) {
          return e ? e.replace(/\/$/, "") + "/" + t.replace(/^\//, "") : t
        }

        function a(e) {
          return {
            id: e.id,
            blob: e.blob,
            base64: e.base64,
            filename: n.constant(i(e))
          }
        }

        function s(e, t, n, a) {
          var s, l, c;
          s = new XMLHttpRequest, s.open("POST", r.url), s.withCredentials = r.credentials, c = a(), s.upload.onprogress = function(e) {
            var t = Math.round(e.loaded / e.total * 100);
            c.progressBar.value(t)
          }, s.onload = function() {
            var e;
            return c.close(), 200 != s.status ? void n("HTTP Error: " + s.status) : (e = JSON.parse(s.responseText), e && "string" == typeof e.location ? void t(o(r.basePath, e.location)) : void n("Invalid JSON: " + s.responseText))
          }, l = new FormData, l.append("file", e.blob(), i(e)), s.send(l)
        }

        function l() {
          return new e(function(e) {
            e([])
          })
        }

        function c(e) {
          return e.then(function(e) {
            return e
          })["catch"](function(e) {
            return e
          })
        }

        function u(e, t, n) {
          var r = e(n),
            i = c(r);
          return delete p[t], p[t] = i, i
        }

        function d(e, n) {
          return t.map(e, function(e) {
            var t = e.id();
            return p[t] ? p[t] : u(n, t, e)
          })
        }

        function f(t, n) {
          function i(t) {
            return new e(function(e) {
              var i = r.handler;
              i(a(t), function(n) {
                e({
                  url: n,
                  blobInfo: t,
                  status: !0
                })
              }, function(n) {
                e({
                  url: "",
                  blobInfo: t,
                  status: !1,
                  error: n
                })
              }, n)
            })
          }
          var o = d(t, i);
          return e.all(o)
        }

        function h(e, t) {
          return r.url || r.handler !== s ? f(e, t) : l()
        }
        var p = {};
        return r = t.extend({
          credentials: !1,
          handler: s
        }, r), {
          upload: h
        }
      }
    }), r(Oe, [c], function(e) {
      function t(t) {
        return new e(function(e) {
          var n = new XMLHttpRequest;
          n.open("GET", t, !0), n.responseType = "blob", n.onload = function() {
            200 == this.status && e(this.response)
          }, n.send()
        })
      }

      function n(e) {
        var t, n;
        return e = decodeURIComponent(e).split(","), n = /data:([^;]+)/.exec(e[0]), n && (t = n[1]), {
          type: t,
          data: e[1]
        }
      }

      function r(t) {
        return new e(function(e) {
          var r, i, o;
          t = n(t);
          try {
            r = atob(t.data)
          } catch (a) {
            return void e(new Blob([]))
          }
          for (i = new Uint8Array(r.length), o = 0; o < i.length; o++) i[o] = r.charCodeAt(o);
          e(new Blob([i], {
            type: t.type
          }))
        })
      }

      function i(e) {
        return 0 === e.indexOf("blob:") ? t(e) : 0 === e.indexOf("data:") ? r(e) : null
      }

      function o(t) {
        return new e(function(e) {
          var n = new FileReader;
          n.onloadend = function() {
            e(n.result)
          }, n.readAsDataURL(t)
        })
      }
      return {
        uriToBlob: i,
        blobToDataUri: o,
        parseDataUri: n
      }
    }), r(Ie, [c, p, z, Oe, h], function(e, t, n, r, i) {
      var o = 0;
      return function(a) {
        function s(s, c) {
          function u(e, t) {
            var n, i;
            return 0 === e.src.indexOf("blob:") ? (i = a.getByUri(e.src), void(i && t({
              image: e,
              blobInfo: i
            }))) : (n = r.parseDataUri(e.src).data, i = a.findFirst(function(e) {
              return e.base64() === n
            }), void(i ? t({
              image: e,
              blobInfo: i
            }) : r.uriToBlob(e.src).then(function(r) {
              var i = "blobid" + o++,
                s = a.create(i, r, n);
              a.add(s), t({
                image: e,
                blobInfo: s
              })
            })))
          }
          var d, f;
          return c || (c = n.constant(!0)), d = t.filter(s.getElementsByTagName("img"), function(e) {
            var t = e.src;
            return i.fileApi ? e.hasAttribute("data-mce-bogus") ? !1 : e.hasAttribute("data-mce-placeholder") ? !1 : t && t != i.transparentSrc ? 0 === t.indexOf("blob:") ? !0 : 0 === t.indexOf("data:") ? c(e) : !1 : !1 : !1
          }), f = t.map(d, function(t) {
            var n;
            return l[t.src] ? new e(function(e) {
              l[t.src].then(function(n) {
                e({
                  image: t,
                  blobInfo: n.blobInfo
                })
              })
            }) : (n = new e(function(e) {
              u(t, e)
            }).then(function(e) {
              return delete l[e.image.src], e
            })["catch"](function(e) {
              return delete l[t.src], e
            }), l[t.src] = n, n)
          }), e.all(f)
        }
        var l = {};
        return {
          findAll: s
        }
      }
    }), r(Fe, [p, z], function(e, t) {
      return function() {
        function n(e, t, n) {
          return {
            id: c(e),
            blob: c(t),
            base64: c(n),
            blobUri: c(URL.createObjectURL(t))
          }
        }

        function r(e) {
          i(e.id()) || l.push(e)
        }

        function i(e) {
          return o(function(t) {
            return t.id() === e
          })
        }

        function o(t) {
          return e.filter(l, t)[0]
        }

        function a(e) {
          return o(function(t) {
            return t.blobUri() == e
          })
        }

        function s() {
          e.each(l, function(e) {
            URL.revokeObjectURL(e.blobUri())
          }), l = []
        }
        var l = [],
          c = t.constant;
        return {
          create: n,
          add: r,
          get: i,
          getByUri: a,
          findFirst: o,
          destroy: s
        }
      }
    }), r(ze, [p, He, Ie, Fe], function(e, t, n, r) {
      return function(i) {
        function o(e) {
          return function(t) {
            return i.selection ? e(t) : []
          }
        }

        function a(e, t, n) {
          var r = 0;
          do r = e.indexOf(t, r), -1 !== r && (e = e.substring(0, r) + n + e.substr(r + t.length), r += n.length - t.length + 1); while (-1 !== r);
          return e
        }

        function s(e, t, n) {
          return e = a(e, 'src="' + t + '"', 'src="' + n + '"'), e = a(e, 'data-mce-src="' + t + '"', 'data-mce-src="' + n + '"')
        }

        function l(t, n) {
          e.each(i.undoManager.data, function(e) {
            e.content = s(e.content, t, n)
          })
        }

        function c() {
          return i.notificationManager.open({
            text: i.translate("Image uploading..."),
            type: "info",
            timeout: -1,
            progressBar: !0
          })
        }

        function u(n) {
          return g || (g = new t({
            url: y.images_upload_url,
            basePath: y.images_upload_base_path,
            credentials: y.images_upload_credentials,
            handler: y.images_upload_handler
          })), f().then(o(function(t) {
            var r;
            return r = e.map(t, function(e) {
              return e.blobInfo
            }), g.upload(r, c).then(o(function(r) {
              return r = e.map(r, function(e, n) {
                var r = t[n].image;
                return l(r.src, e.url), i.$(r).attr({
                  src: e.url,
                  "data-mce-src": i.convertURL(e.url, "src")
                }), {
                  element: r,
                  status: e.status
                }
              }), n && n(r), r
            }))
          }))
        }

        function d(e) {
          return y.automatic_uploads !== !1 ? u(e) : void 0
        }

        function f() {
          return v || (v = new n(m)), v.findAll(i.getBody(), y.images_dataimg_filter).then(o(function(t) {
            return e.each(t, function(e) {
              l(e.image.src, e.blobInfo.blobUri()), e.image.src = e.blobInfo.blobUri()
            }), t
          }))
        }

        function h() {
          m.destroy(), v = g = null
        }

        function p(t) {
          return t.replace(/src="(blob:[^"]+)"/g, function(t, n) {
            var r = m.getByUri(n);
            return r || (r = e.reduce(i.editorManager.editors, function(e, t) {
              return e || t.editorUpload.blobCache.getByUri(n)
            }, null)), r ? 'src="data:' + r.blob().type + ";base64," + r.base64() + '"' : t
          })
        }
        var m = new r,
          g, v, y = i.settings;
        return i.on("setContent", function() {
          i.settings.automatic_uploads !== !1 ? d() : f()
        }), i.on("RawSaveContent", function(e) {
          e.content = p(e.content)
        }), i.on("getContent", function(e) {
          e.source_view || "raw" == e.format || (e.content = p(e.content))
        }), {
          blobCache: m,
          uploadImages: u,
          uploadImagesAuto: d,
          scanForImages: f,
          destroy: h
        }
      }
    }), r(We, [z, y, _, $, k, W], function(e, t, n, r, i, o) {
      function a(e) {
        return e > 0
      }

      function s(e) {
        return 0 > e
      }

      function l(e, n, r, i, o) {
        var l = new t(e, i);
        if (s(n)) {
          if (C(e) && (e = l.prev(!0), r(e))) return e;
          for (; e = l.prev(o);)
            if (r(e)) return e
        }
        if (a(n)) {
          if (C(e) && (e = l.next(!0), r(e))) return e;
          for (; e = l.next(o);)
            if (r(e)) return e
        }
        return null
      }

      function c(e, t) {
        for (e = e.parentNode; e && e != t; e = e.parentNode)
          if (b(e)) return e;
        return t
      }

      function u(e, t) {
        for (; e && e != t;) {
          if (x(e)) return e;
          e = e.parentNode
        }
        return null
      }

      function d(e, t, n) {
        return u(e.container(), n) == u(t.container(), n)
      }

      function f(e, t, n) {
        return c(e.container(), n) == c(t.container(), n)
      }

      function h(e, t) {
        var n, r;
        return t ? (n = t.container(), r = t.offset(), N(n) ? n.childNodes[r + e] : null) : null
      }

      function p(e, t) {
        var n = t.ownerDocument.createRange();
        return e ? (n.setStartBefore(t), n.setEndBefore(t)) : (n.setStartAfter(t), n.setEndAfter(t)), n
      }

      function m(e, t, n) {
        return u(t, e) == u(n, e)
      }

      function g(e, t, n) {
        var r, i;
        for (i = e ? "previousSibling" : "nextSibling"; n && n != t;) {
          if (r = n[i], w(r) && (r = r[i]), C(r)) {
            if (m(t, r, n)) return r;
            break
          }
          if (_(r)) break;
          n = n.parentNode
        }
        return null
      }

      function v(e, t, r) {
        var o, a, s, l, c = E(g, !0, t),
          u = E(g, !1, t);
        if (a = r.startContainer, s = r.startOffset, i.isCaretContainerBlock(a)) {
          if (N(a) || (a = a.parentNode), l = a.getAttribute("data-mce-caret"), "before" == l && (o = a.nextSibling, C(o))) return S(o);
          if ("after" == l && (o = a.previousSibling, C(o))) return k(o)
        }
        if (!r.collapsed) return r;
        if (n.isText(a)) {
          if (w(a)) {
            if (1 === e) {
              if (o = u(a)) return S(o);
              if (o = c(a)) return k(o)
            }
            if (-1 === e) {
              if (o = c(a)) return k(o);
              if (o = u(a)) return S(o)
            }
            return r
          }
          if (i.endsWithCaretContainer(a) && s >= a.data.length - 1) return 1 === e && (o = u(a)) ? S(o) : r;
          if (i.startsWithCaretContainer(a) && 1 >= s) return -1 === e && (o = c(a)) ? k(o) : r;
          if (s === a.data.length) return o = u(a), o ? S(o) : r;
          if (0 === s) return o = c(a), o ? k(o) : r
        }
        return r
      }

      function y(e, t) {
        return C(h(e, t))
      }
      var b = n.isContentEditableTrue,
        C = n.isContentEditableFalse,
        x = n.matchStyleValues("display", "block table table-cell table-caption"),
        w = i.isCaretContainer,
        E = e.curry,
        N = n.isElement,
        _ = o.isCaretCandidate,
        S = E(p, !0),
        k = E(p, !1);
      return {
        isForwards: a,
        isBackwards: s,
        findNode: l,
        getEditingHost: c,
        getParentBlock: u,
        isInSameBlock: d,
        isInSameEditingHost: f,
        isBeforeContentEditableFalse: E(y, 0),
        isAfterContentEditableFalse: E(y, -1),
        normalizeRange: v
      }
    }), r(Ve, [_, W, $, We, p, z], function(e, t, n, r, i, o) {
      function a(e, t) {
        for (var n = []; e && e != t;) n.push(e), e = e.parentNode;
        return n
      }

      function s(e, t) {
        return e.hasChildNodes() && t < e.childNodes.length ? e.childNodes[t] : null
      }

      function l(e, t) {
        if (h(e)) {
          if (m(t.previousSibling) && !d(t.previousSibling)) return n.before(t);
          if (d(t)) return n(t, 0)
        }
        if (p(e)) {
          if (m(t.nextSibling) && !d(t.nextSibling)) return n.after(t);
          if (d(t)) return n(t, t.data.length)
        }
        return p(e) ? n.after(t) : n.before(t)
      }

      function c(e, t, c) {
        var y, b, C, x, w, E, N;
        if (!f(c) || !t) return null;
        if (N = t, y = N.container(), b = N.offset(), d(y)) {
          if (p(e) && b > 0) return n(y, --b);
          if (h(e) && b < y.length) return n(y, ++b);
          C = y
        } else {
          if (p(e) && b > 0 && (x = s(y, b - 1), m(x))) return !g(x) && (w = r.findNode(x, e, v, x)) ? d(w) ? n(w, w.data.length) : n.after(w) : d(x) ? n(x, x.data.length) : n.before(x);
          if (h(e) && b < y.childNodes.length && (x = s(y, b), m(x))) return !g(x) && (w = r.findNode(x, e, v, x)) ? d(w) ? n(w, 0) : n.before(w) : d(x) ? n(x, 0) : n.after(x);
          C = N.getNode()
        }
        return (h(e) && N.isAtEnd() || p(e) && N.isAtStart()) && (C = r.findNode(C, e, o.constant(!0), c, !0), v(C)) ? l(e, C) : (x = r.findNode(C, e, v, c), E = i.last(i.filter(a(y, c), u)), !E || x && E.contains(x) ? x ? l(e, x) : null : N = h(e) ? n.after(E) : n.before(E))
      }
      var u = e.isContentEditableFalse,
        d = e.isText,
        f = e.isElement,
        h = r.isForwards,
        p = r.isBackwards,
        m = t.isCaretCandidate,
        g = t.isAtomic,
        v = t.isEditableCaretCandidate;
      return function(e) {
        return {
          next: function(t) {
            return c(1, t, e)
          },
          prev: function(t) {
            return c(-1, t, e)
          }
        }
      }
    }), r(Ue, [k, $, _, T, g, V, u], function(e, t, n, r, i, o, a) {
      var s = n.isContentEditableFalse;
      return function(t, n) {
        function r(e, n) {
          var r = o.collapse(e.getBoundingClientRect(), n),
            i, a, s, l, c;
          return "BODY" == t.tagName ? (i = t.ownerDocument.documentElement, a = t.scrollLeft || i.scrollLeft, s = t.scrollTop || i.scrollTop) : (c = t.getBoundingClientRect(), a = t.scrollLeft - c.left, s = t.scrollTop - c.top), r.left += a, r.right += a, r.top += s, r.bottom += s, r.width = 1, l = e.offsetWidth - e.clientWidth, l > 0 && (n && (l *= -1), r.left += l, r.right += l), r
        }

        function l() {
          var n, r, o, a, s;
          for (n = i("*[contentEditable=false]", t), a = 0; a < n.length; a++) r = n[a], o = r.previousSibling, e.endsWithCaretContainer(o) && (s = o.data, 1 == s.length ? o.parentNode.removeChild(o) : o.deleteData(s.length - 1, 1)), o = r.nextSibling, e.startsWithCaretContainer(o) && (s = o.data, 1 == s.length ? o.parentNode.removeChild(o) : o.deleteData(0, 1));
          return null
        }

        function c(o, a) {
          var l, c, f;
          return u(), n(a) ? (g = e.insertBlock("p", a, o), l = r(a, o), i(g).css("top", l.top), m = i('<div class="mce-visual-caret" data-mce-bogus="all"></div>').css(l).appendTo(t), o && m.addClass("mce-visual-caret-before"), d(), c = a.ownerDocument.createRange(), f = g.firstChild, c.setStart(f, 0), c.setEnd(f, 1), c) : (g = e.insertInline(a, o), c = a.ownerDocument.createRange(), s(g.nextSibling) ? (c.setStart(g, 0), c.setEnd(g, 0)) : (c.setStart(g, 1), c.setEnd(g, 1)), c)
        }

        function u() {
          l(), g && (e.remove(g), g = null), m && (m.remove(), m = null), clearInterval(p)
        }

        function d() {
          p = a.setInterval(function() {
            i("div.mce-visual-caret", t).toggleClass("mce-visual-caret-hidden")
          }, 500)
        }

        function f() {
          a.clearInterval(p)
        }

        function h() {
          return ".mce-visual-caret {position: absolute;background-color: black;background-color: currentcolor;}.mce-visual-caret-hidden {display: none;}*[data-mce-caret] {position: absolute;left: -1000px;right: auto;top: 0;margin: 0;padding: 0;}"
        }
        var p, m, g;
        return {
          show: c,
          hide: u,
          getCss: h,
          destroy: f
        }
      }
    }), r($e, [p, _, V], function(e, t, n) {
      function r(i) {
        function o(t) {
          return e.map(t, function(e) {
            return e = n.clone(e), e.node = i, e
          })
        }
        if (e.isArray(i)) return e.reduce(i, function(e, t) {
          return e.concat(r(t))
        }, []);
        if (t.isElement(i)) return o(i.getClientRects());
        if (t.isText(i)) {
          var a = i.ownerDocument.createRange();
          return a.setStart(i, 0), a.setEnd(i, i.data.length), o(a.getClientRects())
        }
      }
      return {
        getClientRects: r
      }
    }), r(qe, [z, p, $e, W, We, Ve, $, V], function(e, t, n, r, i, o, a, s) {
      function l(e, t, n, o) {
        for (; o = i.findNode(o, e, r.isEditableCaretCandidate, t);)
          if (n(o)) return
      }

      function c(e, r, i, o, a, s) {
        function c(o) {
          var s, l, c;
          for (c = n.getClientRects(o), -1 == e && (c = c.reverse()), s = 0; s < c.length; s++)
            if (l = c[s], !i(l, h)) {
              if (f.length > 0 && r(l, t.last(f)) && u++, l.line = u, a(l)) return !0;
              f.push(l)
            }
        }
        var u = 0,
          d, f = [],
          h;
        return (h = t.last(s.getClientRects())) ? (d = s.getNode(), c(d), l(e, o, c, d), f) : f
      }

      function u(e, t) {
        return t.line > e
      }

      function d(e, t) {
        return t.line === e
      }

      function f(e, n, r, i) {
        function l(n) {
          return 1 == e ? t.last(n.getClientRects()) : t.last(n.getClientRects())
        }
        var c = new o(n),
          u, d, f, h, p = [],
          m = 0,
          g, v;
        1 == e ? (u = c.next, d = s.isBelow, f = s.isAbove, h = a.after(i)) : (u = c.prev, d = s.isAbove, f = s.isBelow, h = a.before(i)), v = l(h);
        do
          if (h.isVisible() && (g = l(h), !f(g, v))) {
            if (p.length > 0 && d(g, t.last(p)) && m++, g = s.clone(g), g.position = h, g.line = m, r(g)) return p;
            p.push(g)
          }
        while (h = u(h));
        return p
      }
      var h = e.curry,
        p = h(c, -1, s.isAbove, s.isBelow),
        m = h(c, 1, s.isBelow, s.isAbove);
      return {
        upUntil: p,
        downUntil: m,
        positionsUntil: f,
        isAboveLine: h(u),
        isLine: h(d)
      }
    }), r(je, [z, p, _, $e, V, We, W], function(e, t, n, r, i, o, a) {
      function s(e, t) {
        return Math.abs(e.left - t)
      }

      function l(e, t) {
        return Math.abs(e.right - t)
      }

      function c(e, n) {
        function r(e, t) {
          return e >= t.left && e <= t.right
        }
        return t.reduce(e, function(e, t) {
          var i, o;
          return i = Math.min(s(e, n), l(e, n)), o = Math.min(s(t, n), l(t, n)), r(n, t) ? t : r(n, e) ? e : o == i && m(t.node) ? t : i > o ? t : e
        })
      }

      function u(e, t, n, r) {
        for (; r = g(r, e, a.isEditableCaretCandidate, t);)
          if (n(r)) return
      }

      function d(e, n) {
        function o(e, i) {
          var o;
          return o = t.filter(r.getClientRects(i), function(t) {
            return !e(t, n)
          }), a = a.concat(o), 0 === o.length
        }
        var a = [];
        return a.push(n), u(-1, e, v(o, i.isAbove), n.node), u(1, e, v(o, i.isBelow), n.node), a
      }

      function f(e) {
        return t.filter(t.toArray(e.getElementsByTagName("*")), m)
      }

      function h(e, t) {
        return {
          node: e.node,
          before: s(e, t) < l(e, t)
        }
      }

      function p(e, n, i) {
        var o, a;
        return o = r.getClientRects(f(e)), o = t.filter(o, function(e) {
          return i >= e.top && i <= e.bottom
        }), a = c(o, n), a && (a = c(d(e, a), n), a && m(a.node)) ? h(a, n) : null
      }
      var m = n.isContentEditableFalse,
        g = o.findNode,
        v = e.curry;
      return {
        findClosestClientRect: c,
        findLineNodeRects: d,
        closestCaret: p
      }
    }), r(Ye, [_], function(e) {
      function t(e) {
        function t(e) {
          return n(e)
        }

        function r(t) {
          c(e.getBody()).css("cursor", t)
        }

        function i(t) {
          return t == h.element || e.dom.isChildOf(t, h.element) ? !1 : n(t) ? !1 : !0
        }

        function o(t) {
          var n, i, o, a, s = 0,
            l = 0,
            u, d, p, m;
          0 === t.button && (n = t.screenX - h.screenX, i = t.screenY - h.screenY, u = Math.max(Math.abs(n), Math.abs(i)), !h.dragging && u > 10 && (h.dragging = !0, r("default"), h.clone = h.element.cloneNode(!0), o = f.getPos(h.element), h.relX = h.clientX - o.x, h.relY = h.clientY - o.y, h.width = h.element.offsetWidth, h.height = h.element.offsetHeight, c(h.clone).css({
            width: h.width,
            height: h.height
          }).removeAttr("data-mce-selected"), h.ghost = c("<div>").css({
            position: "absolute",
            opacity: .5,
            overflow: "hidden",
            width: h.width,
            height: h.height
          }).attr({
            "data-mce-bogus": "all",
            unselectable: "on",
            contenteditable: "false"
          }).addClass("mce-drag-container mce-reset").append(h.clone).appendTo(e.getBody())[0], a = e.dom.getViewPort(e.getWin()), h.maxX = a.w, h.maxY = a.h), h.dragging && (e.selection.placeCaretAt(t.clientX, t.clientY), d = h.clientX + n - h.relX, p = h.clientY + i + 5, d + h.width > h.maxX && (s = d + h.width - h.maxX), p + h.height > h.maxY && (l = p + h.height - h.maxY), m = "BODY" != e.getBody().nodeName ? e.getBody().getBoundingClientRect() : {
            left: 0,
            top: 0
          }, c(h.ghost).css({
            left: d - m.left,
            top: p - m.top,
            width: h.width - s,
            height: h.height - l
          })))
        }

        function a() {
          h.dragging && (e.selection.setRng(e.selection.getSel().getRangeAt(0)), i(e.selection.getNode()) && e.undoManager.transact(function() {
            e.insertContent(f.getOuterHTML(h.element)), c(h.element).remove()
          })), l()
        }

        function s(n) {
          if (l(), t(n.target)) {
            if (e.fire("dragstart", {
                target: n.target
              }).isDefaultPrevented()) return;
            e.on("mousemove", o), e.on("mouseup", a), u != d && (f.bind(u, "mousemove", o), f.bind(u, "mouseup", a)), h = {
              screenX: n.screenX,
              screenY: n.screenY,
              clientX: n.clientX,
              clientY: n.clientY,
              element: n.target
            }
          }
        }

        function l() {
          c(h.ghost).remove(), r(null), e.off("mousemove", o), e.off("mouseup", l), u != d && (f.unbind(u, "mousemove", o), f.unbind(u, "mouseup", l)), h = {}
        }
        var c = e.$,
          u = document,
          d = e.getDoc(),
          f = e.dom,
          h = {};
        e.on("mousedown", s), e.on("drop", function(t) {
          var r = e.getDoc().elementFromPoint(t.clientX, t.clientY);
          (n(r) || n(e.dom.getContentEditableParent(r))) && t.preventDefault()
        })
      }
      var n = e.isContentEditableFalse;
      return {
        init: t
      }
    }), r(Xe, [h, Ve, $, k, We, Ue, qe, je, _, T, I, z, p, u, Ye], function(e, t, n, r, i, o, a, s, l, c, u, d, f, h, p) {
      function m(e, t) {
        for (; t = e(t);)
          if (t.isVisible()) return t;
        return t
      }

      function g(c) {
        function d(e) {
          return c.dom.isBlock(e)
        }

        function g(e) {
          e && c.selection.setRng(e)
        }

        function N() {
          return c.selection.getRng()
        }

        function _(e, t) {
          c.selection.scrollIntoView(e, t)
        }

        function S(e, t, n) {
          var r;
          return r = c.fire("ShowCaret", {
            target: t,
            direction: e,
            before: n
          }), r.isDefaultPrevented() ? null : (_(t, -1 === e), Z.show(n, t))
        }

        function k(e) {
          var t;
          return t = c.fire("ObjectSelected", {
            target: e
          }), t.isDefaultPrevented() ? null : (Z.hide(), T(e))
        }

        function T(e) {
          var t = e.ownerDocument.createRange();
          return t.selectNode(e), t
        }

        function R(e, t) {
          var n = i.isInSameBlock(e, t);
          return !n && l.isBr(e.getNode()) ? !0 : n
        }

        function A(e, t) {
          return t = i.normalizeRange(e, K, t), -1 == e ? n.fromRangeStart(t) : n.fromRangeEnd(t)
        }

        function B(e) {
          return r.isCaretContainerBlock(e.startContainer)
        }

        function D(e, t, n, r) {
          var i, o, a, s;
          return !r.collapsed && (i = E(r), b(i)) ? S(e, i, -1 == e) : (s = B(r), o = A(e, r), n(o) ? k(o.getNode(-1 == e)) : (o = t(o)) ? n(o) ? S(e, o.getNode(-1 == e), 1 == e) : (a = t(o), n(a) && R(o, a) ? S(e, a.getNode(-1 == e), 1 == e) : s ? z(o.toRange()) : null) : s ? r : null)
        }

        function M(e, t, n) {
          var r, i, o, l, c, u, d, h, p;
          if (p = E(n), r = A(e, n), i = t(K, a.isAboveLine(1), r), o = f.filter(i, a.isLine(1)), c = f.last(r.getClientRects()), w(r) && (p = r.getNode()), x(r) && (p = r.getNode(!0)), !c) return null;
          if (u = c.left, l = s.findClosestClientRect(o, u), l && b(l.node)) return d = Math.abs(u - l.left), h = Math.abs(u - l.right), S(e, l.node, h > d);
          if (p) {
            var m = a.positionsUntil(e, K, a.isAboveLine(1), p);
            if (l = s.findClosestClientRect(f.filter(m, a.isLine(1)), u)) return z(l.position.toRange());
            if (l = f.last(f.filter(m, a.isLine(0)))) return z(l.position.toRange())
          }
        }

        function L(t, r) {
          function i() {
            var t = c.dom.create(c.settings.forced_root_block);
            return (!e.ie || e.ie >= 11) && (t.innerHTML = '<br data-mce-bogus="1">'), t
          }
          var o, a, s;
          if (r.collapsed && c.settings.forced_root_block) {
            if (o = c.dom.getParent(r.startContainer, "PRE"), !o) return;
            a = 1 == t ? J(n.fromRangeStart(r)) : Q(n.fromRangeStart(r)), a || (s = i(), 1 == t ? c.$(o).after(s) : c.$(o).before(s), c.selection.select(s, !0), c.selection.collapse())
          }
        }

        function P(e, t, n, r) {
          var i;
          return (i = D(e, t, n, r)) ? i : (i = L(e, r), i ? i : null)
        }

        function H(e, t, n) {
          var r;
          return (r = M(e, t, n)) ? r : (r = L(e, n), r ? r : null)
        }

        function O() {
          return ne("*[data-mce-caret]")[0]
        }

        function I(e) {
          e = ne(e), e.attr("data-mce-caret") && (Z.hide(), e.removeAttr("data-mce-caret"), e.removeAttr("data-mce-bogus"), e.removeAttr("style"), g(N()), _(e[0]))
        }

        function F(e) {
          var t;
          return e = i.normalizeRange(1, K, e), t = n.fromRangeStart(e), b(t.getNode()) ? S(1, t.getNode(), !t.isAtEnd()) : b(t.getNode(!0)) ? S(1, t.getNode(!0), !1) : (Z.hide(), null)
        }

        function z(e) {
          var t;
          return e && e.collapsed ? (t = F(e), t ? t : e) : e
        }

        function W(e) {
          var t, i, o, a;
          return b(e) ? (b(e.previousSibling) && (o = e.previousSibling), i = Q(n.before(e)), i || (t = J(n.after(e))), t && C(t.getNode()) && (a = t.getNode()), r.remove(e.previousSibling), r.remove(e.nextSibling), c.dom.remove(e), Y(), c.dom.isEmpty(c.getBody()) ? (c.setContent(""), void c.focus()) : o ? n.after(o).toRange() : a ? n.before(a).toRange() : i ? i.toRange() : t ? t.toRange() : null) : null
        }

        function V(e, t, n) {
          var r, i;
          return !n.collapsed && (r = E(n), b(r)) ? z(W(r)) : (i = A(e, n), t(i) ? z(W(i.getNode(-1 == e))) : void 0)
        }

        function U() {
          function e(e) {
            var t = e(N());
            return t ? (g(t), !0) : !1
          }

          function t(e) {
            for (var t = c.getBody(); e && e != t;) {
              if (y(e) || b(e)) return e;
              e = e.parentNode
            }
            return null
          }

          function r() {
            var e, r = t(c.selection.getNode());
            y(r) && d(r) && c.dom.isEmpty(r) && (e = c.dom.create("br", {
              "data-mce-bogus": "1"
            }), c.$(r).empty().append(e), c.selection.setRng(n.before(e).toRange()))
          }

          function i(e) {
            var t = O();
            if (t) return "compositionstart" == e.type ? (e.preventDefault(), e.stopPropagation(), void I(t)) : void("&nbsp;" != t.innerHTML && I(t))
          }

          function o(e) {
            var t;
            switch (e.keyCode) {
              case u.DELETE:
                t = r();
                break;
              case u.BACKSPACE:
                t = r()
            }
            t && e.preventDefault()
          }
          var l = v(P, 1, J, w),
            f = v(P, -1, Q, x),
            m = v(V, 1, w),
            C = v(V, -1, x),
            E = v(H, -1, a.upUntil),
            _ = v(H, 1, a.downUntil);
          c.on("mouseup", function() {
            var e = N();
            e.collapsed && g(F(e))
          }), c.on("mousedown", function(e) {
            var n;
            if (n = t(e.target)) b(n) ? (e.preventDefault(), j(k(n), !1)) : c.selection.placeCaretAt(e.clientX, e.clientY);
            else {
              Y(), Z.hide();
              var r = s.closestCaret(K, e.clientX, e.clientY);
              r && (e.preventDefault(), c.getBody().focus(), g(S(1, r.node, r.before)))
            }
          }), c.on("keydown", function(t) {
            var n;
            if (!u.modifierPressed(t)) {
              switch (t.keyCode) {
                case u.RIGHT:
                  n = e(l);
                  break;
                case u.DOWN:
                  n = e(_);
                  break;
                case u.LEFT:
                  n = e(f);
                  break;
                case u.UP:
                  n = e(E);
                  break;
                case u.DELETE:
                  n = e(m);
                  break;
                case u.BACKSPACE:
                  n = e(C);
                  break;
                default:
                  n = b(c.selection.getNode())
              }
              n && t.preventDefault()
            }
          }), c.on("keyup compositionstart", function(e) {
            i(e), o(e)
          }, !0), c.on("cut", function() {
            var e = c.selection.getNode();
            b(e) && h.setEditorTimeout(c, function() {
              g(z(W(e)))
            })
          }), c.on("getSelectionRange", function(e) {
            var t = e.range;
            if (te) {
              if (!te.parentNode) return void(te = null);
              t = t.cloneRange(), t.selectNode(te), e.range = t
            }
          }), c.on("setSelectionRange", function(e) {
            var t;
            t = j(e.range), t && (e.range = t)
          }), c.on("focus", function() {
            h.setEditorTimeout(c, function() {
              c.selection.setRng(z(c.selection.getRng()))
            })
          }), p.init(c)
        }

        function $() {
          var e = c.contentStyles,
            t = ".mce-content-body";
          e.push(Z.getCss()), e.push(t + " .mce-offscreen-selection {position: absolute;left: -9999999999px;width: 100pxheight: 100px}" + t + " *[contentEditable=false] {cursor: default;}" + t + " *[contentEditable=true] {cursor: text;}")
        }

        function q(e) {
          return r.isCaretContainer(e.startContainer) || r.isCaretContainer(e.endContainer)
        }

        function j(e, t) {
          var n, r = c.$,
            i = c.dom,
            o, a, s, l, u, d, f;
          if (!e) return Y(), null;
          if (e.collapsed) {
            if (Y(), !q(e)) {
              if (f = A(1, e), b(f.getNode())) return S(1, f.getNode(), !f.isAtEnd());
              if (b(f.getNode(!0))) return S(1, f.getNode(!0), !1)
            }
            return null
          }
          return s = e.startContainer, l = e.startOffset, u = e.endOffset, 3 == s.nodeType && 0 == l && b(s.parentNode) && (s = s.parentNode, l = i.nodeIndex(s), s = s.parentNode), 1 != s.nodeType ? (Y(), null) : (u == l + 1 && (n = s.childNodes[l]), b(n) ? t !== !1 && (d = c.fire("ObjectSelected", {
            target: n
          }), d.isDefaultPrevented()) ? (Y(), null) : (o = r("#" + ee), 0 === o.length && (o = r('<div data-mce-bogus="all" class="mce-offscreen-selection"></div>').attr("id", ee), o.appendTo(c.getBody())), o.empty().append("\xa0").append(n.cloneNode(!0)).append("\xa0").css({
            top: i.getPos(n, c.getBody()).y
          }), e = c.dom.createRng(), e.setStart(o[0].firstChild, 1), e.setEnd(o[0].lastChild, 0), c.getBody().focus(), o[0].focus(), a = c.selection.getSel(), a.removeAllRanges(), a.addRange(e), c.$("*[data-mce-selected]").removeAttr("data-mce-selected"), n.setAttribute("data-mce-selected", 1), te = n, e) : (Y(), null))
        }

        function Y() {
          te && (te.removeAttribute("data-mce-selected"), c.$("#" + ee).remove(), te = null)
        }

        function X() {
          Z.destroy(), te = null
        }
        var K = c.getBody(),
          G = new t(K),
          J = v(m, G.next),
          Q = v(m, G.prev),
          Z = new o(c.getBody(), d),
          ee = "sel-" + c.dom.uniqueId(),
          te, ne = c.$;
        return e.ceFalse && (U(), $()), {
          showBlockCaretContainer: I,
          destroy: X
        }
      }
      var v = d.curry,
        y = l.isContentEditableTrue,
        b = l.isContentEditableFalse,
        C = l.isElement,
        x = i.isAfterContentEditableFalse,
        w = i.isBeforeContentEditableFalse,
        E = c.getSelectedNode;
      return g
    }), r(Ke, [w, g, N, R, A, H, P, Y, G, J, Q, Z, ee, te, E, d, _e, Ae, B, M, De, h, m, u, Me, Le, Pe, ze, Xe], function(e, n, r, i, o, a, s, l, c, u, d, f, h, p, m, g, v, y, b, C, x, w, E, N, _, S, k, T, R) {
      function A(e, t, i) {
        var o = this,
          a, s;
        a = o.documentBaseUrl = i.documentBaseURL, s = i.baseURI, o.settings = t = L({
          id: e,
          theme: "modern",
          delta_width: 0,
          delta_height: 0,
          popup_css: "",
          plugins: "",
          document_base_url: a,
          add_form_submit_trigger: !0,
          submit_patch: !0,
          add_unload_trigger: !0,
          convert_urls: !0,
          relative_urls: !0,
          remove_script_host: !0,
          object_resizing: !0,
          doctype: "<!DOCTYPE html>",
          visual: !0,
          font_size_style_values: "xx-small,x-small,small,medium,large,x-large,xx-large",
          font_size_legacy_values: "xx-small,small,medium,large,x-large,xx-large,300%",
          forced_root_block: "p",
          hidden_input: !0,
          padd_empty_editor: !0,
          render_ui: !0,
          indentation: "30px",
          inline_styles: !0,
          convert_fonts_to_spans: !0,
          indent: "simple",
          indent_before: "p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",
          indent_after: "p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",
          validate: !0,
          entity_encoding: "named",
          url_converter: o.convertURL,
          url_converter_scope: o,
          ie7_compat: !0
        }, t), r.language = t.language || "en", r.languageLoad = t.language_load, r.baseURL = i.baseURL, o.id = t.id = e, o.setDirty(!1), o.plugins = {}, o.documentBaseURI = new p(t.document_base_url || a, {
          base_uri: s
        }), o.baseURI = s, o.contentCSS = [], o.contentStyles = [], o.shortcuts = new k(o), o.loadedCSS = {}, o.editorCommands = new h(o), t.target && (o.targetElm = t.target), o.suffix = i.suffix, o.editorManager = i, o.inline = t.inline, t.cache_suffix && (w.cacheSuffix = t.cache_suffix.replace(/^[\?\&]+/, "")), t.override_viewport === !1 && (w.overrideViewPort = !1), i.fire("SetupEditor", o), o.execCallback("setup", o), o.$ = n.overrideDefaults(function() {
          return {
            context: o.inline ? o.getBody() : o.getDoc(),
            element: o.getBody()
          }
        })
      }
      var B = e.DOM,
        D = r.ThemeManager,
        M = r.PluginManager,
        L = E.extend,
        P = E.each,
        H = E.explode,
        O = E.inArray,
        I = E.trim,
        F = E.resolve,
        z = g.Event,
        W = w.gecko,
        V = w.ie;
      return A.prototype = {
        render: function() {
          function e() {
            B.unbind(window, "ready", e), n.render()
          }

          function t() {
            var e = m.ScriptLoader;
            if (r.language && "en" != r.language && !r.language_url && (r.language_url = n.editorManager.baseURL + "/langs/" + r.language + ".js"), r.language_url && e.add(r.language_url), r.theme && "function" != typeof r.theme && "-" != r.theme.charAt(0) && !D.urls[r.theme]) {
              var t = r.theme_url;
              t = t ? n.documentBaseURI.toAbsolute(t) : "themes/" + r.theme + "/theme" + o + ".js", D.load(r.theme, t)
            }
            E.isArray(r.plugins) && (r.plugins = r.plugins.join(" ")), P(r.external_plugins, function(e, t) {
              M.load(t, e), r.plugins += " " + t
            }), P(r.plugins.split(/[ ,]/), function(e) {
              if (e = I(e), e && !M.urls[e])
                if ("-" == e.charAt(0)) {
                  e = e.substr(1, e.length);
                  var t = M.dependencies(e);
                  P(t, function(e) {
                    var t = {
                      prefix: "plugins/",
                      resource: e,
                      suffix: "/plugin" + o + ".js"
                    };
                    e = M.createUrl(t, e), M.load(e.resource, e)
                  })
                } else M.load(e, {
                  prefix: "plugins/",
                  resource: e,
                  suffix: "/plugin" + o + ".js"
                })
            }), e.loadQueue(function() {
              n.removed || n.init()
            })
          }
          var n = this,
            r = n.settings,
            i = n.id,
            o = n.suffix;
          if (!z.domLoaded) return void B.bind(window, "ready", e);
          if (n.getElement() && w.contentEditable) {
            r.inline ? n.inline = !0 : (n.orgVisibility = n.getElement().style.visibility, n.getElement().style.visibility = "hidden");
            var a = n.getElement().form || B.getParent(i, "form");
            a && (n.formElement = a, r.hidden_input && !/TEXTAREA|INPUT/i.test(n.getElement().nodeName) && (B.insertAfter(B.create("input", {
              type: "hidden",
              name: i
            }), i), n.hasHiddenInput = !0), n.formEventDelegate = function(e) {
              n.fire(e.type, e)
            }, B.bind(a, "submit reset", n.formEventDelegate), n.on("reset", function() {
              n.setContent(n.startContent, {
                format: "raw"
              })
            }), !r.submit_patch || a.submit.nodeType || a.submit.length || a._mceOldSubmit || (a._mceOldSubmit = a.submit, a.submit = function() {
              return n.editorManager.triggerSave(), n.setDirty(!1), a._mceOldSubmit(a)
            })), n.windowManager = new v(n), n.notificationManager = new y(n), "xml" == r.encoding && n.on("GetContent", function(e) {
              e.save && (e.content = B.encode(e.content))
            }), r.add_form_submit_trigger && n.on("submit", function() {
              n.initialized && n.save()
            }), r.add_unload_trigger && (n._beforeUnload = function() {
              !n.initialized || n.destroyed || n.isHidden() || n.save({
                format: "raw",
                no_events: !0,
                set_dirty: !1
              })
            }, n.editorManager.on("BeforeUnload", n._beforeUnload)), t()
          }
        },
        init: function() {
          function e(n) {
            var r = M.get(n),
              i, o;
            if (i = M.urls[n] || t.documentBaseUrl.replace(/\/$/, ""), n = I(n), r && -1 === O(m, n)) {
              if (P(M.dependencies(n), function(t) {
                  e(t)
                }), t.plugins[n]) return;
              o = new r(t, i, t.$), t.plugins[n] = o, o.init && (o.init(t, i), m.push(n))
            }
          }
          var t = this,
            n = t.settings,
            r = t.getElement(),
            i, o, a, s, l, c, u, d, f, h, p, m = [];
          if (this.editorManager.i18n.setCode(n.language), t.rtl = n.rtl_ui || this.editorManager.i18n.rtl, t.editorManager.add(t), n.aria_label = n.aria_label || B.getAttrib(r, "aria-label", t.getLang("aria.rich_text_area")), n.theme && ("function" != typeof n.theme ? (n.theme = n.theme.replace(/-/, ""), c = D.get(n.theme), t.theme = new c(t, D.urls[n.theme]), t.theme.init && t.theme.init(t, D.urls[n.theme] || t.documentBaseUrl.replace(/\/$/, ""), t.$)) : t.theme = n.theme), P(n.plugins.replace(/\-/g, "").split(/[ ,]/), e), n.render_ui && t.theme && (t.orgDisplay = r.style.display, "function" != typeof n.theme ? (i = n.width || r.style.width || r.offsetWidth, o = n.height || r.style.height || r.offsetHeight, a = n.min_height || 100, h = /^[0-9\.]+(|px)$/i, h.test("" + i) && (i = Math.max(parseInt(i, 10), 100)), h.test("" + o) && (o = Math.max(parseInt(o, 10), a)), l = t.theme.renderUI({
              targetNode: r,
              width: i,
              height: o,
              deltaWidth: n.delta_width,
              deltaHeight: n.delta_height
            }), n.content_editable || (o = (l.iframeHeight || o) + ("number" == typeof o ? l.deltaHeight || 0 : ""), a > o && (o = a))) : (l = n.theme(t, r), l.editorContainer.nodeType && (l.editorContainer = l.editorContainer.id = l.editorContainer.id || t.id + "_parent"), l.iframeContainer.nodeType && (l.iframeContainer = l.iframeContainer.id = l.iframeContainer.id || t.id + "_iframecontainer"), o = l.iframeHeight || r.offsetHeight), t.editorContainer = l.editorContainer), n.content_css && P(H(n.content_css), function(e) {
              t.contentCSS.push(t.documentBaseURI.toAbsolute(e))
            }), n.content_style && t.contentStyles.push(n.content_style), n.content_editable) return r = s = l = null, t.initContentBody();
          for (t.iframeHTML = n.doctype + "<html><head>", n.document_base_url != t.documentBaseUrl && (t.iframeHTML += '<base href="' + t.documentBaseURI.getURI() + '" />'), !w.caretAfter && n.ie7_compat && (t.iframeHTML += '<meta http-equiv="X-UA-Compatible" content="IE=7" />'), t.iframeHTML += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />', p = 0; p < t.contentCSS.length; p++) {
            var g = t.contentCSS[p];
            t.iframeHTML += '<link type="text/css" rel="stylesheet" href="' + E._addCacheSuffix(g) + '" />', t.loadedCSS[g] = !0
          }
          d = n.body_id || "tinymce", -1 != d.indexOf("=") && (d = t.getParam("body_id", "", "hash"), d = d[t.id] || d), f = n.body_class || "", -1 != f.indexOf("=") && (f = t.getParam("body_class", "", "hash"), f = f[t.id] || ""), n.content_security_policy && (t.iframeHTML += '<meta http-equiv="Content-Security-Policy" content="' + n.content_security_policy + '" />'), t.iframeHTML += '</head><body id="' + d + '" class="mce-content-body ' + f + '" data-id="' + t.id + '"><br></body></html>';
          var v = 'javascript:(function(){document.open();document.domain="' + document.domain + '";var ed = window.parent.tinymce.get("' + t.id + '");document.write(ed.iframeHTML);document.close();ed.initContentBody(true);})()';
          document.domain != location.hostname && w.ie && w.ie < 12 && (u = v);
          var y = B.create("iframe", {
            id: t.id + "_ifr",
            frameBorder: "0",
            allowTransparency: "true",
            title: t.editorManager.translate("Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"),
            style: {
              width: "100%",
              height: o,
              display: "block"
            }
          });
          if (y.onload = function() {
              y.onload = null, t.fire("load")
            }, B.setAttrib(y, "src", u || 'javascript:""'), t.contentAreaContainer = l.iframeContainer, t.iframeElement = y, s = B.add(l.iframeContainer, y), V) try {
            t.getDoc()
          } catch (b) {
            s.src = u = v
          }
          l.editorContainer && (B.get(l.editorContainer).style.display = t.orgDisplay, t.hidden = B.isHidden(l.editorContainer)), t.getElement().style.display = "none", B.setAttrib(t.id, "aria-hidden", !0), u || t.initContentBody(), r = s = l = null
        },
        initContentBody: function(t) {
          var n = this,
            r = n.settings,
            s = n.getElement(),
            h = n.getDoc(),
            p, m;
          r.inline || (n.getElement().style.visibility = n.orgVisibility), t || r.content_editable || (h.open(), h.write(n.iframeHTML), h.close()), r.content_editable && (n.on("remove", function() {
            var e = this.getBody();
            B.removeClass(e, "mce-content-body"), B.removeClass(e, "mce-edit-focus"), B.setAttrib(e, "contentEditable", null)
          }), B.addClass(s, "mce-content-body"), n.contentDocument = h = r.content_document || document, n.contentWindow = r.content_window || window, n.bodyElement = s, r.content_document = r.content_window = null, r.root_name = s.nodeName.toLowerCase()), p = n.getBody(), p.disabled = !0, n.readonly = r.readonly, n.readonly || (n.inline && "static" == B.getStyle(p, "position", !0) && (p.style.position = "relative"), p.contentEditable = n.getParam("content_editable_state", !0)), p.disabled = !1, n.editorUpload = new T(n), n.schema = new b(r), n.dom = new e(h, {
            keep_values: !0,
            url_converter: n.convertURL,
            url_converter_scope: n,
            hex_colors: r.force_hex_style_colors,
            class_filter: r.class_filter,
            update_styles: !0,
            root_element: n.inline ? n.getBody() : null,
            collect: r.content_editable,
            schema: n.schema,
            onSetAttrib: function(e) {
              n.fire("SetAttrib", e)
            }
          }), n.parser = new C(r, n.schema), n.parser.addAttributeFilter("src,href,style,tabindex", function(e, t) {
            for (var r = e.length, i, o = n.dom, a, s; r--;)
              if (i = e[r], a = i.attr(t), s = "data-mce-" + t, !i.attributes.map[s]) {
                if (0 === a.indexOf("data:") || 0 === a.indexOf("blob:")) continue;
                "style" === t ? (a = o.serializeStyle(o.parseStyle(a), i.name), a.length || (a = null), i.attr(s, a), i.attr(t, a)) : "tabindex" === t ? (i.attr(s, a), i.attr(t, null)) : i.attr(s, n.convertURL(a, t, i.name))
              }
          }), n.parser.addNodeFilter("script", function(e) {
            for (var t = e.length, n, r; t--;) n = e[t], r = n.attr("type") || "no/type", 0 !== r.indexOf("mce-") && n.attr("type", "mce-" + r)
          }), n.parser.addNodeFilter("#cdata", function(e) {
            for (var t = e.length, n; t--;) n = e[t], n.type = 8, n.name = "#comment", n.value = "[CDATA[" + n.value + "]]"
          }), n.parser.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div", function(e) {
            for (var t = e.length, r, i = n.schema.getNonEmptyElements(); t--;) r = e[t], r.isEmpty(i) && (r.append(new o("br", 1)).shortEnded = !0)
          }), n.serializer = new a(r, n), n.selection = new l(n.dom, n.getWin(), n.serializer, n), n.formatter = new c(n), n.undoManager = new u(n), n.forceBlocks = new f(n), n.enterKey = new d(n), n._nodeChangeDispatcher = new i(n), n._selectionOverrides = new R(n), n.fire("PreInit"), r.browser_spellcheck || r.gecko_spellcheck || (h.body.spellcheck = !1, B.setAttrib(p, "spellcheck", "false")), n.fire("PostRender"), n.quirks = new x(n), r.directionality && (p.dir = r.directionality), r.nowrap && (p.style.whiteSpace = "nowrap"), r.protect && n.on("BeforeSetContent", function(e) {
            P(r.protect, function(t) {
              e.content = e.content.replace(t, function(e) {
                return "<!--mce:protected " + escape(e) + "-->"
              })
            })
          }), n.on("SetContent", function() {
            n.addVisual(n.getBody())
          }), r.padd_empty_editor && n.on("PostProcess", function(e) {
            e.content = e.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/, "")
          }), n.load({
            initial: !0,
            format: "html"
          }), n.startContent = n.getContent({
            format: "raw"
          }), n.initialized = !0, n.bindPendingEventDelegates(), n.fire("init"), n.focus(!0), n.nodeChanged({
            initial: !0
          }), n.execCallback("init_instance_callback", n), n.contentStyles.length > 0 && (m = "", P(n.contentStyles, function(e) {
            m += e + "\r\n"
          }), n.dom.addStyle(m)), P(n.contentCSS, function(e) {
            n.loadedCSS[e] || (n.dom.loadCSS(e), n.loadedCSS[e] = !0)
          }), r.auto_focus && N.setEditorTimeout(n, function() {
            var e;
            e = r.auto_focus === !0 ? n : n.editorManager.get(r.auto_focus), e.destroyed || e.focus()
          }, 100), s = h = p = null
        },
        focus: function(e) {
          function t(e) {
            return n.dom.getParent(e, function(e) {
              return "true" === n.dom.getContentEditable(e)
            })
          }
          var n = this,
            r = n.selection,
            i = n.settings.content_editable,
            o, a, s = n.getDoc(),
            l = n.getBody(),
            c;
          if (!e) {
            if (o = r.getRng(), o.item && (a = o.item(0)), n._refreshContentEditable(), c = t(r.getNode()), n.$.contains(l, c)) return c.focus(), r.normalize(), void n.editorManager.setActive(n);
            if (i || (w.opera || n.getBody().focus(), n.getWin().focus()), W || i) {
              if (l.setActive) try {
                l.setActive()
              } catch (u) {
                l.focus()
              } else l.focus();
              i && r.normalize()
            }
            a && a.ownerDocument == s && (o = s.body.createControlRange(), o.addElement(a), o.select())
          }
          n.editorManager.setActive(n)
        },
        execCallback: function(e) {
          var t = this,
            n = t.settings[e],
            r;
          if (n) return t.callbackLookup && (r = t.callbackLookup[e]) && (n = r.func, r = r.scope), "string" == typeof n && (r = n.replace(/\.\w+$/, ""), r = r ? F(r) : 0, n = F(n), t.callbackLookup = t.callbackLookup || {}, t.callbackLookup[e] = {
            func: n,
            scope: r
          }), n.apply(r || t, Array.prototype.slice.call(arguments, 1))
        },
        translate: function(e) {
          var t = this.settings.language || "en",
            n = this.editorManager.i18n;
          return e ? n.data[t + "." + e] || e.replace(/\{\#([^\}]+)\}/g, function(e, r) {
            return n.data[t + "." + r] || "{#" + r + "}"
          }) : ""
        },
        getLang: function(e, n) {
          return this.editorManager.i18n.data[(this.settings.language || "en") + "." + e] || (n !== t ? n : "{#" + e + "}")
        },
        getParam: function(e, t, n) {
          var r = e in this.settings ? this.settings[e] : t,
            i;
          return "hash" === n ? (i = {}, "string" == typeof r ? P(r.indexOf("=") > 0 ? r.split(/[;,](?![^=;,]*(?:[;,]|$))/) : r.split(","), function(e) {
            e = e.split("="), e.length > 1 ? i[I(e[0])] = I(e[1]) : i[I(e[0])] = I(e)
          }) : i = r, i) : r
        },
        nodeChanged: function(e) {
          this._nodeChangeDispatcher.nodeChanged(e)
        },
        addButton: function(e, t) {
          var n = this;
          t.cmd && (t.onclick = function() {
            n.execCommand(t.cmd)
          }), t.text || t.icon || (t.icon = e), n.buttons = n.buttons || {}, t.tooltip = t.tooltip || t.title, n.buttons[e] = t
        },
        addMenuItem: function(e, t) {
          var n = this;
          t.cmd && (t.onclick = function() {
            n.execCommand(t.cmd)
          }), n.menuItems = n.menuItems || {}, n.menuItems[e] = t
        },
        addContextToolbar: function(e, t) {
          var n = this,
            r;
          n.contextToolbars = n.contextToolbars || [], "string" == typeof e && (r = e, e = function(e) {
            return n.dom.is(e, r)
          }), n.contextToolbars.push({
            predicate: e,
            items: t
          })
        },
        addCommand: function(e, t, n) {
          this.editorCommands.addCommand(e, t, n)
        },
        addQueryStateHandler: function(e, t, n) {
          this.editorCommands.addQueryStateHandler(e, t, n)
        },
        addQueryValueHandler: function(e, t, n) {
          this.editorCommands.addQueryValueHandler(e, t, n)
        },
        addShortcut: function(e, t, n, r) {
          this.shortcuts.add(e, t, n, r)
        },
        execCommand: function(e, t, n, r) {
          return this.editorCommands.execCommand(e, t, n, r)
        },
        queryCommandState: function(e) {
          return this.editorCommands.queryCommandState(e)
        },
        queryCommandValue: function(e) {
          return this.editorCommands.queryCommandValue(e)
        },
        queryCommandSupported: function(e) {
          return this.editorCommands.queryCommandSupported(e)
        },
        show: function() {
          var e = this;
          e.hidden && (e.hidden = !1, e.inline ? e.getBody().contentEditable = !0 : (B.show(e.getContainer()), B.hide(e.id)), e.load(), e.fire("show"))
        },
        hide: function() {
          var e = this,
            t = e.getDoc();
          e.hidden || (V && t && !e.inline && t.execCommand("SelectAll"), e.save(), e.inline ? (e.getBody().contentEditable = !1, e == e.editorManager.focusedEditor && (e.editorManager.focusedEditor = null)) : (B.hide(e.getContainer()), B.setStyle(e.id, "display", e.orgDisplay)), e.hidden = !0, e.fire("hide"))
        },
        isHidden: function() {
          return !!this.hidden
        },
        setProgressState: function(e, t) {
          this.fire("ProgressState", {
            state: e,
            time: t
          })
        },
        load: function(e) {
          var n = this,
            r = n.getElement(),
            i;
          return r ? (e = e || {}, e.load = !0, i = n.setContent(r.value !== t ? r.value : r.innerHTML, e), e.element = r, e.no_events || n.fire("LoadContent", e), e.element = r = null, i) : void 0
        },
        save: function(e) {
          var t = this,
            n = t.getElement(),
            r, i;
          if (n && t.initialized) return e = e || {}, e.save = !0, e.element = n, r = e.content = t.getContent(e), e.no_events || t.fire("SaveContent", e), "raw" == e.format && t.fire("RawSaveContent", e), r = e.content, /TEXTAREA|INPUT/i.test(n.nodeName) ? n.value = r : (t.inline || (n.innerHTML = r), (i = B.getParent(t.id, "form")) && P(i.elements, function(e) {
            return e.name == t.id ? (e.value = r, !1) : void 0
          })), e.element = n = null, e.set_dirty !== !1 && t.setDirty(!1), r
        },
        setContent: function(e, t) {
          var n = this,
            r = n.getBody(),
            i, o;
          return t = t || {}, t.format = t.format || "html", t.set = !0, t.content = e, t.no_events || n.fire("BeforeSetContent", t), e = t.content, 0 === e.length || /^\s+$/.test(e) ? (o = V && 11 > V ? "" : '<br data-mce-bogus="1">', "TABLE" == r.nodeName ? e = "<tr><td>" + o + "</td></tr>" : /^(UL|OL)$/.test(r.nodeName) && (e = "<li>" + o + "</li>"), i = n.settings.forced_root_block, i && n.schema.isValidChild(r.nodeName.toLowerCase(), i.toLowerCase()) ? (e = o, e = n.dom.createHTML(i, n.settings.forced_root_block_attrs, e)) : V || e || (e = '<br data-mce-bogus="1">'), n.dom.setHTML(r, e), n.fire("SetContent", t)) : ("raw" !== t.format && (e = new s({
            validate: n.validate
          }, n.schema).serialize(n.parser.parse(e, {
            isRootContent: !0
          }))), t.content = I(e), n.dom.setHTML(r, t.content), t.no_events || n.fire("SetContent", t)), t.content
        },
        getContent: function(e) {
          var t = this,
            n, r = t.getBody();
          return e = e || {}, e.format = e.format || "html", e.get = !0, e.getInner = !0, e.no_events || t.fire("BeforeGetContent", e), n = "raw" == e.format ? t.serializer.getTrimmedContent() : "text" == e.format ? r.innerText || r.textContent : t.serializer.serialize(r, e), "text" != e.format ? e.content = I(n) : e.content = n, e.no_events || t.fire("GetContent", e), e.content
        },
        insertContent: function(e, t) {
          t && (e = L({
            content: e
          }, t)), this.execCommand("mceInsertContent", !1, e)
        },
        isDirty: function() {
          return !this.isNotDirty
        },
        setDirty: function(e) {
          var t = !this.isNotDirty;
          this.isNotDirty = !e, e && e != t && this.fire("dirty")
        },
        setMode: function(e) {
          S.setMode(this, e)
        },
        getContainer: function() {
          var e = this;
          return e.container || (e.container = B.get(e.editorContainer || e.id + "_parent")), e.container
        },
        getContentAreaContainer: function() {
          return this.contentAreaContainer
        },
        getElement: function() {
          return this.targetElm || (this.targetElm = B.get(this.id)), this.targetElm
        },
        getWin: function() {
          var e = this,
            t;
          return e.contentWindow || (t = e.iframeElement, t && (e.contentWindow = t.contentWindow)), e.contentWindow
        },
        getDoc: function() {
          var e = this,
            t;
          return e.contentDocument || (t = e.getWin(), t && (e.contentDocument = t.document)), e.contentDocument
        },
        getBody: function() {
          return this.bodyElement || this.getDoc().body
        },
        convertURL: function(e, t, n) {
          var r = this,
            i = r.settings;
          return i.urlconverter_callback ? r.execCallback("urlconverter_callback", e, n, !0, t) : !i.convert_urls || n && "LINK" == n.nodeName || 0 === e.indexOf("file:") || 0 === e.length ? e : i.relative_urls ? r.documentBaseURI.toRelative(e) : e = r.documentBaseURI.toAbsolute(e, i.remove_script_host)
        },
        addVisual: function(e) {
          var n = this,
            r = n.settings,
            i = n.dom,
            o;
          e = e || n.getBody(), n.hasVisual === t && (n.hasVisual = r.visual), P(i.select("table,a", e), function(e) {
            var t;
            switch (e.nodeName) {
              case "TABLE":
                return o = r.visual_table_class || "mce-item-table", t = i.getAttrib(e, "border"), void(t && "0" != t || !n.hasVisual ? i.removeClass(e, o) : i.addClass(e, o));
              case "A":
                return void(i.getAttrib(e, "href", !1) || (t = i.getAttrib(e, "name") || e.id, o = r.visual_anchor_class || "mce-item-anchor", t && n.hasVisual ? i.addClass(e, o) : i.removeClass(e, o)))
            }
          }), n.fire("VisualAid", {
            element: e,
            hasVisual: n.hasVisual
          })
        },
        remove: function() {
          var e = this;
          e.removed || (e.save(), e.removed = 1, e.unbindAllNativeEvents(), e.hasHiddenInput && B.remove(e.getElement().nextSibling), e.inline || (V && 10 > V && e.getDoc().execCommand("SelectAll", !1, null), B.setStyle(e.id, "display", e.orgDisplay), e.getBody().onload = null), e.fire("remove"), e.editorManager.remove(e), B.remove(e.getContainer()), e._selectionOverrides.destroy(), e.editorUpload.destroy(), e.destroy())
        },
        destroy: function(e) {
          var t = this,
            n;
          if (!t.destroyed) {
            if (!e && !t.removed) return void t.remove();
            e || (t.editorManager.off("beforeunload", t._beforeUnload), t.theme && t.theme.destroy && t.theme.destroy(), t.selection.destroy(), t.dom.destroy()), n = t.formElement, n && (n._mceOldSubmit && (n.submit = n._mceOldSubmit, n._mceOldSubmit = null), B.unbind(n, "submit reset", t.formEventDelegate)), t.contentAreaContainer = t.formElement = t.container = t.editorContainer = null, t.bodyElement = t.contentDocument = t.contentWindow = null, t.iframeElement = t.targetElm = null, t.selection && (t.selection = t.selection.win = t.selection.dom = t.selection.dom.doc = null), t.destroyed = 1
          }
        },
        uploadImages: function(e) {
          return this.editorUpload.uploadImages(e)
        },
        _scanForImages: function() {
          return this.editorUpload.scanForImages()
        },
        _refreshContentEditable: function() {
          var e = this,
            t, n;
          e._isHidden() && (t = e.getBody(), n = t.parentNode, n.removeChild(t), n.appendChild(t), t.focus())
        },
        _isHidden: function() {
          var e;
          return W ? (e = this.selection.getSel(), !e || !e.rangeCount || 0 === e.rangeCount) : 0
        }
      }, L(A.prototype, _), A
    }), r(Ge, [], function() {
      var e = {},
        t = "en";
      return {
        setCode: function(e) {
          e && (t = e, this.rtl = this.data[e] ? "rtl" === this.data[e]._dir : !1)
        },
        getCode: function() {
          return t
        },
        rtl: !1,
        add: function(t, n) {
          var r = e[t];
          r || (e[t] = r = {});
          for (var i in n) r[i] = n[i];
          this.setCode(t)
        },
        translate: function(n) {
          var r;
          if (r = e[t], r || (r = {}), "undefined" == typeof n) return n;
          if ("string" != typeof n && n.raw) return n.raw;
          if (n.push) {
            var i = n.slice(1);
            n = (r[n[0]] || n[0]).replace(/\{([0-9]+)\}/g, function(e, t) {
              return i[t]
            })
          }
          return (r[n] || n).replace(/{context:\w+}$/, "")
        },
        data: e
      }
    }), r(Je, [w, u, h], function(e, t, n) {
        function r(e) {
          function l() {
            try {
              return document.activeElement
            } catch (e) {
              return document.body
            }
          }

          function c(e, t) {
            if (t && t.startContainer) {
              if (!e.isChildOf(t.startContainer, e.getRoot()) || !e.isChildOf(t.endContainer, e.getRoot())) return;
              return {
                startContainer: t.startContainer,
                startOffset: t.startOffset,
                endContainer: t.endContainer,
                endOffset: t.endOffset
              }
            }
            return t
          }

          function u(e, t) {
            var n;
            return t.startContainer ? (n = e.getDoc().createRange(), n.setStart(t.startContainer, t.startOffset), n.setEnd(t.endContainer, t.endOffset)) : n = t, n
          }

          function d(e) {
            return !!s.getParent(e, r.isEditorUIElement)
          }

          function f(r) {
            var f = r.editor;
            f.on("init", function() {
                (f.inline || n.ie) && ("onbeforedeactivate" in document && n.ie < 9 ? f.dom.bind(f.getBody(), "beforedeactivate", function(e) {
                  if (e.target == f.getBody()) try {
                    f.lastRng = f.selection.getRng()
                  } catch (t) {}
                }) : f.on("nodechange mouseup keyup", function(e) {
                  var t = l();
                  "nodechange" == e.type && e.selectionChange || (t && t.id == f.id + "_ifr" && (t = f.getBody()), f.dom.isChildOf(t, f.getBody()) && (f.lastRng = f.selection.getRng()))
                }), n.webkit && !i && (i = function() {
                  var t = e.activeEditor;
                  if (t && t.selection) {
                    var n = t.selection.getRng();
                    n && !n.collapsed && (f.lastRng = n)
                  }
                }, s.bind(document, "selectionchange", i)))
              }), f.on("setcontent", function() {
                f.lastRng = null
              }), f.on("mousedown", function() {
                f.selection.lastFocusBookmark = null
              }), f.on("focusin", function() {
                var t = e.focusedEditor,
                  n;
                f.selection.lastFocusBookmark && (n = u(f, f.selection.lastFocusBookmark), f.selection.lastFocusBookmark = null, f.selection.setRng(n)), t != f && (t && t.fire("blur", {
                  focusedEditor: f
                }), e.setActive(f), e.focusedEditor = f, f.fire("focus", {
                  blurredEditor: t
                }), f.focus(!0)), f.lastRng = null
              }), f.on("focusout", function() {
                  t.setEditorTimeout(f, function() {
                        var t = e.focusedEditor;
                        d(l()) || t != f || (f.fire("blur", {
                              focusedEditor: null
                            }), e.focusedEditor = null, f.selection && (f.selection.lastFocusBo