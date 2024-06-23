// src/Weapon/Weapon.ts
import {Enemy} from "./Enemy.ts";

export class Weapon extends Phaser.Physics.Arcade.Sprite{
    private damage: number;
    private range: number;
    private cooldown: number;
    private lastAttackTime: number;
    private hitArea: Phaser.GameObjects.Rectangle;
    private enemies: Enemy[];

    constructor(scene:Phaser.Scene , x: number, y: number, damage: number, range: number, cooldown: number, enemies: Enemy[]) {
        super(scene, x, y, 'enemy');
        this.damage = damage;
        this.range = range;
        this.cooldown = cooldown;
        this.enemies = enemies;
        this.lastAttackTime = 0;
        this.hitArea = this.scene.add.rectangle(20 ,20 ,100,100, 0x00ff00, 0.5);
        this.hitArea.setSize(range,range)
    }

    canAttack(currentTime: number): boolean {
        return currentTime - this.lastAttackTime >= this.cooldown;
    }

    attack(currentTime: number): void {
        this.lastAttackTime = currentTime;
        this.getCollidingEnemies(this.enemies)
    }

    getDamage(): number {
        return this.damage;
    }

    getRange(): number {
        return this.range;
    }

    public getCollidingEnemies(enemies: Enemy[]): Enemy[] {
        let collidingEnemies: Enemy[] = [];

        enemies.forEach((enemy,index) => {
            if (this.scene.physics.overlap(this.hitArea, enemy)) {
                collidingEnemies.push(enemy);
                enemy.destroy()
                enemies.splice(index, 1)
            }
        });

        return collidingEnemies;
    }
}