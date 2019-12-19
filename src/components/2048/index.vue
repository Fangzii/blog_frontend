<template>
  <div :class="open? `bottom` : `bottom_mask`" :style="(big? 'transform: scale(0.6);right: -94px;bottom: -108px;': '') + (hidden? (big? 'bottom: -398px;':'bottom: -333px;'): '')">
    <img
      src="./icon/start.png"
      width="150px"
      class="mask_action_start"
      v-if="!open"
      style="cursor: pointer;"
      @click="openCtrl(true)"
    >
    <div class="mask_action_setting" v-if="setting">
      <div class="mask_action_setting_button" @click="explainCtrl(true)">说明</div>
      <div class="mask_action_setting_button" @click="big = !big">{{big ? '还原' : '放大'}}</div>
      <!-- <div class="mask_action_setting_button">111</div> -->
      <div class="mask_action_setting_button" @click="settingCtrl(false)">取消</div>
    </div>
    <div class="mask_action_setting" v-if="explain">
      <div class="mask_action_setting_explain">
        <div>↑ W</div>
        <div>↓ S</div>
        <div>← A</div>
        <div>→ D</div>
      </div>
      <div class="mask_action_setting_button" @click="explainCtrl(false)">返回</div>
    </div>
    <div class="mask" v-if="!mask"></div>
    <div ref="game" id="game"></div>
    <div class="head clear">
      <div class="scoreShow left">
        <span>得分: {{ score }}</span>
        <!-- <span ref="score" id="score" v-show="false"></span> -->
      </div>
      <img
        src="./icon/setting.png"
        width="35px"
        v-if="!hidden && open"
        @click="settingCtrl(true)"
        class="right"
        style="margin-right: 10px; margin-top: 6px;cursor: pointer;"
      >
      <img
        src="./icon/stop.png"
        width="35px"
        v-if="!hidden && open"
        @click="openCtrl(false)"
        class="right"
        style="margin-right: 10px; margin-top: 6px;cursor: pointer;"
      >
      <img
        src="./icon/hidden.png"
        width="35px"
        v-if="open"
        @click="hidden = !hidden"
        class="right"
        style="margin-right: 10px; margin-top: 6px;cursor: pointer;"
      >
    </div>
    <div class="head_line"></div>
    <div ref="gridPanel" id="gridPanel"></div>
    <div ref="gameover" id="gameover">
      <h1 ref="Score" id="Score"></h1>
       <!-- <img
        src="./icon/restart.png"
        width="35px"
        @click="gameStart()"
      > -->
      <a href="#" ref="again" id="again" @click="gameStart()">再来一次</a>
    </div>
  </div>
</template>

<script>
var arr = []

function $(id) {
  return document.getElementById(id)
}

function C(cls) {
  return document.getElementsByClassName(cls)
}
//切换模式
function getModel(e) {
  //事件冒泡获取a元素
  var a = e.target,
    modelValue = 4
  if (a.nodeName == 'A') {
    if (a.innerHTML == '3X3') {
      modelValue = 3
    } else if (a.innerHTML == '4X4') {
      modelValue = 4
    } else if (a.innerHTML == '5X5') {
      modelValue = 5
    } else if (a.innerHTML == '6X6') {
      modelValue = 6
    }
    this.ROW = this.CELL = modelValue
    this.createEle = 1 //需要创建格子div元素的标志
    this.gameStart()
  }
}

