<template>
	<div class="page-login">
		<!-- <div class="header-login">
			<h1 class="login"><span>仓库管理系统</span></h1>
			<span class="header-tel">0571-87791393</span>
		</div> -->
		<div class="content">
			<div class="wraper">
				<div class="wraper-login">
					<div class="login-content">
						<template>
              <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
                <h3 class="title">万全商城登录</h3>
                <el-form-item prop="account">
                  <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                  <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
                <el-form-item style="width:100%;">
                  <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
                  <!-- <el-button @click.native.prevent="handleReset2">重置</el-button> -->
                </el-form-item>
              </el-form>
          </template>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-login">
			<p>Copyright &copy; 速配平台</p>
		</div>
	</div>
</template>


<script>
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/permiss');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              //NProgress.done();
              let { msg, code, user } = data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ path: '/permiss' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    // margin: 180px auto;
    width: 280px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
<style lang="css" scoped>
	input[placeholder],
[placeholder],
*[placeholder] {
  color: #999;
}
.page-login {
  height: auto;
  overflow: hidden;
}
.page-login .header-login {
  height: 50px;
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0 20px;
}
.page-login .header-login .login {
  display: inline-block;
  line-height: 50px;
  padding-left: 155px;
  background: url(../assets/logo_01.png) no-repeat left center;
}
.page-login .header-login .login span {
  display: inline-block;
  border-left: 1px solid #d1d1d1;
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  margin-top: 5px;
  font-size: 24px;
  color: #333;
}
.page-login .header-login .header-tel {
  display: inline-block;
  float: right;
  height: 50px;
  line-height: 50px;
  color: #ff9f74;
  font-size: 24px;
  padding-left: 35px;
  background: url(../assets/icon_tel_01.png) no-repeat left center;
}
.page-login .content {
  height: 540px;
  min-width: 1200px;
  overflow: hidden;
  background: url(../assets/bg_01.png) repeat-x center;
}
.page-login .content .wraper {
  width: 1200px;
  height: 100%;
  background: url(../assets/bg_02.png) no-repeat center center;
  margin: 0 auto;
  overflow: hidden;
}
.page-login .content .wraper .wraper-login {
  height: 359px;
  width: 349px;
  border: 1px solid #e5e5e5;
  background: #f5f5f5;
  margin: 80px auto 0;
  box-shadow: 1px 3px 4px #dcdcdc;
  padding: 10px;
}
.page-login .content .wraper .wraper-login .login-content {
  height: auto;
  overflow: hidden;
  height: 359px;
  width: 349px;
}
.page-login .content .wraper .wraper-login .login-content .form-content {
  padding: 30px 30px 0;
}
.page-login .content .wraper .wraper-login .login-content .form-content h2 {
  font-size: 20px;
  padding-bottom: 15px;
}
.page-login .content .wraper .wraper-login .login-content .form-content .text-error {
  padding: 10px;
  text-align: center;
  font-size: 12px;
  clear: both;
  color: #f97042;
  border: 1px solid #fee7a9;
  border-radius: 4px;
  background: #fffbee;
  margin-bottom: 5px;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-group {
  height: 78px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  background: #fff;
  padding: 10px;
  margin-bottom: 15px;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-group label,
.page-login .content .wraper .wraper-login .login-content .form-content .form-group span {
  display: block;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-group label {
  height: 39px;
  padding-right: 20px;
  background: url(../assets/icon_login.png) no-repeat;
  overflow: hidden;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-group label input {
  display: block;
  width: 100%;
  height: 39px;
  line-height: 40px;
  outline: none;
  font-size: 14px;
  color: #333;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-group .label-user {
  background-position: right 10px;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-group .label-password {
  background-position: right -44px;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-group span {
  height: 1px;
  background: #e2e2e2;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-item {
  height: 50px;
  overflow: hidden;
  margin-bottom: 15px;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-item > span {
  display: block;
  text-align: center;
  padding-top: 10px;
  font-size: 12px;
  color: #999;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-item > span > a {
  color: #333;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-item .btn-login {
  display: block;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background: #5da4f3;
  border: 1px solid #5199ea;
  font-size: 16px;
  color: #fff;
  border-radius: 4px;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-item .label-code {
  display: inline-block;
  float: left;
  width: 130px;
  height: 48px;
  overflow: hidden;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  background: #fff;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-item .label-code input {
  display: inline-block;
  padding: 10px;
  width: 110px;
  height: 28px;
  outline: none;
  font-size: 14px;
  color: #333;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-item > div {
  margin-left: 130px;
  height: 50px;
  line-height: 50px;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-item > div span,
.page-login .content .wraper .wraper-login .login-content .form-content .form-item > div a {
  display: inline-block;
  float: left;
  margin-left: 10px;
  font-size: 14px;
  color: #444444;
  text-decoration: underline;
}
.page-login .content .wraper .wraper-login .login-content .form-content .form-item > div .code-img {
  width: 90px;
  height: 50px;
  background: red;
}
.page-login .footer-login {
  height: auto;
  overflow: hidden;
  text-align: center;
  min-width: 1200px;
}
.page-login .footer-login h3 {
  font-size: 14px;
  font-weight: normal;
  color: #666666;
  margin-bottom: 10px;
}
.page-login .footer-login p {
  font-size: 12px;
  color: #999999;
}

</style>