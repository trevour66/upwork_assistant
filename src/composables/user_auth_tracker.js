import { onBeforeMount, onMounted, ref } from 'vue'
import { useUserStateStore } from '../stores/user_state'
import axios from 'axios'
import { ROOT_URL } from '../config/config'

export const useUserAuthTracker = () => {
  const userStateStore = useUserStateStore()

  const resolve_user_session = async () => {
    userStateStore.reset()
    const user_auth = await chrome.storage.local.get('upwork_assistant__user_auth')

    // console.log(user_auth.upwork_assistant__user_auth)

    const upwork_assistant__user_auth = user_auth?.upwork_assistant__user_auth ?? false

    if (!upwork_assistant__user_auth) {
      // console.log('user not loaded in')
      userStateStore.set_is_user_logged_in(false)
      userStateStore.set_loading_user_login_state(false)
      return
    }

    const email = upwork_assistant__user_auth?.email ?? false
    const token = upwork_assistant__user_auth?.token ?? false
    const expires_in = upwork_assistant__user_auth?.expires_in ?? false

    if (!email || !token || !expires_in) {
      userStateStore.set_is_user_logged_in(false)
      userStateStore.set_loading_user_login_state(false)

      return
    }

    userStateStore.set_email(email)
    userStateStore.set_token(token)
    userStateStore.set_expires_in(expires_in)

    userStateStore.set_is_user_logged_in(true)
    userStateStore.set_loading_user_login_state(false)
  }

  const login_user = async (entered_email, entered_password) => {
    try {
      const response = await axios.post(`${ROOT_URL}/auth/login`, {
        email: entered_email,
        password: entered_password
      })

      /**
       * {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…0MjF9.oJpfGc2SvbCDWrwnlTGcvmboLv-_V78ROXBgu6HilIg', email: 'peteriniubong@gmail.com', expires_in: '2025-03-22T09:37:01.322Z'}
       */
      console.log(response.data)

      const email = response?.data?.email ?? false
      const token = response?.data?.token ?? false
      const expires_in = response?.data?.expires_in ?? false

      if (!email || !token || !expires_in) {
        throw new Error('Error logging in. Please try again')
      }

      userStateStore.set_email(email)
      userStateStore.set_token(token)
      userStateStore.set_expires_in(expires_in)

      await chrome.storage.local.set({
        upwork_assistant__user_auth: {
          email,
          token,
          expires_in
        }
      })

      userStateStore.set_is_user_logged_in(true)
    } catch (err) {
      console.log(err.message)
      userStateStore.set_is_user_logged_in(false)
    }
  }

  const logout_user = () => {
    userStateStore.set_is_user_logged_in(false)
  }

  return {
    resolve_user_session,
    login_user,
    logout_user
  }
}
