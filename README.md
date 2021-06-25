# Anywhere Fitness API

## https://fitnessapplambda5.herokuapp.com

### What To Know About This API

I've made a LOT of endpoints. Some will be useful, some are just for reference. JSON examples listed underneath this list.

### [GET] /api/classes/

See the list of classes w/ data

### [GET] /api/classes/:class_id

See a class's data at a :class_id

### [GET] /api/classes/search

Can search for classes by category

### [POST] /api/classes/

**_RESTRICTED ENDPOINT_**

Instructor can create a class

### [PATCH] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

Instructor can edit a class's information using the class_id

### [DELETE] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

Instructor can remove a class using the class_id

## ----- REGISTER / LOGIN -----

### [POST] /api/auth/register

Create a new user or instructor.
Auth Code to create a new instructor: 'steakOnAMonday'

> **_ Required information _**
> username, 
> password

> **_ Optional information _**
> authCode (to be recognized as an instructor: steakOnAMonday), 
> if no code or wrong code entered, role_id defaults to '1', aka 'client'


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

##### [POST] /api/users/login

Logs in a user, receives a token for authorization

> **_ Required information _**
> ~ in body ~ 
> username, 
> password

<details>

```JSON
{
    "user_id": 4,
    "role_name": "instructor",
    "message": "Welcome, Daniel!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo0LCJ1c2VybmFtZSI6IkRhbmllbCIsInJvbGVfbmFtZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjQ1NTA1MTIsImV4cCI6MTYyNDYzNjkxMn0.MpT2wondgaS0y2Oxx7-G7GaWqvmOppKVj0GvUkNaUbc"
}

</details>

## ----- CLASSES -----

##### [GET] /api/classes

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

See a list of classes by the search criteria

> **_ Required information _**
> ~ in body ~

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

See a list of classes by the type

> **_ Required information _**
> ~ in body ~ 

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

See the class's data by a class_id

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
> class_name, 
> location, 
> date - YYYY/MM/DD, 
> start_time - HH:MM:SS, 
> type_id

> **_ Optional information _**
> intensity - positive integer, defaults to 1, 
> max_class_size - positive integer, defaults to 5, 
> duration - HH:MM:SS, defaults to 00:30:00, 
> current_class_size - positive integer, defaults to 0, 
> class_description

<details>

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

##### [PATCH] /api/classes/:class_id

**_RESTRICTED ENDPOINT_**

Instructor can edit a class's information using the class_id

> **_ Required information _**
> Only information provided in the body will update in selected class, 
> { intensity: "6" } - Works, 
> { intensit: "6" } - Does not work

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

## ----- USERS -----

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
##### [post] /api/users/

**_RESTRICTED ENDPOINT_**

Changes on_boarding status

<details>

```JSON
{
    "user_id": 4,
    "username": "Daniel",
    "on_boarding": true
}
```

</details>


##### [GET] /api/users/:user_id

**_RESTRICTED ENDPOINT_**

See a specific user's information

<details>

```JSON
 {
        "user_id": 5,
        "username": "Biff",
	"role_id": "2"
 }
```

</details>

## ----- TYPES -----

##### [GET] /api/types

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

**_RESTRICTED ENDPOINT_**

Create a new class type

> **_ Required information _**
> unique type_name, 
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

## ----- USER-CLASSES -----

**_ For checking, making, and deleting class reservations _**

##### [GET] /api/user-classes

**_RESTRICTED ENDPOINT_**

Get all Class reservations, ordered by class id. Instructors Only

<details>

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

##### [GET] /api/user-classes/:user_id

**_RESTRICTED ENDPOINT_**

Get all Class reservations of a certain user, ordered by date

<details>

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

##### [POST] /api/user-classes

**_RESTRICTED ENDPOINT_**

Reserve a spot in a class

> **_ Required information _**

```
{
    user_id: "5",
    class_id: "2"
}
```

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
