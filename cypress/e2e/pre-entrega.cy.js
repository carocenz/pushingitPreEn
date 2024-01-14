import { LogInPage } from "../support/pagesPreEn/logIn";
import { ProductsPage } from "../support/pagesPreEn/productsPage";
import { ShoppingCartPage } from "../support/pagesPreEn/shoppingCartPage";
import { ButtonsPage } from "../support/pagesPreEn/buttons";

describe("Pre-Entrega Final", () => {
  let data;
  const loginPage = new LogInPage();
  const productsPage = new ProductsPage();
  const shoppingCartPage = new ShoppingCartPage();
  const buttonPage = new ButtonsPage();

  before(() => {
    cy.fixture("datosPreEntregaFinal").then((datosPreEn) => {
      data = datosPreEn;
    });
  });

  it("Test", () => {
    //logIn
    cy.visit("");
    loginPage.clickIniciaSesion();
    loginPage.escribirUsuario(Cypress.env().usuario);
    loginPage.escribirContraseña(Cypress.env().password);
    loginPage.clickLogIn();
    //home
    cy.xpath("//a[text()='Online Shop']").should("exist").click();
    //products
    buttonPage.validarTitle();
    productsPage.clickAddToCart(1004);
    buttonPage.validarMessage();
    buttonPage.clickMessageButton();

    buttonPage.validarTitle();
    productsPage.clickAddToCart(1004);
    buttonPage.validarMessage();
    buttonPage.clickMessageButton();

    cy.xpath("//button[contains(text(), '2')]").click();
    buttonPage.validarTitle();
    productsPage.clickAddToCart(1010);
    buttonPage.validarMessage();
    buttonPage.clickMessageButton();
    cy.xpath("//h2[@id='title' and text()='Products']", {
      timeout: 5000,
    }).should("exist");
    cy.xpath("//button[contains(text(), 'Go to shopping cart')]").click();
    //shoppingCart
    cy.xpath('//h2[@id="title" and text()="Shopping Cart"]').should("exist");
    shoppingCartPage.validarProducto(data.shoppingCart[0].productName);
    shoppingCartPage.checkProd(data.shoppingCart[0]);
    shoppingCartPage.validarProducto(data.shoppingCart[1].productName);
    shoppingCartPage.checkProd(data.shoppingCart[1]);
    cy.xpath("//button[contains(text(), 'Show total price')]").click();
    cy.xpath("//b[text()='Total $']").should("exist");
    cy.xpath("//p[@id='price' and b[text()='55.05']]").should("exist");
  });
});
