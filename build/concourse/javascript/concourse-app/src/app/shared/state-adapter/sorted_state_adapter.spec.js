"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_fixture_1 = require("./book-fixture");
const create_adapter_1 = require("./create_adapter");
describe('Sorted State Adapter', () => {
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
            selectId: (book) => book.id,
            sortComparer: (a, b) => a.title.localeCompare(b.title)
        });
        state = { ids: [], entities: {} };
    });
    it('should let you add one entity to the state', () => {
        const withOneEntity = adapter.addOne(book_fixture_1.TheGreatGatsby, state);
        expect(withOneEntity).toEqual({
            ids: [book_fixture_1.TheGreatGatsby.id],
            entities: {
                [book_fixture_1.TheGreatGatsby.id]: book_fixture_1.TheGreatGatsby,
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
            ids: [book_fixture_1.AClockworkOrange.id, book_fixture_1.AnimalFarm.id, book_fixture_1.TheGreatGatsby.id],
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
    it('should not change ids state if you attempt to update an entity that does not impact sorting', () => {
        const withAll = adapter.addAll([book_fixture_1.TheGreatGatsby, book_fixture_1.AClockworkOrange, book_fixture_1.AnimalFarm], state);
        const changes = { title: 'The Great Gatsby II' };
        const withUpdates = adapter.updateOne({
            id: book_fixture_1.TheGreatGatsby.id,
            changes
        }, withAll);
        expect(withAll.ids).toBe(withUpdates.ids);
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
    it('should resort correctly if same id but sort key update', () => {
        const withAll = adapter.addAll([book_fixture_1.TheGreatGatsby, book_fixture_1.AnimalFarm, book_fixture_1.AClockworkOrange], state);
        const changes = { title: 'A New Hope' };
        const withUpdates = adapter.updateOne({
            id: book_fixture_1.TheGreatGatsby.id,
            changes
        }, withAll);
        expect(withUpdates).toEqual({
            ids: [book_fixture_1.AClockworkOrange.id, book_fixture_1.TheGreatGatsby.id, book_fixture_1.AnimalFarm.id],
            entities: {
                [book_fixture_1.AClockworkOrange.id]: book_fixture_1.AClockworkOrange,
                [book_fixture_1.TheGreatGatsby.id]: Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), changes),
                [book_fixture_1.AnimalFarm.id]: book_fixture_1.AnimalFarm
            }
        });
    });
    it('should resort correctly if the id and sort key update', () => {
        const withOne = adapter.addAll([book_fixture_1.TheGreatGatsby, book_fixture_1.AnimalFarm, book_fixture_1.AClockworkOrange], state);
        const changes = { id: 'A New Id', title: book_fixture_1.AnimalFarm.title };
        const withUpdates = adapter.updateOne({
            id: book_fixture_1.TheGreatGatsby.id,
            changes
        }, withOne);
        expect(withUpdates).toEqual({
            ids: [book_fixture_1.AClockworkOrange.id, changes.id, book_fixture_1.AnimalFarm.id],
            entities: {
                [book_fixture_1.AClockworkOrange.id]: book_fixture_1.AClockworkOrange,
                [changes.id]: Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), changes),
                [book_fixture_1.AnimalFarm.id]: book_fixture_1.AnimalFarm
            }
        });
    });
    it('should let you update many entities by id in the state', () => {
        const firstChange = { title: 'Zack' };
        const secondChange = { title: 'Aaron' };
        const withMany = adapter.addAll([book_fixture_1.TheGreatGatsby, book_fixture_1.AClockworkOrange], state);
        const withUpdates = adapter.updateMany([
            { id: book_fixture_1.TheGreatGatsby.id, changes: firstChange },
            { id: book_fixture_1.AClockworkOrange.id, changes: secondChange }
        ], withMany);
        expect(withUpdates).toEqual({
            ids: [book_fixture_1.AClockworkOrange.id, book_fixture_1.TheGreatGatsby.id],
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
            ids: [book_fixture_1.AnimalFarm.id, book_fixture_1.TheGreatGatsby.id, book_fixture_1.AClockworkOrange.id],
            entities: {
                [book_fixture_1.AnimalFarm.id]: book_fixture_1.AnimalFarm,
                [book_fixture_1.TheGreatGatsby.id]: Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), firstChange),
                [book_fixture_1.AClockworkOrange.id]: Object.assign(Object.assign({}, book_fixture_1.AClockworkOrange), secondChange)
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
        const firstChange = { title: 'Zack' };
        const withMany = adapter.addAll([book_fixture_1.TheGreatGatsby], state);
        const withUpserts = adapter.upsertMany([Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), firstChange), book_fixture_1.AClockworkOrange], withMany);
        expect(withUpserts).toEqual({
            ids: [book_fixture_1.AClockworkOrange.id, book_fixture_1.TheGreatGatsby.id],
            entities: {
                [book_fixture_1.TheGreatGatsby.id]: Object.assign(Object.assign({}, book_fixture_1.TheGreatGatsby), firstChange),
                [book_fixture_1.AClockworkOrange.id]: book_fixture_1.AClockworkOrange
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVkX3N0YXRlX2FkYXB0ZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvc3RhdGUtYWRhcHRlci9zb3J0ZWRfc3RhdGVfYWRhcHRlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQXlGO0FBQ3pGLHFEQUF1RDtBQUd2RCxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLElBQUksT0FBc0MsQ0FBQztJQUMzQyxJQUFJLEtBQTZCLENBQUM7SUFFbEMsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUU7WUFDdEQsVUFBVSxFQUFFLElBQUk7WUFDaEIsWUFBWSxFQUFFLElBQUk7WUFDbEIsS0FBSyxFQUFFLGlDQUFpQztTQUN6QyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDWixPQUFRLEtBQUssQ0FBQyxTQUFpQixDQUFDLGFBQWEsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEdBQUcsb0NBQW1CLENBQUM7WUFDNUIsUUFBUSxFQUFFLENBQUMsSUFBZSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3ZELENBQUMsQ0FBQztRQUVILEtBQUssR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3BDLENBQUMs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