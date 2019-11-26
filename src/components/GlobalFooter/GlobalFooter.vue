<template>
  <div class="footer">
    <div class="links">
      <BlogAttribute></BlogAttribute>
    </div>
    <!-- <div class="copyright">
      Copyright
      <a-icon type="copyright" /> 2018 <span>白鹭学园技术组出品</span>
    </div> -->
  </div>
</template>

<script>
import BlogAttribute from '@/components/BlogAttribute/index.vue';
export default {
  name: 'GlobalFooter',
  components: {
    BlogAttribute
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    height: 50px;
    overflow:auto
    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
