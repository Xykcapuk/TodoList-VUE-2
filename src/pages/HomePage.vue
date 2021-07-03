<template>
  <div class="main">
    <p class="greeting-text">
      Появились дела, но некуда записать??? <br>
      Здесь Вы сможете хранить все свои дела
    </p>
    <div class="button">
      <button @click="$router.push({ path: '/todo-list-page' })">Записать первую задачу</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>
.main {
  height: 100vh;
  background-image: url("https://avatars.mds.yandex.net/get-zen_doc/235990/pub_5bc984a261d51800a99060a4_5bc98717dd013400ad2d4c13/scale_1200");
  background-size: cover;
  display: flex;
  overflow: hidden;
}

.greeting-text {
  width: 35vw;
  font-family: "SEGOE SCRIPT", sans-serif;
  font-size: 25px;
  color: rgb(71,74,81);
  -webkit-transform: rotate(-12deg);
}
button {
  font-size: 30px;
  margin-top: 130px;
  font-family: "SEGOE SCRIPT", sans-serif;
  -webkit-transform: rotate(-12deg);
  color: rgb(71,74,81);
  border: medium none;
  background-color: transparent;
}
</style>