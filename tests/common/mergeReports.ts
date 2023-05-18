import fs from "fs";
import path from "path";
import { mergeHTMLReports } from "playwright-merge-html-reports";

const reportPathsToMerge = fs
  .readdirSync(process.cwd() + "/playwright-report", { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map(({ name }) => path.resolve(process.cwd() + "/playwright-report", name));

async function runReport(paths: string[]) {
  // merges html reports and saves to /html-report
  await mergeHTMLReports(paths, {
    outputFolderName: "html-report",
  });
}

runReport(reportPathsToMerge);
