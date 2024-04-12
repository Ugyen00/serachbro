import { OpenAIModel, Source } from "@/types";
import { Readability } from "@mozilla/readability";
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";
import type { NextApiRequest, NextApiResponse } from "next";
import { cleanSourceText } from "../../utils/sources";

type Data = {
  sources: Source[];
};

const searchHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    console.log("hi");
    const { query, model } = req.body as {
      query: string;
      model: OpenAIModel;
    };

    const sourceCount = 4;

    // GET LINKS
    const response = await fetch(`https://www.google.com/search?q=${query}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const linkTags = $("a");
    console.log("h1");
    let links: string[] = [];

    linkTags.each((i, link) => {
      const href = $(link).attr("href");

      if (href && href.startsWith("/url?q=")) {
        const cleanedHref = href.replace("/url?q=", "").split("&")[0];

        if (!links.includes(cleanedHref)) {
          links.push(cleanedHref);
        }
      }
    });
    console.log("h3");
    console.log(links);
    const filteredLinks = links.filter((link, idx) => {
      console.log(link);
      const domain = new URL(link).hostname;

      const excludeList = [
        "google",
        "facebook",
        "twitter",
        "instagram",
        "youtube",
        "tiktok",
      ];
      if (excludeList.some((site) => domain.includes(site))) return false;
      console.log("h33");
      console.log(link);
      return (
        links.findIndex((link) => new URL(link).hostname === domain) === idx
      );
    });
    console.log("h4");

    console.log(filteredLinks);
    const finalLinks = filteredLinks.slice(0, sourceCount);

    // SCRAPE TEXT FROM LINKS
    const sources = (await Promise.all(
      finalLinks.map(async (link) => {
        const response = await fetch(link);
        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        const parsed = new Readability(doc).parse();

        if (parsed) {
          let sourceText = cleanSourceText(parsed.textContent);

          return { url: link, text: sourceText };
        }
      })
    )) as Source[];

    const filteredSources = sources.filter((source) => source !== undefined);

    for (const source of filteredSources) {
      source.text = source.text.slice(0, 1500);
    }
    console.log("sources");
    console.log(filteredSources);
    res.status(200).json({ sources: filteredSources });
  } catch (err) {
    console.log(err);
    res.status(500).json({ sources: [] });
  }
};

export default searchHandler;
