# 榫卯文化旅游网站

一个展示中国传统榫卯工艺和山西文化旅游的网站。

## 功能特点

- 🏛️ **看文物**：展示飞云楼、应县木塔、秋风楼等榫卯建筑
- 🔍 **3D查看器**：360度旋转查看5种经典榫卯结构
- 🗺️ **旅游路线**：黄河之汤、南楼北塔等精品路线
- 🛍️ **文创商品**：榫卯模型、鲁班锁等文创产品
- 📚 **榫卯知识**：详细介绍榫卯历史、种类和应用

## 技术栈

- **后端**：Flask (Python)
- **前端**：HTML5, CSS3, JavaScript
- **3D渲染**：Three.js
- **部署**：Render

## 本地运行

1. 安装依赖：
```bash
pip install -r requirements.txt
```

2. 运行应用：
```bash
python app.py
```

3. 访问：http://localhost:5001

## 部署到 Render

1. 将代码推送到 GitHub
2. 在 Render 创建新的 Web Service
3. 连接 GitHub 仓库
4. Render 会自动检测 `render.yaml` 并部署

## 项目结构

```
.
├── app.py                 # Flask 应用主文件
├── requirements.txt       # Python 依赖
├── render.yaml           # Render 部署配置
├── static/               # 静态资源
│   ├── images/          # 图片文件
│   ├── style.css        # 样式文件
│   ├── main.js          # 主要 JS 文件
│   ├── hotspot.js       # 热区交互
│   └── viewer3d.js      # 3D 查看器
└── templates/            # HTML 模板
    ├── base.html        # 基础模板
    ├── index.html       # 首页
    ├── culture.html     # 看文物
    ├── routes.html      # 旅游路线
    ├── shop.html        # 文创商品
    ├── profile.html     # 个人中心
    └── viewer3d.html    # 3D 查看器

```

## 图片说明

请参考 `图片说明.txt` 文件，将相应的图片放入 `static/images/` 文件夹。

## 许可证

MIT License
