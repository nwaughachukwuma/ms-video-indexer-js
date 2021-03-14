"use strict";
exports.__esModule = true;

var DEFAULT_TTL = 1;
function memoryCache(ttl) {
    if (ttl === void 0) { ttl = DEFAULT_TTL; }
    var cache = new Map();
    return {
        get: function (key) {
            var _a;
            return (_a = cache.get(key)) === null || _a === void 0 ? void 0 : _a.value;
        },
        set: function (key, value, options) {
            var _this = this;
            var _a;
            this.unset(key);
            var timer = setTimeout(function () {
                console.debug("deleting " + key + " after timeout");
                _this.unset(key);
            }, (((_a = options) === null || _a === void 0 ? void 0 : _a.ttl) || ttl) * 1000);
            cache.set(key, { value: value, timer: timer });
            return value;
        },
        unset: function (key) {
            if (!cache.has(key))
                return false;
            var cachedObj = cache.get(key);
            clearTimeout(cachedObj.timer);
            cache["delete"](key);
            return true;
        },
        hasKey: function (key) {
            return cache.has(key);
        }
    };
}

module.exports = memoryCache;
