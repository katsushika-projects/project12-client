import { Comment } from "@/types";

export default function AiComment({ comment }: { comment: Comment }) {
  return (
    <div className="py-5 space-y-4 border-b border-input px-2 first:border-t first:border-input text-sm lg:text-base">
      <div className="flex justify-between items-center gap-1 flex-wrap">
        <div className="flex gap-1.5 items-center">
          <div
            className={`w-3.5 h-3.5 ${
              comment.is_studying ? "bg-green-500" : "bg-destructive"
            } rounded-full`}
          ></div>
          <div className="leading-none text-sm">
            {comment.is_studying ? "勉強しています" : "勉強していません"}
          </div>
        </div>
        <div className="leading-none text-sm">{comment.minutes}分経過</div>
      </div>
      <div>{comment.comment}</div>
    </div>
  );
}
