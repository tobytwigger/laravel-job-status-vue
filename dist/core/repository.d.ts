import { AssociativeObject, JobStatus } from "../types/core";
import { Axios } from "axios";
declare class Repository {
    private static instance;
    private readonly url;
    private readonly axios;
    static createInstance(url: string, axios: Axios): void;
    static getInstance(): Repository;
    private constructor();
    sendSignal(jobStatus: JobStatus, signal: string, cancelJob: boolean, parameters?: AssociativeObject): Promise<null>;
    get(jobAlias: string, tags: AssociativeObject): Promise<JobStatus | null>;
}
export default Repository;
