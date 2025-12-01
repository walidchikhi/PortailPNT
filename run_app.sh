#!/bin/bash

# Kill any process using port 39313
PID=$(lsof -ti:4173)
if [ -n "$PID" ]; then
    echo "Killing process on port 4173 (PID: $PID)"
    kill -9 $PID
fi

# Run the app
npm run build
npm run dev -- --host 0.0.0.0 --port 4173

