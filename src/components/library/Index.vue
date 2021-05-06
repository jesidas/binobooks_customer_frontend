<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <!-- aside area -->
        <el-aside width="200px">
          <el-menu
            default-active="2"
            router
          >
            <el-submenu :index="item1.id" :key="item1.id" v-for="item1 in navAside">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item1.name}}</span>
              </template>
              <el-menu-item v-for="item2 in item1.children" :index="'/' + item2.path" :key="item2.id">{{item2.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navAside: [
        {
          id: "1",
          name: "图书管理",
          children: [
            {
              name: "查询图书",
              path: "queryBook",
              id: "1-1",
            },
            {
              name: "添加图书",
              path: "addBook",
              id: "1-2",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
div {
  height: 100%;
}
</style>