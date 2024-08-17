# Sticky Note Application

This application allows users to create, manage, and organize their notes with a modern and intuitive interface. Built with React and Firebase, this app features secure user authentication, robust note management, and advanced filtering and organization options.

## Deployment Link
**https://sticky-note-green.vercel.app/**

## Features

### 1. User Authentication
- **Secure Login System:** Users can sign in to access their personalized notes, ensuring that their data is secure and private.

### 2. Note Management
- **Add Notes:** Create notes with customizable properties:
  - **Group:** Categorize notes under different groups.
  - **Text:** Input the main content of the note.
  - **Color:** Assign a color to each note for easy identification.
- **Edit Notes:** Update existing notes, including changing the group, text, or color.
- **Delete Notes:** Remove notes that are no longer needed.

### 3. Filtering and Organization
- **Filter Notes:** Quickly find relevant notes by filtering based on group or color.
- **Drag and Drop:** Rearrange notes freely within the interface using drag-and-drop functionality.

### 4. Hosting
- **Deployment:** The application is hosted on [Vercel](https://www.Vercel.com/), making it accessible online.

## Optional Features (Bonus Points)

- **Reset Position to Grid:** Users can reset the position of all notes to a default grid layout.
- **Remember Last Position:** The application remembers the last position of each note when the user logs out and logs back in.
- **Group View:** View all notes within a specific group in a consolidated manner.

## Technology Stack

- **Frontend:** React
- **Backend:** Firebase (for authentication and database)

## Setup and Installation

To run the application locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/9582anupam/Sticky-Note
   cd Sticky-Note
   ```
2. **Install Dependencies**
    ```bash
    npm install
    ```
3. **Configure Firebase**
    - Create a Firebase project and obtain your Firebase configuration details.
    - Add your Firebase configuration to a .env file in the root directory with the following format:
    ```bash
    REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
    REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
    REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
    REACT_APP_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
    ```
4. **Start the Application**
    ```bash
    npm start
    ```

    The app will be available at http://localhost:3000

## Contributing
Feel free to contribute to this project by submitting pull requests or opening issues. We welcome improvements and suggestions!

## License
This project is licensed under the MIT License.

## Author
- **Anupam**
- **9582anupamk@gmail.com**
- **https://github.com/9582anupam/**