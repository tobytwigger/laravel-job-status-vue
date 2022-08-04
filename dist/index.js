"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installer = void 0;
var JobStatus_1 = require("./core/JobStatus");
var repository_1 = require("./core/repository");
exports.installer = {
    install: function (VueInstance, options) {
        VueInstance.component('JobStatus', JobStatus_1.default);
        repository_1.default.createInstance(options.url, options.axios);
    },
};
exports.default = exports.installer;
//# sourceMappingURL=index.js.map