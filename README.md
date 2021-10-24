
# Smart Contracts
The smart contracts are located in the `contracts/` directory.
To deploy the smart contracts you can use for example the [Remix IDE](https://remix.ethereum.org/).

### Deploy the contracts
You have to deploy the Hito.sol contract from the `contracts/` directory. Constructor arguments are: **address daiAddress**, **address aveLendingPool**

# Frontend App
The frontend app was created using create-react-app and requires npm and nodejs.

### Dependencies
Before you can start you need to install [npm](https://www.npmjs.com/get-npm) and [nodejs](https://nodejs.org/en/download/).

### Installation
If you have successfully installed npm and nodejs, change to `app/` directory and install all dependencies using:

`npm install`

### Configuration

To run the app, you need to change the configuration in app/App.js lines 7-16;

### Start in development mode
To start the app in development mode, you can run:

`npm start`

The app runs on: http://localhost:3000

### Build for production
To build the app for production, run:

`npm run build`

Now you are ready to deploy the project. You can find the production files in `build/` directory.