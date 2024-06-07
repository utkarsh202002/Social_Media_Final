

# Close Mates

 A social media platform that enables users to engage in common social media activities. Our system is designed to be user-friendly and provides features similar to popular social media apps like Instagram. Users can register, log in, and interact with other users through various functionalities such as liking, commenting, following, and uploading posts.

## Features

- **User Registration and Authentication**: Users can create an account and log in using their unique username and password.
- **Profile Management**: Users can update their profile information and manage their account settings.
- **Post Upload**: Users can upload images, videos, and other content to share with their followers.
- **Likes and Comments**: Users can like and comment on posts to interact with others.
- **Follow System**: Users can follow other users to stay updated with their posts.
- **News Feed**: Users can view posts from the accounts they follow in a personalized feed.

## Getting Started

These instructions will help you set up and run the Close Mates project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your local machine:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [MongoDB](https://www.mongodb.com/) (v4.x or higher)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/close-mates.git
    cd close-mates
    ```

2. **Install the dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following environment variables:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=your_port_number
    ```

4. **Start the development server**:

    ```bash
    npm start
    ```

    The server will start on the port specified in the `.env` file. Open your browser and navigate to `http://localhost:your_port_number`.







---








