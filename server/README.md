# Backend Nest.js
## **Подлючение к БД**
* Создайте файл `.development.env` в корне директории `server` 
```dotenv
PORT=5000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=db_name
POSTGRES_PASSWORD=db_password
POSTGRES_PORT=db_port
```
## **Установка**
* **`cd ./server` <br/>**
* **`npm i` <br/>**
* **`npm run migrations` <br/>** 
* **`npm run seed` // Генерирует данные для тестирования (пользователей и 3 роли)**
## **Фичи**
* **1. Миграции - синхронизация таблиц**<br/>
* **2. Сидеры - генерация моковых данных для тестирования**<br/>
* **3. AllExceptionsFilter - в случае ошибки можно увидеть `url, payload, error, message, timestamp`**<br/>
