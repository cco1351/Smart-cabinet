// 仅用于本地演示；真实授权、有效期和核销由后续业务接口提供。
export function generateDemoAccessCode(type, name, cabinet) {
  const seed = (type + name + cabinet).split('').reduce((total, char) => total + char.charCodeAt(0), 0)
  return String(seed % 9000 + 1000)
}
