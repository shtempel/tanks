"use strict";
function Explosion(x, y, width, height, explosionX, explosionY, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.explosionX = explosionX;
    this.explosionY = explosionY;
    this.type = type;
}

Explosion.prototype.draw = function () {
    CTX.drawImage(SPRITE, IMAGES_COORDS.explosion.x, IMAGES_COORDS.explosion.y,
            64, 64, this.x, this.y, 50, 50, this.x, this.y);
};
function explosionInit(x, y, arr) {
    arr.push(new Explosion(x, y, 0, 0, IMAGES_COORDS.explosion.x,
            IMAGES_COORDS.explosion.y, "explosion"));
}

function drawExplosions(arr) {
    for (var i in arr) {
        if (arr[i].type === "explosion") {
            arr[i].draw();
        }
    }
}

function explosionDelete(arr) {
    setTimeout(function () {
        for (var i in arr) {
            if (arr[i].type === "explosion") {
                arr.splice(i, 1);
            }
        }
    }, 1000);
}

function deleteBlock(arr, x, y) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type === "brick" && arr[i].x == x && arr[i].y == y) {
            arr.splice(i, 1);
        } else if (arr[i].type === "flag" && arr[i].x == x && arr[i].y == y) {
            arr.splice(i, 1);
        } else if ((arr[i].type === "enemyTankNormal") && arr[i].x == x && arr[i].y == y) {
            if (arr[i].type === "enemyTankFat") {
                ++TANKS_DESTROYED.fat;
            } else if (arr[i].type === "enemyTankFast") {
                ++TANKS_DESTROYED.fast;
            } else if (arr[i].type === "enemyTankNormal") {
                ++TANKS_DESTROYED.normal;
            }
            SCORE += arr[i].score;
            arr.splice(i, 1);
        }
    }
}