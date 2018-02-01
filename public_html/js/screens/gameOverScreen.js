"use strict";

function GameOverScreen() {
    this.width = CANVAS.width;
    this.height = CANVAS.height;
    this.x = 160;
    this.y = 624;
}

GameOverScreen.prototype.draw = function () {
    CTX.fillStyle = COLORS.LIGHT_GRAY;
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.drawImage(SPRITE, IMAGES_COORDS.gameOver.x, IMAGES_COORDS.gameOver.y, 275, 200, this.x, this.y, 275, 130);
    if (this.y > 275) {
        this.y -= GAME_OVER_SPEED;
    } else {
        state = GAME_STATE.STATE_RESULTS;
        this.y = 0;
        return;
    }
};