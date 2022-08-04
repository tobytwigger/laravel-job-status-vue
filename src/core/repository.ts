import {AssociativeObject, JobStatus} from "../types/core";
import {Axios, AxiosError, AxiosResponse} from "axios";

class Repository {

    private static instance: Repository;

    private readonly url: string;

    private readonly axios: Axios;

    public static createInstance(url: string, axios: Axios) {
        Repository.instance = new Repository(url, axios)
    }

    public static getInstance(): Repository {
        if (!Repository.instance) {
            throw new Error('Please call `createInstance` before getting an instance of the job status repository');
        }

        return Repository.instance;
    }

    private constructor(url: string, axios: Axios) {
        this.url = url;
        this.axios = axios;
    }

    sendSignal(jobStatus: JobStatus, signal: string, cancelJob: boolean, parameters: AssociativeObject = {}): Promise<null> {

        const url = this.url
            + (this.url.endsWith('/') ? '' : '/')
            + 'job-status/'
            + jobStatus.id
            + '/job-signal';

        return new Promise<null>((resolve, reject) => {
            const data = {
                signal,
                parameters,
                cancel_job: cancelJob
            };

            console.log(data);

            this.axios.post(url, data)
                .finally(() => resolve(null));
        });
    }

    get(jobAlias: string, tags: AssociativeObject): Promise<JobStatus | null> {
        const urlParams = new URLSearchParams();
        urlParams.set('alias', jobAlias);
        Object.keys(tags).forEach(key => urlParams.set('tags[' + key + ']', tags[key]));
        const url = this.url
            + (this.url.endsWith('/') ? '' : '/')
            + 'job-status?'
            + urlParams.toString()

        return new Promise<JobStatus | null>((resolve, reject) => {
            this.axios.get(url)
                .then((response: AxiosResponse) => {
                    resolve(response.data.length > 0
                        ? response.data[0]
                        : null);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

}

export default Repository;