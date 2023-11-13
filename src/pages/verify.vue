<template>
  <div style="height: fit-content !important;" class="bg-white w-full sm:w-6/12 md:w-6/12 lg:w-4/12 flex flex-col items-center text-center gap-4 p-4 rounded-v m-auto mt-0">
    <h3 v-if="OTPfor == 'login' || OTPfor == 'signup'">Verify your Email</h3>
    <h3 v-else>Forget Password</h3>
    <h5 v-if="OTPfor == 'login' || OTPfor == 'signup'" class="w-10/12">
      {{ `We sent a message contain an OTP code to your email${user.email ? ` (${user.email})` : ''}, please cheque your inbox` }}
    </h5>
    <h5 v-else class="w-10/12">
      We have to sent a message contain an OTP code to your email, so first enter your account email
    </h5>
    <form @submit.prevent="submitForm" class="w-full grid gap-4 text-left">
      <input-app v-if="OTPfor == 'forget-password'" :value="user.email" @update="user.email = $event" label="email"
        type="email" icon="fluent:person-mail-24-filled" placeholder="user@mail.com" :readonly="loading" />
      <input-app v-if="OTPfor == 'forget-password'" :value="user.password" @update="user.password = $event"
        label="new password" type="password" icon="fluent:shield-person-20-filled" placeholder="password123"
        :readonly="loading" />
      <input-app :value="user.OTP" @update="user.OTP = $event" label="OTP" icon="teenyicons:otp-solid" type="number" placeholder="196785" center minlength="6"
        maxlength="6" :readonly="loading" />
      <h6 :class="{ 'text-red-500': !loading && resError }">{{ (!loading && resError) || "OTP is a code contain 6 numbers."}}</h6>
      <btn-app text="verify" @click="verify" icon="fluent:checkmark-12-filled" dark class="mt-4 mx-auto"
        :loading="loading" />
    </form>
    <h5 class="w-10/12 my-4 text-gray-600">
        if you don't receive an OTP, try to 
        <a @click="!loading && sendAgain()" class="link font-semibold">send again</a>, 
        check your email spam page or try again later
    </h5>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { api } from '@/plugins/axios.js';

const store = useStore();
const router = useRouter();
const route = useRoute();

const OTPfor = ref(route.query.OTP);
const loading = ref(false);

const user = ref({
  email: store.state.OTP?.email || null,
  password: store.state.OTP?.password || null,
  OTP: null,
});

const resError = ref(null);

const sendAgain = async () => {
  resError.value = false;
  try {
    if (user.value.email && user.value.password) {
      loading.value = true;
      await api.post("/api/OTP/send", user.value);
      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
}

const verify = async () => {
  try {
    loading.value = true;
    const result = await api.post(`/api/OTP/verify/${OTPfor.value}`, user.value);
    store.commit("user", result.data);
    router.push('/account');
  } catch (error) {
    loading.value = false;
    console.log(error);
    console.log(error?.response?.data);
    resError.value = error?.response?.data?.value;
  }
};
</script>
