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

function tankSoundManager(tank) {
    if (tank.getMoving() === true) {
        sound.stop("parking");
        sound.play("moving");
    } else {
        sound.stop("moving");
        sound.play("parking");
    }
}