import { Controller, Get, Request } from '@nestjs/common';
import { IOSSSignature } from '@xf/common/src/interfaces/oss-signature.interface';
import { AttachmentService } from './attachment.service';

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Get('/signature')
  async getSignature(@Request() req): Promise<IOSSSignature> {
    const ret = await this.attachmentService.getSignature(req.user.id);
    return ret;
  }
}
