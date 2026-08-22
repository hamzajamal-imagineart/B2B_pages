/**
 * Local `cn`, replacing the package's clsx + tailwind-merge pair.
 *
 * That pair would have been two runtime dependencies for a project whose whole
 * list is next, react and react-dom. tailwind-merge earns its keep when class
 * strings from different places have to be de-conflicted; here every call site
 * is a fixed base plus a scene coordinate from `constants.ts`, and none of them
 * collide, so joining truthy values is the whole job.
 */
export const cn = (...inputs: Array<string | false | null | undefined>): string =>
  inputs.filter(Boolean).join(" ");
