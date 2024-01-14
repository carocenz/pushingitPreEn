import { LogInPage } from "../support/pagesPreEn/logIn";
import { ProductsPage } from "../support/pagesPreEn/productsPage";
import { ShoppingCartPage } from "../support/pagesPreEn/shoppingCartPage";

describe("Pre-Entrega Final", () => {
  let data;
  const loginPage = new LogInPage();
  const productsPage = new ProductsPage();
  const shoppingCartPage = new ShoppingCartPage();

  before(() => {
    cy.fixture("datosPreEntregaFinal").then((datosPreEn) => {
      data = datosPreEn;
    });
  });

  it("Test", () => {
    //logIn
    cy.visit("");
    loginPage.clickIniciaSesion();
    loginPage.escribirUsuario(data);
    loginPage.escribirContraseña(data);
    loginPage.clickLogIn();
    //home
    cy.xpath("//a[text()='Online Shop']").should("exist").click();
    //products
    productsPage.validarTitle();
    productsPage.clickAddToCart();
    productsPage.validarMessage();
    productsPage.clickMessageButton();

    productsPage.validarTitle();
    productsPage.clickAddToCart();
    productsPage.validarMessage();
    productsPage.clickMessageButton();

    cy.xpath("//button[contains(text(), '2')]").click();
    productsPage.validarTitle();
    cy.xpath('//*[@data-cy="add-to-cart-1010"]').click();
    productsPage.validarMessage();
    productsPage.clickMessageButton();
    cy.xpath("//h2[@id='title' and text()='Products']", {
      timeout: 5000,
    }).should("exist");
    cy.xpath("//button[contains(text(), 'Go to shopping cart')]").click();
    //shoppingCart
    cy.xpath('//h2[@id="title" and text()="Shopping Cart"]').should("exist");

    cy.xpath(
      `//p[@id='productName' and @name="${data.shoppingCart[0].productName}"]`
    )
      .siblings("#unitPrice")
      .should("have.text", `${data.shoppingCart[0].unitPrice}`);

    cy.xpath(
      `//p[@id='productName' and @name="${data.shoppingCart[0].productName}"]`
    )
      .siblings("#productAmount")
      .should("have.text", `${data.shoppingCart[0].productAmount}`);
    cy.xpath(
      `//p[@id='productName' and @name="${data.shoppingCart[0].productName}"]`
    )
      .siblings("#totalPrice")
      .should("have.text", `${data.shoppingCart[0].totalPrice}`);
    cy.xpath(
      `//p[@id='productName' and @name="${data.shoppingCart[1].productName}"]`
    )
      .siblings("#unitPrice")
      .should("have.text", `${data.shoppingCart[1].unitPrice}`);
    cy.xpath(
      `//p[@id='productName' and @name="${data.shoppingCart[1].productName}"]`
    )
      .siblings("#productAmount")
      .should("have.text", `${data.shoppingCart[1].productAmount}`);
    cy.xpath(
      `//p[@id='productName' and @name="${data.shoppingCart[1].productName}"]`
    )
      .siblings("#totalPrice")
      .should("have.text", `${data.shoppingCart[1].totalPrice}`);
    cy.xpath("//button[contains(text(), 'Show total price')]").click();
    cy.xpath("//b[text()='Total $']").should("exist");
    cy.xpath("//p[@id='price' and b[text()='55.05']]").should("exist");
  });
});
