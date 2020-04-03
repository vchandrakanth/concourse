"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const asset_facade_1 = require("@concourse/store/asset/state/asset.facade");
const code_preview_modal_component_1 = require("./code-preview-modal.component");
xdescribe('TemplateModalComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forRoot({})
            ],
            providers: [
                asset_facade_1.AssetFacade
            ],
            declarations: [code_preview_modal_component_1.CodePreviewModalComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed
            .overrideComponent(code_preview_modal_component_1.CodePreviewModalComponent, {
            set: {
                template: `
        <div class="modal-header">
          <h4>Cloud Formation Template</h4>
          <button type="button" class="close" (click)="close()">
            <fa-icon [icon]="icons.faTimes"></fa-icon>
          </button>
        </div>
        `
            }
        })
            .createComponent(code_preview_modal_component_1.CodePreviewModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should find title', () => {
        const modelHeader = fixture.debugElement.query(platform_browser_1.By.css('div.modal-header h4')).nativeElement;
        expect(modelHeader.textContent).toEqual('Cloud Formation Template');
    });
    it('should hide the modelwindow if click on close icon', () => {
        const closebtn = fixture.debugElement.query(platform_browser_1.By.css('button.close'));
        closebtn.triggerEventHandler('click', undefined);
        fixture.detectChanges();
        expect(closebtn).toBeTruthy();
    });
    it('should display cloud formation template', () => {
        component.codeString = 'cloudFormationTemplate 1';
        const modelBody = fixture.debugElement.query(platform_browser_1.By.css('div.modal-body code')).nativeElement;
        fixture.detectChanges();
        expect(modelBody.textContent).toEqual('\"cloudFormationTemplate 1\"');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1wcmV2aWV3LW1vZGFsLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9jb2RlLXByZXZpZXctbW9kYWwvY29kZS1wcmV2aWV3LW1vZGFsLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLGdFQUErQztBQUMvQywwRUFBcUU7QUFDckUsdUNBQTBDO0FBRTFDLDRFQUF3RTtBQUN4RSxpRkFBMkU7QUFFM0UsU0FBUyxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtJQUN2QyxJQUFJLFNBQW9DLENBQUM7SUFDekMsSUFBSSxPQUFvRCxDQUFDO0lBRXpELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLHVDQUFpQjtnQkFDakIsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULDBCQUFXO2FBQ1o7WUFDRCxZQUFZLEVBQUUsQ0FBQyx3REFBeUIsQ0FBQztTQUMxQyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTzthQUNkLGlCQUFpQixDQUFDLHdEQUF5QixFQUFFO1lBQzVDLEdBQUcsRUFBRTtnQkFDSCxRQUFRLEVBQUU7Ozs7Ozs7U0FPWDthQUNBO1NBQ0YsQ0FBQzthQUNELGVBQWUsQ0FBQyx3REFBeUIsQ0FBQyxDQUFDO1FBQzlDLFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtRQUMzQixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsYUFBNEIsQ0FBQztRQUMzRyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLEdBQUcsRUFBRTtRQUM1RCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxHQUFHLEVBQUU7UUFDakQsU0FBUyxDQUFDLFVBQVUsR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxxQkFBRSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsYUFBNEIsQ0FBQztRQUN6RyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUN4RSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=