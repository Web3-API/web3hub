/// <reference types="cypress" />

context('Landing Page', () => {
  it('Visits Homepage', () => cy.visit('localhost:3000'))
  it('Check navbar', () => cy.navbarcheck())
  it('Check wallet connect', () => cy.wcconnectcheck())

})

context('Playground Page w/o ENS', () => {
  it('Visits Homepage', () => cy.visit('localhost:3000/playground'))
  it('Check navbar', () => cy.navbarcheck())
  it('Check wallet connect', () => cy.wcconnectcheck())

})

context('Detail Page', () => {
  it('Visits Homepage', () =>
    cy.visit('localhost:3000/apis/ens/jefftest3.open.web3api.eth'))
  it('Check navbar', () => cy.navbarcheck())
  it('Check wallet connect', () => cy.wcconnectcheck())

  it('Shows links and playground button', () => {
    cy.get('.info-card').within(() => {
      cy.get('.links').within(() => {
        cy.get('a').should('exist')
      })
      cy.get('button').should('contain', 'Playground').click()
    })
  })
})

context('Create Page', () => {
  it('Visits Homepage', () => cy.visit('localhost:3000/apis/create'))
  it('Check navbar', () => cy.navbarcheck())
  it('Check wallet connect', () => cy.wcconnectcheck())

  it('Checks that create tab is active', () => {
    cy.get('form').within(() => {
      cy.get('label').should('contain', "Hosting Configuration")
    })
  })
  it('Switches to Publish', () => {
    cy.get('.tab.publish').click()
    cy.get('form').within(() => {
      cy.get('h4').should('contain', "Location")
    })
  })
})
