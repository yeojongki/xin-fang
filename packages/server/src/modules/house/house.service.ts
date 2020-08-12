import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House, City } from '@xf/common/src/entities';
import { UpdateHouseInput } from '@xf/common/src/dtos/house/update-house.input';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { CurdService } from '@/common/curd/curd.service';
import { CityService } from '@/modules/city/city.service';
@Injectable()
export class HouseService extends CurdService<House, UpdateHouseInput> {
  constructor(
    private readonly cityService: CityService,
    @InjectRepository(House)
    protected readonly houseRepository: Repository<House>,
  ) {
    super(houseRepository, '房子');
  }

  // async findOne(query: IKeyS)

  async findAndCount(query: TListQuery<House>): Promise<[House[], number]> {
    const { skip, take, title, ...rest } = query;
    const qb = this.repository.createQueryBuilder('q');
    qb.leftJoinAndSelect('q.city', 'city');

    qb.where({ ...rest });
    if (title) {
      qb.andWhere(`q.title LIKE '%${title}%'`);
    }

    return qb
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  /**
   * 更新数据 数据实体不存在 id 时抛错
   */
  async update(dto: UpdateHouseInput): Promise<House> {
    const { id } = dto;
    const toUpdate = await this.findByIdAndThrowError(id);
    // 如果有城市
    if (dto.cityId) {
      const city = await this.cityService.findByIdAndThrowError(dto.cityId);
      toUpdate.city = city;
    }

    return await this.repository.save(Object.assign(toUpdate, dto));
  }

  // async save(user: IUser, roles?: Role[]): Promise<User> {
  //   if (!roles) {
  //     user.roles = await this.getRolesByToken((user.roles as any) as string[]);
  //   }
  //   return await this.repository.save(user);
  // }
}
