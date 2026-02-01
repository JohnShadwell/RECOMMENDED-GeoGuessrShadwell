# GeoGuesser

## Running the Application

You can run this app instantly using **Expo Snack**—no local setup required:

1. Open this link in your browser: [Expo Snack Link](https://snack.expo.dev/@johnshadwell/geoguessrshadwell)  
2. Download the **Expo Go** app on your phone (iOS or Android).  
3. Scan the QR code on the Snack page or click "Open in Expo Go".  
4. The app will run directly on your device.

> **Alternative:** You can run the project locally by cloning the repository, installing dependencies, and starting the Expo development server, but this is **not recommended** as I have personally encountered issues with environment or dependency mismatches.

## Overview
GeoGuesser is a React Native mobile game where players attempt to identify the real-world locations of famous landmarks and images. By tapping on a map, players make their guess, and the game calculates the distance from the actual location, awarding points based on accuracy. The app includes multiple locations, keeps track of scores, and allows players to challenge themselves to beat their high score.

## Features
- Tap on the map to select a guess for the image’s location.
- Lock in a guess to reveal the actual location and distance in kilometers.
- Score calculation based on the closeness of the guess.
- High scores stored locally using AsyncStorage.
- Navigate through multiple landmarks seamlessly.
- Preview images of famous landmarks before making a guess.
- Simple and intuitive modal-based interface for score tracking and game instructions.

## Technology Stack
- **React Native** – for cross-platform mobile app development.
- **Expo** – to simplify app building and live testing.
- **react-native-maps** – to display interactive maps and markers.
- **@react-native-async-storage/async-storage** – to persist high scores locally.

## Implementation Details
- Locations are stored in an array of objects with image references and coordinates.
- Haversine formula is used to calculate distances between the player’s guess and the actual location.
- Modal components are used to display instructions, the current image, the distance, and score information.
- Randomized image selection ensures that each game session is unique, without repeating previously used images until all have been shown.
- Game logic is modular and state-driven, with `useState` managing current image, guess, score, and high score.

## Learning Outcomes
- Gained experience integrating interactive maps into a mobile application.
- Practiced using state and modals in React Native to create a fluid user experience.
- Implemented the Haversine formula to calculate geographic distances.
- Learned to manage persistent data storage using AsyncStorage in a React Native app.
- Developed strategies for randomized content selection and game flow control.

## Future Improvements
- Add a wider variety of images, including more landmarks and natural locations.
- Implement different difficulty levels with scoring modifiers.
- Include a leaderboard feature to compare scores across multiple users.
- Enhance UI/UX with animations and improved styling.
- Add hints or optional zoom functionality to assist players with difficult locations.

## Portfolio Context
This project demonstrates the ability to combine interactive maps, game logic, and persistent data storage in a React Native application. It showcases skills in React Native development, handling geolocation, and creating engaging, user-driven mobile experiences. This app serves as a portfolio piece highlighting my capability to build mobile games with real-world functionality.
