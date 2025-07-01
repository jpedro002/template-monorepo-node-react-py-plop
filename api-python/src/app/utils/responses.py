"""
Utilitários para respostas da API
"""

from typing import Any, Dict, Optional
from flask import jsonify
from datetime import datetime


def success_response(data: Any = None, message: str = "Success", status_code: int = 200) -> tuple:
    """
    Cria uma resposta de sucesso padronizada

    Args:
        data: Dados da resposta
        message: Mensagem de sucesso
        status_code: Código de status HTTP

    Returns:
        tuple: (response_data, status_code)
    """
    response = {
        "success": True,
        "message": message,
        "timestamp": datetime.now().isoformat(),
        "data": data,
    }

    return response, status_code


def error_response(
    message: str,
    error_type: str = "Error",
    status_code: int = 400,
    details: Optional[Dict[str, Any]] = None,
) -> tuple:
    """
    Cria uma resposta de erro padronizada

    Args:
        message: Mensagem de erro
        error_type: Tipo do erro
        status_code: Código de status HTTP
        details: Detalhes adicionais do erro

    Returns:
        tuple: (response_data, status_code)
    """
    response = {
        "success": False,
        "error": error_type,
        "message": message,
        "timestamp": datetime.now().isoformat(),
        "status_code": status_code,
    }

    if details:
        response["details"] = details

    return response, status_code


def paginated_response(
    data: list, page: int = 1, per_page: int = 10, total: int = 0, message: str = "Success"
) -> tuple:
    """
    Cria uma resposta paginada

    Args:
        data: Lista de dados
        page: Página atual
        per_page: Items por página
        total: Total de items
        message: Mensagem de resposta

    Returns:
        tuple: (response_data, status_code)
    """
    total_pages = (total + per_page - 1) // per_page if total > 0 else 1

    response = {
        "success": True,
        "message": message,
        "timestamp": datetime.now().isoformat(),
        "data": data,
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": total_pages,
            "has_next": page < total_pages,
            "has_prev": page > 1,
        },
    }

    return response, 200
