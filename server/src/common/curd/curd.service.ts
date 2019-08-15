import { Repository } from 'typeorm';
import { IID } from './curd.controller';
import { BaseService } from '../base/base.service';

/**
 * @class CurdService
 * @template T 数据实体 Entity
 * @template U 更新数据对象 dto
 */
export abstract class CurdService<T, U extends IID> extends BaseService<T> {
  /**
   *Creates an instance of CurdService.
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
   * @returns {Promise<any>}
   * @memberof CommonService
   */
  async update(dto: U): Promise<any> {
    const { id } = dto;
    let toUpdate = await this.findByIdAndThrowError(id);
    await this.repository.save(Object.assign(toUpdate, dto));
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
}
