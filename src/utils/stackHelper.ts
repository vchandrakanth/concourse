const stackTrace = require('stack-trace');
export class StackHelper {
  static get = (start: number = 1, error = null, all = false) => {

    let stack: any[] = null;
    if (error) {
      stack = stackTrace.parse(error);
    } else {
      stack = stackTrace.parse(new Error('to allow sourcemap'));
      // let stack2 = stackTrace.get();
      // let a = 1;
    }
    if (all) return stack;
    let res = StackHelper.filterStack(stack, start);
    return res;
  }

  static filterStack = (stack, start: number = 0) => {
    let filteredStack = stack.filter((val, ix) => {
      let fn: string = (val.fileName) ? val.fileName : val.getFileName();
      // !(fn.indexOf('node_modules') >= 0) && !(fn.indexOf('module.js') >= 0 && !(fn.indexOf('internal/') >= 0)

      let arr = ['node_modules', 'module.js', 'internal/', 'events.js'];
      let contains = (st) => (arr.findIndex((o) => st.indexOf(o) >= 0) >= 0);
      return !!fn && ix >= start && !contains(fn);
    });
    return filteredStack;
  }
}