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
let ConfigIdpComponent = class ConfigIdpComponent {
    constructor(fb, institutionFacade, auditHistoryFacade) {
        this.fb = fb;
        this.institutionFacade = institutionFacade;
        this.auditHistoryFacade = auditHistoryFacade;
        this.selected$ = this.institutionFacade.selected$;
        this.config$ = this.institutionFacade.idpConfig$;
        this.auditHistory$ = this.auditHistoryFacade.auditHistory$;
        this.form = this.fb.group({
            idpEntityId: [undefined, [forms_1.Validators.required]],
            type: [undefined, [forms_1.Validators.required]],
            metadataUrl: [undefined],
            metadataXml: [undefined],
            nameIdAsEmail: [false],
            userEmailAttribute: [undefined],
            userNameAttribute: [undefined]
        });
    }
    ngOnInit() {
        this.config$.pipe(operators_2.filter(c => !helpers_1.Util.isUndefined(c)), operators_2.take(1)).subscribe(config => {
            this.form.patchValue(config);
        });
        this.form.get('type').valueChanges.pipe(operators_1.untilDestroy(this)).subscribe(type => {
            const url = this.form.get('metadataUrl');
            const xml = this.form.get('metadataXml');
            url.clearValidators();
            xml.clearValidators();
            if (type === 'HTTP') {
                url.setValidators([forms_1.Validators.required]);
            }
            else if (type === 'DATABASE') {
                xml.setValidators([forms_1.Validators.required, helpers_1.FileValidators.mimeType(['application/xml', 'text/xml'])]);
            }
        });
        this.form.get('nameIdAsEmail').valueChanges.pipe(operators_1.untilDestroy(this)).subscribe(nameIdAsEmail => {
            const field = this.form.get('userEmailAttribute');
            if (nameIdAsEmail) {
                field.clearValidators();
            }
            else {
                field.setValidators([forms_1.Validators.required]);
            }
        });
    }
    ngOnDestroy() {
        // stub for untilDestroy
    }
    onSelectFile(event) {
        if (event.target.files) {
            const [file] = Array.from(event.target.files);
            const reader = new FileReader();
            reader.onload = (progressEvent) => {
                const xml = helpers_1.decodeBinaryData(progressEvent.target.result);
                this.form.get('metadataXml').setValue(xml);
            };
            reader.readAsDataURL(file);
        }
    }
    submit(config) {
        const _a = this.form.value, { metadataUrl, metadataXml, userEmailAttribute } = _a, formData = __rest(_a, ["metadataUrl", "metadataXml", "userEmailAttribute"]);
        const value = Object.assign(Object.assign(Object.assign({}, formData), (formData.type === 'HTTP' ? { metadataUrl } : { metadataXml })), (!formData.nameIdAsEmail ? { userEmailAttribute } : {}));
        if (!!config && !!config.id) {
            this.institutionFacade.updateConfig('idp', value);
        }
        else {
            this.institutionFacade.createConfig('idp', value);
        }
    }
};
ConfigIdpComponent = __decorate([
    core_1.Component({
        selector: 'app-config-idp',
        templateUrl: './config-idp.component.html',
        styleUrls: ['./config-idp.component.scss']
    })
], ConfigIdpComponent);
exports.ConfigIdpComponent = ConfigIdpComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWlkcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvaW5zdGl0dXRpb24vY29uZmlnLWlkcC9jb25maWctaWRwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTZEO0FBQzdELDBDQUF5RDtBQUV6RCx5REFBeUQ7QUFDekQsOENBQThDO0FBRzlDLHVEQUFtRjtBQVFuRixJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQWU3QixZQUNtQixFQUFlLEVBQ2YsaUJBQW9DLEVBQ3BDLGtCQUFzQztRQUZ0QyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2Ysc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBakJ6RCxjQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztRQUM3QyxZQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztRQUM1QyxrQkFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUM7UUFFdEQsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0MsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDeEIsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3hCLGFBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUN0QixrQkFBa0IsRUFBRSxDQUFDLFNBQVMs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