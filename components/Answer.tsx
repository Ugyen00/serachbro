import { SearchQuery } from "@/types";
import { IconReload } from "@tabler/icons-react";
import { FC } from "react";

interface AnswerProps {
  searchQuery: SearchQuery;
  answer: string;
  done: boolean;
  onReset: () => void;
}

export const Answer: FC<AnswerProps> = ({
  searchQuery,
  answer,
  done,
  onReset,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="max-w-[800px] space-y-4 py-16 px-8 sm:px-24 sm:pt-16 pb-32 flex flex-col h-full overflow-hidden">
        {/* Search query */}
        <div className="text-2xl sm:text-4xl overflow-hidden flex-grow">
          {searchQuery.query}
        </div>

        {/* Answer section */}
        <div className="border-b border-zinc-800 pb-4 flex-shrink-0">
          <div className="text-md text-blue-500">Answer</div>
          <div className="mt-2 overflow-auto">
            {replaceSourcesWithLinks(answer, searchQuery.sourceLinks)}
          </div>
        </div>

        {/* Conditional rendering */}
        {done && (
          <>
            {/* Sources section */}
            <div className="border-b border-zinc-800 pb-4 flex-shrink-0">
              <div className="text-md text-blue-500">Sources</div>
              {searchQuery.sourceLinks.map((source, index) => (
                <div key={index} className="mt-1 overflow-hidden">
                  {`[${index + 1}] `}
                  <a
                    className="hover:cursor-pointer hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={source}
                  >
                    {source.split("//")[1].split("/")[0].replace("www.", "")}
                  </a>
                </div>
              ))}
            </div>

            {/* Ask New Question button */}
            <div className="flex justify-center items-center w-full py-4">
              <button
                className="flex h-10 w-52 items-center justify-center rounded-full bg-red-500 p-2 hover:cursor-pointer hover:bg-red-600"
                onClick={onReset}
              >
                <IconReload size={18} />
                <div className="ml-2">Ask New Question</div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const replaceSourcesWithLinks = (answer: string, sourceLinks: string[]) => {
  const elements = answer.split(/(\[[0-9]+\])/).map((part, index) => {
    if (/\[[0-9]+\]/.test(part)) {
      const link = sourceLinks[parseInt(part.replace(/[\[\]]/g, "")) - 1];

      return (
        <a
          key={index}
          className="hover:cursor-pointer text-blue-500"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    } else {
      return part;
    }
  });

  return elements;
};
