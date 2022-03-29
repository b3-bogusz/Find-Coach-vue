<template>
  <section>
    <CoachFilter @change-filter="setFilters"></CoachFilter>
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">
          Refresh
        </BaseButton>
        <BaseButton link to="/register">
          Register as coach
        </BaseButton>
      </div>
      <ul v-if="hasCoaches">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          >
          </CoachItem>
      </ul>
      <h3 v-else>No coaches found</h3>
    </BaseCard>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem';
import BaseCard from '../../components/ui/BaseCard';
import BaseButton from '../../components/ui/BaseButton';
import CoachFilter from '../../components/coaches/CoachFilter';
export default {
  components: { CoachFilter, BaseButton, BaseCard, CoachItem },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/getCoachesList']
      return coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')){
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')){
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')){
          return true;
        }
        return false;
      })
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches']
    }
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>