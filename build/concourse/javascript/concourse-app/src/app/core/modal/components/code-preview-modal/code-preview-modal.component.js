"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faDownload_1 = require("@fortawesome/free-solid-svg-icons/faDownload");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
let CodePreviewModalComponent = class CodePreviewModalComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.icons = { faTimes: faTimes_1.faTimes, faDownload: faDownload_1.faDownload };
        this.fileType = '';
        this.downloadable = false;
        this.parseError = false;
    }
    get showFooter() {
        // if we add any more buttons, we should add them to this check.
        return this.downloadable;
    }
    get isCodeString() {
        return !!this.codeString;
    }
    get codeStringJSON() {
        try {
            return JSON.parse(this.codeString);
        }
        catch (error) {
            this.parseError = true;
            console.error(error);
        }
    }
    get fileMimeType() {
        switch (this.fileType.toLowerCase()) {
            case 'yaml':
                return 'application/x-yaml';
            case 'json':
                return 'application/json';
            default:
                return 'text/plain';
        }
    }
    get downloadFileBlob() {
        return this.sanitizer.bypassSecurityTrustUrl(`data:${this.fileMimeType};charset=utf-8,${encodeURIComponent(this.codeString)}`);
    }
};
CodePreviewModalComponent = __decorate([
    core_1.Component({
        selector: 'app-code-preview-modal',
        templateUrl: './code-preview-modal.component.html',
        styleUrls: ['./code-preview-modal.component.scss']
    })
], CodePreviewModalComponent);
exports.CodePreviewModalComponent = CodePreviewModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1wcmV2aWV3LW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvY29kZS1wcmV2aWV3LW1vZGFsL2NvZGUtcHJldmlldy1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFFMUMsNkVBQTBFO0FBQzFFLHVFQUFvRTtBQU9wRSxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtJQVVwQyxZQUNtQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBVmpDLFVBQUssR0FBRyxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLFVBQVUsRUFBVix1QkFBVSxFQUFFLENBQUM7UUFJekMsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGVBQVUsR0FBRyxLQUFLLENBQUM7SUFJZixDQUFDO0lBRUwsSUFBSSxVQUFVO1FBQ1osZ0VBQWdFO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLElBQUk7WUFDRixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3BDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNuQyxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxvQkFBb0IsQ0FBQztZQUU5QixLQUFLLE1BQU07Z0JBQ1QsT0FBTyxrQkFBa0IsQ0FBQztZQUU1QjtnQkFDRSxPQUFPLFlBQVksQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsUUFBUSxJQUFJLENBQUMsWUFBWSxrQkFBa0Isa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqSSxDQUFDO0NBQ0YsQ0FBQTtBQWpEWSx5QkFBeUI7SUFMckMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx3QkFBd0I7UUFDbEMsV0FBVyxFQUFFLHFDQUFxQztRQUNsRCxTQUFTLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztLQUNuRCxDQUFDO0dBQ1cseUJBQXlCLENBaURyQztBQWpEWSw4REFBeUIifQ==