<script setup lang="js">
import { ref } from 'vue';
import { useUserAuthTracker } from '../../composables/user_auth_tracker'

const user_auth_tracker = useUserAuthTracker()

const email = ref('')
const password = ref('')
const error_message = ref('')
const processing = ref(false)

const login_user = async () => {
  if(processing.value) return

  processing.value = true
  if (
    !email.value || !password.value
  ) {
    error_message.value = 'Please fill all the fields'
    processing.value = false
    return
  }

  console.log(email.value)
  console.log(password.value)

  await user_auth_tracker.login_user(email.value, password.value)
  processing.value = false
}
</script>

<template>
  <section>
    <div>
      <img alt="logo" class="logo" src="../../assets/logo.svg" width="125" height="125" />
    </div>

    <div>
      <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div v-if="error_message" class="my-4 flex items-center justify-center">
          <span class="text-red-700 font-semibold">{{ error_message }}</span>
        </div>

        <button
          :disabled="processing"
          @click.prevent="login_user"
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
