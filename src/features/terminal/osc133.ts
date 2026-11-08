import { shellQuote } from "./startup";

const bashSetup = [
  '_TERMOZ_OSC133=1',
  '__termoz_precmd() { local code=$?; builtin printf "\\033]133;D;%s\\007" "$code"; return "$code"; }',
  'if [[ $(declare -p PROMPT_COMMAND 2>/dev/null) == "declare -a"* ]]; then PROMPT_COMMAND=(__termoz_precmd "${PROMPT_COMMAND[@]}"); else PROMPT_COMMAND=$\'__termoz_precmd\\n\'"${PROMPT_COMMAND-}"; fi',
  'PS0="${PS0-}\\e]133;C\\a"',
  "PS1='\\[\\e]133;A\\a\\]'\"$PS1\"'\\[\\e]133;B\\a\\]'",
].join("; ");

export const BASH_OSC133_SETUP =
  'if [ -n "${BASH_VERSION-}" ] && [ "${_TERMOZ_OSC133-}" != 1 ]; then eval ' +
  shellQuote(bashSetup) +
  '; fi';
