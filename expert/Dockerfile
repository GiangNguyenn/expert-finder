FROM python:3.10.9-slim

WORKDIR /backend

COPY ./requirements.txt /backend/requirements.txt

# for chromadb compatability
RUN apt-get update
RUN apt-get install build-essential -y

RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./app /backend/app

# TODO: upgrade this to a production command
# https://www.uvicorn.org/deployment/#gunicorn

CMD [ "/bin/bash", "-c", "python3 /backend/app/migrate.py && uvicorn app.main:app --host 0.0.0.0 --port 4000"]
