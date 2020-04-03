"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const alert_1 = require("ngx-bootstrap/alert");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const facades_1 = require("@concourse/store/facades");
const edit_node_component_1 = require("./edit-node.component");
describe('EditNodeComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                store_1.StoreModule.forRoot({}),
                angular_fontawesome_1.FontAwesomeModule,
                dynamic_form_1.DynamicFormModule,
                alert_1.AlertModule.forRoot()
            ],
            providers: [
                facades_1.SurfaceLayerFacade
            ],
            declarations: [edit_node_component_1.EditNodeComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(edit_node_component_1.EditNodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ub2RlLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9lZGl0LW5vZGUvZWRpdC1ub2RlLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSwwRUFBcUU7QUFDckUsdUNBQTBDO0FBQzFDLCtDQUFrRDtBQUVsRCxpRUFBbUU7QUFDbkUsc0RBQThEO0FBQzlELCtEQUEwRDtBQUUxRCxRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO0lBQ2pDLElBQUksU0FBNEIsQ0FBQztJQUNqQyxJQUFJLE9BQTRDLENBQUM7SUFFakQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixPQUFPLEVBQUU7Z0JBQ1AsbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUN2Qix1Q0FBaUI7Z0JBQ2pCLGdDQUFpQjtnQkFDakIsbUJBQVcsQ0FBQyxPQUFPLEVBQUU7YUFDdEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsNEJBQWtCO2FBQ25CO1lBQ0QsWUFBWSxFQUFFLENBQUMsdUNBQWlCLENBQUM7U0FDbEMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsdUNBQWlCLENBQUMsQ0FBQztRQUNyRCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=