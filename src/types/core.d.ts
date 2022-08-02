interface ComponentData {
    status: JobStatus|null;
}

interface JobStatus {
    status: string;
    lastMessage: string;
    complete: boolean;
    cancel(): void,
    signal(signal: string): void
}