import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const imagePositionValues = [
  "top",
  "center",
  "bottom",
  "left",
  "right",
  "left-top",
  "left-bottom",
  "right-top",
  "right-bottom",
] as const;

const imageFitValues = ["contain", "cover"] as const;

const news = defineCollection({
  loader: async () => {
    const GOOGLE_SHEET_ID = import.meta.env.GOOGLE_SHEET_ID;

    if (!GOOGLE_SHEET_ID) {
      throw new Error(
        "GOOGLE_SHEET_ID environment variable is not set. Add it to .env file.",
      );
    }

    const gvizUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json`;
    const response = await fetch(gvizUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Google Spreadsheet (HTTP ${response.status}). ` +
          `Ensure the spreadsheet is shared as "Anyone with the link can view".`,
      );
    }

    const text = await response.text();
    // gviz response is JSONP: google.visualization.Query.setResponse({...})
    const jsonString = text.replace(
      /^[\s\S]*?google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/,
      "$1",
    );
    const data = JSON.parse(jsonString);

    // data.table.cols: column definitions
    // data.table.rows: row data
    const cols = data.table.cols.map((col: { label: string }) => col.label);
    const titleIdx = cols.indexOf("title");
    const dateIdx = cols.indexOf("date");
    const contentIdx = cols.indexOf("content");

    if (titleIdx === -1 || dateIdx === -1 || contentIdx === -1) {
      throw new Error(
        `Spreadsheet must have columns: title, date, content. Found: ${cols.join(", ")}`,
      );
    }

    return data.table.rows.map(
      (row: { c: ({ v: string } | null)[] }, index: number) => {
        const rawDate = row.c[dateIdx]?.v ?? "";
        // gviz returns dates as "Date(year,month,day)" where month is 0-indexed
        const dateMatch = rawDate.match(/^Date\((\d+),(\d+),(\d+)\)$/);
        const date = dateMatch
          ? `${dateMatch[1]}-${String(Number(dateMatch[2]) + 1).padStart(2, "0")}-${dateMatch[3].padStart(2, "0")}`
          : rawDate;

        return {
          id: String(index),
          title: row.c[titleIdx]?.v ?? "",
          date,
          content: row.c[contentIdx]?.v ?? "",
        };
      },
    );
  },
  schema: z.object({
    title: z.string(),
    date: z.string(),
    content: z.string(),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      order: z.number(),
      imageFit: z.enum(imageFitValues).default("contain"),
      imagePosition: z.enum(imagePositionValues).default("bottom"),
    }),
});

export const collections = { works, news };
