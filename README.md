# SEPTA
Regional Rail | Bus | Trolley <br/>
Using React
#Check the Demo here http://54.84.17.20:8081/

### Getting Started
There are two methods for getting started with this repo.

#### With Git?
Checkout this repo, install dependencies, then start the process with the following:

```
> git clone https://github.com/czsyjss/SEPTA.git
> cd SEPTA/<search-train>
> npm install
> npm run serve
```

#### Without Git?
Click [here](https://github.com/czsyjss/SEPTA) then download the .zip file.  Extract the contents of the zip file, then open your terminal, change to the project directory, and:

```
> npm install
> npm run serve
```

### Running application from terminal forever?
Install nohup, then start the process with the following:

#### Using nohup
```
> npm install nohup
> sudo nohup npm run serve </dev/null &> /dev/null &
```

### Stopping running application from terminal?
Open the terminal, then change to the project directory, and:

#### Finding the PID number:
```
> ps -ef
```

#### Killing the PID number:
```
> kill -9 <PID>
```

### Running webpack-dev-server on different host or port?

In package.json file

#### Changing the "scripts" from 
```
"scripts": {
    "serve": "webpack-dev-server --watch",
    ...
  }
```

#### To
```
"scripts": {
    "serve": "webpack-dev-server --watch --inline --host <hostname/ip> --port <number>",
    ...
  }
```

