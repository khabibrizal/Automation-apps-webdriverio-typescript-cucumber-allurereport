import fs from 'fs';
import path from 'path';
import allure from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';
import { normalizeError } from './src/helpers/erorUtilies.js';

(globalThis as any).hasStepFailed = false;

process.env.WDIO_DISABLE_WEBDRIVER_STEPS = 'true';


export const config: WebdriverIO.Config = {
  runner: 'local',
  framework: 'cucumber',
  specs: ['./features/**/*.feature'],
  logLevel: 'info',

  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,        
      disableWebdriverScreenshotsReporting: false,
      addConsoleLogs: true
    }]
  ],

  services: ['appium'],

  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '10',
      'appium:automationName': 'UiAutomator2',
      'appium:app': 'C:\\Users\\MSI-PC\\brightonandroid\\apps\\25_11_2025.apk',
      'appium:appPackage': 'com.brightoncorporation',
      'appium:appActivity': 'com.brightoncorporation.ui.splash.SplashActivity',
      'appium:appWaitActivity': 'com.brightoncorporation.ui.splash.SplashActivity',
      'appium:autoGrantPermissions': true,
      'appium:noReset': false,
      'appium:fullReset': true,
      'appium:newCommandTimeout': 240
    }
  ],

  cucumberOpts: {
    require: ['./features/step-definitions/*.ts'],
    timeout: 60000
  },

  // --- Hooks ---
  beforeScenario: async function (world: any) {
    (globalThis as any).currentScenarioName = world?.pickle?.name || 'Unknown Scenario';
  },

  afterStep: async function (step: any, world: any, result: any) {
    // Ambil teks step yang dieksekusi
    const stepText =
      world?.pickle?.steps?.[result?.index]?.text ||
      step?.text ||
      'Unknown Step';

    if (!result?.passed) {
      const { message, stack } = normalizeError(result.error);

      allure.addAttachment(
        `Error Log - ${stepText}`,
        `${message}\n\n${stack ?? ''}`,
        'text/plain'
      );

      try {
        const ss = await driver.takeScreenshot();
        allure.addAttachment(
          `Screenshot - ${stepText}`,
          Buffer.from(ss, 'base64'),
          'image/png'
        );
      } catch {
        // ignore
      }
    }
  },

  afterScenario: async function () {
    (globalThis as any).hasStepFailed = false;
  }
};
