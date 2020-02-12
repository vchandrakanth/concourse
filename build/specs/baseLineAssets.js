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
const baseLineAssets_Po_1 = require("../pageObjects/baseLineAssets.Po");
const attributeTags_Po_1 = require("../pageObjects/attributeTags.Po");
describe('Creating BaseLine Asset', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let baseLineAsset = new baseLineAssets_Po_1.BaseLineAsset();
        let properties = require('../conf/properties');
        let attributeTag = new attributeTags_Po_1.AttributeTag();
        let assetName = properties.enclaveModelData.modelName + baseLineAsset.getRandomNum(1, 1000);
        let desc = properties.enclaveModelData.modelDescription;
        let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
        let attributeTagdescription = properties.attributeTagData.attributeDescription1;
        let attitibuteTag = [attributeTagName];
        let baseSurface = properties.SurfaceData.surfaceName;
        //   let account = properties.BaseLineData.accountName;
        let accountName = ['0ecb99ea-ca1a-4be6-96cc-ceb57b7b63d4'];
        //   let subscriptionName = properties.BaseLineData.subscription;
        let subscription = ['3263f5e2-3561-433c-97f2-e31b389e45ff'];
        //   let resourceGroupName = properties.BaseLineData.resourceGroup;
        let resourceGroup = ['TestConnection'];
        //   let productType = properties.BaseLineData.product;
        let product = ['Microsoft.Batch/batchAccounts'];
        //   let regionName = properties.BaseLineData.region;
        let region = ['South India'];
        //   let tagKey = properties.BaseLineData.key;
        let key = ['creation_data:20200129'];
        //   let tagValue =  properties.BaseLineData.value;
        let value = ['creation_data:20200129'];
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
                yield baseLineAsset.createBaseLineAsset(baseSurface, 'PUBLISHED', assetName, desc, 'E2E Admin', accountName, subscription, resourceGroup, product, region, key, value, attitibuteTag);
                baseLineAssetId = yield baseLineAsset.getId();
                yield console.log('BaseLine Asset name is', assetName);
                yield console.log('BaseLine Asset id is', baseLineAssetId);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUxpbmVBc3NldHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BlY3MvYmFzZUxpbmVBc3NldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBeUQ7QUFDekQsd0RBQXFEO0FBQ3JELHdFQUFpRTtBQUNqRSxzRUFBK0Q7QUFHL0QsUUFBUSxDQUFDLHlCQUF5QixFQUFFOztRQUNsQyxJQUFJLGVBQWUsQ0FBQztRQUNwQixJQUFJLEVBQUUsR0FBRywrQkFBa0IsQ0FBQztRQUM1QixJQUFJLGFBQWEsR0FBRyxJQUFJLGlDQUFhLEVBQUUsQ0FBQztRQUN4QyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMvQyxJQUFJLFlBQVksR0FBRyxJQUFJLCtCQUFZLEVBQUUsQ0FBQztRQUN0QyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVGLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN4RCxJQUFJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkcsSUFBSSx1QkFBdUIsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7UUFDaEYsSUFBSSxhQUFhLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQ3ZELHVEQUF1RDtRQUNyRCxJQUFJLFdBQVcsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDN0QsaUVBQWlFO1FBQy9ELElBQUksWUFBWSxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUM5RCxtRUFBbUU7UUFDakUsSUFBSSxhQUFhLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3pDLHVEQUF1RDtRQUNyRCxJQUFJLE9BQU8sR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDbEQscURBQXFEO1FBQ25ELElBQUksTUFBTSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0IsOENBQThDO1FBQzVDLElBQUksR0FBRyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN2QyxtREFBbUQ7UUFDakQsSUFBSSxLQUFLLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksZUFBZSxDQUFDO1FBRXBCLFVBQVUsQ0FBQztZQUNULGVBQWUsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUM7WUFDbkQsT0FBTyxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUdILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTs7Z0JBQ2pDLHlCQUF5QjtnQkFDekIsTUFBTSxZQUFZLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLGdCQUFnQixFQUFFLHVCQUF1QixDQUFDLENBQUM7Z0JBQzlGLE1BQU0sWUFBWSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ2pGLE1BQU0sMkJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDOUUsQ0FBQztTQUFBLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTs7Z0JBQ3RDLDBCQUEwQjtnQkFDMUIsTUFBTSxhQUFhLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUN6SCxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUMzRCxlQUFlLEdBQUcsTUFBTSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzlDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzdELENBQUM7U0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQUEsQ0FBQyxDQUFDIn0=