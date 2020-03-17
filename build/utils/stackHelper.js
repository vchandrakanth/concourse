"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stackTrace = require('stack-trace');
class StackHelper {
}
exports.StackHelper = StackHelper;
StackHelper.get = (start = 1, error = null, all = false) => {
    let stack = null;
    if (error) {
        stack = stackTrace.parse(error);
    }
    else {
        stack = stackTrace.parse(new Error('to allow sourcemap'));
        // let stack2 = stackTrace.get();
        // let a = 1;
    }
    if (all)
        return stack;
    let res = StackHelper.filterStack(stack, start);
    return res;
};
StackHelper.filterStack = (stack, start = 0) => {
    let filteredStack = stack.filter((val, ix) => {
        let fn = (val.fileName) ? val.fileName : val.getFileName();
        // !(fn.indexOf('node_modules') >= 0) && !(fn.indexOf('module.js') >= 0 && !(fn.indexOf('internal/') >= 0)
        let arr = ['node_modules', 'module.js', 'internal/', 'events.js'];
        let contains = (st) => (arr.findIndex((o) => st.indexOf(o) >= 0) >= 0);
        return !!fn && ix >= start && !contains(fn);
    });
    return filteredStack;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2tIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvc3RhY2tIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUMsTUFBYSxXQUFXOztBQUF4QixrQ0EyQkM7QUExQlEsZUFBRyxHQUFHLENBQUMsUUFBZ0IsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLEVBQUUsR0FBRyxHQUFHLEtBQUssRUFBRSxFQUFFO0lBRTVELElBQUksS0FBSyxHQUFVLElBQUksQ0FBQztJQUN4QixJQUFJLEtBQUssRUFBRTtRQUNULEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDO1NBQU07UUFDTCxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7UUFDMUQsaUNBQWlDO1FBQ2pDLGFBQWE7S0FDZDtJQUNELElBQUksR0FBRztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3RCLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFBO0FBRU0sdUJBQVcsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFnQixDQUFDLEVBQUUsRUFBRTtJQUNoRCxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQzNDLElBQUksRUFBRSxHQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkUsMEdBQTBHO1FBRTFHLElBQUksR0FBRyxHQUFHLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RSxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQSJ9