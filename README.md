# **StatShot**  



##### 

##### [Click here to try StatShot](https://herfalerf.github.io/statshot-frontend/)

##### [Click here for the backend repository](https://github.com/herfalerf/statshot-backend)

#### About  

StatShot is a simple application that allows users to compare up-to-date statistics of different teams in the currently running NHL season.  You can quickly see a visual depiction of a teams statistics in graph form and compare that to another team.  As someone who enjoys NHL hockey, but does not have a ton of time to invest in viewing and comparing team statistics, I wanted a quick and easy way to see how my favorite teams compared to their rivals without having to remember the nitty gritty numbers.  


#### Functionality

StatShot is a single page application with simple functionality.  Users can create an account, view up-to-date team statistics in graph form and set a favorite team through the user profile, which will change the theme based on one of the teams primary colors.  No personal data is required to sign up, but user passwords are one-way encrypted before being stored in the database.  The database also keeps track of user preferences and keeps a record of user logins with a time stamp for internal use.  

#### User flow  

###### Login/Signup

![login-reg](https://github.com/herfalerf/statshot-frontend/blob/master/statshot%20images/login-reg.png?raw=true)

This is SignUp/LogIn page.  The page defaults to the login form, but if a user does not have an account they can simply select SignUp, to create one.  It also contains a brief description of what StatShot does, and links to the front-end Github repo and my LinkedIn profile.   

###### Graphs page  

![graphs-main](https://github.com/herfalerf/statshot-frontend/blob/master/statshot%20images/graphs-main.png?raw=true)

Upon logging in or registering a new account, users will be brought to the main graphs page where they will presented with two dropdown menus which can each be used to select a team.

![graphs-demo](https://github.com/herfalerf/statshot-frontend/blob/master/statshot%20images/graphs-demo.png?raw=true)

As teams are selected, the graph will be populated with data.  Users can change the selected teams easily using the drop downs and the graph animates through the change in data.  The colors of the bars utilize an official color from the selected team.  The graphs are also slightly interactive, hovering over bars will display the bars value and clicking on the legend will show or hide that teams data.  

###### User Profile  

![user-main](https://github.com/herfalerf/statshot-frontend/blob/master/statshot%20images/user-main.png?raw=true)

Selecting the Profile navigation link on the top right of the navigation bar will take the user to their profile, where they can view and set their favorite team.

![user-fav](https://github.com/herfalerf/statshot-frontend/blob/master/statshot%20images/user-fav.png?raw=true)

Selecting a favorite team will change the text to display the teams name and add a slight UI modification setting the borders of displayed containers to that teams color.  This change will also appear on the main graphs page.  **NOTE:** *Users can always return back  to the main graphs page by clicking the StatShot logo on the top left of the navigation bar.*

###### Logout  

![logout](https://github.com/herfalerf/statshot-frontend/blob/master/statshot%20images/logout.png?raw=true)

Should a user wish to logout, they simply need to click the logout button on the top right of the navigation bar.  The logout message is displayed and the user is returned to the signup/ login page.

#### External API

StatShot utilizes the [nhlapi](https://gitlab.com/dword4/nhlapi) for all of its up to date data.

#### Technology

StatShot is built as a single page application using a separate front-end and backend

###### Front-end  

The front end of StatShot is built using jQuery for DOM manipulation, AXIOS for requests and Bootstrap for styling.  Font Awesome is used for some icons and Chart.js is used to build the graphs.  The front-end is deployed on Github Pages

###### Backend  

The backend of StatShot is built as a discrete API which is deployed on Heroku.  The API is built in Python using Flask with Flask-WTForms and Flask-SQLAlchemy as the primary packages used in construction.  Since the front end is not being created with flask view functions, Flask-WTForms is only being used to validate incoming form data rather than to create forms.  Flask-CORS is used to add the proper cross origin headers to the responses sent from MY API.  Bcrypt is used for password encryption prior to those being stored in the database.  Authorization is provided by Flasks built in sessions library and the flask session cookie.  
StatShot utilizes PostgreSQL for its database.

#### Conclusion  

The greatest challenge for me in creating this project was completely separating the front-end and backend.  I wanted the challenge of making my own API that could be accessible externally, rather than having flask display the routes as it was suggested to me by my mentor that this would be a more realistic method of developing a modern application.  This ended up being the greatest challenge of the project as I was unprepared for the issues I would encounter with cross-origin resource sharing and I spent many hours trying to get API routes that had worked flawlessly when accessed from localhost to work when being accessed by a different domain.  
I hope you enjoy what StatShot has to offer.

#### Testing

###### Front-end testing with Jasmine  

If you have downloaded the source code and wish to test the front-end, simply uncomment the Jasmine CDN script tags at the bottom of the index.html file.  Open the page locally and the Jasmine testing interface will be displayed.  

###### Backend testing with Python's unittest library

Testing the back end requires Python 3.7.7 or later version of Python 3.7 installed locally with all of the required packages.  Once these requirements have been met, unit tests for specific files can be run through the command line with `python-m unittest test_file_name.py` substituting the filename for the test file to be run.