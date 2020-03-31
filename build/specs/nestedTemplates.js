"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const expectHelper_1 = require("../utils/expectHelper");
const nestedTemplates_Po_1 = require("../pageObjects/nestedTemplates.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
const assetManager_Po_1 = require("../pageObjects/assetManager.Po");
describe('Creaing Encalve Model With Nested Templates ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let nestedEnclaveModel = new nestedTemplates_Po_1.NestedEnClaveModel();
        let assetsManager = new assetManager_Po_1.AssetManager();
        let properties = require('../conf/properties');
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let assetName = properties.enclaveModelData.modelName + nestedEnclaveModel.getRandomNum(1, 1000);
        let desc = properties.enclaveModelData.modelDescription;
        let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
        let attributeTagdescription = properties.attributeTagData.attributeDescription1;
        let baseSurface = properties.SurfaceData.surfaceName;
        let attitibuteTag = [attributeTagName];
        let modelId;
        // let rootTemplate = ['roottemplate.json'];
        let nestedTemplateName = ['AWSAccountVPCLzKmsKey.json', 'AWSAccountVPCLzRole.json', 'AWSAccountVPCLzSecurityGroup.json', 'LandingZoneS3BucketCore.json'];
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Attribute Tag
                yield attributeTag.createAttributeTag(baseSurface, attributeTagName, attributeTagdescription);
                yield attributeTag.searchAttribute(baseSurface, attributeTagName, 'Description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
            });
        });
        it('Step 2: Create New Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Enclave Model
                yield nestedEnclaveModel.createNestedEnclaveModel(baseSurface, 'PUBLISHED', assetName, desc, attitibuteTag, 'roottemplate.json', nestedTemplateName, 'E2E Admin');
                modelId = yield nestedEnclaveModel.getId();
                yield console.log('Enclave Model name is', assetName);
                yield console.log('Enclave Model id is', modelId);
                yield nestedEnclaveModel.searchNestedEnclaveModel(baseSurface, assetName);
                yield expectHelper_1.ExpectHelper.isListElementExists(nestedEnclaveModel.assetList, assetName);
            });
        });
        it('Step 3: Edit Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Editing Created Enclave Model
                yield nestedEnclaveModel.editNestedEnclaveModel(baseSurface, assetName, desc);
                yield nestedEnclaveModel.searchNestedEnclaveModel(baseSurface, assetName + ' Updated');
                yield expectHelper_1.ExpectHelper.isListElementExists(nestedEnclaveModel.assetList, assetName);
            });
        });
        it('Step 4: Delete Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Deleting Enclave Model
                yield nestedEnclaveModel.deleteNestedEnclaveModel(baseSurface, assetName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(nestedEnclaveModel.enclaveModelElement(assetName));
            });
        });
        it('Step 5: Verify Enclave Model Deleted Or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying the Enclave Model is Deleted Or Not
                yield nestedEnclaveModel.verifyNestedEnclaveModel(assetName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(nestedEnclaveModel.enclaveModelElement(assetName));
            });
        });
        it('Step 6: Clean Up', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Clean Up
                yield attributeTag.deleteAttributeTag(baseSurface, attributeTagName, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkVGVtcGxhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NwZWNzL25lc3RlZFRlbXBsYXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUF5RDtBQUN6RCx3REFBcUQ7QUFDckQsMEVBQXVFO0FBQ3ZFLHNFQUErRDtBQUMvRCxvRUFBOEQ7QUFHOUQsUUFBUSxDQUFDLDhDQUE4QyxFQUFFOztRQUN2RCxJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRywrQkFBa0IsQ0FBQztRQUM1QixJQUFJLGtCQUFrQixHQUFHLElBQUksdUNBQWtCLEVBQUUsQ0FBQztRQUNsRCxJQUFJLGFBQWEsR0FBRyxJQUFJLDhCQUFZLEVBQUUsQ0FBQztRQUN2QyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLFlBQVksR0FBRyxJQUFJLCtCQUFZLEVBQUUsQ0FBQztRQUN0QyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakcsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO1FBQ3hELElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RyxJQUFJLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUNoRixJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUNyRCxJQUFJLGFBQWEsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdkMsSUFBSSxPQUFPLENBQUM7UUFDWiw0Q0FB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