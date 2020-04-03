"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
}
exports.Util = Util;
Util.isUndefined = (object) => typeof object === 'undefined';
Util.isNull = (object) => object === null;
Util.isNullOrUndefined = (object) => Util.isUndefined(object) || Util.isNull(object);
Util.isFunction = (object) => typeof object === 'function';
Util.isNumber = (object) => typeof object === 'number';
Util.isString = (object) => typeof object === 'string';
Util.isBoolean = (object) => typeof object === 'boolean';
Util.isObject = (object) => object !== null && typeof object === 'object';
Util.isEmptyObject = (object) => Object.keys(object).length === 0;
Util.isArray = (object) => Array.isArray(object);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvaGVscGVycy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxJQUFJOztBQUFqQixvQkFXQztBQVZRLGdCQUFXLEdBQUcsQ0FBQyxNQUFXLEVBQXVCLEVBQUUsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUM7QUFDbEYsV0FBTSxHQUFHLENBQUMsTUFBVyxFQUFrQixFQUFFLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQztBQUMxRCxzQkFBaUIsR0FBRyxDQUFDLE1BQVcsRUFBOEIsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqSCxlQUFVLEdBQUcsQ0FBQyxNQUFXLEVBQVcsRUFBRSxDQUFDLE9BQU8sTUFBTSxLQUFLLFVBQVUsQ0FBQztBQUNwRSxhQUFRLEdBQUcsQ0FBQyxNQUFXLEVBQW9CLEVBQUUsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUM7QUFDekUsYUFBUSxHQUFHLENBQUMsTUFBVyxFQUFvQixFQUFFLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO0FBQ3pFLGNBQVMsR0FBRyxDQUFDLE1BQVcsRUFBcUIsRUFBRSxDQUFDLE9BQU8sTUFBTSxLQUFLLFNBQVMsQ0FBQztBQUM1RSxhQUFRLEdBQUcsQ0FBQyxNQUFXLEVBQVcsRUFBRSxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO0FBQ25GLGtCQUFhLEdBQUcsQ0FBbUIsTUFBUyxFQUFtQixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0FBQ25HLFlBQU8sR0FBRyxDQUFDLE1BQVcsRUFBbUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMifQ==