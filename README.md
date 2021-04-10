# Security project

This application was written for the completion of a project class in the subject "Information System Security". The app only has login and registrations, with minimal styling. It was about presenting the possible security of the application. It was written using the MERN stack. It has been equipped with such functionalities as: 
-registration (email confirmation required, for this purpose mailGun API was used), 
-Two Factor Authentication (with SMS using Nexmo API) - logging generates JWT, which is saved in localstorage.
-login and registration have simple validation
-GoogleCaptcha, that verify "user as human",

Limiters have been imposed on all requests to the server, which do not allow for more than 3 queries in 5 seconds.
