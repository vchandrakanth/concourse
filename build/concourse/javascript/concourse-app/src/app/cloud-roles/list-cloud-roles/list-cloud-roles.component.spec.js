"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/router/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ngx_pipes_1 = require("ngx-pipes");
const rxjs_1 = require("rxjs");
const cloud_role_faker_1 = require("@concourse/store/cloud-role/services/cloud-role.faker");
const facades_1 = require("@concourse/store/facades");
const shared_module_1 = require("@concourse/shared/shared.module");
const test_1 = require("@concourse/test");
const list_cloud_roles_component_1 = require("./list-cloud-roles.component");
describe('ListCloudRolesComponent', () => {
    let component;
    let fixture;
    let injector;
    let mockCloudRoles = cloud_role_faker_1.fakeMany(5);
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                imports: [
                    testing_2.RouterTestingModule,
                    angular_fontawesome_1.FontAwesomeModule,
                    ngx_pipes_1.NgArrayPipesModule,
                    shared_module_1.SharedModule
                ],
                providers: [
                    test_1.mockFacade(facades_1.ModalStoreFacade),
                    test_1.mockFacade(facades_1.CloudRoleFacade, {
                        isLoaded$: new rxjs_1.BehaviorSubject(true),
                        list$: new rxjs_1.BehaviorSubject(mockCloudRoles)
                    }),
                    ...test_1.directiveProviders
                ],
                declarations: [list_cloud_roles_component_1.ListCloudRolesComponent]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(list_cloud_roles_component_1.ListCloudRolesComponent);
            component = fixture.componentInstance;
            injector = testing_1.getTestBed();
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should contain Cloud Roles data', () => {
        component.cloudRoles$.subscribe(pgts => {
            expect(pgts).toBe(mockCloudRoles);
        });
    });
    it('should find app-page-actions', () => {
        const pageActions = fixture.debugElement.query(platform_browser_1.By.css('app-page-actions'));
        expect(pageActions).toBeDefined();
    });
    it('should find app-search-actions', () => {
        const searchActions = fixture.debugElement.query(platform_browser_1.By.css('app-search-actions'));
        expect(searchActions).toBeDefined();
    });
    it('should not find app-null-state component', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeNull();
    });
    it('should give length zero if there no records', () => {
        component.cloudRoles$ = new rxjs_1.BehaviorSubject([]);
        fixture.detectChanges();
        component.cloudRoles$.subscribe(instData => {
            expect(instData.length).toBe(0);
        });
    });
    it('should find app-null-state if there is no Cloud Roles', () => {
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeDefined();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jbG91ZC1yb2xlcy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jbG91ZC1yb2xlcy9saXN0LWNsb3VkLXJvbGVzL2xpc3QtY2xvdWQtcm9sZXMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBaUQ7QUFDakQsbURBQXFGO0FBQ3JGLGdFQUErQztBQUMvQyxxREFBOEQ7QUFDOUQsMEVBQXFFO0FBQ3JFLHlDQUErQztBQUUvQywrQkFBdUM7QUFFdkMsNEZBQWlGO0FBQ2pGLHNEQUE2RTtBQUU3RSxtRUFBK0Q7QUFDL0QsMENBQThGO0FBQzlGLDZFQUF1RTtBQUV2RSxRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO0lBQ3ZDLElBQUksU0FBa0MsQ0FBQztJQUN2QyxJQUFJLE9BQWtELENBQUM7SUFDdkQsSUFBSSxRQUFpQixDQUFDO0lBQ3RCLElBQUksY0FBYyxHQUFHLDJCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsVUFBVSxDQUNSLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDVCxNQUFNLFNBQVMsR0FBZ0IsT0FBTyxDQUFDLEVBQUU7WUFDdkMsT0FBTztpQkFDSixzQkFBc0IsQ0FBQztnQkFDdEIsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7Z0JBQzNCLE9BQU8sRUFBRTtvQkFDUCw2QkFBbUI7b0JBQ25CLHVDQUFpQjtvQkFDakIsOEJBQWtCO29CQUNsQiw0QkFBWTtpQkFDYjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsaUJBQVUsQ0FBQywwQkFBZ0IsQ0FBQztvQkFDNUIsaUJBQVUsQ0FBQyx5QkFBZSxFQUFFO3dCQUMxQixTQUFTLEVBQUUsSUFBSSxzQkFBZSxDQUFDLElBQUksQ0FBQzt3QkFDcEMsS0FBSyxFQUFFLElBQUks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