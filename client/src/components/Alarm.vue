<template>
  <div class="messages">
    <TransitionGroup name="list" tag="ul">
      <li v-for="message in messages" :key="message">
        <div class="message">
          {{ message }}
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  name: "AlarmComponent",
  props: {
    messages: Array,
  },
}
</script>

<style lang="scss" scoped>
.messages {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  right: 40px;
}

.message {
  min-width: 250px;
  padding: 10px 16px;
  margin-bottom: 20px;
  background-color: red;
  border-radius: 2px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
