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
        let nestedEnClaveModel = new nestedTemplates_Po_1.NestedEnClaveModel();
        let assetsManager = new assetManager_Po_1.AssetManager();
        let properties = require('../conf/properties');
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let assetName = properties.enclaveModelData.modelName + nestedEnClaveModel.getRandomNum(1, 1000);
        let desc = properties.enclaveModelData.modelDescription;
        let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
        let attributeTagdescription = properties.attributeTagData.attributeDescription1;
        let attitibuteTag = [attributeTagName];
        let modelId;
        let nestedTemplateName = [, 'AWSAccountVPCLzKmsKey.json', 'AWSAccountVPCLzRole.json', 'AWSAccountVPCLzSecurityGroup.json', 'LandingZoneS3BucketCore.json'];
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        });
        it('Step 1: Create Attribute Tag', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Attribute Tag
                yield attributeTag.createAttributeTag(attributeTagName, attributeTagdescription);
                yield attributeTag.searchAttribute(attributeTagName, 'Description');
                yield expectHelper_1.ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
            });
        });
        it('Step 2: Create New Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating Enclave Model
                yield nestedEnClaveModel.createNestedEnclaveModel('PUBLISHED', assetName, desc, attitibuteTag, 'roottemplate.json', nestedTemplateName, 'E2E Admin');
                yield expectHelper_1.ExpectHelper.isListElementExists(nestedEnClaveModel.list, assetName);
                modelId = yield nestedEnClaveModel.getId();
                yield console.log('Enclave Model name is', assetName);
                yield console.log('Enclave Model id is', modelId);
            });
        });
        it('Step 3: Edit Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Editing Created Enclave Model
                yield nestedEnClaveModel.editNestedEnclaveModel(assetName, desc);
                yield assetsManager.searchAssetManager(assetName + '  Updated');
                yield expectHelper_1.ExpectHelper.isListElementExists(assetsManager.assetList, modelId);
            });
        });
        it('Step 4: Delete Enclave Model', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Deleting Enclave Model
                yield nestedEnClaveModel.deleteNestedEnclaveModel(assetName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));
            });
        });
        it('Step 5: Verify Enclave Model Deleted Or Not', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Verifying the Enclave Model is Deleted Or Not
                yield nestedEnClaveModel.verifyNestedEnclaveModel(assetName);
                yield expectHelper_1.ExpectHelper.expectDoesNotExists(assetsManager.enclaveModelElement(assetName));
            });
        });
        it('Step 6: Clean Up', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Clean Up
                yield attributeTag.deleteAttributeTag(attributeTagName, 'false');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkVGVtcGxhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NwZWNzL25lc3RlZFRlbXBsYXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUF5RDtBQUN6RCx3REFBcUQ7QUFDckQsMEVBQXVFO0FBQ3ZFLHNFQUErRDtBQUMvRCxvRUFBOEQ7QUFHOUQsUUFBUSxDQUFDLDhDQUE4QyxFQUFFOztRQUN2RCxJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRywrQkFBa0IsQ0FBQztRQUM1QixJQUFJLGtCQUFrQixHQUFHLElBQUksdUNBQWtCLEVBQUUsQ0FBQztRQUNsRCxJQUFJLGFBQWEsR0FBRyxJQUFJLDhCQUFZLEVBQUUsQ0FBQztRQUN2QyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLFlBQVksR0FBRyxJQUFJLCtCQUFZLEVBQUUsQ0FBQztRQUN0QyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakcsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDO1FBQ3hELElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RyxJQUFJLHVCQUF1QixHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQztRQUNoRixJQUFJLGFBQWEsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdkMsSUFBSSxPQUFPLENBQUM7UUFDWixJQUFJLGtCQUFrQixHQUFHLENBQUMsRUFBRSw0QkFBNEIsRUFBRSwwQkFBMEIsRUFBRSxtQ0FB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