export const createDialogActions = (_data: any) => {
    return [
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/create-{{kebabCase entityName}}-dialog/Create{{pascalCase entityName}}Dialog.tsx',
            templateFile: 'plop/templates/crud/create-dialog/viewmodel.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/create-{{kebabCase entityName}}-dialog/Create{{pascalCase entityName}}Dialog.model.ts',
            templateFile: 'plop/templates/crud/create-dialog/model.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/create-{{kebabCase entityName}}-dialog/Create{{pascalCase entityName}}Dialog.view.tsx',
            templateFile: 'plop/templates/crud/create-dialog/view.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/create-{{kebabCase entityName}}-dialog/index.ts',
            templateFile: 'plop/templates/crud/create-dialog/index.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/create-{{kebabCase entityName}}-dialog/schema.ts',
            templateFile: 'plop/templates/crud/create-dialog/schema.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/create-{{kebabCase entityName}}-dialog/types.ts',
            templateFile: 'plop/templates/crud/create-dialog/types.hbs',
        }
    ]
}
