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

.fang-handle-class-tl {
  /* top: -5px;
  left: -5px;
  cursor: nw-resize; */
  display: none !important;
}

.fang-handle-class-tm {
  border: 0px solid #202020;
  top: -10px;
  left: 8%;
  margin-left: -7px;
  width: 84%;
  height: 10px;
  cursor: n-resize;
}

.fang-handle-class-tr {
  /* top: -5px;
  right: -5px;
  cursor: ne-resize; */
  display: none !important;
}

.fang-handle-class-ml {
  top: 8%;
  margin-top: -7px;
  /* left: -5px; */
  height: 84%;
  width: 10px;
  cursor: w-resize;
}

.fang-handle-class-mr {
  top: 8%;
  margin-top: -7px;
  right: 0px;
  height: 84%;
  width: 10px;
  cursor: e-resize;
}

.fang-handle-class-bl {
  /* bottom: -5px;
  left: -5px;
  cursor: sw-resize; */
  display: none !important;
}

.fang-handle-class-bm {
  bottom: 0px;
  left: 8%;
  margin-left: -7px;
  width: 84%;
  height: 10px;
  cursor: s-resize;
}

.fang-handle-class-br {
  /* bottom: -5px;
  right: -5px;
  cursor: se-resize; */
  display: none !important;
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

</style>
