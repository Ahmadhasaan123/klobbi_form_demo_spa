<script>
import { useAuthStore } from "../store/auth.js";
import FormStepOne from "./FormStepOne.vue";
import FormStepTwo from "./FormStepTwo.vue";
import FormStepThree from "./FormStepThree.vue";

export default {
  name: "MultiForm",
  components: {
    FormStepOne,
    FormStepTwo,
    FormStepThree,
  },
  data() {
    return {
      store: useAuthStore(),
    };
  },
};
</script>

<template>
  <form>
    <div class="flex flex-col m-auto gap-4 w-[60vw] p-10 my-10">
      <FormStepOne v-if="store.currentStep === 1" />
      <FormStepTwo v-if="store.currentStep === 2" />
      <FormStepThree v-if="store.currentStep === 3" />
    </div>
  </form>
</template>
