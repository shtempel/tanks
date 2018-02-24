"use strict";

(function () {
    Game.models.screens.Battle = Battle;

    var width = Game.utils.data.constants.SIZES.CANVAS.width,
            height = Game.utils.data.constants.SIZES.CANVAS.height,
            sprite = Game.utils.data.constants.IMAGES.SPRITE,
            tileWidth = Game.utils.data.constants.SIZES.TILE.width,
            tileHeight = Game.utils.data.constants.SIZES.TILE.height,
            map = Game.utils.data.constants.MAPS.levelOne,
            imgCoords = Game.utils.data.constants.IMG_COORDS,
            color = Game.utils.data.constants.COLORS.BLACK,
            srcWidth = Game.utils.data.constants.SIZES.BRICK_CONCRETE.width,
            scrHeight = Game.utils.data.constants.SIZES.BRICK_CONCRETE.height,
            flagSrcWidth = Game.utils.data.constants.SIZES.FLAG.width,
            flagSrcHeight = Game.utils.data.constants.SIZES.FLAG.height;


    function Battle() {
        this.x = 0;
        this.y = 212;
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.color = color;
    }

    Battle.prototype.initMap = function (array) {
        for (var i = 0; i < 13; i++) {
            for (var t = 0; t < 13; t++) {
                if (map[i][t] === 1) {
                    array.push(new Brick(t * this.tileWidth, i * this.tileHeight,
                            this.tileWidth, this.tileWidth, "brick"));
                } else if (map[i][t] === 2) {
                    array.push(new Concrete(t * this.tileWidth, i * this.tileHeight,
                            this.tileWidth, this.tileWidth, "concrete"));
                } else if (map[i][t] === 3) {
                    array.push(new Flag(t * this.tileWidth, i * this.tileHeight,
                            this.tileWidth, this.tileHeight, "flag", imgCoords.FLAG.x,
                            imgCoords.FLAG.y, "normal"));
                }
            }
        }
    };

    Battle.prototype.drawMap = function (array, ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, width, height);
        for (var i = 0; i < array.length; i++) {
            array[i].draw(ctx);
        }
    };

    function BattleObject() {
    }

    function Brick(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    function Concrete(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
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
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    Brick.prototype = new BattleObject();
    Brick.prototype.draw = function (ctx) {
        ctx.drawImage(sprite, imgCoords.BRICK.x, imgCoords.BRICK.y, srcWidth, scrHeight,
                this.x + 24, this.y, this.tileWidth / 2, this.tileHeight / 2);
        ctx.drawImage(sprite, imgCoords.BRICK.x, imgCoords.BRICK.y, srcWidth, scrHeight,
                this.x, this.y + 24, this.tileWidth / 2, this.tileHeight / 2);
        ctx.drawImage(sprite, imgCoords.BRICK.x, imgCoords.BRICK.y, srcWidth, scrHeight,
                this.x + 24, this.y + 24, this.tileWidth / 2, this.tileHeight / 2);
        ctx.drawImage(sprite, imgCoords.BRICK.x, imgCoords.BRICK.y, srcWidth, scrHeight,
                this.x, this.y, this.tileWidth / 2, this.tileHeight / 2);
    };

    Concrete.prototype = new BattleObject();
    Concrete.prototype.draw = function (ctx) {
        ctx.drawImage(sprite, imgCoords.CONCRETE.x, imgCoords.CONCRETE.y, srcWidth, scrHeight,
                this.x + 24, this.y, this.tileWidth / 2, this.tileHeight / 2);
        ctx.drawImage(sprite, imgCoords.CONCRETE.x, imgCoords.CONCRETE.y, srcWidth, scrHeight,
                this.x + 24, this.y + 24, this.tileWidth / 2, this.tileHeight / 2);
        ctx.drawImage(sprite, imgCoords.CONCRETE.x, imgCoords.CONCRETE.y, srcWidth, scrHeight,
                this.x, this.y + 24, this.tileWidth / 2, this.tileHeight / 2);
        ctx.drawImage(sprite, imgCoords.CONCRETE.x, imgCoords.CONCRETE.y, srcWidth, scrHeight,
                this.x, this.y, this.tileWidth / 2, this.tileHeight / 2);
    };

    Flag.prototype = new BattleObject();
    Flag.prototype.draw = function (ctx) {
        if (this.state === "normal") {
            ctx.drawImage(sprite, imgCoords.FLAG.x, imgCoords.FLAG.y, flagSrcWidth, flagSrcHeight,
                    this.x, this.y, this.tileWidth, this.tileHeight);
        } else if (this.state === "damaged") {
            ctx.drawImage(sprite, imgCoords.FLAG.x + 32, imgCoords.FLAG.y, flagSrcWidth, flagSrcHeight,
                    this.x, this.y, this.tileWidth, this.tileHeight);
        }
    };

})();