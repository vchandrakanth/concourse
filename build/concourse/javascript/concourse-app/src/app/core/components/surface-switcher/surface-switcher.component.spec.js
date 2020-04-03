"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const forms_1 = require("@angular/forms");
const store_1 = require("@ngrx/store");
const shared_module_1 = require("@concourse/shared/shared.module");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const surface_switcher_component_1 = require("./surface-switcher.component");
describe('SurfaceSwitcherComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [
                store_1.StoreModule.forRoot({}),
                shared_module_1.SharedModule,
                forms_1.FormsModule
            ],
            providers: [
                test_1.mockFacade(facades_1.SurfaceFacade)
            ],
            declarations: [surface_switcher_component_1.SurfaceSwitcherComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(surface_switcher_component_1.SurfaceSwitcherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS1zd2l0Y2hlci5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2NvbXBvbmVudHMvc3VyZmFjZS1zd2l0Y2hlci9zdXJmYWNlLXN3aXRjaGVyLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlFO0FBQ3pFLDBDQUE2QztBQUM3Qyx1Q0FBMEM7QUFFMUMsbUVBQStEO0FBQy9ELHNEQUF5RDtBQUN6RCwwQ0FBNkM7QUFDN0MsNkVBQXdFO0FBRXhFLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDeEMsSUFBSSxTQUFtQyxDQUFDO0lBQ3hDLElBQUksT0FBbUQsQ0FBQztJQUV4RCxVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRTtnQkFDUCxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLDRCQUFZO2dCQUNaLG1CQUFXO2FBQ1o7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsaUJBQVUsQ0FBQyx1QkFBYSxDQUFDO2FBQzFCO1lBQ0QsWUFBWSxFQUFFLENBQUMscURBQXdCLENBQUM7U0FDekMsQ0FBQzthQUNDLGlCQUFpQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxlQUFlLENBQUMscURBQXdCLENBQUMsQ0FBQztRQUM1RCxTQUFTLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=