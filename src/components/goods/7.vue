<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
        v-for="book in goodsList"
        :key="book.book_id"
      >
        <!-- Book card -->
        <el-card
          class="book_card"
          shadow="hover"
          :body-style="{ padding: '10px' }"
          @click.native="handleCustomize(book)"
        >
          <!-- Book image -->
          <el-image :src="book.url" fit="fill" />
          <!-- Book name & Description -->
          <div style="padding: 10px">
            <p class="title">{{ book.book_name }}</p>
            <p class="descrip">{{ book.book_des }}</p>
            <div>
              <p class="cate">Age {{ book.book_category }}</p>
              <p class="price">${{ book.book_price }}CAD</p>
            </div>
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
      category_id: "",
      goodsList: [],
    };
  },

  created() {
    this.category_id = this.$route.query.id;
    this.getGoodsList();
  },

  methods: {
    async getGoodsList() {
      const res = await this.$http.get("book/findByCateId/3");
      this.goodsList = res.data;
      //process data
      for (let i = 0; i < this.goodsList.length; i++) {
        if (this.goodsList[i].book_des.length > 150) {
          this.goodsList[i].book_des =
            this.goodsList[i].book_des.slice(0, 150) + "..";
        }
        this.goodsList[i].book_category = "6+";
        if (!this.goodsList[i].sale) {
          this.goodsList.splice(i, 1);
          i--;
        }
      }
    },

    handleCustomize(book) {
      this.$router.push({
        path: "/customize",
        query: { bookId: book.book_id },
      });
    },
  },
};
</script>

<style lang="less" scoped>
//import google font
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Proza+Libre&display=swap");

.main {
  margin: 5% 0 0 0;
  width: 100%;
}

p {
  margin-top: 0px;
  margin-bottom: 10px;
}

.el-divider {
  margin-top: 50px;
}

.el-select {
  padding-left: 5%;
  padding-bottom: 5%;
}

// .el-image {
//   width: 100%;
//   display: block;
// }

// .book_card {
//   display: flex;
//   margin-bottom: 20px;
// }

.book_card {
  display: flex;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
  .img {
    width: 90%;
    height: 90%;
    padding-left: 5%;
  }
}

.title {
  font-family: "Proza Libre", sans-serif;
  text-align: left;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  color: #00294c;
  letter-spacing: -0.5px;
}

.descrip {
  color: #808080;
  font-size: 14px;
  letter-spacing: -0.5px;
  height: 50rpx;
}

.cate {
  display: inline;
  float: left;
  font-size: 14px;
  color: #737373;
}

.price {
  display: inline;
  float: right;
  font-size: 14px;
  font-weight: bold;
  color: #2cb492;
  letter-spacing: -0.5px;
}
</style>
