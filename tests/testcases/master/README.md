## User Story

### Requirement Description for registration_form_test

**As** an Unregistered User

**I want** to register by filling in a username, account type and password

**So** that i will have correct data in the system

### Acceptance criteria

- All fields are required. If a field is blank, the system display message “Please fill in all fields”
- After click submit button. If success show the message “Success Register”
- After click submit button. If cannot connect to DB show the message "Couldn't register user"
- After click submit button. If already has user show the message "User already exists"
- Text: Username, Password, Confirm Password
- Email: Email
- Account Type must be selected one of the following: Customer, Provider
- Password must be at least 8 characters. If the password is less than 8 characters, the system display message “Your password must be at least 8 characters”
- Password must contain at least one letter. If the password does not contain at least one letter, the system display message “Your password must contain at least one letter”
- Password must contain at least one digit. If the password does not contain at least one digit, the system display message “Your password must contain at least one digit”
- Password and Confirm Password must be the same. If the password and Confirm Password are not the same, the system display message “Password and Confirm Password must be the same”

---
