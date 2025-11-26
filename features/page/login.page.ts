class LoginPage {
  // home bottom nav -> Akun (people)
  get akunNav() {return $('android=new UiSelector().textContains("Akun")'); }
  
  // Login Screen elements (fallback locators)
  get emailField() {return $('//android.widget.EditText[@resource-id="com.brightoncorporation:id/edt_email"]');}
  get passwordField() {return $('//android.widget.EditText[@resource-id="com.brightoncorporation:id/edt_password"]');}
  get loginButton() {return $('//android.widget.TextView[@resource-id="com.brightoncorporation:id/btn_login"]');}
  get popup() {return $('//android.widget.ImageView[@resource-id="com.brightoncorporation:id/img_popup"]');}
  get closebutton() {return $('//android.widget.ImageView[@resource-id="com.brightoncorporation:id/btn_close"]');} 

  async waitForHome() {
    await $('//android.widget.RelativeLayout[@resource-id="com.brightoncorporation:id/container_control"]').waitForDisplayed({ timeout: 10000 });
  }

  async openLoginFromHome() {
    await this.akunNav.waitForDisplayed({ timeout: 8000 });
    await this.akunNav.click();
  }
  async waitForPopup() {
     await this.popup.waitForDisplayed({ timeout: 8000 });
  }

  async login(email: string, password: string) {
    await this.emailField.waitForDisplayed({ timeout: 8000 });
    await this.emailField.setValue(email);
    await this.passwordField.setValue(password);
    await this.loginButton.click();
  }

  async closePopupIfPresent() {
    // try a few fallbacks
    try {
      if (await this.popup.isDisplayed()) {
        await this.closebutton.click();
        return true;
      }
    } catch (err) {
      // fallback xpath: button with text '×' or 'X'
      const alt = await $('//android.widget.TextView[contains(@text,"×") or contains(@text,"X")]');
      try {
        if (await alt.isDisplayed()) {
          await alt.click();
          return true;
        }
      } catch (e) {
        // not found
        return false;
      }
    }
    return false;
  }
}

export default new LoginPage();
