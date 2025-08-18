# === Stage 1: Build frontend ===
FROM node:20-alpine AS frontend
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci || npm install
COPY frontend/ .
RUN npm run build

# === Stage 2: Backend ===
FROM python:3.11-slim AS backend
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/app ./app
# copy data and built frontend
COPY data /app/data
COPY --from=frontend /frontend/dist /app/static
COPY ./entry_render.sh .
RUN chmod +x ./entry_render.sh

EXPOSE 8000

ENTRYPOINT ["./entry_render.sh"]
