from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import SessionLocal, engine, Base
from models import User, TaskDB

# テーブル作成
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------
# Schema
# -----------------

class UserCreate(BaseModel):
    name: str


class TaskCreate(BaseModel):
    title: str
    done: bool = False
    user_id: int

class TaskUpdate(BaseModel):
	done: bool
# -----------------
# DB接続
# -----------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -----------------
# User API
# -----------------

@app.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(
        name=user.name
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

# -----------------
# Task API
# -----------------

@app.post("/tasks")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = TaskDB(
        title=task.title,
        done=task.done,
        user_id=task.user_id
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


@app.get("/tasks")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(TaskDB).all()


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(TaskDB).filter(TaskDB.id == task_id).first()

    if not task:
        return {"message": "Not Found"}

    db.delete(task)
    db.commit()

    return {"message": "Deleted"}

@app.patch("/tasks/{task_id}")
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
	db_task = db.query(TaskDB).filter(TaskDB.id == task_id).first()
	
	if not task:
		return {"message": "Not Found"}
		
	db_task.done = task.done
	db.commit()
	db.refresh(db_task)
	
	return db_task
	
