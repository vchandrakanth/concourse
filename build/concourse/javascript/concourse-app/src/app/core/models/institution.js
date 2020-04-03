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
class Institution extends serde_1.EntityMetadata {
    get isSAML() {
        return this.authenticationType === 'SAML';
    }
}
exports.Institution = Institution;
class Address {
}
exports.Address = Address;
class SurfaceLayer extends serde_1.EntityMetadata {
    get routerLink() {
        return ['/surfaces/', `${this.id}`];
    }
    get canDelete() {
        return (helpers_1.Util.isArray(this.policyGroups) && this.policyGroups.length === 0) && !this.isRoot && this.isLeaf;
    }
    get descendantIds() {
        return [
            this.id,
            ...this.children.reduce((ids, surfaceLayer) => {
                let newIds = [...ids, surfaceLayer.id];
                if (!surfaceLayer.isLeaf) {
                    newIds = [...newIds, ...surfaceLayer.descendantIds];
                }
                return newIds;
            }, [])
        ];
    }
    populate({ surfaceLayerEntities }) {
        if (this.isLeaf) {
            return this;
        }
        return this.copyWith({
            children: this.children
                .map(id => surfaceLayerEntities[id].populate({ surfaceLayerEntities }))
        });
    }
}
__decorate([
    serde_1.Pluck('id')
], SurfaceLayer.prototype, "children", void 0);
__decorate([
    serde_1.Exclude()
], SurfaceLayer.prototype, "isCollapsed", void 0);
__decorate([
    serde_1.Exclude()
], SurfaceLayer.prototype, "policyGroups", void 0);
__decorate([
    serde_1.Exclude()
], SurfaceLayer.prototype, "awsAccounts", void 0);
exports.SurfaceLayer = SurfaceLayer;
class Surface extends serde_1.EntityMetadata {
    get surfaceLayerIds() {
        return this.surfaceLayers.map(({ id }) => id);
    }
    get canDelete() {
        return this.surfaceLayerIds.length <= 1;
    }
    hasGroup(groupId) {
        return this.groupIds.includes(groupId);
    }
    populate({ surfaceLayers, groupEntities, awsAccounts }) {
        return this.copyWith({
            surfaceLayers,
            groups: (this.groupIds || []).reduce((acc, id) => {
                const group = groupEntities[id];
                return !group ? acc : [...acc, group];
            }, []),
            awsAccounts: (awsAccounts || []).reduce((acc, account) => {
                const awsAccount = account.enabledSurfaceIds.includes(this.id) ? account : undefined;
                return !awsAccount ? acc : [...acc, awsAccount];
            }, []),
        });
    }
}
__decorate([
    serde_1.Exclude()
], Surface.prototype, "groups", void 0);
__decorate([
    serde_1.Exclude()
], Surface.prototype, "surfaceLayers", void 0);
__decorate([
    serde_1.Exclude()
], Surface.prototype, "institutionData", void 0);
__decorate([
    serde_1.Exclude()
], Surface.prototype, "awsAccounts", void 0);
exports.Surface = Surface;
class IDPConfig extends serde_1.EntityMetadata {
}
exports.IDPConfig = IDPConfig;
class InstitutionData extends serde_1.EntityMetadata {
    get routerLink() {
        return ['/institution/data/', this.uri];
    }
    customSerialize(obj) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, obj), (!helpers_1.Util.isNullOrUndefined(obj.listValues) ?
            { listValues: obj.listValues.filter(v => v.length > 0) } : {})), (!helpers_1.Util.isNullOrUndefined(obj.singleMapValues) ? {
            singleMapValues: Object.entries(obj.singleMapValues).reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), (key.length > 0 && value.length > 0 ? { [key]: value } : {}))), {})
        } : {})), (!helpers_1.Util.isNullOrUndefined(obj.multiMapValues) ? {
            multiMapValues: Object.entries(obj.multiMapValues).reduce((acc, [key, values]) => {
                const newValues = values.filter(v => v.length > 0);
                return Object.assign(Object.assign({}, acc), (key.length > 0 && newValues.length > 0 ? { [key]: newValues } : {}));
            }, {})
        } : {}));
    }
}
__decorate([
    serde_1.Exclude()
], InstitutionData.prototype, "dataDomain", void 0);
__decorate([
    serde_1.Exclude()
], InstitutionData.prototype, "institution", void 0);
__decorate([
    serde_1.Exclude()
], InstitutionData.prototype, "surface", void 0);
__decorate([
    serde_1.Exclude()
], InstitutionData.prototype, "surfaceLayer", void 0);
exports.InstitutionData = InstitutionData;
class AwsAccountResource extends serde_1.EntityMetadata {
    inSurfaceLayers(surfaceLayerId) {
        return this.enabledSurfaceLayerIds.includes(surfaceLayerId);
    }
}
__decorate([
    serde_1.Exclude()
], AwsAccountResource.prototype, "surfaces", void 0);
exports.AwsAccountResource = AwsAccountResource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RlbHMvaW5zdGl0dXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx1REFBaUQ7QUFHakQsbUNBQXlEO0FBR3pELE1BQWEsV0FBWSxTQUFRLHNCQUEyQjtJQVkxRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxNQUFNLENBQUM7SUFDNUMsQ0FBQztDQUNGO0FBZkQsa0NBZUM7QUFFRCxNQUFhLE9BQU87Q0FNbkI7QUFORCwwQkFNQztBQUVELE1BQWEsWUFBYSxTQUFRLHNCQUE0QjtJQWU1RCxJQUFJLFVBQVU7UUFDWixPQUFPLENBQUMsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM1RyxDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTztZQUNMLElBQUksQ0FBQyxFQUFFO1lBQ1AsR0FBSSxJQUFJLENBQUMsUUFBMkIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hFLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtvQkFDeEIsTUFBTSxHQUFHLENBQUMsR0FBRyxN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