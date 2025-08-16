<template>
  <div
    class="flex justify-center items-center w-full h-screen duration-300 dark:bg-gray-900 bg-gray-200"
  >
    <div
      class="bg-gray-50 relative duration-300 dark:bg-gray-800 md:w-4xl md:max-w-5xl w-full shadow-sm rounded-lg p-3 md:p-6"
    >
      <!-- toggle dark mode -->
      <div class="group">
        <span
          class="absolute right-4 top-3 text-2xl cursor-pointer hover:bg-gray-700/25 rounded-full p-1 transition-colors duration-300 dark:hover:bg-yellow-100/20 dark:shadow-amber-900/50"
          @click="toggleDarkMode()"
        >
          &#9728;
        </span>
        <span
          class="absolute right-12 top-1 opacity-0 group-hover:opacity-100 transition dark:bg-gray-200 dark:text-black font-semibold bg-gray-800 text-white text-xs rounded py-1 px-2"
        >
          Toggle Theme
        </span>
      </div>
      <!-- title -->
      <h2
        class="fontFamily-bold font-bold text-gray-700 dark:text-gray-100 text-2xl mb-4 text-center"
      >
        Calculate your age
      </h2>
      <!-- form -->
      <form
        class="flex flex-col md:flex-row space-y-3 space-x-0 md:space-y-0 justify-center md:space-x-2"
      >
        <div class="flex justify-center items-center gap-2">
          <div>
            <label
              for="day"
              class="font-bold dark:text-gray-100 text-gray-700 text-sm mb-4 ml-1 text-center"
              >Day</label
            >
            <input
              type="text"
              id="day"
              maxlength="2"
              ref="dayInput"
              placeholder="dd"
              class="bg-gray-100 duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label
              for="month"
              class="font-bold dark:text-gray-100 text-gray-700 text-sm mb-4 ml-1 text-center"
              >Month</label
            >
            <input
              type="text"
              id="month"
              maxlength="2"
              ref="monthInput"
              placeholder="mm"
              class="bg-gray-100 duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label
              for="year"
              class="font-bold dark:text-gray-100 text-gray-700 text-sm mb-4 ml-1 text-center"
              >Year</label
            >
            <input
              type="text"
              id="year"
              ref="yearInput"
              placeholder="yyyy"
              class="bg-gray-100 duration-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
        </div>

        <div class="flex justify-center items-center md:mt-6">
          <button
            type="button"
            @click="handleCalculate"
            class="bg-white duration-300 rounded-lg p-2 w-full text-gray-700 font-bold cursor-pointer outline-none border border-gray-600 hover:bg-gray-800 hover:text-white dark:bg-gray-800 dark:text-white dark:hover:bg-white dark:hover:text-gray-800"
          >
            Calculate
          </button>
        </div>
      </form>
      <div class="flex justify-center items-center">
        <div class="bg-white border border-gray-700 rounded w-lg my-6">
          <div class="bg-gray-700 p-1 text-gray-100">
            <p class="font-bold text-2xl text-center">Your Age :</p>
          </div>

          <div class="text-center p-4 font-black">
            <p class="text-2xl">{{ result || "🤔 🤔 🤔" }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { resetInputValue, calculatorAge } from "@/Hooks/calculater";
const isDarkMode = ref(false);
const monthInput = ref(null);
const yearInput = ref(null);
const dayInput = ref(null);

const result = ref("");
function handleCalculate() {
  const year = yearInput.value.value;
  const month = monthInput.value.value;
  const day = dayInput.value.value;

  if (!year || !month || !day) {
    result.value = "Please enter a valid date.";
    return;
  }

  result.value = calculatorAge(year, month, day);

  yearInput.value.value = "";
  monthInput.value.value = "";
  dayInput.value.value = "";
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  const root = document.documentElement;
  if (isDarkMode.value === true) {
    root.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
}

onMounted(() => {
  resetInputValue(monthInput.value, 12, 1);
  resetInputValue(dayInput.value, 31, 1);
  resetInputValue(yearInput.value, 2050, 0);
  if (localStorage.getItem("darkMode") === "true") {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove("dark");
  }
});
</script>
