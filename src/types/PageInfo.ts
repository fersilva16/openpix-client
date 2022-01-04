export type PageInfoErrorData = {
  skip: number;
  limit: number;
};

export type PageInfoError = {
  message: string;
  data: PageInfoErrorData;
};

export type PageInfo = {
  errors: PageInfoError[];
  skip: number;
  limit: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
