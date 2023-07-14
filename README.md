# Admin Portal of the Application v2


# App Component
The App component is the main component of the React application. It sets up the routing for different pages and handles user authentication and data loading.

## State and Global State
The component uses the useState and useGlobalState hooks to manage state:

### user (global state):
Represents the user data stored in the global context. It is accessed and updated using the useGlobalState hook.
### isLoggedIn (global state):
Represents the login status of the user stored in the global context. It is accessed and updated using the useGlobalState hook.
### loading (boolean):
Represents the loading state of the application. It is initially set to true and set to false once the data is loaded.

## Methods
The component defines a method called getData that is responsible for fetching the user's profile data from the server. It takes a counter parameter to keep track of the number of attempts made to fetch the data.

If the counter exceeds 2, the loading state is set to false. Otherwise, it makes a GET request to the /profile endpoint using the auth module and the JWT token stored in the local storage. If the request is successful, it updates specific fields in the user state with the retrieved profile data, sets the login status to true, and sets the loading state to false. If the request fails with a 401 status (unauthorized), it recursively calls the getData method with an incremented counter to retry the request. Any other error will be logged to the console, and the loading state is set to false.

The getData method is called in the useEffect hook when the component is first rendered. It ensures that the data is fetched only once by using the didInit variable to track initialization.

## Rendered Output
The App component renders the following:

A container div element that wraps the entire application.

The BrowserRouter component from the react-router-dom library, which provides routing capabilities to the application.

The Routes component from the react-router-dom library, which defines the routes for different pages.

Inside the Routes component, there is a single Route component with the path set to "/" (the root path).

Within this Route, there is another nested Route component with the index prop set to true. This means that the nested component will be rendered when the parent route matches exactly. In this case, the nested component is the Home component wrapped in the Private component. The Private component is likely responsible for handling authentication and protecting the Home component.

There are also two more nested Route components with paths set to "/login" and "/register". These components render the Login and Register components, respectively.

If the loading state is true, a line break (<br />) is rendered to indicate that the application is in a loading state.

# Home Component
The Home component is a React functional component that displays a table of vaccine data. It fetches the data from an API using the api module, and it requires the Navbar component and the Table component from the Ant Design library.

## Props
The Home component does not accept any props.

## State
The component has the following state variables:

### loading (boolean): 
Represents the loading state of the table. It is initially set to true and set to false once the data has been fetched.
### vaccineData (array): 
Contains the vaccine data fetched from the API. It is initially an empty array and gets populated with the data once it is fetched.

## Methods
The component defines a method called approval that is used to make a POST request to the /approve endpoint of the API. It takes two parameters: jwt (JSON Web Token) and id (vaccination ID). This method is called when the "Approve" button is clicked in the table.

## Lifecycle
The component uses the useEffect hook to fetch the vaccine

# Login Component
The Login component is a React functional component that provides a login form for users to log in to their accounts. It utilizes several custom UI components such as Button, Input, and Label, as well as the AiOutlineHome icon from the react-icons/ai library.

## Props
The Login component does not accept any props.

## State
The component has the following state variables:

### email (string):
Stores the value of the email entered by the user in the login form.
### password (string):
Stores the value of the password entered by the user in the login form.
### user (global state):
Represents the user state stored in the global context. It is set using the useGlobalState hook.
### isLoggedIn (global state):
Represents the login status of the user stored in the global context. It is set using the useGlobalState hook.

## Methods
The component defines a method called login that is triggered when the "Login" button is clicked. This method sends a POST request to the /login endpoint using the auth module, passing the user's email and password as form data. Upon successful login, the JWT (access token) returned in the response is stored in the local storage, and a subsequent GET request is made to the /profile endpoint to fetch the user's profile information. The profile data is then used to update specific fields in the user state. Finally, the user state is updated, the isLoggedIn state is set to true, and the user is redirected to the home page ("/").

## Rendered Output
The Login component renders the following:

A container div with a class of "min-h-screen bg-gray-50 flex flex-col min-w-screen justify-center", which centers the login form vertically on the page.

A nested div with classes "w-full lg:w-2/6 mx-auto lg:border lg:rounded-lg lg:shadow-lg lg:bg-white", which represents the login form container.

An AiOutlineHome icon placed at the top-left corner of the form, which acts as a home button to navigate back to the home page when clicked.

Various nested div elements containing the login form elements such as labels, inputs, buttons, and links.

The email input field, password input field, "Forgot password?" button, "Login" button, and "Need an account?" link are all functional and perform the corresponding actions when interacted with.

# Register Component
The Register component is a React functional component that provides a registration form for users to create an account. It utilizes several custom UI components such as Button, Input, and Label, as well as the ToastContainer and AiOutlineHome icon from the react-toastify and react-icons/ai libraries, respectively.

## Props
The Register component does not accept any props.

## State
The component has the following state variables:

### name (string): 
Stores the value of the name entered by the user in the registration form.
### email (string):
Stores the value of the email entered by the user in the registration form.
### phone (string):
Stores the value of the phone number entered by the user in the registration form.
### password (string):
Stores the value of the password entered by the user in the registration form.
### cpassword (string):
Stores the value of the password confirmation entered by the user in the registration form.
### address (string):
Stores the value of the address entered by the user in the registration form.
### nid (string):
Stores the value of the NID (National Identification) number entered by the user in the registration form.

## Methods
The component defines a method called register that is triggered when the "Signup" button is clicked. This method performs several validations:

It checks if the password and password confirmation match. If they don't match, it displays an error toast notification and sets passError to true.

If the passwords match, it sends a POST request to the /create endpoint using the auth module, passing the user's registration data. Upon successful registration, it proceeds with the login process by sending a POST request to the /login endpoint to obtain a JWT (access token).

The JWT is then stored in the local storage, and a subsequent GET request is made to the /profile endpoint to fetch the user's profile information. The profile data is used to update specific fields in the user state. Finally, the user state is updated, the isLoggedIn state is set to true, and the user is redirected to the home page ("/").

## Rendered Output
The Register component renders the following:

A container div with a class of "min-h-screen bg-gray-50 flex flex-col min-w-screen justify-center", which centers the registration form vertically on the page.

A ToastContainer component from the react-toastify library, which is responsible for displaying toast notifications.

A nested div with classes "w-full lg:w-5/6 mx-auto lg:border lg:rounded-lg lg:shadow-lg lg:bg-white", which represents the registration form container.

An AiOutlineHome icon placed at the top-left corner of the form, which acts as a home button to navigate back to the home page when clicked.

Various nested div elements containing the registration form elements such as labels, inputs, buttons, and links.

The name input field, email input field, phone input field, address input field, NID input field, password input field, and password confirmation input field are all functional and allow the user to enter their registration information.

The "Signup" button triggers the register method when clicked.

The "Already have an account?" link redirects the user to the login page when clicked.

If the user is already logged in, the component redirects them to the home page ("/").
