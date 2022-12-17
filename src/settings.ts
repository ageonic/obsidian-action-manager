import { Action, Meta } from "./core/types";

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
