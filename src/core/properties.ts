import { DateField, DateTimeField, LinkField, TextField } from "./fields";

export interface Properties {
    id: TextField,
    createdDate: DateTimeField,
}

export interface ProjectProperties extends Properties {
    organization?: LinkField,
    name: TextField,
    dueDate?: DateField,
    status: TextField,
    closeDate?: DateField,
}

export interface TaskProperties extends Properties {
    project?: LinkField,
    subject: TextField,
    description?: TextField,
    dueDate?: DateField,
    status: TextField,
    closeDate?: DateField,
}

export interface ActivityProperties extends Properties {
    task: LinkField,
}

export interface FollowUpProperties extends Properties {
    person: LinkField,
    related?: LinkField,
    status: TextField,
    closeDate?: DateField,
}

export interface ReminderProperties extends Properties {
    subject: TextField,
    dueDate?: DateField,
    status: TextField,
    closeDate?: DateField,
}

export interface OrganizationProperties extends Properties {
    name: TextField,
}

export interface IndividualProperties extends Properties {
    organization: LinkField,
    name: TextField,
    email?: TextField,
    phone?: TextField,
    title?: TextField,
}

export function renderFields(properties: Properties): Record<symbol, string> {
    return Object.values(properties).map(field => field.render()).reduce((accumulator, field) => {
        return { ...accumulator, [field.label]: field.value }
    }, {});
}