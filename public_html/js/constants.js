"use strict";

var CANVAS = document.getElementById("canvas"),
        CTX = CANVAS.getContext("2d"),
        FPS = 60,
        BATTLEFIELD_WIDTH = 624,
        BATTLEFIELD_HEIGHT = 624,
        TILE_WIDTH = 48,
        TILE_HEIGHT = 48,
        GAME_STATE = {
            STATE_GAME_LAUNCHED: 1,
            STATE_SPLASH: 2,
            STATE_PLAY: 3,
            STATE_RESULTS: 4,
            STATE_GAME_OVER: 5,
            STATE_WIN: 6
        },
        COLORS = {
            BLACK: "#000",
            LIGHT_GRAY: "#7f7f7f"
        },
        SOUNDS = {
            run: "moving",
            stop: "parking",
            shoot: "attack",
            shootOver: "shootOver",
            shootBrick: "bomb1",
            explode: "bomb0"
        },
        START_SCREEN_IMAGE = "img/start-screen.png",
        READY_PIC_IMAGE = "img/ready.png",
        SPRITE = document.getElementById("sprite"),
        IMAGES = {
            flag: [256, 0],
            brick: [0, 96],
            concrete: [16, 96],
            playerTank: [0, 0],
            bullet: [80, 96],
            explosion: [204, 160],
            enemyTankFat: [258, 65],
            enemyTankFast: [130, 34],
            enemyTankNormal: [0, 34],
            gameOver: [0, 735],
            victory: [15, 435]
        },
        SCORE = 0,
        TANKS_DESTROYED = {
            fat: 0,
            fast: 0,
            normal: 0
        },
        IMAGES_COORDS = {
            tank: {
                x: IMAGES["playerTank"][0],
                y: IMAGES["playerTank"][1]
            },
            enemyTankFat: {
                x: IMAGES["enemyTankFat"][0],
                y: IMAGES["enemyTankFat"][1]},
            enemyTankFast: {
                x: IMAGES["enemyTankFast"][0],
                y: IMAGES["enemyTankFast"][1]},
            enemyTankNormal: {
                x: IMAGES["enemyTankNormal"][0],
                y: IMAGES["enemyTankNormal"][1]},
            brick: {
                x: IMAGES["brick"][0],
                y: IMAGES["brick"][1]
            },
            concrete: {
                x: IMAGES["concrete"][0],
                y: IMAGES["concrete"][1]
            },
            flag: {
                x: IMAGES["flag"][0],
                y: IMAGES["flag"][1]
            },
            bullet: {
                x: IMAGES["bullet"][0],
                y: IMAGES["bullet"][1]
            },
            explosion: {
                x: IMAGES["explosion"][0],
                y: IMAGES["explosion"][1]
            },
            gameOver: {
                x: IMAGES["gameOver"][0],
                y: IMAGES["gameOver"][1]
            },
            victory: {
                x: IMAGES["victory"][0],
                y: IMAGES["victory"][1]
            },
            level_code: {
                none: 0,
                brick: 1,
                concrete: 2,
                flag: 3
            }
        },
        TANKS_REWARD = {
            fat: 570,
            fast: 467,
            normal: 356
        },
        PLAYER_START_LOCATION = {
            x: 196,
            y: 576
        },
        ENEMY_START_LOCATIONS = {
            FAT: {
                x: 0,
                y: 0
            },
            FAST: {
                x: 576,
                y: 0
            },
            NORMAL: {
                x: 292,
                y: 0
            }
        },
        DIRECTIONS = {
            UP: 0,
            DOWN: 1,
            LEFT: 2,
            RIGHT: 3
        },
        START_SCREEN_SPEED = 10,
        READY_SPEED = 20,
        GAME_OVER_SPEED = 2,
        START_SCREEN = new Image(),
        READY_PIC = new Image(),
        GAME_OVER_PIC = new Image(),
        OBJECTS = [],
        KEY = {},
        K_ENTER = 13,
        K_SPACE = 32,
        K_P = 80,
        K_UP = 38,
        K_DOWN = 40,
        K_RIGHT = 39,
        K_LEFT = 37;

START_SCREEN.src = START_SCREEN_IMAGE;
READY_PIC.src = READY_PIC_IMAGE;