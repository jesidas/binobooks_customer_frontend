<template>
    <div class = "main">
        <i class="el-icon-goods"></i>
        <h1>Thank you!</h1>
        <h2>You can download the full story book by clicking the download icon below.</h2>
        <a :href="`${link}`"><i class="el-icon-download"></i></a>
    </div>
</template>

<script>
export default {
    data() {
        return {
        link : '',
        }
    },
    created(){
        this.getLink()
    },
    methods: {
        getLink(){
            this.link = this.$route.query.book_link.data
            console.log(this.link)
        }
    }

}
</script>

<style lang="less" scoped>
.main{
    margin-top: 3%;
    margin-bottom: 10%;
    text-align: center;
    
}

.el-icon-goods{
    font-size: 4rem;
}

.el-icon-download{
    font-size: 5rem;
}

h1{
    font-size: 5rem;
}
</style>