"use strict";

(function controller() {
    var game,
            KEY = {},
            gameLoop,
            FPS = 60,
            pause = false,
            canvas = new Game.utils.Canvas(),
            ctx = canvas.ctx,
            helper = Game.utils.helper,
            tank = new Game.models.Tank(),
            bullet = new Game.models.Bullet(),
            explosion = new Game.models.Explosion(),
            keys = Game.utils.data.constants.KEYS,
            startScreen = new Game.models.screens.Start(),
            sound = new Game.models.Sound(),
            splashScreen = new Game.models.screens.Splash(),
            battleScreen = new Game.models.screens.Battle(),
            gameOverScreen = new Game.models.screens.GameOver(),
            victoryScreen = new Game.models.screens.Victory(),
            scoreScreen = new Game.models.screens.Score(),
            gameState = Game.utils.data.constants.GAME_STATE,
            canvasWidth = Game.utils.data.constants.SIZES.CANVAS.width,
            canvasHeight = Game.utils.data.constants.SIZES.CANVAS.height,
            direction = Game.utils.data.constants.DIRECTIONS;

    STATE = gameState.LAUNCHED;
    canvas.setSizes(canvasWidth, canvasHeight);
    canvas.add();

    gameLoop = function () {
        switch (STATE) {
            case gameState.LAUNCHED:
                startGame();
                break;
            case gameState.SPLASH:
                splashScreen.draw(ctx, sound);
                break;
            case gameState.PLAY:
                gameInProgress(OBJECTS);
                break;
            case gameState.RESULTS:
                scoreScreen.draw(ctx);
                break;
            case gameState.VICTORY:
                victoryScreen.draw(ctx);
                break;
            case gameState.GAME_OVER:
                gameOverScreen.draw(ctx);
                break;
        }
    };

    game = setInterval(gameLoop, 1000 / FPS);

    function startGame() {
        TANKS_DESTROYED = {
            FAT: 0,
            FAST: 0,
            NORMAL: 0
        };
        SCORE = 0;
        pause = false;
        startScreen.draw(ctx);
        OBJECTS = [];
        battleScreen.initMap(OBJECTS);
        tank.initTank(OBJECTS);
    }

    function gameInProgress(array) {
        battleScreen.drawMap(array, ctx);
        helper.playerControls(array, helper.playerTank(array), KEY, keys);
        helper.enemyMove(helper.enemyTanks(array), array, direction);
        gamePulse(array);
        helper.updateBullet(array, bullet, explosion, sound);
        helper.explosionLife(array, ctx);
        helper.tankSounds(array, sound);
    }

    document.onkeydown = function (event) {
        KEY[event.keyCode] = true;
    };

    document.onkeyup = function (event) {
        KEY[event.keyCode] = false;
        if (helper.playerTank(OBJECTS)) {
            helper.playerTank(OBJECTS).setStop();
        }
    };

    document.addEventListener('keydown', function (event) {
        if (event.keyCode === keys.K_P) {
            if (!pause) {
                clearInterval(game);
                pause = true;
            } else {
                game = setInterval(gameLoop, 1000 / FPS);
                pause = false;
            }
        }
        if (event.keyCode === keys.K_ENTER) {
            switch (STATE) {
                case gameState.LAUNCHED:
                    STATE = gameState.SPLASH;
                    break;
                case gameState.RESULTS:
                    STATE = gameState.LAUNCHED;
                    break;
            }
        }
        if (event.keyCode === keys.K_SPACE && STATE === gameState.PLAY) {
            bullet.initPlayerBullet(OBJECTS, helper.getObject(OBJECTS, "playerTank")[0],
                    helper, sound);
        }
    });

    function gamePulse(array) {
        if (helper.getObject(array, "enemyTank").length < 1) {
            return STATE = gameState.VICTORY;
        } else if (helper.getObject(array, "playerTank").length === 0 ||
                helper.getObject(array, "flag")[0].state === "damaged") {
            return STATE = gameState.GAME_OVER;
        }
    }

})();