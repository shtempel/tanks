"use strict";

function SplashScreen() {
    this.x = 0;
    this.y = 212;
    this.width = CANVAS.width;
    this.height = CANVAS.height;
    this.height = 200;
}

SplashScreen.prototype.draw = function () {
    CTX.fillStyle = COLORS.BLACK;
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.drawImage(READY_PIC, this.x, this.y, this.width, this.height);
    sound.play("stageStart");
    if (this.x < 600) {
        this.x += SPLASH_SCREEN_SPEED;
    } else {
        this.x = 0;
        state = GAME_STATE.STATE_PLAY;
        return;
    }
};