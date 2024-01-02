FROM node:lts-alpine

WORKDIR /app

COPY ./ ./
RUN yarn install

EXPOSE 3000
ARG VITE_PORT
ENV VITE_PORT=$VITE_PORT
RUN echo $VITE_PORT

RUN yarn build

CMD [ "yarn", "preview" ]
