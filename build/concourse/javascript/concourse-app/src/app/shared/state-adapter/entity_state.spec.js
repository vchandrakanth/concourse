"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_adapter_1 = require("./create_adapter");
describe('Entity State', () => {
    let adapter;
    beforeEach(() => {
        adapter = create_adapter_1.createEntityAdapter({
            selectId: (book) => book.id
        });
    });
    it('should let you get the initial state', () => {
        const initialState = adapter.getInitialState();
        expect(initialState).toEqual({
            ids: [],
            entities: {}
        });
    });
    it('should let you provide additional initial state properties', () => {
        const additionalProperties = { isHydrated: true };
        const initialState = adapter.getInitialState(additionalProperties);
        expect(initialState).toEqual(Object.assign(Object.assign({}, additionalProperties), { ids: [], entities: {} }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5X3N0YXRlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3N0YXRlLWFkYXB0ZXIvZW50aXR5X3N0YXRlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxREFBdUQ7QUFHdkQsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7SUFDNUIsSUFBSSxPQUFpQyxDQUFDO0lBRXRDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsb0NBQW1CLENBQUM7WUFDNUIsUUFBUSxFQUFFLENBQUMsSUFBZSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUN2QyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7UUFDOUMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRS9DLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDM0IsR0FBRyxFQUFFLEVBQUU7WUFDUCxRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDREQUE0RCxFQUFFLEdBQUcsRUFBRTtRQUNwRSxNQUFNLG9CQUFvQixHQUFHLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO1FBRWxELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUVuRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxpQ0FDdkIsb0JBQW9CLEtBQ3ZCLEdBQUcsRUFBRSxFQUFFLEVBQ1AsUUFBUSxFQUFFLEVBQUUsSUFDWixDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9