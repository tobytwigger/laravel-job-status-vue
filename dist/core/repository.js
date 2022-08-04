"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Repository = (function () {
    function Repository(url, axios) {
        this.url = url;
        this.axios = axios;
    }
    Repository.createInstance = function (url, axios) {
        Repository.instance = new Repository(url, axios);
    };
    Repository.getInstance = function () {
        if (!Repository.instance) {
            throw new Error('Please call `createInstance` before getting an instance of the job status repository');
        }
        return Repository.instance;
    };
    Repository.prototype.sendSignal = function (jobStatus, signal, cancelJob, parameters) {
        var _this = this;
        if (parameters === void 0) { parameters = {}; }
        var url = this.url
            + (this.url.endsWith('/') ? '' : '/')
            + 'job-status/'
            + jobStatus.id
            + '/job-signal';
        return new Promise(function (resolve, reject) {
            var data = {
                signal: signal,
                parameters: parameters,
                cancel_job: cancelJob
            };
            console.log(data);
            _this.axios.post(url, data)
                .finally(function () { return resolve(null); });
        });
    };
    Repository.prototype.get = function (jobAlias, tags) {
        var _this = this;
        var urlParams = new URLSearchParams();
        urlParams.set('alias', jobAlias);
        Object.keys(tags).forEach(function (key) { return urlParams.set('tags[' + key + ']', tags[key]); });
        var url = this.url
            + (this.url.endsWith('/') ? '' : '/')
            + 'job-status?'
            + urlParams.toString();
        return new Promise(function (resolve, reject) {
            _this.axios.get(url)
                .then(function (response) {
                resolve(response.data.length > 0
                    ? response.data[0]
                    : null);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return Repository;
}());
exports.default = Repository;
//# sourceMappingURL=repository.js.map