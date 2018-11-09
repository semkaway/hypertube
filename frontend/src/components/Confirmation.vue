<template>
  <div>
    <h1>{{ $t('confirmation.title')}}</h1>
    <p>{{ $t('confirmation.message')}}</p>
    <button>{{ $t('button.login')}}</button>
  </div>
</template>

<script>
export default {
  name: 'Confirmation',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
