# API Documentation

Base URL: `/api/v1`

---

## Meta Module

Manage branding information for the application.

### Get Meta Information

**Endpoint**: `GET /meta`

**Response**:

```json
{
  "success": true,
  "message": "Meta information retrieved successfully",
  "data": {
    "logoUrl": "string",
    "title": "string",
    "slogan": "string",
    "createdAt": "date-time",
    "updatedAt": "date-time",
    "id": "string"
  }
}
```

### Update/Create Meta Information

**Endpoint**: `POST /meta`

**Request Body**:

```json
{
  "logoUrl": "string",
  "title": "string",
  "slogan": "string"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Meta information updated successfully",
  "data": { ... }
}
```

---

## Overview Module

Retrieve interaction summary and statistics.

### Get Overview Statistics

**Endpoint**: `GET /overview`

**Response**:

```json
{
  "success": true,
  "message": "Overview statistics retrieved successfully",
  "data": {
    "uniqueMessageUsers": {
      "total": number,
      "thisMonth": number
    },
    "uniqueCommentUsers": {
      "total": number,
      "thisMonth": number
    },
    "messages": {
      "replied": number,
      "received": number
    },
    "comments": {
      "replied": number,
      "received": number
    },
    "disabled": {
      "messages": number,
      "comments": number
    },
    "reachData": [
      { "date": "string", "value": number }
    ],
    "engagementData": [
      { "date": "string", "likes": number, "comments": number, "shares": number }
    ],
    "recentActivity": [
      {
        "icon": "string",
        "title": "string",
        "description": "string",
        "time": "string (ISO)",
        "color": "string",
        "link": "string (optional)"
      }
    ],
    "demographics": [
      { "name": "string", "value": number, "color": "string" }
    ],
    "topLocations": [
      { "country": "string", "percentage": number }
    ]
  }
}
```
