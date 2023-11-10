export type YearMonth = string; // Format YYYY-MM (ISO)
export type FamilieIsoDate = string; // Format YYYY-MM-DD (ISO)

/**
 * Interfacer for å representere dag, måned og år.
 * dag 1-31
 * måned jan-des
 * år 0-MAX
 */
export type År = { år: number };
export type MånedÅr = { måned: number } & År;
