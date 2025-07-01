"""
Configurações da aplicação
"""

import os
from typing import Dict, Any


class Config:
    """Configuração base"""

    # Flask settings
    SECRET_KEY = os.environ.get("SECRET_KEY") or "dev-secret-key-change-in-production"
    DEBUG = False
    TESTING = False

    # Upload settings
    UPLOAD_FOLDER = "uploads"
    ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "gif", "mp4", "avi", "mov"}
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size

    # API settings
    API_TITLE = "Flask API"
    API_VERSION = "v1"
    API_DESCRIPTION = "API documentation with Swagger/OpenAPI"

    # CORS settings
    CORS_ORIGINS = "*"
    CORS_SUPPORTS_CREDENTIALS = True


class DevelopmentConfig(Config):
    """Configuração para desenvolvimento"""

    DEBUG = True


class ProductionConfig(Config):
    """Configuração para produção"""

    DEBUG = False


class TestingConfig(Config):
    """Configuração para testes"""

    TESTING = True
    DEBUG = True


# Dicionário de configurações
config: Dict[str, Any] = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
    "default": DevelopmentConfig,
}


def get_config(config_name: str = None) -> Config:
    """
    Retorna a configuração baseada no nome fornecido ou na variável de ambiente
    """
    if config_name is None:
        config_name = os.environ.get("FLASK_ENV", "default")

    return config.get(config_name, config["default"])
