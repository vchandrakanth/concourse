"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const testing_2 = require("@angular/router/testing");
const ng_let_directive_1 = require("@concourse/shared/directives/ng-let.directive");
const fromAuth = require("@concourse/store/auth/state/auth.reducer");
const facades_1 = require("@concourse/store/facades");
const store_1 = require("@ngrx/store");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const notification_icon_component_1 = require("../notification-icon/notification-icon.component");
const surface_null_state_component_1 = require("../surface-null-state/surface-null-state.component");
const surface_switcher_component_1 = require("../surface-switcher/surface-switcher.component");
const header_component_1 = require("./header.component");
describe('HeaderComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule,
                store_1.StoreModule.forRoot({
                    auth: fromAuth.reducer
                }),
                angular_fontawesome_1.FontAwesomeModule,
                forms_1.FormsModule
            ],
            declarations: [
                ng_let_directive_1.NgLetDirective,
                notification_icon_component_1.NotificationIconComponent,
                header_component_1.HeaderComponent,
                surface_switcher_component_1.SurfaceSwitcherComponent,
                surface_null_state_component_1.SurfaceNullStateComponent
            ],
            providers: [facades_1.AuthFacade]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(header_component_1.HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBDQUE2QztBQUM3QyxxREFBOEQ7QUFFOUQsb0ZBQStFO0FBQy9FLHFFQUFxRTtBQUNyRSxzREFBc0Q7QUFDdEQsdUNBQTBDO0FBRTFDLDBFQUFxRTtBQUVyRSxrR0FBNkY7QUFDN0YscUdBQStGO0FBQy9GLCtGQUEwRjtBQUMxRix5REFBcUQ7QUFFckQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtJQUMvQixJQUFJLFNBQTBCLENBQUM7SUFDL0IsSUFBSSxPQUEwQyxDQUFDO0lBRS9DLFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLDZCQUFtQjtnQkFDbkIsbUJBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTztpQkFDdkIsQ0FBQztnQkFDRix1Q0FBaUI7Z0JBQ2pCLG1CQUFXO2FBQ1o7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osaUNBQWM7Z0JBQ2QsdURBQXlCO2dCQUN6QixrQ0FBZTtnQkFDZixxREFBd0I7Z0JBQ3hCLHdEQUF5QjthQUMxQjtZQUNELFNBQVMsRUFBRSxDQUFDLG9CQUFVLENBQUM7U0FDeEIsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1FBQ25ELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==