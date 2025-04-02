# 1. Introduction 

The Music Booking API enables users to browse artists, book performances, and manage event listings. The API supports authentication, authorization and CRUD operations.

## To Use On Local Machine
i. Clone/Download the repository
ii. Install Node.js on the machine
iii. Run npm install on command prompt in the project directory
iv. Run npm run dev to spin up the server. This enables you to connect with the API with it base URL
v. Create a .env file, add your MONGO_URI and JWT_SECRET for your database

Base URL: 
http://localhost:5000

Authentication:
The API uses JWT for authentication. Include the Authorization: Bearer <token> header in your requests. Especially for protected endpoints

# 2. Authentication
### Register User
**Endpoint:** `POST /api/auth/register`  
**Description:** Create a new user account  

**Request Body:**
```json
{
    "name": string,
    "email": string,
    "password": string,
    "role": "artist | organizer | user"
}
```
**Response Body:**
```json
    {
        "message":string, 
        "success":boolean
    }
```
### Login User
**Endpoint:** `POST /api/auth/login`  
**Description:** Log User In 

**Request Body:**
```json
    {
        "email":string,
        "password":string, //greater than or equal 5 characters
    }
```
**Response Body(no error):**
```json
{
    "email": string,
    "userId": ObjectId,
    "token": string
}
```
**Response Body(error):**
```json
    {
        "message":string, 
        "success":boolean
    }
```


# 2. Users
### Get User Details
**Protected Endpoint:** `GET /api/users/me` 
**Headers:** Authorization: Bearer <token>
**Description:** Get current user details 

**Response Body:**
```json
  {
    "email": string,
    "name": string,
    "role": string,
    "createdAt": Date,
    "updatedAt": Date,
    "id": string
}
```
### Update User Details
**Endpoint:** `PATCH /api/users/me` 
**Headers:** Authorization: Bearer <token>
**Description:** Update the current user details
**Request Body(all optional)**
```json
   {
        "name":string,
        "role":"artist" | "organizer" | "user",
    }
```
**Response Body**
```json
    {
        "message":string, 
        "success":boolean
    }
```
### Delete User Account
**Endpoint:** `DELETE /api/users/me` 
**Headers:** Authorization: Bearer <token>
**Description:** Delete the current user account
**Response Body**
```json
    {
        "message":string, 
        "success":boolean
    }
```


# 3. Users
<p>Get User Details</p>
<ul>
    <li>Protected Endpoint GET /api/users/me</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Get current user details</li>
    <li>Response Body<p>
  {
    "email": string,
    "name": string,
    "role": string,
    "createdAt": Date,
    "updatedAt": Date,
    "id": string
}
    </p></li>
</ul>

<p>Update User Details</p>
<ul>
    <li>Endpoint PATCH /api/users/me</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Update the current-user details</li>
    <li>Request Body(all optional)<p>
    {
        "name":string,
        "role":"artist" | "organizer" | "user",
    }
    </p></li>
    <li>Response Body<p>
    {
        "message":string, 
        "success":boolean
    }
    </p></li>
</ul>

<p>Delete User Account</p>
<ul>    
    <li>Endpoint DELETE /api/users/me</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Delete the current-user account</li>
    <li>Response Body<p>
    {
        "message":string, 
        "success":boolean
    }
    </p></li>
</ul>

# 4. Artists
<p>Get Artists</p>
<ul>
    <li>Endpoint GET /api/artists</li>
    <li>Query Params: limit, page</li>
    <li>Fetch a limited amount of artists</li>
    <li>Response Body<p>
   {
        "stageName": string,
        "genres": string[],
        "bio": string,
        "priceTag": number,
        "rating": number,
        "createdAt": Date,
        "updatedAt": Date,
        "id": string, 
        "userId":string
    }[],
    </p></li>
</ul>

<p>Get Artist Profile</p>
<ul>
    <li>Endpoint GET /api/artists/:id</li>
    <li>Fetch Artist Profile Details</li>
    <li>Response Body<p>
   {
        "stageName": string,
        "genres": string[],
        "bio": string,
        "priceTag": number,
        "rating": number,
        "createdAt": Date,
        "updatedAt": Date,
        "id": string,
        "userId":string
    },
    </p></li>
</ul>

<p>Create Artist Profile</p>
<ul>
    <li>Endpoint POST /api/artists</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Create a New Artist Profile</li>
    <li>Request Body<p>
   {
        "stageName": string,
        "genres": string[],
        "bio": string,
        "priceTag": number,
    },
    <p>Possible genres include: Pop, Rock, Hip-Hop, R&B, Electronic, Jazz, Classical, Country, Reggae, Metal, Afrobeat, Other</p>
    </p></li>
    <li>Response Body<p>
    {
        "message": string,
        "success": boolean
    },
    </p></li>
</ul>

<p>Update Artist Details</p>
<ul>
    <li>Endpoint PATCH /api/artists</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Update the current-artist details</li>
    <li>Request Body(all optional)<p>
  {
    "stageName":string,
    "genres":string[],
    "socialLinks":string[],
    "bio":string,
    "priceTag":number, 
    "rating":number
} 
    </p></li>
    <li>Response Body<p>
    {
        "message":string, 
        "success":boolean
    }
    </p></li>
</ul>


# 5. Events
<p>Get Events</p>
<ul>
    <li>Endpoint GET /api/events</li>
    <li>Query Params: limit, page</li>
    <li>Fetch a limited amount of events</li>
    <li>Response Body<p>
   {
        "userId": string,
        "name": string,
        "description": string,
        "status": string,
        "venueId": string,
        "id": string
    }[]
    </p></li>
</ul>

