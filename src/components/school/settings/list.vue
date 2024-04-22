<template>
    <div class="flex flex-col gap-4">
        <div class="text-pro">settings</div>
        <div class="h-full space-y-4 overflow-y-auto gap-4">
            <!-- <input-app /> -->
            <router-link :to="`/school/${school.code}/settings/information`" class="flex-between bg-v py-2 px-4 rounded-v bg-v-hover smooth cursor-pointer">
                <div class="space-2">
                    <h3>information</h3>
                    <h6 class="text-micro text-gray-600 dark:text-gray-400 mx-4 truncate">
                        add, edit, remove, name, phone, email, location mannage school information
                    </h6>
                </div>
                <icon-app icon="ion:chevron-forward-outline" size="24" />
            </router-link>
            <router-link v-if="$store.getters.permission('settings:users:access')" :to="`/school/${school.code}/settings/users`" class="flex-between bg-v py-2 px-4 rounded-v bg-v-hover smooth cursor-pointer">
                <div class="space-2">
                    <h3>users</h3>
                    <h6 class="text-micro text-gray-600 dark:text-gray-400 mx-4 truncate">
                        add, remove, name, rules mannage school users
                    </h6>
                </div>
                <icon-app icon="ion:chevron-forward-outline" size="24" />
            </router-link>
        </div>
    </div>
</template>

<script setup>
const { school } = defineProps({
  school: Object
});
</script>