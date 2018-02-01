function Tank(x, y, width, height, speed, tankX, tankY, type, dir, hit, score) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.moving = false;
    this.shooting = false;
    this.type = type;
    this.tankX = tankX;
    this.tankY = tankY;
    this.dir = dir;
    this.hit = hit;
    this.score = score;
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
    setDirection: function (tank, dir) {
        tank.dir = dir;
    },
    setHit: function (hit) {
        this.hit = hit;
    },
    getHit: function () {
        return this.hit;
    }
};
Tank.prototype.draw = function () {
    if (this.dir === DIRECTIONS.UP) {
        CTX.drawImage(SPRITE, this.tankX, this.tankY, 30, 30, this.x, this.y, TILE_WIDTH, TILE_HEIGHT);
    } else if (this.dir === DIRECTIONS.DOWN) {
        CTX.drawImage(SPRITE, this.tankX + 34, this.tankY, 30, 30, this.x, this.y, TILE_WIDTH, TILE_HEIGHT);
    } else if (this.dir === DIRECTIONS.RIGHT) {
        CTX.drawImage(SPRITE, this.tankX + 96, this.tankY, 30, 30, this.x, this.y, TILE_WIDTH, TILE_HEIGHT);
    } else if (this.dir === DIRECTIONS.LEFT) {
        CTX.drawImage(SPRITE, this.tankX + 66, this.tankY, 30, 30, this.x, this.y, TILE_WIDTH, TILE_HEIGHT);
    }
};

function initTank(arr) {
    arr.push(new Tank(PLAYER_START_LOCATION.x, PLAYER_START_LOCATION.y, 40,
            40, 2, IMAGES_COORDS.tank.x, IMAGES_COORDS.tank.y,
            "playerTank", DIRECTIONS.UP));
    arr.push(new Tank(ENEMY_START_LOCATIONS.FAT.x, ENEMY_START_LOCATIONS.FAT.y, 40,
            40, 2, IMAGES_COORDS.enemyTankFat.x, IMAGES_COORDS.enemyTankFat.y,
            "enemyTankFat", DIRECTIONS.DOWN, undefined, TANKS_REWARD.fat));
    arr.push(new Tank(ENEMY_START_LOCATIONS.FAST.x, ENEMY_START_LOCATIONS.FAST.y, 40,
            40, 2, IMAGES_COORDS.enemyTankFast.x, IMAGES_COORDS.enemyTankFast.y,
            "enemyTankFast", DIRECTIONS.DOWN, undefined, TANKS_REWARD.fast));
    arr.push(new Tank(ENEMY_START_LOCATIONS.NORMAL.x, ENEMY_START_LOCATIONS.NORMAL.y, 40,
            40, 2, IMAGES_COORDS.enemyTankNormal.x, IMAGES_COORDS.enemyTankNormal.y,
            "enemyTankNormal", DIRECTIONS.DOWN, undefined, TANKS_REWARD.normal));
}

Tank.prototype.playerMove = function (dir, arr) {
    switch (dir) {
        case DIRECTIONS.UP:
            getPlayerTank(arr).moveUp(arr);
            getPlayerTank(arr).setDirection(getPlayerTank(arr), DIRECTIONS.UP);
            break;
        case DIRECTIONS.DOWN:
            getPlayerTank(arr).moveDown(arr);
            getPlayerTank(arr).setDirection(getPlayerTank(arr), DIRECTIONS.DOWN);
            break;
        case DIRECTIONS.LEFT:
            getPlayerTank(arr).moveLeft(arr);
            getPlayerTank(arr).setDirection(getPlayerTank(arr), DIRECTIONS.LEFT);
            break;
        case DIRECTIONS.RIGHT:
            getPlayerTank(arr).moveRight(arr);
            getPlayerTank(arr).setDirection(getPlayerTank(arr), DIRECTIONS.RIGHT);
            break;
    }
};

function drawAllTanks(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type === "playerTank" || arr[i].type === "enemyTankFat" ||
                arr[i].type === "enemyTankFast" || arr[i].type === "enemyTankNormal") {

        }
        arr[i].draw();
    }
}

Tank.prototype.moveLeft = function (arr) {
    move(getPlayerTank(), -getPlayerTank().speed, 0, arr);
};

Tank.prototype.moveRight = function (arr) {
    move(getPlayerTank(), getPlayerTank().speed, 0, arr);
};

Tank.prototype.moveUp = function (arr) {
    move(getPlayerTank(), 0, -getPlayerTank().speed, arr);
};

Tank.prototype.moveDown = function (arr) {
    move(getPlayerTank(), 0, getPlayerTank().speed, arr);
};

function move(tank, x, y, arr) {
    var nx = tank.x + x,
            ny = tank.y + y;


    if (nx < 0) {
        nx = 0;
    } else if (ny < 0) {
        ny = 0;
    } else if (nx > BATTLEFIELD_HEIGHT - 44) {
        nx = BATTLEFIELD_HEIGHT - 44;
    } else if (ny > BATTLEFIELD_HEIGHT - 44) {
        ny = BATTLEFIELD_HEIGHT - 44;
    }
    var fantomTank = {
        x: nx,
        y: ny,
        width: tank.width,
        height: tank.height
    };

    var possible = true;
    for (var i = 0; i < arr.length; i++) {
        if (collision(fantomTank, arr[i]) && arr[i].type === "brick") {
            possible = false;
            break;
        } else if (collision(fantomTank, arr[i]) && arr[i].type === "concrete") {
            possible = false;
            break;
        } else if (collision(fantomTank, arr[i]) && arr[i].type === "flag") {
            possible = false;
            break;
        }

    }
    if (possible) {
        tank.x = nx;
        tank.y = ny;
    }
}

Tank.prototype.shoot = function (arr) {
    initBullet(arr);
};