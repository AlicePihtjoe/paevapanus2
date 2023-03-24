/// <reference types="cypress" />
describe('Signup', () => {
    it('should not signup a new user if the form is empty', () => {
        cy.visit('/signup')
        cy.get('[type="submit"]').click()
        cy.get('input:invalid').should('have.length', 3)
    })

    it('should not signup a new user if some field is empty', () => {
        //Loop through the form fields and submit the form with one field empty
        const fields = ['name', 'email', 'password']
        fields.forEach(field => {
            cy.visit('/signup')
            const nextFields = fields.filter(f => f !== field)
            nextFields.forEach(f => {
                cy.get(`[name="${f}"]`).type(f==='email' ? 'a@a' : 'a')
            })
            cy.get('[type="submit"]').click()
            cy.get('input:invalid').should('have.length', 1)
        })
    })

    it('should check the password length', () => {
        cy.visit('/signup')
        cy.get('[name="name"]').type('test')
        cy.get('[name="email"]').type('a@a')
        cy.get('[name="password"]').type('a')
        cy.get('[type="submit"]').click()

        // Check that alert is displayed
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Error registering user: Password must be at least 14 characters')
        })
    })

    it('should signup a new user if the form is valid', () => {
        cy.visit('/signup')
        cy.get('[name="name"]').type('test')
        cy.get('[name="email"]').type('a@a')
        cy.get('[name="password"]').type('a')
        cy.get('[type="submit"]').click()
        cy.url().should('include', '/betting')
    })

    it('should not signup a new user if the email already exists', () => {
        cy.visit('/signup')
        cy.get('[name="name"]').type('test')
        cy.get('[name="email"]').type('a@a')
        cy.get('[name="password"]').type('a')
        cy.get('[type="submit"]').click()

        //Check that alert is displayed
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Error registering user: Email already exists')
        })
    })
})
