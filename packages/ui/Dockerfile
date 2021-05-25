FROM node:14.17-alpine AS alpine
RUN apk --no-cache --virtual build-dependencies add \
    bash \
    git \
    openssh \
    python \
    make \
    g++
WORKDIR /app

COPY package.json .
RUN yarn
COPY . .
# RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]