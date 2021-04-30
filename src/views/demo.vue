<template>
  <div id="demo">demo</div>
</template>

<script>
import { demo } from "@/api";

export default {
    name: "demo",
    methods:{
      init(){
        const data = {
          pageNum: 1,
          pageSize: 10
        }
        demo(data).then(res=>{
          console.log('res',res);
        })
      }
    },
    created() {
      this.init()
    }
  }
</script>

<style lang="less" scoped>
  #demo{

  }
</style>
