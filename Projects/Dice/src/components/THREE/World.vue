<template>
  <canvas class="webgl" ref="webgl"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import Experience from '@/Experience/Experience';

const webgl = ref();

onMounted(() => {
  new Experience(webgl.value)
})

</script>

<style scoped>
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>