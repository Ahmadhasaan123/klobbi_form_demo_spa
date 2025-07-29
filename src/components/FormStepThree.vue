<script>
import { useAuthStore } from "../store/auth.js";

export default {
  name: "FormStepThree",
  data() {
    return {
      store: useAuthStore(),
      checkbox: ["terms", "privacy"],
      success: false,
      error: {
        terms: "",
      },
    };
  },
  methods: {
    validateForm() {
      this.error.terms = "";
      if (this.checkbox.length < 2) {
        this.error.terms = "You must agree to both terms and privacy policy.";
        return false;
      }
      return true;
    },

    async register() {
      const store = useAuthStore();

      if (!this.validateForm()) return;

      const finalData = {
        ...store.stepOneData,
        ...store.stepTwoData,
        agreement: this.checkbox,
      };

      try {
        // const response = await fetch(
        //   "https://your-api-endpoint.com/register",
        //   {}
        // );

        this.success = true;
        alert("Registration successful!");
        console.log(finalData);
      } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred during registration.");
      }
    },
    previousStep() {
      this.store.previousStep();
    },
  },
};
</script>

<template>
  <form v-if="!success">
    <div class="flex justify-between items-center">
      <h1 class="text-5xl font-bold my-15 text-red-800">Step 3</h1>
      <button
        @click.prevent="previousStep()"
        class="bg-red-800 text-white py-2 px-5 rounded-4xl cursor-pointer"
      >
        Previous Step
      </button>
    </div>

    <div>
      <div class="mb-3 flex">
        <input
          type="checkbox"
          value="terms"
          name="terms"
          id="terms"
          class="m-3"
          v-model="checkbox"
        />
        <label for="terms" class="text-lg m-3">
          Accept Our Terms and Conditions
        </label>
      </div>
      <div class="mb-3 flex">
        <input
          type="checkbox"
          name="privacy"
          id="privacy"
          v-model="checkbox"
          value="privacy"
          class="m-3"
        />
        <label for="privacy" class="text-lg m-3">
          Agree to our Privacy Policy
        </label>
      </div>

      <p class="text-red-600 py-2">{{ error.terms }}</p>

      <div>
        <button
          @click.prevent="register"
          class="text-2xl text-white bg-red-800 py-3 px-5 my-2 rounded-4xl cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  </form>

  <div v-if="success" class="text-green-600 text-center text-4xl mt-4">
    Form submitted successfully!
  </div>
</template>
