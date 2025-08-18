from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .database import init_db
from . import auth, posts, plants
import os

app = FastAPI(title="Korean Traditional Medicine — Plants & Blog API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(auth.router)
app.include_router(posts.router)
app.include_router(plants.router)

# Serve built SPA (frontend) if present
frontend_dir = '/app/static'
static_dir = '/app/app/static/plants'
img_dir = '/app/app/static/plants/1_0.jpg'
print(frontend_dir)
print(static_dir)
print(img_dir)
if os.path.exists(static_dir):
    print(static_dir + ' found')
    if os.path.exists(img_dir):
        print(img_dir + ' found')
    else:
        print(img_dir + ' not found')
    app.mount("/plants", StaticFiles(directory=static_dir), name="backend_static")
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")
else:
    print('not found')

# Health check
@app.get("/api/health")
def health():
    return {"ok": True}