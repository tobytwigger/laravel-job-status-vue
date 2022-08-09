"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiUrlGenerator = (function () {
    function ApiUrlGenerator(baseUrl) {
        this.url = baseUrl;
    }
    ApiUrlGenerator.prototype.withPrefix = function (prefix) {
        return this.url
            + (this.url.endsWith('/') ? '' : '/')
            + prefix;
    };
    ApiUrlGenerator.prototype.searchForJobStatus = function (jobAlias, tags) {
        var urlParams = new URLSearchParams();
        urlParams.set('alias', jobAlias);
        Object.keys(tags).forEach(function (key) { return urlParams.set('tags[' + key + ']', tags[key]); });
        return this.withPrefix('job-status?' + urlParams.toString());
    };
    ApiUrlGenerator.prototype.sendSignal = function (jobStatusId) {
        return this.withPrefix('job-status/' + jobStatusId + '/job-signal');
    };
    return ApiUrlGenerator;
}());
exports.default = ApiUrlGenerator;
//# sourceMappingURL=ApiUrlGenerator.js.map