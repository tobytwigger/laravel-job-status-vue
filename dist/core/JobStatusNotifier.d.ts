import { AssociativeObject, JobStatus } from "../types/core";
declare class JobStatusNotifier {
    jobAlias: string;
    tags: AssociativeObject;
    updateCallbacks: ((jobStatus: JobStatus | null) => void)[];
    loadingCallbacks: (() => void)[];
    finishLoadingCallbacks: (() => void)[];
    errorCallbacks: ((error: Error) => void)[];
    constructor(jobAlias: string, tags: AssociativeObject);
    onUpdated(callback: (jobStatus: JobStatus | null) => void): this;
    onLoading(callback: () => void): this;
    onFinishedLoading(callback: () => void): this;
    onError(callback: (error: Error) => void): this;
    triggerUpdate(jobStatus: JobStatus | null): void;
    triggerLoading(): void;
    triggerFinishedLoading(): void;
    triggerError(error: Error): void;
}
export default JobStatusNotifier;
