<template>
  <div class="wrapper-page-todo">
    <div class="block-header">
      <h1 class="title-header">{{ titlePage }}</h1>
    </div>

    <v-popup-add-task class="popupAddTask"
             v-if="isPopupVisible"
             @closePopupNewTask="closePopupNewTask"
             @addNewTask="addNewTask"
             :disabledBtnAdd="validateFields"
             newTask = "Добавить новую задачу"
             addBtnName="Добавить">
      <div class="popup-content">
        <p class="popup-p">Выберите цвет <input type="color" v-model="colorTask"></p>
        <div class="date-input-label">
          <span class="span-input">*</span>
          <label style="margin-right: 10px">Выберите дату</label>
          <input class="popup-input-date" type="date" v-model="dateTask">
        </div>
        <div>
          <label class="span-input">*</label>
          <input class="popup-input" v-model="nameTask" placeholder="Наименование задачи"/>
        </div>
        <div>
          <label class="span-input">*</label>
          <input class="popup-input" v-model="descriptionTask" placeholder="Описание задачи"/>
        </div>
        <div>
          <label class="span-input">*</label>
          <select class="popup-select" v-model="priorityTask">
            <input class="popup-input" v-model="descriptionTask" placeholder="Описание задачи"/>
            <option disabled value="">Выберите приоритет</option>
            <option value="Очень низкий">Очень низкий</option>-->
            <option value="Низкий">Низкий</option>
            <option value="Средний">Средний</option>
            <option value="Высокий">Высокий</option>
            <option value="Очень высокий">Очень высокий</option>
          </select>
        </div>
        <span style="color: darkred; font-size: var(--font-size-14); margin-top: 10px">* Обязательные поля для заполнения</span>
      </div>
    </v-popup-add-task>

    <section class="section-content">
      <div class="block-btn-add">
        <button class="btn-add-new-item" @click="showPopupNewTask">Добавить запись</button>
      </div>
      <div class="block-search">
        <input class="input-search" v-model="search" @input="searchLine()" placeholder="Поиск"/>
        <div class="block-sort">
          <input class="sort-input-date" type="date" v-model="filterDate" @change="filterList()">

          <select class="sort-select" v-model="selectedPriority" @change="filterListPriority()">
            <option disabled value="">Фильтрация по приоритету</option>
            <option value="Очень низкий">Очень низкий</option>
            <option value="Низкий">Низкий</option>
            <option value="Средний">Средний</option>
            <option value="Высокий">Высокий</option>
            <option value="Очень высокий">Очень высокий</option>
          </select>
          <select class="sort-select" v-model="selectedUsual" @change="sortListUsual()">
            <option disabled value="">Обычная сортировка</option>
            <option value="Ab">От старых к новым</option>
            <option value="Zy">От новых к старым</option>
          </select>
          <button class="sort-btn" @click="reset()">Сбросить</button>
        </div>
      </div>
      <div class="block-main">
        <div class="btn-main">
          <button class="btn-clear-list" :disabled ="list.length === 0" @click="clear()">Удалить список</button>
        </div>
      </div>
      <div class="block-ul">
        <ul v-if="list.length">
          <li v-for="(item, index) in list" :key="index" :class="{'completed': item.check}">
            <div class="block-check-color">
              <input class="check-box" type="checkbox" v-model="item.check" @change="checked(index)"/>
              <input type="color" name="bg" value="#ffffff" v-model="item.color">
            </div>

            <div v-if="indexEdit === index" @keyup.esc="esc()" @keyup.enter="save(index)">
              <v-popup-edit-task class="popupEdit"
                                 @saveTask='saveTask'
                                 editTask="Редактировать текущую задачу"
                                 saveBtnName="Сохранить">
                <div class="popup-content">
                  <p class="popup-p">Текущий цвет <input type="color" v-model="editColorTask"></p>
                  <div>
                    <label style="margin-right: 10px">Дата</label>
                    <input class="popup-input-date" type="date" v-model="editDate"/>
                  </div>
                  <label class="label-input-edit">Наименование</label>
                  <input class="popup-input" v-model="editName"/>
                  <label class="label-input-edit">Описание</label>
                  <input class="popup-input" v-model="editDescription"/>
                  <label class="label-input-edit">Приоритет</label>
                  <select class="popup-select" v-model="editPriority">
                    <option value="Очень низкий">Очень низкий</option>
                    <option value="Низкий">Низкий</option>
                    <option value="Средний">Средний</option>
                    <option value="Высокий">Высокий</option>
                    <option value="Очень высокий">Очень высокий</option>
                  </select>
                </div>
              </v-popup-edit-task>
            </div>

            <div class="row-ul" v-else>
              <span>{{ formatDate(item.date) }}</span>
              <span class="span-ul">{{ item.name }}</span>
              <span class="span-ul">{{ item.description }}</span>
              <span>{{ item.priority }}</span>
            </div>

            <div class="block-btns-ul">
              <button class="btn-edit-task" @click="edit(index)" :disabled="item.check">Редактировать</button>
              <button class="btn-del-line" @click="del(index)">Удалить строку</button>
            </div>
          </li>
        </ul>
        <p class="clear-list" v-else>
          Записей нет!!!
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import localstorage from 'local-storage'
import vPopupAddTask from '../сomponents/popup/v-popup-add-task.vue'
import VPopupEditTask from "../сomponents/popup/v-popup-edit-task";

