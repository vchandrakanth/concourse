"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DEBOUNCE_TIME = 300;
class DuplicateValueCheck {
    static tagName(attributeTagFacade) {
        return (control) => {
            if (!control.valueChanges) {
                return rxjs_1.of(undefined);
            }
            return control.valueChanges.pipe(operators_1.debounceTime(DEBOUNCE_TIME), operators_1.withLatestFrom(attributeTagFacade.list$), operators_1.map(([newTagName, attributeTags]) => {
                const attributeTagId = control.parent.get('id');
                if (!!attributeTagId) {
                    return [];
                }
                if (attributeTags.length === 0) {
                    return [];
                }
                return attributeTags
                    .filter(at => !attributeTagId || (!!attributeTagId && attributeTagId.value !== at.id))
                    .filter(at => at.name === newTagName);
            }), operators_1.take(1), operators_1.map(tags => (tags.length > 0 ? { nameInUse: true } : undefined)));
        };
    }
    static mapKey() {
        return (control) => {
            if (!(control instanceof forms_1.FormArray)) {
                return;
            }
            const keySet = new Set();
            const dupes = control.value
                .filter(v => v !== '')
                .filter(v => {
                if (keySet.has(v.key)) {
                    return true;
                }
                keySet.add(v.key);
                return false;
            });
            return dupes.length ? { keysNotUnique: true } : undefined;
        };
    }
    static singleMapValue() {
        return (control) => {
            if (!(control instanceof forms_1.FormArray)) {
                return;
            }
            const valueSet = new Set();
            const dupes = control.value
                .filter(v => v !== '')
                .filter(v => {
                if (valueSet.has(v.value)) {
                    return true;
                }
                valueSet.add(v.value);
                return false;
            });
            return dupes.length ? { valuesNotUnique: true } : undefined;
        };
    }
    static uniqueList() {
        return (control) => {
            if (!(control instanceof forms_1.FormArray)) {
                return;
            }
            const valueSet = new Set();
            const dupes = control.value
                .filter(v => v !== '')
                .filter(v => {
                if (valueSet.has(v)) {
                    return true;
                }
                valueSet.add(v);
                return false;
            });
            return dupes.length ? { valuesNotUnique: true } : undefined;
        };
    }
    static noCollision(noCollisionControl) {
        return (control) => {
            // TODO(Andrew)
            return undefined;
        };
    }
}
exports.DuplicateValueCheck = DuplicateValueCheck;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVwbGljYXRlLXZhbHVlLnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvaGVscGVycy9kdXBsaWNhdGUtdmFsdWUudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMENBQTJGO0FBRTNGLCtCQUEwQjtBQUMxQiw4Q0FLd0I7QUFJeEIsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBRTFCLE1BQWEsbUJBQW1CO0lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQXNDO1FBQ25ELE9BQU8sQ0FBQyxPQUF3QixFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7Z0JBQ3pCLE9BQU8sU0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDOUIsd0JBQVksQ0FBQyxhQUFhLENBQUMsRUFDM0IsMEJBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFDeEMsZUFBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRTtvQkFDcEIsT0FBTyxFQUFFLENBQUM7aUJBQ1g7Z0JBQ0QsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDOUIsT0FBTyxFQUFFLENBQUM7aUJBQ1g7Z0JBQ0QsT0FBTyxhQUFhO3FCQUNqQixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksY0FBYyxD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