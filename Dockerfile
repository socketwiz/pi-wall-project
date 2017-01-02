FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install yarn
RUN apt-get update && apt-get -y install apt-utils apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get -y install yarn

# Install ruby (for SASS)
RUN apt-get install -y ruby-full
RUN gem install sass

# Install app dependencies
COPY . /usr/src/app
RUN yarn install

ENV NODE_ENV="production"
EXPOSE 3000

CMD [ "npm", "start" ]

