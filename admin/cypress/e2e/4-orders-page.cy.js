const login = () => {
    cy.session("login", () => {
        cy.visit('/login');
        cy.get('#email').type('haroon@gmail.com');
        cy.get('#password').type('password321');
        cy.get('[type=submit]').click();
        cy.contains('Logout').should('exist');
    });
}

describe('Orders', () => {
    beforeEach(() => {
        cy.task('seedDB');
        login();
        cy.visit('/orders');
    });

    it('Reads order', () => {
        cy.contains('14-07-2023').should('exist');
    })

    it('Reads order details', () => {
        cy.get('.table-btns').first().click();
        cy.contains('Bag').should('exist');
    })
})