(function() {
    var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,
        bind = function(fn, me) { return function() { return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    Util = (function() {
        function Util() {}

        Util.prototype.extend = function(custom, defaults) {
            var key, value;
            for (key in defaults) {
                value = defaults[key];
                if (custom[key] == null) {
                    custom[key] = value;
                }
            }
            return custom;
        };

        Util.prototype.isMobile = function(agent) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
        };

        Util.prototype.createEvent = function(event, bubble, cancel, detail) {
            var customEvent;
            if (bubble == null) {
                bubble = false;
            }
            if (cancel == null) {
                cancel = false;
            }
            if (detail == null) {
                detail = null;
            }
            if (document.createEvent != null) {
                customEvent = document.createEvent('CustomEvent');
                customEvent.initCustomEvent(event, bubble, cancel, detail);
            } else if (document.createEventObject != null) {
                customEvent = document.createEventObject();
                customEvent.eventType = event;
            } else {
                customEvent.eventName = event;
            }
            return customEvent;
        };

        Util.prototype.emitEvent = function(elem, event) {
            if (elem.dispatchEvent != null) {
                return elem.dispatchEvent(event);
            } else if (event in (elem != null)) {
                return elem[event]();
            } else if (("on" + event) in (elem != null)) {
                return elem["on" + event]();
            }
        };

        Util.prototype.addEvent = function(elem, event, fn) {
            if (elem.addEventListener != null) {
                return elem.addEventListener(event, fn, false);
            } else if (elem.attachEvent != null) {
                return elem.attachEvent("on" + event, fn);
            } else {
                return elem[event] = fn;
            }
        };

        Util.prototype.removeEvent = function(elem, event, fn) {
            if (elem.removeEventListener != null) {
                return elem.removeEventListener(event, fn, false);
            } else if (elem.detachEvent != null) {
                return elem.detachEvent("on" + event, fn);
            } else {
                return delete elem[event];
            }
        };

        Util.prototype.innerHeight = function() {
            if ('innerHeight' in window) {
                return window.innerHeight;
            } else {
                return document.documentElement.clientHeight;
            }
        };

        return Util;

    })();

    WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
        function WeakMap() {
            this.keys = [];
            this.values = [];
        }

        WeakMap.prototype.get = function(key) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    return this.values[i];
                }
            }
        };

        WeakMap.prototype.set = function(key, value) {
            var i, item, j, len, ref;
            ref = this.keys;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
                item = ref[i];
                if (item === key) {
                    this.values[i] = value;
                    return;
                }
            }
            this.keys.push(key);
            return this.values.push(value);
        };

        return WeakMap;

    })());

    MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
        function MutationObserver() {
            if (typeof console !== "undefined" && console !== null) {
                console.warn('MutationObserver is not supported by your browser.');
            }
            if (typeof console !== "undefined" && console !== null) {
                console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
            }
        }

        MutationObserver.notSupported = true;

        MutationObserver.prototype.observe = function() {};

        return MutationObserver;

    })());

    getComputedStyle = this.getComputedStyle || function(el, pseudo) {
        this.getPropertyValue = function(prop) {
            var ref;
            if (prop === 'float') {
                prop = 'styleFloat';
            }
            if (getComputedStyleRX.test(prop)) {
                prop.replace(getComputedStyleRX, function(_, _char) {
                    return _char.toUpperCase();
                });
            }
            return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
        };
        return this;
    };

    getComputedStyleRX = /(\-([a-z]){1})/g;

    this.WOW = (function() {
        WOW.prototype.defaults = {
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true,
            callback: null,
            scrollContainer: null
        };

        function WOW(options) {
            if (options == null) {
                options = {};
            }
            this.scrollCallback = bind(this.scrollCallback, this);
            this.scrollHandler = bind(this.scrollHandler, this);
            this.resetAnimation = bind(this.resetAnimation, this);
            this.start = bind(this.start, this);
            this.scrolled = true;
            this.config = this.util().extend(options, this.defaults);
            if (options.scrollContainer != null) {
                this.config.scrollContainer = document.querySelector(options.scrollContainer);
            }
            this.animationNameCache = new WeakMap();
            this.wowEvent = this.util().createEvent(this.config.boxClass);
        }

        WOW.prototype.init = function() {
            var ref;
            this.element = window.document.documentElement;
            if ((ref = document.readyState) === "interactive" || ref === "complete") {
                this.start();
            } else {
                this.util().addEvent(document, 'DOMContentLoaded', this.start);
            }
            return this.finished = [];
        };

        WOW.prototype.start = function() {
            var box, j, len, ref;
            this.stopped = false;
            this.boxes = (function() {
                var j, len, ref, results;
                ref = this.element.querySelectorAll("." + this.config.boxClass);
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }).call(this);
            this.all = (function() {
                var j, len, ref, results;
                ref = this.boxes;
                results = [];
                for (j = 0, len = ref.length; j < len; j++) {
                    box = ref[j];
                    results.push(box);
                }
                return results;
            }).call(this);
            if (this.boxes.length) {
                if (this.disabled()) {
                    this.resetStyle();
                } else {
                    ref = this.boxes;
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        this.applyStyle(box, true);
                    }
                }
            }
            if (!this.disabled()) {
                this.util().addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
                this.util().addEvent(window, 'resize', this.scrollHandler);
                this.interval = setInterval(this.scrollCallback, 50);
            }
            if (this.config.live) {
                return new MutationObserver((function(_this) {
                    return function(records) {
                        var k, len1, node, record, results;
                        results = [];
                        for (k = 0, len1 = records.length; k < len1; k++) {
                            record = records[k];
                            results.push((function() {
                                var l, len2, ref1, results1;
                                ref1 = record.addedNodes || [];
                                results1 = [];
                                for (l = 0, len2 = ref1.length; l < len2; l++) {
                                    node = ref1[l];
                                    results1.push(this.doSync(node));
                                }
                                return results1;
                            }).call(_this));
                        }
                        return results;
                    };
                })(this)).observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
        };

        WOW.prototype.stop = function() {
            this.stopped = true;
            this.util().removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
            this.util().removeEvent(window, 'resize', this.scrollHandler);
            if (this.interval != null) {
                return clearInterval(this.interval);
            }
        };

        WOW.prototype.sync = function(element) {
            if (MutationObserver.notSupported) {
                return this.doSync(this.element);
            }
        };

        WOW.prototype.doSync = function(element) {
            var box, j, len, ref, results;
            if (element == null) {
                element = this.element;
            }
            if (element.nodeType !== 1) {
                return;
            }
            element = element.parentNode || element;
            ref = element.querySelectorAll("." + this.config.boxClass);
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                if (indexOf.call(this.all, box) < 0) {
                    this.boxes.push(box);
                    this.all.push(box);
                    if (this.stopped || this.disabled()) {
                        this.resetStyle();
                    } else {
                        this.applyStyle(box, true);
                    }
                    results.push(this.scrolled = true);
                } else {
                    results.push(void 0);
                }
            }
            return results;
        };

        WOW.prototype.show = function(box) {
            this.applyStyle(box);
            box.className = box.className + " " + this.config.animateClass;
            if (this.config.callback != null) {
                this.config.callback(box);
            }
            this.util().emitEvent(box, this.wowEvent);
            this.util().addEvent(box, 'animationend', this.resetAnimation);
            this.util().addEvent(box, 'oanimationend', this.resetAnimation);
            this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
            this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
            return box;
        };

        WOW.prototype.applyStyle = function(box, hidden) {
            var delay, duration, iteration;
            duration = box.getAttribute('data-wow-duration');
            delay = box.getAttribute('data-wow-delay');
            iteration = box.getAttribute('data-wow-iteration');
            return this.animate((function(_this) {
                return function() {
                    return _this.customStyle(box, hidden, duration, delay, iteration);
                };
            })(this));
        };

        WOW.prototype.animate = (function() {
            if ('requestAnimationFrame' in window) {
                return function(callback) {
                    return window.requestAnimationFrame(callback);
                };
            } else {
                return function(callback) {
                    return callback();
                };
            }
        })();

        WOW.prototype.resetStyle = function() {
            var box, j, len, ref, results;
            ref = this.boxes;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                results.push(box.style.visibility = 'visible');
            }
            return results;
        };

        WOW.prototype.resetAnimation = function(event) {
            var target;
            if (event.type.toLowerCase().indexOf('animationend') >= 0) {
                target = event.target || event.srcElement;
                return target.className = target.className.replace(this.config.animateClass, '').trim();
            }
        };

        WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
            if (hidden) {
                this.cacheAnimationName(box);
            }
            box.style.visibility = hidden ? 'hidden' : 'visible';
            if (duration) {
                this.vendorSet(box.style, {
                    animationDuration: duration
                });
            }
            if (delay) {
                this.vendorSet(box.style, {
                    animationDelay: delay
                });
            }
            if (iteration) {
                this.vendorSet(box.style, {
                    animationIterationCount: iteration
                });
            }
            this.vendorSet(box.style, {
                animationName: hidden ? 'none' : this.cachedAnimationName(box)
            });
            return box;
        };

        WOW.prototype.vendors = ["moz", "webkit"];

        WOW.prototype.vendorSet = function(elem, properties) {
            var name, results, value, vendor;
            results = [];
            for (name in properties) {
                value = properties[name];
                elem["" + name] = value;
                results.push((function() {
                    var j, len, ref, results1;
                    ref = this.vendors;
                    results1 = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        vendor = ref[j];
                        results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
                    }
                    return results1;
                }).call(this));
            }
            return results;
        };

        WOW.prototype.vendorCSS = function(elem, property) {
            var j, len, ref, result, style, vendor;
            style = getComputedStyle(elem);
            result = style.getPropertyCSSValue(property);
            ref = this.vendors;
            for (j = 0, len = ref.length; j < len; j++) {
                vendor = ref[j];
                result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
            }
            return result;
        };

        WOW.prototype.animationName = function(box) {
            var animationName, error;
            try {
                animationName = this.vendorCSS(box, 'animation-name').cssText;
            } catch (error) {
                animationName = getComputedStyle(box).getPropertyValue('animation-name');
            }
            if (animationName === 'none') {
                return '';
            } else {
                return animationName;
            }
        };

        WOW.prototype.cacheAnimationName = function(box) {
            return this.animationNameCache.set(box, this.animationName(box));
        };

        WOW.prototype.cachedAnimationName = function(box) {
            return this.animationNameCache.get(box);
        };

        WOW.prototype.scrollHandler = function() {
            return this.scrolled = true;
        };

        WOW.prototype.scrollCallback = function() {
            var box;
            if (this.scrolled) {
                this.scrolled = false;
                this.boxes = (function() {
                    var j, len, ref, results;
                    ref = this.boxes;
                    results = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        box = ref[j];
                        if (!(box)) {
                            continue;
                        }
                        if (this.isVisible(box)) {
                            this.show(box);
                            continue;
                        }
                        results.push(box);
                    }
                    return results;
                }).call(this);
                if (!(this.boxes.length || this.config.live)) {
                    return this.stop();
                }
            }
        };

        WOW.prototype.offsetTop = function(element) {
            var top;
            while (element.offsetTop === void 0) {
                element = element.parentNode;
            }
            top = element.offsetTop;
            while (element = element.offsetParent) {
                top += element.offsetTop;
            }
            return top;
        };

        WOW.prototype.isVisible = function(box) {
            var bottom, offset, top, viewBottom, viewTop;
            offset = box.getAttribute('data-wow-offset') || this.config.offset;
            viewTop = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset;
            viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
            top = this.offsetTop(box);
            bottom = top + box.clientHeight;
            return top <= viewBottom && bottom >= viewTop;
        };

        WOW.prototype.util = function() {
            return this._util != null ? this._util : this._util = new Util();
        };

        WOW.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent);
        };

        return WOW;

    })();

}).call(this);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ3b3cuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICAgIHZhciBNdXRhdGlvbk9ic2VydmVyLCBVdGlsLCBXZWFrTWFwLCBnZXRDb21wdXRlZFN0eWxlLCBnZXRDb21wdXRlZFN0eWxlUlgsXG4gICAgICAgIGJpbmQgPSBmdW5jdGlvbihmbiwgbWUpIHsgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyk7IH07IH0sXG4gICAgICAgIGluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuICAgIFV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIFV0aWwoKSB7fVxuXG4gICAgICAgIFV0aWwucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uKGN1c3RvbSwgZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIHZhciBrZXksIHZhbHVlO1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlZmF1bHRzW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGN1c3RvbVtrZXldID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VzdG9tO1xuICAgICAgICB9O1xuXG4gICAgICAgIFV0aWwucHJvdG90eXBlLmlzTW9iaWxlID0gZnVuY3Rpb24oYWdlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QoYWdlbnQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIFV0aWwucHJvdG90eXBlLmNyZWF0ZUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQsIGJ1YmJsZSwgY2FuY2VsLCBkZXRhaWwpIHtcbiAgICAgICAgICAgIHZhciBjdXN0b21FdmVudDtcbiAgICAgICAgICAgIGlmIChidWJibGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGJ1YmJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbmNlbCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2FuY2VsID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGV0YWlsID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZXRhaWwgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjdXN0b21FdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgICAgICAgICAgIGN1c3RvbUV2ZW50LmluaXRDdXN0b21FdmVudChldmVudCwgYnViYmxlLCBjYW5jZWwsIGRldGFpbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjdXN0b21FdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgICAgICAgICAgICAgY3VzdG9tRXZlbnQuZXZlbnRUeXBlID0gZXZlbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1c3RvbUV2ZW50LmV2ZW50TmFtZSA9IGV2ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGN1c3RvbUV2ZW50O1xuICAgICAgICB9O1xuXG4gICAgICAgIFV0aWwucHJvdG90eXBlLmVtaXRFdmVudCA9IGZ1bmN0aW9uKGVsZW0sIGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZWxlbS5kaXNwYXRjaEV2ZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW4gKGVsZW0gIT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbVtldmVudF0oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKFwib25cIiArIGV2ZW50KSBpbiAoZWxlbSAhPSBudWxsKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtW1wib25cIiArIGV2ZW50XSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIFV0aWwucHJvdG90eXBlLmFkZEV2ZW50ID0gZnVuY3Rpb24oZWxlbSwgZXZlbnQsIGZuKSB7XG4gICAgICAgICAgICBpZiAoZWxlbS5hZGRFdmVudExpc3RlbmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmbiwgZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5hdHRhY2hFdmVudChcIm9uXCIgKyBldmVudCwgZm4pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbVtldmVudF0gPSBmbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBVdGlsLnByb3RvdHlwZS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGVsZW0sIGV2ZW50LCBmbikge1xuICAgICAgICAgICAgaWYgKGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZm4sIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbS5kZXRhY2hFdmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uZGV0YWNoRXZlbnQoXCJvblwiICsgZXZlbnQsIGZuKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlbGV0ZSBlbGVtW2V2ZW50XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBVdGlsLnByb3RvdHlwZS5pbm5lckhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCdpbm5lckhlaWdodCcgaW4gd2luZG93KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIFV0aWw7XG5cbiAgICB9KSgpO1xuXG4gICAgV2Vha01hcCA9IHRoaXMuV2Vha01hcCB8fCB0aGlzLk1veldlYWtNYXAgfHwgKFdlYWtNYXAgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIFdlYWtNYXAoKSB7XG4gICAgICAgICAgICB0aGlzLmtleXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHZhciBpLCBpdGVtLCBqLCBsZW4sIHJlZjtcbiAgICAgICAgICAgIHJlZiA9IHRoaXMua2V5cztcbiAgICAgICAgICAgIGZvciAoaSA9IGogPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBqIDwgbGVuOyBpID0gKytqKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHJlZltpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGksIGl0ZW0sIGosIGxlbiwgcmVmO1xuICAgICAgICAgICAgcmVmID0gdGhpcy5rZXlzO1xuICAgICAgICAgICAgZm9yIChpID0gaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGkgPSArK2opIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gcmVmW2ldO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMua2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIFdlYWtNYXA7XG5cbiAgICB9KSgpKTtcblxuICAgIE11dGF0aW9uT2JzZXJ2ZXIgPSB0aGlzLk11dGF0aW9uT2JzZXJ2ZXIgfHwgdGhpcy5XZWJraXRNdXRhdGlvbk9ic2VydmVyIHx8IHRoaXMuTW96TXV0YXRpb25PYnNlcnZlciB8fCAoTXV0YXRpb25PYnNlcnZlciA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdNdXRhdGlvbk9ic2VydmVyIGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1dPVy5qcyBjYW5ub3QgZGV0ZWN0IGRvbSBtdXRhdGlvbnMsIHBsZWFzZSBjYWxsIC5zeW5jKCkgYWZ0ZXIgbG9hZGluZyBuZXcgY29udGVudC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIE11dGF0aW9uT2JzZXJ2ZXIubm90U3VwcG9ydGVkID0gdHJ1ZTtcblxuICAgICAgICBNdXRhdGlvbk9ic2VydmVyLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24oKSB7fTtcblxuICAgICAgICByZXR1cm4gTXV0YXRpb25PYnNlcnZlcjtcblxuICAgIH0pKCkpO1xuXG4gICAgZ2V0Q29tcHV0ZWRTdHlsZSA9IHRoaXMuZ2V0Q29tcHV0ZWRTdHlsZSB8fCBmdW5jdGlvbihlbCwgcHNldWRvKSB7XG4gICAgICAgIHRoaXMuZ2V0UHJvcGVydHlWYWx1ZSA9IGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgICAgICAgIHZhciByZWY7XG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICAgICAgICAgIHByb3AgPSAnc3R5bGVGbG9hdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZVJYLnRlc3QocHJvcCkpIHtcbiAgICAgICAgICAgICAgICBwcm9wLnJlcGxhY2UoZ2V0Q29tcHV0ZWRTdHlsZVJYLCBmdW5jdGlvbihfLCBfY2hhcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NoYXIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoKHJlZiA9IGVsLmN1cnJlbnRTdHlsZSkgIT0gbnVsbCA/IHJlZltwcm9wXSA6IHZvaWQgMCkgfHwgbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIGdldENvbXB1dGVkU3R5bGVSWCA9IC8oXFwtKFthLXpdKXsxfSkvZztcblxuICAgIHRoaXMuV09XID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBXT1cucHJvdG90eXBlLmRlZmF1bHRzID0ge1xuICAgICAgICAgICAgYm94Q2xhc3M6ICd3b3cnLFxuICAgICAgICAgICAgYW5pbWF0ZUNsYXNzOiAnYW5pbWF0ZWQnLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgbW9iaWxlOiB0cnVlLFxuICAgICAgICAgICAgbGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBudWxsLFxuICAgICAgICAgICAgc2Nyb2xsQ29udGFpbmVyOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gV09XKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNjcm9sbENhbGxiYWNrID0gYmluZCh0aGlzLnNjcm9sbENhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IGJpbmQodGhpcy5zY3JvbGxIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRBbmltYXRpb24gPSBiaW5kKHRoaXMucmVzZXRBbmltYXRpb24sIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5zdGFydCA9IGJpbmQodGhpcy5zdGFydCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnID0gdGhpcy51dGlsKCkuZXh0ZW5kKG9wdGlvbnMsIHRoaXMuZGVmYXVsdHMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2Nyb2xsQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zY3JvbGxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuc2Nyb2xsQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uTmFtZUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIHRoaXMud293RXZlbnQgPSB0aGlzLnV0aWwoKS5jcmVhdGVFdmVudCh0aGlzLmNvbmZpZy5ib3hDbGFzcyk7XG4gICAgICAgIH1cblxuICAgICAgICBXT1cucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZWY7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgaWYgKChyZWYgPSBkb2N1bWVudC5yZWFkeVN0YXRlKSA9PT0gXCJpbnRlcmFjdGl2ZVwiIHx8IHJlZiA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnV0aWwoKS5hZGRFdmVudChkb2N1bWVudCwgJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aGlzLnN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmlzaGVkID0gW107XG4gICAgICAgIH07XG5cbiAgICAgICAgV09XLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGJveCwgaiwgbGVuLCByZWY7XG4gICAgICAgICAgICB0aGlzLnN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYm94ZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGosIGxlbiwgcmVmLCByZXN1bHRzO1xuICAgICAgICAgICAgICAgIHJlZiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiICsgdGhpcy5jb25maWcuYm94Q2xhc3MpO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYm94ID0gcmVmW2pdO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goYm94KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9KS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5hbGwgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGosIGxlbiwgcmVmLCByZXN1bHRzO1xuICAgICAgICAgICAgICAgIHJlZiA9IHRoaXMuYm94ZXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgICAgICAgICBib3ggPSByZWZbal07XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChib3gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5ib3hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRTdHlsZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZiA9IHRoaXMuYm94ZXM7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm94ID0gcmVmW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseVN0eWxlKGJveCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXRpbCgpLmFkZEV2ZW50KHRoaXMuY29uZmlnLnNjcm9sbENvbnRhaW5lciB8fCB3aW5kb3csICdzY3JvbGwnLCB0aGlzLnNjcm9sbEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMudXRpbCgpLmFkZEV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuc2Nyb2xsQ2FsbGJhY2ssIDUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5saXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNdXRhdGlvbk9ic2VydmVyKChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24ocmVjb3Jkcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGssIGxlbjEsIG5vZGUsIHJlY29yZCwgcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoayA9IDAsIGxlbjEgPSByZWNvcmRzLmxlbmd0aDsgayA8IGxlbjE7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZCA9IHJlY29yZHNba107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGwsIGxlbjIsIHJlZjEsIHJlc3VsdHMxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWYxID0gcmVjb3JkLmFkZGVkTm9kZXMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMxID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobCA9IDAsIGxlbjIgPSByZWYxLmxlbmd0aDsgbCA8IGxlbjI7IGwrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHJlZjFbbF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzMS5wdXNoKHRoaXMuZG9TeW5jKG5vZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0czE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2FsbChfdGhpcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSkodGhpcykpLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBXT1cucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnV0aWwoKS5yZW1vdmVFdmVudCh0aGlzLmNvbmZpZy5zY3JvbGxDb250YWluZXIgfHwgd2luZG93LCAnc2Nyb2xsJywgdGhpcy5zY3JvbGxIYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMudXRpbCgpLnJlbW92ZUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMuc2Nyb2xsSGFuZGxlcik7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnRlcnZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgV09XLnByb3RvdHlwZS5zeW5jID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKE11dGF0aW9uT2JzZXJ2ZXIubm90U3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9TeW5jKHRoaXMuZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgV09XLnByb3RvdHlwZS5kb1N5bmMgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgYm94LCBqLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlIHx8IGVsZW1lbnQ7XG4gICAgICAgICAgICByZWYgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIgKyB0aGlzLmNvbmZpZy5ib3hDbGFzcyk7XG4gICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgICAgICBib3ggPSByZWZbal07XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4T2YuY2FsbCh0aGlzLmFsbCwgYm94KSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hlcy5wdXNoKGJveCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsLnB1c2goYm94KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RvcHBlZCB8fCB0aGlzLmRpc2FibGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRTdHlsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseVN0eWxlKGJveCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuc2Nyb2xsZWQgPSB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfTtcblxuICAgICAgICBXT1cucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbihib3gpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTdHlsZShib3gpO1xuICAgICAgICAgICAgYm94LmNsYXNzTmFtZSA9IGJveC5jbGFzc05hbWUgKyBcIiBcIiArIHRoaXMuY29uZmlnLmFuaW1hdGVDbGFzcztcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5jYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuY2FsbGJhY2soYm94KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXRpbCgpLmVtaXRFdmVudChib3gsIHRoaXMud293RXZlbnQpO1xuICAgICAgICAgICAgdGhpcy51dGlsKCkuYWRkRXZlbnQoYm94LCAnYW5pbWF0aW9uZW5kJywgdGhpcy5yZXNldEFuaW1hdGlvbik7XG4gICAgICAgICAgICB0aGlzLnV0aWwoKS5hZGRFdmVudChib3gsICdvYW5pbWF0aW9uZW5kJywgdGhpcy5yZXNldEFuaW1hdGlvbik7XG4gICAgICAgICAgICB0aGlzLnV0aWwoKS5hZGRFdmVudChib3gsICd3ZWJraXRBbmltYXRpb25FbmQnLCB0aGlzLnJlc2V0QW5pbWF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMudXRpbCgpLmFkZEV2ZW50KGJveCwgJ01TQW5pbWF0aW9uRW5kJywgdGhpcy5yZXNldEFuaW1hdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gYm94O1xuICAgICAgICB9O1xuXG4gICAgICAgIFdPVy5wcm90b3R5cGUuYXBwbHlTdHlsZSA9IGZ1bmN0aW9uKGJveCwgaGlkZGVuKSB7XG4gICAgICAgICAgICB2YXIgZGVsYXksIGR1cmF0aW9uLCBpdGVyYXRpb247XG4gICAgICAgICAgICBkdXJhdGlvbiA9IGJveC5nZXRBdHRyaWJ1dGUoJ2RhdGEtd293LWR1cmF0aW9uJyk7XG4gICAgICAgICAgICBkZWxheSA9IGJveC5nZXRBdHRyaWJ1dGUoJ2RhdGEtd293LWRlbGF5Jyk7XG4gICAgICAgICAgICBpdGVyYXRpb24gPSBib3guZ2V0QXR0cmlidXRlKCdkYXRhLXdvdy1pdGVyYXRpb24nKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGUoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuY3VzdG9tU3R5bGUoYm94LCBoaWRkZW4sIGR1cmF0aW9uLCBkZWxheSwgaXRlcmF0aW9uKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkodGhpcykpO1xuICAgICAgICB9O1xuXG4gICAgICAgIFdPVy5wcm90b3R5cGUuYW5pbWF0ZSA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgncmVxdWVzdEFuaW1hdGlvbkZyYW1lJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuXG4gICAgICAgIFdPVy5wcm90b3R5cGUucmVzZXRTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGJveCwgaiwgbGVuLCByZWYsIHJlc3VsdHM7XG4gICAgICAgICAgICByZWYgPSB0aGlzLmJveGVzO1xuICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgYm94ID0gcmVmW2pdO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChib3guc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfTtcblxuICAgICAgICBXT1cucHJvdG90eXBlLnJlc2V0QW5pbWF0aW9uID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQ7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2FuaW1hdGlvbmVuZCcpID49IDApIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmNsYXNzTmFtZSA9IHRhcmdldC5jbGFzc05hbWUucmVwbGFjZSh0aGlzLmNvbmZpZy5hbmltYXRlQ2xhc3MsICcnKS50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgV09XLnByb3RvdHlwZS5jdXN0b21TdHlsZSA9IGZ1bmN0aW9uKGJveCwgaGlkZGVuLCBkdXJhdGlvbiwgZGVsYXksIGl0ZXJhdGlvbikge1xuICAgICAgICAgICAgaWYgKGhpZGRlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVBbmltYXRpb25OYW1lKGJveCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib3guc3R5bGUudmlzaWJpbGl0eSA9IGhpZGRlbiA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZW5kb3JTZXQoYm94LnN0eWxlLCB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiBkdXJhdGlvblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlbGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZW5kb3JTZXQoYm94LnN0eWxlLCB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkRlbGF5OiBkZWxheVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGl0ZXJhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMudmVuZG9yU2V0KGJveC5zdHlsZSwge1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogaXRlcmF0aW9uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZlbmRvclNldChib3guc3R5bGUsIHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25OYW1lOiBoaWRkZW4gPyAnbm9uZScgOiB0aGlzLmNhY2hlZEFuaW1hdGlvbk5hbWUoYm94KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYm94O1xuICAgICAgICB9O1xuXG4gICAgICAgIFdPVy5wcm90b3R5cGUudmVuZG9ycyA9IFtcIm1velwiLCBcIndlYmtpdFwiXTtcblxuICAgICAgICBXT1cucHJvdG90eXBlLnZlbmRvclNldCA9IGZ1bmN0aW9uKGVsZW0sIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHZhciBuYW1lLCByZXN1bHRzLCB2YWx1ZSwgdmVuZG9yO1xuICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChuYW1lIGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHByb3BlcnRpZXNbbmFtZV07XG4gICAgICAgICAgICAgICAgZWxlbVtcIlwiICsgbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaiwgbGVuLCByZWYsIHJlc3VsdHMxO1xuICAgICAgICAgICAgICAgICAgICByZWYgPSB0aGlzLnZlbmRvcnM7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMxID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVuZG9yID0gcmVmW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czEucHVzaChlbGVtW1wiXCIgKyB2ZW5kb3IgKyAobmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSkgKyAobmFtZS5zdWJzdHIoMSkpXSA9IHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0czE7XG4gICAgICAgICAgICAgICAgfSkuY2FsbCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfTtcblxuICAgICAgICBXT1cucHJvdG90eXBlLnZlbmRvckNTUyA9IGZ1bmN0aW9uKGVsZW0sIHByb3BlcnR5KSB7XG4gICAgICAgICAgICB2YXIgaiwgbGVuLCByZWYsIHJlc3VsdCwgc3R5bGUsIHZlbmRvcjtcbiAgICAgICAgICAgIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IHN0eWxlLmdldFByb3BlcnR5Q1NTVmFsdWUocHJvcGVydHkpO1xuICAgICAgICAgICAgcmVmID0gdGhpcy52ZW5kb3JzO1xuICAgICAgICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmVuZG9yID0gcmVmW2pdO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBzdHlsZS5nZXRQcm9wZXJ0eUNTU1ZhbHVlKFwiLVwiICsgdmVuZG9yICsgXCItXCIgKyBwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuXG4gICAgICAgIFdPVy5wcm90b3R5cGUuYW5pbWF0aW9uTmFtZSA9IGZ1bmN0aW9uKGJveCkge1xuICAgICAgICAgICAgdmFyIGFuaW1hdGlvbk5hbWUsIGVycm9yO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25OYW1lID0gdGhpcy52ZW5kb3JDU1MoYm94LCAnYW5pbWF0aW9uLW5hbWUnKS5jc3NUZXh0O1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25OYW1lID0gZ2V0Q29tcHV0ZWRTdHlsZShib3gpLmdldFByb3BlcnR5VmFsdWUoJ2FuaW1hdGlvbi1uYW1lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uTmFtZSA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5pbWF0aW9uTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBXT1cucHJvdG90eXBlLmNhY2hlQW5pbWF0aW9uTmFtZSA9IGZ1bmN0aW9uKGJveCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uTmFtZUNhY2hlLnNldChib3gsIHRoaXMuYW5pbWF0aW9uTmFtZShib3gpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBXT1cucHJvdG90eXBlLmNhY2hlZEFuaW1hdGlvbk5hbWUgPSBmdW5jdGlvbihib3gpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbk5hbWVDYWNoZS5nZXQoYm94KTtcbiAgICAgICAgfTtcblxuICAgICAgICBXT1cucHJvdG90eXBlLnNjcm9sbEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjcm9sbGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBXT1cucHJvdG90eXBlLnNjcm9sbENhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYm94O1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5ib3hlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGosIGxlbiwgcmVmLCByZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICByZWYgPSB0aGlzLmJveGVzO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm94ID0gcmVmW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoYm94KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKGJveCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coYm94KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChib3gpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKCEodGhpcy5ib3hlcy5sZW5ndGggfHwgdGhpcy5jb25maWcubGl2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBXT1cucHJvdG90eXBlLm9mZnNldFRvcCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciB0b3A7XG4gICAgICAgICAgICB3aGlsZSAoZWxlbWVudC5vZmZzZXRUb3AgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b3AgPSBlbGVtZW50Lm9mZnNldFRvcDtcbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICB0b3AgKz0gZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9wO1xuICAgICAgICB9O1xuXG4gICAgICAgIFdPVy5wcm90b3R5cGUuaXNWaXNpYmxlID0gZnVuY3Rpb24oYm94KSB7XG4gICAgICAgICAgICB2YXIgYm90dG9tLCBvZmZzZXQsIHRvcCwgdmlld0JvdHRvbSwgdmlld1RvcDtcbiAgICAgICAgICAgIG9mZnNldCA9IGJveC5nZXRBdHRyaWJ1dGUoJ2RhdGEtd293LW9mZnNldCcpIHx8IHRoaXMuY29uZmlnLm9mZnNldDtcbiAgICAgICAgICAgIHZpZXdUb3AgPSAodGhpcy5jb25maWcuc2Nyb2xsQ29udGFpbmVyICYmIHRoaXMuY29uZmlnLnNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3ApIHx8IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgICAgIHZpZXdCb3R0b20gPSB2aWV3VG9wICsgTWF0aC5taW4odGhpcy5lbGVtZW50LmNsaWVudEhlaWdodCwgdGhpcy51dGlsKCkuaW5uZXJIZWlnaHQoKSkgLSBvZmZzZXQ7XG4gICAgICAgICAgICB0b3AgPSB0aGlzLm9mZnNldFRvcChib3gpO1xuICAgICAgICAgICAgYm90dG9tID0gdG9wICsgYm94LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIHJldHVybiB0b3AgPD0gdmlld0JvdHRvbSAmJiBib3R0b20gPj0gdmlld1RvcDtcbiAgICAgICAgfTtcblxuICAgICAgICBXT1cucHJvdG90eXBlLnV0aWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91dGlsICE9IG51bGwgPyB0aGlzLl91dGlsIDogdGhpcy5fdXRpbCA9IG5ldyBVdGlsKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgV09XLnByb3RvdHlwZS5kaXNhYmxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLmNvbmZpZy5tb2JpbGUgJiYgdGhpcy51dGlsKCkuaXNNb2JpbGUobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIFdPVztcblxuICAgIH0pKCk7XG5cbn0pLmNhbGwodGhpcyk7Il0sImZpbGUiOiJ3b3cuanMifQ==
