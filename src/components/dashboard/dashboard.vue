<script setup lang="js">
import { useUserStateStore } from '../../stores/user_state'
import { useJobsStorageTracker } from '../../composables/jobs_storage_tracker'
import { useJobsStateStore } from '../../stores/jobs_state'
import { onMounted, ref } from 'vue';
import AllJobs from './AllJobs.vue';
import AJob from './AJob.vue';

const emits = defineEmits(['force_reauthentication'])

const jobStateStore = useJobsStateStore()
const active_job_view_toggle = ref(jobStateStore.get_active_job_view_toggle)

const force_reauthentication = async () => {
  emits('force_reauthentication')
}

onMounted(async () => {
})
</script>

<template>
  <section class="relative w-full h-full">
    <AllJobs @force_reauthentication="force_reauthentication()" />

    <section v-if="active_job_view_toggle" class="absolute top-0 w-full h-full">
      <AJob />
    </section>
  </section>
</template>
