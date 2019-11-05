const ignore = [
    /[\/\\]core-js[\/\\]/
]

const presets = [
    [
        '@babel/env',
        {
            corejs: '3.3',
            useBuiltIns: 'usage',
            targets: {
                "esmodules": true
            }
        }
    ]
];

const plugins = [
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    [
        '@babel/plugin-proposal-decorators',
        {
            decoratorsBeforeExport: true
        }
    ]
];

module.exports = { ignore, presets, plugins }
