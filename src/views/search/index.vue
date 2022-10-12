<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { listScores } from "@/api/score";
import type { DescData } from '@arco-design/web-vue';

const msg = "hello"
const searchForm = reactive({
    studentName: '',
    idNum: '',
    // subjectName: '',

})
const data = ref([])
const getData = async function () {
    const res = await listScores({ params: searchForm })
    data.value = res.data
}
const handleChange = () => {
    console.log('change');

}
const formatText = (data: any) => {
    interface ZhMap {
        [key: string]: string
    }
    const zhMap: ZhMap = {
        // TODO
        "id": "序号",
        "institutionName": "机构名称",
        "studentName": "学生名称",
        "idType": "证件类型",
        "idNum": "证件号码",
        "date": "日期",
        "subjectName": "科目",
        "level": "等级",
        "score": "成绩",
    }
    const ret: any = []
    Object.keys(data).forEach((prop: string) => {
        if (!["idType"].includes(prop)) {
            ret.push({
                label: zhMap[prop],
                value: data[prop]
            })
        }
    })
    return ret
}
</script>
<template>
    <a-form :model="searchForm" ref="formRef" layout="vertical" style="margin: 20px 0">
        <div class="box">
            <div class="item">
                <a-form-item field="studentName" label="学生姓名" label-col-flex="100px">
                    <a-input v-model="searchForm.studentName" placeholder="" />
                </a-form-item>
            </div>
            <div class="item">
                <a-form-item field="idNum" label="证件号码" label-col-flex="80px">
                    <a-input v-model="searchForm.idNum" placeholder="" />
                </a-form-item>
            </div>
            <!-- <div class="item">
                <a-form-item field="subjectName" label="subjectName" label-col-flex="80px">
                    <a-input v-model="searchForm.subjectName" placeholder="please enter subjectName." />
                </a-form-item>
            </div> -->
            <div class="item">
                <a-button @click="getData" type="primary">查询成绩</a-button>
            </div>
        </div>
    </a-form>

    <!-- <a-carousel :style="{
      width: '600px',
      height: '240px',
    }" :default-current="2" @change="handleChange">
        <a-carousel-item v-for="score in data">
            <a-card :style="{ /* width: '360px' */ }" title="Arco Card">
                <a-descriptions :data="formatText(score)" title="成绩" bordered />
            </a-card>
        </a-carousel-item>
    </a-carousel> -->

    <a-card :style="{ /* width: '360px' */ }" :title="data.length>0? '查询结果：':''">
        <div v-for="score in data" style="margin: 20px 0; height: 100%;">
            <a-descriptions :data="formatText(score)" bordered :column="1" />
        </div>
    </a-card>
</template>
<style lang="less" scoped>
.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    // place-content: center;
}
</style>