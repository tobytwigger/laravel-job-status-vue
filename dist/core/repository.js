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
        if (Repository.instance === null) {
            throw new Error('Please call createInstance before getting an instance of the job status repository');
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
            _this.axios.post(url, data)
                .then(function () { return resolve(null); })
                .catch(function (error) { return reject(error); });
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
                resolve(response.data);
            })
                .catch(function (error) {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                    resolve(null);
                }
                reject(error);
            });
        });
    };
    Repository.clearInstance = function () {
        Repository.instance = null;
    };
    Repository.instance = null;
    return Repository;
}());
exports.default = Repository;
//# sourceMappingURL=repository.js.map