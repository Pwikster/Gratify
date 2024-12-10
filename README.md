# Feature List

## Authentication
- Login/Logout [DONE]
- Forgot password [NOT IMPLEMENTED]
- User registration and profile setup [DONE]

## Gratitude Notes
- Add, view, edit, and delete gratitude notes  [DONE]
- Send gratitude notes to other users [DONE]

## Dashboard
- Dashboard for viewing personal gratitude notes [DONE]

## Settings
- Account and notification preferences [DONE]
- Option to receive gratitude notes via SMS [NOT IMPLEMENTED]
- Set frequency for sending gratitude notes [DONE]
- Account deletion option [DONE]


## Running Gratify
You will need a .env file in /server with the following variables configured
- PORT
- MONGODB_URI
- BCRYPT_SALT_ROUNDS
- JWT_SECRET
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_PHONE_NUMBER

## Known Bugs
- When editing a note, the date adjustment will be one day prior to selected date.
