﻿!(function (a, b, c) {
  var d = a.L,
    e = {};
  (e.version = "0.7.3"),
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = e)
      : "function" == typeof define && define.amd && define(e),
    (e.noConflict = function () {
      return (a.L = d), this;
    }),
    (a.L = e),
    (e.Util = {
      extend: function (a) {
        var c,
          d,
          e,
          f,
          b = Array.prototype.slice.call(arguments, 1);
        for (d = 0, e = b.length; e > d; d++) {
          f = b[d] || {};
          for (c in f) f.hasOwnProperty(c) && (a[c] = f[c]);
        }
        return a;
      },
      bind: function (a, b) {
        var c =
          arguments.length > 2
            ? Array.prototype.slice.call(arguments, 2)
            : null;
        return function () {
          return a.apply(b, c || arguments);
        };
      },
      stamp: (function () {
        var a = 0,
          b = "_leaflet_id";
        return function (c) {
          return (c[b] = c[b] || ++a), c[b];
        };
      })(),
      invokeEach: function (a, b, c) {
        var d, e;
        if ("object" == typeof a) {
          e = Array.prototype.slice.call(arguments, 3);
          for (d in a) b.apply(c, [d, a[d]].concat(e));
          return !0;
        }
        return !1;
      },
      limitExecByInterval: function (a, b, c) {
        var d, e;
        return function f() {
          var g = arguments;
          return d
            ? ((e = !0), void 0)
            : ((d = !0),
              setTimeout(function () {
                (d = !1), e && (f.apply(c, g), (e = !1));
              }, b),
              a.apply(c, g),
              void 0);
        };
      },
      falseFn: function () {
        return !1;
      },
      formatNum: function (a, b) {
        var c = Math.pow(10, b || 5);
        return Math.round(a * c) / c;
      },
      trim: function (a) {
        return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "");
      },
      splitWords: function (a) {
        return e.Util.trim(a).split(/\s+/);
      },
      setOptions: function (a, b) {
        return (a.options = e.extend({}, a.options, b)), a.options;
      },
      getParamString: function (a, b, c) {
        var d = [];
        for (var e in a)
          d.push(
            encodeURIComponent(c ? e.toUpperCase() : e) +
              "=" +
              encodeURIComponent(a[e])
          );
        return (b && -1 !== b.indexOf("?") ? "&" : "?") + d.join("&");
      },
      template: function (a, b) {
        return a.replace(/\{ *([\w_]+) *\}/g, function (a, d) {
          var e = b[d];
          if (e === c) throw new Error("No value provided for variable " + a);
          return "function" == typeof e && (e = e(b)), e;
        });
      },
      isArray:
        Array.isArray ||
        function (a) {
          return "[object Array]" === Object.prototype.toString.call(a);
        },
      emptyImageUrl:
        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
    }),
    (function () {
      function b(b) {
        var c,
          d,
          e = ["webkit", "moz", "o", "ms"];
        for (c = 0; c < e.length && !d; c++) d = a[e[c] + b];
        return d;
      }
      function d(b) {
        var d = +new Date(),
          e = Math.max(0, 16 - (d - c));
        return (c = d + e), a.setTimeout(b, e);
      }
      var c = 0,
        f = a.requestAnimationFrame || b("RequestAnimationFrame") || d,
        g =
          a.cancelAnimationFrame ||
          b("CancelAnimationFrame") ||
          b("CancelRequestAnimationFrame") ||
          function (b) {
            a.clearTimeout(b);
          };
      (e.Util.requestAnimFrame = function (b, c, g, h) {
        return (
          (b = e.bind(b, c)), g && f === d ? (b(), void 0) : f.call(a, b, h)
        );
      }),
        (e.Util.cancelAnimFrame = function (b) {
          b && g.call(a, b);
        });
    })(),
    (e.extend = e.Util.extend),
    (e.bind = e.Util.bind),
    (e.stamp = e.Util.stamp),
    (e.setOptions = e.Util.setOptions),
    (e.Class = function () {}),
    (e.Class.extend = function (a) {
      var b = function () {
          this.initialize && this.initialize.apply(this, arguments),
            this._initHooks && this.callInitHooks();
        },
        c = function () {};
      c.prototype = this.prototype;
      var d = new c();
      (d.constructor = b), (b.prototype = d);
      for (var f in this)
        this.hasOwnProperty(f) && "prototype" !== f && (b[f] = this[f]);
      a.statics && (e.extend(b, a.statics), delete a.statics),
        a.includes &&
          (e.Util.extend.apply(null, [d].concat(a.includes)),
          delete a.includes),
        a.options &&
          d.options &&
          (a.options = e.extend({}, d.options, a.options)),
        e.extend(d, a),
        (d._initHooks = []);
      var g = this;
      return (
        (b.__super__ = g.prototype),
        (d.callInitHooks = function () {
          if (!this._initHooksCalled) {
            g.prototype.callInitHooks && g.prototype.callInitHooks.call(this),
              (this._initHooksCalled = !0);
            for (var a = 0, b = d._initHooks.length; b > a; a++)
              d._initHooks[a].call(this);
          }
        }),
        b
      );
    }),
    (e.Class.include = function (a) {
      e.extend(this.prototype, a);
    }),
    (e.Class.mergeOptions = function (a) {
      e.extend(this.prototype.options, a);
    }),
    (e.Class.addInitHook = function (a) {
      var b = Array.prototype.slice.call(arguments, 1),
        c =
          "function" == typeof a
            ? a
            : function () {
                this[a].apply(this, b);
              };
      (this.prototype._initHooks = this.prototype._initHooks || []),
        this.prototype._initHooks.push(c);
    });
  var f = "_leaflet_events";
  (e.Mixin = {}),
    (e.Mixin.Events = {
      addEventListener: function (a, b, c) {
        if (e.Util.invokeEach(a, this.addEventListener, this, b, c))
          return this;
        var h,
          i,
          j,
          k,
          l,
          m,
          n,
          d = (this[f] = this[f] || {}),
          g = c && c !== this && e.stamp(c);
        for (a = e.Util.splitWords(a), h = 0, i = a.length; i > h; h++)
          (j = { action: b, context: c || this }),
            (k = a[h]),
            g
              ? ((l = k + "_idx"),
                (m = l + "_len"),
                (n = d[l] = d[l] || {}),
                n[g] || ((n[g] = []), (d[m] = (d[m] || 0) + 1)),
                n[g].push(j))
              : ((d[k] = d[k] || []), d[k].push(j));
        return this;
      },
      hasEventListeners: function (a) {
        var b = this[f];
        return (
          !!b &&
          ((a in b && b[a].length > 0) ||
            (a + "_idx" in b && b[a + "_idx_len"] > 0))
        );
      },
      removeEventListener: function (a, b, c) {
        if (!this[f]) return this;
        if (!a) return this.clearAllEventListeners();
        if (e.Util.invokeEach(a, this.removeEventListener, this, b, c))
          return this;
        var h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          d = this[f],
          g = c && c !== this && e.stamp(c);
        for (a = e.Util.splitWords(a), h = 0, i = a.length; i > h; h++)
          if (((j = a[h]), (m = j + "_idx"), (n = m + "_len"), (o = d[m]), b)) {
            if ((k = g && o ? o[g] : d[j])) {
              for (l = k.length - 1; l >= 0; l--)
                k[l].action !== b ||
                  (c && k[l].context !== c) ||
                  ((p = k.splice(l, 1)), (p[0].action = e.Util.falseFn));
              c && o && 0 === k.length && (delete o[g], d[n]--);
            }
          } else delete d[j], delete d[m], delete d[n];
        return this;
      },
      clearAllEventListeners: function () {
        return delete this[f], this;
      },
      fireEvent: function (a, b) {
        if (!this.hasEventListeners(a)) return this;
        var g,
          h,
          i,
          j,
          k,
          c = e.Util.extend({}, b, { type: a, target: this }),
          d = this[f];
        if (d[a])
          for (g = d[a].slice(), h = 0, i = g.length; i > h; h++)
            g[h].action.call(g[h].context, c);
        j = d[a + "_idx"];
        for (k in j)
          if ((g = j[k].slice()))
            for (h = 0, i = g.length; i > h; h++)
              g[h].action.call(g[h].context, c);
        return this;
      },
      addOneTimeEventListener: function (a, b, c) {
        if (e.Util.invokeEach(a, this.addOneTimeEventListener, this, b, c))
          return this;
        var d = e.bind(function () {
          this.removeEventListener(a, b, c).removeEventListener(a, d, c);
        }, this);
        return this.addEventListener(a, b, c).addEventListener(a, d, c);
      },
    }),
    (e.Mixin.Events.on = e.Mixin.Events.addEventListener),
    (e.Mixin.Events.off = e.Mixin.Events.removeEventListener),
    (e.Mixin.Events.once = e.Mixin.Events.addOneTimeEventListener),
    (e.Mixin.Events.fire = e.Mixin.Events.fireEvent),
    (function () {
      var d = "ActiveXObject" in a,
        f = d && !b.addEventListener,
        g = navigator.userAgent.toLowerCase(),
        h = -1 !== g.indexOf("webkit"),
        i = -1 !== g.indexOf("chrome"),
        j = -1 !== g.indexOf("phantom"),
        k = -1 !== g.indexOf("android"),
        l = -1 !== g.search("android [23]"),
        m = -1 !== g.indexOf("gecko"),
        n = typeof orientation != c + "",
        o =
          a.navigator &&
          a.navigator.msPointerEnabled &&
          a.navigator.msMaxTouchPoints &&
          !a.PointerEvent,
        p =
          (a.PointerEvent &&
            a.navigator.pointerEnabled &&
            a.navigator.maxTouchPoints) ||
          o,
        q =
          ("devicePixelRatio" in a && a.devicePixelRatio > 1) ||
          ("matchMedia" in a &&
            a.matchMedia("(min-resolution:144dpi)") &&
            a.matchMedia("(min-resolution:144dpi)").matches),
        r = b.documentElement,
        s = d && "transition" in r.style,
        t = "WebKitCSSMatrix" in a && "m11" in new a.WebKitCSSMatrix() && !l,
        u = "MozPerspective" in r.style,
        v = "OTransition" in r.style,
        w = !a.L_DISABLE_3D && (s || t || u || v) && !j,
        x =
          !a.L_NO_TOUCH &&
          !j &&
          (function () {
            var a = "ontouchstart";
            if (p || a in r) return !0;
            var c = b.createElement("div"),
              d = !1;
            return c.setAttribute
              ? (c.setAttribute(a, "return;"),
                "function" == typeof c[a] && (d = !0),
                c.removeAttribute(a),
                (c = null),
                d)
              : !1;
          })();
      e.Browser = {
        ie: d,
        ielt9: f,
        webkit: h,
        gecko: m && !h && !a.opera && !d,
        android: k,
        android23: l,
        chrome: i,
        ie3d: s,
        webkit3d: t,
        gecko3d: u,
        opera3d: v,
        any3d: w,
        mobile: n,
        mobileWebkit: n && h,
        mobileWebkit3d: n && t,
        mobileOpera: n && a.opera,
        touch: x,
        msPointer: o,
        pointer: p,
        retina: q,
      };
    })(),
    (e.Point = function (a, b, c) {
      (this.x = c ? Math.round(a) : a), (this.y = c ? Math.round(b) : b);
    }),
    (e.Point.prototype = {
      clone: function () {
        return new e.Point(this.x, this.y);
      },
      add: function (a) {
        return this.clone()._add(e.point(a));
      },
      _add: function (a) {
        return (this.x += a.x), (this.y += a.y), this;
      },
      subtract: function (a) {
        return this.clone()._subtract(e.point(a));
      },
      _subtract: function (a) {
        return (this.x -= a.x), (this.y -= a.y), this;
      },
      divideBy: function (a) {
        return this.clone()._divideBy(a);
      },
      _divideBy: function (a) {
        return (this.x /= a), (this.y /= a), this;
      },
      multiplyBy: function (a) {
        return this.clone()._multiplyBy(a);
      },
      _multiplyBy: function (a) {
        return (this.x *= a), (this.y *= a), this;
      },
      round: function () {
        return this.clone()._round();
      },
      _round: function () {
        return (
          (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this
        );
      },
      floor: function () {
        return this.clone()._floor();
      },
      _floor: function () {
        return (
          (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this
        );
      },
      distanceTo: function (a) {
        a = e.point(a);
        var b = a.x - this.x,
          c = a.y - this.y;
        return Math.sqrt(b * b + c * c);
      },
      equals: function (a) {
        return (a = e.point(a)), a.x === this.x && a.y === this.y;
      },
      contains: function (a) {
        return (
          (a = e.point(a)),
          Math.abs(a.x) <= Math.abs(this.x) && Math.abs(a.y) <= Math.abs(this.y)
        );
      },
      toString: function () {
        return (
          "Point(" +
          e.Util.formatNum(this.x) +
          ", " +
          e.Util.formatNum(this.y) +
          ")"
        );
      },
    }),
    (e.point = function (a, b, d) {
      return a instanceof e.Point
        ? a
        : e.Util.isArray(a)
        ? new e.Point(a[0], a[1])
        : a === c || null === a
        ? a
        : new e.Point(a, b, d);
    }),
    (e.Bounds = function (a, b) {
      if (a)
        for (var c = b ? [a, b] : a, d = 0, e = c.length; e > d; d++)
          this.extend(c[d]);
    }),
    (e.Bounds.prototype = {
      extend: function (a) {
        return (
          (a = e.point(a)),
          this.min || this.max
            ? ((this.min.x = Math.min(a.x, this.min.x)),
              (this.max.x = Math.max(a.x, this.max.x)),
              (this.min.y = Math.min(a.y, this.min.y)),
              (this.max.y = Math.max(a.y, this.max.y)))
            : ((this.min = a.clone()), (this.max = a.clone())),
          this
        );
      },
      getCenter: function (a) {
        return new e.Point(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          a
        );
      },
      getBottomLeft: function () {
        return new e.Point(this.min.x, this.max.y);
      },
      getTopRight: function () {
        return new e.Point(this.max.x, this.min.y);
      },
      getSize: function () {
        return this.max.subtract(this.min);
      },
      contains: function (a) {
        var b, c;
        return (
          (a =
            "number" == typeof a[0] || a instanceof e.Point
              ? e.point(a)
              : e.bounds(a)),
          a instanceof e.Bounds ? ((b = a.min), (c = a.max)) : (b = c = a),
          b.x >= this.min.x &&
            c.x <= this.max.x &&
            b.y >= this.min.y &&
            c.y <= this.max.y
        );
      },
      intersects: function (a) {
        a = e.bounds(a);
        var b = this.min,
          c = this.max,
          d = a.min,
          f = a.max,
          g = f.x >= b.x && d.x <= c.x,
          h = f.y >= b.y && d.y <= c.y;
        return g && h;
      },
      isValid: function () {
        return !(!this.min || !this.max);
      },
    }),
    (e.bounds = function (a, b) {
      return !a || a instanceof e.Bounds ? a : new e.Bounds(a, b);
    }),
    (e.Transformation = function (a, b, c, d) {
      (this._a = a), (this._b = b), (this._c = c), (this._d = d);
    }),
    (e.Transformation.prototype = {
      transform: function (a, b) {
        return this._transform(a.clone(), b);
      },
      _transform: function (a, b) {
        return (
          (b = b || 1),
          (a.x = b * (this._a * a.x + this._b)),
          (a.y = b * (this._c * a.y + this._d)),
          a
        );
      },
      untransform: function (a, b) {
        return (
          (b = b || 1),
          new e.Point(
            (a.x / b - this._b) / this._a,
            (a.y / b - this._d) / this._c
          )
        );
      },
    }),
    (e.DomUtil = {
      get: function (a) {
        return "string" == typeof a ? b.getElementById(a) : a;
      },
      getStyle: function (a, c) {
        var d = a.style[c];
        if (
          (!d && a.currentStyle && (d = a.currentStyle[c]),
          (!d || "auto" === d) && b.defaultView)
        ) {
          var e = b.defaultView.getComputedStyle(a, null);
          d = e ? e[c] : null;
        }
        return "auto" === d ? null : d;
      },
      getViewportOffset: function (a) {
        var i,
          c = 0,
          d = 0,
          f = a,
          g = b.body,
          h = b.documentElement;
        do {
          if (
            ((c += f.offsetTop || 0),
            (d += f.offsetLeft || 0),
            (c += parseInt(e.DomUtil.getStyle(f, "borderTopWidth"), 10) || 0),
            (d += parseInt(e.DomUtil.getStyle(f, "borderLeftWidth"), 10) || 0),
            (i = e.DomUtil.getStyle(f, "position")),
            f.offsetParent === g && "absolute" === i)
          )
            break;
          if ("fixed" === i) {
            (c += g.scrollTop || h.scrollTop || 0),
              (d += g.scrollLeft || h.scrollLeft || 0);
            break;
          }
          if ("relative" === i && !f.offsetLeft) {
            var j = e.DomUtil.getStyle(f, "width"),
              k = e.DomUtil.getStyle(f, "max-width"),
              l = f.getBoundingClientRect();
            ("none" !== j || "none" !== k) && (d += l.left + f.clientLeft),
              (c += l.top + (g.scrollTop || h.scrollTop || 0));
            break;
          }
          f = f.offsetParent;
        } while (f);
        f = a;
        do {
          if (f === g) break;
          (c -= f.scrollTop || 0), (d -= f.scrollLeft || 0), (f = f.parentNode);
        } while (f);
        return new e.Point(d, c);
      },
      documentIsLtr: function () {
        return (
          e.DomUtil._docIsLtrCached ||
            ((e.DomUtil._docIsLtrCached = !0),
            (e.DomUtil._docIsLtr =
              "ltr" === e.DomUtil.getStyle(b.body, "direction"))),
          e.DomUtil._docIsLtr
        );
      },
      create: function (a, c, d) {
        var e = b.createElement(a);
        return (e.className = c), d && d.appendChild(e), e;
      },
      hasClass: function (a, b) {
        if (a.classList !== c) return a.classList.contains(b);
        var d = e.DomUtil._getClass(a);
        return d.length > 0 && new RegExp("(^|\\s)" + b + "(\\s|$)").test(d);
      },
      addClass: function (a, b) {
        if (a.classList !== c)
          for (var d = e.Util.splitWords(b), f = 0, g = d.length; g > f; f++)
            a.classList.add(d[f]);
        else if (!e.DomUtil.hasClass(a, b)) {
          var h = e.DomUtil._getClass(a);
          e.DomUtil._setClass(a, (h ? h + " " : "") + b);
        }
      },
      removeClass: function (a, b) {
        a.classList !== c
          ? a.classList.remove(b)
          : e.DomUtil._setClass(
              a,
              e.Util.trim(
                (" " + e.DomUtil._getClass(a) + " ").replace(" " + b + " ", " ")
              )
            );
      },
      _setClass: function (a, b) {
        a.className.baseVal === c
          ? (a.className = b)
          : (a.className.baseVal = b);
      },
      _getClass: function (a) {
        return a.className.baseVal === c ? a.className : a.className.baseVal;
      },
      setOpacity: function (a, b) {
        if ("opacity" in a.style) a.style.opacity = b;
        else if ("filter" in a.style) {
          var c = !1,
            d = "DXImageTransform.Microsoft.Alpha";
          try {
            c = a.filters.item(d);
          } catch (e) {
            if (1 === b) return;
          }
          (b = Math.round(100 * b)),
            c
              ? ((c.Enabled = 100 !== b), (c.Opacity = b))
              : (a.style.filter += " progid:" + d + "(opacity=" + b + ")");
        }
      },
      testProp: function (a) {
        for (var c = b.documentElement.style, d = 0; d < a.length; d++)
          if (a[d] in c) return a[d];
        return !1;
      },
      getTranslateString: function (a) {
        var b = e.Browser.webkit3d,
          c = "translate" + (b ? "3d" : "") + "(",
          d = (b ? ",0" : "") + ")";
        return c + a.x + "px," + a.y + "px" + d;
      },
      getScaleString: function (a, b) {
        var c = e.DomUtil.getTranslateString(b.add(b.multiplyBy(-1 * a))),
          d = " scale(" + a + ") ";
        return c + d;
      },
      setPosition: function (a, b, c) {
        (a._leaflet_pos = b),
          !c && e.Browser.any3d
            ? (a.style[e.DomUtil.TRANSFORM] = e.DomUtil.getTranslateString(b))
            : ((a.style.left = b.x + "px"), (a.style.top = b.y + "px"));
      },
      getPosition: function (a) {
        return a._leaflet_pos;
      },
    }),
    (e.DomUtil.TRANSFORM = e.DomUtil.testProp([
      "transform",
      "WebkitTransform",
      "OTransform",
      "MozTransform",
      "msTransform",
    ])),
    (e.DomUtil.TRANSITION = e.DomUtil.testProp([
      "webkitTransition",
      "transition",
      "OTransition",
      "MozTransition",
      "msTransition",
    ])),
    (e.DomUtil.TRANSITION_END =
      "webkitTransition" === e.DomUtil.TRANSITION ||
      "OTransition" === e.DomUtil.TRANSITION
        ? e.DomUtil.TRANSITION + "End"
        : "transitionend"),
    (function () {
      if ("onselectstart" in b)
        e.extend(e.DomUtil, {
          disableTextSelection: function () {
            e.DomEvent.on(a, "selectstart", e.DomEvent.preventDefault);
          },
          enableTextSelection: function () {
            e.DomEvent.off(a, "selectstart", e.DomEvent.preventDefault);
          },
        });
      else {
        var c = e.DomUtil.testProp([
          "userSelect",
          "WebkitUserSelect",
          "OUserSelect",
          "MozUserSelect",
          "msUserSelect",
        ]);
        e.extend(e.DomUtil, {
          disableTextSelection: function () {
            if (c) {
              var a = b.documentElement.style;
              (this._userSelect = a[c]), (a[c] = "none");
            }
          },
          enableTextSelection: function () {
            c &&
              ((b.documentElement.style[c] = this._userSelect),
              delete this._userSelect);
          },
        });
      }
      e.extend(e.DomUtil, {
        disableImageDrag: function () {
          e.DomEvent.on(a, "dragstart", e.DomEvent.preventDefault);
        },
        enableImageDrag: function () {
          e.DomEvent.off(a, "dragstart", e.DomEvent.preventDefault);
        },
      });
    })(),
    (e.LatLng = function (a, b, d) {
      if (((a = parseFloat(a)), (b = parseFloat(b)), isNaN(a) || isNaN(b)))
        throw new Error("Invalid LatLng object: (" + a + ", " + b + ")");
      (this.lat = a), (this.lng = b), d !== c && (this.alt = parseFloat(d));
    }),
    e.extend(e.LatLng, {
      DEG_TO_RAD: Math.PI / 180,
      RAD_TO_DEG: 180 / Math.PI,
      MAX_MARGIN: 1e-9,
    }),
    (e.LatLng.prototype = {
      equals: function (a) {
        if (!a) return !1;
        a = e.latLng(a);
        var b = Math.max(
          Math.abs(this.lat - a.lat),
          Math.abs(this.lng - a.lng)
        );
        return b <= e.LatLng.MAX_MARGIN;
      },
      toString: function (a) {
        return (
          "LatLng(" +
          e.Util.formatNum(this.lat, a) +
          ", " +
          e.Util.formatNum(this.lng, a) +
          ")"
        );
      },
      distanceTo: function (a) {
        a = e.latLng(a);
        var b = 6378137,
          c = e.LatLng.DEG_TO_RAD,
          d = (a.lat - this.lat) * c,
          f = (a.lng - this.lng) * c,
          g = this.lat * c,
          h = a.lat * c,
          i = Math.sin(d / 2),
          j = Math.sin(f / 2),
          k = i * i + j * j * Math.cos(g) * Math.cos(h);
        return 2 * b * Math.atan2(Math.sqrt(k), Math.sqrt(1 - k));
      },
      wrap: function (a, b) {
        var c = this.lng;
        return (
          (a = a || -180),
          (b = b || 180),
          (c = ((c + b) % (b - a)) + (a > c || c === b ? b : a)),
          new e.LatLng(this.lat, c)
        );
      },
    }),
    (e.latLng = function (a, b) {
      return a instanceof e.LatLng
        ? a
        : e.Util.isArray(a)
        ? "number" == typeof a[0] || "string" == typeof a[0]
          ? new e.LatLng(a[0], a[1], a[2])
          : null
        : a === c || null === a
        ? a
        : "object" == typeof a && "lat" in a
        ? new e.LatLng(a.lat, "lng" in a ? a.lng : a.lon)
        : b === c
        ? null
        : new e.LatLng(a, b);
    }),
    (e.LatLngBounds = function (a, b) {
      if (a)
        for (var c = b ? [a, b] : a, d = 0, e = c.length; e > d; d++)
          this.extend(c[d]);
    }),
    (e.LatLngBounds.prototype = {
      extend: function (a) {
        if (!a) return this;
        var b = e.latLng(a);
        return (
          (a = null !== b ? b : e.latLngBounds(a)),
          a instanceof e.LatLng
            ? this._southWest || this._northEast
              ? ((this._southWest.lat = Math.min(a.lat, this._southWest.lat)),
                (this._southWest.lng = Math.min(a.lng, this._southWest.lng)),
                (this._northEast.lat = Math.max(a.lat, this._northEast.lat)),
                (this._northEast.lng = Math.max(a.lng, this._northEast.lng)))
              : ((this._southWest = new e.LatLng(a.lat, a.lng)),
                (this._northEast = new e.LatLng(a.lat, a.lng)))
            : a instanceof e.LatLngBounds &&
              (this.extend(a._southWest), this.extend(a._northEast)),
          this
        );
      },
      pad: function (a) {
        var b = this._southWest,
          c = this._northEast,
          d = Math.abs(b.lat - c.lat) * a,
          f = Math.abs(b.lng - c.lng) * a;
        return new e.LatLngBounds(
          new e.LatLng(b.lat - d, b.lng - f),
          new e.LatLng(c.lat + d, c.lng + f)
        );
      },
      getCenter: function () {
        return new e.LatLng(
          (this._southWest.lat + this._northEast.lat) / 2,
          (this._southWest.lng + this._northEast.lng) / 2
        );
      },
      getSouthWest: function () {
        return this._southWest;
      },
      getNorthEast: function () {
        return this._northEast;
      },
      getNorthWest: function () {
        return new e.LatLng(this.getNorth(), this.getWest());
      },
      getSouthEast: function () {
        return new e.LatLng(this.getSouth(), this.getEast());
      },
      getWest: function () {
        return this._southWest.lng;
      },
      getSouth: function () {
        return this._southWest.lat;
      },
      getEast: function () {
        return this._northEast.lng;
      },
      getNorth: function () {
        return this._northEast.lat;
      },
      contains: function (a) {
        a =
          "number" == typeof a[0] || a instanceof e.LatLng
            ? e.latLng(a)
            : e.latLngBounds(a);
        var d,
          f,
          b = this._southWest,
          c = this._northEast;
        return (
          a instanceof e.LatLngBounds
            ? ((d = a.getSouthWest()), (f = a.getNorthEast()))
            : (d = f = a),
          d.lat >= b.lat && f.lat <= c.lat && d.lng >= b.lng && f.lng <= c.lng
        );
      },
      intersects: function (a) {
        a = e.latLngBounds(a);
        var b = this._southWest,
          c = this._northEast,
          d = a.getSouthWest(),
          f = a.getNorthEast(),
          g = f.lat >= b.lat && d.lat <= c.lat,
          h = f.lng >= b.lng && d.lng <= c.lng;
        return g && h;
      },
      toBBoxString: function () {
        return [
          this.getWest(),
          this.getSouth(),
          this.getEast(),
          this.getNorth(),
        ].join(",");
      },
      equals: function (a) {
        return a
          ? ((a = e.latLngBounds(a)),
            this._southWest.equals(a.getSouthWest()) &&
              this._northEast.equals(a.getNorthEast()))
          : !1;
      },
      isValid: function () {
        return !(!this._southWest || !this._northEast);
      },
    }),
    (e.latLngBounds = function (a, b) {
      return !a || a instanceof e.LatLngBounds ? a : new e.LatLngBounds(a, b);
    }),
    (e.Projection = {}),
    (e.Projection.SphericalMercator = {
      MAX_LATITUDE: 85.0511287798,
      project: function (a) {
        var b = e.LatLng.DEG_TO_RAD,
          c = this.MAX_LATITUDE,
          d = Math.max(Math.min(c, a.lat), -c),
          f = a.lng * b,
          g = d * b;
        return (g = Math.log(Math.tan(Math.PI / 4 + g / 2))), new e.Point(f, g);
      },
      unproject: function (a) {
        var b = e.LatLng.RAD_TO_DEG,
          c = a.x * b,
          d = (2 * Math.atan(Math.exp(a.y)) - Math.PI / 2) * b;
        return new e.LatLng(d, c);
      },
    }),
    (e.Projection.LonLat = {
      project: function (a) {
        return new e.Point(a.lng, a.lat);
      },
      unproject: function (a) {
        return new e.LatLng(a.y, a.x);
      },
    }),
    (e.CRS = {
      latLngToPoint: function (a, b) {
        var c = this.projection.project(a),
          d = this.scale(b);
        return this.transformation._transform(c, d);
      },
      pointToLatLng: function (a, b) {
        var c = this.scale(b),
          d = this.transformation.untransform(a, c);
        return this.projection.unproject(d);
      },
      project: function (a) {
        return this.projection.project(a);
      },
      scale: function (a) {
        return 256 * Math.pow(2, a);
      },
      getSize: function (a) {
        var b = this.scale(a);
        return e.point(b, b);
      },
    }),
    (e.CRS.Simple = e.extend({}, e.CRS, {
      projection: e.Projection.LonLat,
      transformation: new e.Transformation(1, 0, -1, 0),
      scale: function (a) {
        return Math.pow(2, a);
      },
    })),
    (e.CRS.EPSG3857 = e.extend({}, e.CRS, {
      code: "EPSG:3857",
      projection: e.Projection.SphericalMercator,
      transformation: new e.Transformation(
        0.5 / Math.PI,
        0.5,
        -0.5 / Math.PI,
        0.5
      ),
      project: function (a) {
        var b = this.projection.project(a),
          c = 6378137;
        return b.multiplyBy(c);
      },
    })),
    (e.CRS.EPSG900913 = e.extend({}, e.CRS.EPSG3857, { code: "EPSG:900913" })),
    (e.CRS.EPSG4326 = e.extend({}, e.CRS, {
      code: "EPSG:4326",
      projection: e.Projection.LonLat,
      transformation: new e.Transformation(1 / 360, 0.5, -1 / 360, 0.5),
    })),
    (e.Map = e.Class.extend({
      includes: e.Mixin.Events,
      options: {
        crs: e.CRS.EPSG3857,
        fadeAnimation: e.DomUtil.TRANSITION && !e.Browser.android23,
        trackResize: !0,
        markerZoomAnimation: e.DomUtil.TRANSITION && e.Browser.any3d,
      },
      initialize: function (a, b) {
        (b = e.setOptions(this, b)),
          this._initContainer(a),
          this._initLayout(),
          (this._onResize = e.bind(this._onResize, this)),
          this._initEvents(),
          b.maxBounds && this.setMaxBounds(b.maxBounds),
          b.center &&
            b.zoom !== c &&
            this.setView(e.latLng(b.center), b.zoom, { reset: !0 }),
          (this._handlers = []),
          (this._layers = {}),
          (this._zoomBoundLayers = {}),
          (this._tileLayersNum = 0),
          this.callInitHooks(),
          this._addLayers(b.layers);
      },
      setView: function (a, b) {
        return (
          (b = b === c ? this.getZoom() : b),
          this._resetView(e.latLng(a), this._limitZoom(b)),
          this
        );
      },
      setZoom: function (a, b) {
        return this._loaded
          ? this.setView(this.getCenter(), a, { zoom: b })
          : ((this._zoom = this._limitZoom(a)), this);
      },
      zoomIn: function (a, b) {
        return this.setZoom(this._zoom + (a || 1), b);
      },
      zoomOut: function (a, b) {
        return this.setZoom(this._zoom - (a || 1), b);
      },
      setZoomAround: function (a, b, c) {
        var d = this.getZoomScale(b),
          f = this.getSize().divideBy(2),
          g = a instanceof e.Point ? a : this.latLngToContainerPoint(a),
          h = g.subtract(f).multiplyBy(1 - 1 / d),
          i = this.containerPointToLatLng(f.add(h));
        return this.setView(i, b, { zoom: c });
      },
      fitBounds: function (a, b) {
        (b = b || {}), (a = a.getBounds ? a.getBounds() : e.latLngBounds(a));
        var c = e.point(b.paddingTopLeft || b.padding || [0, 0]),
          d = e.point(b.paddingBottomRight || b.padding || [0, 0]),
          f = this.getBoundsZoom(a, !1, c.add(d)),
          g = d.subtract(c).divideBy(2),
          h = this.project(a.getSouthWest(), f),
          i = this.project(a.getNorthEast(), f),
          j = this.unproject(h.add(i).divideBy(2).add(g), f);
        return (
          (f = b && b.maxZoom ? Math.min(b.maxZoom, f) : f),
          this.setView(j, f, b)
        );
      },
      fitWorld: function (a) {
        return this.fitBounds(
          [
            [-90, -180],
            [90, 180],
          ],
          a
        );
      },
      panTo: function (a, b) {
        return this.setView(a, this._zoom, { pan: b });
      },
      panBy: function (a) {
        return (
          this.fire("movestart"),
          this._rawPanBy(e.point(a)),
          this.fire("move"),
          this.fire("moveend")
        );
      },
      setMaxBounds: function (a) {
        return (
          (a = e.latLngBounds(a)),
          (this.options.maxBounds = a),
          a
            ? (this._loaded && this._panInsideMaxBounds(),
              this.on("moveend", this._panInsideMaxBounds, this))
            : this.off("moveend", this._panInsideMaxBounds, this)
        );
      },
      panInsideBounds: function (a, b) {
        var c = this.getCenter(),
          d = this._limitCenter(c, this._zoom, a);
        return c.equals(d) ? this : this.panTo(d, b);
      },
      addLayer: function (a) {
        var b = e.stamp(a);
        return this._layers[b]
          ? this
          : ((this._layers[b] = a),
            !a.options ||
              (isNaN(a.options.maxZoom) && isNaN(a.options.minZoom)) ||
              ((this._zoomBoundLayers[b] = a), this._updateZoomLevels()),
            this.options.zoomAnimation &&
              e.TileLayer &&
              a instanceof e.TileLayer &&
              (this._tileLayersNum++,
              this._tileLayersToLoad++,
              a.on("load", this._onTileLayerLoad, this)),
            this._loaded && this._layerAdd(a),
            this);
      },
      removeLayer: function (a) {
        var b = e.stamp(a);
        return this._layers[b]
          ? (this._loaded && a.onRemove(this),
            delete this._layers[b],
            this._loaded && this.fire("layerremove", { layer: a }),
            this._zoomBoundLayers[b] &&
              (delete this._zoomBoundLayers[b], this._updateZoomLevels()),
            this.options.zoomAnimation &&
              e.TileLayer &&
              a instanceof e.TileLayer &&
              (this._tileLayersNum--,
              this._tileLayersToLoad--,
              a.off("load", this._onTileLayerLoad, this)),
            this)
          : this;
      },
      hasLayer: function (a) {
        return a ? e.stamp(a) in this._layers : !1;
      },
      eachLayer: function (a, b) {
        for (var c in this._layers) a.call(b, this._layers[c]);
        return this;
      },
      invalidateSize: function (a) {
        if (!this._loaded) return this;
        a = e.extend({ animate: !1, pan: !0 }, a === !0 ? { animate: !0 } : a);
        var b = this.getSize();
        (this._sizeChanged = !0), (this._initialCenter = null);
        var c = this.getSize(),
          d = b.divideBy(2).round(),
          f = c.divideBy(2).round(),
          g = d.subtract(f);
        return g.x || g.y
          ? (a.animate && a.pan
              ? this.panBy(g)
              : (a.pan && this._rawPanBy(g),
                this.fire("move"),
                a.debounceMoveend
                  ? (clearTimeout(this._sizeTimer),
                    (this._sizeTimer = setTimeout(
                      e.bind(this.fire, this, "moveend"),
                      200
                    )))
                  : this.fire("moveend")),
            this.fire("resize", { oldSize: b, newSize: c }))
          : this;
      },
      addHandler: function (a, b) {
        if (!b) return this;
        var c = (this[a] = new b(this));
        return this._handlers.push(c), this.options[a] && c.enable(), this;
      },
      remove: function () {
        this._loaded && this.fire("unload"), this._initEvents("off");
        try {
          delete this._container._leaflet;
        } catch (a) {
          this._container._leaflet = c;
        }
        return (
          this._clearPanes(),
          this._clearControlPos && this._clearControlPos(),
          this._clearHandlers(),
          this
        );
      },
      getCenter: function () {
        return (
          this._checkIfLoaded(),
          this._initialCenter && !this._moved()
            ? this._initialCenter
            : this.layerPointToLatLng(this._getCenterLayerPoint())
        );
      },
      getZoom: function () {
        return this._zoom;
      },
      getBounds: function () {
        var a = this.getPixelBounds(),
          b = this.unproject(a.getBottomLeft()),
          c = this.unproject(a.getTopRight());
        return new e.LatLngBounds(b, c);
      },
      getMinZoom: function () {
        return this.options.minZoom === c
          ? this._layersMinZoom === c
            ? 0
            : this._layersMinZoom
          : this.options.minZoom;
      },
      getMaxZoom: function () {
        return this.options.maxZoom === c
          ? this._layersMaxZoom === c
            ? 1 / 0
            : this._layersMaxZoom
          : this.options.maxZoom;
      },
      getBoundsZoom: function (a, b, c) {
        a = e.latLngBounds(a);
        var k,
          d = this.getMinZoom() - (b ? 1 : 0),
          f = this.getMaxZoom(),
          g = this.getSize(),
          h = a.getNorthWest(),
          i = a.getSouthEast(),
          j = !0;
        c = e.point(c || [0, 0]);
        do
          d++,
            (k = this.project(i, d).subtract(this.project(h, d)).add(c)),
            (j = b ? k.x < g.x || k.y < g.y : g.contains(k));
        while (j && f >= d);
        return j && b ? null : b ? d : d - 1;
      },
      getSize: function () {
        return (
          (!this._size || this._sizeChanged) &&
            ((this._size = new e.Point(
              this._container.clientWidth,
              this._container.clientHeight
            )),
            (this._sizeChanged = !1)),
          this._size.clone()
        );
      },
      getPixelBounds: function () {
        var a = this._getTopLeftPoint();
        return new e.Bounds(a, a.add(this.getSize()));
      },
      getPixelOrigin: function () {
        return this._checkIfLoaded(), this._initialTopLeftPoint;
      },
      getPanes: function () {
        return this._panes;
      },
      getContainer: function () {
        return this._container;
      },
      getZoomScale: function (a) {
        var b = this.options.crs;
        return b.scale(a) / b.scale(this._zoom);
      },
      getScaleZoom: function (a) {
        return this._zoom + Math.log(a) / Math.LN2;
      },
      project: function (a, b) {
        return (
          (b = b === c ? this._zoom : b),
          this.options.crs.latLngToPoint(e.latLng(a), b)
        );
      },
      unproject: function (a, b) {
        return (
          (b = b === c ? this._zoom : b),
          this.options.crs.pointToLatLng(e.point(a), b)
        );
      },
      layerPointToLatLng: function (a) {
        var b = e.point(a).add(this.getPixelOrigin());
        return this.unproject(b);
      },
      latLngToLayerPoint: function (a) {
        var b = this.project(e.latLng(a))._round();
        return b._subtract(this.getPixelOrigin());
      },
      containerPointToLayerPoint: function (a) {
        return e.point(a).subtract(this._getMapPanePos());
      },
      layerPointToContainerPoint: function (a) {
        return e.point(a).add(this._getMapPanePos());
      },
      containerPointToLatLng: function (a) {
        var b = this.containerPointToLayerPoint(e.point(a));
        return this.layerPointToLatLng(b);
      },
      latLngToContainerPoint: function (a) {
        return this.layerPointToContainerPoint(
          this.latLngToLayerPoint(e.latLng(a))
        );
      },
      mouseEventToContainerPoint: function (a) {
        return e.DomEvent.getMousePosition(a, this._container);
      },
      mouseEventToLayerPoint: function (a) {
        return this.containerPointToLayerPoint(
          this.mouseEventToContainerPoint(a)
        );
      },
      mouseEventToLatLng: function (a) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(a));
      },
      _initContainer: function (a) {
        var b = (this._container = e.DomUtil.get(a));
        if (!b) throw new Error("Map container not found.");
        if (b._leaflet)
          throw new Error("Map container is already initialized.");
        b._leaflet = !0;
      },
      _initLayout: function () {
        var a = this._container;
        e.DomUtil.addClass(
          a,
          "leaflet-container" +
            (e.Browser.touch ? " leaflet-touch" : "") +
            (e.Browser.retina ? " leaflet-retina" : "") +
            (e.Browser.ielt9 ? " leaflet-oldie" : "") +
            (this.options.fadeAnimation ? " leaflet-fade-anim" : "")
        );
        var b = e.DomUtil.getStyle(a, "position");
        "absolute" !== b &&
          "relative" !== b &&
          "fixed" !== b &&
          (a.style.position = "relative"),
          this._initPanes(),
          this._initControlPos && this._initControlPos();
      },
      _initPanes: function () {
        var a = (this._panes = {});
        (this._mapPane = a.mapPane =
          this._createPane("leaflet-map-pane", this._container)),
          (this._tilePane = a.tilePane =
            this._createPane("leaflet-tile-pane", this._mapPane)),
          (a.objectsPane = this._createPane(
            "leaflet-objects-pane",
            this._mapPane
          )),
          (a.shadowPane = this._createPane("leaflet-shadow-pane")),
          (a.overlayPane = this._createPane("leaflet-overlay-pane")),
          (a.markerPane = this._createPane("leaflet-marker-pane")),
          (a.popupPane = this._createPane("leaflet-popup-pane"));
        var b = " leaflet-zoom-hide";
        this.options.markerZoomAnimation ||
          (e.DomUtil.addClass(a.markerPane, b),
          e.DomUtil.addClass(a.shadowPane, b),
          e.DomUtil.addClass(a.popupPane, b));
      },
      _createPane: function (a, b) {
        return e.DomUtil.create("div", a, b || this._panes.objectsPane);
      },
      _clearPanes: function () {
        this._container.removeChild(this._mapPane);
      },
      _addLayers: function (a) {
        a = a ? (e.Util.isArray(a) ? a : [a]) : [];
        for (var b = 0, c = a.length; c > b; b++) this.addLayer(a[b]);
      },
      _resetView: function (a, b, c, d) {
        var f = this._zoom !== b;
        d || (this.fire("movestart"), f && this.fire("zoomstart")),
          (this._zoom = b),
          (this._initialCenter = a),
          (this._initialTopLeftPoint = this._getNewTopLeftPoint(a)),
          c
            ? this._initialTopLeftPoint._add(this._getMapPanePos())
            : e.DomUtil.setPosition(this._mapPane, new e.Point(0, 0)),
          (this._tileLayersToLoad = this._tileLayersNum);
        var g = !this._loaded;
        (this._loaded = !0),
          this.fire("viewreset", { hard: !c }),
          g && (this.fire("load"), this.eachLayer(this._layerAdd, this)),
          this.fire("move"),
          (f || d) && this.fire("zoomend"),
          this.fire("moveend", { hard: !c });
      },
      _rawPanBy: function (a) {
        e.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(a));
      },
      _getZoomSpan: function () {
        return this.getMaxZoom() - this.getMinZoom();
      },
      _updateZoomLevels: function () {
        var a,
          b = 1 / 0,
          d = -1 / 0,
          e = this._getZoomSpan();
        for (a in this._zoomBoundLayers) {
          var f = this._zoomBoundLayers[a];
          isNaN(f.options.minZoom) || (b = Math.min(b, f.options.minZoom)),
            isNaN(f.options.maxZoom) || (d = Math.max(d, f.options.maxZoom));
        }
        a === c
          ? (this._layersMaxZoom = this._layersMinZoom = c)
          : ((this._layersMaxZoom = d), (this._layersMinZoom = b)),
          e !== this._getZoomSpan() && this.fire("zoomlevelschange");
      },
      _panInsideMaxBounds: function () {
        this.panInsideBounds(this.options.maxBounds);
      },
      _checkIfLoaded: function () {
        if (!this._loaded) throw new Error("Set map center and zoom first.");
      },
      _initEvents: function (b) {
        if (e.DomEvent) {
          (b = b || "on"),
            e.DomEvent[b](this._container, "click", this._onMouseClick, this);
          var d,
            f,
            c = [
              "dblclick",
              "mousedown",
              "mouseup",
              "mouseenter",
              "mouseleave",
              "mousemove",
              "contextmenu",
            ];
          for (d = 0, f = c.length; f > d; d++)
            e.DomEvent[b](this._container, c[d], this._fireMouseEvent, this);
          this.options.trackResize &&
            e.DomEvent[b](a, "resize", this._onResize, this);
        }
      },
      _onResize: function () {
        e.Util.cancelAnimFrame(this._resizeRequest),
          (this._resizeRequest = e.Util.requestAnimFrame(
            function () {
              this.invalidateSize({ debounceMoveend: !0 });
            },
            this,
            !1,
            this._container
          ));
      },
      _onMouseClick: function (a) {
        !this._loaded ||
          (!a._simulated &&
            ((this.dragging && this.dragging.moved()) ||
              (this.boxZoom && this.boxZoom.moved()))) ||
          e.DomEvent._skipped(a) ||
          (this.fire("preclick"), this._fireMouseEvent(a));
      },
      _fireMouseEvent: function (a) {
        if (this._loaded && !e.DomEvent._skipped(a)) {
          var b = a.type;
          if (
            ((b =
              "mouseenter" === b
                ? "mouseover"
                : "mouseleave" === b
                ? "mouseout"
                : b),
            this.hasEventListeners(b))
          ) {
            "contextmenu" === b && e.DomEvent.preventDefault(a);
            var c = this.mouseEventToContainerPoint(a),
              d = this.containerPointToLayerPoint(c),
              f = this.layerPointToLatLng(d);
            this.fire(b, {
              latlng: f,
              layerPoint: d,
              containerPoint: c,
              originalEvent: a,
            });
          }
        }
      },
      _onTileLayerLoad: function () {
        this._tileLayersToLoad--,
          this._tileLayersNum &&
            !this._tileLayersToLoad &&
            this.fire("tilelayersload");
      },
      _clearHandlers: function () {
        for (var a = 0, b = this._handlers.length; b > a; a++)
          this._handlers[a].disable();
      },
      whenReady: function (a, b) {
        return (
          this._loaded ? a.call(b || this, this) : this.on("load", a, b), this
        );
      },
      _layerAdd: function (a) {
        a.onAdd(this), this.fire("layeradd", { layer: a });
      },
      _getMapPanePos: function () {
        return e.DomUtil.getPosition(this._mapPane);
      },
      _moved: function () {
        var a = this._getMapPanePos();
        return a && !a.equals([0, 0]);
      },
      _getTopLeftPoint: function () {
        return this.getPixelOrigin().subtract(this._getMapPanePos());
      },
      _getNewTopLeftPoint: function (a, b) {
        var c = this.getSize()._divideBy(2);
        return this.project(a, b)._subtract(c)._round();
      },
      _latLngToNewLayerPoint: function (a, b, c) {
        var d = this._getNewTopLeftPoint(c, b).add(this._getMapPanePos());
        return this.project(a, b)._subtract(d);
      },
      _getCenterLayerPoint: function () {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
      },
      _getCenterOffset: function (a) {
        return this.latLngToLayerPoint(a).subtract(this._getCenterLayerPoint());
      },
      _limitCenter: function (a, b, c) {
        if (!c) return a;
        var d = this.project(a, b),
          f = this.getSize().divideBy(2),
          g = new e.Bounds(d.subtract(f), d.add(f)),
          h = this._getBoundsOffset(g, c, b);
        return this.unproject(d.add(h), b);
      },
      _limitOffset: function (a, b) {
        if (!b) return a;
        var c = this.getPixelBounds(),
          d = new e.Bounds(c.min.add(a), c.max.add(a));
        return a.add(this._getBoundsOffset(d, b));
      },
      _getBoundsOffset: function (a, b, c) {
        var d = this.project(b.getNorthWest(), c).subtract(a.min),
          f = this.project(b.getSouthEast(), c).subtract(a.max),
          g = this._rebound(d.x, -f.x),
          h = this._rebound(d.y, -f.y);
        return new e.Point(g, h);
      },
      _rebound: function (a, b) {
        return a + b > 0
          ? Math.round(a - b) / 2
          : Math.max(0, Math.ceil(a)) - Math.max(0, Math.floor(b));
      },
      _limitZoom: function (a) {
        var b = this.getMinZoom(),
          c = this.getMaxZoom();
        return Math.max(b, Math.min(c, a));
      },
    })),
    (e.map = function (a, b) {
      return new e.Map(a, b);
    }),
    (e.Projection.Mercator = {
      MAX_LATITUDE: 85.0840591556,
      R_MINOR: 6356752.314245179,
      R_MAJOR: 6378137,
      project: function (a) {
        var b = e.LatLng.DEG_TO_RAD,
          c = this.MAX_LATITUDE,
          d = Math.max(Math.min(c, a.lat), -c),
          f = this.R_MAJOR,
          g = this.R_MINOR,
          h = a.lng * b * f,
          i = d * b,
          j = g / f,
          k = Math.sqrt(1 - j * j),
          l = k * Math.sin(i);
        l = Math.pow((1 - l) / (1 + l), 0.5 * k);
        var m = Math.tan(0.5 * (0.5 * Math.PI - i)) / l;
        return (i = -f * Math.log(m)), new e.Point(h, i);
      },
      unproject: function (a) {
        for (
          var o,
            b = e.LatLng.RAD_TO_DEG,
            c = this.R_MAJOR,
            d = this.R_MINOR,
            f = (a.x * b) / c,
            g = d / c,
            h = Math.sqrt(1 - g * g),
            i = Math.exp(-a.y / c),
            j = Math.PI / 2 - 2 * Math.atan(i),
            k = 15,
            l = 1e-7,
            m = k,
            n = 0.1;
          Math.abs(n) > l && --m > 0;

        )
          (o = h * Math.sin(j)),
            (n =
              Math.PI / 2 -
              2 * Math.atan(i * Math.pow((1 - o) / (1 + o), 0.5 * h)) -
              j),
            (j += n);
        return new e.LatLng(j * b, f);
      },
    }),
    (e.CRS.EPSG3395 = e.extend({}, e.CRS, {
      code: "EPSG:3395",
      projection: e.Projection.Mercator,
      transformation: (function () {
        var a = e.Projection.Mercator,
          b = a.R_MAJOR,
          c = 0.5 / (Math.PI * b);
        return new e.Transformation(c, 0.5, -c, 0.5);
      })(),
    })),
    (e.TileLayer = e.Class.extend({
      includes: e.Mixin.Events,
      options: {
        minZoom: 0,
        maxZoom: 18,
        tileSize: 256,
        subdomains: "abc",
        errorTileUrl: "",
        attribution: "",
        zoomOffset: 0,
        opacity: 1,
        unloadInvisibleTiles: e.Browser.mobile,
        updateWhenIdle: e.Browser.mobile,
      },
      initialize: function (a, b) {
        (b = e.setOptions(this, b)),
          b.detectRetina &&
            e.Browser.retina &&
            b.maxZoom > 0 &&
            ((b.tileSize = Math.floor(b.tileSize / 2)),
            b.zoomOffset++,
            b.minZoom > 0 && b.minZoom--,
            this.options.maxZoom--),
          b.bounds && (b.bounds = e.latLngBounds(b.bounds)),
          (this._url = a);
        var c = this.options.subdomains;
        "string" == typeof c && (this.options.subdomains = c.split(""));
      },
      onAdd: function (a) {
        (this._map = a),
          (this._animated = a._zoomAnimated),
          this._initContainer(),
          a.on({ viewreset: this._reset, moveend: this._update }, this),
          this._animated &&
            a.on(
              { zoomanim: this._animateZoom, zoomend: this._endZoomAnim },
              this
            ),
          this.options.updateWhenIdle ||
            ((this._limitedUpdate = e.Util.limitExecByInterval(
              this._update,
              150,
              this
            )),
            a.on("move", this._limitedUpdate, this)),
          this._reset(),
          this._update();
      },
      addTo: function (a) {
        return a.addLayer(this), this;
      },
      onRemove: function (a) {
        this._container.parentNode.removeChild(this._container),
          a.off({ viewreset: this._reset, moveend: this._update }, this),
          this._animated &&
            a.off(
              { zoomanim: this._animateZoom, zoomend: this._endZoomAnim },
              this
            ),
          this.options.updateWhenIdle ||
            a.off("move", this._limitedUpdate, this),
          (this._container = null),
          (this._map = null);
      },
      bringToFront: function () {
        var a = this._map._panes.tilePane;
        return (
          this._container &&
            (a.appendChild(this._container), this._setAutoZIndex(a, Math.max)),
          this
        );
      },
      bringToBack: function () {
        var a = this._map._panes.tilePane;
        return (
          this._container &&
            (a.insertBefore(this._container, a.firstChild),
            this._setAutoZIndex(a, Math.min)),
          this
        );
      },
      getAttribution: function () {
        return this.options.attribution;
      },
      getContainer: function () {
        return this._container;
      },
      setOpacity: function (a) {
        return (
          (this.options.opacity = a), this._map && this._updateOpacity(), this
        );
      },
      setZIndex: function (a) {
        return (this.options.zIndex = a), this._updateZIndex(), this;
      },
      setUrl: function (a, b) {
        return (this._url = a), b || this.redraw(), this;
      },
      redraw: function () {
        return this._map && (this._reset({ hard: !0 }), this._update()), this;
      },
      _updateZIndex: function () {
        this._container &&
          this.options.zIndex !== c &&
          (this._container.style.zIndex = this.options.zIndex);
      },
      _setAutoZIndex: function (a, b) {
        var e,
          f,
          g,
          c = a.children,
          d = -b(1 / 0, -1 / 0);
        for (f = 0, g = c.length; g > f; f++)
          c[f] !== this._container &&
            ((e = parseInt(c[f].style.zIndex, 10)), isNaN(e) || (d = b(d, e)));
        this.options.zIndex = this._container.style.zIndex =
          (isFinite(d) ? d : 0) + b(1, -1);
      },
      _updateOpacity: function () {
        var a,
          b = this._tiles;
        if (e.Browser.ielt9)
          for (a in b) e.DomUtil.setOpacity(b[a], this.options.opacity);
        else e.DomUtil.setOpacity(this._container, this.options.opacity);
      },
      _initContainer: function () {
        var a = this._map._panes.tilePane;
        if (!this._container) {
          if (
            ((this._container = e.DomUtil.create("div", "leaflet-layer")),
            this._updateZIndex(),
            this._animated)
          ) {
            var b = "leaflet-tile-container";
            (this._bgBuffer = e.DomUtil.create("div", b, this._container)),
              (this._tileContainer = e.DomUtil.create(
                "div",
                b,
                this._container
              ));
          } else this._tileContainer = this._container;
          a.appendChild(this._container),
            this.options.opacity < 1 && this._updateOpacity();
        }
      },
      _reset: function (a) {
        for (var b in this._tiles)
          this.fire("tileunload", { tile: this._tiles[b] });
        (this._tiles = {}),
          (this._tilesToLoad = 0),
          this.options.reuseTiles && (this._unusedTiles = []),
          (this._tileContainer.innerHTML = ""),
          this._animated && a && a.hard && this._clearBgBuffer(),
          this._initContainer();
      },
      _getTileSize: function () {
        var a = this._map,
          b = a.getZoom() + this.options.zoomOffset,
          c = this.options.maxNativeZoom,
          d = this.options.tileSize;
        return (
          c &&
            b > c &&
            (d = Math.round((a.getZoomScale(b) / a.getZoomScale(c)) * d)),
          d
        );
      },
      _update: function () {
        if (this._map) {
          var a = this._map,
            b = a.getPixelBounds(),
            c = a.getZoom(),
            d = this._getTileSize();
          if (!(c > this.options.maxZoom || c < this.options.minZoom)) {
            var f = e.bounds(
              b.min.divideBy(d)._floor(),
              b.max.divideBy(d)._floor()
            );
            this._addTilesFromCenterOut(f),
              (this.options.unloadInvisibleTiles || this.options.reuseTiles) &&
                this._removeOtherTiles(f);
          }
        }
      },
      _addTilesFromCenterOut: function (a) {
        var f,
          g,
          h,
          c = [],
          d = a.getCenter();
        for (f = a.min.y; f <= a.max.y; f++)
          for (g = a.min.x; g <= a.max.x; g++)
            (h = new e.Point(g, f)), this._tileShouldBeLoaded(h) && c.push(h);
        var i = c.length;
        if (0 !== i) {
          c.sort(function (a, b) {
            return a.distanceTo(d) - b.distanceTo(d);
          });
          var j = b.createDocumentFragment();
          for (
            this._tilesToLoad || this.fire("loading"),
              this._tilesToLoad += i,
              g = 0;
            i > g;
            g++
          )
            this._addTile(c[g], j);
          this._tileContainer.appendChild(j);
        }
      },
      _tileShouldBeLoaded: function (a) {
        if (a.x + ":" + a.y in this._tiles) return !1;
        var b = this.options;
        if (!b.continuousWorld) {
          var c = this._getWrapTileNum();
          if ((b.noWrap && (a.x < 0 || a.x >= c.x)) || a.y < 0 || a.y >= c.y)
            return !1;
        }
        if (b.bounds) {
          var d = b.tileSize,
            e = a.multiplyBy(d),
            f = e.add([d, d]),
            g = this._map.unproject(e),
            h = this._map.unproject(f);
          if (
            (b.continuousWorld || b.noWrap || ((g = g.wrap()), (h = h.wrap())),
            !b.bounds.intersects([g, h]))
          )
            return !1;
        }
        return !0;
      },
      _removeOtherTiles: function (a) {
        var b, c, d, e;
        for (e in this._tiles)
          (b = e.split(":")),
            (c = parseInt(b[0], 10)),
            (d = parseInt(b[1], 10)),
            (c < a.min.x || c > a.max.x || d < a.min.y || d > a.max.y) &&
              this._removeTile(e);
      },
      _removeTile: function (a) {
        var b = this._tiles[a];
        this.fire("tileunload", { tile: b, url: b.src }),
          this.options.reuseTiles
            ? (e.DomUtil.removeClass(b, "leaflet-tile-loaded"),
              this._unusedTiles.push(b))
            : b.parentNode === this._tileContainer &&
              this._tileContainer.removeChild(b),
          e.Browser.android ||
            ((b.onload = null), (b.src = e.Util.emptyImageUrl)),
          delete this._tiles[a];
      },
      _addTile: function (a, b) {
        var c = this._getTilePos(a),
          d = this._getTile();
        e.DomUtil.setPosition(d, c, e.Browser.chrome),
          (this._tiles[a.x + ":" + a.y] = d),
          this._loadTile(d, a),
          d.parentNode !== this._tileContainer && b.appendChild(d);
      },
      _getZoomForUrl: function () {
        var a = this.options,
          b = this._map.getZoom();
        return (
          a.zoomReverse && (b = a.maxZoom - b),
          (b += a.zoomOffset),
          a.maxNativeZoom ? Math.min(b, a.maxNativeZoom) : b
        );
      },
      _getTilePos: function (a) {
        var b = this._map.getPixelOrigin(),
          c = this._getTileSize();
        return a.multiplyBy(c).subtract(b);
      },
      getTileUrl: function (a) {
        return e.Util.template(
          this._url,
          e.extend(
            { s: this._getSubdomain(a), z: a.z, x: a.x, y: a.y },
            this.options
          )
        );
      },
      _getWrapTileNum: function () {
        var a = this._map.options.crs,
          b = a.getSize(this._map.getZoom());
        return b.divideBy(this._getTileSize())._floor();
      },
      _adjustTilePoint: function (a) {
        var b = this._getWrapTileNum();
        this.options.continuousWorld ||
          this.options.noWrap ||
          (a.x = ((a.x % b.x) + b.x) % b.x),
          this.options.tms && (a.y = b.y - a.y - 1),
          (a.z = this._getZoomForUrl());
      },
      _getSubdomain: function (a) {
        var b = Math.abs(a.x + a.y) % this.options.subdomains.length;
        return this.options.subdomains[b];
      },
      _getTile: function () {
        if (this.options.reuseTiles && this._unusedTiles.length > 0) {
          var a = this._unusedTiles.pop();
          return this._resetTile(a), a;
        }
        return this._createTile();
      },
      _resetTile: function () {},
      _createTile: function () {
        var a = e.DomUtil.create("img", "leaflet-tile");
        return (
          (a.style.width = a.style.height = this._getTileSize() + "px"),
          (a.galleryimg = "no"),
          (a.onselectstart = a.onmousemove = e.Util.falseFn),
          e.Browser.ielt9 &&
            this.options.opacity !== c &&
            e.DomUtil.setOpacity(a, this.options.opacity),
          e.Browser.mobileWebkit3d &&
            (a.style.WebkitBackfaceVisibility = "hidden"),
          a
        );
      },
      _loadTile: function (a, b) {
        (a._layer = this),
          (a.onload = this._tileOnLoad),
          (a.onerror = this._tileOnError),
          this._adjustTilePoint(b),
          (a.src = this.getTileUrl(b)),
          this.fire("tileloadstart", { tile: a, url: a.src });
      },
      _tileLoaded: function () {
        this._tilesToLoad--,
          this._animated &&
            e.DomUtil.addClass(this._tileContainer, "leaflet-zoom-animated"),
          this._tilesToLoad ||
            (this.fire("load"),
            this._animated &&
              (clearTimeout(this._clearBgBufferTimer),
              (this._clearBgBufferTimer = setTimeout(
                e.bind(this._clearBgBuffer, this),
                500
              ))));
      },
      _tileOnLoad: function () {
        var a = this._layer;
        this.src !== e.Util.emptyImageUrl &&
          (e.DomUtil.addClass(this, "leaflet-tile-loaded"),
          a.fire("tileload", { tile: this, url: this.src })),
          a._tileLoaded();
      },
      _tileOnError: function () {
        var a = this._layer;
        a.fire("tileerror", { tile: this, url: this.src });
        var b = a.options.errorTileUrl;
        b && (this.src = b), a._tileLoaded();
      },
    })),
    (e.tileLayer = function (a, b) {
      return new e.TileLayer(a, b);
    }),
    (e.TileLayer.WMS = e.TileLayer.extend({
      defaultWmsParams: {
        service: "WMS",
        request: "GetMap",
        version: "1.1.1",
        layers: "",
        styles: "",
        format: "image/jpeg",
        transparent: !1,
      },
      initialize: function (a, b) {
        this._url = a;
        var c = e.extend({}, this.defaultWmsParams),
          d = b.tileSize || this.options.tileSize;
        c.width = c.height = b.detectRetina && e.Browser.retina ? 2 * d : d;
        for (var f in b)
          this.options.hasOwnProperty(f) || "crs" === f || (c[f] = b[f]);
        (this.wmsParams = c), e.setOptions(this, b);
      },
      onAdd: function (a) {
        (this._crs = this.options.crs || a.options.crs),
          (this._wmsVersion = parseFloat(this.wmsParams.version));
        var b = this._wmsVersion >= 1.3 ? "crs" : "srs";
        (this.wmsParams[b] = this._crs.code),
          e.TileLayer.prototype.onAdd.call(this, a);
      },
      getTileUrl: function (a) {
        var b = this._map,
          c = this.options.tileSize,
          d = a.multiplyBy(c),
          f = d.add([c, c]),
          g = this._crs.project(b.unproject(d, a.z)),
          h = this._crs.project(b.unproject(f, a.z)),
          i =
            this._wmsVersion >= 1.3 && this._crs === e.CRS.EPSG4326
              ? [h.y, g.x, g.y, h.x].join(",")
              : [g.x, h.y, h.x, g.y].join(","),
          j = e.Util.template(this._url, { s: this._getSubdomain(a) });
        return j + e.Util.getParamString(this.wmsParams, j, !0) + "&BBOX=" + i;
      },
      setParams: function (a, b) {
        return e.extend(this.wmsParams, a), b || this.redraw(), this;
      },
    })),
    (e.tileLayer.wms = function (a, b) {
      return new e.TileLayer.WMS(a, b);
    }),
    (e.TileLayer.Canvas = e.TileLayer.extend({
      options: { async: !1 },
      initialize: function (a) {
        e.setOptions(this, a);
      },
      redraw: function () {
        this._map && (this._reset({ hard: !0 }), this._update());
        for (var a in this._tiles) this._redrawTile(this._tiles[a]);
        return this;
      },
      _redrawTile: function (a) {
        this.drawTile(a, a._tilePoint, this._map._zoom);
      },
      _createTile: function () {
        var a = e.DomUtil.create("canvas", "leaflet-tile");
        return (
          (a.width = a.height = this.options.tileSize),
          (a.onselectstart = a.onmousemove = e.Util.falseFn),
          a
        );
      },
      _loadTile: function (a, b) {
        (a._layer = this),
          (a._tilePoint = b),
          this._redrawTile(a),
          this.options.async || this.tileDrawn(a);
      },
      drawTile: function () {},
      tileDrawn: function (a) {
        this._tileOnLoad.call(a);
      },
    })),
    (e.tileLayer.canvas = function (a) {
      return new e.TileLayer.Canvas(a);
    }),
    (e.ImageOverlay = e.Class.extend({
      includes: e.Mixin.Events,
      options: { opacity: 1 },
      initialize: function (a, b, c) {
        (this._url = a),
          (this._bounds = e.latLngBounds(b)),
          e.setOptions(this, c);
      },
      onAdd: function (a) {
        (this._map = a),
          this._image || this._initImage(),
          a._panes.overlayPane.appendChild(this._image),
          a.on("viewreset", this._reset, this),
          a.options.zoomAnimation &&
            e.Browser.any3d &&
            a.on("zoomanim", this._animateZoom, this),
          this._reset();
      },
      onRemove: function (a) {
        a.getPanes().overlayPane.removeChild(this._image),
          a.off("viewreset", this._reset, this),
          a.options.zoomAnimation && a.off("zoomanim", this._animateZoom, this);
      },
      addTo: function (a) {
        return a.addLayer(this), this;
      },
      setOpacity: function (a) {
        return (this.options.opacity = a), this._updateOpacity(), this;
      },
      bringToFront: function () {
        return (
          this._image && this._map._panes.overlayPane.appendChild(this._image),
          this
        );
      },
      bringToBack: function () {
        var a = this._map._panes.overlayPane;
        return this._image && a.insertBefore(this._image, a.firstChild), this;
      },
      setUrl: function (a) {
        (this._url = a), (this._image.src = this._url);
      },
      getAttribution: function () {
        return this.options.attribution;
      },
      _initImage: function () {
        (this._image = e.DomUtil.create("img", "leaflet-image-layer")),
          this._map.options.zoomAnimation && e.Browser.any3d
            ? e.DomUtil.addClass(this._image, "leaflet-zoom-animated")
            : e.DomUtil.addClass(this._image, "leaflet-zoom-hide"),
          this._updateOpacity(),
          e.extend(this._image, {
            galleryimg: "no",
            onselectstart: e.Util.falseFn,
            onmousemove: e.Util.falseFn,
            onload: e.bind(this._onImageLoad, this),
            src: this._url,
          });
      },
      _animateZoom: function (a) {
        var b = this._map,
          c = this._image,
          d = b.getZoomScale(a.zoom),
          f = this._bounds.getNorthWest(),
          g = this._bounds.getSouthEast(),
          h = b._latLngToNewLayerPoint(f, a.zoom, a.center),
          i = b._latLngToNewLayerPoint(g, a.zoom, a.center)._subtract(h),
          j = h._add(i._multiplyBy(0.5 * (1 - 1 / d)));
        c.style[e.DomUtil.TRANSFORM] =
          e.DomUtil.getTranslateString(j) + " scale(" + d + ") ";
      },
      _reset: function () {
        var a = this._image,
          b = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          c = this._map
            .latLngToLayerPoint(this._bounds.getSouthEast())
            ._subtract(b);
        e.DomUtil.setPosition(a, b),
          (a.style.width = c.x + "px"),
          (a.style.height = c.y + "px");
      },
      _onImageLoad: function () {
        this.fire("load");
      },
      _updateOpacity: function () {
        e.DomUtil.setOpacity(this._image, this.options.opacity);
      },
    })),
    (e.imageOverlay = function (a, b, c) {
      return new e.ImageOverlay(a, b, c);
    }),
    (e.Icon = e.Class.extend({
      options: { className: "" },
      initialize: function (a) {
        e.setOptions(this, a);
      },
      createIcon: function (a) {
        return this._createIcon("icon", a);
      },
      createShadow: function (a) {
        return this._createIcon("shadow", a);
      },
      _createIcon: function (a, b) {
        var c = this._getIconUrl(a);
        if (!c) {
          if ("icon" === a)
            throw new Error("iconUrl not set in Icon options (see the docs).");
          return null;
        }
        var d;
        return (
          (d =
            b && "IMG" === b.tagName
              ? this._createImg(c, b)
              : this._createImg(c)),
          this._setIconStyles(d, a),
          d
        );
      },
      _setIconStyles: function (a, b) {
        var f,
          c = this.options,
          d = e.point(c[b + "Size"]);
        (f =
          "shadow" === b
            ? e.point(c.shadowAnchor || c.iconAnchor)
            : e.point(c.iconAnchor)),
          !f && d && (f = d.divideBy(2, !0)),
          (a.className = "leaflet-marker-" + b + " " + c.className),
          f &&
            ((a.style.marginLeft = -f.x + "px"),
            (a.style.marginTop = -f.y + "px")),
          d && ((a.style.width = d.x + "px"), (a.style.height = d.y + "px"));
      },
      _createImg: function (a, c) {
        return (c = c || b.createElement("img")), (c.src = a), c;
      },
      _getIconUrl: function (a) {
        return e.Browser.retina && this.options[a + "RetinaUrl"]
          ? this.options[a + "RetinaUrl"]
          : this.options[a + "Url"];
      },
    })),
    (e.icon = function (a) {
      return new e.Icon(a);
    }),
    (e.Icon.Default = e.Icon.extend({
      options: {
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      },
      _getIconUrl: function (a) {
        var b = a + "Url";
        if (this.options[b]) return this.options[b];
        e.Browser.retina && "icon" === a && (a += "-2x");
        var c = e.Icon.Default.imagePath;
        if (!c)
          throw new Error(
            "Couldn't autodetect L.Icon.Default.imagePath, set it manually."
          );
        return c + "/marker-" + a + ".png";
      },
    })),
    (e.Icon.Default.imagePath = (function () {
      var d,
        e,
        f,
        g,
        h,
        a = b.getElementsByTagName("script"),
        c = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
      for (d = 0, e = a.length; e > d; d++)
        if (((f = a[d].src), (g = f.match(c))))
          return (h = f.split(c)[0]), (h ? h + "/" : "") + "images";
    })()),
    (e.Marker = e.Class.extend({
      includes: e.Mixin.Events,
      options: {
        icon: new e.Icon.Default(),
        title: "",
        alt: "",
        clickable: !0,
        draggable: !1,
        keyboard: !0,
        zIndexOffset: 0,
        opacity: 1,
        riseOnHover: !1,
        riseOffset: 250,
      },
      initialize: function (a, b) {
        e.setOptions(this, b), (this._latlng = e.latLng(a));
      },
      onAdd: function (a) {
        (this._map = a),
          a.on("viewreset", this.update, this),
          this._initIcon(),
          this.update(),
          this.fire("add"),
          a.options.zoomAnimation &&
            a.options.markerZoomAnimation &&
            a.on("zoomanim", this._animateZoom, this);
      },
      addTo: function (a) {
        return a.addLayer(this), this;
      },
      onRemove: function (a) {
        this.dragging && this.dragging.disable(),
          this._removeIcon(),
          this._removeShadow(),
          this.fire("remove"),
          a.off({ viewreset: this.update, zoomanim: this._animateZoom }, this),
          (this._map = null);
      },
      getLatLng: function () {
        return this._latlng;
      },
      setLatLng: function (a) {
        return (
          (this._latlng = e.latLng(a)),
          this.update(),
          this.fire("move", { latlng: this._latlng })
        );
      },
      setZIndexOffset: function (a) {
        return (this.options.zIndexOffset = a), this.update(), this;
      },
      setIcon: function (a) {
        return (
          (this.options.icon = a),
          this._map && (this._initIcon(), this.update()),
          this._popup && this.bindPopup(this._popup),
          this
        );
      },
      update: function () {
        if (this._icon) {
          var a = this._map.latLngToLayerPoint(this._latlng).round();
          this._setPos(a);
        }
        return this;
      },
      _initIcon: function () {
        var a = this.options,
          b = this._map,
          c = b.options.zoomAnimation && b.options.markerZoomAnimation,
          d = c ? "leaflet-zoom-animated" : "leaflet-zoom-hide",
          f = a.icon.createIcon(this._icon),
          g = !1;
        f !== this._icon &&
          (this._icon && this._removeIcon(),
          (g = !0),
          a.title && (f.title = a.title),
          a.alt && (f.alt = a.alt)),
          e.DomUtil.addClass(f, d),
          a.keyboard && (f.tabIndex = "0"),
          (this._icon = f),
          this._initInteraction(),
          a.riseOnHover &&
            e.DomEvent.on(f, "mouseover", this._bringToFront, this).on(
              f,
              "mouseout",
              this._resetZIndex,
              this
            );
        var h = a.icon.createShadow(this._shadow),
          i = !1;
        h !== this._shadow && (this._removeShadow(), (i = !0)),
          h && e.DomUtil.addClass(h, d),
          (this._shadow = h),
          a.opacity < 1 && this._updateOpacity();
        var j = this._map._panes;
        g && j.markerPane.appendChild(this._icon),
          h && i && j.shadowPane.appendChild(this._shadow);
      },
      _removeIcon: function () {
        this.options.riseOnHover &&
          e.DomEvent.off(this._icon, "mouseover", this._bringToFront).off(
            this._icon,
            "mouseout",
            this._resetZIndex
          ),
          this._map._panes.markerPane.removeChild(this._icon),
          (this._icon = null);
      },
      _removeShadow: function () {
        this._shadow && this._map._panes.shadowPane.removeChild(this._shadow),
          (this._shadow = null);
      },
      _setPos: function (a) {
        e.DomUtil.setPosition(this._icon, a),
          this._shadow && e.DomUtil.setPosition(this._shadow, a),
          (this._zIndex = a.y + this.options.zIndexOffset),
          this._resetZIndex();
      },
      _updateZIndex: function (a) {
        this._icon.style.zIndex = this._zIndex + a;
      },
      _animateZoom: function (a) {
        var b = this._map
          ._latLngToNewLayerPoint(this._latlng, a.zoom, a.center)
          .round();
        this._setPos(b);
      },
      _initInteraction: function () {
        if (this.options.clickable) {
          var a = this._icon;
          e.DomUtil.addClass(a, "leaflet-clickable"),
            e.DomEvent.on(a, "click", this._onMouseClick, this),
            e.DomEvent.on(a, "keypress", this._onKeyPress, this),
            e.Handler.MarkerDrag &&
              ((this.dragging = new e.Handler.MarkerDrag(this)),
              this.options.draggable && this.dragging.enable());
        }
      },
      _onMouseClick: function (a) {
        var b = this.dragging && this.dragging.moved();
        (this.hasEventListeners(a.type) || b) && e.DomEvent.stopPropagation(a),
          b ||
            (((this.dragging && this.dragging._enabled) ||
              !this._map.dragging ||
              !this._map.dragging.moved()) &&
              this.fire(a.type, { originalEvent: a, latlng: this._latlng }));
      },
      _onKeyPress: function (a) {
        13 === a.keyCode &&
          this.fire("click", { originalEvent: a, latlng: this._latlng });
      },
      _fireMouseEvent: function (a) {
        this.fire(a.type, { originalEvent: a, latlng: this._latlng }),
          "contextmenu" === a.type &&
            this.hasEventListeners(a.type) &&
            e.DomEvent.preventDefault(a),
          "mousedown" !== a.type
            ? e.DomEvent.stopPropagation(a)
            : e.DomEvent.preventDefault(a);
      },
      setOpacity: function (a) {
        return (
          (this.options.opacity = a), this._map && this._updateOpacity(), this
        );
      },
      _updateOpacity: function () {
        e.DomUtil.setOpacity(this._icon, this.options.opacity),
          this._shadow &&
            e.DomUtil.setOpacity(this._shadow, this.options.opacity);
      },
      _bringToFront: function () {
        this._updateZIndex(this.options.riseOffset);
      },
      _resetZIndex: function () {
        this._updateZIndex(0);
      },
    })),
    (e.marker = function (a, b) {
      return new e.Marker(a, b);
    }),
    (e.DivIcon = e.Icon.extend({
      options: { iconSize: [12, 12], className: "leaflet-div-icon", html: !1 },
      createIcon: function (a) {
        var c = a && "DIV" === a.tagName ? a : b.createElement("div"),
          d = this.options;
        return (
          (c.innerHTML = d.html !== !1 ? d.html : ""),
          d.bgPos &&
            (c.style.backgroundPosition =
              -d.bgPos.x + "px " + -d.bgPos.y + "px"),
          this._setIconStyles(c, "icon"),
          c
        );
      },
      createShadow: function () {
        return null;
      },
    })),
    (e.divIcon = function (a) {
      return new e.DivIcon(a);
    }),
    e.Map.mergeOptions({ closePopupOnClick: !0 }),
    (e.Popup = e.Class.extend({
      includes: e.Mixin.Events,
      options: {
        minWidth: 50,
        maxWidth: 300,
        autoPan: !0,
        closeButton: !0,
        offset: [0, 7],
        autoPanPadding: [5, 5],
        keepInView: !1,
        className: "",
        zoomAnimation: !0,
      },
      initialize: function (a, b) {
        e.setOptions(this, a),
          (this._source = b),
          (this._animated = e.Browser.any3d && this.options.zoomAnimation),
          (this._isOpen = !1);
      },
      onAdd: function (a) {
        (this._map = a), this._container || this._initLayout();
        var b = a.options.fadeAnimation;
        b && e.DomUtil.setOpacity(this._container, 0),
          a._panes.popupPane.appendChild(this._container),
          a.on(this._getEvents(), this),
          this.update(),
          b && e.DomUtil.setOpacity(this._container, 1),
          this.fire("open"),
          a.fire("popupopen", { popup: this }),
          this._source && this._source.fire("popupopen", { popup: this });
      },
      addTo: function (a) {
        return a.addLayer(this), this;
      },
      openOn: function (a) {
        return a.openPopup(this), this;
      },
      onRemove: function (a) {
        a._panes.popupPane.removeChild(this._container),
          e.Util.falseFn(this._container.offsetWidth),
          a.off(this._getEvents(), this),
          a.options.fadeAnimation && e.DomUtil.setOpacity(this._container, 0),
          (this._map = null),
          this.fire("close"),
          a.fire("popupclose", { popup: this }),
          this._source && this._source.fire("popupclose", { popup: this });
      },
      getLatLng: function () {
        return this._latlng;
      },
      setLatLng: function (a) {
        return (
          (this._latlng = e.latLng(a)),
          this._map && (this._updatePosition(), this._adjustPan()),
          this
        );
      },
      getContent: function () {
        return this._content;
      },
      setContent: function (a) {
        return (this._content = a), this.update(), this;
      },
      update: function () {
        this._map &&
          ((this._container.style.visibility = "hidden"),
          this._updateContent(),
          this._updateLayout(),
          this._updatePosition(),
          (this._container.style.visibility = ""),
          this._adjustPan());
      },
      _getEvents: function () {
        var a = { viewreset: this._updatePosition };
        return (
          this._animated && (a.zoomanim = this._zoomAnimation),
          ("closeOnClick" in this.options
            ? this.options.closeOnClick
            : this._map.options.closePopupOnClick) &&
            (a.preclick = this._close),
          this.options.keepInView && (a.moveend = this._adjustPan),
          a
        );
      },
      _close: function () {
        this._map && this._map.closePopup(this);
      },
      _initLayout: function () {
        var d,
          a = "leaflet-popup",
          b =
            a +
            " " +
            this.options.className +
            " leaflet-zoom-" +
            (this._animated ? "animated" : "hide"),
          c = (this._container = e.DomUtil.create("div", b));
        this.options.closeButton &&
          ((d = this._closeButton =
            e.DomUtil.create("a", a + "-close-button", c)),
          (d.href = "#close"),
          (d.innerHTML = "&#215;"),
          e.DomEvent.disableClickPropagation(d),
          e.DomEvent.on(d, "click", this._onCloseButtonClick, this));
        var f = (this._wrapper = e.DomUtil.create(
          "div",
          a + "-content-wrapper",
          c
        ));
        e.DomEvent.disableClickPropagation(f),
          (this._contentNode = e.DomUtil.create("div", a + "-content", f)),
          e.DomEvent.disableScrollPropagation(this._contentNode),
          e.DomEvent.on(f, "contextmenu", e.DomEvent.stopPropagation),
          (this._tipContainer = e.DomUtil.create(
            "div",
            a + "-tip-container",
            c
          )),
          (this._tip = e.DomUtil.create("div", a + "-tip", this._tipContainer));
      },
      _updateContent: function () {
        if (this._content) {
          if ("string" == typeof this._content)
            this._contentNode.innerHTML = this._content;
          else {
            for (; this._contentNode.hasChildNodes(); )
              this._contentNode.removeChild(this._contentNode.firstChild);
            this._contentNode.appendChild(this._content);
          }
          this.fire("contentupdate");
        }
      },
      _updateLayout: function () {
        var a = this._contentNode,
          b = a.style;
        (b.width = ""), (b.whiteSpace = "nowrap");
        var c = a.offsetWidth;
        (c = Math.min(c, this.options.maxWidth)),
          (c = Math.max(c, this.options.minWidth)),
          (b.width = c + 1 + "px"),
          (b.whiteSpace = ""),
          (b.height = "");
        var d = a.offsetHeight,
          f = this.options.maxHeight,
          g = "leaflet-popup-scrolled";
        f && d > f
          ? ((b.height = f + "px"), e.DomUtil.addClass(a, g))
          : e.DomUtil.removeClass(a, g),
          (this._containerWidth = this._container.offsetWidth);
      },
      _updatePosition: function () {
        if (this._map) {
          var a = this._map.latLngToLayerPoint(this._latlng),
            b = this._animated,
            c = e.point(this.options.offset);
          b && e.DomUtil.setPosition(this._container, a),
            (this._containerBottom = -c.y - (b ? 0 : a.y)),
            (this._containerLeft =
              -Math.round(this._containerWidth / 2) + c.x + (b ? 0 : a.x)),
            (this._container.style.bottom = this._containerBottom + "px"),
            (this._container.style.left = this._containerLeft + "px");
        }
      },
      _zoomAnimation: function (a) {
        var b = this._map._latLngToNewLayerPoint(
          this._latlng,
          a.zoom,
          a.center
        );
        e.DomUtil.setPosition(this._container, b);
      },
      _adjustPan: function () {
        if (this.options.autoPan) {
          var a = this._map,
            b = this._container.offsetHeight,
            c = this._containerWidth,
            d = new e.Point(this._containerLeft, -b - this._containerBottom);
          this._animated && d._add(e.DomUtil.getPosition(this._container));
          var f = a.layerPointToContainerPoint(d),
            g = e.point(this.options.autoPanPadding),
            h = e.point(this.options.autoPanPaddingTopLeft || g),
            i = e.point(this.options.autoPanPaddingBottomRight || g),
            j = a.getSize(),
            k = 0,
            l = 0;
          f.x + c + i.x > j.x && (k = f.x + c - j.x + i.x),
            f.x - k - h.x < 0 && (k = f.x - h.x),
            f.y + b + i.y > j.y && (l = f.y + b - j.y + i.y),
            f.y - l - h.y < 0 && (l = f.y - h.y),
            (k || l) && a.fire("autopanstart").panBy([k, l]);
        }
      },
      _onCloseButtonClick: function (a) {
        this._close(), e.DomEvent.stop(a);
      },
    })),
    (e.popup = function (a, b) {
      return new e.Popup(a, b);
    }),
    e.Map.include({
      openPopup: function (a, b, c) {
        if ((this.closePopup(), !(a instanceof e.Popup))) {
          var d = a;
          a = new e.Popup(c).setLatLng(b).setContent(d);
        }
        return (a._isOpen = !0), (this._popup = a), this.addLayer(a);
      },
      closePopup: function (a) {
        return (
          (a && a !== this._popup) || ((a = this._popup), (this._popup = null)),
          a && (this.removeLayer(a), (a._isOpen = !1)),
          this
        );
      },
    }),
    e.Marker.include({
      openPopup: function () {
        return (
          this._popup &&
            this._map &&
            !this._map.hasLayer(this._popup) &&
            (this._popup.setLatLng(this._latlng),
            this._map.openPopup(this._popup)),
          this
        );
      },
      closePopup: function () {
        return this._popup && this._popup._close(), this;
      },
      togglePopup: function () {
        return (
          this._popup &&
            (this._popup._isOpen ? this.closePopup() : this.openPopup()),
          this
        );
      },
      bindPopup: function (a, b) {
        var c = e.point(this.options.icon.options.popupAnchor || [0, 0]);
        return (
          (c = c.add(e.Popup.prototype.options.offset)),
          b && b.offset && (c = c.add(b.offset)),
          (b = e.extend({ offset: c }, b)),
          this._popupHandlersAdded ||
            (this.on("click", this.togglePopup, this)
              .on("remove", this.closePopup, this)
              .on("move", this._movePopup, this),
            (this._popupHandlersAdded = !0)),
          a instanceof e.Popup
            ? (e.setOptions(a, b), (this._popup = a))
            : (this._popup = new e.Popup(b, this).setContent(a)),
          this
        );
      },
      setPopupContent: function (a) {
        return this._popup && this._popup.setContent(a), this;
      },
      unbindPopup: function () {
        return (
          this._popup &&
            ((this._popup = null),
            this.off("click", this.togglePopup, this)
              .off("remove", this.closePopup, this)
              .off("move", this._movePopup, this),
            (this._popupHandlersAdded = !1)),
          this
        );
      },
      getPopup: function () {
        return this._popup;
      },
      _movePopup: function (a) {
        this._popup.setLatLng(a.latlng);
      },
    }),
    (e.LayerGroup = e.Class.extend({
      initialize: function (a) {
        this._layers = {};
        var b, c;
        if (a) for (b = 0, c = a.length; c > b; b++) this.addLayer(a[b]);
      },
      addLayer: function (a) {
        var b = this.getLayerId(a);
        return (this._layers[b] = a), this._map && this._map.addLayer(a), this;
      },
      removeLayer: function (a) {
        var b = a in this._layers ? a : this.getLayerId(a);
        return (
          this._map &&
            this._layers[b] &&
            this._map.removeLayer(this._layers[b]),
          delete this._layers[b],
          this
        );
      },
      hasLayer: function (a) {
        return a ? a in this._layers || this.getLayerId(a) in this._layers : !1;
      },
      clearLayers: function () {
        return this.eachLayer(this.removeLayer, this), this;
      },
      invoke: function (a) {
        var c,
          d,
          b = Array.prototype.slice.call(arguments, 1);
        for (c in this._layers) (d = this._layers[c]), d[a] && d[a].apply(d, b);
        return this;
      },
      onAdd: function (a) {
        (this._map = a), this.eachLayer(a.addLayer, a);
      },
      onRemove: function (a) {
        this.eachLayer(a.removeLayer, a), (this._map = null);
      },
      addTo: function (a) {
        return a.addLayer(this), this;
      },
      eachLayer: function (a, b) {
        for (var c in this._layers) a.call(b, this._layers[c]);
        return this;
      },
      getLayer: function (a) {
        return this._layers[a];
      },
      getLayers: function () {
        var a = [];
        for (var b in this._layers) a.push(this._layers[b]);
        return a;
      },
      setZIndex: function (a) {
        return this.invoke("setZIndex", a);
      },
      getLayerId: function (a) {
        return e.stamp(a);
      },
    })),
    (e.layerGroup = function (a) {
      return new e.LayerGroup(a);
    }),
    (e.FeatureGroup = e.LayerGroup.extend({
      includes: e.Mixin.Events,
      statics: {
        EVENTS:
          "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose",
      },
      addLayer: function (a) {
        return this.hasLayer(a)
          ? this
          : ("on" in a &&
              a.on(e.FeatureGroup.EVENTS, this._propagateEvent, this),
            e.LayerGroup.prototype.addLayer.call(this, a),
            this._popupContent &&
              a.bindPopup &&
              a.bindPopup(this._popupContent, this._popupOptions),
            this.fire("layeradd", { layer: a }));
      },
      removeLayer: function (a) {
        return this.hasLayer(a)
          ? (a in this._layers && (a = this._layers[a]),
            a.off(e.FeatureGroup.EVENTS, this._propagateEvent, this),
            e.LayerGroup.prototype.removeLayer.call(this, a),
            this._popupContent && this.invoke("unbindPopup"),
            this.fire("layerremove", { layer: a }))
          : this;
      },
      bindPopup: function (a, b) {
        return (
          (this._popupContent = a),
          (this._popupOptions = b),
          this.invoke("bindPopup", a, b)
        );
      },
      openPopup: function (a) {
        for (var b in this._layers) {
          this._layers[b].openPopup(a);
          break;
        }
        return this;
      },
      setStyle: function (a) {
        return this.invoke("setStyle", a);
      },
      bringToFront: function () {
        return this.invoke("bringToFront");
      },
      bringToBack: function () {
        return this.invoke("bringToBack");
      },
      getBounds: function () {
        var a = new e.LatLngBounds();
        return (
          this.eachLayer(function (b) {
            a.extend(b instanceof e.Marker ? b.getLatLng() : b.getBounds());
          }),
          a
        );
      },
      _propagateEvent: function (a) {
        (a = e.extend({ layer: a.target, target: this }, a)),
          this.fire(a.type, a);
      },
    })),
    (e.featureGroup = function (a) {
      return new e.FeatureGroup(a);
    }),
    (e.Path = e.Class.extend({
      includes: [e.Mixin.Events],
      statics: {
        CLIP_PADDING: (function () {
          var b = e.Browser.mobile ? 1280 : 2e3,
            c = (b / Math.max(a.outerWidth, a.outerHeight) - 1) / 2;
          return Math.max(0, Math.min(0.5, c));
        })(),
      },
      options: {
        stroke: !0,
        color: "#0033ff",
        dashArray: null,
        lineCap: null,
        lineJoin: null,
        weight: 5,
        opacity: 0.5,
        fill: !1,
        fillColor: null,
        fillOpacity: 0.2,
        clickable: !0,
      },
      initialize: function (a) {
        e.setOptions(this, a);
      },
      onAdd: function (a) {
        (this._map = a),
          this._container || (this._initElements(), this._initEvents()),
          this.projectLatlngs(),
          this._updatePath(),
          this._container && this._map._pathRoot.appendChild(this._container),
          this.fire("add"),
          a.on(
            { viewreset: this.projectLatlngs, moveend: this._updatePath },
            this
          );
      },
      addTo: function (a) {
        return a.addLayer(this), this;
      },
      onRemove: function (a) {
        a._pathRoot.removeChild(this._container),
          this.fire("remove"),
          (this._map = null),
          e.Browser.vml &&
            ((this._container = null),
            (this._stroke = null),
            (this._fill = null)),
          a.off(
            { viewreset: this.projectLatlngs, moveend: this._updatePath },
            this
          );
      },
      projectLatlngs: function () {},
      setStyle: function (a) {
        return (
          e.setOptions(this, a), this._container && this._updateStyle(), this
        );
      },
      redraw: function () {
        return this._map && (this.projectLatlngs(), this._updatePath()), this;
      },
    })),
    e.Map.include({
      _updatePathViewport: function () {
        var a = e.Path.CLIP_PADDING,
          b = this.getSize(),
          c = e.DomUtil.getPosition(this._mapPane),
          d = c.multiplyBy(-1)._subtract(b.multiplyBy(a)._round()),
          f = d.add(b.multiplyBy(1 + 2 * a)._round());
        this._pathViewport = new e.Bounds(d, f);
      },
    }),
    (e.Path.SVG_NS = "http://www.w3.org/2000/svg"),
    (e.Browser.svg = !(
      !b.createElementNS ||
      !b.createElementNS(e.Path.SVG_NS, "svg").createSVGRect
    )),
    (e.Path = e.Path.extend({
      statics: { SVG: e.Browser.svg },
      bringToFront: function () {
        var a = this._map._pathRoot,
          b = this._container;
        return b && a.lastChild !== b && a.appendChild(b), this;
      },
      bringToBack: function () {
        var a = this._map._pathRoot,
          b = this._container,
          c = a.firstChild;
        return b && c !== b && a.insertBefore(b, c), this;
      },
      getPathString: function () {},
      _createElement: function (a) {
        return b.createElementNS(e.Path.SVG_NS, a);
      },
      _initElements: function () {
        this._map._initPathRoot(), this._initPath(), this._initStyle();
      },
      _initPath: function () {
        (this._container = this._createElement("g")),
          (this._path = this._createElement("path")),
          this.options.className &&
            e.DomUtil.addClass(this._path, this.options.className),
          this._container.appendChild(this._path);
      },
      _initStyle: function () {
        this.options.stroke &&
          (this._path.setAttribute("stroke-linejoin", "round"),
          this._path.setAttribute("stroke-linecap", "round")),
          this.options.fill && this._path.setAttribute("fill-rule", "evenodd"),
          this.options.pointerEvents &&
            this._path.setAttribute(
              "pointer-events",
              this.options.pointerEvents
            ),
          this.options.clickable ||
            this.options.pointerEvents ||
            this._path.setAttribute("pointer-events", "none"),
          this._updateStyle();
      },
      _updateStyle: function () {
        this.options.stroke
          ? (this._path.setAttribute("stroke", this.options.color),
            this._path.setAttribute("stroke-opacity", this.options.opacity),
            this._path.setAttribute("stroke-width", this.options.weight),
            this.options.dashArray
              ? this._path.setAttribute(
                  "stroke-dasharray",
                  this.options.dashArray
                )
              : this._path.removeAttribute("stroke-dasharray"),
            this.options.lineCap &&
              this._path.setAttribute("stroke-linecap", this.options.lineCap),
            this.options.lineJoin &&
              this._path.setAttribute("stroke-linejoin", this.options.lineJoin))
          : this._path.setAttribute("stroke", "none"),
          this.options.fill
            ? (this._path.setAttribute(
                "fill",
                this.options.fillColor || this.options.color
              ),
              this._path.setAttribute("fill-opacity", this.options.fillOpacity))
            : this._path.setAttribute("fill", "none");
      },
      _updatePath: function () {
        var a = this.getPathString();
        a || (a = "M0 0"), this._path.setAttribute("d", a);
      },
      _initEvents: function () {
        if (this.options.clickable) {
          (e.Browser.svg || !e.Browser.vml) &&
            e.DomUtil.addClass(this._path, "leaflet-clickable"),
            e.DomEvent.on(this._container, "click", this._onMouseClick, this);
          for (
            var a = [
                "dblclick",
                "mousedown",
                "mouseover",
                "mouseout",
                "mousemove",
                "contextmenu",
              ],
              b = 0;
            b < a.length;
            b++
          )
            e.DomEvent.on(this._container, a[b], this._fireMouseEvent, this);
        }
      },
      _onMouseClick: function (a) {
        (this._map.dragging && this._map.dragging.moved()) ||
          this._fireMouseEvent(a);
      },
      _fireMouseEvent: function (a) {
        if (this.hasEventListeners(a.type)) {
          var b = this._map,
            c = b.mouseEventToContainerPoint(a),
            d = b.containerPointToLayerPoint(c),
            f = b.layerPointToLatLng(d);
          this.fire(a.type, {
            latlng: f,
            layerPoint: d,
            containerPoint: c,
            originalEvent: a,
          }),
            "contextmenu" === a.type && e.DomEvent.preventDefault(a),
            "mousemove" !== a.type && e.DomEvent.stopPropagation(a);
        }
      },
    })),
    e.Map.include({
      _initPathRoot: function () {
        this._pathRoot ||
          ((this._pathRoot = e.Path.prototype._createElement("svg")),
          this._panes.overlayPane.appendChild(this._pathRoot),
          this.options.zoomAnimation && e.Browser.any3d
            ? (e.DomUtil.addClass(this._pathRoot, "leaflet-zoom-animated"),
              this.on({
                zoomanim: this._animatePathZoom,
                zoomend: this._endPathZoom,
              }))
            : e.DomUtil.addClass(this._pathRoot, "leaflet-zoom-hide"),
          this.on("moveend", this._updateSvgViewport),
          this._updateSvgViewport());
      },
      _animatePathZoom: function (a) {
        var b = this.getZoomScale(a.zoom),
          c = this._getCenterOffset(a.center)
            ._multiplyBy(-b)
            ._add(this._pathViewport.min);
        (this._pathRoot.style[e.DomUtil.TRANSFORM] =
          e.DomUtil.getTranslateString(c) + " scale(" + b + ") "),
          (this._pathZooming = !0);
      },
      _endPathZoom: function () {
        this._pathZooming = !1;
      },
      _updateSvgViewport: function () {
        if (!this._pathZooming) {
          this._updatePathViewport();
          var a = this._pathViewport,
            b = a.min,
            c = a.max,
            d = c.x - b.x,
            f = c.y - b.y,
            g = this._pathRoot,
            h = this._panes.overlayPane;
          e.Browser.mobileWebkit && h.removeChild(g),
            e.DomUtil.setPosition(g, b),
            g.setAttribute("width", d),
            g.setAttribute("height", f),
            g.setAttribute("viewBox", [b.x, b.y, d, f].join(" ")),
            e.Browser.mobileWebkit && h.appendChild(g);
        }
      },
    }),
    e.Path.include({
      bindPopup: function (a, b) {
        return (
          a instanceof e.Popup
            ? (this._popup = a)
            : ((!this._popup || b) && (this._popup = new e.Popup(b, this)),
              this._popup.setContent(a)),
          this._popupHandlersAdded ||
            (this.on("click", this._openPopup, this).on(
              "remove",
              this.closePopup,
              this
            ),
            (this._popupHandlersAdded = !0)),
          this
        );
      },
      unbindPopup: function () {
        return (
          this._popup &&
            ((this._popup = null),
            this.off("click", this._openPopup).off("remove", this.closePopup),
            (this._popupHandlersAdded = !1)),
          this
        );
      },
      openPopup: function (a) {
        return (
          this._popup &&
            ((a =
              a ||
              this._latlng ||
              this._latlngs[Math.floor(this._latlngs.length / 2)]),
            this._openPopup({ latlng: a })),
          this
        );
      },
      closePopup: function () {
        return this._popup && this._popup._close(), this;
      },
      _openPopup: function (a) {
        this._popup.setLatLng(a.latlng), this._map.openPopup(this._popup);
      },
    }),
    (e.Browser.vml =
      !e.Browser.svg &&
      (function () {
        try {
          var a = b.createElement("div");
          a.innerHTML = '<v:shape adj="1"/>';
          var c = a.firstChild;
          return (
            (c.style.behavior = "url(#default#VML)"),
            c && "object" == typeof c.adj
          );
        } catch (d) {
          return !1;
        }
      })()),
    (e.Path =
      e.Browser.svg || !e.Browser.vml
        ? e.Path
        : e.Path.extend({
            statics: { VML: !0, CLIP_PADDING: 0.02 },
            _createElement: (function () {
              try {
                return (
                  b.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                  function (a) {
                    return b.createElement("<lvml:" + a + ' class="lvml">');
                  }
                );
              } catch (a) {
                return function (a) {
                  return b.createElement(
                    "<" +
                      a +
                      ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">'
                  );
                };
              }
            })(),
            _initPath: function () {
              var a = (this._container = this._createElement("shape"));
              e.DomUtil.addClass(
                a,
                "leaflet-vml-shape" +
                  (this.options.className ? " " + this.options.className : "")
              ),
                this.options.clickable &&
                  e.DomUtil.addClass(a, "leaflet-clickable"),
                (a.coordsize = "1 1"),
                (this._path = this._createElement("path")),
                a.appendChild(this._path),
                this._map._pathRoot.appendChild(a);
            },
            _initStyle: function () {
              this._updateStyle();
            },
            _updateStyle: function () {
              var a = this._stroke,
                b = this._fill,
                c = this.options,
                d = this._container;
              (d.stroked = c.stroke),
                (d.filled = c.fill),
                c.stroke
                  ? (a ||
                      ((a = this._stroke = this._createElement("stroke")),
                      (a.endcap = "round"),
                      d.appendChild(a)),
                    (a.weight = c.weight + "px"),
                    (a.color = c.color),
                    (a.opacity = c.opacity),
                    (a.dashStyle = c.dashArray
                      ? e.Util.isArray(c.dashArray)
                        ? c.dashArray.join(" ")
                        : c.dashArray.replace(/( *, *)/g, " ")
                      : ""),
                    c.lineCap && (a.endcap = c.lineCap.replace("butt", "flat")),
                    c.lineJoin && (a.joinstyle = c.lineJoin))
                  : a && (d.removeChild(a), (this._stroke = null)),
                c.fill
                  ? (b ||
                      ((b = this._fill = this._createElement("fill")),
                      d.appendChild(b)),
                    (b.color = c.fillColor || c.color),
                    (b.opacity = c.fillOpacity))
                  : b && (d.removeChild(b), (this._fill = null));
            },
            _updatePath: function () {
              var a = this._container.style;
              (a.display = "none"),
                (this._path.v = this.getPathString() + " "),
                (a.display = "");
            },
          })),
    e.Map.include(
      e.Browser.svg || !e.Browser.vml
        ? {}
        : {
            _initPathRoot: function () {
              if (!this._pathRoot) {
                var a = (this._pathRoot = b.createElement("div"));
                (a.className = "leaflet-vml-container"),
                  this._panes.overlayPane.appendChild(a),
                  this.on("moveend", this._updatePathViewport),
                  this._updatePathViewport();
              }
            },
          }
    ),
    (e.Browser.canvas = (function () {
      return !!b.createElement("canvas").getContext;
    })()),
    (e.Path =
      (e.Path.SVG && !a.L_PREFER_CANVAS) || !e.Browser.canvas
        ? e.Path
        : e.Path.extend({
            statics: { CANVAS: !0, SVG: !1 },
            redraw: function () {
              return (
                this._map && (this.projectLatlngs(), this._requestUpdate()),
                this
              );
            },
            setStyle: function (a) {
              return (
                e.setOptions(this, a),
                this._map && (this._updateStyle(), this._requestUpdate()),
                this
              );
            },
            onRemove: function (a) {
              a
                .off("viewreset", this.projectLatlngs, this)
                .off("moveend", this._updatePath, this),
                this.options.clickable &&
                  (this._map.off("click", this._onClick, this),
                  this._map.off("mousemove", this._onMouseMove, this)),
                this._requestUpdate(),
                this.fire("remove"),
                (this._map = null);
            },
            _requestUpdate: function () {
              this._map &&
                !e.Path._updateRequest &&
                (e.Path._updateRequest = e.Util.requestAnimFrame(
                  this._fireMapMoveEnd,
                  this._map
                ));
            },
            _fireMapMoveEnd: function () {
              (e.Path._updateRequest = null), this.fire("moveend");
            },
            _initElements: function () {
              this._map._initPathRoot(), (this._ctx = this._map._canvasCtx);
            },
            _updateStyle: function () {
              var a = this.options;
              a.stroke &&
                ((this._ctx.lineWidth = a.weight),
                (this._ctx.strokeStyle = a.color)),
                a.fill && (this._ctx.fillStyle = a.fillColor || a.color);
            },
            _drawPath: function () {
              var a, b, c, d, f, g;
              for (
                this._ctx.beginPath(), a = 0, c = this._parts.length;
                c > a;
                a++
              ) {
                for (b = 0, d = this._parts[a].length; d > b; b++)
                  (f = this._parts[a][b]),
                    (g = (0 === b ? "move" : "line") + "To"),
                    this._ctx[g](f.x, f.y);
                this instanceof e.Polygon && this._ctx.closePath();
              }
            },
            _checkIfEmpty: function () {
              return !this._parts.length;
            },
            _updatePath: function () {
              if (!this._checkIfEmpty()) {
                var a = this._ctx,
                  b = this.options;
                this._drawPath(),
                  a.save(),
                  this._updateStyle(),
                  b.fill && ((a.globalAlpha = b.fillOpacity), a.fill()),
                  b.stroke && ((a.globalAlpha = b.opacity), a.stroke()),
                  a.restore();
              }
            },
            _initEvents: function () {
              this.options.clickable &&
                (this._map.on("mousemove", this._onMouseMove, this),
                this._map.on("click", this._onClick, this));
            },
            _onClick: function (a) {
              this._containsPoint(a.layerPoint) && this.fire("click", a);
            },
            _onMouseMove: function (a) {
              this._map &&
                !this._map._animatingZoom &&
                (this._containsPoint(a.layerPoint)
                  ? ((this._ctx.canvas.style.cursor = "pointer"),
                    (this._mouseInside = !0),
                    this.fire("mouseover", a))
                  : this._mouseInside &&
                    ((this._ctx.canvas.style.cursor = ""),
                    (this._mouseInside = !1),
                    this.fire("mouseout", a)));
            },
          })),
    e.Map.include(
      (e.Path.SVG && !a.L_PREFER_CANVAS) || !e.Browser.canvas
        ? {}
        : {
            _initPathRoot: function () {
              var c,
                a = this._pathRoot;
              a ||
                ((a = this._pathRoot = b.createElement("canvas")),
                (a.style.position = "absolute"),
                (c = this._canvasCtx = a.getContext("2d")),
                (c.lineCap = "round"),
                (c.lineJoin = "round"),
                this._panes.overlayPane.appendChild(a),
                this.options.zoomAnimation &&
                  ((this._pathRoot.className = "leaflet-zoom-animated"),
                  this.on("zoomanim", this._animatePathZoom),
                  this.on("zoomend", this._endPathZoom)),
                this.on("moveend", this._updateCanvasViewport),
                this._updateCanvasViewport());
            },
            _updateCanvasViewport: function () {
              if (!this._pathZooming) {
                this._updatePathViewport();
                var a = this._pathViewport,
                  b = a.min,
                  c = a.max.subtract(b),
                  d = this._pathRoot;
                e.DomUtil.setPosition(d, b),
                  (d.width = c.x),
                  (d.height = c.y),
                  d.getContext("2d").translate(-b.x, -b.y);
              }
            },
          }
    ),
    (e.LineUtil = {
      simplify: function (a, b) {
        if (!b || !a.length) return a.slice();
        var c = b * b;
        return (a = this._reducePoints(a, c)), (a = this._simplifyDP(a, c));
      },
      pointToSegmentDistance: function (a, b, c) {
        return Math.sqrt(this._sqClosestPointOnSegment(a, b, c, !0));
      },
      closestPointOnSegment: function (a, b, c) {
        return this._sqClosestPointOnSegment(a, b, c);
      },
      _simplifyDP: function (a, b) {
        var d = a.length,
          e = typeof Uint8Array != c + "" ? Uint8Array : Array,
          f = new e(d);
        (f[0] = f[d - 1] = 1), this._simplifyDPStep(a, f, b, 0, d - 1);
        var g,
          h = [];
        for (g = 0; d > g; g++) f[g] && h.push(a[g]);
        return h;
      },
      _simplifyDPStep: function (a, b, c, d, e) {
        var g,
          h,
          i,
          f = 0;
        for (h = d + 1; e - 1 >= h; h++)
          (i = this._sqClosestPointOnSegment(a[h], a[d], a[e], !0)),
            i > f && ((g = h), (f = i));
        f > c &&
          ((b[g] = 1),
          this._simplifyDPStep(a, b, c, d, g),
          this._simplifyDPStep(a, b, c, g, e));
      },
      _reducePoints: function (a, b) {
        for (var c = [a[0]], d = 1, e = 0, f = a.length; f > d; d++)
          this._sqDist(a[d], a[e]) > b && (c.push(a[d]), (e = d));
        return f - 1 > e && c.push(a[f - 1]), c;
      },
      clipSegment: function (a, b, c, d) {
        var g,
          h,
          i,
          e = d ? this._lastCode : this._getBitCode(a, c),
          f = this._getBitCode(b, c);
        for (this._lastCode = f; ; ) {
          if (!(e | f)) return [a, b];
          if (e & f) return !1;
          (g = e || f),
            (h = this._getEdgeIntersection(a, b, g, c)),
            (i = this._getBitCode(h, c)),
            g === e ? ((a = h), (e = i)) : ((b = h), (f = i));
        }
      },
      _getEdgeIntersection: function (a, b, c, d) {
        var f = b.x - a.x,
          g = b.y - a.y,
          h = d.min,
          i = d.max;
        return 8 & c
          ? new e.Point(a.x + (f * (i.y - a.y)) / g, i.y)
          : 4 & c
          ? new e.Point(a.x + (f * (h.y - a.y)) / g, h.y)
          : 2 & c
          ? new e.Point(i.x, a.y + (g * (i.x - a.x)) / f)
          : 1 & c
          ? new e.Point(h.x, a.y + (g * (h.x - a.x)) / f)
          : void 0;
      },
      _getBitCode: function (a, b) {
        var c = 0;
        return (
          a.x < b.min.x ? (c |= 1) : a.x > b.max.x && (c |= 2),
          a.y < b.min.y ? (c |= 4) : a.y > b.max.y && (c |= 8),
          c
        );
      },
      _sqDist: function (a, b) {
        var c = b.x - a.x,
          d = b.y - a.y;
        return c * c + d * d;
      },
      _sqClosestPointOnSegment: function (a, b, c, d) {
        var k,
          f = b.x,
          g = b.y,
          h = c.x - f,
          i = c.y - g,
          j = h * h + i * i;
        return (
          j > 0 &&
            ((k = ((a.x - f) * h + (a.y - g) * i) / j),
            k > 1
              ? ((f = c.x), (g = c.y))
              : k > 0 && ((f += h * k), (g += i * k))),
          (h = a.x - f),
          (i = a.y - g),
          d ? h * h + i * i : new e.Point(f, g)
        );
      },
    }),
    (e.Polyline = e.Path.extend({
      initialize: function (a, b) {
        e.Path.prototype.initialize.call(this, b),
          (this._latlngs = this._convertLatLngs(a));
      },
      options: { smoothFactor: 1, noClip: !1 },
      projectLatlngs: function () {
        this._originalPoints = [];
        for (var a = 0, b = this._latlngs.length; b > a; a++)
          this._originalPoints[a] = this._map.latLngToLayerPoint(
            this._latlngs[a]
          );
      },
      getPathString: function () {
        for (var a = 0, b = this._parts.length, c = ""; b > a; a++)
          c += this._getPathPartStr(this._parts[a]);
        return c;
      },
      getLatLngs: function () {
        return this._latlngs;
      },
      setLatLngs: function (a) {
        return (this._latlngs = this._convertLatLngs(a)), this.redraw();
      },
      addLatLng: function (a) {
        return this._latlngs.push(e.latLng(a)), this.redraw();
      },
      spliceLatLngs: function () {
        var a = [].splice.apply(this._latlngs, arguments);
        return this._convertLatLngs(this._latlngs, !0), this.redraw(), a;
      },
      closestLayerPoint: function (a) {
        for (
          var d, f, b = 1 / 0, c = this._parts, g = null, h = 0, i = c.length;
          i > h;
          h++
        )
          for (var j = c[h], k = 1, l = j.length; l > k; k++) {
            (d = j[k - 1]), (f = j[k]);
            var m = e.LineUtil._sqClosestPointOnSegment(a, d, f, !0);
            b > m &&
              ((b = m), (g = e.LineUtil._sqClosestPointOnSegment(a, d, f)));
          }
        return g && (g.distance = Math.sqrt(b)), g;
      },
      getBounds: function () {
        return new e.LatLngBounds(this.getLatLngs());
      },
      _convertLatLngs: function (a, b) {
        var c,
          d,
          f = b ? a : [];
        for (c = 0, d = a.length; d > c; c++) {
          if (e.Util.isArray(a[c]) && "number" != typeof a[c][0]) return;
          f[c] = e.latLng(a[c]);
        }
        return f;
      },
      _initEvents: function () {
        e.Path.prototype._initEvents.call(this);
      },
      _getPathPartStr: function (a) {
        for (var g, b = e.Path.VML, c = 0, d = a.length, f = ""; d > c; c++)
          (g = a[c]), b && g._round(), (f += (c ? "L" : "M") + g.x + " " + g.y);
        return f;
      },
      _clipPoints: function () {
        var c,
          d,
          f,
          a = this._originalPoints,
          b = a.length;
        if (this.options.noClip) return (this._parts = [a]), void 0;
        this._parts = [];
        var g = this._parts,
          h = this._map._pathViewport,
          i = e.LineUtil;
        for (c = 0, d = 0; b - 1 > c; c++)
          (f = i.clipSegment(a[c], a[c + 1], h, c)),
            f &&
              ((g[d] = g[d] || []),
              g[d].push(f[0]),
              (f[1] !== a[c + 1] || c === b - 2) && (g[d].push(f[1]), d++));
      },
      _simplifyPoints: function () {
        for (
          var a = this._parts, b = e.LineUtil, c = 0, d = a.length;
          d > c;
          c++
        )
          a[c] = b.simplify(a[c], this.options.smoothFactor);
      },
      _updatePath: function () {
        this._map &&
          (this._clipPoints(),
          this._simplifyPoints(),
          e.Path.prototype._updatePath.call(this));
      },
    })),
    (e.polyline = function (a, b) {
      return new e.Polyline(a, b);
    }),
    (e.PolyUtil = {}),
    (e.PolyUtil.clipPolygon = function (a, b) {
      var c,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        d = [1, 4, 2, 8],
        n = e.LineUtil;
      for (f = 0, k = a.length; k > f; f++) a[f]._code = n._getBitCode(a[f], b);
      for (h = 0; 4 > h; h++) {
        for (l = d[h], c = [], f = 0, k = a.length, g = k - 1; k > f; g = f++)
          (i = a[f]),
            (j = a[g]),
            i._code & l
              ? j._code & l ||
                ((m = n._getEdgeIntersection(j, i, l, b)),
                (m._code = n._getBitCode(m, b)),
                c.push(m))
              : (j._code & l &&
                  ((m = n._getEdgeIntersection(j, i, l, b)),
                  (m._code = n._getBitCode(m, b)),
                  c.push(m)),
                c.push(i));
        a = c;
      }
      return a;
    }),
    (e.Polygon = e.Polyline.extend({
      options: { fill: !0 },
      initialize: function (a, b) {
        e.Polyline.prototype.initialize.call(this, a, b),
          this._initWithHoles(a);
      },
      _initWithHoles: function (a) {
        var b, c, d;
        if (a && e.Util.isArray(a[0]) && "number" != typeof a[0][0])
          for (
            this._latlngs = this._convertLatLngs(a[0]),
              this._holes = a.slice(1),
              b = 0,
              c = this._holes.length;
            c > b;
            b++
          )
            (d = this._holes[b] = this._convertLatLngs(this._holes[b])),
              d[0].equals(d[d.length - 1]) && d.pop();
        (a = this._latlngs),
          a.length >= 2 && a[0].equals(a[a.length - 1]) && a.pop();
      },
      projectLatlngs: function () {
        if (
          (e.Polyline.prototype.projectLatlngs.call(this),
          (this._holePoints = []),
          this._holes)
        ) {
          var a, b, c, d;
          for (a = 0, c = this._holes.length; c > a; a++)
            for (
              this._holePoints[a] = [], b = 0, d = this._holes[a].length;
              d > b;
              b++
            )
              this._holePoints[a][b] = this._map.latLngToLayerPoint(
                this._holes[a][b]
              );
        }
      },
      setLatLngs: function (a) {
        return a && e.Util.isArray(a[0]) && "number" != typeof a[0][0]
          ? (this._initWithHoles(a), this.redraw())
          : e.Polyline.prototype.setLatLngs.call(this, a);
      },
      _clipPoints: function () {
        var a = this._originalPoints,
          b = [];
        if (
          ((this._parts = [a].concat(this._holePoints)), !this.options.noClip)
        ) {
          for (var c = 0, d = this._parts.length; d > c; c++) {
            var f = e.PolyUtil.clipPolygon(
              this._parts[c],
              this._map._pathViewport
            );
            f.length && b.push(f);
          }
          this._parts = b;
        }
      },
      _getPathPartStr: function (a) {
        var b = e.Polyline.prototype._getPathPartStr.call(this, a);
        return b + (e.Browser.svg ? "z" : "x");
      },
    })),
    (e.polygon = function (a, b) {
      return new e.Polygon(a, b);
    }),
    (function () {
      function a(a) {
        return e.FeatureGroup.extend({
          initialize: function (a, b) {
            (this._layers = {}), (this._options = b), this.setLatLngs(a);
          },
          setLatLngs: function (b) {
            var c = 0,
              d = b.length;
            for (
              this.eachLayer(function (a) {
                d > c ? a.setLatLngs(b[c++]) : this.removeLayer(a);
              }, this);
              d > c;

            )
              this.addLayer(new a(b[c++], this._options));
            return this;
          },
          getLatLngs: function () {
            var a = [];
            return (
              this.eachLayer(function (b) {
                a.push(b.getLatLngs());
              }),
              a
            );
          },
        });
      }
      (e.MultiPolyline = a(e.Polyline)),
        (e.MultiPolygon = a(e.Polygon)),
        (e.multiPolyline = function (a, b) {
          return new e.MultiPolyline(a, b);
        }),
        (e.multiPolygon = function (a, b) {
          return new e.MultiPolygon(a, b);
        });
    })(),
    (e.Rectangle = e.Polygon.extend({
      initialize: function (a, b) {
        e.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(a), b);
      },
      setBounds: function (a) {
        this.setLatLngs(this._boundsToLatLngs(a));
      },
      _boundsToLatLngs: function (a) {
        return (
          (a = e.latLngBounds(a)),
          [
            a.getSouthWest(),
            a.getNorthWest(),
            a.getNorthEast(),
            a.getSouthEast(),
          ]
        );
      },
    })),
    (e.rectangle = function (a, b) {
      return new e.Rectangle(a, b);
    }),
    (e.Circle = e.Path.extend({
      initialize: function (a, b, c) {
        e.Path.prototype.initialize.call(this, c),
          (this._latlng = e.latLng(a)),
          (this._mRadius = b);
      },
      options: { fill: !0 },
      setLatLng: function (a) {
        return (this._latlng = e.latLng(a)), this.redraw();
      },
      setRadius: function (a) {
        return (this._mRadius = a), this.redraw();
      },
      projectLatlngs: function () {
        var a = this._getLngRadius(),
          b = this._latlng,
          c = this._map.latLngToLayerPoint([b.lat, b.lng - a]);
        (this._point = this._map.latLngToLayerPoint(b)),
          (this._radius = Math.max(this._point.x - c.x, 1));
      },
      getBounds: function () {
        var a = this._getLngRadius(),
          b = 360 * (this._mRadius / 40075017),
          c = this._latlng;
        return new e.LatLngBounds(
          [c.lat - b, c.lng - a],
          [c.lat + b, c.lng + a]
        );
      },
      getLatLng: function () {
        return this._latlng;
      },
      getPathString: function () {
        var a = this._point,
          b = this._radius;
        return this._checkIfEmpty()
          ? ""
          : e.Browser.svg
          ? "M" +
            a.x +
            "," +
            (a.y - b) +
            "A" +
            b +
            "," +
            b +
            ",0,1,1," +
            (a.x - 0.1) +
            "," +
            (a.y - b) +
            " z"
          : (a._round(),
            (b = Math.round(b)),
            "AL " + a.x + "," + a.y + " " + b + "," + b + " 0," + 23592600);
      },
      getRadius: function () {
        return this._mRadius;
      },
      _getLatRadius: function () {
        return 360 * (this._mRadius / 40075017);
      },
      _getLngRadius: function () {
        return (
          this._getLatRadius() /
          Math.cos(e.LatLng.DEG_TO_RAD * this._latlng.lat)
        );
      },
      _checkIfEmpty: function () {
        if (!this._map) return !1;
        var a = this._map._pathViewport,
          b = this._radius,
          c = this._point;
        return (
          c.x - b > a.max.x ||
          c.y - b > a.max.y ||
          c.x + b < a.min.x ||
          c.y + b < a.min.y
        );
      },
    })),
    (e.circle = function (a, b, c) {
      return new e.Circle(a, b, c);
    }),
    (e.CircleMarker = e.Circle.extend({
      options: { radius: 10, weight: 2 },
      initialize: function (a, b) {
        e.Circle.prototype.initialize.call(this, a, null, b),
          (this._radius = this.options.radius);
      },
      projectLatlngs: function () {
        this._point = this._map.latLngToLayerPoint(this._latlng);
      },
      _updateStyle: function () {
        e.Circle.prototype._updateStyle.call(this),
          this.setRadius(this.options.radius);
      },
      setLatLng: function (a) {
        return (
          e.Circle.prototype.setLatLng.call(this, a),
          this._popup && this._popup._isOpen && this._popup.setLatLng(a),
          this
        );
      },
      setRadius: function (a) {
        return (this.options.radius = this._radius = a), this.redraw();
      },
      getRadius: function () {
        return this._radius;
      },
    })),
    (e.circleMarker = function (a, b) {
      return new e.CircleMarker(a, b);
    }),
    e.Polyline.include(
      e.Path.CANVAS
        ? {
            _containsPoint: function (a, b) {
              var c,
                d,
                f,
                g,
                h,
                i,
                j,
                k = this.options.weight / 2;
              for (
                e.Browser.touch && (k += 10), c = 0, g = this._parts.length;
                g > c;
                c++
              )
                for (
                  j = this._parts[c], d = 0, h = j.length, f = h - 1;
                  h > d;
                  f = d++
                )
                  if (
                    (b || 0 !== d) &&
                    ((i = e.LineUtil.pointToSegmentDistance(a, j[f], j[d])),
                    k >= i)
                  )
                    return !0;
              return !1;
            },
          }
        : {}
    ),
    e.Polygon.include(
      e.Path.CANVAS
        ? {
            _containsPoint: function (a) {
              var c,
                d,
                f,
                g,
                h,
                i,
                j,
                k,
                b = !1;
              if (e.Polyline.prototype._containsPoint.call(this, a, !0))
                return !0;
              for (g = 0, j = this._parts.length; j > g; g++)
                for (
                  c = this._parts[g], h = 0, k = c.length, i = k - 1;
                  k > h;
                  i = h++
                )
                  (d = c[h]),
                    (f = c[i]),
                    d.y > a.y != f.y > a.y &&
                      a.x < ((f.x - d.x) * (a.y - d.y)) / (f.y - d.y) + d.x &&
                      (b = !b);
              return b;
            },
          }
        : {}
    ),
    e.Circle.include(
      e.Path.CANVAS
        ? {
            _drawPath: function () {
              var a = this._point;
              this._ctx.beginPath(),
                this._ctx.arc(a.x, a.y, this._radius, 0, 2 * Math.PI, !1);
            },
            _containsPoint: function (a) {
              var b = this._point,
                c = this.options.stroke ? this.options.weight / 2 : 0;
              return a.distanceTo(b) <= this._radius + c;
            },
          }
        : {}
    ),
    e.CircleMarker.include(
      e.Path.CANVAS
        ? {
            _updateStyle: function () {
              e.Path.prototype._updateStyle.call(this);
            },
          }
        : {}
    ),
    (e.GeoJSON = e.FeatureGroup.extend({
      initialize: function (a, b) {
        e.setOptions(this, b), (this._layers = {}), a && this.addData(a);
      },
      addData: function (a) {
        var c,
          d,
          f,
          b = e.Util.isArray(a) ? a : a.features;
        if (b) {
          for (c = 0, d = b.length; d > c; c++)
            (f = b[c]),
              (f.geometries || f.geometry || f.features || f.coordinates) &&
                this.addData(b[c]);
          return this;
        }
        var g = this.options;
        if (!g.filter || g.filter(a)) {
          var h = e.GeoJSON.geometryToLayer(
            a,
            g.pointToLayer,
            g.coordsToLatLng,
            g
          );
          return (
            (h.feature = e.GeoJSON.asFeature(a)),
            (h.defaultOptions = h.options),
            this.resetStyle(h),
            g.onEachFeature && g.onEachFeature(a, h),
            this.addLayer(h)
          );
        }
      },
      resetStyle: function (a) {
        var b = this.options.style;
        b &&
          (e.Util.extend(a.options, a.defaultOptions),
          this._setLayerStyle(a, b));
      },
      setStyle: function (a) {
        this.eachLayer(function (b) {
          this._setLayerStyle(b, a);
        }, this);
      },
      _setLayerStyle: function (a, b) {
        "function" == typeof b && (b = b(a.feature)),
          a.setStyle && a.setStyle(b);
      },
    })),
    e.extend(e.GeoJSON, {
      geometryToLayer: function (a, b, c, d) {
        var i,
          j,
          k,
          l,
          f = "Feature" === a.type ? a.geometry : a,
          g = f.coordinates,
          h = [];
        switch (((c = c || this.coordsToLatLng), f.type)) {
          case "Point":
            return (i = c(g)), b ? b(a, i) : new e.Marker(i);
          case "MultiPoint":
            for (k = 0, l = g.length; l > k; k++)
              (i = c(g[k])), h.push(b ? b(a, i) : new e.Marker(i));
            return new e.FeatureGroup(h);
          case "LineString":
            return (j = this.coordsToLatLngs(g, 0, c)), new e.Polyline(j, d);
          case "Polygon":
            if (2 === g.length && !g[1].length)
              throw new Error("Invalid GeoJSON object.");
            return (j = this.coordsToLatLngs(g, 1, c)), new e.Polygon(j, d);
          case "MultiLineString":
            return (
              (j = this.coordsToLatLngs(g, 1, c)), new e.MultiPolyline(j, d)
            );
          case "MultiPolygon":
            return (
              (j = this.coordsToLatLngs(g, 2, c)), new e.MultiPolygon(j, d)
            );
          case "GeometryCollection":
            for (k = 0, l = f.geometries.length; l > k; k++)
              h.push(
                this.geometryToLayer(
                  {
                    geometry: f.geometries[k],
                    type: "Feature",
                    properties: a.properties,
                  },
                  b,
                  c,
                  d
                )
              );
            return new e.FeatureGroup(h);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      },
      coordsToLatLng: function (a) {
        return new e.LatLng(a[1], a[0], a[2]);
      },
      coordsToLatLngs: function (a, b, c) {
        var d,
          e,
          f,
          g = [];
        for (e = 0, f = a.length; f > e; e++)
          (d = b
            ? this.coordsToLatLngs(a[e], b - 1, c)
            : (c || this.coordsToLatLng)(a[e])),
            g.push(d);
        return g;
      },
      latLngToCoords: function (a) {
        var b = [a.lng, a.lat];
        return a.alt !== c && b.push(a.alt), b;
      },
      latLngsToCoords: function (a) {
        for (var b = [], c = 0, d = a.length; d > c; c++)
          b.push(e.GeoJSON.latLngToCoords(a[c]));
        return b;
      },
      getFeature: function (a, b) {
        return a.feature
          ? e.extend({}, a.feature, { geometry: b })
          : e.GeoJSON.asFeature(b);
      },
      asFeature: function (a) {
        return "Feature" === a.type
          ? a
          : { type: "Feature", properties: {}, geometry: a };
      },
    });
  var g = {
    toGeoJSON: function () {
      return e.GeoJSON.getFeature(this, {
        type: "Point",
        coordinates: e.GeoJSON.latLngToCoords(this.getLatLng()),
      });
    },
  };
  e.Marker.include(g),
    e.Circle.include(g),
    e.CircleMarker.include(g),
    e.Polyline.include({
      toGeoJSON: function () {
        return e.GeoJSON.getFeature(this, {
          type: "LineString",
          coordinates: e.GeoJSON.latLngsToCoords(this.getLatLngs()),
        });
      },
    }),
    e.Polygon.include({
      toGeoJSON: function () {
        var b,
          c,
          d,
          a = [e.GeoJSON.latLngsToCoords(this.getLatLngs())];
        if ((a[0].push(a[0][0]), this._holes))
          for (b = 0, c = this._holes.length; c > b; b++)
            (d = e.GeoJSON.latLngsToCoords(this._holes[b])),
              d.push(d[0]),
              a.push(d);
        return e.GeoJSON.getFeature(this, { type: "Polygon", coordinates: a });
      },
    }),
    (function () {
      function a(a) {
        return function () {
          var b = [];
          return (
            this.eachLayer(function (a) {
              b.push(a.toGeoJSON().geometry.coordinates);
            }),
            e.GeoJSON.getFeature(this, { type: a, coordinates: b })
          );
        };
      }
      e.MultiPolyline.include({ toGeoJSON: a("MultiLineString") }),
        e.MultiPolygon.include({ toGeoJSON: a("MultiPolygon") }),
        e.LayerGroup.include({
          toGeoJSON: function () {
            var d,
              b = this.feature && this.feature.geometry,
              c = [];
            if (b && "MultiPoint" === b.type) return a("MultiPoint").call(this);
            var f = b && "GeometryCollection" === b.type;
            return (
              this.eachLayer(function (a) {
                a.toGeoJSON &&
                  ((d = a.toGeoJSON()),
                  c.push(f ? d.geometry : e.GeoJSON.asFeature(d)));
              }),
              f
                ? e.GeoJSON.getFeature(this, {
                    geometries: c,
                    type: "GeometryCollection",
                  })
                : { type: "FeatureCollection", features: c }
            );
          },
        });
    })(),
    (e.geoJson = function (a, b) {
      return new e.GeoJSON(a, b);
    }),
    (e.DomEvent = {
      addListener: function (a, b, c, d) {
        var h,
          i,
          j,
          f = e.stamp(c),
          g = "_leaflet_" + b + f;
        return a[g]
          ? this
          : ((h = function (b) {
              return c.call(d || a, b || e.DomEvent._getEvent());
            }),
            e.Browser.pointer && 0 === b.indexOf("touch")
              ? this.addPointerListener(a, b, h, f)
              : (e.Browser.touch &&
                  "dblclick" === b &&
                  this.addDoubleTapListener &&
                  this.addDoubleTapListener(a, h, f),
                "addEventListener" in a
                  ? "mousewheel" === b
                    ? (a.addEventListener("DOMMouseScroll", h, !1),
                      a.addEventListener(b, h, !1))
                    : "mouseenter" === b || "mouseleave" === b
                    ? ((i = h),
                      (j = "mouseenter" === b ? "mouseover" : "mouseout"),
                      (h = function (b) {
                        return e.DomEvent._checkMouse(a, b) ? i(b) : void 0;
                      }),
                      a.addEventListener(j, h, !1))
                    : "click" === b && e.Browser.android
                    ? ((i = h),
                      (h = function (a) {
                        return e.DomEvent._filterClick(a, i);
                      }),
                      a.addEventListener(b, h, !1))
                    : a.addEventListener(b, h, !1)
                  : "attachEvent" in a && a.attachEvent("on" + b, h),
                (a[g] = h),
                this));
      },
      removeListener: function (a, b, c) {
        var d = e.stamp(c),
          f = "_leaflet_" + b + d,
          g = a[f];
        return g
          ? (e.Browser.pointer && 0 === b.indexOf("touch")
              ? this.removePointerListener(a, b, d)
              : e.Browser.touch &&
                "dblclick" === b &&
                this.removeDoubleTapListener
              ? this.removeDoubleTapListener(a, d)
              : "removeEventListener" in a
              ? "mousewheel" === b
                ? (a.removeEventListener("DOMMouseScroll", g, !1),
                  a.removeEventListener(b, g, !1))
                : "mouseenter" === b || "mouseleave" === b
                ? a.removeEventListener(
                    "mouseenter" === b ? "mouseover" : "mouseout",
                    g,
                    !1
                  )
                : a.removeEventListener(b, g, !1)
              : "detachEvent" in a && a.detachEvent("on" + b, g),
            (a[f] = null),
            this)
          : this;
      },
      stopPropagation: function (a) {
        return (
          a.stopPropagation ? a.stopPropagation() : (a.cancelBubble = !0),
          e.DomEvent._skipped(a),
          this
        );
      },
      disableScrollPropagation: function (a) {
        var b = e.DomEvent.stopPropagation;
        return e.DomEvent.on(a, "mousewheel", b).on(
          a,
          "MozMousePixelScroll",
          b
        );
      },
      disableClickPropagation: function (a) {
        for (
          var b = e.DomEvent.stopPropagation, c = e.Draggable.START.length - 1;
          c >= 0;
          c--
        )
          e.DomEvent.on(a, e.Draggable.START[c], b);
        return e.DomEvent.on(a, "click", e.DomEvent._fakeStop).on(
          a,
          "dblclick",
          b
        );
      },
      preventDefault: function (a) {
        return (
          a.preventDefault ? a.preventDefault() : (a.returnValue = !1), this
        );
      },
      stop: function (a) {
        return e.DomEvent.preventDefault(a).stopPropagation(a);
      },
      getMousePosition: function (a, b) {
        if (!b) return new e.Point(a.clientX, a.clientY);
        var c = b.getBoundingClientRect();
        return new e.Point(
          a.clientX - c.left - b.clientLeft,
          a.clientY - c.top - b.clientTop
        );
      },
      getWheelDelta: function (a) {
        var b = 0;
        return (
          a.wheelDelta && (b = a.wheelDelta / 120),
          a.detail && (b = -a.detail / 3),
          b
        );
      },
      _skipEvents: {},
      _fakeStop: function (a) {
        e.DomEvent._skipEvents[a.type] = !0;
      },
      _skipped: function (a) {
        var b = this._skipEvents[a.type];
        return (this._skipEvents[a.type] = !1), b;
      },
      _checkMouse: function (a, b) {
        var c = b.relatedTarget;
        if (!c) return !0;
        try {
          for (; c && c !== a; ) c = c.parentNode;
        } catch (d) {
          return !1;
        }
        return c !== a;
      },
      _getEvent: function () {
        var b = a.event;
        if (!b)
          for (
            var c = arguments.callee.caller;
            c && ((b = c.arguments[0]), !b || a.Event !== b.constructor);

          )
            c = c.caller;
        return b;
      },
      _filterClick: function (a, b) {
        var c = a.timeStamp || a.originalEvent.timeStamp,
          d = e.DomEvent._lastClick && c - e.DomEvent._lastClick;
        return (d && d > 100 && 500 > d) ||
          (a.target._simulatedClick && !a._simulated)
          ? (e.DomEvent.stop(a), void 0)
          : ((e.DomEvent._lastClick = c), b(a));
      },
    }),
    (e.DomEvent.on = e.DomEvent.addListener),
    (e.DomEvent.off = e.DomEvent.removeListener),
    (e.Draggable = e.Class.extend({
      includes: e.Mixin.Events,
      statics: {
        START: e.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
        END: {
          mousedown: "mouseup",
          touchstart: "touchend",
          pointerdown: "touchend",
          MSPointerDown: "touchend",
        },
        MOVE: {
          mousedown: "mousemove",
          touchstart: "touchmove",
          pointerdown: "touchmove",
          MSPointerDown: "touchmove",
        },
      },
      initialize: function (a, b) {
        (this._element = a), (this._dragStartTarget = b || a);
      },
      enable: function () {
        if (!this._enabled) {
          for (var a = e.Draggable.START.length - 1; a >= 0; a--)
            e.DomEvent.on(
              this._dragStartTarget,
              e.Draggable.START[a],
              this._onDown,
              this
            );
          this._enabled = !0;
        }
      },
      disable: function () {
        if (this._enabled) {
          for (var a = e.Draggable.START.length - 1; a >= 0; a--)
            e.DomEvent.off(
              this._dragStartTarget,
              e.Draggable.START[a],
              this._onDown,
              this
            );
          (this._enabled = !1), (this._moved = !1);
        }
      },
      _onDown: function (a) {
        if (
          ((this._moved = !1),
          !(
            a.shiftKey ||
            (1 !== a.which && 1 !== a.button && !a.touches) ||
            (e.DomEvent.stopPropagation(a),
            e.Draggable._disabled ||
              (e.DomUtil.disableImageDrag(),
              e.DomUtil.disableTextSelection(),
              this._moving))
          ))
        ) {
          var c = a.touches ? a.touches[0] : a;
          (this._startPoint = new e.Point(c.clientX, c.clientY)),
            (this._startPos = this._newPos =
              e.DomUtil.getPosition(this._element)),
            e.DomEvent.on(b, e.Draggable.MOVE[a.type], this._onMove, this).on(
              b,
              e.Draggable.END[a.type],
              this._onUp,
              this
            );
        }
      },
      _onMove: function (a) {
        if (a.touches && a.touches.length > 1)
          return (this._moved = !0), void 0;
        var c = a.touches && 1 === a.touches.length ? a.touches[0] : a,
          d = new e.Point(c.clientX, c.clientY),
          f = d.subtract(this._startPoint);
        (f.x || f.y) &&
          ((e.Browser.touch && Math.abs(f.x) + Math.abs(f.y) < 3) ||
            (e.DomEvent.preventDefault(a),
            this._moved ||
              (this.fire("dragstart"),
              (this._moved = !0),
              (this._startPos = e.DomUtil.getPosition(this._element).subtract(
                f
              )),
              e.DomUtil.addClass(b.body, "leaflet-dragging"),
              (this._lastTarget = a.target || a.srcElement),
              e.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")),
            (this._newPos = this._startPos.add(f)),
            (this._moving = !0),
            e.Util.cancelAnimFrame(this._animRequest),
            (this._animRequest = e.Util.requestAnimFrame(
              this._updatePosition,
              this,
              !0,
              this._dragStartTarget
            ))));
      },
      _updatePosition: function () {
        this.fire("predrag"),
          e.DomUtil.setPosition(this._element, this._newPos),
          this.fire("drag");
      },
      _onUp: function () {
        e.DomUtil.removeClass(b.body, "leaflet-dragging"),
          this._lastTarget &&
            (e.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"),
            (this._lastTarget = null));
        for (var a in e.Draggable.MOVE)
          e.DomEvent.off(b, e.Draggable.MOVE[a], this._onMove).off(
            b,
            e.Draggable.END[a],
            this._onUp
          );
        e.DomUtil.enableImageDrag(),
          e.DomUtil.enableTextSelection(),
          this._moved &&
            this._moving &&
            (e.Util.cancelAnimFrame(this._animRequest),
            this.fire("dragend", {
              distance: this._newPos.distanceTo(this._startPos),
            })),
          (this._moving = !1);
      },
    })),
    (e.Handler = e.Class.extend({
      initialize: function (a) {
        this._map = a;
      },
      enable: function () {
        this._enabled || ((this._enabled = !0), this.addHooks());
      },
      disable: function () {
        this._enabled && ((this._enabled = !1), this.removeHooks());
      },
      enabled: function () {
        return !!this._enabled;
      },
    })),
    e.Map.mergeOptions({
      dragging: !0,
      inertia: !e.Browser.android23,
      inertiaDeceleration: 3400,
      inertiaMaxSpeed: 1 / 0,
      inertiaThreshold: e.Browser.touch ? 32 : 18,
      easeLinearity: 0.25,
      worldCopyJump: !1,
    }),
    (e.Map.Drag = e.Handler.extend({
      addHooks: function () {
        if (!this._draggable) {
          var a = this._map;
          (this._draggable = new e.Draggable(a._mapPane, a._container)),
            this._draggable.on(
              {
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd,
              },
              this
            ),
            a.options.worldCopyJump &&
              (this._draggable.on("predrag", this._onPreDrag, this),
              a.on("viewreset", this._onViewReset, this),
              a.whenReady(this._onViewReset, this));
        }
        this._draggable.enable();
      },
      removeHooks: function () {
        this._draggable.disable();
      },
      moved: function () {
        return this._draggable && this._draggable._moved;
      },
      _onDragStart: function () {
        var a = this._map;
        a._panAnim && a._panAnim.stop(),
          a.fire("movestart").fire("dragstart"),
          a.options.inertia && ((this._positions = []), (this._times = []));
      },
      _onDrag: function () {
        if (this._map.options.inertia) {
          var a = (this._lastTime = +new Date()),
            b = (this._lastPos = this._draggable._newPos);
          this._positions.push(b),
            this._times.push(a),
            a - this._times[0] > 200 &&
              (this._positions.shift(), this._times.shift());
        }
        this._map.fire("move").fire("drag");
      },
      _onViewReset: function () {
        var a = this._map.getSize()._divideBy(2),
          b = this._map.latLngToLayerPoint([0, 0]);
        (this._initialWorldOffset = b.subtract(a).x),
          (this._worldWidth = this._map.project([0, 180]).x);
      },
      _onPreDrag: function () {
        var a = this._worldWidth,
          b = Math.round(a / 2),
          c = this._initialWorldOffset,
          d = this._draggable._newPos.x,
          e = ((d - b + c) % a) + b - c,
          f = ((d + b + c) % a) - b - c,
          g = Math.abs(e + c) < Math.abs(f + c) ? e : f;
        this._draggable._newPos.x = g;
      },
      _onDragEnd: function (a) {
        var b = this._map,
          c = b.options,
          d = +new Date() - this._lastTime,
          f = !c.inertia || d > c.inertiaThreshold || !this._positions[0];
        if ((b.fire("dragend", a), f)) b.fire("moveend");
        else {
          var g = this._lastPos.subtract(this._positions[0]),
            h = (this._lastTime + d - this._times[0]) / 1e3,
            i = c.easeLinearity,
            j = g.multiplyBy(i / h),
            k = j.distanceTo([0, 0]),
            l = Math.min(c.inertiaMaxSpeed, k),
            m = j.multiplyBy(l / k),
            n = l / (c.inertiaDeceleration * i),
            o = m.multiplyBy(-n / 2).round();
          o.x && o.y
            ? ((o = b._limitOffset(o, b.options.maxBounds)),
              e.Util.requestAnimFrame(function () {
                b.panBy(o, { duration: n, easeLinearity: i, noMoveStart: !0 });
              }))
            : b.fire("moveend");
        }
      },
    })),
    e.Map.addInitHook("addHandler", "dragging", e.Map.Drag),
    e.Map.mergeOptions({ doubleClickZoom: !0 }),
    (e.Map.DoubleClickZoom = e.Handler.extend({
      addHooks: function () {
        this._map.on("dblclick", this._onDoubleClick, this);
      },
      removeHooks: function () {
        this._map.off("dblclick", this._onDoubleClick, this);
      },
      _onDoubleClick: function (a) {
        var b = this._map,
          c = b.getZoom() + (a.originalEvent.shiftKey ? -1 : 1);
        "center" === b.options.doubleClickZoom
          ? b.setZoom(c)
          : b.setZoomAround(a.containerPoint, c);
      },
    })),
    e.Map.addInitHook("addHandler", "doubleClickZoom", e.Map.DoubleClickZoom),
    e.Map.mergeOptions({ scrollWheelZoom: !0 }),
    (e.Map.ScrollWheelZoom = e.Handler.extend({
      addHooks: function () {
        e.DomEvent.on(
          this._map._container,
          "mousewheel",
          this._onWheelScroll,
          this
        ),
          e.DomEvent.on(
            this._map._container,
            "MozMousePixelScroll",
            e.DomEvent.preventDefault
          ),
          (this._delta = 0);
      },
      removeHooks: function () {
        e.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll),
          e.DomEvent.off(
            this._map._container,
            "MozMousePixelScroll",
            e.DomEvent.preventDefault
          );
      },
      _onWheelScroll: function (a) {
        var b = e.DomEvent.getWheelDelta(a);
        (this._delta += b),
          (this._lastMousePos = this._map.mouseEventToContainerPoint(a)),
          this._startTime || (this._startTime = +new Date());
        var c = Math.max(40 - (+new Date() - this._startTime), 0);
        clearTimeout(this._timer),
          (this._timer = setTimeout(e.bind(this._performZoom, this), c)),
          e.DomEvent.preventDefault(a),
          e.DomEvent.stopPropagation(a);
      },
      _performZoom: function () {
        var a = this._map,
          b = this._delta,
          c = a.getZoom();
        (b = b > 0 ? Math.ceil(b) : Math.floor(b)),
          (b = Math.max(Math.min(b, 4), -4)),
          (b = a._limitZoom(c + b) - c),
          (this._delta = 0),
          (this._startTime = null),
          b &&
            ("center" === a.options.scrollWheelZoom
              ? a.setZoom(c + b)
              : a.setZoomAround(this._lastMousePos, c + b));
      },
    })),
    e.Map.addInitHook("addHandler", "scrollWheelZoom", e.Map.ScrollWheelZoom),
    e.extend(e.DomEvent, {
      _touchstart: e.Browser.msPointer
        ? "MSPointerDown"
        : e.Browser.pointer
        ? "pointerdown"
        : "touchstart",
      _touchend: e.Browser.msPointer
        ? "MSPointerUp"
        : e.Browser.pointer
        ? "pointerup"
        : "touchend",
      addDoubleTapListener: function (a, c, d) {
        function n(a) {
          var b;
          if (
            (e.Browser.pointer
              ? (m.push(a.pointerId), (b = m.length))
              : (b = a.touches.length),
            !(b > 1))
          ) {
            var c = Date.now(),
              d = c - (f || c);
            (i = a.touches ? a.touches[0] : a), (g = d > 0 && h >= d), (f = c);
          }
        }
        function o(a) {
          if (e.Browser.pointer) {
            var b = m.indexOf(a.pointerId);
            if (-1 === b) return;
            m.splice(b, 1);
          }
          if (g) {
            if (e.Browser.pointer) {
              var h,
                d = {};
              for (var j in i)
                (h = i[j]), (d[j] = "function" == typeof h ? h.bind(i) : h);
              i = d;
            }
            (i.type = "dblclick"), c(i), (f = null);
          }
        }
        var f,
          i,
          g = !1,
          h = 250,
          j = "_leaflet_",
          k = this._touchstart,
          l = this._touchend,
          m = [];
        (a[j + k + d] = n), (a[j + l + d] = o);
        var p = e.Browser.pointer ? b.documentElement : a;
        return (
          a.addEventListener(k, n, !1),
          p.addEventListener(l, o, !1),
          e.Browser.pointer &&
            p.addEventListener(e.DomEvent.POINTER_CANCEL, o, !1),
          this
        );
      },
      removeDoubleTapListener: function (a, c) {
        var d = "_leaflet_";
        return (
          a.removeEventListener(
            this._touchstart,
            a[d + this._touchstart + c],
            !1
          ),
          (e.Browser.pointer ? b.documentElement : a).removeEventListener(
            this._touchend,
            a[d + this._touchend + c],
            !1
          ),
          e.Browser.pointer &&
            b.documentElement.removeEventListener(
              e.DomEvent.POINTER_CANCEL,
              a[d + this._touchend + c],
              !1
            ),
          this
        );
      },
    }),
    e.extend(e.DomEvent, {
      POINTER_DOWN: e.Browser.msPointer ? "MSPointerDown" : "pointerdown",
      POINTER_MOVE: e.Browser.msPointer ? "MSPointerMove" : "pointermove",
      POINTER_UP: e.Browser.msPointer ? "MSPointerUp" : "pointerup",
      POINTER_CANCEL: e.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
      _pointers: [],
      _pointerDocumentListener: !1,
      addPointerListener: function (a, b, c, d) {
        switch (b) {
          case "touchstart":
            return this.addPointerListenerStart(a, b, c, d);
          case "touchend":
            return this.addPointerListenerEnd(a, b, c, d);
          case "touchmove":
            return this.addPointerListenerMove(a, b, c, d);
          default:
            throw "Unknown touch event type";
        }
      },
      addPointerListenerStart: function (a, c, d, f) {
        var g = "_leaflet_",
          h = this._pointers,
          i = function (a) {
            e.DomEvent.preventDefault(a);
            for (var b = !1, c = 0; c < h.length; c++)
              if (h[c].pointerId === a.pointerId) {
                b = !0;
                break;
              }
            b || h.push(a),
              (a.touches = h.slice()),
              (a.changedTouches = [a]),
              d(a);
          };
        if (
          ((a[g + "touchstart" + f] = i),
          a.addEventListener(this.POINTER_DOWN, i, !1),
          !this._pointerDocumentListener)
        ) {
          var j = function (a) {
            for (var b = 0; b < h.length; b++)
              if (h[b].pointerId === a.pointerId) {
                h.splice(b, 1);
                break;
              }
          };
          b.documentElement.addEventListener(this.POINTER_UP, j, !1),
            b.documentElement.addEventListener(this.POINTER_CANCEL, j, !1),
            (this._pointerDocumentListener = !0);
        }
        return this;
      },
      addPointerListenerMove: function (a, b, c, d) {
        function g(a) {
          if (
            (a.pointerType !== a.MSPOINTER_TYPE_MOUSE &&
              "mouse" !== a.pointerType) ||
            0 !== a.buttons
          ) {
            for (var b = 0; b < f.length; b++)
              if (f[b].pointerId === a.pointerId) {
                f[b] = a;
                break;
              }
            (a.touches = f.slice()), (a.changedTouches = [a]), c(a);
          }
        }
        var e = "_leaflet_",
          f = this._pointers;
        return (
          (a[e + "touchmove" + d] = g),
          a.addEventListener(this.POINTER_MOVE, g, !1),
          this
        );
      },
      addPointerListenerEnd: function (a, b, c, d) {
        var e = "_leaflet_",
          f = this._pointers,
          g = function (a) {
            for (var b = 0; b < f.length; b++)
              if (f[b].pointerId === a.pointerId) {
                f.splice(b, 1);
                break;
              }
            (a.touches = f.slice()), (a.changedTouches = [a]), c(a);
          };
        return (
          (a[e + "touchend" + d] = g),
          a.addEventListener(this.POINTER_UP, g, !1),
          a.addEventListener(this.POINTER_CANCEL, g, !1),
          this
        );
      },
      removePointerListener: function (a, b, c) {
        var d = "_leaflet_",
          e = a[d + b + c];
        switch (b) {
          case "touchstart":
            a.removeEventListener(this.POINTER_DOWN, e, !1);
            break;
          case "touchmove":
            a.removeEventListener(this.POINTER_MOVE, e, !1);
            break;
          case "touchend":
            a.removeEventListener(this.POINTER_UP, e, !1),
              a.removeEventListener(this.POINTER_CANCEL, e, !1);
        }
        return this;
      },
    }),
    e.Map.mergeOptions({
      touchZoom: e.Browser.touch && !e.Browser.android23,
      bounceAtZoomLimits: !0,
    }),
    (e.Map.TouchZoom = e.Handler.extend({
      addHooks: function () {
        e.DomEvent.on(
          this._map._container,
          "touchstart",
          this._onTouchStart,
          this
        );
      },
      removeHooks: function () {
        e.DomEvent.off(
          this._map._container,
          "touchstart",
          this._onTouchStart,
          this
        );
      },
      _onTouchStart: function (a) {
        var c = this._map;
        if (
          a.touches &&
          2 === a.touches.length &&
          !c._animatingZoom &&
          !this._zooming
        ) {
          var d = c.mouseEventToLayerPoint(a.touches[0]),
            f = c.mouseEventToLayerPoint(a.touches[1]),
            g = c._getCenterLayerPoint();
          (this._startCenter = d.add(f)._divideBy(2)),
            (this._startDist = d.distanceTo(f)),
            (this._moved = !1),
            (this._zooming = !0),
            (this._centerOffset = g.subtract(this._startCenter)),
            c._panAnim && c._panAnim.stop(),
            e.DomEvent.on(b, "touchmove", this._onTouchMove, this).on(
              b,
              "touchend",
              this._onTouchEnd,
              this
            ),
            e.DomEvent.preventDefault(a);
        }
      },
      _onTouchMove: function (a) {
        var b = this._map;
        if (a.touches && 2 === a.touches.length && this._zooming) {
          var c = b.mouseEventToLayerPoint(a.touches[0]),
            d = b.mouseEventToLayerPoint(a.touches[1]);
          (this._scale = c.distanceTo(d) / this._startDist),
            (this._delta = c._add(d)._divideBy(2)._subtract(this._startCenter)),
            1 !== this._scale &&
              (b.options.bounceAtZoomLimits ||
                !(
                  (b.getZoom() === b.getMinZoom() && this._scale < 1) ||
                  (b.getZoom() === b.getMaxZoom() && this._scale > 1)
                )) &&
              (this._moved ||
                (e.DomUtil.addClass(b._mapPane, "leaflet-touching"),
                b.fire("movestart").fire("zoomstart"),
                (this._moved = !0)),
              e.Util.cancelAnimFrame(this._animRequest),
              (this._animRequest = e.Util.requestAnimFrame(
                this._updateOnMove,
                this,
                !0,
                this._map._container
              )),
              e.DomEvent.preventDefault(a));
        }
      },
      _updateOnMove: function () {
        var a = this._map,
          b = this._getScaleOrigin(),
          c = a.layerPointToLatLng(b),
          d = a.getScaleZoom(this._scale);
        a._animateZoom(
          c,
          d,
          this._startCenter,
          this._scale,
          this._delta,
          !1,
          !0
        );
      },
      _onTouchEnd: function () {
        if (!this._moved || !this._zooming) return (this._zooming = !1), void 0;
        var a = this._map;
        (this._zooming = !1),
          e.DomUtil.removeClass(a._mapPane, "leaflet-touching"),
          e.Util.cancelAnimFrame(this._animRequest),
          e.DomEvent.off(b, "touchmove", this._onTouchMove).off(
            b,
            "touchend",
            this._onTouchEnd
          );
        var c = this._getScaleOrigin(),
          d = a.layerPointToLatLng(c),
          f = a.getZoom(),
          g = a.getScaleZoom(this._scale) - f,
          h = g > 0 ? Math.ceil(g) : Math.floor(g),
          i = a._limitZoom(f + h),
          j = a.getZoomScale(i) / this._scale;
        a._animateZoom(d, i, c, j);
      },
      _getScaleOrigin: function () {
        var a = this._centerOffset.subtract(this._delta).divideBy(this._scale);
        return this._startCenter.add(a);
      },
    })),
    e.Map.addInitHook("addHandler", "touchZoom", e.Map.TouchZoom),
    e.Map.mergeOptions({ tap: !0, tapTolerance: 15 }),
    (e.Map.Tap = e.Handler.extend({
      addHooks: function () {
        e.DomEvent.on(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function () {
        e.DomEvent.off(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function (a) {
        if (a.touches) {
          if (
            (e.DomEvent.preventDefault(a),
            (this._fireClick = !0),
            a.touches.length > 1)
          )
            return (
              (this._fireClick = !1), clearTimeout(this._holdTimeout), void 0
            );
          var c = a.touches[0],
            d = c.target;
          (this._startPos = this._newPos = new e.Point(c.clientX, c.clientY)),
            d.tagName &&
              "a" === d.tagName.toLowerCase() &&
              e.DomUtil.addClass(d, "leaflet-active"),
            (this._holdTimeout = setTimeout(
              e.bind(function () {
                this._isTapValid() &&
                  ((this._fireClick = !1),
                  this._onUp(),
                  this._simulateEvent("contextmenu", c));
              }, this),
              1e3
            )),
            e.DomEvent.on(b, "touchmove", this._onMove, this).on(
              b,
              "touchend",
              this._onUp,
              this
            );
        }
      },
      _onUp: function (a) {
        if (
          (clearTimeout(this._holdTimeout),
          e.DomEvent.off(b, "touchmove", this._onMove, this).off(
            b,
            "touchend",
            this._onUp,
            this
          ),
          this._fireClick && a && a.changedTouches)
        ) {
          var c = a.changedTouches[0],
            d = c.target;
          d &&
            d.tagName &&
            "a" === d.tagName.toLowerCase() &&
            e.DomUtil.removeClass(d, "leaflet-active"),
            this._isTapValid() && this._simulateEvent("click", c);
        }
      },
      _isTapValid: function () {
        return (
          this._newPos.distanceTo(this._startPos) <=
          this._map.options.tapTolerance
        );
      },
      _onMove: function (a) {
        var b = a.touches[0];
        this._newPos = new e.Point(b.clientX, b.clientY);
      },
      _simulateEvent: function (c, d) {
        var e = b.createEvent("MouseEvents");
        (e._simulated = !0),
          (d.target._simulatedClick = !0),
          e.initMouseEvent(
            c,
            !0,
            !0,
            a,
            1,
            d.screenX,
            d.screenY,
            d.clientX,
            d.clientY,
            !1,
            !1,
            !1,
            !1,
            0,
            null
          ),
          d.target.dispatchEvent(e);
      },
    })),
    e.Browser.touch &&
      !e.Browser.pointer &&
      e.Map.addInitHook("addHandler", "tap", e.Map.Tap),
    e.Map.mergeOptions({ boxZoom: !0 }),
    (e.Map.BoxZoom = e.Handler.extend({
      initialize: function (a) {
        (this._map = a),
          (this._container = a._container),
          (this._pane = a._panes.overlayPane),
          (this._moved = !1);
      },
      addHooks: function () {
        e.DomEvent.on(this._container, "mousedown", this._onMouseDown, this);
      },
      removeHooks: function () {
        e.DomEvent.off(this._container, "mousedown", this._onMouseDown),
          (this._moved = !1);
      },
      moved: function () {
        return this._moved;
      },
      _onMouseDown: function (a) {
        return (
          (this._moved = !1),
          !a.shiftKey || (1 !== a.which && 1 !== a.button)
            ? !1
            : (e.DomUtil.disableTextSelection(),
              e.DomUtil.disableImageDrag(),
              (this._startLayerPoint = this._map.mouseEventToLayerPoint(a)),
              e.DomEvent.on(b, "mousemove", this._onMouseMove, this)
                .on(b, "mouseup", this._onMouseUp, this)
                .on(b, "keydown", this._onKeyDown, this),
              void 0)
        );
      },
      _onMouseMove: function (a) {
        this._moved ||
          ((this._box = e.DomUtil.create(
            "div",
            "leaflet-zoom-box",
            this._pane
          )),
          e.DomUtil.setPosition(this._box, this._startLayerPoint),
          (this._container.style.cursor = "crosshair"),
          this._map.fire("boxzoomstart"));
        var b = this._startLayerPoint,
          c = this._box,
          d = this._map.mouseEventToLayerPoint(a),
          f = d.subtract(b),
          g = new e.Point(Math.min(d.x, b.x), Math.min(d.y, b.y));
        e.DomUtil.setPosition(c, g),
          (this._moved = !0),
          (c.style.width = Math.max(0, Math.abs(f.x) - 4) + "px"),
          (c.style.height = Math.max(0, Math.abs(f.y) - 4) + "px");
      },
      _finish: function () {
        this._moved &&
          (this._pane.removeChild(this._box),
          (this._container.style.cursor = "")),
          e.DomUtil.enableTextSelection(),
          e.DomUtil.enableImageDrag(),
          e.DomEvent.off(b, "mousemove", this._onMouseMove)
            .off(b, "mouseup", this._onMouseUp)
            .off(b, "keydown", this._onKeyDown);
      },
      _onMouseUp: function (a) {
        this._finish();
        var b = this._map,
          c = b.mouseEventToLayerPoint(a);
        if (!this._startLayerPoint.equals(c)) {
          var d = new e.LatLngBounds(
            b.layerPointToLatLng(this._startLayerPoint),
            b.layerPointToLatLng(c)
          );
          b.fitBounds(d), b.fire("boxzoomend", { boxZoomBounds: d });
        }
      },
      _onKeyDown: function (a) {
        27 === a.keyCode && this._finish();
      },
    })),
    e.Map.addInitHook("addHandler", "boxZoom", e.Map.BoxZoom),
    e.Map.mergeOptions({
      keyboard: !0,
      keyboardPanOffset: 80,
      keyboardZoomOffset: 1,
    }),
    (e.Map.Keyboard = e.Handler.extend({
      keyCodes: {
        left: [37],
        right: [39],
        down: [40],
        up: [38],
        zoomIn: [187, 107, 61, 171],
        zoomOut: [189, 109, 173],
      },
      initialize: function (a) {
        (this._map = a),
          this._setPanOffset(a.options.keyboardPanOffset),
          this._setZoomOffset(a.options.keyboardZoomOffset);
      },
      addHooks: function () {
        var a = this._map._container;
        -1 === a.tabIndex && (a.tabIndex = "0"),
          e.DomEvent.on(a, "focus", this._onFocus, this)
            .on(a, "blur", this._onBlur, this)
            .on(a, "mousedown", this._onMouseDown, this),
          this._map
            .on("focus", this._addHooks, this)
            .on("blur", this._removeHooks, this);
      },
      removeHooks: function () {
        this._removeHooks();
        var a = this._map._container;
        e.DomEvent.off(a, "focus", this._onFocus, this)
          .off(a, "blur", this._onBlur, this)
          .off(a, "mousedown", this._onMouseDown, this),
          this._map
            .off("focus", this._addHooks, this)
            .off("blur", this._removeHooks, this);
      },
      _onMouseDown: function () {
        if (!this._focused) {
          var c = b.body,
            d = b.documentElement,
            e = c.scrollTop || d.scrollTop,
            f = c.scrollLeft || d.scrollLeft;
          this._map._container.focus(), a.scrollTo(f, e);
        }
      },
      _onFocus: function () {
        (this._focused = !0), this._map.fire("focus");
      },
      _onBlur: function () {
        (this._focused = !1), this._map.fire("blur");
      },
      _setPanOffset: function (a) {
        var d,
          e,
          b = (this._panKeys = {}),
          c = this.keyCodes;
        for (d = 0, e = c.left.length; e > d; d++) b[c.left[d]] = [-1 * a, 0];
        for (d = 0, e = c.right.length; e > d; d++) b[c.right[d]] = [a, 0];
        for (d = 0, e = c.down.length; e > d; d++) b[c.down[d]] = [0, a];
        for (d = 0, e = c.up.length; e > d; d++) b[c.up[d]] = [0, -1 * a];
      },
      _setZoomOffset: function (a) {
        var d,
          e,
          b = (this._zoomKeys = {}),
          c = this.keyCodes;
        for (d = 0, e = c.zoomIn.length; e > d; d++) b[c.zoomIn[d]] = a;
        for (d = 0, e = c.zoomOut.length; e > d; d++) b[c.zoomOut[d]] = -a;
      },
      _addHooks: function () {
        e.DomEvent.on(b, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function () {
        e.DomEvent.off(b, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function (a) {
        var b = a.keyCode,
          c = this._map;
        if (b in this._panKeys) {
          if (c._panAnim && c._panAnim._inProgress) return;
          c.panBy(this._panKeys[b]),
            c.options.maxBounds && c.panInsideBounds(c.options.maxBounds);
        } else {
          if (!(b in this._zoomKeys)) return;
          c.setZoom(c.getZoom() + this._zoomKeys[b]);
        }
        e.DomEvent.stop(a);
      },
    })),
    e.Map.addInitHook("addHandler", "keyboard", e.Map.Keyboard),
    (e.Handler.MarkerDrag = e.Handler.extend({
      initialize: function (a) {
        this._marker = a;
      },
      addHooks: function () {
        var a = this._marker._icon;
        this._draggable || (this._draggable = new e.Draggable(a, a)),
          this._draggable
            .on("dragstart", this._onDragStart, this)
            .on("drag", this._onDrag, this)
            .on("dragend", this._onDragEnd, this),
          this._draggable.enable(),
          e.DomUtil.addClass(this._marker._icon, "leaflet-marker-draggable");
      },
      removeHooks: function () {
        this._draggable
          .off("dragstart", this._onDragStart, this)
          .off("drag", this._onDrag, this)
          .off("dragend", this._onDragEnd, this),
          this._draggable.disable(),
          e.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable");
      },
      moved: function () {
        return this._draggable && this._draggable._moved;
      },
      _onDragStart: function () {
        this._marker.closePopup().fire("movestart").fire("dragstart");
      },
      _onDrag: function () {
        var a = this._marker,
          b = a._shadow,
          c = e.DomUtil.getPosition(a._icon),
          d = a._map.layerPointToLatLng(c);
        b && e.DomUtil.setPosition(b, c),
          (a._latlng = d),
          a.fire("move", { latlng: d }).fire("drag");
      },
      _onDragEnd: function (a) {
        this._marker.fire("moveend").fire("dragend", a);
      },
    })),
    (e.Control = e.Class.extend({
      options: { position: "topright" },
      initialize: function (a) {
        e.setOptions(this, a);
      },
      getPosition: function () {
        return this.options.position;
      },
      setPosition: function (a) {
        var b = this._map;
        return (
          b && b.removeControl(this),
          (this.options.position = a),
          b && b.addControl(this),
          this
        );
      },
      getContainer: function () {
        return this._container;
      },
      addTo: function (a) {
        this._map = a;
        var b = (this._container = this.onAdd(a)),
          c = this.getPosition(),
          d = a._controlCorners[c];
        return (
          e.DomUtil.addClass(b, "leaflet-control"),
          -1 !== c.indexOf("bottom")
            ? d.insertBefore(b, d.firstChild)
            : d.appendChild(b),
          this
        );
      },
      removeFrom: function (a) {
        var b = this.getPosition(),
          c = a._controlCorners[b];
        return (
          c.removeChild(this._container),
          (this._map = null),
          this.onRemove && this.onRemove(a),
          this
        );
      },
      _refocusOnMap: function () {
        this._map && this._map.getContainer().focus();
      },
    })),
    (e.control = function (a) {
      return new e.Control(a);
    }),
    e.Map.include({
      addControl: function (a) {
        return a.addTo(this), this;
      },
      removeControl: function (a) {
        return a.removeFrom(this), this;
      },
      _initControlPos: function () {
        function d(d, f) {
          var g = b + d + " " + b + f;
          a[d + f] = e.DomUtil.create("div", g, c);
        }
        var a = (this._controlCorners = {}),
          b = "leaflet-",
          c = (this._controlContainer = e.DomUtil.create(
            "div",
            b + "control-container",
            this._container
          ));
        d("top", "left"),
          d("top", "right"),
          d("bottom", "left"),
          d("bottom", "right");
      },
      _clearControlPos: function () {
        this._container.removeChild(this._controlContainer);
      },
    }),
    (e.Control.Zoom = e.Control.extend({
      options: {
        position: "topleft",
        zoomInText: "+",
        zoomInTitle: "Zoom in",
        zoomOutText: "-",
        zoomOutTitle: "Zoom out",
      },
      onAdd: function (a) {
        var b = "leaflet-control-zoom",
          c = e.DomUtil.create("div", b + " leaflet-bar");
        return (
          (this._map = a),
          (this._zoomInButton = this._createButton(
            this.options.zoomInText,
            this.options.zoomInTitle,
            b + "-in",
            c,
            this._zoomIn,
            this
          )),
          (this._zoomOutButton = this._createButton(
            this.options.zoomOutText,
            this.options.zoomOutTitle,
            b + "-out",
            c,
            this._zoomOut,
            this
          )),
          this._updateDisabled(),
          a.on("zoomend zoomlevelschange", this._updateDisabled, this),
          c
        );
      },
      onRemove: function (a) {
        a.off("zoomend zoomlevelschange", this._updateDisabled, this);
      },
      _zoomIn: function (a) {
        this._map.zoomIn(a.shiftKey ? 3 : 1);
      },
      _zoomOut: function (a) {
        this._map.zoomOut(a.shiftKey ? 3 : 1);
      },
      _createButton: function (a, b, c, d, f, g) {
        var h = e.DomUtil.create("a", c, d);
        (h.innerHTML = a), (h.href = "#"), (h.title = b);
        var i = e.DomEvent.stopPropagation;
        return (
          e.DomEvent.on(h, "click", i)
            .on(h, "mousedown", i)
            .on(h, "dblclick", i)
            .on(h, "click", e.DomEvent.preventDefault)
            .on(h, "click", f, g)
            .on(h, "click", this._refocusOnMap, g),
          h
        );
      },
      _updateDisabled: function () {
        var a = this._map,
          b = "leaflet-disabled";
        e.DomUtil.removeClass(this._zoomInButton, b),
          e.DomUtil.removeClass(this._zoomOutButton, b),
          a._zoom === a.getMinZoom() &&
            e.DomUtil.addClass(this._zoomOutButton, b),
          a._zoom === a.getMaxZoom() &&
            e.DomUtil.addClass(this._zoomInButton, b);
      },
    })),
    e.Map.mergeOptions({ zoomControl: !0 }),
    e.Map.addInitHook(function () {
      this.options.zoomControl &&
        ((this.zoomControl = new e.Control.Zoom()),
        this.addControl(this.zoomControl));
    }),
    (e.control.zoom = function (a) {
      return new e.Control.Zoom(a);
    }),
    (e.Control.Attribution = e.Control.extend({
      options: {
        position: "bottomright",
        prefix:
          '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>',
      },
      initialize: function (a) {
        e.setOptions(this, a), (this._attributions = {});
      },
      onAdd: function (a) {
        (this._container = e.DomUtil.create(
          "div",
          "leaflet-control-attribution"
        )),
          e.DomEvent.disableClickPropagation(this._container);
        for (var b in a._layers)
          a._layers[b].getAttribution &&
            this.addAttribution(a._layers[b].getAttribution());
        return (
          a
            .on("layeradd", this._onLayerAdd, this)
            .on("layerremove", this._onLayerRemove, this),
          this._update(),
          this._container
        );
      },
      onRemove: function (a) {
        a.off("layeradd", this._onLayerAdd).off(
          "layerremove",
          this._onLayerRemove
        );
      },
      setPrefix: function (a) {
        return (this.options.prefix = a), this._update(), this;
      },
      addAttribution: function (a) {
        return a
          ? (this._attributions[a] || (this._attributions[a] = 0),
            this._attributions[a]++,
            this._update(),
            this)
          : void 0;
      },
      removeAttribution: function (a) {
        return a
          ? (this._attributions[a] && (this._attributions[a]--, this._update()),
            this)
          : void 0;
      },
      _update: function () {
        if (this._map) {
          var a = [];
          for (var b in this._attributions) this._attributions[b] && a.push(b);
          var c = [];
          this.options.prefix && c.push(this.options.prefix),
            a.length && c.push(a.join(", ")),
            (this._container.innerHTML = c.join(" | "));
        }
      },
      _onLayerAdd: function (a) {
        a.layer.getAttribution && this.addAttribution(a.layer.getAttribution());
      },
      _onLayerRemove: function (a) {
        a.layer.getAttribution &&
          this.removeAttribution(a.layer.getAttribution());
      },
    })),
    e.Map.mergeOptions({ attributionControl: !0 }),
    e.Map.addInitHook(function () {
      this.options.attributionControl &&
        (this.attributionControl = new e.Control.Attribution().addTo(this));
    }),
    (e.control.attribution = function (a) {
      return new e.Control.Attribution(a);
    }),
    (e.Control.Scale = e.Control.extend({
      options: {
        position: "bottomleft",
        maxWidth: 100,
        metric: !0,
        imperial: !0,
        updateWhenIdle: !1,
      },
      onAdd: function (a) {
        this._map = a;
        var b = "leaflet-control-scale",
          c = e.DomUtil.create("div", b),
          d = this.options;
        return (
          this._addScales(d, b, c),
          a.on(d.updateWhenIdle ? "moveend" : "move", this._update, this),
          a.whenReady(this._update, this),
          c
        );
      },
      onRemove: function (a) {
        a.off(
          this.options.updateWhenIdle ? "moveend" : "move",
          this._update,
          this
        );
      },
      _addScales: function (a, b, c) {
        a.metric && (this._mScale = e.DomUtil.create("div", b + "-line", c)),
          a.imperial &&
            (this._iScale = e.DomUtil.create("div", b + "-line", c));
      },
      _update: function () {
        var a = this._map.getBounds(),
          b = a.getCenter().lat,
          c = 6378137 * Math.PI * Math.cos((b * Math.PI) / 180),
          d = (c * (a.getNorthEast().lng - a.getSouthWest().lng)) / 180,
          e = this._map.getSize(),
          f = this.options,
          g = 0;
        e.x > 0 && (g = d * (f.maxWidth / e.x)), this._updateScales(f, g);
      },
      _updateScales: function (a, b) {
        a.metric && b && this._updateMetric(b),
          a.imperial && b && this._updateImperial(b);
      },
      _updateMetric: function (a) {
        var b = this._getRoundNum(a);
        (this._mScale.style.width = this._getScaleWidth(b / a) + "px"),
          (this._mScale.innerHTML = 1e3 > b ? b + " m" : b / 1e3 + " km");
      },
      _updateImperial: function (a) {
        var d,
          e,
          f,
          b = 3.2808399 * a,
          c = this._iScale;
        b > 5280
          ? ((d = b / 5280),
            (e = this._getRoundNum(d)),
            (c.style.width = this._getScaleWidth(e / d) + "px"),
            (c.innerHTML = e + " mi"))
          : ((f = this._getRoundNum(b)),
            (c.style.width = this._getScaleWidth(f / b) + "px"),
            (c.innerHTML = f + " ft"));
      },
      _getScaleWidth: function (a) {
        return Math.round(this.options.maxWidth * a) - 10;
      },
      _getRoundNum: function (a) {
        var b = Math.pow(10, (Math.floor(a) + "").length - 1),
          c = a / b;
        return (
          (c = c >= 10 ? 10 : c >= 5 ? 5 : c >= 3 ? 3 : c >= 2 ? 2 : 1), b * c
        );
      },
    })),
    (e.control.scale = function (a) {
      return new e.Control.Scale(a);
    }),
    (e.Control.Layers = e.Control.extend({
      options: { collapsed: !0, position: "topright", autoZIndex: !0 },
      initialize: function (a, b, c) {
        e.setOptions(this, c),
          (this._layers = {}),
          (this._lastZIndex = 0),
          (this._handlingClick = !1);
        for (var d in a) this._addLayer(a[d], d);
        for (d in b) this._addLayer(b[d], d, !0);
      },
      onAdd: function (a) {
        return (
          this._initLayout(),
          this._update(),
          a
            .on("layeradd", this._onLayerChange, this)
            .on("layerremove", this._onLayerChange, this),
          this._container
        );
      },
      onRemove: function (a) {
        a.off("layeradd", this._onLayerChange, this).off(
          "layerremove",
          this._onLayerChange,
          this
        );
      },
      addBaseLayer: function (a, b) {
        return this._addLayer(a, b), this._update(), this;
      },
      addOverlay: function (a, b) {
        return this._addLayer(a, b, !0), this._update(), this;
      },
      removeLayer: function (a) {
        var b = e.stamp(a);
        return delete this._layers[b], this._update(), this;
      },
      _initLayout: function () {
        var a = "leaflet-control-layers",
          b = (this._container = e.DomUtil.create("div", a));
        b.setAttribute("aria-haspopup", !0),
          e.Browser.touch
            ? e.DomEvent.on(b, "click", e.DomEvent.stopPropagation)
            : e.DomEvent.disableClickPropagation(b).disableScrollPropagation(b);
        var c = (this._form = e.DomUtil.create("form", a + "-list"));
        if (this.options.collapsed) {
          e.Browser.android ||
            e.DomEvent.on(b, "mouseover", this._expand, this).on(
              b,
              "mouseout",
              this._collapse,
              this
            );
          var d = (this._layersLink = e.DomUtil.create("a", a + "-toggle", b));
          (d.href = "#"),
            (d.title = "Layers"),
            e.Browser.touch
              ? e.DomEvent.on(d, "click", e.DomEvent.stop).on(
                  d,
                  "click",
                  this._expand,
                  this
                )
              : e.DomEvent.on(d, "focus", this._expand, this),
            e.DomEvent.on(
              c,
              "click",
              function () {
                setTimeout(e.bind(this._onInputClick, this), 0);
              },
              this
            ),
            this._map.on("click", this._collapse, this);
        } else this._expand();
        (this._baseLayersList = e.DomUtil.create("div", a + "-base", c)),
          (this._separator = e.DomUtil.create("div", a + "-separator", c)),
          (this._overlaysList = e.DomUtil.create("div", a + "-overlays", c)),
          b.appendChild(c);
      },
      _addLayer: function (a, b, c) {
        var d = e.stamp(a);
        (this._layers[d] = { layer: a, name: b, overlay: c }),
          this.options.autoZIndex &&
            a.setZIndex &&
            (this._lastZIndex++, a.setZIndex(this._lastZIndex));
      },
      _update: function () {
        if (this._container) {
          (this._baseLayersList.innerHTML = ""),
            (this._overlaysList.innerHTML = "");
          var c,
            d,
            a = !1,
            b = !1;
          for (c in this._layers)
            (d = this._layers[c]),
              this._addItem(d),
              (b = b || d.overlay),
              (a = a || !d.overlay);
          this._separator.style.display = b && a ? "" : "none";
        }
      },
      _onLayerChange: function (a) {
        var b = this._layers[e.stamp(a.layer)];
        if (b) {
          this._handlingClick || this._update();
          var c = b.overlay
            ? "layeradd" === a.type
              ? "overlayadd"
              : "overlayremove"
            : "layeradd" === a.type
            ? "baselayerchange"
            : null;
          c && this._map.fire(c, b);
        }
      },
      _createRadioElement: function (a, c) {
        var d =
          '<input type="radio" class="leaflet-control-layers-selector" name="' +
          a +
          '"';
        c && (d += ' checked="checked"'), (d += "/>");
        var e = b.createElement("div");
        return (e.innerHTML = d), e.firstChild;
      },
      _addItem: function (a) {
        var d,
          c = b.createElement("label"),
          f = this._map.hasLayer(a.layer);
        a.overlay
          ? ((d = b.createElement("input")),
            (d.type = "checkbox"),
            (d.className = "leaflet-control-layers-selector"),
            (d.defaultChecked = f))
          : (d = this._createRadioElement("leaflet-base-layers", f)),
          (d.layerId = e.stamp(a.layer)),
          e.DomEvent.on(d, "click", this._onInputClick, this);
        var g = b.createElement("span");
        (g.innerHTML = " " + a.name), c.appendChild(d), c.appendChild(g);
        var h = a.overlay ? this._overlaysList : this._baseLayersList;
        return h.appendChild(c), c;
      },
      _onInputClick: function () {
        var a,
          b,
          c,
          d = this._form.getElementsByTagName("input"),
          e = d.length;
        for (this._handlingClick = !0, a = 0; e > a; a++)
          (b = d[a]),
            (c = this._layers[b.layerId]),
            b.checked && !this._map.hasLayer(c.layer)
              ? this._map.addLayer(c.layer)
              : !b.checked &&
                this._map.hasLayer(c.layer) &&
                this._map.removeLayer(c.layer);
        (this._handlingClick = !1), this._refocusOnMap();
      },
      _expand: function () {
        e.DomUtil.addClass(this._container, "leaflet-control-layers-expanded");
      },
      _collapse: function () {
        this._container.className = this._container.className.replace(
          " leaflet-control-layers-expanded",
          ""
        );
      },
    })),
    (e.control.layers = function (a, b, c) {
      return new e.Control.Layers(a, b, c);
    }),
    (e.PosAnimation = e.Class.extend({
      includes: e.Mixin.Events,
      run: function (a, b, c, d) {
        this.stop(),
          (this._el = a),
          (this._inProgress = !0),
          (this._newPos = b),
          this.fire("start"),
          (a.style[e.DomUtil.TRANSITION] =
            "all " + (c || 0.25) + "s cubic-bezier(0,0," + (d || 0.5) + ",1)"),
          e.DomEvent.on(
            a,
            e.DomUtil.TRANSITION_END,
            this._onTransitionEnd,
            this
          ),
          e.DomUtil.setPosition(a, b),
          e.Util.falseFn(a.offsetWidth),
          (this._stepTimer = setInterval(e.bind(this._onStep, this), 50));
      },
      stop: function () {
        this._inProgress &&
          (e.DomUtil.setPosition(this._el, this._getPos()),
          this._onTransitionEnd(),
          e.Util.falseFn(this._el.offsetWidth));
      },
      _onStep: function () {
        var a = this._getPos();
        return a
          ? ((this._el._leaflet_pos = a), this.fire("step"), void 0)
          : (this._onTransitionEnd(), void 0);
      },
      _transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
      _getPos: function () {
        var b,
          c,
          d,
          f = this._el,
          g = a.getComputedStyle(f);
        if (e.Browser.any3d) {
          if (((d = g[e.DomUtil.TRANSFORM].match(this._transformRe)), !d))
            return;
          (b = parseFloat(d[1])), (c = parseFloat(d[2]));
        } else (b = parseFloat(g.left)), (c = parseFloat(g.top));
        return new e.Point(b, c, !0);
      },
      _onTransitionEnd: function () {
        e.DomEvent.off(
          this._el,
          e.DomUtil.TRANSITION_END,
          this._onTransitionEnd,
          this
        ),
          this._inProgress &&
            ((this._inProgress = !1),
            (this._el.style[e.DomUtil.TRANSITION] = ""),
            (this._el._leaflet_pos = this._newPos),
            clearInterval(this._stepTimer),
            this.fire("step").fire("end"));
      },
    })),
    e.Map.include({
      setView: function (a, b, d) {
        if (
          ((b = b === c ? this._zoom : this._limitZoom(b)),
          (a = this._limitCenter(e.latLng(a), b, this.options.maxBounds)),
          (d = d || {}),
          this._panAnim && this._panAnim.stop(),
          this._loaded && !d.reset && d !== !0)
        ) {
          d.animate !== c &&
            ((d.zoom = e.extend({ animate: d.animate }, d.zoom)),
            (d.pan = e.extend({ animate: d.animate }, d.pan)));
          var f =
            this._zoom !== b
              ? this._tryAnimatedZoom && this._tryAnimatedZoom(a, b, d.zoom)
              : this._tryAnimatedPan(a, d.pan);
          if (f) return clearTimeout(this._sizeTimer), this;
        }
        return this._resetView(a, b), this;
      },
      panBy: function (a, b) {
        if (((a = e.point(a).round()), (b = b || {}), !a.x && !a.y))
          return this;
        if (
          (this._panAnim ||
            ((this._panAnim = new e.PosAnimation()),
            this._panAnim.on(
              {
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd,
              },
              this
            )),
          b.noMoveStart || this.fire("movestart"),
          b.animate !== !1)
        ) {
          e.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
          var c = this._getMapPanePos().subtract(a);
          this._panAnim.run(
            this._mapPane,
            c,
            b.duration || 0.25,
            b.easeLinearity
          );
        } else this._rawPanBy(a), this.fire("move").fire("moveend");
        return this;
      },
      _onPanTransitionStep: function () {
        this.fire("move");
      },
      _onPanTransitionEnd: function () {
        e.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"),
          this.fire("moveend");
      },
      _tryAnimatedPan: function (a, b) {
        var c = this._getCenterOffset(a)._floor();
        return (b && b.animate) === !0 || this.getSize().contains(c)
          ? (this.panBy(c, b), !0)
          : !1;
      },
    }),
    (e.PosAnimation = e.DomUtil.TRANSITION
      ? e.PosAnimation
      : e.PosAnimation.extend({
          run: function (a, b, c, d) {
            this.stop(),
              (this._el = a),
              (this._inProgress = !0),
              (this._duration = c || 0.25),
              (this._easeOutPower = 1 / Math.max(d || 0.5, 0.2)),
              (this._startPos = e.DomUtil.getPosition(a)),
              (this._offset = b.subtract(this._startPos)),
              (this._startTime = +new Date()),
              this.fire("start"),
              this._animate();
          },
          stop: function () {
            this._inProgress && (this._step(), this._complete());
          },
          _animate: function () {
            (this._animId = e.Util.requestAnimFrame(this._animate, this)),
              this._step();
          },
          _step: function () {
            var a = +new Date() - this._startTime,
              b = 1e3 * this._duration;
            b > a
              ? this._runFrame(this._easeOut(a / b))
              : (this._runFrame(1), this._complete());
          },
          _runFrame: function (a) {
            var b = this._startPos.add(this._offset.multiplyBy(a));
            e.DomUtil.setPosition(this._el, b), this.fire("step");
          },
          _complete: function () {
            e.Util.cancelAnimFrame(this._animId),
              (this._inProgress = !1),
              this.fire("end");
          },
          _easeOut: function (a) {
            return 1 - Math.pow(1 - a, this._easeOutPower);
          },
        })),
    e.Map.mergeOptions({ zoomAnimation: !0, zoomAnimationThreshold: 4 }),
    e.DomUtil.TRANSITION &&
      e.Map.addInitHook(function () {
        (this._zoomAnimated =
          this.options.zoomAnimation &&
          e.DomUtil.TRANSITION &&
          e.Browser.any3d &&
          !e.Browser.android23 &&
          !e.Browser.mobileOpera),
          this._zoomAnimated &&
            e.DomEvent.on(
              this._mapPane,
              e.DomUtil.TRANSITION_END,
              this._catchTransitionEnd,
              this
            );
      }),
    e.Map.include(
      e.DomUtil.TRANSITION
        ? {
            _catchTransitionEnd: function (a) {
              this._animatingZoom &&
                a.propertyName.indexOf("transform") >= 0 &&
                this._onZoomTransitionEnd();
            },
            _nothingToAnimate: function () {
              return !this._container.getElementsByClassName(
                "leaflet-zoom-animated"
              ).length;
            },
            _tryAnimatedZoom: function (a, b, c) {
              if (this._animatingZoom) return !0;
              if (
                ((c = c || {}),
                !this._zoomAnimated ||
                  c.animate === !1 ||
                  this._nothingToAnimate() ||
                  Math.abs(b - this._zoom) >
                    this.options.zoomAnimationThreshold)
              )
                return !1;
              var d = this.getZoomScale(b),
                e = this._getCenterOffset(a)._divideBy(1 - 1 / d),
                f = this._getCenterLayerPoint()._add(e);
              return c.animate === !0 || this.getSize().contains(e)
                ? (this.fire("movestart").fire("zoomstart"),
                  this._animateZoom(a, b, f, d, null, !0),
                  !0)
                : !1;
            },
            _animateZoom: function (a, b, c, d, f, g, h) {
              h || (this._animatingZoom = !0),
                e.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"),
                (this._animateToCenter = a),
                (this._animateToZoom = b),
                e.Draggable && (e.Draggable._disabled = !0),
                e.Util.requestAnimFrame(function () {
                  this.fire("zoomanim", {
                    center: a,
                    zoom: b,
                    origin: c,
                    scale: d,
                    delta: f,
                    backwards: g,
                  });
                }, this);
            },
            _onZoomTransitionEnd: function () {
              (this._animatingZoom = !1),
                e.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"),
                this._resetView(
                  this._animateToCenter,
                  this._animateToZoom,
                  !0,
                  !0
                ),
                e.Draggable && (e.Draggable._disabled = !1);
            },
          }
        : {}
    ),
    e.TileLayer.include({
      _animateZoom: function (a) {
        this._animating || ((this._animating = !0), this._prepareBgBuffer());
        var b = this._bgBuffer,
          c = e.DomUtil.TRANSFORM,
          d = a.delta ? e.DomUtil.getTranslateString(a.delta) : b.style[c],
          f = e.DomUtil.getScaleString(a.scale, a.origin);
        b.style[c] = a.backwards ? f + " " + d : d + " " + f;
      },
      _endZoomAnim: function () {
        var a = this._tileContainer,
          b = this._bgBuffer;
        (a.style.visibility = ""),
          a.parentNode.appendChild(a),
          e.Util.falseFn(b.offsetWidth),
          (this._animating = !1);
      },
      _clearBgBuffer: function () {
        var a = this._map;
        !a ||
          a._animatingZoom ||
          a.touchZoom._zooming ||
          ((this._bgBuffer.innerHTML = ""),
          (this._bgBuffer.style[e.DomUtil.TRANSFORM] = ""));
      },
      _prepareBgBuffer: function () {
        var a = this._tileContainer,
          b = this._bgBuffer,
          c = this._getLoadedTilesPercentage(b),
          d = this._getLoadedTilesPercentage(a);
        return b && c > 0.5 && 0.5 > d
          ? ((a.style.visibility = "hidden"),
            this._stopLoadingImages(a),
            void 0)
          : ((b.style.visibility = "hidden"),
            (b.style[e.DomUtil.TRANSFORM] = ""),
            (this._tileContainer = b),
            (b = this._bgBuffer = a),
            this._stopLoadingImages(b),
            clearTimeout(this._clearBgBufferTimer),
            void 0);
      },
      _getLoadedTilesPercentage: function (a) {
        var c,
          d,
          b = a.getElementsByTagName("img"),
          e = 0;
        for (c = 0, d = b.length; d > c; c++) b[c].complete && e++;
        return e / d;
      },
      _stopLoadingImages: function (a) {
        var c,
          d,
          f,
          b = Array.prototype.slice.call(a.getElementsByTagName("img"));
        for (c = 0, d = b.length; d > c; c++)
          (f = b[c]),
            f.complete ||
              ((f.onload = e.Util.falseFn),
              (f.onerror = e.Util.falseFn),
              (f.src = e.Util.emptyImageUrl),
              f.parentNode.removeChild(f));
      },
    }),
    e.Map.include({
      _defaultLocateOptions: {
        watch: !1,
        setView: !1,
        maxZoom: 1 / 0,
        timeout: 1e4,
        maximumAge: 0,
        enableHighAccuracy: !1,
      },
      locate: function (a) {
        if (
          ((a = this._locateOptions = e.extend(this._defaultLocateOptions, a)),
          !navigator.geolocation)
        )
          return (
            this._handleGeolocationError({
              code: 0,
              message: "Geolocation not supported.",
            }),
            this
          );
        var b = e.bind(this._handleGeolocationResponse, this),
          c = e.bind(this._handleGeolocationError, this);
        return (
          a.watch
            ? (this._locationWatchId = navigator.geolocation.watchPosition(
                b,
                c,
                a
              ))
            : navigator.geolocation.getCurrentPosition(b, c, a),
          this
        );
      },
      stopLocate: function () {
        return (
          navigator.geolocation &&
            navigator.geolocation.clearWatch(this._locationWatchId),
          this._locateOptions && (this._locateOptions.setView = !1),
          this
        );
      },
      _handleGeolocationError: function (a) {
        var b = a.code,
          c =
            a.message ||
            (1 === b
              ? "permission denied"
              : 2 === b
              ? "position unavailable"
              : "timeout");
        this._locateOptions.setView && !this._loaded && this.fitWorld(),
          this.fire("locationerror", {
            code: b,
            message: "Geolocation error: " + c + ".",
          });
      },
      _handleGeolocationResponse: function (a) {
        var b = a.coords.latitude,
          c = a.coords.longitude,
          d = new e.LatLng(b, c),
          f = (180 * a.coords.accuracy) / 40075017,
          g = f / Math.cos(e.LatLng.DEG_TO_RAD * b),
          h = e.latLngBounds([b - f, c - g], [b + f, c + g]),
          i = this._locateOptions;
        if (i.setView) {
          var j = Math.min(this.getBoundsZoom(h), i.maxZoom);
          this.setView(d, j);
        }
        var k = { latlng: d, bounds: h, timestamp: a.timestamp };
        for (var l in a.coords)
          "number" == typeof a.coords[l] && (k[l] = a.coords[l]);
        this.fire("locationfound", k);
      },
    });
})(window, document);
