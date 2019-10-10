<template>
  <a-card
    class="project-list"
    :loading="false"
    style="margin-bottom: 24px;"
    :bordered="false"
    title="博客文章"
    :body-style="{ padding: 0 }"
    ref="card"
  >
    <router-view></router-view>
    <a slot="extra"></a>
    <div :key="i" v-for="(item, i) in data">
      <blog-window v-if="item.show" v-on:close="closeAction(item)" v-on:hidden="hiddenAction(item)" :loading="loading">
        <span slot="title">{{ item[title] }}</span>
        <div slot="content">
          <div v-if="!loading && item.detailData" class="window-html">
            <div
              v-html="item.detailData.body"
              :style="`height: ${showHeight - 20}px;overflow :auto;filter: invert(100%);`"
            ></div>
          </div>
        </div>
      </blog-window>
      <a-card-grid class="project-card-grid">
        <a-card
          :bordered="false"
          :body-style="{ padding: 0 }"
          @click="isMobile()? goMobileDetail(item) : goDetail(item)"
        >
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
// import vdr from 'vue-draggable-resizable-gorkys'
import blogWindow from '@/components/BlogWindow/index.vue'
import { mixinDevice } from '@/utils/mixin.js'
// import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import { getBlogDetail } from '@/api/manage'
import { mapGetters } from 'vuex'
// import blogDetail from '@/views/blog/detail.vue'
export default {
  name: 'BlogList',
  components: {
    blogWindow,
    // blogDetail
  },
  computed: mapGetters({
      multiWindowTag: 'multiWindowTag'
    })
  ,
  mixins: [mixinDevice],
  watch: {
    h(val) {
      // console.log(val, 999)
      this._h = val
    },
    w(val) {
      this.rw = val
    },
    'multiWindowTag.Tag': {
      handler: function(Value) {
        // 为了同步标签和窗口打开 增加监听
        console.log(Value, `哪里错了`)
        for(let i in Value) {
          let item = Value[i]
          // 如果没有开起来则goDetail
          if(!item.show) {
            this.goDetail(item, true)
          }
        }
      },
      deep: true
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
    }
  },
  data() {
    return {
      buttonArr: [
        { color: 'red', action: this.closeAction, icon: 'close' },
        { color: 'yellow', action: this.hiddenAction, icon: 'minus' },
        { color: 'green', action: this.magnifyAction, icon: 'arrows-alt' }
      ],
      rw: 50,
      _h: 50,
      showHeight: 400,
      showWidth: 50,
      loading: false,
    }
  },
  methods: {
    goDetail(item, pass = false) {
      // 兼容各处使用
      let index = this.data.findIndex(f => f.id === item.id)
      let real_item = this.data[index]
      console.log(pass, 8888)
      if(!real_item.show) {
        console.log(this.closeAction, '哪去了')
        real_item.close = this.closeAction // 挂载关闭方法
        // 已经存在Tag 中
        if(!pass) {
          this.multiWindowTag['Tag'].push(real_item)
        }else {
          // 通过监听进来的方法要补需要的动作
          this.multiWindowTag['Tag'].find(f => f.id === real_item.id)['close'] = this.closeAction
        }
        this.loading = true
        // 给默认长宽
        this.rw = this.$refs.card.$el.offsetWidth
        this.showHeight = 430
        getBlogDetail(real_item.id).then(res => {
          real_item.detailData = res
          this.loading = false
          this.$forceUpdate()
        })
  
        real_item.show = true // 这个地方只负责打开窗口
        this.$router.push({
          name: 'Workplace',
          query: {
            window: real_item.id
          }
        })
      }
    },
    goMobileDetail(item) {
      this.$router.push({
        name: 'blogDetail',
        params: {
          id: item.id
        }
      })
    },
    closeAction(item) {
      item.show = false
      this.data.find(f => f.id === item.id).show = false;
      let index = this.multiWindowTag['Tag'].findIndex(f => item.id === f.id)
      if(index > -1) {
        this.multiWindowTag['Tag'].splice(index, 1) // 找到对应删除
      }
      // 如果还有长度则取最后一个的id 否则清空url
      if(this.multiWindowTag['Tag'].length > 0 ) {
        let id = this.multiWindowTag['Tag'][this.multiWindowTag['Tag'].length - 1]['id']
         this.$router.push({
          name: 'Workplace',
          query: {
            window: id
          }
        })
      }else {
         this.$router.push({
          name: 'Workplace',
        })
      }
      this.$forceUpdate();
    },
    hiddenAction(item) {
      item.show = false
      let index = this.multiWindowTag['Tag'].findIndex(f => item === f)
      if(index > -1) {
        this.multiWindowTag['Tag'][index]['hidden'] = true
      }
      // console.log('hiddenAction')
    },
    magnifyAction(item) {
      console.log('magnifyAction')
    },
    onResize(left, top, width, height) {
      this.showHeight = height
      this.showWidth = width
    },
    windowIdName(item) {
      return `window_id_${item.id}`
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
    padding: 5px;
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

.fang-dragging-class {
  opacity: 0.7;
  cursor: move;
  cursor: -webkit-grab;
  cursor: grabbing;
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