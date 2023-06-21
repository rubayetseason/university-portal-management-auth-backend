type IOptions = {
  page?: number;
  limit?: number;
};

type IOptionsResults = {
  page: number;
  limit: number;
  skip: number;
};

const calculatePagination = (options: IOptions): IOptionsResults => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
