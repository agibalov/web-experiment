import strawberry
from typing import Optional, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

# In-memory storage for todos
def generate_todos():
    """Generate 1000 sample todos"""
    import random
    
    task_templates = [
        "Learn {}",
        "Build {}",
        "Create {}",
        "Deploy {}",
        "Write {}",
        "Set up {}",
        "Implement {}",
        "Add {}",
        "Configure {}",
        "Optimize {}",
        "Debug {}",
        "Test {}",
        "Review {}",
        "Refactor {}",
        "Document {}",
        "Install {}",
        "Update {}",
        "Fix {}",
        "Monitor {}",
        "Analyze {}"
    ]
    
    subjects = [
        "Python", "GraphQL API", "React frontend", "production environment",
        "documentation", "monitoring", "authentication", "unit tests", 
        "CI/CD pipeline", "performance", "database", "user interface",
        "API endpoints", "error handling", "logging", "caching",
        "security measures", "data validation", "backup system",
        "load balancing", "microservices", "containerization",
        "cloud deployment", "automated testing", "code reviews",
        "version control", "project structure", "dependencies",
        "configuration files", "environment variables", "SSL certificates",
        "database migrations", "user permissions", "rate limiting",
        "API documentation", "frontend components", "state management",
        "routing system", "form validation", "error boundaries",
        "responsive design", "accessibility features", "SEO optimization",
        "performance metrics", "user analytics", "A/B testing",
        "notification system", "email templates", "file uploads",
        "search functionality", "pagination", "data export",
        "reporting dashboard", "admin panel", "user profiles"
    ]
    
    todos = []
    for i in range(1, 1001):
        template = random.choice(task_templates)
        subject = random.choice(subjects)
        title = template.format(subject)
        done = random.choice([True, False])
        
        todos.append({
            "id": str(i),
            "title": title,
            "done": done
        })
    
    return todos

TODOS = generate_todos()

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

@strawberry.type
class Mutation:
    @strawberry.mutation
    def createTodo(self, title: str, done: bool = False) -> Todo:
        new_id = str(len(TODOS) + 1)
        new_todo = {"id": new_id, "title": title, "done": done}
        TODOS.append(new_todo)
        return Todo(id=new_id, title=title, done=done)
    
    @strawberry.mutation
    def updateTodo(self, id: strawberry.ID, title: Optional[str] = None, done: Optional[bool] = None) -> Optional[Todo]:
        for todo in TODOS:
            if todo["id"] == str(id):
                if title is not None:
                    todo["title"] = title
                if done is not None:
                    todo["done"] = done
                return Todo(id=todo["id"], title=todo["title"], done=todo["done"])
        return None
    
    @strawberry.mutation
    def deleteTodo(self, id: strawberry.ID) -> Optional[Todo]:
        global TODOS
        # Find the todo to delete first
        deleted = None
        for todo in TODOS:
            if todo["id"] == str(id):
                deleted = todo
                break
               
        # Remove the todo from the list
        TODOS = [todo for todo in TODOS if todo["id"] != str(id)]
        
        if deleted is None:
            return None        
        
        return Todo(id=deleted["id"], title=deleted["title"], done=deleted["done"])

schema = strawberry.Schema(query=Query, mutation=Mutation)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(GraphQLRouter(schema), prefix="/graphql")
