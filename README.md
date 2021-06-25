# Anywhere Fitness API

## https://fitnessapplambda5.herokuapp.com

### What To Know About This API

I've made a LOT of endpoints. Some will be useful, some are just for reference. JSON examples listed underneath this list.

<details>
<summary>What You Send</summary>

```JSON


```

</details>

## ---------- REGISTER / LOGIN ----------

### [POST] /api/auth/register

Create a new user or instructor.
Auth Code to create a new instructor: 'steakOnAMonday'
Otherwise, defaults to "client"

<details>
<summary>What You Send</summary>

```JSON
{
	"username": "Bob"
	"password": "itsapassword"
	"authCode": "steakOnAMonday"
}

```

</details>

<details>
<summary>What You Should Receive</summary>

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

### [POST] /api/users/login

Logs in a user, receives a token for authorization

<details>
<summary>What You Send</summary>

```JSON
{
	"username": "Bob"
	"password": "itsapassword"
}

```

</details>

<details>
<summary>What You Should Receive</summary>

```JSON

{
    "user_id": 4,
    "role_name": "instructor",
    "message": "Welcome, Daniel!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6IkRhbmllbCIsInJvbGVfbmFtZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjQ1NTA1MTIsImV4cCI6MTYyNDYzNjkxMn0.MpT2wondgaS0y2Oxx7-G7GaWqvmOppKVj0GvUkNaUbc"
}
```

</details>

## ---------- CLASSES ----------

### [GET] /api/classes

See the full array of classes

<details>
<summary>What You Should Receive</summary>

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

### [GET] /api/classes/search

See a list of classes by the search criteria

<details>
<summary>What You Send</summary>

```JSON
{
	"searchCriteria": "intensity"
}

```

</details>

<details>
<summary>What You Should Receive</summary>

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

### [GET] /api/classes/type

See a list of classes by the type

<details>
<summary>What You Send</summary>

```JSON
{
	"type": "yoga"
}

```

</details>

<details>
<summary>What You Should Receive</summary>

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

### [GET] /api/classes/:class_id

See the class's data by a class_id

<details>
<summary>What You Should Receive</summary>
	
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

### [POST] /api/classes/

**_RESTRICTED ENDPOINT_**

Instructor can create a class

<details>
<summary>What You Send</summary>

```JSON
{
	// required
	"class_name": "name",
	"location": "address",
	"date": "YYYY/MM/DD",
	"start_time": "HH:MM:SS",
	"type_id": "4"

	// optional
	"intensity": "positive integer, defaults to 1",
	"max_class_size": "positive integer, defaults to 5",
	"duration": "HH:MM:SS, defaults to 00:30:00",
	"current_class_size": "positive integer, defaults to 0",
	"class_description": ""
}

```

</details>

<details>
<summary>What You Should Receive</summary>
	
```JSON
{
    "message": "Class created",
    "createdClass": {
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

### [PATCH] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

Instructor can edit a class's information using the class_id

> Only information provided in the body will update in selected class

<details>
<summary>What You Send</summary>

```JSON
{
	"intensity": "6" // one example
}

```

</details>

<details>
<summary>What You Should Receive</summary>

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

### [DELETE] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

Instructor can remove a class using the class_id

<details>
<summary>What You Should Receive</summary>

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

## ---------- USERS ----------

### [GET] /api/users

**_RESTRICTED ENDPOINT_**

See the full array of users

<details>
<summary>What You Should Receive</summary>
	
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
### [post] /api/users/

**_RESTRICTED ENDPOINT_**

Changes on_boarding status

<details>
<summary>What You Should Receive</summary>
	
```JSON
{
    "user_id": 4,
    "username": "Daniel",
    "on_boarding": true
}
```

</details>

### [GET] /api/users/:user_id

**_RESTRICTED ENDPOINT_**

See a specific user's information

<details>
<summary>What You Should Receive</summary>
	
```JSON
 {
        "user_id": 5,
        "username": "Biff",
	"role_id": "2"
 }
```

</details>

## ---------- TYPES ----------

### [GET] /api/types

See the full array of class types

<details>
<summary>What You Should Receive</summary>
	
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

### [GET] /api/types/:type_id

get a specific class type

<details>
<summary>What You Should Receive</summary>
	
```JSON
    {
        "type_id": 10,
        "type_name": "kickboxing"
    }
```

</details>

### [POST] /api/types

**_RESTRICTED ENDPOINT_**

Create a new class type

> must be an instructor

<details>
<summary>What You Send</summary>

```JSON

{
	"type": "new unique type name"
}

```

</details>

<details>
<summary>What You Should Receive</summary>
	
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

## ---------- USER-CLASSES ----------

**_ For checking, making, and deleting class reservations _**

### [GET] /api/user-classes

**_RESTRICTED ENDPOINT_**

Get all Class reservations, ordered by class id. Instructors Only

<details>
<summary>What You Should Receive</summary>
	
```JSON
[
    {
        "user_class_id": 1,
        "user_id": 5,
        "class_id": 1
    },
    {
        "user_class_id": 2,
        "user_id": 2,
        "class_id": 1
    },
    {
        "user_class_id": 3,
        "user_id": 3,
        "class_id": 1
    },
    {
        "user_class_id": 4,
        "user_id": 4,
        "class_id": 2
    },
    {
        "user_class_id": 5,
        "user_id": 5,
        "class_id": 3
    },
    {
        "user_class_id": 6,
        "user_id": 1,
        "class_id": 3
    }
]

```

</details>

### [GET] /api/user-classes/:user_id

**_RESTRICTED ENDPOINT_**

Get all Class reservations of a certain user, ordered by date

<details>
<summary>What You Should Receive</summary>
	
```JSON
[
    {
        "user_class_id": 1,
        "user_id": 5,
        "class_id": 1,
        "class_name": "Hot Spin",
        "class_description": "Stationary bike class in a heated room. Consult you doctor.",
        "location": "7116 Oxford St. Pawtucket, RI 02860",
        "date": "2021-07-05T04:00:00.000Z",
        "start_time": "14:00:00",
        "duration": "00:30:00",
        "intensity": 5,
        "max_class_size": 5,
        "current_class_size": 3,
        "type_id": 7
    },
    {
        "user_class_id": 5,
        "user_id": 5,
        "class_id": 3,
        "class_name": "Hip Hop Dance",
        "class_description": "Dancing in the hip hop style in a heated room. Consult you doctor. Also, I think our air conditioner is broken",
        "location": "797 Pin Oak St. Morrisville, PA 19067",
        "date": "2021-07-05T04:00:00.000Z",
        "start_time": "15:00:00",
        "duration": "00:30:00",
        "intensity": 3,
        "max_class_size": 2,
        "current_class_size": 2,
        "type_id": 2
    }
]

```

</details>

### [POST] /api/user-classes

**_RESTRICTED ENDPOINT_**

Reserve a spot in a class

<details>
<summary>What You Send</summary>

```JSON
{
	"user_id": "5",
	"class_id": "2"
}

```

</details>

<details>
<summary>What You Should Receive</summary>
	
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

### [DELETE] /api/user-classes/:user_id/:class_id

**_RESTRICTED ENDPOINT_**

Remove a User's Reservation

<details>
<summary>What You Should Receive</summary>
	
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
