<template>
  <div>
    <nav class="flex justify-between px-10 py-3 bg-amber-100">
      <div @click="$router.push('/')">
        <h1 class="text-5xl font-bold text-red-800 cursor-pointer">Klobbi</h1>
      </div>
      <div class="text-2xl">Profile</div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
