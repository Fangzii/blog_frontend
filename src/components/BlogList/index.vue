<template>
  <a-card
    class="project-list"
    :loading="false"
    style="margin-bottom: 24px;"
    :bordered="false"
    title="进行中的项目"
    :body-style="{ padding: 0 }"
    ref="card"
  >
    <router-view></router-view>
    <a slot="extra">全部项目</a>
    <div :key="i" v-for="(item, i) in data">
      <vdr v-show="item.show" class="window" :snap="true" :w="_w" :h="450" @resizing="onResize" class-name-handle="fang-handle-class">
        <div class="window-header">
          <a-row>
            <a-col :span="8">
              <div class="window-action-button">
                <a-row>
                  <a-col :span="8" v-for="(items, i) in buttonArr" :key="i">
                    <div :class="`window-button ${items.color}`" @click="items.action(item)">
                      <!-- <a-icon :type="items.icon"/> -->
                    </div>
                  </a-col>
                </a-row>
              </div>
            </a-col>
            <a-col>
              <span class="drag-handle">{{ item[title] }}</span>
            </a-col>
          </a-row>
        </div>
        <div v-if="item.detailData" class="window-html">
          <div v-html="item.detailData.body" :style="`height: ${showHeight - 20}px;overflow :auto;filter: invert(100%);`"></div>
        </div>
        <div v-else :style="`filter: invert(80%);padding: 10px;height: ${showHeight - 20}px;overflow :auto;`">
            <a-skeleton :paragraph="{rows: 30}" active :title="false"/>
        </div>
      </vdr>
      <a-card-grid class="project-card-grid">
        <a-card :bordered="false" :body-style="{ padding: 0 }" @click="goDetail(item)">
          <a-card-meta>
            <div slot="title" class="card-title">
              <a>{{ item[title] }}</a>
            </div>
            <div slot="description" class="card-description">{{ item[synopsis] }}</div>
          </a-card-meta>
          <div class="project-item">
            <a></a>
            <span class="datetime">{{item[time]}}</span>
          </div>
        </a-card>
      </a-card-grid>
    </div>
  </a-card>
</template>

<script>
import vdr from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import { getBlogDetail } from '@/api/manage'
import blogDetail from '@/views/blog/detail.vue'
export default {
  name: 'BlogList',
  components: {
    vdr,
    blogDetail
  },
  watch: {
    h(val) {
      // console.log(val, 999)
      this._h = val
    },
    w(val) {
      this._w = val
    }
  },
  props: {
    data: {
      required: true
    },
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
    w: {
      default: 50
    },
    h: {
      default: 50
    },
  },
  data() {
    return {
      buttonArr: [
        { color: 'red', action: this.closeAction, icon: 'close' },
        { color: 'yellow', action: this.hiddenAction, icon: 'minus' },
        { color: 'green', action: this.magnifyAction, icon: 'arrows-alt' }
      ],
      _w: 50,
      _h: 50,
      showHeight: 400,
      showWidth: 50
    }
  },
  methods: {
    goDetail(item) {
      // 给默认长宽
      this._w = this.$refs.card.$el.offsetWidth
      // this._h = this.$refs.card.$el.offsetHeight
      this.showHeight = 430
      getBlogDetail(item.id).then(res => {
        
        item.detailData = res
        console.log(item.detailData)
        this.$forceUpdate();
      })

      item.show = !item.show
      this.$router.push({
        name: 'Workplace',
        query: {
          window: item.id
        }
      })
    },
    closeAction(item) {
      item.show = false
      console.log('closeAction', item)
    },
    hiddenAction(item) {
      console.log('hiddenAction')
    },
    magnifyAction(item) {
      console.log('magnifyAction')
    },
    onResize(left, top, width, height) {
      this.showHeight = height
      this.showWidth = width
    }
  }
}
</script>
<style lang="less" scoped>
.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }
  .card-description {
    color: rgba(0, 0, 0, 0.45);
    margin-left: 16px;
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
.window {
  border: 1px solid #e8e8e8;
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
  position: relative;
  bottom: 3px;
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