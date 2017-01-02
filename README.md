This project is based heavily on https://github.com/mxstbr/react-boilerplate.
I built it from the gound up using my own opinions on what libraries to use but
consulted the react-boilerplate projects on how to create the generators and
various other areas.  This project was created as a learning tool and to suite
my own needs. I expect most people might prefer react-boilerplate as a more
complete solution.

###Install
PRE-REQUISITES:  
1) node (LTS)  
2) yarn (npm should work)  

or

1) docker
```
$ git clone git@github.com:socketwiz/react-starter.git
$ cd react-starter
$ yarn install
$ yarn start
# navigate to http://localhost:3000/ in your browser of choice

# or

$ docker-machine create --driver virtualbox react-starter
$ eval "$(docker-machine env react-starter)"
$ docker-compose up -d
$ docker-machine ip react-starter
# navigate to http://&lt;ip from previous command&gt;/ in your browser of choice
```

##Server modules
* Hapi 
* Inert
* Ngrok
* Webpack-dev-middleware
* Webpack-hot-middleware
* Winston

##Frontend modules
* Autoprefixer
* Babel
* Lodash
* React
* React-router
* Redux
* Redux-logger
* Redux-thunk
* Sass
* Webpack

##Testing modules
* Chai
* Cheerio
* Enzyme
* Eslint
* Istanbul
* Karma
* Mocha

##REPL
Plop is used to generate new templates for containers, components, and routes.  

If you find a bug or would like to suggest a feature, please by all means create a pull request.

##Docker
A Dockerfile and docker-compose file are supplied for deployment.  Once its up
and running you can see the logs with ```docker-compose logs web```.
