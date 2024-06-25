const tailwindSorter = [
  // Layout
  '^(container|visible|invisible)$|^(decoration|box|float|clear|isolate|object|overflow|scrolling|overscroll)-.*',
  // Display
  '^(hidden|contents|list-item|block|inline-block|flex|inline-flex|inline|table|inline-table|table-cell|table-caption|table-column|table-column-group|table-footer-group|table-header-group|table-row-group|table-row|table-auto|table-fixed|flow-root|grid|inline-grid)$',
  // Position
  '(^(static|fixed|absolute|relative|sticky)$)|^-?(top|right|bottom|left|inset|z)-.*',
  // Transforms
  '^(origin|scale|-?rotate|-?translate|-?skew)-.*|^(transform)$',
  // Sizing
  '^((min|max)-)?(w|h)-.*',
  // Grid
  '^(grid|col|row|gap|auto)-.*',
  // Spacing
  '^-?(p(x|y|l|r|b|t)?|m(x|y|l|r|b|t)?|space)-.*',
  // Typography
  '^(italic|not-italic|antialiased|subpixel-antialiased|underline|line-through|no-underline|uppercase|lowercase|capitalize|normal-case|truncate|prose)$|^(text|font|space|tracking|leading|list|placeholder|align|whitespace|break|prose)-.*',
  // Borders
  '^(rounded|border|divide|ring)-.*|^(rounded|border|ring)$',
  // Backgrounds
  '^bg-(?!blend).*|^(from|via|to)-.*',
  // Flexbox
  '^(flex|order)-.*',
  // Interactivity
  '^(cursor|outline|pointer|resize|select)-.*|^(appearance-none|resize|sr-only|not-sr-only)$',
  // Effects
  '^(shadow|opacity|mix|bg-blend)-.*|^(shadow|resize|sr-only|not-sr-only)$',
  // Transitions and Animation
  '^(delay|transition|duration|ease|animate)-.*|^transition$',
  // BOX-Alignment
  '^(place|self|items|content|justify)-.*',
  // SVG
  '^(stroke|fill)-.*',
  // Filter
  '^(-?backdrop|sepia|saturate|invert|-?hue|grayscale|blur|drop-|contrast|brightness|blur|filter)-.*|^(filter|blur|invert|sepia|grayscale)$',
  '\\w+:.*',
  '.*',
].map(o => {
  return {
    type: 'at-rule',
    name: 'apply',
    parameter: o,
  }
})
module.exports = {
  ignoreFiles: ['dist/**/*'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-property-sort-order-smacss',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'layer',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'selector-max-id': 1,
    'max-nesting-depth': 5,
    'order/properties-alphabetical-order': null,
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'declarations',
        ...tailwindSorter,
        'rules',
      ],
      {
        unspecified: 'ignore',
      },
    ],
  },
}
