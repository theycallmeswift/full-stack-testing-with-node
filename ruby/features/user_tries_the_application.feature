Feature: User can load the application
  In order to demo this technique
  This should test a random ruby app
  Because Bacon.

  Scenario: User views empty list
    When I visit the home page
    Then I should see "No Users :("

  Scenario: User views list of one user
    Given the following users exist:
      | name  | twitter       | job                  |
      | Swift | SwiftAlphaOne | Developer Evangelist |
    When I visit the home page
    Then I should see "Swift"
    And I should see "Developer Evangelist"
    And I should see "@SwiftAlphaOne"
    And I should not see "No Users :("

  Scenario: User views list of N users
    Given the following users exist:
      | name  | twitter       | job                  |
      | Swift | SwiftAlphaOne | Developer Evangelist |
      | Abe   | AbeStanway    | Ops Guy              |
      | Ian   | Sw1tch        | Freelancer           |
    When I visit the home page
    Then I should see "Swift"
    And I should see "Abe"
    And I should see "Ian"