export default {
  name: "todoListPage",
  ele: '#app',
  components: {
    VPopupEditTask,
    vPopupAddTask
  },
  data () {
    return {
      dateTask: '',
      nameTask: '',
      descriptionTask: '',
      priorityTask: '',
      colorTask: '',

      editDate: '',
      editName: '',
      editDescription: '',
      editPriority: '',
      editColorTask: '',

      indexEdit: null,
      filterDate: '',
      selectedUsual: '',
      selectedPriority: '',
      search: '',
      list: [],

      isPopupVisible: false,
      isEdit: false
    }
  },
  props: {
    titlePage: {
      type: String,
      default: 'TodoList'
    }
  },
  computed: {
    validateFields() {
      return this.nameTask === '' || this.dateTask === '' || this.descriptionTask === '' || this.priorityTask === ''
    },
  },
  methods: {
    showPopupNewTask() {
      this.isPopupVisible = true
      this.isEdit = false
    },
    closePopupNewTask() {
      this.isPopupVisible = false
    },
    addNewTask() {
      this.add()
      this.closePopupNewTask()
    },
    showPopupEditTask() {
      this.isEdit = true
      this.isPopupVisible = false
    },
    closePopupEditTask() {
      this.isEdit = false
    },
    saveTask() {
      this.save()
      this.closePopupEditTask()
    },
    add() {
      this.list.push({
        check: false,
        date: this.dateTask,
        name: this.nameTask,
        description: this.descriptionTask,
        priority: this.priorityTask,
        color: this.colorTask,
      })
      localstorage.set('list', this.list)
      this.dateTask = ''
      this.nameTask = ''
      this.descriptionTask = ''
      this.priorityTask = ''
      this.colorTask = ''
    },
    clear() {
      this.list = []
      localstorage.set('list', this.list)
    },
    edit(index) {
      this.indexEdit = index
      this.editColorTask = this.list[index].color
      this.editDate = this.list[index].date
      this.editName = this.list[index].name
      this.editDescription = this.list[index].description
      this.editPriority = this.list[index].priority
    },
    save() {
      this.list[this.indexEdit].color = this.editColorTask
      this.list[this.indexEdit].date = this.editDate
      this.list[this.indexEdit].name = this.editName
      this.list[this.indexEdit].description = this.editDescription
      this.list[this.indexEdit].priority = this.editPriority
      this.indexEdit = null
      localstorage.set('list', this.list)
    },
    esc() {
      this.indexEdit = null
    },
    formatDate(date) {
      return dayjs(date).format('DD.MM.YYYY')
    },
    del(index) {
      this.list.splice(index, 1)
      localstorage.set('list', this.list)
    },
    checked() {
      // this.list[index].check = !this.list[index].check
      localstorage.set('list', this.list)
    },
    filterList() {
      this.list = this.list.filter(element => element.date === this.filterDate)
    },
    getListLocal() {
      const data = localstorage.get('list')
      if (data !== null && Array.isArray(data))
        this.list = localstorage.get('list')
    },
    reset() {
      this.getListLocal()
    },
    sortListUsual() {
      const sortOption = (a,b) => { return new Date(a.date) - new Date(b.date) }
      if (this.selectedUsual === 'Ab')
        this.list = this.list.sort((a, b) => sortOption(a,b)) ;
      if (this.selectedUsual === 'Zy')
        this.list = this.list.sort((a, b) => sortOption(b,a));
    },
    searchLine() {
      const buf = localstorage.get('list')
      this.list = buf.filter(element => element.name === this.search || element.description === this.search)
      if (this.search === '') this.list = buf
    },
    filterListPriority() {
      this.list = this.list.filter(element => element.priority === this.selectedPriority)
    },
  },
  mounted() {
    this.getListLocal()
  }
}
</script>

