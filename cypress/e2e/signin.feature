Feature: Sign in to the voting website

  Scenario: User signs in to the voting website with valid email and password
    Given the user is on the sign-in page
    When the user enters a valid email and password
    And clicks the "Sign in" button
    Then the user should be redirected to the app's betting page

  Scenario: User cannot sign in to the voting website with an invalid email or password
    Given the user is on the sign-in page
    When the user enters an invalid email or password
    And clicks the "Sign in" button
    Then the user should see an error message that the email or password is invalid
    And the user should be redirected to the sign-in page
