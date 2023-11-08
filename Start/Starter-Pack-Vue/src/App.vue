<template>
  <div>
    <button title="清空实例释放内存" class="helper" @click="handleOnClick">
      {{ flag ? "on" : "off" }}
    </button>
    <THREEWorld v-if="flag"></THREEWorld>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import THREEWorld from "./components/THREE/World.vue";

const flag = ref(true);
const handleOnClick = () => {
  flag.value = !flag.value;
  console.log(flag.value ? "on" : "off");
};
</script>

<style scoped>
.helper {
  z-index: 9999;
  position: absolute;
}
.helper:hover:before {
  content: attr(title);
  display: block;
  position: absolute;
  left: 30px;
  top: 10px;
  width: 80px;
  padding: 0.5em;
  background-color: #fff;
  border: 1px solid #ccc;
}
</style>
