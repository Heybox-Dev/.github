@ -1,68 +1,98 @@
<script setup lang="ts">
import {h, reactive, ref} from 'vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  PicLeftOutlined,
  InfoCircleOutlined,
  RedEnvelopeOutlined,
  AppstoreOutlined,
  CloudOutlined,
} from '@ant-design/icons-vue';
import {createFromIconfontCN} from '@ant-design/icons-vue';
import Urls from '@/assets/urls.json';
import Icon from '@/assets/icon.svg';
import router from '@/router/index.ts';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4583291_rt4yqubcpzs.js',
});

let hrefs = window.location.href.split('/');
let temp: any = '';
let keys: string[] = [];

hrefs.pop()
while (temp !== '#') {
  temp = hrefs.pop();
  if (temp !== '#') keys.push(temp);
}

const state = reactive({
  collapsed: false,
  selectedKeys: [window.location.href.split('/').pop() || 'home'],
  openKeys: keys,
});

function toggleCollapsed() {
  state.collapsed = !state.collapsed;
}

function select(page: any) {
  let path: string = '';
  for (let p of page.keyPath) {
    path += '/' + p
  }
  path = path === '/home' ? '/' : path;
  router.push(path);
  console.log(state);
}
</script>

<template>
  <a-page-header
    class="app-header"
    title="Heybox Dev"
    sub-title="Heybox Dev"
    :avatar="{ src: Icon }">
    <template #extra>
      <a-space class="url-list">
        <a-tooltip v-for="url in Urls" placement="left">
          <template #title>
            <span>{{ url.tip }}</span>
          </template>
          <a :href="url.url" target="_blank">
            <icon-font class="icon" :type="'icon-'+url.icon"/>
          </a>
        </a-tooltip>
      </a-space>
    </template>
  </a-page-header>
  <a-layout>
    <a-layout-content>
      <div class="app-scrollbar">
        <div class="app-content">
          <router-view/>
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
