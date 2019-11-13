<template>
  <div>
    <vdr
      class="window"
      :snap="true"
      :w="900"
      :h="450"
      @resizing="sizeChange"
      class-name-handle="fang-handle-class"
      class-name-dragging="fang-dragging-class"
      :handles="['tm','mr','bm','ml']"
      :drag-handle="'.drag-handle'"
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
                      <div v-show="true" class="window-aciton">
                        <fang-icon :type="`${items.icon}`" :style="`position: relative;bottom: 2px;right: 0px;transform:${items.icon === 'icon-zhankai'? 'rotate(45deg)': 'scale(0.9)'};`" class="win-action"></fang-icon>
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
import { Icon } from 'ant-design-vue';
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1505804_ll3k9cxne0h.js', // 在 iconfont.cn 上生成
});
import vdr from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
export default {
  name: 'BlogWindow',
  components: {
    vdr,
    'fang-icon': MyIcon,
  },
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
    }
  },
  data() {
    return {
      buttonArr: [
        { color: 'red', action: this.closeAction, icon: 'icon-close' },
        { color: 'yellow', action: this.hiddenAction, icon: 'icon-more' },
        { color: 'green', action: this.magnifyAction, icon: 'icon-zhankai' }
      ],
      actionShow: false
    }
  },
  methods: {
    closeAction() {
      // item.show = false
      console.log('closeAction')
      this.$emit('close', 'true')
    },
    hiddenAction() {
      this.$emit('hidden', 'true')
    },
    magnifyAction() {
      console.log('magnifyAction')
    },
    sizeChange(left, top, width, height) {
      this.$emit('sizeChange', left, top, width, height)
    }
  },
  created() {
    console.log('开始?')
    this.$emit('open', 'true')
  }
}
</script>
<style lang="less" scoped>
.window {
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
}

.drag-handle {
  text-align: center;
  min-height: 35px;
  width: 80px;
  position: relative;
  bottom: 3px;
}

.win-action:hover {
  font-weight: 800;
  color: #bb9b9b;
  transition: color 0.3s;
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
</style>
