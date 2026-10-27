// 微信临时媒体路径不会跨重启保留，提交工单前先保存到应用文件目录。
export async function persistSelectedMedia(files) {
  const manager = typeof wx !== 'undefined' && typeof wx.getFileSystemManager === 'function'
    ? wx.getFileSystemManager() : null
  return Promise.all(files.map(async file => {
    const source = file.tempFilePath || file.path
    const type = file.fileType === 'video' || String(file.type || '').startsWith('video/') ? 'video/mp4' : 'image/jpeg'
    let path
    if (manager && typeof manager.saveFile === 'function') {
      path = await new Promise((resolve, reject) => manager.saveFile({
        tempFilePath: source,
        success: result => resolve(result.savedFilePath),
        fail: () => reject(new Error('附件保存失败，请检查存储空间后重新选择'))
      }))
    } else if (source?.startsWith('data:')) {
      path = source
    } else if (typeof FileReader !== 'undefined' && typeof fetch === 'function') {
      // 浏览器演示将文件转换为可持久保存的内容，而不是保存临时 blob 地址。
      const response = await fetch(source)
      const blob = await response.blob()
      path = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('附件读取失败，请重新选择'))
        reader.readAsDataURL(blob)
      })
    } else {
      throw new Error('当前环境无法保存附件')
    }
    return { ...file, name: file.name || source.split('/').pop(), path, type }
  }))
}
