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
class User extends serde_1.EntityMetadata {
    get groupIds() {
        return this.groups.map(({ id }) => id);
    }
    get hasGroups() {
        return this.groups.length > 0;
    }
    get isSAML() {
        return this.authenticationType === 'SAML';
    }
    get routerLink() {
        return ['/user-management/users/', `${this.id}`];
    }
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.groups)) {
            this.groups = input.groups.map(g => new Group().deserialize(g));
        }
        return this;
    }
    populate({ groupEntities, surfaceLayerEntities, surfaceId }) {
        return this.copyWith({
            groups: this.groupIds.reduce((acc, gId) => {
                const group = groupEntities[gId];
                return helpers_1.Util.isUndefined(group) ? acc : [...acc, group.populate({ surfaceLayerEntities, surfaceId })];
            }, [])
        });
    }
}
__decorate([
    serde_1.Exclude()
], User.prototype, "password", void 0);
__decorate([
    serde_1.Exclude()
], User.prototype, "authenticationType", void 0);
__decorate([
    serde_1.Exclude()
], User.prototype, "confirmationStatus", void 0);
__decorate([
    serde_1.Exclude()
], User.prototype, "groups", void 0);
exports.User = User;
class Group extends serde_1.EntityMetadata {
    get routerLink() {
        return ['/user-management/groups/', `${this.id}`];
    }
    get canDelete() {
        return !this.hasUsers && !this.hasAssignedRoles && !this.hasAssignedCloudRoles;
    }
    hasPermission(permission, surfaceId) {
        return this.assignedRoles
            .filter(ar => ar.inSurface(surfaceId))
            .findIndex(ar => ar.hasResponsibility(permission)) > -1;
    }
    get hasAssignedRoles() {
        return helpers_1.Util.isArray(this.assignedRoles) && this.assignedRoles.length > 0;
    }
    hasUser(userId) {
        return this.userIds.includes(userId);
    }
    get permissionsList() {
        return this.assignedRoles.reduce((acc, ar) => [...acc, ...ar.responsibilitiesList], []);
    }
    assignedRolesBySurfaceId(surfaceId) {
        return this.assignedRoles
            .filter(ar => ar.inSurface(surfaceId));
    }
    permissionListBySurfaceId(surfaceId) {
        return this.assignedRolesBySurfaceId(surfaceId)
            .reduce((acc, ar) => [...acc, ...ar.responsibilitiesList], []);
    }
    get userIds() {
        return this.hasUsers ? this.users.map(({ id }) => id) : [];
    }
    get hasUsers() {
        return !helpers_1.Util.isUndefined(this.users) && this.users.length > 0;
    }
    get userCount() {
        return helpers_1.Util.isArray(this.users) ? this.users.length : 0;
    }
    get hasAssignedCloudRoles() {
        return helpers_1.Util.isArray(this.cloudRoleAssignments) && this.cloudRoleAssignments.length > 0;
    }
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.assignedRoles)) {
            this.assignedRoles = input.assignedRoles.map(ra => new RoleAssignment().deserialize(ra));
        }
        return this;
    }
    populate({ surfaceLayerEntities, userEntities, surfaceId, surface, cloudRoles }) {
        return this.copyWith(Object.assign(Object.assign(Object.assign({}, (!helpers_1.Util.isUndefined(userEntities) ? {
            users: this.userIds.reduce((acc, id) => {
                const user = userEntities[id];
                return helpers_1.Util.isUndefined(user) ? acc : [...acc, user];
            }, [])
        } : {})), { assignedRoles: this.assignedRoles
                .map(ra => ra.populate({ surfaceLayerEntities, surface })) }), (!helpers_1.Util.isUndefined(cloudRoles) ? {
            cloudRoleAssignments: cloudRoles.reduce((acc, cloudRoleAssignment) => helpers_1.Util.isUndefined(cloudRoleAssignment) || cloudRoleAssignment.group.id !== this.id ? acc :
                [...acc, cloudRoleAssignment], [])
        } : [])));
    }
}
__decorate([
    serde_1.Exclude()
], Group.prototype, "users", void 0);
__decorate([
    serde_1.Exclude()
], Group.prototype, "assignedRoles", void 0);
__decorate([
    serde_1.Exclude()
], Group.prototype, "cloudRoleAssignments", void 0);
exports.Group = Group;
class RoleAssignment extends serde_1.EntityMetadata {
    get responsibilitiesList() {
        return this.responsibilitiesAssigned.reduce((acc, ra) => [...acc, ...ra.permissions], []);
    }
    get surfaceLayerIds() {
        return this.surfaceLayersAppliedTo.map(({ id }) => id);
    }
    hasResponsibility(responsibility) {
        return this.responsibilitiesList.includes(responsibility);
    }
    inSurface(surfaceId) {
        if (helpers_1.Util.isArray(this.surfaceLayersAppliedTo) && this.surfaceLayersAppliedTo.length !== 0) {
            return this.surfaceLayersAppliedTo.findIndex(sl => sl.surfaceId === surfaceId) > -1;
        }
        if (!helpers_1.Util.isNullOrUndefined(this.surface)) {
            return (this.surface.id || this.surface) === surfaceId;
        }
        return true;
    }
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.role)) {
            this.role = new Role().deserialize(input.role);
        }
        return this;
    }
    populate({ surfaceLayerEntities, surface, groupEntities }) {
        return this.copyWith(Object.assign(Object.assign(Object.assign({}, (!helpers_1.Util.isUndefined(surface) && !helpers_1.Util.isNullOrUndefined(this.surface) && surface.id === this.surface.id ? { surface } : {})), (!helpers_1.Util.isUndefined(groupEntities) ? { group: groupEntities[this.group.id] || this.group } : {})), { surfaceLayersAppliedTo: this.surfaceLayerIds.reduce((acc, surfaceLayerId) => {
                const surfaceLayer = surfaceLayerEntities[surfaceLayerId];
                return helpers_1.Util.isUndefined(surfaceLayer) ? acc : [...acc, surfaceLayer];
            }, []) }));
    }
}
exports.RoleAssignment = RoleAssignment;
class CloudRole extends serde_1.VersionedEntity {
    get canEdit() {
        return this.isLatest || this.managementStatus === 'SELF_MANAGED';
    }
    get hasAssignedCloudRoles() {
        return helpers_1.Util.isArray(this.cloudRoleAssignments) && this.cloudRoleAssignments.length > 0;
    }
    get routerLink() {
        return ['/cloud-roles/', `${this.id}`];
    }
    deserialize(input) {
        Object.assign(this, input);
        if (input.awsActions) {
            this.awsActions = input.awsActions.map(a => new AwsOperation().deserialize(a));
        }
        if (input.awsNonActions) {
            this.awsNonActions = input.awsNonActions.map(a => new AwsOperation().deserialize(a));
        }
        if (input.azureActions) {
            this.azureActions = input.azureActions.map(a => new AzureOperation().deserialize(a));
        }
        if (input.azureNonActions) {
            this.azureNonActions = input.azureNonActions.map(a => new AzureOperation().deserialize(a));
        }
        return this;
    }
    populate({ cloudRoles, approvals }) {
        return this.copyWith({
            cloudRoleAssignments: (cloudRoles || []).reduce((acc, cra) => helpers_1.Util.isUndefined(cra) || cra.cloudRole.id !== this.id ? acc : [...acc, cra], []),
            approvalRequests: approvals.filter(ar => ar.requestEntityId === this.id)
        });
    }
}
__decorate([
    serde_1.Pluck(['id'])
], CloudRole.prototype, "institution", void 0);
__decorate([
    serde_1.Exclude()
], CloudRole.prototype, "approvalStatus", void 0);
__decorate([
    serde_1.Exclude()
], CloudRole.prototype, "cloudRoleAssignments", void 0);
__decorate([
    serde_1.Exclude()
], CloudRole.prototype, "approvalRequests", void 0);
exports.CloudRole = CloudRole;
class CloudRoleOperation extends serde_1.EntityMetadata {
}
__decorate([
    serde_1.Exclude()
], CloudRoleOperation.prototype, "productCode", void 0);
__decorate([
    serde_1.Exclude()
], CloudRoleOperation.prototype, "action", void 0);
__decorate([
    serde_1.Exclude()
], CloudRoleOperation.prototype, "wildcarded", void 0);
exports.CloudRoleOperation = CloudRoleOperation;
class AzureOperation extends CloudRoleOperation {
    get splitAction() {
        return this.operation.split('/');
    }
    get productName() {
        const [name] = this.splitAction;
        return name;
    }
    get productCode() {
        return this.splitAction.slice(1, -1).join('/');
    }
}
exports.AzureOperation = AzureOperation;
class AwsOperation extends CloudRoleOperation {
}
exports.AwsOperation = AwsOperation;
class CloudRoleAssignment extends serde_1.EntityMetadata {
    get surfaceLayerIds() {
        return this.surfaceLayersAppliedTo.map(({ id }) => id);
    }
    populate({ surfaceLayerEntities, groupEntities, cloudRoleEntities }) {
        return this.copyWith(Object.assign(Object.assign(Object.assign({}, (!helpers_1.Util.isUndefined(groupEntities) ? { group: groupEntities[this.group.id] || this.group } : {})), (!helpers_1.Util.isUndefined(cloudRoleEntities) ? { cloudRole: cloudRoleEntities[this.cloudRole.id] || this.cloudRole } : {})), { surfaceLayersAppliedTo: this.surfaceLayerIds.reduce((acc, surfaceLayerId) => {
                const surfaceLayer = surfaceLayerEntities[surfaceLayerId];
                return helpers_1.Util.isUndefined(surfaceLayer) ? acc : [...acc, surfaceLayer];
            }, []) }));
    }
}
exports.CloudRoleAssignment = CloudRoleAssignment;
class Role extends serde_1.Serde {
    deserialize(input) {
        Object.assign(this, input);
        if (!helpers_1.Util.isUndefined(input.responsibilities)) {
            this.responsibilities = input.responsibilities.map(r => new Responsibilities().deserialize(r));
        }
        return this;
    }
}
exports.Role = Role;
class Responsibilities extends serde_1.Serde {
}
exports.Responsibilities = Responsibilities;
class SecurityQuestion extends serde_1.Serde {
}
exports.SecurityQuestion = SecurityQuestion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tYW5hZ2VtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kZWxzL3VzZXItbWFuYWdlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHVEQUFpRDtBQUtqRCxtQ0FBaUY7QUFHakYsTUFBYSxJQUFLLFNBQVEsc0JBQW9CO0lBVzVDLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixLQUFLLE1BQU0sQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxDQUFDLHlCQUF5QixFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQs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