#!/bin/sh

# Run the initialization script.
# Because volumes are already mounted, the os.path.exists() checks
# will work against the persistent data, not an empty build directory.
echo "🚀 Checking if database and images need initialization..."
python -m app.scripts.import_data
echo "✅ Initialization check complete."

# Execute the command passed to the script (the Dockerfile's CMD)
# The 'exec' command replaces the shell process with the new process,
# which is important for proper signal handling (like Ctrl+C).
uvicorn app.main:app --host 0.0.0.0 --port 8000