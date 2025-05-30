import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStateStore = defineStore('userState', () => {
  const loading_user_login_state = ref(true)
  const is_user_logged_in = ref(false)

  const email = ref('')
  const token = ref('')
  const expires_in = ref('')

  const get_loading_user_login_state = computed(() => loading_user_login_state.value)
  const get_is_user_logged_in = computed(() => is_user_logged_in.value)

  const get_token = computed(() => token.value)
  const get_email = computed(() => email.value)
  const get_expires_in = computed(() => expires_in.value)

  function reset() {
    email.value = ''
    token.value = ''
    expires_in.value = ''
  }

  function set_is_user_logged_in(status) {
    is_user_logged_in.value = status
  }

  function set_loading_user_login_state(state) {
    loading_user_login_state.value = state
  }

  function set_email(resolved_email) {
    if (!resolved_email) return
    email.value = resolved_email
  }
  function set_token(resolved_token) {
    if (!resolved_token) return
    token.value = resolved_token
  }
  function set_expires_in(resolved_expires_in) {
    if (!resolved_expires_in) return
    expires_in.value = resolved_expires_in
  }

  return {
    email,
    token,
    expires_in,
    get_token,
    get_email,
    get_expires_in,
    get_loading_user_login_state,
    get_is_user_logged_in,
    set_is_user_logged_in,
    set_loading_user_login_state,
    reset,
    set_email,
    set_token,
    set_expires_in
  }
})
