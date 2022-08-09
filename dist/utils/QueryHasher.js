"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryHasher = (function () {
    function QueryHasher() {
    }
    QueryHasher.encode = function (jobAlias, tags) {
        return encodeURIComponent(JSON.stringify({ jobAlias: jobAlias, tags: tags }));
    };
    QueryHasher.check = function (encoded, jobAlias, tags) {
        return encoded === this.encode(jobAlias, tags);
    };
    return QueryHasher;
}());
exports.default = QueryHasher;
//# sourceMappingURL=QueryHasher.js.map