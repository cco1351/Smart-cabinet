<template>
  <view class="password-page">
    <view class="heading">{{ mode === 'change' ? '修改密码' : '忘记密码' }}</view>
    <view class="intro">{{ mode === 'change' ? '输入原密码后设置新密码。修改成功需重新登录。' : '通过绑定手机号的验证码设置新密码，不需要原密码。' }}</view>
    <view class="card">
      <view class="field-title">手机号</view>
      <input v-model="phone" type="number" maxlength="11" :disabled="mode === 'change'" placeholder="请输入绑定手机号" />
      <template v-if="mode === 'reset'">
        <view class="field-title">短信验证码</view>
        <view class="code-row">
          <input v-model="code" type="number" maxlength="6" placeholder="请输入6位验证码" />
          <button class="code-button" :disabled="sending || countdown > 0" @tap="sendCode">{{ countdown > 0 ? countdown + '秒后重发' : '获取验证码' }}</button>
        </view>
        <view v-if="demoCode" class="demo-note">本地演示验证码：{{ demoCode }}。不会发送真实短信。</view>
      </template>
      <template v-else>
        <view class="field-title">原密码</view>
        <input v-model="oldPassword" password maxlength="64" placeholder="请输入原密码" />
      </template>
      <view class="field-title">新密码</view>
      <input v-model="newPassword" password maxlength="64" placeholder="请输入8至64位新密码" />
      <view class="field-title">确认新密码</view>
      <input v-model="confirmPassword" password maxlength="64" placeholder="请再次输入新密码" />
      <view v-if="error" class="error">{{ error }}</view>
      <button class="submit" :loading="busy" :disabled="busy" @tap="submit">{{ mode === 'change' ? '确认修改' : '确认重置' }}</button>
      <view class="switch" @tap="switchMode">{{ mode === 'change' ? '忘记原密码？使用手机号找回' : '记得原密码？返回修改密码' }}</view>
    </view>
  </view>
</template>
<script>
import {session,changePassword,requestPasswordResetCode,resetPassword,safeReLaunch} from '../../services/auth.js'
export default {
  data:()=>({mode:'change',phone:'',oldPassword:'',code:'',newPassword:'',confirmPassword:'',demoCode:'',error:'',busy:false,sending:false,countdown:0,timer:null}),
  onLoad(query){this.mode=query?.mode==='reset'?'reset':'change';this.phone=session.user?.phone||'';if(this.mode==='change'&&!session.user)uni.redirectTo({url:'/pages/login/index'})},
  onUnload(){if(this.timer)clearInterval(this.timer)},
  methods:{
    switchMode(){this.error='';this.oldPassword='';this.code='';this.demoCode='';this.newPassword='';this.confirmPassword='';if(this.mode==='change')this.mode='reset';else if(session.user)this.mode='change';else uni.redirectTo({url:'/pages/login/index'})},
    async sendCode(){if(this.sending||this.countdown>0)return;this.sending=true;this.error='';try{const result=await requestPasswordResetCode(String(this.phone).trim());this.demoCode=result.demoCode||'';this.countdown=60;if(this.timer)clearInterval(this.timer);this.timer=setInterval(()=>{if(--this.countdown<=0){clearInterval(this.timer);this.timer=null;this.countdown=0}},1000)}catch(e){this.error=e.message}finally{this.sending=false}},
    async submit(){if(this.busy)return;this.busy=true;this.error='';try{
      if(this.mode==='change')await changePassword(this.oldPassword,this.newPassword,this.confirmPassword)
      else await resetPassword(String(this.phone).trim(),String(this.code).trim(),this.newPassword,this.confirmPassword)
      uni.showModal({title:'密码设置成功',content:'请使用新密码重新登录。',showCancel:false,success:()=>safeReLaunch('/pages/login/index')})
    }catch(e){this.error=e.message}finally{this.busy=false}}
  }
}
</script>
<style scoped>
.password-page{padding:48rpx 36rpx;background:#f4f6fb;min-height:100vh;box-sizing:border-box}
.heading{font-size:42rpx;font-weight:700;color:#18243a}
.intro{font-size:26rpx;color:#64748b;line-height:1.6;margin:16rpx 0 32rpx}
.card{background:#fff;border:1px solid #e7eaf2;border-radius:24rpx;padding:32rpx}
.field-title{font-size:26rpx;color:#334155;margin:22rpx 0 12rpx}
input{height:88rpx;border:1px solid #dce1ea;border-radius:14rpx;padding:0 20rpx;font-size:28rpx;box-sizing:border-box}
.code-row{display:flex;gap:12rpx;align-items:center}.code-row input{flex:1;min-width:0}
.code-button{flex:none;font-size:24rpx;color:#4f46e5;background:#eef2ff;margin:0;padding:0 18rpx;line-height:88rpx;height:88rpx}
.code-button[disabled]{color:#94a3b8}.demo-note{font-size:23rpx;color:#8a5800;background:#fff8df;padding:16rpx;margin-top:14rpx;border-radius:12rpx;line-height:1.5}
.error{font-size:25rpx;color:#dc2626;margin-top:22rpx}.submit{background:#4f46e5;color:#fff;margin-top:34rpx}.switch{text-align:center;color:#4f46e5;font-size:26rpx;padding:28rpx 8rpx 4rpx}
</style>
