<template>
    <div class="head">
      <div class="content">
        <img src="static/images/logo.png" alt="" class="logo">
      </div>
    </div>
</template>

<script>
  export default {
    name: "ihead"
  }
</script>

<style scoped>
  .head {
    width: 100%;
    background: #005db8;
    height: 50px;
  }
  .content {
    max-width: 1000px;
    margin:0 auto;
  }
  .logo{
    width: 60px;
    margin:  10px 0;
  }
</style>
