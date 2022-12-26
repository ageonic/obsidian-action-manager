import { parseYaml, stringifyYaml, TFile } from "obsidian";

export default class FrontMatterParser {
    rawContent: string;
    frontMatterFound: boolean;
    data: Record<string, string>;

    constructor() {
        this.frontMatterFound = false;
        this.rawContent = '';
        this.data = {};
    }

    public async load(filePath: string) {
        const f = app.vault.getAbstractFileByPath(filePath) as TFile;
        this.rawContent = await app.vault.read(f);
        const fm = app.metadataCache.getFileCache(f)?.frontmatter;

        if (fm) {
            this.frontMatterFound = true;
            const start = fm?.position.start.line;
            const end = fm?.position.end.line;

            const lines = this.rawContent.split('\n')
            const yamlText = lines.slice(start + 1, end);
            this.data = parseYaml(yamlText.join('\n'));
        }
    }

    addProperty(key: string, value: string) {
        this.data[key] = value;
    }

    addAllProperties(obj: Record<string, string>) {
        this.data = {...this.data, ...obj};
    }

    buildContent() {
        if (Object.keys(this.data).length === 0) return this.rawContent;

        if (this.frontMatterFound)
            return this.rawContent.replace(/---((.|\n)*?)---/g, `---\n${stringifyYaml(this.data)}---`);
        
        return `---\n${stringifyYaml(this.data)}---\n${this.rawContent}`;
    }
}