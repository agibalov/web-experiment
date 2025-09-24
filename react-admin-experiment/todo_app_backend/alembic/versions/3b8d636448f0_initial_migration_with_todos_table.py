"""Initial migration with todos table

Revision ID: 3b8d636448f0
Revises: 
Create Date: 2025-09-23 17:43:06.656250

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = '3b8d636448f0'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE todos (
            id INTEGER NOT NULL PRIMARY KEY,
            title VARCHAR,
            done BOOLEAN,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    op.execute("CREATE INDEX ix_todos_id ON todos (id)")
    op.execute("CREATE INDEX ix_todos_title ON todos (title)")
    op.execute("CREATE INDEX ix_todos_done ON todos (done)")
    op.execute("CREATE INDEX ix_todos_created_at ON todos (created_at)")
    op.execute("CREATE INDEX ix_todos_updated_at ON todos (updated_at)")


def downgrade() -> None:
    pass
