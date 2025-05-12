<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAxios } from '@/api';

interface Factory {
  factoryNumber: string;
  factoryname: string;
  factorymen: string;
  factoryPeratingExpenses: number;
}

const factories = ref<Factory[]>([]);
const showAddForm = ref(false);
const newFactory = ref<Omit<Factory, 'factoryNumber'>>({
  factoryname: '',
  factorymen: '',
  factoryPeratingExpenses: 0
});

const fetchFactories = async () => {
  const { data } = await useAxios.get('/factory/');
  factories.value = data;
};

const addFactory = async () => {
  await useAxios.post('/factory/', newFactory.value);
  fetchFactories();
  showAddForm.value = false;
};

onMounted(() => {
  fetchFactories();
});
</script>

<template>
  <div class="factory-list">
    <h2>工厂列表</h2>
    <button @click="showAddForm = true">添加工厂</button>
    
    <div v-if="showAddForm" class="add-form">
      <h3>添加新工厂</h3>
      <input v-model="newFactory.factoryname" placeholder="工厂名">
      <input v-model="newFactory.factorymen" placeholder="厂长名">
      <input v-model="newFactory.factoryPeratingExpenses" type="number" placeholder="运营开销">
      <button @click="addFactory">提交</button>
      <button @click="showAddForm = false">取消</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>工厂代号</th>
          <th>工厂名</th>
          <th>厂长名</th>
          <th>运营开销</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="factory in factories" :key="factory.factoryNumber">
          <td>{{ factory.factoryNumber }}</td>
          <td>{{ factory.factoryname }}</td>
          <td>{{ factory.factorymen }}</td>
          <td>{{ factory.factoryPeratingExpenses }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
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