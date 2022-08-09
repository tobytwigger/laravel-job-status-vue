import JobStatus from "./core/JobStatus";
import Repository from "./core/repository";
import JobStatusNotifierPool from "./core/JobStatusNotifierPool";

type VueOptions = import('./types/vue').VueOptions;

/**
 * Install the vue plugin into Vue.
 */
export const installer = {
    install(VueInstance: any, options: VueOptions) {
        VueInstance.component('JobStatus', JobStatus)

        Repository.createInstance(options.url, options.axios);
    },
};

export default installer;
