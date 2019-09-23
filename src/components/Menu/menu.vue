<template>
  <div class="blogMenu">
    <ul style="list-style-type:none">
      <li v-for="(item, index) in menus" :key="index" class="blogMenu-item">
        <a-icon :type="`${item.meta.icon}`" class="blogMenu-icon" />
        <span class="blogMenu-title" v-show="!collapsed">{{item.meta.title}}</span>
      </li>
    </ul>
  </div>

</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  name: 'blogMenu',
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
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  },
  created() {
    console.log(this.menus, 998)
  }
}
</script>
<style lang="less" scoped>
.blogMenu {
  cursor: pointer;
  // background: red;
  &-item {
    color: white;
    padding: 10px;
  }
  &-icon {
    font-size: 20px;
  }
  &-icon:hover {
    // font-size: 60px;
    transform: scale(2);
    transition: all .3s linear;
  }
  &-title {
    margin-left: 15px;
    color: #adadad;
  }
  // &-tilte:hover { 
  //   margin-left: 50px;
  //   color: #5e5454;
  // }
}
</style>
