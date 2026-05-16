class ThemeColorManager {
    constructor(plugin) {
        this.plugin = plugin;
        this.themes = new Map();
        this.currentTheme = 'default';
        this.settings = {
            customColors: {},
            selectedTheme: 'default',
            showPreview: true
        };
        
        this.initializeThemes();
    }

    initializeThemes() {
        // 预设主题风格
        this.themes.set('default', {
            name: '默认主题',
            colors: {
                '--primary-color': '#4a90e2',
                '--secondary-color': '#6c757d',
                '--background-color': '#ffffff',
                '--surface-color': '#f8f9fa',
                '--text-primary': '#212529',
                '--text-secondary': '#6c757d',
                '--border-color': '#dee2e6',
                '--accent-color': '#28a745',
                '--warning-color': '#ffc107',
                '--danger-color': '#dc3545',
                '--info-color': '#17a2b8',
                '--success-color': '#28a745'
            }
        });

        this.themes.set('dark', {
            name: '深色主题',
            colors: {
                '--primary-color': '#4a90e2',
                '--secondary-color': '#6c757d',
                '--background-color': '#1a1a1a',
                '--surface-color': '#2d2d2d',
                '--text-primary': '#ffffff',
                '--text-secondary': '#b0b0b0',
                '--border-color': '#404040',
                '--accent-color': '#28a745',
                '--warning-color': '#ffc107',
                '--danger-color': '#dc3545',
                '--info-color': '#17a2b8',
                '--success-color': '#28a745'
            }
        });

        this.themes.set('ocean', {
            name: '海洋主题',
            colors: {
                '--primary-color': '#0066cc',
                '--secondary-color': '#003d7a',
                '--background-color': '#f0f8ff',
                '--surface-color': '#e6f3ff',
                '--text-primary': '#003d7a',
                '--text-secondary': '#0066cc',
                '--border-color': '#b3d9ff',
                '--accent-color': '#00cc66',
                '--warning-color': '#ffcc00',
                '--danger-color': '#ff4444',
                '--info-color': '#0099ff',
                '--success-color': '#00cc66'
            }
        });

        this.themes.set('forest', {
            name: '森林主题',
            colors: {
                '--primary-color': '#228b22',
                '--secondary-color': '#006400',
                '--background-color': '#f5fff5',
                '--surface-color': '#e8ffe8',
                '--text-primary': '#006400',
                '--text-secondary': '#228b22',
                '--border-color': '#90ee90',
                '--accent-color': '#32cd32',
                '--warning-color': '#ff8c00',
                '--danger-color': '#dc143c',
                '--info-color': '#4169e1',
                '--success-color': '#32cd32'
            }
        });

        this.themes.set('sunset', {
            name: '日落主题',
            colors: {
                '--primary-color': '#ff6b35',
                '--secondary-color': '#f7931e',
                '--background-color': '#fff5f0',
                '--surface-color': '#ffe8d6',
                '--text-primary': '#8b4513',
                '--text-secondary': '#ff6b35',
                '--border-color': '#ffb366',
                '--accent-color': '#ff4757',
                '--warning-color': '#ffa502',
                '--danger-color': '#ff3742',
                '--info-color': '#3742fa',
                '--success-color': '#2ed573'
            }
        });
    }

    getThemeColors(themeName) {
        return this.themes.get(themeName) || this.themes.get('default');
    }

    getCurrentTheme() {
        return this.getThemeColors(this.currentTheme);
    }

    applyTheme(themeName) {
        const theme = this.getThemeColors(themeName);
        if (!theme) return false;

        this.currentTheme = themeName;
        this.settings.selectedTheme = themeName;

        // 应用CSS变量到文档根元素
        const root = document.documentElement;
        
        // 移除所有旧的CSS变量
        Object.keys(theme.colors).forEach(property => {
            root.style.removeProperty(property);
        });

        // 应用新的CSS变量
        Object.entries(theme.colors).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });

        // 应用主题样式
        this.applyThemeStyles();

        // 保存设置
        this.saveSettings();
        
        return true;
    }

    applyThemeStyles() {
        // 应用主题特定的样式
        const style = document.createElement('style');
        style.id = 'theme-settings-styles';
        style.textContent = `
/* 主题增强样式 */
.task-dashboard {
    background-color: var(--surface-color);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.task-card {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
}

.task-card:hover {
    border-color: var(--primary-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.task-priority-high {
    border-left: 4px solid var(--danger-color);
}

.task-priority-medium {
    border-left: 4px solid var(--warning-color);
}

.task-priority-low {
    border-left: 4px solid var(--success-color);
}

.task-status-done {
    opacity: 0.6;
    text-decoration: line-through;
}

.task-status-progress {
    background-color: var(--accent-color);
    color: white;
}

.task-status-todo {
    background-color: var(--info-color);
    color: white;
}
        `;
        
        // 移除旧的样式
        const oldStyle = document.getElementById('theme-settings-styles');
        if (oldStyle) {
            oldStyle.remove();
        }
        
        document.head.appendChild(style);
    }

    addCustomTheme(name, colors) {
        this.themes.set(name, {
            name: name,
            colors: { ...colors }
        });
        this.saveSettings();
    }

    getAvailableThemes() {
        return Array.from(this.themes.keys()).map(key => ({
            id: key,
            name: this.themes.get(key).name,
            colors: this.themes.get(key).colors
        }));
    }

    saveSettings() {
        if (this.plugin.saveData) {
            this.plugin.saveData(this.settings);
        }
    }

    loadSettings() {
        if (this.plugin.loadData) {
            const saved = this.plugin.loadData();
            if (saved) {
                this.settings = { ...this.settings, ...saved };
                this.currentTheme = saved.selectedTheme || 'default';
            }
        }
    }
}

module.exports = ThemeColorManager;