const cowSkinComponent = cc.Class({
    name: 'cowSkin',
    properties: {
        cowAnimate: {
            type: cc.SpriteFrame,
            default: [],
        },
    },
})
cc.Class({
    extends: cc.Component,

    properties: {
        cowSkinType: {
            type: cowSkinComponent,
            default: [],
        }
    },

    onLoad () {
        //随机生成牛
        this.animCow = this.node.addComponent('frame_anim')
        this.cowType = Math.floor(Math.random() * 3)
        // 以及 牛的背景更换
        this.cowPlay()

        // 初始化速度
        this.cowSpeed = -(Math.random() * 300 + 200)
    },

    cowPlay() {
        this.gameScene = cc.find('Canvas').getComponent('gameScene')

        // 牛的背景更换
        this.animCow.sprite_frames = this.cowSkinType[this.cowType].cowAnimate
        this.animCow.duration = 0.2
        this.animCow.play_loop()
    },

    start () {

    },

    update (dt) {
        const s = this.cowSpeed * dt
        this.node.x += s

        if (this.node.x < -520) {
            // 将当前的cow移除cowGet
            this.removeFromCowGet(this.node)
            this.node.removeFromParent()
        }
    },

    removeFromCowGet(cow) {
        const i = this.gameScene.cowGet.indexOf(cow)
        this.gameScene.cowGet.splice(i, 1)
    },
});
