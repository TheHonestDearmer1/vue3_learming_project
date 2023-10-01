<template>
    <MNG_Menu>
        <div style="width: auto;
        display: grid;
        grid-template-columns: 3fr 7fr;
        ">
    <div style="display: flex; justify-content: center; align-items: center;">
     <div style="display: grid; gap: 10px;"> 
      <h1 style="display: flex; justify-content: center; align-items: center;">用户评论</h1>
      <n-input placeholder="标题" v-model:value="custom_title">
      <template #prefix>
      </template>
    </n-input>
    <n-input placeholder="描述" v-model:value="custom_description">
      <template #prefix>
      </template>
    </n-input>
              <form  action="http://127.0.0.1:5000/admin/custom/img"  target="result-frame" method="post" enctype="multipart/form-data">
              <input type="text" name="id"   v-model="custom_ID" style="display: none;"/>
                <input type="file" name="file" class="update" ref="uploadimg"/>
                <button type="submit" ref="uploadRef" style="display: none;">隐藏按钮</button>
          </form>
          <n-button type="primary"  @click="update_action" >
     添加
    </n-button>
    <n-button type="primary"  @click="update_action" >
     修改
    </n-button>
          <iframe  name="result-frame" style="display: none;"></iframe>
     </div>
    </div>
           <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <custom_Data/>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
        </div>
    </MNG_Menu>
      </template>
      
      <script>
      import custom_Data from "./custom_Data.vue";
      import { defineComponent,ref,onMounted,nextTick} from 'vue';
      import { useMessage } from 'naive-ui'
      import axios from "axios";

      export default defineComponent({
        data(){
        return{
          custom_ID: '',
          custom_title:'',
          custom_description:'',
          message: useMessage()
        }
        },
        components:{
          custom_Data
        },
        methods:{
        update_action(){
          //进行提交操作
          console.log("提交");
          axios.post('http://127.0.0.1:5000/admin/custom',{
    title: this.custom_title,
    description: this.custom_description
})
  .then( (response)=> {
    if(response.data.status_code != 0){
      this.message.warning(response.data.status_msg);
    }else{
      //取得id提交表单
      this.custom_ID = ref(response.data.img_id);
       nextTick();
      console.log(this.uploadRef);
      this.$nextTick(()=>{
        this.$refs.uploadRef.click();
      })
      //刷新页面操作没写
      this.message.success(response.data.status_msg);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
        },
        },
        setup(){
          const uploadRef =ref(null);
          onMounted (()=>{
            console.log(uploadRef.value);
            console.log(uploadimg.value);
          })
          return {
            uploadRef
          }
        }
      });
      </script>

      <style>
   
    </style>