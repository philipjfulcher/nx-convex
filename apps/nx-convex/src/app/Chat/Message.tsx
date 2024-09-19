import { cn } from "@/lib/utils";
import { Id } from "@nx-convex/convex";
import { ReactNode } from "react";
import { useMutation } from "convex/react";
import { api } from "@nx-convex/convex";

export function Message({
  author,
  authorName,
  viewer,
  children,
  messageId, likes
}: {
  author: Id<"users">;
  authorName: string;
  viewer: Id<"users">;
  children: ReactNode;
  messageId: Id<"messages">;
  likes: number
}) {
  const likeMessage =
    useMutation(api.messages.like);

  return (
    <li
      className={cn(
        "flex flex-col text-sm",
        author === viewer ? "items-end self-end" : "items-start self-start",
      )}
    >
      <div className="mb-1 text-sm font-medium">{authorName}</div>
      <p
        className={cn(
          "rounded-xl bg-muted px-3 py-2",
          author === viewer ? "rounded-tr-none" : "rounded-tl-none",
        )}
      >
        {children}
      </p>
      <button onClick={async () => await likeMessage({ messageId })}>{ likes }❤️</button>

    </li>
  );
}
