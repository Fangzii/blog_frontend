<template>
  <div ref="attribute" class="attribute">
    <div v-for="(item, index) in AttributeData" :key="index" :ref="`attribute_id_${index}`">
          <p @mouseenter="changeAttribute(item.title)"  class="winTag-title" :style="`animation-duration:${index + 2}s;-webkit-animation-duration:${index + 2}s;text-shadow: 0.1em 0.1em 0.2em ${item.color};`">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1505804_0wficryf78b.js' // 在 iconfont.cn 上生成
})
import { getAttribute } from '@/api/manage'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'BlogAttributeTag',
  components: {
    'blog-icon': MyIcon
  },
  data() {
    return {
      AttributeData: []
    }
  },
  methods: {
    getAttributeData() {
      getAttribute().then(res => {
        this.AttributeData = res.rankings
        for (let i in this.AttributeData) {
          setTimeout(() => {
            this.changeDiv(15, this.AttributeData[i], i)
          }, 100)
        }
      })
    },
    changeDiv(r_w, data, index) {
      let randomWidth = data['num'] * r_w + 1
      let container = this.$refs.attribute
      let allEle = container.getElementsByTagName('*')
      let div = this.$refs[`attribute_id_${index}`][0]
      let bottom = parseInt(Math.random() * ((container.clientHeight - randomWidth)))
      let left = parseInt(Math.random() * ((container.clientWidth - randomWidth)))

      div.setAttribute('class', 'lucky-circle')
      div.setAttribute('data-left', left)
      div.setAttribute('data-bottom', bottom)

      div.style.bottom = (bottom - 40) + 'px'
      div.style.left = left + 'px'
      div.style.color = data.color
      div.style.fontSize = randomWidth + 'px'

      for (let i = allEle.length - 1; i > 0; i--) {
        if (allEle[i].getAttribute('data-left')) {
          let tLeft = parseInt(allEle[i].getAttribute('data-left'))
          let tBottom = parseInt(allEle[i].getAttribute('data-bottom'))
          let width = allEle[i].offsetWidth
          let height = allEle[i].offsetHeight
          let point_x_1 = tLeft + width / 2
          let point_y_1 = tBottom + height / 2
          let point_x_2 = left + randomWidth / 2
          let point_y_2 = bottom + randomWidth / 2
          let distant = Math.sqrt(
            Math.pow(Math.abs(point_x_1 - point_x_2), 2) + Math.pow(Math.abs(point_y_1 - point_y_2), 2)
          )
          if (distant < width / 2 + randomWidth / 2) {
            // allEle[i].parentNode.removeChild(allEle[i])
            // allEle[i].style.left = allEle[i].style.left + 15
            // console.log(`经过?`, allEle[i].style.left)
          }
        }
      }
    },
    changeAttribute(title) {
      this.$store.commit('SET_ATTRIBUTE', title)
    }
  },
  created() {
    this.getAttributeData()
  }
}
</script>
<style lang="less" scoped>
.blogAttribute {
  user-select: none;
  display: flex;
}

.attribute {
  width: 600px;
  margin: 0 auto;
  // height: 100%;
}

.winTag {
  background: #d1d1d1;
  opacity: 1;
  padding: 6px 15px 0px 10px;
  color: #2f2f2f;
  border-radius: 5px;
  margin-left: 5px;
  font-size: 8px;
  // transition: all 1s;
  &-title {
    max-width: 200px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    animation: heart ease-in-out infinite alternate;
    cursor: pointer;
    -moz-user-select: none; 
    -o-user-select:none; 
    -khtml-user-select:none; 
    -webkit-user-select:none; 
    -ms-user-select:none; 
    user-select:none;
  }

  &-title:hover {
    filter: invert(70%);
  }

  &-close {
    color: #4f6880;
  }

  &-hidden {
    opacity: 0.5 !important;
  }
}

.winTag:hover {
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 1s;
}

.winTag-close:hover {
  font-weight: 800;
  color: #f75658;
  transition: color 0.3s;
}

//margin-top会发生卡顿
@keyframes heart {
  from {
    margin-top: 0px;
  }
  to {
    margin-top: -15px;
  }
}

//用transform就流畅了
@keyframes heart {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(0, 15px);
  }
}

// close #4f6880
</style>
