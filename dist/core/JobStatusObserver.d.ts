/// <reference types="node" />
import { AssociativeObject } from "../types/core";
import JobStatusNotifier from "./JobStatusNotifier";
declare class JobStatusObserver {
    interval: NodeJS.Timer | null;
    poll(jobAlias: string, tags: AssociativeObject, ms?: number): JobStatusNotifier;
    getNotifier(jobAlias: string, tags: AssociativeObject): JobStatusNotifier;
    update(jobAlias: string, tags: AssociativeObject): void;
    private addInterval;
    cleanup(jobAlias: string, tags: AssociativeObject): void;
}
export default JobStatusObserver;
