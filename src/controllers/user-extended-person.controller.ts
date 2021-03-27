import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Person, UserExtended
} from '../models';
import {UserExtendedRepository} from '../repositories';

@authenticate('jwt')
export class UserExtendedPersonController {
  constructor(
    @repository(UserExtendedRepository) protected userExtendedRepository: UserExtendedRepository,
  ) { }

  @get('/user-extendeds/{id}/person', {
    responses: {
      '200': {
        description: 'UserExtended has one Person',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Person),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Person>,
  ): Promise<Person> {
    return this.userExtendedRepository.person(id).get(filter);
  }

  @post('/user-extendeds/{id}/person', {
    responses: {
      '200': {
        description: 'UserExtended model instance',
        content: {'application/json': {schema: getModelSchemaRef(Person)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserExtended.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {
            title: 'NewPersonInUserExtended',
            exclude: ['id'],
            optional: ['userExtendedId']
          }),
        },
      },
    }) person: Omit<Person, 'id'>,
  ): Promise<Person> {
    return this.userExtendedRepository.person(id).create(person);
  }

  @patch('/user-extendeds/{id}/person', {
    responses: {
      '200': {
        description: 'UserExtended.Person PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Partial<Person>,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.userExtendedRepository.person(id).patch(person, where);
  }

  @del('/user-extendeds/{id}/person', {
    responses: {
      '200': {
        description: 'UserExtended.Person DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.userExtendedRepository.person(id).delete(where);
  }
}
