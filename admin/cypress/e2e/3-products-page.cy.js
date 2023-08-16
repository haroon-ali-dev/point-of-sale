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

describe('CRUD', () => {
    beforeEach(() => {
        cy.task('seedDB');
        login();
        cy.visit('/products');
    });

    it('Creates product', () => {
        cy.get('#name').type('Shoe');
        cy.get('#price').type('1.23');
        cy.get('#quantity').type('2');
        cy.get('[type=submit]').click();
        cy.get('td').contains('Shoe').should('exist');
    })

    it('Reads products', () => {
        cy.get('td').contains('Bag').should('exist');
    })

    it('Updates product', () => {
        cy.get('.table-btns').first().click();
        cy.get('#name').should('have.value', 'Bag');
        cy.get('#name').clear().type('Phone');
        cy.get('[type=submit]').click();
        cy.contains('Product updated.');
        cy.go('back');
        cy.get('td').contains('Phone').should('exist');
    })

    it('Deletes product', () => {
        cy.get('.table-btns').eq(1).click();
        cy.contains('Yes').click();
        cy.contains('Bag').should('not.exist');
    })
})