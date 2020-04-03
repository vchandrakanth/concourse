"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/**
 * create a symbol identify the observable I add to
 * the component so it doesn't conflict with anything.
 * I need this so I'm able to add the desired behavior to the component.
 */
exports.destroy$ = Symbol('destroy$');
/**
 * @param component - "this", component reference
 * An operator that takes the component as a property
 * @returns - .pipe()-able RxJS operator
 */
exports.untilDestroy = (component) => {
    if (component[exports.destroy$] === undefined) {
        // only hookup each component once.
        exports.addDestroyObservableToComponent(component);
    }
    // pipe in the takeUntil destroy$ and return the source unaltered
    return operators_1.takeUntil(component[exports.destroy$]);
};
/**
 * @internal
 */
exports.addDestroyObservableToComponent = (component) => {
    component[exports.destroy$] = new rxjs_1.Observable(observer => {
        // keep track of the original destroy function,
        // the user might do something in there
        const originalDestroy = component.ngOnDestroy;
        if (typeof originalDestroy === 'undefined') {
            // angular (AOT) does not support dynamic added destroy methods
            // so make sure there is one.
            throw new Error('untilDestroy operator needs the component to have an ngOnDestroy method');
        }
        // replace the ngOnDestroy
        component.ngOnDestroy = () => {
            // fire off the destroy observable
            observer.next();
            // complete the observable
            observer.complete();
            // and at last, call the original destroy
            originalDestroy.call(component);
        };
        // return cleanup function.
        return (_) => (component[exports.destroy$] = undefined);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW50aWwtZGVzdHJveS5vcGVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL29wZXJhdG9ycy91bnRpbC1kZXN0cm95Lm9wZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTREO0FBQzVELDhDQUEyQztBQUUzQzs7OztHQUlHO0FBQ1UsUUFBQSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTNDOzs7O0dBSUc7QUFDVSxRQUFBLFlBQVksR0FBRyxDQUFJLFNBQWMsRUFBK0IsRUFBRTtJQUM3RSxJQUFJLFNBQVMsQ0FBQyxnQkFBUSxDQUFDLEtBQUssU0FBUyxFQUFFO1FBQ3JDLG1DQUFtQztRQUNuQyx1Q0FBK0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM1QztJQUVELGlFQUFpRTtJQUNqRSxPQUFPLHFCQUFTLENBQUksU0FBUyxDQUFDLGdCQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1UsUUFBQSwrQkFBK0IsR0FBRyxDQUFDLFNBQWMsRUFBTyxFQUFFO0lBQ3JFLFNBQVMsQ0FBQyxnQkFBUSxDQUFDLEdBQUcsSUFBSSxpQkFBVSxDQUFPLFFBQVEsQ0FBQyxFQUFFO1FBQ3BELCtDQUErQztRQUMvQyx1Q0FBdUM7UUFDdkMsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztRQUM5QyxJQUFJLE9BQU8sZUFBZSxLQUFLLFdBQVcsRUFBRTtZQUMxQywrREFBK0Q7WUFDL0QsNkJBQTZCO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMseUVBQXlFLENBQUMsQ0FBQztTQUM1RjtRQUNELDBCQUEwQjtRQUMxQixTQUFTLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRTtZQUMzQixrQ0FBa0M7WUFDbEMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLDBCQUEwQjtZQUMxQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIseUNBQXlDO1lBQ3pDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDO1FBQ0YsMkJBQTJCO1FBQzNCLE9BQU8sQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGdCQUFRLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9