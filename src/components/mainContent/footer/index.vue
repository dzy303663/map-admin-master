<template>
  <footer class="footer" v-once>Copyright &copy; {{getYear}} 吕梁学院 All Rights Reserved</footer>
</template>
<script type="text/javascript">
  export default {
    computed: {
      getYear(){
        return new Date().getFullYear()
      }
    }
  }
</script>
