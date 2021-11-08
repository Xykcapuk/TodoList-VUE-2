<template>
  <div class="wrapper-page-home">
    <div class="block-name-projects">
     <h1>TODOList</h1>
     <span>This app created on Vue</span>
    </div>
    <div class="block-content">
      <div class="block-text">
        <span class="text">Появились дела, но некуда записать???</span>
        <span class="text">Здесь Вы сможете хранить все свои дела</span>
      </div>
      <button class="button" @click="$router.push({ path: '/todo-list-page' })">Записать задачу</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>
/*ALL*/
.wrapper-page-home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: var(--font-size-55);
}

.block-name-projects {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 250px;
}
.block-name-projects h1 {
  font-weight: bold;
  font-family: var(--font-family-Fruktur)
}
.block-name-projects span {
  font-size: var(--font-size-30);
  font-family: var(--font-family-Dancing)
}
.block-content, .block-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.block-text {
  height: 150px;
}
.text {
  font-size: var(--font-size-30);
  font-family: var(--font-family-Lobster);
  padding: 5px;
}
.button {
  margin-top: 20px;
  font-size: var(--font-size-40);
  font-family: var(--font-family-Lobster);
  cursor: pointer;
  border: 2px solid black;
  padding: 10px;
  border-radius: 10px;
  background-color: transparent;
}
.button:hover {
  color: darkgrey;
}
</style>
