<script>
import SingleForm from "../components/SingleForm.vue";
import MultiForm from "../components/MultiForm.vue";
import { Api } from "@/api/api";
export default {
  data() {
    return {
      participants: {
        en_name: "",
        last_name: "",
        salutation: "",
        designation: "",
        organization: "",
      },
      formType: "null",
      registration: "null",
      banner: "",
      refreshCount: 0,
    };
  },
  components: {
    SingleForm,
    MultiForm,
  },
  async mounted() {
    try {
      const response = await Api.get("api/get_settings");

      const data = JSON.parse(response.data.data.fields);

      console.log(response.data.data.fields);

      if (response.data.data.banner) {
        this.banner = response.data.data.banner;
      }

      if (data["registration"] === true) {
        this.registration = true;
      } else {
        this.registration = false;
      }

      if (data["formType"] === "vertical") {
        this.formType = "vertical";
      } else {
        this.formType = "step";
      }
    } catch (error) {
      console.error("Error fetching form type:", error);
      this.formType = "verticle";
    }
  },
  beforeUnmount() {
    // Unsubscribe from the channel
    window.Echo.leave("setting-update");
    window.Echo.leave("refresh-channel");
  },
  methods: {
    async register() {
      console.log(this.participants);
    },
  },
};
</script>

<template>
  <div class="70vw m-auto">
    <div class="m-auto w-[55vw]">
      <img :src="banner" />
    </div>

    <div>
      <h1 class="text-center text-5xl font-bold m-10 text-red-800">
        Registration Form
      </h1>
      <p class="text-center text-6xl font-medium m-1 text-red-800">
        All Fields are mandatory
      </p>
    </div>

    <div v-if="formType === null">
      <p class="text-center text-lg">Loading form...</p>
    </div>

    <div v-if="registration">
      <SingleForm v-if="formType === 'vertical'" />
      <MultiForm v-if="formType === 'step'" />
    </div>

    <div v-else>
      <p class="text-center text-5xl m-20">Registration is closed.</p>
    </div>
  </div>
</template>
