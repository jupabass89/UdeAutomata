export const regex =  {
  spacesLines: new RegExp(/"(.*)"|\W[\+-]?[0-9]*[\.]?[0-9]+([eE][\+-]?[0-9]+)?\W|[+\-*\\\!]=?|=?&?[&\<\>=]|[.;:(){}\[\]]|\w*/g),
  strConst: new RegExp(/"(.*)"/g),
  numberConst: new RegExp(/\W[\+-]?[0-9]*[\.]?[0-9]+([eE][\+-]?[0-9]+)?\W/g),
  operators: new RegExp(/[+\-*\\\!]=?|=?&?[&\<\>=]/g),
  separators: new RegExp(/[.;:(){}\[\]]/g),
  identifiers: new RegExp(/^\D+.*/g)
}
