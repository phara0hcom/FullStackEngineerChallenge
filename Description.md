# Description

This is a short overview of the stack that I used and the reason behind it.

## Setup Environment

- Download [Docker Desktop](https://www.docker.com/get-started) and install it.
- Run Docker
- `docker-compose up --build -d`
- Open [Client Url](http://localhost:3000/) in a browser

## Environment

Firstly I wanted to use Docker, I wanted to challenge myself since I've never made a container myself. Also for ease of use, so that the people that use this app don't have to install mySQL, NodeJS etc. Also running it in one command line is nice.

## Back-End

Since I know Javascript and have worked before with NodeJS and Express this is an easy choice for me. I've never worked with MySql and NodeJS, I've worked with MySql and PHP in the past. But it seems easy enough, just hope I don't make any mistakes and open my app up for a MySql injection.

## Api End-Points

### Get full list of employee's

**URL** : `/api/employee`

**Method** : `GET`

### Success Response

```
[
  {
    "id": number,
    "firstName": string,
    "lastName": string,
    "email": string,
    "lastReview":null or number,
    "manager": string
  },
  { ... }
]
```

### Get employee by ID

**URL** : `/api/employee/id/:id`

**Method** : `GET`

### Success Response

```
[
  {
    "id": number,
    "firstName": string,
    "lastName": string,
    "email": string,
    "lastReview":null or number,
    "manager": string
  }
]
```

### Get employee or employee's name

It will search in lastName and fistsName column in the employee table

**URL** : `/api/employee/name/:name`

**Method** : `GET`

### Success Response

```
[
  {
    "id": number,
    "firstName": string,
    "lastName": string,
    "email": string,
    "lastReview":null or number,
    "manager": string
  },
  { ... }
]
```

### Edit employee entry by ID

**URL** : `/api/employee/edit/:id`

**Method** : `PUT`

### Data to Send

```
{
  "firstName": string,
  "lastName": string,
  "email": string,
  "lastReview": null or number,
  "manager": string
}
```

### Success Response

```
{
  "status":"changed",
  "id": number,
  "response": {
    "fieldCount":0,
    "affectedRows":1,
    "insertId":0,
    "serverStatus":2,
    "warningCount":0,
    "message":"(Rows matched: 1  Changed: 1  Warnings: 0",
    "protocol41":true,
    "changedRows":1
  }
}
```

### Edit employee entry by ID

**URL** : `/api/employee/:id`

**Method** : `DELETE`

### Success Response

```
{
  "status":"deleted",
  "id": number,
  "response":{
    "fieldCount":0,
    "affectedRows":1,
    "insertId":0,
    "serverStatus":2,
    "warningCount":0,
    "message":"",
    "protocol41":true,
    "changedRows":0
  }
}
```

## Front-End

Since this is my bread and butter I used react-create-app because it's a fast way to get started with dev server and TypeScript. I used TypeScript since not so long ago I started implementing it in my current jobs One Page App. I really like it because a lot of issues are caught before seeing the error in the browser.

I'm more familiar with Redux and React-Router, I use them everyday in my current work environment. What is new for me is Redux-Thunk in Typescript since my current project is using Redux-Saga.

Will use Bootstrap because I never used it and I read good things about it so this was a good opportunity to try something new.

## Home page

**URL** : `http://localhost:3000/`

Here you will see a list of employees. In the header you can click **Add New** to go to the editor.

## Editor

Here you can edit or add a new Employee

**URL** : `http://localhost:3000/edit/new`

**URL** : `http://localhost:3000/edit/:id`

# Known bugs

- After editing or saving a (new) employee clicking in the header **Add New** that will not work.
- Need the add better styling
- Tests
