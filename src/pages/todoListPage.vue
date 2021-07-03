<template>
  <div>
    <input type="date" v-model="filterDate" @change="filterList()">
    <select v-model="selected" @change="sortList()">
      <option disabled value="">Выберите вариант сортировки</option>
      <option value="Ab">От старых к новым</option>
      <option value="Zy">От новых к старым</option>
    </select>
    <button @click="reset()">Сбросить</button>
    <input v-model="search" @input="searchLine()"/>
    <div class="input">
      <input type="date" v-model="textDate">
      <input v-model="textInput"/>
      <button :disabled ="validateFields()" @click="add()">Добавить запись</button>
      <p v-if="validateFields()">Чтобы добавить запись, заполните все поля</p>
      <button :disabled ="list.length === 0" @click="clear()">Удалить весь список</button>
    </div>
    <ul v-if="list.length">
      <li v-for="(item, index) in list" :key="index" :class="{'completed': item.check}">
       <input type="checkbox" v-model="item.check" @change="checked(index)"/>
          <div v-if="indexEdit === index" @keyup.esc="esc()" @keyup.enter="save(index)">
            <input type="date" v-model="textEditDate"/>
            <input v-model="textEditText" ref="focusInput"/>
            <button @click="save(index)">Сохранить</button>
          </div>
          <div v-else>
            {{ formatDate(item.date) }} {{ item.text }}
            <button @click="edit(index)" :disabled="item.check">Редактировать</button>
          </div>
          <div>
            <button @click="del(index)">Удалить строку</button>
          </div>
      </li>
    </ul>
    <p v-else>
      Записей нет!!!
    </p>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import localstorage from 'local-storage'

export default {
  name: "todoListPage",
  ele: '#app',
  data () {
    return {
      textDate: '',
      textInput: '',
      textEditDate: '',
      textEditText: '',
      indexEdit: null,
      filterDate: '',
      selected: '',
      search: '',
      list: [
      ]
    }
  },
  methods: {
    validateFields() {
      return this.textInput === '' || this.textDate === ''
    },
    add() {
      this.list.push({
        check: false,
        date: this.textDate,
        text: this.textInput
      })
      localstorage.set('list', this.list)
      this.textInput = ''
    },
    clear() {
      this.list = []
      localstorage.set('list', this.list)
    },
    edit(index) {
      this.indexEdit = index
      this.textEditDate = this.list[index].date
      this.textEditText = this.list[index].text
      this.$nextTick(() => {
        this.$refs.focusInput[0].focus()
      })
    },
    save() {
      this.list[this.indexEdit].date = this.textEditDate
      this.list[this.indexEdit].text = this.textEditText
      this.indexEdit = null
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
      console.log(this.filterDate)
    },
    getListLocal() {
      const data = localstorage.get('list')
      if (data !== null && Array.isArray(data))
        this.list = localstorage.get('list')
    },
    reset() {
      this.getListLocal()
    },
    sortList() {
      const sortOption = (a,b) => { return new Date(a.date) - new Date(b.date) }
      if (this.selected === 'Ab')
        this.list = this.list.sort((a, b) => sortOption(a,b)) ;
      if (this.selected === 'Zy')
        this.list = this.list.sort((a, b) => sortOption(b,a));
    },
    searchLine() {
      const buf = localstorage.get('list')
      this.list = buf.filter(element => element.text === this.search)
      if (this.search === '') this.list = buf
    }
  },
  mounted() {
    this.getListLocal()
  }
}
</script>

<style scoped>
  .completed {
    text-decoration: line-through;
  }
</style>