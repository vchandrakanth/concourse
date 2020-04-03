"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@ngrx/effects/testing");
const jasmine_marbles_1 = require("jasmine-marbles");
const error_actions_1 = require("@concourse/core/error/state/error.actions");
const test_1 = require("@concourse/test");
const fakeAttributeTags = require("../services/attribute-tag.faker");
const attribute_tag_service_1 = require("../services/attribute-tag.service");
const attribute_tag_actions_1 = require("./attribute-tag.actions");
const attribute_tag_effects_1 = require("./attribute-tag.effects");
const attribute_tag_facade_1 = require("./attribute-tag.facade");
describe('LoadAttributeTags', () => {
    let actions;
    let effects;
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            providers: [
                attribute_tag_effects_1.AttributeTagEffects,
                testing_2.provideMockActions(() => actions),
                test_1.mockFacade(attribute_tag_facade_1.AttributeTagFacade),
                {
                    provide: attribute_tag_service_1.AttributeTagService,
                    useValue: {
                        list: jest.fn(),
                        get: jest.fn()
                    }
                }
            ]
        });
        effects = testing_1.TestBed.get(attribute_tag_effects_1.AttributeTagEffects);
        service = testing_1.TestBed.get(attribute_tag_service_1.AttributeTagService);
    });
    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
    describe('LoadAttributeTags$', () => {
        it('should return a LoadAttributeTagsSuccess, with an array of attribute tags, on success', () => {
            const attributeTags = fakeAttributeTags.fakeMany();
            const action = new attribute_tag_actions_1.LoadAttributeTags();
            const outcome = new attribute_tag_actions_1.LoadAttributeTagsSuccess(attributeTags);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: attributeTags });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.list = jest.fn(() => response);
            expect(effects.loadAttributeTags$).toBeObservable(expected);
        });
        it('should return a LoadAttributeTagsFailure, with an error, on failure', () => {
            const action = new attribute_tag_actions_1.LoadAttributeTags();
            const error = new Error('Error!');
            const outcome = new error_actions_1.AddApplicationError({
                message: error.message,
                displayType: 'toast',
                rawError: error
            });
            const err = new attribute_tag_actions_1.LoadAttributeTagsFailure();
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-#|', undefined, error);
            const expected = jasmine_marbles_1.cold('--(bc)', { b: outcome, c: err });
            service.list = jest.fn(() => response);
            expect(effects.loadAttributeTags$).toBeObservable(expected);
        });
    });
    describe('loadAttributeTag$', () => {
        it('should return a LoadAttributeTagSuccess, with a single attribute tag, on success', () => {
            const attributeTag = fakeAttributeTags.fakeOne();
            const action = new attribute_tag_actions_1.LoadAttributeTag(attributeTag.id);
            const outcome = new attribute_tag_actions_1.LoadAttributeTagSuccess(attributeTag);
            actions = jasmine_marbles_1.hot('-a', { a: action });
            const response = jasmine_marbles_1.cold('-a|', { a: attributeTag });
            const expected = jasmine_marbles_1.cold('--b', { b: outcome });
            service.get = jest.fn(() => response);
            expect(effects.loadAttributeTag$).toBeObservable(expected);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLXRhZy5lZmZlY3RzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYXR0cmlidXRlLXRhZy9zdGF0ZS9hdHRyaWJ1dGUtdGFnLmVmZmVjdHMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxtREFBMkQ7QUFFM0QscURBQTRDO0FBRzVDLDZFQUFnRjtBQUNoRiwwQ0FBNkM7QUFDN0MscUVBQXFFO0FBQ3JFLDZFQUF3RTtBQUN4RSxtRUFNaUM7QUFDakMsbUVBQThEO0FBQzlELGlFQUE0RDtBQUU1RCxRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO0lBQ2pDLElBQUksT0FBd0IsQ0FBQztJQUM3QixJQUFJLE9BQTRCLENBQUM7SUFDakMsSUFBSSxPQUE0QixDQUFDO0lBRWpDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLFNBQVMsRUFBRTtnQkFDVCwyQ0FBbUI7Z0JBQ25CLDRCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakMsaUJBQVUsQ0FBQyx5Q0FBa0IsQ0FBQztnQkFDOUI7b0JBQ0UsT0FBTyxFQUFFLDJDQUFtQjtvQkFDNUIsUUFBUSxFQUFFO3dCQUNSLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3dCQUNmLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO3FCQUNmO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsMkNBQW1CLENBQUMsQ0FBQztRQUMzQyxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxHQUFHLENBQUMsMkNBQW1CLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUMsQ0FB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