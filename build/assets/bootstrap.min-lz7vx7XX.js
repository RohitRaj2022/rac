/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if (typeof jQuery > "u")
    throw new Error("Bootstrap's JavaScript requires jQuery");
+function(i) {
    var h = i.fn.jquery.split(" ")[0].split(".");
    if (h[0] < 2 && h[1] < 9 || h[0] == 1 && h[1] == 9 && h[2] < 1 || h[0] > 3)
        throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery),
+function(i) {
    function h() {
        var s = document.createElement("bootstrap")
          , d = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var e in d)
            if (s.style[e] !== void 0)
                return {
                    end: d[e]
                };
        return !1
    }
    i.fn.emulateTransitionEnd = function(s) {
        var d = !1
          , e = this;
        i(this).one("bsTransitionEnd", function() {
            d = !0
        });
        var t = function() {
            d || i(e).trigger(i.support.transition.end)
        };
        return setTimeout(t, s),
        this
    }
    ,
    i(function() {
        i.support.transition = h(),
        i.support.transition && (i.event.special.bsTransitionEnd = {
            bindType: i.support.transition.end,
            delegateType: i.support.transition.end,
            handle: function(s) {
                if (i(s.target).is(this))
                    return s.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery),
+function(i) {
    function h(t) {
        return this.each(function() {
            var o = i(this)
              , n = o.data("bs.alert");
            n || o.data("bs.alert", n = new d(this)),
            typeof t == "string" && n[t].call(o)
        })
    }
    var s = '[data-dismiss="alert"]'
      , d = function(t) {
        i(t).on("click", s, this.close)
    };
    d.VERSION = "3.3.7",
    d.TRANSITION_DURATION = 150,
    d.prototype.close = function(t) {
        function o() {
            a.detach().trigger("closed.bs.alert").remove()
        }
        var n = i(this)
          , r = n.attr("data-target");
        r || (r = n.attr("href"),
        r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
        var a = i(r === "#" ? [] : r);
        t && t.preventDefault(),
        a.length || (a = n.closest(".alert")),
        a.trigger(t = i.Event("close.bs.alert")),
        t.isDefaultPrevented() || (a.removeClass("in"),
        i.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", o).emulateTransitionEnd(d.TRANSITION_DURATION) : o())
    }
    ;
    var e = i.fn.alert;
    i.fn.alert = h,
    i.fn.alert.Constructor = d,
    i.fn.alert.noConflict = function() {
        return i.fn.alert = e,
        this
    }
    ,
    i(document).on("click.bs.alert.data-api", s, d.prototype.close)
}(jQuery),
+function(i) {
    function h(e) {
        return this.each(function() {
            var t = i(this)
              , o = t.data("bs.button")
              , n = typeof e == "object" && e;
            o || t.data("bs.button", o = new s(this,n)),
            e == "toggle" ? o.toggle() : e && o.setState(e)
        })
    }
    var s = function(e, t) {
        this.$element = i(e),
        this.options = i.extend({}, s.DEFAULTS, t),
        this.isLoading = !1
    };
    s.VERSION = "3.3.7",
    s.DEFAULTS = {
        loadingText: "loading..."
    },
    s.prototype.setState = function(e) {
        var t = "disabled"
          , o = this.$element
          , n = o.is("input") ? "val" : "html"
          , r = o.data();
        e += "Text",
        r.resetText == null && o.data("resetText", o[n]()),
        setTimeout(i.proxy(function() {
            o[n](r[e] == null ? this.options[e] : r[e]),
            e == "loadingText" ? (this.isLoading = !0,
            o.addClass(t).attr(t, t).prop(t, !0)) : this.isLoading && (this.isLoading = !1,
            o.removeClass(t).removeAttr(t).prop(t, !1))
        }, this), 0)
    }
    ,
    s.prototype.toggle = function() {
        var e = !0
          , t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) {
            var o = this.$element.find("input");
            o.prop("type") == "radio" ? (o.prop("checked") && (e = !1),
            t.find(".active").removeClass("active"),
            this.$element.addClass("active")) : o.prop("type") == "checkbox" && (o.prop("checked") !== this.$element.hasClass("active") && (e = !1),
            this.$element.toggleClass("active")),
            o.prop("checked", this.$element.hasClass("active")),
            e && o.trigger("change")
        } else
            this.$element.attr("aria-pressed", !this.$element.hasClass("active")),
            this.$element.toggleClass("active")
    }
    ;
    var d = i.fn.button;
    i.fn.button = h,
    i.fn.button.Constructor = s,
    i.fn.button.noConflict = function() {
        return i.fn.button = d,
        this
    }
    ,
    i(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        var t = i(e.target).closest(".btn");
        h.call(t, "toggle"),
        i(e.target).is('input[type="radio"], input[type="checkbox"]') || (e.preventDefault(),
        t.is("input,button") ? t.trigger("focus") : t.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        i(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery),
+function(i) {
    function h(t) {
        return this.each(function() {
            var o = i(this)
              , n = o.data("bs.carousel")
              , r = i.extend({}, s.DEFAULTS, o.data(), typeof t == "object" && t)
              , a = typeof t == "string" ? t : r.slide;
            n || o.data("bs.carousel", n = new s(this,r)),
            typeof t == "number" ? n.to(t) : a ? n[a]() : r.interval && n.pause().cycle()
        })
    }
    var s = function(t, o) {
        this.$element = i(t),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = o,
        this.paused = null,
        this.sliding = null,
        this.interval = null,
        this.$active = null,
        this.$items = null,
        this.options.keyboard && this.$element.on("keydown.bs.carousel", i.proxy(this.keydown, this)),
        this.options.pause == "hover" && !("ontouchstart"in document.documentElement) && this.$element.on("mouseenter.bs.carousel", i.proxy(this.pause, this)).on("mouseleave.bs.carousel", i.proxy(this.cycle, this))
    };
    s.VERSION = "3.3.7",
    s.TRANSITION_DURATION = 600,
    s.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    },
    s.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
            }
            t.preventDefault()
        }
    }
    ,
    s.prototype.cycle = function(t) {
        return t || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(i.proxy(this.next, this), this.options.interval)),
        this
    }
    ,
    s.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"),
        this.$items.index(t || this.$active)
    }
    ,
    s.prototype.getItemForDirection = function(t, o) {
        var n = this.getItemIndex(o)
          , r = t == "prev" && n === 0 || t == "next" && n == this.$items.length - 1;
        if (r && !this.options.wrap)
            return o;
        var a = t == "prev" ? -1 : 1
          , l = (n + a) % this.$items.length;
        return this.$items.eq(l)
    }
    ,
    s.prototype.to = function(t) {
        var o = this
          , n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0))
            return this.sliding ? this.$element.one("slid.bs.carousel", function() {
                o.to(t)
            }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
    }
    ,
    s.prototype.pause = function(t) {
        return t || (this.paused = !0),
        this.$element.find(".next, .prev").length && i.support.transition && (this.$element.trigger(i.support.transition.end),
        this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    }
    ,
    s.prototype.next = function() {
        if (!this.sliding)
            return this.slide("next")
    }
    ,
    s.prototype.prev = function() {
        if (!this.sliding)
            return this.slide("prev")
    }
    ,
    s.prototype.slide = function(t, o) {
        var n = this.$element.find(".item.active")
          , r = o || this.getItemForDirection(t, n)
          , a = this.interval
          , l = t == "next" ? "left" : "right"
          , p = this;
        if (r.hasClass("active"))
            return this.sliding = !1;
        var c = r[0]
          , f = i.Event("slide.bs.carousel", {
            relatedTarget: c,
            direction: l
        });
        if (this.$element.trigger(f),
        !f.isDefaultPrevented()) {
            if (this.sliding = !0,
            a && this.pause(),
            this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var u = i(this.$indicators.children()[this.getItemIndex(r)]);
                u && u.addClass("active")
            }
            var g = i.Event("slid.bs.carousel", {
                relatedTarget: c,
                direction: l
            });
            return i.support.transition && this.$element.hasClass("slide") ? (r.addClass(t),
            r[0].offsetWidth,
            n.addClass(l),
            r.addClass(l),
            n.one("bsTransitionEnd", function() {
                r.removeClass([t, l].join(" ")).addClass("active"),
                n.removeClass(["active", l].join(" ")),
                p.sliding = !1,
                setTimeout(function() {
                    p.$element.trigger(g)
                }, 0)
            }).emulateTransitionEnd(s.TRANSITION_DURATION)) : (n.removeClass("active"),
            r.addClass("active"),
            this.sliding = !1,
            this.$element.trigger(g)),
            a && this.cycle(),
            this
        }
    }
    ;
    var d = i.fn.carousel;
    i.fn.carousel = h,
    i.fn.carousel.Constructor = s,
    i.fn.carousel.noConflict = function() {
        return i.fn.carousel = d,
        this
    }
    ;
    var e = function(t) {
        var o, n = i(this), r = i(n.attr("data-target") || (o = n.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (r.hasClass("carousel")) {
            var a = i.extend({}, r.data(), n.data())
              , l = n.attr("data-slide-to");
            l && (a.interval = !1),
            h.call(r, a),
            l && r.data("bs.carousel").to(l),
            t.preventDefault()
        }
    };
    i(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e),
    i(window).on("load", function() {
        i('[data-ride="carousel"]').each(function() {
            var t = i(this);
            h.call(t, t.data())
        })
    })
}(jQuery),
+function(i) {
    function h(t) {
        var o, n = t.attr("data-target") || (o = t.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, "");
        return i(n)
    }
    function s(t) {
        return this.each(function() {
            var o = i(this)
              , n = o.data("bs.collapse")
              , r = i.extend({}, d.DEFAULTS, o.data(), typeof t == "object" && t);
            !n && r.toggle && /show|hide/.test(t) && (r.toggle = !1),
            n || o.data("bs.collapse", n = new d(this,r)),
            typeof t == "string" && n[t]()
        })
    }
    var d = function(t, o) {
        this.$element = i(t),
        this.options = i.extend({}, d.DEFAULTS, o),
        this.$trigger = i('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'),
        this.transitioning = null,
        this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle()
    };
    d.VERSION = "3.3.7",
    d.TRANSITION_DURATION = 350,
    d.DEFAULTS = {
        toggle: !0
    },
    d.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }
    ,
    d.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(o && o.length && (t = o.data("bs.collapse"),
            t && t.transitioning))) {
                var n = i.Event("show.bs.collapse");
                if (this.$element.trigger(n),
                !n.isDefaultPrevented()) {
                    o && o.length && (s.call(o, "hide"),
                    t || o.data("bs.collapse", null));
                    var r = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0),
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                    this.transitioning = 1;
                    var a = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[r](""),
                        this.transitioning = 0,
                        this.$element.trigger("shown.bs.collapse")
                    };
                    if (!i.support.transition)
                        return a.call(this);
                    var l = i.camelCase(["scroll", r].join("-"));
                    this.$element.one("bsTransitionEnd", i.proxy(a, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[r](this.$element[0][l])
                }
            }
        }
    }
    ,
    d.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = i.Event("hide.bs.collapse");
            if (this.$element.trigger(t),
            !t.isDefaultPrevented()) {
                var o = this.dimension();
                this.$element[o](this.$element[o]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0,
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return i.support.transition ? void this.$element[o](0).one("bsTransitionEnd", i.proxy(n, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : n.call(this)
            }
        }
    }
    ,
    d.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }
    ,
    d.prototype.getParent = function() {
        return i(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(i.proxy(function(t, o) {
            var n = i(o);
            this.addAriaAndCollapsedClass(h(n), n)
        }, this)).end()
    }
    ,
    d.prototype.addAriaAndCollapsedClass = function(t, o) {
        var n = t.hasClass("in");
        t.attr("aria-expanded", n),
        o.toggleClass("collapsed", !n).attr("aria-expanded", n)
    }
    ;
    var e = i.fn.collapse;
    i.fn.collapse = s,
    i.fn.collapse.Constructor = d,
    i.fn.collapse.noConflict = function() {
        return i.fn.collapse = e,
        this
    }
    ,
    i(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(t) {
        var o = i(this);
        o.attr("data-target") || t.preventDefault();
        var n = h(o)
          , r = n.data("bs.collapse")
          , a = r ? "toggle" : o.data();
        s.call(n, a)
    })
}(jQuery),
+function(i) {
    function h(r) {
        var a = r.attr("data-target");
        a || (a = r.attr("href"),
        a = a && /#[A-Za-z]/.test(a) && a.replace(/.*(?=#[^\s]*$)/, ""));
        var l = a && i(a);
        return l && l.length ? l : r.parent()
    }
    function s(r) {
        r && r.which === 3 || (i(e).remove(),
        i(t).each(function() {
            var a = i(this)
              , l = h(a)
              , p = {
                relatedTarget: this
            };
            l.hasClass("open") && (r && r.type == "click" && /input|textarea/i.test(r.target.tagName) && i.contains(l[0], r.target) || (l.trigger(r = i.Event("hide.bs.dropdown", p)),
            r.isDefaultPrevented() || (a.attr("aria-expanded", "false"),
            l.removeClass("open").trigger(i.Event("hidden.bs.dropdown", p)))))
        }))
    }
    function d(r) {
        return this.each(function() {
            var a = i(this)
              , l = a.data("bs.dropdown");
            l || a.data("bs.dropdown", l = new o(this)),
            typeof r == "string" && l[r].call(a)
        })
    }
    var e = ".dropdown-backdrop"
      , t = '[data-toggle="dropdown"]'
      , o = function(r) {
        i(r).on("click.bs.dropdown", this.toggle)
    };
    o.VERSION = "3.3.7",
    o.prototype.toggle = function(r) {
        var a = i(this);
        if (!a.is(".disabled, :disabled")) {
            var l = h(a)
              , p = l.hasClass("open");
            if (s(),
            !p) {
                "ontouchstart"in document.documentElement && !l.closest(".navbar-nav").length && i(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(i(this)).on("click", s);
                var c = {
                    relatedTarget: this
                };
                if (l.trigger(r = i.Event("show.bs.dropdown", c)),
                r.isDefaultPrevented())
                    return;
                a.trigger("focus").attr("aria-expanded", "true"),
                l.toggleClass("open").trigger(i.Event("shown.bs.dropdown", c))
            }
            return !1
        }
    }
    ,
    o.prototype.keydown = function(r) {
        if (/(38|40|27|32)/.test(r.which) && !/input|textarea/i.test(r.target.tagName)) {
            var a = i(this);
            if (r.preventDefault(),
            r.stopPropagation(),
            !a.is(".disabled, :disabled")) {
                var l = h(a)
                  , p = l.hasClass("open");
                if (!p && r.which != 27 || p && r.which == 27)
                    return r.which == 27 && l.find(t).trigger("focus"),
                    a.trigger("click");
                var c = " li:not(.disabled):visible a"
                  , f = l.find(".dropdown-menu" + c);
                if (f.length) {
                    var u = f.index(r.target);
                    r.which == 38 && u > 0 && u--,
                    r.which == 40 && u < f.length - 1 && u++,
                    ~u || (u = 0),
                    f.eq(u).trigger("focus")
                }
            }
        }
    }
    ;
    var n = i.fn.dropdown;
    i.fn.dropdown = d,
    i.fn.dropdown.Constructor = o,
    i.fn.dropdown.noConflict = function() {
        return i.fn.dropdown = n,
        this
    }
    ,
    i(document).on("click.bs.dropdown.data-api", s).on("click.bs.dropdown.data-api", ".dropdown form", function(r) {
        r.stopPropagation()
    }).on("click.bs.dropdown.data-api", t, o.prototype.toggle).on("keydown.bs.dropdown.data-api", t, o.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", o.prototype.keydown)
}(jQuery),
+function(i) {
    function h(e, t) {
        return this.each(function() {
            var o = i(this)
              , n = o.data("bs.modal")
              , r = i.extend({}, s.DEFAULTS, o.data(), typeof e == "object" && e);
            n || o.data("bs.modal", n = new s(this,r)),
            typeof e == "string" ? n[e](t) : r.show && n.show(t)
        })
    }
    var s = function(e, t) {
        this.options = t,
        this.$body = i(document.body),
        this.$element = i(e),
        this.$dialog = this.$element.find(".modal-dialog"),
        this.$backdrop = null,
        this.isShown = null,
        this.originalBodyPad = null,
        this.scrollbarWidth = 0,
        this.ignoreBackdropClick = !1,
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, i.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    s.VERSION = "3.3.7",
    s.TRANSITION_DURATION = 300,
    s.BACKDROP_TRANSITION_DURATION = 150,
    s.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    s.prototype.toggle = function(e) {
        return this.isShown ? this.hide() : this.show(e)
    }
    ,
    s.prototype.show = function(e) {
        var t = this
          , o = i.Event("show.bs.modal", {
            relatedTarget: e
        });
        this.$element.trigger(o),
        this.isShown || o.isDefaultPrevented() || (this.isShown = !0,
        this.checkScrollbar(),
        this.setScrollbar(),
        this.$body.addClass("modal-open"),
        this.escape(),
        this.resize(),
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', i.proxy(this.hide, this)),
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            t.$element.one("mouseup.dismiss.bs.modal", function(n) {
                i(n.target).is(t.$element) && (t.ignoreBackdropClick = !0)
            })
        }),
        this.backdrop(function() {
            var n = i.support.transition && t.$element.hasClass("fade");
            t.$element.parent().length || t.$element.appendTo(t.$body),
            t.$element.show().scrollTop(0),
            t.adjustDialog(),
            n && t.$element[0].offsetWidth,
            t.$element.addClass("in"),
            t.enforceFocus();
            var r = i.Event("shown.bs.modal", {
                relatedTarget: e
            });
            n ? t.$dialog.one("bsTransitionEnd", function() {
                t.$element.trigger("focus").trigger(r)
            }).emulateTransitionEnd(s.TRANSITION_DURATION) : t.$element.trigger("focus").trigger(r)
        }))
    }
    ,
    s.prototype.hide = function(e) {
        e && e.preventDefault(),
        e = i.Event("hide.bs.modal"),
        this.$element.trigger(e),
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1,
        this.escape(),
        this.resize(),
        i(document).off("focusin.bs.modal"),
        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),
        this.$dialog.off("mousedown.dismiss.bs.modal"),
        i.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", i.proxy(this.hideModal, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : this.hideModal())
    }
    ,
    s.prototype.enforceFocus = function() {
        i(document).off("focusin.bs.modal").on("focusin.bs.modal", i.proxy(function(e) {
            document === e.target || this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus")
        }, this))
    }
    ,
    s.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", i.proxy(function(e) {
            e.which == 27 && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }
    ,
    s.prototype.resize = function() {
        this.isShown ? i(window).on("resize.bs.modal", i.proxy(this.handleUpdate, this)) : i(window).off("resize.bs.modal")
    }
    ,
    s.prototype.hideModal = function() {
        var e = this;
        this.$element.hide(),
        this.backdrop(function() {
            e.$body.removeClass("modal-open"),
            e.resetAdjustments(),
            e.resetScrollbar(),
            e.$element.trigger("hidden.bs.modal")
        })
    }
    ,
    s.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    }
    ,
    s.prototype.backdrop = function(e) {
        var t = this
          , o = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var n = i.support.transition && o;
            if (this.$backdrop = i(document.createElement("div")).addClass("modal-backdrop " + o).appendTo(this.$body),
            this.$element.on("click.dismiss.bs.modal", i.proxy(function(a) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && (this.options.backdrop == "static" ? this.$element[0].focus() : this.hide()))
            }, this)),
            n && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !e)
                return;
            n ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var r = function() {
                t.removeBackdrop(),
                e && e()
            };
            i.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION) : r()
        } else
            e && e()
    }
    ,
    s.prototype.handleUpdate = function() {
        this.adjustDialog()
    }
    ,
    s.prototype.adjustDialog = function() {
        var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : ""
        })
    }
    ,
    s.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }
    ,
    s.prototype.checkScrollbar = function() {
        var e = window.innerWidth;
        if (!e) {
            var t = document.documentElement.getBoundingClientRect();
            e = t.right - Math.abs(t.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < e,
        this.scrollbarWidth = this.measureScrollbar()
    }
    ,
    s.prototype.setScrollbar = function() {
        var e = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "",
        this.bodyIsOverflowing && this.$body.css("padding-right", e + this.scrollbarWidth)
    }
    ,
    s.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }
    ,
    s.prototype.measureScrollbar = function() {
        var e = document.createElement("div");
        e.className = "modal-scrollbar-measure",
        this.$body.append(e);
        var t = e.offsetWidth - e.clientWidth;
        return this.$body[0].removeChild(e),
        t
    }
    ;
    var d = i.fn.modal;
    i.fn.modal = h,
    i.fn.modal.Constructor = s,
    i.fn.modal.noConflict = function() {
        return i.fn.modal = d,
        this
    }
    ,
    i(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var t = i(this)
          , o = t.attr("href")
          , n = i(t.attr("data-target") || o && o.replace(/.*(?=#[^\s]+$)/, ""))
          , r = n.data("bs.modal") ? "toggle" : i.extend({
            remote: !/#/.test(o) && o
        }, n.data(), t.data());
        t.is("a") && e.preventDefault(),
        n.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
                t.is(":visible") && t.trigger("focus")
            })
        }),
        h.call(n, r, this)
    })
}(jQuery),
+function(i) {
    function h(e) {
        return this.each(function() {
            var t = i(this)
              , o = t.data("bs.tooltip")
              , n = typeof e == "object" && e;
            !o && /destroy|hide/.test(e) || (o || t.data("bs.tooltip", o = new s(this,n)),
            typeof e == "string" && o[e]())
        })
    }
    var s = function(e, t) {
        this.type = null,
        this.options = null,
        this.enabled = null,
        this.timeout = null,
        this.hoverState = null,
        this.$element = null,
        this.inState = null,
        this.init("tooltip", e, t)
    };
    s.VERSION = "3.3.7",
    s.TRANSITION_DURATION = 150,
    s.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    },
    s.prototype.init = function(e, t, o) {
        if (this.enabled = !0,
        this.type = e,
        this.$element = i(t),
        this.options = this.getOptions(o),
        this.$viewport = this.options.viewport && i(i.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport),
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        },
        this.$element[0]instanceof document.constructor && !this.options.selector)
            throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), r = n.length; r--; ) {
            var a = n[r];
            if (a == "click")
                this.$element.on("click." + this.type, this.options.selector, i.proxy(this.toggle, this));
            else if (a != "manual") {
                var l = a == "hover" ? "mouseenter" : "focusin"
                  , p = a == "hover" ? "mouseleave" : "focusout";
                this.$element.on(l + "." + this.type, this.options.selector, i.proxy(this.enter, this)),
                this.$element.on(p + "." + this.type, this.options.selector, i.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = i.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ,
    s.prototype.getDefaults = function() {
        return s.DEFAULTS
    }
    ,
    s.prototype.getOptions = function(e) {
        return e = i.extend({}, this.getDefaults(), this.$element.data(), e),
        e.delay && typeof e.delay == "number" && (e.delay = {
            show: e.delay,
            hide: e.delay
        }),
        e
    }
    ,
    s.prototype.getDelegateOptions = function() {
        var e = {}
          , t = this.getDefaults();
        return this._options && i.each(this._options, function(o, n) {
            t[o] != n && (e[o] = n)
        }),
        e
    }
    ,
    s.prototype.enter = function(e) {
        var t = e instanceof this.constructor ? e : i(e.currentTarget).data("bs." + this.type);
        return t || (t = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        i(e.currentTarget).data("bs." + this.type, t)),
        e instanceof i.Event && (t.inState[e.type == "focusin" ? "focus" : "hover"] = !0),
        t.tip().hasClass("in") || t.hoverState == "in" ? void (t.hoverState = "in") : (clearTimeout(t.timeout),
        t.hoverState = "in",
        t.options.delay && t.options.delay.show ? void (t.timeout = setTimeout(function() {
            t.hoverState == "in" && t.show()
        }, t.options.delay.show)) : t.show())
    }
    ,
    s.prototype.isInStateTrue = function() {
        for (var e in this.inState)
            if (this.inState[e])
                return !0;
        return !1
    }
    ,
    s.prototype.leave = function(e) {
        var t = e instanceof this.constructor ? e : i(e.currentTarget).data("bs." + this.type);
        if (t || (t = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        i(e.currentTarget).data("bs." + this.type, t)),
        e instanceof i.Event && (t.inState[e.type == "focusout" ? "focus" : "hover"] = !1),
        !t.isInStateTrue())
            return clearTimeout(t.timeout),
            t.hoverState = "out",
            t.options.delay && t.options.delay.hide ? void (t.timeout = setTimeout(function() {
                t.hoverState == "out" && t.hide()
            }, t.options.delay.hide)) : t.hide()
    }
    ,
    s.prototype.show = function() {
        var e = i.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var t = i.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !t)
                return;
            var o = this
              , n = this.tip()
              , r = this.getUID(this.type);
            this.setContent(),
            n.attr("id", r),
            this.$element.attr("aria-describedby", r),
            this.options.animation && n.addClass("fade");
            var a = typeof this.options.placement == "function" ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement
              , l = /\s?auto?\s?/i
              , p = l.test(a);
            p && (a = a.replace(l, "") || "top"),
            n.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this),
            this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element),
            this.$element.trigger("inserted.bs." + this.type);
            var c = this.getPosition()
              , f = n[0].offsetWidth
              , u = n[0].offsetHeight;
            if (p) {
                var g = a
                  , m = this.getPosition(this.$viewport);
                a = a == "bottom" && c.bottom + u > m.bottom ? "top" : a == "top" && c.top - u < m.top ? "bottom" : a == "right" && c.right + f > m.width ? "left" : a == "left" && c.left - f < m.left ? "right" : a,
                n.removeClass(g).addClass(a)
            }
            var v = this.getCalculatedOffset(a, c, f, u);
            this.applyPlacement(v, a);
            var y = function() {
                var $ = o.hoverState;
                o.$element.trigger("shown.bs." + o.type),
                o.hoverState = null,
                $ == "out" && o.leave(o)
            };
            i.support.transition && this.$tip.hasClass("fade") ? n.one("bsTransitionEnd", y).emulateTransitionEnd(s.TRANSITION_DURATION) : y()
        }
    }
    ,
    s.prototype.applyPlacement = function(e, t) {
        var o = this.tip()
          , n = o[0].offsetWidth
          , r = o[0].offsetHeight
          , a = parseInt(o.css("margin-top"), 10)
          , l = parseInt(o.css("margin-left"), 10);
        isNaN(a) && (a = 0),
        isNaN(l) && (l = 0),
        e.top += a,
        e.left += l,
        i.offset.setOffset(o[0], i.extend({
            using: function(v) {
                o.css({
                    top: Math.round(v.top),
                    left: Math.round(v.left)
                })
            }
        }, e), 0),
        o.addClass("in");
        var p = o[0].offsetWidth
          , c = o[0].offsetHeight;
        t == "top" && c != r && (e.top = e.top + r - c);
        var f = this.getViewportAdjustedDelta(t, e, p, c);
        f.left ? e.left += f.left : e.top += f.top;
        var u = /top|bottom/.test(t)
          , g = u ? 2 * f.left - n + p : 2 * f.top - r + c
          , m = u ? "offsetWidth" : "offsetHeight";
        o.offset(e),
        this.replaceArrow(g, o[0][m], u)
    }
    ,
    s.prototype.replaceArrow = function(e, t, o) {
        this.arrow().css(o ? "left" : "top", 50 * (1 - e / t) + "%").css(o ? "top" : "left", "")
    }
    ,
    s.prototype.setContent = function() {
        var e = this.tip()
          , t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t),
        e.removeClass("fade in top bottom left right")
    }
    ,
    s.prototype.hide = function(e) {
        function t() {
            o.hoverState != "in" && n.detach(),
            o.$element && o.$element.removeAttr("aria-describedby").trigger("hidden.bs." + o.type),
            e && e()
        }
        var o = this
          , n = i(this.$tip)
          , r = i.Event("hide.bs." + this.type);
        if (this.$element.trigger(r),
        !r.isDefaultPrevented())
            return n.removeClass("in"),
            i.support.transition && n.hasClass("fade") ? n.one("bsTransitionEnd", t).emulateTransitionEnd(s.TRANSITION_DURATION) : t(),
            this.hoverState = null,
            this
    }
    ,
    s.prototype.fixTitle = function() {
        var e = this.$element;
        (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
    }
    ,
    s.prototype.hasContent = function() {
        return this.getTitle()
    }
    ,
    s.prototype.getPosition = function(e) {
        e = e || this.$element;
        var t = e[0]
          , o = t.tagName == "BODY"
          , n = t.getBoundingClientRect();
        n.width == null && (n = i.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var r = window.SVGElement && t instanceof window.SVGElement
          , a = o ? {
            top: 0,
            left: 0
        } : r ? null : e.offset()
          , l = {
            scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
        }
          , p = o ? {
            width: i(window).width(),
            height: i(window).height()
        } : null;
        return i.extend({}, n, l, p, a)
    }
    ,
    s.prototype.getCalculatedOffset = function(e, t, o, n) {
        return e == "bottom" ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - o / 2
        } : e == "top" ? {
            top: t.top - n,
            left: t.left + t.width / 2 - o / 2
        } : e == "left" ? {
            top: t.top + t.height / 2 - n / 2,
            left: t.left - o
        } : {
            top: t.top + t.height / 2 - n / 2,
            left: t.left + t.width
        }
    }
    ,
    s.prototype.getViewportAdjustedDelta = function(e, t, o, n) {
        var r = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return r;
        var a = this.options.viewport && this.options.viewport.padding || 0
          , l = this.getPosition(this.$viewport);
        if (/right|left/.test(e)) {
            var p = t.top - a - l.scroll
              , c = t.top + a - l.scroll + n;
            p < l.top ? r.top = l.top - p : c > l.top + l.height && (r.top = l.top + l.height - c)
        } else {
            var f = t.left - a
              , u = t.left + a + o;
            f < l.left ? r.left = l.left - f : u > l.right && (r.left = l.left + l.width - u)
        }
        return r
    }
    ,
    s.prototype.getTitle = function() {
        var e = this.$element
          , t = this.options;
        return e.attr("data-original-title") || (typeof t.title == "function" ? t.title.call(e[0]) : t.title)
    }
    ,
    s.prototype.getUID = function(e) {
        do
            e += ~~(1e6 * Math.random());
        while (document.getElementById(e));
        return e
    }
    ,
    s.prototype.tip = function() {
        if (!this.$tip && (this.$tip = i(this.options.template),
        this.$tip.length != 1))
            throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }
    ,
    s.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ,
    s.prototype.enable = function() {
        this.enabled = !0
    }
    ,
    s.prototype.disable = function() {
        this.enabled = !1
    }
    ,
    s.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ,
    s.prototype.toggle = function(e) {
        var t = this;
        e && (t = i(e.currentTarget).data("bs." + this.type),
        t || (t = new this.constructor(e.currentTarget,this.getDelegateOptions()),
        i(e.currentTarget).data("bs." + this.type, t))),
        e ? (t.inState.click = !t.inState.click,
        t.isInStateTrue() ? t.enter(t) : t.leave(t)) : t.tip().hasClass("in") ? t.leave(t) : t.enter(t)
    }
    ,
    s.prototype.destroy = function() {
        var e = this;
        clearTimeout(this.timeout),
        this.hide(function() {
            e.$element.off("." + e.type).removeData("bs." + e.type),
            e.$tip && e.$tip.detach(),
            e.$tip = null,
            e.$arrow = null,
            e.$viewport = null,
            e.$element = null
        })
    }
    ;
    var d = i.fn.tooltip;
    i.fn.tooltip = h,
    i.fn.tooltip.Constructor = s,
    i.fn.tooltip.noConflict = function() {
        return i.fn.tooltip = d,
        this
    }
}(jQuery),
+function(i) {
    function h(e) {
        return this.each(function() {
            var t = i(this)
              , o = t.data("bs.popover")
              , n = typeof e == "object" && e;
            !o && /destroy|hide/.test(e) || (o || t.data("bs.popover", o = new s(this,n)),
            typeof e == "string" && o[e]())
        })
    }
    var s = function(e, t) {
        this.init("popover", e, t)
    };
    if (!i.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    s.VERSION = "3.3.7",
    s.DEFAULTS = i.extend({}, i.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    s.prototype = i.extend({}, i.fn.tooltip.Constructor.prototype),
    s.prototype.constructor = s,
    s.prototype.getDefaults = function() {
        return s.DEFAULTS
    }
    ,
    s.prototype.setContent = function() {
        var e = this.tip()
          , t = this.getTitle()
          , o = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](t),
        e.find(".popover-content").children().detach().end()[this.options.html ? typeof o == "string" ? "html" : "append" : "text"](o),
        e.removeClass("fade top bottom left right in"),
        e.find(".popover-title").html() || e.find(".popover-title").hide()
    }
    ,
    s.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    ,
    s.prototype.getContent = function() {
        var e = this.$element
          , t = this.options;
        return e.attr("data-content") || (typeof t.content == "function" ? t.content.call(e[0]) : t.content)
    }
    ,
    s.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }
    ;
    var d = i.fn.popover;
    i.fn.popover = h,
    i.fn.popover.Constructor = s,
    i.fn.popover.noConflict = function() {
        return i.fn.popover = d,
        this
    }
}(jQuery),
+function(i) {
    function h(e, t) {
        this.$body = i(document.body),
        this.$scrollElement = i(i(e).is(document.body) ? window : e),
        this.options = i.extend({}, h.DEFAULTS, t),
        this.selector = (this.options.target || "") + " .nav li > a",
        this.offsets = [],
        this.targets = [],
        this.activeTarget = null,
        this.scrollHeight = 0,
        this.$scrollElement.on("scroll.bs.scrollspy", i.proxy(this.process, this)),
        this.refresh(),
        this.process()
    }
    function s(e) {
        return this.each(function() {
            var t = i(this)
              , o = t.data("bs.scrollspy")
              , n = typeof e == "object" && e;
            o || t.data("bs.scrollspy", o = new h(this,n)),
            typeof e == "string" && o[e]()
        })
    }
    h.VERSION = "3.3.7",
    h.DEFAULTS = {
        offset: 10
    },
    h.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }
    ,
    h.prototype.refresh = function() {
        var e = this
          , t = "offset"
          , o = 0;
        this.offsets = [],
        this.targets = [],
        this.scrollHeight = this.getScrollHeight(),
        i.isWindow(this.$scrollElement[0]) || (t = "position",
        o = this.$scrollElement.scrollTop()),
        this.$body.find(this.selector).map(function() {
            var n = i(this)
              , r = n.data("target") || n.attr("href")
              , a = /^#./.test(r) && i(r);
            return a && a.length && a.is(":visible") && [[a[t]().top + o, r]] || null
        }).sort(function(n, r) {
            return n[0] - r[0]
        }).each(function() {
            e.offsets.push(this[0]),
            e.targets.push(this[1])
        })
    }
    ,
    h.prototype.process = function() {
        var e, t = this.$scrollElement.scrollTop() + this.options.offset, o = this.getScrollHeight(), n = this.options.offset + o - this.$scrollElement.height(), r = this.offsets, a = this.targets, l = this.activeTarget;
        if (this.scrollHeight != o && this.refresh(),
        t >= n)
            return l != (e = a[a.length - 1]) && this.activate(e);
        if (l && t < r[0])
            return this.activeTarget = null,
            this.clear();
        for (e = r.length; e--; )
            l != a[e] && t >= r[e] && (r[e + 1] === void 0 || t < r[e + 1]) && this.activate(a[e])
    }
    ,
    h.prototype.activate = function(e) {
        this.activeTarget = e,
        this.clear();
        var t = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]'
          , o = i(t).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")),
        o.trigger("activate.bs.scrollspy")
    }
    ,
    h.prototype.clear = function() {
        i(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    }
    ;
    var d = i.fn.scrollspy;
    i.fn.scrollspy = s,
    i.fn.scrollspy.Constructor = h,
    i.fn.scrollspy.noConflict = function() {
        return i.fn.scrollspy = d,
        this
    }
    ,
    i(window).on("load.bs.scrollspy.data-api", function() {
        i('[data-spy="scroll"]').each(function() {
            var e = i(this);
            s.call(e, e.data())
        })
    })
}(jQuery),
+function(i) {
    function h(t) {
        return this.each(function() {
            var o = i(this)
              , n = o.data("bs.tab");
            n || o.data("bs.tab", n = new s(this)),
            typeof t == "string" && n[t]()
        })
    }
    var s = function(t) {
        this.element = i(t)
    };
    s.VERSION = "3.3.7",
    s.TRANSITION_DURATION = 150,
    s.prototype.show = function() {
        var t = this.element
          , o = t.closest("ul:not(.dropdown-menu)")
          , n = t.data("target");
        if (n || (n = t.attr("href"),
        n = n && n.replace(/.*(?=#[^\s]*$)/, "")),
        !t.parent("li").hasClass("active")) {
            var r = o.find(".active:last a")
              , a = i.Event("hide.bs.tab", {
                relatedTarget: t[0]
            })
              , l = i.Event("show.bs.tab", {
                relatedTarget: r[0]
            });
            if (r.trigger(a),
            t.trigger(l),
            !l.isDefaultPrevented() && !a.isDefaultPrevented()) {
                var p = i(n);
                this.activate(t.closest("li"), o),
                this.activate(p, p.parent(), function() {
                    r.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: t[0]
                    }),
                    t.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: r[0]
                    })
                })
            }
        }
    }
    ,
    s.prototype.activate = function(t, o, n) {
        function r() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
            t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
            l ? (t[0].offsetWidth,
            t.addClass("in")) : t.removeClass("fade"),
            t.parent(".dropdown-menu").length && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            n && n()
        }
        var a = o.find("> .active")
          , l = n && i.support.transition && (a.length && a.hasClass("fade") || !!o.find("> .fade").length);
        a.length && l ? a.one("bsTransitionEnd", r).emulateTransitionEnd(s.TRANSITION_DURATION) : r(),
        a.removeClass("in")
    }
    ;
    var d = i.fn.tab;
    i.fn.tab = h,
    i.fn.tab.Constructor = s,
    i.fn.tab.noConflict = function() {
        return i.fn.tab = d,
        this
    }
    ;
    var e = function(t) {
        t.preventDefault(),
        h.call(i(this), "show")
    };
    i(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery),
