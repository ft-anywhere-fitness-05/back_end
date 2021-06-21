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

### [GET] /api/classes/search

**_RESTRICTED ENDPOINT_**

Can search for classes by category

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

## Register / Login

### [POST] /api/auth/register

Create a new user or instructor.
Auth Code to create a new instructor: 'steakOnAMonday'

> **_ Required information _**
> username
> password

> **_ Optional information _**
> AuthCode (to be recognized as an instructor: steakOnAMonday)
> if no code or wrong code entered, role_id defaults to '1', aka 'client'

<details>

```JSON

{
	message: 'New User created',
	newUser: {
		user_id: 4,
		username: Bart,
		role: 'client'
	}
}
```

</details>

##### [POST] /api/users/login

Logs in a user, receives a token for authorization

> **_ Required information _**
> ~in body
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

##### [GET] /api/classes/search

**_RESTRICTED ENDPOINT_**

See a list of classes by the search criteria

> **_ Required information _**
> ~in body
     ```
     { searchCriteria: "intensity" }
     ```

<details>

```JSON
[
    {
        "class_id": 3,
        "class_name": "hip hop dance",
        "class_description": "Dancing in the hip hop style in a heated room. Consult you doctor. Also, I think our air conditioner is broken",
        "location": "Arlen",
        "date": "2021-07-05T04:00:00.000Z",
        "start_time": "15:00:00",
        "duration": "00:30:00",
        "intensity": 3,
        "max_class_size": 2,
        "current_class_size": 2,
        "type_id": 2,
        "type_name": "dance"
    },
    {
        "class_id": 2,
        "class_name": "hot yoga",
        "class_description": "Yoga class in a heated room. Consult you doctor.",
        "location": "Springwood",
        "date": "2021-07-05T04:00:00.000Z",
        "start_time": "13:00:00",
        "duration": "00:30:00",
        "intensity": 4,
        "max_class_size": 5,
        "current_class_size": 1,
        "type_id": 1,
        "type_name": "yoga"
    },
    {
        "class_id": 1,
        "class_name": "hot spin",
        "class_description": "Stationary bike class in a heated room. Consult you doctor.",
        "location": "Arlen",
        "date": "2021-07-05T04:00:00.000Z",
        "start_time": "14:00:00",
        "duration": "00:30:00",
        "intensity": 5,
        "max_class_size": 5,
        "current_class_size": 3,
        "type_id": 7,
        "type_name": "cycling"
    }
]
```	
</details>

##### [GET] /api/classes/type

**_RESTRICTED ENDPOINT_**

See a list of classes by the type

> **_ Required information _**
> ~in body
     ```
     { type: "yoga" }
     ```

<details>

```JSON
[
    {
        "class_id": 2,
        "class_name": "hot yoga",
        "class_description": "Yoga class in a heated room. Consult you doctor.",
        "location": "Springwood",
        "date": "2021-07-05T04:00:00.000Z",
        "start_time": "13:00:00",
        "duration": "00:30:00",
        "intensity": 4,
        "max_class_size": 5,
        "current_class_size": 1,
        "type_id": 1,
        "type_name": "yoga"
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
> date		- YYYY/MM/DD
> start_time	- HH:MM:SS
> type_id

> **_ Optional information _**
> intensity		- positive integer, defaults to 1
> max_class_size	- positive integer, defaults to 5
> duration		- HH:MM:SS, defaults to 00:30:00
> current_class_size	- positive integer, defaults to 0
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
> Only information provided in the body will update in selected class
> { intensity: "6" }	- Works
> { intensit: "6" }	- Does not work Works

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
        "intensity": 6,
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

## Types

##### [GET] /api/types

**_RESTRICTED ENDPOINT_**

See the full array of class types

<details>

```JSON
[
    {
        "type_id": 1,
        "type_name": "yoga"
    },
    {
        "type_id": 2,
        "type_name": "dance"
    },
    {
        "type_id": 3,
        "type_name": "HIIT"
    },
    {
        "type_id": 4,
        "type_name": "full body fusion"
    },
    {
        "type_id": 5,
        "type_name": "circuit training"
    },
    {
        "type_id": 6,
        "type_name": "water aerobics"
    },
    {
        "type_id": 7,
        "type_name": "cycling"
    },
    {
        "type_id": 8,
        "type_name": "bootcamp"
    },
    {
        "type_id": 9,
        "type_name": "conditioning"
    },
    {
        "type_id": 10,
        "type_name": "kickboxing"
    }
]
```

</details>

##### [GET] /api/types/:type_id

**_RESTRICTED ENDPOINT_**

get a specific class type

<details>

```JSON
    {
        "type_id": 10,
        "type_name": "kickboxing"
    }
```

</details>

##### [POST] /api/types

Create a new class type

> **_ Required information _**
> unique type_name
> must be an instructor

<details>

```JSON
{
    "message": "Type created",
    "newType": {
        "type_id": 11,
        "type_name": "MMA"
    }
}
```

</details>

## User-Classes

**_ For making and deleting class reservations _**

##### [POST] /api/user-classes

**_RESTRICTED ENDPOINT_**

Reserve a spot in a class

> **_ Required information _**
> {
    user_id: "5",
    class_id: "2"
}

<details>

```JSON
{
    "message": "Spot Reserved",
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

##### [DELETE] /api/user-classes/:user_id/:class_id

**_RESTRICTED ENDPOINT_**

Remove a User's Reservation

<details>

```JSON
{
    "message": "Reservation removed",
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
        "current_class_size": 4,
        "type_id": 7
    }
}
```

</details>
