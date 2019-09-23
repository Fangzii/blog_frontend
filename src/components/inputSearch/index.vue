<template>
  <div :style="`width: ${isTheInput? '200': '150'}px; transition: all .2s ease`">
      <a-popover
      placement="bottomLeft"
      trigger="click"
      :visible="visible"
      style="top: 10px"
    >
    <div slot="title">
        <div>{{data}}</div>
    </div>
      <div slot="content">
      </div>
      <a-input-search v-model="data" @change="change" @click="clickInput" @blur="blurInput" placeholder="请输入搜索..."/>
    </a-popover>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin'

export default {
  name: 'inputSearch',
  components: {
  },
  mixins: [mixin],
  data () {
    return {
      data: '',
      visible: false,
      isTheInput: false,
      oldScrollTop: 0
    }
  },
  mounted () {
  
  },
  methods: {
    change(value) {
      this.visible = this.data ? true : false
    },
    clickInput() {
      this.isTheInput = true;
    },
    blurInput() {
      this.isTheInput = false;
      this.visible = false;
      this.data = ''
    }
  },
  beforeDestroy () {
  
  }
}
</script>

<style lang="less">

.ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow {
  display: none;
}
</style>


