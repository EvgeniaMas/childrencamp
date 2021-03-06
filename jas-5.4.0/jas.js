/* This file is part of JAS; Version 5.4.0; Copyright (c) 2013 - 2015 LetMeCode.ru; See more in "info.txt"; */
"undefined" == typeof jas && ! function(base, doc) {
    function jas_calc_path() {
        var e = doc.getElementsByTagName("script"),
            t = e[e.length - 1].src,
            s = t.substr(0, t.lastIndexOf("/") + 1);
        jas_path = s
    }

    function jas_new_object(e, t) {
        if (jas.isdef(e.jas_object)) return !1;
        var s = new jas.classes[t](e, t);
        return s.init(), s
    }

    function jas_autoload() {
        for (var e = 0; e < jas_autoload_classes.length; e++) jas.find("." + jas_autoload_classes[e]).each(function() {
            jas_new_object(this, jas_autoload_classes[e])
        })
    }

    function animation_timer_run() {
        0 == animation_timer_count && (animation_timer = setInterval(function() {
            jas.hook("animation")
        }, jas.animation_step)), animation_timer_count++
    }

    function animation_timer_stop() {
        animation_timer_count--, 0 == animation_timer_count && clearInterval(animation_timer)
    }
    var jas = function(e, t) {
            if ("string" == typeof e) {
                if (e = jas.find(e), !e.length) return null;
                e = e[0]
            }
            var s = e.jas_object;
            return jas.isdef(s) ? s : jas.isdef(t) ? jas_new_object(e, t) : null
        },
        version = "5.4.0",
        jas_autoload_classes = [],
        jas_hooks = {},
        get_params = null,
        cookies = null,
        jasset = function(e) {
            if ("undefined" != typeof e)
                if (e.tagName) this.push(e);
                else
                    for (var t = 0; t < e.length; t++) this.push(e[t])
        };
    jas.set_proto = new Array, jasset.prototype = jas.set_proto, jas.set_proto.parent = function(e) {
        if (!this.length) return new jasset;
        var t = this[0];
        if ("undefined" == typeof e) return t.parentNode ? new jasset([t.parentNode]) : new jasset;
        for (var s, a = doc.querySelectorAll(e), n = null;;) {
            if (t = t.parentNode, null == t) break;
            for (s = 0; s < a.length; s++)
                if (a[s] == t) {
                    n = t;
                    break
                }
            if (null != n) break
        }
        return null == n ? new jasset : new jasset([n])
    }, jas.set_proto.attr_get = function(e, t) {
        if (!this.length) return null;
        var s = this[0].getAttribute(e);
        return null != s ? s : jas.isdef(t) ? t : ""
    }, jas.set_proto.attr_set = function(e, t) {
        if (!this.length) return this;
        for (var s = 0; s < this.length; s++) this[s].setAttribute(e, t);
        return this
    }, jas.set_proto.class_exists = function(e) {
        if (!this.length) return !1;
        for (var t = !1, s = 0; s < this.length && !(t = this[s].className && new RegExp("(^|\\s)" + e + "(\\s|$)").test(this[s].className)); s++);
        return t
    }, jas.set_proto.class_remove = function(e) {
        if (!this.length) return this;
        for (var t, s, a, n = 0; n < this.length; n++) {
            for (t = "", s = this[n].className.split(" "), a = 0; a < s.length; a++) s[a] !== e && ("" != t && (t += " "), t += s[a]);
            this[n].className = t
        }
        return this
    }, jas.set_proto.class_add = function(e) {
        if (!this.length) return this;
        for (var t, s, a, n = 0; n < this.length; n++) {
            for (t = this[n].className.split(" "), a = !1, s = 0; s < t.length; s++)
                if (t[s] === e) {
                    a = !0;
                    break
                }
            a || (this[n].className += ("" === this[n].className ? "" : " ") + e)
        }
        return this
    }, jas.set_proto.find = function(e, t) {
        var s = new jasset;
        if (!this.length) return s;
        jas.isdef(e) || (e = "*");
        for (var a, n, i = 0; i < this.length; i++) {
            a = this[i].querySelectorAll(e);
            for (var n = 0; n < a.length; n++)
                if (s.push(a[n]), t) return s
        }
        return s
    }, jas.set_proto.first = function() {
        return this.length ? new jasset([this[0]]) : new jasset
    }, jas.set_proto.last = function() {
        return this.length ? new jasset([this[this.length - 1]]) : new jasset
    }, jas.set_proto.event_add = function(e, t) {
        for (var s = 0; s < this.length; s++) this[s].addEventListener(e, t);
        return this
    }, jas.set_proto.each = function(e) {
        for (var t = 0; t < this.length; t++) e.apply(this[t], [t]);
        return this
    }, jas.set_proto.insert_before = function(e) {
        return this.length && this[0].parentNode.insertBefore(e, this[0]), this
    }, jas.set_proto.insert_after = function(e) {
        if (this.length) {
            var t = this[0].nextSibling;
            t ? this[0].parentNode.insertBefore(e, t) : this[0].parentNode.appendChild(e)
        }
        return this
    }, jas.set_proto.html = function(e) {
        for (var t = 0; t < this.length; t++) this[t].innerHTML = e;
        return this
    }, jas.set_proto.remove = function() {
        for (var e = 0; e < this.length; e++) this[e].parentElement.removeChild(this[e]);
        return this.length = 0, this
    }, base.jas = jas, jas.version = version, "undefined" == typeof jas_path && jas_calc_path(), base.jas_timestamp_user = (new Date).getTime(), jas.classes = {}, jas.objects = [], jas.current_object = null, jas.animation_step = 10, jas.set = function(e) {
        return new jasset(e)
    }, jas.cbrt = function(e) {
        var t = Math.pow(Math.abs(e), 1 / 3);
        return 0 > e ? -t : t
    }, jas.hook_set = function(e, t) {
        if ("animation" == e) {
            if (!t()) return;
            animation_timer_run()
        }
        jas.isdef(jas_hooks[e]) || (jas_hooks[e] = []), jas_hooks[e].push(t)
    }, jas.hook = function(e, t) {
        if (jas.isdef(jas_hooks[e]))
            for (var s = 0, a = jas_hooks[e].length; a > s;) {
                var n = jas_hooks[e][s].apply(this, t);
                n ? s++ : ("animation" == e && animation_timer_stop(), jas_hooks[e].splice(s, 1), a--)
            }
    }, jas.new_element = function(e, t, s) {
        var a = doc.createElement(e);
        for (k in t) t.hasOwnProperty(k) && a.setAttribute(k, t[k]);
        return jas.isdef(s) && s.appendChild(a), a
    }, jas.extend = function(e, t, s) {
        jas.isdef(s) || (s = "jas_object");
        var a = this.classes[s];
        this.classes[t] = e, e.jas_class = t;
        var n = function() {};
        n.prototype = a.prototype, e.prototype = new n, e.prototype.constructor = e, e.superclass = a.prototype, e.parent_class = s
    }, jas.inherit = function(e, t, s) {
        jas.classes[t].superclass.constructor.apply(e, s)
    }, jas.autoload_class = function(e) {
        jas_autoload_classes.push(e)
    }, jas.find = function(e, t) {
        if (t) {
            var s = doc.querySelector(e);
            return new jasset(null != s ? [s] : [])
        }
        return new jasset(doc.querySelectorAll(e))
    }, jas.ajax = function(e) {
        e.request = new XMLHttpRequest, e.orsc = function() {
            switch (this.request.readyState) {
                case 4:
                    this.result(this.request.responseText, this.request.status)
            }
        }, e.request.onreadystatechange = function() {
            e.orsc()
        }, e.request.open(e.method, e.url, !0);
        var t, s = jas.isdef(e.formdata) ? e.formdata : !1;
        if (s) t = e.data;
        else {
            t = new FormData;
            for (var a in e.data) e.data.hasOwnProperty(a) && t.append(a, e.data[a])
        }
        e.request.send(t)
    }, jas.isdef = function(e) {
        return !("undefined" == typeof e)
    }, jas.cubic_bezier_parse = function(e) {
        switch (e) {
            case "ease":
                return [.25, .1, .25, 1];
            case "linear":
                return [0, 0, 1, 1];
            case "ease-in":
                return [.42, 0, 1, 1];
            case "ease-out":
                return [0, 0, .58, 1];
            case "ease-in-out":
                return [.42, 0, .58, 1];
            default:
                if (0 == e.indexOf("cubic-bezier(")) {
                    var t = e.substr(13);
                    t = t.substr(0, t.indexOf(")")), t = t.split(",");
                    for (var s = 0; 4 > s; s++) t[s] = parseFloat(t[s]);
                    return t
                }
        }
        return !1
    }, jas.cubic_bezier_math = function(e, t) {
        if (0 == t || 1 == t) return t;
        var s, a = 3 * e[0] + 1 - 3 * e[2],
            n = -6 * e[0] + 3 * e[2],
            i = 3 * e[0],
            o = -t,
            r = (3 * a * i - Math.pow(n, 2)) / (3 * Math.pow(a, 2)),
            u = (2 * Math.pow(n, 3) - 9 * a * n * i + 27 * Math.pow(a, 2) * o) / (27 * Math.pow(a, 3)),
            l = Math.pow(r / 3, 3) + Math.pow(u / 2, 2);
        if (0 > l) {
            var h;
            h = 0 > u ? Math.atan(Math.sqrt(-l) / (-u / 2)) : u > 0 ? Math.atan(Math.sqrt(-l) / (-u / 2)) + Math.PI : Math.PI / 2;
            var c = 2 * Math.sqrt(-r / 3),
                d = n / (3 * a);
            s = c * Math.cos(h / 3) - d, (0 > s || s > 1) && (s = c * Math.cos(h / 3 + 2 * Math.PI / 3) - d), (0 > s || s > 1) && (s = c * Math.cos(h / 3 + 4 * Math.PI / 3) - d)
        } else l > 0 ? s = jas.cbrt(-u / 2 + Math.sqrt(l)) + jas.cbrt(-u / 2 - Math.sqrt(l)) - n / (3 * a) : (s = -jas.cbrt(-u / 2), (0 > s || s > 1) && (s = -2 * s));
        var c = 3 * s * Math.pow(1 - s, 2),
            d = 3 * Math.pow(s, 2) * (1 - s),
            f = Math.pow(s, 3),
            p = c * e[1] + d * e[3] + f;
        return p
    }, jas.page_scroll = function(e) {
        var t = jas.isdef(e.speed) ? e.speed : 500;
        go22_f = jas.cubic_bezier_parse(jas.isdef(e.timing_function) ? e.timing_function : "ease"), "undefined" != typeof go22_run && go22_run && clearInterval(go22_timer), go22_run = !0, go22_counter = go22_total = Math.floor(t / jas.animation_step) + 1, go22_sp = Math.floor(document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop), go22_fp = (jas.isdef(e.target) ? document.querySelector(e.target).getBoundingClientRect().top + go22_sp : jas.isdef(e.pos) ? e.pos : 0) + (jas.isdef(e.offset) ? e.offset : 0);
        var s = function() {
            var e = go22_sp + (go22_fp - go22_sp) * jas.cubic_bezier_math(go22_f, 1 - go22_counter / go22_total);
            go22_last = Math.floor(e), document.documentElement && (document.documentElement.scrollTop = go22_last), document.body.parentNode && (document.body.parentNode.scrollTop = go22_last), document.body && (document.body.scrollTop = go22_last), go22_counter--, 0 > go22_counter && (clearInterval(go22_timer), go22_run = !1)
        };
        s(), go22_timer = setInterval(s, jas.animation_step)
    }, jas.get = function(e, t) {
        if (null == get_params) {
            get_params = {};
            for (var s, a = base.location.search.substring(1), n = a.split("&"), i = 0; i < n.length; i++) s = n[i].split("="), get_params[s[0]] = unescape(s[1])
        }
        return "undefined" == typeof t && (t = null), "undefined" == typeof get_params[e] ? t : get_params[e]
    }, jas.cookies_update = function() {
        cookies = {};
        for (var e, t = doc.cookie.split(";"), s = 0; s < t.length; s++) {
            for (e = t[s];
                " " == e.charAt(0);) e = e.substring(1);
            e = e.split("="), cookies[e[0]] = e[1]
        }
    }, jas.cookie_get = function(e, t) {
        return e = escape(e), null == cookies && jas.cookies_update(), "undefined" == typeof t && (t = null), "undefined" == typeof cookies[e] ? t : unescape(cookies[e])
    }, jas.cookie_set = function(e, t, s, a, n, i) {
        e = escape(e), t = escape(t), null == cookies && jas.cookies_update(), cookies[e] = t;
        var o = e + "=" + t;
        "undefined" != typeof s && (o += "; expires=" + new Date(s).toGMTString()), "undefined" != typeof a && (o += "; path=" + a), "undefined" != typeof n && (o += "; domain=" + n), "undefined" != typeof i && (o += "; secure"), document.cookie = o
    }, jas.cookie_remove = function(e) {
        e = escape(e), null == cookies && jas.cookies_update(), delete cookies[e], document.cookie = e + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    }, jas.time = function(e) {
        "undefined" == typeof e && (e = !1);
        var t = (new Date).getTime();
        return e ? jas_timestamp_server + (t - jas_timestamp_user) : t
    }, jas.classes.jas_object = function(element, jas_class) {
        Object.defineProperty(this, "prop", {
            value: function() {
                switch (arguments.length) {
                    case 1:
                        Object.defineProperties(this, arguments[0]);
                        break;
                    case 2:
                        Object.defineProperty(this, arguments[0], arguments[1])
                }
                return this
            }
        });
        var params = {},
            hooks = {};
        this.prop({
            lock: {
                value: function() {
                    return Object.preventExtensions(this), this
                }
            },
            jas_class: {
                value: jas_class
            },
            element: {
                value: element
            },
            jas_id: {
                value: jas.objects.push(this) - 1
            },
            param: {
                value: function(e, t) {
                    switch (arguments.length) {
                        case 1:
                            return jas.isdef(params[e]) ? params[e] : "";
                        case 2:
                            return params[e] = t, this
                    }
                }
            },
            param_def: {
                value: function(e, t) {
                    return jas.isdef(params[e]) ? params[e] : t
                }
            },
            hook_set: {
                value: function(e, t) {
                    return jas.isdef(hooks[e]) || (hooks[e] = []), hooks[e].push(t), this
                }
            },
            hook: {
                value: function(e, t) {
                    if (jas.isdef(hooks[e]))
                        for (var s = 0; s < hooks[e].length; s++) hooks[e][s].apply(this, t);
                    return this
                }
            },
            reload_params: {
                value: function() {
                    for (var as = this.element.attributes, v, r = {}, p, k, i = 0; i < as.length; i++)
                        if ("data-jas_" == as[i].name.substring(0, 9))
                            if (v = as[i].name.substring(9), "params" == v) {
                                eval("p = " + as[i].value + ";");
                                for (k in p) p.hasOwnProperty(k) && (jas.isdef(r[k]) || (r[k] = p[k]))
                            } else r[v] = eval(as[i].value);
                    for (k in r) r.hasOwnProperty(k) && (params[k] = r[k]);
                    return this
                }
            },
            init: {
                value: function() {
                    return this.lock(), this
                },
                configurable: !0,
                writable: !0
            }
        }), Object.defineProperty(this.element, "jas_object", {
            value: this
        })
    }, jas.classes.jas_object.parent_class = null, jas.extend(function() {
        jas.inherit(this, "jas_control", arguments)
    }, "jas_control"), jas.extend(function() {
        jas.inherit(this, "jas_input", arguments), this.prop({
            name: {
                value: "",
                writable: !0,
                configurable: !0
            },
            value: {
                value: "",
                writable: !0,
                configurable: !0
            },
            required: {
                value: !1,
                writable: !0,
                configurable: !0
            },
            required_msg: {
                set: function(e) {
                    this.hint.text = e
                },
                get: function() {
                    return this.hint.text
                },
                configurable: !0
            },
            hint: {
                value: jas(jas.new_element("div", {
                    "class": "jas_hint"
                }, this.element), "jas_hint"),
                writable: !0,
                configurable: !0
            },
            is_input: {
                value: !0
            },
            init: {
                value: function() {
                    this.reload_params(), this.name = this.param("name"), this.value = this.param("value"), this.required = this.param_def("required", !1);
                    var e = jas.new_element("input", {
                        name: this.name,
                        type: "hidden",
                        value: this.value
                    }, this.element);
                    return this.required_msg = this.param("required_msg"), this.prop({
                        input: {
                            value: e
                        },
                        name: {
                            set: function(e) {
                                jas.set(this.input).attr_set("name", e)
                            },
                            get: function() {
                                return jas.set(this.input).attr_get("name")
                            },
                            configurable: !0
                        },
                        value: {
                            set: function(e) {
                                this.input.value = e
                            },
                            get: function() {
                                return this.input.value
                            },
                            configurable: !0
                        }
                    }), this.lock(), this
                },
                configurable: !0
            },
            test: {
                value: function(e) {
                    var t = !0;
                    return this.required !== !1 && (this.required === !0 ? t = "" != this.value : (rx = new RegExp(this.required), t = rx.test(this.value))), t || (jas.set(this.element).class_add("jas_error"), e && this.hint.show()), t
                },
                configurable: !0
            }
        })
    }, "jas_input", "jas_control"), jas.autoload_class("jas_input"), jas.extend(function() {
        jas.inherit(this, "jas_edit", arguments);
        var e = this,
            t = "";
        this.prop({
            type: {
                value: "text",
                writable: !0,
                configurable: !0
            },
            init: {
                value: function() {
                    this.reload_params(), this.name = this.param("name"), this.value = this.param("value"), this.required = this.param("required"), this.required_msg = this.param("required_msg"), this.type = this.param("type");
                    var s = ["text", "password", "email", "textarea"]; - 1 == s.indexOf(this.type) && (this.type = "text"), this.prop("type", {
                        value: this.type
                    });
                    var a;
                    switch (this.type) {
                        case "textarea":
                            a = jas.new_element("textarea", {
                                name: this.name,
                                "class": "jas_edit_input"
                            }, this.element), a.value = this.value;
                            break;
                        default:
                            var n = "password" == this.type ? "password" : "text";
                            a = jas.new_element("input", {
                                name: this.name,
                                type: n,
                                value: this.value,
                                "class": "jas_edit_input"
                            }, this.element)
                    }
                    switch (this.type) {
                        case "email":
                            var i = this.required;
                            this.prop("required", {
                                set: function(e) {
                                    e === !0 && (e = "^((?:(?:(?:[a-zA-Z0-9][\\.\\-\\+_]?)*)[a-zA-Z0-9])+)\\@((?:(?:(?:[a-zA-Z0-9][\\.\\-_]?){0,62})[a-zA-Z0-9])+)\\.([a-zA-Z0-9]{2,6})$"), t = e
                                },
                                get: function() {
                                    return t
                                },
                                configurable: !0
                            }), this.required = i
                    }
                    return this.prop({
                        input: {
                            value: a
                        },
                        placeholder: {
                            set: function(e) {
                                jas.set(this.input).attr_set("placeholder", e)
                            },
                            get: function() {
                                return jas.set(this.input).attr_get("placeholder")
                            },
                            configurable: !0
                        },
                        name: {
                            set: function(e) {
                                jas.set(this.input).attr_set("name", e)
                            },
                            get: function() {
                                return jas.set(this.input).attr_get("name")
                            },
                            configurable: !0
                        },
                        value: {
                            set: function(e) {
                                this.input.value = e
                            },
                            get: function() {
                                return this.input.value
                            },
                            configurable: !0
                        }
                    }), this.placeholder = this.param("placeholder"), this.input.addEventListener("focus", function() {
                        e.hook("focus"), jas.set(e.element).class_remove("jas_error").class_add("jas_active")
                    }), this.input.addEventListener("blur", function() {
                        e.hook("blur"), jas.set(e.element).class_remove("jas_active")
                    }), this.lock(), this
                },
                configurable: !0
            }
        })
    }, "jas_edit", "jas_input"), jas.autoload_class("jas_edit"), jas.extend(function() {
        jas.inherit(this, "jas_file", arguments);
        var e, t, s = this;
        this.prop({
            init: {
                value: function() {
                    this.reload_params(), this.required = this.param("required"), this.required_msg = this.param("required_msg"), this.name = this.param("name");
                    var a = jas.new_element("div", {
                            "class": "jas_file_input_wrap"
                        }, this.element),
                        n = jas.new_element("input", {
                            type: "file",
                            "class": "jas_file_input",
                            name: this.name
                        }, a);
                    n.addEventListener("click", function() {
                        jas.set(s.element).class_remove("jas_error")
                    }), n.addEventListener("change", function() {
                        for (var e = "", t = 0; t < this.files.length; t++) e += this.files[t].name + "; ";
                        s.text = e
                    });
                    var i = jas.new_element("div", {
                            "class": "jas_file_text",
                            style: "display: none;"
                        }, this.element),
                        o = jas.new_element("div", {
                            "class": "jas_file_placeholder"
                        }, this.element);
                    return this.prop({
                        input: {
                            value: n
                        },
                        text: {
                            set: function(t) {
                                e = t, i.innerHTML = t, "" != t ? (i.style.display = "block", o.style.display = "none") : (i.style.display = "none", o.style.display = "block")
                            },
                            get: function() {
                                return e
                            },
                            configurable: !0
                        },
                        placeholder: {
                            set: function(e) {
                                t = e, o.innerHTML = e
                            },
                            get: function() {
                                return t
                            },
                            configurable: !0
                        },
                        test: {
                            value: function(e) {
                                var t = !0;
                                return this.required !== !1 && (this.input.files.length || (t = !1)), t || (jas.set(this.element).class_add("jas_error"), e && this.hint.show()), t
                            },
                            configurable: !0
                        }
                    }), this.placeholder = this.param("placeholder"), this.text = this.param("text"), this.lock(), this
                }
            }
        })
    }, "jas_file", "jas_input"), jas.autoload_class("jas_file"), jas.extend(function() {
        jas.inherit(this, "jas_form", arguments);
        var e = !1,
            t = null,
            s = "",
            a = this;
        this.prop({
            init: {
                value: function() {
                    return this.reload_params(), jas.set(this.element).find(".jas_form_submit").each(function() {
                        this.jas_owner = a, jas.new_element("input", {
                            type: "submit",
                            "class": "jas_form_submit_input"
                        }, this)
                    }), this.source = this.param("source"), this.element.addEventListener("submit", function(t) {
                        if (e) return void t.preventDefault();
                        var s = jas(this);
                        s.hook("process_prepare");
                        for (var a, n = jas.set(this).find(), i = !1, o = 0; o < n.length; o++) a = n[o].jas_object, jas.isdef(a) && jas.isdef(a.is_input) && 1 == a.is_input && a.required !== !1 && (a.test(!i) || (i = !0));
                        if (i) s.hook("error"), t.preventDefault();
                        else {
                            s.hook("process_begin");
                            var r = jas.set(this).attr_get("method").toUpperCase();
                            switch (r) {
                                case "GET_AJAX":
                                case "POST_AJAX":
                                    t.preventDefault();
                                    var u = jas.set(this).attr_get("action");
                                    jas.ajax({
                                        url: u,
                                        method: "POST_AJAX" == r ? "POST" : "GET",
                                        form: this,
                                        data: new FormData(this),
                                        formdata: !0,
                                        result: function(e, t) {
                                            var s = this.form.jas_object;
                                            s.hook("process_end", [e, t])
                                        }
                                    })
                            }
                        }
                    }), this.lock(), this
                },
                configurable: !0
            },
            source: {
                get: function() {
                    return s
                },
                set: function(e) {
                    s = e, null == t && "" != s && (t = jas.new_element("input", {
                        type: "hidden",
                        name: "jas_source",
                        value: s
                    }, this.element)), null != t && (t.value = e)
                },
                configurable: !0
            },
            disable: {
                value: function() {
                    return e = !0, this
                },
                configurable: !0
            },
            enable: {
                value: function() {
                    return e = !1, this
                },
                configurable: !0
            },
            submit: {
                value: function() {
                    return this.element.submit(), this
                },
                configurable: !0
            }
        })
    }, "jas_form"), jas.autoload_class("jas_form"), jas.extend(function() {
        function e(e, t) {
            var s = jas.isdef(t.x) ? t.x : 0,
                a = jas.isdef(t.y) ? t.y : 0,
                n = jas.isdef(t.s) ? t.s : 1,
                i = jas.isdef(t.z) ? t.z : 0,
                o = jas.isdef(t.o) ? t.o : 1;
            e.element.style.left = s + "px", e.element.style.top = a + "px", e.element.style.webkitTransform = "scale(" + n + ")", e.element.style.MozTransform = "scale(" + n + ")", e.element.style.msTransform = "scale(" + n + ")", e.element.style.OTransform = "scale(" + n + ")", e.element.style.zIndex = Math.floor(i), e.element.style.opacity = o
        }

        function t(e, t) {
            var s = e >= a.length ? a.length - 1 : e,
                n = e - 1;
            (0 > n || n >= a.length) && (n = a.length - 1);
            var i = a[n],
                o = a[s];
            return 0 == t || s == n ? o : (jas.isdef(i.x) || (i.x = 0), jas.isdef(i.y) || (i.y = 0), jas.isdef(i.s) || (i.s = 1), jas.isdef(i.z) || (i.z = 0), jas.isdef(i.o) || (i.o = 1), jas.isdef(o.x) || (o.x = 0), jas.isdef(o.y) || (o.y = 0), jas.isdef(o.s) || (o.s = 1), jas.isdef(o.z) || (o.z = 0), jas.isdef(o.o) || (o.o = 1), {
                x: i.x + (o.x - i.x) * (1 - t),
                y: i.y + (o.y - i.y) * (1 - t),
                s: i.s + (o.s - i.s) * (1 - t),
                z: i.z + (o.z - i.z) * (1 - t),
                o: i.o + (o.o - i.o) * (1 - t)
            })
        }
        jas.inherit(this, "jas_slider", arguments);
        var s = this,
            a = [],
            n = [],
            i = "",
            o = 0,
            r = -1,
            u = 0,
            l = 0,
            h = 0,
            c = !1,
            d = function() {
                var e = u - h,
                    t = 1 - r / o,
                    a = jas.cubic_bezier_math(n, t);
                if (l = h + a * e, s.set(l), r--, 0 > r) {
                    for (var i = s.frames.length; u > i;) u -= i;
                    for (; 1 > u;) u += i;
                    return l = h = u, c = !1, !1
                }
                return !0
            };
        this.prop({
            init: {
                value: function() {
                    this.reload_params(), this.speed = this.param_def("speed", 500), this.timing_function = this.param_def("timing_function", "ease"), a = this.param("behavior");
                    var e, t, n, i = jas.set(this.element),
                        o = i.find(".jas_slider_frame").each(function() {
                            s.add_frame(this)
                        }),
                        e = o.length;
                    if (e)
                        for (; e < a.length;)
                            for (e += o.length, t = 0; t < o.length; t++) n = o[t].cloneNode(!0), jas.set(o[t]).insert_after(n), this.add_frame(n);
                    return this.set(0), u = h = l = pp = 0, i.find(".jas_slider_bullet").each(function() {
                        var e = jas.set(this),
                            t = e.attr_get("data-jas_set", "default"),
                            a = !1;
                        jas.isdef(s.bulletsets[t]) || (s.bulletsets[t] = [], a = !0), s.bulletsets[t].push({
                            element: this,
                            active: a
                        }), a && e.class_add("jas_active")
                    }).event_add("click", function() {
                        for (var e, t, a, n = jas.set(this).attr_get("data-jas_set", "default"), i = 0; i < s.bulletsets[n].length; i++) e = s.bulletsets[n][i], e.active && (t = i), e.element == this && (a = i);
                        s.index += a - t
                    }), i.find(".jas_slider_button_left").event_add("click", function() {
                        s.index--
                    }), i.find(".jas_slider_button_right").event_add("click", function() {
                        s.index++
                    }), this.lock(), this
                },
                configurable: !0
            },
            set: {
                value: function(s) {
                    l = s;
                    var a = Math.floor(s),
                        n = s - a,
                        i = this.frames.length;
                    if (i) {
                        for (; 1 > a;) a += i;
                        for (; a > i;) a -= i;
                        for (var s, o, r = 0; i > r; r++) s = r + a, s > i && (s -= i), o = r, e(this.frames[s - 1], t(o, n))
                    }
                },
                configurable: !0
            },
            bulletsets: {
                value: {},
                configurable: !0
            },
            speed: {
                set: function(e) {
                    speed = e, o = Math.floor(e / jas.animation_step) + 1
                },
                get: function() {
                    return speed
                },
                configurable: !0
            },
            timing_function: {
                get: function() {
                    return i
                },
                set: function(e) {
                    i = e, n = jas.cubic_bezier_parse(e)
                },
                configurable: !0
            },
            frames: {
                value: [],
                configurable: !0
            },
            add_frame: {
                value: function(e) {
                    return this.frames.push({
                        element: e
                    }), this
                },
                configurable: !0
            },
            index: {
                set: function(e) {
                    pp = u;
                    var t, s;
                    for (var a in this.bulletsets)
                        if (this.bulletsets.hasOwnProperty(a)) {
                            s = this.bulletsets[a].length;
                            for (var n = 0; s > n; n++)
                                if (bl = this.bulletsets[a][n], bl.active) {
                                    jas.set(bl.element).class_remove("jas_active"), bl.active = !1;
                                    break
                                }
                            for (t = n + Math.floor(e - pp); 0 > t;) t += s;
                            for (; t >= s;) t -= s;
                            jas.set(this.bulletsets[a][t].element).class_add("jas_active"), this.bulletsets[a][t].active = !0
                        }
                    h = l, u = e, r = o - 1, c || (c = !0, jas.hook_set("animation", d)), this.hook("change")
                },
                get: function() {
                    return u
                },
                configurable: !0
            }
        })
    }, "jas_slider", "jas_control"), jas.autoload_class("jas_slider"), jas.extend(function() {
        jas.inherit(this, "jas_popup", arguments);
        var e, t, s = this,
            a = !1,
            n = function() {
                return a && (e.style.width = document.documentElement.offsetWidth + "px", e.style.height = document.documentElement.offsetHeight + "px", document.documentElement && (document.documentElement.scrollTop = dst), document.body.parentNode && (document.body.parentNode.scrollTop = dst), document.body && (document.body.scrollTop = dst), t.style.height = window.innerWidth / document.documentElement.clientWidth * document.documentElement.clientHeight + "px"), !0
            };
        this.prop({
            init: {
                value: function() {
                    this.reload_params(), e = jas.new_element("div", {
                        "class": "jas_popup_overlay"
                    }, jas.find("body")[0]), t = jas.new_element("div", {
                        "class": "jas_popup_wrap"
                    }, e);
                    var a = jas.new_element("div", {
                            "class": "jas_popup_table"
                        }, t),
                        i = jas.new_element("div", {
                            "class": "jas_popup_cell"
                        }, a);
                    return i.appendChild(this.element), this.element.style.display = "inline-block", jas.set(this.element).find(".jas_popup_close").event_add("click", function() {
                        s.hide()
                    }), i.addEventListener("click", function(e) {
                        e.target == this && s.hide()
                    }), jas.hook_set("scroll", n), jas.hook_set("resize", n), jas.hook_set("touchmove", n), this.lock(), this
                },
                configurable: !0
            },
            show: {
                value: function() {
                    return e.style.display = "block", a = !0, dst = document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop, t.style.top = dst + "px", n(), this.hook("show"), this
                },
                configurable: !0
            },
            hide: {
                value: function() {
                    return e.style.display = "none", a = !1, this.hook("hide"), this
                },
                configurable: !0
            }
        })
    }, "jas_popup"), jas.autoload_class("jas_popup"), jas.extend(function() {
        jas.inherit(this, "jas_hint", arguments);
        var e, t, s = this;
        this.prop({
            init: {
                value: function() {
                    return this.reload_params(), t = jas.new_element("div", {
                        "class": "jas_hint_text"
                    }, this.element), jas.new_element("div", {
                        "class": "jas_hint_tail"
                    }, this.element), this.text = this.param_def("text", "jas_hint"), this.lock(), this
                },
                configurable: !0
            },
            text: {
                set: function(s) {
                    e = s, t.innerHTML = s
                },
                get: function() {
                    return e
                },
                configurable: !0
            },
            show: {
                value: function() {
                    return this.element.style.display = "block", jas.hook_set("mousedown", function() {
                        return s.hide(), !1
                    }), this.hook("show"), this
                },
                configurable: !0
            },
            hide: {
                value: function() {
                    return this.element.style.display = "none", this.hook("hide"), this
                },
                configurable: !0
            }
        })
    }, "jas_hint"), jas.autoload_class("jas_hint"), jas.extend(function() {
        jas.inherit(this, "jas_dropdown", arguments);
        var e, t, s, a = this,
            n = jas.set(),
            i = -1;
        this.prop({
            init: {
                value: function() {
                    return this.reload_params(), this.name = this.param("name"), this.input = jas.new_element("input", {
                        type: "hidden",
                        name: this.name
                    }, this.element), this.value = this.param("value"), this.required = this.param("required"), this.required_msg = this.param("required_msg"), this.options = this.param("options"), e = jas.new_element("div", {
                        "class": "jas_dropdown_dropper"
                    }, this.element), t = jas.new_element("div", {
                        "class": "jas_dropdown_content"
                    }, this.element), s = jas.new_element("div", {
                        "class": "jas_dropdown_placeholder"
                    }, this.element), s.innerHTML = this.param("placeholder"), jas.new_element("div", {
                        "class": "jas_dropdown_arrow"
                    }, this.element), jas.set(this.element).event_add("click", function(e) {
                        jas.set(a.element).class_remove("jas_error"), jas.set(e.target).class_exists("jas_dropdown_option") || a.expand()
                    }), this.recreate().lock(), this
                },
                writable: !0,
                configurable: !0
            },
            recreate: {
                value: function() {
                    n.remove();
                    for (var t, s = -1, i = 0; i < this.options.length; i++) t = jas.new_element("div", {
                        "class": "jas_dropdown_option"
                    }, e), t.innerHTML = this.options[i].content, this.options[i].selected && (s = i), n.push(t);
                    return this.index = s, n.event_add("click", function() {
                        a.index = n.indexOf(this), a.shrink()
                    }), this.hook("recreate"), this
                },
                writable: !0,
                configurable: !0
            },
            index: {
                set: function(e) {
                    (0 > e || e >= this.options.length) && (e = -1), -1 != e ? (this.content = this.options[e].content, this.value = this.options[e].value) : (this.content = "", this.value = "")
                },
                get: function() {
                    return i
                },
                configurable: !0
            },
            content: {
                set: function(e) {
                    t.innerHTML = e, "" == e ? (t.style.display = "none", s.style.display = "block") : (t.style.display = "block", s.style.display = "none")
                },
                get: function() {
                    return t.innerHTML
                },
                configurable: !0
            },
            placeholder: {
                set: function(e) {
                    s.innerHTML = e
                },
                get: function() {
                    return s.innerHTML
                },
                configurable: !0
            },
            options: {
                value: [],
                writable: !0,
                configurable: !0
            },
            input: {
                value: null,
                writable: !0,
                configurable: !0
            },
            expand: {
                value: function() {
                    jas.set(this.element).class_add("jas_expanded"), jas.hook_set("mousedown", function(e) {
                        return jas.set(e.target).class_exists("jas_dropdown_option") || a.shrink(), !1
                    }), this.hook("expand")
                },
                writable: !0,
                configurable: !0
            },
            shrink: {
                value: function() {
                    jas.set(this.element).class_remove("jas_expanded"), this.hook("shrink")
                },
                writable: !0,
                configurable: !0
            },
            value: {
                set: function(e) {
                    this.input.value = e, this.hook("change")
                },
                get: function() {
                    return this.input.value
                },
                configurable: !0
            }
        })
    }, "jas_dropdown", "jas_input"), jas.autoload_class("jas_dropdown"), jas.extend(function() {
        function e(e) {
            s(e - o + r)
        }

        function t() {
            var e = l.element.offsetWidth - u,
                t = l.max - l.min,
                s = e * ((i - l.min) / t) + u / 2;
            a.style.width = s + "px"
        }

        function s(e) {
            var s = u / 2,
                a = l.element.offsetWidth - s;
            s > e && (e = s), e > a && (e = a), e -= s, a -= s;
            var n = l.max - l.min,
                i = n * (e / a);
            i = Math.round(i / l.step) * l.step;
            var o = l.min + i;
            l.value = o, t()
        }
        jas.inherit(this, "jas_trackbar", arguments);
        var a, n, i, o, r, u, l = this,
            h = !1;
        this.prop({
            init: {
                value: function() {
                    return this.reload_params(), this.name = this.param("name"), this.input = jas.new_element("input", {
                        type: "hidden",
                        name: this.name
                    }, this.element), a = jas.new_element("div", {
                        "class": "jas_trackbar_line"
                    }, this.element), n = jas.new_element("div", {
                        "class": "jas_trackbar_button"
                    }, a), this.element.addEventListener("mousedown", function(t) {
                        (t.target == l.element || t.target == a) && s(t.offsetX), o = t.pageX, r = a.offsetWidth, h = !0, jas.set(l.element).class_add("jas_active"), jas.find("body").class_add("jas_trackbar_lock"), jas.hook_set("mouseup", function(t) {
                            return h = !1, jas.set(l.element).class_remove("jas_active"), e(t.pageX), jas.find("body").class_remove("jas_trackbar_lock"), !1
                        }), jas.hook_set("mousemove", function(t) {
                            return h ? (e(t.pageX), !0) : !1
                        })
                    }), this.min = this.param_def("min", 0), this.max = this.param_def("max", 100), u = this.param_def("button_width", "default"), "default" == u && (u = n.offsetWidth), this.button_width = u, this.step = this.param_def("step", 1), this.value = this.param("value"), this
                },
                writable: !0,
                configurable: !0
            },
            input: {
                value: null,
                writable: !0,
                configurable: !0
            },
            min: {
                value: 0,
                writable: !0,
                configurable: !0
            },
            max: {
                value: 0,
                writable: !0,
                configurable: !0
            },
            step: {
                value: 0,
                writable: !0,
                configurable: !0
            },
            button_width: {
                set: function(e) {
                    u = e, t()
                },
                get: function() {
                    return u
                },
                configurable: !0
            },
            value: {
                set: function(e) {
                    e < this.min && (e = this.min), e > this.max && (e = this.max), i = e, t(), this.input.value = e, this.hook("change", [e])
                },
                get: function() {
                    return i
                },
                configurable: !0
            }
        })
    }, "jas_trackbar", "jas_input"), jas.autoload_class("jas_trackbar");
    var animation_timer_count = 0,
        animation_timer;
    doc.addEventListener("mousedown", function(e) {
        jas.hook("mousedown", [e])
    }), doc.addEventListener("mouseup", function(e) {
        jas.hook("mouseup", [e])
    }), doc.addEventListener("mousemove", function(e) {
        jas.hook("mousemove", [e])
    }), base.addEventListener("resize", function(e) {
        jas.hook("resize", [e])
    }), base.addEventListener("scroll", function(e) {
        jas.hook("scroll", [e])
    }), doc.addEventListener("touchstart", function(e) {
        jas.hook("touchstart", [e])
    }), doc.addEventListener("touchmove", function(e) {
        jas.hook("touchmove", [e])
    }), doc.addEventListener("touchend", function(e) {
        jas.hook("touchend", [e])
    }), doc.addEventListener("DOMContentLoaded", function() {
        doc.removeEventListener("DOMContentLoaded", arguments.callee, !1), jas.hook("prepare"), jas_autoload(), jas.hook("ready")
    })
}(window, document);