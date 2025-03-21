(function(i, l, a, n) {
    function e(t, s) {
        this.settings = null,
        this.options = i.extend({}, e.Defaults, s),
        this.$element = i(t),
        this.drag = i.extend({}, _),
        this.state = i.extend({}, y),
        this.e = i.extend({}, x),
        this._plugins = {},
        this._supress = {},
        this._current = null,
        this._speed = null,
        this._coordinates = [],
        this._breakpoint = null,
        this._width = null,
        this._items = [],
        this._clones = [],
        this._mergers = [],
        this._invalidated = {},
        this._pipe = [],
        i.each(e.Plugins, i.proxy(function(o, h) {
            this._plugins[o[0].toLowerCase() + o.slice(1)] = new h(this)
        }, this)),
        i.each(e.Pipe, i.proxy(function(o, h) {
            this._pipe.push({
                filter: h.filter,
                run: i.proxy(h.run, this)
            })
        }, this)),
        this.setup(),
        this.initialize()
    }
    function r(t) {
        if (t.touches !== n)
            return {
                x: t.touches[0].pageX,
                y: t.touches[0].pageY
            };
        if (t.touches === n) {
            if (t.pageX !== n)
                return {
                    x: t.pageX,
                    y: t.pageY
                };
            if (t.pageX === n)
                return {
                    x: t.clientX,
                    y: t.clientY
                }
        }
    }
    function d(t) {
        var s, o, h = a.createElement("div"), c = t;
        for (s in c)
            if (o = c[s],
            typeof h.style[o] < "u")
                return h = null,
                [o, s];
        return [!1]
    }
    function f() {
        return d(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }
    function m() {
        return d(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }
    function u() {
        return d(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }
    function g() {
        return l.navigator.msPointerEnabled
    }
    var _, y, x;
    _ = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    },
    y = {
        isTouch: !1,
        isScrolling: !1,
        isSwiping: !1,
        direction: !1,
        inMotion: !1
    },
    x = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    },
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: l,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    },
    e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    },
    e.Plugins = {},
    e.Pipe = [{
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var t = this._clones
              , s = this.$stage.children(".cloned");
            (s.length !== t.length || !this.settings.loop && t.length > 0) && (this.$stage.children(".cloned").remove(),
            this._clones = [])
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var t, s, o = this._clones, h = this._items, c = this.settings.loop ? o.length - Math.max(2 * this.settings.items, 4) : 0;
            for (t = 0,
            s = Math.abs(c / 2); s > t; t++)
                c > 0 ? (this.$stage.children().eq(h.length + o.length - 1).remove(),
                o.pop(),
                this.$stage.children().eq(0).remove(),
                o.pop()) : (o.push(o.length / 2),
                this.$stage.append(h[o[o.length - 1]].clone().addClass("cloned")),
                o.push(h.length - 1 - (o.length - 1) / 2),
                this.$stage.prepend(h[o[o.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var t, s, o, h = this.settings.rtl ? 1 : -1, c = (this.width() / this.settings.items).toFixed(3), p = 0;
            for (this._coordinates = [],
            s = 0,
            o = this._clones.length + this._items.length; o > s; s++)
                t = this._mergers[this.relative(s)],
                t = this.settings.mergeFit && Math.min(t, this.settings.items) || t,
                p += (this.settings.autoWidth ? this._items[this.relative(s)].width() + this.settings.margin : c * t) * h,
                this._coordinates.push(p)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var t, s, o = (this.width() / this.settings.items).toFixed(3), h = {
                width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                "padding-left": this.settings.stagePadding || "",
                "padding-right": this.settings.stagePadding || ""
            };
            if (this.$stage.css(h),
            h = {
                width: this.settings.autoWidth ? "auto" : o - this.settings.margin
            },
            h[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin,
            !this.settings.autoWidth && i.grep(this._mergers, function(c) {
                return c > 1
            }).length > 0)
                for (t = 0,
                s = this._coordinates.length; s > t; t++)
                    h.width = Math.abs(this._coordinates[t]) - Math.abs(this._coordinates[t - 1] || 0) - this.settings.margin,
                    this.$stage.children().eq(t).css(h);
            else
                this.$stage.children().css(h)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(t) {
            t.current && this.reset(this.$stage.children().index(t.current))
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var t, s, o, h, c = this.settings.rtl ? 1 : -1, p = 2 * this.settings.stagePadding, v = this.coordinates(this.current()) + p, w = v + this.width() * c, C = [];
            for (o = 0,
            h = this._coordinates.length; h > o; o++)
                t = this._coordinates[o - 1] || 0,
                s = Math.abs(this._coordinates[o]) + p * c,
                (this.op(t, "<=", v) && this.op(t, ">", w) || this.op(s, "<", v) && this.op(s, ">", w)) && C.push(o);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass),
            this.$stage.children(":eq(" + C.join("), :eq(") + ")").addClass(this.settings.activeClass),
            this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass),
            this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }],
    e.prototype.initialize = function() {
        if (this.trigger("initialize"),
        this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl),
        this.browserSupport(),
        this.settings.autoWidth && this.state.imagesLoaded !== !0) {
            var t, s, o;
            if (t = this.$element.find("img"),
            s = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n,
            o = this.$element.children(s).width(),
            t.length && 0 >= o)
                return this.preloadAutoWidthImages(t),
                !1
        }
        this.$element.addClass("owl-loading"),
        this.$stage = i("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        this._width = this.$element.width(),
        this.refresh(),
        this.$element.removeClass("owl-loading").addClass("owl-loaded"),
        this.eventsCall(),
        this.internalEvents(),
        this.addTriggerableEvents(),
        this.trigger("initialized")
    }
    ,
    e.prototype.setup = function() {
        var t = this.viewport()
          , s = this.options.responsive
          , o = -1
          , h = null;
        s ? (i.each(s, function(c) {
            t >= c && c > o && (o = Number(c))
        }),
        h = i.extend({}, this.options, s[o]),
        delete h.responsive,
        h.responsiveClass && this.$element.attr("class", function(c, p) {
            return p.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + o)) : h = i.extend({}, this.options),
        (this.settings === null || this._breakpoint !== o) && (this.trigger("change", {
            property: {
                name: "settings",
                value: h
            }
        }),
        this._breakpoint = o,
        this.settings = h,
        this.invalidate("settings"),
        this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }
    ,
    e.prototype.optionsLogic = function() {
        this.$element.toggleClass("owl-center", this.settings.center),
        this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1),
        this.settings.autoWidth && (this.settings.stagePadding = !1,
        this.settings.merge = !1)
    }
    ,
    e.prototype.prepare = function(t) {
        var s = this.trigger("prepare", {
            content: t
        });
        return s.data || (s.data = i("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(t)),
        this.trigger("prepared", {
            content: s.data
        }),
        s.data
    }
    ,
    e.prototype.update = function() {
        for (var t = 0, s = this._pipe.length, o = i.proxy(function(c) {
            return this[c]
        }, this._invalidated), h = {}; s > t; )
            (this._invalidated.all || i.grep(this._pipe[t].filter, o).length > 0) && this._pipe[t].run(h),
            t++;
        this._invalidated = {}
    }
    ,
    e.prototype.width = function(t) {
        switch (t = t || e.Width.Default) {
        case e.Width.Inner:
        case e.Width.Outer:
            return this._width;
        default:
            return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }
    ,
    e.prototype.refresh = function() {
        if (this._items.length === 0)
            return !1;
        new Date().getTime(),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$stage.addClass("owl-refresh"),
        this.update(),
        this.$stage.removeClass("owl-refresh"),
        this.state.orientation = l.orientation,
        this.watchVisibility(),
        this.trigger("refreshed")
    }
    ,
    e.prototype.eventsCall = function() {
        this.e._onDragStart = i.proxy(function(t) {
            this.onDragStart(t)
        }, this),
        this.e._onDragMove = i.proxy(function(t) {
            this.onDragMove(t)
        }, this),
        this.e._onDragEnd = i.proxy(function(t) {
            this.onDragEnd(t)
        }, this),
        this.e._onResize = i.proxy(function(t) {
            this.onResize(t)
        }, this),
        this.e._transitionEnd = i.proxy(function(t) {
            this.transitionEnd(t)
        }, this),
        this.e._preventClick = i.proxy(function(t) {
            this.preventClick(t)
        }, this)
    }
    ,
    e.prototype.onThrottledResize = function() {
        l.clearTimeout(this.resizeTimer),
        this.resizeTimer = l.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }
    ,
    e.prototype.onResize = function() {
        return this._items.length ? this._width === this.$element.width() || this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(),
        this.invalidate("width"),
        this.refresh(),
        void this.trigger("resized")) : !1
    }
    ,
    e.prototype.eventsRouter = function(t) {
        var s = t.type;
        s === "mousedown" || s === "touchstart" ? this.onDragStart(t) : s === "mousemove" || s === "touchmove" ? this.onDragMove(t) : s === "mouseup" || s === "touchend" ? this.onDragEnd(t) : s === "touchcancel" && this.onDragEnd(t)
    }
    ,
    e.prototype.internalEvents = function() {
        var t = g();
        this.settings.mouseDrag ? (this.$stage.on("mousedown", i.proxy(function(s) {
            this.eventsRouter(s)
        }, this)),
        this.$stage.on("dragstart", function() {
            return !1
        }),
        this.$stage.get(0).onselectstart = function() {
            return !1
        }
        ) : this.$element.addClass("owl-text-select-on"),
        this.settings.touchDrag && !t && this.$stage.on("touchstart touchcancel", i.proxy(function(s) {
            this.eventsRouter(s)
        }, this)),
        this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1),
        this.settings.responsive !== !1 && this.on(l, "resize", i.proxy(this.onThrottledResize, this))
    }
    ,
    e.prototype.onDragStart = function(t) {
        var s, o, h, c;
        if (s = t.originalEvent || t || l.event,
        s.which === 3 || this.state.isTouch)
            return !1;
        if (s.type === "mousedown" && this.$stage.addClass("owl-grab"),
        this.trigger("drag"),
        this.drag.startTime = new Date().getTime(),
        this.speed(0),
        this.state.isTouch = !0,
        this.state.isScrolling = !1,
        this.state.isSwiping = !1,
        this.drag.distance = 0,
        o = r(s).x,
        h = r(s).y,
        this.drag.offsetX = this.$stage.position().left,
        this.drag.offsetY = this.$stage.position().top,
        this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin),
        this.state.inMotion && this.support3d)
            c = this.getTransformProperty(),
            this.drag.offsetX = c,
            this.animate(c),
            this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d)
            return this.state.inMotion = !1,
            !1;
        this.drag.startX = o - this.drag.offsetX,
        this.drag.startY = h - this.drag.offsetY,
        this.drag.start = o - this.drag.startX,
        this.drag.targetEl = s.target || s.srcElement,
        this.drag.updatedX = this.drag.start,
        (this.drag.targetEl.tagName === "IMG" || this.drag.targetEl.tagName === "A") && (this.drag.targetEl.draggable = !1),
        i(a).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", i.proxy(function(p) {
            this.eventsRouter(p)
        }, this))
    }
    ,
    e.prototype.onDragMove = function(t) {
        var s, o, h, c, p, v;
        this.state.isTouch && (this.state.isScrolling || (s = t.originalEvent || t || l.event,
        o = r(s).x,
        h = r(s).y,
        this.drag.currentX = o - this.drag.startX,
        this.drag.currentY = h - this.drag.startY,
        this.drag.distance = this.drag.currentX - this.drag.offsetX,
        this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"),
        this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && this.state.direction === "right" ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && this.state.direction === "left" && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (c = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()),
        p = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()),
        v = this.settings.pullDrag ? this.drag.distance / 5 : 0,
        this.drag.currentX = Math.max(Math.min(this.drag.currentX, c + v), p + v)),
        (this.drag.distance > 8 || this.drag.distance < -8) && (s.preventDefault !== n ? s.preventDefault() : s.returnValue = !1,
        this.state.isSwiping = !0),
        this.drag.updatedX = this.drag.currentX,
        (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0,
        this.drag.updatedX = this.drag.start),
        this.animate(this.drag.updatedX)))
    }
    ,
    e.prototype.onDragEnd = function(t) {
        var s, o, h;
        if (this.state.isTouch) {
            if (t.type === "mouseup" && this.$stage.removeClass("owl-grab"),
            this.trigger("dragged"),
            this.drag.targetEl.removeAttribute("draggable"),
            this.state.isTouch = !1,
            this.state.isScrolling = !1,
            this.state.isSwiping = !1,
            this.drag.distance === 0 && this.state.inMotion !== !0)
                return this.state.inMotion = !1,
                !1;
            this.drag.endTime = new Date().getTime(),
            s = this.drag.endTime - this.drag.startTime,
            o = Math.abs(this.drag.distance),
            (o > 3 || s > 300) && this.removeClick(this.drag.targetEl),
            h = this.closest(this.drag.updatedX),
            this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
            this.current(h),
            this.invalidate("position"),
            this.update(),
            this.settings.pullDrag || this.drag.updatedX !== this.coordinates(h) || this.transitionEnd(),
            this.drag.distance = 0,
            i(a).off(".owl.dragEvents")
        }
    }
    ,
    e.prototype.removeClick = function(t) {
        this.drag.targetEl = t,
        i(t).on("click.preventClick", this.e._preventClick),
        l.setTimeout(function() {
            i(t).off("click.preventClick")
        }, 300)
    }
    ,
    e.prototype.preventClick = function(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1,
        t.stopPropagation && t.stopPropagation(),
        i(t.target).off("click.preventClick")
    }
    ,
    e.prototype.getTransformProperty = function() {
        var t, s;
        return t = l.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"),
        t = t.replace(/matrix(3d)?\(|\)/g, "").split(","),
        s = t.length === 16,
        s !== !0 ? t[4] : t[12]
    }
    ,
    e.prototype.closest = function(t) {
        var s = -1
          , o = 30
          , h = this.width()
          , c = this.coordinates();
        return this.settings.freeDrag || i.each(c, i.proxy(function(p, v) {
            return t > v - o && v + o > t ? s = p : this.op(t, "<", v) && this.op(t, ">", c[p + 1] || v - h) && (s = this.state.direction === "left" ? p + 1 : p),
            s === -1
        }, this)),
        this.settings.loop || (this.op(t, ">", c[this.minimum()]) ? s = t = this.minimum() : this.op(t, "<", c[this.maximum()]) && (s = t = this.maximum())),
        s
    }
    ,
    e.prototype.animate = function(t) {
        this.trigger("translate"),
        this.state.inMotion = this.speed() > 0,
        this.support3d ? this.$stage.css({
            transform: "translate3d(" + t + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
            left: t + "px"
        }) : this.$stage.animate({
            left: t
        }, this.speed() / 1e3, this.settings.fallbackEasing, i.proxy(function() {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }
    ,
    e.prototype.current = function(t) {
        if (t === n)
            return this._current;
        if (this._items.length === 0)
            return n;
        if (t = this.normalize(t),
        this._current !== t) {
            var s = this.trigger("change", {
                property: {
                    name: "position",
                    value: t
                }
            });
            s.data !== n && (t = this.normalize(s.data)),
            this._current = t,
            this.invalidate("position"),
            this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }
    ,
    e.prototype.invalidate = function(t) {
        this._invalidated[t] = !0
    }
    ,
    e.prototype.reset = function(t) {
        t = this.normalize(t),
        t !== n && (this._speed = 0,
        this._current = t,
        this.suppress(["translate", "translated"]),
        this.animate(this.coordinates(t)),
        this.release(["translate", "translated"]))
    }
    ,
    e.prototype.normalize = function(t, s) {
        var o = s ? this._items.length : this._items.length + this._clones.length;
        return !i.isNumeric(t) || 1 > o ? n : t = this._clones.length ? (t % o + o) % o : Math.max(this.minimum(s), Math.min(this.maximum(s), t))
    }
    ,
    e.prototype.relative = function(t) {
        return t = this.normalize(t),
        t -= this._clones.length / 2,
        this.normalize(t, !0)
    }
    ,
    e.prototype.maximum = function(t) {
        var s, o, h, c = 0, p = this.settings;
        if (t)
            return this._items.length - 1;
        if (!p.loop && p.center)
            s = this._items.length - 1;
        else if (p.loop || p.center)
            if (p.loop || p.center)
                s = this._items.length + p.items;
            else {
                if (!p.autoWidth && !p.merge)
                    throw "Can not detect maximum absolute position.";
                for (revert = p.rtl ? 1 : -1,
                o = this.$stage.width() - this.$element.width(); (h = this.coordinates(c)) && !(h * revert >= o); )
                    s = ++c
            }
        else
            s = this._items.length - p.items;
        return s
    }
    ,
    e.prototype.minimum = function(t) {
        return t ? 0 : this._clones.length / 2
    }
    ,
    e.prototype.items = function(t) {
        return t === n ? this._items.slice() : (t = this.normalize(t, !0),
        this._items[t])
    }
    ,
    e.prototype.mergers = function(t) {
        return t === n ? this._mergers.slice() : (t = this.normalize(t, !0),
        this._mergers[t])
    }
    ,
    e.prototype.clones = function(t) {
        var s = this._clones.length / 2
          , o = s + this._items.length
          , h = function(c) {
            return c % 2 === 0 ? o + c / 2 : s - (c + 1) / 2
        };
        return t === n ? i.map(this._clones, function(c, p) {
            return h(p)
        }) : i.map(this._clones, function(c, p) {
            return c === t ? h(p) : null
        })
    }
    ,
    e.prototype.speed = function(t) {
        return t !== n && (this._speed = t),
        this._speed
    }
    ,
    e.prototype.coordinates = function(t) {
        var s = null;
        return t === n ? i.map(this._coordinates, i.proxy(function(o, h) {
            return this.coordinates(h)
        }, this)) : (this.settings.center ? (s = this._coordinates[t],
        s += (this.width() - s + (this._coordinates[t - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : s = this._coordinates[t - 1] || 0,
        s)
    }
    ,
    e.prototype.duration = function(t, s, o) {
        return Math.min(Math.max(Math.abs(s - t), 1), 6) * Math.abs(o || this.settings.smartSpeed)
    }
    ,
    e.prototype.to = function(t, s) {
        if (this.settings.loop) {
            var o = t - this.relative(this.current())
              , h = this.current()
              , c = this.current()
              , p = this.current() + o
              , v = 0 > c - p
              , w = this._clones.length + this._items.length;
            p < this.settings.items && v === !1 ? (h = c + this._items.length,
            this.reset(h)) : p >= w - this.settings.items && v === !0 && (h = c - this._items.length,
            this.reset(h)),
            l.clearTimeout(this.e._goToLoop),
            this.e._goToLoop = l.setTimeout(i.proxy(function() {
                this.speed(this.duration(this.current(), h + o, s)),
                this.current(h + o),
                this.update()
            }, this), 30)
        } else
            this.speed(this.duration(this.current(), t, s)),
            this.current(t),
            this.update()
    }
    ,
    e.prototype.next = function(t) {
        t = t || !1,
        this.to(this.relative(this.current()) + 1, t)
    }
    ,
    e.prototype.prev = function(t) {
        t = t || !1,
        this.to(this.relative(this.current()) - 1, t)
    }
    ,
    e.prototype.transitionEnd = function(t) {
        return t !== n && (t.stopPropagation(),
        (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1,
        void this.trigger("translated"))
    }
    ,
    e.prototype.viewport = function() {
        var t;
        if (this.options.responsiveBaseElement !== l)
            t = i(this.options.responsiveBaseElement).width();
        else if (l.innerWidth)
            t = l.innerWidth;
        else {
            if (!a.documentElement || !a.documentElement.clientWidth)
                throw "Can not detect viewport width.";
            t = a.documentElement.clientWidth
        }
        return t
    }
    ,
    e.prototype.replace = function(t) {
        this.$stage.empty(),
        this._items = [],
        t && (t = t instanceof jQuery ? t : i(t)),
        this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector)),
        t.filter(function() {
            return this.nodeType === 1
        }).each(i.proxy(function(s, o) {
            o = this.prepare(o),
            this.$stage.append(o),
            this._items.push(o),
            this._mergers.push(1 * o.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)),
        this.reset(i.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
        this.invalidate("items")
    }
    ,
    e.prototype.add = function(t, s) {
        s = s === n ? this._items.length : this.normalize(s, !0),
        this.trigger("add", {
            content: t,
            position: s
        }),
        this._items.length === 0 || s === this._items.length ? (this.$stage.append(t),
        this._items.push(t),
        this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[s].before(t),
        this._items.splice(s, 0, t),
        this._mergers.splice(s, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)),
        this.invalidate("items"),
        this.trigger("added", {
            content: t,
            position: s
        })
    }
    ,
    e.prototype.remove = function(t) {
        t = this.normalize(t, !0),
        t !== n && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }),
        this._items[t].remove(),
        this._items.splice(t, 1),
        this._mergers.splice(t, 1),
        this.invalidate("items"),
        this.trigger("removed", {
            content: null,
            position: t
        }))
    }
    ,
    e.prototype.addTriggerableEvents = function() {
        var t = i.proxy(function(s, o) {
            return i.proxy(function(h) {
                h.relatedTarget !== this && (this.suppress([o]),
                s.apply(this, [].slice.call(arguments, 1)),
                this.release([o]))
            }, this)
        }, this);
        i.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, i.proxy(function(s, o) {
            this.$element.on(s + ".owl.carousel", t(o, s + ".owl.carousel"))
        }, this))
    }
    ,
    e.prototype.watchVisibility = function() {
        function t(o) {
            return o.offsetWidth > 0 && o.offsetHeight > 0
        }
        function s() {
            t(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"),
            this.refresh(),
            l.clearInterval(this.e._checkVisibile))
        }
        t(this.$element.get(0)) || (this.$element.addClass("owl-hidden"),
        l.clearInterval(this.e._checkVisibile),
        this.e._checkVisibile = l.setInterval(i.proxy(s, this), 500))
    }
    ,
    e.prototype.preloadAutoWidthImages = function(t) {
        var s, o, h, c;
        s = 0,
        o = this,
        t.each(function(p, v) {
            h = i(v),
            c = new Image,
            c.onload = function() {
                s++,
                h.attr("src", c.src),
                h.css("opacity", 1),
                s >= t.length && (o.state.imagesLoaded = !0,
                o.initialize())
            }
            ,
            c.src = h.attr("src") || h.attr("data-src") || h.attr("data-src-retina")
        })
    }
    ,
    e.prototype.destroy = function() {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass),
        this.settings.responsive !== !1 && i(l).off("resize.owl.carousel"),
        this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var t in this._plugins)
            this._plugins[t].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"),
        i(a).off(".owl.dragEvents"),
        this.$stage.get(0).onselectstart = function() {}
        ,
        this.$stage.off("dragstart", function() {
            return !1
        })),
        this.$element.off(".owl"),
        this.$stage.children(".cloned").remove(),
        this.e = null,
        this.$element.removeData("owlCarousel"),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.unwrap()
    }
    ,
    e.prototype.op = function(t, s, o) {
        var h = this.settings.rtl;
        switch (s) {
        case "<":
            return h ? t > o : o > t;
        case ">":
            return h ? o > t : t > o;
        case ">=":
            return h ? o >= t : t >= o;
        case "<=":
            return h ? t >= o : o >= t
        }
    }
    ,
    e.prototype.on = function(t, s, o, h) {
        t.addEventListener ? t.addEventListener(s, o, h) : t.attachEvent && t.attachEvent("on" + s, o)
    }
    ,
    e.prototype.off = function(t, s, o, h) {
        t.removeEventListener ? t.removeEventListener(s, o, h) : t.detachEvent && t.detachEvent("on" + s, o)
    }
    ,
    e.prototype.trigger = function(t, s, o) {
        var h = {
            item: {
                count: this._items.length,
                index: this.current()
            }
        }
          , c = i.camelCase(i.grep(["on", t, o], function(v) {
            return v
        }).join("-").toLowerCase())
          , p = i.Event([t, "owl", o || "carousel"].join(".").toLowerCase(), i.extend({
            relatedTarget: this
        }, h, s));
        return this._supress[t] || (i.each(this._plugins, function(v, w) {
            w.onTrigger && w.onTrigger(p)
        }),
        this.$element.trigger(p),
        this.settings && typeof this.settings[c] == "function" && this.settings[c].apply(this, p)),
        p
    }
    ,
    e.prototype.suppress = function(t) {
        i.each(t, i.proxy(function(s, o) {
            this._supress[o] = !0
        }, this))
    }
    ,
    e.prototype.release = function(t) {
        i.each(t, i.proxy(function(s, o) {
            delete this._supress[o]
        }, this))
    }
    ,
    e.prototype.browserSupport = function() {
        if (this.support3d = u(),
        this.support3d) {
            this.transformVendor = m();
            var t = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = t[f()],
            this.vendorName = this.transformVendor.replace(/Transform/i, ""),
            this.vendorName = this.vendorName !== "" ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = l.orientation
    }
    ,
    i.fn.owlCarousel = function(t) {
        return this.each(function() {
            i(this).data("owlCarousel") || i(this).data("owlCarousel", new e(this,t))
        })
    }
    ,
    i.fn.owlCarousel.Constructor = e
}
)(window.Zepto || window.jQuery, window, document),
function(i, l) {
    var a = function(n) {
        this._core = n,
        this._loaded = [],
        this._handlers = {
            "initialized.owl.carousel change.owl.carousel": i.proxy(function(e) {
                if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && e.property.name == "position" || e.type == "initialized"))
                    for (var r = this._core.settings, d = r.center && Math.ceil(r.items / 2) || r.items, f = r.center && -1 * d || 0, m = (e.property && e.property.value || this._core.current()) + f, u = this._core.clones().length, g = i.proxy(function(_, y) {
                        this.load(y)
                    }, this); f++ < d; )
                        this.load(u / 2 + this._core.relative(m)),
                        u && i.each(this._core.clones(this._core.relative(m++)), g)
            }, this)
        },
        this._core.options = i.extend({}, a.Defaults, this._core.options),
        this._core.$element.on(this._handlers)
    };
    a.Defaults = {
        lazyLoad: !1
    },
    a.prototype.load = function(n) {
        var e = this._core.$stage.children().eq(n)
          , r = e && e.find(".owl-lazy");
        !r || i.inArray(e.get(0), this._loaded) > -1 || (r.each(i.proxy(function(d, f) {
            var m, u = i(f), g = l.devicePixelRatio > 1 && u.attr("data-src-retina") || u.attr("data-src");
            this._core.trigger("load", {
                element: u,
                url: g
            }, "lazy"),
            u.is("img") ? u.one("load.owl.lazy", i.proxy(function() {
                u.css("opacity", 1),
                this._core.trigger("loaded", {
                    element: u,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : (m = new Image,
            m.onload = i.proxy(function() {
                u.css({
                    "background-image": "url(" + g + ")",
                    opacity: "1"
                }),
                this._core.trigger("loaded", {
                    element: u,
                    url: g
                }, "lazy")
            }, this),
            m.src = g)
        }, this)),
        this._loaded.push(e.get(0)))
    }
    ,
    a.prototype.destroy = function() {
        var n, e;
        for (n in this.handlers)
            this._core.$element.off(n, this.handlers[n]);
        for (e in Object.getOwnPropertyNames(this))
            typeof this[e] != "function" && (this[e] = null)
    }
    ,
    i.fn.owlCarousel.Constructor.Plugins.Lazy = a
}(window.Zepto || window.jQuery, window),
function(i) {
    var l = function(a) {
        this._core = a,
        this._handlers = {
            "initialized.owl.carousel": i.proxy(function() {
                this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": i.proxy(function(n) {
                this._core.settings.autoHeight && n.property.name == "position" && this.update()
            }, this),
            "loaded.owl.lazy": i.proxy(function(n) {
                this._core.settings.autoHeight && n.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        },
        this._core.options = i.extend({}, l.Defaults, this._core.options),
        this._core.$element.on(this._handlers)
    };
    l.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    },
    l.prototype.update = function() {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }
    ,
    l.prototype.destroy = function() {
        var a, n;
        for (a in this._handlers)
            this._core.$element.off(a, this._handlers[a]);
        for (n in Object.getOwnPropertyNames(this))
            typeof this[n] != "function" && (this[n] = null)
    }
    ,
    i.fn.owlCarousel.Constructor.Plugins.AutoHeight = l
}(window.Zepto || window.jQuery),
function(i, l, a) {
    var n = function(e) {
        this._core = e,
        this._videos = {},
        this._playing = null,
        this._fullscreen = !1,
        this._handlers = {
            "resize.owl.carousel": i.proxy(function(r) {
                this._core.settings.video && !this.isInFullScreen() && r.preventDefault()
            }, this),
            "refresh.owl.carousel changed.owl.carousel": i.proxy(function() {
                this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": i.proxy(function(r) {
                var d = i(r.content).find(".owl-video");
                d.length && (d.css("display", "none"),
                this.fetch(d, i(r.content)))
            }, this)
        },
        this._core.options = i.extend({}, n.Defaults, this._core.options),
        this._core.$element.on(this._handlers),
        this._core.$element.on("click.owl.video", ".owl-video-play-icon", i.proxy(function(r) {
            this.play(r)
        }, this))
    };
    n.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    },
    n.prototype.fetch = function(e, r) {
        var d = e.attr("data-vimeo-id") ? "vimeo" : "youtube"
          , f = e.attr("data-vimeo-id") || e.attr("data-youtube-id")
          , m = e.attr("data-width") || this._core.settings.videoWidth
          , u = e.attr("data-height") || this._core.settings.videoHeight
          , g = e.attr("href");
        if (!g)
            throw new Error("Missing video URL.");
        if (f = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
        f[3].indexOf("youtu") > -1)
            d = "youtube";
        else {
            if (!(f[3].indexOf("vimeo") > -1))
                throw new Error("Video URL not supported.");
            d = "vimeo"
        }
        f = f[6],
        this._videos[g] = {
            type: d,
            id: f,
            width: m,
            height: u
        },
        r.attr("data-video", g),
        this.thumbnail(e, this._videos[g])
    }
    ,
    n.prototype.thumbnail = function(e, r) {
        var d, f, m, u = r.width && r.height ? 'style="width:' + r.width + "px;height:" + r.height + 'px;"' : "", g = e.find("img"), _ = "src", y = "", x = this._core.settings, t = function(s) {
            f = '<div class="owl-video-play-icon"></div>',
            d = x.lazyLoad ? '<div class="owl-video-tn ' + y + '" ' + _ + '="' + s + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + s + ')"></div>',
            e.after(d),
            e.after(f)
        };
        return e.wrap('<div class="owl-video-wrapper"' + u + "></div>"),
        this._core.settings.lazyLoad && (_ = "data-src",
        y = "owl-lazy"),
        g.length ? (t(g.attr(_)),
        g.remove(),
        !1) : void (r.type === "youtube" ? (m = "http://img.youtube.com/vi/" + r.id + "/hqdefault.jpg",
        t(m)) : r.type === "vimeo" && i.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + r.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(s) {
                m = s[0].thumbnail_large,
                t(m)
            }
        }))
    }
    ,
    n.prototype.stop = function() {
        this._core.trigger("stop", null, "video"),
        this._playing.find(".owl-video-frame").remove(),
        this._playing.removeClass("owl-video-playing"),
        this._playing = null
    }
    ,
    n.prototype.play = function(e) {
        this._core.trigger("play", null, "video"),
        this._playing && this.stop();
        var r, d, f = i(e.target || e.srcElement), m = f.closest("." + this._core.settings.itemClass), u = this._videos[m.attr("data-video")], g = u.width || "100%", _ = u.height || this._core.$stage.height();
        u.type === "youtube" ? r = '<iframe width="' + g + '" height="' + _ + '" src="http://www.youtube.com/embed/' + u.id + "?autoplay=1&v=" + u.id + '" frameborder="0" allowfullscreen></iframe>' : u.type === "vimeo" && (r = '<iframe src="http://player.vimeo.com/video/' + u.id + '?autoplay=1" width="' + g + '" height="' + _ + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
        m.addClass("owl-video-playing"),
        this._playing = m,
        d = i('<div style="height:' + _ + "px; width:" + g + 'px" class="owl-video-frame">' + r + "</div>"),
        f.after(d)
    }
    ,
    n.prototype.isInFullScreen = function() {
        var e = a.fullscreenElement || a.mozFullScreenElement || a.webkitFullscreenElement;
        return e && i(e).parent().hasClass("owl-video-frame") && (this._core.speed(0),
        this._fullscreen = !0),
        e && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1,
        !1) : this._playing && this._core.state.orientation !== l.orientation ? (this._core.state.orientation = l.orientation,
        !1) : !0
    }
    ,
    n.prototype.destroy = function() {
        var e, r;
        this._core.$element.off("click.owl.video");
        for (e in this._handlers)
            this._core.$element.off(e, this._handlers[e]);
        for (r in Object.getOwnPropertyNames(this))
            typeof this[r] != "function" && (this[r] = null)
    }
    ,
    i.fn.owlCarousel.Constructor.Plugins.Video = n
}(window.Zepto || window.jQuery, window, document),
function(i, l, a, n) {
    var e = function(r) {
        this.core = r,
        this.core.options = i.extend({}, e.Defaults, this.core.options),
        this.swapping = !0,
        this.previous = n,
        this.next = n,
        this.handlers = {
            "change.owl.carousel": i.proxy(function(d) {
                d.property.name == "position" && (this.previous = this.core.current(),
                this.next = d.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": i.proxy(function(d) {
                this.swapping = d.type == "translated"
            }, this),
            "translate.owl.carousel": i.proxy(function() {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        },
        this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    },
    e.prototype.swap = function() {
        if (this.core.settings.items === 1 && this.core.support3d) {
            this.core.speed(0);
            var r, d = i.proxy(this.clear, this), f = this.core.$stage.children().eq(this.previous), m = this.core.$stage.children().eq(this.next), u = this.core.settings.animateIn, g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (r = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
            f.css({
                left: r + "px"
            }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", d)),
            u && m.addClass("animated owl-animated-in").addClass(u).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", d))
        }
    }
    ,
    e.prototype.clear = function(r) {
        i(r.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
        this.core.transitionEnd()
    }
    ,
    e.prototype.destroy = function() {
        var r, d;
        for (r in this.handlers)
            this.core.$element.off(r, this.handlers[r]);
        for (d in Object.getOwnPropertyNames(this))
            typeof this[d] != "function" && (this[d] = null)
    }
    ,
    i.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery),
function(i, l, a) {
    var n = function(e) {
        this.core = e,
        this.core.options = i.extend({}, n.Defaults, this.core.options),
        this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": i.proxy(function() {
                this.autoplay()
            }, this),
            "play.owl.autoplay": i.proxy(function(r, d, f) {
                this.play(d, f)
            }, this),
            "stop.owl.autoplay": i.proxy(function() {
                this.stop()
            }, this),
            "mouseover.owl.autoplay": i.proxy(function() {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this),
            "mouseleave.owl.autoplay": i.proxy(function() {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        },
        this.core.$element.on(this.handlers)
    };
    n.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    },
    n.prototype.autoplay = function() {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (l.clearInterval(this.interval),
        this.interval = l.setInterval(i.proxy(function() {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : l.clearInterval(this.interval)
    }
    ,
    n.prototype.play = function() {
        return a.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void l.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }
    ,
    n.prototype.stop = function() {
        l.clearInterval(this.interval)
    }
    ,
    n.prototype.pause = function() {
        l.clearInterval(this.interval)
    }
    ,
    n.prototype.destroy = function() {
        var e, r;
        l.clearInterval(this.interval);
        for (e in this.handlers)
            this.core.$element.off(e, this.handlers[e]);
        for (r in Object.getOwnPropertyNames(this))
            typeof this[r] != "function" && (this[r] = null)
    }
    ,
    i.fn.owlCarousel.Constructor.Plugins.autoplay = n
}(window.Zepto || window.jQuery, window, document),
function(i) {
    var l = function(a) {
        this._core = a,
        this._initialized = !1,
        this._pages = [],
        this._controls = {},
        this._templates = [],
        this.$element = this._core.$element,
        this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        },
        this._handlers = {
            "prepared.owl.carousel": i.proxy(function(n) {
                this._core.settings.dotsData && this._templates.push(i(n.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "add.owl.carousel": i.proxy(function(n) {
                this._core.settings.dotsData && this._templates.splice(n.position, 0, i(n.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "remove.owl.carousel prepared.owl.carousel": i.proxy(function(n) {
                this._core.settings.dotsData && this._templates.splice(n.position, 1)
            }, this),
            "change.owl.carousel": i.proxy(function(n) {
                if (n.property.name == "position" && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var e = this._core.current()
                      , r = this._core.maximum()
                      , d = this._core.minimum();
                    n.data = n.property.value > r ? e >= r ? d : r : n.property.value < d ? r : n.property.value
                }
            }, this),
            "changed.owl.carousel": i.proxy(function(n) {
                n.property.name == "position" && this.draw()
            }, this),
            "refreshed.owl.carousel": i.proxy(function() {
                this._initialized || (this.initialize(),
                this._initialized = !0),
                this._core.trigger("refresh", null, "navigation"),
                this.update(),
                this.draw(),
                this._core.trigger("refreshed", null, "navigation")
            }, this)
        },
        this._core.options = i.extend({}, l.Defaults, this._core.options),
        this.$element.on(this._handlers)
    };
    l.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    },
    l.prototype.initialize = function() {
        var a, n, e = this._core.settings;
        e.dotsData || (this._templates = [i("<div>").addClass(e.dotClass).append(i("<span>")).prop("outerHTML")]),
        e.navContainer && e.dotsContainer || (this._controls.$container = i("<div>").addClass(e.controlsClass).appendTo(this.$element)),
        this._controls.$indicators = e.dotsContainer ? i(e.dotsContainer) : i("<div>").hide().addClass(e.dotsClass).appendTo(this._controls.$container),
        this._controls.$indicators.on("click", "div", i.proxy(function(r) {
            var d = i(r.target).parent().is(this._controls.$indicators) ? i(r.target).index() : i(r.target).parent().index();
            r.preventDefault(),
            this.to(d, e.dotsSpeed)
        }, this)),
        a = e.navContainer ? i(e.navContainer) : i("<div>").addClass(e.navContainerClass).prependTo(this._controls.$container),
        this._controls.$next = i("<" + e.navElement + ">"),
        this._controls.$previous = this._controls.$next.clone(),
        this._controls.$previous.addClass(e.navClass[0]).html(e.navText[0]).hide().prependTo(a).on("click", i.proxy(function() {
            this.prev(e.navSpeed)
        }, this)),
        this._controls.$next.addClass(e.navClass[1]).html(e.navText[1]).hide().appendTo(a).on("click", i.proxy(function() {
            this.next(e.navSpeed)
        }, this));
        for (n in this._overrides)
            this._core[n] = i.proxy(this[n], this)
    }
    ,
    l.prototype.destroy = function() {
        var a, n, e, r;
        for (a in this._handlers)
            this.$element.off(a, this._handlers[a]);
        for (n in this._controls)
            this._controls[n].remove();
        for (r in this.overides)
            this._core[r] = this._overrides[r];
        for (e in Object.getOwnPropertyNames(this))
            typeof this[e] != "function" && (this[e] = null)
    }
    ,
    l.prototype.update = function() {
        var a, n, e, r = this._core.settings, d = this._core.clones().length / 2, f = d + this._core.items().length, m = r.center || r.autoWidth || r.dotData ? 1 : r.dotsEach || r.items;
        if (r.slideBy !== "page" && (r.slideBy = Math.min(r.slideBy, r.items)),
        r.dots || r.slideBy == "page")
            for (this._pages = [],
            a = d,
            n = 0,
            e = 0; f > a; a++)
                (n >= m || n === 0) && (this._pages.push({
                    start: a - d,
                    end: a - d + m - 1
                }),
                n = 0,
                ++e),
                n += this._core.mergers(this._core.relative(a))
    }
    ,
    l.prototype.draw = function() {
        var a, n, e = "", r = this._core.settings, d = (this._core.$stage.children(),
        this._core.relative(this._core.current()));
        if (!r.nav || r.loop || r.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= d),
        this._controls.$next.toggleClass("disabled", d >= this._core.maximum())),
        this._controls.$previous.toggle(r.nav),
        this._controls.$next.toggle(r.nav),
        r.dots) {
            if (a = this._pages.length - this._controls.$indicators.children().length,
            r.dotData && a !== 0) {
                for (n = 0; n < this._controls.$indicators.children().length; n++)
                    e += this._templates[this._core.relative(n)];
                this._controls.$indicators.html(e)
            } else
                a > 0 ? (e = new Array(a + 1).join(this._templates[0]),
                this._controls.$indicators.append(e)) : 0 > a && this._controls.$indicators.children().slice(a).remove();
            this._controls.$indicators.find(".active").removeClass("active"),
            this._controls.$indicators.children().eq(i.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(r.dots)
    }
    ,
    l.prototype.onTrigger = function(a) {
        var n = this._core.settings;
        a.page = {
            index: i.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: n && (n.center || n.autoWidth || n.dotData ? 1 : n.dotsEach || n.items)
        }
    }
    ,
    l.prototype.current = function() {
        var a = this._core.relative(this._core.current());
        return i.grep(this._pages, function(n) {
            return n.start <= a && n.end >= a
        }).pop()
    }
    ,
    l.prototype.getPosition = function(a) {
        var n, e, r = this._core.settings;
        return r.slideBy == "page" ? (n = i.inArray(this.current(), this._pages),
        e = this._pages.length,
        a ? ++n : --n,
        n = this._pages[(n % e + e) % e].start) : (n = this._core.relative(this._core.current()),
        e = this._core.items().length,
        a ? n += r.slideBy : n -= r.slideBy),
        n
    }
    ,
    l.prototype.next = function(a) {
        i.proxy(this._overrides.to, this._core)(this.getPosition(!0), a)
    }
    ,
    l.prototype.prev = function(a) {
        i.proxy(this._overrides.to, this._core)(this.getPosition(!1), a)
    }
    ,
    l.prototype.to = function(a, n, e) {
        var r;
        e ? i.proxy(this._overrides.to, this._core)(a, n) : (r = this._pages.length,
        i.proxy(this._overrides.to, this._core)(this._pages[(a % r + r) % r].start, n))
    }
    ,
    i.fn.owlCarousel.Constructor.Plugins.Navigation = l
}(window.Zepto || window.jQuery),
function(i, l) {
    var a = function(n) {
        this._core = n,
        this._hashes = {},
        this.$element = this._core.$element,
        this._handlers = {
            "initialized.owl.carousel": i.proxy(function() {
                this._core.settings.startPosition == "URLHash" && i(l).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": i.proxy(function(e) {
                var r = i(e.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[r] = e.content
            }, this)
        },
        this._core.options = i.extend({}, a.Defaults, this._core.options),
        this.$element.on(this._handlers),
        i(l).on("hashchange.owl.navigation", i.proxy(function() {
            var e = l.location.hash.substring(1)
              , r = this._core.$stage.children()
              , d = this._hashes[e] && r.index(this._hashes[e]) || 0;
            return e ? void this._core.to(d, !1, !0) : !1
        }, this))
    };
    a.Defaults = {
        URLhashListener: !1
    },
    a.prototype.destroy = function() {
        var n, e;
        i(l).off("hashchange.owl.navigation");
        for (n in this._handlers)
            this._core.$element.off(n, this._handlers[n]);
        for (e in Object.getOwnPropertyNames(this))
            typeof this[e] != "function" && (this[e] = null)
    }
    ,
    i.fn.owlCarousel.Constructor.Plugins.Hash = a
}(window.Zepto || window.jQuery, window);
