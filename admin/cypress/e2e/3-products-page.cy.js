const login = () => {
    cy.session("login", () => {
      cy.visit('/login');
      cy.get('#email').type('haroon@gmail.com');
      cy.get('#password').type('password321');
      cy.get('[type=submit]').click();
      cy.contains('Logout').should('exist');
    });
  }

describe('Form validation', () => {
    beforeEach(() => {
        cy.task('seedDB');
        login();
        cy.visit('/products');
    });

    it('Fields cannot be empty', () => {
        cy.get('[type=submit]').click();
        cy.contains('Name must be at least 3 characters').should('exist');
    })

    it('Name must be at least 3 characters', () => {
        cy.get('#name').type('h');
        cy.get('[type=submit]').click();
        cy.contains('Name must be at least 3 characters').should('exist');
    })

    it('Quantity must be a valid number', () => {
        cy.get('#price').type('2..');
        cy.get('[type=submit]').click();
        cy.contains('Quantity must be a number.').should('exist');
    })
})