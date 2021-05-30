<template>
    <div>
        <h2 class="title">{{message}}</h2>
        <button @click="btnclick">按钮</button>
        <h2>{{name}}</h2>
        <Cpn></Cpn>
    </div>
</template>

<script>
import Cpn from './Cpn';

export default {
    name:'App',
    components:{
        Cpn,
    },
    data(){
        return {
            message:'hello webpack',
            name:'lhd'
        }
    },
    methods:{
        btnclick(){
            console.log("btnclick");
        }
    },
}
</script>

<style scope>
    .title{
        font-size: 50px;
        color: blue;
    }
</style>