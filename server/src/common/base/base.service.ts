import { BadRequestException } from '@nestjs/common';
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
  async findById(id: string): Promise<T> {
    return await this.repository.findOne(id);
  }

  /**
   * 根据Id查找数据 查找结果为空时抛错
   * @param {string} id
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  async findByIdAndThrowError(id: string): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      this.handleNotFoundError(id);
    }
    return entity;
  }

  /**
   * 数据不存在时抛出的出错处理
   * @param {string} id
   * @memberof BaseService
   */
  handleNotFoundError(id: string) {
    throw new BadRequestException({
      message: `${this.serviceName}不存在`,
      error: { id },
      errorCode: errorCode.FIND_NOT_FOUND,
    });
  }
}
