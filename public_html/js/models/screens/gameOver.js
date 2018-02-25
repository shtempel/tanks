"use strict";

(function () {
    Game.models.screens.GameOver = GameOver;

    var speed = Game.utils.data.constants.SPEED.GAME_OVER,
            width = Game.utils.data.constants.SIZES.CANVAS.width,
            height = Game.utils.data.constants.SIZES.CANVAS.height,
            sprite = Game.utils.data.constants.IMAGES.SPRITE,
            imgCoords = Game.utils.data.constants.IMG_COORDS.GAME_OVER,
            color = Game.utils.data.constants.COLORS.LIGHT_GRAY,
            gameState = Game.utils.data.constants.GAME_STATE.RESULTS;

    function GameOver() {
        this.width = width;
        this.height = height;
        this.x = 160;
        this.y = 624;
        this.color = color;
        this.srcWidth = 275;
        this.scrHeight = 130;
        this.destWidth = 275;
        this.destHeight = 130;
    }

    GameOver.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.drawImage(sprite, imgCoords.x, imgCoords.y, this.srcWidth,
               this.scrHeight, this.x, this.y, this.destWidth, this.destHeight);
        if (this.y > 275) {
            this.y -= speed;
        } else {
            STATE = gameState;
			this.y = 624;
            return;
        }
    };

})();