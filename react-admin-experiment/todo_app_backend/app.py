import strawberry
from typing import Optional, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

# In-memory storage for todos
TODOS = [
    {"id": "1", "title": "Learn Python", "done": False},
    {"id": "2", "title": "Build a GraphQL API", "done": True},
    {"id": "3", "title": "Create React frontend", "done": False},
    {"id": "4", "title": "Deploy to production", "done": False},
    {"id": "5", "title": "Write documentation", "done": True},
    {"id": "6", "title": "Set up monitoring", "done": False},
    {"id": "7", "title": "Implement authentication", "done": False},
    {"id": "8", "title": "Add unit tests", "done": True},
    {"id": "9", "title": "Configure CI/CD", "done": False},
    {"id": "10", "title": "Optimize performance", "done": False},
]

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

        # Start with all todos
        todos = TODOS.copy()
        
        # Apply filters
        if filter:
            if filter.title:
                todos = [todo for todo in todos if filter.title.lower() in todo["title"].lower()]
            if filter.done is not None:
                todos = [todo for todo in todos if todo["done"] == filter.done]
        
        # Apply sorting
        if sortField:
            reverse = sortOrder == "DESC" if sortOrder else False
            if sortField == "id":
                todos.sort(key=lambda x: int(x["id"]), reverse=reverse)
            elif sortField == "title":
                todos.sort(key=lambda x: x["title"], reverse=reverse)
            elif sortField == "done":
                todos.sort(key=lambda x: x["done"], reverse=reverse)
        
        # Apply pagination
        if page is not None and perPage is not None:
            start = page * perPage
            end = start + perPage
            todos = todos[start:end]

        # Convert to Todo objects
        return [Todo(id=todo["id"], title=todo["title"], done=todo["done"]) for todo in todos]
    
    @strawberry.field(name="_allTodosMeta")
    def _allTodosMeta(self,
                      page: Optional[int] = None, 
                      perPage: Optional[int] = None, 
                      sortField: Optional[str] = None, 
                      sortOrder: Optional[str] = None, 
                      filter: Optional[TodoFilter] = None) -> ListMetadata:
        
        # Start with all todos
        todos = TODOS.copy()
        
        # Apply the same filters as allTodos to get accurate count
        if filter:
            if filter.title:
                todos = [todo for todo in todos if filter.title.lower() in todo["title"].lower()]
            if filter.done is not None:
                todos = [todo for todo in todos if todo["done"] == filter.done]
        
        return ListMetadata(count=len(todos))
    
    @strawberry.field
    def Todo(self, id: strawberry.ID) -> Optional[Todo]:
        # Find the todo with matching id
        for todo in TODOS:
            if todo["id"] == str(id):
                return Todo(id=todo["id"], title=todo["title"], done=todo["done"])
        return None


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
