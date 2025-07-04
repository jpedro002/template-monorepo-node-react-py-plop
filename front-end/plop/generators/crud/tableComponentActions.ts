export const tableComponentActions = (_data: any) => {
    return [
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/table-{{kebabCase entityName}}/Table{{pascalCase entityName}}.tsx',
            templateFile: 'plop/templates/crud/table-component/component.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/table-{{kebabCase entityName}}/index.ts',
            templateFile: 'plop/templates/crud/table-component/index.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/table-{{kebabCase entityName}}/types.ts',
            templateFile: 'plop/templates/crud/table-component/types.hbs',
        }
    ]
}
