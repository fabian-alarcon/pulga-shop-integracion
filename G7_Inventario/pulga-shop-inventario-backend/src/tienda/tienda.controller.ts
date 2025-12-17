import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Headers, 
} from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { CreateTiendaDto } from './dto/create-tienda.dto';
import { Public } from 'src/auth/decorators/is-public.decorator';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { GetTiendaDto } from './dto/get-tienda.dto';
import { UserRoles } from 'src/common/interfaces/user.roles.interface';

@Controller('tiendas')
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}

  /**
   * Crea una tienda.
   * Se utiliza el ID del vendedor enviado desde el header por el frontend.
   */
  @Post()
  async create(
    @Body() createTiendaDto: CreateTiendaDto,
    @Headers('x-user-id') headerId: string,
  ) {
    const idVendedor = headerId || createTiendaDto['id_vendedor'] || "vendedor-default";
    return await this.tiendaService.create(createTiendaDto, idVendedor);
  }

  /**
   * Obtener una tienda por ID.
   */
  @Get(':id_tienda')
  @HttpCode(HttpStatus.OK)
  @Public() 
  async findOne(@Param('id_tienda') id_tienda: number) {
    return this.tiendaService.findOne(Number(id_tienda));
  }

  /**
   * Listar tiendas.
   * Mock de roles ajustado para cumplir con la interfaz UserRoles (G7).
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Headers('x-user-id') headerId: string,
  ): Promise<PageDto<GetTiendaDto>> {
    
    // CORRECCIÓN: Se eliminó 'esCliente' para evitar el error TS2353
    const mockRoles: UserRoles = {
      esAdministrador: false,
      esVendedor: true,
    };

    const idVendedor = headerId || null;

    return this.tiendaService.findAll(pageOptionsDto, idVendedor, mockRoles);
  }
}