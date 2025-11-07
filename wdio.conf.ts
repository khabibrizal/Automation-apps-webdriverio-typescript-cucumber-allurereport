import fs from 'fs';
import path from 'path';
import { Status } from '@wdio/allure-reporter';

export const config: WebdriverIO.Config = {
  runner: 'local',
  framework: 'cucumber',
  specs: ['./features/**/*.feature'],

  reporters: [
    'spec',
    ['allure', { outputDir: 'allure-results',
    disableWebdriverStepsReporting: false,
    disableWebdriverScreenshotsReporting: false,
    addConsoleLogs: true,      

     }],

  ],
beforeScenario: async function (world) {
  console.log(`🎥 Start recording for scenario: ${world.pickle.name}`);
  await driver.startRecordingScreen();
},

afterScenario: async function (world, result) {
  const rawVideo = await driver.stopRecordingScreen();
  const videoDir = path.resolve('./allure-results/videos');
  if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });

  const scenarioName = world.pickle.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 80);
  const videoFile = path.join(videoDir, `${Date.now()}_${scenarioName}.mp4`);
  fs.writeFileSync(videoFile, Buffer.from(rawVideo, 'base64'));

  const allure = await import('@wdio/allure-reporter');
  allure.default.addAttachment(`🎬 Scenario: ${world.pickle.name}`, fs.readFileSync(videoFile), 'video/mp4');
},

services: ['appium'],

capabilities: [
    // Android
    {
     platformName: 'Android',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '11',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'C:\\Users\\MSI-PC\\mobile-automationnew\\apps\\Android.SauceLabs.Mobile.Sample.app.2.7.1.apk',
    'appium:appPackage': 'com.swaglabsmobileapp',
    'appium:appWaitActivity': 'com.swaglabsmobileapp.MainActivity',
    'appium:autoGrantPermissions': true,
    'appium:noReset': false,
    'appium:fullReset': true,
    'appium:newCommandTimeout': 240
  }
    
  ],

  cucumberOpts: {
    require: ['./features/step-definitions/*.ts'],
    timeout: 60000,
  },
};

