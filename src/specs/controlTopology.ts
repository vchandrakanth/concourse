// See README.md for important details.
import { browser, element, by, By, $, $$, ExpectedConditions, Browser } from 'protractor';
import { ExpectHelper } from '../utils/expectHelper';
import { ElementHelper } from '../utils/elementHelper';
import { WaitHelper } from '../utils/waitHelper';
import { ControlTopology } from '../pageObjects/controlTopology.Po';


describe('Login Concourse ', async function () {
  let originalTimeout;
  let EC = ExpectedConditions;
  let controlTopology = new ControlTopology();
  let properties = require('../conf/properties');

  beforeEach(function () {

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
  });


  it('Step 1: Create New Organization', async function (): Promise<any> {

    await controlTopology.createOrganization();
    ExpectHelper.isListElementExists(controlTopology.chart, 'Test Org');

      });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});