# Getting Started with cloning the app

Clone this Project with [*Clone Link here*](https://github.com/shivangpatel83/digi_sidekick.git).

## Available Scripts

In the project directory, first of all run :

### `npm install`

Runs the command in both Frontend and Backend folders.

***

Create .env Directory for mentioning the PORT | SECRET_KEY | MONGODB_URL

After installing all the neccessary packages run command for running the project:

***

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

***

### `Working`

You will see a Login page if you are already a user Please Login with your registered Email and Password else click on the Signup link for registering as user with all required fields.

After login you will visit to the Landing/Home page and can see all the registered user. A JWT will be stored in the local storage and only registered user can visit to the Landing page.

All the login user treated as **Super user** or **admin** they can *Edit* details of other user and can *Delete* other user if they want.

After performing the necessary opearations user can logout to the page by simply clicking on the *logout* button and route to the login page again.

*If you have logged out  you can not visit to the landing page again without login again.*

