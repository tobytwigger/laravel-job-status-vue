import { AssociativeObject } from "../types/core";
declare class QueryHasher {
    static encode(jobAlias: string, tags: AssociativeObject): string;
    static check(encoded: string, jobAlias: string, tags: AssociativeObject): boolean;
}
export default QueryHasher;
