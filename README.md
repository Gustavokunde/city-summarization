# Introduction

This project was created to show technical points around forms generation, landing pages rendering and SEO as well.

In order to make this possible, I created a vite project with React.js and Typescript as well.

Also I made use of some tools and libraries that are listed below.  

# Tools and libraries used

- formik + yup : to handle forms generation and validation;
- axios: api requests;
- react-google-analytics: to include tracking of page load and button click for analytics purpose;
- google maps: to show each city location based on latitude and longitude;
- chatgpt: to get specialized data for each city;
- geodb: to get each city basic information;
- react redux + redux persist: to handle global data and persist data on page refresh as also prevent multiple api request for data that were already requested;
- styled-components: to handle css in js styling;
- mui: library with customized components


# Usage
There is the home page, where user can type a x number of valid cities in the US. 
After those values are typed, they can see a landing page for each city based in a template;
To change the number of cities to be chosen and also some others configs, there is an option to access a page through "/params". There is a simple API created here https://github.com/Gustavokunde/city-summarization-api that controls those params values in a mongoDB database.
There is tracking of information on landing pages and as well on some button clicks to analyze user behavior with Google Analytics and in a way to make A/B tests in future if needed.
To make the persist of the values, so we can enhance the user experience, I am storing the values using redux + redux persist.
There are some helper hooks as useError to handle error messages and also useParams to get params from the BFF;
To enhance user experience, I used MUI and it's components such as Buttons, Alert and also Skeleton to show the loading of the page. Other than that the application is responsive with all screen sizes;
In the Landing page there were also some markup included to help google search tools to find the expected content of the page;


# Future changes
- There are some changes that would be good to add, such as a better content management, unit tests and A/B tests management. Although the project architecture handles growth and changes very smoothly so this all can be easy implemented with proper time.


# Extra

In case you want to check some other skills such as usage of Cognito, form lead generation, git flow work and some other, please check this other project made by myself: https://github.com/Gustavokunde/leadForm
