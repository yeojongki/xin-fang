import { BadRequestException } from '@nestjs/common';
import { TransformClassToPlain } from 'class-transformer';
import { TID } from '@xf/common/src/interfaces/id.interface';
import { Repository } from 'typeorm';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { IPaginationList } from '@xf/common/src/interfaces/pagination.interface';
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
   * 查找并记数
   * @param {TListQuery<T>} query
   * @returns {Promise<[T[], number]>}
   * @memberof BaseService
   */
  async findAndCount(query: TListQuery<T>, relations: string[] = []): Promise<[T[], number]> {
    const { skip, take, ...rest } = query;
    return this.repository.findAndCount({
      relations,
      where: rest,
      skip,
      take,
    });
  }

  /**
   * 查找列表
   * @param {TListQuery<T>} query
   * @param {string[]} [relations=[]]
   * @returns {Promise<IPaginationList<T>>}
   * @memberof BaseService
   */
  @TransformClassToPlain()
  async getList(query: TListQuery<T>, relations: string[] = []): Promise<IPaginationList<T>> {
    const { skip, take } = query;
    const [list, count] = await this.findAndCount(query, relations);
    return {
      list,
      pagination: {
        current: +skip + 1,
        pageSize: +take,
        total: count,
      },
    };
  }

  /**
   * 根据Id查找数据
   * @param {TID} id
   * @param {string[]} [relations=[]]
   * @returns {(Promise<T | undefined>)}
   * @memberof BaseService
   */
  @TransformClassToPlain()
  async findById(id: TID, relations: string[] = []): Promise<T | undefined> {
    return await this.repository.findOne({ where: { id }, relations });
  }

  /**
   * 根据Id查找数据 查找结果为空时抛错
   * @param {TID} id
   * @param {string[]} [relations=[]]
   * @returns {Promise<T>}
   * @memberof BaseService
   */
  async findByIdAndThrowError(id: TID, relations: string[] = []): Promise<T> {
    const entity = await this.findById(id, relations);
    if (!entity) {
      throw this.handleNotFoundError(id);
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
