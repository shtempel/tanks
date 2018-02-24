"use strict";

(function () {
    Game.models.Tank = Tank;

    var sprite = Game.utils.data.constants.IMAGES.SPRITE,
            width = Game.utils.data.constants.SIZES.CANVAS.width,
            height = Game.utils.data.constants.SIZES.CANVAS.height,
            imgCoords = Game.utils.data.constants.IMG_COORDS.TANKS,
            startLocation = Game.utils.data.constants.START_LOCATIONS,
            directions = Game.utils.data.constants.DIRECTIONS,
            rewards = Game.utils.data.constants.TANKS_REWARD,
            gameState = Game.utils.data.constants.GAME_STATE,
            sounds = Game.utils.data.constants.SOUNDS;


    function Tank(x, y, width, height, speed, tankX, tankY, type, subType,
            direction, score, id) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.moving = false;
        this.shooting = false;
        this.type = type;
        this.subType = subType;
        this.tankX = tankX;
        this.tankY = tankY;
        this.direction = direction;
        this.score = score;
        this.id = id;
    }

    Tank.prototype = {
        setMoving: function () {
            this.moving = true;
        },
        getMoving: function () {
            return this.moving;
        },
        setStop: function () {
            this.moving = false;
        },
        setDirection: function (tank, direction) {
            tank.direction = direction;
        },
        getDirection: function () {
            return this.direction;
        }
    };

    Tank.prototype.initTank = function (array) {
        array.push(new Tank(startLocation.PLAYER.x, startLocation.PLAYER.y, 40, 40,
                1.5, imgCoords.PLAYER.x, imgCoords.PLAYER.y, "playerTank", " ", directions.UP, 0, 1));
        array.push(new Tank(startLocation.FAT.x, startLocation.FAT.y, 40,
                40, 1, imgCoords.FAT.x, imgCoords.FAT.y,
                "enemyTank", "fat", directions.DOWN, rewards.FAT, 2));
        array.push(new Tank(startLocation.FAST.x, startLocation.FAST.y, 40,
                40, 3, imgCoords.FAST.x, imgCoords.FAST.y,
                "enemyTank", "fast", directions.DOWN, rewards.FAST, 2));
        array.push(new Tank(startLocation.NORMAL.x, startLocation.NORMAL.y, 40,
                40, 1.5, imgCoords.NORMAL.x, imgCoords.NORMAL.y,
                "enemyTank", "normal", directions.DOWN, rewards.NORMAL, 4));
    };

    Tank.prototype.moveLeft = function (array, tank) {
        move(tank, -this.speed, 0, array);
        this.direction = directions.LEFT;
    };
    Tank.prototype.moveRight = function (array, tank) {
        move(tank, this.speed, 0, array);
        this.direction = directions.RIGHT;
    };
    Tank.prototype.moveUp = function (array, tank) {
        this.direction = directions.UP;
        move(tank, 0, -this.speed, array);

    };
    Tank.prototype.moveDown = function (array, tank) {
        move(tank, 0, this.speed, array);
        this.direction = directions.DOWN;
    };

    Tank.prototype.shoot = function (array) {
        initPlayerBullet(array);
    };

    Tank.prototype.draw = function (ctx) {
        if (this.direction === directions.UP) {
            ctx.drawImage(sprite, this.tankX, this.tankY, 30, 30, this.x - 6, this.y, 44, 44);
        } else if (this.direction === directions.DOWN) {
            ctx.drawImage(sprite, this.tankX + 34, this.tankY, 30, 30, this.x - 2, this.y, 44, 44);
        } else if (this.direction === directions.RIGHT) {
            ctx.drawImage(sprite, this.tankX + 96, this.tankY, 30, 30, this.x, this.y - 4, 44, 44);
        } else if (this.direction === directions.LEFT) {
            ctx.drawImage(sprite, this.tankX + 66, this.tankY, 30, 30, this.x, this.y - 4, 44, 44);
        }
    };

    Tank.prototype.moveLeft = function (array, tank) {
        move(tank, -this.speed, 0, array);
        this.direction = directions.LEFT;
    };
    Tank.prototype.moveRight = function (array, tank) {
        move(tank, this.speed, 0, array);
        this.direction = directions.RIGHT;
    };
    Tank.prototype.moveUp = function (array, tank) {
        move(tank, 0, -this.speed, array);
        this.direction = directions.UP;
    };
    Tank.prototype.moveDown = function (array, tank) {
        move(tank, 0, this.speed, array);
        this.direction = directions.DOWN;
    };

    function move(tank, x, y, array) {
        var nx = tank.x + x,
                ny = tank.y + y;
        var possible = true;
        if (nx < 0) {
            nx = 0;
            tank.setStop();
            possible = false;
        } else if (ny < 0) {
            ny = 0;
            tank.setStop();
            possible = false;
        } else if (nx > height - 44) {
            nx = width - 44;
            tank.setStop();
            possible = false;
        } else if (ny > height - 44) {
            ny = width - 44;
            tank.setStop();
            possible = false;
        }
        var fantomTank = {
            x: nx,
            y: ny,
            width: tank.width,
            height: tank.height,
            type: tank.type,
            id: tank.id
        };

        for (var i = 0; i < array.length; i++) {
            if (Game.utils.helper.collision(fantomTank, array[i]) && array[i].type === "brick") {
                possible = false;
                tank.setStop();
                break;
            } else if (Game.utils.helper.collision(fantomTank, array[i]) && array[i].type === "concrete") {
                possible = false;
                tank.setStop();
                break;
            } else if (Game.utils.helper.collision(fantomTank, array[i]) && array[i].type === "flag") {
                tank.setStop();
                possible = false;
                break;
            } else if (Game.utils.helper.collision(fantomTank, array[i]) && array[i].type === "explosion") {
                possible = true;
                break;
            } else if ((Game.utils.helper.collision(fantomTank, array[i]))) {
                if (fantomTank.type === array[i].type && fantomTank.id === array[i].id) {
                    possible = true;
                } else if (fantomTank.type === "enemyTank" && array[i].type === "enemyBullet") {
                    possible = true;
                } else {
                    tank.setStop();
                    possible = false;
                    break;
                }
            }
        }
        if (possible) {
            tank.x = nx;
            tank.y = ny;
        }
    }

})();