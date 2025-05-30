<script setup lang="js">
import { useUserStateStore } from '../../stores/user_state'
import { useJobsStorageTracker } from '../../composables/jobs_storage_tracker'
import { useJobsStateStore } from '../../stores/jobs_state'
import { onMounted, ref } from 'vue';

const emits = defineEmits(['force_reauthentication'])

const jobStateStore = useJobsStateStore()
const jobs_storage_tracker = useJobsStorageTracker()
const userStateStore = useUserStateStore()

const fetch_jobs_response = ref([])
const processing_a_job = ref(false)

const truncateString = (str, maxLength = 100) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}


const force_reauthentication = async () => {
  userStateStore.reset()
  await chrome.storage.local.remove('upwork_assistant__user_auth')

  emits('force_reauthentication')
}

const process_job = async (job) => {
  try {

    processing_a_job.value = true
    const user_token = userStateStore.get_token ?? ''
    const job_id = job?.job_id ?? ''
    const job_url = job?.job_url ?? ''
    const job_heading = job?.job_heading ?? ''
    const job_description = job?.job_description ?? ''

    if (
      user_token === '' || job_description === '' ||
      job_id === '' ||
      job_url === '' ||
      job_heading === ''
    ) {
      throw new Error('Required data not complete')
    }

    const process_job_response = await jobs_storage_tracker.process_job(user_token, job)

    if (process_job_response.error && process_job_response.status === 401) {
      await force_reauthentication()
      processing_a_job.value = false
      return
    }

    await fetch_job_from_main_storage()
  } catch (error) {
    processing_a_job.value = false
  }

}


const goto_job = (job) => {
  const job_id = job?.job_id ?? ''
  const inserted_at = job?.inserted_at ?? ''
  const updated_at = job?.updated_at ?? ''
  const job_upwork_id = job?.job_upwork_id ?? ''
  const job_link = job?.job_link ?? ''
  const job_title = job?.job_title ?? ''
  const job_description = job?.job_description ?? ''
  const job_proposal_markdown = job?.job_proposal_markdown ?? ''
  const job_proposal_html = job?.job_proposal_html ?? ''
  const job_owner = job?.job_owner ?? ''

  const active_job = {
    job_id,
    inserted_at,
    updated_at,
    job_upwork_id,
    job_link,
    job_title,
    job_description,
    job_proposal_markdown,
    job_proposal_html,
    job_owner,
  }

  jobStateStore.set_active_job(active_job)
  jobStateStore.set_active_job_view_toggle(true)
}

const fetch_job_from_main_storage = async () => {
  const user_token = userStateStore.get_token ?? ''
  console.log('user_token')
  console.log(user_token)

  if ( user_token === '' ) {
    throw new Error('Required data not complete')
  }
  const res = await jobs_storage_tracker.fetch_job_from_main_storage(user_token)

  console.log(res)

  if (res.error && res.status === 401) {
    await force_reauthentication()
    return
  }

  fetch_jobs_response.value = res.response
}

onMounted(async () => {
  await fetch_job_from_main_storage()
})
</script>

<template>
  <section class="w-full h-full py-6">
    <section class="mb-4">
      {{ userStateStore.get_email }}
    </section>

    <section v-if="(jobStateStore.get_most_recent_job?.job_description ?? '') !== ''">
      <div>
        <p>
          {{ jobStateStore.get_most_recent_job }}
        </p>
      </div>

      <div class="inline-flex mt-2 mb-4" role="group">
        <button
          @click="process_job(jobStateStore.get_most_recent_job)"
          type="button"
          class="px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Process
        </button>
      </div>
    </section>

    <section>
      <div v-for="job in fetch_jobs_response" class="mb-4">
        <!-- {{ job }} -->
        <div class="max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h5 class="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
            {{ job?.job_heading ?? '' }}
          </h5>

          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ truncateString(job?.job_description ?? '') }}
          </p>

          <button
            @click="goto_job(job)"
            class="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            view job
          </button>
        </div>
      </div>
    </section>
  </section>
</template>
