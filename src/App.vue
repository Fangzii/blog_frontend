<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {
      locale: zhCN
    }
  },
  mounted() {}
}
</script>
<style>
#app {
  height: 100%;
}
::-webkit-scrollbar {display:none};
.fang-handle-class {
  position: absolute;
  /* background-color: pink; */
  border: 1px solid #202020;
  /* border-radius: 50%;
  height: 5px;
  width: 5px; */
  -webkit-transition: all 300ms linear;
  -ms-transition: all 300ms linear;
  transition: all 300ms linear;
}


.fang-handle-class-tl:hover,
.fang-handle-class-tr:hover,
.fang-handle-class-bl:hover,
.fang-handle-class-br:hover {
/* .fang-handle-class-bm:hover, */
/* .fang-handle-class-tm:hover, */ 
  /* background-color: red; */
  border: 1px solid red;
  transform: scale(1.1);
}

.fang-handle-class-mr:hover {
  border-right: 3px solid red;
  transform: scale(1.1);
}

.fang-handle-class-ml:hover {
  border-left: 3px solid red;
  transform: scale(1.1);
}

.fang-handle-class-bm:hover {
  border-bottom: 3px solid red;
  transform: scale(1.1);
}

.fang-handle-class-tm:hover {
  border-bottom: 3px solid red;
  transform: scale(1.1);
}

/* .ant-popover-arrow {
  display: none;
} */

.lucky-circle {
  /* width: 60px;
  height: 60px; */
  position: relative;
  bottom: 0;
}

</style>
