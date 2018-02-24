"use strict";

(function () {

    Game.models.Bullet = Bullet;

    var directions = Game.utils.data.constants.DIRECTIONS,
            sprite = Game.utils.data.constants.IMAGES.SPRITE,
            imgCoords = Game.utils.data.constants.IMG_COORDS,
            sounds = Game.utils.data.constants.SOUNDS;

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

    Bullet.prototype.move = function () {
        switch (this.direction) {
            case directions.UP:
                this.y -= this.speed;
                break;
            case directions.DOWN:
                this.y += this.speed;
                break;
            case directions.LEFT:
                this.x -= this.speed;
                break;
            case directions.RIGHT:
                this.x += this.speed;
                break;
        }
    };

    Bullet.prototype.draw = function (ctx) {
        if (this.direction === directions.UP) {
            ctx.drawImage(sprite, this.bulletX, this.bulletY, 6, 6, this.x, this.y, 10, 10);
        } else if (this.direction === directions.DOWN) {
            ctx.drawImage(sprite, this.bulletX + 6, this.bulletY, 6, 6, this.x, this.y, 10, 10);
        } else if (this.direction === directions.RIGHT) {
            ctx.drawImage(sprite, this.bulletX + 18, this.bulletY, 6, 6, this.x, this.y, 10, 10);
        } else if (this.direction === directions.LEFT) {
            ctx.drawImage(sprite, this.bulletX + 12, this.bulletY, 6, 6, this.x, this.y, 10, 10);
        }
    };

    function center() {
        switch (this.direction) {
            case directions.UP:
                this.x += 13;
                this.y -= 3;
                break;
            case directions.DOWN:
                this.x += 13;
                this.y += 40;
                break;
            case directions.RIGHT:
                this.y += 14;
                this.x += 40;
                break;
            case directions.LEFT:
                this.y += 14;
                this.x -= 3;
                break;
        }
    }

    Bullet.prototype.initPlayerBullet = function (array, playerTank, helper, soundPlayer) {
        if (helper.getObject(array, "playerBullet").length < 1) {
            array.push(new Bullet(playerTank.x, playerTank.y, 6, 6, 4,
                    imgCoords.BULLET.x, imgCoords.BULLET.y,
                    "playerBullet", "", playerTank.direction));
            soundPlayer.play(sounds.SHOOT);
        }
    };

    Bullet.prototype.initEnemyBullet = function (array, helper) {
        var type;
        for (var t = 0; t < array.length; t++) {
            type = array[t].subType + "Bullet";
            if (array[t].type === "enemyTank" && (helper.getObjectSubType(array, type)).length < 1) {
                array.push(new Bullet(array[t].x, array[t].y, 6, 6, 4,
                        imgCoords.BULLET.x, imgCoords.BULLET.y, "enemyBullet",
                        array[t].subType + "Bullet", array[t].direction, array[t].id));
            }
        }
    };

    Bullet.prototype.buleltsMove = function (array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].type === "enemyBullet"
                    || array[i].type === "playerBullet") {
                array[i].move();
            }
        }
    };


})();