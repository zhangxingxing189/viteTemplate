<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav>
      <RouterLink to="/factories">工厂管理</RouterLink> |
      <RouterLink to="/workshops">车间管理</RouterLink> |
      <RouterLink to="/stores">仓库管理</RouterLink> |
      <RouterLink to="/employees">职工管理</RouterLink> |
      <RouterLink to="/products">产品管理</RouterLink> |
      <RouterLink to="/parts">零件管理</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
nav {
  padding: 20px;
  text-align: center;
}
nav a {
  padding: 0 10px;
}
</style>
