<template>
    <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
  />
</template>

<script setup>
import { h, onBeforeMount, reactive } from 'vue';
import { NButton, useMessage,NAvatar } from 'naive-ui';
import axios from 'axios';

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
      title: '头像',
      key: 'avatar',
      render(row) {
        return h(
            NAvatar,
          {
            size:"medium",
            src:row.avatar,
          }
        );
      },
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
      },
    }
  ];
};

const data = reactive([]);
const message = useMessage();
//读取数据操作
const fetchData = () => {
  axios
    .get('http://127.0.0.1:5000/admin/custom')
    .then(function (response) {
      if (response.data.status_code !== 0) {
        message.warning(response.data.status_msg);
      } else {
        data.splice(0, data.length); // 清空数组
        data.push(...response.data.DataList);
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
    .get('http://127.0.0.1:5000/admin/custom/action/delete', {
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

