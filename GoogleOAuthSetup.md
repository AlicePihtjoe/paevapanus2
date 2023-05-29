# Google API Configuration Instructions

Follow these steps to configure Google OAuth for the application:

## Step 1: Create a New Project in the Google API Console

1. Visit the [Google API Console](https://console.developers.google.com/)
2. Log in with your Google account.
3. Click "Select a project" in the top menu and then click "NEW PROJECT".
4. Set the project name as "paevapanus2" (or your preferred name). You can leave the Location field empty.
5. Click "CREATE".

## Step 2: Configure the OAuth Consent Screen

1. From the hamburger side menu of your project, navigate to "APIs & Services" > "OAuth consent screen".
2. Choose "External" for User Type. Click "Create".
3. Fill in the necessary details:
    - App name: "paevapanus2"
    - User support email: [Your Gmail account]
    - App domain > Application homepage: "https://localhost:3000"
    - Developer contact information: [Your Gmail account]
4. You can leave the Scopes and Test users as default.
5. Click "Save and Continue".

## Step 3: Create OAuth Client ID

1. Navigate to "APIs & Services" > "Credentials".
2. Click "Create Credentials" and select "OAuth client ID".
3. Select "Web Application" for the Application type.
4. Enter your preferred name.
5. Fill the necessary fields:
    - Authorized JavaScript origins: "https://localhost:3000"
    - Authorized redirect URIs: "https://localhost:3000/api/exchange_code"
6. Click "Create".

## Step 4: Add the Client ID and Secret to .env file

1. After creating the OAuth Client ID, you will receive your Google Client ID and Client Secret.
2. Open the `.env` file in the root directory of your project.
3. Add these lines:

```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
```

4. Replace `your_client_id` and `your_client_secret` with the actual Client ID and Client Secret you received.