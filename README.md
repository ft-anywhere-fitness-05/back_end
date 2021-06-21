# Anywhere Fitness API

## https://fitnessapplambda5.herokuapp.com

### What To Know About This API

I've made a LOT of endpoints. Some will be useful, some are just for reference. JSON examples listed underneath this list. Don't care about reference? These are the ones you want:

### [GET] /api/classes/

**_RESTRICTED ENDPOINT_**

See the list of classes w/ data

### [GET] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

See a class's data at a :class_id

### [GET] /api/classes/type

**_RESTRICTED ENDPOINT_**

Can search for classes by type

### [POST] /api/classes/

**_RESTRICTED ENDPOINT_**

Instructor can create a class

### [PATCH] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

Instructor can edit a classes's information using the class_id

### [DELETE] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

Instructor can remove a class using the class_id

### [GET] /api/users/

**_RESTRICTED ENDPOINT_**

Instructor can see a list of users w/ information

### [GET] /api/users/:user_id

**_RESTRICTED ENDPOINT_**

Instructor can see a specific user's information

### [POST] /api/auth/register

Create a new user or instructor.
Auth Code to create a new instructor: 'steakOnAMonday'

### [POST] /api/auth/login

Logs in a user, receives a token for authorization

## Classes

##### [GET] /api/classes

**_RESTRICTED ENDPOINT_**

See the full array of classes

<details>

```JSON
[
    {
        "class_id": 1,
        "class_name": "hot spin",
        "class_description": "Stationary bike class in a heated room. Consult you doctor.",
        "location": "Arlen",
        "date": "2021-07-05T00:00:00.000Z",
        "start_time": "13:00:00",
        "duration": "00:30:00",
        "intensity": 5,
        "max_class_size": 5,
        "current_class_size": 3,
        "type_id": 7
    },
    {
        "class_id": 2,
        "class_name": "hot yoga",
        "class_description": "Yoga class in a heated room. Consult you doctor.",
        "location": "Springwood",
        "date": "2021-07-05T00:00:00.000Z",
        "start_time": "13:00:00",
        "duration": "00:30:00",
        "intensity": 4,
        "max_class_size": 5,
        "current_class_size": 1,
        "type_id": 1
    },
    {
        "class_id": 3,
        "class_name": "hip hop dance",
        "class_description": "Dancing in the hip hop style in a heated room. Consult you doctor. Also, I think our air conditioner is broken",
        "location": "Arlen",
        "date": "2021-07-05T00:00:00.000Z",
        "start_time": "13:00:00",
        "duration": "00:30:00",
        "intensity": 3,
        "max_class_size": 2,
        "current_class_size": 2,
        "type_id": 2
    }
]
```

</details>

##### [GET] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

See the class's data at a :class_id

<details>

```JSON
{
    "class_id": 1,
    "class_name": "hot spin",
    "class_description": "Stationary bike class in a heated room. Consult you doctor.",
    "location": "Arlen",
    "date": "2021-07-05T04:00:00.000Z",
    "start_time": "13:00:00",
    "duration": "00:30:00",
    "intensity": 5,
    "max_class_size": 5,
    "current_class_size": 3,
    "type_id": 7
}
```

</details>

##### [POST] /api/classes/

**_RESTRICTED ENDPOINT_**

Instructor can create a class

> **_ Required information _**
> class_name
> location
> date
> start_time
> duration
> intensity
> max_class_size
> current_class_size
> type_id

> **_ Optional information _**
> class_description

<details>

```JSON
{
    "message": "Class created",
    "updatedClass": {
        "class_id": 1,
        "class_name": "hot spin",
        "class_description": "Stationary bike class in a heated room. Consult you doctor.",
        "location": "Arlen",
        "date": "2021-07-05T04:00:00.000Z",
        "start_time": "13:59:00",
        "duration": "00:30:00",
        "intensity": 5,
        "max_class_size": 5,
        "current_class_size": 3,
        "type_id": 7
    }
}
```

</details>

##### [PATCH] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

Instructor can edit a class's information using the class_id

> **_ Required information _**
> Only information provided will update on class

<details>

```JSON
{
    "message": "Class updated",
    "updatedClass": {
        "class_id": 1,
        "class_name": "hot spin",
        "class_description": "Stationary bike class in a heated room. Consult you doctor.",
        "location": "Arlen",
        "date": "2021-07-05T04:00:00.000Z",
        "start_time": "13:59:00",
        "duration": "00:30:00",
        "intensity": 5,
        "max_class_size": 5,
        "current_class_size": 3,
        "type_id": 7
    }
}
```

</details>

##### [DELETE] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

Instructor can remove a class using the class_id

<details>

```JSON
{
    "message": "Class removed",
    "removedClass": {
        "class_id": 1,
        "class_name": "hot spin",
        "class_description": "Stationary bike class in a heated room. Consult you doctor.",
        "location": "Arlen",
        "date": "2021-07-05T04:00:00.000Z",
        "start_time": "13:59:00",
        "duration": "00:30:00",
        "intensity": 5,
        "max_class_size": 5,
        "current_class_size": 3,
        "type_id": 7
    }
}
```

</details>

## Users

##### [GET] /api/users

**_RESTRICTED ENDPOINT_**

See the full array of users

<details>

```JSON
[
    {
        "user_id": 1,
        "username": "Michael"
    },
    {
        "user_id": 2,
        "username": "Josh"
    },
    {
        "user_id": 3,
        "username": "Chris"
    },
    {
        "user_id": 4,
        "username": "Daniel"
    },
    {
        "user_id": 5,
        "username": "Biff"
    }
]
```

</details>

##### [GET] /api/users/:user_id

**_RESTRICTED ENDPOINT_**

See a specific user's information

<details>

```JSON
 {
        "user_id": 5,
        "username": "Biff"
    }
```

</details>

##### [POST] /api/users/register

Create a new user

> **_ Required information _**
> username
> password

> **_ Optional information _**
> AuthCode (to be recognized as an instructor: steakOnAMonday)
> if no code or wrong code entered, role_id defaults to '1', aka 'client'

<details>

```JSON
{
    "message": "New User created",
    "newUser": {
        "user_id": 7,
        "username": "Edward",
        "password": "$2a$06$v36NvfFYZHOXwdTmAT2BeOfbOye43.l1gcVqkc.y4mrPrfNywZfo.",
        "role_id": 1
    }
}
```

</details>

##### [POST] /api/users/login

Logs in a user, receives a token for authorization

> **_ Required information _**
> username
> password

<details>

```JSON
{
    "message": "Welcome, Michael!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pY2hhZWwiLCJpYXQiOjE2MjQyNjY1MTcsImV4cCI6MTYyNDM1MjkxN30.zPy6jUxfLDj8YRZLTMp_scFC4FzY8tYcPh3IrlUJjF4"
}
```

</details>
