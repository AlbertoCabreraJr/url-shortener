# URL Shortening Service

This is a simple RESTful API built with Node.js, Express.js, and PostgreSQL that allows users to shorten long URLs. It supports creating, retrieving, updating, deleting short URLs, and tracking how many times each short URL has been accessed.

## Features

- Create a new short URL
- Retrieve original URL using a short code
- Update the original URL for a given short code
- Delete a short URL
- View access statistics (number of times a short URL was visited)

## Testing the API
Create a short URL
```
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.example.com"}'
```

Update original url
```
curl -X PUT http://localhost:3000/shorten/abc123 \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.updated-example.com"}'
```

Delete a short url
```
curl -X DELETE http://localhost:3000/shorten/abc123
```

Get stats for a short URL
```
curl http://localhost:3000/shorten/abc123/stats
```

Visiting a shorten url. Pass the shortcode
```
http://localhost:3000/abc123
```
