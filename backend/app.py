from fastapi import FastAPI
from api import router as apiRoutes

app = FastAPI();

app.include_router(apiRoutes)