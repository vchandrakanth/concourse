"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stackTrace = require('stack-trace');
class StackHelper {
}
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
exports.StackHelper = StackHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2tIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvc3RhY2tIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUMsTUFBYSxXQUFXOztBQUNmLGVBQUcsR0FBRyxDQUFDLFFBQWdCLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFLEdBQUcsR0FBRyxLQUFLLEVBQUUsRUFBRTtJQUU1RCxJQUFJLEtBQUssR0FBVSxJQUFJLENBQUM7SUFDeEIsSUFBSSxLQUFLLEVBQUU7UUFDVCxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqQztTQUFNO1FBQ0wsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1FBQzFELGlDQUFpQztRQUNqQyxhQUFhO0tBQ2Q7SUFDRCxJQUFJLEdBQUc7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN0QixJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQTtBQUVNLHVCQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBZ0IsQ0FBQyxFQUFFLEVBQUU7SUFDaEQsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUMzQyxJQUFJLEVBQUUsR0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25FLDBHQUEwRztRQUUxRyxJQUFJLEdBQUcsR0FBRyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkUsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLGFBQWEsQ0FBQztBQUN2QixDQUFDLENBQUE7QUExQkgsa0NBMkJDIn0=