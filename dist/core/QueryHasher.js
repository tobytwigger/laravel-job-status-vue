"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryHasher = (function () {
    function QueryHasher() {
    }
    QueryHasher.encode = function (jobAlias, tags) {
        return encodeURIComponent(JSON.stringify({ jobAlias: jobAlias, tags: tags }));
    };
    return QueryHasher;
}());
exports.default = QueryHasher;
//# sourceMappingURL=QueryHasher.js.map