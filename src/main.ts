import { Notice, Plugin } from 'obsidian';
import { ActionManagerSettings, ActionManagerSettingsTab, DEFAULT_SETTINGS } from './settings';
import FileGenerator from 'file/fileGenerator';

export default class ActionManager extends Plugin {
	settings: ActionManagerSettings;
	generator: FileGenerator;

	async onload() {
		this.loadSettings();
		this.addSettingTab(new ActionManagerSettingsTab(this.app, this));

		this.generator = new FileGenerator(this);

		new Notice('Loaded!')
	}

	onunload() {
		new Notice('Unloaded!')
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
