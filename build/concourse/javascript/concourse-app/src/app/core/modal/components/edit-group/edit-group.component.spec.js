"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const dynamic_form_1 = require("@concourse/shared/dynamic-form");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const store_1 = require("@ngrx/store");
const alert_1 = require("ngx-bootstrap/alert");
const rxjs_1 = require("rxjs");
const group_faker_1 = require("@concourse/store/group/services/group.faker");
const fromGroup = require("@concourse/store/group/state/group.reducer");
const facades_1 = require("@concourse/store/facades");
const test_1 = require("@concourse/test");
const edit_group_component_1 = require("./edit-group.component");
describe('EditGroupComponent', () => {
    let component;
    let fixture;
    let groupFacade;
    const mockGroup = group_faker_1.fakeOne();
    const newGroup = {
        name: 'Manage Accounts Group',
        description: 'it should manage accounts.'
    };
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                store_1.StoreModule.forRoot({
                    group: fromGroup.reducer
                }),
                angular_fontawesome_1.FontAwesomeModule,
                dynamic_form_1.DynamicFormModule,
                alert_1.AlertModule.forRoot()
            ],
            providers: [
                test_1.mockFacade(facades_1.GroupFacade, {
                    isUpdating$: new rxjs_1.BehaviorSubject(true),
                    selected$: new rxjs_1.BehaviorSubject(mockGroup)
                })
            ],
            declarations: [edit_group_component_1.EditGroupComponent]
        })
            .compileComponents();
        groupFacade = testing_1.TestBed.get(facades_1.GroupFacade);
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(edit_group_component_1.EditGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be valid if values exist in form', () => {
        expect(component.form.valid).toBeTruthy();
    });
    it('should get group details with saved name and description', testing_1.async(() => {
        fixture.whenStable().then(() => {
            const name = fixture.debugElement.query(platform_browser_1.By.css('#name'));
            const description = fixture.debugElement.query(platform_browser_1.By.css('#description'));
            const nameEl = name.nativeElement;
            const descriptionEl = description.nativeElement;
            expect(nameEl.value).toBe(mockGroup.name);
            expect(descriptionEl.value).toBe(mockGroup.description);
            nameEl.value = newGroup.name;
            descriptionEl.value = newGroup.description;
            nameEl.dispatchEvent(new Event('input'));
            descriptionEl.dispatchEvent(new Event('input'));
            expect(nameEl.value).toBe(newGroup.name);
            expect(component.form.valid).toBeTruthy();
        });
    }));
    it('should update group', () => {
        const group = mockGroup.copyWith(Object.assign({}, newGroup));
        component.submit(mockGroup, newGroup);
        expect(groupFacade.update).toHaveBeenCalledWith(group);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1ncm91cC5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvZWRpdC1ncm91cC9lZGl0LWdyb3VwLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELG1EQUF5RTtBQUN6RSxnRUFBK0M7QUFDL0MsaUVBQW1FO0FBQ25FLDBFQUFxRTtBQUNyRSx1Q0FBMEM7QUFDMUMsK0NBQWtEO0FBQ2xELCtCQUF1QztBQUV2Qyw2RUFBc0U7QUFDdEUsd0VBQXdFO0FBQ3hFLHNEQUF1RDtBQUN2RCwwQ0FBNkM7QUFDN0MsaUVBQTREO0FBRTVELFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsSUFBSSxTQUE2QixDQUFDO0lBQ2xDLElBQUksT0FBNkMsQ0FBQztJQUNsRCxJQUFJLFdBQXdCLENBQUM7SUFDN0IsTUFBTSxTQUFTLEdBQUcscUJBQU8sRUFBRSxDQUFDO0lBQzVCLE1BQU0sUUFBUSxHQUFHO1FBQ2YsSUFBSSxFQUFFLHVCQUF1QjtRQUM3QixXQUFXLEVBQUUsNEJBQTRCO0tBQzFDLENBQUM7SUFFRixVQUFVLENBQUMsZUFBSyxDQUFDLEdBQUcsRUFBRTtRQUNwQixpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCxtQkFBVyxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxPQUFPO2lCQUN6QixDQUFDO2dCQUNGLHVDQUFpQjtnQkFDakIsZ0NBQWlCO2dCQUNqQixtQkFBVyxDQUFDLE9BQU8sRUFBRTthQUN0QjtZQUNELFNBQVMsRUFBRTtnQkFDVCxpQkFBVSxD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