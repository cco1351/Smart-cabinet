// 原型中的本地日期时间，使用数字参数构造，避免 iOS 对空格格式的解析差异。
export function parsePrototypeDate(value) {
  if (typeof value === 'string') {
    const m = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})[ -](\d{1,2}):(\d{2})(?::(\d{2}))?$/)
    if (m) return new Date(+m[1], +m[2]-1, +m[3], +m[4], +m[5], +(m[6]||0))
  }
  return new Date(value)
}
