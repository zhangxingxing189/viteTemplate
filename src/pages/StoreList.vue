<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAxios } from '@/api';

interface Store {
  storeNumber: string;
  storepername: string;
  storePhone: string;
  storeCost: number;
  factoryNumber: string;
}

const stores = ref<Store[]>([]);
const showAddForm = ref(false);
const newStore = ref<Omit<Store, 'storeNumber'>>({
  storepername: '',
  storePhone: '',
  storeCost: 0,
  factoryNumber: ''
});

const fetchStores = async () => {
  const { data } = await useAxios.get('/store/');
  stores.value = data;
};

const addStore = async () => {
  await useAxios.post('/store/', newStore.value);
  fetchStores();
  showAddForm.value = false;
};

onMounted(() => {
  fetchStores();
});
</script>

<template>
  <div class="store-list">
    <h2>仓库列表</h2>
    <button @click="showAddForm = true">添加仓库</button>
    
    <div v-if="showAddForm" class="add-form">
      <h3>添加新仓库</h3>
      <input v-model="newStore.storepername" placeholder="负责人">
      <input v-model="newStore.storePhone" placeholder="电话">
      <input v-model="newStore.storeCost" type="number" placeholder="运营成本">
      <input v-model="newStore.factoryNumber" placeholder="所属工厂">
      <button @click="addStore">提交</button>
      <button @click="showAddForm = false">取消</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>仓库编号</th>
          <th>负责人</th>
          <th>电话</th>
          <th>运营成本</th>
          <th>所属工厂</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="store in stores" :key="store.storeNumber">
          <td>{{ store.storeNumber }}</td>
          <td>{{ store.storepername }}</td>
          <td>{{ store.storePhone }}</td>
          <td>{{ store.storeCost }}</td>
          <td>{{ store.factoryNumber }}</td>
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