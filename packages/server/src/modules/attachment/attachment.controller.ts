import { Controller, Body, Get } from '@nestjs/common';
import { AttachmentService } from './attachment.service';

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Get('/signature')
  async getSignature() {
    await this.attachmentService.getSignature();
  }
}
