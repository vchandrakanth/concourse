"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ngCore = require("@angular/core");
const book_fixture_1 = require("./book-fixture");
const utils_1 = require("./utils");
describe('Entity utils', () => {
    describe('selectIdValue()', () => {
        it('should not warn when key does exist', () => {
            const spy = spyOn(console, 'warn');
            const key = utils_1.selectIdValue(book_fixture_1.AClockworkOrange, book => book.id);
            expect(spy).not.toHaveBeenCalled();
        });
        it('should warn when key does not exist in dev mode', () => {
            const spy = spyOn(console, 'warn');
            const key = utils_1.selectIdValue(book_fixture_1.AClockworkOrange, (book) => book.foo);
            expect(spy).toHaveBeenCalled();
        });
        it('should warn when key is undefined in dev mode', () => {
            const spy = spyOn(console, 'warn');
            const undefinedAClockworkOrange = Object.assign(Object.assign({}, book_fixture_1.AClockworkOrange), { id: undefined });
            const key = utils_1.selectIdValue(undefinedAClockworkOrange, (book) => book.id);
            expect(spy).toHaveBeenCalled();
        });
        it('should not warn when key does not exist in prod mode', () => {
            spyOn(ngCore, 'isDevMode').and.returnValue(false);
            const spy = spyOn(console, 'warn');
            const key = utils_1.selectIdValue(book_fixture_1.AClockworkOrange, (book) => book.foo);
            expect(spy).not.toHaveBeenCalled();
        });
        it('should not warn when key is undefined in prod mode', () => {
            spyOn(ngCore, 'isDevMode').and.returnValue(false);
            const spy = spyOn(console, 'warn');
            const undefinedAClockworkOrange = Object.assign(Object.assign({}, book_fixture_1.AClockworkOrange), { id: undefined });
            const key = utils_1.selectIdValue(undefinedAClockworkOrange, (book) => book.id);
            expect(spy).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvc3RhdGUtYWRhcHRlci91dGlscy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXdDO0FBRXhDLGlEQUFrRDtBQUNsRCxtQ0FBd0M7QUFFeEMsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7SUFDNUIsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtRQUMvQixFQUFFLENBQUMscUNBQXFDLEVBQUUsR0FBRyxFQUFFO1lBQzdDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFbkMsTUFBTSxHQUFHLEdBQUcscUJBQWEsQ0FBQywrQkFBZ0IsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUU3RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsaURBQWlELEVBQUUsR0FBRyxFQUFFO1lBQ3pELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFbkMsTUFBTSxHQUFHLEdBQUcscUJBQWEsQ0FBQywrQkFBZ0IsRUFBRSxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXJFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtZQUN2RCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRW5DLE1BQU0seUJBQXlCLG1DQUFRLCtCQUFnQixLQUFFLEVBQUUsRUFBRSxTQUFTLEdBQUUsQ0FBQztZQUN6RSxNQUFNLEdBQUcsR0FBRyxxQkFBYSxDQUN2Qix5QkFBeUIsRUFDekIsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ3ZCLENBQUM7WUFFRixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxzREFBc0QsRUFBRSxHQUFHLEVBQUU7WUFDOUQsS0FBSyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFbkMsTUFBTSxHQUFHLEdBQUcscUJBQWEsQ0FBQywrQkFBZ0IsRUFBRSxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXJFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxvREFBb0QsRUFBRSxHQUFHLEVBQUU7WUFDNUQsS0FBSyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFbkMsTUFBTSx5QkFBeUIsbUNBQVEsK0JBQWdCLEtBQUUsRUFBRSxFQUFFLFNBQVMsR0FBRSxDQUFDO1lBQ3pFLE1BQU0sR0FBRyxHQUFHLHFCQUFhLENBQ3ZCLHlCQUF5QixFQUN6QixDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDdkIsQ0FBQztZQUVGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==