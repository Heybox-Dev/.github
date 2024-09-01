@ -1,68 +1,98 @@
<script setup lang="ts">
import { reactive } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import Urls from '@/assets/urls.json';
import Icon from '@/assets/icon.svg';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4583291_rt4yqubcpzs.js'
});

let hrefs = window.location.href.split('/');
let temp: any = '';
let keys: string[] = [];

hrefs.pop();
while (temp !== '#') {
  temp = hrefs.pop();
  if (temp !== '#') keys.push(temp);
}
reactive({
  collapsed: false,
  selectedKeys: [window.location.href.split('/').pop() || 'home'],
  openKeys: keys
});
</script>

<template>
  <a-page-header
    class="app-header"
    title="Heybox Dev"
    sub-title="Heybox Dev"
    :avatar="{ src: Icon, shape:'square',size:'large' }">
    <template #extra>
      <a-space class="url-list">
        <a-tooltip v-for="url in Urls" placement="left">
          <template #title>
            <span>{{ url.tip }}</span>
          </template>
          <a :href="url.url" target="_blank">
            <icon-font class="icon" :type="'icon-'+url.icon" />
          </a>
        </a-tooltip>
      </a-space>
    </template>
  </a-page-header>
  <a-layout>
    <a-layout-content>
      <div class="app-scrollbar">
        <div class="app-content">
          <router-view />
        </div>
        <div class="app-footer">
          <span>
            ©
            <a href="https://github.com/heybox-dev" target="_blank">Heybox-Dev</a>
          </span>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<style scoped lang="scss">
.app-header {
  max-height: 81px;
  border: 1px solid rgb(235, 237, 240);
  background-color: #ffffff;
}

.app-sider {
  height: calc(100vh - 82px);
}

.app-menu {
  height: 100%;
  max-width: 280px;
}

.app-scrollbar {
  height: calc(100vh - 81px);
  overflow: auto;
  scrollbar-gutter: stable;
}

.app-footer {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-content {
  margin: 5px;
  min-height: calc(100vh - 173px);
}

.url-list {
  font-size: 32px;
  text-align: center;
  max-height: 32px;
}
</style>
