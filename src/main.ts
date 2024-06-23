import Phaser from "phaser";
import {gameScene} from "./scenes/gameScene.ts";
import {HUDScene} from "./scenes/HUDScene.ts";
import {GameWinScene} from "./scenes/GameWinScene.ts";
import {LoaderScene} from "./scenes/LoaderScene.ts";
import {MenuScene} from "./scenes/MenuScene.ts";
import {GameOverScene} from "./scenes/GameOverScene.ts";

new Phaser.Game({
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: "app",
    pixelArt: true,
    input: {
        keyboard: true
    },
    physics: {
        default: 'arcade'
    },
    scene: [LoaderScene, gameScene, HUDScene, GameWinScene, MenuScene, GameOverScene],

})
