import { browser, ExpectedConditions } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { Surface } from '../pageObjects/surfaces.Po';

describe('Surface Creation Concourse ', async function () {
    let originalTimeout;
    let EC = ExpectedConditions;
    let properties = require('../conf/properties');
    let surface = new Surface();
    let surfaceName = properties.SurfaceData.surfaceName + surface.getRandomNum(1, 1000);
    let description = properties.SurfaceData.surfacedesc;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
    });

    it('Step 1: Create New Surface', async function (): Promise<any> {

        await surface.createNewSurface(surfaceName, description, 'Root Admin');
        await ExpectHelper.isListElementExists(surface.surfacelist, surfaceName);

    });

    it('Step 2: Edit Surface', async function (): Promise<any> {

        await surface.editSurface(surfaceName, description);
        await ExpectHelper.isListElementExists(surface.surfacelist, surfaceName + ' Updated');

    });

    it('Step 3: Add Another Group To Surface', async function (): Promise<any> {

        await surface.addAnotherGroupToSurface(surfaceName, 'TestGroup');
        await ExpectHelper.isListElementExists(surface.surfacelist, surfaceName + ' Updated');

    });

    it('Step 4: Delete Surface', async function (): Promise<any> {

        await surface.deleteSurface(surfaceName);
        // await ExpectHelper.expectDoesNotExists(surface.selectsurface(surfaceName));

    });

    it('Step 5: Verify Surface', async function (): Promise<any> {

        await surface.verifySurface(surfaceName);
        await ExpectHelper.expectDoesNotExists(surface.selectsurface(surfaceName));

    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});