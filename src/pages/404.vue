<template>
  <div class="bg-White flex-center text-center">
    <div v-if="$route.query.access == 'rejected'">
      you don't have permission to <br> access this page.
    </div>
    <div v-else class="space-y-8">
      <h2>404 :(</h2>
      <h4>page requisted not found.</h4>
    </div>
  </div>
</template>