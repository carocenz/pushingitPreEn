export class LogInPage {
  constructor() {
    this.dblClickLogIn = "//span[text()='Iniciá sesión']";
    this.userInput = "//input[@id='user']";
    this.passInput = "//input[@id='pass']";
    this.logInButton = "//button[starts-with(@type,'subm')]";
  }

  clickIniciaSesion() {
    cy.xpath(this.dblClickLogIn).dblclick();
  }

  escribirUsuario(data) {
    cy.xpath(this.userInput).type(data.logIn.user);
  }

  escribirContraseña(data) {
    cy.xpath(this.passInput).type(data.logIn.password);
  }

  clickLogIn() {
    cy.xpath(this.logInButton).click();
  }
}
