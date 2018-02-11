"use strict";

function ResultScreen() {
    this.x = 200;
    this.y = 200;
    this.width = CANVAS.width;
    this.height = CANVAS.height;
}

ResultScreen.prototype.draw = function () {
    CTX.fillStyle = COLORS.LIGHT_GRAY;
    CTX.fillRect(0, 0, this.width, this.height = CANVAS.height);
    CTX.fillStyle = COLORS.BLACK;
    CTX.font = "15px Arial";

    CTX.drawImage(SPRITE, IMAGES_COORDS.enemyTankNormal.x + 96,
            IMAGES_COORDS.enemyTankNormal.y, 30, 30, this.x, this.y, 40, 40);
    CTX.fillText("x " + TANKS_DESTROYED.normal + "    " + TANKS_REWARD.normal *
            TANKS_DESTROYED.normal, this.x + 50, this.y + 25);

    CTX.drawImage(SPRITE, IMAGES_COORDS.enemyTankFast.x + 96,
            IMAGES_COORDS.enemyTankFast.y, 30, 30, this.x, this.y + 50, 40, 40);
    CTX.fillText("x " + TANKS_DESTROYED.fast + "    " + TANKS_REWARD.fast *
            TANKS_DESTROYED.fast, this.x + 50, this.y + 75);

    CTX.drawImage(SPRITE, IMAGES_COORDS.enemyTankFat.x + 96,
            IMAGES_COORDS.enemyTankFat.y, 30, 30, this.x, this.y + 100, 40, 40);
    CTX.fillText("x " + TANKS_DESTROYED.fat + "    " + TANKS_REWARD.fat *
            TANKS_DESTROYED.fat, this.x + 50, this.y + 125);
    CTX.fillText("total: " + SCORE, this.x + 150, this.y + 150);
};