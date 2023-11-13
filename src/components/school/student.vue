<template>
  <div v-bind="$attrs" class="hidden" />
  <div class="w-full h-fit sm:h-auto sm:flex sm:flex-col space-y-4 overflow-y-auto">
    <div v-if="[false, 'information', 'courses'].includes(zoom)" class="w-full sm:flex sm:gap-4 space-y-4 sm:space-y-0" :class="{ 'h-full': zoom, 'sm:h-1/2': !zoom}">
      <div v-if="[false, 'information'].includes(zoom)" class="bg-white rounded-v flex-1 flex flex-col gap-4 p-4"> 
        <div class="min-h-[24px] flex-between">
          <h4>information</h4>
          <icon-app @click="comp.information = !comp.information" :icon="comp.information ? 'fluent:caret-up-16-filled' : 'fluent:caret-down-16-filled'" class="block sm:hidden cursor-pointer" />
          <icon-app @click="zoom = (zoom == 'information' ? false : 'information')" :icon="!zoom ? 'ic:round-zoom-out-map' : 'ic:round-zoom-in-map'" class="hidden sm:block cursor-pointer" />
        </div>
        <div class="sm:block h-full overflow-y-auto" :class="{ 'hidden': !comp.information, 'block': comp.information }">
          <div class="grid sm:grid-cols-2 gap-4">
            <div class="space-y-2">
              <input-app value="" label="full name" icon="fluent:person-24-filled" placeholder="Laziri Umar" />
            </div>
            <div class="space-y-2">
              <input-app value="" label="birthday" icon="fluent:calendar-24-filled" type="date" />
            </div>
            <div class="space-y-2">
              <input-app value="" label="email" icon="fluent:mail-24-filled" type="email" placeholder="laziriamar@example.com" />
            </div>
            <div class="space-y-2">
              <input-app value="" label="phone" icon="fluent:call-24-filled" type="tel" placeholder="0698467691" />
            </div>
          </div>
        </div>
        <div class="sm:flex-between gap-4 min-h-[36px]" :class="{ 'hidden': !comp.information, 'flex': comp.information }">
          <btn-app @click="" text="delete student" icon="fluent:delete-24-filled" bg="white" />
          <btn-app @click="" text="save" dark :loading="loading.information" icon="fluent:add-12-filled" />
        </div>
      </div>
      <div v-if="[false, 'courses'].includes(zoom)" class="bg-white rounded-v flex-1 flex flex-col gap-4 p-4">
        <div class="min-h-[24px] flex-between">
          <h4>courses</h4>
          <icon-app @click="comp.courses = !comp.courses" :icon="comp.courses ? 'fluent:caret-up-16-filled' : 'fluent:caret-down-16-filled'" class="block sm:hidden cursor-pointer" />
          <icon-app @click="zoom = (zoom == 'courses' ? false : 'courses')" :icon="!zoom ? 'ic:round-zoom-out-map' : 'ic:round-zoom-in-map'" class="hidden sm:block cursor-pointer" />
        </div>
        <div class="min-h-[36px] gap-2" :class="{ 'hidden sm:flex-between': !comp.courses, 'flex-between': comp.courses }">
          <input-app value="" type="search" placeholder="courses" />
          <div class="flex-center min-w-fit h-[36px] bg-v rounded-v p-2 cursor-pointer">
            <div @click="coursesQueryColor = changeColor(coursesQueryColor)" class="min-w-[1rem] h-4 rounded-full" :style="`background: ${coursesQueryColor};`"></div>
          </div>
        </div>
        <div class="h-full space-y-4" :class="{ 'hidden sm:block': !comp.courses }">
          <div class="sm:h-full space-y-4 overflow-y-auto" :class="{ 'max-h-[250px]': !zoom }">
            <h5 v-for="(item, index) in courses" :key="index" @click="selectedCourse = (selectedCourse == index ? null : index)" class="flex-between gap-2 sm:gap-4 rounded-v p-2 smooth cursor-pointer" :class="{ 'bg-dark': selectedCourse == index, 'bg-v': selectedCourse != index }">
              <div class="truncate">{{ item.course }}</div>
              <div class="min-w-[1rem] h-4 rounded-full" :style="`background: ${item.linked ? '#0B6E4F' : '#FA9F42' };`"></div>
            </h5>
          </div>
        </div>
        <div class="sm:flex gap-4 min-h-[36px]" :class="{ 'hidden': !comp.courses, 'flex': comp.courses }">
          <div class="w-full flex-between gap-4">
            <div class="w-1/3">
              <input-app value="" type="number" placeholder="4 x " center />
            </div>
            <div class="w-2/3">
              <input-app value="" icon="material-symbols:attach-money-rounded" type="number" placeholder="4000.00 DZD" center />
            </div>
          </div>
          <btn-app class="min-w-fit" @click="" text="save" dark :loading="loading.courses" icon="fluent:add-12-filled" />
        </div>
      </div>
    </div>
    <div v-if="[false, 'payment', 'attendance'].includes(zoom)" class="w-full sm:flex sm:gap-4 space-y-4 sm:space-y-0" :class="{ 'h-full': zoom, 'sm:h-1/2': !zoom}">
      <div v-if="[false, 'payment'].includes(zoom)" class="bg-white rounded-v flex-1 flex flex-col gap-4 p-4">
        <div class="min-h-[24px] flex-between">
          <h4>payment</h4>
          <icon-app @click="comp.payment = !comp.payment" :icon="loading.payment ? 'svg-spinners:ring-resize' : (comp.payment ? 'fluent:caret-up-16-filled' : 'fluent:caret-down-16-filled')" class="block sm:hidden cursor-pointer" />
          <icon-app @click="zoom = (zoom == 'payment' ? false : 'payment')" :icon="loading.payment ? 'svg-spinners:ring-resize' : (!zoom ? 'ic:round-zoom-out-map' : 'ic:round-zoom-in-map')" class="hidden sm:block cursor-pointer" />
        </div>
        <div class="min-h-[36px] gap-2" :class="{ 'hidden sm:flex-between': !comp.payment, 'flex-between': comp.payment }">
          <div class="w-full grid grid-cols-10 gap-2">
            <input-app value="" type="number" placeholder="quantity" class="col-span-1" center style="padding: 0 .25rem !important;" />
            <input-app value="" type="search" placeholder="courses" class="col-span-5" />
            <input-app value="" type="date" class="col-span-2" center />
            <input-app value="" type="number" placeholder="amount" class="col-span-2" center />
          </div>
          <div class="flex-center min-w-fit h-[36px] bg-v rounded-v p-2 cursor-pointer">
            <div @click="paymentsQueryColor = changeColor(paymentsQueryColor)" class="min-w-[1rem] h-4 rounded-full" :style="`background: ${paymentsQueryColor};`"></div>
          </div>
        </div>
        <div class="h-full space-y-4" :class="{ 'hidden sm:block': !comp.payment }">
          <div class="sm:h-full space-y-4 overflow-y-auto" :class="{ 'max-h-[250px]': !zoom }">
            <h5 v-for="(item, index) in payments" :key="index" class="flex-between gap-2 sm:gap-4 bg-v rounded-v p-2">
              <div class="w-full grid grid-cols-10 gap-2">
                <div class="text-center truncate col-span-1">{{ item.quantity }} x </div>
                <div class="truncate col-span-5">{{ item.purpose }}</div>
                <div class="truncate text-center col-span-2">{{ item.date }}</div>
                <div class="truncate text-center col-span-2">{{ item.amount }}</div>
              </div>
              <div class="min-w-[1rem] h-4 rounded-full" :style="`background: ${item.status == 'active' ? '#0B6E4F' : '#FA9F42' };`"></div>
            </h5>
          </div>
        </div>
      </div>
      <div v-if="[false, 'attendance'].includes(zoom)" class="bg-white rounded-v flex-1 flex flex-col gap-4 p-4">
        <div class="min-h-[24px] flex-between">
          <h4>attendance</h4>
          <icon-app @click="comp.attendance = !comp.attendance" :icon="loading.attendance ? 'svg-spinners:ring-resize' : (comp.attendance ? 'fluent:caret-up-16-filled' : 'fluent:caret-down-16-filled')" class="block sm:hidden cursor-pointer" />
          <icon-app @click="zoom = (zoom == 'attendance' ? false : 'attendance')" :icon="loading.attendance ? 'svg-spinners:ring-resize' : (!zoom ? 'ic:round-zoom-out-map' : 'ic:round-zoom-in-map')" class="hidden sm:block cursor-pointer" />
        </div>
        <div class="min-h-[36px] gap-2" :class="{ 'hidden sm:flex-between': !comp.attendance, 'flex-between': comp.attendance }">
          <div class="w-full grid grid-cols-6 gap-2">
            <input-app value="" type="search" placeholder="courses" class="col-span-4" />
            <input-app value="" type="date" class="col-span-2" center />
          </div>
          <div class="flex-center min-w-fit h-[36px] bg-v rounded-v p-2 cursor-pointer">
            <div @click="attendanceQueryColor = changeColor(attendanceQueryColor)" class="min-w-[1rem] h-4 rounded-full" :style="`background: ${attendanceQueryColor};`"></div>
          </div>
        </div>
        <div class="h-full space-y-4" :class="{ 'hidden sm:block': !comp.attendance }">
          <div class="sm:h-full space-y-4 overflow-y-auto" :class="{ 'max-h-[250px]': !zoom }">
            <h5 v-for="(item, index) in attendance" :key="index" class="flex-between gap-2 sm:gap-4 bg-v rounded-v p-2">
              <div class="w-full grid grid-cols-6 gap-2">
                <div class="truncate col-span-4">{{ item.course }}</div>
                <div class="truncate text-center col-span-2">{{ item.date }}</div>
              </div>
              <div class="min-w-[1rem] h-4 rounded-full" :style="`background: ${item.status == 'present' ? '#0B6E4F' : '#FA9F42' };`"></div>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const comp = ref({
  information: true,
  courses: false,
  payment: false,
  attendance: false,
});

