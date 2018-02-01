"use strict";

function BattleScreen() {
    this.x = 0;
    this.y = 212;
    this.width = CANVAS.width;
    this.height = CANVAS.height;
    this.height = 200;
}

BattleScreen.prototype.draw = function () {
    CTX.fillStyle = COLORS.LIGHT_GRAY;
    CTX.fillRect(this.x, this.y, CANVAS.width, CANVAS.height);
};

BattleScreen.prototype.drawSplash = function () {
    CTX.fillStyle = COLORS.BLACK;
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.drawImage(READY_PIC, this.x, this.y, this.width, this.height);
    //sound.play("stageStart");
    if (this.x < 600) {
        this.x += READY_SPEED;
    } else {
        state = GAME_STATE.STATE_PLAY;
        this.x = 0;
        return;
    }
};

BattleScreen.prototype.drawMap = function (arr) {
    CTX.fillStyle = COLORS.LIGHT_GRAY;
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.fillStyle = COLORS.BLACK;
    CTX.fillRect(0, 0, BATTLEFIELD_WIDTH, BATTLEFIELD_HEIGHT);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type == "playerTank") {
            return;
        } else {
            arr[i].draw();
        }
    }
};

function BattleScreenObject() {
}

function Brick(x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
}

function Concrete(x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
}

function Flag(x, y, width, height, type, flagX, flagY, state) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.flagX = flagX;
    this.flagY = flagY;
    this.state = state;
}

Brick.prototype = new BattleScreenObject();
Brick.prototype.draw = function () {
    CTX.drawImage(SPRITE, IMAGES_COORDS.brick.x, IMAGES_COORDS.brick.y, 16, 16, this.x + 24, this.y, TILE_WIDTH / 2, TILE_HEIGHT / 2);
    CTX.drawImage(SPRITE, IMAGES_COORDS.brick.x, IMAGES_COORDS.brick.y, 16, 16, this.x, this.y + 24, TILE_WIDTH / 2, TILE_HEIGHT / 2);
    CTX.drawImage(SPRITE, IMAGES_COORDS.brick.x, IMAGES_COORDS.brick.y, 16, 16, this.x + 24, this.y + 24, TILE_WIDTH / 2, TILE_HEIGHT / 2);
    CTX.drawImage(SPRITE, IMAGES_COORDS.brick.x, IMAGES_COORDS.brick.y, 16, 16, this.x, this.y, TILE_WIDTH / 2, TILE_HEIGHT / 2);
};

Concrete.prototype = new BattleScreenObject();
Concrete.prototype.draw = function () {
    CTX.drawImage(SPRITE, IMAGES_COORDS.concrete.x, IMAGES_COORDS.concrete.y, 16, 16, this.x + 24, this.y, TILE_WIDTH / 2, TILE_HEIGHT / 2);
    CTX.drawImage(SPRITE, IMAGES_COORDS.concrete.x, IMAGES_COORDS.concrete.y, 16, 16, this.x + 24, this.y + 24, TILE_WIDTH / 2, TILE_HEIGHT / 2);
    CTX.drawImage(SPRITE, IMAGES_COORDS.concrete.x, IMAGES_COORDS.concrete.y, 16, 16, this.x, this.y + 24, TILE_WIDTH / 2, TILE_HEIGHT / 2);
    CTX.drawImage(SPRITE, IMAGES_COORDS.concrete.x, IMAGES_COORDS.concrete.y, 16, 16, this.x, this.y, TILE_WIDTH / 2, TILE_HEIGHT / 2);
};

Flag.prototype = new BattleScreenObject();
Flag.prototype.draw = function () {
    if (this.state === "normal") {
        CTX.drawImage(SPRITE, IMAGES_COORDS.flag.x, IMAGES_COORDS.flag.y, 32, 32, this.x, this.y, TILE_WIDTH, TILE_HEIGHT);
    } else if (this.state === "damaged") {
        CTX.drawImage(SPRITE, IMAGES_COORDS.flag.x + 32, IMAGES_COORDS.flag.y, 32, 32, this.x, this.y, TILE_WIDTH, TILE_HEIGHT);
    }
};

function initMap(arr) {
    for (var i = 0; i < 13; i++) {
        for (var t = 0; t < 13; t++) {
            if (LEVELS.levelOne[i][t] == 1) {
                arr.push(new Brick(t * TILE_WIDTH, i * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, "brick"));
            } else if (LEVELS.levelOne[i][t] == 2) {
                arr.push(new Concrete(t * TILE_WIDTH, i * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, "concrete"));
            } else if (LEVELS.levelOne[i][t] == 3) {
                arr.push(new Flag(t * TILE_WIDTH, i * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, "flag", IMAGES_COORDS.flag.x, IMAGES_COORDS.flag.y, "normal"));
            }
        }
    }
}

function collision(obj1, obj2) {
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
}