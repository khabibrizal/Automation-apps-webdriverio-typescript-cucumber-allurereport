import allure from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';

export async function safeAction(stepName: string, fn: () => Promise<any>) {
  allure.startStep(stepName);

  try {
    const result = await fn();
    allure.endStep(Status.PASSED);
    return result;

  } catch (err: any) {
    // Log error ke allure
    allure.addAttachment(
      `Error Log`,
      err?.stack || err?.message || String(err),
      'text/plain'
    );

    // screenshot otomatis
    try {
      const ss = await driver.takeScreenshot();
      allure.addAttachment(
        `Screenshot`,
        Buffer.from(ss, 'base64'),
        'image/png'
      );
    } catch {}

    // Set FAIL ke parent step
    allure.endStep(Status.FAILED);

    // ❗ PENTING: JANGAN THROW ERROR
    console.log(`[SAFE-ACTION FAIL] ${stepName}:`, err?.message || err);
  }
}

