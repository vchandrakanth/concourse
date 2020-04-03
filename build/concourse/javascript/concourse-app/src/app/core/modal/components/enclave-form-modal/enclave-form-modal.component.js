"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const faCloud_1 = require("@fortawesome/free-solid-svg-icons/faCloud");
const faEye_1 = require("@fortawesome/free-solid-svg-icons/faEye");
const faMinusCircle_1 = require("@fortawesome/free-solid-svg-icons/faMinusCircle");
const faPlusCircle_1 = require("@fortawesome/free-solid-svg-icons/faPlusCircle");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const operators_1 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
let EnclaveFormModalComponent = class EnclaveFormModalComponent {
    constructor(fb, assetFacade, policyViolationFacade, attributeTagFacade, modalFacade) {
        this.fb = fb;
        this.assetFacade = assetFacade;
        this.policyViolationFacade = policyViolationFacade;
        this.attributeTagFacade = attributeTagFacade;
        this.modalFacade = modalFacade;
        this.attributeTagsOptions$ = this.attributeTagFacade.list$;
        this.isUpdating$ = this.assetFacade.isUpdating$;
        this.formPending$ = this.assetFacade.formPending$;
        this.isEvaluationPending$ = this.policyViolationFacade.isEvaluationPending$;
        this.cftResources$ = this.assetFacade.cftResources$;
        this.cftNestedTemplates$ = this.assetFacade.cftResources$.pipe(operators_1.map(resources => resources.fileNames.filter(fn => fn !== this.formValues.generalInfo.templateIdentifier)));
        this.enclaveModelEvaluationResponse$ = this.policyViolationFacade.unsavedModelEvaluation$;
        this.owningGroupOptions$ = this.assetFacade.selectableOwningGroups$;
        this.icons = { faTimes: faTimes_1.faTimes, faPlusCircle: faPlusCircle_1.faPlusCircle, faMinusCircle: faMinusCircle_1.faMinusCircle, faCloud: faCloud_1.faCloud, faEye: faEye_1.faEye };
        this.form = this.fb.group({
            generalInfo: this.fb.group({
                id: [''],
                assetType: ['ENCLAVE', forms_1.Validators.required],
                name: ['', forms_1.Validators.required],
                description: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
                owningGroupId: [undefined, [forms_1.Validators.required]],
                attributeTagIds: [],
                cloudFormationTemplateFile: [undefined, [helpers_1.FileValidators.mimeType(['application/json', 'application/x-yaml', 'text/yaml'])]],
                cloudFormationTemplate: [undefined, [forms_1.Validators.required]],
                templateIdentifier: [undefined],
                identifierMappings: [undefined],
                nestedTemplates: this.fb.array([]),
                status: ['DRAFT', forms_1.Validators.required],
                versionBump: ['MINOR'],
                managementStrategy: ['SELF_MANAGED']
            }),
            templateMappings: this.fb.group({}),
            eval: this.fb.group({})
        });
    }
    get formValues() {
        return this.form.value;
    }
    get nestedTemplatesGroup() {
        return this.form.get('generalInfo.nestedTemplates');
    }
    get usedNestedTemplates() {
        return new Set(Object.entries(this.formValues.templateMappings)
            .reduce((acc, [key, mappings]) => [...acc, ...Object.values(mappings)], []));
    }
    get submittedEnclaveModel() {
        const _a = this.formValues.generalInfo, { cloudFormationTemplateFile, versionBump, attributeTagIds } = _a, enclave = __rest(_a, ["cloudFormationTemplateFile", "versionBump", "attributeTagIds"]);
        const _b = this.formValues.templateMappings, _c = enclave.templateIdentifier, rootMapping = _b[_c], mappings = __rest(_b, [typeof _c === "symbol" ? _c : _c + ""]);
        return Object.assign(Object.assign({}, enclave), { attributeTags: (attributeTagIds || []).map(id => ({ id })), identifierMappings: !!rootMapping ? this.createKeyValuePair(rootMapping) : undefined, nestedTemplates: this.formValues.generalInfo.nestedTemplates.filter(nt => !!nt.data).map(({ data }) => (Object.assign(Object.assign({}, data), { identifierMappings: !!mappings[data.identifier] ? this.createKeyValuePair(mappings[data.identifier]) : undefined }))) });
    }
    createKeyValuePair(obj) {
        return Object.entries(obj).map(([key, value]) => `${key}::${value}`);
    }
    ngOnInit() {
        if (!!this.enclave) {
            this.form.patchValue({
                generalInfo: Object.assign(Object.assign({}, this.enclave), { managementStrategy: 'SELF_MANAGED', assetType: 'ENCLAVE', attributeTagIds: (this.enclave.attributeTags || []).map(at => at.id) })
            });
            if (this.enclave.hasOwningGroup) {
                this.form.get('generalInfo.owningGroupId').clearValidators();
            }
            this.form.get('generalInfo.cloudFormationTemplate').setValidators([forms_1.Validators.required]);
            this.form.get('generalInfo').setControl('nestedTemplates', this.fb.array([
                ...this.enclave.nestedTemplates.map(v => this.createNestedTemplateControl(v))
            ]));
        }
    }
    onSelectFile(event, control) {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const generalInfoGroup = this.form.get('generalInfo');
            files.forEach((file, i) => {
                const isLast = (i === files.length - 1);
                const reader = new FileReader();
                reader.onload = (progressEvent) => {
                    const value = {
                        identifier: file.name,
                        text: helpers_1.decodeBinaryData(progressEvent.target.result)
                    };
                    if (control === 'cloudFormationTemplate') {
                        generalInfoGroup.get('cloudFormationTemplateFile').setValue(file);
                        generalInfoGroup.get('cloudFormationTemplateFile').markAsDirty();
                        generalInfoGroup.get(control).setValue(value.text);
                        generalInfoGroup.get('templateIdentifier').setValue(value.identifier);
                    }
                    if (control instanceof forms_1.AbstractControl) {
                        control.get('file').setValue(file);
                        control.get('file').markAsDirty();
                        control.get('data').setValue(value);
                        control.get('data').markAsDirty();
                        if (!isLast && files.length > 1) {
                            this.addNestedTemplate();
                            control = this.nestedTemplatesGroup.controls[i + 1];
                        }
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    }
    createNestedTemplateControl(value) {
        return this.fb.group({
            file: this.fb.control(undefined, [helpers_1.FileValidators.mimeType(['application/json', 'application/x-yaml', 'text/yaml'])]),
            data: this.fb.control(value)
        });
    }
    removeNestedTemplate(index) {
        this.nestedTemplatesGroup.removeAt(index);
    }
    addNestedTemplate() {
        this.nestedTemplatesGroup.push(this.createNestedTemplateControl());
    }
    submit() {
        if (!helpers_1.Util.isEmptyObject(this.formValues.templateMappings)) {
            const nestedTemplates = this.formValues.generalInfo.nestedTemplates;
            const identifiers = nestedTemplates.map(file => file.data.identifier);
            const uniqueChoices = this.usedNestedTemplates;
            identifiers.forEach((identifier, index) => {
                if (!uniqueChoices.has(identifier)) {
                    this.nestedTemplatesGroup.at(index).disable();
                }
            });
        }
        const { versionBump, status } = this.formValues.generalInfo;
        if (this.enclave) {
            this.assetFacade.updateEnclaveModel(this.enclave.copyWith(this.submittedEnclaveModel), status === 'PUBLISHED' ? versionBump : '');
        }
        else {
            this.assetFacade.createEnclaveModel(this.submittedEnclaveModel, status === 'PUBLISHED' ? versionBump : '');
        }
    }
    stepEvent(step) {
        if (step.formGroupName === 'templateMappings') {
            this.assetFacade.resolveCFTResource(this.submittedEnclaveModel);
            this.cftResources$.pipe(operators_1.take(1)).subscribe(resources => {
                const { fileNames } = resources;
                const mappings = new Map();
                if (!!this.enclave && !!this.enclave.identifierMappings) {
                    (this.enclave.identifierMappings || []).forEach(im => {
                        const [key, file] = im.split('::');
                        mappings.set(`${this.enclave.templateIdentifier}::${key}`, file);
                    });
                    (this.enclave.nestedTemplates || []).forEach(nt => {
                        nt.identifierMappings.forEach(im => {
                            const [key, file] = im.split('::');
                            mappings.set(`${nt.identifier}::${key}`, file);
                        });
                    });
                }
                const mGroup = this.fb.group(resources.templates.reduce((group, template) => (Object.assign(Object.assign({}, group), { [template.name]: this.fb.group(template.nestedTemplates.reduce((g, nestedTemplate) => (Object.assign(Object.assign({}, g), { [nestedTemplate.name]: this.fb.control(mappings.size > 0 ? mappings.get(`${template.name}::${nestedTemplate.name}`) :
                            fileNames.includes(nestedTemplate.path) ? nestedTemplate.path : undefined, [forms_1.Validators.required]) })), {})) })), {}));
                this.form.setControl('templateMappings', mGroup);
            });
        }
        if (step.formGroupName === 'eval') {
            const _a = this.submittedEnclaveModel, { id } = _a, model = __rest(_a, ["id"]);
            this.policyViolationFacade.evaluateUnsavedEnclaveModel(model);
        }
    }
    showTemplate(cloudFormationTemplate, fileName) {
        const templateType = (this.enclave && this.enclave.templateFormat === 'JSON') || fileName.includes('json') ? 'JSON' : 'YAML';
        this.modalFacade.templatePreviewModal(cloudFormationTemplate, fileName, templateType);
    }
};
EnclaveFormModalComponent = __decorate([
    core_1.Component({
        selector: 'app-enclave-form-modal',
        templateUrl: './enclave-form-modal.component.html',
        styleUrls: ['./enclave-form-modal.component.scss']
    })
], EnclaveFormModalComponent);
exports.EnclaveFormModalComponent = EnclaveFormModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jbGF2ZS1mb3JtLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvZW5jbGF2ZS1mb3JtLW1vZGFsL2VuY2xhdmUtZm9ybS1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCwwQ0FBZ0c7QUFDaEcsdUVBQW9FO0FBQ3BFLG1FQUFnRTtBQUNoRSxtRkFBZ0Y7QUFDaEYsaUZBQThFO0FBQzlFLHVFQUFvRTtBQUVwRSw4Q0FBMkM7QUFHM0MsdURBQW1GO0FBU25GLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBa0VwQyxZQUNtQixFQUFlLEVBQ2YsV0FBd0IsRUFDeEIscUJBQTRDLEVBQzVDLGtCQUFzQyxFQUN0QyxXQUE2QjtRQUo3QixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQXJFaEQsMEJBQXFCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztRQUN0RCxnQkFBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQzNDLGlCQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7UUFDN0MseUJBQW9CLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG9CQUFvQixDQUFDO1FBQ3ZFLGtCQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDL0Msd0JBQW1CLEdBQUcsSUFB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