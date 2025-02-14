# Retail Pulse Application (Kirana Club Assignment)

[Github Page](https://github.com/NightFury300/assignment_kirana)

A service to process thousands of images collected from stores.

## Features
- The service receives the jobs with image URLs and store id.There can be multiple jobs with thousands of images each at a given time, a job can take few minutes to an hour to complete. Using the API a user submits the job.

- We process a job, the service downloads the images and calculates the perimeter 2* [Height+Width] of each image. After calculating the perimeter of the image we have a random sleep time of 0.1 to 0.4 secs (this is to imitate GPU processing). After this, we store the results at an image level.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployed**: Docker

## Dependencies
To run this application locally without docker, the following dependencies are required:
```json
"dependencies": {
    "bull": "^4.16.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mathjs": "^14.0.1",
    "mongoose": "^8.9.4",
    "node-cron": "^3.0.3",
    "redis": "^4.7.0",
    "sharp": "^0.33.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
```

## Running directly
If you are directly downloading the whole folder as provided with the node modules folder,
trying running ```npm run dev``` after doing ```cd assignment_kirana```
It should work, although this might have troubles across different operating systems, try running it locally or using docker if any issue occurs, or just hit me up. Mob-7905256733

## Steps To Step Up

1.Clone the repository using
```sh
git clone https://github.com/NightFury300/assignment_kirana.git
```
2.Use Command to change directory to assignment_ast folder which contains the src folder
```sh
cd assignment_kirana
```

3.Use command to install all the dependencies
```sh 
npm install
```

4.Modify MONGODB_URI ```.env ``` file and DB_NAME ```constants.js``` if you want to use your own **database** using your database uri and **Port** of your choosing. You might also need to modify REDIS_HOST, REDIS_PASSWORD, REDIS_PORT if you want to use your own redis server. I have supplied my .env file to run it directly on my db and redis.

5.Use Command
```sh 
npm run dev
```

6.The backend of the server is at(or whichever port you choose)
```sh 
http://localhost:3000/
```

## Steps to Set Up (Using Docker)-

1.Clone the repository using
```sh
git clone https://github.com/NightFury300/assignment_kirana.git
```

2.Use Command to change directory to assignment_ast folder which contains the src folder
```sh
cd assignment_kirana
```

3.Make sure docker is running and use the command
```sh
docker-compose build
```

4.After building start the server using
```sh
docker-compose up
```

5.The server should be up and running now, at-
```sh
http://localhost:3000/
```
Refer to the APIs provided below.

## Usage

**1. Submit Job**
Create a job to process the images collected from stores.

**URL:** ```/api/submit/```

**Method:** ```POST```

**Request Payload:**
```
{
   "count":2,
   "visits":[
      {
         "store_id":"S00339218",
         "image_url":[
            "https://www.gstatic.com/webp/gallery/2.jpg",
            "https://www.gstatic.com/webp/gallery/3.jpg"
         ],
         "visit_time": "time of store visit"
      },
      {
         "store_id":"S01408764",
         "image_url":[
            "https://www.gstatic.com/webp/gallery/3.jpg"
         ],
         "visit_time": "time of store visit"
      }
   ]
}
```

**2. Get Job Info**
Fetches the status of the job with jobid in query parameter.

**URL** : ```/api/status?jobid=123```

**URL Parameters**: - ```jobid``` Job ID received while creating the job

**Method**: ```GET```


## Acknowledgments
Thank you for checking out my project! For any inquiries or feedback, feel free to reach out to me at [shubhsaxena447@gmail.com](mailto:shubhsaxena447@gmail.com).
