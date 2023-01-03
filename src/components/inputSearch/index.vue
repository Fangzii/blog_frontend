<template>
  <div :style="`width: ${isTheInput? '200': '150'}px; transition: all .2s ease`">
      <a-popover
      placement="bottomLeft"
      trigger="click"
      :visible="visible"
    >
    <div slot="title">
      <!-- 提词器 -->
      <blogPrompter :inString="data" v-on:outString="outStringChange"></blogPrompter>
    </div>
      <div slot="content">
        <baseSearch :inString="data" :visible="visible" v-on:afterClick="afterClick"></baseSearch>
      </div>
      <a-input-search v-model="data" @change="change" @click="clickInput" @blur="blurInput"/>
    </a-popover>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin'
import blogPrompter from '@/components/BlogPrompter/index.vue'
import baseSearch from './baseSearch.vue';

export default {
  name: 'inputSearch',
  components: {
    blogPrompter,
    baseSearch
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
      console.log(value, 999)
    },
    change(value) {
      // this.data = value.data;
      this.visible = this.data ? true : false
    },
    clickInput() {
      this.isTheInput = true;
    },
    blurInput() {
      if(!this.data) {
        this.isTheInput = false;
        this.visible = false;
      }
    },
    // 点击以后清空
    afterClick() {
      this.data = ''
      this.isTheInput = false;
      this.visible = false;
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
  font-size: 8rpx !important;
}
</style>


