"use strict";
function Bullet(x, y, width, height, speed, bulletX, bulletY, type, subType, direction, id) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.bulletX = bulletX;
    this.bulletY = bulletY;
    this.direction = direction;
    this.type = type;
    this.subType = subType;
    this.bulletFlight = false;
    center.call(this);
    this.id = id;
}


Bullet.prototype.shoot = function () {
};

Bullet.prototype.move = function () {
    switch (this.direction) {
        case DIRECTIONS.UP:
            this.y -= this.speed;
            break;
        case DIRECTIONS.DOWN:
            this.y += this.speed;
            break;
        case DIRECTIONS.LEFT:
            this.x -= this.speed;
            break;
        case DIRECTIONS.RIGHT:
            this.x += this.speed;
            break;
    }
};

Bullet.prototype.draw = function () {
    if (this.direction === DIRECTIONS.UP) {
        CTX.drawImage(SPRITE, this.bulletX, this.bulletY, 6, 6, this.x, this.y, 10, 10);
    } else if (this.direction === DIRECTIONS.DOWN) {
        CTX.drawImage(SPRITE, this.bulletX + 6, this.bulletY, 6, 6, this.x, this.y, 10, 10);
    } else if (this.direction === DIRECTIONS.RIGHT) {
        CTX.drawImage(SPRITE, this.bulletX + 18, this.bulletY, 6, 6, this.x, this.y, 10, 10);
    } else if (this.direction === DIRECTIONS.LEFT) {
        CTX.drawImage(SPRITE, this.bulletX + 12, this.bulletY, 6, 6, this.x, this.y, 10, 10);
    }
};

function center() {
    switch (this.direction) {
        case DIRECTIONS.UP:
            this.x += 13;
            this.y -= 3;
            break;
        case DIRECTIONS.DOWN:
            this.x += 13;
            this.y += 40;
            break;
        case DIRECTIONS.RIGHT:
            this.y += 14;
            this.x += 40;
            break;
        case DIRECTIONS.LEFT:
            this.y += 14;
            this.x -= 3;
            break;
    }
}

function changeDirection() {
    switch (randomInteger(1, 4)) {
        case 1:
            return DIRECTIONS.DOWN;
            break;
        case 2:
            return DIRECTIONS.LEFT;
            break;
        case 3:
            return DIRECTIONS.RIGHT;
            break;
        case 4:
            return DIRECTIONS.UP;
            break;
    }
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

function bulletsMove(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].type === "enemyBullet"
                || array[i].type === "playerBullet") {
            array[i].move();
        }
    }
}

function drawBullets(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].type === "playerBullet" || array[i].type === "enemyBullet")
            array[i].draw();
    }
}

function initEnemyBullets(array) {
    var type;
    for (var t = 0; t < array.length; t++) {
        type = array[t].subType + "Bullet";
        if (array[t].type === "enemyTank" && (getObjectSubType(array, type)).length < 1) {
            array.push(new Bullet(array[t].x, array[t].y, 6, 6, 4,
                    IMAGES_COORDS.bullet.x, IMAGES_COORDS.bullet.y, "enemyBullet",
                    array[t].subType + "Bullet", array[t].direction, array[t].id));
        }
    }
}

function initPlayerBullet(array) {
    if (getObject(array, "playerBullet").length < 1) {
        array.push(new Bullet(getObject(array, "playerTank")[0].x, getObject(array, "playerTank")[0].y, 6, 6, 4,
                IMAGES_COORDS.bullet.x, IMAGES_COORDS.bullet.y,
                "playerBullet", "", getObject(array, "playerTank")[0].direction));
        sound.play(SOUNDS.shoot);
    }
}

function updateBullet(array) {
    bulletsMove(array);
    bulletLifeCycle(array, getObject(array, "enemyBullet"));
    bulletLifeCycle(array, getObject(array, "playerBullet"));
    initEnemyBullets(array);
}

function bulletLifeCycle(array, bullet) {
    for (var t = 0; t < bullet.length; t++) {
        if (array.indexOf(bullet[t])) {
            for (var i = 0; i < array.length; i++) {
                if (collision(bullet[t], array[i])) {
                    switch (array[i].type) {
                        case "brick":
                            bulletAftermath(array, bullet[t], SOUNDS.shootBrick, array[i].x, array[i].y);
                            array.splice(i, 1);
                            break;
                        case "concrete":
                            bulletAftermath(array, bullet[t], SOUNDS.shootOver, array[i].x, array[i].y);
                            break;
                        case "flag":
                            bulletAftermath(array, bullet[t], SOUNDS.explode, array[i].x, array[i].y);
                            array[i].state = "damaged";
                            break;
                        case "playerTank":
                            bulletAftermath(array, bullet[t], SOUNDS.explode, array[i].x, array[i].y);
                            array.splice(i, 1);
                            break;
                        case "enemyTank" :
                            if (bullet[t].type === "playerBullet") {
                                bulletAftermath(array, bullet[t], SOUNDS.shootBrick, array[i].x, array[i].y);
                                resultsCalc(array[i].subType, array[i]);
                                array.splice(i, 1);
                            }
                            break;
                    }
                }
            }
            if (bullet[t].y < 1) {
                bulletAftermath(array, bullet[t], SOUNDS.shootOver, bullet[t].x - 24, bullet[t].y);
            } else if (bullet[t].x < 1) {
                bulletAftermath(array, bullet[t], SOUNDS.shootOver, bullet[t].x, bullet[t].y - 24);
            } else if (bullet[t].x > BATTLEFIELD_WIDTH) {
                bulletAftermath(array, bullet[t], SOUNDS.shootOver, bullet[t].x - 48, bullet[t].y - 24);
            } else if (bullet[t].y > BATTLEFIELD_HEIGHT) {
                bulletAftermath(array, bullet[t], SOUNDS.shootOver, bullet[t].x - 24, bullet[t].y - 48);
            }
        }
    }
}

function bulletAftermath(array, bullet, soundName, x, y) {
    array.splice(array.indexOf(bullet), 1);
    sound.play(soundName);
    explosionInit(x, y, array, IMAGES_COORDS.explosion.x, IMAGES_COORDS.explosion.y);
}