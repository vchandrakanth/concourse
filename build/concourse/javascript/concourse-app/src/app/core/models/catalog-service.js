"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
const helpers_1 = require("@concourse/shared/helpers");
const serde_1 = require("./serde");
class AwsProduct extends serde_1.EntityMetadata {
    serialize() {
        console.error('AwsProduct.serialize() Not Implemented');
    }
}
exports.AwsProduct = AwsProduct;
class Region extends serde_1.Serde {
    serialize() {
        console.error('serialize() Not Implemented');
    }
}
class AWSRegion extends Region {
}
exports.AWSRegion = AWSRegion;
class AzureRegion extends Region {
}
exports.AzureRegion = AzureRegion;
class NetworkProtocol extends serde_1.Serde {
    serialize() {
        console.error('NetworkProtocol.serialize() Not Implemented');
    }
}
exports.NetworkProtocol = NetworkProtocol;
class InstitutionDataCatalog extends serde_1.Serde {
    serialize() {
        console.error('InstitutionDataCatalog.serialize() Not Implemented');
    }
}
exports.InstitutionDataCatalog = InstitutionDataCatalog;
class AzureAction extends serde_1.VersionedEntity {
    constructor() {
        super(...arguments);
        this.buildWildCardCache = (input) => new Set(input.operation.toLowerCase().split('/').reduce((newActions, spltAction, idx, arr) => [
            ...newActions,
            ...(idx === 0 ? ['*', `*/${input.accessLevel}`] : []),
            ...(idx !== 0 ? [
                arr.reduce((acc, a, i) => {
                    acc += idx === i ? '*' : `${a}`;
                    return i === arr.length - 1 ? acc : acc += '/';
                }, ''),
                arr.reduce((acc, a, i) => {
                    if (idx > i) {
                        acc += a;
                    }
                    else if (idx === i) {
                        acc += '*';
                    }
                    return idx > i ? acc += '/' : acc;
                }, '')
            ] : []),
            ...(arr.length > 3 && idx === 0 ? [`${spltAction}/*/${input.accessLevel}`] : [])
        ], []));
    }
    get operationString() {
        return `${this.resourceType}/${this.accessLevel}`;
    }
    hasWildcard(wildcardAction) {
        if (!wildcardAction) {
            return false;
        }
        if (!wildcardAction.includes('*') || helpers_1.Util.isUndefined(this.actionWildcards)) {
            return false;
        }
        return this.actionWildcards.has(wildcardAction);
    }
    deserialize(input) {
        Object.assign(this, input);
        this.actionWildcards = this.buildWildCardCache(input);
        return this;
    }
    serialize() {
        console.error('AzureActions.serialize() Not Implemented');
    }
}
__decorate([
    serde_1.Exclude()
], AzureAction.prototype, "actionWildcards", void 0);
exports.AzureAction = AzureAction;
class AWSAction extends serde_1.VersionedEntity {
    get operationString() {
        return `${this.productCode}:${this.action}`;
    }
    get operation() {
        return this.operationString;
    }
    get lowerOperation() {
        return this.operation.toLowerCase();
    }
    get provider() {
        return this.productCode;
    }
    hasWildcard(wildcardAction) {
        if (!wildcardAction) {
            return false;
        }
        if (!wildcardAction.includes('*')) {
            return false;
        }
        const matchString = wildcardAction.replace('*', '(.*)');
        return new RegExp(`^${matchString}`).test(this.lowerOperation);
    }
    deserialize(input) {
        Object.assign(this, input);
        return this;
    }
    serialize() {
        console.error('AWSActions.serialize() Not Implemented');
    }
}
exports.AWSAction = AWSAction;
class CloudResourceField extends serde_1.Serde {
    serialize() {
        console.error('CloudResourceField.serialize() Not Implemented');
    }
    get isFormControl() {
        return Object.values(TYPE_MAP).includes(this.type);
    }
    get formGroup() {
        if (this.type === 'map' && !this.repeatable) {
            return new forms_1.FormGroup(Object.assign({}, this.fields.reduce((fields, field) => (Object.assign(Object.assign({}, fields), { [field.label]: field.formGroup })), {})));
        }
        if (this.type === 'map' && this.repeatable) {
            return new forms_1.FormArray([
                new forms_1.FormGroup(Object.assign({}, this.fields.reduce((fields, field) => (Object.assign(Object.assign({}, fields), { [field.label]: field.formGroup })), {})))
            ]);
        }
        if (this.repeatable) {
            return new forms_1.FormArray([
                // tslint:disable-next-line:no-null-keyword
                new forms_1.FormControl({ value: null, disabled: false })
            ]);
        }
        if (this.isFormControl && !this.repeatable) {
            // tslint:disable-next-line:no-null-keyword
            return new forms_1.FormControl({ value: null, disabled: true });
        }
    }
    deserialize(input) {
        Object.assign(this, input);
        this.repeatable = helpers_1.Util.isArray(input.fieldsObject);
        this.type = !helpers_1.Util.isObject(input.fieldsObject) || (helpers_1.Util.isArray(input.fieldsObject) && !helpers_1.Util.isObject(input.fieldsObject[0])) ?
            helpers_1.Util.isString(input.fieldsObject) ? TYPE_MAP[input.fieldsObject] : TYPE_MAP[input.fieldsObject[0]] : 'map';
        if (!helpers_1.Util.isObject(input.fieldsObject) || helpers_1.Util.isArray(input.fieldsObject)) {
            this.primitive = (!helpers_1.Util.isArray(input.fieldsObject) ? `${input.fieldsObject}` : `${input.fieldsObject[0]}`);
        }
        if (helpers_1.Util.isObject(input.fieldsObject) && !helpers_1.Util.isArray(input.fieldsObject)) {
            this.fields = Object.entries(input.fieldsObject)
                .reduce((fieldsArray, [label, fieldsObject]) => [...fieldsArray, new CloudResourceField().deserialize({ label, fieldsObject })], []);
        }
        if (helpers_1.Util.isArray(input.fieldsObject) && helpers_1.Util.isObject(input.fieldsObject[0])) {
            this.fields = input.fieldsObject.reduce((acc, obj) => [
                ...acc,
                ...Object.entries(obj).reduce((fieldAcc, [label, fieldsObject]) => [
                    ...fieldAcc,
                    new CloudResourceField().deserialize({ label, fieldsObject })
                ], [])
            ], []);
        }
        return this;
    }
}
exports.CloudResourceField = CloudResourceField;
class CloudResourceVersion extends serde_1.Serde {
    get name() {
        return this.version;
    }
    serialize() {
        console.error('CloudResourceVersion.serialize() Not Implemented');
    }
    deserialize(input) {
        Object.assign(this, input);
        this.fields = Object.entries(input.example)
            .reduce((fieldsArray, [label, fieldsObject]) => [...fieldsArray, new CloudResourceField().deserialize({ label, fieldsObject })], []);
        return this;
    }
}
exports.CloudResourceVersion = CloudResourceVersion;
class CloudResource extends serde_1.Serde {
    get name() {
        return this.resourceName;
    }
    serialize() {
        console.error('CloudResource.serialize() Not Implemented');
    }
    deserialize(input) {
        Object.assign(this, input);
        this.versions = input.versions.map(v => new CloudResourceVersion().deserialize(v));
        return this;
    }
}
exports.CloudResource = CloudResource;
class AzureResource extends serde_1.Serde {
    get name() {
        return this.providerName;
    }
    serialize() {
        console.error('AzureResources.serialize() Not Implemented');
    }
    deserialize(input) {
        Object.assign(this, input);
        this.resources = input.resources
            //   .filter(({ resourceName }) => !resourceName.endsWith('List'))
            .map(r => new CloudResource().deserialize(r));
        return this;
    }
}
exports.AzureResource = AzureResource;
class AwsResourceProvider extends serde_1.Serde {
    serialize() {
        console.error('AwsResources.serialize() Not Implemented');
    }
}
exports.AwsResourceProvider = AwsResourceProvider;
const TYPE_MAP = {
    string: 'string',
    jsonObject: 'json',
    int32: 'number',
    datetime: 'date',
    boolean: 'boolean',
    double: 'number',
    uuid: 'string',
    int64: 'number',
    float: 'number',
    date: 'date',
    email: 'string'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kZWxzL2NhdGFsb2ctc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDBDQUFvRjtBQUNwRix1REFBaUQ7QUFFakQsbUNBQTBFO0FBRTFFLE1BQWEsVUFBVyxTQUFRLHNCQUEwQjtJQU94RCxTQUFTO1FBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDRjtBQVZELGdDQVVDO0FBQ0QsTUFBTSxNQUFPLFNBQVEsYUFBYTtJQUloQyxTQUFTO1FBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDRjtBQUNELE1BQWEsU0FBVSxTQUFRLE1BQU07Q0FBRztBQUF4Qyw4QkFBd0M7QUFDeEMsTUFBYSxXQUFZLFNBQVEsTUFBTTtDQUV0QztBQUZELGtDQUVDO0FBRUQsTUFBYSxlQUFnQixTQUFRLGFBQXNCO0lBTXpELFNBQVM7UUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNGO0FBVEQsMENBU0M7QUFFRCxNQUFhLHNCQUF1QixTQUFRLGFBQTZCO0lBUXZFLFNBQVM7UUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNGO0FBWEQsd0RBV0M7QUFJRCxNQUFhLFdBQVksU0FBUSx1QkFBNEI7SUFBN0Q7O1FBb0NVLHVCQUFrQixHQUFHLENBQUMsS0FBMkIsRUFBZSxFQUFFLENBQ3hFLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0s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