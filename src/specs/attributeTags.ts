import { ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { AttributeTag } from '../pageObjects/attributeTags.Po';


describe('Creaing Attribute Tags', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let attributeTag = new AttributeTag();
    let properties = require('../conf/properties');
    let attributeTagName = properties.attributeTagData.attributeName1 + attributeTag.getRandomNum(1, 1000);
    let description = properties.attributeTagData.attributeDescription1;
    let baseSurface = properties.SurfaceData.surfaceName;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;
    });

    it('Step 1: Create Attribute Tag', async function (): Promise<any> {
        // Creating Ayttribute Tag
        await attributeTag.createAttributeTag(baseSurface, attributeTagName, description);
        await attributeTag.searchAttribute(baseSurface, attributeTagName, 'description');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName);
    });

    it('Step 2: Edit Attribute Tag', async function (): Promise<any> {
        // Editing Attribute Tag
        await attributeTag.editAttributeTag(baseSurface, attributeTagName, description);
        // await attributeTag.searchAttribute(baseSurface, attributeTagName + ' Updated');
        await ExpectHelper.isListElementExists(attributeTag.list, attributeTagName + ' Updated');
    });

    it('Step 3: Delete Attribute Tag', async function (): Promise<any> {
        // Deleting Attribute Tag
        await attributeTag.deleteAttributeTag(baseSurface, attributeTagName);
        await ExpectHelper.expectDoesNotExists(attributeTag.searchAttributeName(attributeTagName));
    });

    it('Step 4: Verify Attribute Tag Deleted or Not', async function (): Promise<any> {
        // Verifying The Attribute Tag Is Deleted Or Not
        await attributeTag.verifyAttributeTag(attributeTagName);
        await ExpectHelper.expectDoesNotExists(attributeTag.searchAttributeName(attributeTagName));
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});