from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from crud import get_tasks, create_task, update_task, delete_task

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/tasks")
def read_tasks(db: Session = Depends(get_db)):
    return get_tasks(db)

@app.post("/tasks")
def add_task(title: str, db: Session = Depends(get_db)):
    return create_task(db, title)

@app.put("/tasks/{task_id}")
def edit_task(task_id: int, title: str, completed: bool, db: Session = Depends(get_db)):
    return update_task(db, task_id, title, completed)

@app.delete("/tasks/{task_id}")
def remove_task(task_id: int, db: Session = Depends(get_db)):
    delete_task(db, task_id)
    return {"message": "Task deleted"}
