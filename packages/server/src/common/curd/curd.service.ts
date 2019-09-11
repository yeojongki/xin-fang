import { Repository } from 'typeorm';
import { TID, IID, TIDs } from '@xf/common/src/interfaces/id.interface';
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
   * @param {*} dto
   * @returns {Promise<any>}
   * @memberof CurdService
   */
  async create(dto: any): Promise<any> {
    const toSave = this.repository.create(dto);
    return await this.repository.save(toSave);
  }

  /**
   * 更新数据 数据实体不存在 id 时抛错
   * @param {U} dto
   * @returns {(Promise<T>)}
   * @memberof CurdService
   */
  async update(dto: U): Promise<T> {
    const { id } = dto;
    const toUpdate = await this.findByIdAndThrowError(id);
    return await this.repository.save(Object.assign(toUpdate, dto));
  }

  /**
   * 删除一条数据
   * @param {TID} id
   * @returns {Promise<T>}
   * @memberof CurdService
   */
  async delete(id: TID): Promise<T> {
    const toDelete = await this.findByIdAndThrowError(id);
    return await this.repository.remove(toDelete as T);
  }

  /**
   * 删除多条数据
   * @param {TIDs} ids
   * @returns {Promise<T[]>}
   * @memberof CurdService
   */
  async deleteByIds(ids: TIDs): Promise<T[]> {
    return await this.repository.remove(await this.repository.findByIds(ids));
  }
}
