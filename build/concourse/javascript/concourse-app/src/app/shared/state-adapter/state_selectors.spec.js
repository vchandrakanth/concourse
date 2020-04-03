"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@ngrx/store");
const book_fixture_1 = require("./book-fixture");
const create_adapter_1 = require("./create_adapter");
describe('Entity State Selectors', () => {
    describe('Composed Selectors', () => {
        let adapter;
        let selectors;
        let state;
        beforeEach(() => {
            adapter = create_adapter_1.createEntityAdapter({
                selectId: (book) => book.id
            });
            state = {
                books: adapter.addAll([book_fixture_1.AClockworkOrange, book_fixture_1.AnimalFarm, book_fixture_1.TheGreatGatsby], adapter.getInitialState())
            };
            selectors = adapter.getSelectors((state) => state.books);
        });
        it('should create a selector for selecting the ids', () => {
            const ids = selectors.selectIds(state);
            expect(ids).toEqual(state.books.ids);
        });
        it('should create a selector for selecting the entities', () => {
            const entities = selectors.selectEntities(state);
            expect(entities).toEqual(state.books.entities);
        });
        it('should create a selector for selecting the list of models', () => {
            const models = selectors.selectAll(state);
            expect(models).toEqual([book_fixture_1.AClockworkOrange, book_fixture_1.AnimalFarm, book_fixture_1.TheGreatGatsby]);
        });
        it('should create a selector for selecting the count of models', () => {
            const total = selectors.selectTotal(state);
            expect(total).toEqual(3);
        });
    });
    describe('Uncomposed Selectors', () => {
        let adapter;
        let selectors;
        let state;
        beforeEach(() => {
            adapter = create_adapter_1.createEntityAdapter({
                selectId: (book) => book.id
            });
            state = adapter.addAll([book_fixture_1.AClockworkOrange, book_fixture_1.AnimalFarm, book_fixture_1.TheGreatGatsby], adapter.getInitialState());
            selectors = adapter.getSelectors();
        });
        it('should create a selector for selecting the ids', () => {
            const ids = selectors.selectIds(state);
            expect(ids).toEqual(state.ids);
        });
        it('should create a selector for selecting the entities', () => {
            const entities = selectors.selectEntities(state);
            expect(entities).toEqual(state.entities);
        });
        it('should type single entity from Dictionary as entity type or undefined', () => {
            // MemoizedSelector acts like a type checker
            const singleEntity = store_1.createSelector(selectors.selectEntities, enitites => enitites[0]);
        });
        it('should create a selector for selecting the list of models', () => {
            const models = selectors.selectAll(state);
            expect(models).toEqual([book_fixture_1.AClockworkOrange, book_fixture_1.AnimalFarm, book_fixture_1.TheGreatGatsby]);
        });
        it('should create a selector for selecting the count of models', () => {
            const total = selectors.selectTotal(state);
            expect(total).toEqual(3);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfc2VsZWN0b3JzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3N0YXRlLWFkYXB0ZXIvc3RhdGVfc2VsZWN0b3JzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBK0Q7QUFDL0QsaURBQXlGO0FBQ3pGLHFEQUF1RDtBQUd2RCxRQUFRLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFO0lBQ3RDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7UUFLbEMsSUFBSSxPQUFpQyxDQUFDO1FBQ3RDLElBQUksU0FBNEMsQ0FBQztRQUNqRCxJQUFJLEtBQVksQ0FBQztRQUVqQixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsT0FBTyxHQUFHLG9DQUFtQixDQUFDO2dCQUM1QixRQUFRLEVBQUUsQ0FBQyxJQUFlLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2FBQ3ZDLENBQUMsQ0FBQztZQUVILEtBQUssR0FBRztnQkFDTixLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FDbkIsQ0FBQywrQkFBZ0IsRUFBRSx5QkFBVSxFQUFFLDZCQUFjLENBQUMsRUFDOUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUMxQjthQUNGLENBQUM7WUFFRixTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGdEQUFnRCxFQUFFLEdBQUcsRUFBRTtZQUN4RCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXZDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFD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