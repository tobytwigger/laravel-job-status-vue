import {AxiosResponse} from "axios";
import JobStatusObserver from "../core/JobStatusObserver";

interface ComponentData {
    status: JobStatus|null;
    loading: boolean;
    statusId: number|null;
    error: string|null;
    jobStatusObserver: JobStatusObserver;
}

interface DefaultProps {
    status: string;
    lastMessage: string;
    complete: boolean;
    cancel(): Promise<null>|null,
    signal(signal: string, cancelJob: boolean, parameters: AssociativeObject): Promise<null>|null
}

interface JobStatus {
    created_at: string
    id: number
    isFinished: boolean
    job_alias: string
    job_class: string
    lastMessage: string
    status: string
    updated_at: string
    percentage: number
    run_count: number
}

interface AssociativeObject {
    [key: string]: string;
}