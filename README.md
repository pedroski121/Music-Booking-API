# Music Booking API

## 1. Introduction

The Music Booking API enables users to:
- Browse artists and their profiles
- Book artists for events
- Create and manage event listings
- Handle authentication and authorization
- Perform CRUD operations on all resources

## 2. Local Development Setup

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB Atlas account or local MongoDB instance
- Git (optional)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/pedroski121/Music-Booking-API.git
   cd music-booking-api
2. Install necessary modules
   ```bash
   npm run install
3. Spin up the development server
   ```bash
   npm run dev
4. Create a .env file. Add your MONGO_URI and JWT_SECRET to it

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
        "password":string 5+ characters long
    }
```
**Response Body(no error):**
```json
{
    "email": string,
    "userId": string,
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
**Description:** Get current user details  
**Headers:** Authorization: Bearer `<token>`

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
**Headers:** Authorization: Bearer `<token>`  
**Description** Update the current user details  
**Request Body(all optional)** 
```json
   {
        "name":string,
        "role":"artist | organizer | user",
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
**Headers:** Authorization: Bearer `<token>`  
**Description** Delete the current user account  
**Response Body**
```json
    {
        "message":string, 
        "success":boolean
    }
```

# 4. Artists
### Get Artists
**Endpoint:** `GET /api/artists`  
**Query Params:** `limit, page`  
**Description:** Fetch a limited amount of artists 

**Reponse Body:**
```json
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
```

### Get Artist Profile
**Endpoint:** `GET /api/artists/:id`  
**Description:** Fetch Artist Profile Details

**Reponse Body:**
```json
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
```

### Create Artist Profile
**Endpoint:** `POST /api/artists`  
**Headers:** Authorization: Bearer `<token>`
**Description:** Create a New Artist Profile  
**Headers:** Pop, Rock, Hip-Hop, R&B, Electronic, Jazz, Classical, Country, Reggae, Metal, Afrobeat, Other  

**Request Body:**
```json
   {
        "stageName": string,
        "genres": string[],
        "bio": string,
        "priceTag": number,
    }
```
**Reponse Body:**
```json
    {
        "message": string,
        "success": boolean
    }
```

### Update Artist Profile
**Endpoint:** `PATCH /api/artists`  
**Headers:** Authorization: Bearer `<token>`  
**Description:** Update the current artist profile

**Request Body(all optional):**
```json
   {
    "stageName":string,
    "genres":string[],
    "socialLinks":string[],
    "bio":string,
    "priceTag":number, 
    "rating":number
    }
```
**Reponse Body:**
```json
    {
        "message": string,
        "success": boolean
    }
```


# 5. Events
### Get Events
**Endpoint:** `GET /api/events`  
**Query Params:** `limit, page`  
**Description:** Fetch a limited amount of events

**Reponse Body:**
```json
   {
        "userId": string,
        "name": string,
        "description": string,
        "status": string,
        "venueId": string,
        "id": string
    }[]
```

### Get Event Details
**Endpoint:** `GET /api/events/:id`  
**Description:** Fetch event details

**Reponse Body:**
```json
   {
        "userId": string,
        "name": string,
        "description": string,
        "status": string,
        "venueId": string,
        "id": string
    }
```

### Create Event
**Endpoint:** `POST /api/events`  
**Headers:** Authorization: Bearer `<token>`  
**Description:** Create a New Event

**Request Body:**
```json
        {   
            "venueId": string, (optional) 
            "name": string,
            "description": string,
            "eventDate": Date, (optional) YYYY-MM-DD(format)
            "eventTime": string, (optional) HH/MM(24 hour format)
            "duration": number, (optional)
        }
```
**Reponse Body:**
```json
    {
        "message": string,
        "success": boolean
    }
```

### Update Event Details
**Endpoint:** `PATCH /api/events/:id`  
**Headers:** Authorization: Bearer `<token>`  
**Description:** Update the Event Details

**Request Body(all optional):**
```json
       {   
            "venueId": string,  
            "name": string,
            "description": string,
            "eventDate": Date, YYYY-MM-DD(format)
            "eventTime": string, HH/MM(24 hour format)
            "duration": number
        }
```
**Reponse Body:**
```json
    {
        "message": string,
        "success": boolean
    }
```

### Delete Event
**Endpoint:** `DELETE /api/events/:id`  
**Headers:** Authorization: Bearer `<token>`  
**Description:** Delete Event
**Reponse Body:**
```json
    {
        "message": string,
        "success": boolean
    }
```


# 6. Bookings
### Get Bookings
**Endpoint:** `GET /api/bookings`  
**Query Params:** `limit, page`  
**Description:** Fetch a limited amount of bookings

**Reponse Body:**
```json
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
    }[]
