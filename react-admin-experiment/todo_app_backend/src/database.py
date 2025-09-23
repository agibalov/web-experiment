from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from urllib.parse import urlparse
from alembic.config import Config
from alembic import command

SQLALCHEMY_DATABASE_URL = "sqlite:///./todos.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class TodoDB(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    done = Column(Boolean, default=False)

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