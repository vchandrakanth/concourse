"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker/locale/en_US");
const baseline_asset_1 = require("@concourse/core/models/baseline-asset");
exports.fakeOneBaselineAsset = (i = 0) => (new baseline_asset_1.BaselineAsset().deserialize({
    created: faker.date.past(),
    updated: faker.date.recent(3),
    version: faker.random.number(4),
    majorVersion: faker.random.number(5),
    minorVersion: faker.random.number(5),
    status: faker.random.arrayElement(['PUBLISHED', 'DRAFT']),
    id: i + 1001,
    owningGroupId: 50012,
    description: faker.lorem.words(15),
    institutionId: 112,
    accountId: 3001,
    stackIds: [2, 1],
    name: faker.name.jobArea(),
    cloudProvider: faker.random.arrayElement(['AWS', 'AZURE'])
}));
exports.fakeOneBaselineStat = (i = 0) => (new baseline_asset_1.BaselineAssetStats().deserialize({
    type: 'Microsoft.Compute/availabilitySets',
    account: 'account',
    subscriptions: 'subscription1, subscription2',
    instanceCount: 2,
    uniqueResourceGroupCount: 3,
    regions: [
        'us-east-1',
        'us-east-2'
    ]
}));
exports.fakeOneBaselineOverview = () => (new baseline_asset_1.BaselineOverview().deserialize({
    accounts: ['0ecb99ea-ca1a-4be6-96cc-ceb57b7b63d4'],
    cloudProvider: 'AZURE',
    provider: ['Microsoft.Resources'],
    regions: ['centralus', 'eastus2', 'westus', 'eastus'],
    resourceCount: '52',
    resourceGroups: ['base-centralus-routetable', 'base-eastus2-routetable', 'cloud-shell-storage-westus', 'pengr2_rg'],
    resourceTypes: ['Microsoft.Network/routeTables', 'Microsoft.Storage/storageAccounts', 'Microsoft.RecoveryServices/vaults'],
    subscriptions: ['9f192061-a3af-48c1-822c-5670e6f38a52', '031a1b08-fdd1-4567-90eb-c91b2984b400']
}));
exports.fakeOneBaselineContent = (i = 0) => (new baseline_asset_1.BaselineAssetContent().deserialize({
    identifier: '/subscriptions/2e8w82/resourceGroups/base-eastus2/providers/Microsoft.Compute/availabilitySets/resourceName2',
    name: 'resourceName2',
    account: 'account',
    subscription: 'subscription2',
    resourceGroup: 'fakeResourceGroup2',
    resourceType: 'AWS:S3',
    region: 'us-east-2',
    resourceTags: [
        'tag2:val21',
        'tag2:val22'
    ]
}));
exports.fakeManyBaselineAssets = (count = faker.random.number({ min: 5, max: 100 })) => {
    const baselineAssets = [];
    for (let i = 0; i < count; i++) {
        baselineAssets.push(exports.fakeOneBaselineAsset(i));
    }
    return baselineAssets;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQuZmFrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYmFzZWxpbmUtYXNzZXQvc2VydmljZXMvYmFzZWxpbmUtYXNzZXQuZmFrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNEM7QUFJNUMsMEVBQWtJO0FBSXJILFFBQUEsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFpQixFQUFFLENBQUMsQ0FBQyxJQUFJLDhCQUFhLEVBQUUsQ0FBQyxXQUFXLENBQzVGO0lBQ0UsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO0lBQzFCLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0IsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMvQixZQUFZLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLFlBQVksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSTtJQUNaLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLFdBQVcsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDbEMsYUFBYSxFQUFFLEdBQUc7SUFDbEIsU0FBUyxFQUFFLElBQUk7SUFDZixRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFFO0lBQ2pCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtJQUMxQixhQUFhLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDM0QsQ0FDRixDQUFDLENBQUM7QUFFVSxRQUFBLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBc0IsRUFBRSxDQUFDLENBQ2hFLElBQUksbUNBQWtCLEVBQUUsQ0FBQyxXQUFXLENBQ2xDO0lBQ0UsSUFBSSxFQUFFLG9DQUFvQztJQUMxQyxPQUFPLEVBQUcsU0FBUztJQUNuQixhQUFhLEVBQUcsOEJBQThCO0lBQzlDLGFBQWEsRUFBRSxDQUFDO0lBQ2hCLHdCQUF3QixFQUFFLENBQUM7SUFDM0IsT0FBTyxFQUFFO1FBQ1AsV0FBVztRQUNYLFdBQVc7S0FDWjtDQUNBLENBQ0osQ0FDRixDQUFDO0FBRVcsUUFBQSx1QkFBdUIsR0FBRyxHQUFxQixFQUFFLENBQUMsQ0FDN0QsSUFBSSxpQ0FBZ0IsRUFBRSxDQUFDLFdBQVcsQ0FDaEM7SUFDRSxRQUFRLEVBQUcsQ0FBRSxzQ0FBc0MsQ0FBRTtJQUNyRCxhQUFhLEVBQUcsT0FBTztJQUN2QixRQUFRLEVBQUcsQ0FBRSxxQkFBcUIsQ0FBRTtJQUNwQyxPQUFPLEVBQUUsQ0FBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUU7SUFDdkQsYUFBYSxFQUFHLElBQUk7SUFDcEIsY0FBYyxFQUFHLENBQUUsMkJBQTJCLEVBQUUseUJBQXlCLEVBQUUsNEJBQTRCLEVBQUUsV0FBVyxDQUFFO0lBQ3RILGFBQWEsRUFBRyxDQUFFLCtCQUErQixFQUFFLG1DQUFtQyxFQUFFLG1DQUFtQyxDQUFFO0lBQzdILGFBQWEsRUFBRyxDQUFFLHNDQUFzQyxFQUFFLHNDQUFzQyxDQUFFO0NBQ25HLENBQ0YsQ0FDRixDQUFDO0FBRVcsUUFBQSxzQkFBc0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQXdCLEVBQUUsQ0FBQyxDQUNyRSxJQUFJLHFDQUFvQixFQUFFLENBQUMsV0FBVyxDQUNwQztJQUNFLFVBQVUsRUFBRSw4R0FBOEc7SUFDMUgsSUFBSSxFQUFFLGVBQWU7SUFDckIsT0FBTyxFQUFHLFNBQVM7SUFDbkIsWUFBWSxFQUFHLGVBQWU7SUFDOUIsYUFBYSxFQUFFLG9CQUFvQjtJQUNuQyxZQUFZLEVBQUUsUUFBUTtJQUN0QixNQUFNLEVBQUUsV0FBVztJQUNuQixZQUFZLEVBQUU7UUFDWixZQUFZO1FBQ1osWUFBWTtLQUNiO0NBQ0YsQ0FDRixDQUNGLENBQUM7QUFFVyxRQUFBLHNCQUFzQixHQUFHLENBQ3BDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQ2hDLEVBQUU7SUFDbkIsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDOUIsY0FBYyxDQUFDLElBQUksQ0FBQyw0QkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBQ0QsT0FBTyxjQUFjLENBQUM7QUFDeEIsQ0FBQyxDQUFDIn0=