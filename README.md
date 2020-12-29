## Covid-19 Stats App.

### Info
#### - [Current Deployment](https://irlgabriel.github.io/covid-19-tracker/)
#### - Built with React
#### - Used [Recharts](https://recharts.org) for displaying charts
#### - [This](https://rapidapi.com/Gramzivi/api/covid-19-data?endpoint=apiendpoint_90422c25-72f4-4e9a-a792-67e3dc7553a1) API for WORLDWIDE covid-19 data
#### - [This](https://documenter.getpostman.com/view/10808728/SzS8rjbc#6fbc46d6-0ddf-400b-a743-a149e9bba381) API for Country specific data and new cases today.
<<<<<<< HEAD
=======

### Issues
#### - 

### TO-DO
#### - Re-think the main layout - I want to give it more of a mobile look. [ I think I give up on this one for now]
#### - Maybe give users more options for data querying, like seeing charts just for a specific timeline.
#### - Add better (error?) feedback. Right now if a bad response comes back from the server I just show a "Invalid country name" alert, which is not as horrible as it sounds REALLY, because so far that was the case every time a bad response was sent. [DONE - I get a list of valid countries from the 2nd covid api and check the form input against them for a match before trying to fetch data.]
#### - Add loading animations while querying data and some toasts notifications afterwards. [1/2 DONE - just needs toasts now.]
>>>>>>> a74c7b8e1ac836419627ce11cf21dd5460ed8d31
