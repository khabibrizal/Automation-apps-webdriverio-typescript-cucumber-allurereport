import { Given, When, Then } from '@wdio/cucumber-framework';
import { safeStep } from './stepWrapper';

export function SafeGiven(pattern: RegExp | string, fn: Function) {
  Given(pattern as any, async function (...args: any[]) {
    const name = this.pickleStep?.text || `Given ${pattern}`;
    await safeStep(name, async () => fn.apply(this, args));
  });
}

export function SafeWhen(pattern: RegExp | string, fn: Function) {
  When(pattern as any, async function (...args: any[]) {
    const name = this.pickleStep?.text || `When ${pattern}`;
    await safeStep(name, async () => fn.apply(this, args));
  });
}

export function SafeThen(pattern: RegExp | string, fn: Function) {
  Then(pattern as any, async function (...args: any[]) {
    const name = this.pickleStep?.text || `Then ${pattern}`;
    await safeStep(name, async () => fn.apply(this, args));
  });
}
