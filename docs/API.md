# API Documentation

## Base URL
```
/api/v1
```

## Authentication

Most endpoints require authentication via JWT tokens. The tokens are sent via cookies (`accessToken` and `refreshToken`) or can be included in the Authorization header.

---

## 1. Authentication Endpoints

### 1.1 Login
**POST** `/api/v1/auth/login`

Authenticate a user and receive access tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login Success",
  "data": {
    "token": "jwt_access_token",
    // ... other user data
  }
}
```

**Cookies Set:**
- `accessToken`: JWT access token
- `refreshToken`: JWT refresh token

---

### 1.2 Logout
**POST** `/api/v1/auth/logout`

Log out the current user and clear authentication cookies.

**Response:**
```json
{
  "success": true,
  "message": "Logout Successfully",
  "data": null
}
```

---

### 1.3 Reset Password
**POST** `/api/v1/auth/reset-password`

Reset user password. Requires ADMIN role.

**Headers:**
- Authorization: Bearer token (required)
- Role: ADMIN (required)

**Request Body:**
```json
{
  "oldPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "password reset successfully",
  "data": {
    // User object
  }
}
```

---

## 2. Audience Endpoints

### 2.1 Create Audience
**POST** `/api/v1/audience`

Create a new audience member. If an audience with the same `userid` already exists, the existing audience will be returned instead of creating a duplicate.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "userid": "user123",
  "gender": "male",
  "isMessageEnabled": true,
  "isCommentEnabled": true,
  "profile": "https://example.com/profile.jpg",
  "isAdmin": false
}
```

**Response (New Audience):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Audience created successfully",
  "data": {
    // Audience object
  }
}
```

**Response (Existing Audience):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Audience already exists",
  "data": {
    // Existing audience object
  }
}
```

**Note:** The endpoint checks for existing audiences by `userid`. If found, it returns the existing audience with message "Audience already exists". If not found, it creates a new audience.

---

### 2.2 Get All Audiences
**GET** `/api/v1/audience`

Retrieve all audience members.

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Audiences retrieved successfully",
  "data": [
    {
      // Audience objects
    }
  ]
}
```

---

### 2.3 Get Audience by ID
**GET** `/api/v1/audience/:id`

Retrieve a specific audience member by ID.

**Parameters:**
- `id` (path parameter): Audience ID

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Audience retrieved successfully",
  "data": {
    // Audience object
  }
}
```

---

### 2.4 Check Message Enabled Status
**GET** `/api/v1/audience/:id/message-enabled`

Check if messaging is enabled for a specific audience member.

**Parameters:**
- `id` (path parameter): Audience ID

**Response (Success):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Message enabled status retrieved successfully",
  "data": {
    "isMessageEnabled": true
  }
}
```

**Response (Not Found):**
```json
{
  "statusCode": 404,
  "success": false,
  "message": "Audience not found",
  "data": null
}
```

---

### 2.5 Check Comment Enabled Status
**GET** `/api/v1/audience/:id/comment-enabled`

Check if commenting is enabled for a specific audience member.

**Parameters:**
- `id` (path parameter): Audience ID

**Response (Success):**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Comment enabled status retrieved successfully",
  "data": {
    "isCommentEnabled": true
  }
}
```

**Response (Not Found):**
```json
{
  "statusCode": 404,
  "success": false,
  "message": "Audience not found",
  "data": null
}
```

---

### 2.6 Update Audience
**PATCH** `/api/v1/audience/:id`

Update an existing audience member.

**Parameters:**
- `id` (path parameter): Audience ID

**Request Body:**
```json
{
  "name": "Updated Name",
  "isMessageEnabled": false
  // ... other fields to update
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Audience updated successfully",
  "data": {
    // Updated audience object
  }
}
```

---

### 2.7 Delete Audience
**DELETE** `/api/v1/audience/:id`

Delete an audience member.

**Parameters:**
- `id` (path parameter): Audience ID

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Audience deleted successfully",
  "data": {
    // Deleted audience object
  }
}
```

---

## 3. Messages Endpoints

### 3.1 Create Message
**POST** `/api/v1/messages`

Send a new message.

**Request Body:**
```json
{
  "sender": "user123",
  "receiver": "user456",
  "content": "Hello, how are you?",
  "contentType": "text",
  "isRead": false
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Message sent successfully",
  "data": {
    // Message object
  }
}
```

---

### 3.2 Get Conversations
**GET** `/api/v1/messages/conversations?userId=user123`

Get all conversations for a specific user.

**Query Parameters:**
- `userId` (required): User ID

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Conversations retrieved successfully",
  "data": [
    {
      // Conversation objects
    }
  ]
}
```

---

