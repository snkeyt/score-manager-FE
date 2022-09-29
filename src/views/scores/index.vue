<template>
  <div class="container">
    <a-form :model="searchForm">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item field="studentName" label="studentName" label-col-flex="100px">
            <a-input v-model="searchForm.studentName" placeholder="please enter studentName." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="idNum" label="idNum" label-col-flex="80px">
            <a-input v-model="searchForm.idNum" placeholder="please enter idNum." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="subjectName" label="subjectName" label-col-flex="80px">
            <a-input v-model="searchForm.subjectName" placeholder="please enter subjectName." />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item field="level" label="level" label-col-flex="100px">
            <a-input v-model="searchForm.level" placeholder="please enter level." />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="score" label="score" label-col-flex="80px">
            <a-input v-model="searchForm.score" placeholder="please enter score." />
          </a-form-item>
        </a-col>
      </a-row>
      <a-button @click="getData">搜索</a-button>
    </a-form>
    <a-table :columns="columns" :data="data">

      <template #optional="{ record }">
        <a-button @click="$modal.info({ title:'Name', content:record.name })">编辑</a-button>
        <a-button @click="del(record)">删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { listScores, addScore, updateScore, delScore } from "@/api/score";
import { Modal } from '@arco-design/web-vue';
const searchForm = reactive({
  studentName: '张三',
  // idNum: '44',
  // subjectName: '',
  // level: '',
  // score: '',
});
const uploadForm = reactive({
  studentName: '',
  idNum: '',
  subjectName: '',
  level: '',
  score: '',
});
const tableProps = {
  pagination: true,
};
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'institutionName',
    dataIndex: 'institutionName',
  },
  {
    title: 'studentName',
    dataIndex: 'studentName',
    // sortable: false,
    // filterable: true,
  },
  {
    title: 'idType',
    dataIndex: 'idType',
  },
  {
    title: 'idNum',
    dataIndex: 'idNum',
  },
  {
    title: 'date',
    dataIndex: 'date',
  },
  {
    title: 'subjectName',
    dataIndex: 'subjectName',
  },
  {
    title: 'level',
    dataIndex: 'level',
  },
  {
    title: 'score',
    dataIndex: 'score',
  },
  {
    title: 'optional',
    slotName: 'optional',
  },
];
const data = ref([
  {
    id: 1,
    institutionName: '',
    studentName: '张三',
    idType: '',
    idNum: '44111231231233',
    date: '',
    subjectName: '',
    level: '',
    score: '',
  },
]);
const getData = async function () {
  const res = await listScores({ params: searchForm })
  console.log('res: ', res);
  data.value = res.data
}
const add = async function () {
  const res = await addScore(uploadForm)
  console.log('res: ', res);
}
const update = async function (row) {
  Object.assign(uploadForm, row)
  const res = await updateScore(uploadForm)
  console.log('res: ', res);
}
const del = async function ({ id }: { id: any }) {
  Modal.confirm({
    title: '删除该记录？',
    content: '',
    mask: true,
    onOk: async () => {
      const res = await delScore(id)
      getData()
    }
  })
}

getData()

</script>

<script lang="ts">

export default {
  name: 'ScoreManager',
};
</script>

<style lang="less" scoped>
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  padding-bottom: 0;
  // display: flex;
}
</style>

<style lang="less" scoped>
// responsive
.mobile {
  .container {
    display: block;
  }

  .right-side {
    // display: none;
    width: 100%;
    margin-left: 0;
    margin-top: 16px;
  }
}
</style>
