<template>
  <div class="v-popup">
    <div class="header">
      <span class="header_text">{{ editTask }}</span>
      <span>
        <i class="material-icons" @click="saveTask">highlight_off</i>
      </span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="footer">
      <button class="btn-add-card" @click="saveTask">{{ saveBtnName }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-popup-edit-task",
  state: {
    textInput: '',
    textDate: '',
  },
  props: {
    editTask: {
      type: String,
      default: ''
    },
    saveBtnName: {
      type: String,
      default: ''
    },
  },
  methods: {
    showPopupEditTask() {
      this.isPopupVisible = true
    },
    saveTask() {
      this.$emit('saveTask')
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
.header_text {
  font-size: var(--font-size-16);
  font-weight: bold;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.footer {
  display: flex;
  align-items: center;
  justify-content: right;
}
.btn-add-card, .btn-close-modal {
  padding: 8px;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid darkgrey;
  background: none;
}
.btn-add-card:enabled {
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
