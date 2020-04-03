"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
/**
 * mockFacade returns a mocked version of the provided facade.
 * If no overrides values are provided, all observables will be have values of an empty array
 * @param facade - Facade to be mocked
 * @param valueOverrides - useValue overrides, only supports overriding observables
 */
// tslint:disable-next-line:max-line-length
exports.mockFacade = (facade, valueOverrides) => {
    const keys = describeFacade(facade);
    const f = new facade(new rxjs_1.BehaviorSubject({}));
    const mock = {
        provide: facade,
        useValue: {},
        keys
    };
    for (const key of keys) {
        if (key !== 'constructor') {
            try {
                const prop = f[key];
                const type = typeof prop;
                // tslint:disable-next-line:prefer-conditional-expression
                if (rxjs_1.isObservable(f[key])) {
                    const value = (!!valueOverrides && !!valueOverrides[key]) ? valueOverrides[key] : new rxjs_1.BehaviorSubject([]);
                    mock.useValue[key] = value;
                    // tslint:disable-next-line:prefer-conditional-expression
                }
                else if (type && type === 'function') {
                    mock.useValue[key] = jest.fn();
                }
                else {
                    mock.useValue[key] = f[key];
                }
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    return mock;
};
const describeFacade = (facade) => {
    const f = new facade(new rxjs_1.BehaviorSubject({}));
    const props = [
        ...Object.getOwnPropertyNames(facade.prototype),
        ...Object.getOwnPropertyNames(f).filter(p => p !== 'store')
    ];
    return props;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1mYWNhZGUuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvdGVzdC1oZWxwZXJzL21vY2stZmFjYWRlLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFpRTtBQUVqRTs7Ozs7R0FLRztBQUNILDJDQUEyQztBQUM5QixRQUFBLFVBQVUsR0FBRyxDQUFJLE1BQTZCLEVBQUUsY0FBNkQsRUFBaUMsRUFBRTtJQUMzSixNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUMsTUFBTSxJQUFJLEdBQUc7UUFDWCxPQUFPLEVBQUUsTUFBa0I7UUFDM0IsUUFBUSxFQUFFLEVBQUU7UUFDWixJQUFJO0tBQ0wsQ0FBQztJQUVGLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ3RCLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtZQUN6QixJQUFJO2dCQUNGLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxJQUFJLEdBQUcsT0FBTyxJQUFJLENBQUM7Z0JBQ3pCLHlEQUF5RDtnQkFDekQsSUFBSSxtQkFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUN4QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDMUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQzNCLHlEQUF5RDtpQkFDMUQ7cUJBQU0sSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtvQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7aUJBQ2hDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUM3QjthQUNGO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQztBQUVGLE1BQU0sY0FBYyxHQUFHLENBQUMsTUFBVyxFQUFZLEVBQUU7SUFDL0MsTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUMsTUFBTSxLQUFLLEdBQUc7UUFDWixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQy9DLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUM7S0FDNUQsQ0FBQztJQUVGLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDIn0=