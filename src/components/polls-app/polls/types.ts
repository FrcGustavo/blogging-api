import { Request, Response, NextFunction } from 'express';

export type Question = {
  uuid: string;
  question: string;
  typeQuestion: string;
  answers: {
    uuid: string;
    answer: string;
  }[];
};
export type Questions = Question[];

export type PollItem = {
  uuid: string;
  title: string;
  questions: Questions;
};

export type CreateQuestion = {
  question: string;
  typeQuestion: string;
  answers: {
    answer: string;
  }[];
};
export type CreateQuestions = CreateQuestion[];

export type CreatePollItem = {
  title: string;
  questions: CreateQuestion;
};

export type UpdatePollItem = {
  title?: string;
  questions?: Questions;
};

export type PollsList = Array<PollItem>;

export type QueryPollsList = {
  page?: string;
  limit?: string;
};

export interface PollsRouterContract {}

export interface PollsControllerContract {
  getAllPolls: (
    req: Request<{}, {}, {}, QueryPollsList>,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  createPoll: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  getOnePoll: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  updatePoll: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  deletePoll: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

export interface PollsServiceContract {
  getAllPolls: (query: QueryPollsList) => Promise<PollsList>;
  getOnePoll: (uuid: string) => Promise<PollItem>;
  createPoll: (poll: Partial<CreatePollItem>) => Promise<PollItem>;
  updatePoll: (uuid: string, post: UpdatePollItem) => Promise<PollItem>;
  deletePoll: (uuid: string) => Promise<{ isDeleted: boolean }>;
}

export type OptionsFindAllPollEntity = {
  limit: number;
  offset: number;
};

export interface PollEntityContract {
  findAll: (options: OptionsFindAllPollEntity) => Promise<PollsList>;
  findOne: (uuid: string) => Promise<PollItem>;
  create: (poll: CreatePollItem) => Promise<PollItem>;
  update: (uuid: string, poll: UpdatePollItem) => Promise<PollItem>;
  delete: (uuid: string) => Promise<boolean>;
}
