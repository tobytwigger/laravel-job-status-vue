import JobStatus from "./core/JobStatus";

type VueOptions = import('./types/vue').VueOptions;


export const installer = {
    install(VueInstance: any, options: VueOptions) {
        VueInstance.prototype.$jobStatusGlobalSettings = options;

        VueInstance.component('JobStatus', JobStatus)
    },
};

export default installer;
