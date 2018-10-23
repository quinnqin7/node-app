<template>
<div class="main-content">
    患者的唯一_ Id{{patinentUserId}}
</div>
</template>

<script>
 export default {
    data() {
      return {
          patinentUserId : this.$store.getters.patinentUserId
      };
    },

    props: {
       id:{
           type:String,
           default:""
       }
    },
    computed:{

    },
    // created(){
    //     this.$axios.get('/api/profiles/detail', {params:{id:'5bcfa88ed7b57c8228f92a83fds'}}).then(res => {
    //         //操作成功
    //         this.$message({
    //             message: '添加成功',
    //             type: "success"
    //         });
    //         alert(JSON.stringify(res.data))
    //     });
    // },
    methods: {

    }
  }
</script>

<style>
.main-content{
  margin:0 15px;
  width: 80%;
  margin-top: 20px;
  margin-left: 100px;
  /*border:1px solid #333;*/
}

.btn{
  float: right;
}

</style>

