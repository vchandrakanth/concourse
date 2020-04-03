"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const page_actions_component_1 = require("./page-actions.component");
// TODO: Need build a (test only) component to test this component
// reference: https://github.com/angular/material2/blob/master/src/cdk/portal/portal.spec.ts#L42
xdescribe('PageActionsComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                angular_fontawesome_1.FontAwesomeModule
            ],
            declarations: [page_actions_component_1.PageActionsComponent]
        });
        fixture = testing_1.TestBed
            .overrideComponent(page_actions_component_1.PageActionsComponent, {
            set: {
                template: `
          <div class="page-actions" id="page-actions-container"></div>
          <ng-template cdk-portal>
            <fa-icon *ngIf="isUpdating | async" [icon]="icons.faSpinner" [spin]="true"></fa-icon>
            <ng-content></ng-content>
          </ng-template>
        `
            }
        })
            .createComponent(page_actions_component_1.PageActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1hY3Rpb25zLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3BhZ2UtYWN0aW9ucy9wYWdlLWFjdGlvbnMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBa0U7QUFFbEUsMEVBQXFFO0FBRXJFLHFFQUFnRTtBQUVoRSxrRUFBa0U7QUFDbEUsZ0dBQWdHO0FBQ2hHLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDckMsSUFBSSxTQUErQixDQUFDO0lBQ3BDLElBQUksT0FBK0MsQ0FBQztJQUVwRCxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUU7Z0JBQ1AsdUNBQWlCO2FBQ2xCO1lBQ0QsWUFBWSxFQUFFLENBQUMsNkNBQW9CLENBQUM7U0FDckMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLGlCQUFPO2FBQ2QsaUJBQWlCLENBQUMsNkNBQW9CLEVBQUU7WUFDdkMsR0FBRyxFQUFFO2dCQUNILFFBQVEsRUFBRTs7Ozs7O1NBTVg7YUFDQTtTQUNGLENBQUM7YUFDRCxlQUFlLENBQUMsNkNBQW9CLENBQUMsQ0FBQztRQUV6QyxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=