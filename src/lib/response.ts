import {
  BadRequestException,
  ForbiddenException,
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
  message,
  status,
}: {
  message: string;
  status: number;
}) => {
  switch (true) {
    case status == 400:
      throw new BadRequestException(message);
    case status == 404:
      throw new NotFoundException(message);
    case status == 401:
      throw new UnauthorizedException(message);
    case status == 403:
      throw new ForbiddenException(message);

    default:
      throw Error(message);
  }
};

// export type { succesResponseFindListType, successResponseWriteAction, errorHandlerType };
//
