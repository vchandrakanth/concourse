"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const ngx_pipes_1 = require("ngx-pipes");
const resource_timeline_component_1 = require("./resource-timeline.component");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
describe('ResourceTimelineComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                ngx_pipes_1.NgPipesModule,
                forms_1.FormsModule
            ],
            declarations: [resource_timeline_component_1.ResourceTimelineComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(resource_timeline_component_1.ResourceTimelineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtdGltZWxpbmUuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvd29ya2Zsb3dzL3NoYXJlZC9yZXNvdXJjZS10aW1lbGluZS9yZXNvdXJjZS10aW1lbGluZS5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUF5RTtBQUV6RSx5Q0FBMEM7QUFDMUMsK0VBQTBFO0FBQzFFLHdDQUFpRDtBQUNqRCwwQ0FBNkM7QUFFN0MsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN6QyxJQUFJLFNBQW9DLENBQUM7SUFDekMsSUFBSSxPQUFvRCxDQUFDO0lBRXpELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLHlCQUFhO2dCQUNiLG1CQUFXO2FBQ1o7WUFDRCxZQUFZLEVBQUUsQ0FBRSx1REFBeUIsQ0FBRTtTQUM1QyxDQUFDO2FBQ0QsaUJBQWlCLEVBQUUsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyx1REFBeUIsQ0FBQyxDQUFDO1FBQzdELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==