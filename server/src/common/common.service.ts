import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { errorCode } from '@/constants/error-code';
import { IUpdateDto } from './common.controller';

/**
 * 公用 service
 * @class CommonService
 * @template T 数据实体 Entity
 * @template U 更新数据对象 dto
 */
export abstract class CommonService<T, U extends IUpdateDto> {
  /**
   * Creates an instance of CommonService.
   * @param {Repository<T>} repository
   * @param {string} [findOneErrMsg='数据不存在']
   * @memberof CommonService
   */
  constructor(
    private readonly repository: Repository<T>,
    private readonly findOneErrMsg: string = '数据不存在',
  ) {}

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
   * 根据Id查找数据
   * @param {string} id
   * @returns {Promise<T>}
   * @memberof CommonService
   */
  async findById(id: string): Promise<T> {
    return await this.repository.findOne(id);
  }

  /**
   * 根据Id查找数据 查找结果为空时抛错
   * @param {string} id
   * @returns {Promise<T>}
   * @memberof CommonService
   */
  async findByIdAndThrowError(id: string): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      this.handleNotFoundError(id);
    }
    return entity;
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
  handleNotFoundError(id: string) {
    throw new BadRequestException({
      message: this.findOneErrMsg,
      error: { id },
      errorCode: errorCode.FIND_NOT_FOUND,
    });
  }
}
