import { Repository } from 'typeorm';
import { TID, IID, TIDs } from '@xf/common/interfaces/id.interface';
import { BaseService } from '../base/base.service';

/**
 * @class CurdService
 * @extends {BaseService<T>}
 * @template T 数据实体 Entity
 * @template U 更新数据对象 dto
 */
export abstract class CurdService<T, U extends IID> extends BaseService<T> {
  /**
   * Creates an instance of CurdService.
   * @param {Repository<T>} repository
   * @param {string} serviceName
   * @memberof CurdService
   */
  constructor(repository: Repository<T>, serviceName: string) {
    super(repository, serviceName);
  }

  /**
   * 创建数据
   * @abstract
   * @param {*} dto
   * @memberof CommonService
   */
  abstract async create(dto: any);

  /**
   * 更新数据 数据实体不存在 id 时抛错
   * @param {*} dto
   * @returns {Promise<void>}
   * @memberof CommonService
   */
  async update(dto: U): Promise<void> {
    const { id } = dto;
    const toUpdate = await this.findByIdAndThrowError(id);
    await this.repository.save(Object.assign(toUpdate as T, dto));
    return Promise.resolve();
  }

  /**
   * 删除一条数据
   * @param {string} id
   * @returns {Promise<void>}
   * @memberof CommonService
   */
  async delete(id: TID): Promise<void> {
    const toDelete = await this.findByIdAndThrowError(id);
    await this.repository.remove(toDelete as T);
    return Promise.resolve();
  }

  /**
   * 删除多条数据
   * @param {TIDs} ids
   * @returns {Promise<void>}
   * @memberof CurdService
   */
  async deleteByIds(ids: TIDs): Promise<void> {
    await this.repository.remove(await this.repository.findByIds(ids));
    return Promise.resolve();
  }
}
