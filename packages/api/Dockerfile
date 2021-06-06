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
RUN yarn generate:types
RUN ["chmod", "+x", "./wait-for-it.sh"]
EXPOSE 3001
CMD ["yarn", "start"]