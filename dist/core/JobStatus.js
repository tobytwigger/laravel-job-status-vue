"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    render: function () {
        if (this.loading) {
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
    },
    mounted: function () {
        this.loadJobStatus();
    },
    data: function () {
        return {
            status: null,
            loading: false,
            statusId: null,
            error: null
        };
    },
    methods: {
        cancel: function () {
            if (this.status !== null) {
                this.status.status = 'Cancelled';
            }
        },
        signal: function (signal) {
            console.log('Signalled ' + signal);
        },
        loadJobStatus: function () {
            var _this = this;
            var urlParams = new URLSearchParams();
            urlParams.set('alias', this.jobAlias);
            Object.keys(this.tags).forEach(function (key) { return urlParams.set('tags[' + key + ']', _this.tags[key]); });
            var url = this.$jobStatusGlobalSettings.url
                + (this.$jobStatusGlobalSettings.url.endsWith('/') ? '' : '/')
                + 'job-status?'
                + urlParams.toString();
            this.loading = true;
            this.$jobStatusGlobalSettings.axios.get(url)
                .then(function (response) {
                _this.error = null;
                if (response.data.length > 0) {
                    _this.status = response.data[0];
                }
                else {
                    _this.status = null;
                }
            })
                .catch(function (error) {
                var _a;
                console.log(error);
                _this.error = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message;
            })
                .finally(function () { return _this.loading = false; });
        }
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
                    signal: function (signal) { return _this.signal(signal); }
                };
            }
        }
    }
});
//# sourceMappingURL=JobStatus.js.map