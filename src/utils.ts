// from DartCode
// TODO: import if possible

const dartDocDirectives = new RegExp('(\\n\\s*{@.*?}$)|(^{@.*?}\\s*\\n)|(^{@.*?}$)', 'gim');

const dartDocCodeBlockSections = new RegExp('(\`\`\`\\w+) +\\w+', 'gi');

export const cleanDocumentation = (documentation: string): string => {
  // Remove colons from old-style references like [:foo:].
  documentation = documentation.replace(/\[:\S+:\]/g, (match) => `[${match.substring(2, match.length - 2)}]`);

  // Remove any directives like {@template xxx}
  documentation = documentation.replace(dartDocDirectives, '');

  // Remove any code block section names like ```dart preamble
  documentation = documentation.replace(dartDocCodeBlockSections, '$1');
  return documentation;
}
