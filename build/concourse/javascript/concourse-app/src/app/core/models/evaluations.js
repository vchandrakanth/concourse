"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const serde_1 = require("./serde");
class CommonEvaluation extends serde_1.Serde {
    deserialize(input) {
        Object.assign(this, input);
        return this;
    }
    get hasViolations() {
        return this.state === 'FAILED' || (!this.proofsPassed && helpers_1.Util.isArray(this.policyViolations) && this.policyViolations.length > 0);
    }
    get proofsPassed() {
        return this.state === 'PASSED';
    }
    get proofsFailed() {
        return this.state === 'FAILED';
    }
}
exports.CommonEvaluation = CommonEvaluation;
// generated from proto/com/concoursehub/internal/service/orchestration/orchestration_service.proto
// generated with: https://geotho.github.io/protobuf-to-typescript/
var ModelType;
(function (ModelType) {
    ModelType[ModelType["UNKNOWN"] = 0] = "UNKNOWN";
    ModelType[ModelType["APPLICATION"] = 1] = "APPLICATION";
    ModelType[ModelType["ENCLAVE"] = 2] = "ENCLAVE";
})(ModelType = exports.ModelType || (exports.ModelType = {}));
var Severity;
(function (Severity) {
    Severity[Severity["UNKNOWN"] = 0] = "UNKNOWN";
    Severity[Severity["HIGH"] = 1] = "HIGH";
    Severity[Severity["MEDIUM"] = 2] = "MEDIUM";
    Severity[Severity["LOW"] = 3] = "LOW";
})(Severity = exports.Severity || (exports.Severity = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RlbHMvZXZhbHVhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBaUQ7QUFFakQsbUNBQWdDO0FBRWhDLE1BQWEsZ0JBQWlCLFNBQVEsYUFBdUI7SUFPM0QsV0FBVyxDQUFDLEtBQUs7UUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFHZixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLGNBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwSSxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQztJQUNqQyxDQUFDO0NBQ0Y7QUF6QkQsNENBeUJDO0FBRUQsbUdBQW1HO0FBQ25HLG1FQUFtRTtBQUVuRSxJQUFZLFNBSVg7QUFKRCxXQUFZLFNBQVM7SUFDbkIsK0NBQVcsQ0FBQTtJQUNYLHVEQUFlLENBQUE7SUFDZiwrQ0FBVyxDQUFBO0FBQ2IsQ0FBQyxFQUpXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBSXBCO0FBRUQsSUFBWSxRQUtYO0FBTEQsV0FBWSxRQUFRO0lBQ2xCLDZDQUFXLENBQUE7SUFDWCx1Q0FBUSxDQUFBO0lBQ1IsMkNBQVUsQ0FBQTtJQUNWLHFDQUFPLENBQUE7QUFDVCxDQUFDLEVBTFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFLbkIifQ==