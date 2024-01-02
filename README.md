# Skypro-avito

Для запуска проекта:
1. перенести переменные из .env.example в ваш .env файл;
2. установить зависимости yarn || yarn Install;
3. сбилдите контейнеры выполните docker-compose -f docker-compose.yaml build;
4. для запуска бэка выполните команду docker-compose -f docker-compose.yaml migrations api - бэк запуститься на 8090 порту;
5. запустить локально web: yarn dev