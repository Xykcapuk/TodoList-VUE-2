<template>
  <div class="v-popup">
    <div class="header">
      <span class="header-text">{{ newTask }}</span>
      <span>
        <i class="material-icons" @click="closePopupNewTask">highlight_off</i>
      </span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="footer">
      <button class="btn-close-modal" @click="closePopupNewTask">Закрыть</button>
      <button class="btn-add-card" @click="addNewTask" :disabled="disabledBtnAdd">{{ addBtnName }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-popup-add-task",
  state: {
    textInput: '',
    textDate: '',
    isPopupVisible: false
  },
  props: {
    newTask: {
      type: String,
      default: ''
    },
    addBtnName: {
      type: String,
      default: ''
    },
    disabledBtnAdd: Boolean
  },
  methods: {
    showPopupNewTask() {
      this.isPopupVisible = true
    },
    closePopupNewTask() {
      this.$emit('closePopupNewTask')
    },
    addNewTask() {
      this.$emit('addNewTask')
    }
  }
}
</script>

<style scoped>
.v-popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: lightgray;
  width: 400px;
  border-radius: 10px;
  z-index: 1;
}
.content {
  margin: 10px 0 10px 0;
  border: 2px solid darkgrey;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: darkgrey;
}
.header-text {
  font-size: var(--font-size-16);
  font-weight: bold;
}
.header, .footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn-add-card, .btn-close-modal {
  padding: 8px;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid darkgrey;
  background: none;
}
.btn-add-card:enabled:hover {
  background: green;
  color: white;
  border: 2px solid green;
}
.btn-close-modal:hover {
  background: red;
  color: white;
  border: 2px solid red;
}
.material-icons {
  padding: 5px;
  cursor: pointer;
}
</style>
