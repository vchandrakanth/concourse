"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const response_cloud_role_sync_component_1 = require("./response-cloud-role-sync.component");
describe('ResponseCloudRoleSyncComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                shared_module_1.SharedModule,
                angular_fontawesome_1.FontAwesomeModule,
                ngx_bootstrap_1.TabsModule.forRoot()
            ],
            providers: [
                test_1.mockFacade(facades_1.ApplicationErrorFacade)
            ],
            declarations: [response_cloud_role_sync_component_1.ResponseCloudRoleSyncComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(response_cloud_role_sync_component_1.ResponseCloudRoleSyncComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UtY2xvdWQtcm9sZS1zeW5jLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9yZXNwb25zZS1jbG91ZC1yb2xlLXN5bmMvcmVzcG9uc2UtY2xvdWQtcm9sZS1zeW5jLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBFQUFxRTtBQUVyRSxpREFBMkM7QUFFM0MsbUVBQStEO0FBRS9ELHNEQUFrRTtBQUNsRSwwQ0FBNkM7QUFDN0MsNkZBQXNGO0FBRXRGLFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7SUFDOUMsSUFBSSxTQUF5QyxDQUFDO0lBQzlDLElBQUksT0FBeUQsQ0FBQztJQUU5RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCw0QkFBWTtnQkFDWix1Q0FBaUI7Z0JBQ2pCLDBCQUFVLENBQUMsT0FBTyxFQUFFO2FBQ3JCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGlCQUFVLENBQUMsZ0NBQXNCLENBQUM7YUFDbkM7WUFDRCxZQUFZLEVBQUUsQ0FBQyxtRUFBOEIsQ0FBQztTQUMvQyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxtRUFBOEIsQ0FBQyxDQUFDO1FBQ2xFLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==