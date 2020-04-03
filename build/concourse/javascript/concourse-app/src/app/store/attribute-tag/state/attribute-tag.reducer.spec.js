"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fakeAttributes = require("../services/attribute-tag.faker");
const attribute_tag_actions_1 = require("./attribute-tag.actions");
const attribute_tag_reducer_1 = require("./attribute-tag.reducer");
describe('AttributeTag Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = attribute_tag_reducer_1.reducer(attribute_tag_reducer_1.initialState, action);
            expect(result).toBe(attribute_tag_reducer_1.initialState);
        });
    });
    describe('LoadAttributeTag Actions', () => {
        describe('LoadAttributeTags', () => {
            it('should set loading to true', () => {
                const action = {
                    type: attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTags
                };
                const result = attribute_tag_reducer_1.reducer(attribute_tag_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadAttributeTagsSuccess', () => {
            const tags = fakeAttributes.fakeMany(2);
            const action = {
                type: attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTagsSuccess,
                payload: tags
            };
            const entities = {
                [tags[0].id]: tags[0],
                [tags[1].id]: tags[1]
            };
            const ids = [tags[0].id, tags[1].id];
            const result = attribute_tag_reducer_1.reducer(attribute_tag_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to true', () => {
                expect(result.loaded).toBe(true);
            });
            it('should have two entities', () => {
                expect(Object.keys(result.entities).length).toBe(2);
            });
            it('should have two ids', () => {
                expect(result.ids.length).toBe(2);
                expect(result.ids).toEqual(ids);
            });
        });
        describe('LoadAttributeTagsFailure', () => {
            const action = new attribute_tag_actions_1.LoadAttributeTagsFailure();
            const result = attribute_tag_reducer_1.reducer(attribute_tag_reducer_1.initialState, action);
            it('should set loaded to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to false', () => {
                expect(result.loaded).toBe(false);
            });
        });
    });
    describe('LoadAttributeTag Actions', () => {
        describe('LoadAttributeAction', () => {
            it('should set loading to true', () => {
                const tag = fakeAttributes.fakeOne();
                const action = {
                    type: attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTag,
                    payload: tag.id
                };
                const result = attribute_tag_reducer_1.reducer(attribute_tag_reducer_1.initialState, action);
                expect(result.loading).toBe(true);
            });
        });
        describe('LoadAttributeTagSuccess', () => {
            const tag = fakeAttributes.fakeOne();
            const action = {
                type: attribute_tag_actions_1.AttributeTagActionTypes.LoadAttributeTagSuccess,
                payload: tag
            };
            const entities = {
                [tag.id]: tag
            };
            const ids = [tag.id];
            const result = attribute_tag_reducer_1.reducer(attribute_tag_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
            it('should set loaded to true', () => {
                expect(result.loaded).toBe(true);
            });
            it('should have one entity', () => {
                expect(Object.keys(result.entities).length).toBe(ids.length);
                expect(result.entities).toEqual(entities);
            });
            it('should have one id', () => {
                expect(result.ids.length).toBe(ids.length);
                expect(result.ids[0]).toBe(tag.id);
            });
        });
        describe('LoadAttributeTagFailure', () => {
            const action = new attribute_tag_actions_1.LoadAttributeTagFailure();
            const result = attribute_tag_reducer_1.reducer(attribute_tag_reducer_1.initialState, action);
            it('should set loading to false', () => {
                expect(result.loading).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLXRhZy5yZWR1Y2VyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYXR0cmlidXRlLXRhZy9zdGF0ZS9hdHRyaWJ1dGUtdGFnLnJlZHVjZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtFQUFrRTtBQUNsRSxtRUFRaUM7QUFDakMsbUVBQWdFO0FBRWhFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUM5QixFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1lBQ3pDLE1BQU0sTUFBTSxHQUFHLEVBQVMsQ0FBQztZQUV6QixNQUFNLE1BQU0sR0FBRywrQkFBTyxDQUFDLG9DQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxvQ0FBWSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7UUFDeEMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtZQUNqQyxFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO2dCQUNwQyxNQUFNLE1BQU0sR0FBc0I7b0JBQ2hDLElBQUksRUFBRSwrQ0FBdUIsQ0FBQyxpQkFBaUI7aUJBQ2hELENBQUM7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsK0JBQU8sQ0FBQyxvQ0FBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FB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