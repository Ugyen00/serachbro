import { Answer } from "@/components/Answer";
import { Search } from "@/components/Search";
import { SearchQuery } from "@/types";
import { IconBrandFacebook, IconBrandLinkedin } from "@tabler/icons-react";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
        <title>Searcho AI</title>
        <meta
          name="SearchBro.ai powered by NoMindBhutan"
          content="AI-powered search engine by NoMindBhutan."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-screen overflow-hidden bg-[#18181C] text-[#D4D4D8] flex flex-col">
        {/* SearchBro logo */}
        <Link href="/" className="absolute top-0 left-0 p-4">
          <Image
            src="/logo.png"
            alt="SearchBro Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </Link>

        {/* Social media links */}
        <a
          className="absolute top-0 right-2 p-4 cursor-pointer"
          href="https://www.facebook.com/nomindbhutan"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandFacebook width={25} height={25} />
        </a>
        <a
          className="absolute top-0 right-12 p-4 cursor-pointer"
          href="https://www.linkedin.com/in/nomindbhutan-178447281/"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandLinkedin width={28} height={28} />
        </a>

        {/* "The New Google" header */}
        <div className="text-center text-lg font-bold my-4">The New Google</div>

        {/* Content section */}
        <div className="flex-grow">
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

        {/* Powered by NoMindBhutan button */}
        <a
          className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-2 md:p-4 cursor-pointer text-xs md:text-sm text-gray-500 hover:text-gray-400"
          href="https://www.nomindbhutan.com"
          target="_blank"
          rel="noreferrer"
        >
          Powered by NoMindBhutan
        </a>
      </div>
    </>
  );
}
