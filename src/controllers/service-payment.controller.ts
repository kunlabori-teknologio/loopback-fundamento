import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {ServicePayment} from '../models';
import {ServicePaymentRepository} from '../repositories';

@authenticate('jwt')
export class ServicePaymentController {
  constructor(
    @repository(ServicePaymentRepository)
    public servicePaymentRepository : ServicePaymentRepository,
  ) {}

  @post('/service-payments')
  @response(200, {
    description: 'ServicePayment model instance',
    content: {'application/json': {schema: getModelSchemaRef(ServicePayment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePayment, {
            title: 'NewServicePayment',
            exclude: ['id'],
          }),
        },
      },
    })
    servicePayment: Omit<ServicePayment, 'id'>,
  ): Promise<ServicePayment> {
    return this.servicePaymentRepository.create(servicePayment);
  }

  @get('/service-payments/count')
  @response(200, {
    description: 'ServicePayment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ServicePayment) where?: Where<ServicePayment>,
  ): Promise<Count> {
    return this.servicePaymentRepository.count(where);
  }

  @get('/service-payments')
  @response(200, {
    description: 'Array of ServicePayment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ServicePayment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ServicePayment) filter?: Filter<ServicePayment>,
  ): Promise<ServicePayment[]> {
    return this.servicePaymentRepository.find(filter);
  }

  @patch('/service-payments')
  @response(200, {
    description: 'ServicePayment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePayment, {partial: true}),
        },
      },
    })
    servicePayment: ServicePayment,
    @param.where(ServicePayment) where?: Where<ServicePayment>,
  ): Promise<Count> {
    return this.servicePaymentRepository.updateAll(servicePayment, where);
  }

  @get('/service-payments/{id}')
  @response(200, {
    description: 'ServicePayment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ServicePayment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ServicePayment, {exclude: 'where'}) filter?: FilterExcludingWhere<ServicePayment>
  ): Promise<ServicePayment> {
    return this.servicePaymentRepository.findById(id, filter);
  }

  @patch('/service-payments/{id}')
  @response(204, {
    description: 'ServicePayment PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicePayment, {partial: true}),
        },
      },
    })
    servicePayment: ServicePayment,
  ): Promise<void> {
    await this.servicePaymentRepository.updateById(id, servicePayment);
  }

  @put('/service-payments/{id}')
  @response(204, {
    description: 'ServicePayment PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() servicePayment: ServicePayment,
  ): Promise<void> {
    await this.servicePaymentRepository.replaceById(id, servicePayment);
  }

  @del('/service-payments/{id}')
  @response(204, {
    description: 'ServicePayment DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.servicePaymentRepository.deleteById(id);
  }
}
