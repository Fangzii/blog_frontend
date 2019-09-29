<template>
  <div :style="`width: ${isTheInput? '200': '150'}px; transition: all .2s ease`">
      <a-popover
      placement="bottomLeft"
      trigger="click"
      :visible="visible"
      style="top: 10px"
    >
    <div slot="title">
      <blogPrompter :inString="data" v-on:outString="outStringChange"></blogPrompter>
    </div>
      <div slot="content">
      </div>
      <a-input-search v-model="data" @change="change" @click="clickInput" @blur="blurInput" placeholder="请输入搜索..."/>
    </a-popover>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin'
import blogPrompter from '@/components/BlogPrompter/index.vue'

export default {
  name: 'inputSearch',
  components: {
    blogPrompter
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
    outStringChange(value) {
      console.log(value, 8888999999)
    },
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

.ant-input::-webkit-input-placeholder {
  color: #3a3b3f !important;
  font-size: 8px !important;
}
</style>


