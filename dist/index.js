"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installer = void 0;
var JobStatus_1 = require("./core/JobStatus");
exports.installer = {
    install: function (VueInstance, options) {
        VueInstance.prototype.$jobStatusGlobalSettings = options;
        VueInstance.component('JobStatus', JobStatus_1.default);
    },
};
exports.default = exports.installer;
//# sourceMappingURL=index.js.map