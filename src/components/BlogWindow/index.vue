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
                <a-col :span="8" v-for="(items, i) in buttonArr" :key="i">
                  <div :class="`window-button ${items.color}`" @click="items.action" style="cursor: pointer;"></div>
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
      <div v-if="loading" :style="`filter: invert(80%);padding:20px 35px 0px 0px;overflow :auto;`">
        <a-skeleton :paragraph="{rows: 5}" active :title="false"/>
      </div>
      </div>
    </vdr>
  </div>
</template>

<script>
import vdr from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
export default {
  name: 'BlogWindow',
  components: {
    vdr
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
        { color: 'red', action: this.closeAction, icon: 'close' },
        { color: 'yellow', action: this.hiddenAction, icon: 'minus' },
        { color: 'green', action: this.magnifyAction, icon: 'arrows-alt' }
      ]
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
    font-size: 12px;
    background: #3a3b3f;
    color: #bbbbbb;
    height: 20px;
    padding: 5px;
    border-radius: 8px 8px 0px 0px;
  }

  &-action-button {
    margin-left: 3px;
    width: 50px;
  }

  &-button {
    color: #3a3b3f;
    border-radius: 10px;
    width: 10px;
    height: 10px;
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
</style>
