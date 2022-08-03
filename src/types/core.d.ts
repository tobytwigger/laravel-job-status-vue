import {AxiosResponse} from "axios";

interface ComponentData {
    status: JobStatus|null;
    loading: boolean;
    statusId: bigint|null;
    error: string|null;
}

interface DefaultProps {
    status: string;
    lastMessage: string;
    complete: boolean;
    cancel(): Promise<AxiosResponse>,
    signal(signal: string): Promise<AxiosResponse>
}

interface JobStatus {
    created_at: string
    id: bigint
    isFinished: boolean
    job_alias: string
    job_class: string
    lastMessage: string
    status: string
    updated_at: string
    percentage: number
    run_count: bigint
}

interface AssociativeObject {
    [key: string]: string;
}