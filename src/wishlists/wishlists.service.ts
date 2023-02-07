import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
  ) {}

  async create(createWishlistDto: CreateWishlistDto) {
    const { name, items, description, image } = createWishlistDto;
    const wishes = await this.wishesService.findMany(items);
    return this.wishlistRepository.save({
      name,
      items: wishes,
      description,
      image,
    });
  }

  async findAll() {
    return this.wishlistRepository.find();
  }

  async findOne(id: number) {
    return this.wishlistRepository.findOneBy({ id });
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    const { name, items, description, image } = updateWishlistDto;
    const wishes = this.wishesService.findMany(items);
    return this.wishlistRepository.save({
      id,
      name,
      wishes,
      description,
      image,
    });
  }

  async remove(id: number) {
    return this.wishlistRepository.delete({ id });
  }
}
