"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const institutionDataFaker = require("@concourse/store/institution-data/services/institution-data.faker");
const test_1 = require("@concourse/test");
const update_inst_data_component_1 = require("./update-inst-data.component");
// test continues to be flaky - removing for now
xdescribe('UpdateInstDataComponent', () => {
    let component;
    let fixture;
    const institutionData = institutionDataFaker.fakeOne('MAP');
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                forms_1.ReactiveFormsModule,
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule
            ],
            providers: [
                { provide: facades_1.ModalStoreFacade, useValue: {} },
                {
                    provide: facades_1.InstitutionDataFacade,
                    useValue: {
                        selectedInstData$: new rxjs_1.BehaviorSubject(institutionData)
                    }
                },
                ...test_1.directiveProviders
            ],
            declarations: [update_inst_data_component_1.UpdateInstDataComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(update_inst_data_component_1.UpdateInstDataComponent);
        component = fixture.componentInstance;
    });
    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWluc3QtZGF0YS5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9pbnN0aXR1dGlvbi9pbnN0aXR1dGlvbi1kYXRhL3VwZGF0ZS1pbnN0LWRhdGEvdXBkYXRlLWluc3QtZGF0YS5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFpRDtBQUNqRCxtREFBeUU7QUFDekUsMENBQXFEO0FBQ3JELHVDQUEwQztBQUMxQywrQkFBdUM7QUFFdkMsbUVBQStEO0FBQy9ELHNEQUFtRjtBQUNuRiwwR0FBMEc7QUFDMUcsMENBQXFEO0FBQ3JELDZFQUF1RTtBQUV2RSxnREFBZ0Q7QUFDaEQsU0FBUyxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtJQUN4QyxJQUFJLFNBQWtDLENBQUM7SUFDdkMsSUFBSSxPQUFrRCxDQUFDO0lBQ3ZELE1BQU0sZUFBZSxHQUFHLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU1RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCwyQkFBbUI7Z0JBQ25CLG1CQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDdkIsNEJBQVk7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSwwQkFBZ0IsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO2dCQUMzQztvQkFDRSxPQUFPLEVBQUUsK0JBQXFCO29CQUM5QixRQUFRLEVBQUU7d0JBQ1IsaUJBQWlCLEVBQUUsSUFBSSxzQkFBZSxDQUFDLGVBQWUsQ0FBQztxQkFDeEQ7aUJBQ0Y7Z0JBQ0QsR0FBRyx5QkFBa0I7YUFDdEI7WUFDRCxZQUFZLEVBQUUsQ0FBQyxvREFBdUIsQ0FBQztTQUN4QyxDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxvREFBdUIsQ0FBQyxDQUFDO1FBQzNELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==