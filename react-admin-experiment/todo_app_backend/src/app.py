import strawberry
from typing import Optional, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter
from sqlalchemy import desc, asc

from .database import TodoDB, get_db, initialize_database

@strawberry.type
class Todo:
    id: strawberry.ID
    title: str
    done: bool

@strawberry.input
class TodoFilter:
    title: Optional[str] = None
    done: Optional[bool] = None

@strawberry.type
class ListMetadata:
    count: int

def get_db_session():
    return next(get_db())

@strawberry.type
class Query:
    @strawberry.field(name="allTodos")
    def allTodos(self, 
                 page: Optional[int] = None, 
                 perPage: Optional[int] = None, 
                 sortField: Optional[str] = None, 
                 sortOrder: Optional[str] = None, 
                 filter: Optional[TodoFilter] = None) -> List[Todo]:

        db = get_db_session()
        
        try:
            query = db.query(TodoDB)
            
            if filter:
                if filter.title:
                    query = query.filter(TodoDB.title.contains(filter.title))
                if filter.done is not None:
                    query = query.filter(TodoDB.done == filter.done)
            
            if sortField:
                if sortField == "id":
                    query = query.order_by(desc(TodoDB.id) if sortOrder == "DESC" else asc(TodoDB.id))
                elif sortField == "title":
                    query = query.order_by(desc(TodoDB.title) if sortOrder == "DESC" else asc(TodoDB.title))
                elif sortField == "done":
                    query = query.order_by(desc(TodoDB.done) if sortOrder == "DESC" else asc(TodoDB.done))
            
            if page is not None and perPage is not None:
                query = query.offset(page * perPage).limit(perPage)

            db_todos = query.all()
            return [Todo(id=str(todo.id), title=todo.title, done=todo.done) for todo in db_todos]
        finally:
            db.close()
    
    @strawberry.field(name="_allTodosMeta")
    def _allTodosMeta(self,
                      page: Optional[int] = None, 
                      perPage: Optional[int] = None, 
                      sortField: Optional[str] = None, 
                      sortOrder: Optional[str] = None, 
                      filter: Optional[TodoFilter] = None) -> ListMetadata:
        
        db = get_db_session()
        
        try:
            query = db.query(TodoDB)
            
            if filter:
                if filter.title:
                    query = query.filter(TodoDB.title.contains(filter.title))
                if filter.done is not None:
                    query = query.filter(TodoDB.done == filter.done)
            
            count = query.count()
            return ListMetadata(count=count)
        finally:
            db.close()
    
    @strawberry.field
    def Todo(self, id: strawberry.ID) -> Optional[Todo]:
        db = get_db_session()
        
        try:
            db_todo = db.query(TodoDB).filter(TodoDB.id == int(id)).first()
            if db_todo:
                return Todo(id=str(db_todo.id), title=db_todo.title, done=db_todo.done)
            return None
        finally:
            db.close()

@strawberry.type
class Mutation:
    @strawberry.mutation
    def createTodo(self, title: str, done: bool = False) -> Todo:
        db = get_db_session()
        
        try:
            db_todo = TodoDB(title=title, done=done)
            db.add(db_todo)
            db.commit()
            db.refresh(db_todo)
            return Todo(id=str(db_todo.id), title=db_todo.title, done=db_todo.done)
        finally:
            db.close()
    
    @strawberry.mutation
    def updateTodo(self, id: strawberry.ID, title: Optional[str] = None, done: Optional[bool] = None) -> Optional[Todo]:
        db = get_db_session()
        
        try:
            db_todo = db.query(TodoDB).filter(TodoDB.id == int(id)).first()
            if db_todo:
                if title is not None:
                    db_todo.title = title
                if done is not None:
                    db_todo.done = done
                db.commit()
                db.refresh(db_todo)
                return Todo(id=str(db_todo.id), title=db_todo.title, done=db_todo.done)
            return None
        finally:
            db.close()
    
    @strawberry.mutation
    def deleteTodo(self, id: strawberry.ID) -> Optional[Todo]:
        db = get_db_session()
        
        try:
            db_todo = db.query(TodoDB).filter(TodoDB.id == int(id)).first()
            if db_todo:
                deleted_todo = Todo(id=str(db_todo.id), title=db_todo.title, done=db_todo.done)
                db.delete(db_todo)
                db.commit()
                return deleted_todo
            return None
        finally:
            db.close()

schema = strawberry.Schema(query=Query, mutation=Mutation)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(GraphQLRouter(schema), prefix="/graphql")

initialize_database(todo_count=1000)
