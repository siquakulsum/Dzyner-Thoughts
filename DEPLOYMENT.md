# Deployment Guide for Dzyner Thoughts

This guide provides instructions for deploying the Dzyner Thoughts interior design website to a production environment.

## Prerequisites

- Node.js 18+ installed on your server
- Git installed on your server
- Optional: PostgreSQL database (app will work without it using in-memory storage)

## Deployment Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Application

The application includes a build script that creates production-ready files:

```bash
./build.sh
```

This script will:
- Build the frontend and backend
- Create a production-ready start script (`start-prod.sh`)

### 4. Database Options

#### Option A: Using PostgreSQL (Recommended for Production)

Set the `DATABASE_URL` environment variable to your PostgreSQL connection string:

```bash
export DATABASE_URL=postgresql://username:password@hostname:port/database
```

#### Option B: Using In-Memory Storage (No Database Required)

If you don't provide a `DATABASE_URL`, the application will automatically use in-memory storage. This is great for testing and small deployments, but data will be lost when the server restarts.

### 5. Starting the Application

Run the production start script:

```bash
./start-prod.sh
```

By default, the application will run on port 5000, but you can override this with the `PORT` environment variable:

```bash
PORT=8080 ./start-prod.sh
```

### Deploying to Render

1. Create a new Web Service on Render
2. Connect your repository
3. Configure the build settings:
   - Build Command: `./build.sh`
   - Start Command: `./start-prod.sh`

4. (Optional) Add environment variables:
   - `DATABASE_URL` - If you want to use a PostgreSQL database
   - `PORT` - This will be set automatically by Render

### Troubleshooting

- If you see "No DATABASE_URL found, using memory storage" in the logs, this is normal when not using PostgreSQL
- The application will initialize default services and projects on first startup

## Maintenance

- To update the application, pull the latest changes and rebuild:
  ```bash
  git pull
  ./build.sh
  ./start-prod.sh
  ```