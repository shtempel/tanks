"use strict";
function Bullet(x, y, width, height, speed, bulletX, bulletY, type, dir) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.bulletX = bulletX;
    this.bulletY = bulletY;
    this.dir = dir;
    this.type = type;
    this.bulletFlight = false;
    initXY.call(this);
}
;

function initXY() {
    switch (this.dir) {
        case DIRECTIONS.UP:
            this.x += 18;
            this.y -= 3;
            break;
        case DIRECTIONS.DOWN:
            this.x += 18;
            this.y += 40;
            break;
        case DIRECTIONS.RIGHT:
            this.y += 18;
            this.x += 40;
            break;
        case DIRECTIONS.LEFT:
            this.y += 18;
            this.x -= 3;
            break;
    }
}
;

Bullet.prototype = {
    setDirection: function (bullet, dir) {
        bullet.dir = dir;
    },
    setFlight: function () {
        this.bulletFlight = true;
    }
};

Bullet.prototype.draw = function () {
    if (this.dir === DIRECTIONS.UP) {
        CTX.drawImage(SPRITE, this.bulletX, this.bulletY, 6, 6, this.x, this.y, 10, 10);
    } else if (this.dir === DIRECTIONS.DOWN) {
        CTX.drawImage(SPRITE, this.bulletX + 6, this.bulletY, 6, 6, this.x, this.y, 10, 10);
    } else if (this.dir === DIRECTIONS.RIGHT) {
        CTX.drawImage(SPRITE, this.bulletX + 18, this.bulletY, 6, 6, this.x, this.y, 10, 10);
    } else if (this.dir === DIRECTIONS.LEFT) {
        CTX.drawImage(SPRITE, this.bulletX + 12, this.bulletY, 6, 6, this.x, this.y, 10, 10);
    }
};

Bullet.prototype.move = function (arr) {
    if (bulletMovePossibility(arr, getPlayerBullet(arr))) {
        switch (this.dir) {
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
    }
};

function initBullet(arr) {
    if (checkBullets(arr) < 1) {
        arr.push(new Bullet(getPlayerTank(arr).x, getPlayerTank(arr).y, 6, 6, 4,
                IMAGES_COORDS.bullet.x, IMAGES_COORDS.bullet.y,
                "playerBullet", getPlayerTank(arr).dir));
        sound.play(SOUNDS.shoot);
    } else {
        return;
    }
}

function checkBullets(arr) {
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type === "playerBullet") {
            temp.push(arr[i]);
        }
    }
    return temp.length;
}

function bulletDestroy(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type === "playerBullet") {
            arr.splice(i, 1);
        }
    }
}

function bulletMovePossibility(arr) {
    var possible = true,
            bullet = getPlayerBullet(arr);
    for (var i = 0; i < arr.length; i++) {
        if (checkBullets(arr)) {
            if (bullet.y < 1) {
                possible = false;
            } else if (bullet.x < 1) {
                possible = false;
            } else if (bullet.x > BATTLEFIELD_WIDTH) {
                possible = false;
            } else if (bullet.y > BATTLEFIELD_HEIGHT) {
                possible = false;
            } else if (checkBullets(arr) && (collision(bullet, arr[i]) && arr[i].type === "brick" ||
                    collision(bullet, arr[i]) && arr[i].type === "concrete" ||
                    collision(bullet, arr[i]) && arr[i].type === "flag")) {
                //explosionInit(arr[i].x, arr[i].y, arr);
                //bulletDestroy(arr);
                //deleteBlock(arr, arr[i].x, arr[i].y);
                //explosionDelete(arr);
                possible = false;
            }
        }
    }
    return possible;
}

function drawPlayerBullet(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type === "playerBullet")
            arr[i].draw();
    }
}

function updateBullet(arr) {
    bulletCollision(arr);
}

function bulletCollision(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type === "playerBullet") {
            arr[i].move(arr);
            if (arr[i].y < 1) {
                explosionInit(arr[i].x - 24, 0, arr);
                bulletAftermath(arr, SOUNDS.shootOver);
            } else if (arr[i].x < 1) {
                explosionInit(0, arr[i].y - 24, arr);
                bulletAftermath(arr, SOUNDS.shootOver);
            } else if (arr[i].x > BATTLEFIELD_WIDTH) {
                explosionInit(arr[i].x - 48, arr[i].y - 24, arr);
                bulletAftermath(arr, SOUNDS.shootOver);
            } else if (arr[i].y > BATTLEFIELD_HEIGHT) {
                explosionInit(arr[i].x - 24, arr[i].y - 48, arr);
                bulletAftermath(arr, SOUNDS.shootOver);
            }
        }
        if (checkBullets(arr)) {
            if (collision(getPlayerBullet(), arr[i]) && arr[i].type === "brick") {
                explosionInit(arr[i].x, arr[i].y, arr);
                deleteBlock(arr, arr[i].x, arr[i].y);
                bulletAftermath(arr, SOUNDS.shootBrick);
            } else if (collision(getPlayerBullet(), arr[i]) && arr[i].type === "concrete") {
                explosionInit(arr[i].x, arr[i].y, arr);
                bulletAftermath(arr, SOUNDS.shootOver);
            } else if (collision(getPlayerBullet(), arr[i]) && arr[i].type === "flag") {
                bulletAftermath(arr, SOUNDS.explode);
                arr[i].state = "damaged";
            } else if (collision(getPlayerBullet(), arr[i]) && (arr[i].type === "enemyTankFat" ||
                    arr[i].type === "enemyTankFast" || arr[i].type === "enemyTankNormal")) {
                explosionInit(arr[i].x, arr[i].y, arr);
                deleteBlock(arr, arr[i].x, arr[i].y);
                bulletAftermath(arr, SOUNDS.shootBrick);
            }
        }
    }
}

function bulletAftermath(arr, soundType, x, y) {
    bulletDestroy(arr);
    explosionDelete(arr);
    sound.play(soundType);
    deleteBlock(arr, x, y);
}