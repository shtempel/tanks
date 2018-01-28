function Tank(x, y, width, height, speed, tankX, tankY, type, dir) {
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
    }
};
Tank.prototype.draw = function () {
    if (this.dir === DIRECTIONS.UP) {
        CTX.drawImage(SPRITE, this.tankX, this.tankY, 32, 32, this.x, this.y, TILE_WIDTH, TILE_HEIGHT);
    } else if (this.dir === DIRECTIONS.DOWN) {
        CTX.drawImage(SPRITE, this.tankX + 34, this.tankY, 32, 32, this.x, this.y, TILE_WIDTH, TILE_HEIGHT);
    } else if (this.dir === DIRECTIONS.RIGHT) {
        CTX.drawImage(SPRITE, this.tankX + 96, this.tankY, 32, 32, this.x, this.y, TILE_WIDTH, TILE_HEIGHT);
    } else if (this.dir === DIRECTIONS.LEFT) {
        CTX.drawImage(SPRITE, this.tankX + 66, this.tankY, 32, 32, this.x, this.y, TILE_WIDTH, TILE_HEIGHT);
    }
};
function initTank() {
    OBJECTS.push(new Tank(PLAYER_START_LOCATION.x, PLAYER_START_LOCATION.y, 40,
            40, 2, IMAGES_COORDS.tank.x, IMAGES_COORDS.tank.y,
            "playerTank", DIRECTIONS.UP));
}

function getPlayerTank() {
    var playerTank;
    for (var i = 0; i < OBJECTS.length; i++) {
        if (OBJECTS[i].type == "playerTank") {
            playerTank = OBJECTS[i];
        }
    }
    return playerTank;
}

Tank.prototype.playerMove = function (dir) {
    switch (dir) {
        case DIRECTIONS.UP:
            getPlayerTank().moveUp();
            getPlayerTank().setDirection(getPlayerTank(), DIRECTIONS.UP);
            break;
        case DIRECTIONS.DOWN:
            getPlayerTank().moveDown();
            getPlayerTank().setDirection(getPlayerTank(), DIRECTIONS.DOWN);
            break;
        case DIRECTIONS.LEFT:
            getPlayerTank().moveLeft();
            getPlayerTank().setDirection(getPlayerTank(), DIRECTIONS.LEFT);
            break;
        case DIRECTIONS.RIGHT:
            getPlayerTank().moveRight();
            getPlayerTank().setDirection(getPlayerTank(), DIRECTIONS.RIGHT);
            break;
    }
};

function drawAllTanks() {
    for (var i = 0; i < OBJECTS.length; i++) {
        if (OBJECTS[i].type === "playerTank")
            OBJECTS[i].draw();
    }
}

Tank.prototype.moveLeft = function () {
    move(getPlayerTank(), -getPlayerTank().speed, 0);
};

Tank.prototype.moveRight = function () {
    move(getPlayerTank(), getPlayerTank().speed, 0);
};

Tank.prototype.moveUp = function () {
    move(getPlayerTank(), 0, -getPlayerTank().speed);
};

Tank.prototype.moveDown = function () {
    move(getPlayerTank(), 0, getPlayerTank().speed);
};

function move(tank, x, y) {
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
    for (var i = 0; i < OBJECTS.length; i++) {
        if (collision(fantomTank, OBJECTS[i]) === true && OBJECTS[i].type === "brick") {
            possible = false;
            break;
        } else if (collision(fantomTank, OBJECTS[i]) === true && OBJECTS[i].type === "concrete") {
            possible = false;
            break;
        } else if (collision(fantomTank, OBJECTS[i]) === true && OBJECTS[i].type === "flag") {
            possible = false;
            break;
        }

    }
    if (possible) {
        tank.x = nx;
        tank.y = ny;
    }
}

Tank.prototype.shoot = function () {
    initBullet();   
};