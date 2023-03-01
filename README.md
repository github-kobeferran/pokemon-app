# Pokemon APP 
by Kobe Ferran
## Setup instructions
- clone the app https://github.com/github-kobeferran/pokemon-app.git
- run command `composer install`
- set up the .env file at the root folder, you can take a look at the .env.example file
- create database `pokemon_app`
- run command `php artisan key:generate` and `php artisan config:cache`
- run command `php artisan migrate:fresh --seed`
- run command `php artisan storage:link`
- run command `npm install && npm run dev`

That should give the APP_URL for the application. In case not, please try restarting your webserver and try again or try running `php artisan optimize:clear` command.
