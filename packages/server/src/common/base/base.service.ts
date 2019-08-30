import { BadRequestException } from '@nestjs/common';
import { TransformClassToPlain } from 'class-transformer';
import { TID } from '@xf/common/src/interfaces/id.interface';
import { Repository } from 'typeorm';
import { errorCode } from '@/constants/error-code';

interface IServiceName {
  serviceName: string;
}

/**
 * @class BaseService
 * @template T 数据实体 Entity
 */
export abstract class BaseService<T> implements IServiceName {
  /**
   * Creates an instance of BaseService.
   * @param {Repository<T>} repository
   * @param {string} [serviceName='数据'] 用于查找失败时显示 `serviceName` 不存在
   * @memberof BaseService
   */
  constructor(
    protected readonly repository: Repository<T>,
    readonly serviceName: string = '数据',
  ) {}

  /**
   * 根据Id查找数据
   * @param {string} id
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  @TransformClassToPlain()
  async findById(id: TID): Promise<T | undefined> {
    return await this.repository.findOne(id);
  }

  /**
   * 根据Id查找数据 查找结果为空时抛错
   * @param {TID} id
   * @returns {(Promise<T | undefined>)}
   * @memberof BaseService
   */
  async findByIdAndThrowError(id: TID): Promise<T | undefined> {
    const entity = await this.findById(id);
    if (!entity) {
      this.handleNotFoundError(id);
    }
    return entity;
  }

  /**
   * 数据不存在时抛出的出错处理
   * @param {TID} value 错误的值
   * @param {string} [filed='id'] 错误字段 默认为id {error: {id}}
   * @memberof BaseService
   */
  handleNotFoundError(value: TID, filed: string = 'id'): void {
    throw new BadRequestException({
      message: `${this.serviceName}不存在`,
      error: { [filed]: value },
      errorCode: errorCode.FIND_NOT_FOUND,
    });
  }
}
