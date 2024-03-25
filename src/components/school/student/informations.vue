<template>
    <div dir="auto" class="bg-White rounded-v flex-1 flex flex-col gap-4 p-4"> 
        <div class="min-h-[24px] flex-between">
            <h4 class="font-medium">informations <a v-if="getting && student.uid" class="animate-pulse">...</a></h4>
            <icon-app v-if="!data.student.isNew" @click="comp = !comp" :icon="comp ? 'fluent:caret-up-16-filled' : 'fluent:caret-down-16-filled'" class="block sm:hidden cursor-pointer" />
            <icon-app @click="emits('zoom')" :icon="!data.zoom ? 'ic:round-zoom-out-map' : 'ic:round-zoom-in-map'" class="hidden sm:block cursor-pointer" />
        </div>
        <h6 v-if="!data.student.isNew && getting && !student.uid" class="h-full flex-center pb-2">LOADING...</h6>
        <div v-else class="sm:block h-full overflow-y-auto" :class="{ 'hidden': !comp, 'block': comp }">
            <form @submit.prevent="submitForm" class="grid sm:grid-cols-2 gap-4" autocomplete="no">
                <div class="space-y-2">
                    <input-app :readonly="data.student.isNew ? false : !edit" required autocomplete="no" :value="student.name" @update="student.name = $event" label="full name" icon="fluent:person-24-filled" placeholder="Laziri Umar" />
                </div>
                <div class="space-y-2">
                    <input-app :readonly="data.student.isNew ? false : !edit" required autocomplete="no" :value="data.student.isNew ? student.birthday : $toDate(student.birthday)" @update="student.birthday = $event" label="birthday" icon="fluent:calendar-24-filled" type="date" />
                </div>
                <div class="space-y-2">
                    <input-app :readonly="data.student.isNew ? false : !edit" autocomplete="no" :value="student.email" @update="student.email = $event" label="email" icon="fluent:mail-24-filled" type="email" placeholder="laziriamar@example.com" />
                </div>
                <div class="space-y-2">
                    <input-app :readonly="data.student.isNew ? false : !edit" autocomplete="no" :value="student.phone" @update="student.phone = $event" label="phone" icon="fluent:call-24-filled" type="tel" placeholder="0698467691" />
                </div>
                <h6 v-if="student.created_at" class="col-span-2 text-center mt-2 first-letter:lowercase">created at {{ $toDate(student.created_at, 'timestamp') }}</h6>
                <button @click="!edit && data.student.isNew ? create(student) : update(student)" class="hidden" />
            </form>
        </div>
        <div v-if="data.student.isNew || (edit && student.uid)" class="gap-4 min-h-[36px]" :class="{ 'hidden': !comp, 'flex': comp, 'justify-end': data.student.isNew, 'justify-between items-end': !data.student.isNew }">
            <h6 v-if="!data.student.isNew" @click="edit = false" class="cursor-pointer">cancel edit</h6>
            <btn-app @click="data.student.isNew ? create(student) : update(student)" :text="data.student.isNew ? 'create' : 'save'" dark :loading="loading" icon="fluent:add-12-filled" />
        </div>
        <h6 v-if="comp && !getting && !edit && !data.student.isNew" @click="edit = true" class="w-full min-h-[16px] text-center cursor-pointer">edit</h6>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from '@/plugins/axios.js';
import { useRouter, useRoute } from 'vue-router';
import { validated } from '@/utilities/validator';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const { data } = defineProps(["data"]);
const emits = defineEmits(["zoom"]);

const edit = ref(false);
const comp = ref(true);
const getting = ref(false);
const loading = ref(false);

const student = ref({
    school: data.school.code,
    name: null,
    birthday: null,
    email: null,
    phone: null,
});
store.state.students.flat().find((e) => e.uid == data.student.uid ? student.value = e : false );

onMounted(async () => {
    if (!data.student.isNew) {
        getting.value = true;
        const result = await api.get("/api/students/get/" + data.student.uid);
        student.value = result.data;
        store.commit("set", {key: "student", value: result.data});
        store.commit("add", {key: "students", value: result.data});
        getting.value = false;
    } else {
        student.value.name = route.query.name;
        student.value.birthday = route.query.birthday;
        student.value.email = route.query.email;
        student.value.phone = route.query.phone;
    }
});

const create = async (e) => {
    if (validated({arr: [e.school, e.name, e.birthday]}) && window.confirm("Do you want to create a new student")) {
        try {
            loading.value = true;
            const result = await api.post("/api/students/create", e);
            student.value = result.data;
            store.commit("add", {key: "students", value: result.data});
            router.push(`/school/${data.school.code}/students/${result.data.uid}`);
            loading.value = false;
            edit.value = false;
        } catch (error) {
            console.log(error.message);
        }
    }
};

const update = async (e) => {
    if (e.school && e.name && e.birthday && window.confirm("Do you want to update current student")) {
        loading.value = true;
        const result = await api.post("/api/students/update", e);
        // result.data.birthday = toDate(result.data.birthday);
        student.value = result.data;
        store.commit("add", {key: "students", value: result.data});
        loading.value = false;
        edit.value = false;
    };
};
</script>