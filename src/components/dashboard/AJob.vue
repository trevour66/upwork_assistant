<script setup lang="js">
import { useUserStateStore } from '../../stores/user_state'
import { useJobsStorageTracker } from '../../composables/jobs_storage_tracker'
import { useJobsStateStore } from '../../stores/jobs_state'
import { onMounted, ref } from 'vue';
import Tiptap from '../Tiptap.vue';

const jobStateStore = useJobsStateStore()

const copy_proposal = () => {

}
</script>

<template>
  <section class="w-full h-full py-6 bg-white">
    <section class="">
      <div class="float-right">
        <button
          @click="jobStateStore.set_active_job_view_toggle(false)"
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2"
        >
          back
        </button>
      </div>
      <div class="clear-both"></div>
    </section>

    <!-- <section class="my-4">
      {{ jobStateStore.get_active_job?.job_title ?? '' }}
    </section> -->

    <section>
      <form>
        <div
          class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
        >
          <div class="p-4 bg-white rounded-t-lg dark:bg-gray-800 max-h-[350px] overflow-y-auto">
            <Tiptap v-model="jobStateStore.get_active_job.job_proposal_html" />
          </div>
          <div
            class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200"
          >
            <button
              @click.prevent="copy_proposal"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Copy Proposal
            </button>
            <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
              <button
                type="button"
                class="inline-flex justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path
                    d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
                  />
                </svg>
                <span class="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  </section>
</template>
