<template>
  <div class="container">
    <a-form :model="searchForm" ref="formRef">
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
        <a-col :span="8">
          <a-form-item field="date" label="date">
            <a-date-picker v-model="searchForm.date" style="width: 100%;" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-button @click="getData" type="primary">搜索</a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-button @click="showAddModal = true" type="primary">添加</a-button>
        <a-button @click="showExcelModal =true" type="outline">上传表格</a-button>
      </a-row>
    </a-form>
    <a-table :columns="columns" :data="data" :pagination="pagination" @change="handleChange">
      <template #optional="{ record }">
        <a-button @click="showEditModal = true; editForm = record">编辑</a-button>
        <a-button @click="del(record)">删除</a-button>
      </template>
    </a-table>
    <a-modal v-model:visible="showAddModal" title="新增成绩" @ok="modalAddOk" @close="modalAddClose">
      <a-form :model="addForm">
        <a-form-item field="institutionName" label="institutionName">
          <a-input v-model="addForm.institutionName" />
        </a-form-item>
        <a-form-item field="studentName" label="studentName">
          <a-input v-model="addForm.studentName" />
        </a-form-item>
        <a-form-item field="idType" label="idType">
          <a-select v-model="addForm.idType">
            <a-option value="身份证">身份证</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="idNum" label="idNum">
          <a-input v-model="addForm.idNum" />
        </a-form-item>
        <a-form-item field="date" label="date">
          <a-date-picker v-model="addForm.date" style="width: 100%;" />
        </a-form-item>
        <a-form-item field="subjectName" label="subjectName">
          <a-input v-model="addForm.subjectName" />
        </a-form-item>
        <a-form-item field="level" label="level">
          <a-input v-model="addForm.level" />
        </a-form-item>
        <a-form-item field="score" label="score">
          <a-input v-model="addForm.score" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model:visible="showEditModal" title="编辑成绩" @ok="modalEditOk" @close="modalEditClose">
      <a-form :model="editForm">
        <a-form-item field="institutionName" label="institutionName">
          <a-input v-model="editForm.institutionName" disabled />
        </a-form-item>
        <a-form-item field="studentName" label="studentName">
          <a-input v-model="editForm.studentName" disabled />
        </a-form-item>
        <a-form-item field="idType" label="idType">
          <a-select v-model="editForm.idType" disabled>
            <a-option value="身份证">身份证</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="idNum" label="idNum">
          <a-input v-model="editForm.idNum" disabled />
        </a-form-item>
        <a-form-item field="date" label="date">
          <a-date-picker v-model="editForm.date" style="width: 100%;" />
        </a-form-item>
        <a-form-item field="subjectName" label="subjectName">
          <a-input v-model="editForm.subjectName" />
        </a-form-item>
        <a-form-item field="level" label="level">
          <a-input v-model="editForm.level" />
        </a-form-item>
        <a-form-item field="score" label="score">
          <a-input v-model="editForm.score" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model:visible="showExcelModal" title="上传表格" @ok="modalExcelOk" @close="modalExcelClose">
      <a-upload action="http://localhost:3333/scores/excel" @error="handleUploadError" />

    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Modal, type FileItem, type TableData } from '@arco-design/web-vue';
import dayjs from "dayjs";
import { listScores, addScore, updateScore, delScore } from "@/api/score";
const searchForm = reactive({
  studentName: '',
  idNum: '',
  subjectName: '',
  date: '',
});
const addForm = ref({
  institutionName: '',
  studentName: '',
  idType: '',
  idNum: '',
  date: dayjs().format('YYYY-MM-DD'),
  subjectName: '',
  level: '',
  score: '',
});
const editForm = ref({
  institutionName: '',
  studentName: '',
  idType: '',
  idNum: '',
  date: "",
  subjectName: '',
  level: '',
  score: '',
});
const pagination = {
  pageSize: 10
}
const showAddModal = ref(false)
const showEditModal = ref(false)
const showExcelModal = ref(false)
const formRef = ref()
const modalType = ref('add')
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
    // sortable: false,
  },
  {
    title: 'subjectName',
    dataIndex: 'subjectName',
  },
  {
    title: 'level',
    dataIndex: 'level',
    // sortable: {
    //   sortDirections: ['ascend'],
    //   sorter: ((a: TableData, b: TableData) => {
    //     console.log(22131231);
    //     return Number(a.level) - Number(b.level)
    //   })
    // },
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
const data = ref([]);
const getData = async function () {
  console.log('pagination: ', pagination);
  const res = await listScores({ params: searchForm })
  data.value = res.data
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
const modalAddOk = async function () {
  console.log(333333);
  const res = await addScore(addForm.value)
  getData()
  console.log('addForm: ', addForm);
  console.log('res: ', res);
}
const modalEditOk = async function () {
  console.log(333333);
  const res = await updateScore(editForm.value)
  getData()
  console.log('editForm: ', editForm);
  console.log('res: ', res);
}
const modalAddClose = async function () {
  addForm.value = {
    institutionName: '',
    studentName: '',
    idType: '',
    idNum: '',
    date: dayjs().format("YYYY-MM-DD"),
    subjectName: '',
    level: '',
    score: '',
  }
}
const modalExcelOk = async function () {
}
const modalExcelClose = async function () {
}
const modalEditClose = function () {
  formRef.value.resetFields()
}
const handleChange = (data, extra) => {
  console.log('change', data, extra)
}
const handleUploadError = (fileItem: FileItem) => {
  Modal.error({ title: '上传错误', content: fileItem.response.msg })
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
