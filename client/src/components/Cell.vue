<template>
  <td class="cell-td">
    <input
        class="input"
        :class="{ 'input_loaded' : loaded }"
        :value="modelValue"
        :data-name="type"
        @blur="(e) => onBlur(e, user)"
        @keydown="isNumber"
    />
  </td>
</template>

<script>
import {socket} from "@/api/socket";

export default {
  name: "CellComponent",
  data() {
    return {
      loaded: false,
    }
  },
  props: {
    deleteEmptyLine: Function,
    user: Object,
    modelValue: [String, Number],
    type: String,
  },
  methods: {

    isNumber(e) {
      if(e.target.dataset.name === "age") {
        let charCode = (e.which) ? e.which : e.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          e.preventDefault();
        } else {
          return true;
        }
      }
    },

    onBlur(e, user) {
      user[this.type] = e.target.value
      this.loaded = true;
      socket.emit("changeUser", user);
      socket.on("changeUserOk", () => {
        this.loaded = false;
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.cell-td {
  border: 1px solid #8c8c8c;
  padding: 1px;

  &:hover {
    background-color: #e0e0e0;

    & > .cell-td {
      opacity: 1;
    }
  }

  &:last-child {
    border: none;
    background-color: white;
    opacity: 0;
  }
}

.input {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  border: none;
  border-radius: 0;
  background-color: transparent;
  transition: background-color 0.1s;

  &_loaded {
    background-color: #ff3a3a;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #000000;

    &:hover {
      background-color: white;
    }
  }
}
</style>
