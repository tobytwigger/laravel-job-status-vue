import { AssociativeObject, JobStatus } from "../types/core";
import { Axios } from "axios";
declare class Repository {
    private static instance;
    readonly url: string;
    readonly axios: Axios;
    static createInstance(url: string, axios: Axios): void;
    static getInstance(): Repository;
    private constructor();
    sendSignal(jobStatus: JobStatus, signal: string, cancelJob: boolean, parameters?: AssociativeObject): Promise<null>;
    get(jobAlias: string, tags: AssociativeObject): Promise<JobStatus | null>;
    static clearInstance(): void;
}
export default Repository;
