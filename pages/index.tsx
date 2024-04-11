import { Answer } from "@/components/Answer";
import { Search } from "@/components/Search";
import { SearchQuery } from "@/types";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    query: "",
    sourceLinks: [],
  });
  const [answer, setAnswer] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>SearchBro AI</title>
        <meta
          name="SearchBro.ai powered by NoMindBhutan"
          content="AI-powered search engine by NoMindBhutan."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="h-screen overflow-auto bg-[#18181C] text-[#D4D4D8]">
        {/* Facebook link */}
        <a
          className="absolute top-0 right-2 p-4 cursor-pointer"
          href="https://www.facebook.com/nomindbhutan"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandFacebook width={25} height={25} />
        </a>

        {/* LinkedIn link */}
        <a
          className="absolute top-0 right-12 p-4 cursor-pointer"
          href="https://www.linkedin.com/in/nomindbhutan-178447281/"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandLinkedin width={28} height={28} />
        </a>

        {/* Powered by NoMindBhutan button */}
        <a
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-4 cursor-pointer text-sm text-gray-500 hover:text-gray-400"
          href="https://www.nomindbhutan.com"
          target="_blank"
          rel="noreferrer"
        >
          Powered by NoMindBhutan
        </a>

        {/* Conditional rendering for Answer or Search components */}
        {answer ? (
          <Answer
            searchQuery={searchQuery}
            answer={answer}
            done={done}
            onReset={() => {
              setAnswer("");
              setSearchQuery({ query: "", sourceLinks: [] });
              setDone(false);
            }}
          />
        ) : (
          <Search
            onSearch={setSearchQuery}
            onAnswerUpdate={(value) => setAnswer((prev) => prev + value)}
            onDone={setDone}
          />
        )}
      </div>
    </>
  );
}
