<template>
  <div class="informatization" :style="`min-height: ${hidden? '0' : '200'}px;`">
    <div class="base_informatization">
      <a-avatar :size="hidden? 38 : 52" icon="user" :src="logo" class="_logo"/>
      <transition name="fade">
        <div v-show="!hidden">
          <div v-for="(item, index) in userInfoArr" :key="index">
            <a-icon :type="`${item.type}`" class="icon"/>
            <span>{{item.show}}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'
import { getUserInformatization } from '@/api/manage'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: 'Ant Design Pro',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userInfo: null,
      userInfoArr: [],
      showToType: {
        show_name: 'user',
        signature: 'tag',
        location: 'environment',
        weChat: 'wechat',
        github_url: 'github',
        link: 'link'
      },
      logo: null
    }
  },
  methods: {
    getUser() {
      let user = { name: 'fangzicheng' }
      this.userInfoArr = []
      getUserInformatization(user).then(res => {
        this.userInfo = res.results[0]['informatization']
        this.logo = this.userInfo.image_url
        let arr = Object.keys(this.userInfo)
        let need = ['show_name', 'signature', 'location', 'weChat', 'github_url', 'link']
        for (let i in arr) {
          if (need.findIndex(f => f === arr[i]) > -1) {
            this.userInfoArr.push({
              show: this.userInfo[arr[i]],
              type: this.showToType[arr[i]]
            })
          }
        }
        this.$forceUpdate()
      })
    }
  },
  created() {
    this.getUser()
  }
}
</script>
<style lang="less">
.informatization {
  color: #dad4d4 !important;
  padding: 20px;
}

.base_informatization {
  margin-top: 30px;
}

.icon {
  margin-right: 10px;
}

._logo {
  margin-bottom: 20px !important;
}

</style>

