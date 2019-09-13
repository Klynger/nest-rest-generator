import { Controller, Post, Body } from '@nestjs/common';
import { ControllerGeneratorService } from './controller-generator.service';
import { CreateControllerDto } from '../shared/models/create-controller.dto';

@Controller('controller')
export class ControllerGeneratorController {
  constructor(private readonly controllerGeneratorService: ControllerGeneratorService) {}

  @Post()
  public createController(@Body() createControllerDto: CreateControllerDto) {
    return this.controllerGeneratorService.generateController(createControllerDto);
  }
}
