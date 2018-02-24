"use strict";
var STATE,
        SCORE,
        OBJECTS = [],
        TANKS_DESTROYED = {
            FAT: 0,
            FAST: 0,
            NORMAL: 0
        };
Game.utils.data = {
    constants: {
        GAME_STATE: {
            LAUNCHED: 1,
            SPLASH: 2,
            PLAY: 3,
            RESULTS: 4,
            GAME_OVER: 5,
            VICTORY: 6
        },
        SIZES: {
            CANVAS: {
                width: 624,
                height: 624
            },
            TILE: {
                width: 48,
                height: 48
            },
            BRICK_CONCRETE: {
                width: 16,
                height: 16
            },
            FLAG: {
                width: 32,
                height: 32
            }
        },
        TANKS_REWARD: {
            FAT: 570,
            FAST: 467,
            NORMAL: 356
        },
        SPEED: {
            START_SPEED: 5,
            SPLASH_SPEED: 10,
            GAME_OVER: 2
        },
        IMAGES: {
            START_IMAGE: "img/start-screen.png",
            SPLASH_IMAGE: "img/ready.png",
            SPRITE: document.getElementById("sprite")
        },
        DIRECTIONS: {
            UP: 0,
            DOWN: 1,
            LEFT: 2,
            RIGHT: 3
        },
        START_LOCATIONS: {
            PLAYER: {
                x: 196,
                y: 576
            },
            FAT: {
                x: 0,
                y: 0
            },
            FAST: {
                x: 580,
                y: 0
            },
            NORMAL: {
                x: 292,
                y: 0
            }
        },
        SOUNDS: {
            RUN: "moving",
            STOP: "parking",
            SHOOT: "attack",
            SHOOT_OVER: "shootOver",
            SHOOT_COMMON: "bomb1",
            EXPLODE: "bomb0",
            STAGE_START: "stageStart"
        },
        IMG_COORDS: {
            GAME_OVER: {
                x: 0,
                y: 735
            },
            VICTORY: {
                x: 15,
                y: 435
            },
            BRICK: {
                x: 0,
                y: 96
            },
            CONCRETE: {
                x: 16,
                y: 96
            },
            FLAG: {
                x: 256,
                y: 0
            },
            BULLET: {
                x: 80,
                y: 96
            },
            EXPLOSION_COMMON: {
                x: 204,
                y: 160
            },
            EXPLOSION_SMALL: {
                x: 0,
                y: 160
            },
            EXPLOSION_TANK: {
                x: 134,
                y: 160
            },
            TANKS: {
                FAT: {
                    x: 258,
                    y: 65
                },
                FAST: {
                    x: 130,
                    y: 34},
                NORMAL: {
                    x: 0,
                    y: 34},
                PLAYER: {
                    x: 0,
                    y: 0
                }
            }
        },
        COLORS: {
            BLACK: "#000",
            LIGHT_GRAY: "#7f7f7f"
        },
        KEYS: {
            K_ENTER: 13,
            K_UP: 38,
            K_DOWN: 40,
            K_RIGHT: 39,
            K_LEFT: 37,
            K_P: 80,
            K_SPACE: 32
        },
        MAPS: {
            levelOne: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
                [2, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 2],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0]
            ]
        }
    }

};