import { defineComponent, h } from 'vue'
import {AxiosError, AxiosResponse} from "axios";

export default defineComponent({
    render() {
        if(this.status === null) {
            return h('div', {
                domProps: {innerHtml: 'NOT SET'}
            });
        }
        // @ts-ignore
        return h('div', this.$scopedSlots.default(this.status));
    },
    props: {
        jobAlias: {
            type: String,
            required: true
        },
        tags: {
            type: Object,
            required: false,
            default: () => { return {}; }
        },
    },
    mounted() {
        this.loadJobStatus();
    },
    data(): ComponentData {
        return {
            status: null
        }
    },
    methods: {
        cancel() {
            if(this.status !== null) {
                this.status.status = 'Cancelled';
            }
        },
        signal(signal: string) {
            console.log('Signalled ' + signal);
        },
        loadJobStatus() {
            // Add ?alias= and ?tags=
            this.$jobStatusGlobalSettings.axios.get(this.$jobStatusGlobalSettings.url, )
                .then((response: AxiosResponse) => {
                    this.status = response.data;
                })
                .finally(() => {
                    this.status = {
                        status: 'queued',
                        lastMessage: 'My last message',
                        complete: false,
                        cancel: () => this.cancel(),
                        signal: (signal: string) => this.signal(signal)
                    }
                })
        }
    },
})