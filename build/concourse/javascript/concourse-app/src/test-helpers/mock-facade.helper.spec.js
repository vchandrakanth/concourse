"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const mock_facade_helper_1 = require("./mock-facade.helper");
class TestFacade {
    constructor(store) {
        this.store = store;
        this.property1$ = this.store.pipe(operators_1.mapTo('one'));
        this.property2$ = this.store.pipe(operators_1.mapTo('two'));
        this.property3$ = this.store.pipe(operators_1.mapTo('three'));
    }
    funcOne() {
        // test function 1
    }
    funcTwo() {
        // test function 2
    }
}
describe('MockService Helper', () => {
    let mock;
    beforeAll(() => {
        mock = mock_facade_helper_1.mockFacade(TestFacade);
    });
    it('should passthrough class in \'provide\'', () => {
        expect(mock.provide).toBe(TestFacade);
    });
    it('should have 5 properties in \'useValue\'', () => {
        const count = Object.keys(mock.useValue).length;
        expect(count).toBe(5);
    });
    it('should have 2 mocked functions', () => {
        const count = Object.entries(mock.useValue).reduce((acc, [key, prop]) => {
            acc += typeof prop === 'function' ? 1 : 0;
            return acc;
        }, 0);
        expect(count).toBe(2);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1mYWNhZGUuaGVscGVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy90ZXN0LWhlbHBlcnMvbW9jay1mYWNhZGUuaGVscGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FBdUM7QUFFdkMsNkRBQWtEO0FBRWxELE1BQU0sVUFBVTtJQUtkLFlBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFKckMsZUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMzQyxlQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNDLGVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFFSixDQUFDO0lBRTFDLE9BQU87UUFDTCxrQkFBa0I7SUFDcEIsQ0FBQztJQUVELE9BQU87UUFDTCxrQkFBa0I7SUFDcEIsQ0FBQztDQUNGO0FBRUQsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtJQUNsQyxJQUFJLElBQUksQ0FBQztJQUVULFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDYixJQUFJLEdBQUcsK0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxHQUFHLEVBQUU7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBRyxFQUFFO1FBQ2xELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNoRCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtRQUN4QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUN0RSxHQUFHLElBQUksT0FBTyxJQUFJLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVOLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9