<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAxios } from '@/api';

interface Part {
  partNumber: string;
  partName: string;
  pManufacturingCost: number;
  sellingPrice: number;
  partInputQuantity: number;
  workshopNumber: string;
  storeNumber: string;
}

const parts = ref<Part[]>([]);
const showAddForm = ref(false);
const newPart = ref<Omit<Part, 'partNumber'>>({
  partName: '',
  pManufacturingCost: 0,
  sellingPrice: 0,
  partInputQuantity: 0,
  workshopNumber: '',
  storeNumber: ''
});

const fetchParts = async () => {
  const { data } = await useAxios.get('/part/');
  parts.value = data;
};

const addPart = async () => {
  await useAxios.post('/part/', newPart.value);
  fetchParts();
  showAddForm.value = false;
};

onMounted(() => {
  fetchParts();
});
</script>

<template>
  <div class="part-list">
    <h2>零件列表</h2>
    <button @click="showAddForm = true">添加零件</button>
    
    <div v-if="showAddForm" class="add-form">
      <h3>添加新零件</h3>
      <input v-model="newPart.partName" placeholder="零件名">
      <input v-model="newPart.pManufacturingCost" type="number" placeholder="制造成本">
      <input v-model="newPart.sellingPrice" type="number" placeholder="销售价格">
      <input v-model="newPart.partInputQuantity" type="number" placeholder="入库数量">
      <input v-model="newPart.workshopNumber" placeholder="车间编号">
      <input v-model="newPart.storeNumber" placeholder="仓库号">
      <button @click="addPart">提交</button>
      <button @click="showAddForm = false">取消</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>零件号</th>
          <th>零件名</th>
          <th>制造成本</th>
          <th>销售价格</th>
          <th>入库数量</th>
          <th>车间编号</th>
          <th>仓库号</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="part in parts" :key="part.partNumber">
          <td>{{ part.partNumber }}</td>
          <td>{{ part.partName }}</td>
          <td>{{ part.pManufacturingCost }}</td>
          <td>{{ part.sellingPrice }}</td>
          <td>{{ part.partInputQuantity }}</td>
          <td>{{ part.workshopNumber }}</td>
          <td>{{ part.storeNumber }}</td>
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