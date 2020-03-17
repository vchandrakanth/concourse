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
const expectHelper_1 = require("../utils/expectHelper");
const baseLineAssets_Po_1 = require("../pageObjects/baseLineAssets.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
describe('Creating BaseLine Asset', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let baseLineAsset = new baseLineAssets_Po_1.BaseLineAsset();
        let properties = require('../conf/properties');
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let baselineAssetName = properties.enclaveModelData.modelName + baseLineAsset.getRandomNum(1, 1000);
        let desc = properties.enclaveModelData.modelDescription;
        let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
        let attributeTagdescription = properties.attributeTagData.attributeDescription1;
        let attitibuteTag = [attributeTagName];
        let baseSurface = properties.SurfaceData.surfaceName;
        let accountName = ['0ecb99ea-ca1a-4be6-96cc-ceb57b7b63d4'];
        let subscription = ['3263f5e2-3561-433c-97f2-e31b389e45ff'];
        let resourceGroup = ['TestConnection'];
        let product = ['Microsoft.Batch/batchAccounts'];
        let region = ['South India'];
        let key = ['service'];
        let value = ['istio-system/istio-ingressgateway'];
        let baseLineAssetId;
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
        it('Step 2: Create New BaseLine Asset', function () {
            return __awaiter(this, void 0, void 0, function* () {
                // Creating BaseLine Asset
                yield baseLineAsset.createBaseLineAsset(baseSurface, 'DRAFT', baselineAssetName, desc, 'E2E Admin', accountName, subscription, resourceGroup, product, region, key, value, attitibuteTag);
                baseLineAssetId = yield baseLineAsset.getId();
                yield console.log('BaseLine Asset name is', baselineAssetName);
                yield console.log('BaseLine Asset id is', baseLineAssetId);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUxpbmVBc3NldHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvYmFzZUxpbmVBc3NldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSx3REFBcUQ7QUFDckQsd0VBQWlFO0FBQ2pFLHNFQUErRDtBQUcvRCxRQUFRLENBQUMseUJBQXlCLEVBQUU7O1FBQ2xDLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksYUFBYSxHQUFHLElBQUksaUNBQWEsRUFBRSxDQUFDO1FBQ3hDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksWUFBWSxHQUFHLElBQUksK0JBQVksRUFBRSxDQUFDO1FBQ3RDLElBQUksaUJBQWlCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7UUFDeEQsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZHLElBQUksdUJBQXVCLEdBQUcsVUFBVSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDO1FBQ2hGLElBQUksYUFBYSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztRQUVyRCxJQUFJLFdBQVcsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxZQUFZLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQzVELElBQUksYUFBYSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxJQUFJLE9BQU8sR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDaEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QixJQUFJLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksS0FBSyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNsRCxJQUFJLGVBQWUsQ0FBQztRQUVwQixVQUFVLENBQUM7WUFDVCxlQUFlLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQ25ELE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxNQUFNLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFHSCxFQUFFLENBQUMsOEJBQThCLEVBQUU7O2dCQUNqQyx5QkFBeUI7Z0JBQ3pCLE1BQU0sWUFBWSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO2dCQUM5RixNQUFNLFlBQVksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNqRixNQUFNLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlFLENBQUM7U0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsbUNBQW1DLEVBQUU7O2dCQUN0QywwQkFBMEI7Z0JBQzFCLE1BQU0sYUFBYSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUMzSCxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUM3RCxlQUFlLEdBQUcsTUFBTSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzlDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUMvRCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDN0QsQ0FBQztTQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FBQSxDQUFDLENBQUMifQ==