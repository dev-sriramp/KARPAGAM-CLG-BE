export class filterOptions {
  limit: number;
  skip: number;
  where?: Object;
  include?: Object;
  select?: Object;
  order?: Object;
}

export class prismaFilterOptions {
  take: number;
  skip: number;
  where?: object;
  include?: object;
  select?: object;
  orderBy?: object;
}

//This Method can be used only in list all
const listParser = ({
  limit = Number.MAX_SAFE_INTEGER,
  skip = 0,
  where = {},
  include = {},
  select = {},
  order = { created_at: 'desc' },
}: filterOptions): prismaFilterOptions => {
  let finalData: prismaFilterOptions = {
    take: Number.MAX_SAFE_INTEGER,
    skip: 0,
    where: {},
    orderBy: { created_at: 'desc' },
  };
  finalData[`where`] = where;
  finalData.take = limit;
  finalData.skip = skip;
  finalData.orderBy = order;
  if (Object.keys(select).length !== 0) {
    finalData.select = select;
  }
  if (Object.keys(include).length !== 0) {
    finalData[`include`] = include;
  }
  return finalData;
};
export default listParser;

export class ListDto {
  public skip: number;

  public limit: number;

  public order: Object;

  public where: Object;

  public select: Object;

  public include: Object;
}

export class GetDto {
  public uuid: string;
}
