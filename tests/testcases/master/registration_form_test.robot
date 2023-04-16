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
    Input and verify firstname
    Input and verify lastname
    Input and verify gender with male
    Input and verify student_id
    Input and verify mobile_number
    Input and verify email
    Click study time
    Click submit application
