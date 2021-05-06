<template>
  <div class = "main">
      <el-row :gutter="20" v-for="book in goodsList" :key="book.book_id">
        <!-- Cart card -->
        <el-card
          class="book_card"
          shadow="hover"
          :body-style="{ padding: '10px'}"
        > 
        
          <el-row class="card-body">
            <el-col :span = "5">
            <!-- Book image -->
            <el-image
              :src="book.url"
              fit="contain"
            />
            </el-col>
            <el-col :span = "16">
            <!-- Book name & Description -->
            <div class = 'card_text'>
            <p class = 'title'>{{ book.book_name }}</p>
            <p class = 'descrip'>{{ book.book_des }}</p>
            <el-button type="danger" class = 'delete' size = 'small' @click="handleDelete(book)">Delete</el-button>
            <el-button type="warning" class = 'personalize' size = "small" @click="handleCustomize(book)" >Personalize</el-button>
            <p class = 'price'>${{book.book_price}}CAD</p>
            </div>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
  </div>
</template>

<script>

export default {

  data() {

    return {
      cart : [],
      goodsList: [
      ],
    }
  },

  created(){
    this.fetchCart()
    this.getGoodsList()
    
    
  },

  methods: {
    async fetchCart(){
      if (localStorage.cart){
        this.cart = localStorage.cart.split(' ')
      } else{
        this.$message.warning('Cart is Empty!');
      }
      
    },
    async getGoodsList(){
        for (let i = 0; i < this.cart.length; i++){
            if (this.cart[i]){
              const res = await this.$http.get('book/findById/' + this.cart[i])
             this.goodsList.push(res.data)
            }    
        }
        
        
        //process data
        for (let i = 0; i< this.goodsList.length; i++) {
            if (this.goodsList[i].book_des.length > 200){
            this.goodsList[i].book_des = this.goodsList[i].book_des.slice(0, 199)
            
            }
            this.goodsList[i].book_category = "6+"
        }
    },

    handleCustomize(book) {
      this.$router.push({path: '/customize', query: {bookId: book.book_id}})
    },

    handleDelete(book){
      this.cart = this.cart.filter(item => item !== book.book_id.toString())
      this.goodsList = [];
      localStorage.clear('cart');
      for (let i = 0; i < this.cart.length; i++){
        if (!localStorage.cart){
          localStorage.cart = this.cart[i]
        } else{
          localStorage.cart = localStorage.cart + ' ' + this.cart[i]
        }       
      }
      this.$message.success('Update Cart Successfully.');
      this.getGoodsList();

    }
    
  },
  
};
</script>

<style lang="less" scoped>

//import google font
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Proza+Libre&display=swap');

.main{
  margin: 5% 0 0 0;
  width: 100%;
  
}


p{
  margin-top: 0px;
  margin-bottom: 10px;
}

.card-body{
  width: 100%;
}

.el-select{
  padding-left : 5%;
  padding-bottom: 5%;

}

.book_card {
  margin-bottom: 20px;
  width: 100%;
}


.el-image {
  width: 100%;
  height: 150px;
}

.title{
  font-family: 'Proza Libre', sans-serif;
  text-align: left;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  color: #00294c;
  letter-spacing: -0.5px;

}

.descrip{
  color: #808080;
  font-size: 14px;
  letter-spacing: -0.5px;
  height : 50px;

}


.delete{
  display: inline;
  

}


.price{ 
  display: inline; 
  float:right;
  font-size: 14px;
  font-weight:bold;
  color:#2cb492;
  letter-spacing: -0.5px;
}
</style>


