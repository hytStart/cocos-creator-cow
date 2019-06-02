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
        this.cowType = Math.floor(Math.random() * 3)
        // 以及 牛的背景更换
        this.cowShow = this.node.getComponent(cc.Sprite)

        // 初始化速度
        this.cowSpeed = -(Math.random() * 300 + 200)

        this.gameScene = cc.find('Canvas').getComponent('gameScene')
    },

    cowPlay(dt) {
        // 牛的背景更换
        this.playTime += dt

        let index = Math.floor(this.playTime / this.duration) // 向下取整数

        if (index >= this.cowAniArray.length) {
            index = 0
            this.playTime -= (this.duration * this.cowAniArray.length) // 接着上面的时间结算
        }
        
        //  在合法的范围之内
        this.cowShow.spriteFrame = this.cowAniArray[index]
    },

    start () {
        this.duration = 0.2
        this.playTime = 0
        this.cowAniArray = this.cowSkinType[this.cowType].cowAnimate
    },

    update (dt) {
        const s = this.cowSpeed * dt
        this.node.x += s

        if (this.node.x < -520) {
            // 将当前的cow移除cowGet
            this.removeFromCowGet(this.node)
            this.node.removeFromParent()
            return
        }
        this.cowPlay(dt)
    },

    removeFromCowGet(cow) {
        const i = this.gameScene.cowGet.indexOf(cow)
        this.gameScene.cowGet.splice(i, 1)
    },
});
