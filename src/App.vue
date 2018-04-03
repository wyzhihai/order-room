<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,#app{
	height:100%;
}
*{
  font-family:"MicrosoftYaHei";
  box-sizing:border-box;
}
a,a:focus{
  color:#666;
  text-decoration:none;
}
</style>
