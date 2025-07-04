export interface CrudData {
    entityName: string
    displayName: string
    name: string // Para compatibilidade com service generator
}

export interface PlopAction {
    type: string
    path: string
    templateFile: string
}
