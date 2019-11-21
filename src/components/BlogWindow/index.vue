<template>
  <div>
    <vdr
      class="window"
      :snap="true"
      :w="isMobile()? isMobileWidth() : (900 + addWidth)"
      :h="isMobile()? isMobileHeight() : ((moreShow? 500 : 460) + addHeight)"
      @resizing="sizeChange"
      :draggable="!isMobile()"
      class-name-handle="fang-handle-class"
      class-name-dragging="fang-dragging-class"
      :handles="['tm','mr','bm','ml']"
      :drag-handle="`.drag-handle`"
    >
      <div class="window-header">
        <a-row>
          <a-col :span="8">
            <div class="window-action-button">
              <a-row>
                <a-col
                  :span="8"
                  v-for="(items, i) in buttonArr"
                  :key="i"
                  @mouseenter="actionShow = true"
                  @mouseleave="actionShow = false"
                >
                  <div
                    :class="`window-button ${items.color}`"
                    @click="items.action"
                    style="cursor: pointer;"
                  >
                    <transition>
                      <div v-show="actionShow" class="window-aciton">
                        <blog-icon
                          :type="`${items.icon}`"
                          :style="`position: relative;bottom: 2px;right: 0px;transform:${items.icon === 'icon-zhankai'? 'rotate(45deg)': 'scale(0.9)'};`"
                          class="win-action"
                        ></blog-icon>
                      </div>
                    </transition>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>
          <a-col>
            <!-- 标题插槽 -->
            <span class="drag-handle">
              <slot name="title"></slot>
            </span>
          </a-col>
        </a-row>
      </div>
      <!-- 更多操作范围 -->
      <transition name="more">
        <div class="window-more" v-if="moreShow">
          <slot name="more"></slot>
          <div class="fixed_more">
            <span class="more_head">
              <a-tooltip placement="leftTop" title="作者">
                <blog-icon type="icon-x_yonghu"/>
              </a-tooltip>
              <span class="more_field">{{base_information.author}}</span>
            </span>
            <span class="more_head">
              <a-tooltip placement="leftTop" title="创建时间">
                <blog-icon type="icon-x_nav_shangbaoyuanshangbaolishi"/>
              </a-tooltip>
              <span class="more_field">{{base_information.time}}</span>
            </span>
            <span class="more_head">
              <a-tooltip placement="leftTop" title="浏览次数">
                <blog-icon type="icon-x_guanzhu1"/>
              </a-tooltip>
              <span class="more_field">{{base_information.view}}</span>
            </span>
          </div>
        </div>
      </transition>
      <!-- 内容插槽 -->
      <div class="window-html">
        <slot name="content"></slot>
        <div
          v-if="loading"
          :style="`filter: invert(80%);padding:20px 35px 0px 0px;overflow :auto;`"
        >
          <a-skeleton :paragraph="{rows: 5}" active :title="false"/>
        </div>
      </div>
    </vdr>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1505804_0wficryf78b.js' // 在 iconfont.cn 上生成
})
import vdr from 'vue-draggable-resizable-gorkys'
import { mixinDevice } from '@/utils/mixin'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
export default {
  name: 'BlogWindow',
  components: {
    vdr,
    'blog-icon': MyIcon
  },
  mixins: [mixinDevice],
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
    loading: {
      default: false
    },
    base_information: {
      default: {
        author: 'fangzicheng',
        time: '***',
        view: 233
      }
    }
  },
  data() {
    return {
      buttonArr: [
        { color: 'red', action: this.closeAction, icon: 'icon-close' },
        { color: 'yellow', action: this.moreAction, icon: 'icon-more' },
        { color: 'green', action: this.magnifyAction, icon: 'icon-zhankai' }
      ],
      actionShow: false,
      moreShow: false,
      addHeight: 0,
      addWidth: 0
    }
  },
  methods: {
    closeAction() {
      // item.show = false
      console.log('closeAction')
      this.$emit('close', 'true')
    },
    moreAction() {
      this.moreShow = !this.moreShow
      console.log(this.moreShow)
      this.$emit('more', 'true')
    },
    magnifyAction() {
      // 放大缩小判断
      if (this.addWidth) {
        this.addWidth = 0
        this.addHeight = 0
      } else {
        let pass = JSON.parse(localStorage.getItem('pro__SIDEBAR_TYPE'))['value'] // 获取sidebar是否开启
        this.addHeight = window.innerHeight - 400 - 200
        this.addWidth = !pass ? window.innerWidth - 100 - 900 : window.innerWidth - 200 - 900
      }
      this.$emit(`magnify`, this.addHeight)
    },
    sizeChange(left, top, width, height) {
      this.$emit('sizeChange', left, top, width, height)
    },
    isMobileWidth() {
      return window.innerWidth
    },
    isMobileHeight() {
      return window.innerHeight - 30
    }
  },
  created() {
    this.$emit('open', 'true')
  }
}
</script>
<style lang="less" scoped>
.window {
  transition: height 0.3s;
  border: 1px solid #3a3b3f;
  background: #1f1f1f;
  z-index: 999 !important;
  // width: 102% !important;
  // height: 102% !important;
  border-radius: 8px 8px 0px 0px !important;
  // box-shadow: 0px 0px 1px #5d5858;
  &-header {
    font-size: 13px;
    background: #3a3b3f;
    color: #bbbbbb;
    height: 23px;
    padding: 5px;
    border-radius: 8px 8px 0px 0px;
  }

  &-action-button {
    margin-left: 8px;
    width: 60px;
  }

  &-button {
    color: #3a3b3f;
    border-radius: 13px;
    width: 13px;
    height: 13px;
    background: red;
  }

  &-html {
    padding: 10px;
  }

  &-more {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 40px;
    width: 100%;
    background: #525252eb;
    padding: 8px 12px 8px 12px;
  }
}

.drag-handle {
  text-align: center;
  min-height: 35px;
  width: 80px;
  position: relative;
  bottom: 3px;
}
.win-action {
  color: #524949;
}
.win-action:hover {
  font-weight: 800;
  color: #000000;
  transition: color 0.3s;
}

.fixed_more {
  float: right;
  color: #efe6e6;
  font-weight: 700;
}

.more_field {
  margin-left: 5px;
  position: relative;
  bottom: 1px;
  margin-right: 10px;
  font-size: 12px;
}

.more_head {
  // margin-left: 10px;
}

// .drag-handle:hover {
//   // cursor: move;
//   cursor: grab;
// }

.fang-dragging-class {
  opacity: 0.7;
  cursor: move;
  cursor: -webkit-grab;
  cursor: grabbing !important;
}

.red {
  background: #f75658;
}

.yellow {
  background: #fbbe33;
}

.green {
  background: #3ccd44;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  // transform: translateX(100px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

.more-enter,
.more-leave-to {
  opacity: 0;
  // transform: translateX(100px);
}
.more-enter-active,
.more-leave-active {
  transition: all 0.3s ease;
}
</style>
