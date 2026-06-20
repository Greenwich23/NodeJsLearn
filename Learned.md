routes page is for the page routing, while controller is for the functions

basically routes is for the get, post, put and delete to each of the pages

for instance, user is created is a post request, so this would be found in the routes page, and any other related http requests for users would be doung in this page - (user.routes.js), while the controller would be doing the logic itself

When requests are made the flow is from App.js ---> Routes.js ---> Controller.js
