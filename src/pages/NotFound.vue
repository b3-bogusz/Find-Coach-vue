<template>
  <section>
    <BaseCard>
      <h2>Page Not Found</h2>
      <p>This page could not be found - please check out all our <router-link to="/coaches">coaches</router-link></p>
    </BaseCard>
  </section>
</template>

<script>
import BaseCard from '../components/ui/BaseCard';
export default {
  components: { BaseCard }
}
</script>