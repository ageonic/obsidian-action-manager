import { TAbstractFile, TFile, TFolder } from "obsidian";
import { Action, Meta } from "./types";

function getAllFilesAndFolders(): TAbstractFile[] {
    return app.vault.getAllLoadedFiles();
}

function getFrontmatterForFile(file: TFile) {
    return app.metadataCache.getFileCache(file)?.frontmatter;
}

export function getAllFiles(): TFile[] {
    return getAllFilesAndFolders().filter(f => f instanceof TFile).map(f => f as TFile);
}

export function getAllFolders(): TFolder[] {
    return getAllFilesAndFolders().filter(f => f instanceof TFolder).map(f => f as TFolder);
}

export function getFileByType(type: Action | Meta): TFile[] {
    return getAllFiles().filter(f =>
        getFrontmatterForFile(f)?.type == type
    )
}