# Инструкция по запуску
```shell
git clone https://github.com/eldargasanov1/eg.git
cd eg
cp .env.example .env

docker run --rm -v "$PWD":/app composer install
./venodor/bin/sail up -d
./venodor/bin/sail npm install

./venodor/bin/sail artisan key:generate
./venodor/bin/sail artisan migrate
./venodor/bin/sail npm run dev
```
