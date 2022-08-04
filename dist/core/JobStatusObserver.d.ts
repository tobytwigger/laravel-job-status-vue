import { AssociativeObject } from "../types/core";
import JobStatusNotifier from "./JobStatusNotifier";
declare class JobStatusObserver {
    static getInstance(): JobStatusObserver;
    poll(jobAlias: string, tags: AssociativeObject, ms?: number): JobStatusNotifier;
    bindToStatus(jobAlias: string, tags: AssociativeObject): JobStatusNotifier;
    update(jobAlias: string, tags: AssociativeObject): void;
}
export default JobStatusObserver;
