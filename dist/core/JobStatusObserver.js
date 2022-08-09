"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JobStatusNotifierPool_1 = require("./JobStatusNotifierPool");
var JobStatusClient_1 = require("./JobStatusClient");
var JobStatusObserver = (function () {
    function JobStatusObserver() {
        this.interval = null;
    }
    JobStatusObserver.prototype.poll = function (jobAlias, tags, ms) {
        var _this = this;
        if (ms === void 0) { ms = 5000; }
        this.addInterval(jobAlias, tags, setInterval(function () { return _this.update(jobAlias, tags); }, ms));
        return this.getNotifier(jobAlias, tags);
    };
    JobStatusObserver.prototype.getNotifier = function (jobAlias, tags) {
        return JobStatusNotifierPool_1.default.getInstance().get(jobAlias, tags);
    };
    JobStatusObserver.prototype.update = function (jobAlias, tags) {
        JobStatusNotifierPool_1.default.getInstance().get(jobAlias, tags).triggerLoading();
        JobStatusClient_1.default.getInstance().get(jobAlias, tags)
            .then(function (jobStatus) { return JobStatusNotifierPool_1.default.getInstance().get(jobAlias, tags).triggerUpdate(jobStatus); })
            .catch(function (error) { return JobStatusNotifierPool_1.default.getInstance().get(jobAlias, tags).triggerError(error); })
            .finally(function () { return JobStatusNotifierPool_1.default.getInstance().get(jobAlias, tags).triggerFinishedLoading(); });
    };
    JobStatusObserver.prototype.addInterval = function (jobAlias, tags, interval) {
        this.interval = interval;
    };
    JobStatusObserver.prototype.cleanup = function (jobAlias, tags) {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
        this.interval = null;
    };
    return JobStatusObserver;
}());
exports.default = JobStatusObserver;
//# sourceMappingURL=JobStatusObserver.js.map