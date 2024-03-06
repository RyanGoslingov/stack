
Cypress.Commands.add('getByDataCy', (selector) => { 
    return cy.get(`[data-cy="${selector}"]`) 
})

Cypress.Commands.add('getByDataTestId', (selector) => { 
    return cy.get(`[data-test-id="${selector}"]`) 
})

Cypress.Commands.add('authentication', () => {
    cy.visit("/")
    cy.getByDataCy("login").type("DEMOWEB")
    cy.getByDataCy("password").type("awdrgy")
    cy.getByDataCy("submit-btn").click()
})


Cypress.Commands.add('accountsPage', () => {
    cy.getByDataTestId("Адресный фонд", {timeout: 10000}).click()
    cy.getByDataTestId("Адреса проживающих", {timeout: 10000}).click()
})

Cypress.Commands.add('btnAddNeighborhood', () => {
    cy.getByDataCy("btn-add", {timeout: 10000}).click()
    cy.getByDataCy("stack-menu-list-item").contains("Район").click()
})
