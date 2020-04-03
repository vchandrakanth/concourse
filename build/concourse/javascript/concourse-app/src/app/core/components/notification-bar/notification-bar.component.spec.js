"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const animations_1 = require("@angular/platform-browser/animations");
const testing_2 = require("@angular/router/testing");
const fromNotif = require("@concourse/core/notification/state/notification.reducer");
const facades_1 = require("@concourse/store/facades");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const ngx_pipes_1 = require("ngx-pipes");
const shared_module_1 = require("@concourse/shared/shared.module");
const notification_bar_component_1 = require("./notification-bar.component");
describe('NotificationBarComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.BrowserAnimationsModule,
                angular_fontawesome_1.FontAwesomeModule,
                testing_2.RouterTestingModule,
                ngx_pipes_1.NgArrayPipesModule,
                ngx_pipes_1.NgDatePipesModule,
                shared_module_1.SharedModule,
                store_1.StoreModule.forRoot({
                    notification: fromNotif.reducer
                })
            ],
            declarations: [notification_bar_component_1.NotificationBarComponent],
            providers: [facades_1.NotificationFacade]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(notification_bar_component_1.NotificationBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWJhci5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uLWJhci9ub3RpZmljYXRpb24tYmFyLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLHFFQUErRTtBQUMvRSxxREFBOEQ7QUFDOUQscUZBQXFGO0FBQ3JGLHNEQUE4RDtBQUM5RCwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLHlDQUFrRTtBQUVsRSxtRUFBK0Q7QUFDL0QsNkVBQXdFO0FBRXhFLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDeEMsSUFBSSxTQUFtQyxDQUFDO0lBQ3hDLElBQUksT0FBbUQsQ0FBQztJQUV4RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxvQ0FBdUI7Z0JBQ3ZCLHVDQUFpQjtnQkFDakIsNkJBQW1CO2dCQUNuQiw4QkFBa0I7Z0JBQ2xCLDZCQUFpQjtnQkFDakIsNEJBQVk7Z0JBQ1osbUJBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLFlBQVksRUFBRSxTQUFTLENBQUMsT0FBTztpQkFDaEMsQ0FBQzthQUNIO1lBQ0QsWUFBWSxFQUFFLENBQUMscURBQXdCLENBQUM7WUFDeEMsU0FBUyxFQUFFLENBQUMsNEJBQWtCLENBQUM7U0FDaEMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMscURBQXdCLENBQUMsQ0FBQztRQUM1RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=