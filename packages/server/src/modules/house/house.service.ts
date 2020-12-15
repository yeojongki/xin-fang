import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from '@xf/common/src/entities';
import { UpdateHouseInput } from '@xf/common/src/dtos/house/update-house.input';
import { TListQuery } from '@xf/common/src/interfaces/list.query.interface';
import { CurdService } from '@/common/curd/curd.service';
import { CityService } from '@/modules/city/city.service';
import { CreateHouseInput } from '@xf/common/src/dtos/house/create-house.input';
import { IUser } from '@xf/common/src/interfaces/user.interfaces';
import { SubwayService } from '../subway/subway.service';
@Injectable()
export class HouseService extends CurdService<House, UpdateHouseInput> {
  constructor(
    private readonly cityService: CityService,
    private readonly subwayService: SubwayService,
    @InjectRepository(House)
    protected readonly houseRepository: Repository<House>,
  ) {
    super(houseRepository, '房子');
  }

  async findAndCount(query: TListQuery<House>): Promise<[House[], number]> {
    const { skip, take, title, username, cityId, subwayId, ...rest } = query;
    const qb = this.repository.createQueryBuilder('q');
    qb.leftJoinAndSelect('q.city', 'city');
    qb.leftJoinAndSelect('q.subway', 'subway');
    qb.leftJoinAndSelect('q.user', 'user');

    qb.where({ ...rest });

    if (username) {
      qb.andWhere(`user.username LIKE '%${username}%'`);
    }

    if (cityId) {
      qb.andWhere(`city.id = ${cityId}`);
    }

    if (subwayId) {
      qb.andWhere(`subway.id = ${subwayId}`);
    }

    if (title) {
      qb.andWhere(`q.title LIKE '%${title}%'`);
    }

    return qb
      .skip(skip * take)
      .take(take)
      .getManyAndCount();
  }

  private async addCitySubwayToHouse(to: House, dto: { cityId?: number; subwayId?: number }) {
    // 如果有城市
    if (dto.cityId) {
      const city = await this.cityService.findByIdAndThrowError(dto.cityId);
      to.city = city;
    }
    // 如果有地铁
    if (dto.subwayId) {
      const subway = await this.subwayService.findByIdAndThrowError(dto.subwayId);
      to.subway = subway;
    }
    return to;
  }

  /**
   * 更新数据 数据实体不存在 id 时抛错
   */
  async update(dto: UpdateHouseInput): Promise<House> {
    const { id } = dto;
    let toUpdate = await this.findByIdAndThrowError(id);
    toUpdate = await this.addCitySubwayToHouse(toUpdate, dto);
    return await this.repository.save(Object.assign(toUpdate, dto));
  }

  /**
   *
   * @param dto
   * @param user 房子所属用户
   */
  async create(dto: CreateHouseInput, user: IUser): Promise<House> {
    let toSave = this.repository.create(dto);
    toSave.user = user;
    toSave = await this.addCitySubwayToHouse(toSave, dto);
    return await this.repository.save(toSave);
  }
}
