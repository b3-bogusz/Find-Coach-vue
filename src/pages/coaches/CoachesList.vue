<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <CoachFilter @change-filter="setFilters"></CoachFilter>
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)">
            Refresh
          </BaseButton>
          <BaseButton link to="/auth" v-if="!isLoggedIn">Login</BaseButton>
          <BaseButton link to="/register" v-if="!isCoach && !isLoading && isLoggedIn">
            Register as coach
          </BaseButton>
        </div>
        <div v-if="isLoading">
          <BaseSpinner></BaseSpinner>
        </div>
        <ul v-else-if="hasCoaches">
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
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem';
import BaseCard from '../../components/ui/BaseCard';
import BaseButton from '../../components/ui/BaseButton';
import CoachFilter from '../../components/coaches/CoachFilter';
import BaseSpinner from '../../components/ui/BaseSpinner';
import BaseDialog from '../../components/ui/BaseDialog';
export default {
  components: { BaseDialog, BaseSpinner, CoachFilter, BaseButton, BaseCard, CoachItem },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
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
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    }
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh})
      } catch(error) {
        this.error = error.message || 'Something went wrong'
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadCoaches();
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