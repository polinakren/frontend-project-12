lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

local-start:
	make start-backend & make start-frontend

start:
	make start-backend

start-backend:
	npx start-server -s ./frontend/build

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run build
