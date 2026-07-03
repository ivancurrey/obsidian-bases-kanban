import type { App } from 'obsidian';
import { Modal } from 'obsidian';
import { CSS_CLASSES } from './constants.ts';

export interface ConfirmModalOptions {
	title: string;
	message: string;
	confirmLabel: string;
	onConfirm: () => void;
}

/** Minimal confirm/cancel dialog for destructive-ish bulk actions. */
export class ConfirmModal extends Modal {
	constructor(
		app: App,
		private readonly options: ConfirmModalOptions,
	) {
		super(app);
	}

	onOpen(): void {
		this.setTitle(this.options.title);
		this.contentEl.createEl('p', { text: this.options.message });

		const actionsEl = this.contentEl.createDiv({ cls: CSS_CLASSES.QUICK_ADD_ACTIONS });
		const cancelBtn = actionsEl.createEl('button', {
			text: 'Cancel',
			attr: { type: 'button' },
		});
		const confirmBtn = actionsEl.createEl('button', {
			text: this.options.confirmLabel,
			cls: 'mod-cta',
			attr: { type: 'button' },
		});

		cancelBtn.addEventListener('click', () => this.close());
		confirmBtn.addEventListener('click', () => {
			this.close();
			this.options.onConfirm();
		});
	}

	onClose(): void {
		this.contentEl.empty();
	}
}
