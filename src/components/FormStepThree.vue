<script>
import { useAuthStore } from "../store/auth.js";

export default {
  name: "FormStepThree",
  data() {
    return {
      participants: {
        terms_condition: "",
      },
      store: useAuthStore(),
      success: false,
      error: {
        terms_condition: "",
      },
    };
  },
  methods: {
    async register() {
      const store = useAuthStore();

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
      <div class="mb-3">
        <label for="checkbox" class="text-2xl">Terms & Conditions</label>
        <div class="my-3 flex">
          <input
            type="checkbox"
            value="terms"
            name="terms"
            id="terms"
            class="m-3"
            v-model="participants.terms_condition"
          />
          <label for="terms" class="text-lg m-3">
            Accept Our Terms and Conditions
          </label>
        </div>
      </div>

      <p class="text-red-600 py-2">{{ error.terms_condition }}</p>

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