<style scoped>
/*ALL*/
.wrapper-page-todo {}
.block-header {
  padding: 3rem 1.5rem;
  display: flex;
  align-items: center;
}
.title-header {
  font-size: var(--font-size-55);
}
/*POPUP*/
.popup-content {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.popup-input, .popup-select {
  width: 90%;
  border-radius: 10px;
  border: none;
  padding: 5px;
  margin: 5px 0;
}
.popup-input-date {
  border-radius: 10px;
  border: none;
  padding: 5px;
  margin: 5px 0;
}
.popup-p {
  font-size: var(--font-size-16);
  display: flex;
  align-items: center;
  margin: 5px 0;
}
.popup-p input {
  border-radius: 10px;
  width: 40px;
  height: 30px;
  padding: 1px;
  margin-left: 10px;
}
/*ButtonAdd*/
.btn-add-new-item {
  padding: 8px;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid darkgrey;
  background: none;
}
.btn-add-new-item:hover {
  background: green;
  color: white;
  border: 2px solid green;
}
/*SectionContent*/
.section-content {
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
}
/*BlockAdd*/
.block-btn-add {
  padding: 1rem 0;
}
/*BlockSearch*/
.block-search {
  display: flex;
  align-items: center;
  padding: 15px 0;
}
.input-search {
  text-align: left;
  width: 140px;
  min-width: 120px;
  border-radius: 10px;
  height: 20px;
  padding: 6px;
}
/*blocksort*/
.block-sort {}
.sort-input-date {
  border-radius: 10px;
  height: 20px;
  padding: 6px;
  margin-left: 10px;
}
.sort-select {
  border-radius: 10px;
  height: 35px;
  margin-left: 10px;
}
.sort-btn {
  margin-left: 10px;
  padding: 8px;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid darkgrey;
  background: none;
}
.sort-btn:hover {
  background: red;
  color: white;
  border: 2px solid red;
}
/*BlockMain*/
.block-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.description-p input {
  border-radius: 10px;
  width: 40px;
  height: 30px;
  padding: 1px;
  margin-left: 10px;
}
.btn-main {
  padding: 15px 0;
  width: 250px;
  display: flex;
  justify-content: space-between;
}
.btn-clear-list {
  padding: 8px;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid darkgrey;
  background: none;
}
.btn-clear-list:enabled:hover {
  background: red;
  color: white;
  border: 2px solid red;
}
.clear-list {
  padding: 15px 0;
  font-weight: bold;
  font-size: var(--font-size-30)
}
/*BlockUl*/
.block-ul {
  padding: 15px 0;
  width: 1100px;
  position: relative;
}
.block-check-color {
  width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.check-box {
  height: 20px;
  width: 20px;
}
.block-ul li {
  max-width: 1100px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
}
.row-ul {
  display: flex;
  align-items: unset;
  justify-content: center;
  margin: 0 10px;
  max-width: 750px;
}
.row-ul span {
  min-width: 120px;
  display: inline-block;
  padding: 10px;
  outline: 1px solid #eee;
  word-break: break-all;
}
.row-ul .span-ul {
  min-width: 217px;
}
.block-btns-ul {
  width: 233px;
  position: absolute;
  right: 10px;
  display: flex;
  justify-content: space-between;
}
.btn-edit-task, .btn-del-line {
  padding: 8px;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid darkgrey;
  background: none;
}
.btn-edit-task:hover {
  background: lightblue;
  color: black;
  border: 2px solid lightblue;
}
.btn-del-line:hover {
  background: red;
  color: white;
  border: 2px solid red;
}
/**/
.completed {
  text-decoration: line-through;
}
.span-input {
  color: darkred;
  margin-right: 5px;
}
.label-input-edit {
  font-size: var(--font-size-10);
  margin-top: 5px;
  font-weight: bold;
}
</style>
