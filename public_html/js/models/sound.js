"use strict";

(function () {
    Game.models.Sound = Sound;

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
    
})();

