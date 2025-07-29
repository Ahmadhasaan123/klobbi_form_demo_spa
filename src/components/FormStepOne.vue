<script>
import { onMounted } from "vue";
import { useAuthStore } from "../store/auth.js";
export default {
  name: "FormStepOne",
  data() {
    return {
      store: useAuthStore(),
      participants: {
        name: "",
        email: "",
        password: "",
      },
      error: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    if (this.store.stepOneData) {
      this.participants = { ...this.participants, ...this.store.stepOneData };
    }
  },
  methods: {
    clearErrors() {
      this.error.name = "";
      this.error.email = "";
      this.error.password = "";
    },
    validateForm() {
      let valid = true;
      if (!this.participants.name) {
        this.error.name = "Name is required";
        valid = false;
      }
      if (!this.participants.email) {
        this.error.email = "Email is required";
        valid = false;
      }
      if (!this.participants.password) {
        this.error.password = "Password is required";
        valid = false;
      }
      return valid;
    },
    async nextStep() {
      try {
        if (this.validateForm()) {
          const store = useAuthStore();
          store.setStepOneData(this.participants);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <form>
    <h1 class="text-5xl font-bold my-6 text-red-800">Step 1</h1>
    <div>
      <div class="mb-2">
        <label for="staff_Id" class="text-2xl">Name</label>
        <input
          type="text"
          name="staff_Id"
          id="staff_Id"
          class="border rounded-2xl p-2 mt-4 w-full"
          v-model="participants.name"
          @input="error.name = ''"
        />
        <p class="text-red-600 py-3">{{ error.name }}</p>
      </div>
      <div class="mb-2">
        <label for="email" class="text-2xl">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="border rounded-2xl p-2 mt-4 w-full"
          v-model="participants.email"
          @input="error.email = ''"
        />
        <p class="text-red-600 py-3">{{ error.email }}</p>
      </div>
      <div class="mb-2">
        <label for="password" class="text-2xl">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="border rounded-2xl p-2 mt-4 w-full"
          v-model="participants.password"
          @input="error.password = ''"
        />
        <p class="text-red-600 py-3">{{ error.password }}</p>
      </div>
      <div>
        <button
          @click.prevent="nextStep()"
          class="text-2xl mt-10 text-white bg-red-800 py-2 px-5 rounded-4xl cursor-pointer"
        >
          NEXT
        </button>
      </div>
    </div>
  </form>
</template>
