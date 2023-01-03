<template>
  <div>
    <a-card
      class="project-list"
      :loading="false"
      style="margin-bottom: 24px;"
      :bordered="false"
      :body-style="{ padding: 0 }"
      ref="card"
    >
      <div slot="title" style="text-align:center">Fangzii Blog</div>
      <router-view></router-view>
      <a slot="extra"></a>
      <div :key="i" v-for="(item, i) in data">
        <blog-window
          v-if="item.show"
          v-on:close="closeAction(item)"
          :base_information="{author: item.author.name ,time: item.all_time, view: item.views }"
          :loading="loading"
          v-on:magnify="magnify"
        >
          <span slot="title" style="cursor: move;">{{ item[title] }}</span>
          <!-- more插槽 -->
          <template slot="more">
            <!-- 留言板 -->
            <a-popover
              trigger="click"
              v-model="item.visible"
              placement="bottomLeft"
              overlayClassName="message_board"
              :autoAdjustOverflow="false"
              :getPopupContainer="
                triggerNode => {
                  return triggerNode.parentNode;
                }
              "
            >
              <span :class="`message_board ${item.visible? 'message_board_clicked': ''}`">
                <blog-icon type="icon-x_liuyan"/>
              </span>
              <template slot="content">
                <a-spin :spinning="messageLoading">
                  <blog-icon
                    slot="indicator"
                    type="icon-x_gengxin"
                    style="transform: rotateY(180deg);"
                    spin
                  />
                  <div class="message_board_content">
                    <div class="message_board_content_main">
                      <div v-for="(items, index) in item.messageBoardData" :key="index">
                        <div class="message_board_content_main_body">{{items.body}}</div>
                        <div class="message_board_content_main_head">
                          <span>{{items.operator && items.operator.name}}</span>
                          <div>{{items.time}}</div>
                        </div>
                        <div class="message_board_content_main_line"></div>
                      </div>
                      <div
                        v-if="item.messageBoardData.length === 0"
                        class="message_board_content_main_nodata"
                      >
                        <blog-icon type="icon-x_penzai"/>添加一条评论吧~
                      </div>
                    </div>
                    <div class="message_board_content_input">
                      <a-input
                        :disabled="messageLoading"
                        size="small"
                        v-model="addMessage"
                        @pressEnter="inputEnter($event,item)"
                        style="background: #4a754de0;border: 0px solid #000000;color: white"
                      />
                    </div>
                  </div>
                </a-spin>
              </template>
            </a-popover>
            <!-- 属性标签 -->
            <span class="attribute_tags">
              <blog-icon type="icon-x_biaoqian" :style="`margin-right: 10px;cursor: pointer; ${item.tagsShow? 'transform: rotate(90deg)' : ''};transition: all .3s;`" @click="item.tagsShow = !item.tagsShow"/>
              <span class="attribute_tags_body" v-if="item.tagsShow">
                <a-tag :color="tags.color" v-for="(tags, index) in item.attribute" :key="index">{{tags.title}}</a-tag>
              </span>
            </span>
          </template>
          <div slot="content">
            <div v-if="!loading && item.detailData" class="window-html">
              <div
                v-html="item.detailData.body"
                :style="`height: ${isMobile()? isMobileHeight():(showHeight - 20 + addHeight)}px;overflow :auto;filter: invert(100%);`"
              ></div>
            </div>
          </div>
        </blog-window>
        <a-card-grid :class="`project-card-grid ${isAttribute(item)? 'highlight': ''}`">
          <a-card :bordered="false" :body-style="{ padding: 0 }" @click="goDetail(item)" :class="`${isAttribute(item)? 'highlight_inside': ''}`">
            <a-card-meta>
              <div slot="title" class="card-title">
                <a>{{ item[title] }}</a>
              </div>
              <div slot="description" class="card-description">{{ item[synopsis] }}</div>
            </a-card-meta>
            <div class="project-item">
              <span v-if="isAttribute(item)" class="tags"><a-tag color="#2b3647">{{attribute}}</a-tag></span>
              <a></a>
              <span class="datetime">{{item[time]}}</span>
            </div>
          </a-card>
        </a-card-grid>
      </div>
    </a-card>
    <div style="box-shadow: 0em 0.5px 1em 0.1em #40a9ff;width: 100%;height: 2px;top: -24px;position: relative;background: #40a9ff5e;"></div>
  </div>
</template>

