import { Properties, renderFields } from "core/properties";
import { Action, Meta } from "core/types";
import ActionManager from "main";
import { normalizePath, Notice } from "obsidian";
import FrontMatterParser from "./frontMatterParser";

const moment = require('moment');

export default class FileGenerator {
    plugin: ActionManager;

    constructor(plugin: ActionManager) {
        this.plugin = plugin;
    }

    private generateFileMeta(fileType: Action | Meta): { id: string, serialNumber: number, path: string } {
        const baseDir = this.plugin.settings.core[fileType].defaultLocation;
        let template = this.plugin.settings.core[fileType].nameFormat;
        const serialNumber = this.plugin.settings.maxAutoNumber[fileType] + 1;

        if (!template.contains('{00}'))
            template = template + '{00}';

        const rendered = template
            .replaceAll('{YYYY}', moment().format('YYYY'))
            .replaceAll('{YY}', moment().format('YY'))
            .replaceAll('{MM}', moment().format('MM'))
            .replaceAll('{DD}', moment().format('DD'))
            .replaceAll('{00}', serialNumber.toString().padStart(2, '0'));

        const id = rendered.split('/').pop();
        const path = normalizePath(`${baseDir}/${rendered}.md`);

        if (!id || !path) {
            new Notice("Action Manager: Encountered unexpected error while generating file identifier");
            throw new Error("Action Manager: Encountered unexpected error while generating file identifier");
        }

        return { id, serialNumber, path };
    }

    private async generateContent(fileType: Action | Meta, props: Properties) {
        const templatePath = this.plugin.settings.core[fileType].templatePath;

        let parser = new FrontMatterParser();

        if (templatePath)
            await parser.load(templatePath);

        parser.addAllProperties(renderFields(props));

        return parser.buildContent();
    }
}
