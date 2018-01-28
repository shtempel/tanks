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
            STATE_SPLASH: 3,
            STATE_PLAY: 2
        },
        COLORS = {
            BLACK: "#000",
            LIGHT_GRAY: "#7f7f7f"
        },
        START_SCREEN_IMAGE = "img/start-screen.png",
        READY_PIC_IMAGE = "img/ready.png",
        SPRITE = document.getElementById("tankAll"),
        IMAGES = {
            flag: [256, 0],
            brick: [0, 96],
            concrete: [16, 96],
            playerTank: [0, 0],
            bullet: [80, 96]
        },
        IMAGES_COORDS = {
            tank: {
                x: IMAGES["playerTank"][0],
                y: IMAGES["playerTank"][1]
            },
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
            level_code: {
                none: 0,
                brick: 1,
                concrete: 2,
                flag: 3
            }
        },
        PLAYER_START_LOCATION = {
            x: 196,
            y: 576
        },
        DIRECTIONS = {
            UP: 0,
            DOWN: 1,
            LEFT: 2,
            RIGHT: 3
        },
        START_SCREEN_SPEED = 10,
        READY_SPEED = 20,
        START_SCREEN = new Image(),
        READY_PIC = new Image(),
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