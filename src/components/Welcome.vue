
<template>
  <div>
    <el-carousel type = "card" height="400px" :interval = 5000>

      <el-carousel-item type v-for="good in goodsList" :key="good.book_id">
        <el-image
          style="width: 100%; height: 100%"
          :src="good.url"
          fit="contain"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
      <el-divider><em class="el-icon-s-shop"></em></el-divider>
      <h1 class = "h1-intro">
        Explore Binobooks
      </h1>
      <p class = "p-intro">
        Welcome to BinoBooks. We are here to serve you, our loyal clients, and keep you coming back for more. 
        Browse our website to find the most recent products, all of which are easy to download straight to your device. 
        If you have any questions or requests, please do not hesitate to reach out and a member of our team will be more than happy to accommodate you.
      </p>
      <el-row >
        <el-col  :xs="24"
        :sm="18"
        :md="12"
        :lg="8"
        :xl="4" v-for="good in goodsList" :key="good.book_id">
          <!-- Book card -->
          <el-card
            class="good_card"
            shadow="hover"
            @click.native = "handleCustomize(good)"
            :body-style="{ padding: '5%', height: '320rpx' }"
          >
            <!-- Book image -->
            <el-image class="prod-img"
              :src="good.url"
              fit="cover"
            />
            <!-- Book name & Description -->
            <div class = "prod-info">
              <p class = "prod-name">{{ good.book_name }}</p>
              <div class="prod-des">
                <p>{{ good.book_des }}</p>
              </div>
            </div>
            <div >
              <el-button type="warning" @click="handleCustomize(good)" >
                Personalize
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
  </div>
  
</template>
 
  

<script>
export default {
  data() {
    return {
      goodsList: [
      ],
      
    };
    
    
  },
  created(){
    this.getGoodsList()
    
  },



  methods: {
    async getGoodsList(){
      const res = await this.$http.get('book/books')
      this.goodsList= res.data.slice(0,5)
      for (let i = 0; i< this.goodsList.length; i++) {
        if (this.goodsList[i].book_des.length > 50){
          this.goodsList[i].book_des = this.goodsList[i].book_des.slice(0, 50) + '...'
        }
        if(!this.goodsList[i].sale){
          this.goodsList.splice(i,1)
          i--
        }
      }
      
    },
    handleCustomize(good) {
      this.$router.push({path: '/customize', query: {bookId: good.book_id}})
    },
  },
      
};
</script>

<style lang="less" scoped>


.block{
  font-family : 'Raleway', sans-serif;
}

.el-carousel {
  padding-top : 50px;
  padding-bottom: 50px;
}
.el-image{
  width: 100%;
}
.p-intro{
  text-align : center; 
  padding-right: 20%;
  padding-left: 20%;
  color: rgb(38,63,91);
  letter-spacing: 0.8px;
  padding-bottom: 80px;
}
.h1-intro {
  text-align : center; 
  color: rgb(38,63,91);
  font-family: 'cormorant garamond light',serif;
  font-size: 50px;
}



.p-prod {
  text-align: left;
  color : rgb(38,63,91);
  font-size: 10px;
  letter-spacing: 0.8px;
}


.el-row {
  margin-left :auto;
  margin-right: auto;
}

.el-card {
  margin : 0 5% 0 5%;
}

.book_card {
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  :hover{
    cursor: pointer;
  }
  .prod-img {
    width: 90%;
    height: 90%;
    padding-left: 5%;
  }
}


.prod-img{
  height : 200px;

}

.prod-info{
  margin : 10% 10% 0 10%;
  color: rgb(38,63,91);  
}

.prod-name{
  padding-bottom: 5%;
  border-bottom: 1px solid black;
  font-size : 20px;
}

.prod-des{
  font-size: 14px;
  height: 60px;
}


.el-button{

  margin: 0 10% 0 10%;
  padding: 3% 5%;
  transition-duration: 0.4s;

}


</style>