### 3.3 Get Conversation
**GET** `/api/v1/messages?userId=user123&otherUserId=user456`

Get messages between two users.

**Query Parameters:**
- `userId` (required): First user ID
- `otherUserId` (required): Second user ID

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Conversation retrieved successfully",
  "data": [
    {
      // Message objects
    }
  ]
}
```

---

### 3.4 Mark Message as Read
**PATCH** `/api/v1/messages/:id/read`

Mark a message as read.

**Parameters:**
- `id` (path parameter): Message ID

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Message marked as read",
  "data": {
    // Updated message object
  }
}
```

---

## 4. Comments Endpoints

### 4.1 Create Comment
**POST** `/api/v1/comments`

Create a new comment on a post.

**Request Body:**
```json
{
  "postId": "post123",
  "content": "Great post!",
  "parentId": null,
  "userId": "user123"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Comment created successfully",
  "data": {
    // Comment object
  }
}
```

---

### 4.2 Get All Comments
**GET** `/api/v1/comments`

Retrieve all comments.

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "All comments retrieved successfully",
  "data": [
    {
      // Comment objects
    }
  ]
}
```

---

### 4.3 Get Post Comments
**GET** `/api/v1/comments/post/:postId`

Get all comments for a specific post.

**Parameters:**
- `postId` (path parameter): Post ID

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Comments retrieved successfully",
  "data": [
    {
      // Comment objects
    }
  ]
}
```

---

### 4.4 Update Comment
**PATCH** `/api/v1/comments/:id`

Update a comment.

**Parameters:**
- `id` (path parameter): Comment ID

**Request Body:**
```json
{
  "content": "Updated comment text"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Comment updated successfully",
  "data": {
    // Updated comment object
  }
}
```

---

### 4.5 Delete Comment
**DELETE** `/api/v1/comments/:id`

Delete a comment.

**Parameters:**
- `id` (path parameter): Comment ID

**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Comment deleted successfully",
  "data": {
    // Deleted comment object
  }
}
```

---

## 5. Posts Endpoints

### 5.1 Create Post
**POST** `/api/v1/posts`

Create a new post.

**Request Body:**
```json
{
  "caption": "This is my post caption",
  "image": "https://example.com/image.jpg",
  "likes": 0,
  "comments": 0,
  "shares": 0,
  "reach": 0,
  "userId": "user123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    // Post object
  }
}
```

---

### 5.2 Get All Posts
**GET** `/api/v1/posts`

Retrieve all posts.

**Response:**
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": [
    {
      // Post objects
    }
  ]
}
```

---

### 5.3 Get Post by ID
**GET** `/api/v1/posts/:id`

Retrieve a specific post by ID.

**Parameters:**
- `id` (path parameter): Post ID

**Response:**
```json
{
  "success": true,
  "message": "Post retrieved successfully",
  "data": {
    // Post object
  }
}
```

---

## Data Models

### Audience Model
```typescript
{
  name: string;
  email: string;
  userid: string;
  gender: string;
  isMessageEnabled: boolean;
  isCommentEnabled: boolean;
  profile?: string;
  isAdmin?: boolean;
}
```

### Message Model
```typescript
{
  sender: string;
  receiver: string;
  content: string;
  contentType: string; // e.g., 'text', 'image', 'video'
  isRead: boolean;
}
```

### Post Model
```typescript
{
  caption: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  userId?: string;
}
```

### Comment Model
```typescript
{
  postId: string;
  content: string;
  parentId: string | null;
  userId: string;
}
```

---

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error message",
  "errorMessages": [
    {
      "path": "fieldName",
      "message": "Error description"
    }
  ],
  "stack": "Error stack (development only)"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## File Uploads

Static files are served from:
```
/files
```

Uploaded files are accessible via:
```
/files/{filename}
```

---

## Notes

- All timestamps are in ISO 8601 format
- All IDs are MongoDB ObjectIds
- Request body size limit: 50MB
- CORS is enabled with credentials support
- Cookies are set with `httpOnly`, `secure`, and `sameSite: none` flags

---

## Example Usage

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' \
  -c cookies.txt
```

**Create Post (with authentication):**
```bash
curl -X POST http://localhost:5000/api/v1/posts \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"caption":"My post","likes":0,"comments":0,"shares":0,"reach":0}'
```

### Using JavaScript (Fetch API)

```javascript
// Login
const loginResponse = await fetch('http://localhost:5000/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const loginData = await loginResponse.json();

// Create Post
const postResponse = await fetch('http://localhost:5000/api/v1/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    caption: 'My post',
    likes: 0,
    comments: 0,
    shares: 0,
    reach: 0
  })
});

const postData = await postResponse.json();
```

---

*Last Updated: 2024*

