<template>
  <div v-html="showString"></div>
</template>

<script>
export default {
  name: 'BlogPrompter',
  props: {
    // 默认定义字段
    inString: {
      default: '',
      required: true
    }
  },
  watch: {
      'inString': function(value) {
        for(let i in this.filter) {
          let replaceStr = this.filter[i]
          if(value.indexOf(this.filter[i]) > -1) {
            this.$emit('outString', this.filter[i])
            value = value.replace(new RegExp(replaceStr,'gm'),`<span style="background: yellow">${this.filter[i]}</span>`)
          }
        }
        this.showString = value
      }
  },
  data() {
    return {
      filter: ['天气', '我'],
      showString: ''
    }
  },
  methods: {},
  created() {}
}
</script>
<style lang="less" scoped>
</style>
