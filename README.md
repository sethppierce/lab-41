# Image Generator App

This is a simple app that utilizes the OpenAI API to generate images based on user input. The app also allows users to share the generated images via SMS.

## Getting Started

1. Clone the repository to your local machine.

2. Install the necessary dependencies by running `yarn` or `npm install` in the root directory.

3. Create an account with OpenAI and obtain an API key. 

4. Create a .env file in the root directory of the project and add your OpenAI API key as `API_KEY=YOUR_API_KEY`

5. Run the app on your local development server using `yarn start` or `npm start`.

6. In the app, enter your desired text in the input field and press the "Generate Images!" button to generate up to 4 images based on your input.

7. Press on any of the generated images to share it via SMS.

## Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)
- [OpenAI API](https://openai.com/api/)
- [Bitly API](https://dev.bitly.com/)

## Note

- Please make sure to protect your API key and not to share it with others or expose it in the browser or other client-side code.

- You can replace the `access_token` in the shortenUrl function with your own bitly api key.

### UML

[design layout](https://builderx.io/app/1aqv7a77c5gksck0488ococc4gso0g)