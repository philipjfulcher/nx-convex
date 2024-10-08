import { cn } from '../lib/utils';
import { Id } from '@nx-template/convex';
import { ReactNode } from 'react';

export function Message({
  author,
  authorName,
  viewer,
  children,
  messageId,
}: {
  author: Id<'users'>;
  authorName: string;
  viewer: Id<'users'>;
  children: ReactNode;
  messageId: Id<'messages'>;
}) {
  return (
    <li
      className={cn(
        'flex flex-col text-sm',
        author === viewer ? 'items-end self-end' : 'items-start self-start'
      )}
    >
      <div className="mb-1 text-sm font-medium">{authorName}</div>
      <p
        className={cn(
          'rounded-xl bg-muted px-3 py-2',
          author === viewer ? 'rounded-tr-none' : 'rounded-tl-none'
        )}
      >
        {children}
      </p>
    </li>
  );
}
