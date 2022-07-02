/**
 * Some rules(match, match_all, match_any, match_none) test
 * whether input string match the givn Lua pattern.
 * I borrow a pattern translator from this url:
 * `https://github.com/teoxoy/lua-in-js/blob/master/src/lib/string.ts`.
 * Thanks to the author of these codes.
 */
const hasOwnProperty = (obj: Record<string, unknown> | unknown[], key: string | number): boolean =>
  Object.prototype.hasOwnProperty.call(obj, key)

const ROSETTA_STONE: Record<string, string> = {
  '([^a-zA-Z0-9%(])-': '$1*?',
  '([^%])-([^a-zA-Z0-9?])': '$1*?$2',
  '([^%])\\.': '$1[\\s\\S]',
  '(.)-$': '$1*?',
  '%a': '[a-zA-Z]',
  '%A': '[^a-zA-Z]',
  '%c': '[\x00-\x1f]',
  '%C': '[^\x00-\x1f]',
  '%d': '\\d',
  '%D': '[^d]',
  '%l': '[a-z]',
  '%L': '[^a-z]',
  '%p': '[.,"\'?!;:#$%&()*+-/<>=@\\[\\]\\\\^_{}|~]',
  '%P': '[^.,"\'?!;:#$%&()*+-/<>=@\\[\\]\\\\^_{}|~]',
  '%s': '[ \\t\\n\\f\\v\\r]',
  '%S': '[^ \t\n\f\v\r]',
  '%u': '[A-Z]',
  '%U': '[^A-Z]',
  '%w': '[a-zA-Z0-9]',
  '%W': '[^a-zA-Z0-9]',
  '%x': '[a-fA-F0-9]',
  '%X': '[^a-fA-F0-9]',
  '%([^a-zA-Z])': '\\$1',
}

function translatePattern(pattern: string): string {
  // TODO Add support for balanced character matching (not sure this is easily achieveable).

  // Replace single backslash with double backslashes
  let tPattern = pattern.replace(/\\/g, '\\\\')

  for (const i in ROSETTA_STONE) {
    if (hasOwnProperty(ROSETTA_STONE, i)) {
      tPattern = tPattern.replace(new RegExp(i, 'g'), ROSETTA_STONE[i])
    }
  }

  let nestingLevel = 0

  for (let i = 0, l = tPattern.length; i < l; i++) {
    if (i && tPattern.substr(i - 1, 1) === '\\') {
      continue
    }

    // Remove nested square brackets caused by substitutions
    const character = tPattern.substr(i, 1)

    if (character === '[' || character === ']') {
      if (character === ']') {
        nestingLevel -= 1
      }

      if (nestingLevel > 0) {
        tPattern = tPattern.substr(0, i) + tPattern.substr(i + 1)
        i -= 1
        l -= 1
      }

      if (character === '[') {
        nestingLevel += 1
      }
    }
  }

  return tPattern
}

export { translatePattern as luaPatternToRegexp }
