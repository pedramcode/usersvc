export interface IGroupCreateOrUpdate {
    name: string;
    desc?: string;
    permissions: string[];
}

export interface IGroupAssign {
    username: string;
    groups: string[];
}
