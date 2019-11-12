import { Controller, Get } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { IOSSSignature } from '@xf/common/src/interfaces/oss-signature.interface';

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Get('/signature')
  async getSignature(): Promise<IOSSSignature> {
    const ret = await this.attachmentService.getSignature();
    return ret;
  }
}
