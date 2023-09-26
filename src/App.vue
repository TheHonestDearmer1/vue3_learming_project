<script setup> 
import banners from './components/banners1.vue';
import MNG_Menu from './components/MNG_Menu.vue';
import login from './components/login.vue'
import { ref } from 'vue';

const tabs = {
  banners,
  login
}
var tabs_name = ref('home');

function ChangeMenuCom(tabsName){
   tabs_name.value = tabsName;
}
</script>

<template>
    <MNG_Menu>
 <component :is="tabs[tabs_name]" :ChangeMenuCom="ChangeMenuCom"></component>
    </MNG_Menu>
</template>
