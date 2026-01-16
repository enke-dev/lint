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
export const defineConfig = (options: Options = {}) => {
  const {
    root = false,
    includes = ['**', '!**/dist/', '!**/node_modules/', '!**/package-lock.json'],
    disableRules = [],
  } = options;

  // Base configuration that mirrors existing ESLint + Prettier + Stylelint rules
  const config = {
    root,
    $schema: 'https://biomejs.dev/schemas/2.3.11/schema.json',
    vcs: {
      enabled: true,
      clientKind: 'git' as const,
      useIgnoreFile: true,
      defaultBranch: 'main',
    },
    files: {
      includes,
    },
    assist: {
      actions: {
        source: {
          organizeImports: 'on' as const,
        },
      },
    },
    formatter: {
      enabled: true,
      formatWithErrors: false,
      indentStyle: 'space' as const,
      indentWidth: 2,
      lineWidth: 100,
      lineEnding: 'lf' as const,
    },
    javascript: {
      formatter: {
        quoteStyle: 'single' as const,
        jsxQuoteStyle: 'double' as const,
        quoteProperties: 'asNeeded' as const,
        trailingCommas: 'es5' as const,
        semicolons: 'always' as const,
        arrowParentheses: 'asNeeded' as const,
        bracketSpacing: true,
        bracketSameLine: false,
      },
    },
    json: {
      formatter: {
        trailingCommas: 'none' as const,
      },
      parser: {
        allowComments: false,
        allowTrailingCommas: false,
      },
    },
    css: {
      formatter: {
        enabled: true,
        indentStyle: 'space' as const,
        indentWidth: 2,
        lineWidth: 100,
      },
      linter: {
        enabled: true,
      },
    },
    linter: {
      enabled: true,
      rules: {
        recommended: true,
        complexity: {
          noExtraBooleanCast: 'error' as const,
          noUselessCatch: 'error' as const,
          noUselessConstructor: 'error' as const,
          noUselessLabel: 'error' as const,
          noUselessRename: 'error' as const,
          noUselessSwitchCase: 'error' as const,
          noVoid: 'error' as const,
          useFlatMap: 'error' as const,
          useLiteralKeys: 'error' as const,
          useOptionalChain: 'error' as const,
          useSimplifiedLogicExpression: 'error' as const,
          noAdjacentSpacesInRegex: 'error' as const,
          noCommaOperator: 'error' as const,
          useNumericLiterals: 'error' as const,
        },
        correctness: {
          noConstAssign: 'error' as const,
          noConstantCondition: 'error' as const,
          noEmptyPattern: 'error' as const,
          noGlobalObjectCalls: 'error' as const,
          noInnerDeclarations: 'error' as const,
          noInvalidConstructorSuper: 'error' as const,
          noSelfAssign: 'error' as const,
          noUndeclaredVariables: 'error' as const,
          noUnreachable: 'error' as const,
          noUnreachableSuper: 'error' as const,
          noUnsafeFinally: 'error' as const,
          noUnusedLabels: 'error' as const,
          noUnusedVariables: 'error' as const,
          useIsNan: 'error' as const,
          useValidForDirection: 'error' as const,
          useYield: 'error' as const,
          noInvalidBuiltinInstantiation: 'error' as const,
          useValidTypeof: 'error' as const,
          noUnusedImports: 'error' as const,
        },
        style: {
          noNegationElse: 'off' as const,
          noParameterAssign: 'off' as const,
          noUnusedTemplateLiteral: 'error' as const,
          useBlockStatements: 'error' as const,
          useConst: 'error' as const,
          useDefaultParameterLast: 'error' as const,
          useEnumInitializers: 'error' as const,
          useExponentiationOperator: 'error' as const,
          useSelfClosingElements: 'error' as const,
          useSingleVarDeclarator: 'error' as const,
          useTemplate: 'error' as const,
          useConsistentArrayType: { level: 'error' as const, options: { syntax: 'shorthand' as const } },
        },
        suspicious: {
          noAsyncPromiseExecutor: 'error' as const,
          noCatchAssign: 'error' as const,
          noClassAssign: 'error' as const,
          noCompareNegZero: 'error' as const,
          noControlCharactersInRegex: 'error' as const,
          noDebugger: 'error' as const,
          noDoubleEquals: 'error' as const,
          noDuplicateCase: 'error' as const,
          noDuplicateClassMembers: 'error' as const,
          noDuplicateObjectKeys: 'error' as const,
          noEmptyBlockStatements: 'error' as const,
          noExplicitAny: 'warn' as const,
          noExtraNonNullAssertion: 'error' as const,
          noFallthroughSwitchClause: 'error' as const,
          noFunctionAssign: 'error' as const,
          noGlobalAssign: 'error' as const,
          noImportAssign: 'error' as const,
          noLabelVar: 'error' as const,
          noRedeclare: 'error' as const,
          noShadowRestrictedNames: 'error' as const,
          noSparseArray: 'error' as const,
          noUnsafeDeclarationMerging: 'error' as const,
          noUnsafeNegation: 'error' as const,
          useGetterReturn: 'error' as const,
          noWith: 'error' as const,
          noVar: 'error' as const,
          noConsole: 'error' as const,
        },
        nursery: {},
        a11y: {
          noAccessKey: 'error' as const,
          noAriaHiddenOnFocusable: 'error' as const,
          noAutofocus: 'warn' as const,
          noDistractingElements: 'error' as const,
          noHeaderScope: 'error' as const,
          noNoninteractiveElementToInteractiveRole: 'error' as const,
          noNoninteractiveTabindex: 'error' as const,
          noPositiveTabindex: 'warn' as const,
          noRedundantAlt: 'error' as const,
          noRedundantRoles: 'error' as const,
          useAltText: 'error' as const,
          useAnchorContent: 'error' as const,
          useAriaPropsForRole: 'error' as const,
          useButtonType: 'error' as const,
          useHeadingContent: 'error' as const,
          useHtmlLang: 'error' as const,
          useIframeTitle: 'error' as const,
          useKeyWithClickEvents: 'error' as const,
          useKeyWithMouseEvents: 'error' as const,
          useValidAnchor: 'error' as const,
          useValidAriaProps: 'error' as const,
          useValidAriaRole: 'error' as const,
          useValidAriaValues: 'error' as const,
          useValidLang: 'error' as const,
        },
        performance: {
          noAccumulatingSpread: 'warn' as const,
          noDelete: 'error' as const,
        },
        security: {
          noBlankTarget: 'error' as const,
        },
      },
    },
  };

  return config;
};

// Export default config
export default defineConfig();
