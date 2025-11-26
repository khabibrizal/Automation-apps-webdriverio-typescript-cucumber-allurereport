class ProductPage {

  // ===== ELEMENTS =====
  get title() { 
    return $('~test-Cart'); 
  }

  get productList() { 
    return $$('//*[@content-desc="test-Item"]'); 
  }

  // Product by name (flexible dan bisa dipakai ulang)
  productCard(name: string) {
    return $(`//*[@content-desc="test-Item"]//*[contains(@text, "${name}")]`);
  }

  // ===== ACTIONS =====
  async isDisplayed() {
    await this.title.waitForDisplayed({ timeout: 15000 });
  }

  async openProduct(productName: string) {
    const product = this.productCard(productName);
    await product.waitForDisplayed({ timeout: 10000 });
    await product.click();
  }
}

export default new ProductPage();

