"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_fixture_1 = require("./book-fixture");
const create_adapter_1 = require("./create_adapter");
describe('Unsorted State Adapter', () => {
    let adapter;
    let state;
    beforeAll(() => {
        Object.defineProperty(Array.prototype, 'unwantedField', {
            enumerable: true,
            configurable: true,
            value: 'This should not appear anywhere'
        });
    });
    afterAll(() => {
        delete Array.prototype.unwantedField;
    });
    beforeEach(() => {
        adapter = create_adapter_1.createEntityAdapter({
            selectId: (book) => book.id
        });
        state = { ids: [], entities: {} };
    });
    it('should let you add one entity to the state', () => {
        const withOneEntity = adapter.addOne(book_fixture_1.TheGreatGatsby, state);
        expect(withOneEntity).toEqual({
            ids: [book_fixture_1.TheGreatGatsby.id],
            entities: {
                [book_fixture_1.TheGreatGatsby.id]: book_fixture_1.TheGreatGatsby
            }
        });
    });
    it('should not change state if you attempt to re-add an entity', () => {
        const withOneEntity = adapter.addOne(book_fixture_1.TheGreatGatsby, state);
        const readded = adapter.addOne(book_fixture_1.TheGreatGatsby, withOneEntity);
        expect(readded).toBe(withOneEntity);
    });
    it('should let you add many entities to the state', () => {
        const withOneEntity = adapter.addOne(book_fixture_1.TheGreatGatsby, state);
        const withManyMore = adapter.addMany([book_fixture_1.AClockworkOrange, book_fixture_1.AnimalFarm], withOneEntity);
        expect(withManyMore).toEqual({
            ids: [book_fixture_1.TheGreatGatsby.id, book_fixture_1.AClockworkOrange.id, book_fixture_1.AnimalFarm.id],
            entities: {
                [book_fixture_1.TheGreatGatsby.id]: book_fixture_1.TheGreatGatsby,
                [book_fixture_1.AClockworkOrange.id]: book_fixture_1.AClockworkOrange,
                [book_fixture_1.AnimalFarm.id]: book_fixture_1.AnimalFarm
            }
        });
    });
    it('should let you add all entities to the state', () => {
        const withOneEntity = adapter.addOne(book_fixture_1.TheGreatGatsby, state);
        const withAll = adapter.addAll([book_fixture_1.AClockworkOrange, book_fixture_1.AnimalFarm], withOneEntity);
        expect(withAll).toEqual({
            ids: [book_fixture_1.AClockworkOrange.id, book_fixture_1.AnimalFarm.id],
            entities: {
                [book_fixture_1.AClockworkOrange.id]: book_fixture_1.AClockworkOrange,
                [book_fixture_1.AnimalFarm.id]: book_fixture_1.AnimalFarm
            }
        });
    });
    it('should let you add remove an entity from the state', () => {
        const withOneEntity = adapter.addOne(book_fixture_1.TheGreatGatsby, state);
        const withoutOne = adapter.removeOne(book_fixture_1.TheGreatGatsby.id, state);
        expect(withoutOne).toEqual({
            ids: [],
            entities: {}
        });
    });
    it('should let you remove many entities by id from the state', () => {
        const withAll = adapter.addAll([book_fixture_1.TheGreatGatsby, book_fixture_1.AClockworkOrange, book_fixture_1.AnimalFarm], state);
        const withoutMany = adapter.removeMany([book_fixture_1.TheGreatGatsby.id, book_fixture_1.AClockworkOrange.id], withAll);
        expect(withoutMany).toEqual({
            ids: [book_fixture_1.AnimalFarm.id],
            entities: {
                [book_fixture_1.AnimalFarm.id]: book_fixture_1.AnimalFarm
            }
        });
    });
    it('should let you remove many entities by a predicate from the state', () => {
        const withAll = adapter.addAll([book_fixture_1.TheGreatGatsby, book_fixture_1.AClockworkOrange, book_fixture_1.AnimalFarm], state);
        const withoutMany = adapter.removeMany(p => p.id.startsWith('a'), withAll);
        expect(withoutMany).toEqual({
            ids: [book_fixture_1.TheGreatGatsby.id],
            entities: {
                [book_fixture_1.TheGreatGatsby.id]: book_fixture_1.TheGreatGatsby
            }
        });
    });
    it('should let you remove all entities from the state', () => {
        const withAll = adapter.addAll([book_fixture_1.TheGreatGatsby, book_fixture_1.AClockworkOrange, book_fixture_1.AnimalFarm], state);
        const withoutAll = adapter.removeAll(withAll);
        expect(withoutAll).toEqual({
            ids: [],
            entities: {}
        });
    });
    it('should let you update an entity in the state', () => {
        const withOne = adapter.addOne(book_fixture_1.TheGreatGatsby, state);
        const changes = { title: 'A New Hope' };
        const withUpdates = adapter.updateOne({
            id: book_fixture_1.TheGreatGatsby.id,
            changes
        }, withOne);
        expect(withUpdates).toEqual({
            ids: [book_fixture_1.TheGreatGatsby.id],
            entities: {
                [book_fixture_1.TheGreatGatsby.id]: Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), changes)
            }
        });
    });
    it('should not change state if you attempt to update an entity that has not been added', () => {
        const withUpdates = adapter.updateOne({
            id: book_fixture_1.TheGreatGatsby.id,
            changes: { title: 'A New Title' }
        }, state);
        expect(withUpdates).toBe(state);
    });
    it('should not change ids state if you attempt to update an entity that has already been added', () => {
        const withOne = adapter.addOne(book_fixture_1.TheGreatGatsby, state);
        const changes = { title: 'A New Hope' };
        const withUpdates = adapter.updateOne({
            id: book_fixture_1.TheGreatGatsby.id,
            changes
        }, withOne);
        expect(withOne.ids).toBe(withUpdates.ids);
    });
    it('should let you update the id of entity', () => {
        const withOne = adapter.addOne(book_fixture_1.TheGreatGatsby, state);
        const changes = { id: 'A New Id' };
        const withUpdates = adapter.updateOne({
            id: book_fixture_1.TheGreatGatsby.id,
            changes
        }, withOne);
        expect(withUpdates).toEqual({
            ids: [changes.id],
            entities: {
                [changes.id]: Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), changes)
            }
        });
    });
    it('should let you update many entities by id in the state', () => {
        const firstChange = { title: 'First Change' };
        const secondChange = { title: 'Second Change' };
        const withMany = adapter.addAll([book_fixture_1.TheGreatGatsby, book_fixture_1.AClockworkOrange], state);
        const withUpdates = adapter.updateMany([
            { id: book_fixture_1.TheGreatGatsby.id, changes: firstChange },
            { id: book_fixture_1.AClockworkOrange.id, changes: secondChange }
        ], withMany);
        expect(withUpdates).toEqual({
            ids: [book_fixture_1.TheGreatGatsby.id, book_fixture_1.AClockworkOrange.id],
            entities: {
                [book_fixture_1.TheGreatGatsby.id]: Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), firstChange),
                [book_fixture_1.AClockworkOrange.id]: Object.assign(Object.assign({}, book_fixture_1.AClockworkOrange), secondChange)
            }
        });
    });
    it('should let you map over entities in the state', () => {
        const firstChange = Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), { title: 'First change' });
        const secondChange = Object.assign(Object.assign({}, book_fixture_1.AClockworkOrange), { title: 'Second change' });
        const withMany = adapter.addAll([book_fixture_1.TheGreatGatsby, book_fixture_1.AClockworkOrange, book_fixture_1.AnimalFarm], state);
        const withUpdates = adapter.map(book => book.title === book_fixture_1.TheGreatGatsby.title
            ? firstChange
            : book.title === book_fixture_1.AClockworkOrange.title
                ? secondChange
                : book, withMany);
        expect(withUpdates).toEqual({
            ids: [book_fixture_1.TheGreatGatsby.id, book_fixture_1.AClockworkOrange.id, book_fixture_1.AnimalFarm.id],
            entities: {
                [book_fixture_1.TheGreatGatsby.id]: Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), firstChange),
                [book_fixture_1.AClockworkOrange.id]: Object.assign(Object.assign({}, book_fixture_1.AClockworkOrange), secondChange),
                [book_fixture_1.AnimalFarm.id]: book_fixture_1.AnimalFarm
            }
        });
    });
    it('should let you add one entity to the state with upsert()', () => {
        const withOneEntity = adapter.upsertOne(book_fixture_1.TheGreatGatsby, state);
        expect(withOneEntity).toEqual({
            ids: [book_fixture_1.TheGreatGatsby.id],
            entities: {
                [book_fixture_1.TheGreatGatsby.id]: book_fixture_1.TheGreatGatsby
            }
        });
    });
    it('should let you update an entity in the state with upsert()', () => {
        const withOne = adapter.addOne(book_fixture_1.TheGreatGatsby, state);
        const changes = { title: 'A New Hope' };
        const withUpdates = adapter.upsertOne(Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), changes), withOne);
        expect(withUpdates).toEqual({
            ids: [book_fixture_1.TheGreatGatsby.id],
            entities: {
                [book_fixture_1.TheGreatGatsby.id]: Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), changes)
            }
        });
    });
    it('should let you upsert many entities in the state', () => {
        const firstChange = { title: 'First Change' };
        const withMany = adapter.addAll([book_fixture_1.TheGreatGatsby], state);
        const withUpserts = adapter.upsertMany([Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), firstChange), book_fixture_1.AClockworkOrange], withMany);
        expect(withUpserts).toEqual({
            ids: [book_fixture_1.TheGreatGatsby.id, book_fixture_1.AClockworkOrange.id],
            entities: {
                [book_fixture_1.TheGreatGatsby.id]: Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), firstChange),
                [book_fixture_1.AClockworkOrange.id]: book_fixture_1.AClockworkOrange
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zb3J0ZWRfc3RhdGVfYWRhcHRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9zdGF0ZS1hZGFwdGVyL3Vuc29ydGVkX3N0YXRlX2FkYXB0ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUF5RjtBQUN6RixxREFBdUQ7QUFHdkQsUUFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtJQUN0QyxJQUFJLE9BQXNDLENBQUM7SUFDM0MsSUFBSSxLQUE2QixDQUFDO0lBRWxDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDYixNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsZUFBZSxFQUFFO1lBQ3RELFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLEtBQUssRUFBRSxpQ0FBaUM7U0FDekMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsR0FBRyxFQUFFO1FBQ1osT0FBUSxLQUFLLENBQUMsU0FBaUIsQ0FBQyxhQUFhLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsT0FBTyxHQUFHLG9DQUFtQixDQUFDO1lBQzVCLFFBQVEsRUFBRSxDQUFDLElBQWUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7U0FDdkMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNENBQTRDLEVBQUUsR0FBRyxFQUFFO1FBQ3BELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsNkJBQWMsRUFB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