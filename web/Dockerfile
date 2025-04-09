FROM node:hydrogen-bullseye

WORKDIR /frontend

COPY frontend/package.json /frontend/package.json

RUN npm install

COPY frontend/ /frontend/

ARG AUTH_API_HOST
ENV AUTH_API_HOST=${AUTH_API_HOST}
ARG PROJECT_API_HOST
ENV PROJECT_API_HOST=${PROJECT_API_HOST}
ARG EXPERT_API_HOST
ENV EXPERT_API_HOST=${EXPERT_API_HOST}
ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}

RUN npm run build
