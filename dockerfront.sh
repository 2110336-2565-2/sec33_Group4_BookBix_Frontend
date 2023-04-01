docker-compose down -v
docker-compose -f docker-compose.front.yml up -d --build
docker image prune -af