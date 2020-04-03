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
const faFolderMinus_1 = require("@fortawesome/free-solid-svg-icons/faFolderMinus");
const faFolderPlus_1 = require("@fortawesome/free-solid-svg-icons/faFolderPlus");
const faMinusCircle_1 = require("@fortawesome/free-solid-svg-icons/faMinusCircle");
const faPlusCircle_1 = require("@fortawesome/free-solid-svg-icons/faPlusCircle");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const models_1 = require("@concourse/core/models");
const helpers_1 = require("@concourse/shared/helpers");
let InstitutionDataFormComponent = class InstitutionDataFormComponent {
    constructor(fb, instFacade) {
        this.fb = fb;
        this.instFacade = instFacade;
        this.afterSubmit = new core_1.EventEmitter();
        this.form = this.fb.group({
            listValues: [''],
            singleMapValues: [''],
            multiMapValues: [''],
            value: ['']
        });
        this.icons = { faMinusCircle: faMinusCircle_1.faMinusCircle, faPlusCircle: faPlusCircle_1.faPlusCircle, faTrashAlt: faTrashAlt_1.faTrashAlt, faFolderPlus: faFolderPlus_1.faFolderPlus, faFolderMinus: faFolderMinus_1.faFolderMinus };
        this.createListControl = (dataType, value) => this.fb.control(value || '', forms_1.Validators.pattern(helpers_1.VALIDATOR_PATTERNS(dataType)));
        this.createSingleMapGroup = (dataType, value) => this.fb.group({
            key: [value ? value.key : '', forms_1.Validators.pattern(helpers_1.VALIDATOR_PATTERNS('STRING'))],
            value: [value ? value.value : ''] // TODO: add `, Validators.pattern(VALIDATOR_PATTERNS(dataType))` back to validators after AWS Account migration
        });
        this.createMultiMapValuesControl = (dataType, value) => this.fb.control(value || '', [forms_1.Validators.pattern(helpers_1.VALIDATOR_PATTERNS(dataType))]);
        this.createMultiMapGroup = (dataType, value) => this.fb.group({
            key: [value ? value.key : '', forms_1.Validators.pattern(helpers_1.VALIDATOR_PATTERNS('STRING'))],
            values: this.fb.array([
                ...(value ? value.values.map(v => this.createMultiMapValuesControl(dataType, v)) : []),
                this.createMultiMapValuesControl(dataType)
            ])
        });
    }
    set institutionData(data) {
        this.instData = data;
        this.buildForm(this.instData);
    }
    set institutionDataCatalog(data) {
        this.instData = {
            collectionType: data.collectionType,
            dataType: data.dataType,
            name: data.name,
            uri: data.uri,
            singleMapValues: {},
            multiMapValues: {},
            listValues: [],
            value: ''
        };
        this.buildForm(this.instData);
    }
    get dataDomainText() {
        if (!helpers_1.Util.isUndefined(this.dataDomain)) {
            return `${this.dataDomain.replace(/_/g, ' ')} Data`;
        }
    }
    get listValuesGroup() {
        return this.form.get('listValues');
    }
    get singleMapValuesGroup() {
        return this.form.get('singleMapValues');
    }
    get multiMapValuesGroup() {
        return this.form.get('multiMapValues');
    }
    buildForm(data) {
        switch (data.collectionType) {
            case 'LIST': {
                this.form = this.fb.group({
                    listValues: this.fb.array([
                        ...data.listValues.map(v => this.createListControl(data.dataType, v)),
                        this.createListControl(data.dataType)
                    ], helpers_1.DuplicateValueCheck.uniqueList())
                });
                break;
            }
            case 'SINGLE_MAP': {
                const keyValPairs = Object.entries(data.singleMapValues);
                this.form = this.fb.group({
                    singleMapValues: this.fb.array([
                        ...keyValPairs.map(([key, value]) => this.createSingleMapGroup(this.instData.dataType, { key, value })),
                        this.createSingleMapGroup(this.instData.dataType)
                    ], [helpers_1.DuplicateValueCheck.mapKey(), helpers_1.DuplicateValueCheck.singleMapValue()])
                });
                break;
            }
            case 'MULTI_MAP': {
                const keyValPairs = Object.entries(data.multiMapValues);
                this.form = this.fb.group({
                    multiMapValues: this.fb.array([
                        ...keyValPairs.map(([key, values]) => this.createMultiMapGroup(this.instData.dataType, { key, values })),
                        this.createMultiMapGroup(this.instData.dataType)
                    ], [helpers_1.DuplicateValueCheck.mapKey()])
                });
                break;
            }
            case 'NONE': {
                this.form = this.fb.group({
                    value: [data.value || '', forms_1.Validators.pattern(helpers_1.VALIDATOR_PATTERNS(data.dataType))]
                });
                if (data.dataType === 'LONG') {
                    this.form.get('value').setValidators([
                        forms_1.Validators.pattern(helpers_1.VALIDATOR_PATTERNS(data.dataType)),
                        forms_1.Validators.min(-9223372036854775808),
                        forms_1.Validators.max(9223372036854775807)
                    ]);
                }
                break;
            }
            default: {
                console.error('collectionType %s not supported', data.collectionType);
                break;
            }
        }
    }
    addListValue(dataType) {
        this.listValuesGroup.push(this.createListControl(dataType));
    }
    addSingleMapValue(dataType) {
        this.singleMapValuesGroup.push(this.createSingleMapGroup(dataType));
    }
    addMultiMapMap(dataType) {
        this.multiMapValuesGroup.push(this.createMultiMapGroup(dataType));
    }
    addMultiMapValue(parent, dataType) {
        parent.push(this.createMultiMapValuesControl(dataType));
    }
    removeListValue(index) {
        this.listValuesGroup.removeAt(index);
    }
    removeSingleMapValue(index) {
        this.singleMapValuesGroup.removeAt(index);
    }
    removeMultiMapMap(index) {
        this.multiMapValuesGroup.removeAt(index);
    }
    removeMultiMapValue(parent, index) {
        parent.removeAt(index);
    }
    submit(instData) {
        if (this.form.valid) {
            let formData = {
                name: instData.name,
                collectionType: instData.collectionType,
                dataType: instData.dataType
            };
            switch (instData.collectionType) {
                case 'LIST': {
                    formData = Object.assign(Object.assign({}, formData), { listValues: this.form.value.listValues });
                    break;
                }
                case 'SINGLE_MAP': {
                    formData = Object.assign(Object.assign({}, formData), { singleMapValues: this.form.value.singleMapValues.reduce((acc, { key, value }) => (Object.assign(Object.assign({}, acc), { [key]: value })), {}) });
                    break;
                }
                case 'MULTI_MAP': {
                    formData = Object.assign(Object.assign({}, formData), { multiMapValues: this.form.value.multiMapValues.reduce((acc, { key, values }) => (Object.assign(Object.assign({}, acc), { [key]: values })), {}) });
                    break;
                }
                case 'NONE': {
                    formData = Object.assign(Object.assign({}, formData), { value: this.form.value.value });
                    break;
                }
                default:
                    console.error('collectionType %s not supported', instData.collectionType);
                    break;
            }
            if (helpers_1.Util.isUndefined(instData.id)) {
                this.instFacade.create({
                    dataDomain: this.dataDomain,
                    surfaceId: this.surfaceId,
                    surfaceLayerId: this.surfaceLayerId
                }, new models_1.InstitutionData().deserialize(formData));
            }
            else {
                this.instFacade.update({
                    dataDomain: this.dataDomain,
                    surfaceId: this.surfaceId,
                    surfaceLayerId: this.surfaceLayerId
                }, instData.copyWith(formData));
            }
            this.afterSubmit.emit();
        }
    }
};
__decorate([
    core_1.Input()
], InstitutionDataFormComponent.prototype, "institutionData", null);
__decorate([
    core_1.Input()
], InstitutionDataFormComponent.prototype, "institutionDataCatalog", null);
__decorate([
    core_1.Input()
], InstitutionDataFormComponent.prototype, "dataDomain", void 0);
__decorate([
    core_1.Input()
], InstitutionDataFormComponent.prototype, "surfaceId", void 0);
__decorate([
    core_1.Input()
], InstitutionDataFormComponent.prototype, "surfaceLayerId", void 0);
__decorate([
    core_1.Output()
], InstitutionDataFormComponent.prototype, "afterSubmit", void 0);
InstitutionDataFormComponent = __decorate([
    core_1.Component({
        selector: 'app-institution-data-form',
        templateUrl: './institution-data-form.component.html',
        styleUrls: ['./institution-data-form.component.scss']
    })
], InstitutionDataFormComponent);
exports.InstitutionDataFormComponent = InstitutionDataFormComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGl0dXRpb24tZGF0YS1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9pbnN0aXR1dGlvbi1kYXRhLWZvcm0vaW5zdGl0dXRpb24tZGF0YS1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF1RTtBQUN2RSwwQ0FBcUY7QUFDckYsbUZBQWdGO0FBQ2hGLGlGQUE4RTtBQUM5RSxtRkFBZ0Y7QUFDaEYsaUZBQThFO0FBQzlFLDZFQUEwRTtBQUUxRSxtREFLZ0M7QUFDaEMsdURBQTBGO0FBUTFGLElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTRCO0lBaUR2QyxZQUNtQixFQUFlLEVBQ2YsVUFBaUM7UUFEakMsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLGVBQVUsR0FBVixVQUFVLENBQXVCO1FBOUJqQyxnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBUSxDQUFDO1FBUTFELFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDaEIsZUFBZSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3JCLGNBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNwQixLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDWixDQUFDLENBQUM7UUFDTSxVQUFLLEdBQUcsRUFBRSxhQUFhLEVBQWIsNkJBQWEsRUFBRSxZQUFZLEVBQVosMkJBQVksRUFBRSxVQUFVLEVBQVYsdUJBQVUsRUFBRSxZQUFZLEVBQVosMkJBQVksRUFBRSxhQUFhLEVBQWIsNkJBQWEsRUFBRSxDQUFDO1FBNEsxRixzQkFBaUIsR0FBRyxDQUFDLFFBQWtCLEVBQUUsS0FBVyxFQUFtQixFQUFF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