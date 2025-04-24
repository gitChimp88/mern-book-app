# MERN book app example

This repository contains a MERN stack application for submitting and viewing book reviews. It includes:

- `server/` – Express.js backend with MongoDB integration
- `client/` – React frontend **without** Contentful integration
- `client_contentful/` – React frontend **with** Contentful integration

---

Link to article here - ...

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mern-book-app.git
cd mern-book-app
```

## Server

Install dependencies

``` bash
cd server
npm install
```
Create a `.env` file with:

```
MONGO_URI="mongodb://username:password@host:port/database"
```

### Run the server

To start the server run the below:

``` bash
npm run start
```

Server runs on: `http://localhost:3000`

## Client (No contentful)

### Install dependencies

``` bash
cd client
npm install
```

### Run the app

``` bash
npm run dev
```

Runs on `http://localhost:5173`

## Client (With Contentful)

### Install dependencies

``` bash
cd client_contentful
npm install
```

### Create a `.env`file with:

```
VITE_CF_SPACE_ID=your_contentful_space_id
VITE_CF_CMA_TOKEN=your_contentful_management_api_token
```

### Run the app

``` bash
npm run dev
```

Runs on `http://localhost:5173`
