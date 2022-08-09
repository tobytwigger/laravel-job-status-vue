"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JobStatusNotifierPool_1 = require("./JobStatusNotifierPool");
var JobStatusClient_1 = require("./JobStatusClient");
var JobStatusObserver = (function () {
    function JobStatusObserver(jobAlias, tags) {
        this.interval = null;
        this.jobAlias = jobAlias;
        this.tags = tags;
    }
    JobStatusObserver.prototype.poll = function (ms) {
        var _this = this;
        if (ms === void 0) { ms = 5000; }
        this.interval = setInterval(function () { return _this.update(); }, ms);
        return JobStatusNotifierPool_1.default.getInstance().get(this.jobAlias, this.tags);
    };
    JobStatusObserver.setupClient = function (url, a) {
        JobStatusClient_1.default.createInstance(url, a);
    };
    JobStatusObserver.prototype.update = function () {
        var _this = this;
        JobStatusNotifierPool_1.default.getInstance().get(this.jobAlias, this.tags).triggerLoading();
        return JobStatusClient_1.default.getInstance().get(this.jobAlias, this.tags)
            .then(function (jobStatus) { return JobStatusNotifierPool_1.default.getInstance().get(_this.jobAlias, _this.tags).triggerUpdate(jobStatus); })
            .catch(function (error) { return JobStatusNotifierPool_1.default.getInstance().get(_this.jobAlias, _this.tags).triggerError(error); })
            .finally(function () { return JobStatusNotifierPool_1.default.getInstance().get(_this.jobAlias, _this.tags).triggerFinishedLoading(); });
    };
    JobStatusObserver.prototype.cleanup = function () {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
        this.interval = null;
    };
    return JobStatusObserver;
}());
exports.default = JobStatusObserver;
//# sourceMappingURL=JobStatusObserver.js.map