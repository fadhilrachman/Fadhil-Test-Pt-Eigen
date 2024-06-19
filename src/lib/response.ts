import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

interface SuccesFindListResponse {
  message: string;
  data: any[];
}

interface SuccesResponseWriteAction {
  message: string;
  result?: any;
}
export const succesResponseFindList = ({
  data,
  message,
}: SuccesFindListResponse): SuccesFindListResponse => {
  return { message, data };
};

const successResponseWriteAction = ({
  message,
  result,
}: SuccesResponseWriteAction): SuccesResponseWriteAction => {
  return { message, result };
};

export const errorHandler = ({
  status,
  error,
  module,
}: {
  status: number;
  error: any;
  module: string;
}) => {
  switch (true) {
    case status == 400:
      throw new BadRequestException(error?.message);
    case status == 404:
      throw new NotFoundException(error?.message);
    case status == 401:
      throw new UnauthorizedException(error?.message);
    case status == 403:
      throw new ForbiddenException(error?.message);

    default:
      console.log(`${module} : `, error);
      throw new InternalServerErrorException('Internal Server Error');
  }
};

// export type { succesResponseFindListType, successResponseWriteAction, errorHandlerType };
//
