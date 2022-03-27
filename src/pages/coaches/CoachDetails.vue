<template>
  <section>
    <BaseCard>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate}} /hour</h3>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <header>
        <h2>Interested? Reach out now!</h2>
        <BaseButton link :to="contactLink">Contact</BaseButton>
      </header>
      <router-view></router-view>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
      <p>{{ description }}</p>
    </BaseCard>
  </section>
</template>

<script>
import BaseCard from '../../components/ui/BaseCard';
import BaseButton from '../../components/ui/BaseButton';
import BaseBadge from '../../components/ui/BaseBadge';
export default {
  components: {
    BaseBadge,
    BaseButton,
    BaseCard
  },
  props: ['id',],
  data() {
    return {
      selectedCoach: null
    }
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    contactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    }
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/getCoachesList'].find(coach => coach.id === this.id)
  }
}
</script>


<style>

</style>