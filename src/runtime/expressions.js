// 仅解释项目内原型按钮表达式；不使用 eval / Function，兼容小程序运行环境。
import { parse } from 'acorn'
const cache = new Map()
export function runExpression(source, scope, self, event) {
  if (!cache.has(source)) cache.set(source, parse(source, {ecmaVersion:2022,allowReturnOutsideFunction:true}))
  const locals = {event}
  const ref = n => {
    if(n.type==='Identifier') return {get:()=>n.name in locals?locals[n.name]:scope.get(n.name),set:v=>n.name in locals?locals[n.name]=v:scope.set(n.name,v)}
    if(n.type==='MemberExpression'){const obj=walk(n.object),key=n.computed?walk(n.property):n.property.name;return {obj,get:()=>obj?.[key],set:v=>obj[key]=v}}
    throw Error('不支持的赋值表达式：'+n.type)
  }
  function walk(n){
    if(!n)return
    switch(n.type){
      case 'Program':case 'BlockStatement':{let v;for(const s of n.body)v=walk(s);return v}
      case 'ExpressionStatement':return walk(n.expression)
      case 'EmptyStatement':return
      case 'Literal':return n.value
      case 'Identifier':return ref(n).get()
      case 'ThisExpression':return self
      case 'MemberExpression':return ref(n).get()
      case 'ArrayExpression':return n.elements.map(walk)
      case 'ObjectExpression':return Object.fromEntries(n.properties.map(p=>[p.computed?walk(p.key):p.key.name||p.key.value,walk(p.value)]))
      case 'CallExpression':{const r=['Identifier','MemberExpression'].includes(n.callee.type)?ref(n.callee):{get:()=>walk(n.callee)};const fn=r.get();if(typeof fn!=='function')throw Error('未找到交互函数：'+source);return fn.apply(r.obj||self,n.arguments.map(walk))}
      case 'ConditionalExpression':return walk(n.test)?walk(n.consequent):walk(n.alternate)
      case 'IfStatement':return walk(n.test)?walk(n.consequent):walk(n.alternate)
      case 'LogicalExpression':return n.operator==='&&'?(walk(n.left)&&walk(n.right)):n.operator==='||'?(walk(n.left)||walk(n.right)):(walk(n.left)??walk(n.right))
      case 'UnaryExpression':{const v=walk(n.argument);return n.operator==='!'?!v:n.operator==='-'?-v:n.operator==='+'?+v:n.operator==='typeof'?typeof v:undefined}
      case 'BinaryExpression':{const a=walk(n.left),b=walk(n.right);switch(n.operator){case '+':return a+b;case '-':return a-b;case '*':return a*b;case '/':return a/b;case '%':return a%b;case '===':return a===b;case '!==':return a!==b;case '==':return a==b;case '!=':return a!=b;case '>':return a>b;case '<':return a<b;case '>=':return a>=b;case '<=':return a<=b}throw Error('不支持的运算符 '+n.operator)}
      case 'AssignmentExpression':{const r=ref(n.left),v=walk(n.right);return r.set(n.operator==='='?v:n.operator==='+='?r.get()+v:r.get()-v)}
      case 'UpdateExpression':{const r=ref(n.argument),v=r.get();r.set(n.operator==='++'?v+1:v-1);return n.prefix?r.get():v}
      case 'SequenceExpression':{let v;for(const x of n.expressions)v=walk(x);return v}
      case 'VariableDeclaration':for(const d of n.declarations)locals[d.id.name]=walk(d.init);return
      case 'ReturnStatement':return walk(n.argument)
      case 'ArrowFunctionExpression':case 'FunctionExpression':return (...args)=>{n.params.forEach((p,i)=>locals[p.name]=args[i]);return walk(n.body)}
      case 'TemplateLiteral':return n.quasis.map((q,i)=>q.value.cooked+(i<n.expressions.length?walk(n.expressions[i]):'')).join('')
      default:throw Error('尚未适配的交互表达式：'+n.type)
    }
  }
  return walk(cache.get(source))
}
