import {AssociativeObject} from "../types/core";

class QueryHasher {
    static encode(jobAlias: string, tags: AssociativeObject): string {
        return encodeURIComponent(JSON.stringify({jobAlias, tags}));
    }
}

export default QueryHasher;