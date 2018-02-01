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
    if (tank.getMoving()) {
        sound.stop(SOUNDS.stop);
        sound.play(SOUNDS.run);
    } else {
        sound.stop(SOUNDS.run);
        sound.play(SOUNDS.stop);
    }
}

function soundManager(arr) {
    for (var i = 0; i < arr.length; i++) {
        switch (arr[i].type) {
            case "playerTank":
                //tankSounds(arr[i]);
                break;
        }
    }
}