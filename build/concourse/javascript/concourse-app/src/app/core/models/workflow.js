"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@concourse/shared/helpers");
const serde_1 = require("./serde");
class DiscoveredDeployment extends serde_1.EntityMetadata {
    get routerLink() {
        return ['/workflows/discovered-deployments/', `${this.id}`];
    }
}
__decorate([
    serde_1.Exclude()
], DiscoveredDeployment.prototype, "model", void 0);
__decorate([
    serde_1.Exclude()
], DiscoveredDeployment.prototype, "logicalDeployment", void 0);
exports.DiscoveredDeployment = DiscoveredDeployment;
class LogicalDeployment extends serde_1.EntityMetadata {
    get routerLink() {
        return ['/workflows/logical-deployments/', `${this.surfaceLayerId}`, `${this.id}`];
    }
}
__decorate([
    serde_1.Exclude()
], LogicalDeployment.prototype, "surfaceLayer", void 0);
__decorate([
    serde_1.Exclude()
], LogicalDeployment.prototype, "model", void 0);
__decorate([
    serde_1.Exclude()
], LogicalDeployment.prototype, "requester", void 0);
__decorate([
    serde_1.Exclude()
], LogicalDeployment.prototype, "discoveredDeployment", void 0);
__decorate([
    serde_1.Exclude()
], LogicalDeployment.prototype, "approvalRequests", void 0);
__decorate([
    serde_1.Exclude()
], LogicalDeployment.prototype, "policyResolutions", void 0);
exports.LogicalDeployment = LogicalDeployment;
class ApprovalRequest extends serde_1.EntityMetadata {
    get routerLink() {
        return ['/workflows/approvals/', `${this.id}`];
    }
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.approvalActions)) {
            this.approvalActions = input.approvalActions.map(item => new ApprovalAction().deserialize(item));
        }
        return this;
    }
    serialize() {
        console.error('ApprovalRequest.serialize() not implemented');
    }
}
__decorate([
    serde_1.Exclude()
], ApprovalRequest.prototype, "approvalGroups", void 0);
__decorate([
    serde_1.Exclude()
], ApprovalRequest.prototype, "requester", void 0);
__decorate([
    serde_1.Exclude()
], ApprovalRequest.prototype, "approvalUsers", void 0);
__decorate([
    serde_1.Exclude()
], ApprovalRequest.prototype, "assignedUser", void 0);
__decorate([
    serde_1.Exclude()
], ApprovalRequest.prototype, "discoveredAwsDeployment", void 0);
__decorate([
    serde_1.Exclude()
], ApprovalRequest.prototype, "requestEntity", void 0);
exports.ApprovalRequest = ApprovalRequest;
class ApprovalAction extends serde_1.EntityMetadata {
    populate({ userEntities, groupEntities }) {
        return this.copyWith({
            assignedUser: userEntities[this.assignedUserId],
            assignedGroup: groupEntities[this.assignedGroupId]
        });
    }
}
exports.ApprovalAction = ApprovalAction;
class Summary extends serde_1.Serde {
    get name() {
        return this.title;
    }
    get routerLink() {
        switch (this.workflowType) {
            case 'POLICY_VIOLATION_RESOLUTION': {
                return ['/workflows/risks/', `${this.id}`];
            }
            case 'APPROVAL': {
                return ['/workflows/approvals/', `${this.id}`];
            }
            default:
                console.error('%s is not a supported Summary type', this.workflowType);
                break;
        }
    }
    serialize() {
        console.error('Summary.serialize() is not implemented');
    }
}
exports.Summary = Summary;
class PolicyResolution extends serde_1.EntityMetadata {
    get routerLink() {
        return ['/workflows/risks/', `${this.id}`];
    }
    serialize() {
        console.error('PolicyViolationResolutionRequest.serialize() not implemented');
    }
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.actions)) {
            this.actions = input.actions.map(item => new ApprovalAction().deserialize(item));
        }
        return this;
    }
    populate({ userEntities, assetEntities, surfaceLayerEntities, policyGroupEntities, groupEntities, logicalDeploymentEntities }) {
        return this.copyWith({
            assignee: userEntities[this.assigneeId],
            model: assetEntities[`enclave-${this.modelId}`],
            surfaceLayer: surfaceLayerEntities[this.surfaceLayerId],
            policyGroup: policyGroupEntities[this.policyGroupId],
            requester: userEntities[this.requesterId],
            groups: this.resolutionGroups.map(id => groupEntities[id]),
            deployment: logicalDeploymentEntities[this.deploymentId],
            actions: this.actions.map(a => a.populate({ groupEntities, userEntities }))
        });
    }
}
__decorate([
    serde_1.Exclude()
], PolicyResolution.prototype, "model", void 0);
__decorate([
    serde_1.Exclude()
], PolicyResolution.prototype, "requester", void 0);
__decorate([
    serde_1.Exclude()
], PolicyResolution.prototype, "assignee", void 0);
__decorate([
    serde_1.Exclude()
], PolicyResolution.prototype, "groups", void 0);
__decorate([
    serde_1.Exclude()
], PolicyResolution.prototype, "policyGroup", void 0);
__decorate([
    serde_1.Exclude()
], PolicyResolution.prototype, "surfaceLayer", void 0);
__decorate([
    serde_1.Exclude()
], PolicyResolution.prototype, "deployment", void 0);
exports.PolicyResolution = PolicyResolution;
class ResolutionAction extends serde_1.EntityMetadata {
    populate({ groupEntities, userEntities }) {
        return this.copyWith({
            assignedGroup: groupEntities[this.assignedGroupId],
            assignedUser: userEntities[this.assignedUserId],
            createdByUser: userEntities[this.createdBy],
            updatedByUser: userEntities[this.updatedBy]
        });
    }
}
exports.ResolutionAction = ResolutionAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RlbHMvd29ya2Zsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx1REFBaUQ7QUFLakQsbUNBQXlEO0FBR3pELE1BQWEsb0JBQXFCLFNBQVEsc0JBQW9DO0lBcUI1RSxJQUFJLFVBQVU7UUFDWixPQUFPLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0Y7QUFOWTtJQUFWLGVBQU8sRUFBRTttREFBaUI7QUFDaEI7SUFBVixlQUFPLEVBQUU7K0RBQW9CO0FBbkJoQyxvREF3QkM7QUFFRCxNQUFhLGlCQUFrQixTQUFRLHNCQUFpQztJQXVCdEUsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckYsQ0FBQztDQUNGO0FBVlk7SUFBVixlQUFPLEVBQUU7dURBQTZCO0FBQzVCO0lBQVYsZUFBTyxFQUFFO2dEQUFlO0FBQ2Q7SUFBVixlQUFPLEVBQUU7b0RBQWtCO0FBQ2pCO0lBQVYsZUFBTyxFQUFFOytEQUE2QztBQUM1QztJQUFWLGVBQU8sRUFBRTsyREFBc0M7QUFDckM7SUFBVixlQUFPLEVBQUU7NERBQXdDO0FBckJwRCw4Q0EwQkM7QUFFRCxNQUFhLGVBQWdCLFNBQVEsc0JBQStCO0lBMkJsRSxJQUFJLFVBQVU7UUFDWixPQUFPLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixNQUFNLENBQUMsTUFBTSxDQUFD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