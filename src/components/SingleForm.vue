<script>
import { Api } from "@/api/api";
import { useAuthStore } from "../store/auth";

export default {
  name: "SingleForm",
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
        designation: "",
        organisation: "",
        dietary_preference: "",
        about_event: "",
        about_event_other: "",
        terms_condition: "",
      },
      success: false,
      error: {
        salutation: "",
        first_name: "",
        last_name: "",
        email: "",
        personal_email: "",
        phone: "",
        designation: "",
        organisation: "",
        dietary_preference: "",
        about_event: "",
        about_event_other: "",
        terms_condition: "",
      },
    };
  },
  methods: {
    clearForm() {
      this.participants.salutation = "";
      this.participants.first_name = "";
      this.participants.last_name = "";
      this.participants.email = "";
      this.participants.personal_email = "";
      this.participants.phone = "";
      this.participants.designation = "";
      this.participants.organisation = "";
      this.participants.dietary_preference = "";
      this.participants.about_event = "";
      this.participants.about_event_other = "";
      this.participants.terms_condition = "";
    },
    clearErrors() {
      this.error.salutation = "";
      this.error.first_name = "";
      this.error.last_name = "";
      this.error.email = "";
      this.error.personal_email = "";
      this.error.phone = "";
      this.error.designation = "";
      this.error.organisation = "";
      this.error.dietary_preference = "";
      this.error.about_event = "";
      this.error.about_event_other = "";
      this.error.terms_condition = "";
    },
    async register() {
      try {
        const response = await Api.post("api/participants", this.participants);
        console.log(response);

        if (response.data.stripe_url) {
          console.log(response.data.stripe_url);
          window.location.href = response.data.stripe_url;
        } else {
          this.success = true;
        }
      } catch (error) {
        if (error?.response?.status !== 422) {
          console.log(error);
        } else {
          const errors = error.response.data.errors;
          const error_keys = Object.keys(errors);

          error_keys.forEach((key) => {
            error.value[key] = errors[key][0];
          });

          if (document.getElementsByName(error_keys[0])[0]) {
            document.getElementsByName(error_keys[0])[0].scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      }
    },
    addGuest() {
      this.participants.guests += 1;
    },
    removeGuest() {
      if (this.participants.guests > 0) {
        this.participants.guests -= 1;
      }
    },
    increase() {
      this.participants.adults += 1;
    },
    decrease() {
      if (this.participants.adults > 0) {
        this.participants.adults -= 1;
      }
    },
  },
};
</script>
<template>
  <form>
    <div v-if="success">
      <div>
        <p class="text-center text-5xl font-bold m-10 text-green-700">
          {{
            store.generalSettings.success_message || "Registration successful"
          }}
        </p>
      </div>
    </div>
    <div v-if="!success" class="flex flex-col m-auto gap-4 w-[57vw] p-7">
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

      <div class="flex justify-center">
        <button
          @click.prevent="register()"
          class="text-2xl text-white border border-black bg-yellow-500 my-5 px-8 py-2 rounded-2xl cursor-pointer"
        >
          SUBMIT
        </button>
      </div>

      <hr class="border-gray-700" />
      <div class="text-center">
        <p>
          For enquiries, please contact
          <span class="text-blue-400"><a href="#">demo@gmail.com</a></span>
        </p>
      </div>
    </div>
  </form>
</template>
