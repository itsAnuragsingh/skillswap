# SkillSwap API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All authenticated routes require a Bearer token in the Authorization header.

To get a token:
POST /users/token
Body: { "clerkId": "user_clerk_id" }
Response: { "token": "jwt_token" }

## User Routes

### Get User Profile
GET /users/profile
Headers: Authorization: Bearer <token>
Response: User object

### Update User Profile
PUT /users/profile
Headers: Authorization: Bearer <token>
Body: { "skills": ["skill1", "skill2"], "interests": ["interest1", "interest2"] }
Response: Updated user object

### Daily Login
POST /users/daily-login
Headers: Authorization: Bearer <token>
Response: { 
  "message": "Daily login bonus credited" | "Daily login bonus already claimed",
  "credits": number
}

## Note Routes

### Create Note
POST /notes
Headers: Authorization: Bearer <token>
Body: { "title": "Note Title", "content": "Note Content", "skill": "Related Skill" }
Response: { "message": "Note created and credits added", "note": Note object }

### Get User's Notes
GET /notes
Headers: Authorization: Bearer <token>
Response: Array of Note objects

## Idea Routes

### Submit Idea
POST /ideas
Headers: Authorization: Bearer <token>
Body: { "title": "Idea Title", "description": "Idea Description" }
Response: { "message": "Idea submitted and credits added", "idea": Idea object }

### Get User's Ideas
GET /ideas
Headers: Authorization: Bearer <token>
Response: Array of Idea objects
