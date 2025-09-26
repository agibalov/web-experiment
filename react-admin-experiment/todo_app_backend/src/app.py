import strawberry
from typing import Optional, List, Annotated
from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter
from sqlalchemy import desc, asc, func, literal_column

from src.fts import build_match

from .database import TodoDB, TodoFTSDB, get_db, initialize_database

UTCDateTime = Annotated[datetime, strawberry.scalar(
    serialize=lambda v: v.replace(tzinfo=timezone.utc).isoformat().replace('+00:00', 'Z') if v else None,
    parse_value=lambda v: datetime.fromisoformat(v.replace('Z', '+00:00')) if v else None,
)]

@strawberry.type
class Todo:
    id: strawberry.ID
    title: str
    done: bool
    created_at: UTCDateTime
    updated_at: UTCDateTime

@strawberry.input
class TodoFilter:
    title: Optional[str] = None
    done: Optional[bool] = None
    q: Optional[str] = None

@strawberry.type
class ListMetadata:
    count: int

def get_db_session():
    return next(get_db())

def apply_todo_filter(query, filter: Optional[TodoFilter]):
    if filter:
        if filter.q:
            match_expr = build_match(filter.q)
            if match_expr:
                query = query.join(TodoFTSDB, TodoFTSDB.rowid == TodoDB.id) \
                    .filter(literal_column(TodoFTSDB.__tablename__).op("MATCH")(match_expr)) \
                    .order_by(func.bm25(literal_column(TodoFTSDB.__tablename__)))
        if filter.title:
            query = query.filter(TodoDB.title.contains(filter.title))
        if filter.done is not None:
            query = query.filter(TodoDB.done == filter.done)
    return query

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
            query = apply_todo_filter(query, filter)

            if sortField:
                if sortField == "id":
                    query = query.order_by(desc(TodoDB.id) if sortOrder == "DESC" else asc(TodoDB.id))
                elif sortField == "title":
                    query = query.order_by(desc(TodoDB.title) if sortOrder == "DESC" else asc(TodoDB.title))
                elif sortField == "done":
                    query = query.order_by(desc(TodoDB.done) if sortOrder == "DESC" else asc(TodoDB.done))
                elif sortField == "createdAt":
                    query = query.order_by(desc(TodoDB.created_at) if sortOrder == "DESC" else asc(TodoDB.created_at))
                elif sortField == "updatedAt":
                    query = query.order_by(desc(TodoDB.updated_at) if sortOrder == "DESC" else asc(TodoDB.updated_at))

            if page is not None and perPage is not None:
                query = query.offset(page * perPage).limit(perPage)

            db_todos = query.all()
            return [Todo(id=str(todo.id), title=todo.title, done=todo.done, created_at=todo.created_at, updated_at=todo.updated_at) for todo in db_todos]
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
            query = apply_todo_filter(query, filter)
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
                return Todo(id=str(db_todo.id), title=db_todo.title, done=db_todo.done, created_at=db_todo.created_at, updated_at=db_todo.updated_at)
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
            return Todo(id=str(db_todo.id), title=db_todo.title, done=db_todo.done, created_at=db_todo.created_at, updated_at=db_todo.updated_at)
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
                return Todo(id=str(db_todo.id), title=db_todo.title, done=db_todo.done, created_at=db_todo.created_at, updated_at=db_todo.updated_at)
            return None
        finally:
            db.close()

    @strawberry.mutation
    def deleteTodo(self, id: strawberry.ID) -> Optional[Todo]:
        db = get_db_session()

        try:
            db_todo = db.query(TodoDB).filter(TodoDB.id == int(id)).first()
            if db_todo:
                deleted_todo = Todo(id=str(db_todo.id), title=db_todo.title, done=db_todo.done, created_at=db_todo.created_at, updated_at=db_todo.updated_at)
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
