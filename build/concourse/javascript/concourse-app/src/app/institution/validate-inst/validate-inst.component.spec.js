"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const router_1 = require("@angular/router");
const facades_1 = require("@concourse/store/facades");
const fromInstitution = require("@concourse/store/institution/state/institution.reducer");
const store_1 = require("@ngrx/store");
const rxjs_1 = require("rxjs");
const validate_inst_component_1 = require("./validate-inst.component");
describe('ValidateInstComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({
                    user: fromInstitution.reducer
                })
            ],
            declarations: [validate_inst_component_1.ValidateInstComponent],
            providers: [
                {
                    provide: router_1.ActivatedRoute,
                    useValue: {
                        queryParams: rxjs_1.of({ token: 'test', email: 'test@concoursehub.com', name: 'test' })
                    }
                },
                facades_1.InstitutionFacade
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(validate_inst_component_1.ValidateInstComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtaW5zdC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9pbnN0aXR1dGlvbi92YWxpZGF0ZS1pbnN0L3ZhbGlkYXRlLWluc3QuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBeUU7QUFDekUsNENBQWlEO0FBQ2pELHNEQUE2RDtBQUM3RCwwRkFBMEY7QUFDMUYsdUNBQTBDO0FBQzFDLCtCQUEwQjtBQUMxQix1RUFBa0U7QUFFbEUsUUFBUSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsRUFBRTtJQUNyQyxJQUFJLFNBQWdDLENBQUM7SUFDckMsSUFBSSxPQUFnRCxDQUFDO0lBRXJELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFO2dCQUNQLG1CQUFXLENBQUMsT0FBTyxDQUFDO29CQUNsQixJQUFJLEVBQUUsZUFBZSxDQUFDLE9BQU87aUJBQzlCLENBQUM7YUFDSDtZQUNELFlBQVksRUFBRSxDQUFDLCtDQUFxQixDQUFDO1lBQ3JDLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsdUJBQWM7b0JBQ3ZCLFFBQVEsRUFBRTt3QkFDUixXQUFXLEVBQUUsU0FBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO3FCQUNqRjtpQkFDRjtnQkFDRCwyQkFBaUI7YUFDbEI7U0FDRixDQUFDO2FBQ0MsaUJBQWlCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQywrQ0FBcUIsQ0FBQyxDQUFDO1FBQ3pELFNBQVMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUM7UUFDdEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==