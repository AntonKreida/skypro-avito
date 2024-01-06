FROM node:lts-alpine

WORKDIR /app

COPY ./ ./
RUN yarn install

EXPOSE 3000
ARG VITE_PORT
ARG VITE_API_URL
ENV VITE_PORT=$VITE_PORT
ENV VITE_API_URL=$VITE_API_URL

RUN echo $VITE_PORT
RUN echo $VITE_API_URL

RUN yarn build

CMD [ "yarn", "preview" ]
