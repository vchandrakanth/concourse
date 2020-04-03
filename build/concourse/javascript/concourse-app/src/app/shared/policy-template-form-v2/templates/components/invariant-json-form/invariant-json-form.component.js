"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const faCheckSquare_1 = require("@fortawesome/free-regular-svg-icons/faCheckSquare");
const faSquare_1 = require("@fortawesome/free-regular-svg-icons/faSquare");
const faMinusCircle_1 = require("@fortawesome/free-solid-svg-icons/faMinusCircle");
const faPlusCircle_1 = require("@fortawesome/free-solid-svg-icons/faPlusCircle");
const operators_1 = require("@concourse/core/operators");
const helpers_1 = require("@concourse/shared/helpers");
// tslint:disable-next-line:no-forward-ref
exports._componentFactory = core_1.forwardRef(() => InvariantJsonBuilderComponent);
let InvariantJsonBuilderComponent = class InvariantJsonBuilderComponent {
    constructor(fb) {
        this.fb = fb;
        this.form = this.fb.group({
            invariant: this.fb.group({})
        });
        this.isDisabled = false;
        this.icons = { faMinusCircle: faMinusCircle_1.faMinusCircle, faPlusCircle: faPlusCircle_1.faPlusCircle, faCheckSquare: faCheckSquare_1.faCheckSquare, faSquare: faSquare_1.faSquare };
        this.propagateChange = (_) => { };
    }
    recursiveFieldTypesBuilder(array) {
        return array.reduce((result, value) => {
            if (value.fields) {
                return [
                    ...result,
                    ...this.recursiveFieldTypesBuilder(value.fields)
                ];
            }
            return [
                ...result,
                [value.label, value.type]
            ];
        }, []);
    }
    getControlType(name) {
        if (this.fieldTypeMap.has(name)) {
            return this.fieldTypeMap.get(name);
        }
        return '';
    }
    get value() {
        if (helpers_1.Util.isNullOrUndefined(this.form.value.invariant)) {
            return '{}';
        }
        return JSON.stringify(this.form.value.invariant);
    }
    ngOnInit() {
        this.form.valueChanges.pipe(operators_1.untilDestroy(this)).subscribe(v => {
            this.propagateChange(this.value);
        });
    }
    ngOnChanges(changes) {
        this.fieldTypeMap = new Map(this.recursiveFieldTypesBuilder(this.cloudResourceVersion.fields));
        if (!helpers_1.Util.isNullOrUndefined(changes.cloudResourceVersion)) {
            this.form = this.fb.group({
                invariant: this.createForm(this.cloudResourceVersion.fields)
            });
            this.propagateChange(this.value);
        }
    }
    ngOnDestroy() {
        // stub for untilDestroy
    }
    writeValue(value) {
        if (!helpers_1.Util.isNullOrUndefined(value)) {
            if (helpers_1.Util.isString(value)) {
                // this is for backwards compat
                value = JSON.parse(value);
            }
            Object.entries(this.getArrayLenByPath(value)).forEach(([path, len]) => {
                if (len > 0) {
                    const formArray = this.form.get(`invariant.${path}`);
                    for (let i = 1; i < len; i++) {
                        this.addFormArrayItem(formArray, false);
                    }
                }
                this.form.get(`invariant.${path}`).enable();
            });
            this.form.patchValue({
                invariant: value
            });
        }
    }
    setDisabledState(isDisabled) {
        // TODO(Andrew) Figure out what disabled means to the UI
        this.isDisabled = isDisabled;
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    createForm(fields) {
        return this.fb.group(Object.assign({}, fields.reduce((fg, field) => (Object.assign(Object.assign({}, fg), { [field.label]: field.formGroup })), {})));
    }
    templateDecider(control) {
        if (control instanceof forms_1.FormGroup) {
            return 'group';
        }
        if (control instanceof forms_1.FormArray) {
            return 'array';
        }
        if (control instanceof forms_1.FormControl) {
            return 'control';
        }
    }
    addFormArrayItem(formArray, disabled = true) {
        if (this.templateDecider(formArray.controls[0]) === 'group') {
            const controls = formArray.controls[0].controls;
            formArray.push(this.fb.group(Object.assign({}, Object.entries(controls).reduce((cntrls, [controlName]) => (Object.assign(Object.assign({}, cntrls), { 
                // tslint:disable-next-line:no-null-keyword
                [controlName]: this.fb.control({ value: null, disabled }) })), {}))));
        }
        if (this.templateDecider(formArray.controls[0]) === 'control') {
            const [control] = formArray.controls;
            // tslint:disable-next-line:no-null-keyword
            formArray.push(this.fb.control({ value: null, disabled: control.disabled }));
        }
    }
    getArrayLenByPath(obj, prefix = '') {
        const hasPrefix = prefix !== '';
        return Object.entries(obj).reduce((result, [key, value]) => {
            const objPath = hasPrefix ? `${prefix}.${key}` : key;
            if (helpers_1.Util.isObject(value) && !helpers_1.Util.isArray(value)) {
                return Object.assign(Object.assign({}, result), this.getArrayLenByPath(value, objPath));
            }
            return Object.assign(Object.assign({}, result), { [objPath]: helpers_1.Util.isArray(value) ? value.length : 0 });
        }, {});
    }
    removeFormArrayItem(formArray, index) {
        formArray.removeAt(index);
    }
    toggleFieldState(parent, fieldName, event) {
        const li = event.path[3];
        const control = parent.get(`${fieldName}`); // `${fieldName}` is workaround for type error when fieldName is number
        if (control.enabled) {
            control.disable();
            control.setValue(''); // clearing field when setting to disabled
        }
        else {
            const inputElement = li.querySelector('input.form-control');
            control.enable();
            inputElement.focus();
        }
    }
    fieldIsNull(control) {
        return typeof control.value === 'object' && control.value === null;
    }
    toggleFieldNull(parent, fieldName, event) {
        const control = parent.get(`${fieldName}`); // `${fieldName}` is workaround for type error when fieldName is number
        const isNull = this.fieldIsNull(control);
        if (!isNull) {
            // tslint:disable-next-line:no-null-keyword
            control.setValue(null);
        }
    }
};
__decorate([
    core_1.Input()
], InvariantJsonBuilderComponent.prototype, "cloudResourceVersion", void 0);
__decorate([
    core_1.Input()
], InvariantJsonBuilderComponent.prototype, "formControlName", void 0);
InvariantJsonBuilderComponent = __decorate([
    core_1.Component({
        selector: 'app-invariant-json-builder',
        templateUrl: './invariant-json-form.component.html',
        styleUrls: ['./invariant-json-form.component.scss'],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: exports._componentFactory,
                multi: true
            }
        ]
    })
], InvariantJsonBuilderComponent);
exports.InvariantJsonBuilderComponent = InvariantJsonBuilderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YXJpYW50LWpzb24tZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL3BvbGljeS10ZW1wbGF0ZS1mb3JtLXYyL3RlbXBsYXRlcy9jb21wb25lbnRzL2ludmFyaWFudC1qc29uLWZvcm0vaW52YXJpYW50LWpzb24tZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEc7QUFDMUcsMENBUXdCO0FBQ3hCLHFGQUFrRjtBQUNsRiwyRUFBd0U7QUFDeEUsbUZBQWdGO0FBQ2hGLGlGQUE4RTtBQUU5RSx5REFBeUQ7QUFHekQsdURBQWlEO0FBRWpELDBDQUEwQztBQUM3QixRQUFBLGlCQUFpQixHQUFHLGlCQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQWNqRixJQUFhLDZCQUE2QixHQUExQyxNQUFhLDZCQUE2QjtJQTBDeEMsWUFDVSxFQUFlO1FBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQXZDekIsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDN0IsQ0FBQyxDQUFDO1FBQ0gsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNWLFVBQUssR0FBRyxFQUFFLGFBQWEsRUFBYiw2QkFBYSxFQUFFLFlBQVksRUFBWiwyQkFBWSxFQUFFLGFBQWEsRUFBYiw2QkFBYSxFQUFFLFFBQVEsRUFBUixtQkFBUSxFQUFFLENBQUM7UUFHMUUsb0JBQWUsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBaUM5QixDQUFDO0lBL0JMLDBCQUEwQixDQUFDLEtBQTRCO1FB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