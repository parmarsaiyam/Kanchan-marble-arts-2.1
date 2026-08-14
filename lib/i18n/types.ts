import type { en } from "./dictionaries/en"

/**
 * The dictionary contract. Every locale must supply the full `ui` tree — a
 * missing or misspelled key fails `tsc`. The `content` maps are keyed by the
 * English source string and may be partial; lookups fall back to the key.
 */
export type Dictionary = typeof en
