import { AssociativeObject, JobStatus } from "../types/core";
import { AxiosError } from "axios";
declare class JobStatusNotifier {
    jobAlias: string;
    tags: AssociativeObject;
    updateCallbacks: ((jobStatus: JobStatus | null) => void)[];
    loadingCallbacks: (() => void)[];
    finishLoadingCallbacks: (() => void)[];
    errorCallbacks: ((error: AxiosError) => void)[];
    constructor(jobAlias: string, tags: AssociativeObject);
    onUpdated(callback: (jobStatus: JobStatus | null) => void): this;
    onLoading(callback: () => void): this;
    onFinishedLoading(callback: () => void): this;
    onError(callback: (error: AxiosError) => void): this;
    triggerUpdate(jobStatus: JobStatus | null): void;
    triggerLoading(): void;
    triggerFinishedLoading(): void;
    triggerError(error: AxiosError): void;
}
export default JobStatusNotifier;
