<template>
<div style="height: 100%;
display: grid;
grid-template-columns:100px auto; /*三列，列宽*/
grid-template-rows: auto; /*两行，行宽*/
">
  <div style="height: 100%; width: 200px;">
    <n-layout has-sider    
    style="height: 100%;"
   >
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="200"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
        @mouseover="collapsed = false"
          @mouseout="collapsed = true"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
        />
      </n-layout-sider>
      </n-layout>
   </div>
   <div> 
      <slot />
      </div>
</div>
</template>

<script>

import { h, ref, defineComponent } from "vue";
import { NIcon } from "naive-ui";
import { AccessibilitySharp, CaretDownOutline,HomeOutline,LogIn,ChatboxOutline} from "@vicons/ionicons5";


const menuOptions = [
    {
      label: "主页",
      key: "home",
      botton: "none",
    },
    {
      label: "banners",
      key: "banners",
      botton: "none",
    },
    {
      label: "用户评论",
      key: "usermsg",
      botton: "none",
    },
    {
      label: "登录",
      key: "login",
      botton: "none",
    }
  ];

export default defineComponent({
  props:['ChangeMenuCom'],
  setup() {
    return { 
      collapsed: ref(true),
      menuOptions,
      renderMenuLabel(option) {
        if ('button' in option) {
          return  h("button", {onClick: () => {
            console.log(option.key);
            return this.ChangeMenuCom(option.key);
        }}, option.label);}
        return option.label;
      },
      renderMenuIcon(option) {
        if (option.key === "home")
        return h(NIcon, null, { default: () => h(HomeOutline) });
        if(option.key ==="banners")
        return h(NIcon, null, { default: () => h(AccessibilitySharp) })
        if(option.key ==="usermsg")
        return h(NIcon, null, { default: () => h(ChatboxOutline) })
        if(option.key ==="login")
        return h(NIcon, null, { default: () => h(LogIn) })
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) });
      },
    };
  }
});

</script>

<style>

</style>