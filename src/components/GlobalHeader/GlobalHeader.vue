<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header
        v-if="visible"
        :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
        :style="{ padding: '0', background: 'red'}">
        <div v-if="mode === 'sidemenu'" class="header" style="background: #3a3b3f;">
          <a-row>
            <a-col :span="1">
              <a-icon v-if="device==='mobile'" class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle" style="color: #3a3b3f;filter: invert(100%);"/>
              <a-icon v-else class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" style="color: #3a3b3f;filter: invert(100%);"/>
            </a-col>
            <a-col :span="17" style="line-height: 20px;top: 15px;">
                <blogWinTag />
            </a-col>
            <a-col :span="6">
              <input-search style="float: right"></input-search> 
            </a-col>
          </a-row>
          <!-- <user-menu></user-menu> -->
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
    blogWinTag
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
