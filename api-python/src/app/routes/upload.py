"""
Rotas para upload de arquivos
"""

from flask import request, current_app
from flask_restx import Namespace, Resource, fields
from werkzeug.datastructures import FileStorage

from app.services.file_service import FileService

# Criar namespace para upload
upload_ns = Namespace("upload", description="File upload endpoints")

# Modelos para documentação
file_info_model = upload_ns.model(
    "FileInfo",
    {
        "filename": fields.String(
            required=True, description="Nome do arquivo", example="image.jpg"
        ),
        "size": fields.Integer(
            required=True, description="Tamanho do arquivo em bytes", example=1024
        ),
        "content_type": fields.String(
            required=True, description="Tipo MIME do arquivo", example="image/jpeg"
        ),
        "upload_date": fields.DateTime(required=True, description="Data/hora do upload"),
    },
)

upload_response_model = upload_ns.model(
    "UploadResponse",
    {
        "success": fields.Boolean(required=True, description="Status do upload", example=True),
        "message": fields.String(
            required=True, description="Mensagem de resposta", example="Arquivo enviado com sucesso"
        ),
        "file_info": fields.Nested(
            file_info_model, required=False, description="Informações do arquivo"
        ),
    },
)

error_model = upload_ns.model(
    "ErrorResponse",
    {
        "error": fields.String(
            required=True, description="Tipo do erro", example="ValidationError"
        ),
        "message": fields.String(
            required=True, description="Mensagem de erro", example="Tipo de arquivo não permitido"
        ),
        "status_code": fields.Integer(
            required=True, description="Código de status HTTP", example=400
        ),
    },
)

# Parser para upload de arquivos
upload_parser = upload_ns.parser()
upload_parser.add_argument(
    "file", location="files", type=FileStorage, required=True, help="Arquivo para upload"
)


@upload_ns.route("/file")
class FileUpload(Resource):
    """Endpoint para upload de arquivos"""

    @upload_ns.doc("upload_file")
    @upload_ns.expect(upload_parser)
    @upload_ns.marshal_with(upload_response_model, code=200)
    @upload_ns.marshal_with(error_model, code=400)
    def post(self):
        """
        Upload de arquivo

        Faz upload de um arquivo para o servidor.
        Tipos de arquivo permitidos: jpg, jpeg, png, gif, mp4, avi, mov
        Tamanho máximo: 16MB
        """
        try:
            # Obter arquivo do request
            file = request.files.get("file")

            if not file:
                return {
                    "error": "ValidationError",
                    "message": "Nenhum arquivo foi enviado",
                    "status_code": 400,
                }, 400

            # Criar instância do serviço
            file_service = FileService(
                upload_folder=current_app.config["UPLOAD_FOLDER"],
                allowed_extensions=current_app.config["ALLOWED_EXTENSIONS"],
            )

            # Processar upload
            result = file_service.save_file(file)

            if result.success:
                # Converter dataclass para dict para serialização
                response_data = {
                    "success": result.success,
                    "message": result.message,
                    "file_info": (
                        {
                            "filename": result.file_info.filename,
                            "size": result.file_info.size,
                            "content_type": result.file_info.content_type,
                            "upload_date": result.file_info.upload_date.isoformat(),
                        }
                        if result.file_info
                        else None
                    ),
                }
                return response_data, 200
            else:
                return {"error": "UploadError", "message": result.message, "status_code": 400}, 400

        except Exception as e:
            return {
                "error": "InternalError",
                "message": f"Erro interno do servidor: {str(e)}",
                "status_code": 500,
            }, 500


@upload_ns.route("/info")
class UploadInfo(Resource):
    """Informações sobre upload de arquivos"""

    upload_info_model = upload_ns.model(
        "UploadInfo",
        {
            "max_file_size_mb": fields.Integer(description="Tamanho máximo em MB", example=16),
            "allowed_extensions": fields.List(
                fields.String,
                description="Extensões permitidas",
                example=["jpg", "jpeg", "png", "gif", "mp4"],
            ),
            "upload_folder": fields.String(description="Pasta de destino", example="uploads"),
        },
    )

    @upload_ns.doc("upload_info")
    @upload_ns.marshal_with(upload_info_model)
    def get(self):
        """
        Informações sobre configuração de upload

        Retorna informações sobre os tipos de arquivo permitidos,
        tamanho máximo e outras configurações de upload.
        """
        max_size_bytes = current_app.config.get("MAX_CONTENT_LENGTH", 16 * 1024 * 1024)
        max_size_mb = max_size_bytes // (1024 * 1024)

        return {
            "max_file_size_mb": max_size_mb,
            "allowed_extensions": list(current_app.config.get("ALLOWED_EXTENSIONS", [])),
            "upload_folder": current_app.config.get("UPLOAD_FOLDER", "uploads"),
        }
