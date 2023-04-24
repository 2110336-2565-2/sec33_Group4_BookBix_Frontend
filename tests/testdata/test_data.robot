*** Variables ***
${test_data_register_form_name}    Sign Up to BookBix
${test_data_username}    studentFirstName
${test_data_password}    studentPassword123
${test_data_account_type_customer}    customer
${test_data_account_type_provider}    provider
${test_data_email}    test@mail.com

${test_data_success_submit_message}    Success Register
${test_data_error_message}    Please fill in all fields
${test_data_db_error_message}    User already exists
${test_data_db_connection_error_message}    Couldn't register user
${test_data_invalid_password_lenght_error_message}    Your password must be at least 8 characters
${test_data_invalid_password_char_error_message}    Your password must contain at least one letter
${test_data_invalid_password_digit_error_message}    Your password must contain at least one digit
${test_data_invalid_password_check_error_message}    Password and Confirm Password must be the same

${test_data_invalid_email}   1234
${test_data_invalid_password_lenght}    lenght1
${test_data_invalid_password_char}    12345678
${test_data_invalid_password_digit}    studentPassword
${test_data_invalid_password_check}    studentPassword1234