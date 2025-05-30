import { onMounted, onBeforeMount, ref, reactive } from 'vue'
import { useJobsStateStore } from '../stores/jobs_state'
import axios from 'axios'
import { ROOT_URL } from '../config/config'

export const useJobsStorageTracker = () => {
  const jobStateStore = useJobsStateStore()

  const init_tracker = () => {
    chrome.storage.local.onChanged.addListener((changes, namespace) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === 'most_recent_job') {
          console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
          )

          const job_id = newValue?.job_id ?? ''
          const job_url = newValue?.job_url ?? ''
          const job_heading = newValue?.job_heading ?? ''
          const job_description = newValue?.job_description ?? ''

          jobStateStore.set_most_recent_job({
            job_id,
            job_url,
            job_heading,
            job_description
          })
        }
      }
    })
  }

  const fetch_job_from_main_storage = async (user_token) => {
    const fetch_jobs_response = {
      error: false,
      status: null,
      response: null
    }
    console.log("''user_token''")
    console.log(user_token)
    try {
      const response = await axios.get(`${ROOT_URL}/jobs`, {
        headers: {
          Authorization: `Bearer ${user_token}`
        }
      })

      console.log(response.status)
      console.log(response.data)

      fetch_jobs_response.response = response.data.response
      return fetch_jobs_response
    } catch (err) {
      fetch_jobs_response.error = true
      if (axios.isAxiosError(err)) {
        if (err.response) {
          fetch_jobs_response.status = err.response.status
          // Handle HTTP errors
          if (err.response.status === 401) {
            console.log('Unauthorized: Invalid or expired token.')
          } else {
            console.log(`Error ${err.response.status}:`, err.response.data)
          }
        } else if (err.request) {
          // No response received from the server
          console.log('No response received:', err.request)
        } else {
          // Request setup error
          console.log('Request error:', err.message)
        }
      } else {
        // Non-Axios errors
        console.log('Unexpected error:', err)
      }

      return fetch_jobs_response
    }
  }

  const process_job = async (user_token, job) => {
    const process_job_response = {
      error: false,
      status: null,
      response: null
    }
    try {
      const job_id = job?.job_id ?? ''
      const job_url = job?.job_url ?? ''
      const job_heading = job?.job_heading ?? ''
      const job_description = job?.job_description ?? ''

      const response = await axios.post(
        `${ROOT_URL}/claude`,
        {
          job_id: job_id,
          job_url: job_url,
          job_heading: job_heading,
          job_description: job_description
        },
        {
          headers: {
            Authorization: `Bearer ${user_token}`
          }
        }
      )

      console.log(response.status)
      console.log(response.data)

      return process_job_response
    } catch (err) {
      process_job_response.error = true
      if (axios.isAxiosError(err)) {
        if (err.response) {
          process_job_response.status = err.response.status
          // Handle HTTP errors
          if (err.response.status === 401) {
            console.log('Unauthorized: Invalid or expired token.')
          } else {
            console.log(`Error ${err.response.status}:`, err.response.data)
          }
        } else if (err.request) {
          // No response received from the server
          console.log('No response received:', err.request)
        } else {
          // Request setup error
          console.log('Request error:', err.message)
        }
      } else {
        // Non-Axios errors
        console.log('Unexpected error:', err)
      }

      return process_job_response
    }
  }

  return {
    init_tracker,
    fetch_job_from_main_storage,
    process_job
  }
}
