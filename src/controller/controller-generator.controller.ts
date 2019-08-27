import { Controller, Post, Body } from '@nestjs/common';
import { ControllerGeneratorService } from './controller-generator.service';
import { CreateControllerDto } from '../shared/models/create-controller.dto';

@Controller('controller')
export class ControllerGenerator {
  constructor(private readonly controllerGeneratorService: ControllerGeneratorService) {}

  @Post()
  public createController(@Body() createControllerDto: CreateControllerDto) {
    console.log({ createControllerDto });
    return this.controllerGeneratorService.generateController();
  }
}
