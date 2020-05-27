import { Get,Controller,Post,Put, Delete, Body, Param } from '@nestjs/common';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService){}
    @Get()
    index(): Promise<Contact[]> {
      return this.contactService.findAll();
    }  
    @Post('create')
    async create(@Body() contactData: Contact): Promise<any> {
      return this.contactService.create(contactData);
    } 
    @Put(':id/update')
    async update(@Param('id') id, @Body() contactData: Contact): Promise<any> {
        contactData.id = Number(id);
        console.log('Update #' + contactData.id)
        return this.contactService.update(contactData);
    }  
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.contactService.delete(id);
    }     
}
