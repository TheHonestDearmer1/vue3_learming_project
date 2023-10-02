<template>
  <div id="menu" style="height:100%;">
    <MNG_Menu>
        <div style="width: auto;
        display: grid;
        grid-template-columns: 3fr 7fr;
        ">
    <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin: 0px;">
     <div style="display: grid; gap: 10px; width: 100%;"> 
      <h1 style="display: flex; justify-content: center; align-items: center;">用户评论</h1>
      <n-input placeholder="标题" v-model:value="custom_title" :disabled="change_open">
      <template #prefix>
      </template>
    </n-input>
    <n-input placeholder="描述" v-model:value="custom_description" :disabled="change_open">
      <template #prefix>
      </template>
    </n-input>
              <form  action="http://127.0.0.1:5000/admin/custom/img"  target="result-frame" method="post" enctype="multipart/form-data">
              <input type="text" name="id"   v-model="custom_ID" style="display: none;"/>
                <input type="file" name="file" style="display: none;" ref="uploadimg" @change="handleFiles"/>
                <button type="submit" ref="uploadRef" style="display: none;">隐藏按钮</button>
          </form>
          <n-button type="primary"  @click="updateFile" :disabled="change_open" >
     上传文件
    </n-button>
          <n-button type="primary"  @click="update_action" :disabled="change_open" >
     添加
    </n-button>
    <n-button type="primary"  @click="change_open = true" :disabled="change_open" >
     修改
    </n-button>
          <iframe  name="result-frame" style="display: none;"></iframe>
    <h3 class="wrap" v-if="!change_open">{{ this.files_name }}</h3>
     </div>
    </div>
           <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <custom_Data :addBannersChange="addBannersChange"/>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
        </div>
    </MNG_Menu>
  </div>
  <Teleport to="#menu">
  <Transition name="slide-fade">
  <div v-if="change_open" class="demo modal-demo" style="width: 350px;">
    <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin: 0px;">
     <div style="display: grid; gap: 10px; width: 100%;"> 
      <h1 style="display: flex; justify-content: center; align-items: center;">用户评论</h1>
      <n-input placeholder="ID" v-model:value="custom_ID">
      <template #prefix>
      </template>
    </n-input>
      <n-input placeholder="标题" v-model:value="change_custom_title">
      <template #prefix>
      </template>
    </n-input>
    <n-input placeholder="描述" v-model:value="change_custom_description">
      <template #prefix>
      </template>
    </n-input>
          <n-button type="primary"  @click="updateFile" >
     上传文件
    </n-button>
          <n-button type="primary"  @click="change_action" >
     修改
    </n-button>
    <n-button type="primary"  @click="change_open = false" >
     返回
    </n-button>
    <h3 class="wrap" v-if="change_open">{{ this.files_name }}</h3>
          <iframe  name="result-frame" style="display: none;"></iframe>
     </div>
    </div>
  </div>
</Transition>
</Teleport>
      </template>
      
      <script>
      import custom_Data from "./custom_Data.vue";
      import { defineComponent,ref,onMounted,nextTick, watch} from 'vue';
      import { useMessage } from 'naive-ui'
      import axios from "axios";

      export default defineComponent({
        data(){
        return{
          custom_ID: '',
          files_name:'',
          custom_title:'',
          custom_description:'',
          change_custom_title:'',
          change_custom_description:'',
          addBannersChange: true,
          message: useMessage(),
          change_open: false
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
        //刷新页面操作,使得监听器知道改变了状态
      })
      this.message.success(response.data.status_msg);
      window.location.reload();
    }
  })
  .catch(function (error) {
    this.message.warning(error);
  });
        },
        updateFile(){
          this.$nextTick(()=>{
            this.$refs.uploadimg.click();
          })
        },
        //修改函数的id和文件都用原来添加的
        change_action(){
          console.log("修改");
          axios.post('http://127.0.0.1:5000/admin/custom/action/change',{
    id : this.custom_ID,
    title: this.change_custom_title,
    description: this.change_custom_description
})
  .then( (response)=> {
    if(response.data.status_code != 0){
      this.message.warning(response.data.status_msg);
    }else{
       nextTick();
      console.log(this.uploadRef);
      this.$nextTick(()=>{
        this.$refs.uploadRef.click();
        //刷新页面操作,使得监听器知道改变了状态
      })
      this.message.success(response.data.status_msg);
      window.location.reload();
    }
  })
  .catch(function (error) {
    this.message.warning(error);
  });
        },
        handleFiles(event){
		this.files_name = "上传的文件名为"+event.target.files[0].name
		console.log(this.files_name);
	}
        },
        setup(){
          const uploadRef =ref(null);
          const uploadimg =ref(null);
          onMounted (()=>{
            console.log(uploadRef.value);
            console.log(uploadimg.value);
          })
          return {
            uploadRef,
            uploadimg
          }
        }
      });
      </script>
      <style>
      .demo {
          padding: 22px 24px;
          border-radius: 8px;
          box-shadow: var(--vt-shadow-2);
          margin-bottom: 1.2em;
          transition: background-color .5s ease;
      }
      .modal-demo {
          position: fixed;
          z-index: 999;
          top: 20%;
          left: 50%;
          width: auto;
          margin-left: -150px;
          background-color:rgb(255, 255, 255);
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 16px #00000026;
      }
      .slide-fade-enter-active {
        transition: all 0.3s ease-out;
      }
      
      .slide-fade-leave-active {
        transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
      }
      
      .slide-fade-enter-from,
      .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
      }
      .wrap{ word-wrap: break-word; word-break: break-all; white-space: pre-wrap; } 
      </style>