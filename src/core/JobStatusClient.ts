import {AssociativeObject, JobStatus} from "../types/core";
import {Axios, AxiosError, AxiosResponse} from "axios";
import ApiUrlGenerator from "./../utils/ApiUrlGenerator";

class JobStatusClient {

    private static instance: JobStatusClient|null = null;

    readonly _url: ApiUrlGenerator;

    readonly axios: Axios;

    get url(): string {
        return this._url.url;
    }

    public static createInstance(url: string, axios: Axios) {
        JobStatusClient.instance = new JobStatusClient(url, axios)
    }

    public static getInstance(): JobStatusClient {
        if (JobStatusClient.instance === null) {
            throw new Error('Please call createInstance before getting an instance of the job status repository');
        }

        return JobStatusClient.instance;
    }

    private constructor(url: string, axios: Axios) {
        this._url = new ApiUrlGenerator(url);
        this.axios = axios;
    }

    sendSignal(jobStatusId: number, signal: string, cancelJob: boolean, parameters: AssociativeObject = {}): Promise<null> {
        return new Promise<null>((resolve, reject) => {
            const data = {
                signal,
                parameters,
                cancel_job: cancelJob
            };

            this.axios.post(this._url.sendSignal(jobStatusId), data)
                .then(() => resolve(null))
                .catch((error) => reject(error));
        });
    }

    get(jobAlias: string, tags: AssociativeObject): Promise<JobStatus | null> {
        return new Promise<JobStatus | null>((resolve, reject) => {
            this.axios.get(this._url.searchForJobStatus(jobAlias, tags))
                .then((response: AxiosResponse) => {
                    resolve(response.data);
                })
                .catch((error: AxiosError) => {
                    if(error.response?.status === 404) {
                        resolve(null);
                    }
                    reject(error);
                });
        });
    }

    static clearInstance() {
        JobStatusClient.instance = null;
    }
}

export default JobStatusClient;