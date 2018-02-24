"use strict";
Game.utils.helper = (function () {

    var helper,
            width = Game.utils.data.constants.SIZES.CANVAS.width,
            height = Game.utils.data.constants.SIZES.CANVAS.height,
            imgCoords = Game.utils.data.constants.IMG_COORDS,
            sounds = Game.utils.data.constants.SOUNDS,
            gameState = Game.utils.data.constants.GAME_STATE.PLAY;

    helper = {
        getObject: function (array, type) {
            var obj = [];
            for (var i = 0; i < array.length; i++) {
                if (array[i].type === type) {
                    obj.push(array[i]);
                }
            }
            return obj;
        },
        getObjectSubType: function (array, subType) {
            var obj = [];
            for (var i = 0; i < array.length; i++) {
                if (array[i].subType === subType) {
                    obj.push(array[i]);
                }
            }
            return obj;
        },
        collision: function (obj1, obj2) {
            var XColl = false;
            var YColl = false;
            if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width + 2))
                XColl = true;
            if ((obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height + 2))
                YColl = true;
            if (XColl & YColl) {
                return true;
            }
            return false;
        },
        playerTank: function (array) {
            var player = helper.getObject(array, "playerTank");
            return player[0];
        },
        enemyTanks: function (array) {
            var hostile = helper.getObject(array, "enemyTank");
            return hostile;
        },
        playerControls: function (array, playerTank, KEY, keys) {
            if (KEY[keys.K_UP]) {
                playerTank.moveUp(array, playerTank);
                playerTank.setMoving();
                return;
            }
            if (KEY[keys.K_DOWN]) {
                playerTank.moveDown(array, playerTank);
                playerTank.setMoving();
                return;
            }
            if (KEY[keys.K_LEFT]) {
                playerTank.moveLeft(array, playerTank);
                playerTank.setMoving();
                return;
            }
            if (KEY[keys.K_RIGHT]) {
                playerTank.moveRight(array, playerTank);
                playerTank.setMoving();
                return;
            }
        },
        enemyMove: function (tanks, array, direction) {
            for (var i = 0; i < tanks.length; i++) {
                tanks[i].setMoving();
                if (tanks[i].direction === direction.DOWN) {
                    tanks[i].moveDown(array, tanks[i]);
                } else if (tanks[i].direction === direction.UP) {
                    tanks[i].moveUp(array, tanks[i]);
                } else if (tanks[i].direction === direction.LEFT) {
                    tanks[i].moveLeft(array, tanks[i]);
                } else if (tanks[i].direction === direction.RIGHT) {
                    tanks[i].moveRight(array, tanks[i]);
                }
                if (tanks[i].moving === false) {
                    tanks[i].direction = helper.changeDirection(direction);
                }
            }
        },
        randomInteger: function (min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        },
        changeDirection: function (direction) {
            switch (helper.randomInteger(1, 4)) {
                case 1:
                    return direction.DOWN;
                    break;
                case 2:
                    return direction.LEFT;
                    break;
                case 3:
                    return direction.RIGHT;
                    break;
                case 4:
                    return direction.UP;
                    break;
            }
        },
        updateBullet: function (array, bullet, explosion, soundPlayer) {
            bullet.buleltsMove(array);
            bullet.initEnemyBullet(array, helper);
            helper.bulletsLifeCycle(array, helper.getObject(array, "playerBullet"), explosion, soundPlayer);
            helper.bulletsLifeCycle(array, helper.getObject(array, "enemyBullet"), explosion, soundPlayer);
        },
        bulletsLifeCycle: function (array, bullet, explosion, soundPlayer) {
            for (var t = 0; t < bullet.length; t++) {
                if (array.indexOf(bullet[t])) {
                    for (var i = 0; i < array.length; i++) {
                        if (helper.collision(bullet[t], array[i])) {
                            switch (array[i].type) {
                                case "brick":
                                    array.splice(array.indexOf(bullet[t]), 1);
                                    explosion.explosionInit(array[i].x, array[i].y, array,
                                            imgCoords.EXPLOSION_COMMON.x, imgCoords.EXPLOSION_COMMON.y);
                                    soundPlayer.play(sounds.SHOOT_COMMON);
                                    array.splice(i, 1);
                                    break;
                                case "concrete":
                                    array.splice(array.indexOf(bullet[t]), 1);
                                    explosion.explosionInit(array[i].x, array[i].y, array,
                                            imgCoords.EXPLOSION_SMALL.x, imgCoords.EXPLOSION_SMALL.y);
                                    soundPlayer.play(sounds.SHOOT_OVER);
                                    break;
                                case "flag":
                                    array.splice(array.indexOf(bullet[t]), 1);
                                    soundPlayer.play(sounds.EXPLODE);
                                    array[i].state = "damaged";
                                    break;
                                case "playerTank":
                                    soundPlayer.play(sounds.EXPLODE);
                                    array.splice(i, 1);
                                    break;
                                case "enemyTank" :
                                    if (bullet[t].type === "playerBullet") {
                                        explosion.explosionInit(array[i].x, array[i].y, array,
                                                imgCoords.EXPLOSION_TANK.x, imgCoords.EXPLOSION_TANK.y);
                                        helper.resultCalc(array[i].subType, array[i]);
                                        array.splice(array.indexOf(bullet[t]), 1);
                                        soundPlayer.play(sounds.SHOOT_COMMON);
                                        array.splice(i, 1);
                                    }
                                    break;
                            }
                        }
                    }
                    if (bullet[t].y < 1) {
                        array.splice(array.indexOf(bullet[t]), 1);
                        explosion.explosionInit(bullet[t].x - 24, bullet[t].y - 20, array,
                                imgCoords.EXPLOSION_SMALL.x, imgCoords.EXPLOSION_SMALL.y);
                        soundPlayer.play(sounds.SHOOT_OVER);
                    } else if (bullet[t].x < 1) {
                        array.splice(array.indexOf(bullet[t]), 1);
                        explosion.explosionInit(bullet[t].x - 24, bullet[t].y - 24, array,
                                imgCoords.EXPLOSION_SMALL.x, imgCoords.EXPLOSION_SMALL.y);
                        soundPlayer.play(sounds.SHOOT_OVER);
                    } else if (bullet[t].x > width) {
                        array.splice(array.indexOf(bullet[t]), 1);
                        explosion.explosionInit(bullet[t].x - 30, bullet[t].y - 24, array,
                                imgCoords.EXPLOSION_SMALL.x, imgCoords.EXPLOSION_SMALL.y);
                        soundPlayer.play(sounds.SHOOT_OVER);
                    } else if (bullet[t].y > height) {
                        array.splice(array.indexOf(bullet[t]), 1);
                        explosion.explosionInit(bullet[t].x - 24, bullet[t].y - 26, array,
                                imgCoords.EXPLOSION_SMALL.x, imgCoords.EXPLOSION_SMALL.y);
                        soundPlayer.play(sounds.SHOOT_OVER);
                    }
                }
            }
        },
        resultCalc: function (tankType, tank) {
            switch (tankType) {
                case "fat":
                    ++TANKS_DESTROYED.FAT;
                    SCORE += tank.score;
                    break;
                case "fast":
                    ++TANKS_DESTROYED.FAST;
                    SCORE += tank.score;
                    break;
                case "normal":
                    ++TANKS_DESTROYED.NORMAL;
                    SCORE += tank.score;
                    break;
            }
        },
        explosionLife: function (array, ctx) {
            helper.drawExplosions(array, ctx);
            helper.explosionDelete(array);
        },

        drawExplosions: function (array, ctx) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].type === "explosion") {
                    array[i].draw(ctx);
                }
            }
        },
        explosionDelete: function (array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].type === "explosion") {
                    array.splice(i, 1);
                }
            }
        },
        tankSounds: function (array, soundPlayer) {
            var tank = helper.playerTank(array);
            if (STATE === gameState) {
                if (tank.getMoving()) {
                    soundPlayer.stop(sounds.STOP);
                    soundPlayer.play(sounds.RUN);
                } else if (!tank.getMoving()) {
                    soundPlayer.stop(sounds.RUN);
                    soundPlayer.play(sounds.STOP);
                }
            } else {
                soundPlayer.stop(sounds.RUN);
                soundPlayer.stop(sounds.STOP);
            }
        }
    };

    return helper;
})();