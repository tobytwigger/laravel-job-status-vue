import { AssociativeObject } from "../types/core";
declare class QueryHasher {
    static encode(jobAlias: string, tags: AssociativeObject): string;
}
export default QueryHasher;
