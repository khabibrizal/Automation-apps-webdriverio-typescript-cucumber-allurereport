class ProductPage {
  get productsTitle() { return $('~test-PRODUCTS'); }

  async isDisplayed() {
    await expect(this.productsTitle).toBeDisplayed();
  }

  async openProduct(productName: string) {
    //await $('~test-LOGIN').waitForDisplayed({ reverse: true, timeout: 10000 });
    const product = await $(`//*[@content-desc="test-Item title" and @text="${productName}"]`);
    await product.click();
  }
}
export default new ProductPage();

