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

  /* width: 0px;
  height: 0px;
  border-right: 60px solid transparent;
  border-top: 60px solid red;
  border-left: 60px solid red;
  border-bottom: 60px solid red;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px; */
}

/* .fang-handle-class-tl {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
} */

.fang-handle-class-tm {
  top: 0px;
  left: 8%;
  margin-left: -7px;
  width: 84%;
  /* height: 4px; */
  cursor: n-resize;
}

/* .fang-handle-class-tr {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
} */

.fang-handle-class-ml {
  top: 8%;
  margin-top: -7px;
  /* left: -5px; */
  height: 84%;
  cursor: w-resize;
}

.fang-handle-class-mr {
  top: 8%;
  margin-top: -7px;
  right: 0px;
  height: 84%;
  cursor: e-resize;
}

/* .fang-handle-class-bl {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
} */

.fang-handle-class-bm {
  bottom: 0px;
  left: 8%;
  margin-left: -7px;
  width: 84%;
  cursor: s-resize;
}

/* .fang-handle-class-br {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
} */

.fang-handle-class-tl:hover,
.fang-handle-class-tr:hover,
.fang-handle-class-bl:hover,
.fang-handle-class-br:hover,
.fang-handle-class-bm:hover,
.fang-handle-class-tm:hover,
.fang-handle-class-mr:hover,
.fang-handle-class-ml:hover {
  /* background-color: red; */
  border: 1px solid red;
  transform: scale(1.1);
}
</style>
