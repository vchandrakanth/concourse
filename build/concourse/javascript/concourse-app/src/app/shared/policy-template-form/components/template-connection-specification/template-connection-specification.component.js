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
const operators_1 = require("@concourse/core/operators");
const operators_2 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
let TemplateConnectionSpecificationComponent = class TemplateConnectionSpecificationComponent {
    constructor(fb, ptfComponent, catalogFacade) {
        this.fb = fb;
        this.ptfComponent = ptfComponent;
        this.catalogFacade = catalogFacade;
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
            cidrBlocks: [[]]
        });
        this.networkProtocols$ = this.catalogFacade.networkProtocolsList$.pipe(operators_2.filter(nps => !!nps), operators_2.tap((nps) => {
            this.networkProtocolMap = new Map(nps.map(np => ([np.protocolName, np])));
        }), operators_2.map((nps) => nps.map(np => np.protocolName)));
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
    ngOnInit() {
        this.catalogFacade.getNetworkProtocols();
        if (this.templateConfig.attributeValues) {
            const [value] = this.templateConfig.attributeValues;
            const [start, end] = value.portRange.length > 0 ? value.portRange.split(':') : ['', ''];
            const patchValue = Object.assign(Object.assign({}, value), { ipProtocol: value.ipProtocol, fePorts: {
                    start,
                    end
                } });
            this.controlGroup.patchValue(patchValue);
        }
        this.ptfComponent.getGroup(this.templateConfig.parent).addControl(this.templateConfig.name, this.controlGroup);
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
};
TemplateConnectionSpecificationComponent = __decorate([
    core_1.Component({
        selector: 'app-template-connection-specification',
        templateUrl: './template-connection-specification.component.html',
        styles: [],
        styleUrls: ['../styles/multi-select.scss']
    })
], TemplateConnectionSpecificationComponent);
exports.TemplateConnectionSpecificationComponent = TemplateConnectionSpecificationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtY29ubmVjdGlvbi1zcGVjaWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0vY29tcG9uZW50cy90ZW1wbGF0ZS1jb25uZWN0aW9uLXNwZWNpZmljYXRpb24vdGVtcGxhdGUtY29ubmVjdGlvbi1zcGVjaWZpY2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUE2RDtBQUM3RCwwQ0FBeUQ7QUFFekQseURBQXlEO0FBQ3pELDhDQUF3RTtBQU14RSx1REFBNkQ7QUFRN0QsSUFBYSx3Q0FBd0MsR0FBckQsTUFBYSx3Q0FBd0M7SUFxQ25ELFlBQ21CLEVBQWUsRUFDZixZQUF5QyxFQUN6QyxhQUFtQztRQUZuQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsaUJBQVksR0FBWixZQUFZLENBQTZCO1FBQ3pDLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQXRDdEQsaUJBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUMzQixJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDL0IsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1lBQ2xDLFVBQVUsRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztZQUM1QyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFB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