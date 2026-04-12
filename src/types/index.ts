export * from './student';
export * from './teacher';
export * from './assignment';

export interface ParentChildren {
  parentId: string;
  childrenIds: string[];
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export interface MessageThread {
  id: string;
  participant: {
    name: string;
    role: string;
    avatar: string;
  };
  subject: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

export interface Subject {
  name: string;
  weight: number;
}
