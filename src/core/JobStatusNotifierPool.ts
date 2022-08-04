import {AssociativeObject} from "../types/core";
import JobStatusNotifier from "./JobStatusNotifier";
import {Axios} from "axios";
import NotifierCollection from "./NotifierCollection";


class JobStatusNotifierPool
{

    private static instance: JobStatusNotifierPool;

    private pool : NotifierCollection

    public static getInstance(): JobStatusNotifierPool {
        if (!JobStatusNotifierPool.instance) {
            JobStatusNotifierPool.instance = new JobStatusNotifierPool()
        }

        return JobStatusNotifierPool.instance;
    }

    private constructor() {
        this.pool = new NotifierCollection();
    }

    get(jobAlias: string, tags: AssociativeObject): JobStatusNotifier {
        let jobStatusNotifier: JobStatusNotifier|null = this.pool.get(jobAlias, tags);
        if(jobStatusNotifier === null) {
            jobStatusNotifier = new JobStatusNotifier(jobAlias, tags);
            this.pool.push(jobAlias, tags, jobStatusNotifier);
        }
        return jobStatusNotifier;
    }

}

export default JobStatusNotifierPool;