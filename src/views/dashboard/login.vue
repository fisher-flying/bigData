<template>
  <div class="login-wrapper">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="login-img"><img src='assets/images/login-img.png' width='685' /></div>
          </el-col>
          <el-col :span="8">
            <div class="demo-ruleForm login-container">
              <h3 class="title">
                <p>数字产品</p>
                <p>运营大数据平台</p>
              </h3>
              <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-form">
                <el-form-item prop="account">
                  <el-input type="text" v-model="loginForm.account" auto-complete="off">
                    <s class="fa fa-user" slot="prepend"></s>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="loginForm.password" auto-complete="off" @keyup.enter.native="submitForm('loginForm')">
                    <s class="fa fa-lock" slot="prepend"></s>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" :loading="isLoading" @click="submitForm('loginForm')" class="el-button-primary">登录</el-button>
                </el-form-item>
                <el-form-item>
                  <el-checkbox v-model="remPassword">记住密码</el-checkbox>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <p>备案号：京ICP备05067302号 ©2007-2014 All Rights Reserved 版权所有 人民卫生出版社有</p>
      </el-footer>
    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from "axios";
import Cookies from 'js-cookie';

export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      isLoading: false,
      remPassword: true,
      loginForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  mounted(){
    this.getCookie();
  },
  methods: {
    submitForm(from) {
      const self = this;
      if (self.remPassword == true){
        self.setCookie(self.loginForm.account,self.loginForm.password,7)
      }else{
        self.clearCookie();
      }
      this.$refs[from].validate(valid => {
        if (valid) {
          this.isLoading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.isLoading = false;
              this.$router.push({ path: "/overview" });
            })
            .catch(error => {
              this.isLoading = false;
              this.$message({
                type: "error",
                message: error.message
              });
            });
        } else {
          console.log("submit error");
          return false;
        }
      });
    },
    setCookie(name,pwd,exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime + 24 * 60 * 60 * 1000 * exdays);
      Cookies.set("username",name,exdate.toGMTString());
      Cookies.set("password",pwd,exdate.toGMTString());
    },
    getCookie(){
      this.loginForm.account = Cookies.get("username");
      this.loginForm.password = Cookies.get("password");
    },
    clearCookie(){
      Cookies.set("username","",-1);
      Cookies.set("password","",-1);
    }
  }
};
</script>
