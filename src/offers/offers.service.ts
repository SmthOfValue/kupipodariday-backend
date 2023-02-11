import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishesService: WishesService,
  ) {}

  async create(createOfferDto: CreateOfferDto) {
    const item = await this.wishesService.findOne(createOfferDto.item);
    return this.offerRepository.save({ ...createOfferDto, item });
  }

  async findAll() {
    return this.offerRepository.find();
  }

  async findOne(id: number) {
    return this.offerRepository.findOneBy({ id });
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    const item = await this.wishesService.findOne(updateOfferDto.item);
    return this.offerRepository.save({ ...updateOfferDto, item, id });
  }

  async remove(id: number) {
    return this.offerRepository.delete({ id });
  }
}
