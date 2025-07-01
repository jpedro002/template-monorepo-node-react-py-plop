"""
Utilitários para validação de dados
"""

import re
from typing import Any, Dict, List, Optional


def validate_file_extension(filename: str, allowed_extensions: set) -> bool:
    """
    Valida se a extensão do arquivo é permitida

    Args:
        filename: Nome do arquivo
        allowed_extensions: Set de extensões permitidas

    Returns:
        bool: True se a extensão é válida
    """
    if not filename or "." not in filename:
        return False

    extension = filename.rsplit(".", 1)[1].lower()
    return extension in allowed_extensions


def sanitize_filename(filename: str) -> str:
    """
    Remove caracteres perigosos do nome do arquivo

    Args:
        filename: Nome do arquivo original

    Returns:
        str: Nome do arquivo sanitizado
    """
    # Remove caracteres perigosos
    filename = re.sub(r'[<>:"/\\|?*]', "", filename)

    # Remove espaços duplos e substitui por underscore
    filename = re.sub(r"\s+", "_", filename.strip())

    # Limita o tamanho do nome
    if len(filename) > 255:
        name, ext = filename.rsplit(".", 1) if "." in filename else (filename, "")
        name = name[: 255 - len(ext) - 1]
        filename = f"{name}.{ext}" if ext else name

    return filename


def format_file_size(size_bytes: int) -> str:
    """
    Formata o tamanho do arquivo em uma string legível

    Args:
        size_bytes: Tamanho em bytes

    Returns:
        str: Tamanho formatado (ex: "1.5 MB")
    """
    if size_bytes == 0:
        return "0 B"

    units = ["B", "KB", "MB", "GB", "TB"]
    unit_index = 0
    size = float(size_bytes)

    while size >= 1024 and unit_index < len(units) - 1:
        size /= 1024
        unit_index += 1

    return f"{size:.1f} {units[unit_index]}"


def validate_request_data(data: Dict[str, Any], required_fields: List[str]) -> Optional[str]:
    """
    Valida se todos os campos obrigatórios estão presentes

    Args:
        data: Dados do request
        required_fields: Lista de campos obrigatórios

    Returns:
        Optional[str]: Mensagem de erro se houver campos faltando, None caso contrário
    """
    missing_fields = []

    for field in required_fields:
        if field not in data or data[field] is None or data[field] == "":
            missing_fields.append(field)

    if missing_fields:
        return f"Campos obrigatórios faltando: {', '.join(missing_fields)}"

    return None