//   var modelValue = parseInt($("model").value);
//   if (isNaN(modelValue)) {
//     modelValue = 4; //默认是4*4
//   }
//   if (modelValue <= 2 || modelValue > 6) return; //2格或者大于6格无效
//   this.ROW = modelValue;
//   this.CELL = modelValue;
//   this.createEle = 1;
//   this.gameStart();
//   console.log(modelValue);
// }
export default {
  name: 'BlogArticleCard',
  props: {
    // 默认定义字段
    title: {
      default: 'title'
    },
    cover: {
      default: 'cover'
    },
    synopsis: {
      default: 'synopsis'
    },
    time: {
      default: 'time'
    },
    name: {
      default: 'name'
    },
    body: {
      default: 'body'
    }
  },
  data() {
    return {
      ROW: 4,
      CELL: 4,
      r: 0,
      c: 0,
      f: 0, //r行  c列  f查找的下一位置
      keyCd: 0,
      score: 0,
      createEle: 0, //是否需要创建元素
      eleFragment: '', //文档片段变量
      height: 0,
      open: false,
      mask: false,
      setting: false,
      explain: false,
      hidden: false,
      big: false
    }
  },
  methods: {
    //游戏开始
    gameStart: function() {
      this.init()
      let _this = this
      document.onkeydown = function(e) {
        //自动获得事件对象
        // 增加游戏开关
        if (_this.open) {
          switch (
            e.keyCode //判断按键号
          ) {
            case 65: // a
              _this.keyCd = 1
              _this.moveLeft()
              break
            case 87: // w
              _this.keyCd = 2
              _this.moveUp()
              break
            case 68: // d
              _this.keyCd = 1
              _this.moveRight()
              break
            case 83: // s
              _this.keyCd = 2
              _this.moveDown()
              break
          }
        }
      }
    },

    //初始化
    init: function() {
      this.eleFragment = document.createDocumentFragment()
      let r = this.r
      let c = this.c
      for (r = 0; r < this.ROW; r++) {
        arr.push([])
        for (c = 0; c < this.CELL; c++) {
          arr[r][c] = 0
          if (this.createEle == 1) {
            this.create(r, c)
          }
        }
      }
      if (this.createEle == 1) {
        this.createEle = 0
        $('gridPanel').innerHTML = '' //清空原有的元素
        $('gridPanel').appendChild(this.eleFragment) //添加元素
      }
      this.score = 0
      // this.$refs.gridPanel
      $('game').style.display = 'none'
      $('gameover').style.display = 'none'
      this.random() //开始游戏随机生成两个数
      this.random()
      this.updateView()
    },
    //创建div元素，添加到gridPanel中
    create: function(r, c) {
      var grid, cell
      var increment = 14,
        grWidth,
        grHeight,
        grMarginTop,
        grMarginLeft,
        ceWidth,
        ceHight
      grid = document.createElement('div')
      cell = document.createElement('div')
      grid.id = 'g' + r + c
      grid.className = 'grid'
      cell.id = 'c' + r + c
      cell.className = 'cell'
      if (this.ROW == 3) {
        increment = 24
      } else if (this.ROW == 4) {
        increment = 18
      }
      grWidth = grHeight = ceWidth = ceHight = 66 + (6 - this.ROW) * increment //优化后
      grMarginTop = grMarginLeft = (480 - grWidth * this.ROW) / (this.ROW + 1)
      grid.style.width = grWidth + 'px'
      grid.style.height = grHeight + 'px'
      grid.style.marginTop = grMarginTop + 'px'
      grid.style.marginLeft = grMarginLeft + 'px'
      cell.style.width = ceWidth + 'px'
      cell.style.height = ceHight + 'px'
      cell.style.top = grMarginTop + r * (grMarginTop + ceWidth) + 'px'
      cell.style.left = grMarginLeft + c * (grMarginLeft + ceHight) + 'px'
      cell.style.lineHeight = ceHight + 'px'
      cell.style.fontSize = 30 + (6 - this.ROW) * 10 + 'px'
      this.eleFragment.appendChild(grid)
      this.eleFragment.appendChild(cell)
    },
    //随机产生一个新的数
    random: function() {
      while (1) {
        var row = Math.floor(Math.random() * this.ROW)
        var cell = Math.floor(Math.random() * this.CELL)
        if (arr[row][cell] == 0) {
          //判断生成的随机数位置为0才随机生成2或4
          arr[row][cell] = Math.random() > 0.5 ? 4 : 2
          break
        }
      }
    },
    //更新页面
    updateView: function() {
      var win = 0
      let r = this.r
      let c = this.c
      for (r = 0; r < this.ROW; r++) {
        for (c = 0; c < this.CELL; c++) {
          if (arr[r][c] == 0) {
            //值为0的不显示
            $('c' + r + c).innerHTML = '' //0不显示
            $('c' + r + c).className = 'cell' //清除样式
          } else {
            $('c' + r + c).innerHTML = arr[r][c]
            $('c' + r + c).className = 'cell n' + arr[r][c] //添加不同数字的颜色
            if (this.ROW == 3 && arr[r][c] == 1024) {
              win = 1
            } else if (this.ROW == 4 && arr[r][c] == 2048) {
              win = 1
            } else if (this.ROW == 5 && arr[r][c] == 4096) {
              win = 1
            } else if (this.ROW == 6 && arr[r][c] == 8192) {
              win = 1
            }
          }
        }
      }
      if (win == 1) {
        //通关
        $('game').style.display = 'block'
        $('gameover').style.display = 'block'
        $('Score').innerHTML = 'You win!<br>Score:' + this.score
      }
      if (this.isGameOver()) {
        //游戏失败
        $('game').style.display = 'block'
        $('gameover').style.display = 'block'
        $('Score').innerHTML = '游戏结束!<br>得分:' + this.score
        console.log('gameover')
      }
    },
    //游戏失败
    isGameOver: function() {
      let r = this.r
      let c = this.c
      for (r = 0; r < this.ROW; r++) {
        for (c = 0; c < this.CELL; c++) {
          if (arr[r][c] == 0) {
            //有0还不是gameover
            return false
          } else if (c != this.CELL - 1 && arr[r][c] == arr[r][c + 1]) {
            //左往右  前一个和下一个不相等
            return false
          } else if (r != this.ROW - 1 && arr[r][c] == arr[r + 1][c]) {
            //上往下 上一个和下一个不相等
            return false
          }
        }
      }
      return true
    },
    //查找下一个不为0的数值的位置
    find: function(r, c, start, condition, direction) {
      if (this.keyCd == 2) {
        //上下按键
        if (direction == 1) {
          //向上按键  f++
          for (var f = start; f < condition; f += direction) {
            if (arr[f][c] != 0) {
              return f
            }
          }
        } else {
          //向下按键 f--
          for (var f = start; f >= condition; f += direction) {
            if (arr[f][c] != 0) {
              return f
            }
          }
        }
      } else {
        //左右按键
        if (direction == 1) {
          //左按键   f++
          for (var f = start; f < condition; f += direction) {
            if (arr[r][f] != 0) {
              return f
            }
          }
        } else {
          //右按键  f--
          for (var f = start; f >= condition; f += direction) {
            if (arr[r][f] != 0) {
              return f
            }
          }
        }
      }
      return null //循环结束仍然没有找到！=0的数值，返回null
    },
    //左按键的处理
    dealToLeft: function(r) {
      var next
      let c = this.c
      for (c = 0; c < this.ROW; c++) {
        next = this.find(r, c, c + 1, this.CELL, 1) //找出第一个不为0的位置
        if (next == null) break //没有找到就返回
        //如果当前位置为0
        if (arr[r][c] == 0) {
          arr[r][c] = arr[r][next] //把找到的不为0的数值替换为当前位置的值
          arr[r][next] = 0 //找到的位置清0
          c-- //再次循环多一次，查看后面否有值与替换后的值相同，
        } else if (arr[r][c] == arr[r][next]) {
          //如果当前位置与找到的位置数值相等，则相加
          arr[r][c] *= 2
          arr[r][next] = 0
          this.score += arr[r][c]
        }
      }
    },
    move: function(itertor) {
      var before, //没处理前
        after //after处理后
      before = arr.toString()
      itertor() //执行for函数
      after = arr.toString()
      if (before != after) {
        //前后对比，如果不同就update
        this.random()
        this.updateView()
      }
    },
    moveLeft: function() {
      let _this = this
      let r = this.r
      this.move(function() {
        for (r = 0; r < _this.ROW; r++) {
          _this.dealToLeft(r)
        }
      })
      // if 当前位置 不为零
      // 从当前位置，下一个成员开始，遍历，
      // 如果找到，与当前位置相等的数，
      // 两者相加，并把不为零的成员，设置为零
      // 如果 当前位置是 零
      // 从当前位置下一个成员开始遍历
      // 如果找到 第一个不为零的成员
      // 当前位置数值设置为这个不为零的成员的值 ，并且把那个不为零的成员设置为 0
    },
    //右按键处理
    dealToRight: function(r) {
      var next
      let c = this.c
      for (c = this.CELL - 1; c >= 0; c--) {
        next = this.find(r, c, c - 1, 0, -1) //找出第一个不为0的位置
        if (next == null) break //没有找到就返回
        //如果当前位置为0
        if (arr[r][c] == 0) {
          arr[r][c] = arr[r][next] //把找到的不为0的数值替换为当前位置的值
          arr[r][next] = 0 //找到的位置清0
          c++ //再次循环多一次，查看后面否有值与替换后的值相同，
        } else if (arr[r][c] == arr[r][next]) {
          //如果当前位置与找到的位置数值相等，则相加
          arr[r][c] *= 2
          arr[r][next] = 0
          this.score += arr[r][c]
        }
      }
    },
    moveRight: function() {
      let _this = this
      let r = this.r
      this.move(function() {
        for (r = 0; r < _this.ROW; r++) {
          _this.dealToRight(r)
        }
      })
    },
    //上按键处理
    dealToUp: function(c) {
      var next
      let r = this.r
      for (r = 0; r < this.ROW; r++) {
        next = this.find(r, c, r + 1, this.ROW, 1) //找出第一个不为0的位置
        if (next == null) break
        //如果当前位置为0
        if (arr[r][c] == 0) {
          arr[r][c] = arr[next][c] //把找到的不为0的数值替换为当前位置的值
          arr[next][c] = 0 //找到的位置清0
          r-- //再次循环多一次，查看后面否有值与替换后的值相同
        } else if (arr[r][c] == arr[next][c]) {
          //如果当前位置与找到的位置数值相等，则相加
          arr[r][c] *= 2
          arr[next][c] = 0
          this.score += arr[r][c]
        }
      }
    },
    moveUp: function() {
      let _this = this
      let c = this.c
      this.move(function() {
        for (c = 0; c < _this.CELL; c++) {
          _this.dealToUp(c)
        }
      })
    },
    //下按键处理
    dealToDown: function(c) {
      var next
      let r = this.r
      for (r = this.ROW - 1; r >= 0; r--) {
        next = this.find(r, c, r - 1, 0, -1) //找出第一个不为0的位置
        if (next == null) {
          break
        }
        //如果当前位置为0
        if (arr[r][c] == 0) {
          arr[r][c] = arr[next][c] //把找到的不为0的数值替换为当前位置的值
          arr[next][c] = 0 //找到的位置清0
          r++ //再次循环多一次，查看后面否有值与替换后的值相同
        } else if (arr[r][c] == arr[next][c]) {
          //如果当前位置与找到的位置数值相等，则相加
          arr[r][c] *= 2
          arr[next][c] = 0
          this.score += arr[r][c]
        }
      }
    },
    moveDown: function() {
      let _this = this
      let c = this.c
      this.move(function() {
        for (c = 0; c < _this.CELL; c++) {
          _this.dealToDown(c)
        }
      })
    },
    openCtrl(pass) {
      this.open = pass
      this.mask = pass
    },
    settingCtrl(pass) {
      this.setting = pass
      this.mask = !pass
    },
    explainCtrl(pass) {
      this.explain = pass
      this.setting = !pass
    }
  },
  mounted() {
    this.createEle = 1
    this.gameStart()
  }
}
</script>
<style lang="less">
#game {
  display: none;
  // position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #9da5c3;
  opacity: 0.5;
  z-index: 9997;
}

