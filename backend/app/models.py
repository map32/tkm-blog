from typing import List, Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from sqlalchemy import String, Text, JSON, Column

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    password_hash: str

class PostBase(SQLModel):
    title: str
    body_markdown: str

class Post(PostBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    author_id: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PostRead(PostBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: datetime

class MedicinalPlant(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    name_ko: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    name_latin: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    name_en: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    pharmacopeia: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    source_species: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    family: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    medicinal_part: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    odor: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    taste: Optional[str] = Field(default=None, sa_column=Column(String(255)))

    description: Optional[str] = Field(default=None, sa_column=Column(Text))
    harvest_and_processing: Optional[str] = Field(default=None, sa_column=Column(Text))
    indications_efficacy_effects: Optional[str] = Field(default=None, sa_column=Column(Text))
    dosage_and_administration: Optional[str] = Field(default=None, sa_column=Column(Text))
    storage: Optional[str] = Field(default=None, sa_column=Column(Text))
    herbal_material_code: Optional[str] = Field(default=None, sa_column=Column(String(64)))
    synonyms: Optional[str] = Field(default=None, sa_column=Column(Text))
    precautions: Optional[str] = Field(default=None, sa_column=Column(Text))

    references: Optional[List[str]] = Field(default=None, sa_column=Column(JSON))
    img_links: Optional[List[str]] = Field(default=None, sa_column=Column(JSON))