+function(i) {
    function h(e) {
        return this.each(function() {
            var t = i(this)
              , o = t.data("bs.affix")
              , n = typeof e == "object" && e;
            o || t.data("bs.affix", o = new s(this,n)),
            typeof e == "string" && o[e]()
        })
    }
    var s = function(e, t) {
        this.options = i.extend({}, s.DEFAULTS, t),
        this.$target = i(this.options.target).on("scroll.bs.affix.data-api", i.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", i.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = i(e),
        this.affixed = null,
        this.unpin = null,
        this.pinnedOffset = null,
        this.checkPosition()
    };
    s.VERSION = "3.3.7",
    s.RESET = "affix affix-top affix-bottom",
    s.DEFAULTS = {
        offset: 0,
        target: window
    },
    s.prototype.getState = function(e, t, o, n) {
        var r = this.$target.scrollTop()
          , a = this.$element.offset()
          , l = this.$target.height();
        if (o != null && this.affixed == "top")
            return r < o && "top";
        if (this.affixed == "bottom")
            return o != null ? !(r + this.unpin <= a.top) && "bottom" : !(r + l <= e - n) && "bottom";
        var p = this.affixed == null
          , c = p ? r : a.top
          , f = p ? l : t;
        return o != null && r <= o ? "top" : n != null && c + f >= e - n && "bottom"
    }
    ,
    s.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(s.RESET).addClass("affix");
        var e = this.$target.scrollTop()
          , t = this.$element.offset();
        return this.pinnedOffset = t.top - e
    }
    ,
    s.prototype.checkPositionWithEventLoop = function() {
        setTimeout(i.proxy(this.checkPosition, this), 1)
    }
    ,
    s.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height()
              , t = this.options.offset
              , o = t.top
              , n = t.bottom
              , r = Math.max(i(document).height(), i(document.body).height());
            typeof t != "object" && (n = o = t),
            typeof o == "function" && (o = t.top(this.$element)),
            typeof n == "function" && (n = t.bottom(this.$element));
            var a = this.getState(r, e, o, n);
            if (this.affixed != a) {
                this.unpin != null && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : "")
                  , p = i.Event(l + ".bs.affix");
                if (this.$element.trigger(p),
                p.isDefaultPrevented())
                    return;
                this.affixed = a,
                this.unpin = a == "bottom" ? this.getPinnedOffset() : null,
                this.$element.removeClass(s.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            a == "bottom" && this.$element.offset({
                top: r - e - n
            })
        }
    }
    ;
    var d = i.fn.affix;
    i.fn.affix = h,
    i.fn.affix.Constructor = s,
    i.fn.affix.noConflict = function() {
        return i.fn.affix = d,
        this
    }
    ,
    i(window).on("load", function() {
        i('[data-spy="affix"]').each(function() {
            var e = i(this)
              , t = e.data();
            t.offset = t.offset || {},
            t.offsetBottom != null && (t.offset.bottom = t.offsetBottom),
            t.offsetTop != null && (t.offset.top = t.offsetTop),
            h.call(e, t)
        })
    })
}(jQuery);
