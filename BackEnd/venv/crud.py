from sqlalchemy.orm import Session
from models import Task

def get_tasks(db: Session):
    return db.query(Task).all()

def create_task(db: Session, title: str):
    task = Task(title=title)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def update_task(db: Session, task_id: int, title: str, completed: bool):
    task = db.query(Task).get(task_id)
    if task:
        task.title = title
        task.completed = completed
        db.commit()
    return task

def delete_task(db: Session, task_id: int):
    task = db.query(Task).get(task_id)
    if task:
        db.delete(task)
        db.commit()
