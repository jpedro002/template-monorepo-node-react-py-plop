"""
Serviços para manipulação de arquivos
"""

import os
from typing import Tuple, Optional
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
from datetime import datetime

from app.models.responses import FileInfo, UploadResponse


class FileService:
    """Serviço para manipulação de arquivos"""

    def __init__(self, upload_folder: str, allowed_extensions: set):
        self.upload_folder = upload_folder
        self.allowed_extensions = allowed_extensions

    def is_allowed_file(self, filename: str) -> bool:
        """
        Verifica se o tipo de arquivo é permitido

        Args:
            filename: Nome do arquivo

        Returns:
            bool: True se o arquivo é permitido
        """
        return "." in filename and filename.rsplit(".", 1)[1].lower() in self.allowed_extensions

    def save_file(self, file: FileStorage) -> UploadResponse:
        """
        Salva o arquivo no sistema de arquivos

        Args:
            file: Arquivo a ser salvo

        Returns:
            UploadResponse: Resultado da operação
        """
        if not file or file.filename == "":
            return UploadResponse(success=False, message="Nenhum arquivo foi selecionado")

        if not self.is_allowed_file(file.filename):
            return UploadResponse(
                success=False,
                message=f"Tipo de arquivo não permitido. Tipos aceitos: {', '.join(self.allowed_extensions)}",
            )

        try:
            # Criar diretório de upload se não existir
            os.makedirs(self.upload_folder, exist_ok=True)

            # Gerar nome seguro para o arquivo
            filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{timestamp}_{filename}"

            # Salvar arquivo
            file_path = os.path.join(self.upload_folder, filename)
            file.save(file_path)

            # Obter informações do arquivo
            file_size = os.path.getsize(file_path)

            file_info = FileInfo(
                filename=filename,
                size=file_size,
                content_type=file.content_type or "application/octet-stream",
                upload_date=datetime.now(),
            )

            return UploadResponse(
                success=True, message="Arquivo enviado com sucesso", file_info=file_info
            )

        except Exception as e:
            return UploadResponse(success=False, message=f"Erro ao salvar arquivo: {str(e)}")
