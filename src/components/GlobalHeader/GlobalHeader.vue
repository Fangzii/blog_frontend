<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header
        v-if="visible"
        :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
        :style="{ padding: '0', background: 'red'}">
        <div v-if="mode === 'sidemenu'" class="header" style="background: rgb(56 66 70);">
          <a-row>
            <a-col :span="1">
              <blog-icon v-if="device==='mobile'" class="trigger" :type="collapsed ? 'icon-x_shouqi' : 'icon-x_zhankai'" @click="toggle" style="color: #3a3b3f;filter: invert(100%);transform: scale(0.7);position: relative;right: 5px;"/>
              <blog-icon v-else class="trigger" :type="collapsed ? 'icon-x_zhankai' : 'icon-x_shouqi'" @click="toggle" style="color: #3a3b3f;filter: invert(100%);transform: scale(0.7);position: relative;right: 5px;"/>
            </a-col>
            <a-col :span="17" style="line-height: 20px;top: 15px;">
              <blogWinTag />
            </a-col>
            <a-col :span="6">
              <input-search style="float: right"/> 
            </a-col>
          </a-row>
        </div>
        <div v-else :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <logo class="top-nav-header" :show-title="device !== 'mobile'"/>
              <s-menu v-if="device !== 'mobile'" mode="horizontal" :menu="menus" :theme="theme" />
              <a-icon v-else class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle" />
            </div>
            
            <!-- <user-menu class="header-index-right"></user-menu> -->
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script>
import { Icon } from 'ant-design-vue';
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1505804_0wficryf78b.js', // 在 iconfont.cn 上生成
});
import blogWinTag from '@/components/BlogWinTag/index.vue'
import UserMenu from '../tools/UserMenu'
import SMenu from '../Menu/'
import Logo from '../tools/Logo'
import InputSearch from '@/components/inputSearch/index.vue'
import { mixin } from '@/utils/mixin'

export default {
  name: 'GlobalHeader',
  components: {
    UserMenu,
    SMenu,
    Logo,
    InputSearch,
    blogWinTag,
    'blog-icon': MyIcon,
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  data () {
    return {
      visible: true,
      oldScrollTop: 0
    }
  },
  mounted () {
    document.body.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    handleScroll () {
      if (!this.autoHideHeader) {
        return
      }

      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
    toggle () {
      this.$emit('toggle')
    }
  },
  beforeDestroy () {
    document.body.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="less">
.header-animat{
  height: 46px;
  position: relative;
  z-index: 2;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter, .showHeader-leave-to {
  opacity: 0;
}
</style>
