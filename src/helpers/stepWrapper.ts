import allure from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';

export async function safeStep(stepName: string, fn: () => Promise<any>) {
  try {
    await fn();
  } catch (e: any) {

    // Log / screenshot
    allure.addAttachment(
      `Error - ${stepName}`,
      e?.stack || e?.message || String(e),
      'text/plain'
    );

    try {
      const ss = await driver.takeScreenshot();
      allure.addAttachment(
        `Screenshot - ${stepName}`,
        Buffer.from(ss, 'base64'),
        'image/png'
      );
    } catch {}

    // ✅ THROW kembali error agar Cucumber tahu step FAIL
    throw e;
  }
}
