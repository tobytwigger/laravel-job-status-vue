import { AssociativeObject } from "../types/core";
declare class ApiUrlGenerator {
    url: string;
    constructor(baseUrl: string);
    withPrefix(prefix: string): string;
    searchForJobStatus(jobAlias: string, tags: AssociativeObject): string;
    sendSignal(jobStatusId: number): string;
}
export default ApiUrlGenerator;
