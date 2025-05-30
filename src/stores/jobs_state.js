import { reactive, ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useJobsStateStore = defineStore('jobState', () => {
  const most_recent_job = reactive({
    job_id: '',
    job_url: '',
    job_heading: '',
    job_description: ''
  })

  const active_job = reactive({
    job_id: '',
    inserted_at: '',
    updated_at: '',
    job_upwork_id: '',
    job_link: '',
    job_title: '',
    job_description: '',
    job_proposal_markdown: '',
    job_proposal_html: '',
    job_owner: ''
  })

  const active_job_view_toggle = ref(false)

  const get_most_recent_job = computed(() => {
    return most_recent_job
  })

  const get_active_job = computed(() => {
    return active_job
  })

  const get_active_job_view_toggle = computed(() => {
    return active_job_view_toggle
  })

  const set_active_job = (job) => {
    active_job.job_id = job.job_id
    active_job.inserted_at = job.inserted_at
    active_job.updated_at = job.updated_at
    active_job.job_upwork_id = job.job_upwork_id
    active_job.job_link = job.job_link
    active_job.job_title = job.job_title
    active_job.job_description = job.job_description
    active_job.job_proposal_markdown = job.job_proposal_markdown
    active_job.job_proposal_html = job.job_proposal_html
    active_job.job_owner = job.job_owner
  }

  const set_most_recent_job = (job) => {
    most_recent_job.job_id = job.job_id ?? ''
    most_recent_job.job_url = job.job_url ?? ''
    most_recent_job.job_heading = job.job_heading ?? ''
    most_recent_job.job_description = job.job_description ?? ''
  }

  const set_active_job_view_toggle = (status) => {
    active_job_view_toggle.value = status
  }

  return {
    get_most_recent_job,
    get_active_job,
    get_active_job_view_toggle,
    set_most_recent_job,
    set_active_job,
    set_active_job_view_toggle
  }
})
