# Инструкция по запуску
```shell
git clone https://github.com/eldargasanov1/eg.git
cd eg
cp .env.example .env

docker run --rm -v "$PWD":/app composer install
./vendor/bin/sail up -d
./vendor/bin/sail npm install

./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate
./vendor/bin/sail npm run dev
```
