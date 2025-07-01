"""
Factory para criação da aplicação Flask
"""

import os
from flask import Flask
from flask_cors import CORS
from flask_restx import Api

from app.config.settings import get_config


def create_app(config_name: str = None) -> Flask:
    """
    Factory function para criar a aplicação Flask

    Args:
        config_name: Nome da configuração a ser usada

    Returns:
        Flask: Instância da aplicação Flask configurada
    """

    # Criar instância do Flask
    app = Flask(__name__)

    # Carregar configuração
    config = get_config(config_name)
    app.config.from_object(config)

    # Configurar CORS
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": config.CORS_ORIGINS,
                "supports_credentials": config.CORS_SUPPORTS_CREDENTIALS,
            }
        },
    )

    # Configurar Flask-RESTX (Swagger/OpenAPI)
    api = Api(
        app,
        version=config.API_VERSION,
        title=config.API_TITLE,
        description=config.API_DESCRIPTION,
        doc="/docs/", 
        prefix="/api",
    )

    # Criar pasta de uploads se não existir
    upload_folder = os.path.join(os.path.dirname(app.root_path), config.UPLOAD_FOLDER)
    os.makedirs(upload_folder, exist_ok=True)

    # Atualizar configuração com caminho absoluto
    app.config["UPLOAD_FOLDER"] = upload_folder

    # Registrar namespaces/blueprints
    from app.routes.health import health_ns
    from app.routes.upload import upload_ns

    api.add_namespace(health_ns)
    api.add_namespace(upload_ns)

    return app
