import { AssociativeObject, JobStatus } from "../types/core";
import { Axios } from "axios";
import ApiUrlGenerator from "./../utils/ApiUrlGenerator";
declare class JobStatusRepository {
    private static instance;
    readonly _url: ApiUrlGenerator;
    readonly axios: Axios;
    get url(): string;
    static createInstance(url: string, axios: Axios): void;
    static getInstance(): JobStatusRepository;
    private constructor();
    sendSignal(jobStatusId: number, signal: string, cancelJob: boolean, parameters?: AssociativeObject): Promise<null>;
    get(jobAlias: string, tags: AssociativeObject): Promise<JobStatus | null>;
    static clearInstance(): void;
}
export default JobStatusRepository;
