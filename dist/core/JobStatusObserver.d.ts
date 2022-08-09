/// <reference types="node" />
import { AssociativeObject } from "../types/core";
import JobStatusNotifier from "./JobStatusNotifier";
import { Axios } from "axios";
declare class JobStatusObserver {
    interval: NodeJS.Timer | null;
    private readonly jobAlias;
    private readonly tags;
    constructor(jobAlias: string, tags: AssociativeObject);
    poll(ms?: number): JobStatusNotifier;
    static setupClient(url: string, a: Axios): void;
    update(): Promise<void>;
    cleanup(): void;
}
export default JobStatusObserver;
