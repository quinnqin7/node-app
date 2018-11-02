<template>
    <div>hahahahahaahahahah</div>
</template>

<script>
    //import store from './store'
	import {getToken} from "../../../utils/auth";

    export default {
		name: "mailjump",
        created(){
            var token = this.$route.params.token
		    console.log(this.$route.params.token)
            this.$store.dispatch("MailJump",token).then(
                ()=>{
                    window.location="http://localhost:9528/#/appointment/appointment"
                }
            )
            console.log(getToken())
        },
	}
</script>

<style scoped>

</style>
