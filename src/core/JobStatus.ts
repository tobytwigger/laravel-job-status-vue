import { defineComponent, h } from 'vue'
import {AxiosError, AxiosPromise, AxiosResponse} from "axios";
import {AssociativeObject, ComponentData, DefaultProps} from "../types/core";

export default defineComponent({
    render() {
        if(this.loading) {
            // @ts-ignore
            return h('div', this.$scopedSlots.loading());
        }
        if(this.error) {
            // @ts-ignore
            return h('div', this.$scopedSlots.error({message: this.error}))
        }
        if(this.status === null) {
            // @ts-ignore
            return h('div', this.$scopedSlots.empty());
        }
        // @ts-ignore
        return h('div', this.$scopedSlots.default(this.defaultSlotProperties));
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
            status: null,
            loading: false,
            statusId: null,
            error: null
        }
    },
    methods: {
        cancel() {
            return this.signal('cancel', true);
        },
        signal(signal: string, cancelJob: boolean, parameters: AssociativeObject = {}) {
            const promise = (resolve: any, reject: any) => {
                if (this.status !== null) {
                    const url = this.$jobStatusGlobalSettings.url
                        + (this.$jobStatusGlobalSettings.url.endsWith('/') ? '' : '/')
                        + 'job-status/'
                        + this.status.id
                        + '/job-signal';

                    resolve(this.$jobStatusGlobalSettings.axios.post(url, {
                        signal, cancel_job: cancelJob, parameters
                    }));
                } else {
                    reject('Status is not set');
                }
            }
            return new Promise(promise);

        },
        loadJobStatus() {
            const urlParams = new URLSearchParams();
            urlParams.set('alias', this.jobAlias);
            Object.keys(this.tags).forEach(key => urlParams.set('tags[' + key + ']', this.tags[key]));

            const url = this.$jobStatusGlobalSettings.url
            + (this.$jobStatusGlobalSettings.url.endsWith('/') ? '' : '/')
                + 'job-status?'
                + urlParams.toString()

            this.loading = true;
            // Add ?alias= and ?tags=
            this.$jobStatusGlobalSettings.axios.get(url)
                .then((response: AxiosResponse) => {
                    this.error = null;
                    if(response.data.length > 0) {
                        this.status = response.data[0];
                    } else {
                        this.status = null;
                    }
                })
                .catch((error: AxiosError) => {
                    this.error = error.response?.data.message;
                })
                .finally(() => this.loading = false);
        }
    },
    computed: {
        defaultSlotProperties(): DefaultProps|null {
            if(this.status !== null) {
                return {
                    status: this.status.status,
                    lastMessage: this.status.lastMessage,
                    complete: this.status.isFinished,
                    cancel: () => this.cancel(),
                    signal: (signal: string, cancelJob: boolean, parameters: AssociativeObject) => this.signal(signal, cancelJob, parameters)
                }
            }
            return null;
        }
    }
})