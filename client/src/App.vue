<template>
  <users-component />
</template>

<script>
import UsersComponent from "@/components/Users";
export default {
  components: {UsersComponent}
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  height: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  overflow-anchor: none;
  scroll-behavior: smooth;
  font-family: "Roboto-Regular", sans-serif;
  height: 100%;
}

ul {
  list-style: none;
}

li {
  margin: 0;
  padding: 0;
}

img {
  max-width: 100%;
  vertical-align: bottom;
}
</style>
