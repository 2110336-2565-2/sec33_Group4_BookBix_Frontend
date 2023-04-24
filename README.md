# BookBix_Frontend 

### Development Setups

##### Docker up

```bash
docker-compose up -d --build && docker rmi $(docker images -f “dangling=true” -q)
```

##### Docker down

```bash
docker-compose down -v
```

##### Extension on VSCode 
```
Dev Containers
```

### First approach to the project
1. ##### open you docker desktop 
2. ##### run the shell script 
```
sh docker.sh # this command will docker-compose down then docker-compose up automatically
```
3. ##### re-check that your docker container ready in docker deaktop
4. ##### install node_module
```
npm install # for your local development 
```
> noted: if you desire to put additional package from node_modules, you can do it! but remind yourself to run sh docker.sh again because you should ensure that devEnv in contaner should up to date with your desire ! 

5. ##### try to make some runable changes on your code !
6. ##### test on localhost
```
http://localhost:[PORT] # in this project PORT = 3000
```

#### Current tech list

- front end
<img align="left" alt="Typescript" width="40px" src="https://cdn.cdnlogo.com/logos/t/96/typescript.svg"/> 
<img align="left" alt="React" width="40px" style="padding-right:10px;" src="https://cdn.cdnlogo.com/logos/r/63/react.svg" />
<img align="left" alt="Vite" width="50px" style="padding-right:10px;" src="https://user-images.githubusercontent.com/89622162/216382527-be11e41a-1ed5-4b52-9da5-d6fdf5c19d11.png" />
<br/>

#

- back end 
<img align="left" alt="Typescript" width="40px" src="https://cdn.cdnlogo.com/logos/t/96/typescript.svg"/> 
<img align="left" alt="mongoDB" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" />         
<img align="left" alt="NestJS" width="100px" style="padding-right:10px;" src="https://www.vectorlogo.zone/logos/nestjs/nestjs-ar21.svg" />
<br/>

#

- Devops 
<img align="left" alt="Docker" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
<br/>


## !! DO NOT TOUCH DOCKER FILE !!
