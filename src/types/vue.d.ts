import { Axios } from 'axios';
import Vue from 'vue';

declare module "*.vue" {
    import Vue from 'vue';
    export default Vue;
}

declare module 'vue/types/vue' {
    interface Vue {
        $jobStatusGlobalSettings: VueOptions;
    }
}

interface VueOptions {
    url: string;
    axios: Axios;
}

export { VueOptions };
