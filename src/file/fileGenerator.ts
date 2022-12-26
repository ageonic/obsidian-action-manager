import { Properties, renderFields } from "core/properties";
import { Action, Meta } from "core/types";
import ActionManager from "main";
import FrontMatterParser from "./frontMatterParser";

const moment = require('moment');

export default class FileGenerator {
    plugin: ActionManager;

    constructor(plugin: ActionManager) {
        this.plugin = plugin;
    }

    private generateId(fileType: Action | Meta) {
        let template = this.plugin.settings.core[fileType].nameFormat;
        let serialNumber = this.plugin.settings.maxAutoNumber[fileType] + 1;

        if (!template.contains('{00}'))
            template = template + '{00}';

        return template
            .replace('{YYYY}', moment().format('YYYY'))
            .replace('{YY}', moment().format('YY'))
            .replace('{MM}', moment().format('MM'))
            .replace('{DD}', moment().format('DD'))
            .replace('{00}', serialNumber.toString().padStart(2, '0'));
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
