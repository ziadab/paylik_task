from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
import os

engine = create_engine(os.getenv("POSTGRESQL_URL"))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
