<template>
  <a-layout-sider
    :class="[!isMobile()?'sider': 'sider_mobile','blog-menu', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    height="300px"
    :collapsible="collapsible"
    :collapsedWidth="60"
    v-model="collapsed"
    :trigger="null"
    style="height: 30px"
  >
    <logo :hidden="collapsed"/>
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      :style="`background: #202020;${collapsed? 'right: 10px;position: relative;' : ''}`"
    ></s-menu>
    <div class="menuBottomStyle" v-if="!isMobile()">
      <div
        v-for="(item, index) in graph"
        :key="index"
        :class="`${item.class}`"
        :style="`background: ${item.color};top: ${item.top}px;width: ${item.width}px;height: ${item.height}px;position: relative;border-radius: 50%;left: ${item.left}px`"
      ></div>
    </div>
  </a-layout-sider>
</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'
import menu from './index'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      graph: [{ color: '#212121', top: '110', width: 35, height: 35, left: 7, class: 'oneStyle'},
      { color: '#212121', top: '139', width: 20, height: 20, left: 6, class: 'twoStyle' }, 
      { color: '#212121', top: '141', width: 30, height: 30, left: -3, class: 'threeStyle' }]
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    }
  }
  // created() {
  //   console.log(this.menus)
  // }
}
</script>
<style lang="less" scoped>
.blog-menu {
  border-radius: 0px 0px 125px 0px;
}

.menuBottomStyle {
  color: white;
  position: absolute;
  bottom: 0px;
}

.sider {
  -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  position: relative;
  z-index: 10;
  min-height: 80vh;
}

.sider_mobile {
  min-height: 130vh;
}

.oneStyle:hover {
  background: #f75558 !important;
  transition: all .5s;
  cursor: pointer;
}

.twoStyle:hover {
  background: #fbbe33 !important;
  transition: all 1s;
  cursor: pointer;
}

.threeStyle:hover {
  background: #3dcc44 !important;
  transition: all .2s;
  cursor: pointer;
}
</style>

