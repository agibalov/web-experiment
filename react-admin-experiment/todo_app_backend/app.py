import enum
import strawberry
from typing import Optional, List, Dict
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

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

@strawberry.type
class Query:
    @strawberry.field(name="allTodos")
    def allTodos(self, 
                 page: Optional[int] = None, 
                 perPage: Optional[int] = None, 
                 sortField: Optional[str] = None, 
                 sortOrder: Optional[str] = None, 
                 filter: Optional[TodoFilter] = None) -> List[Todo]:

        return [Todo(id=111, title="Test todo", done=True)]
    
    @strawberry.field(name="_allTodosMeta")
    def _allTodosMeta(self,
                      page: Optional[int] = None, 
                      perPage: Optional[int] = None, 
                      sortField: Optional[str] = None, 
                      sortOrder: Optional[str] = None, 
                      filter: Optional[TodoFilter] = None) -> ListMetadata:
        
        return ListMetadata(count=1)
    
    @strawberry.field
    def Todo(self, id: strawberry.ID) -> Optional[Todo]:
        return Todo(id=111, title="Test todo", done=True)


schema = strawberry.Schema(query=Query)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(GraphQLRouter(schema), prefix="/graphql")
