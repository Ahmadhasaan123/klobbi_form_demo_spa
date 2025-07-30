<script>
import { onMounted } from "vue";
import { useAuthStore } from "../store/auth.js";
export default {
  name: "FormStepTwo",
  data() {
    return {
      store: useAuthStore(),
      participants: {
        designation: "",
        organisation: "",
        dietary_preference: "",
        about_event: "",
        about_event_other: "",
      },
      error: {
        designation: "",
        organisation: "",
        dietary_preference: "",
        about_event: "",
        about_event_other: "",
      },
    };
  },
  mounted() {
    if (this.store.stepTwoData) {
      this.participants = { ...this.participants, ...this.store.stepTwoData };
    }
  },
  methods: {
    async secondStep() {
      try {
        this.store.setStepTwoData(this.participants);
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

    <div class="mb-3 flex flex-col">
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
      <p class="text-red-600">{{ error.designation }}</p>
    </div>

    <div class="mb-[-12px] flex flex-col">
      <label for="organisation" class="text-2xl">Organisation</label>
      <input
        type="text"
        name="organisation"
        id="organisation"
        class="border rounded-2xl p-2 mt-4 w-full"
        v-model="participants.organisation"
        @input="error.organisation = ''"
      />
      <p class="text-red-600 py-3">{{ error.organisation }}</p>
    </div>

    <div class="mb-3 flex flex-col">
      <label for="dietary_preference" class="text-2xl"
        >Dietary Preference</label
      >
      <select
        name="dietary_preference"
        id="dietary_preference"
        class="border rounded-2xl p-3 mt-4 w-full"
        v-model="participants.dietary_preference"
        @input="error.dietary_preference = ''"
      >
        <option value="Vegetarian">Vegetarian</option>
        <option value="non_vegetarian">Non Vegetarian</option>
      </select>
      <p class="text-red-600">{{ error.dietary_preference }}</p>
    </div>

    <div class="mb-3 flex flex-col">
      <label for="about_event" class="text-2xl"
        >How did you know about this event</label
      >
      <select
        name="about_event"
        id="about_event"
        class="border rounded-2xl p-3 mt-4 w-full"
        v-model="participants.about_event"
        @input="error.about_event = ''"
      >
        <option value="social_media">Social Media</option>
        <option value="television">Television</option>
        <option value="others">Others</option>
      </select>
      <input
        name="about_event_other"
        id="about_event_other"
        v-model="participants.about_event_other"
        v-if="participants.about_event === 'others'"
        class="border rounded-2xl p-3 mt-4 w-full"
        type="text"
      />
      <p class="text-red-600">{{ error.about_event }}</p>
    </div>
    <div>
      <button
        @click.prevent="secondStep()"
        class="text-2xl text-white bg-red-800 py-2 px-5 rounded-4xl cursor-pointer"
      >
        NEXT
      </button>
    </div>
  </form>
</template>
