
<template>
  <div>
    <!-- book review area -->
    <el-row :gutter = 2 class = "main">
    <el-col :span = 15>
      <div>
        <el-carousel height="600px" width = "600px" >
          <el-carousel-item>
            <el-image
              style="width: 100%; height: 100%"
              :src="bookInfo.url"
              fit="contain"
            ></el-image>
          </el-carousel-item>
        </el-carousel>  
      </div>
    </el-col>
    <el-col :span = 7 :push = 1>
      <el-row >
          <div class = "title">{{bookInfo.book_name}}</div>
      </el-row>
      <el-row >
          <div class = "descrip">{{bookInfo.book_des}}</div>
      </el-row>
      <el-row >
          <div class = "cate"> Recommanded for ages {{bookInfo.book_category}}</div>
      </el-row>
      <el-row >
          <div class = "price"> {{bookInfo.book_price}}</div>
      </el-row>
    </el-col>
    </el-row>
    
    
    
    <div class = "customization">
      <el-row>
        <div class = "cus-text"> 
        Create and preview the child's book
        </div>
      </el-row>
      <el-row :gutter = 20 class = "selection">
        <el-col :span = 3.5>
          Name
          <el-input 
          v-model="input" 
          :disabled = !bookInfo.sale
          placeholder="">
          </el-input> 
        </el-col>
        <el-col :span = 3.5>
          <div>Skin Tone</div>
          <el-select 
          v-model="selectedSkinTone" 
          placeholder=""
          :disabled = !bookInfo.sale
          >
            <el-option
              v-for="item in availableSkinTone"
              :key="item.characters_id"
              :label="item.description"
              :value="item.characters_id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span = 3.5>
          <div>Hair Color</div>
          <el-select 
          v-model="selectedHairColor" 
          placeholder=""
          :disabled = !bookInfo.sale
          >
            <el-option
              v-for="item in availableHairColor"
              :key="item.characters_id"
              :label="item.description"
              :value="item.characters_id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span = 3.5 :push = 2 class = "cus-padding">
          <el-button :disabled = !bookInfo.sale type="primary" style="background-color: #2cb492" @click = "handlePreview">Preview the Book</el-button> 
        </el-col>  
        <el-col :span = 3.5 :push = 2 class = "cus-padding">
          <el-button :disabled = !bookInfo.sale type="primary" style="background-color: #2cb492" @click = "handleCart">Add to Cart</el-button> 
        </el-col>  
      </el-row>
      
      
    </div>
    

  </div>
</template>




<script>
export default {
  data() {
    return {
      bookId : [],
      bookInfo: [],
      selectedSkinTone: '',
      availableSkinTone: [],
      selectedHairColor:'',
      availableHairColor:[],
      input: '',

    };
  },
  created() {
    this.getBookId();
    this.getGoodsList();
  },
  methods: {
    async getGoodsList(){
      //fetch book infomation
      const res = await this.$http.get('book/findById/'+ this.bookId)
      //exception
      if (res.status != 200){
        this.$message.error('Failed!')
      }
      this.bookInfo = res.data
      console.log(this.bookInfo)
      //fetch character styles
      const res2 = await this.$http.get('character/bookId/'+ this.bookId)
      const styles = res2.data
      for (var i = 0; i < styles.length; i++){
        const style = styles[i]
        if (style.basic_id == 1){
          this.availableHairColor.push(style)

        } else{
          this.availableSkinTone.push(style)
        }
      }

      // translate book_category
      switch(this.bookInfo.book_category) {
        case 1:
          this.bookInfo.book_category = "0 to 3"
          break;
        case 2:
          this.bookInfo.book_category = "3 to 6"
          break;
        default:
          this.bookInfo.book_category = "6+"
      }

      if (!this.bookInfo.sale == true){
        this.bookInfo.book_price = "Sold Out!";
      } else{
        this.bookInfo.book_price = "$" + this.bookInfo.book_price + " CAD"
      }
    },
    getBookId(){
      this.bookId = this.$route.query.bookId
    },
    async handlePreview(){
      if (this.selectedSkinTone == "" || this.selectedHairColor == ""){
        this.$message.error('Please Make Selection!')
      } else if (this.input == "" ) {
        this.$message.error('Please Input Character Name!')
      } else{
        var selection = {
          characterId1: this.selectedHairColor,
          characterId2: this.selectedSkinTone,
          bookId: this.bookId,
          name: this.input,
        };
        
        const sampleUrl = await this.$http.post('/customize/custPre/', selection);
        if (sampleUrl.status !== 200)
          return this.$message.error('Fail to generate preview image!')
        this.$router.push({path: '/preview', query: {url:sampleUrl, selected: selection}})
      }
    },

    handleCart(){
      var bookId = this.bookInfo.book_id.toString();
      if (!localStorage.cart){
        localStorage.cart = bookId;
        this.$message.success('Add to Cart Successfully.')
      } else{
        var cart = localStorage.cart.split(' ')
        if (!cart.includes(bookId)){
          localStorage.cart = localStorage.cart + ' ' + bookId
          this.$message.success('Add to Cart Successfully.')
        } else{
          this.$message.warning('Product is Already in Cart!')
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
//import google font
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Proza+Libre&display=swap');


.el-main{
  padding : 0px;
}

.el-image__placeholder {
  background: el-icon-loading no-repeat 50% 50% !important;
  background-size: 50% !important;
}


.main{
  margin-bottom : 20px;
  margin-top : 20px;
}

.descrip{
  text-align: center;
}

.grid{
  margin-top : 3%;
  margin-bottom: 3%;
}

.title{
  font-family:   'Proza Libre', sans-serif;;
  text-align: left;
  font-weight: bold;
  font-size: 30px;
  margin-top: 10px;
  color: #00294c;

}

.descrip{
  font-family : sans-serif;
  text-align: left;
  margin-top: 30px;
  color : #6B7A8C;
}

.cate{
  padding-top: 20px;
  color: #6B7A8C;
}

.price{
  font-family : sans-serif;
  color:#2cb492;
  font-weight:bold;
  font-size: 20px;
  margin-top: 20px;



}
.customization{
  font-family : sans-serif;
  height : 25%;
  border-radius: 25px;
  border: 2px solid #d8d4c7;
  padding: 20px 150px 20px 150px  ;
  background-color: #f5f5f0;
}

.cus-text{
  font-family: 'Nunito Sans', sans-serif;
  font-weight: bold;
  font-size: 18px;
  color: #00294c;
  margin: 0 0 30px 0 ;

}

.selection{
  color:#6B7A8C; 

}

.cus-padding{
  padding-top: 22px;
  
}
</style>