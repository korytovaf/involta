<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th class="cell-th">Имя</th>
          <th class="cell-th">Пол</th>
          <th class="cell-th">Возраст</th>
          <th class="cell-th">Автомобиль</th>
          <th class="cell-th">Адрес</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="row">
          <cell-component
              type="name"
              :model-value="user.name"
              :user="user"
              :deleteEmptyLine="deleteEmptyLine"
          />
          <cell-component
              type="gender"
              :model-value="user.gender"
              :user="user"
              :deleteEmptyLine="deleteEmptyLine"
          />
          <cell-component
              type="age"
              :model-value="user.age"
              :user="user"
              :deleteEmptyLine="deleteEmptyLine"
          />
          <cell-component
              type="car"
              :model-value="user.car"
              :user="user"
              :deleteEmptyLine="deleteEmptyLine"
          />
          <cell-component
              type="address"
              :model-value="user.address"
              :user="user"
              :deleteEmptyLine="deleteEmptyLine"
          />
          <td class="cell-td">
            <button
                v-if="user.id"
                type="button"
                class="btn-delete"
                @click.prevent="deleteUser(user.id)"
            >
              <icons-component name="basket" class="basket-icon" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button
        type="button"
        @click.prevent="addUser"
        class="btn-create"
    >
      Добавить
    </button>
    <alarm-component :messages="messages" />
  </div>
</template>

<script>
import {ref} from "vue";
import {socket} from "@/api/socket";
import IconsComponent from "@/assets/icons/icons-component";
import AlarmComponent from "@/components/Alarm";
import CellComponent from "@/components/Cell";

export default {
  name: "UsersComponent",
  components: { CellComponent, IconsComponent, AlarmComponent },
  data() {
    return {
      users: ref([]),
      messages: ref([]),
    }
  },
  methods: {
    sorting(arr, ell) {
      return arr.sort(function(a, b) {
        if (a[ell] > b[ell]) return 1;
        if (a[ell] === b[ell]) return 0;
        if (a[ell] < b[ell]) return -1;
      });
    },

    addMessage(messages, newMessage) {
      messages.push(newMessage);
      setTimeout(() => {
        messages.pop();
      }, 2000)
    },

    getUsers() {
      socket.emit("getUsers");
      socket.on("errorBD", (data) => this.addMessage(this.messages, data.message));
      socket.on("allUsers", (data) => this.users = this.sorting(data, "id"));
    },

    deleteEmptyLine() {
      this.users.pop()
    },

    async addUser() {
      const user = {
        name: "",
        age: null,
        gender: "",
        car: "",
        address: ""
      };

      socket.emit("createUser", user);
      socket.on("createUserOk", () => this.getUsers());
    },

    deleteUser(id) {
      socket.emit("deleteUser", id);
    }
  },
  mounted() {
    this.getUsers()
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
}

.table {
  width: 100%;
  margin-top: 40px;
  border-collapse: collapse;
}

.cell-th {
  border: 1px solid #8c8c8c;
  padding: 1px;
}

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

.row {
  &:hover {
    & > .cell-td {
      opacity: 1;
    }
  }
}

//.input {
//  width: 100%;
//  height: 100%;
//  padding: 5px 10px;
//  border: none;
//  border-radius: 0;
//  background-color: transparent;
//
//  &:focus {
//    outline: none;
//    box-shadow: 0 0 0 2px #000000;
//
//    &:hover {
//      background-color: white;
//    }
//
//    & .cell-td {
//      opacity: 1;
//    }
//  }
//}
.btn-create {
  align-self: flex-start;
  margin-top: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.btn-delete {
  margin: 0 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover .basket-icon {
    fill: #d5177b;
  }

  & .basket-icon {
    width: 16px;
    height: 16px;
    fill: #8c8c8c;
    transition: all 0.2s;
  }
}
</style>
