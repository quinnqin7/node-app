<template>
    <div class="mainmenu">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>
        <div class="rightContainer">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

import HeadNav from '../components/HeadNav'
import LeftMenu from '../components/LeftMenu'
export default {
    name:"mainmenu",
    components:{
        HeadNav,
        LeftMenu
    }
}
</script>

<style scoped>
.mainmenu{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 200px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>


