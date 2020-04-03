"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faArrowRight_1 = require("@fortawesome/free-solid-svg-icons/faArrowRight");
const diff = require("diff");
const helpers_1 = require("@concourse/shared/helpers");
let AuditHistoryComponent = class AuditHistoryComponent {
    constructor(auditFacade) {
        this.auditFacade = auditFacade;
        this.autoLoad = false;
        this.label = 'Audit History';
        this.loading$ = this.auditFacade.isLoading$;
        this.loaded$ = this.auditFacade.isLoaded$;
        this.icons = { faArrowRight: faArrowRight_1.faArrowRight };
    }
    set history(history) {
        if (!helpers_1.Util.isUndefined(history) && helpers_1.Util.isArray(history)) {
            this._history = history.map(h => {
                const changePairs = Object.entries(h.revisionChanges);
                if (h.revisionType !== 'CREATE' && changePairs.length > 0) {
                    h.diffs = changePairs.reduce((diffs, [property, changePair]) => [
                        ...diffs,
                        { property, changes: this.diff(changePair) }
                    ], []);
                }
                return h;
            });
        }
        else {
            this._history = [];
        }
    }
    get history() {
        return this._history;
    }
    diff({ oldValue, newValue }) {
        if ((helpers_1.Util.isString(oldValue) || helpers_1.Util.isNumber(oldValue)) &&
            (helpers_1.Util.isString(newValue) || helpers_1.Util.isNumber(newValue))) {
            return diff.diffWords(`${oldValue}`, `${newValue}`);
        }
        if ((helpers_1.Util.isBoolean(oldValue) || helpers_1.Util.isBoolean(oldValue))) {
            return diff.diffWords(`${oldValue}`, `${newValue}`);
        }
        // TODO: for now these are just going to parse the JSON value as a string, and compare.
        // the backend API is still not quite done, so we are unable to do any further with the UI.
        // in the future, the idea will be to create specific templates to display the parsed data - possibly based on entityType
        if (helpers_1.Util.isObject(oldValue) && helpers_1.Util.isObject(newValue)) {
            return diff.diffWords(JSON.stringify(oldValue), JSON.stringify(newValue));
        }
        if (helpers_1.Util.isArray(oldValue) && helpers_1.Util.isArray(newValue)) {
            return diff.diffWords(JSON.stringify(oldValue), JSON.stringify(newValue));
        }
    }
    ngOnChanges(changes) {
        const { entityId } = changes;
        if (!helpers_1.Util.isUndefined(entityId) && (entityId.currentValue !== entityId.previousValue || entityId.firstChange)) {
            this.auditFacade.reset();
            if (this.autoLoad) {
                this.load();
            }
        }
    }
    load() {
        this.auditFacade.load({ entityId: this.entityId, entityType: this.entityType });
    }
};
__decorate([
    core_1.Input()
], AuditHistoryComponent.prototype, "history", null);
__decorate([
    core_1.Input()
], AuditHistoryComponent.prototype, "autoLoad", void 0);
__decorate([
    core_1.Input()
], AuditHistoryComponent.prototype, "entityId", void 0);
__decorate([
    core_1.Input()
], AuditHistoryComponent.prototype, "entityType", void 0);
__decorate([
    core_1.Input()
], AuditHistoryComponent.prototype, "label", void 0);
AuditHistoryComponent = __decorate([
    core_1.Component({
        selector: 'app-audit-history',
        templateUrl: './audit-history.component.html',
        styleUrls: ['./audit-history.component.scss']
    })
], AuditHistoryComponent);
exports.AuditHistoryComponent = AuditHistoryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtaGlzdG9yeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvYXVkaXQtaGlzdG9yeS9hdWRpdC1oaXN0b3J5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyRTtBQUMzRSxpRkFBOEU7QUFDOUUsNkJBQTZCO0FBRzdCLHVEQUFpRDtBQVFqRCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQStCaEMsWUFDbUIsV0FBK0I7UUFBL0IsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBWnpDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsVUFBSyxHQUFHLGVBQWUsQ0FBQztRQUVqQyxhQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDdkMsWUFBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBRTVCLFVBQUssR0FBRyxFQUFFLFlBQVksRUFBWiwyQkFBWSxFQUFFLENBQUM7SUFLOUIsQ0FBQztJQWhDSSxJQUFJLE9BQU8sQ0FBQyxPQUF1QjtRQUMxQyxJQUFJLENBQUMsY0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxjQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDOUIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxDQUFDLFlBQVksS0FBSyxRQUFRLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3pELENBQUMs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