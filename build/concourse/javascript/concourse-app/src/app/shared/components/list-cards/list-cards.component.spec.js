"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
const slice_initial_pipe_1 = require("@concourse/shared/pipes/slice-initial.pipe");
const version_text_pipe_1 = require("@concourse/shared/pipes/version-text.pipe");
const list_cards_component_1 = require("./list-cards.component");
describe('ListCardsComponent', () => {
    let component;
    let fixture;
    beforeEach(testing_1.async(() => {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                angular_fontawesome_1.FontAwesomeModule
            ],
            declarations: [
                version_text_pipe_1.VersionTextPipe,
                slice_initial_pipe_1.SliceInitialPipe,
                list_cards_component_1.ListCardComponent
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = testing_1.TestBed.createComponent(list_cards_component_1.ListCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should display a null-state component render when an empty array is provided', () => {
        component.cardTitle = 'Policy Templates';
        component.cardListData = [];
        fixture.detectChanges();
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeTruthy();
    });
    it('should have a null state when undefined is provided', () => {
        component.cardTitle = 'Policy Templates';
        component.cardListData = undefined;
        fixture.detectChanges();
        const nullStateComponent = fixture.debugElement.query(platform_browser_1.By.css('app-null-state'));
        expect(nullStateComponent).toBeTruthy();
    });
    it('should return an array with one element when given an object', () => {
        const sampleObject = { id: 0, name: 'sample' };
        component.cardListData = sampleObject; // ignore type error
        fixture.detectChanges();
        expect(Array.isArray(component.cardListData)).toBe(true);
        expect(component.cardListData).toEqual([sampleObject]);
    });
    it('should return and unmodified array when given and array', () => {
        const sampleArray = [{ id: 0, name: 'sample' }];
        component.cardListData = sampleArray;
        fixture.detectChanges();
        expect(Array.isArray(component.cardListData)).toBe(true);
        expect(component.cardListData).toEqual(sampleArray);
    });
    describe('Verify buttonText() before and after toggleView() is triggered based on number of elements in cardListData @Input()', () => {
        const sampleArray = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]; // dummy elements greater than 4
        let btnFixture;
        beforeEach(() => {
            component.cardTitle = 'Policy Templates';
            fixture.detectChanges();
        });
        it('should not render a button to toggle the view if number of elements is < 4', () => {
            component.cardListData = [{ id: 0 }, { id: 1 }];
            fixture.detectChanges();
            btnFixture = fixture.debugElement.query(platform_browser_1.By.css('button.btn-link'));
            expect(!!btnFixture).toBeFalsy();
        });
        it('should render the default button text when the view is limited', () => {
            component.cardListData = sampleArray;
            fixture.detectChanges();
            btnFixture = fixture.debugElement.query(platform_browser_1.By.css('button.btn-link'));
            expect(component.allVisible).toBe(false);
            expect(btnFixture.nativeElement.textContent).toEqual(`View ${sampleArray.length - 4} more policy templates`);
        });
        it('should render the updated button text when user clicks to view all', () => {
            component.cardListData = sampleArray;
            fixture.detectChanges();
            btnFixture = fixture.debugElement.query(platform_browser_1.By.css('button.btn-link'));
            btnFixture.triggerEventHandler('click', undefined);
            fixture.detectChanges();
            expect(component.allVisible).toBe(true);
            expect(btnFixture.nativeElement.textContent).toEqual('View fewer policy templates');
        });
    });
    describe('Verify number of list elements rendered when provided an array', () => {
        const sampleArray = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
        let btnFixture;
        beforeEach(() => {
            component.cardListData = sampleArray;
            component.cardTitle = 'Policy Templates';
            fixture.detectChanges();
            btnFixture = fixture.debugElement.query(platform_browser_1.By.css('button.btn-link'));
        });
        it('should return 4 elements if provided n > 3 array elements', () => {
            expect(fixture.debugElement.queryAll(platform_browser_1.By.css('.list-group-item')).length).toBe(4);
        });
        it('should return n number of elements if provided n > 3 array elements and toggleView() was triggered', () => {
            btnFixture.triggerEventHandler('click', undefined);
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(platform_browser_1.By.css('.list-group-item')).length).toBe(sampleArray.length);
        });
    });
    // TODO: should look into testing with transclusion
    it('should verfiy that the component rendered correctly with a mock static set of data for a single Policy', () => {
        component.cardTitle = 'Policy Group Template';
        component.cardListData = [
            {
                created: '2019-04-30T06:30:41.587Z',
                updated: '2019-04-30T14:33:57.312Z',
                version: 4,
                id: 50011,
                createdBy: 1001,
                updatedBy: 1001,
                institutionId: 1001,
                majorVersion: 1,
                minorVersion: 1,
                isLatest: true,
                name: 'synthesizing template',
                lineageId: 50011,
                status: 'PUBLISHED',
                policyGroups: [
                    {
                        id: 60011
                    }
                ],
                policyTemplates: [
                    {
                        created: '2019-04-30T16:28:13.141Z',
                        updated: '2019-04-29T21:39:47.427Z',
                        version: 2,
                        id: 10007,
                        name: 'Allow AWS Regions',
                        predicate: '{Allow} Deployment of Assets only in Regions: {AwsRegion}',
                        claims: 'Only AWS Regions provided in the provided group are (dis)allowed.',
                        proofs: 'Only Regions present in the list are permitted for a given Deployment.',
                        repeatable: false,
                        attributes: [
                            {
                                created: '2019-04-30T07:25:47.485Z',
                                updated: '2019-04-30T19:28:42.412Z',
                                version: 3,
                                id: 30007,
                                name: 'Allow',
                                type: 'ALLOW',
                                multipleValued: false
                            },
                            {
                                created: '2019-04-30T02:47:07.066Z',
                                updated: '2019-04-30T11:01:49.548Z',
                                version: 3,
                                id: 30017,
                                name: 'AwsRegion',
                                type: 'AWS_REGION',
                                multipleValued: true
                            }
                        ]
                    },
                    {
                        created: '2019-04-29T22:13:01.709Z',
                        updated: '2019-04-30T07:48:03.353Z',
                        version: 5,
                        id: 10003,
                        name: 'Encrypt Stateful Data',
                        predicate: 'All Services encrypt stored data',
                        claims: 'Ensures any Service being used which contains STATEFUL data must be encrypted.',
                        proofs: 'All Services within the deployed Control Artifact which are STATEFUL support encryption.\n\nAll STATEFUL Services have a valid encryption key.',
                        repeatable: false,
                        attributes: []
                    }
                ],
                description: 'Consequuntur quam consequuntur quibusdam id minima hic recusandae. Excepturi aut dolor voluptas facere est quo ut explicabo. Rerum cum voluptatibus ab ipsum incidunt velit. In possimus tempora vel earum et.\n \rRem non dicta voluptas. Commodi vitae error incidunt dolorum aut. Praesentium quisquam sit repellendus quaerat. Quibusdam possimus ullam qui voluptate fugiat deserunt qui. Provident sint laborum reiciendis. Architecto deserunt aut officiis impedit nobis.'
            }
        ];
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jYXJkcy5jb21wb25lbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9saXN0LWNhcmRzL2xpc3QtY2FyZHMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBaUQ7QUFDakQsbURBQXlFO0FBQ3pFLGdFQUErQztBQUMvQywwRUFBcUU7QUFFckUsbUZBQThFO0FBQzlFLGlGQUE0RTtBQUM1RSxpRUFBMkQ7QUFFM0QsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxJQUFJLFNBQTRCLENBQUM7SUFDakMsSUFBSSxPQUE0QyxDQUFDO0lBRWpELFVBQVUsQ0FBQyxlQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLHVDQUFpQjthQUNsQjtZQUNELFlBQVksRUFBRTtnQkFDWixtQ0FBZTtnQkFDZixxQ0FBZ0I7Z0JBQ2hCLHdDQUFpQjthQUNsQjtTQUNGLENBQUM7YUFDQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLGlCQUFPLENBQUMsZUFBZSxDQUFDLHdDQUFpQixDQUFDLENBQUM7UUFDckQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztRQUN0QyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFF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