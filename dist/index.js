"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installer = void 0;
var JobStatusClient_1 = require("./core/JobStatusClient");
var JobStatus_1 = require("./vue2/JobStatus");
exports.installer = {
    install: function (VueInstance, options) {
        VueInstance.component('JobStatus', JobStatus_1.default);
        JobStatusClient_1.default.createInstance(options.url, options.axios);
    },
};
exports.default = exports.installer;
//# sourceMappingURL=index.js.map