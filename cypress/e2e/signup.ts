import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";

let email = "a@a.ee";
Given(/^the user is on the sign\-up page$/, function () {
    cy.visit("http://localhost:3000/signup");
});
When(/^the user enters a valid name, email and password$/, function () {
    // Generate a random email address
    const randomEmail = Math.random().toString(36).substring(2) + "@example.com";
    const password = "123456madisonlahevana1243";
    cy.get("input[name=name]").type("John Doe");
    cy.get("input[name=email]").type(randomEmail);
    cy.get("input[name=password]").type(password);
});
When(/^clicks the "([^"]*)" button$/, function () {
    cy.get("button").click();
});

Then(/^should see a confirmation message that their account has been created$/, function () {
    cy.on("window:alert", (message) => {
        expect(message).to.equal("User registered successfully!");
    })
});
Then(/^the user should be redirected to the app's betting page$/, function () {
    cy.url().should("include", "/betting");
});
When(/^the user enters an email that is already registered$/, function () {
    cy.get("input[name=email]").type(email);
});
Then(/^should see an error message that the email is already registered$/, function () {
    cy.on("window:alert", (message) => {
        expect(message).to.equal("Error registering user: Email already exists");
    })
});
Then(/^the user should be redirected to the sign\-up page$/, function () {
    cy.url().should("include", "/signup");

});
When(/^the user does not enter a name, email or password$/, function () {
    //Loop through the form fields and submit the form with one field empty
    cy.get("input").each(($el) => {
        cy.wrap($el).clear();
        cy.get("button").click();
    })

});
When(/^the user enters a password that is less than (\d+) characters$/, function () {
     cy.get("input[name=password]").type("123456");
});
Then(/^should see an error message that the password is too short$/, function () {
    cy.on("window:alert", (message) => {
        expect(message).to.equal("Error registering user: Password must be at least 14 characters");
    })
});