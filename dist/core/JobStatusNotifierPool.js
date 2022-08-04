"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JobStatusNotifier_1 = require("./JobStatusNotifier");
var NotifierCollection_1 = require("./NotifierCollection");
var JobStatusNotifierPool = (function () {
    function JobStatusNotifierPool() {
        this.pool = new NotifierCollection_1.default();
    }
    JobStatusNotifierPool.getInstance = function () {
        if (!JobStatusNotifierPool.instance) {
            JobStatusNotifierPool.instance = new JobStatusNotifierPool();
        }
        return JobStatusNotifierPool.instance;
    };
    JobStatusNotifierPool.prototype.get = function (jobAlias, tags) {
        var jobStatusNotifier = this.pool.get(jobAlias, tags);
        if (jobStatusNotifier === null) {
            jobStatusNotifier = new JobStatusNotifier_1.default(jobAlias, tags);
            this.pool.push(jobAlias, tags, jobStatusNotifier);
        }
        return jobStatusNotifier;
    };
    return JobStatusNotifierPool;
}());
exports.default = JobStatusNotifierPool;
//# sourceMappingURL=JobStatusNotifierPool.js.map