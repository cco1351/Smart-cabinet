<template>
 <text v-if="node.kind==='text'" @tap.stop="send('tap')">{{node.text}}</text>
 <text v-else-if="node.kind==='br'">{{'\n'}}</text>
 <input v-else-if="node.kind==='input'" :style="node.style" :value="node.value" :type="node.type==='number'?'number':'text'" :password="node.type==='password'" :placeholder="node.placeholder" :disabled="node.disabled" :maxlength="node.maxlength" @input="send('input',$event.detail.value)" @change="send('change',$event.detail.value)"/>
 <textarea v-else-if="node.kind==='textarea'" :style="node.style" :value="node.value" :placeholder="node.placeholder" :disabled="node.disabled" :maxlength="-1" @input="send('input',$event.detail.value)" @blur="send('change',$event.detail.value)"/>
 <picker v-else-if="node.kind==='select'" :style="node.style" :range="node.options" range-key="label" :value="node.index" :disabled="node.disabled" @change="chooseSelect(Number($event.detail.value))"><view>{{node.text}} ▾</view></picker>
 <picker v-else-if="node.kind==='date'" :style="node.style" :mode="node.type" :value="node.value" :disabled="node.disabled" @change="send('change',$event.detail.value)"><view>{{node.value||node.placeholder||'请选择'}}</view></picker>
 <view v-else-if="node.kind==='check'" :style="node.style" @tap.stop="send('check')"><text :style="{color:node.checked?'#4f46e5':'#94a3b8',fontSize:'19px'}">{{node.type==='radio'?(node.checked?'◉':'○'):(node.checked?'☑':'☐')}}</text></view>
 <image v-else-if="node.kind==='image'" :style="node.style" :src="node.src" mode="aspectFit" @tap.stop="send('tap')"/>
 <video v-else-if="node.kind==='video'" :style="node.style" :src="node.src" controls/>
 <view v-else :style="node.style" :hover-class="node.actionKey&&node.tag==='button'?'native-pressed':'none'" @tap.stop="send('tap')" @touchstart="touch('touchstart',$event)" @touchmove="touch('touchmove',$event)" @touchend="touch('touchend',$event)"><PowerNode v-for="child in node.children" :key="child.key" :node="child" @action="$emit('action',$event)"/></view>
</template>
<script>
// #ifdef MP-WEIXIN
import PowerNode from './PowerNode.vue'
// #endif
export default{name:'PowerNode',
// #ifdef MP-WEIXIN
components:{PowerNode},
// #endif
options:{virtualHost:true,styleIsolation:'shared'},props:{node:{type:Object,required:true}},data:()=>({selectOpen:false}),emits:['action'],methods:{stop(){},toggleSelect(){if(!this.node.disabled)this.selectOpen=!this.selectOpen},chooseSelect(index){const option=this.node.options?.[index];if(!option||option.disabled)return;this.selectOpen=false;this.$emit('action',{key:this.node.key,type:'change',value:index})},send(type,value){const key=this.node.actionKey||this.node.key;const interactive=!!this.node.actionKey||['input','textarea','select','date','check'].includes(this.node.kind);if(!this.node.disabled&&interactive)this.$emit('action',{key,type,value})},touch(type,e){if(this.node.swipe&&this.node.actionKey)this.$emit('action',{key:this.node.actionKey,type,touches:e.touches,changedTouches:e.changedTouches})}}}
</script>
<style>.native-pressed{opacity:.75}.native-select{position:relative;z-index:30}.native-select-options{position:absolute;left:0;right:0;top:100%;max-height:220px;overflow-y:auto;background:#fff;border:1px solid #dce1ea;border-radius:8px;box-shadow:0 8px 20px rgba(15,23,42,.16);z-index:1000}.native-select-option{padding:10px 12px;background:#fff;color:#18233a;font-size:12px}.native-select-option.disabled{color:#cbd5e1}</style>
