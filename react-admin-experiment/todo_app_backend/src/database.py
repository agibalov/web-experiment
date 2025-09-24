from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from urllib.parse import urlparse
from alembic.config import Config
from alembic import command

from .seed import generate_seed_data

SQLALCHEMY_DATABASE_URL = "sqlite:///./todos.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class TodoDB(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    done = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

def create_tables():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")

def drop_tables():
    parsed_url = urlparse(SQLALCHEMY_DATABASE_URL)
    db_file = parsed_url.path.lstrip('/')
    if os.path.exists(db_file):
        os.remove(db_file)

def reset_database():
    engine.dispose()
    drop_tables()
    create_tables()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
def initialize_database(todo_count: int = 1000):
    print("Resetting database...")
    reset_database()
    
    print(f"Populating database with {todo_count} fresh todos...")
    
    db = SessionLocal()
    
    try:
        seed_todos = generate_seed_data(todo_count)
        todos = []
        
        for todo_data in seed_todos:
            todo = TodoDB(
                title=todo_data["title"], 
                done=todo_data["done"],
                created_at=todo_data["created_at"],
                updated_at=todo_data["updated_at"]
            )
            todos.append(todo)
        
        db.add_all(todos)
        db.commit()
        
        print(f"Successfully populated database with {len(todos)} todos!")
        
    except Exception as e:
        print(f"Error populating database: {e}")
        db.rollback()
        raise
    finally:
        db.close()