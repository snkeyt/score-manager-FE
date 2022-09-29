<template>
    <a-layout class="layout-demo">
        <a-layout-sider collapsible breakpoint="xl">
            <div class="logo" />
            <RouteMenu></RouteMenu>
            <!-- trigger -->
            <template #trigger="{ collapsed }">
                <IconCaretRight v-if="collapsed"></IconCaretRight>
                <IconCaretLeft v-else></IconCaretLeft>
            </template>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="padding-left: 20px;">
                <!-- <a-button class="nav-btn" type="outline" :shape="'circle'" @click="toggleTheme">
                    <template #icon>
                        <icon-moon-fill v-if="isDark" />
                        <icon-sun-fill v-else />
                    </template>
                </a-button> -->

            </a-layout-header>
            <a-layout style="padding: 0 24px;">
                <a-layout-content>
                    <router-view></router-view>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Message } from '@arco-design/web-vue';
import {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
    IconMoonFill,
    IconSunFill
} from '@arco-design/web-vue/es/icon';

import RouteMenu from "./components/menu.vue";

export default defineComponent({
    components: {
        IconCaretRight,
        IconCaretLeft,
        IconHome,
        IconCalendar,
        IconMoonFill,
        IconSunFill,
        RouteMenu
    },
    data: () => {
        return {
            isDark: true
        }
    },
    methods: {
        onClickMenuItem(key) {
            Message.info({ content: `You select ${key}`, showIcon: true });
        },

        toggleTheme() {
            if (this.isDark) {
                document.body.setAttribute('arco-theme', 'dark');
            } else {
                document.body.removeAttribute('arco-theme');
            }
        },
    }
});
</script>
<style scoped>
.layout-demo {
    height: 100vh;
    width: 100vw;
    background: var(--color-fill-2);
    border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
    height: 32px;
    margin: 12px 8px;
    background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
    background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-header) {
    height: 64px;
    line-height: 64px;
    background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
    height: 48px;
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
}
</style>