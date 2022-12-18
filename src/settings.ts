import { getAllFolders } from 'core/describe';
import { Action, Meta } from 'core/types';
import { App, PluginSettingTab, Setting } from 'obsidian';

import ActionManager from './main';

export interface ActionManagerSettings {
    core: {
        [Action.Task]: {
            nameFormat: string,
            defaultLocation: string,
        },
        [Action.Activity]: {
            nameFormat: string,
            defaultLocation: string,
        },
        [Action.Reminder]: {
            nameFormat: string,
            defaultLocation: string,
        },
        [Action.FollowUp]: {
            nameFormat: string,
            defaultLocation: string,
        },
        [Meta.Organization]: {
            nameFormat: string,
            defaultLocation: string,
        },
        [Meta.Individual]: {
            nameFormat: string,
            defaultLocation: string,
        },
        [Meta.Project]: {
            nameFormat: string,
            defaultLocation: string,
        },
    }
}

export const DEFAULT_SETTINGS: Partial<ActionManagerSettings> = {
    core: {
        [Action.Task]: {
            nameFormat: "TSK{YY}{DD}{00}",
            defaultLocation: "/",
        },
        [Action.Activity]: {
            nameFormat: "ACT{YY}{DD}{00}",
            defaultLocation: "/",
        },
        [Action.Reminder]: {
            nameFormat: "RMD{YY}{DD}{00}",
            defaultLocation: "/",
        },
        [Action.FollowUp]: {
            nameFormat: "FLP{YY}{DD}{00}",
            defaultLocation: "/",
        },
        [Meta.Organization]: {
            nameFormat: "ORG{YY}{DD}{00}",
            defaultLocation: "/",
        },
        [Meta.Individual]: {
            nameFormat: "IND{YY}{DD}{00}",
            defaultLocation: "/",
        },
        [Meta.Project]: {
            nameFormat: "PRJ{YY}{DD}{00}",
            defaultLocation: "/",
        },
    }
};

const typeDescribe = {
    [Action.Task]: {
        label: "Task",
        pluralLabel: "Tasks"
    },
    [Action.Activity]: {
        label: "Activity",
        pluralLabel: "Activities"
    },
    [Action.Reminder]: {
        label: "Reminder",
        pluralLabel: "Reminders"
    },
    [Action.FollowUp]: {
        label: "Follow Up",
        pluralLabel: "Follow Ups"
    },
    [Meta.Organization]: {
        label: "Organization",
        pluralLabel: "Organizations"
    },
    [Meta.Individual]: {
        label: "Individual",
        pluralLabel: "Individuals"
    },
    [Meta.Project]: {
        label: "Project",
        pluralLabel: "Projects"
    },
}

export class ActionManagerSettingsTab extends PluginSettingTab {
    plugin: ActionManager;

    constructor(app: App, plugin: ActionManager) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        let { containerEl } = this;

        containerEl.empty();

        Object.keys(this.plugin.settings.core).forEach(coreType => {
            const describe = typeDescribe[coreType as Action | Meta];
            const spec = this.plugin.settings.core[coreType as Action | Meta];

            containerEl.createEl("h2", { text: describe.pluralLabel });

            new Setting(containerEl)
                .setName('Naming Format')
                .setDesc(`This template is used to generate unique IDs for each ${describe.label}. The unique ID is also used as the file name.`)
                .addText(text => text
                    .setValue(spec.nameFormat)
                    .onChange(async (value) => {
                        spec.nameFormat = value;
                        await this.plugin.saveSettings();
                    })
                );

            new Setting(containerEl)
                .setName('Location')
                .setDesc(`The default location for storing ${describe.pluralLabel}.`)
                .addDropdown(dropdown => {
                    getAllFolders().forEach(folder => dropdown.addOption(folder.path, folder.path));

                    dropdown
                        .setValue(spec.defaultLocation)
                        .onChange(async (value) => {
                            spec.defaultLocation = value;
                            await this.plugin.saveSettings();
                        });
                });
        });
    }
}