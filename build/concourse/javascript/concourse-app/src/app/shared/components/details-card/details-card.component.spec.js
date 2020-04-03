"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const ng_let_directive_1 = require("@concourse/shared/directives/ng-let.directive");
const version_text_pipe_1 = require("@concourse/shared/pipes/version-text.pipe");
const test_1 = require("@concourse/test");
const details_card_component_1 = require("./details-card.component");
describe('DetailsCardComponent', () => {
    let component;
    let fixture;
    const cardData = {
        created: '2019-04-26T10:06:37.259',
        updated: '2019-04-25T18:11:28.578',
        version: 0,
        id: 60001,
        majorVersion: 4,
        minorVersion: 2,
        name: 'initiative',
        description: '',
        institutionId: 1001,
        model: {
            name: 'Test',
            id: 123
        },
        status: 'TESTING',
        isLatest: true,
        parent: { child: 'someData' }
    };
    const cardContent = [
        { label: 'Status', prop: 'status' },
        { label: 'Is Latest', prop: 'isLatest' },
        { label: 'Nested Test', prop: 'parent.child' },
        { label: 'Model', prop: 'model.name', routerLink: ['/model/', 'model.id'] }
    ];
    beforeEach(testing_1.async(() => {
        const configure = testBed => {
            testBed
                .configureTestingModule({
                schemas: [core_1.NO_ERRORS_SCHEMA],
                declarations: [
                    ng_let_directive_1.NgLetDirective,
                    version_text_pipe_1.VersionTextPipe,
                    details_card_component_1.DetailsCardComponent
                ]
            });
        };
        test_1.configureTests(configure).then(testBed => {
            fixture = testBed.createComponent(details_card_component_1.DetailsCardComponent);
            component = fixture.componentInstance;
            component.cardContent = cardContent;
            component.cardData = cardData;
            fixture.detectChanges();
        });
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should match snapshot', () => {
        expect(fixture).toMatchSnapshot();
    });
    it('should extract a property using extractProperty()', () => {
        expect(component.extractProperty(component.cardContent[0].prop)).toBe('TESTING');
    });
    it('should return a deeply nested object using extractProperty()', () => {
        expect(component.extractProperty(component.cardContent[2].prop)).toBe('someData');
    });
    it('should create a routerLink array and parse properties', () => {
        const withRouterLink = {
            label: 'Model',
            prop: 'model.name',
            routerLink: ['/model/', 'model.id']
        };
        expect(component.routerLink(withRouterLink)).toEqual(['/model/', 123]);
    });
    it('should verify that 8 div groups render to the DOM', () => {
        const renderedSpanGroups = fixture.debugElement.queryAll(platform_browser_1.By.css('div.details-card-table div'));
        expect(renderedSpanGroups.length).toBe(7);
    });
    it('should show version, if majorVersion and minorVersion exist', () => {
        const showVersion = component.showVersion;
        expect(showVersion).toBeTruthy();
    });
    it('should hide version, if majorVersion and minorVersion dont exist', () => {
        component.cardData = Object.assign(Object.assign({}, component.cardContent), { minorVersion: undefined, majorVersion: undefined });
        const showVersion = component.showVersion;
        expect(showVersion).toBeFalsy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlscy1jYXJkLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2RldGFpbHMtY2FyZC9kZXRhaWxzLWNhcmQuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBaUQ7QUFDakQsbURBQWdFO0FBQ2hFLGdFQUErQztBQUcvQyxvRkFBK0U7QUFDL0UsaUZBQTRFO0FBQzVFLDBDQUE4RDtBQUM5RCxxRUFBZ0U7QUFFaEUsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtJQUNwQyxJQUFJLFNBQStCLENBQUM7SUFDcEMsSUFBSSxPQUErQyxDQUFDO0lBRXBELE1BQU0sUUFBUSxHQUFHO1FBQ2YsT0FBTyxFQUFFLHlCQUF5QjtRQUNsQyxPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLE9BQU8sRUFBRSxDQUFDO1FBQ1YsRUFBRSxFQUFFLEtBQUs7UUFDVCxZQUFZLEVBQUUsQ0FBQztRQUNmLFlBQVksRUFBRSxDQUFDO1FBQ2YsSUFBSSxFQUFFLFlBQVk7UUFDbEIsV0FBVyxFQUFFLEVBQUU7UUFDZixhQUFhLEVBQUUsSUFBSTtRQUNuQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLEVBQUUsRUFBRSxHQUFHO1NBQ1I7UUFDRCxNQUFNLEVBQUUsU0FBUztRQUNqQixRQUFRLEVBQUUsSUFBSTtRQUNkLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7S0FDOUIsQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHO1FBQ2xCLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1FBQ25DLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO1FBQ3hD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