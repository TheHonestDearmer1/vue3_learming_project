<template>
    <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
  />
</template>

<script setup>
import { h, onBeforeMount, reactive,defineProps,watch } from 'vue';
import { NButton, useMessage } from 'naive-ui';
import axios from 'axios';
const props = defineProps({
  addBannersChange: {
      type: Boolean,
      requre: true
    }
})
watch(()=>props.addBannersChange,()=>{
  fetchData();
})
const createColumns = ({ play }) => {
  return [
    {
      title: 'ID',
      key: 'ID'
    },
    {
      title: '标题',
      key: 'title'
    },
    {
      title: '描述',
      key: 'description'
    },
    {
      title: '链接',
      key: 'href'
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'medium',
            onClick: () => play(row)
          },
          { default: () => '删除' }
        );
      }
    }
  ];
};

const data = reactive([]);
const message = useMessage();

const fetchData = () => {
  axios
    .get('http://127.0.0.1:5000/admin/banners/action')
    .then(function (response) {
      if (response.data.status_code !== 0) {
        message.warning(response.data.status_msg);
      } else {
        data.splice(0, data.length); // 清空数组
        data.push(...response.data.DataList);
        console.log(props.addBannersChange);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

onBeforeMount(() => {
  fetchData();
});

const play = (row) => {
  axios
    .get('http://127.0.0.1:5000/admin/banners/action/delete', {
      params: {
        ID: row.ID
      }
    })
    .then(function (response) {
      if (response.data.status_code !== 0) {
        alert(response.data.status_msg);
      } else {
        message.info(`删除成功`);
        fetchData();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const columns = createColumns({ play });
const pagination = false;

</script>

