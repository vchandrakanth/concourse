"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const ngx_codemirror_1 = require("@ctrl/ngx-codemirror");
const ngx_pipes_1 = require("ngx-pipes");
const shared_module_1 = require("@concourse/shared/shared.module");
const audit_history_facade_1 = require("@concourse/store/audit-history/state/audit-history.facade");
const test_1 = require("@concourse/test");
const audit_history_component_1 = require("./audit-history.component");
describe('AuditHistoryComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            declarations: [
            // AuditHistoryComponent
            ],
            imports: [
                forms_1.FormsModule,
                ngx_codemirror_1.CodemirrorModule,
                ngx_pipes_1.NgArrayPipesModule,
                ngx_pipes_1.NgObjectPipesModule,
                shared_module_1.SharedModule
            ],
            providers: [
                test_1.mockFacade(audit_history_facade_1.AuditHistoryFacade)
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(audit_history_component_1.AuditHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtaGlzdG9yeS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9hdWRpdC1oaXN0b3J5L2F1ZGl0LWhpc3RvcnkuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBaUQ7QUFDakQsbURBQXlFO0FBQ3pFLDBDQUE2QztBQUM3Qyx5REFBd0Q7QUFDeEQseUNBQW9FO0FBRXBFLG1FQUErRDtBQUMvRCxvR0FBK0Y7QUFDL0YsMENBQTZDO0FBQzdDLHVFQUFrRTtBQUVsRSxRQUFRLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO0lBQ3JDLElBQUksU0FBZ0MsQ0FBQztJQUNyQyxJQUFJLE9BQWdELENBQUM7SUFFckQsVUFBVSxDQUFDLGVBQUssQ0FBQyxHQUFHLEVBQUU7UUFDcEIsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyx1QkFBZ0IsQ0FBQztZQUMzQixZQUFZLEVBQUU7WUFDWix3QkFBd0I7YUFDekI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsbUJBQVc7Z0JBQ1gsaUNBQWdCO2dCQUNoQiw4QkFBa0I7Z0JBQ2xCLCtCQUFtQjtnQkFDbkIsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxDQUFDLHlDQUFrQixDQUFDO2FBQy9CO1NBQ0YsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMsK0NBQXFCLENBQUMsQ0FBQztRQUN6RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=