"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const groupFaker = require("@concourse/store/group/services/group.faker");
const surfaceFaker = require("@concourse/store/surface/services/surface.faker");
const test_1 = require("@concourse/test");
const assign_groups_component_1 = require("./assign-groups.component");
describe('AssignGroupsComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                ngx_pipes_1.NgPipesModule,
                shared_module_1.SharedModule,
                store_1.StoreModule.forRoot({}),
                dynamic_form_1.DynamicFormModule,
                angular_fontawesome_1.FontAwesomeModule
            ],
            providers: [
                test_1.mockFacade(facades_1.GroupFacade, {
                    list$: new rxjs_1.BehaviorSubject(groupFaker.fakeMany())
                }),
                test_1.mockFacade(facades_1.SurfaceFacade),
                test_1.mockFacade(facades_1.ApplicationErrorFacade)
            ],
            declarations: [assign_groups_component_1.AssignGroupsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(assign_groups_component_1.AssignGroupsComponent);
        component = fixture.componentInstance;
        component.surface = surfaceFaker.fakeOne();
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLWdyb3Vwcy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvYXNzaWduLWdyb3Vwcy9hc3NpZ24tZ3JvdXBzLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLHlDQUEwQztBQUMxQywrQkFBdUM7QUFFdkMsaUVBQW1FO0FBQ25FLG1FQUErRDtBQUMvRCxzREFBOEY7QUFDOUYsMEVBQTBFO0FBQzFFLGdGQUFnRjtBQUNoRiwwQ0FBNkM7QUFDN0MsdUVBQWtFO0FBRWxFLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7SUFDckMsSUFBSSxTQUFnQyxDQUFDO0lBQ3JDLElBQUksT0FBZ0QsQ0FBQztJQUVyRCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCx5QkFBYTtnQkFDYiw0QkFBWTtnQkFDWixtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLGdDQUFpQjtnQkFDakIsdUNBQWlCO2FBQ2xCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMscUJBQVcsRUFBRTtvQkFDdEIsS0FBSyxFQUFFLElBQUksc0JBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2xELENBQUM7Z0JBQ0YsaUJBQVUsQ0FBQyx1QkFBYSxDQUFDO2dCQUN6QixpQkFBVSxDQUFDLGdDQUFzQixDQUFDO2FBQ25DO1lBQ0QsWUFBWSxFQUFFLENBQUMsK0NBQXFCLENBQUM7U0FDdEMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsK0NBQXFCLENBQUMsQ0FBQztRQUN6RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=