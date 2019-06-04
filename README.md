# cocos-creator-cow
用cocos creator做的套牛小游戏

预览地址： [sulands-cow](https://hytstart.github.io/cow/)，请选择移动端观看。

分享内容预览
- 小游戏体验。
- cocos creator 前世今生。
- 基本开发环境的了解。
- 小游戏场景制作相关知识。
- 基础语法讲析。
- sunlands-cow demo的讲解。
- 构建，发布。（h5, 微信小游戏）

小游戏体验:  
- web 星星：https://hytstart.github.io/star/  
- h5  小羊：https://hytstart.github.io/sheep/  
- h5  小鸟：https://hytstart.github.io/bird/  
---


## 一、cocos creator 前世今生

> Q：cocos creator 是什么，能干什么？  
A：cocos creator是用来做游戏的，可以打包构建到web，h5，ios，android，微信小游戏等各端平台运行。

1. cocos creator是一套完整的游戏开发解决方案，包括了 cocos2d-x 引擎的 JavaScript 实现，在Cocos2d-x 基础上实现了脚本化，组件化和数据驱动等特点。
2. 前世：简要介绍一下游戏引擎，Cocos2d-x。有助于了解cocos creator。
- 游戏引擎：指一些已编写好的可编辑电脑游戏的系统，或者一些交互式实时图像应用程序的核心组件，目的在于让游戏设计者能容易和快速地做出游戏，而不用由零开始。简单地说，我们作为开发者，可以直接使用已经封装好的各种系统（渲染引擎， 物理引擎、碰撞检测系统等）方便开发。  
- Cocos2d-x：开源游戏引擎。可以使用 C++、Javascript 及 Lua 三种语言来进行游戏开发。支持所有常见平台，包括 iOS、Android、Windows、macOS、Linux。
3. 今生：Cocos creator的应用范围主要包括，游戏，少儿教育等。比如大家熟知的，欢乐坦克大战，欢乐麻将。  
![图一 - 欢乐坦克大战](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/tankedazhan.jpg)

## 二、基本开发环境的了解

> 开发前的了解  
Cocos Creator 的工作流程是以组件式开发为核心的，组件式架构也称作 组件-实体系统（或 Entity-Component System），简单的说，就是以组合而非继承的方式进行实体的构建。  
参考：[1. 理解 组件-实体-系统 （ECS \CES）游戏编程模型](https://blog.csdn.net/i_dovelemon/article/details/25798677?tdsourcetag=s_pctim_aiomsg)  [2. 慧娴的webvr](https://note.youdao.com/)

下面新建一个cocos creator项目工程，带着大家浏览一下creator场景编辑器相关，生成的项目目录文件，最终打包编译的文件。

##### 1. Cocos Creator 游戏开发工具。

- 新建一个hello  world项目。重点了解资源，场景（scene）, 场景中的节点（也就是实体），节点的相关属性，组件库（组件可以挂载到节点上）。  
![hello world dashboard](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/helloworld.png)
- 修改string label（数据驱动），或者脚本里的数据后预览。可以选择模拟器，也可以选择浏览器预览。最后都挂载到了canvas节点上。  
![pre look](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/prelook.png)
> 这里的数据驱动，是creator的变革。所有场景都会被序列化为纯数据，在运行时使用这些纯数据来重新构建场景，界面，动画甚至组件等元素。  
也就是说，在编辑器中的修改，会保存为json数据，保留在版本控制中，并在运行时起作用。

##### 2. 了解生成的项目目录文件  

新建的hello world项目目录  
![helloWrldFile](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/fileOrigin.png)

- assets（资源文件夹）  
    1. 用来存放游戏中所有本地资源、脚本和第三方库文件。只有在 assets 目录下的内容才能显示在资源管理器中。  
    2. assets 中的每个文件在导入项目后都会生成一个相同名字的 .meta 文件，.meta 文件相当于引擎识别图片的身份证， 以及编辑器中设置的相关配置。  
    3. 版本控制。  √

- library（资源库）  
    1. 这里文件的结构和资源的格式将被处理成最终游戏发布时需要的形式。也就是预览中用到的资源。
    2. 不需要进入版本控制，每次打开这个项目都会生成。  ×
    
- settings（项目设置）  
    1. 项目相关的设置，如 构建发布 菜单里的包名、场景和平台选择等。  
    2. 加入版本控制。  √

- project.json  
    1. cocos cretor识别项目的合法性标志，用来规定当前使用的引擎类型和插件存储位置。有了project.json和assets才能打开项目。
    2. 版本控制。  √
    
- bulid（构建目录）
    1. 打包编译完的目录。
    2. 版本控制。 ×

##### 3. 编译后的文件  

![helloWrldFileBuild](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/fileBuild.png)  

- index.html，main.js 初始化相关，包括生成canvas根节点相关等。
- res，记录文件的结构，和资源。
- src，project.js（代码相关），setting.js（项目相关设置）

## 三、 小游戏场景制作相关知识。

在 Cocos Creator 中，游戏场景（Scene）是开发时组织游戏内容的中心，也是呈现给玩家所有游戏内容的载体。游戏场景中一般会包括以下内容：
- 场景图像和文字（Sprite，Label）
- 角色
- 以组件形式附加在场景节点上的游戏逻辑脚本  

当玩家运行游戏时，就会载入游戏场景，游戏场景加载后就会自动运行所包含组件的游戏脚本，实现各种各样开发者设置的逻辑功能。所以除了资源以外，游戏场景是一切内容创作的基础。

![scene](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/scene.png)

##### 1. 以组件形式，附加在场景节点上。  

- 如上面描述内容，Cocos Creator 的组件式架构，工作流程是以组件式开发为核心的。
- 节点（Node）是承载组件的实体，通过将具有各种功能的 组件（Component）挂载到节点上，来让节点具有各式各样的表现和功能（注：一个节点上可以挂在多个组件，但是，一个节点上只能添加一个渲染组件，渲染组件包括 Sprite， Label，Particle等）。

![nodetree](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/nodeTree.png)  

举个例子，下图中，是在我们的hello world的工程中的节点（实体），node属性（Node 标题开始的部分就是节点的属性），组件及组件属性。

![nodetree](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/node.png)  

- node属性包括了节点的位置、旋转、缩放、尺寸等变换信息和锚点、颜色、不透明度等其他信息。  
- 组件属性，可以用来渲染图片，渲染文字，执行js脚本等，也就是经常用的的渲染组件，脚本组件。  

节点、node属性、组件的关系也就是：节点的显示，是根据node属性调整（放大，缩小等）以及组件渲染共同决定的。

![image](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/guanxi.png)


---
接下来具体介绍node属性以及组件相关。

##### 2. 节点（node）属性

![image](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/nodePropety.png)

重点介绍rotation，anchor, position。

- rotation，逆时针旋转。
- anchor，锚点。决定了节点以自身约束框中的哪一个点作为整个节点的位置。我们选中节点后看到变换工具出现的位置就是节点的锚点位置。creator都是默认锚点是（0.5， 0.5）。
- position，节点的位置，相对于父节点而言的。先来看一下creator中的坐标系。

###### 坐标系：
- 世界坐标系（绝对坐标系）： Cocos Creator 游戏开发中表示场景空间内的统一坐标体系。
- 本地坐标系（相对坐标系）：是和节点相关联的坐标系。每个节点都有独立的坐标系。
也就是说，我们在项目开发设置中，父子关系的层级结构，修改节点的 位置（Position） 属性，此时设定的节点位置是该节点相对于父节点的 本地坐标系，而非世界坐标系。最后在绘制整个场景时，Cocos Creator 会把这些节点的本地坐标映射成世界坐标系坐标。

举个例子： 所有子节点都是以 父亲锚点所在位置 作为坐标系原点，只用顾及到内部就可以。比如英雄的移动，移动整个父亲就行，里面的血条，任务都跟着移动，相对于父亲的节点坐标是不变的。

##### 3. 常用组件

> sprite组件，label组件，button组件，代码组件


###### 3.1 sprite（精灵组件），游戏中最常见的显示图像的方式。

![sprite组件](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/sprite.png)


- Sprite Frame： 图片资源。  
- Size Mode: 指定 Sprite 的尺寸。（trimmed 表示会使用原始图片资源裁剪透明像素后的尺寸；Raw 表示会使用原始图片未经裁剪的尺寸；Custom 表示会使用自定义尺寸）。  
- Type: 渲染模式，包括普通（Simple）、九宫格（Sliced）、平铺（Tiled）、填充（Filled）和网格（Mesh）渲染五种模式。

重点了解：Type模式，在我们的使用过程中，应用广泛。可以让我们处理起图像来更加方便。  

> 九宫格（sliced）。图像将被分割成九宫格，并按照一定规则进行缩放以适应可随意设置的尺寸(size)。通常用于 UI 元素，或将可以无限放大而不影响图像质量的图片制作成九宫格图来节省游戏资源空间。  
例如： 圆角的图形，只拉伸中间部分就可以。（聊天气泡）

![气泡](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/qipao.png)

> 填充模式（filled）。根据原点，以及设置的填充类型。可以按照比例，方向绘画出整个图像。  
填充类型：HORIZONTAL（横向填充）、VERTICAL（纵向填充）和 RADIAL （扇形填充）三种。  
横向填充： 进度条的展示。扇形填充： 技能cd小图标。

![fill填充模式](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/fill.png)

###### 3.2 label组件。  
显示文字，文字可以是系统字体，TrueType 字体或者 BMFont 字体和艺术数字。更改font属性就可以。

![font](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/font.png)

###### 3.3 button组件

![font](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/button.png)

- Transition： Button 在各个状态下（normal，pressed，hover，disabled）的 SpriteFrame。比如按钮的点击。
- click Events：点击事件。

![image](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/click.png)

Target： 带有脚本组件的节点。  
Component： 脚本组件名称。  
Handler： 指定一个回调函数，当用户点击 Button 并释放时会触发此函数。  
CustomEventData： 用户指定任意的字符串作为事件回调的最后一个参数传入。

###### 4. 脚本组件。

开发者可以为节点添加脚本组件。在脚本组件中，可以获取各个节点，控制节点做一些游戏上的变化。下面一节仔细阐述。

## 四、基础语法讲析

打开新建的hello world脚本组件的 js文件。

``` javascript
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
    },

    // called every frame
    update: function (dt) {

    },
});
```

###### 1. cc.Class  
  
class() 是 cc 模块下的一个方法，这个方法用于声明 Cocos Creator 中的类。返回一个构造函数。在creator编辑器中，添加用户脚本组件，相当于`new`这个构造函数，也就是添加的实例。

###### 2. properties: {}，节点自定义属性。

既可以定义节点的位置，颜色，大小等属性（系统），也可以定义为自己编写的组件类型。


``` javascript
// 1. 例如：套牛小游戏。更换牛的种类，以及切换背景图。
// 2. 抛出去的脚本组件中，cowSkinType属性，是一个数组，用来表示牛的种类。
// 3. 他的类型就是一个自定义的cowSkin的组件。cowSkin组件的属性是一个数组，类型是cc.SpriteFrame，可以实现背景图更换，引起牛的视觉上跑动。

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
})
```

###### 3. 生命周期

- `onload`，节点首次激活时触发，比如所在的场景被载入，或者所在节点被激活的情况下。注意，此时场景的节点和数据都已经准备好了。
- `start`，通常用于初始化一些中间状态的数据，这些数据可能在 update 时会发生改变。在onload之后执行。
- `update`，每一帧(1s / 帧数)渲染前更新物体的行为，状态和方位。
- `onEnable`, `onDisable`, `lateUpdate`, `onDestroy`不常用。

###### 4. this.node，脚本组件所属的节点实例。

`this`，指向`new`出来的组件实例。  
`this.node`，组件所属的节点。可以在该节点下改变node属性，也可以找到各个组件，改变组件的属性。

###### 5. 访问节点和组件。

- 使用`getComponent`方法，寻找节点上的组件。

```
start: function () {
    cc.log( this.node.getComponent(cc.Label) === this.getComponent(cc.Label) );  // true
}
```

- 也可以在该脚本中设置一个属性，类型为其他组件，然后将要使用的B组件，拖入到A的属性检查器中。然后就可以直接在this中拿到这个组件。
- 查找子节点。
```
// 所有子节点
const children = this.node.children
// 根据name查找单个子节点
let child = this.node.getChildByName('cow')
// 根据路径查找子节点，适合子节点层级比较深的情况。
child = cc.find('Canvas/score/val'， this.node)
```
- 全局查找节点。

```
this.time = cc.find('Canvas/time/tiemLabel')
```
###### 6. 常用节点和组件接口属性
- 访问，改变节点属性
```
start () {
    // 激活，关闭节点
    this.node.active = false
    // // 更改节点位置
    this.node.x = 120
    this.node.y = 320
    this.node.position = cc.v2(100, 50)
    // // 节点旋转
    this.node.rotation = 90
    this.node.setScale(2, 2)
    // // 更改节点尺寸
    this.node.width = 100
    this.node.height = 100
    // // 更改颜色
    this.node.color = cc.Color.RED
},
```
- 创建，复制，销毁节点

```
const node1 = cc.instantiate(cc.Node); // 克隆节点。
const node2 = cc.iinstantiate(cc.Prefab) // 复制预制节点。（比如，重复生成的牛）
cc.Node.destroy() // 销毁节点
```
这里要说一下，预制资源（预制节点）。预制资源cc.Prefab，适用于
通用性强、重复使用的且个体之间存异较少时。  
创建Prefab很简单，在层级管理器视图创建的任意节点->拖动到->资源管理器视图即可完成创建。

- 节点事件 （系统内置的，自定义）

> 节点系统事件：鼠标，触摸，  
全局系统事件：键盘，重力传感

（1）鼠标事件：

```
// 使用枚举类型来注册
node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
  console.log('Mouse down');
}, this);

// 使用事件名来注册
node.on('mousedown', function (event) {
  console.log('Mouse down');
}, this);
```
触摸事件同上，`touchstart`, `touchmove`,`touchend`,`touchcancel`。  
`event` 给我们提供了很多的api，帮助我们获取位置相关信息。例如，`touchmove`中，可以根据`getDelta`，获取触点距离上一次时间移动的距离对象。在飞机大战中适用。
```
 this.node.on('touchmove', (e) => {
    const delta = e.getDelta()
    const {x, y}= delta
    this.node.x += x
    this.node.y += y
})
```

（2）键盘事件


```
onLoad () {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
},
onKeyDown(event) {
    const { KEY } = cc.macro
    switch (event.keyCode) {
        case KEY.a:
            console.log(event.keyCode)
            console.log(KEY.a)
            console.log('aaaaaaaaa')
            break;
        case 'b':
            console.log('bbbbbb')
            break;
        default:
            break;
    }
},
```
输出结果：  
一开始以为就是简单的字符串对应关系，通过console发现不是。bbbb是输出不了的。

（3）自定义事件

```
// 发送事件
this.node.emit()
this.node.dispatchEvent() // 事件派送，冒泡，可以跨节点
// 监听
this.node.on()
// 取消监听
this.node.off()
```
![keyconsole](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/maopao.png) 

- action，节点动作

（1）声明一个动作类型，运行这个动作。
```
const action = cc.moveTo(2, 20, 300)
this.node.runAction(action)
// 停止一个动作
this.node.stopAction(action);
// 停止所有动作
this.node.stopAllActions();
```

（2）一些常用动作距离。

```
const a1 = cc.scaleTo(1, 30)
const a2 = cc.fadeIn(2)
```
动作列表：[click me](https://docs.cocos.com/creator/manual/zh/scripting/action-list.html)

（3）容器动作，让每个动作组合起来运动。`cc.sequence`（顺序）, `cc.spawn`（同步）， `cc.repeat`（重复一次）, `cc,repeatForever`（永久重复）。

```
// sequence, spawn
const ac1 = cc.moveTo(2, 50, -130)
const ac2 = cc.scaleTo(1, 4, 4)
const ac3 = cc.rotateTo(2, 90)
const sq = cc.sequence(ac1, ac2, ac3)
this.node.runAction(sq)

// repeat, repeatForever
const ac1 = cc.moveBy(2, 50, -130)
const ac2 = cc.scaleBy(1, 4, 4)
const ac3 = cc.rotateBy(2, 90)
const sq = cc.sequence(ac1, ac2, ac3)
const rep = cc.repeat(sq, 4)
this.node.runAction(rep)
```

（4）动作回调，可以在这里处理一些逻辑。比如运动中的节点，判断是否碰到物体。

```
const action = cc.moveTo(5, 20, 300)
const finished1 = cc.callFunc(() => {
    // 比如套牛游戏中，判断牛的位置，是否符合绳子套牛的范围
    console.log(1111111111111111)
})
const ac2 = cc.moveTo(8, 333, 4444)
const end = cc.callFunc(() => {
    console.log(222222222222222)
})
const myAction = cc.sequence(action, finished1, ac2, end);
this.node.runAction(myAction)
```

（5）`cc.delayTime(4)`延迟，搭配动作使用。比如说，暴出装备消失。  

（6）缓动动作。  

> 缓动动作不可以单独存在，它永远是为了修饰基础动作而存在的，它可以用来修改基础动作的时间曲线，让动作有快入、缓入、快出或其它更复杂的特效。需要注意的是，只有时间间隔动作才支持缓动。

```
// 节点旋转，慢慢变慢
const action = cc.rotateBy(3, 360)
const doAction = action.easing(cc.easeCubicActionOut())
const repAction = doAction.repeatForever(doAction)
this.node.runAction(repAction)
```

- 场景的跳转

```
// 场景切换
cc.director.loadScene("test")
```

###### 7. 计时器

- `scheduleOnce` 一次
- `schedule` （回调函数，间隔，重复次数，延迟）
- `unschedule` 取消一个计时器
- `unscheduleAllCallbacks` 取消该组件的所有计时器

```
this.scheduleOnce(() => {
    console.log('scheduleOnce')
}, 2)

const interval = 4
const repeat = 3
const delay = 4
this.callBack = () => {
    console.log('schedule')
    this.unschedule(this.callBack)
    this.unscheduleAllCallbacks()
}
this.scheduleOnce(this.callBack, interval, repeat, 1)
```
如果使用`schedule`，永久重复，可以使用`cc.macro.REPEAT_FOREVER`，或者默认不写。

###### 8. ajax请求


```
// xhr
const url = 'https://easy-mock.com/mock/5cf0b076d205e36f67612985/test/testXhr'
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        var response = xhr.responseText;
        console.log('response', response);
    }
};
xhr.open("GET", url, true);
xhr.send();
```

## 五、sunlands-cow demo的讲解

体验地址: [建议移动端访问](https://hytstart.github.io/cow/)  

![cowDemo](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/cowDemo.png)

开始之前，先来梳理一下流程：
- 搭建基本场景
- 奔跑的牛
- 可以套牛的绳子（运动）
- 套牛成功的判定。
- 结算（加分，倒计时），游戏流程控制（重新开始，结束）
- 添加背景音乐，套牛中了声音提示，粒子动画

---

###### 1. 搭建基本场景  
注意：  
（1）修改根节点Canvas高度，适用于手机。  
（2）插入相关节点，这里注意button的属性。button是个按钮组件，需要添加出sprite组件以外，应该添加个button组件，用来控制点击。其中，触摸按钮的变化，button的ransition属性是我们上文提到的重点。  

![cowBtn](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/cowBtn.png)  

###### 2. 奔跑的牛的制作（三种牛，每种牛三个）

> 牛需要随机出现，而且要移动。那么我们可以做一个牛的预制体。每次产生时，克隆这个预制体即可。

（1）生成三个随机的，并且是移动的牛。维护一个二维数组来控制。映射到我们的组件上也就是这里用到了自定义组件，自定义类型。

``` javascript
// cowSkinType属性，是一个数组，用来表示牛的种类。
// 他的类型就是一个自定义的cowSkin的组件。cowSkin组件的属性是一个数组，类型是cc.SpriteFrame，可以实现背景图更换，引起牛的视觉上跑动。

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
})
```

在编辑器中，cow组件的每个属性，sprite frame对应着不同的动作的牛。

![cowAct](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/cowSkin.png)

（2）让牛本身动作运动起来，通过切换背景图片

```
onLoad () {
    //随机生成牛
    this.cowType = Math.floor(Math.random() * 3)
    // 以及 牛的背景更换
    this.cowShow = this.node.getComponent(cc.Sprite)
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
```

（3）牛的移动，在`update`函数中，每帧 * 速度 - 偏移量。

```
// 初始化速度
this.cowSpeed = -(Math.random() * 300 + 200)

update (dt) {
    const s = this.cowSpeed * dt
    this.node.x += s
}
```

（4）牛基本制作完了，我们要想重复利用cow这个组件，把他转化为prefab预制体，每次生成新的牛的时候，克隆预制体，就可以生成一个牛。

- 制作一个预制体。在Canvas节点添加属性，牛的预制体，cowPrefab。把预制体拖入到  cowPrefab 属性中。
- 游戏开始的时候，克隆预制体，生成牛。
- 生成牛以后，每隔一段事件，在调用生成牛的函数，生成一个新的牛。

```
generatCow() {
    const newCow = cc.instantiate(this.cowPrefab)
    this.node.addChild(newCow)
    newCow.active = true
    newCow.setPosition(this.cowPosition.x, this.cowPosition.y)

    // 调用自己生成牛
    this.scheduleOnce(this.generatCow.bind(this), Math.random() * 3 + 2)
},

startGame() {
    if (!this.isStart) {
        this.isStart = true

        // 生成牛之前，先把所有的计时器取消
        this.unscheduleAllCallbacks()
        this.generatCow()
    }
},

onLoad () {
    // 预制体牛的位置
    this.cowPosition = {
        x: 520,
        y: -120,
    }
    // 游戏是否开始
    this.isStart = false

    this.startGame()
},
```


###### 3. 可以套牛的绳子。

- 绳子可以运动，
- 把运动事件，添加给button按钮。
- 套到牛以后，套到的是哪种牛，还要换成不同牛的背景图。最后套完，恢复默认绳子。

```
// 初步的绳子套牛动作衔接
shootRopeOut() {
    if (this.isShooting) return
    this.isShooting = true
    const aniOut = cc.moveTo(0.5, 0, -60)
    const aniIn = cc.moveTo(0.5, 0, -550)
    const endFn = cc.callFunc(() => {
        this.setRopeEmpty()
        this.isShooting = false
    }, this.node)
    const seq = cc.sequence([aniOut,  aniIn, endFn])
    this.node.runAction(seq)
},
```
###### 4. 套牛成功的判定。

- 每次`generateCow`生成牛，保存起来。牛出了画面，从数组中清空。
- 当绳子，扔出去的时候。判断数组中的牛的位置，是否在绳子预先设定的范围内。如果是的话，需要取到当前牛的种类，并且从数组、节点中移除。

```
// 拿到现在牛的类型
hitCow() {
    let cowType = -1
    for(let i = 0; i < this.cowGet.length; i++) {
        if (this.cowGet[i].x >= 70 && this.cowGet[i].x <= 190) {
            // cow节点对应的代码组件中的cowType属性
            cowType = this.cowGet[i].getComponent('cow').cowType
            this.cowGet[i].removeFromParent()
            this.cowGet.splice(i, 1)
            return cowType
        }
    }
    return -1
},

// 上面（3.套牛动作衔接）中，再加入绳子套到牛，背景图的改变
const getCow = cc.callFunc(() => {
    const cowType = this.gameScene.hitCow()
    if (cowType >= 0 && cowType <= 2) {
        this.node.y = 42
        this.setRopeCow(cowType)
    }
}, this.node)
const seq = cc.sequence([aniOut, getCow, aniIn, endFn])
```

###### 5. 结算（加分，倒计时），游戏流程控制（重新开始，结束）

- 只需设置固定时间倒计时，时间结束时，不再生成新的牛。并且弹出相应的结算面板。
- rePlay按钮，只需把最开始脚本中`startGame`事件绑定到该按钮的点击事件上。  

注意：mask蒙层面板，需要添加一个button。拦下用户点击行为对于套绳按钮的影响。就是不能在点击套绳按钮了。

![cowAct](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/check.png)

###### 6. 添加音乐，特效

绳子套到牛，加上音乐和粒子特效的提示。

```
cc.loader.loadRes('mou', cc.AudioClip, function (err, clip) {
    cc.audioEngine.play(clip);
});
```
注意：这里的音乐资源，需要放在resources目录下，否则不会被加载。

![cowAct](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/resources.png)

###### 7. 优化

- 新生成的牛层级会在绳子上面，所以我们需要给绳子，套绳按钮和最后的结算面板提高层级。

```
const rope = this.node.getChildByName('rope')
rope.zIndex = 1000
const startBtn = this.node.getChildByName('startBtn')
startBtn.zIndex = 2000
this.check = cc.find('Canvas/check')
this.check.zIndex = 3000
```

-  源码可戳 -> [cocos-creator-sunlandsCow](https://github.com/hytStart/cocos-creator-cow)
-  ......

## 六、构建，发布。（h5, 微信小游戏）

###### 1. 构建为h5。只需将生成后的文件，放在我们的静态资源服务器下就可以查看。

![cowAct](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/buildH5.png)

###### 2. 构建为微信小游戏，需要AppID。并且，在小程序号中，设置为游戏类目。

![cowAct](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/buildWx2.png)

在微信开发工具里查看如图。

![cowAct](https://raw.githubusercontent.com/hytStart/ImageService/master/cocos/cocos-creator-cow/wxOpen.png)


## 七、总结

cocos creator集成的处理开发方案，不论是直接操作画面，或者是和js脚本的结合，都提供了便利。
最后，本次分享的主要目的是和大家一起认识Cocos Creator，了解它的工作原理，以及现在的用途。感兴趣的同学，可以继续了下进阶中的动画剪辑系统，碰撞检测系统，小游戏分包加载等。

## 八、参考

- [Cocos Creator v2.0 用户手册](https://docs.cocos.com/creator/manual/zh/)
- [理解 组件-实体-系统 （ECS \CES）游戏编程模型](https://blog.csdn.net/i_dovelemon/article/details/25798677?tdsourcetag=s_pctim_aiomsg)
