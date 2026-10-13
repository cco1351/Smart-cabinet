<template><view class="entry"><text>实验室智能柜</text><view>{{ message }}</view><button v-if="failed" @tap="start">重新连接</button></view></template>
<script>
import { refresh, destination, safeReLaunch } from '../../services/auth.js'
export default { data:()=>({message:'正在验证登录状态…',failed:false,busy:false}), onLoad(){this.start()}, methods:{async start(){if(this.busy)return;this.busy=true;this.failed=false;try{const ok=await refresh();safeReLaunch(ok?destination():'/pages/login/index')}catch(e){this.message=e.message;this.failed=true}finally{this.busy=false}}} }
</script>
<style>.entry{padding:160rpx 48rpx;text-align:center}.entry text{font-size:42rpx;font-weight:700}.entry view{margin:40rpx 0;color:#64748b}</style>
