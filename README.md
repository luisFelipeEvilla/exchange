## Exchange

## DEPENDENCIES
    1. TailwindCss

## SETUP
Before use this currency exchange, we need to compile Tailwindcss files. To do this, run the following script from the command line on project root directory.

```console
npm run build
```

### ENVIROMENT VARIABLES
We can change this variables in some cases. For example:

    1.  Our actual API doesn't work
    2.  Our Api Acces Key has expired 

To do this go config.js file on src directory and change the value of the following variables

```
    export const API_URL='https:somerandomapi.com/' // this its your api endpoint
    export const API_KEY='secret' // this its your api access key 
```

## DEVELOPMENT
This project use TailwindCss so we need to compile al filles over the develpment process. To start development over this project run next script from the command line on project directory.

```console 
npm run dev
``` 

