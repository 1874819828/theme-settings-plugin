import { Plugin } from 'obsidian';
import { ThemeColorManager } from './theme-manager';
import { ThemeSelectorModal } from './theme-selector';

class ThemeSettingsPlugin extends Plugin {
    themeManager: ThemeColorManager;
    themeSelector: ThemeSelectorModal;

    onload() {
        console.log('Theme Settings Plugin loaded');
        
        // 初始化主题管理器
        this.themeManager = new ThemeColorManager(this);
        this.themeManager.loadSettings();
        
        // 应用当前主题
        this.themeManager.applyTheme(this.themeManager.currentTheme);
        
        // 注册F3快捷键
        this.addCommand({
            id: 'open-theme-selector',
            name: '打开主题设置 (F3)',
            callback: () => {
                this.openThemeSelector();
            },
            hotkeys: [
                {
                    modifiers: [],
                    key: 'F3'
                }
            ]
        });

        // 添加设置选项
        this.addSettingTab(new ThemeSettingTab(this.app, this));

        // 监听主题切换
        this.registerEvent(
            this.app.workspace.on('css-change', () => {
                // 处理主题变化
                this.onThemeChange();
            })
        );
    }

    onunload() {
        console.log('Theme Settings Plugin unloaded');
        
        // 清理资源
        this.themeManager = null;
        this.themeSelector = null;
    }

    openThemeSelector() {
        this.themeSelector = new ThemeSelectorModal(this.app, this.themeManager);
        this.themeSelector.open();
    }

    onThemeChange() {
        // 主题变化时的处理逻辑
        const currentTheme = this.themeManager.getCurrentTheme();
        console.log('Theme changed to:', currentTheme.name);
        
        // 可以在这里添加更多的主题变化处理逻辑
    }
}

class ThemeSettingTab extends PluginSettingTab {
    plugin: ThemeSettingsPlugin;

    constructor(app: App, plugin: ThemeSettingsPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: '主题设置' });

        // 添加主题选择设置
        new Setting(containerEl)
            .setName('当前主题')
            .setDesc('选择您喜欢的主题风格')
            .addDropdown(dropdown => {
                dropdown.addOption('default', '默认主题');
                dropdown.addOption('dark', '深色主题');
                dropdown.addOption('ocean', '海洋主题');
                dropdown.addOption('forest', '森林主题');
                dropdown.addOption('sunset', '日落主题');
                dropdown.setValue(this.plugin.themeManager.currentTheme);
                dropdown.onChange((value) => {
                    this.plugin.themeManager.applyTheme(value);
                });
            });

        // 添加主题预览设置
        new Setting(containerEl)
            .setName('显示主题预览')
            .setDesc('在选择主题时显示预览效果')
            .addToggle(toggle => {
                toggle.setValue(this.plugin.themeManager.settings.showPreview);
                toggle.onChange((value) => {
                    this.plugin.themeManager.settings.showPreview = value;
                    this.plugin.themeManager.saveSettings();
                });
            });

        // 添加重置按钮
        new Setting(containerEl)
            .setName('重置主题设置')
            .setDesc('将所有主题设置恢复为默认值')
            .addButton(button => {
                button.setButtonText('重置设置');
                button.onClick(() => {
                    this.plugin.themeManager.settings = {
                        customColors: {},
                        selectedTheme: 'default',
                        showPreview: true
                    };
                    this.plugin.themeManager.applyTheme('default');
                    this.display(); // 刷新设置界面
                });
            });
    }
}

module.exports = ThemeSettingsPlugin;