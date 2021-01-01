// eslint-disable-next-line @typescript-eslint/no-var-requires
const getReactWebpackConfig = require('@nrwl/react/plugins/webpack');

module.exports = function getWebpackConfig(config, context) {
  const baseConfig = getReactWebpackConfig(config, context);

  baseConfig.module.rules = baseConfig.module.rules.map(replacePostCSSConfig);

  console.log(JSON.stringify(baseConfig.module.rules, (key, value) => {
    return key === 'test' ? value.toString() : value;
  }, 2));

  return baseConfig;
}

function replacePostCSSConfig(rule) {
  if (rule.oneOf && Array.isArray(rule.oneOf)) {
    rule.oneOf = rule.oneOf.map(replacePostCSSConfig);
  }

  if (rule.use && Array.isArray(rule.use)) {
    rule.use = rule.use.map(use => {
      if (use.loader && /postcss-loader/i.test(use.loader)) {
        return require.resolve('postcss-loader');
      }
      return use;
    });
  }

  return rule;
}
