class LoginPage {
  get inputUsername() { return $('~test-Username'); }
  get inputPassword() { return $('~test-Password'); }
  get btnLogin() { return $('~test-LOGIN'); }

  async login(username: string, password: string) {
    const usernameInput = await $('~test-Username');
    await usernameInput.waitForDisplayed({ timeout: 10000 });
    await usernameInput.setValue('standard_user');
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }
}
export default new LoginPage();

