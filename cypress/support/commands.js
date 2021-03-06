// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('navbarcheck', () => {
  cy.get('nav[role="nav"]').within(() => {
    cy.get('li')
      .should('contain', "API's")
      .should('contain', 'Playground')
      .should('contain', 'Docs')
  })
  cy.get('nav[role="nav"] li').contains("API's").click()
  cy.url().should('eq', 'http://localhost:3000/')

  cy.get('nav[role="nav"] li').contains('Playground').click()
  cy.url().should('eq', 'http://localhost:3000/playground')

  cy.get('nav[role="nav"] li a[target="_BLANK"]').contains('Docs')
  
  cy.get('nav[role="nav"] li').contains("API's").click()
})

Cypress.Commands.add('wcconnectcheck', () => {
  cy.get('.sign-in-wrap ul').within(() => {
    cy.get('li:nth-child(1)').should('contain', 'Sign In').click()
  })

  cy.get('.overlay')
    .should('be.visible')
    .get('.overlay')
    .within(() => {
      cy.get('button').should('contain', 'Connect').click()
    })

  cy.get('.bn-onboard-modal')
    .should('be.visible')
    .within(() => {
      cy.get('.bn-onboard-icon-button span').should('contain', 'MetaMask')
      cy.get('.bn-onboard-modal-content-close').click()
    })
    .should('not.exist')

  cy.get('.overlay .modal-close-btn').click().should('not.exist')
})

Cypress.Commands.add('createapibtncheck', () => {
  cy.visit('localhost:3000')
  cy.url().should('eq', 'http://localhost:3000/')
  cy.get('.sign-in-wrap button').should('contain', 'Create New API').click()
  cy.url().should('eq', 'http://localhost:3000/apis/create?activeTab=create')
  cy.get('.sign-in-wrap button').should('contain', 'Cancel').click()
  cy.url().should('eq', 'http://localhost:3000/')
})
