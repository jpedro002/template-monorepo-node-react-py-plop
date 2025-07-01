"""
Modelos de dados para a API
"""

from typing import Optional, List
from dataclasses import dataclass
from datetime import datetime


@dataclass
class HealthResponse:
    """Modelo para resposta de health check"""

    status: str
    message: str
    timestamp: str


@dataclass
class FileInfo:
    """Informações sobre um arquivo"""

    filename: str
    size: int
    content_type: str
    upload_date: datetime


@dataclass
class UploadResponse:
    """Resposta para upload de arquivo"""

    success: bool
    message: str
    file_info: Optional[FileInfo] = None


@dataclass
class ErrorResponse:
    """Modelo padrão para respostas de erro"""

    error: str
    message: str
    status_code: int
