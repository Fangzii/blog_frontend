<template>
  <div class="informatization" :style="`min-height: ${hidden? '0' : '0'}px;${hidden? 'padding: 10px': 'padding: 20px'};`">
    <div class="base_informatization" :style="`${hidden? 'margin-top: 30px' : ''};`">
      <a-avatar :size="hidden? 38 : 52" icon="user" :src="logo" class="_logo" :style="`right: ${open?'-102' : '0'}px;top: 52px;`" v-show="!hidden" @click="open = !open"/>
      <a-avatar :size="hidden? 38 : 52" icon="user" :src="logo" class="_logo" v-if="hidden"/>
      <div class="switch_demo" @click="open = !open" v-show="!hidden">
        <span class="switch_begin"></span>
        <span class="switch_end"></span>
      </div>
      <transition>
        <div v-if="!hidden && open" class="information_card">
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
      default:"Fang's Blog",
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
  data () {
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
      logo: null,
      open: false
    }
  },
  methods: {
    getUser () {
      const user = { name: 'fangzicheng' }
      this.userInfoArr = []
      getUserInformatization(user).then(res => {
        this.userInfo = res.results[0]['informatization']
        this.logo = this.userInfo.image_url
        const arr = Object.keys(this.userInfo)
        const need = ['show_name', 'signature', 'location', 'weChat', 'github_url', 'link']
        for (const i in arr) {
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
  created () {
    this.getUser()
  }
}
</script>
<style lang="less">
.informatization {
  transition: all .1s;
  filter: invert(100%);
  padding: 20px;
}

.base_informatization {
  // margin-top: 30px;
  transition: all 300ms ease;
}

.icon {
  margin-right: 10px;
}

._logo {
  transition: all .3s;
  z-index: 100;
  filter: invert(100%) !important;
}

.switch {
  &_demo {
    cursor: pointer;
    background: #d6d6d6;
    transition: all .3s;
    width: 50%;
    height: 52px;
    left: 23px;
    margin-bottom: 20px !important;
    position: relative;
    opacity:0.3;
  }

  &_demo:hover {
    opacity:1;
  }

  &_begin {
    background: #d6d6d6;;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    float: left;
    right: 23px;
    position: relative;
  }

  &_end {
    background: #d6d6d6;
    border-radius: 50%;
    width: 52px;
    height: 52px;
    position: relative;
    left: 23px;
    float: right;
  }
}

.information_card {
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  // transform: translateX(100px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

</style>
