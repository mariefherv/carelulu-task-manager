## :memo: CareLulu Task Manager Web App
### This web application was solely developed for the Carelulu Programming Challenge.
#### Functionalities include:
##### :information_desk_person: User Login/Register
##### :round_pushpin: Create A Task
##### :pencil2:	Edit A Task
##### :wastebasket: Delete A Task
##### :white_check_mark: Mark A Task As Complete

######################################################################################

## INSTRUCTIONS
Please follow the steps accordingly to ensure that the web application runs smoothly.

1) Clone this repository to any directory of your choice.
2) Create a database on your local / MySQL server called "tasks".
      > You may change the name as you see fit. The **next step is what's IMPORTANT.**
3) Import tasks.sql to the database you just created.
4) See if the API can successfully connect to the database.
   > Inside the lulu-api folder, run ***npm install*** on your terminal (make sure that node.js is installed).
   
   > After installing the necessary packages, you can start the API server by executing ***npm start*** or ***npm run dev*** 
   > on the terminal.

   > If everything goes right, the server should running on http://localhost:9000/ (by default). You may set up your own 
   > process.PORT.env to run the server, but ***PLEASE NOTE THAT THE FRONT-END ONLY FETCHES DATA FROM LOCALHOST:9000 FOR NOW.***
5) If you have successfully connected to the API, we may now start building our front-end client.
   > Similar to what we did in Step 4, inside the lulu-task-manager folder, run ***npm install*** on your terminal to install the
   > necessary packages.

   > After installing, you can run the web application by executing ***npm start*** on your terminal.
6) If everything goes well, then the web application should run smoothly! :partying_face:

######################################################################################

### ***Developer's Notes***
  > As you may see in the package.json, I have installed packages for Apollo GraphQL. I tried implementing it in my web application, but I still can't wrap my head around at some-- maybe most-- concepts and I'm also running out of time. On the bright side, I crash-coursed the entire Lift-Off Series by Apollo Studio over the weekend and got certified as a GraphQL Associate 😽. You may also notice that I haven't implemented tests because I don't know how yet, but I have upcoming short course classes for Unit Testing :nerd_face:. The whole development process (minus the crash courses) took approximately 22 hours.
