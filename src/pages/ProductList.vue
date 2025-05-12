<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAxios } from '@/api';

interface Product {
  productNumber: string;
  productName: string;
  specifications: string;
  pManufacturingCost: number;
  pSellingPrice: number;
  productInputQuantity: number;
  workshopNumber: string;
  partNumber: string;
  storeNumber: string;
}

const products = ref<Product[]>([]);
const showAddForm = ref(false);
const newProduct = ref<Omit<Product, 'productNumber'>>({
  productName: '',
  specifications: '',
  pManufacturingCost: 0,
  pSellingPrice: 0,
  productInputQuantity: 0,
  workshopNumber: '',
  partNumber: '',
  storeNumber: ''
});

const fetchProducts = async () => {
  const { data } = await useAxios.get('/product/');
  products.value = data;
};

const addProduct = async () => {
  await useAxios.post('/product/', newProduct.value);
  fetchProducts();
  showAddForm.value = false;
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="product-list">
    <h2>产品列表</h2>
    <button @click="showAddForm = true">添加产品</button>
    
    <div v-if="showAddForm" class="add-form">
      <h3>添加新产品</h3>
      <input v-model="newProduct.productName" placeholder="产品名">
      <input v-model="newProduct.specifications" placeholder="规格">
      <input v-model="newProduct.pManufacturingCost" type="number" placeholder="制造成本">
      <input v-model="newProduct.pSellingPrice" type="number" placeholder="销售价格">
      <input v-model="newProduct.productInputQuantity" type="number" placeholder="入库数量">
      <input v-model="newProduct.workshopNumber" placeholder="车间编号">
      <input v-model="newProduct.partNumber" placeholder="零件编号">
      <input v-model="newProduct.storeNumber" placeholder="仓库号">
      <button @click="addProduct">提交</button>
      <button @click="showAddForm = false">取消</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>产品号</th>
          <th>产品名</th>
          <th>规格</th>
          <th>制造成本</th>
          <th>销售价格</th>
          <th>入库数量</th>
          <th>车间编号</th>
          <th>零件编号</th>
          <th>仓库号</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prod in products" :key="prod.productNumber">
          <td>{{ prod.productNumber }}</td>
          <td>{{ prod.productName }}</td>
          <td>{{ prod.specifications }}</td>
          <td>{{ prod.pManufacturingCost }}</td>
          <td>{{ prod.pSellingPrice }}</td>
          <td>{{ prod.productInputQuantity }}</td>
          <td>{{ prod.workshopNumber }}</td>
          <td>{{ prod.partNumber }}</td>
          <td>{{ prod.storeNumber }}</td>
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