"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PolicyViolationActionTypes;
(function (PolicyViolationActionTypes) {
    PolicyViolationActionTypes["PolicyEvaluationFailure"] = "[PolicyViolation] Policy Evaluation Failure";
    PolicyViolationActionTypes["EvaluateSavedEnclaveModel"] = "[PolicyViolation] Evaluate Saved Enclave Model";
    PolicyViolationActionTypes["EvaluateSavedEnclaveModelSuccess"] = "[PolicyViolation] Evaluate Saved Enclave Model Success";
    PolicyViolationActionTypes["EvaluateUnsavedEnclaveModel"] = "[PolicyViolation] Evaluate Unsaved Enclave Model";
    PolicyViolationActionTypes["EvaluateUnsavedEnclaveModelSuccess"] = "[PolicyViolation] Evaluate Unsaved Enclave Model Success";
    PolicyViolationActionTypes["EvaluateUnsavedPolicyGroup"] = "[PolicyViolation] Evaluate Unsaved PolicyGroup";
    PolicyViolationActionTypes["EvaluateSavedPolicyGroup"] = "[PolicyViolation] Evaluated Saved PolicyGroup";
    PolicyViolationActionTypes["EvaluatePolicyGroupSuccess"] = "[PolicyViolation] Evaluate PolicyGroup Success";
    PolicyViolationActionTypes["EvaluateLogicalDeployment"] = "[PolicyViolation] Evaluate Logical Deployment";
    PolicyViolationActionTypes["EvaluateLogicalDeploymentSuccess"] = "[PolicyViolation] Evaluate Logical Deployment Success";
    PolicyViolationActionTypes["EvaluateGenericSuccess"] = "[PolicyViolation] Evaluate Generic Success";
    PolicyViolationActionTypes["ClearEvaluation"] = "[PolicyViolation] Clear Evaluation";
})(PolicyViolationActionTypes = exports.PolicyViolationActionTypes || (exports.PolicyViolationActionTypes = {}));
class PolicyEvaluationFailure {
    constructor() {
        this.type = PolicyViolationActionTypes.PolicyEvaluationFailure;
    }
}
exports.PolicyEvaluationFailure = PolicyEvaluationFailure;
class EvaluateUnsavedEnclaveModel {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyViolationActionTypes.EvaluateUnsavedEnclaveModel;
    }
}
exports.EvaluateUnsavedEnclaveModel = EvaluateUnsavedEnclaveModel;
class EvaluateUnsavedEnclaveModelSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyViolationActionTypes.EvaluateUnsavedEnclaveModelSuccess;
    }
}
exports.EvaluateUnsavedEnclaveModelSuccess = EvaluateUnsavedEnclaveModelSuccess;
class EvaluateSavedEnclaveModel {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyViolationActionTypes.EvaluateSavedEnclaveModel;
    }
}
exports.EvaluateSavedEnclaveModel = EvaluateSavedEnclaveModel;
class EvaluateSavedEnclaveModelSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyViolationActionTypes.EvaluateSavedEnclaveModelSuccess;
    }
}
exports.EvaluateSavedEnclaveModelSuccess = EvaluateSavedEnclaveModelSuccess;
class EvaluateUnsavedPolicyGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyViolationActionTypes.EvaluateUnsavedPolicyGroup;
    }
}
exports.EvaluateUnsavedPolicyGroup = EvaluateUnsavedPolicyGroup;
class EvaluateSavedPolicyGroup {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyViolationActionTypes.EvaluateSavedPolicyGroup;
    }
}
exports.EvaluateSavedPolicyGroup = EvaluateSavedPolicyGroup;
class EvaluatePolicyGroupSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyViolationActionTypes.EvaluatePolicyGroupSuccess;
    }
}
exports.EvaluatePolicyGroupSuccess = EvaluatePolicyGroupSuccess;
class EvaluateLogicalDeployment {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyViolationActionTypes.EvaluateLogicalDeployment;
    }
}
exports.EvaluateLogicalDeployment = EvaluateLogicalDeployment;
class EvaluateLogicalDeploymentSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyViolationActionTypes.EvaluateLogicalDeploymentSuccess;
    }
}
exports.EvaluateLogicalDeploymentSuccess = EvaluateLogicalDeploymentSuccess;
class EvaluateGenericSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = PolicyViolationActionTypes.EvaluateGenericSuccess;
    }
}
exports.EvaluateGenericSuccess = EvaluateGenericSuccess;
class ClearEvaluation {
    constructor() {
        this.type = PolicyViolationActionTypes.ClearEvaluation;
    }
}
exports.ClearEvaluation = ClearEvaluation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXZpb2xhdGlvbi5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3BvbGljeS12aW9sYXRpb24vc3RhdGUvcG9saWN5LXZpb2xhdGlvbi5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBWUEsSUFBWSwwQkFtQlg7QUFuQkQsV0FBWSwwQkFBMEI7SUFDcEMscUdBQXVFLENBQUE7SUFFdkUsMEdBQTRFLENBQUE7SUFDNUUseUhBQTJGLENBQUE7SUFFM0YsOEdBQWdGLENBQUE7SUFDaEYsNkhBQStGLENBQUE7SUFFL0YsMkdBQTZFLENBQUE7SUFDN0Usd0dBQTBFLENBQUE7SUFDMUUsMkdBQTZFLENBQUE7SUFFN0UseUdBQTJFLENBQUE7SUFDM0Usd0hBQTBGLENBQUE7SUFFMUYsbUdBQXFFLENBQUE7SUFFckUsb0ZBQXNELENBQUE7QUFDeEQsQ0FBQyxFQW5CVywwQkFBMEIsR0FBMUIsa0NBQTBCLEtBQTFCLGtDQUEwQixRQW1CckM7QUFFRCxNQUFhLHVCQUF1QjtJQUFwQztRQUNXLFNBQUksR0FBRywwQkFBMEIsQ0FBQyx1QkFBdUIsQ0FBQztJQUNyRSxDQUFDO0NBQUE7QUFGRCwwREFFQztBQUVELE1BQWEsMkJBQTJCO0lBRXRDLFlBQW1CLE9BQXlCO1FBQXpCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBRG5DLFNBQUksR0FBRywwQkFBMEIsQ0FBQywyQkFBMkIsQ0FBQztJQUN2QixDQUFDO0NBQ2xEO0FBSEQsa0VBR0M7QUFDRCxNQUFhLGtDQUFrQztJQUU3QyxZQUFtQixPQUE2QztRQUE3QyxZQUFPLEdBQVAsT0FBTyxDQUFzQztRQUR2RCxTQUFJLEdBQUcsMEJBQTBCLENBQUMsa0NBQWtDLENBQUM7SUFDVixDQUFDO0NBQ3RFO0FBSEQsZ0ZBR0M7QUFFRCxNQUFhLHlCQUF5QjtJQUVwQyxZQUFtQixPQUE2RTtRQUE3RSxZQUFPLEdBQVAsT0FBTyxDQUFzRTtRQUR2RixTQUFJLEdBQUcsMEJBQTBCLENBQUMseUJBQXlCLENBQUM7SUFDK0IsQ0FBQztDQUN0RztBQUhELDhEQUdDO0FBQ0QsTUFBYSxnQ0FBZ0M7SUFFM0MsWUFBbUIsT0FBc0M7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBK0I7UUFEaEQsU0FBSSxHQUFHLDBCQUEwQixDQUFDLGdDQUFnQyxDQUFDO0lBQ2YsQ0FBQztDQUMvRDtBQUhELDRFQUdDO0FBRUQsTUFBYSwwQkFBMEI7SUFFckMsWUFBbUIsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFEdkMsU0FBSSxHQUFHLDBCQUEwQixDQUFDLDBCQUEwQixDQUFDO0lBQ2xCLENBQUM7Q0FDdEQ7QUFIRCxnRUFHQztBQUNELE1BQWEsd0JBQXdCO0lBRW5DLFlBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRywwQkFBMEIsQ0FBQyx3QkFBd0IsQ0FBQztJQUM5QixDQUFDO0NBQ3hDO0FBSEQsNERBR0M7QUFDRCxNQUFhLDBCQUEwQjtJQUVyQyxZQUFtQixPQUFvQztRQUFwQyxZQUFPLEdBQVAsT0FBTyxDQUE2QjtRQUQ5QyxTQUFJLEdBQUcsMEJBQTBCLENBQUMsMEJBQTBCLENBQUM7SUFDWCxDQUFDO0NBQzdEO0FBSEQsZ0VBR0M7QUFFRCxNQUFhLHlCQUF5QjtJQUVwQyxZQUFtQixPQUFpRDtRQUFqRCxZQUFPLEdBQVAsT0FBTyxDQUEwQztRQUQzRCxTQUFJLEdBQUcsMEJBQTBCLENBQUMseUJBQXlCLENBQUM7SUFDRyxDQUFDO0NBQzFFO0FBSEQsOERBR0M7QUFDRCxNQUFhLGdDQUFnQztJQUUzQyxZQUFtQixPQUFrRDtRQUFsRCxZQUFPLEdBQVAsT0FBTyxDQUEyQztRQUQ1RCxTQUFJLEdBQUcsMEJBQTBCLENBQUMsZ0NBQWdDLENBQUM7SUFDSCxDQUFDO0NBQzNFO0FBSEQsNEVBR0M7QUFFRCxNQUFhLHNCQUFzQjtJQUVqQyxZQUFtQixPQUE2RDtRQUE3RCxZQUFPLEdBQVAsT0FBTyxDQUFzRDtRQUR2RSxTQUFJLEdBQUcsMEJBQTBCLENBQUMsc0JBQXNCLENBQUM7SUFDa0IsQ0FBQztDQUN0RjtBQUhELHdEQUdDO0FBRUQsTUFBYSxlQUFlO0lBQTVCO1FBQ1csU0FBSSxHQUFHLDBCQUEwQixDQUFDLGVBQWUsQ0FBQztJQUM3RCxDQUFDO0NBQUE7QUFGRCwwQ0FFQyJ9