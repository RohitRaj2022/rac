/*! jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 JĆĀ¶rn Zaefferer; Licensed MIT */
(function(t) {
    typeof define == "function" && define.amd ? define(["jquery"], t) : t(jQuery)
}
)(function(t) {
    t.extend(t.fn, {
        validate: function(e) {
            if (!this.length)
                return void (e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var i = t.data(this[0], "validator");
            return i || (this.attr("novalidate", "novalidate"),
            i = new t.validator(e,this[0]),
            t.data(this[0], "validator", i),
            i.settings.onsubmit && (this.on("click.validate", ":submit", function(n) {
                i.settings.submitHandler && (i.submitButton = n.target),
                t(this).hasClass("cancel") && (i.cancelSubmit = !0),
                t(this).attr("formnovalidate") !== void 0 && (i.cancelSubmit = !0)
            }),
            this.on("submit.validate", function(n) {
                function r() {
                    var a, s;
                    return i.settings.submitHandler ? (i.submitButton && (a = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),
                    s = i.settings.submitHandler.call(i, i.currentForm, n),
                    i.submitButton && a.remove(),
                    s !== void 0 ? s : !1) : !0
                }
                return i.settings.debug && n.preventDefault(),
                i.cancelSubmit ? (i.cancelSubmit = !1,
                r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0,
                !1) : r() : (i.focusInvalid(),
                !1)
            })),
            i)
        },
        valid: function() {
            var e, i, n;
            return t(this[0]).is("form") ? e = this.validate().form() : (n = [],
            e = !0,
            i = t(this[0].form).validate(),
            this.each(function() {
                e = i.element(this) && e,
                n = n.concat(i.errorList)
            }),
            i.errorList = n),
            e
        },
        rules: function(e, i) {
            var n, r, a, s, l, u, h = this[0];
            if (e)
                switch (n = t.data(h.form, "validator").settings,
                r = n.rules,
                a = t.validator.staticRules(h),
                e) {
                case "add":
                    t.extend(a, t.validator.normalizeRule(i)),
                    delete a.messages,
                    r[h.name] = a,
                    i.messages && (n.messages[h.name] = t.extend(n.messages[h.name], i.messages));
                    break;
                case "remove":
                    return i ? (u = {},
                    t.each(i.split(/\s/), function(g, m) {
                        u[m] = a[m],
                        delete a[m],
                        m === "required" && t(h).removeAttr("aria-required")
                    }),
                    u) : (delete r[h.name],
                    a)
                }
            return s = t.validator.normalizeRules(t.extend({}, t.validator.classRules(h), t.validator.attributeRules(h), t.validator.dataRules(h), t.validator.staticRules(h)), h),
            s.required && (l = s.required,
            delete s.required,
            s = t.extend({
                required: l
            }, s),
            t(h).attr("aria-required", "true")),
            s.remote && (l = s.remote,
            delete s.remote,
            s = t.extend(s, {
                remote: l
            })),
            s
        }
    }),
    t.extend(t.expr[":"], {
        blank: function(e) {
            return !t.trim("" + t(e).val())
        },
        filled: function(e) {
            return !!t.trim("" + t(e).val())
        },
        unchecked: function(e) {
            return !t(e).prop("checked")
        }
    }),
    t.validator = function(e, i) {
        this.settings = t.extend(!0, {}, t.validator.defaults, e),
        this.currentForm = i,
        this.init()
    }
    ,
    t.validator.format = function(e, i) {
        return arguments.length === 1 ? function() {
            var n = t.makeArray(arguments);
            return n.unshift(e),
            t.validator.format.apply(this, n)
        }
        : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)),
        i.constructor !== Array && (i = [i]),
        t.each(i, function(n, r) {
            e = e.replace(new RegExp("\\{" + n + "\\}","g"), function() {
                return r
            })
        }),
        e)
    }
    ,
    t.extend(t.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: t([]),
            errorLabelContainer: t([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(e) {
                this.lastActive = e,
                this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass),
                this.hideThese(this.errorsFor(e)))
            },
            onfocusout: function(e) {
                this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
            },
            onkeyup: function(e, i) {
                var n = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                i.which === 9 && this.elementValue(e) === "" || t.inArray(i.keyCode, n) !== -1 || (e.name in this.submitted || e === this.lastElement) && this.element(e)
            },
            onclick: function(e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
            },
            highlight: function(e, i, n) {
                e.type === "radio" ? this.findByName(e.name).addClass(i).removeClass(n) : t(e).addClass(i).removeClass(n)
            },
            unhighlight: function(e, i, n) {
                e.type === "radio" ? this.findByName(e.name).removeClass(i).addClass(n) : t(e).removeClass(i).addClass(n)
            }
        },
        setDefaults: function(e) {
            t.extend(t.validator.defaults, e)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: t.validator.format("Please enter no more than {0} characters."),
            minlength: t.validator.format("Please enter at least {0} characters."),
            rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
            range: t.validator.format("Please enter a value between {0} and {1}."),
            max: t.validator.format("Please enter a value less than or equal to {0}."),
            min: t.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function e(r) {
                    var a = t.data(this.form, "validator")
                      , s = "on" + r.type.replace(/^validate/, "")
                      , l = a.settings;
                    l[s] && !t(this).is(l.ignore) && l[s].call(a, this, r)
                }
                this.labelContainer = t(this.settings.errorLabelContainer),
                this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm),
                this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer),
                this.submitted = {},
                this.valueCache = {},
                this.pendingRequest = 0,
                this.pending = {},
                this.invalid = {},
                this.reset();
                var i, n = this.groups = {};
                t.each(this.settings.groups, function(r, a) {
                    typeof a == "string" && (a = a.split(/\s/)),
                    t.each(a, function(s, l) {
                        n[l] = r
                    })
                }),
                i = this.settings.rules,
                t.each(i, function(r, a) {
                    i[r] = t.validator.normalizeRule(a)
                }),
                t(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", e).on("click.validate", "select, option, [type='radio'], [type='checkbox']", e),
                this.settings.invalidHandler && t(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler),
                t(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(),
                t.extend(this.submitted, this.errorMap),
                this.invalid = t.extend({}, this.errorMap),
                this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]),
                this.showErrors(),
                this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var e = 0, i = this.currentElements = this.elements(); i[e]; e++)
                    this.check(i[e]);
                return this.valid()
            },
            element: function(e) {
                var i = this.clean(e)
                  , n = this.validationTargetFor(i)
                  , r = !0;
                return this.lastElement = n,
                n === void 0 ? delete this.invalid[i.name] : (this.prepareElement(n),
                this.currentElements = t(n),
                r = this.check(n) !== !1,
                r ? delete this.invalid[n.name] : this.invalid[n.name] = !0),
                t(e).attr("aria-invalid", !r),
                this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
                this.showErrors(),
                r
            },
            showErrors: function(e) {
                if (e) {
                    t.extend(this.errorMap, e),
                    this.errorList = [];
                    for (var i in e)
                        this.errorList.push({
                            message: e[i],
                            element: this.findByName(i)[0]
                        });
                    this.successList = t.grep(this.successList, function(n) {
                        return !(n.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                t.fn.resetForm && t(this.currentForm).resetForm(),
                this.submitted = {},
                this.lastElement = null,
                this.prepareForm(),
                this.hideErrors();
                var e, i = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                if (this.settings.unhighlight)
                    for (e = 0; i[e]; e++)
                        this.settings.unhighlight.call(this, i[e], this.settings.errorClass, "");
                else
                    i.removeClass(this.settings.errorClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(e) {
                var i, n = 0;
                for (i in e)
                    n++;
                return n
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(e) {
                e.not(this.containers).text(""),
                this.addWrapper(e).hide()
            },
            valid: function() {
                return this.size() === 0
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid)
                    try {
                        t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch {}
            },
            findLastActive: function() {
                var e = this.lastActive;
                return e && t.grep(this.errorList, function(i) {
                    return i.element.name === e.name
                }).length === 1 && e
            },
            elements: function() {
                var e = this
                  , i = {};
                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this),
                    this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0,
                    !0)
                })
            },
            clean: function(e) {
                return t(e)[0]
            },
            errors: function() {
                var e = this.settings.errorClass.split(" ").join(".");
                return t(this.settings.errorElement + "." + e, this.errorContext)
            },
            reset: function() {
                this.successList = [],
                this.errorList = [],
                this.errorMap = {},
                this.toShow = t([]),
                this.toHide = t([]),
                this.currentElements = t([])
            },
            prepareForm: function() {
                this.reset(),
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(e) {
                this.reset(),
                this.toHide = this.errorsFor(e)
            },
            elementValue: function(e) {
                var i, n = t(e), r = e.type;
                return r === "radio" || r === "checkbox" ? this.findByName(e.name).filter(":checked").val() : r === "number" && typeof e.validity < "u" ? e.validity.badInput ? !1 : n.val() : (i = n.val(),
                typeof i == "string" ? i.replace(/\r/g, "") : i)
            },
            check: function(e) {
                e = this.validationTargetFor(this.clean(e));
                var i, n, r, a = t(e).rules(), s = t.map(a, function(h, g) {
                    return g
                }).length, l = !1, u = this.elementValue(e);
                for (n in a) {
                    r = {
                        method: n,
                        parameters: a[n]
                    };
                    try {
                        if (i = t.validator.methods[n].call(this, u, e, r.parameters),
                        i === "dependency-mismatch" && s === 1) {
                            l = !0;
                            continue
                        }
                        if (l = !1,
                        i === "pending")
                            return void (this.toHide = this.toHide.not(this.errorsFor(e)));
                        if (!i)
                            return this.formatAndAdd(e, r),
                            !1
                    } catch (h) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + r.method + "' method.", h),
                        h instanceof TypeError && (h.message += ".  Exception occurred when checking element " + e.id + ", check the '" + r.method + "' method."),
                        h
                    }
                }
                if (!l)
                    return this.objectLength(a) && this.successList.push(e),
                    !0
            },
            customDataMessage: function(e, i) {
                return t(e).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || t(e).data("msg")
            },
            customMessage: function(e, i) {
                var n = this.settings.messages[e];
                return n && (n.constructor === String ? n : n[i])
            },
            findDefined: function() {
                for (var e = 0; e < arguments.length; e++)
                    if (arguments[e] !== void 0)
                        return arguments[e]
            },
            defaultMessage: function(e, i) {
                return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
            },
            formatAndAdd: function(e, i) {
                var n = this.defaultMessage(e, i.method)
                  , r = /\$?\{(\d+)\}/g;
                typeof n == "function" ? n = n.call(this, i.parameters, e) : r.test(n) && (n = t.validator.format(n.replace(r, "{$1}"), i.parameters)),
                this.errorList.push({
                    message: n,
                    element: e,
                    method: i.method
                }),
                this.errorMap[e.name] = n,
                this.submitted[e.name] = n
            },
            addWrapper: function(e) {
                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))),
                e
            },
            defaultShowErrors: function() {
                var e, i, n;
                for (e = 0; this.errorList[e]; e++)
                    n = this.errorList[e],
                    this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass),
                    this.showLabel(n.element, n.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)),
                this.settings.success)
                    for (e = 0; this.successList[e]; e++)
                        this.showLabel(this.successList[e]);
                if (this.settings.unhighlight)
                    for (e = 0,
                    i = this.validElements(); i[e]; e++)
                        this.settings.unhighlight.call(this, i[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow),
                this.hideErrors(),
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return t(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(e, i) {
                var n, r, a, s = this.errorsFor(e), l = this.idOrName(e), u = t(e).attr("aria-describedby");
                s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
                s.html(i)) : (s = t("<" + this.settings.errorElement + ">").attr("id", l + "-error").addClass(this.settings.errorClass).html(i || ""),
                n = s,
                this.settings.wrapper && (n = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()),
                this.labelContainer.length ? this.labelContainer.append(n) : this.settings.errorPlacement ? this.settings.errorPlacement(n, t(e)) : n.insertAfter(e),
                s.is("label") ? s.attr("for", l) : s.parents("label[for='" + l + "']").length === 0 && (a = s.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1"),
                u ? u.match(new RegExp("\\b" + a + "\\b")) || (u += " " + a) : u = a,
                t(e).attr("aria-describedby", u),
                r = this.groups[e.name],
                r && t.each(this.groups, function(h, g) {
                    g === r && t("[name='" + h + "']", this.currentForm).attr("aria-describedby", s.attr("id"))
                }))),
                !i && this.settings.success && (s.text(""),
                typeof this.settings.success == "string" ? s.addClass(this.settings.success) : this.settings.success(s, e)),
                this.toShow = this.toShow.add(s)
            },
            errorsFor: function(e) {
                var i = this.idOrName(e)
                  , n = t(e).attr("aria-describedby")
                  , r = "label[for='" + i + "'], label[for='" + i + "'] *";
                return n && (r = r + ", #" + n.replace(/\s+/g, ", #")),
                this.errors().filter(r)
            },
            idOrName: function(e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
            },
            validationTargetFor: function(e) {
                return this.checkable(e) && (e = this.findByName(e.name)),
                t(e).not(this.settings.ignore)[0]
            },
            checkable: function(e) {
                return /radio|checkbox/i.test(e.type)
            },
            findByName: function(e) {
                return t(this.currentForm).find("[name='" + e + "']")
            },
            getLength: function(e, i) {
                switch (i.nodeName.toLowerCase()) {
                case "select":
                    return t("option:selected", i).length;
                case "input":
                    if (this.checkable(i))
                        return this.findByName(i.name).filter(":checked").length
                }
                return e.length
            },
            depend: function(e, i) {
                return this.dependTypes[typeof e] ? this.dependTypes[typeof e](e, i) : !0
            },
            dependTypes: {
                boolean: function(e) {
                    return e
                },
                string: function(e, i) {
                    return !!t(e, i.form).length
                },
                function: function(e, i) {
                    return e(i)
                }
            },
            optional: function(e) {
                var i = this.elementValue(e);
                return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
            },
            startRequest: function(e) {
                this.pending[e.name] || (this.pendingRequest++,
                this.pending[e.name] = !0)
            },
            stopRequest: function(e, i) {
                this.pendingRequest--,
                this.pendingRequest < 0 && (this.pendingRequest = 0),
                delete this.pending[e.name],
                i && this.pendingRequest === 0 && this.formSubmitted && this.form() ? (t(this.currentForm).submit(),
                this.formSubmitted = !1) : !i && this.pendingRequest === 0 && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]),
                this.formSubmitted = !1)
            },
            previousValue: function(e) {
                return t.data(e, "previousValue") || t.data(e, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(e, "remote")
                })
            },
            destroy: function() {
                this.resetForm(),
                t(this.currentForm).off(".validate").removeData("validator")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(e, i) {
            e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
        },
        classRules: function(e) {
            var i = {}
              , n = t(e).attr("class");
            return n && t.each(n.split(" "), function() {
                this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
            }),
            i
        },
        normalizeAttributeRule: function(e, i, n, r) {
            /min|max/.test(n) && (i === null || /number|range|text/.test(i)) && (r = Number(r),
            isNaN(r) && (r = void 0)),
            r || r === 0 ? e[n] = r : i === n && i !== "range" && (e[n] = !0)
        },
        attributeRules: function(e) {
            var i, n, r = {}, a = t(e), s = e.getAttribute("type");
            for (i in t.validator.methods)
                i === "required" ? (n = e.getAttribute(i),
                n === "" && (n = !0),
                n = !!n) : n = a.attr(i),
                this.normalizeAttributeRule(r, s, i, n);
            return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength,
            r
        },
        dataRules: function(e) {
            var i, n, r = {}, a = t(e), s = e.getAttribute("type");
            for (i in t.validator.methods)
                n = a.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()),
                this.normalizeAttributeRule(r, s, i, n);
            return r
        },
        staticRules: function(e) {
            var i = {}
              , n = t.data(e.form, "validator");
            return n.settings.rules && (i = t.validator.normalizeRule(n.settings.rules[e.name]) || {}),
            i
        },
        normalizeRules: function(e, i) {
            return t.each(e, function(n, r) {
                if (r === !1)
                    return void delete e[n];
                if (r.param || r.depends) {
                    var a = !0;
                    switch (typeof r.depends) {
                    case "string":
                        a = !!t(r.depends, i.form).length;
                        break;
                    case "function":
                        a = r.depends.call(i, i)
                    }
                    a ? e[n] = r.param !== void 0 ? r.param : !0 : delete e[n]
                }
            }),
            t.each(e, function(n, r) {
                e[n] = t.isFunction(r) ? r(i) : r
            }),
            t.each(["minlength", "maxlength"], function() {
                e[this] && (e[this] = Number(e[this]))
            }),
            t.each(["rangelength", "range"], function() {
                var n;
                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : typeof e[this] == "string" && (n = e[this].replace(/[\[\]]/g, "").split(/[\s,]+/),
                e[this] = [Number(n[0]), Number(n[1])]))
            }),
            t.validator.autoCreateRanges && (e.min != null && e.max != null && (e.range = [e.min, e.max],
            delete e.min,
            delete e.max),
            e.minlength != null && e.maxlength != null && (e.rangelength = [e.minlength, e.maxlength],
            delete e.minlength,
            delete e.maxlength)),
            e
        },
        normalizeRule: function(e) {
            if (typeof e == "string") {
                var i = {};
                t.each(e.split(/\s/), function() {
                    i[this] = !0
                }),
                e = i
            }
            return e
        },
        addMethod: function(e, i, n) {
            t.validator.methods[e] = i,
            t.validator.messages[e] = n !== void 0 ? n : t.validator.messages[e],
            i.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        },
        methods: {
            required: function(e, i, n) {
                if (!this.depend(n, i))
                    return "dependency-mismatch";
                if (i.nodeName.toLowerCase() === "select") {
                    var r = t(i).val();
                    return r && r.length > 0
                }
                return this.checkable(i) ? this.getLength(e, i) > 0 : e.length > 0
            },
            email: function(e, i) {
                return this.optional(i) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
            },
            url: function(e, i) {
                return this.optional(i) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)
            },
            date: function(e, i) {
                return this.optional(i) || !/Invalid|NaN/.test(new Date(e).toString())
            },
            dateISO: function(e, i) {
                return this.optional(i) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
            },
            number: function(e, i) {
                return this.optional(i) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            },
            digits: function(e, i) {
                return this.optional(i) || /^\d+$/.test(e)
            },
            creditcard: function(e, i) {
                if (this.optional(i))
                    return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(e))
                    return !1;
                var n, r, a = 0, s = 0, l = !1;
                if (e = e.replace(/\D/g, ""),
                e.length < 13 || e.length > 19)
                    return !1;
                for (n = e.length - 1; n >= 0; n--)
                    r = e.charAt(n),
                    s = parseInt(r, 10),
                    l && (s *= 2) > 9 && (s -= 9),
                    a += s,
                    l = !l;
                return a % 10 === 0
            },
            minlength: function(e, i, n) {
                var r = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || r >= n
            },
            maxlength: function(e, i, n) {
                var r = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || n >= r
            },
            rangelength: function(e, i, n) {
                var r = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || r >= n[0] && r <= n[1]
            },
            min: function(e, i, n) {
                return this.optional(i) || e >= n
            },
            max: function(e, i, n) {
                return this.optional(i) || n >= e
            },
            range: function(e, i, n) {
                return this.optional(i) || e >= n[0] && e <= n[1]
            },
            equalTo: function(e, i, n) {
                var r = t(n);
                return this.settings.onfocusout && r.off(".validate-equalTo").on("blur.validate-equalTo", function() {
                    t(i).valid()
                }),
                e === r.val()
            },
            remote: function(e, i, n) {
                if (this.optional(i))
                    return "dependency-mismatch";
                var r, a, s = this.previousValue(i);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}),
                s.originalMessage = this.settings.messages[i.name].remote,
                this.settings.messages[i.name].remote = s.message,
                n = typeof n == "string" && {
                    url: n
                } || n,
                s.old === e ? s.valid : (s.old = e,
                r = this,
                this.startRequest(i),
                a = {},
                a[i.name] = e,
                t.ajax(t.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: a,
                    context: r.currentForm,
                    success: function(l) {
                        var u, h, g, m = l === !0 || l === "true";
                        r.settings.messages[i.name].remote = s.originalMessage,
                        m ? (g = r.formSubmitted,
                        r.prepareElement(i),
                        r.formSubmitted = g,
                        r.successList.push(i),
                        delete r.invalid[i.name],
                        r.showErrors()) : (u = {},
                        h = l || r.defaultMessage(i, "remote"),
                        u[i.name] = s.message = t.isFunction(h) ? h(e) : h,
                        r.invalid[i.name] = !0,
                        r.showErrors(u)),
                        s.valid = m,
                        r.stopRequest(i, m)
                    }
                }, n)),
                "pending")
            }
        }
    });
    var V, M = {};
    t.ajaxPrefilter ? t.ajaxPrefilter(function(e, i, n) {
        var r = e.port;
        e.mode === "abort" && (M[r] && M[r].abort(),
        M[r] = n)
    }) : (V = t.ajax,
    t.ajax = function(e) {
        var i = ("mode"in e ? e : t.ajaxSettings).mode
          , n = ("port"in e ? e : t.ajaxSettings).port;
        return i === "abort" ? (M[n] && M[n].abort(),
        M[n] = V.apply(this, arguments),
        M[n]) : V.apply(this, arguments)
    }
    )
});
(function(t) {
    typeof define == "function" && define.amd ? define(["jquery"], t) : t(typeof jQuery < "u" ? jQuery : window.Zepto)
}
)(function(t) {
    function V(r) {
        var a = r.data;
        r.isDefaultPrevented() || (r.preventDefault(),
        t(r.target).ajaxSubmit(a))
    }
    function M(r) {
        var a = r.target
          , s = t(a);
        if (!s.is("[type=submit],[type=image]")) {
            var l = s.closest("[type=submit]");
            if (l.length === 0)
                return;
            a = l[0]
        }
        var u = this;
        if (u.clk = a,
        a.type == "image")
            if (r.offsetX !== void 0)
                u.clk_x = r.offsetX,
                u.clk_y = r.offsetY;
            else if (typeof t.fn.offset == "function") {
                var h = s.offset();
                u.clk_x = r.pageX - h.left,
                u.clk_y = r.pageY - h.top
            } else
                u.clk_x = r.pageX - a.offsetLeft,
                u.clk_y = r.pageY - a.offsetTop;
        setTimeout(function() {
            u.clk = u.clk_x = u.clk_y = null
        }, 100)
    }
    function e() {
        if (t.fn.ajaxSubmit.debug) {
            var r = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(r) : window.opera && window.opera.postError && window.opera.postError(r)
        }
    }
    var i = {};
    i.fileapi = t("<input type='file'/>").get(0).files !== void 0,
    i.formdata = window.FormData !== void 0;
    var n = !!t.fn.prop;
    t.fn.attr2 = function() {
        if (!n)
            return this.attr.apply(this, arguments);
        var r = this.prop.apply(this, arguments);
        return r && r.jquery || typeof r == "string" ? r : this.attr.apply(this, arguments)
    }
    ,
    t.fn.ajaxSubmit = function(r) {
        function a(L) {
            var b, v, w = t.param(L, r.traditional).split("&"), A = w.length, q = [];
            for (b = 0; A > b; b++)
                w[b] = w[b].replace(/\+/g, " "),
                v = w[b].split("="),
                q.push([decodeURIComponent(v[0]), decodeURIComponent(v[1])]);
            return q
        }
        function s(L) {
            for (var b = new FormData, v = 0; v < L.length; v++)
                b.append(L[v].name, L[v].value);
            if (r.extraData) {
                var w = a(r.extraData);
                for (v = 0; v < w.length; v++)
                    w[v] && b.append(w[v][0], w[v][1])
            }
            r.data = null;
            var A = t.extend(!0, {}, t.ajaxSettings, r, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: u || "POST"
            });
            r.uploadProgress && (A.xhr = function() {
                var o = t.ajaxSettings.xhr();
                return o.upload && o.upload.addEventListener("progress", function(S) {
                    var B = 0
                      , D = S.loaded || S.position
                      , F = S.total;
                    S.lengthComputable && (B = Math.ceil(D / F * 100)),
                    r.uploadProgress(S, D, F, B)
                }, !1),
                o
            }
            ),
            A.data = null;
            var q = A.beforeSend;
            return A.beforeSend = function(o, S) {
                r.formData ? S.data = r.formData : S.data = b,
                q && q.call(this, o, S)
            }
            ,
            t.ajax(A)
        }
        function l(L) {
            function b(p) {
                var c = null;
                try {
                    p.contentWindow && (c = p.contentWindow.document)
                } catch (y) {
                    e("cannot get iframe.contentWindow document: " + y)
                }
                if (c)
                    return c;
                try {
                    c = p.contentDocument ? p.contentDocument : p.document
                } catch (y) {
                    e("cannot get iframe.contentDocument: " + y),
                    c = p.document
                }
                return c
            }
            function v() {
                function p() {
                    try {
                        var I = b(F).readyState;
                        e("state = " + I),
                        I && I.toLowerCase() == "uninitialized" && setTimeout(p, 50)
                    } catch (W) {
                        e("Server abort: ", W, " (", W.name, ")"),
                        w(re),
                        Y && clearTimeout(Y),
                        Y = void 0
                    }
                }
                var c = m.attr2("target")
                  , y = m.attr2("action")
                  , H = "multipart/form-data"
                  , P = m.attr("enctype") || m.attr("encoding") || H;
                R.setAttribute("target", B),
                (!u || /post/i.test(u)) && R.setAttribute("method", "POST"),
                y != o.url && R.setAttribute("action", o.url),
                o.skipEncodingOverride || u && !/post/i.test(u) || m.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }),
                o.timeout && (Y = setTimeout(function() {
                    te = !0,
                    w(ae)
                }, o.timeout));
                var C = [];
                try {
                    if (o.extraData)
                        for (var N in o.extraData)
                            o.extraData.hasOwnProperty(N) && (t.isPlainObject(o.extraData[N]) && o.extraData[N].hasOwnProperty("name") && o.extraData[N].hasOwnProperty("value") ? C.push(t('<input type="hidden" name="' + o.extraData[N].name + '">').val(o.extraData[N].value).appendTo(R)[0]) : C.push(t('<input type="hidden" name="' + N + '">').val(o.extraData[N]).appendTo(R)[0]));
                    o.iframeTarget || D.appendTo("body"),
                    F.attachEvent ? F.attachEvent("onload", w) : F.addEventListener("load", w, !1),
                    setTimeout(p, 15);
                    try {
                        R.submit()
                    } catch {
                        var U = document.createElement("form").submit;
                        U.apply(R)
                    }
                } finally {
                    R.setAttribute("action", y),
                    R.setAttribute("enctype", P),
                    c ? R.setAttribute("target", c) : m.removeAttr("target"),
                    t(C).remove()
                }
            }
            function w(p) {
                if (!d.aborted && !de) {
                    if (j = b(F),
                    j || (e("cannot access response document"),
                    p = re),
                    p === ae && d)
                        return d.abort("timeout"),
                        void O.reject(d, "timeout");
                    if (p == re && d)
                        return d.abort("server abort"),
                        void O.reject(d, "error", "server abort");
                    if (j && j.location.href != o.iframeSrc || te) {
                        F.detachEvent ? F.detachEvent("onload", w) : F.removeEventListener("load", w, !1);
                        var c, y = "success";
                        try {
                            if (te)
                                throw "timeout";
                            var H = o.dataType == "xml" || j.XMLDocument || t.isXMLDoc(j);
                            if (e("isXml=" + H),
                            !H && window.opera && (j.body === null || !j.body.innerHTML) && --fe)
                                return e("requeing onLoad callback, DOM not available"),
                                void setTimeout(w, 250);
                            var P = j.body ? j.body : j.documentElement;
                            d.responseText = P ? P.innerHTML : null,
                            d.responseXML = j.XMLDocument ? j.XMLDocument : j,
                            H && (o.dataType = "xml"),
                            d.getResponseHeader = function(Z) {
                                var ye = {
                                    "content-type": o.dataType
                                };
                                return ye[Z.toLowerCase()]
                            }
                            ,
                            P && (d.status = Number(P.getAttribute("status")) || d.status,
                            d.statusText = P.getAttribute("statusText") || d.statusText);
                            var C = (o.dataType || "").toLowerCase()
                              , N = /(json|script|text)/.test(C);
                            if (N || o.textarea) {
                                var U = j.getElementsByTagName("textarea")[0];
                                if (U)
                                    d.responseText = U.value,
                                    d.status = Number(U.getAttribute("status")) || d.status,
                                    d.statusText = U.getAttribute("statusText") || d.statusText;
                                else if (N) {
                                    var I = j.getElementsByTagName("pre")[0]
                                      , W = j.getElementsByTagName("body")[0];
                                    I ? d.responseText = I.textContent ? I.textContent : I.innerText : W && (d.responseText = W.textContent ? W.textContent : W.innerText)
                                }
                            } else
                                C == "xml" && !d.responseXML && d.responseText && (d.responseXML = ge(d.responseText));
                            try {
                                ue = ve(d, C, o)
                            } catch (Z) {
                                y = "parsererror",
                                d.error = c = Z || y
                            }
                        } catch (Z) {
                            e("error caught: ", Z),
                            y = "error",
                            d.error = c = Z || y
                        }
                        d.aborted && (e("upload aborted"),
                        y = null),
                        d.status && (y = d.status >= 200 && d.status < 300 || d.status === 304 ? "success" : "error"),
                        y === "success" ? (o.success && o.success.call(o.context, ue, "success", d),
                        O.resolve(d.responseText, "success", d),
                        S && t.event.trigger("ajaxSuccess", [d, o])) : y && (c === void 0 && (c = d.statusText),
                        o.error && o.error.call(o.context, d, y, c),
                        O.reject(d, "error", c),
                        S && t.event.trigger("ajaxError", [d, o, c])),
                        S && t.event.trigger("ajaxComplete", [d, o]),
                        S && !--t.active && t.event.trigger("ajaxStop"),
                        o.complete && o.complete.call(o.context, d, y),
                        de = !0,
                        o.timeout && clearTimeout(Y),
                        setTimeout(function() {
                            o.iframeTarget ? D.attr("src", o.iframeSrc) : D.remove(),
                            d.responseXML = null
                        }, 100)
                    }
                }
            }
            var A, q, o, S, B, D, F, d, $, _, te, Y, R = m[0], O = t.Deferred();
            if (O.abort = function(p) {
                d.abort(p)
            }
            ,
            L)
                for (q = 0; q < f.length; q++)
                    A = t(f[q]),
                    n ? A.prop("disabled", !1) : A.removeAttr("disabled");
            if (o = t.extend(!0, {}, t.ajaxSettings, r),
            o.context = o.context || o,
            B = "jqFormIO" + new Date().getTime(),
            o.iframeTarget ? (D = t(o.iframeTarget),
            _ = D.attr2("name"),
            _ ? B = _ : D.attr2("name", B)) : (D = t('<iframe name="' + B + '" src="' + o.iframeSrc + '" />'),
            D.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            })),
            F = D[0],
            d = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(p) {
                    var c = p === "timeout" ? "timeout" : "aborted";
                    e("aborting upload... " + c),
                    this.aborted = 1;
                    try {
                        F.contentWindow.document.execCommand && F.contentWindow.document.execCommand("Stop")
                    } catch {}
                    D.attr("src", o.iframeSrc),
                    d.error = c,
                    o.error && o.error.call(o.context, d, c, p),
                    S && t.event.trigger("ajaxError", [d, o, c]),
                    o.complete && o.complete.call(o.context, d, c)
                }
            },
            S = o.global,
            S && t.active++ === 0 && t.event.trigger("ajaxStart"),
            S && t.event.trigger("ajaxSend", [d, o]),
            o.beforeSend && o.beforeSend.call(o.context, d, o) === !1)
                return o.global && t.active--,
                O.reject(),
                O;
            if (d.aborted)
                return O.reject(),
                O;
            $ = R.clk,
            $ && (_ = $.name,
            _ && !$.disabled && (o.extraData = o.extraData || {},
            o.extraData[_] = $.value,
            $.type == "image" && (o.extraData[_ + ".x"] = R.clk_x,
            o.extraData[_ + ".y"] = R.clk_y)));
            var ae = 1
              , re = 2
              , oe = t("meta[name=csrf-token]").attr("content")
              , le = t("meta[name=csrf-param]").attr("content");
            le && oe && (o.extraData = o.extraData || {},
            o.extraData[le] = oe),
            o.forceSync ? v() : setTimeout(v, 10);
            var ue, j, de, fe = 50, ge = t.parseXML || function(p, c) {
                return window.ActiveXObject ? (c = new ActiveXObject("Microsoft.XMLDOM"),
                c.async = "false",
                c.loadXML(p)) : c = new DOMParser().parseFromString(p, "text/xml"),
                c && c.documentElement && c.documentElement.nodeName != "parsererror" ? c : null
            }
            , pe = t.parseJSON || function(p) {
                return window.eval("(" + p + ")")
            }
            , ve = function(p, c, y) {
                var H = p.getResponseHeader("content-type") || ""
                  , P = c === "xml" || !c && H.indexOf("xml") >= 0
                  , C = P ? p.responseXML : p.responseText;
                return P && C.documentElement.nodeName === "parsererror" && t.error && t.error("parsererror"),
                y && y.dataFilter && (C = y.dataFilter(C, c)),
                typeof C == "string" && (c === "json" || !c && H.indexOf("json") >= 0 ? C = pe(C) : (c === "script" || !c && H.indexOf("javascript") >= 0) && t.globalEval(C)),
                C
            };
            return O
        }
        if (!this.length)
            return e("ajaxSubmit: skipping submit process - no element selected"),
            this;
        var u, h, g, m = this;
        typeof r == "function" ? r = {
            success: r
        } : r === void 0 && (r = {}),
        u = r.type || this.attr2("method"),
        h = r.url || this.attr2("action"),
        g = typeof h == "string" ? t.trim(h) : "",
        g = g || window.location.href || "",
        g && (g = (g.match(/^([^#]+)/) || [])[1]),
        r = t.extend(!0, {
            url: g,
            success: t.ajaxSettings.success,
            type: u || t.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, r);
        var k = {};
        if (this.trigger("form-pre-serialize", [this, r, k]),
        k.veto)
            return e("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),
            this;
        if (r.beforeSerialize && r.beforeSerialize(this, r) === !1)
            return e("ajaxSubmit: submit aborted via beforeSerialize callback"),
            this;
        var x = r.traditional;
        x === void 0 && (x = t.ajaxSettings.traditional);
        var T, f = [], E = this.formToArray(r.semantic, f);
        if (r.data && (r.extraData = r.data,
        T = t.param(r.data, x)),
        r.beforeSubmit && r.beforeSubmit(E, this, r) === !1)
            return e("ajaxSubmit: submit aborted via beforeSubmit callback"),
            this;
        if (this.trigger("form-submit-validate", [E, this, r, k]),
        k.veto)
            return e("ajaxSubmit: submit vetoed via form-submit-validate trigger"),
            this;
        var X = t.param(E, x);
        T && (X = X ? X + "&" + T : T),
        r.type.toUpperCase() == "GET" ? (r.url += (r.url.indexOf("?") >= 0 ? "&" : "?") + X,
        r.data = null) : r.data = X;
        var z = [];
        if (r.resetForm && z.push(function() {
            m.resetForm()
        }),
        r.clearForm && z.push(function() {
            m.clearForm(r.includeHidden)
        }),
        !r.dataType && r.target) {
            var K = r.success || function() {}
            ;
            z.push(function(L) {
                var b = r.replaceTarget ? "replaceWith" : "html";
                t(r.target)[b](L).each(K, arguments)
            })
        } else
            r.success && z.push(r.success);
        if (r.success = function(L, b, v) {
            for (var w = r.context || this, A = 0, q = z.length; q > A; A++)
                z[A].apply(w, [L, b, v || m, m])
        }
        ,
        r.error) {
            var Q = r.error;
            r.error = function(L, b, v) {
                var w = r.context || this;
                Q.apply(w, [L, b, v, m])
            }
        }
        if (r.complete) {
            var he = r.complete;
            r.complete = function(L, b) {
                var v = r.context || this;
                he.apply(v, [L, b, m])
            }
        }
        var ce = t("input[type=file]:enabled", this).filter(function() {
            return t(this).val() !== ""
        })
          , ie = ce.length > 0
          , ne = "multipart/form-data"
          , se = m.attr("enctype") == ne || m.attr("encoding") == ne
          , J = i.fileapi && i.formdata;
        e("fileAPI :" + J);
        var G, me = (ie || se) && !J;
        r.iframe !== !1 && (r.iframe || me) ? r.closeKeepAlive ? t.get(r.closeKeepAlive, function() {
            G = l(E)
        }) : G = l(E) : G = (ie || se) && J ? s(E) : t.ajax(r),
        m.removeData("jqxhr").data("jqxhr", G);
        for (var ee = 0; ee < f.length; ee++)
            f[ee] = null;
        return this.trigger("form-submit-notify", [this, r]),
        this
    }
    ,
    t.fn.ajaxForm = function(r) {
        if (r = r || {},
        r.delegation = r.delegation && t.isFunction(t.fn.on),
        !r.delegation && this.length === 0) {
            var a = {
                s: this.selector,
                c: this.context
            };
            return !t.isReady && a.s ? (e("DOM not ready, queuing ajaxForm"),
            t(function() {
                t(a.s, a.c).ajaxForm(r)
            }),
            this) : (e("terminating; zero elements found by selector" + (t.isReady ? "" : " (DOM not ready)")),
            this)
        }
        return r.delegation ? (t(document).off("submit.form-plugin", this.selector, V).off("click.form-plugin", this.selector, M).on("submit.form-plugin", this.selector, r, V).on("click.form-plugin", this.selector, r, M),
        this) : this.ajaxFormUnbind().bind("submit.form-plugin", r, V).bind("click.form-plugin", r, M)
    }
    ,
    t.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    }
    ,
    t.fn.formToArray = function(r, a) {
        var s = [];
        if (this.length === 0)
            return s;
        var l, u = this[0], h = this.attr("id"), g = r ? u.getElementsByTagName("*") : u.elements;
        if (g && !/MSIE [678]/.test(navigator.userAgent) && (g = t(g).get()),
        h && (l = t(':input[form="' + h + '"]').get(),
        l.length && (g = (g || []).concat(l))),
        !g || !g.length)
            return s;
        var m, k, x, T, f, E, X;
        for (m = 0,
        E = g.length; E > m; m++)
            if (f = g[m],
            x = f.name,
            x && !f.disabled)
                if (r && u.clk && f.type == "image")
                    u.clk == f && (s.push({
                        name: x,
                        value: t(f).val(),
                        type: f.type
                    }),
                    s.push({
                        name: x + ".x",
                        value: u.clk_x
                    }, {
                        name: x + ".y",
                        value: u.clk_y
                    }));
                else if (T = t.fieldValue(f, !0),
                T && T.constructor == Array)
                    for (a && a.push(f),
                    k = 0,
                    X = T.length; X > k; k++)
                        s.push({
                            name: x,
                            value: T[k]
                        });
                else if (i.fileapi && f.type == "file") {
                    a && a.push(f);
                    var z = f.files;
                    if (z.length)
                        for (k = 0; k < z.length; k++)
                            s.push({
                                name: x,
                                value: z[k],
                                type: f.type
                            });
                    else
                        s.push({
                            name: x,
                            value: "",
                            type: f.type
                        })
                } else
                    T !== null && typeof T < "u" && (a && a.push(f),
                    s.push({
                        name: x,
                        value: T,
                        type: f.type,
                        required: f.required
                    }));
        if (!r && u.clk) {
            var K = t(u.clk)
              , Q = K[0];
            x = Q.name,
            x && !Q.disabled && Q.type == "image" && (s.push({
                name: x,
                value: K.val()
            }),
            s.push({
                name: x + ".x",
                value: u.clk_x
            }, {
                name: x + ".y",
                value: u.clk_y
            }))
        }
        return s
    }
    ,
    t.fn.formSerialize = function(r) {
        return t.param(this.formToArray(r))
    }
    ,
    t.fn.fieldSerialize = function(r) {
        var a = [];
        return this.each(function() {
            var s = this.name;
            if (s) {
                var l = t.fieldValue(this, r);
                if (l && l.constructor == Array)
                    for (var u = 0, h = l.length; h > u; u++)
                        a.push({
                            name: s,
                            value: l[u]
                        });
                else
                    l !== null && typeof l < "u" && a.push({
                        name: this.name,
                        value: l
                    })
            }
        }),
        t.param(a)
    }
    ,
    t.fn.fieldValue = function(r) {
        for (var a = [], s = 0, l = this.length; l > s; s++) {
            var u = this[s]
              , h = t.fieldValue(u, r);
            h === null || typeof h > "u" || h.constructor == Array && !h.length || (h.constructor == Array ? t.merge(a, h) : a.push(h))
        }
        return a
    }
    ,
    t.fieldValue = function(r, a) {
        var s = r.name
          , l = r.type
          , u = r.tagName.toLowerCase();
        if (a === void 0 && (a = !0),
        a && (!s || r.disabled || l == "reset" || l == "button" || (l == "checkbox" || l == "radio") && !r.checked || (l == "submit" || l == "image") && r.form && r.form.clk != r || u == "select" && r.selectedIndex == -1))
            return null;
        if (u == "select") {
            var h = r.selectedIndex;
            if (0 > h)
                return null;
            for (var g = [], m = r.options, k = l == "select-one", x = k ? h + 1 : m.length, T = k ? h : 0; x > T; T++) {
                var f = m[T];
                if (f.selected) {
                    var E = f.value;
                    if (E || (E = f.attributes && f.attributes.value && !f.attributes.value.specified ? f.text : f.value),
                    k)
                        return E;
                    g.push(E)
                }
            }
            return g
        }
        return t(r).val()
    }
    ,
    t.fn.clearForm = function(r) {
        return this.each(function() {
            t("input,select,textarea", this).clearFields(r)
        })
    }
    ,
    t.fn.clearFields = t.fn.clearInputs = function(r) {
        var a = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var s = this.type
              , l = this.tagName.toLowerCase();
            a.test(s) || l == "textarea" ? this.value = "" : s == "checkbox" || s == "radio" ? this.checked = !1 : l == "select" ? this.selectedIndex = -1 : s == "file" ? /MSIE/.test(navigator.userAgent) ? t(this).replaceWith(t(this).clone(!0)) : t(this).val("") : r && (r === !0 && /hidden/.test(s) || typeof r == "string" && t(this).is(r)) && (this.value = "")
        })
    }
    ,
    t.fn.resetForm = function() {
        return this.each(function() {
            (typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) && this.reset()
        })
    }
    ,
    t.fn.enable = function(r) {
        return r === void 0 && (r = !0),
        this.each(function() {
            this.disabled = !r
        })
    }
    ,
    t.fn.selected = function(r) {
        return r === void 0 && (r = !0),
        this.each(function() {
            var a = this.type;
            if (a == "checkbox" || a == "radio")
                this.checked = r;
            else if (this.tagName.toLowerCase() == "option") {
                var s = t(this).parent("select");
                r && s[0] && s[0].type == "select-one" && s.find("option").selected(!1),
                this.selected = r
            }
        })
    }
    ,
    t.fn.ajaxSubmit.debug = !1
});
