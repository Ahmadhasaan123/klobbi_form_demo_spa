<script>
import { onMounted } from "vue";
import { useAuthStore } from "../store/auth.js";
export default {
  name: "FormStepTwo",
  data() {
    return {
      store: useAuthStore(),
      participants: {
        salutation: "",
        designation: "",
        organization: "",
      },
      error: {
        salutation: "",
        designation: "",
        organization: "",
      },
    };
  },
  mounted() {
    if (this.store.stepTwoData) {
      this.participants = { ...this.participants, ...this.store.stepTwoData };
    }
  },
  methods: {
    validateForm() {
      let valid = true;
      if (!this.participants.organization) {
        this.error.organization = "Organization is required";
        valid = false;
      }
      if (!this.participants.designation) {
        this.error.designation = "Designation is required";
        valid = false;
      }
      if (!this.participants.salutation) {
        this.error.salutation = "Salutation is required";
        valid = false;
      }
      return valid;
    },
    async secondStep() {
      try {
        if (this.validateForm()) {
          this.store.setStepTwoData(this.participants);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async previousStep() {
      this.store.previousStep();
    },
  },
};
</script>
<template>
  <form>
    <div class="flex justify-between items-center">
      <h1 class="text-5xl font-bold my-15 text-red-800">Step 2</h1>
      <button
        @click.prevent="previousStep()"
        class="bg-red-800 text-white py-2 px-5 rounded-4xl cursor-pointer"
      >
        Previous Step
      </button>
    </div>

    <div>
      <div class="mb-7 flex flex-col">
        <label for="salutation" class="text-2xl">Marital Status</label>
        <select
          name="salutation"
          id="salutation"
          class="border rounded-2xl p-3 mt-4 w-full"
          v-model="participants.salutation"
          @input="error.salutation = ''"
        >
          <option value="married">Married</option>
          <option value="unmarried">Unmarried</option>
        </select>
      </div>
      <p class="text-red-600">{{ error.salutation }}</p>
      <div class="mb-7 flex flex-col">
        <label for="designation" class="text-2xl">Designation</label>
        <select
          name="designation"
          id="designation"
          class="border rounded-2xl p-3 mt-4 w-full"
          v-model="participants.designation"
          @input="error.designation = ''"
        >
          <option value="speaker">Speaker</option>
          <option value="auther">Auther</option>
        </select>
      </div>
      <p class="text-red-600">{{ error.designation }}</p>

      <div class="mb-5 flex flex-col">
        <label for="organization" class="text-2xl">Organization</label>
        <input
          type="text"
          name="organization"
          id="organization"
          class="border rounded-2xl p-2 mt-4 w-full"
          v-model="participants.organization"
          @input="error.organization = ''"
        />
        <p class="text-red-600 py-3">{{ error.organization }}</p>
      </div>
      <div>
        <button
          @click.prevent="secondStep()"
          class="text-2xl text-white bg-red-800 py-2 px-5 rounded-4xl cursor-pointer"
        >
          NEXT
        </button>
      </div>
    </div>
  </form>
</template>
