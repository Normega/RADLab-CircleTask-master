# RADLab-CircleTask

This project has been created for The Regulatory and Affective Dynamics (RAD) Lab which is dedicated to understanding how emotions and regulatory responses 
unfold over time to determine a person's sense of well-being.

Node and Express is used to serve the webpage. Firebase is used to store recorded experiment data.

The web experiment uses jspsych as the main dependency. This helps serve the different components of the experimentm (instructions, trials, questions) as 
plug-ins on the page.

Two custom plug-ins (circleTask.js, circleTask2.js) have been created and can be found in the plugins folder of jspsych. 

## Cloning and Running the Application in local

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

### Install dependencies and run

Clone the project onto your local machine:

```bash
git clone https://github.com/zohaibxrehman/RADLab-CircleTask
```

Install all the npm packages. Go into the project folder and install all npm packages:

```bash
npm install
```

To run the application:

```bash
npm start
```

The application runs on **localhost:3000** on your local machine.
