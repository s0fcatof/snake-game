# Snake Game Canvas

## Installation for local development

1. Instal dependencies

```
npm i
```

2. Start app in development mode

```
npm run dev
```

## Installation for production

1. Build docker image

```
docker build -t snake-game-canvas:latest .
```

2. Run docker container

```
docker run --rm --name snake-game-canvas -p 80:80 -d snake-game-canvas:latest
```

**Have fun!**
