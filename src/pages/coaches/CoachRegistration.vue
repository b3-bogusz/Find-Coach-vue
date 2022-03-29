<template>
  <section>
    <BaseCard>
      <h2>Register as a coach now!</h2>
      <CoachForm></CoachForm>
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from './CoachForm';
import BaseCard from '../../components/ui/BaseCard';
export default {
  components: { BaseCard, CoachForm }
}
</script>


