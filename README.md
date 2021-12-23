# Image Processor API

This project allows you to fetch images from the API server. If sizing parameters are specified then it will resize the image and cache it locally.

## Installation

1. Clone this repo to your development directory
2. Run 'npm install' from that directory to address package dependencies

## Command Usage

'npm run test' - This will run the jasmine testing framework

'npm run build' - This will compile the TypeScript code into JavaScript in the ./dist directory

'npm run start' - This will run nodemon and restart the server on any change to the TypeScript source code

'npm run prettier' - This will execute prettier and reformat the code according to the prettier configuration

'npm run lint' - This will run eslint and return any linting errors

## API Usage
The API server will listen on port 3000.

To get a full sized image
```
GET - http://localhost:3000/images?filename=<image-name.extension>
```

To get a resized image
```
GET - http://localhost:3000/images?filename=<image-name.extension>&width=<int>&height=<int>
```

## Contact
[CharlieGut14@gmail.com](charliegut14@gmail.com)
