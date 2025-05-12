<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAxios } from '@/api';

interface Employee {
  employeeNumber: string;
  name: string;
  age: number;
  sex: string;
  workType: string;
  monthlyWages: number;
  workshopNumber: string;
  phoneNumber: string;
}

const employees = ref<Employee[]>([]);
const showAddForm = ref(false);
const newEmployee = ref<Omit<Employee, 'employeeNumber'>>({
  name: '',
  age: 0,
  sex: '',
  workType: '',
  monthlyWages: 0,
  workshopNumber: '',
  phoneNumber: ''
});

const fetchEmployees = async () => {
  const { data } = await useAxios.get('/employee/');
  employees.value = data;
};

const addEmployee = async () => {
  await useAxios.post('/employee/', newEmployee.value);
  fetchEmployees();
  showAddForm.value = false;
};

onMounted(() => {
  fetchEmployees();
});
</script>

<template>
  <div class="employee-list">
    <h2>职工列表</h2>
    <button @click="showAddForm = true">添加职工</button>
    
    <div v-if="showAddForm" class="add-form">
      <h3>添加新职工</h3>
      <input v-model="newEmployee.name" placeholder="姓名">
      <input v-model="newEmployee.age" type="number" placeholder="年龄">
      <input v-model="newEmployee.sex" placeholder="性别">
      <input v-model="newEmployee.workType" placeholder="工种">
      <input v-model="newEmployee.monthlyWages" type="number" placeholder="月工资">
      <input v-model="newEmployee.workshopNumber" placeholder="车间编号">
      <input v-model="newEmployee.phoneNumber" placeholder="电话">
      <button @click="addEmployee">提交</button>
      <button @click="showAddForm = false">取消</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>职工号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>性别</th>
          <th>工种</th>
          <th>月工资</th>
          <th>车间编号</th>
          <th>电话</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.employeeNumber">
          <td>{{ emp.employeeNumber }}</td>
          <td>{{ emp.name }}</td>
          <td>{{ emp.age }}</td>
          <td>{{ emp.sex }}</td>
          <td>{{ emp.workType }}</td>
          <td>{{ emp.monthlyWages }}</td>
          <td>{{ emp.workshopNumber }}</td>
          <td>{{ emp.phoneNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* 复用表格样式 */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
.add-form {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
}
.add-form input {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>