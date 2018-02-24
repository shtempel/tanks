"use strict";

(function () {

    Game.models.screens.Score = Score;

    var color = Game.utils.data.constants.COLORS,
            width = Game.utils.data.constants.SIZES.CANVAS.width,
            height = Game.utils.data.constants.SIZES.CANVAS.height,
            sprite = Game.utils.data.constants.IMAGES.SPRITE,
            rewards = Game.utils.data.constants.TANKS_REWARD,
            imgCoords = Game.utils.data.constants.IMG_COORDS.TANKS;

    function Score() {
        this.x = 200;
        this.y = 200;
        this.width = width;
        this.height = height;
    }

    Score.prototype.draw = function (ctx) {
        ctx.fillStyle = color.LIGHT_GRAY;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = color.BLACK;
        ctx.font = "15px Arial";

        ctx.drawImage(sprite, imgCoords.NORMAL.x + 96, imgCoords.NORMAL.y, 30, 30,
                this.x, this.y, 40, 40);
        ctx.fillText("x " + TANKS_DESTROYED.NORMAL + "    " + rewards.NORMAL *
                TANKS_DESTROYED.NORMAL, this.x + 50, this.y + 25);

        ctx.drawImage(sprite, imgCoords.FAST.x + 96, imgCoords.FAST.y, 30, 30,
                this.x, this.y + 50, 40, 40);
        ctx.fillText("x " + TANKS_DESTROYED.FAST + "    " + rewards.FAST *
                TANKS_DESTROYED.FAST, this.x + 50, this.y + 75);

        ctx.drawImage(sprite, imgCoords.FAT.x + 96, imgCoords.FAT.y, 30, 30,
                this.x, this.y + 100, 40, 40);
        ctx.fillText("x " + TANKS_DESTROYED.FAT + "    " + rewards.FAT *
                TANKS_DESTROYED.FAT, this.x + 50, this.y + 125);
        ctx.fillText("total: " + SCORE, this.x + 150, this.y + 150);
    };

})();