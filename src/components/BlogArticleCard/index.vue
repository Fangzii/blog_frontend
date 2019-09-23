<template>
  <div>
    <a-card
      style="width:100%"
      :title="data[title]"
    >
      <span slot="customRender" slot-scope="item">
        <a-icon type="home"/>{{item.key}}
      </span>
      <div v-html="data[body]"></div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'BlogArticleCard',
  props: {
    data: {
      required: true
    },
    // 默认定义字段
    title: {
      default: 'title'
    },
    cover: {
      default: 'cover'
    },
    synopsis: {
      default: 'synopsis'
    },
    time: {
      default: 'time'
    },
    name: {
      default: 'name'
    },
    body: {
      default: 'body'
    },
  },
  data () {
    return {}
  },
  methods: {
    onTabChange (key, type) {
      console.log(key, type)
      this[type] = key
    },
  },
}
</script>