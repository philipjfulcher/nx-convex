'use client';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useMutation, useQuery } from 'convex/react';
import { FormEvent, useState } from 'react';
import { api } from '@nx-template/convex';
import { MessageList } from './MessageList';
import { Message } from './Message';
import { Id } from '@nx-template/convex';

export function Chat({ viewer }: { viewer: Id<'users'> }) {
  const [newMessageText, setNewMessageText] = useState('');
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewMessageText('');
    sendMessage({ body: newMessageText }).catch((error) => {
      console.error('Failed to send message:', error);
    });
  };

  return (
    <>
      <MessageList messages={messages}>
        {messages?.map((message) => (
          <Message
            key={message._id}
            author={message.userId}
            authorName={message.author}
            viewer={viewer}
            messageId={message._id}
          >
            {message.body}
          </Message>
        ))}
      </MessageList>
      <div className="border-t">
        <form onSubmit={handleSubmit} className="container flex gap-2 py-4">
          <Input
            value={newMessageText}
            onChange={(event) => setNewMessageText(event.target.value)}
            placeholder="Write a message…"
          />
          <Button type="submit" disabled={newMessageText === ''}>
            Send
          </Button>
        </form>
      </div>
    </>
  );
}
