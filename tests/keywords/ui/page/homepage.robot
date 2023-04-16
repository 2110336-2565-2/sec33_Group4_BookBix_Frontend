*** Setting ***
Library           SeleniumLibrary
Resource    ../../../testdata/environment.robot
Resource    ../../../testdata/test_data.robot

*** Variables ***
${SPEEDTIME}    ${1}

*** Keywords ***
Open browser student registration form
    Open Browser    ${WEB_URL_REGISTER}    ${WEB_BROWSER}
    Maximize Browser Window
    Sleep    ${SPEEDTIME}

Wait student registration load complete
    Wait Until Element Contains    //*[@class='text-header']    ${test_data_register_form_name} 

Input and verify username
    Input text    //*[@id='registerUsername']    ${test_data_username} 
    ${username}    Get Value    //*[@id='registerUsername']
    Should Be Equal    ${username}    ${test_data_username} 

Input and verify email
    Input text    //*[@id='registerEmail']    ${test_data_email}
    ${email}    Get Value    //*[@id='registerEmail']
    Should Be Equal    ${email}    ${test_data_email}

Input and verify password
    Input text    //*[@id='registerPassword']    ${test_data_password}
    ${password}    Get Value    //*[@id='registerPassword']
    Should Be Equal    ${password}    ${test_data_password}

Input and verify confirmpassword
    Input text    //*[@id='confirmRegisterPassword']    ${test_data_password}
    ${confirmpassword}    Get Value    //*[@id='confirmRegisterPassword']
    Should Be Equal    ${confirmpassword}    ${test_data_password}

Click account type and verify radio button
    page should contain radio button    xpath:(//input[@name='type'])
    page should not contain radio button    xpath:(//input[@name='type123'])
    radio button should not be selected    type
    Click Element  //*[@id='customer']
    radio button should be set to    type   ${test_data_account_type_customer}

Click submit application
    Wait Until Element Is Visible    //*[@class='form-regis-btn mb-5']
    Click Element  //*[@class='form-regis-btn mb-5']

Verify missing fields error message
    Wait Until Element Contains    //*[@class='alert alert-danger']    ${test_data_error_message}

Verify invalid password lenght error message
    Wait Until Element Contains    //*[@class='alert alert-danger']    ${test_data_invalid_password_lenght_error_message}

Verify invalid password char error message
    Wait Until Element Contains    //*[@class='alert alert-danger']    ${test_data_invalid_password_char_error_message}

Verify invalid password digit error message
    Wait Until Element Contains    //*[@class='alert alert-danger']    ${test_data_invalid_password_digit_error_message}

Verify invalid password and confirm password checking error message
    Wait Until Element Contains    //*[@class='alert alert-danger']    ${test_data_invalid_password_char_error_message}

Verify success message
    Wait Until Element Contains    //*[@class='alert alert-success']    ${test_data_success_submit_message}

Verify create same user error message
    Wait Until Element Contains    //*[@class='alert alert-danger']    ${test_data_db_error_message}

Verify web location
    Sleep    ${3}
    ${current_url}   Get Location
    Should Be Equal    ${current_url}    ${WEB_URL_REGISTER}

Verify success url location
    Sleep    ${3}
    ${current_url}   Get Location
    Should Be Equal    ${current_url}    ${WEB_URL_LOGIN}
    
Input and verify blank username
    Input text    //*[@id='registerUsername']    ${EMPTY}
    ${username}    Get Value    //*[@id='registerUsername']
    Should Be Equal    ${username}    ${EMPTY}

Input and verify blank email
    Input text    //*[@id='registerEmail']    ${EMPTY}
    ${email}    Get Value    //*[@id='registerEmail']
    Should Be Equal    ${email}    ${EMPTY}

Input and verify blank password
    Input text    //*[@id='registerPassword']    ${EMPTY}
    ${password}    Get Value    //*[@id='registerPassword']
    Should Be Equal    ${password}    ${EMPTY}

Input and verify blank confirmpassword
    Input text    //*[@id='confirmRegisterPassword']    ${EMPTY}
    ${confirmpassword}    Get Value    //*[@id='confirmRegisterPassword']
    Should Be Equal    ${confirmpassword}    ${EMPTY}

Verify blank account type radio button
    page should contain radio button    xpath:(//input[@name='type'])
    page should not contain radio button    xpath:(//input[@name='type123'])
    radio button should not be selected    type

Input and verify invalid email
    Input text    //*[@id='registerEmail']    ${test_data_invalid_email}
    ${email}    Get Value    //*[@id='registerEmail']
    Should Be Equal    ${email}    ${test_data_invalid_email}

Input and verify invalid lenght password
    Input text    //*[@id='registerPassword']    ${test_data_invalid_password_lenght}
    ${password}    Get Value    //*[@id='registerPassword']
    Should Be Equal    ${password}    ${test_data_invalid_password_lenght}

Input and verify invalid char password
    Input text    //*[@id='registerPassword']    ${test_data_invalid_password_char}
    ${password}    Get Value    //*[@id='registerPassword']
    Should Be Equal    ${password}    ${test_data_invalid_password_char}

Input and verify invalid digit password
    Input text    //*[@id='registerPassword']    ${test_data_invalid_password_digit}
    ${password}    Get Value    //*[@id='registerPassword']
    Should Be Equal    ${password}    ${test_data_invalid_password_digit}

Input and verify invalid check password
    Input text    //*[@id='registerPassword']    ${test_data_invalid_password_check}
    ${password}    Get Value    //*[@id='registerPassword']
    Should Be Equal    ${password}    ${test_data_invalid_password_check}