<p>Get Event Details</p>
<ul>
    <li>Endpoint GET /api/events/:id</li>
    <li>Fetch a event details</li>
    <li>Response Body<p>
   {
        "userId": string,
        "name": string,
        "description": string,
        "status": string,
        "venueId": string,
        "id": string
    }
    </p></li>
</ul>

<p>Create Event</p>
<ul>
    <li>Endpoint POST /api/events</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Create a New Event</li>
    <li>Request Body<p>
        {   
            "venueId": string, (optional) 
            "name": string,
            "description": string,
            "eventDate": Date, (optional) YYYY-MM-DD(format)
            "eventTime": string, (optional) HH/MM(24 hour format)
            "duration": number, (optional)
        },
    </p></li>
    <li>Response Body<p>
    {
        "message": string,
        "success": boolean
    },
    </p></li>
</ul>

<p>Update Event Details</p>
<ul>
    <li>Endpoint PATCH /api/events/:id</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Update the Event Details</li>
    <li>Request Body(all optional)<p>
       {   
            "venueId": string,  
            "name": string,
            "description": string,
            "eventDate": Date, YYYY-MM-DD(format)
            "eventTime": string, HH/MM(24 hour format)
            "duration": number
        },
    </p></li>
    <li>Response Body<p>
    {
        "message":string, 
        "success":boolean
    }
    </p></li>
</ul>

<p>Delete Event </p>
<ul>
    <li>Endpoint DELETE /api/events/:id</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Delete Event</li>
    <li>Response Body<p>
    {
        "message":string, 
        "success":boolean
    }
    </p></li>
</ul>

# 6. Bookings

<p>Get Bookings</p>
<ul>
    <li>Endpoint GET /api/bookings</li>
    <li>Query Params: limit, page</li>
    <li>Fetch a limited amount of events</li>
    <li>Response Body<p>
   {
        "userId": string,
        "name": string,
        "description": string,
        "status": string,
        "venueId": string,
        "id": string
    }[]
    </p></li>
</ul>

<p>Get Booking Details</p>
<ul>
    <li>Endpoint GET /api/bookings/:id</li>
    <li>Fetch Booking Details</li>
    <li>Response Body<p>
     {
        "eventId": string,
        "artistId": string,
        "userId": string,
        "status": string,
        "performanceDate": Date, YYYY-MM-DD(format),
        "performanceTime": string, HH/MM(24 hour format),
        "performanceDuration": number,
        "createdAt": string,
        "updatedAt": string,
        "id": string
    }
    </p></li>
</ul>


<p>Create Booking</p>
<ul>
    <li>Endpoint POST /api/bookings</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Create a New Booking</li>
    <li>Request Body<p>
        {
            "eventId":string, 
            "artistId":string,
            "performanceDate":Date, YYYY-MM-DD(format), 
            "performanceDuration":number, 
            "performanceTime":string, HH/MM(24 hour format)
        }
    </p></li>
    <li>Response Body<p>
    {
        "message": string,
        "success": boolean
    },
    </p></li>
</ul>


<p>Update Booking Details</p>
<ul>
    <li>Endpoint PATCH /api/events/:id</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Update the Booking Details</li>
    <li>Request Body(all optional)<p>
      {
            "eventId":string, 
            "artistId":string,
            "performanceDate":Date, YYYY-MM-DD(format), 
            "performanceDuration":number, 
            "performanceTime":string, HH/MM(24 hour format), 
            "status": "requested" | "confirmed" | "rejected" | "completed"
        }  
    </p></li>
    <li>Response Body<p>
    {
        "message":string, 
        "success":boolean
    }
    </p></li>
</ul>


# 7. Venue
<p>Get Venues</p>
<ul>
    <li>Endpoint GET /api/venues</li>
    <li>Query Params: limit, page</li>
    <li>Fetch a limited amount of venues</li>
    <li>Response Body<p>
    {
        "userId": string,
        "description": string,
        "address": string,
        "ameneties": string[],
        "capacity": number | null,
        "images": string[],
        "id": string
    }[]
    </p></li>
</ul>

<p>Get Venue Profile</p>
<ul>
    <li>Endpoint GET /api/venues/:id</li>
    <li>Fetch Venue Details</li>
    <li>Response Body<p>
    {
        "userId": string,
        "description": string,
        "address": string,
        "ameneties": string[],
        "capacity": number | null,
        "images": string[],
        "id": string
    }
    </p></li>
</ul>

<p>Get Events at Venue</p>
<ul>
    <li>Endpoint GET /api/venues/:id/events</li>
    <li>Fetch Events at a Venue </li>
    <li>Response Body<p>
    {

        "userId": string,
        "name": string,
        "description": string,
        "status": string,
        "venueId": string,
        "duration": number,
        "eventDate": Date,
        "eventTime": string,
        "id": string
    }[]
    </p></li>
</ul>

<p>Create Venue</p>
<ul>
    <li>Endpoint POST /api/venues</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Create a New Venue</li>
    <li>Request Body<p>
        {
            "id": string, 
            "userId":string,
            "description":string,
            "address":string,
            "ameneties":string[], (optional)
            "capacity":number,  (optional)
            "images":string[] (optional)
        }
    </p></li>
    <li>Response Body<p>
    {
        "message": string,
        "success": boolean
    },
    </p></li>
</ul>


<p>Update Venue Details</p>
<ul>
    <li>Endpoint PATCH /api/venues/:id</li>
    <li>Headers: Authorization: Bearer <token></li>
    <li>Update Venue Details</li>
    <li>Request Body(all optional)<p>
        {
            "id": string, 
            "userId":string,
            "description":string,
            "address":string,
            "ameneties":string[], (optional)
            "capacity":number,  (optional)
            "images":string[] (optional)
        } 
    </p></li>
    <li>Response Body<p>
    {
        "message":string, 
        "success":boolean
    }
    </p></li>
</ul>
