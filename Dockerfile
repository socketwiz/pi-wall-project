FROM node:carbon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install ruby (for SASS)
RUN apt-get update
RUN apt-get install -y ruby-full
RUN gem install sass

# Install app dependencies
COPY . /usr/src/app

ENV NODE_ENV="production"
EXPOSE 8000

CMD [ "node", "." ]

