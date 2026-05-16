class ThemeSelectorModal {
    constructor(app, themeManager) {
        this.app = app;
        this.themeManager = themeManager;
        this.modal = null;
        this.themes = this.themeManager.getAvailableThemes();
        this.selectedThemeId = null;
    }

    open() {
        this.createModal();
        this.modal.open();
    }

    createModal() {
        const modalContent = this.createModalContent();
        
        this.modal = this.app.workspace.createModal(modalContent);
        this.modal.titleEl.setText('主题设置 - F3');
        this.modal.titleEl.addClass('theme-selector-title');
        
        this.setupModalContent();
        this.bindEvents();
    }

    createModalContent() {
        return `
<div class="theme-selector-container">
    <div class="theme-grid">
        ${this.themes.map(theme => this.createThemeCard(theme)).join('')}
    </div>
    <div class="theme-actions">
        <button class="mod-cta" id="apply-theme">应用主题</button>
        <button class="mod-cta mod-warning" id="reset-theme">重置默认</button>
    </div>
    <div class="theme-info">
        <p>当前主题: <span id="current-theme">${this.themeManager.getCurrentTheme().name}</span></p>
        <p>按 F3 快速打开主题设置</p>
    </div>
</div>
        `;
    }

    createThemeCard(theme) {
        const isSelected = theme.id === this.themeManager.currentTheme;
        const colors = theme.colors;
        
        return `
<div class="theme-card ${isSelected ? 'selected' : ''}" data-theme-id="${theme.id}">
    <div class="theme-preview" style="
        background-color: ${colors['--background-color']};
        border: 2px solid ${colors['--border-color']};
    ">
        <div class="theme-preview-header" style="background-color: ${colors['--primary-color']}">
            <div class="theme-preview-text" style="color: ${colors['--text-primary']}">任务看板</div>
        </div>
        <div class="theme-preview-content" style="background-color: ${colors['--surface-color']}; color: ${colors['--text-primary']}">
            <div class="task-item" style="border-left: 4px solid ${colors['--success-color']}">高优先级任务</div>
            <div class="task-item" style="border-left: 4px solid ${colors['--warning-color']}">中优先级任务</div>
            <div class="task-item" style="border-left: 4px solid ${colors['--info-color']}">低优先级任务</div>
        </div>
    </div>
    <div class="theme-name">${theme.name}</div>
    <div class="theme-select ${isSelected ? 'active' : ''}">
        ${isSelected ? '✓ 已选择' : '点击选择'}
    </div>
</div>
        `;
    }

    setupModalContent() {
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
.theme-selector-container {
    padding: 20px;
    max-width: 800px;
    max-height: 600px;
    overflow-y: auto;
}

.theme-selector-title {
    text-align: center;
    font-weight: bold;
    color: var(--primary-color);
}

.theme-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
}

.theme-card {
    border: 2px solid var(--border-color);
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: var(--background-color);
}

.theme-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: var(--primary-color);
}

.theme-card.selected {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

.theme-preview {
    border-radius: 6px;
    margin-bottom: 10px;
    overflow: hidden;
    min-height: 120px;
}

.theme-preview-header {
    padding: 8px;
    font-weight: bold;
    text-align: center;
}

.theme-preview-text {
    font-size: 12px;
}

.theme-preview-content {
    padding: 8px;
    font-size: 11px;
}

.theme-preview-content .task-item {
    margin: 4px 0;
    padding: 4px 8px;
    border-radius: 3px;
}

.theme-name {
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--text-primary);
}

.theme-select {
    font-size: 12px;
    color: var(--text-secondary);
    text-align: center;
}

.theme-card.selected .theme-select {
    color: var(--primary-color);
    font-weight: bold;
}

.theme-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.theme-info {
    text-align: center;
    padding: 10px;
    background-color: var(--surface-color);
    border-radius: 6px;
    border: 1px solid var(--border-color);
}

.theme-info p {
    margin: 5px 0;
    font-size: 14px;
}

.theme-info span {
    font-weight: bold;
    color: var(--primary-color);
}
        `;
        this.modal.contentEl.appendChild(style);

        // 绑定事件
        this.bindCardClickEvents();
        this.bindActionButtons();
    }

    bindCardClickEvents() {
        this.modal.contentEl.querySelectorAll('.theme-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.theme-actions')) return;
                
                const themeId = card.dataset.themeId;
                this.selectTheme(themeId);
            });
        });
    }

    bindActionButtons() {
        const applyButton = this.modal.contentEl.getElementById('apply-theme');
        const resetButton = this.modal.contentEl.getElementById('reset-theme');
        
        if (applyButton) {
            applyButton.addEventListener('click', () => {
                this.applySelectedTheme();
            });
        }
        
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetTheme();
            });
        }
    }

    selectTheme(themeId) {
        // 移除所有选中状态
        this.modal.contentEl.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('selected');
            card.querySelector('.theme-select').textContent = '点击选择';
        });
        
        // 选中当前主题
        const selectedCard = this.modal.contentEl.querySelector(`[data-theme-id="${themeId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.querySelector('.theme-select').textContent = '✓ 已选择';
        }
        
        this.selectedThemeId = themeId;
    }

    applySelectedTheme() {
        if (this.selectedThemeId) {
            const success = this.themeManager.applyTheme(this.selectedThemeId);
            if (success) {
                this.app.workspace.getLeaf().setTooltip(`主题已切换到: ${this.themeManager.getCurrentTheme().name}`);
                
                // 关闭模态框
                setTimeout(() => {
                    if (this.modal) {
                        this.modal.close();
                    }
                }, 1000);
            }
        }
    }

    resetTheme() {
        this.themeManager.applyTheme('default');
        this.app.workspace.getLeaf().setTooltip('主题已重置为默认主题');
        
        // 重新渲染主题卡片
        this.modal.close();
        setTimeout(() => {
            this.open();
        }, 500);
    }

    close() {
        if (this.modal) {
            this.modal.close();
        }
    }
}

module.exports = ThemeSelectorModal;