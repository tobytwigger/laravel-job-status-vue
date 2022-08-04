import { AssociativeObject } from "../types/core";
import JobStatusNotifier from "./JobStatusNotifier";
declare class JobStatusNotifierPool {
    private static instance;
    private pool;
    static getInstance(): JobStatusNotifierPool;
    private constructor();
    get(jobAlias: string, tags: AssociativeObject): JobStatusNotifier;
}
export default JobStatusNotifierPool;
