"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryHasher_1 = require("./../utils/QueryHasher");
var NotifierCollection = (function () {
    function NotifierCollection() {
        this.notifiers = {};
    }
    NotifierCollection.prototype.get = function (jobAlias, tags) {
        var key = this._getKey(jobAlias, tags);
        if (Object.keys(this.notifiers).indexOf(key) > -1) {
            return this.notifiers[key];
        }
        return null;
    };
    NotifierCollection.prototype.push = function (jobStatusNotifier) {
        var key = this._getKey(jobStatusNotifier.jobAlias, jobStatusNotifier.tags);
        this.notifiers[key] = jobStatusNotifier;
    };
    NotifierCollection.prototype._getKey = function (jobAlias, tags) {
        return QueryHasher_1.default.encode(jobAlias, tags);
    };
    return NotifierCollection;
}());
exports.default = NotifierCollection;
//# sourceMappingURL=NotifierCollection.js.map