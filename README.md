## .env
#### you should add .env file in the backend directory containing the following keys
- FRONTEND_URL=http://localhost:4200

- MONGODB_URI=

- JWT_SECRET=
- JWT_EXPIRATION=

## Run tasks

To run the backend:

```sh
npx nx serve backend
```

To run the frontend:

```sh
npx nx serve frontend
```

## Procedure I used to create the project

1. npx create-nx-workspace penny --appName backend
	  - my choices are:
		- ✔ Which stack do you want to use? · node
		- ✔ What framework should be used? · nest
		- ✔ Integrated monorepo, or standalone project? · integrated
		- ✔ Would you like to generate a Dockerfile? [https://docs.docker.com/] · Yes
		- ✔ Which CI provider would you like to use? · github

2. I have an issue installing *@nrwl/angular*, so I deleted node_modules and package-lock.json
    - rm -rf node_modules package-lock.json

3. npm i

4. npm i -D @nrwl/angular

5. npx nx generate @nrwl/angular:application frontend
	  - my choices are:
		- ✔ Which stylesheet format would you like to use? · scss
		- ✔ Which E2E test runner would you like to use? · none
		- ✔ Which bundler do you want to use to build the application? · webpack
		- ✔ Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? (y/N) · false
		- ✔ What should be the project name and where should it be generated? · frontend @ apps/frontend

6. git remote add origin git@github.com:ebrahim-mansour/penny-task.git

7. git push -u origin main

8. Start the backend project:
    - npx nx serve backend

9. npm install -D @nrwl/nest

10. npx nx generate @nrwl/nest:library shared-backend

11. Database module
    - npm i @nestjs/config @nestjs/mongoose mongoose joi

12. Auth module:
    - npm i passport passport-local cookie-parser express bcryptjs @nestjs/passport @nestjs/jwt
    - npm i -D @types/passport-jwt @types/passport-local @types/bcryptjs @types/cookie-parser

13. nx generate @nrwl/angular:component pages/signup --project=frontend

14. nx generate @nrwl/angular:component pages/login --project=frontend 

15. npm install @angular/material

16. nx generate @angular/material:ng-add --project=frontend

17. npm i @ngrx/store @ngrx/effects @ngrx/store-devtools

18. npm install ngrx-store-localstorage
