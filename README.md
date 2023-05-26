## Next.js Betting App

This is a simple betting app built using Next.js,
featuring a sign-up form and a betting page.
The project uses Tailwind CSS for styling and demonstrates
how to create a responsive and visually appealing web application.

## Prequisities

- Node.js (version 12 or higher)

HTTPS SSL certificate is required for the app to work properly.
To generate a self-signed certificate, run the following commands in your terminal (in the project directory):

1. Generate key
`openssl genrsa -out key.pem`

2. Generate a certificate signing request
`openssl req -new -key key.pem -out csr.pem`

3. Generate a self-signed certificate
`openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem`

4. In order to use OAuth2, you need to create a Google API project and set up OAuth2 credentials.
   Follow the instructions here: https://developers.google.com/identity/protocols/oauth2. After you have created the credentials, add Google Client ID and Google Client Secret to the .env file as follows:

`GOOGLE_CLIENT_ID=your_client_id`,
`GOOGLE_CLIENT_SECRET=your_client_secret`

## Installation

1. Open your terminal and clone the repository from GitHub:
`git clone https://github.com/AlicePihtjoe/paevapanus2.git`

2. Navigate to the project directory: `cd paevapanus2`
3. Install the dependencies: `npm install`
4. To Create the database run: `npx prisma migrate dev` 

## Run the app

1. Start the development server: `node server.js`
2. Run the database script in Powershell: `./start-db.sh` to start the database and load the data.
3. Open your browser and visit http://localhost:3000 to see the app in action.

## Run the tests

1. Start the development server: `node server.js`
2. Run the tests: `npm test`

## PivotalTracker link

https://www.pivotaltracker.com/n/projects/2634714





