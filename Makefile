dev-up:
	docker-compose up --build -d

dev-down:
	docker-compose down --rmi all --remove-orphans

dev-logs:
	docker-compose logs -f

dev-restart:
	docker-compose restart

prod-up:
	docker-compose -f docker-compose.prod.yml up --build -d

prod-down:
	docker-compose -f docker-compose.prod.yml down --rmi all --remove-orphans

prod-logs:
	docker-compose -f docker-compose.prod.yml logs -f

prod-restart:
	docker-compose -f docker-compose.prod.yml restart

test-build:
	docker-compose -f docker-compose.test.yml build

test-unit:
	docker-compose -f docker-compose.test.yml run --rm todo-list-api-test bash -c "npm run test"

test-lint:
	docker-compose -f docker-compose.test.yml run --rm todo-list-api-test bash -c "npm run lint"

test-cleanup:
	docker-compose -f docker-compose.test.yml down --rmi all --remove-orphans