const loading = ref({
  information: false,
  courses: false,
  payment: false,
  attendance: false,
});

const courses = ref([
  {
    course: 'Math of the 4th year of primary school',
    linked: true
  },
  {
    course: 'Science of the 5th year of primary school',
    linked: false
  },
  {
    course: 'English of the 6th year of primary school',
    linked: true
  },
  {
    course: 'History of the 7th year of primary school',
    linked: false
  },
  {
    course: 'Geography of the 8th year of primary school',
    linked: true
  },
  {
    course: 'Math of the 9th year of primary school',
    linked: false
  },
  {
    course: 'Biology of the 10th year of primary school',
    linked: true
  },
  {
    course: 'Chemistry of the 11th year of primary school',
    linked: false
  },
  {
    course: 'Physics of the 12th year of primary school',
    linked: true
  },
  {
    course: 'Art of the 13th year of primary school',
    linked: false
  }
]);

const payments = ref([
  {
    amount: '4000',
    date: '10-11-2023',
    from: 'c041fc4b-b760-4ca9-83b5-218560a6cae8',
    to: 'gr7-10a-8wl',
    quantity: 4,
    purpose: 'Math of the 4th year of primary school',
    status: 'active'
  },
  {
    amount: '3500',
    date: '11-11-2023',
    from: 'd84ce632-2f14-48e5-9f65-f4c18b5506bc',
    to: 'xg9-11b-9or',
    quantity: 2,
    purpose: 'Science of the 5th year of primary school',
    status: 'canceled'
  },
  {
    amount: '2000',
    date: '12-11-2023',
    from: 'a7e1c6c8-9e07-4eb2-82ef-9c8b3dbcc03d',
    to: 'k21-15c-4lp',
    quantity: 1,
    purpose: 'English of the 6th year of primary school',
    status: 'active'
  },
  {
    amount: '6000',
    date: '13-11-2023',
    from: 'f823f6c7-8a3e-4e4f-baa4-2c5b3f1ec92f',
    to: 'mp5-20d-6wn',
    quantity: 3,
    purpose: 'History of the 7th year of primary school',
    status: 'canceled'
  },
  {
    amount: '4500',
    date: '14-11-2023',
    from: '9d6716ef-ef1e-4ad0-8a38-baf57e3e8719',
    to: 'qo1-25e-2ir',
    quantity: 5,
    purpose: 'Geography of the 8th year of primary school',
    status: 'active'
  },
  {
    amount: '3000',
    date: '15-11-2023',
    from: '32efde3d-d23c-42c5-b73d-6e1a3c53c8c9',
    to: 'tr3-30f-7eu',
    quantity: 2,
    purpose: 'Math of the 9th year of primary school',
    status: 'canceled'
  },
  {
    amount: '8000',
    date: '16-11-2023',
    from: 'b972b25e-865b-487d-9d02-60a998bf46fb',
    to: 'sf8-35g-5lx',
    quantity: 1,
    purpose: 'Biology of the 10th year of primary school',
    status: 'active'
  },
  {
    amount: '7000',
    date: '17-11-2023',
    from: 'fe8b6a36-4e0a-49c3-95ea-0e20f5e6cb09',
    to: 'lg5-40h-3kp',
    quantity: 3,
    purpose: 'Chemistry of the 11th year of primary school',
    status: 'canceled'
  },
  {
    amount: '5500',
    date: '18-11-2023',
    from: 'c845fcdc-7415-4bf8-9de2-8876117e5991',
    to: 'pw9-45i-9sd',
    quantity: 4,
    purpose: 'Physics of the 12th year of primary school',
    status: 'active'
  },
  {
    amount: '1500',
    date: '19-11-2023',
    from: 'a7105b35-6282-4c5e-b1cf-2a4f1029f8c3',
    to: 'qz2-50j-6vp',
    quantity: 2,
    purpose: 'Art of the 13th year of primary school',
    status: 'canceled'
  }
]);

