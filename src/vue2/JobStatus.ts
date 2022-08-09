import { defineComponent, h } from 'vue'
import {AssociativeObject, ComponentData, DefaultProps} from "../types/core";
import JobStatusObserver from "./../core/JobStatusObserver";
import JobStatusClient from "./../core/JobStatusClient";

export default defineComponent({
    render() {
        if(this.loading && this.status === null) {
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
        method: {
            type: String,
            required: false,
            validator: (val) => val === 'polling',
            default: 'polling'
        }
    },
    mounted() {
        this.jobStatusObserver = new JobStatusObserver(this.jobAlias, this.tags);
        if(this.method === 'polling') {
            this.jobStatusObserver.poll(5000)
                .onUpdated((jobStatus) => {
                    this.status = jobStatus;
                    this.error = null;
                })
                .onError((error) => this.error = error.message)
                .onLoading(() => this.loading = true)
                .onFinishedLoading(() => this.loading = false);
            this.jobStatusObserver.update();
        }
    },
    destroyed() {
        this.jobStatusObserver?.cleanup();
    },
    data(): ComponentData {
        return {
            status: null,
            loading: false,
            statusId: null,
            error: null,
            jobStatusObserver: null
        }
    },
    methods: {
        cancel() {
            return this.signal('cancel', true);
        },
        signal(signal: string, cancelJob: boolean = false, parameters: AssociativeObject = {}): Promise<null>|null {
            if(this.status === null) {
                return null;
            }
            return JobStatusClient.getInstance().sendSignal(
                this.status.id,
                signal,
                cancelJob,
                parameters
            );
        },
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