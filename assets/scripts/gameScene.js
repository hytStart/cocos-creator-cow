const lastDescContans = [
    '5元兰博基尼购车抵用券',
    '尚研500元助学金',
    '九块九活动满10减5券',
]
cc.Class({
    extends: cc.Component,

    properties: {
        cowPrefab: {
            type: cc.Prefab,
            default: null,
        },
    },

    onLoad () {
        this.scoreVal = 0
        this.score = cc.find('Canvas/score/scoreVal').getComponent(cc.Label)

        this.timeVal = 60
        this.time = cc.find('Canvas/time/timeVal').getComponent(cc.Label)

        this.check = cc.find('Canvas/check')
        this.lastScore = cc.find('Canvas/check/scoreBoard/lastScore').getComponent(cc.Label)

        this.lastDesc = cc.find('Canvas/check/scoreBoard/desc').getComponent(cc.Label)
        
        // 预制体牛的位置
        this.cowPosition = {
            x: 520,
            y: -120,
        }
        // 生成的牛
        this.cowGet = []
        // 游戏是否开始
        this.isStart = false

        this.startGame()
    },

    start () {
        const rope = this.node.getChildByName('rope')
        rope.zIndex = 1000
        const startBtn = this.node.getChildByName('startBtn')
        startBtn.zIndex = 2000

        this.check.zIndex = 3000
    },

    update (dt) {

    },

    countdown() {
        this.timeVal --
        
        
        if (this.timeVal < 0) {
            // 时间结束
            this.unscheduleAllCallbacks()
            this.isStart = false
           
            //  结算
            this.checkoutFn()
            return
        }
        this.time.string = this.timeVal.toString()
        this.scheduleOnce(this.countdown.bind(this), 1)
    },
    
    checkoutFn() {
        // 记分板
        this.check.active = true
        this.lastScore.string = this.scoreVal.toString()

        this.lastDesc.string = lastDescContans[Math.floor(Math.random() * 3)]
    },

    startGame() {
        if (!this.isStart) {
            this.isStart = true

            this.check.active = false
            
            // 重置
            this.scoreVal = 0
            this.score.string = this.scoreVal.toString()
            this.timeVal = 60
            this.time = cc.find('Canvas/time/timeVal').getComponent(cc.Label)
            
            // 生成牛之前，先把所有的计时器取消
            this.unscheduleAllCallbacks()
            this.generatCow()

            this.scheduleOnce(this.countdown.bind(this), 1)
        }
    },

    generatCow() {
        const newCow = cc.instantiate(this.cowPrefab)
        this.node.addChild(newCow)
        newCow.active = true
        newCow.setPosition(this.cowPosition.x, this.cowPosition.y)

        // 塞进数组里
        this.cowGet.push(newCow)
        // 调用自己生成牛
        this.scheduleOnce(this.generatCow.bind(this), Math.random() * 3 + 2)
    },

    hitCow() {
        let cowType = -1
        for(let i = 0; i < this.cowGet.length; i++) {
            if (this.cowGet[i].x >= 70 && this.cowGet[i].x <= 190) {
                cowType = this.cowGet[i].getComponent('cow').cowType
                this.cowGet[i].removeFromParent()
                this.cowGet.splice(i, 1)

                this.scoreVal ++
                this.score.string = this.scoreVal.toString()
                cc.loader.loadRes('mou', cc.AudioClip, function (err, clip) {
                    cc.audioEngine.play(clip);
                });

                return cowType
            }
        }
        return -1
    },
});
