cc.Class({
    extends: cc.Component,

    properties: {
        ropeEmpty: {
            type: cc.SpriteFrame,
            default: null,
        },
        ropeCow: {
            type: cc.SpriteFrame,
            default: [],
        },
    },

    onLoad () {
        this.gameScene = cc.find('Canvas').getComponent('gameScene')

        // 粒子
        this.effect = this.node.getChildByName('effect').getComponent(cc.ParticleSystem)   
        this.isShooting = false
        this.node.x = 0
        this.node.y = -550
    },

    setRopeEmpty() {
        const rope = this.node.getComponent(cc.Sprite)
        rope.spriteFrame = this.ropeEmpty
    },

    setRopeCow(cowType) {
        if (cowType < 0 || cowType > 2) {
            return
        }
        const rope = this.node.getComponent(cc.Sprite)
        rope.spriteFrame = this.ropeCow[cowType]
    },

    // 粒子停止
    stopEffect() {
        this.effect.stopSystem()
    },

    shootRopeOut() {
        if (this.isShooting) return
        this.unschedule(this.stopEffect.bind(this))
        this.isShooting = true
        const aniOut = cc.moveTo(0.5, 0, -60)
        const getCow = cc.callFunc(() => {
            const cowType = this.gameScene.hitCow()
            if (cowType >= 0 && cowType <= 2) {
                this.node.y = 42
                this.effect.resetSystem()
                this.scheduleOnce(this.stopEffect.bind(this), 0.05)
                this.setRopeCow(cowType)
            }

        }, this.node)
        const aniIn = cc.moveTo(0.7, 0, -560)
        const endFn = cc.callFunc(() => {
            this.setRopeEmpty()
            this.isShooting = false
        }, this.node)
        const seq = cc.sequence([aniOut, getCow, aniIn, endFn])
        this.node.runAction(seq)
    },

    start () {
        this.stopEffect()
    },

    // update (dt) {},
});
