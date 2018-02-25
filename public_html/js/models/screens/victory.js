"use strict";

(function () {
    Game.models.screens.Victory = Victory;

    var gameState = Game.utils.data.constants.GAME_STATE.RESULTS,
            width = Game.utils.data.constants.SIZES.CANVAS.width,
            height = Game.utils.data.constants.SIZES.CANVAS.height,
            sprite = Game.utils.data.constants.IMAGES.SPRITE,
            color = Game.utils.data.constants.COLORS.LIGHT_GRAY,
            speed = Game.utils.data.constants.SPEED.GAME_OVER,
            imgCoords = Game.utils.data.constants.IMG_COORDS.VICTORY;


    function Victory() {
        this.x = 122;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.color = color;
        this.srcWidth = 380;
        this.scrHeight = 63;
        this.destWidth = 380;
        this.destHeight = 63;
    }

    Victory.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(sprite, imgCoords.x, imgCoords.y, this.srcWidth, this.scrHeight,
                this.x, this.y, this.destWidth, this.destHeight);
        if (this.y < 275) {
            this.y += speed;
        } else {
            STATE = gameState;
			this.y = 0;
            return;
        }
    };
})();