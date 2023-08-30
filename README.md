## Next.js Betting App

This is a simple betting app built using Next.js,
featuring a sign-up form and a betting page.
The project uses Tailwind CSS for styling and demonstrates
how to create a responsive and visually appealing web application.

## Installation

1. Open your terminal and clone the repository from GitHub:
   `git clone https://github.com/AlicePihtjoe/paevapanus2.git`

2. Install the dependencies: `npm install`
3. To Create the database run: `npx prisma migrate dev`

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

## In order to use OAuth2, you need to create a Google API project and set up OAuth2 credentials. 
For Google OAuth setup instructions, see file **GoogleOAuthSetup.md**


## Run the app

1. Start the development server: `node server.js`
2. Open your browser and visit https://localhost:3000 to see the app in action.

## Run the tests

1. Run the e2e tests: `npm test`
2. Run unit tests: `npx jest`
3. To see the Swagger documentation run the app and visit https://localhost:3000/api-docs

## PivotalTracker link

https://www.pivotaltracker.com/n/projects/2634714





