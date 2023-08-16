describe('database reseed', () => {
  it('reseeds database', () => {
    cy.task('seedDB');
  })
})