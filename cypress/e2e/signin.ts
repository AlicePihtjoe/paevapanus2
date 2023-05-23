import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";

Given(/^the user is on the sign\-in page$/, function () {
    cy.visit("https://localhost:3000/signin");
});
When(/^the user enters a valid email and password$/, function () {
    cy.get("input[name=email]").type("test@example.com");
    cy.get("input[name=password]").type("123456madisonlahevana1243");
});
When(/^the user enters an invalid email or password$/, function () {
    cy.get("input[name=email]").type("test@example.com");
    cy.get("input[name=password]").type("wrongpassword");
});
When(/^clicks the "([^"]*)" button$/, function () {
    cy.contains('button', 'Sign In').click();
});
Then(/^the user should be redirected to the app's betting page$/, function () {
    cy.url().should('include', '/betting');
});
Then(/^the user should see an error message that the email or password is invalid$/, function () {
    cy.on("window:alert", (message) => {
        expect(message).to.equal("Invalid email or password");
    })
});
Then(/^the user should be redirected to the sign\-in page$/, function () {
    cy.url().should('include', '/signin');
});
