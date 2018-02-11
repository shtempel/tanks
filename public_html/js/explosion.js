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
function explosionInit(x, y, array, spriteCoordX, spriteCoordY) {
    array.push(new Explosion(x, y, 0, 0, spriteCoordX,
            spriteCoordY, "explosion"));

}

function explosionManager(explosionType, array, x, y) {
    switch (explosionType) {
        case  "brick":
            explosionInit(x, y, array, IMAGES_COORDS.explosion.x,
                    IMAGES_COORDS.explosion.y, "explosion");
            break;
        case "concrete":
            explosionInit(x, y, array, IMAGES_COORDS.explosion.x,
                    IMAGES_COORDS.explosion.y, "explosion");
            break;
    }
}

function explosionLife(array) {
    drawExplosions(array);
    explosionDelete(array);
}

function drawExplosions(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].type === "explosion") {
            array[i].draw();
        }
    }
}

function explosionDelete(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].type === "explosion") {
            array.splice(i, 1);
        }
    }
}