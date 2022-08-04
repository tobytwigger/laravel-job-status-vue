"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JobStatusNotifierPool_1 = require("./JobStatusNotifierPool");
var repository_1 = require("./repository");
var JobStatusObserver = (function () {
    function JobStatusObserver() {
    }
    JobStatusObserver.getInstance = function () {
        return new JobStatusObserver();
    };
    JobStatusObserver.prototype.poll = function (jobAlias, tags, ms) {
        var _this = this;
        if (ms === void 0) { ms = 5000; }
        setInterval(function () { return _this.update(jobAlias, tags); }, ms);
        return this.bindToStatus(jobAlias, tags);
    };
    JobStatusObserver.prototype.bindToStatus = function (jobAlias, tags) {
        return JobStatusNotifierPool_1.default.getInstance().get(jobAlias, tags);
    };
    JobStatusObserver.prototype.update = function (jobAlias, tags) {
        JobStatusNotifierPool_1.default.getInstance().get(jobAlias, tags).triggerLoading();
        repository_1.default.getInstance().get(jobAlias, tags)
            .then(function (jobStatus) { return JobStatusNotifierPool_1.default.getInstance().get(jobAlias, tags).triggerUpdate(jobStatus); })
            .catch(function (error) { return JobStatusNotifierPool_1.default.getInstance().get(jobAlias, tags).triggerError(error); })
            .finally(function () { return JobStatusNotifierPool_1.default.getInstance().get(jobAlias, tags).triggerFinishedLoading(); });
    };
    return JobStatusObserver;
}());
exports.default = JobStatusObserver;
//# sourceMappingURL=JobStatusObserver.js.map