.clear:after {
  content: '';
  display: table;
  clear: both;
}

.left {
  float: left;
}

.right {
  float: right;
}

.scoreShow {
  height: 50px;
  text-align: center;
  line-height: 50px;
}

.model {
  text-decoration: none;
  color: white;
  background-color: #bbada0;
  font-size: 36px;
  border-radius: 10px;
}

.head {
  width: 480px;
  height: 60px;
  padding: 5px 0px 0px 20px;
  margin: 0 auto;
  font-size: 25px;
  background-color: #ccbfb380;
  border-radius: 10px 10px 0px 0px;

  &_line {
    width: 100%;
    height: 1px;
    // background: linear-gradient(to left, #bbada0, #bbada0 60%, #e4d7d7);
  }
}

#gridPanel {
  width: 480px;
  height: 480px;
  margin: 0 auto;
  background-color: #bbada0;
  border-radius: 10px;
  position: relative;
  z-index: 9997;
}

.grid,
.cell {
  width: 100px;
  height: 100px;
  border-radius: 6px;
}

.grid {
  background-color: #ccc0b3;
  float: left;
  margin: 16px 0 0 16px;
}

.cell {
  position: absolute;
  font-size: 60px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.n2 {
  background-color: #eee3da;
}

.n4 {
  background-color: #ede0c8;
}

.n8 {
  background-color: #f2b179;
}

.n16 {
  background-color: #f59563;
}

.n32 {
  background-color: #f67c5f;
}

.n64 {
  background-color: #f65e3b;
}

.n128 {
  background-color: #edcf72;
}

.n256 {
  background-color: #edcc61;
}

.n512 {
  background-color: #9c0;
}

.n1024 {
  background-color: #33b5e5;
}

.n2048 {
  background-color: #09c;
}

.n4096 {
  background-color: #a6c;
}

.n8192 {
  background-color: #93c;
}

.n2,
.n4 {
  color: #776e65;
}

#gameover {
  padding: 15px;
  width: 100%;
  display: none;
  position: fixed;
  left: 50%;
  right: 50%;
  top: 148px;
  width: 220px;
  height: 200px;
  border-radius: 10px;
  background-color: white;
  margin-left: -110px;
  text-align: center;
  z-index: 9998;
  font-size: 15px;
}

