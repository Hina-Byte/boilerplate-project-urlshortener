# URL Shortener Microservice

This is the boilerplate code for the URL Shortener Microservice project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice.

# URL Shortener Microservice

Build a full stack JavaScript app that shortens URLs and redirects users to the original URL.

This project is functionally similar to [FreeCodeCamp URL Shortener Microservice](https://url-shortener-microservice.freecodecamp.rocks/).

## Features

- Create a short URL from a valid URL via a POST request.
- Redirect to the original URL when accessing the short URL.
- Validate URLs using Node.js `dns.lookup`.
- Return JSON responses for API endpoints.

## API Usage

### 1. Create a Short URL

**POST** `/api/shorturl`

- Request body (application/x-www-form-urlencoded):

```text
url=https://www.example.com
