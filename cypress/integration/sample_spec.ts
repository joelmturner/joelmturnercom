describe("My First Test", () => {
  it("create new transaction", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:8000/");
    cy.get('[aria-label="image 2"] > img').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("Walk Through", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:8000/");
    cy.get('[aria-label="main navigation"] :nth-child(1) a').click();
    cy.get('[aria-label="main navigation"] :nth-child(2) a').click();
    cy.get('[data-testid="blog-search"]').click();
    cy.get('[data-testid="blog-search"]').type("react");
    cy.get('[data-testid="blog-search-clear"]').click();
    cy.get('[aria-label="main navigation"] :nth-child(3) a').click();
    cy.get('[viewBox="0 0 512 512"][aria-checked="false"] > path').click();
    cy.get('.css-15usymb-Flexbox > [viewBox="0 0 448 512"] > path').click();
    cy.get(".css-pe3csf-Input").click();
    cy.get("#react-select-2-option-1").click();
    cy.get('[aria-label="image 1"] > img').click();
    cy.get(".css-dkrz67-Dialog").click();
    /* ==== End Cypress Studio ==== */
  });
});
