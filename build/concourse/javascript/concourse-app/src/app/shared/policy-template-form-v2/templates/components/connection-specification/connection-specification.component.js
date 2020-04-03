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
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
// tslint:disable-next-line:no-forward-ref
exports._componentFactory = core_1.forwardRef(() => ConnectionSpecificationComponent);
let ConnectionSpecificationComponent = class ConnectionSpecificationComponent {
    constructor(fb, catalogFacade, institutionDataFacade) {
        this.fb = fb;
        this.catalogFacade = catalogFacade;
        this.institutionDataFacade = institutionDataFacade;
        this.controlGroup = this.fb.group({
            name: ['', forms_1.Validators.required],
            allowed: ['', forms_1.Validators.required],
            ipProtocol: [undefined, forms_1.Validators.required],
            portRange: [''],
            fePorts: this.fb.group({
                start: this.fb.control({ value: '', disabled: true }),
                end: this.fb.control({ value: '', disabled: true })
            }),
            direction: ['BIDIRECTIONAL', forms_1.Validators.required],
            tag: ['', forms_1.Validators.required],
            isIpv4: [true],
            cidrBlocks: [undefined, forms_1.Validators.required]
        });
        this.isDisabled = false;
        this.networkProtocols$ = this.catalogFacade.networkProtocolsList$.pipe(operators_2.filter(nps => !!nps), operators_2.tap((nps) => {
            this.networkProtocolMap = new Map(nps.map(np => ([np.protocolName, np])));
        }), operators_2.map((nps) => nps.map(np => np.protocolName)));
        this.cidrBlocks$ = this.institutionDataFacade.cidrs$.pipe(operators_2.filter(selected => !!selected), operators_2.map(blocks => Object.entries(blocks.multiMapValues).map(([label, value]) => ({ label, value }))));
        this.propagateChange = (_) => { };
    }
    set selectedNetworkProtocol(protocolName) {
        this._selectedNetworkProtocol = this.networkProtocolMap.get(protocolName);
    }
    get selectedNetworkProtocolHelpText() {
        if (this._selectedNetworkProtocol) {
            return this._selectedNetworkProtocol.defaultsTo;
        }
        return undefined;
    }
    get value() {
        const _a = this.controlGroup.value, { fePorts } = _a, toReturn = __rest(_a, ["fePorts"]);
        return toReturn;
    }
    ngOnInit() {
        this.institutionDataFacade.get({ dataDomain: 'INSTITUTION' }, 'network-whitelists');
        this.catalogFacade.getNetworkProtocols();
        this.controlGroup.valueChanges.pipe(operators_1.untilDestroy(this), operators_2.distinctUntilChanged()).subscribe(_ => {
            this.propagateChange(this.value);
        });
        this.controlGroup.get('ipProtocol').valueChanges.pipe(operators_1.untilDestroy(this), operators_2.distinctUntilChanged()).subscribe(ipProtocol => {
            const startPortControl = this.controlGroup.get('fePorts.start');
            const endPortControl = this.controlGroup.get('fePorts.end');
            startPortControl.clearValidators();
            endPortControl.clearValidators();
            startPortControl.reset();
            endPortControl.reset();
            startPortControl.disable();
            endPortControl.disable();
            if (ipProtocol) {
                this.selectedNetworkProtocol = ipProtocol;
                if (this._selectedNetworkProtocol.requirePorts) {
                    startPortControl.enable();
                    endPortControl.enable();
                    startPortControl.setValidators([forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(65535)]);
                    endPortControl.setValidators([
                        forms_1.Validators.required,
                        forms_1.Validators.min(0),
                        forms_1.Validators.max(65535),
                        helpers_1.endPortValidator
                    ]);
                }
            }
        });
        this.controlGroup.get('fePorts').valueChanges.pipe(operators_1.untilDestroy(this)).subscribe(({ start, end }) => {
            const portControl = this.controlGroup.get('portRange');
            portControl.reset();
            if (start & end) {
                portControl.setValue(`${start}:${end}`);
            }
        });
    }
    ngOnDestroy() {
        // stub for untilDestroy
    }
    writeValue(value) {
        if (!helpers_1.Util.isNullOrUndefined(value)) {
            const [start, end] = value.portRange.length > 0 ? value.portRange.split(':') : ['', ''];
            this.controlGroup.patchValue(Object.assign(Object.assign({}, value), { ipProtocol: value.ipProtocol, fePorts: {
                    start,
                    end
                } }));
            this.propagateChange(this.value);
        }
    }
    setDisabledState(isDisabled) {
        Object.values(this.controlGroup.controls).forEach(control => {
            this.isDisabled = isDisabled;
            if (isDisabled) {
                control.disable();
            }
        });
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() {
        if (!this.isDisabled) {
            this.propagateChange(this.value);
        }
    }
};
ConnectionSpecificationComponent = __decorate([
    core_1.Component({
        selector: 'app-connection-specification',
        templateUrl: './connection-specification.component.html',
        styleUrls: ['./connection-specification.component.scss'],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: exports._componentFactory,
                multi: true
            }
        ]
    })
], ConnectionSpecificationComponent);
exports.ConnectionSpecificationComponent = ConnectionSpecificationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi1zcGVjaWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0tdjIvdGVtcGxhdGVzL2NvbXBvbmVudHMvY29ubmVjdGlvbi1zcGVjaWZpY2F0aW9uL2Nvbm5lY3Rpb24tc3BlY2lmaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUF5RTtBQUN6RSwwQ0FBa0c7QUFFbEcseURBQXlEO0FBQ3pELDhDQUF3RTtBQUd4RSx1REFBbUU7QUFHbkUsMENBQTBDO0FBQzdCLFFBQUEsaUJBQWlCLEdBQUcsaUJBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBY3BGLElBQWEsZ0NBQWdDLEdBQTdDLE1BQWEsZ0NBQWdDO0lBaUQzQyxZQUNtQixFQUFlLEVBQ2YsYUFBbUMsRUFDbkMscUJBQTRDO1FBRjVDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbkMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQW5EL0QsaUJBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUMzQixJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDL0IsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1lBQ2xDLFVBQVUsRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztZQUM1QyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxL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