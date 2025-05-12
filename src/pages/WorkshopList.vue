<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAxios } from '@/api';

interface Workshop {
  workshopNumber: string;
  workshopDirectorName: string;
  address: string;
  workshopTelephone: string;
  expenses: number;
  factoryNumber: string;
}
const workshops = ref<Workshop[]>([]);
const showAddForm = ref(false);
const newWorkshop = ref<Omit<Workshop, 'workshopNumber'>>({
  workshopDirectorName: '',
  address: '',
  workshopTelephone: '',
  expenses: 0,
  factoryNumber: ''
});

const fetchWorkshops = async () => {
  const { data } = await useAxios.get('/workshop/');
  workshops.value = data;
};

const addWorkshop = async () => {
  await useAxios.post('/workshop/', newWorkshop.value);
  fetchWorkshops();
  showAddForm.value = false;
};

onMounted(() => {
  fetchWorkshops();
});
</script>

<template>
  <div class="workshop-list">
    <h2>车间列表</h2>
    <button @click="showAddForm = true">添加车间</button>
    
    <div v-if="showAddForm" class="add-form">
      <h3>添加新车间</h3>
      <input v-model="newWorkshop.workshopDirectorName" placeholder="车间主任">
      <input v-model="newWorkshop.address" placeholder="地址">
      <input v-model="newWorkshop.workshopTelephone" placeholder="电话">
      <input v-model="newWorkshop.expenses" type="number" placeholder="运营成本">
      <input v-model="newWorkshop.factoryNumber" placeholder="所属工厂">
      <button @click="addWorkshop">提交</button>
      <button @click="showAddForm = false">取消</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>车间编号</th>
          <th>车间主任</th>
          <th>地址</th>
          <th>电话</th>
          <th>运营成本</th>
          <th>所属工厂</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ws in workshops" :key="ws.workshopNumber">
          <td>{{ ws.workshopNumber }}</td>
          <td>{{ ws.workshopDirectorName }}</td>
          <td>{{ ws.address }}</td>
          <td>{{ ws.workshopTelephone }}</td>
          <td>{{ ws.expenses }}</td>
          <td>{{ ws.factoryNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* 复用FactoryList的表格样式 */
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