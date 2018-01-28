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
    if (bulletMovePossibility(arr, getPlayerBullet()) === true) {
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

function initBullet() {
    if (checkBullets(OBJECTS) < 1) {
        OBJECTS.push(new Bullet(getPlayerTank().x, getPlayerTank().y, 6, 6, 4,
                IMAGES_COORDS.bullet.x, IMAGES_COORDS.bullet.y,
                "playerBullet", getPlayerTank().dir));
    } else {
        return;
    }
}

function checkBullets(arr) {
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type === "playerBullet") {
            temp.push(OBJECTS[i]);
        }
    }
    return temp.length;
}

function bulletDestroy(arr) {
//    if (checkBullets(arr) > 0 && (getPlayerBullet().y < 0 || getPlayerBullet().x < 0
//            || getPlayerBullet().x > BATTLEFIELD_WIDTH || getPlayerBullet().y > BATTLEFIELD_HEIGHT)) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type === "playerBullet") {
            arr.splice(i, 1);
        }
    }
    //}
}

function bulletMovePossibility(arr, bullet) {
    var possible = true;
    for (var i = 0; i < arr.length; i++) {
        if (checkBullets(arr) > 0 && (collision(bullet, arr[i]) === true && arr[i].type === "brick" ||
                collision(bullet, arr[i]) === true && arr[i].type === "concrete" ||
                collision(bullet, arr[i]) === true && arr[i].type === "flag")) {
            bulletDestroy(arr);
            possible = false;
        }
    }
    return possible;
}

function drawPlayerBullet() {
    for (var i = 0; i < OBJECTS.length; i++) {
        if (OBJECTS[i].type === "playerBullet")
            OBJECTS[i].draw();
    }
}

function getPlayerBullet() {
    var playerBullet;
    for (var i = 0; i < OBJECTS.length; i++) {
        if (OBJECTS[i].type == "playerBullet") {
            playerBullet = OBJECTS[i];
        }
    }
    return playerBullet;
}