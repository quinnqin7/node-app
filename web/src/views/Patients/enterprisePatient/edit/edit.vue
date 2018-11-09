<template>
    <div class="main">
        <div class="components-container">
            <!--<code>-->
                <!--{{ $t('components.tinymceTips') }}-->
                <!--<a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/component/rich-editor.html"> {{ $t('components.documentation') }}</a>-->
            <!--</code>-->
            <div>
                <tinymce style="margin:20px 20px 0 20px" :height="300" v-model="content"/>
            </div>
            <!--<div class="editor-content" v-html="content"/>-->

            <el-button type="success" style="float:right;margin-right: 20px;margin-top: 20px;" @click="submitJournal">{{ $t('table.confirm') }}</el-button>
            <el-button type="warning" style="float:right;margin-right: 20px;margin-top: 20px;" @click="clean">{{ $t('table.clean') }}</el-button>
        </div>
    </div>
</template>

<script>
    import Tinymce from './components/Tinymce'
    import {fetchJournalContent, submitJournal, updateJournal} from "@/api/admin";
    import {getToken} from "@/utils/auth";

    export default {
        name: 'TinymceDemo',
        components: { Tinymce },
        data() {
            return {
                content:
                    `<h1>在这里公告</h1>`,
                select: '',
                title:'',
            }
        },
        created(){
          if(this.$route.params.journalId){
              this.fetchContent(this.$route.params.journalId)
              //console.log(this.$route.params.journalId)
          }else {
              this.clean()
          }
          },
        methods:{
            submitJournal(){
                if(this.content!==''&& this.select!==''&& this.title!==''){
                    //FIXME 这边要添加验证 ,暂时先不弄
                    if(this.$route.params.journalId) {
                        updateJournal(this.$route.params.journalId,this.content, this.select, this.title,).then((response)=>{
                            this.$notify({
                                title: '修改提示',
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            })
                        	}).catch(err=>{
                        		console.log(err)
                            this.$notify({
                                title: '修改提示',
                                message: '修改失败',
                                type: 'error',
                                duration: 2000
                            })
                        })
                    }else{
                        patientToAddHistory(this.content, getToken()).then(() => {
                            this.$notify({
                                title: '发表提示',
                                message: '发表成功',
                                type: 'success',
                                duration: 2000
                            })
                            window.location.reload()
                        }).catch(() => {
                            this.$notify({
                                title: '发表提示',
                                message: '发表失败',
                                type: 'error',
                                duration: 2000
                            })
                        })
                    }
                }else{
                    this.$notify({
                        title: '错误',
                        message: '请填写完整',
                        type: 'error',
                        duration: 2000
                    })
                }
            },
            clean() {
                this.content = null;
                this.select = null;
                this.title = null;
            },
            fetchContent(journalId){
                fetchJournalContent(journalId).then((response)=>{
                    this.content = response.data.content
                    this.select = response.data.select
                    this.title = response.data.title
                		console.log(response.data)
                	}).catch(err=>{
                		console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    /*.editor-content{*/
        /*margin-top: 20px;*/
    /*}*/
    .components-container{
        width:100%;
        margin:auto;
    }
    .main {
        width:100%;
        text-align: center;
    }
    .el-select {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>

