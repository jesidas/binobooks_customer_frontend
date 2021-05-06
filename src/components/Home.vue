<template>
  <div>
    <el-container class="home-container">
      <!-- Header -->
      <el-header>
        <el-menu mode="horizontal" unique-opened router>
          <el-menu-item index="welcome">Home</el-menu-item>
          <el-menu-item index="books">All books</el-menu-item>
          <el-submenu index="booksByAge">
            <template slot="title">Books by age</template>
            <el-menu-item
              v-for="item in navBarContent.children"
              :index="item.index"
              :key="item.category_id"
              >{{ item.category_name }}</el-menu-item
            >
          </el-submenu>
          <el-menu-item index="cart">Cart</el-menu-item>
        </el-menu>
      </el-header>
      <!-- Main content -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- Footer -->
      <el-row :gutter="10" class="footer-distributed">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="footer-left">
          <h3>About<span>Binobooks</span></h3>

          <p class="footer-links">
            <a href="welcome">Home</a>
            |
            <a href="#">Books</a>
          </p>

          <p class="footer-company-name">© 2021 Binobooks ltd.</p>
        </el-col>

        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
          :xl="8"
          class="footer-center"
        >
          <div>
           <i class="el-icon-position"></i>
            <p>
              <span>309 - Rupa Solitaire, Bldg. No. A - 1, Sector - 1</span>
              Mahape, Navi Mumbai - 400710
            </p>
          </div>

          <div>
            <i class="el-icon-mobile"></i>
            <p>+91 22-27782183</p>
          </div>
          <div>
            <i class="el-icon-message"></i>
            <p><a href="mailto:support@eduonix.com">support@eduonix.com</a></p>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
          :xl="8"
          class="footer-right"
        >
          <p class="footer-company-about">
            <span>About the company</span>
            We are binobook cusomized storybook website.
          </p>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartlength: 0,
      navBarContent: {
        id: "3",
        name: "Books by age",
        children: [
          {
            id: "3-1",
            name: "0-3",
            index: "Cate1",
          },
          {
            id: "3-2",
            name: "3-6",
            index: "Cate2",
          },
          {
            id: "3-3",
            name: "6+",
            index: "Cate3",
          },
        ],
      },
      activeIndex: "",
    };
  },
  created() {
    this.getCategory();
  },
  watch: {
    $route(to, from) {
      handler: "resetData";
    },
  },
  methods: {
    async getCategory() {
      const res = await this.$http.get("category/categories");
      let i = 1;
      res.data.forEach((element) => {
        element.index = element.category_id + "-" + i;
        i++;
      });
      console.log(res.data);
      this.navBarContent.children = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

ul {
  justify-content: center;
  display: flex;
}

.icon-warp{
  font-size: 20px;
  
}

.el-icon-message{
  font-size: 20px;
}

.el-header,
.el-menu {
  background-color: white;
  font-weight: bold;
}

element {
  height: 20px;
}

.el-main {
  background-color: #fff;
  padding-top: 0px;
}

@media (max-height: 800px) {
  footer {
    position: static;
  }
  header {
    padding-top: 40px;
  }
}

.footer-distributed {
  background-color: #176f5e;
  box-sizing: border-box;
  width: 100%;
  height: 20%;
  text-align: left;
  font: bold 16px sans-serif;
  padding: 50px 50px 60px 50px;
  margin-top: 80px;

}



/* Footer left */


.footer-distributed h3 {
  color: #ffffff;
  font: normal 36px "Cookie", cursive;
  margin: 0;
}

/* The company logo */



.footer-distributed h3 span {
  color: #e0ac1c;
}

/* Footer links */

.footer-distributed .footer-links {
  color: #ffffff;
  margin: 20px 0 12px;
}

.footer-distributed .footer-links a {
  display: inline-block;
  line-height: 1.8;
  text-decoration: none;
  color: inherit;
}

.footer-distributed .footer-company-name {
  color: #8f9296;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
}

/* Footer Center */



.footer-distributed .footer-center i {
  // background-color: #33383b;
  // color: #ffffff;
  font-size: 20px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  text-align: center;
  line-height: 42px;
  margin: 10px 15px;
  vertical-align: middle;
}

.footer-distributed .footer-center i.fa-envelope {
  font-size: 17px;
  line-height: 38px;
}

.footer-distributed .footer-center p {
  display: inline-block;
  color: #ffffff;
  vertical-align: middle;
  margin: 0;
}

.footer-distributed .footer-center p span {
  display: block;
  font-weight: normal;
  font-size: 14px;
  line-height: 2;
}

.footer-distributed .footer-center p a {
  color: #e0ac1c;
  text-decoration: none;
}

/* Footer Right */

// .footer-distributed .footer-right {
//   width: 30%;
// }

.footer-distributed .footer-company-about {
  line-height: 20px;
  color: #92999f;
  font-size: 13px;
  font-weight: normal;
  margin: 0;
}

.footer-distributed .footer-company-about span {
  display: block;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>