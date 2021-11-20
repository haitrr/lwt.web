import compromise from "compromise";

const normalize = (text: string, languageCode: string) => {
  if (languageCode === "en") {
    const doc = compromise(text);
    doc.normalize({
      // remove hyphens, newlines, and force one space between words
      whitespace: true,
      // keep only first-word, and 'entity' titlecasing
      case: true,
      // remove commas, semicolons - but keep sentence-ending punctuation
      punctuation: true,
      // visually romanize/anglicize 'Björk' into 'Bjork'.
      unicode: true,
      // turn "isn't" to "is not"
      contractions: false,
      // remove periods from acronyms, like 'F.B.I.'
      acronyms: true,

      // ---these ones don't run unless you want them to---

      // remove words inside brackets (like these)
      parentheses: false,
      // turn "Google's tax return" to "Google tax return"
      possessives: true,
      // turn "batmobiles" into "batmobile"
      plurals: true,
      // turn all verbs into Infinitive form - "I walked" → "I walk"
      verbs: true,
      // turn 'Vice Admiral John Smith' to 'John Smith'
      honorifics: false
    });
    doc.toLowerCase();
    return doc.out();
  }
  return text;
};

export default normalize;
