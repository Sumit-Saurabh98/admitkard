# Text Analyzer App

## Video Presntation

Drive Link:- https://drive.google.com/file/d/1wwbt0ubm9l--ZQs1xKRR4Hsr92_Kd_FV/view?usp=sharing

## There are two ways to see the project.

## 1. Live deployed link (Preferred)
I have deployed the frontend and Backend. you can use the app by this link. <br/>

## Note:- The app is deployed on free hosting services. You might face a delay during an API call.

### Deployed Link:- https://textanalyzer-phi.vercel.app/

## 2. How to Setup locally(required MongoDB cluster URL to connect to the database)

--> Step 1:- go to the server directory and run the "npm install" command with double quotes.<br/>
--> Step 2:- Step up the environment variable (MONGODB_URL)<br/>
    i. Create a .env file inside the server directory.<br/>
    ii. in .env file, create a variable MONGODB_URL = <your "mongodburl"> without any quotes.<br/>
--> Step 3:- run the "npm start" command without double quotes.<br/>
--> Step 4:- go to the client directory and run the "npm install" command with double quotes.<br/>
--> Step 5:- Step up the environment variable (REACT_APP_BASE_URL)<br/>
    i. Create a .env file inside the client directory.<br/>
    ii. in .env file, create a variable REACT_APP_BASE_URL = http://localhost:8080<br/>
--> Step 6:- run the "npm start" command without double quotes.




