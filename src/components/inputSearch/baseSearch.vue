<template>
  <div>
    <a-spin :spinning="loading">
      <a-icon slot="indicator" type="loading" style="font-size: 16px" spin />
    </a-spin>
    <a-tag v-for="(item, index) in data" :key="index" @click="goDetail(item)">{{item.title}}</a-tag>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserList } from '@/api/manage'
export default {
  name: 'baseSearch',
  computed: mapGetters({
      multiWindowTag: 'multiWindowTag'
  }),
  props: {
    // 默认定义字段
    inString: {
      default: '',
      required: true
    },
    visible : {
      default: false,
    }
  },
  watch: {
      'inString': function(value) {
        if(!this.visible) {
          return this.data = []
        }
        this.loading = true;
        getUserList({search: value}).then((res) => {
          this.loading = false;
          this.data = res.results
        })
      }
  },
  data() {
    return {
      data: [],
      loading: false
    }
  },
  methods: {
    goDetail(item) {
      if(this.multiWindowTag['Tag'].findIndex(f => f.id === item.id) === -1) {
        this.multiWindowTag['Tag'].push(item)
      }
      this.$emit(`afterClick`)
    }
  },
  created() {}
}
</script>
<style lang="less" scoped>
</style>