```

### Get  Booking Details
**Endpoint:** `GET /api/bookings/:id`  
**Description:** Fetch Booking Details

**Response Body:**
```json
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
```

### Create Booking
**Endpoint:** `POST /api/bookings`  
**Headers:** Authorization: Bearer `<token>`  
**Description:** Create a New Booking

**Request Body:**
```json
        {
            "eventId":string, 
            "artistId":string,
            "performanceDate":Date, YYYY-MM-DD(format), 
            "performanceDuration":number, 
            "performanceTime":string, HH/MM(24 hour format)
        }
```
**Reponse Body:**
```json
    {
        "message": string,
        "success": boolean
    }
```

### Update Booking Details
**Endpoint:** `PATCH /api/events/:id`  
**Headers:** Authorization: Bearer `<token>`  
**Description:** Update the Booking Details

**Request Body(all optional):**
```json
      {
            "eventId":string, 
            "artistId":string,
            "performanceDate":Date, YYYY-MM-DD(format), 
            "performanceDuration":number, 
            "performanceTime":string, HH/MM(24 hour format), 
            "status": "requested" | "confirmed" | "rejected" | "completed"
        } 
```
**Reponse Body:**
```json
    {
        "message": string,
        "success": boolean
    }
```

# 7. Venue
### Get Venues
**Endpoint:** `GET /api/venues`  
**Query Params:** `limit, page`  
**Description:** Fetch a limited amount of event venue location

**Reponse Body:**
```json
    {
        "userId": string,
        "description": string,
        "address": string,
        "ameneties": string[],
        "capacity": number | null,
        "images": string[],
        "id": string
    }[]
```

### Get Venue Profile
**Endpoint:** `GET /api/venues/:id`  
**Description:** Fetch Venue Details

**Response Body:**
```json
     {
        "userId": string,
        "description": string,
        "address": string,
        "ameneties": string[],
        "capacity": number | null,
        "images": string[],
        "id": string
    }
```

### Get Events at Venue
**Endpoint:** `GET /api/venues/:id/events`  
**Description:** Fetch Events at a Venue

**Response Body:**
```json
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
```

### Create Venue
**Endpoint:** `POST /api/venues`  
**Headers:** Authorization: Bearer `<token>`  
**Description:** Create a New Venue

**Request Body:**
```json
     {
            "id": string, 
            "userId":string,
            "description":string,
            "address":string,
            "ameneties":string[], (optional)
            "capacity":number,  (optional)
            "images":string[] (optional)
        }
```
**Reponse Body:**
```json
    {
        "message": string,
        "success": boolean
    }
```

### Update Venue Details
**Endpoint:** `PATCH /api/venues/:id`  
**Headers:** Authorization: Bearer `<token>`  
**Description:** Update Venue Details

**Request Body(all optional):**
```json
      {
            "id": string, 
            "userId":string,
            "description":string,
            "address":string,
            "ameneties":string[], (optional)
            "capacity":number,  (optional)
            "images":string[] (optional)
        } 
```
**Reponse Body:**
```json
    {
        "message": string,
        "success": boolean
    }
```