<script>
// 业务层
import { Icon } from 'ant-design-vue'
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1505804_0wficryf78b.js' // 在 iconfont.cn 上生成
})
import moment from 'moment'
import blogWindow from '@/components/BlogWindow/index.vue'
import { mixinDevice } from '@/utils/mixin.js'
import { getBlogDetail, getMessageBoard, setMessage } from '@/api/manage'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
import { Zoo } from '@/utils/zoo.js'
export default {
  name: 'BlogList',
  components: {
    blogWindow,
    'blog-icon': MyIcon
  },
  computed: mapGetters({
    multiWindowTag: 'multiWindowTag',
    attribute: 'attribute'
  }),
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
        for (let i in Value) {
          let item = Value[i]
          // 如果没有开起来则goDetail
          if (!item.show) {
            this.goDetail(item, true)
          }
        }
      },
      deep: true
    },
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
      addHeight: 0,
      messageBoardData: [],
      messageLoading: false,
      addMessage: null
    }
  },
  methods: {
    goDetail(item, pass = false) {
      // 兼容各处使用
      let index = this.data.findIndex(f => f.id === item.id)
      let real_item = this.data[index]
      if (!real_item.show) {
        real_item.close = this.closeAction // 挂载关闭方法
        // 已经存在Tag 中
        if (!pass) {
          this.multiWindowTag['Tag'].push(real_item)
        } else {
          // 通过监听进来的方法要补需要的动作
          this.multiWindowTag['Tag'].find(f => f.id === real_item.id)['close'] = this.closeAction
        }
        this.loading = true
        // 给默认长宽
        this.rw = this.$refs.card.$el.offsetWidth
        this.showHeight = 430
        getBlogDetail(real_item.id).then(res => {
          this.initMessage(real_item)
          real_item.detailData = res
          real_item.views = res.views // 更新信息
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
    initMessage(data) {
      return getMessageBoard(data.id).then(res => {
        data.messageBoardData = res
        for (let i in data.messageBoardData) {
          let items = data.messageBoardData[i]
          items.time = moment(items.created_at).format('YY/MM/DD HH:mm')
        }
      })
    },
    closeAction(item) {
      item.show = false
      this.data.find(f => f.id === item.id).show = false
      let index = this.multiWindowTag['Tag'].findIndex(f => item.id === f.id)
      if (index > -1) {
        this.multiWindowTag['Tag'].splice(index, 1) // 找到对应删除
      }
      // 如果还有长度则取最后一个的id 否则清空url
      if (this.multiWindowTag['Tag'].length > 0) {
        let id = this.multiWindowTag['Tag'][this.multiWindowTag['Tag'].length - 1]['id']
        this.$router.push({
          name: 'Workplace',
          query: {
            window: id
          }
        })
      } else {
        this.$router.push({
          name: 'Workplace'
        })
      }
      this.addHeight = 0
      this.$forceUpdate()
    },
    hiddenAction(item) {
      // item.show = false
      // let index = this.multiWindowTag['Tag'].findIndex(f => item === f)
      // if(index > -1) {
      //   this.multiWindowTag['Tag'][index]['hidden'] = true
      // }
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
    },
    magnify(addHeight) {
      this.addHeight = addHeight
    },
    isMobileHeight() {
      return window.innerHeight - 230
    },
    inputEnter(e, data) {
      let value
      // 遮罩时失效
      if (!this.messageLoading) {
        if (e.target.value) value = e.target.value
        this.messageLoading = true
        this.addMessage = null // 清空输入框
        // 取随机用户
        setMessage(data.id, { body: value, operator: Zoo[Math.floor(Math.random()*Zoo.length)], id: 0 }).then(res => {
          this.initMessage(data).then(() => {
            this.messageLoading = false
          })
        })
      }
    },
    isAttribute(data) {
      return data.attribute.findIndex(f => f.title === this.attribute) > -1
    }
  }
}
</script>
<style lang="less">
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
  // .card-
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
    height: 22px;
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
    .tags {
      flex: 0 0 auto;
      float: left;
    }
  }
  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .ant-card-body {
    max-height: 68vh; overflow-y: auto;
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

.highlight {
  background: #d5dbe2;
  -webkit-box-shadow: 0 0 5px rgba(0,113,241,1);
  &_inside {
    background: #d5dbe2;
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

.message_board {
  cursor: pointer;
  &_clicked {
    border-style: inset;
    border-width: 2px;
  }

  &_content {
    color: white;
    width: 160px;
    height: 275px;
    &_main {
      height: 90%;
      overflow-y: scroll;
      margin-bottom: 10px;
      &_head {
        font-weight: 400;
        font-size: 8px;
        text-align: right;
        margin-right: 0;
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
        margin-right: -15px;
        opacity: 0.8;
      }

      &_body {
        margin-bottom: 22px;
        padding: 2px;
        width: 100%;
        word-break: break-all;
      }

      &_line {
        width: 94%;
        height: 1px;
        background: linear-gradient(to right, #251e1e, white);
        margin-bottom: 6px;
        opacity: 0.5;
        margin-left: auto;
        margin-right: auto;
      }

      &_nodata {
        color: #a09292;
        margin: 0;
        margin: 0 auto;
        width: 80%;
        margin-top: 50%;
      }
    }
    &_input {
      height: 8%;
    }
  }

  .ant-popover-content {
    color: rgba(255, 255, 255, 0.65);
    opacity: 0.8;
    .ant-popover-inner {
      background-color: #000000;
      background-clip: padding-box;
      -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.15) \9;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.15) \9;
    }
  }
}

.attribute_tags {
  margin-left: 15px;
  &_body {
    position: relative;
    bottom: 2px;
  }
}
</style>