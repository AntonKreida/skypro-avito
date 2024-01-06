# Skypro-avito

Что за проект:
проект представляет из себя аналог avito - российский интернет-сервис для размещения объявлений о товарах и т.д.

Для запуска проекта:
1. перенести переменные из .env.example в ваш .env файл;
2. установить зависимости: yarn || yarn install;
3. сбилдите контейнеры выполнив команду: docker-compose -f docker-compose.yaml build;
4. для запуска бэка выполните команду: docker-compose -f docker-compose.yaml migrations api - бэк запуститься на 8090 порту;
5. запустить локально web: yarn dev

Что используется:
1. используется Vite для develop-разработки;
2. для стилизации проекта используется tailwind;
3. eslint - для форматирования кода;
4. state-manager - redux-toolkit;