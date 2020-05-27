import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contact } from './contact.entity';

const mockRepository = () => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),

});

describe('ContactService', () => {
  let service: ContactService;
  let contactRepository: Repository<Contact>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService,
      { provide: getRepositoryToken(Contact), useFactory: mockRepository},
    ],
    }).compile();

    service = module.get(ContactService);
    contactRepository = module.get(getRepositoryToken(Contact));
  });
  describe('find contact', () =>{
    it('gets all contact from repository', async () =>{
      //contactRepository.find.mockResolvedValue('somevalue');
      expect(contactRepository.find).not.toHaveBeenCalled();

      service.findAll()
      expect(contactRepository.find).toHaveBeenCalled();
    });
  });
  describe('create task', () =>{
    it('calls service.create and save the result', async() =>{
      let user= await service.create({
        id:1,
        firstName:"shivam",
        lastName:"bhargav",
        email:"shiavm@gmail.com",
        phone:"769404839",
        city:"noida",
        country:"india"
      });
      expect(contactRepository.save(user));
    });

  });
  describe('update task', () =>{
    it('calls service.update and save the result', async() =>{
      let user1=({
        firstName:"shivam1",
        lastName:"bhargav1",
        email:"",
        phone:"7694048319",
        city:"noida1",
        country:"india1"
      });
      expect(contactRepository.update(1,user1));
    });
  });
  describe('delete task',()=>{
    it('delete the contact', async() =>{
      expect(contactRepository.delete).not.toHaveBeenCalled();
      service.delete(1);
      expect(contactRepository.delete(1));

    });
  });

  
});
