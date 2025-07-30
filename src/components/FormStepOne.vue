<script>
import { onMounted } from "vue";
import { useAuthStore } from "../store/auth.js";
export default {
  name: "FormStepOne",
  data() {
    return {
      store: useAuthStore(),
      participants: {
        salutation: "",
        first_name: "",
        last_name: "",
        email: "",
        personal_email: "",
        phone: "",
      },
      error: {
        salutation: "",
        first_name: "",
        last_name: "",
        email: "",
        personal_email: "",
        phone: "",
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
    async nextStep() {
      try {
        const store = useAuthStore();
        store.setStepOneData(this.participants);
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
      <div>
        <div class="mb-3 flex flex-col">
          <label for="salutation" class="text-2xl">Salutation</label>
          <select
            name="salutation"
            id="salutation"
            class="border rounded-2xl p-3 mt-4 w-full"
            v-model="participants.salutation"
            @input="error.salutation = ''"
          >
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
          </select>
          <p class="text-red-600">{{ error.salutation }}</p>
        </div>

        <div class="mb-3">
          <label for="first_name" class="text-2xl">First Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            class="border rounded-2xl p-2 mt-4 w-full"
            v-model="participants.first_name"
            @input="error.first_name = ''"
          />
          <p class="text-red-600">{{ error.first_name }}</p>
        </div>
        <div class="mb-3">
          <label for="last_name" class="text-2xl">last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            class="border rounded-2xl p-2 mt-4 w-full"
            v-model="participants.last_name"
            @input="error.last_name = ''"
          />
          <p class="text-red-600">{{ error.last_name }}</p>
        </div>
        <div class="mb-3">
          <label for="email" class="text-2xl"> Email </label>
          <input
            type="email"
            name="email"
            id="email"
            class="border rounded-2xl p-2 mt-4 w-full"
            v-model="participants.email"
            @input="error.email = ''"
          />
          <p class="text-red-600">{{ error.email }}</p>
        </div>
        <div class="mb-3">
          <label for="personal_email" class="text-2xl"> Personal Email </label>
          <input
            type="email"
            name="personal_email"
            id="personal_email"
            class="border rounded-2xl p-2 mt-4 w-full"
            v-model="participants.personal_email"
            @input="error.personal_email = ''"
          />
          <p class="text-red-600">{{ error.personal_email }}</p>
        </div>
        <div class="mb-3">
          <label for="phone" class="text-2xl"> Phone Number </label>
          <input
            type="number"
            name="phone"
            id="phone"
            class="border rounded-2xl p-2 mt-4 w-full"
            v-model="participants.phone"
            @input="error.phone = ''"
          />
          <p class="text-red-600">{{ error.phone }}</p>
        </div>
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
