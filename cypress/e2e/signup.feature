Feature: Sign up for the voting website

  Scenario: User signs up for the voting website with valid email and password
    Given the user is on the sign-up page
    When the user enters a valid name, email and password
    And clicks the "Sign up" button
    Then should see a confirmation message that their account has been created
    And the user should be redirected to the app's betting page

  Scenario: User cannot sign up for the voting website with an email that is already registered
    Given the user is on the sign-up page
    When the user enters an email that is already registered
    And clicks the "Sign up" button
    Then should see an error message that the email is already registered
    And the user should be redirected to the sign-up page

  Scenario: User cannot sign up for the voting website when any of the fields are empty
    Given the user is on the sign-up page
    When the user does not enter a name, email or password
    And clicks the "Sign up" button

  Scenario: User cannot sign up with password that is less than 14 characters
    Given the user is on the sign-up page
    When the user enters a password that is less than 14 characters
    And clicks the "Sign up" button
    Then should see an error message that the password is too short
