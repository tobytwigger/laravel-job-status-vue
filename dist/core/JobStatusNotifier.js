"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JobStatusNotifier = (function () {
    function JobStatusNotifier(jobAlias, tags) {
        this.updateCallbacks = [];
        this.loadingCallbacks = [];
        this.finishLoadingCallbacks = [];
        this.errorCallbacks = [];
        this.jobAlias = jobAlias;
        this.tags = tags;
    }
    JobStatusNotifier.prototype.onUpdated = function (callback) {
        this.updateCallbacks.push(callback);
        return this;
    };
    JobStatusNotifier.prototype.onLoading = function (callback) {
        this.loadingCallbacks.push(callback);
        return this;
    };
    JobStatusNotifier.prototype.onFinishedLoading = function (callback) {
        this.finishLoadingCallbacks.push(callback);
        return this;
    };
    JobStatusNotifier.prototype.onError = function (callback) {
        this.errorCallbacks.push(callback);
        return this;
    };
    JobStatusNotifier.prototype.triggerUpdate = function (jobStatus) {
        this.updateCallbacks.forEach(function (callback) { return callback(jobStatus); });
    };
    JobStatusNotifier.prototype.triggerLoading = function () {
        this.loadingCallbacks.forEach(function (callback) { return callback(); });
    };
    JobStatusNotifier.prototype.triggerFinishedLoading = function () {
        this.finishLoadingCallbacks.forEach(function (callback) { return callback(); });
    };
    JobStatusNotifier.prototype.triggerError = function (error) {
        this.errorCallbacks.forEach(function (callback) { return callback(error); });
    };
    return JobStatusNotifier;
}());
exports.default = JobStatusNotifier;
//# sourceMappingURL=JobStatusNotifier.js.map