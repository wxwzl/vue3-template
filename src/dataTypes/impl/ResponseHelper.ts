import { IResponseHelper, IResponse } from "@/dataTypes/interface/responseHelper";
import { isEmpty, isString, walkArray } from "@utils/commonUtil";
// const debug = process.env.NODE_ENV === "development";
interface CustomError {
  code: number;
  msg: string;
}
const ErrorArray: Array<CustomError> = [
  { code: 9010100, msg: "用户不存在" },
  { code: 9010101, msg: "密码错误" },
  { code: 9010102, msg: "登出失败，预留错误码" },
  { code: 9010103, msg: "手机号已存在" },
  { code: 9010104, msg: "邮箱已存在" },
  { code: 9010200, msg: "部门不存在" },
  { code: 9010400, msg: "角色不存在" },
  { code: 403, msg: "没有权限" },
  { code: 404, msg: "找不到页面或接口" },
  { code: 500, msg: "服务器被外星人带走了！" },
  { code: 20107, msg: "请求参数异常！" },
  { code: 400, msg: "请求参数出错！" },
  { code: 9010200, msg: "部门不存在" },
  { code: 9010201, msg: "当前移动部门不是最新，重新请求后再移动" },
  { code: 9010201, msg: "部门人数不为 0 ，无法删除" },
];

export class Response implements IResponse {
  code: number;
  status: boolean;
  message: string;
  data: any;
  origin: Record<string | number, any>;
  constructor(
    code: number,
    status: boolean,
    message: string,
    data: any,
    origin: Record<string | number, any>
  ) {
    this.code = code;
    this.status = status;
    this.message = message;
    this.data = data;
    this.origin = origin;
  }

  public setMessage(msg: string): IResponse {
    this.message = msg;
    return this;
  }

  public setData(data: any): IResponse {
    this.data = data;
    return this;
  }
}
function walkErrorArray(handler: any, context?: any): void {
  walkArray(ErrorArray, handler, context);
}
class ResponseHelper implements IResponseHelper {
  public getMessage(res: any): string {
    let msg: string = res.message;
    const code: number = this.getCode(res);
    walkErrorArray(function (item: CustomError) {
      if (item.code == code) {
        msg = item.msg;
        return true;
      }
    });
    return msg || "请求出错";
  }

  public getCode(res: any): number {
    return res.status ? res.status : res.code;
  }

  public getData(response: any): any {
    let data: any = response.data;
    if (isString(data) && data) {
      try {
        response.data = JSON.parse(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (isEmpty(data)) {
      data = {};
    }
    return data;
  }

  public isSuccess(res: any): boolean {
    return res.status === 200;
  }

  public getResponse(res: any): IResponse {
    res = this.getResponseData(res);
    let status = false;
    const code: number = this.getCode(res);
    const data: any = this.getData(res);
    const message: string = this.getMessage(res);
    if (this.isSuccess(res)) {
      status = true;
    } else {
      status = false;
    }
    return new Response(code, status, message, data, res);
  }
  public getResponseData(res: any) {
    return res.data;
  }
  public getResponseFromError(error: any): IResponse {
    let status = false;
    const code: number = error.status ? error.status : error.code;
    const data: any = this.getData(error);
    const message: string = this.getMessage(error);
    if (this.isSuccess(error)) {
      status = true;
    } else {
      status = false;
    }
    return new Response(code, status, message, data, error);
  }
}
const responseHelper = new ResponseHelper();
export default responseHelper;
