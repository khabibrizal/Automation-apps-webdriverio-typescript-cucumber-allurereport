import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../page/login.page.js';
import ProductPage from '../page/product.page.js';
import ProductDetailPage from '../page/product-detail.page.js';

Given('I am on the login page', async () => {
  const username = await $('~test-Username');
  await username.waitForDisplayed({ timeout: 10000, timeoutMsg: 'Username field not visible after 10s' });
  // jika perlu klik dulu supaya fokus muncul
  await username.click();
});

When('I enter valid username and password', async () => {
  await LoginPage.login('standard_user', 'secret_sauce');
});

When('I click the login button', async () => {
  await LoginPage.btnLogin.click();
});

Then('I should see the dashboard page', async () => {
  await ProductPage.isDisplayed();
});

When(/^I click one of them product "(.*)"$/, async (productName: string) => {
  await ProductPage.openProduct(productName);
});

Then('I should see the detail product page', async () => {
  await expect(ProductDetailPage.title).toBeDisplayed();
});

When('I click the add to cart button', async () => {
  await ProductDetailPage.addToCart();
});

Then('I should see add to cart button change to remove button', async () => {
  await ProductDetailPage.verifyAddedToCart();
});

