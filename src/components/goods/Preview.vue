<template>
  <div>
    <el-row type = "flex" justify="center" align ="middle" class="image">
        <el-col :span = 20>
        <div>
            <el-carousel height="600px" width = "600px" >
                <el-carousel-item v-for="item in sample_url" :key = item>
                    <el-image
                    style="width: 100%; height: 100%"
                    :src="item"
                    fit="contain"
                    ></el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
        </el-col>
        
    </el-row>
    <el-row type = "flex" justify="end" class = "button" :gutter = 2>
        <el-button type="primary" style="background-color: #2cb492" @click = "handlePurchase">Purchase</el-button> 
    </el-row>

  </div>
</template>

<script>
export default {
    data() {
        return {
            sample_url : [],
            selected : {}, 
        };
    },
    created() {
    this.getBookUrl(); 
    this.getSelected();
    },
    methods: {
        getBookUrl(){
            this.sample_url = this.$route.query.url.data
        },
        getSelected(){
            this.selected = this.$route.query.selected
        },
        async handlePurchase(){
            const bookLink = await this.$http.post('/customize/cust', this.selected);
            console.log(bookLink)
            this.$router.push({path: '/confirmation',query:{book_link: bookLink}})
        },
    }
};


</script>

<style lang="less" scoped>

.image{
    margin: 1% 0;
    width: 100%;
    text-align: center;
}

.button{
    padding-right: 10%;
}
</style>