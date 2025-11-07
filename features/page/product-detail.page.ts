class ProductDetailPage {
  get title() { return $('~test-Item title'); }
  get addToCartBtn() { return $('android=new UiSelector().text("ADD TO CART")'); }
  get removeBtn() { return $('android=new UiSelector().text("REMOVE")'); }

  async addToCart() {

   const contexts = await driver.getContexts();
  console.log('Available contexts:', contexts);
  await driver.switchContext('NATIVE_APP');
  
    // swipe up to find the "ADD TO CART" button
   await driver.performActions([{
  type: 'pointer',
  id: 'finger1',
  parameters: { pointerType: 'touch' },
  actions: [
    { type: 'pointerMove', duration: 0, x: 500, y: 1600 },
    { type: 'pointerDown', button: 0 },
    { type: 'pause', duration: 300 },
    { type: 'pointerMove', duration: 800, x: 500, y: 600 },
    { type: 'pointerUp', button: 0 }
  ]
}]);

// Penting: reset actions setelah selesai
await driver.releaseActions();

    const addToCartButton = await $('android=new UiSelector().text("ADD TO CART")');
    await this.addToCartBtn.click();
}
  async verifyAddedToCart() {
    await expect(this.removeBtn).toBeDisplayed();
  }
}
export default new ProductDetailPage();

