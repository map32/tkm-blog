#!/bin/sh

# Set the script to exit immediately if any command fails
set -e

# 1. START THE DATA IMPORT IN THE BACKGROUND
# We wrap the Python command in a subshell (...) and add '&' at the end.
# This makes the subshell run in the background, allowing the script
# to continue immediately to the next command.
echo "🚀 Starting data import in the background..."
(
  # Add a small delay, just in case the app needs a moment before running scripts.
  # This is optional but can sometimes prevent race conditions.
  sleep 5
  python -m app.scripts.import_data
  # This message will appear in the logs once the background task is complete.
  echo "✅ Background data import has finished."
) &

# 2. START THE WEB SERVER IN THE FOREGROUND
# This command starts immediately and does not wait for the background
# process to finish. 'exec' is crucial as it replaces the shell process
# with the uvicorn process, ensuring proper signal handling by Render.
echo "🚀 Starting Uvicorn server on port 10000..."
exec uvicorn app.main:app --host 0.0.0.0 --port 10000