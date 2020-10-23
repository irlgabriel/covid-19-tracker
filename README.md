## Covid-19 Stats App.

### Info
#### - Built with React
#### - Used [Recharts](https://recharts.org) for displaying charts
#### - [This](https://rapidapi.com/Gramzivi/api/covid-19-data?endpoint=apiendpoint_90422c25-72f4-4e9a-a792-67e3dc7553a1) API for WORLDWIDE covid-19 data
#### - [This](https://documenter.getpostman.com/view/10808728/SzS8rjbc#6fbc46d6-0ddf-400b-a743-a149e9bba381) API for Country specific data

### Issues
#### - Sometimes first API sends a 429 response (too many requests) - I think it is because it's got a limit of 1req/sec and re-rendering of the main component might be the issue here.
#### - I don't know how to preprocess date to show it in format "YYYY-MM-DD" insetad of javascript default with T and Z