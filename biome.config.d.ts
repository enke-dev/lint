/**
 * Biome configuration module
 *
 * This module provides a TypeScript interface for generating Biome configurations.
 * Biome uses biome.config.json files, so this helper generates the JSON structure.
 *
 * @see https://biomejs.dev/
 */
/**
 * Biome configuration options
 */
export interface Options {
    /**
     * Root directory for the configuration
     * @default false
     */
    root?: boolean;
    /**
     * Additional file patterns to include
     */
    includes?: string[];
    /**
     * Enable or disable specific linter rules
     */
    disableRules?: string[];
}
/**
 * Prepares a Biome configuration
 * The default configuration mirrors the ESLint, Prettier, and Stylelint rules from this package
 *
 * @param options Configuration options
 * @returns A Biome configuration object
 */
export declare const defineConfig: (options?: Options) => {
    root: boolean;
    $schema: string;
    vcs: {
        enabled: boolean;
        clientKind: "git";
        useIgnoreFile: boolean;
        defaultBranch: string;
    };
    files: {
        includes: string[];
    };
    assist: {
        actions: {
            source: {
                organizeImports: "on";
            };
        };
    };
    formatter: {
        enabled: boolean;
        formatWithErrors: boolean;
        indentStyle: "space";
        indentWidth: number;
        lineWidth: number;
        lineEnding: "lf";
    };
    javascript: {
        formatter: {
            quoteStyle: "single";
            jsxQuoteStyle: "double";
            quoteProperties: "asNeeded";
            trailingCommas: "es5";
            semicolons: "always";
            arrowParentheses: "asNeeded";
            bracketSpacing: boolean;
            bracketSameLine: boolean;
        };
    };
    json: {
        formatter: {
            trailingCommas: "none";
        };
        parser: {
            allowComments: boolean;
            allowTrailingCommas: boolean;
        };
    };
    css: {
        formatter: {
            enabled: boolean;
            indentStyle: "space";
            indentWidth: number;
            lineWidth: number;
        };
        linter: {
            enabled: boolean;
        };
    };
    linter: {
        enabled: boolean;
        rules: {
            recommended: boolean;
            complexity: {
                noExtraBooleanCast: "error";
                noUselessCatch: "error";
                noUselessConstructor: "error";
                noUselessLabel: "error";
                noUselessRename: "error";
                noUselessSwitchCase: "error";
                noVoid: "error";
                useFlatMap: "error";
                useLiteralKeys: "error";
                useOptionalChain: "error";
                useSimplifiedLogicExpression: "error";
                noAdjacentSpacesInRegex: "error";
                noCommaOperator: "error";
                useNumericLiterals: "error";
            };
            correctness: {
                noConstAssign: "error";
                noConstantCondition: "error";
                noEmptyPattern: "error";
                noGlobalObjectCalls: "error";
                noInnerDeclarations: "error";
                noInvalidConstructorSuper: "error";
                noSelfAssign: "error";
                noUndeclaredVariables: "error";
                noUnreachable: "error";
                noUnreachableSuper: "error";
                noUnsafeFinally: "error";
                noUnusedLabels: "error";
                noUnusedVariables: "error";
                useIsNan: "error";
                useValidForDirection: "error";
                useYield: "error";
                noInvalidBuiltinInstantiation: "error";
                useValidTypeof: "error";
                noUnusedImports: "error";
            };
            style: {
                noNegationElse: "off";
                noParameterAssign: "off";
                noUnusedTemplateLiteral: "error";
                useBlockStatements: "error";
                useConst: "error";
                useDefaultParameterLast: "error";
                useEnumInitializers: "error";
                useExponentiationOperator: "error";
                useSelfClosingElements: "error";
                useSingleVarDeclarator: "error";
                useTemplate: "error";
                useConsistentArrayType: {
                    level: "error";
                    options: {
                        syntax: "shorthand";
                    };
                };
            };
            suspicious: {
                noAsyncPromiseExecutor: "error";
                noCatchAssign: "error";
                noClassAssign: "error";
                noCompareNegZero: "error";
                noControlCharactersInRegex: "error";
                noDebugger: "error";
                noDoubleEquals: "error";
                noDuplicateCase: "error";
                noDuplicateClassMembers: "error";
                noDuplicateObjectKeys: "error";
                noEmptyBlockStatements: "error";
                noExplicitAny: "warn";
                noExtraNonNullAssertion: "error";
                noFallthroughSwitchClause: "error";
                noFunctionAssign: "error";
                noGlobalAssign: "error";
                noImportAssign: "error";
                noLabelVar: "error";
                noRedeclare: "error";
                noShadowRestrictedNames: "error";
                noSparseArray: "error";
                noUnsafeDeclarationMerging: "error";
                noUnsafeNegation: "error";
                useGetterReturn: "error";
                noWith: "error";
                noVar: "error";
                noConsole: "error";
            };
            nursery: {};
            a11y: {
                noAccessKey: "error";
                noAriaHiddenOnFocusable: "error";
                noAutofocus: "warn";
                noDistractingElements: "error";
                noHeaderScope: "error";
                noNoninteractiveElementToInteractiveRole: "error";
                noNoninteractiveTabindex: "error";
                noPositiveTabindex: "warn";
                noRedundantAlt: "error";
                noRedundantRoles: "error";
                useAltText: "error";
                useAnchorContent: "error";
                useAriaPropsForRole: "error";
                useButtonType: "error";
                useHeadingContent: "error";
                useHtmlLang: "error";
                useIframeTitle: "error";
                useKeyWithClickEvents: "error";
                useKeyWithMouseEvents: "error";
                useValidAnchor: "error";
                useValidAriaProps: "error";
                useValidAriaRole: "error";
                useValidAriaValues: "error";
                useValidLang: "error";
            };
            performance: {
                noAccumulatingSpread: "warn";
                noDelete: "error";
            };
            security: {
                noBlankTarget: "error";
            };
        };
    };
};
declare const _default: {
    root: boolean;
    $schema: string;
    vcs: {
        enabled: boolean;
        clientKind: "git";
        useIgnoreFile: boolean;
        defaultBranch: string;
    };
    files: {
        includes: string[];
    };
    assist: {
        actions: {
            source: {
                organizeImports: "on";
            };
        };
    };
    formatter: {
        enabled: boolean;
        formatWithErrors: boolean;
        indentStyle: "space";
        indentWidth: number;
        lineWidth: number;
        lineEnding: "lf";
    };
    javascript: {
        formatter: {
            quoteStyle: "single";
            jsxQuoteStyle: "double";
            quoteProperties: "asNeeded";
            trailingCommas: "es5";
            semicolons: "always";
            arrowParentheses: "asNeeded";
            bracketSpacing: boolean;
            bracketSameLine: boolean;
        };
    };
    json: {
        formatter: {
            trailingCommas: "none";
        };
        parser: {
            allowComments: boolean;
            allowTrailingCommas: boolean;
        };
    };
    css: {
        formatter: {
            enabled: boolean;
            indentStyle: "space";
            indentWidth: number;
            lineWidth: number;
        };
        linter: {
            enabled: boolean;
        };
    };
    linter: {
        enabled: boolean;
        rules: {
            recommended: boolean;
            complexity: {
                noExtraBooleanCast: "error";
                noUselessCatch: "error";
                noUselessConstructor: "error";
                noUselessLabel: "error";
                noUselessRename: "error";
                noUselessSwitchCase: "error";
                noVoid: "error";
                useFlatMap: "error";
                useLiteralKeys: "error";
                useOptionalChain: "error";
                useSimplifiedLogicExpression: "error";
                noAdjacentSpacesInRegex: "error";
                noCommaOperator: "error";
                useNumericLiterals: "error";
            };
            correctness: {
                noConstAssign: "error";
                noConstantCondition: "error";
                noEmptyPattern: "error";
                noGlobalObjectCalls: "error";
                noInnerDeclarations: "error";
                noInvalidConstructorSuper: "error";
                noSelfAssign: "error";
                noUndeclaredVariables: "error";
                noUnreachable: "error";
                noUnreachableSuper: "error";
                noUnsafeFinally: "error";
                noUnusedLabels: "error";
                noUnusedVariables: "error";
                useIsNan: "error";
                useValidForDirection: "error";
                useYield: "error";
                noInvalidBuiltinInstantiation: "error";
                useValidTypeof: "error";
                noUnusedImports: "error";
            };
            style: {
                noNegationElse: "off";
                noParameterAssign: "off";
                noUnusedTemplateLiteral: "error";
                useBlockStatements: "error";
                useConst: "error";
                useDefaultParameterLast: "error";
                useEnumInitializers: "error";
                useExponentiationOperator: "error";
                useSelfClosingElements: "error";
                useSingleVarDeclarator: "error";
                useTemplate: "error";
                useConsistentArrayType: {
                    level: "error";
                    options: {
                        syntax: "shorthand";
                    };
                };
            };
            suspicious: {
                noAsyncPromiseExecutor: "error";
                noCatchAssign: "error";
                noClassAssign: "error";
                noCompareNegZero: "error";
                noControlCharactersInRegex: "error";
                noDebugger: "error";
                noDoubleEquals: "error";
                noDuplicateCase: "error";
                noDuplicateClassMembers: "error";
                noDuplicateObjectKeys: "error";
                noEmptyBlockStatements: "error";
                noExplicitAny: "warn";
                noExtraNonNullAssertion: "error";
                noFallthroughSwitchClause: "error";
                noFunctionAssign: "error";
                noGlobalAssign: "error";
                noImportAssign: "error";
                noLabelVar: "error";
                noRedeclare: "error";
                noShadowRestrictedNames: "error";
                noSparseArray: "error";
                noUnsafeDeclarationMerging: "error";
                noUnsafeNegation: "error";
                useGetterReturn: "error";
                noWith: "error";
                noVar: "error";
                noConsole: "error";
            };
            nursery: {};
            a11y: {
                noAccessKey: "error";
                noAriaHiddenOnFocusable: "error";
                noAutofocus: "warn";
                noDistractingElements: "error";
                noHeaderScope: "error";
                noNoninteractiveElementToInteractiveRole: "error";
                noNoninteractiveTabindex: "error";
                noPositiveTabindex: "warn";
                noRedundantAlt: "error";
                noRedundantRoles: "error";
                useAltText: "error";
                useAnchorContent: "error";
                useAriaPropsForRole: "error";
                useButtonType: "error";
                useHeadingContent: "error";
                useHtmlLang: "error";
                useIframeTitle: "error";
                useKeyWithClickEvents: "error";
                useKeyWithMouseEvents: "error";
                useValidAnchor: "error";
                useValidAriaProps: "error";
                useValidAriaRole: "error";
                useValidAriaValues: "error";
                useValidLang: "error";
            };
            performance: {
                noAccumulatingSpread: "warn";
                noDelete: "error";
            };
            security: {
                noBlankTarget: "error";
            };
        };
    };
};
export default _default;
