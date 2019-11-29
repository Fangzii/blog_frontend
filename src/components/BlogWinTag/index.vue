<template>
  <div>
    <transition-group
      tag="div"
      class="blogWin"
      name="hehe"
    >
      <div
        v-for="(item, index) in multiWindowTag"
        :key="index"
        :class="`winTag ${item.hidden? 'winTag-hidden' : ''}`"
      >
        <a-row>
          <a-col :span="22">
            <h4 class="winTag-title">{{item.title}}</h4>
          </a-col>
          <a-col :span="2">
            <blog-icon type="icon-close" class="winTag-close" @click="item.close(item)"></blog-icon>
          </a-col>
        </a-row>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue';
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1505804_0wficryf78b.js', // 在 iconfont.cn 上生成
});
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'BlogWinTag',
  components: {
    'blog-icon': MyIcon,
  },
  computed: {
    multiWindowTag: function() {
      return this.$store.state.app.multiWindowTag.Tag
    }
  },
  data() {
    return {
      buttonArr: [
        { color: 'red', action: this.closeAction, icon: 'close' },
        { color: 'yellow', action: this.hiddenAction, icon: 'minus' },
        { color: 'green', action: this.magnifyAction, icon: 'arrows-alt' }
      ],
      multiWindowTagData: null
    }
  },
  methods: {},
  watch: {
    multiWindowTag: {
      handler: function() {
        // console.log(9)
      },
      deep: true
    }
  },
  created() {}
}
</script>
<style lang="less" scoped>
.blogWin {
  user-select: none;
  display: flex;
}

.winTag {
  background: #d1d1d1;
  opacity: 1;
  padding: 6px 15px 0px 10px;
  color: #2f2f2f;
  border-radius: 5px;
  margin-left: 5px;
  font-size: 12rpx;
  // transition: all 1s;
  &-title {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-close {
    color: #4f6880;
  }

  &-hidden {
    opacity: 0.5 !important;
  }
}

.winTag:hover {
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 1s;
}

.winTag-close:hover {
  font-weight: 800;
  color: #f75658;
  transition: color 0.3s;
}

.hehe-enter,
.hehe-leave-to {
  opacity: 0;
}
.hehe-enter-to,
.hehe-leave {
  opacity: 1;
}
.hehe-enter-active,
.hehe-leave-active {
  transition: all .3s;
}

// close #4f6880
</style>
