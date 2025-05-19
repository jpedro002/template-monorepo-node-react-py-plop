FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libopencv-dev \
    && pip install --no-cache-dir uv

WORKDIR /app

COPY requirements.txt ./

RUN uv pip install -r requirements.txt

COPY hypercorn_config.py ./

COPY src/ ./src

CMD ["hypercorn", "-c", "hypercorn_config.py", "src.main:app"]