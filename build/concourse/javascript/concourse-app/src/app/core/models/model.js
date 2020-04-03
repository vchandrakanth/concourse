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
class ModelEntity extends serde_1.VersionedEntity {
    get routerLink() {
        return ['/assets/', this.assetType, `${this.id}`];
    }
    get hasOwningGroup() {
        return !helpers_1.Util.isUndefined(this.owningGroupId);
    }
    get canEdit() {
        return (this.isLatest && this.managementStrategy === 'SELF_MANAGED') ||
            (this.managementStrategy === 'DISCOVERED' && !this.hasOwningGroup);
    }
    get canDeploy() {
        return this.approvalStatus !== 'PENDING_PUBLISH_APPROVAL' && this.status === 'PUBLISHED' && this.hasOwningGroup;
    }
}
__decorate([
    serde_1.Exclude()
], ModelEntity.prototype, "owningGroup", void 0);
__decorate([
    serde_1.Pluck(['id'])
], ModelEntity.prototype, "attributeTags", void 0);
__decorate([
    serde_1.Exclude()
], ModelEntity.prototype, "assetType", void 0);
class Application extends ModelEntity {
}
exports.Application = Application;
class Enclave extends ModelEntity {
    get routerLink() {
        return ['/assets/', 'enclave', `${this.id}`];
    }
    get deploymentCount() {
        return (this.logicalDeployments.length || 0) + (this.discoveredDeployments.length || 0);
    }
    get templateCount() {
        return (!!this.cloudFormationTemplate ? 1 : 0) + (this.nestedTemplates.length || 0);
    }
    populate({ groupEntities, attributeTagEntities, approvalRequests, logicalDeployments, discoveredDeployments, policyViolations }) {
        return this.copyWith(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ owningGroup: groupEntities[this.owningGroupId] }, (!helpers_1.Util.isUndefined(attributeTagEntities) ? { approvalRequests: approvalRequests.filter(ar => ar.requestEntityId === this.id) } : {})), (!helpers_1.Util.isUndefined(logicalDeployments) ? { logicalDeployments: logicalDeployments.filter(ld => ld.modelId === this.id) } : {})), (!helpers_1.Util.isUndefined(discoveredDeployments) ? { discoveredDeployments: discoveredDeployments.filter(dd => dd.modelId === this.id) } : {})), (!helpers_1.Util.isUndefined(policyViolations) ? { policyResolutions: policyViolations.filter(pr => pr.modelId === this.id) } : {})), (!helpers_1.Util.isUndefined(attributeTagEntities) ? { attributeTags: this.attributeTags.map(at => attributeTagEntities[at.id] || at) } : {})));
    }
}
__decorate([
    serde_1.Exclude()
], Enclave.prototype, "templateFormat", void 0);
__decorate([
    serde_1.Exclude()
], Enclave.prototype, "discoveredDeployments", void 0);
__decorate([
    serde_1.Exclude()
], Enclave.prototype, "approvalRequest", void 0);
__decorate([
    serde_1.Exclude()
], Enclave.prototype, "policyResolutions", void 0);
__decorate([
    serde_1.Exclude()
], Enclave.prototype, "approvalRequests", void 0);
__decorate([
    serde_1.Exclude()
], Enclave.prototype, "logicalDeployments", void 0);
exports.Enclave = Enclave;
class ResourceTemplate extends serde_1.EntityMetadata {
}
__decorate([
    serde_1.Exclude()
], ResourceTemplate.prototype, "textFormat", void 0);
exports.ResourceTemplate = ResourceTemplate;
class AttributeTag extends serde_1.EntityMetadata {
    get routerLink() {
        return ['/attribute-tags/', `${this.id}`];
    }
    get canDelete() {
        return !this.hasPolicyGroups && !this.hasEnclaveModels;
    }
    get hasPolicyGroups() {
        return helpers_1.Util.isArray(this.policyGroups) && this.policyGroups.length > 0;
    }
    get hasEnclaveModels() {
        return helpers_1.Util.isArray(this.enclaveModels) && this.enclaveModels.length > 0;
    }
}
__decorate([
    serde_1.Exclude()
], AttributeTag.prototype, "policyGroups", void 0);
__decorate([
    serde_1.Exclude()
], AttributeTag.prototype, "enclaveModels", void 0);
exports.AttributeTag = AttributeTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RlbHMvbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx1REFBaUQ7QUFHakQsbUNBQTBFO0FBSTFFLE1BQU0sV0FBZSxTQUFRLHVCQUFrQjtJQWE3QyxJQUFJLFVBQVU7UUFDWixPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLGNBQWMsQ0FBQztZQUNsRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSywwQkFBMEIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQ2xILENBQUM7Q0FDRjtBQXBCWTtJQUFWLGVBQU8sRUFBRTtnREFBcUI7QUFDaEI7SUFBZCxhQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztrREFBeUM7QUFDNUM7SUFBVixlQUFPLEVBQUU7OENBQXVCO0FBb0JuQyxNQUFhLFdBQVksU0FBUSxXQUF3QjtDQUFJO0FBQTdELGtDQUE2RDtBQUU3RCxNQUFhLE9BQVEsU0FBUSxXQUFvQjtJQVkvQyxJ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