describe("My First Test", () => {
  it("create new transaction", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:8000/");
    cy.get('[aria-label="image 2"] > .gatsby-image-wrapper > picture > img').click();
    /* ==== End Cypress Studio ==== */
  });

  /* === Test Created with Cypress Studio === */
  it('Walk Through', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:8000');
    cy.get(':nth-child(1) > .css-1ogn10y').click();
    cy.get(':nth-child(2) > .css-1ogn10y').click();
    cy.get(':nth-child(3) > .css-1ogn10y').click();
    cy.get(':nth-child(4) > .css-1ogn10y').click();
    cy.get(':nth-child(3) > .css-16aih25-Link').click();
    /* ==== End Cypress Studio ==== */
  });
});
