<template>
    <a-menu :style="{ width: '100%' }" @menu-item-click="jump">

        <!-- <a-sub-menu key="0">
            <template #title>Navigation 1</template> -->
        <a-menu-item v-for="item in menuRoutes" :key="item.name">
            <template #icon>
                <icon-apps></icon-apps>
            </template>
            {{ item.meta.title }}
        </a-menu-item>
        <!-- </a-sub-menu> -->
    </a-menu>
</template>
<script setup lang="ts">
import { menuRoutes, router } from "@/router/index";
import { reactive } from "vue";
import {
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconBug,
    IconBulb,
} from '@arco-design/web-vue/es/icon';

const jump = (key: string) => {
    console.log('key: ', key);
    router.push({
        name: key
    })
}
</script>