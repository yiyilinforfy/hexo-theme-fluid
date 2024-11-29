const path = require('path');

hexo.extend.filter.register('after_post_render', function (data) {
  if (!data.index_img) {
    // 使用正则匹配 Markdown 图片语法
    const imgRegex = /!\[.*?\]\((.*?)\)/;
    const match = data.raw.match(imgRegex);

    if (match && match[1]) {
      let imgPath = match[1];

      // 如果是相对路径，转换为绝对路径
      if (imgPath.startsWith('../')) {
        // 获取 Markdown 文件所在目录
        const postDir = path.dirname(data.full_source);
        // 将相对路径转换为绝对路径
        imgPath = path.join(postDir, imgPath);
        // 转换为 URL 路径
        imgPath = path.relative(hexo.source_dir, imgPath).replace(/\\/g, '/');
        imgPath = '/' + imgPath; // 添加前缀以适应 Hexo URL
      }

      // 设置 index_img
      data.index_img = imgPath;
    }
  }
  return data;
});

