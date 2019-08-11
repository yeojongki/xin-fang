import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { errorCode } from '@/constants/error-code';

@Injectable()
export class CommonService<T> {
  constructor(private readonly repository: Repository<T>) {}

  /**
   * 根据Id查找数据
   * @param {string} id
   * @returns {Promise<T>}
   * @memberof CommonService
   */
  async findOneById(id: string): Promise<T> {
    return await this.repository.findOne(id);
  }

  /**
   * 根据Id查找数据 不存在时会抛出错误
   * @param {string} id
   * @returns {Promise<T>}
   * @memberof CommonService
   */
  async findOneByIdAndError(id: string): Promise<T> {
    const entity = await this.findOneById(id);
    if (!entity) {
      this.handleNotFoundError(id);
    }
    return entity;
  }

  /**
   * 创建数据
   * @param {*} entity
   * @returns {Promise<T>}
   * @memberof CommonService
   */
  async create(entity: any): Promise<T> {
    return this.repository.save(entity);
  }

  /**
   * 更新数据
   * @param {*} entity
   * @returns {Promise<void>}
   * @memberof CommonService
   */
  async update(entity: any): Promise<void> {
    const { id } = entity;
    let toUpdate = await this.findOneByIdAndError(id);
    await this.repository.save(Object.assign(toUpdate, entity));
    return Promise.resolve();
  }

  /**
   * 删除一条数据
   * @param {string} id
   * @returns {Promise<any>}
   * @memberof CommonService
   */
  async delete(id: string): Promise<any> {
    return await this.repository.remove(await this.repository.findOne(id));
  }

  /**
   * 删除多条数据
   * @param {string[]} ids
   * @returns {Promise<any>}
   * @memberof CommonService
   */
  async deleteByIds(ids: string[]): Promise<any> {
    return await this.repository.remove(await this.repository.findByIds(ids));
  }

  /**
   * 数据不存在时抛出的出错处理
   * @param {string} id
   * @memberof CommonService
   */
  public handleNotFoundError(
    id: string,
    message: string = '数据不存在',
    error: string = id,
  ) {
    this.throwNotFoundError(message, error);
  }

  /**
   * 数据不存在时抛出错误
   * @param {string} message 错误信息
   * @param {*} error 错误数据等
   * @memberof CommonService
   */
  public throwNotFoundError(message: string, error: any) {
    throw new BadRequestException({
      message,
      error,
      errorCode: errorCode.FIND_NOT_FOUND,
    });
  }
}
