<template>
  <canvas class="webgl" ref="webgl"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import Experience from "@/Experience/Experience";

const webgl = ref();
const three_instance = ref();

onMounted(() => {
  three_instance.value = new Experience(webgl.value);
  setTimeout(() => {
    three_instance.value.renderer.info();
  }, 1000);
});
onBeforeUnmount(() => {
  three_instance.value.dispose();
});
</script>

<style scoped>
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>
