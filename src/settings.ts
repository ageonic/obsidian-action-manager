import { App, PluginSettingTab, Setting, TAbstractFile, TFolder } from "obsidian";
import { Action, Meta } from "./core/types";
import ActionManager from "./main";

export interface ActionManagerSettings {
    directories: {
        [Action.Task]: string;
        [Action.Activity]: string;
        [Action.Reminder]: string;
        [Action.FollowUp]: string;
        [Meta.Organization]: string;
        [Meta.Individual]: string;
        [Meta.Project]: string;
    }
}

export const DEFAULT_SETTINGS: Partial<ActionManagerSettings> = {
    directories: {
        [Action.Task]: "/",
        [Action.Activity]: "/",
        [Action.Reminder]: "/",
        [Action.FollowUp]: "/",
        [Meta.Organization]: "/",
        [Meta.Individual]: "/",
        [Meta.Project]: "/",
    }
};

export class ActionManagerSettingsTab extends PluginSettingTab {
    plugin: ActionManager;

    constructor(app: App, plugin: ActionManager) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        let { containerEl } = this;

        containerEl.empty();

        Object.keys(this.plugin.settings.directories).forEach(dirType => {
            new Setting(containerEl)
                .setName(dirType)
                .setDesc("Default location for creating files of type " + dirType)
                .addDropdown(dropdown => {
                    this.app.vault.getAllLoadedFiles().filter((f: TAbstractFile) => f instanceof TFolder).forEach(folder => dropdown.addOption(folder.path, folder.path));

                    dropdown
                        .setValue(this.plugin.settings.directories[dirType])
                        .onChange(async (value) => {
                            this.plugin.settings.directories[dirType] = value;
                            await this.plugin.saveSettings();
                        });
                });
        });
    }
}