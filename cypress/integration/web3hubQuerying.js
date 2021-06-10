/// <reference types="cypress" />

context('Landing Page', () => {
  it('Visits page', () => cy.visit('localhost:3000'))
  it('Check navbar', () => cy.navbarcheck())
  it('Check wallet connect', () => cy.wcconnectcheck())
  it('Create / Cancel btn roundtrip', () => cy.createapibtncheck())

  it('API is working and search box returns search results', () => {
    cy.get('[aria-label="Dropdown select"]').click()
    cy.get('.react-dropdown-select-dropdown').within(() => {
      cy.get('> span:nth-child(1)').click()
    })
  })
})

context('Playground Page w/o ENS', () => {
  it('Visits page', () => cy.visit('localhost:3000/playground'))

})

context('Detail Page', () => {
  it('Visits page', () =>
    cy.visit('localhost:3000/apis/ens/jefftest3.open.web3api.eth'))

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
  it('Visits page', () => cy.visit('localhost:3000/apis/create'))

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
