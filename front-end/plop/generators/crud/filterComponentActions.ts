export const filterComponentActions = (_data: any) => {
    return [
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/filter/Filter.tsx',
            templateFile: 'plop/templates/crud/filter-component/viewmodel.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/filter/Filter.model.ts',
            templateFile: 'plop/templates/crud/filter-component/model.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/filter/Filter.view.tsx',
            templateFile: 'plop/templates/crud/filter-component/view.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/filter/index.ts',
            templateFile: 'plop/templates/crud/filter-component/index.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/filter/schema.ts',
            templateFile: 'plop/templates/crud/filter-component/schema.hbs',
        },
        {
            type: 'add',
            path: 'src/pages/{{pascalCase entityName}}/components/filter/types.ts',
            templateFile: 'plop/templates/crud/filter-component/types.hbs',
        }
    ]
}
