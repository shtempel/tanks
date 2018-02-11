"use strict";

function Tank(x, y, width, height, speed, tankX, tankY, type, subType,
        direction, hit, score, id) {
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
    this.hit = hit;
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
    setHit: function (hit) {
        this.hit = hit;
    },
    getHit: function () {
        return this.hit;
    },
    getDirection: function () {
        return this.direction;
    }
};


Tank.prototype.draw = function () {
    if (this.direction === DIRECTIONS.UP) {
        CTX.drawImage(SPRITE, this.tankX, this.tankY, 30, 30, this.x - 6, this.y, 44, 44);
    } else if (this.direction === DIRECTIONS.DOWN) {
        CTX.drawImage(SPRITE, this.tankX + 34, this.tankY, 30, 30, this.x - 2, this.y, 44, 44);
    } else if (this.direction === DIRECTIONS.RIGHT) {
        CTX.drawImage(SPRITE, this.tankX + 96, this.tankY, 30, 30, this.x, this.y - 4, 44, 44);
    } else if (this.direction === DIRECTIONS.LEFT) {
        CTX.drawImage(SPRITE, this.tankX + 66, this.tankY, 30, 30, this.x, this.y - 4, 44, 44);
    }
};

Tank.prototype.moveLeft = function (array, tank) {
    move(tank, -this.speed, 0, array);
    this.direction = DIRECTIONS.LEFT;
};
Tank.prototype.moveRight = function (array, tank) {
    move(tank, this.speed, 0, array);
    this.direction = DIRECTIONS.RIGHT;
};
Tank.prototype.moveUp = function (array, tank) {
    move(tank, 0, -this.speed, array);
    this.direction = DIRECTIONS.UP;
};
Tank.prototype.moveDown = function (array, tank) {
    move(tank, 0, this.speed, array);
    this.direction = DIRECTIONS.DOWN;
};

Tank.prototype.shoot = function (array) {
    initPlayerBullet(array);
};

function move(tank, x, y, arr) {
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
    } else if (nx > BATTLEFIELD_HEIGHT - 44) {
        nx = BATTLEFIELD_HEIGHT - 44;
        tank.setStop();
        possible = false;
    } else if (ny > BATTLEFIELD_HEIGHT - 44) {
        ny = BATTLEFIELD_HEIGHT - 44;
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

    for (var i = 0; i < arr.length; i++) {
        if (collision(fantomTank, arr[i]) && arr[i].type === "brick") {
            possible = false;
            tank.setStop();
            break;
        } else if (collision(fantomTank, arr[i]) && arr[i].type === "concrete") {
            possible = false;
            tank.setStop();
            break;
        } else if (collision(fantomTank, arr[i]) && arr[i].type === "flag") {
            tank.setStop();
            possible = false;
            break;
        } else if ((collision(fantomTank, arr[i]))) {
            if (fantomTank.type === arr[i].type && fantomTank.id === arr[i].id) {
                possible = true;
            } else if (fantomTank.type === "enemyTank" && arr[i].type === "enemyBullet") {
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

function enemyMove(tanks, array) {
    for (var i = 0; i < tanks.length; i++) {
        tanks[i].setMoving();
        if (tanks[i].direction === DIRECTIONS.DOWN) {
            tanks[i].moveDown(array, tanks[i]);
        } else if (tanks[i].direction === DIRECTIONS.UP) {
            tanks[i].moveUp(array, tanks[i]);
        } else if (tanks[i].direction === DIRECTIONS.LEFT) {
            tanks[i].moveLeft(array, tanks[i]);
        } else if (tanks[i].direction === DIRECTIONS.RIGHT) {
            tanks[i].moveRight(array, tanks[i]);
        }
        if (tanks[i].moving === false) {
            tanks[i].direction = changeDirection();
        }
    }
}

function initTanks(array) {
    array.push(new Tank(PLAYER_START_LOCATION.x, PLAYER_START_LOCATION.y, 40, 40,
            1.5, IMAGES_COORDS.tank.x, IMAGES_COORDS.tank.y, "playerTank", " ", DIRECTIONS.UP, 1));
    array.push(new Tank(ENEMY_START_LOCATIONS.FAT.x, ENEMY_START_LOCATIONS.FAT.y, 40,
            40, 1, IMAGES_COORDS.enemyTankFat.x, IMAGES_COORDS.enemyTankFat.y,
            "enemyTank", "fat", DIRECTIONS.DOWN, undefined, TANKS_REWARD.fat, 2));
    array.push(new Tank(ENEMY_START_LOCATIONS.FAST.x, ENEMY_START_LOCATIONS.FAST.y, 40,
            40, 3, IMAGES_COORDS.enemyTankFast.x, IMAGES_COORDS.enemyTankFast.y,
            "enemyTank", "fast", DIRECTIONS.DOWN, undefined, TANKS_REWARD.fast, 2));
    array.push(new Tank(ENEMY_START_LOCATIONS.NORMAL.x, ENEMY_START_LOCATIONS.NORMAL.y, 40,
            40, 1.5, IMAGES_COORDS.enemyTankNormal.x, IMAGES_COORDS.enemyTankNormal.y,
            "enemyTank", "normal", DIRECTIONS.DOWN, undefined, TANKS_REWARD.normal, 4));
}