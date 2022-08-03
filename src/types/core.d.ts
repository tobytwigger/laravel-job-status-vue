interface ComponentData {
    status: JobStatus|null;
    loading: boolean;
    statusId: bigint|null;
    error: string|null;
}

interface JobStatus {
    status: string;
    lastMessage: string;
    isFinished: boolean;
    cancel(): void,
    signal(signal: string): void
}