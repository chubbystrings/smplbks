<template>
  <div class="not--found">
    <h2>404! Oops seems Your'e lost</h2>
    <router-link to="/" class="home--link"> Home </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.not--found {
  margin: 150px auto;
  width: 350px;
  height: 350px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  flex-direction: column;
  text-align: center;
  gap: 40px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.home--link {
  display: flex;
  padding: 15px 10px;
  color: white;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  transition: all 0.2s ease-out;
  width: 100%;
  background: var(--secondary);
}
</style>
