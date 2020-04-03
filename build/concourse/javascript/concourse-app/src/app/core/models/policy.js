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
class Attribute extends serde_1.EntityMetadata {
}
__decorate([
    serde_1.Pluck(['id'])
], Attribute.prototype, "policyTemplate", void 0);
exports.Attribute = Attribute;
class AttributeValue extends serde_1.EntityMetadata {
    get parsedValue() {
        const parsed = JSON.parse(this.value);
        if (this.attribute instanceof Attribute && this.attribute.multipleValued) {
            return parsed;
        }
        return parsed[0];
    }
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.attribute)) {
            this.attribute = new Attribute().deserialize(input.attribute);
        }
        return this;
    }
}
__decorate([
    serde_1.Pluck(['id'])
], AttributeValue.prototype, "attribute", void 0);
__decorate([
    serde_1.Exclude()
], AttributeValue.prototype, "policy", void 0);
__decorate([
    serde_1.Exclude()
], AttributeValue.prototype, "entityValues", void 0);
exports.AttributeValue = AttributeValue;
class Policy extends serde_1.EntityMetadata {
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.attributeValues)) {
            this.attributeValues = input.attributeValues.map(av => new AttributeValue().deserialize(av));
        }
        return this;
    }
}
__decorate([
    serde_1.Pluck(['id'])
], Policy.prototype, "policyTemplate", void 0);
__decorate([
    serde_1.Exclude()
], Policy.prototype, "policyGroup", void 0);
exports.Policy = Policy;
class PolicyGroup extends serde_1.VersionedEntity {
    get routerLink() {
        return ['/policy-groups/', `${this.id}`];
    }
    get canEdit() {
        return this.isLatest || this.approvalStatus !== 'PENDING_DELETION_APPROVAL';
    }
    get canDelete() {
        return this.approvalStatus === 'PENDING_DELETION_APPROVAL';
    }
    get latestDraft() {
        return this.lineage.find(pg => pg.isLatest && pg.status === 'DRAFT');
    }
    get hasApprovalPolicy() {
        return this.approvalRequests && this.approvalRequests.length > 0 ? true : false;
    }
    get surfaceLayersNotInCurrentSurfaceCount() {
        return this.surfaceLayerIds.length - (this.surfaceLayers || []).length;
    }
    inSurface(id) {
        return this.surfaceLayerIds.includes(id);
    }
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.policies)) {
            this.policies = input.policies.map(p => new Policy().deserialize(p));
        }
        return this;
    }
}
__decorate([
    serde_1.Exclude()
], PolicyGroup.prototype, "approvalStatus", void 0);
__decorate([
    serde_1.Pluck(['id'])
], PolicyGroup.prototype, "policyGroupTemplate", void 0);
__decorate([
    serde_1.Exclude()
], PolicyGroup.prototype, "lineage", void 0);
__decorate([
    serde_1.Exclude()
], PolicyGroup.prototype, "attributeTags", void 0);
__decorate([
    serde_1.Exclude()
], PolicyGroup.prototype, "surfaceLayers", void 0);
__decorate([
    serde_1.Exclude()
], PolicyGroup.prototype, "approvalRequests", void 0);
__decorate([
    serde_1.Exclude()
], PolicyGroup.prototype, "owningGroup", void 0);
__decorate([
    serde_1.Exclude()
], PolicyGroup.prototype, "policyResolutions", void 0);
exports.PolicyGroup = PolicyGroup;
class PolicyGroupTemplate extends serde_1.VersionedEntity {
    get routerLink() {
        return ['/policy-group-templates/', `${this.id}`];
    }
    get hasPolicyGroups() {
        return this.policyGroups.length > 0;
    }
    hasPolicyTemplate(id) {
        return this.policyTemplates.findIndex(pt => pt.id === id) !== -1;
    }
    get canDelete() {
        return !this.hasPolicyGroups;
    }
}
__decorate([
    serde_1.Pluck(['id'])
], PolicyGroupTemplate.prototype, "policyTemplates", void 0);
__decorate([
    serde_1.Exclude()
], PolicyGroupTemplate.prototype, "policyGroups", void 0);
exports.PolicyGroupTemplate = PolicyGroupTemplate;
class PolicyTemplate extends serde_1.EntityMetadata {
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.attributes)) {
            this.attributes = input.attributes.map(a => new Attribute().deserialize(a));
        }
        return this;
    }
}
__decorate([
    serde_1.Pluck(['id'])
], PolicyTemplate.prototype, "attributes", void 0);
__decorate([
    serde_1.Exclude()
], PolicyTemplate.prototype, "policyGroupTemplates", void 0);
__decorate([
    serde_1.Exclude()
], PolicyTemplate.prototype, "policyTemplateFieldConfigs", void 0);
exports.PolicyTemplate = PolicyTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kZWxzL3BvbGljeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHVEQUFpRDtBQUlqRCxtQ0FBMEU7QUFJMUUsTUFBYSxTQUFVLFNBQVEsc0JBQXlCO0NBTXZEO0FBRGdCO0lBQWQsYUFBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7aURBQTBDO0FBTDFELDhCQU1DO0FBRUQsTUFBYSxjQUFlLFNBQVEsc0JBQThCO0lBT2hFLElBQUksV0FBVztRQUNiLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFNBQVMsWUFBWSxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUU7WUFDeEUsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUNELE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMvRDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBbkJnQjtJQUFkLGFBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2lEQUFnQztBQUNuQztJQUFWLGVBQU8sRUFBRTs4Q0FBeUI7QUFDeEI7SUFBVixlQUFPLEVB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