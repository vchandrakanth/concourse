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
class BaselineAsset extends serde_1.VersionedEntity {
    get routerLink() {
        return ['/baseline-assets/', `${this.id}`];
    }
    populate({ groupEntities, approvalRequests, policyViolations, attributeTags, stats, content, overview }) {
        return this.copyWith(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ owningGroup: groupEntities[this.owningGroupId] }, (!helpers_1.Util.isUndefined(approvalRequests) ? { approvalRequests: approvalRequests.filter(ar => ar.requestEntityId === this.id) } : {})), (!helpers_1.Util.isUndefined(policyViolations) ? { policyResolutions: policyViolations.filter(pr => pr.modelId === this.id) } : {})), (!helpers_1.Util.isUndefined(attributeTags) ? { attributeTags: this.attributeTags.map(at => attributeTags[at.id] || at) } : {})), (!helpers_1.Util.isUndefined(stats) ? { stats } : {})), (!helpers_1.Util.isUndefined(content) ? { content } : {})), (!helpers_1.Util.isUndefined(overview) ? { overview } : {})));
    }
    get isAzure() {
        return this.cloudProvider === 'AZURE';
    }
}
__decorate([
    serde_1.Exclude()
], BaselineAsset.prototype, "owningGroup", void 0);
__decorate([
    serde_1.Exclude()
], BaselineAsset.prototype, "policyResolutions", void 0);
__decorate([
    serde_1.Exclude()
], BaselineAsset.prototype, "approvalRequests", void 0);
__decorate([
    serde_1.Exclude()
], BaselineAsset.prototype, "attributeTags", void 0);
__decorate([
    serde_1.Exclude()
], BaselineAsset.prototype, "stats", void 0);
__decorate([
    serde_1.Exclude()
], BaselineAsset.prototype, "content", void 0);
__decorate([
    serde_1.Exclude()
], BaselineAsset.prototype, "overview", void 0);
exports.BaselineAsset = BaselineAsset;
class AzureBaselineData {
}
exports.AzureBaselineData = AzureBaselineData;
class AwsBaselineData {
}
exports.AwsBaselineData = AwsBaselineData;
class BaselineAssetStats extends serde_1.VersionedEntity {
}
exports.BaselineAssetStats = BaselineAssetStats;
class BaselineAssetC {
}
exports.BaselineAssetC = BaselineAssetC;
class BaselineAssetContent extends serde_1.VersionedEntity {
}
exports.BaselineAssetContent = BaselineAssetContent;
class BaselineOverview extends serde_1.VersionedEntity {
}
exports.BaselineOverview = BaselineOverview;
class BaselineAzureData {
}
exports.BaselineAzureData = BaselineAzureData;
class BaselineAwsData {
}
exports.BaselineAwsData = BaselineAwsData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RlbHMvYmFzZWxpbmUtYXNzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx1REFBaUQ7QUFHakQsbUNBQTBFO0FBSTFFLE1BQWEsYUFBYyxTQUFRLHVCQUE4QjtJQW1CL0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNELFFBQVEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBUXBHO1FBQ0MsT0FBTyxJQUFJLENBQUMsUUFBUSx1RkFDbEIsV0FBVyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQzNDLENBQUMsQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQ2hJLENBQUMsQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQ3pILENBQUMsQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQ3JILENBQUMsQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FDM0MsQ0FBQyxDQUFDLGNBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUMvQyxDQUFDLENBQUMsY0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQ3BELENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQztJQUN4QyxDQUFDO0NBRUY7QUFsQ1k7SUFBVixlQUFPLEVBQUU7a0RBQXFCO0FBQ3BCO0lBQVYsZUFBTyxFQUFFO3dEQUF3QztBQUN2QztJQUFWLGVBQU8sRUFBRTt1REFBcUM7QUFDcEM7SUFBVixlQUFPLEVBQUU7b0RBQWdDO0FBQy9CO0lBQVYsZUFBTyxFQUFFOzRDQUE4QjtBQUM3QjtJQUFWLGVBQU8sRUFBRTs4Q0FBa0M7QUFDakM7SUFBVixlQUFPLEVBQUU7K0NBQWdCO0FBbEI1QixzQ0E4Q0M7QUFFRCxNQUFhLGlCQUFpQjtDQVE3QjtBQVJELDhDQVFDO0FBRUQsTUFBYSxlQUFlO0NBTzNCO0FBUEQsMENBT0M7QUFFRCxNQUFhLGtCQUFtQixTQUFRLHVCQUFtQztDQVUxRTtBQVZELGdEQVVDO0FBRUQsTUFBYSxjQUFjO0NBUzFCO0FBVEQsd0NBU0M7QUFDRCxNQUFhLG9CQUFxQixTQUFRLHVCQUFxQztDQU05RTtBQU5ELG9EQU1DO0FBRUQsTUFBYSxnQkFBaUIsU0FBUSx1QkFBaUM7Q0FRdEU7QUFSRCw0Q0FRQztBQUVELE1BQWEsaUJBQWlCO0NBUTdCO0FBUkQsOENBUUM7QUFFRCxNQUFhLGVBQWU7Q0FRM0I7QUFSRCwwQ0FRQyJ9