#gameover > a {
  display: inline-block;
  width: 170px;
  height: 50px;
  border-radius: 10px;
  text-decoration: none;
  background-color: #9f8d77;
  color: white;
  font-size: 24px;
  padding: 6px 0px 0px 0px;
}

.bottom {
  transition: all .5s;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  position: fixed;
  right: -166px;
  bottom: -188px;
  transform: scale(0.3);
}

.bottom_mask {
  transition: all .5s;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  position: fixed;
  right: -165px;
  bottom: -188px;
  transform: scale(0.3);
  // background: #EEEEEE;
  // opacity: 0.5;
  // filter: alpha(opacity=40);
  z-index: 9998;
}

.bottom:hover {
  box-shadow: 0 10px 50px rgba(51, 51, 51, 0.25);
}

.mask {
  background: #383232c7;
  position: absolute;
  z-index: 9999;
  opacity: 0.9;
  width: 480px;
  height: 539px;
  // height: 477px;
  // top: 60px;
  -webkit-filter: blur(5px); /* Chrome, Opera */
  -moz-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  &_action {
    // position: absolute;
    &_start {
      position: absolute;
      top: 40%;
      z-index: 10000;
      left: 35%;
      opacity: 0.9;
    }

    &_setting {
      &_button {
        cursor: pointer;
        transition: all 0.3s;
        margin-left: 0px;
        background: #c2c1c1;
        width: 440px;
        height: 90px;
        border-radius: 12px;
        margin-top: 20px;
        text-align: center;
        padding: 15px 0px 0px 0px;
        font-size: 36px;
        color: #5f5652;
        font-weight: 500;
        opacity: 0.9;
      }

      &_button:hover {
        background: #9c9c9c;
      }

      &_explain {
        text-align: center;
        font-size: 42px;
        font-weight: 500;
        color: #c2c1c1;
      }

      z-index: 10000;
      position: absolute;
      padding: 20px;
    }
  }
}
</style>
