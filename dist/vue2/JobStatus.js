"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var JobStatusObserver_1 = require("./../core/JobStatusObserver");
var JobStatusClient_1 = require("./../core/JobStatusClient");
exports.default = (0, vue_1.defineComponent)({
    render: function () {
        if (this.loading && this.status === null) {
            return (0, vue_1.h)('div', this.$scopedSlots.loading());
        }
        if (this.error) {
            return (0, vue_1.h)('div', this.$scopedSlots.error({ message: this.error }));
        }
        if (this.status === null) {
            return (0, vue_1.h)('div', this.$scopedSlots.empty());
        }
        return (0, vue_1.h)('div', this.$scopedSlots.default(this.defaultSlotProperties));
    },
    props: {
        jobAlias: {
            type: String,
            required: true
        },
        tags: {
            type: Object,
            required: false,
            default: function () { return {}; }
        },
        method: {
            type: String,
            required: false,
            validator: function (val) { return val === 'polling'; },
            default: 'polling'
        }
    },
    mounted: function () {
        var _this = this;
        this.jobStatusObserver = new JobStatusObserver_1.default(this.jobAlias, this.tags);
        if (this.method === 'polling') {
            this.jobStatusObserver.poll(5000)
                .onUpdated(function (jobStatus) {
                _this.status = jobStatus;
                _this.error = null;
            })
                .onError(function (error) { return _this.error = error.message; })
                .onLoading(function () { return _this.loading = true; })
                .onFinishedLoading(function () { return _this.loading = false; });
            this.jobStatusObserver.update();
        }
    },
    destroyed: function () {
        var _a;
        (_a = this.jobStatusObserver) === null || _a === void 0 ? void 0 : _a.cleanup();
    },
    data: function () {
        return {
            status: null,
            loading: false,
            statusId: null,
            error: null,
            jobStatusObserver: null
        };
    },
    methods: {
        cancel: function () {
            return this.signal('cancel', true);
        },
        signal: function (signal, cancelJob, parameters) {
            if (cancelJob === void 0) { cancelJob = false; }
            if (parameters === void 0) { parameters = {}; }
            if (this.status === null) {
                return null;
            }
            return JobStatusClient_1.default.getInstance().sendSignal(this.status.id, signal, cancelJob, parameters);
        },
    },
    computed: {
        defaultSlotProperties: function () {
            var _this = this;
            if (this.status !== null) {
                return {
                    status: this.status.status,
                    lastMessage: this.status.lastMessage,
                    complete: this.status.isFinished,
                    cancel: function () { return _this.cancel(); },
                    signal: function (signal, cancelJob, parameters) { return _this.signal(signal, cancelJob, parameters); }
                };
            }
            return null;
        }
    }
});
//# sourceMappingURL=JobStatus.js.map