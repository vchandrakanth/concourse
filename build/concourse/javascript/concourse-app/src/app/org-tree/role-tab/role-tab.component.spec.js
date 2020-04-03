"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const groupFaker = require("@concourse/store/group/services/group.faker");
const roleAssignmentFaker = require("@concourse/store/role-assignment/services/role-assignment.faker");
const roleFaker = require("@concourse/store/role/services/role.faker");
const surfaceLayerFaker = require("@concourse/store/surface-layer/services/surface-layer.faker");
const test_1 = require("@concourse/test");
const role_tab_component_1 = require("./role-tab.component");
describe('RoleTabComponent', () => {
    let component;
    let fixture;
    const surfaceLayers = surfaceLayerFaker.fakeMany();
    const roles = roleFaker.fakeMany();
    const groups = groupFaker.fakeMany();
    const roleAssignments = roleAssignmentFaker.fakeMany(roles, groups, surfaceLayers);
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(facades_1.SurfaceLayerFacade, {
                    selectedWithChildren$: new rxjs_1.BehaviorSubject(surfaceLayers[0])
                }),
                test_1.mockFacade(facades_1.GroupFacade, {
                    roleAssignmentsBySurfaceLayerIds$: new rxjs_1.BehaviorSubject(jest.fn(() => roleAssignments))
                }),
                ...test_1.directiveProviders
            ],
            declarations: [role_tab_component_1.RoleTabComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(role_tab_component_1.RoleTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS10YWIuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvb3JnLXRyZWUvcm9sZS10YWIvcm9sZS10YWIuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFDekUscURBQThEO0FBQzlELDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0JBQXVDO0FBRXZDLG1FQUErRDtBQUMvRCxzREFBMkU7QUFDM0UsMEVBQTBFO0FBQzFFLHVHQUF1RztBQUN2Ryx1RUFBdUU7QUFDdkUsaUdBQWlHO0FBQ2pHLDBDQUFpRTtBQUNqRSw2REFBd0Q7QUFFeEQsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUNoQyxJQUFJLFNBQTJCLENBQUM7SUFDaEMsSUFBSSxPQUEyQyxDQUFDO0lBQ2hELE1BQU0sYUFBYSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25ELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckMsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFbkYsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsNkJBQW1CO2dCQUNuQix1Q0FBaUI7Z0JBQ2pCLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLDRCQUFrQixFQUFFO29CQUM3QixxQkFBcUIsRUFBRSxJQUFJLHNCQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3RCxDQUFDO2dCQUNGLGlCQUFVLENBQUMscUJBQVcsRUFBRTtvQkFDdEIsaUNBQWlDLEVBQUUsSUFBSSxzQkFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ3ZGLENBQUM7Z0JBQ0YsR0FBRyx5QkFBa0I7YUFDdEI7WUFDRCxZQUFZLEVBQUUsQ0FBQyxxQ0FBZ0IsQ0FBQztTQUNqQyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxxQ0FBZ0IsQ0FBQyxDQUFDO1FBQ3BELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==