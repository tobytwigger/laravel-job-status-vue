"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    render: function () {
        if (this.status === null) {
            return (0, vue_1.h)('div', {
                domProps: { innerHtml: 'NOT SET' }
            });
        }
        return (0, vue_1.h)('div', this.$scopedSlots.default(this.status));
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
            status: null
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
            this.$jobStatusGlobalSettings.axios.get(this.$jobStatusGlobalSettings.url)
                .then(function (response) {
                _this.status = response.data;
            })
                .finally(function () {
                _this.status = {
                    status: 'queued',
                    lastMessage: 'My last message',
                    complete: false,
                    cancel: function () { return _this.cancel(); },
                    signal: function (signal) { return _this.signal(signal); }
                };
            });
        }
    },
});
//# sourceMappingURL=JobStatus.js.map