const attendance = ref([
  {
    date: '10-11-2023',
    student: 'c041fc4b-b760-4ca9-83b5-218560a6cae8',
    course: 'Math of the 4th year of primary school',
    status: 'present'
  },
  {
    date: '10-11-2023',
    student: 'd84ce632-2f14-48e5-9f65-f4c18b5506bc',
    course: 'Science of the 5th year of primary school',
    status: 'absent'
  },
  {
    date: '11-11-2023',
    student: 'a7e1c6c8-9e07-4eb2-82ef-9c8b3dbcc03d',
    course: 'English of the 6th year of primary school',
    status: 'present'
  },
  {
    date: '12-11-2023',
    student: 'f823f6c7-8a3e-4e4f-baa4-2c5b3f1ec92f',
    course: 'History of the 7th year of primary school',
    status: 'absent'
  },
  {
    date: '13-11-2023',
    student: '9d6716ef-ef1e-4ad0-8a38-baf57e3e8719',
    course: 'Geography of the 8th year of primary school',
    status: 'present'
  },
  {
    date: '14-11-2023',
    student: '32efde3d-d23c-42c5-b73d-6e1a3c53c8c9',
    course: 'Math of the 9th year of primary school',
    status: 'absent'
  },
  {
    date: '15-11-2023',
    student: 'b972b25e-865b-487d-9d02-60a998bf46fb',
    course: 'Biology of the 10th year of primary school',
    status: 'present'
  },
  {
    date: '16-11-2023',
    student: 'fe8b6a36-4e0a-49c3-95ea-0e20f5e6cb09',
    course: 'Chemistry of the 11th year of primary school',
    status: 'absent'
  },
  {
    date: '17-11-2023',
    student: 'c845fcdc-7415-4bf8-9de2-8876117e5991',
    course: 'Physics of the 12th year of primary school',
    status: 'present'
  },
  {
    date: '18-11-2023',
    student: 'a7105b35-6282-4c5e-b1cf-2a4f1029f8c3',
    course: 'Art of the 13th year of primary school',
    status: 'absent'
  }
]);

const coursesQueryColor = ref('#212937');

const paymentsQueryColor = ref('#212937');

const attendanceQueryColor = ref('#212937');

const changeColor = (color) => {
  switch (color) {
    case '#212937':
      return '#0B6E4F';
    case '#0B6E4F':
      return '#FA9F42';
    default:
      return '#212937';
  }
};

const selectedCourse = ref();

const zoom = ref(false);
</script>