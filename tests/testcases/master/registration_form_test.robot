*** Settings ***
Library    SeleniumLibrary
Test Teardown    Close All Browsers
Resource    ../../testdata/environment.robot
Resource    ../../testdata/test_data.robot
Resource    ../../keywords/ui/page/homepage.robot

*** Test Cases ***
Verify registration form with all input field
    [Tags]    All Input
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify email
    Input and verify password
    Input and verify confirmpassword
    Click account type and verify radio button

Verify registration form error with blank username
    [Tags]    Blank Username Error
    Open browser student registration form
    Wait student registration load complete
    Input and verify blank username
    Input and verify email
    Input and verify password
    Input and verify confirmpassword
    Click account type and verify radio button
    Click submit application
    Verify missing fields error message

Verify registration form error with blank email
    [Tags]    Blank Email Error
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify blank email
    Input and verify password
    Input and verify confirmpassword
    Click account type and verify radio button
    Click submit application
    Verify missing fields error message

Verify registration form error with blank password
    [Tags]    Blank Password Error
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify email
    Input and verify blank password
    Input and verify confirmpassword
    Click account type and verify radio button
    Click submit application
    Verify missing fields error message

Verify registration form error with blank confirmpassword
    [Tags]    Blank Confirm Password Error
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify email
    Input and verify password
    Input and verify blank confirmpassword
    Click account type and verify radio button
    Click submit application
    Verify missing fields error message

Verify registration form error with blank account type
    [Tags]    Blank Account Type Error
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify email
    Input and verify password
    Input and verify confirmpassword
    Click submit application
    Verify blank account type radio button
    Verify missing fields error message

Verify registration form error with invalid email
    [Tags]    Invalid Email Error
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify invalid email
    Input and verify password
    Input and verify confirmpassword
    Click account type and verify radio button
    Click submit application
    Verify web location

Verify registration form error with invalid password lenght
    [Tags]    Invalid lenght password Error
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify email
    Input and verify invalid lenght password
    Input and verify confirmpassword
    Click account type and verify radio button
    Click submit application

Verify registration form error with invalid password char missing
    [Tags]    Invalid char password Error
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify email
    Input and verify invalid char password
    Input and verify confirmpassword
    Click account type and verify radio button
    Click submit application

Verify registration form error with invalid password digit missing
    [Tags]    Invalid digit password Error
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify email
    Input and verify invalid digit password
    Input and verify confirmpassword
    Click account type and verify radio button
    Click submit application

Verify registration form error with invalid password confirmpassword checking
    [Tags]    Invalid check password Error
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify email
    Input and verify invalid check password
    Input and verify confirmpassword
    Click account type and verify radio button
    Click submit application

Verify registration form success message
    [Tags]    Register sucess message
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify email
    Input and verify password
    Input and verify confirmpassword
    Click account type and verify radio button
    Click submit application
    Verify success message
    Verify success url location

Verify registration form create same user
    [Tags]    Register already user in database message
    Open browser student registration form
    Wait student registration load complete
    Input and verify username
    Input and verify email
    Input and verify password
    Input and verify confirmpassword
    Click account type and verify radio button
    Click submit application
    Verify create same user error message