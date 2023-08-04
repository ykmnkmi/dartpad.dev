final RegExp _codeBlockSections = RegExp(r'(```\w+) +\w+');

final RegExp _directives = RegExp(r'(\n *{@.*?}$)|(^{@.*?}\n)', multiLine: true);

String? cleanDocumentation(String? documentation) {
  if (documentation == null) {
    return null;
  }

  // Remove any dartdoc directives like {@template xxx}
  documentation = documentation.replaceAll(_directives, '');

  // Remove any code block section names like ```dart preamble that Flutter
  // docs contain.
  documentation = documentation.replaceAllMapped(_codeBlockSections, (match) {
    return match.group(1) as String;
  });

  return documentation;
}
