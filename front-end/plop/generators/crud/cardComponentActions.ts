export const cardComponentActions = (_data: any) => {
    return [
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/card-{{kebabCase entityName}}/Card{{pascalCase entityName}}.tsx',
            templateFile: 'plop/templates/crud/card-component/component.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/card-{{kebabCase entityName}}/index.ts',
            templateFile: 'plop/templates/crud/card-component/index.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/card-{{kebabCase entityName}}/types.ts',
            templateFile: 'plop/templates/crud/card-component/types.hbs',
        }
    ]
}
