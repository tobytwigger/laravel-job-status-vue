"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiUrlGenerator_1 = require("./ApiUrlGenerator");
var Repository = (function () {
    function Repository(url, axios) {
        this._url = new ApiUrlGenerator_1.default(url);
        this.axios = axios;
    }
    Object.defineProperty(Repository.prototype, "url", {
        get: function () {
            return this._url.url;
        },
        enumerable: false,
        configurable: true
    });
    Repository.createInstance = function (url, axios) {
        Repository.instance = new Repository(url, axios);
    };
    Repository.getInstance = function () {
        if (Repository.instance === null) {
            throw new Error('Please call createInstance before getting an instance of the job status repository');
        }
        return Repository.instance;
    };
    Repository.prototype.sendSignal = function (jobStatusId, signal, cancelJob, parameters) {
        var _this = this;
        if (parameters === void 0) { parameters = {}; }
        return new Promise(function (resolve, reject) {
            var data = {
                signal: signal,
                parameters: parameters,
                cancel_job: cancelJob
            };
            _this.axios.post(_this._url.sendSignal(jobStatusId), data)
                .then(function () { return resolve(null); })
                .catch(function (error) { return reject(error); });
        });
    };
    Repository.prototype.get = function (jobAlias, tags) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.axios.get(_this._url.searchForJobStatus(jobAlias, tags))
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