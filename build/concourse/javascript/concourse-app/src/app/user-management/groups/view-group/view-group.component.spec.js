"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ng_select_1 = require("@ng-select/ng-select");
const store_1 = require("@ngrx/store");
const tabs_1 = require("ngx-bootstrap/tabs");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const facades_1 = require("@concourse/store/facades");
const modal_1 = require("@concourse/core/modal");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const groupFaker = require("@concourse/store/group/services/group.faker");
const roleFaker = require("@concourse/store/role/services/role.faker");
const surfaceLayerFaker = require("@concourse/store/surface-layer/services/surface-layer.faker");
const surfaceFaker = require("@concourse/store/surface/services/surface.faker");
const userFaker = require("@concourse/store/user/services/user.faker");
const test_1 = require("@concourse/test");
const view_group_component_1 = require("./view-group.component");
describe('ViewGroupComponent', () => {
    let component;
    let fixture;
    const formBuilder = new forms_1.FormBuilder();
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                store_1.StoreModule.forRoot({}),
                angular_fontawesome_1.FontAwesomeModule,
                tabs_1.TabsModule.forRoot(),
                ngx_pipes_1.NgArrayPipesModule,
                ngx_pipes_1.NgDatePipesModule,
                ng_select_1.NgSelectModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                dynamic_form_1.DynamicFormModule
            ],
            providers: [
                test_1.mockFacade(facades_1.AuditHistoryFacade),
                test_1.mockFacade(facades_1.ApplicationErrorFacade),
                test_1.mockFacade(modal_1.ModalStoreFacade),
                test_1.mockFacade(facades_1.SurfaceFacade, {
                    selected$: new rxjs_1.BehaviorSubject(surfaceFaker.fakeOne())
                }),
                test_1.mockFacade(facades_1.UserFacade, {
                    getActivatedUsers$: new rxjs_1.BehaviorSubject(userFaker.fakeMany())
                }),
                test_1.mockFacade(facades_1.GroupFacade, {
                    selectedWithRelated$: new rxjs_1.BehaviorSubject(groupFaker.fakeOne())
                }),
                test_1.mockFacade(facades_1.SurfaceLayerFacade, {
                    list$: new rxjs_1.BehaviorSubject(surfaceLayerFaker.fakeMany())
                }),
                test_1.mockFacade(facades_1.RoleFacade, {
                    rolesList$: new rxjs_1.BehaviorSubject(roleFaker.fakeMany()),
                    selectedRoleResponsibilities$: new rxjs_1.BehaviorSubject(roleFaker.fakeMany()[0].responsibilities)
                }),
                test_1.mockFacade(facades_1.CloudRoleAssignmentFacade),
                test_1.mockFacade(facades_1.CloudRoleFacade),
                { provide: forms_1.FormBuilder, useValue: formBuilder },
                ...test_1.directiveProviders
            ],
            declarations: [view_group_component_1.ViewGroupComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(view_group_component_1.ViewGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    // tslint:disable-next-line:only-arrow-functions
    function updateForm(roleId, responsibilitiesAssigned, surfaceLayersAppliedTo) {
        component.roleAssignmentForm.get('roleId').setValue(roleId);
        component.roleAssignmentForm.get('responsibilitiesAssigned').setValue(responsibilitiesAssigned);
        component.roleAssignmentForm.get('surfaceLayersAppliedTo').setValue(surfaceLayersAppliedTo);
    }
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('form initially not valid', () => {
        updateForm(undefined, undefined, undefined);
        fixture.detectChanges();
        expect(component.roleAssignmentForm.valid).toBeFalsy();
    });
    it('form should be valid', () => {
        updateForm(1, 2, 3);
        fixture.detectChanges();
        expect(component.roleAssignmentForm.valid).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1ncm91cC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC91c2VyLW1hbmFnZW1lbnQvZ3JvdXBzL3ZpZXctZ3JvdXAvdmlldy1ncm91cC5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBeUU7QUFDekUsMENBQWtFO0FBQ2xFLDBFQUFxRTtBQUNyRSxvREFBc0Q7QUFDdEQsdUNBQTBDO0FBQzFDLDZDQUFnRDtBQUNoRCx5Q0FBa0U7QUFDbEUsK0JBQXVDO0FBRXZDLHNEQVVrQztBQUVsQyxpREFBeUQ7QUFDekQsaUVBQW1FO0FBQ25FLG1FQUErRDtBQUMvRCwwRUFBMEU7QUFDMUUsdUVBQXVFO0FBQ3ZFLGlHQUFpRztBQUNqRyxnRkFBZ0Y7QUFDaEYsdUVBQXVFO0FBQ3ZFLDBDQUFpRTtBQUNqRSxpRUFBNEQ7QUFFNUQsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxJQUFJLFNBQTZCLENBQUM7SUFDbEMsSUFBSSxPQUE2QyxDQUFDO0lBQ2xELE1BQU0sV0FBVyxHQUFnQixJQUFJLG1CQUFXLEVBQUUsQ0FBQztJQUVuRCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLHVDQUFpQjtnQkFDakIsaUJBQVUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLDhCQUFrQjtnQkFDbEIsNkJBQWlCO2dCQUNqQiwwQkFBYztnQkFDZCw0QkFBWTtnQkFDWiwyQkFBbUI7Z0JBQ25CLGdDQUFpQjthQUNs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