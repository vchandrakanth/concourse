"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const shared_module_1 = require("@concourse/shared/shared.module");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const fromNotif = require("@concourse/core/notification/state/notification.reducer");
const facades_1 = require("@concourse/store/facades");
const notification_icon_component_1 = require("./notification-icon.component");
describe('NotificationIconComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({
                    notification: fromNotif.reducer
                }),
                angular_fontawesome_1.FontAwesomeModule,
                shared_module_1.SharedModule
            ],
            providers: [facades_1.NotificationFacade],
            declarations: [
                notification_icon_component_1.NotificationIconComponent
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(notification_icon_component_1.NotificationIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWljb24uY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9jb21wb25lbnRzL25vdGlmaWNhdGlvbi1pY29uL25vdGlmaWNhdGlvbi1pY29uLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLG1FQUErRDtBQUMvRCwwRUFBcUU7QUFDckUsdUNBQTBDO0FBRTFDLHFGQUFxRjtBQUNyRixzREFBOEQ7QUFFOUQsK0VBQTBFO0FBRTFFLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7SUFDekMsSUFBSSxTQUFvQyxDQUFDO0lBQ3pDLElBQUksT0FBb0QsQ0FBQztJQUV6RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxtQkFBVyxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsWUFBWSxFQUFFLFNBQVMsQ0FBQyxPQUFPO2lCQUNoQyxDQUFDO2dCQUNGLHVDQUFpQjtnQkFDakIsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRSxDQUFDLDRCQUFrQixDQUFDO1lBQy9CLFlBQVksRUFBRTtnQkFDWix1REFBeUI7YUFBQztTQUM3QixDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyx1REFBeUIsQ0FBQyxDQUFDO1FBQzdELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==