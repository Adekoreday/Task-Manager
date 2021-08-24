### Readme

## post man documentation
https://documenter.getpostman.com/view/5907608/TzzEoaMi

### Getting Started

- Run mongodb locally using docker-compose
```
    docker-compose up

```
the url locally should be  

```
mongodb://localhost:27018
```


- Create the environment variable file. A sample of its content is provided in the .env.sample file committed to this Repo



#### Running in production mode
- update NODE_ENV=production in your .env file
- run the following
```
yarn install
yarn run start

```

### Watch Mode 

```
yarn install
yarn run watch

```

### test Mode
- update NODE_ENV=test in your .env file

```
yarn run test
```

Features that would have been implemented 

The following approach would have been implemented should there be time

- Email verification of regular user 
- More Robust test asserting response body content
- Test for task (CRUD)





