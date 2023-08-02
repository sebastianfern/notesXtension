// Function to handle the Sign-In response
function handleCredentialResponse(response) {
    if (response['status']['signed_in']) {
        // User is signed in, handle the authenticated state
        // You can perform actions like displaying user information, making API calls, etc.
        console.log('User is signed in:', response);
    } else {
        // User is signed out, handle the signed out state
        // You can update your UI accordingly or perform other actions
        console.log('User is signed out:', response);
    }
}

// Function to initialize the Sign-In With Google client
function initializeSignIn() {
    // Define the configuration object for initializing the Sign In With Google client
    const config = {
        client_id: '63814833791-lthj48ur6op3hsm95pbm1tdei0dnmvji.apps.googleusercontent.com', // Replace with your actual Google Sign-In client ID
        ux_mode: 'popup', // Display the Sign-In dialog as a popup
        callback: handleCredentialResponse, // Function to handle the Sign-In callback
    };

    // Initialize the Sign In With Google client with the provided configuration
    google.accounts.id.initialize(config);

    // Add the Sign-In button to the 'signin-container' div
    google.accounts.id.renderButton(document.getElementById('signin-container'));
}
