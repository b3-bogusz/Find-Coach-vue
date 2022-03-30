<template>
  <TheHeader></TheHeader>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader';
export default {
  components: {
    TheHeader
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.route-enter-form {
  opacity: 0;
  transform: translateY(-3rem);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(3rem);
}

.route-enter-active {
  transition: all .3s ease-out;
}

.route-leave-active {
  transition: all .3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>