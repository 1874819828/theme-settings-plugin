# 任务仪表盘主题设置插件

## 功能概述

为Obsidian的任务仪表盘添加F3快捷键主题设置功能，提供多种预设主题风格和实时预览效果。

## 主要特性

### 🎨 多种主题风格
- **默认主题**: 清爽的蓝白配色
- **深色主题**: 适合夜间使用的深色模式
- **海洋主题**: 清新的蓝色系配色
- **森林主题**: 自然的绿色系配色
- **日落主题**: 温暖的橙色系配色

### ⚡ 快速操作
- **F3快捷键**: 一键打开主题设置
- **实时预览**: 选择主题时即时显示效果
- **一键应用**: 确认切换主题

### 🔧 完整设置
- **主题切换**: 通过设置界面选择主题
- **预览开关**: 控制是否显示预览效果
- **重置功能**: 一键恢复默认设置

## 安装方法

### 1. 下载插件
- 从GitHub仓库下载插件文件
- 或使用Obsidian的社区插件功能安装

### 2. 手动安装
1. 将插件文件解压到 `obsidian/plugins/theme-settings-plugin/` 目录
2. 在Obsidian中启用插件
3. 重新启动Obsidian

### 3. 使用插件
1. 按 `F3` 键打开主题设置
2. 点击喜欢的主题卡片
3. 点击"应用主题"按钮确认

## 文件结构

```
theme-settings-plugin/
├── main.ts              # 主插件文件
├── theme-manager.ts     # 主题管理器
├── theme-selector.js    # 主题选择器UI
├── styles.css           # 样式文件
├── manifest.json        # 插件配置
└── README.md            # 说明文档
```

## 使用说明

### 快捷键操作
- **F3**: 打开主题设置弹窗

### 主题选择
1. 打开主题设置弹窗
2. 点击主题卡片选择
3. 点击"应用主题"确认
4. 或点击"重置默认"恢复默认主题

### 设置选项
在Obsidian设置中可以找到以下选项：
- **当前主题**: 选择预设主题
- **显示主题预览**: 控制是否显示预览
- **重置主题设置**: 恢复默认设置

## 主题定制

### 添加新主题
在 `theme-manager.ts` 中的 `initializeThemes()` 方法中添加新主题：

```typescript
this.themes.set('custom', {
    name: '自定义主题',
    colors: {
        '--primary-color': '#ff0000',
        '--secondary-color': '#00ff00',
        '--background-color': '#ffffff',
        '--surface-color': '#f0f0f0',
        '--text-primary': '#000000',
        '--text-secondary': '#666666',
        '--border-color': '#cccccc',
        '--accent-color': '#ff6600',
        '--warning-color': '#ffcc00',
        '--danger-color': '#ff0000',
        '--info-color': '#0066ff',
        '--success-color': '#00cc00'
    }
});
```

### 自定义颜色
每个主题包含以下CSS变量：
- `--primary-color`: 主色调
- `--secondary-color`: 辅助色
- `--background-color`: 背景色
- `--surface-color`: 表面色
- `--text-primary`: 主要文本色
- `--text-secondary`: 次要文本色
- `--border-color`: 边框色
- `--accent-color`: 强调色
- `--warning-color`: 警告色
- `--danger-color`: 危险色
- `--info-color`: 信息色
- `--success-color`: 成功色

## 注意事项

1. **版本兼容性**: 确保Obsidian版本 >= 0.15.0
2. **插件启用**: 需要在社区插件中启用
3. **重启要求**: 安装后需要重启Obsidian
4. **设置保存**: 主题设置会自动保存到本地存储

## 故障排除

### 插件无法启用
- 检查Obsidian版本是否兼容
- 确认插件文件完整性
- 查看控制台错误信息

### F3快捷键无效
- 检查是否有其他插件占用了F3键
- 尝试重新设置快捷键
- 确认插件已正确安装

### 主题效果不显示
- 检查CSS样式是否正确加载
- 确认主题选择器UI正常显示
- 尝试重置主题设置

## 更新日志

### v1.0.0 (2026-05-16)
- 初始版本发布
- 支持F3快捷键
- 提供5种预设主题
- 完整的主题设置界面

## 开发信息

### 开发环境
- TypeScript 支持
- Obsidian API v0.15.0+
- 模块化架构设计

### 扩展功能
- [ ] 添加更多预设主题
- [ ] 支持自定义主题编辑器
- [ ] 添加主题导入/导出
- [ ] 支持主题分享功能

## 许可证

MIT License

## 贡献指南

欢迎提交Issue和Pull Request来改进这个插件！

1. Fork这个仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个Pull Request

---

**作者**: Zh_Li  
**邮箱**: 61343394+1874819828@users.noreply.github.com