"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const faEdit_1 = require("@fortawesome/free-solid-svg-icons/faEdit");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const operators_1 = require("rxjs/operators");
const modal_1 = require("@concourse/core/modal");
const helpers_1 = require("@concourse/shared/helpers");
let ViewGroupComponent = class ViewGroupComponent {
    constructor(fb, authFacade, modalFacade, surfaceFacade, groupFacade, userFacade, surfaceLayerFacade, roleFacade, auditHistoryFacade, cloudRoleFacade, cloudRoleAssignmentFacade) {
        this.fb = fb;
        this.authFacade = authFacade;
        this.modalFacade = modalFacade;
        this.surfaceFacade = surfaceFacade;
        this.groupFacade = groupFacade;
        this.userFacade = userFacade;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.roleFacade = roleFacade;
        this.auditHistoryFacade = auditHistoryFacade;
        this.cloudRoleFacade = cloudRoleFacade;
        this.cloudRoleAssignmentFacade = cloudRoleAssignmentFacade;
        this.group$ = this.groupFacade.selectedWithRelated$.pipe(operators_1.distinctUntilChanged(), operators_1.tap(() => {
            this.toggleHideSurfaceLayers();
            this.roleAssignmentForm.reset();
            this.cloudRoleAssignmentForm.reset();
        }));
        this.surface$ = this.surfaceFacade.selectedWithRelated$;
        this.cloudRoles$ = this.cloudRoleFacade.list$;
        this.auditHistory$ = this.auditHistoryFacade.auditHistory$;
        this.isLoaded$ = this.groupFacade.isLoaded$;
        this.updating$ = this.groupFacade.isUpdating$;
        this.isRaUpdating = this.groupFacade.isUpdating$; // TODO: make role assignment specific boolean
        this.roleOptions$ = this.roleFacade.rolesList$;
        this.responsibilitiesOptions$ = this.roleFacade.selectedRoleResponsibilities$.pipe(operators_1.map(responsibilities => responsibilities || []));
        this.surfaceLayerOptions$ = this.surfaceLayerFacade.listBySurface$;
        this.surfaceOptions$ = this.surfaceFacade.list$;
        this.icons = { faEdit: faEdit_1.faEdit, faTimes: faTimes_1.faTimes, faTrashAlt: faTrashAlt_1.faTrashAlt, faPlus: faPlus_1.faPlus };
        this.addUserConfig = [
            {
                type: 'typeahead',
                name: 'userId',
                label: 'User',
                placeholder: 'Select User',
                options: this.group$.pipe(operators_1.filter(group => !!group), operators_1.withLatestFrom(this.userFacade.getActivatedUsers$), operators_1.withLatestFrom(this.authFacade.user$), operators_1.map(([[group, activatedUsers], user]) => !group.users ? [...activatedUsers, user] : helpers_1.difference([...activatedUsers, user], group.users, (u, u2) => u.id === u2.id)), operators_1.map(users => users.map(u => ({ text: `${u.name} <${u.email}>`, id: u.id })))),
                validation: [forms_1.Validators.required]
            },
            {
                type: 'button',
                label: 'Add',
                name: 'submit'
            }
        ];
        this.roleAssignmentForm = this.fb.group({
            roleId: ['', forms_1.Validators.required],
            responsibilitiesAssigned: [undefined, forms_1.Validators.required],
            responsibilityScope: [undefined, forms_1.Validators.required],
            surfaceLayersAppliedTo: [undefined, forms_1.Validators.required],
            surfaceAppliedTo: [undefined]
        });
        this.cloudRoleAssignmentForm = this.fb.group({
            cloudRole: [undefined, forms_1.Validators.required],
            surfaceLayersAppliedTo: ['', forms_1.Validators.required]
        });
        this.hideSurfaceLayersSelector = false;
        this.showSurfaceSelector = false;
        this.showScopeSelector = false;
    }
    editGroup() {
        this.modalFacade.openModal({
            component: modal_1.EditGroupComponent,
            id: 'edit-group'
        });
    }
    onChangeRole(role) {
        this.toggleHideSurfaceLayers(role);
        if (!helpers_1.Util.isUndefined(role)) {
            const id = role.id;
            this.roleAssignmentForm.get('responsibilitiesAssigned').setValue(undefined);
            this.roleFacade.getRoleResponsibilities(id);
        }
    }
    onChangeResponsibilityScope($event) {
        const scope = $event.target.value;
        switch (scope) {
            case 'institution':
                this.hideSurfaceLayersSelector = true;
                this.showSurfaceSelector = false;
                break;
            case 'surface':
                this.showSurfaceSelector = true;
                this.hideSurfaceLayersSelector = true;
                break;
            case 'surfacelayer':
                this.showSurfaceSelector = false;
                this.hideSurfaceLayersSelector = false;
                break;
            default:
                console.error('scope %s not supported', scope);
                break;
        }
        const surfaceLayerControl = this.roleAssignmentForm.get('surfaceLayersAppliedTo');
        const surfaceControl = this.roleAssignmentForm.get('surfaceAppliedTo');
        this.hideSurfaceLayersSelector ? surfaceLayerControl.clearValidators() : surfaceLayerControl.setValidators([forms_1.Validators.required]);
        !this.showSurfaceSelector ? surfaceControl.clearValidators() : surfaceControl.setValidators([forms_1.Validators.required]);
    }
    trackUsers(_index, user) {
        return user.id;
    }
    trackRoleAssignments(_index, roleAssignment) {
        return roleAssignment.id;
    }
    trackCloudRoleAssignments(_index, cra) {
        return cra.id;
    }
    deleteGroup(group) {
        this.modalFacade.confirmDeleteModal('Group', group.name, () => this.groupFacade.delete(group));
    }
    removeUser(group, user) {
        this.modalFacade.confirmDeleteModal('user', user.name, () => this.groupFacade.removeUserFromGroup(group.id, user.id), 'remove');
    }
    removeRoleAssignment(group, roleAssignment) {
        this.modalFacade.confirmDeleteModal('Role', roleAssignment.role.name, () => this.groupFacade.deleteRoleAssignment(group.id, roleAssignment.id), 'remove');
    }
    addUserToGroup(group) {
        this.groupFacade.addUserToGroup(group.id, this.addUserForm.value.userId);
        this.updating$.pipe(operators_1.skipWhile(updating => updating), operators_1.take(1)).subscribe(() => {
            this.addUserForm.form.reset();
            this.addUserForm.form.markAsPristine();
        });
    }
    onAssociateGroups(surface, group) {
        this.surfaceFacade.update(surface.copyWith({
            groupIds: [...surface.groupIds, group.id]
        }));
    }
    createRoleAssignment(group) {
        Object.values(this.roleAssignmentForm.controls).forEach(control => {
            control.markAsDirty();
            control.updateValueAndValidity();
        });
        if (this.roleAssignmentForm.valid) {
            const _a = this.roleAssignmentForm.value, { responsibilityScope } = _a, formData = __rest(_a, ["responsibilityScope"]);
            const roleAssignment = Object.assign(Object.assign({ role: { id: formData.roleId }, group: { id: group.id }, responsibilitiesAssigned: formData.responsibilitiesAssigned.map(id => ({ id })) }, (!this.hideSurfaceLayersSelector ? { surfaceLayersAppliedTo: formData.surfaceLayersAppliedTo.map(id => ({ id })) } : {})), (this.showSurfaceSelector ? { surface: { id: formData.surfaceAppliedTo } } : {}));
            this.groupFacade.createRoleAssignment(group.id, roleAssignment);
            this.isRaUpdating.pipe(operators_1.skipWhile(updating => updating), operators_1.take(1)).subscribe(() => {
                this.toggleHideSurfaceLayers();
                this.roleFacade.getRoleResponsibilities(undefined);
                this.roleAssignmentForm.reset();
                this.roleAssignmentForm.markAsPristine();
            });
        }
    }
    createCloudRoleAssignment(group) {
        Object.values(this.cloudRoleAssignmentForm.controls).forEach(control => {
            control.markAsDirty();
            control.updateValueAndValidity();
        });
        if (this.cloudRoleAssignmentForm.valid) {
            const cloudRoleAssignment = {
                cloudRole: { id: this.cloudRoleAssignmentForm.value.cloudRole },
                group: { id: group.id },
                surfaceLayersAppliedTo: this.cloudRoleAssignmentForm.value.surfaceLayersAppliedTo.map(id => ({ id }))
            };
            this.cloudRoleAssignmentFacade.addCloudRolesToGroup(group.id, cloudRoleAssignment);
        }
    }
    removeCloudRoleAssignment(cra) {
        this.modalFacade.confirmDeleteModal('Cloud Role Assignment', cra.cloudRole.name, () => this.cloudRoleAssignmentFacade.deleteCloudRoleAssignment(cra.group.id, cra.id), 'remove');
    }
    toggleHideSurfaceLayers(role) {
        this.showScopeSelector = !helpers_1.Util.isUndefined(role) ? !role.singleScope : false;
        if (!this.showScopeSelector) {
            this.hideSurfaceLayersSelector = !helpers_1.Util.isUndefined(role) ? !role.surfaceLayerScope : false;
            this.showSurfaceSelector = !helpers_1.Util.isUndefined(role) ? role.surfaceScope : false;
        }
        const scopeControl = this.roleAssignmentForm.get('responsibilityScope');
        const surfaceLayerControl = this.roleAssignmentForm.get('surfaceLayersAppliedTo');
        const surfaceControl = this.roleAssignmentForm.get('surfaceAppliedTo');
        !this.showScopeSelector ? scopeControl.clearValidators() : scopeControl.setValidators([forms_1.Validators.required]);
        this.hideSurfaceLayersSelector ? surfaceLayerControl.clearValidators() : surfaceLayerControl.setValidators([forms_1.Validators.required]);
        !this.showSurfaceSelector ? surfaceControl.clearValidators() : surfaceControl.setValidators([forms_1.Validators.required]);
    }
};
__decorate([
    core_1.ViewChild('addUserForm')
], ViewGroupComponent.prototype, "addUserForm", void 0);
ViewGroupComponent = __decorate([
    core_1.Component({
        selector: 'app-view-group',
        templateUrl: './view-group.component.html',
        styleUrls: ['./view-group.component.scss']
    })
], ViewGroupComponent);
exports.ViewGroupComponent = ViewGroupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvdXNlci1tYW5hZ2VtZW50L2dyb3Vwcy92aWV3LWdyb3VwL3ZpZXctZ3JvdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBcUQ7QUFDckQsMENBQW9FO0FBQ3BFLHFFQUFrRTtBQUNsRSxxRUFBa0U7QUFDbEUsdUVBQW9FO0FBQ3BFLDZFQUEwRTtBQUUxRSw4Q0FRd0I7QUFFeEIsaURBQTZFO0FBRzdFLHVEQUE2RDtBQWtCN0QsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUE4RDdCLFlBQ1UsRUFBZSxFQUNOLFVBQXNCLEVBQ3RCLFdBQTZCLEVBQzdCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLFVBQXNCLEVBQ3RCLGtCQUFzQyxFQUN0QyxVQUFzQixFQUN0QixrQkFBc0MsRUFDdEMsZUFBZ0MsRUFDaEMseUJBQW9EO1FBVjdELE9BQUUsR0FBRixFQUFFLENBQWE7UUFDTixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBdkV2RSxXQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJ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