export class ProductsPage {
  constructor() {
    this.title = "//h2[@id='title' and text()='Products']";
    this.cartButton = '//*[@data-cy="add-to-cart-1004"]';
    this.message = '//header[contains(text(), "Message alert")]';
    this.messageButton = "//button[@id='closeModal']";
  }

  validarTitle() {
    cy.xpath(this.title).should("exist");
  }

  clickAddToCart() {
    cy.xpath(this.cartButton).click();
  }

  validarMessage() {
    cy.xpath(this.message).should("exist");
  }

  clickMessageButton() {
    cy.xpath(this.messageButton).click();
  }
}
