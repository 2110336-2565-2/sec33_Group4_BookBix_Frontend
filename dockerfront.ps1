docker-compose down -v
docker-compose -f docker-compose.front.yml up -d --build && docker rmi $(docker images -f dangling=true -q)!