import {AssociativeObject} from "../types/core";

class QueryHasher {
    static encode(jobAlias: string, tags: AssociativeObject): string {
        return encodeURIComponent(JSON.stringify({jobAlias, tags}));
    }

    static check(encoded: string, jobAlias: string, tags: AssociativeObject): boolean {
        return encoded === this.encode(jobAlias, tags);
    }
}

export default QueryHasher;