export const updateDialogActions = (_data: any) => {
    return [
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/update-{{kebabCase entityName}}-dialog/Update{{pascalCase entityName}}Dialog.tsx',
            templateFile: 'plop/templates/crud/update-dialog/viewmodel.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/update-{{kebabCase entityName}}-dialog/Update{{pascalCase entityName}}Dialog.model.ts',
            templateFile: 'plop/templates/crud/update-dialog/model.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/update-{{kebabCase entityName}}-dialog/Update{{pascalCase entityName}}Dialog.view.tsx',
            templateFile: 'plop/templates/crud/update-dialog/view.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/update-{{kebabCase entityName}}-dialog/index.ts',
            templateFile: 'plop/templates/crud/update-dialog/index.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/update-{{kebabCase entityName}}-dialog/schema.ts',
            templateFile: 'plop/templates/crud/update-dialog/schema.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/update-{{kebabCase entityName}}-dialog/types.ts',
            templateFile: 'plop/templates/crud/update-dialog/types.hbs',
        }
    ]
}
