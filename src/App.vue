<script setup>
import { onMounted, onBeforeMount, ref } from 'vue'
import full_pageLoader from './components/loader/full_page.loader.vue'
import login from './components/auth/login.vue'
import { useUserAuthTracker } from './composables/user_auth_tracker'
import { useJobsStorageTracker } from './composables/jobs_storage_tracker'
import Dashboard from './components/dashboard/dashboard.vue'
import { useUserStateStore } from './stores/user_state'

const user_auth_tracker = useUserAuthTracker()
const jobs_storage_tracker = useJobsStorageTracker()
const userStateStore = useUserStateStore()

const force_reauthentication = () => {
  user_auth_tracker.logout_user()
}

onMounted(async () => {
  await user_auth_tracker.resolve_user_session()
})

onBeforeMount(() => {
  jobs_storage_tracker.init_tracker()
})
</script>

<template>
  <main class="max-h-[100vh] h-[100vh] w-[100vw] flex items-center justify-center px-2">
    <!-- {{ user_auth_tracker }} -->
    <template v-if="userStateStore.get_loading_user_login_state">
      <full_pageLoader message="loading login state" class="w-full" />
    </template>
    <template v-else>
      <template v-if="userStateStore.get_is_user_logged_in">
        <Dashboard @force_reauthentication="force_reauthentication()" />
      </template>
      <template v-else>
        <login class="w-full" />
      </template>
    </template>
  </main>
</template>
