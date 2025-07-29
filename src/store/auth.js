// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    stepOneData: {
      name: "",
      email: "",
      password: "",
    },
    stepTwoData: {
      salutation: "",
      designation: "",
      organization: "",
    },
    generalSettings: {},
    currentStep: 1,
  }),
  actions: {
    setStepOneData(data) {
      this.stepOneData = { ...data };
      this.currentStep = 2;
    },
    setStepTwoData(data) {
      this.stepTwoData = { ...data };
      this.currentStep = 3;
    },
    previousStep() {
      this.currentStep -= 1;
    },
    setgeneralSettings(data) {
      this.generalSettings = { ...data };
    },
  },
});
