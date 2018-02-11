"use strict";

function Sound() {
}

Sound.prototype.play = function (soundName) {
    var sound = document.getElementById(soundName);
    sound.play();
};

Sound.prototype.stop = function (soundName) {
    var sound = document.getElementById(soundName);
    sound.pause(soundName);
};

function tankSounds(tank) {
    if (state === GAME_STATE.STATE_PLAY) {
        if (tank.getMoving()) {
            sound.stop(SOUNDS.stop);
            sound.play(SOUNDS.run);
        } else if (!tank.getMoving()) {
            sound.stop(SOUNDS.run);
            sound.play(SOUNDS.stop);
        }
    } else {
        sound.stop(SOUNDS.run);
        sound.stop(SOUNDS.stop);
    }
}