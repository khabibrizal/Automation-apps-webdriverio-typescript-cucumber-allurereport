import { Given, When, Then } from '@wdio/cucumber-framework';
import LoginPage from '../page/login.page';
import allure from '@wdio/allure-reporter';


async function attachScreenshot(name: string) {
  const shot = await driver.takeScreenshot();
  // attach as base64 to Allure
  allure.addAttachment(name, Buffer.from(shot, 'base64'), 'image/png');
}

Given('saya berada di halaman home', async () => {
  // tunggu home muncul
  await LoginPage.waitForHome();
  await attachScreenshot('home-screen-before');
});

Given('saya click icon people', async () => {
  await LoginPage.openLoginFromHome();
  await driver.pause(8000);
  await attachScreenshot('after-click-people');
});

Then('saya berada di halaman login', async () => {
  // pastikan salah satu elemen login muncul
  await LoginPage.emailField.waitForDisplayed({ timeout: 8000 });
  await attachScreenshot('login-screen');
});

When('saya masukkan email {string}', async (email: string) => {
  await LoginPage.emailField.setValue(email);
  await attachScreenshot('email-filled');
});

When('saya masukkan sandi {string}', async (sandi: string) => {
  await LoginPage.passwordField.setValue(sandi);
  await attachScreenshot('password-filled');
});

When('saya click masuk button', async () => {
  await LoginPage.loginButton.click();
  // tunggu redirect ke home user
  await driver.pause(2000);
  await attachScreenshot('after-login');
});

//Then ('saya berada di halaman home user', async () => {
  // tunggu home muncul
 //{
  //await $('android=new UiSelector().textContains("Hi, Khabib apa yang sedang kamu cari?")')
    //.waitForDisplayed({ timeout: 15000 });
//}
  //await attachScreenshot('home-user-before');
//});

Then('menampilkan pop up banner di halaman home user', async () => {
  // tunggu munculnya popup
  // coba beberapa lokasi: presence of any dialog/image on screen (heuristik)
  await LoginPage.waitForPopup();
  await driver.pause(1500);
  // capture popup
  await attachScreenshot('popup-visible');
});

Then('saya click button x', async () => {
  const closed = await LoginPage.closePopupIfPresent();
  await attachScreenshot('popup-after-close');
  if (!closed) {
    // jika tidak ketemu, throw agar test fail
    throw new Error('Popup close button not found');
  }
});
