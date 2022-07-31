import { Request, Response, NextFunction } from 'express';

export type Question = {
  uuid: string;
  question: string;
  typeQuestion: string;
  answers: [];
};
export type Questions = Questions[];

export type PollItem = {
  uuid: string;
  title: string;
  questions: Questions;
};

export type CreatePollItem = {
  title: string;
  questions: Questions;
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
  createPoll: (poll: Partial<CreatePollItem>) => Promise<string>;
  updatePoll: (
    uuid: string,
    post: UpdatePollItem
  ) => Promise<{ isUpdated: boolean }>;
  deletePoll: (uuid: string) => Promise<{ isDeleted: boolean }>;
}

// export type OptionsFindAllPostEntity = {
//   limit: number;
//   offset: number;
// };

export interface PostEntityContract {
  //   findAll: (options: OptionsFindAllPostEntity) => Promise<PostsList>;
  //   findOne: (uuid: string) => Promise<PostItem>;
  //   create: (post: CreatePostItem) => Promise<string>;
  //   update: (uuid: string, post: UpdatePostItem) => Promise<boolean>;
  //   delete: (uuid: string) => Promise<boolean>;
}