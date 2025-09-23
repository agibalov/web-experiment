import enum
import strawberry
from typing import Optional, List, Dict
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

# --- In-memory store ---
_STORE: Dict[int, dict] = {}
_NEXT_ID = 1

def _new_id() -> int:
    global _NEXT_ID
    i = _NEXT_ID
    _NEXT_ID += 1
    return i

@strawberry.enum
class SortOrder(enum.Enum):
    ASC = "asc"
    DESC = "desc"

@strawberry.input
class TodoSort:
    field: str
    order: SortOrder = SortOrder.ASC

@strawberry.type
class Todo:
    id: int
    title: str
    done: bool

@strawberry.type
class TodosPage:
    items: List[Todo]
    total: int

@strawberry.input
class TodoCreateInput:
    title: str
    done: bool = False

@strawberry.input
class TodoUpdateInput:
    title: Optional[str] = None
    done: Optional[bool] = None

# --- Query (R) ---
@strawberry.type
class Query:
    @strawberry.field
    def todos(self,
              skip: Optional[int] = None,
              take: Optional[int] = None,
              sort: Optional[List[TodoSort]] = None) -> TodosPage:
        
        print(f"skip={skip} take={take} sorting={sort}")
        
        rows = [Todo(**v) for v in _STORE.values()]
        
        if sort is not None:
            for sort in reversed(sort):
                rows.sort(
                    key=lambda x: getattr(x, sort.field), 
                    reverse=sort.order == SortOrder.DESC)
        
        if skip is not None:
            rows = rows[skip:]
        if take is not None:
            rows = rows[:take]

        return TodosPage(items=rows, total=len(_STORE))
    
    @strawberry.field
    def todo(self, id: int) -> Optional[Todo]:
        data = _STORE.get(id)
        return Todo(**data) if data else None

# --- Mutations (CUD) ---
@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_todo(self, data: TodoCreateInput) -> Todo:
        tid = _new_id()
        _STORE[tid] = {"id": tid, "title": data.title, "done": data.done}
        return Todo(**_STORE[tid])

    @strawberry.mutation
    def update_todo(self, id: int, patch: TodoUpdateInput) -> Optional[Todo]:
        if id not in _STORE:
            return None
        if patch.title is not None:
            _STORE[id]["title"] = patch.title
        if patch.done is not None:
            _STORE[id]["done"] = patch.done
        return Todo(**_STORE[id])

    @strawberry.mutation
    def delete_todo(self, id: int) -> bool:
        return _STORE.pop(id, None) is not None

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

for i in range(500):
    tid = _new_id()
    _STORE[tid] = {"id": tid, "title": f"Dummy todo #{i+1}", "done": False}
