Remove-Item -Force -Recurse ./data
docker-compose down -v
docker-compose up -d --build
docker image prune -af