export interface TABLE {
  header: string[];
  data: Record<string, any>[];
}

export interface DATE_OPTIONS {
  year: "numeric" | "2-digit" | undefined;
  month: "numeric" | "2-digit" | "long" | "short" | undefined;
  day: "numeric" | "2-digit" | undefined;
}
