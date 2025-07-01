"""
Rotas de health check da API
"""

from datetime import datetime
from flask import jsonify
from flask_restx import Namespace, Resource, fields

# Criar namespace para health check
health_ns = Namespace("health", description="Health check endpoints")

# Modelo para resposta de health check
health_model = health_ns.model(
    "HealthResponse",
    {
        "status": fields.String(
            required=True, description="Status da aplicação", example="healthy"
        ),
        "message": fields.String(required=True, description="Mensagem de status", example="pong"),
        "timestamp": fields.String(
            required=True, description="Timestamp da resposta", example="2025-06-03T10:30:00Z"
        ),
        "version": fields.String(required=True, description="Versão da API", example="v1"),
    },
)


@health_ns.route("/ping")
class HealthCheck(Resource):
    """Endpoint para verificar se a API está funcionando"""

    @health_ns.doc("health_check")
    @health_ns.marshal_with(health_model)
    def get(self):
        """
        Health check simples

        Retorna o status da aplicação para verificar se está funcionando corretamente.
        """
        return {
            "status": "healthy",
            "message": "pong",
            "timestamp": datetime.now().isoformat(),
            "version": "v1",
        }


@health_ns.route("/status")
class DetailedStatus(Resource):
    """Endpoint para status detalhado da aplicação"""

    @health_ns.doc("detailed_status")
    @health_ns.marshal_with(health_model)
    def get(self):
        """
        Status detalhado da aplicação

        Retorna informações mais detalhadas sobre o status da aplicação.
        """
        return {
            "status": "running",
            "message": "API está funcionando corretamente",
            "timestamp": datetime.now().isoformat(),
            "version": "v1",
        }
