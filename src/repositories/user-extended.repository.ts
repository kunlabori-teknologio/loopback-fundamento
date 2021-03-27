import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UserExtended, UserExtendedRelations, Person, Company, Address, CreditCard, ScheduleSetting, Schedule, UserHasService, ScheduleHasUserHasService} from '../models';
import {PersonRepository} from './person.repository';
import {CompanyRepository} from './company.repository';
import {AddressRepository} from './address.repository';
import {CreditCardRepository} from './credit-card.repository';
import {ScheduleSettingRepository} from './schedule-setting.repository';
import {ScheduleRepository} from './schedule.repository';
import {UserHasServiceRepository} from './user-has-service.repository';
import {ScheduleHasUserHasServiceRepository} from './schedule-has-user-has-service.repository';

export class UserExtendedRepository extends DefaultCrudRepository<
  UserExtended,
  typeof UserExtended.prototype.id,
  UserExtendedRelations
> {

  public readonly person: HasOneRepositoryFactory<Person, typeof UserExtended.prototype.id>;

  public readonly company: HasOneRepositoryFactory<Company, typeof UserExtended.prototype.id>;

  public readonly addresses: HasManyRepositoryFactory<Address, typeof UserExtended.prototype.id>;

  public readonly creditCards: HasManyRepositoryFactory<CreditCard, typeof UserExtended.prototype.id>;

  public readonly scheduleSettings: HasManyRepositoryFactory<ScheduleSetting, typeof UserExtended.prototype.id>;

  public readonly schedules: HasManyRepositoryFactory<Schedule, typeof UserExtended.prototype.id>;

  public readonly userHasServices: HasManyRepositoryFactory<UserHasService, typeof UserExtended.prototype.id>;

  public readonly scheduleHasUserHasServices: HasManyRepositoryFactory<ScheduleHasUserHasService, typeof UserExtended.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('CreditCardRepository') protected creditCardRepositoryGetter: Getter<CreditCardRepository>, @repository.getter('ScheduleSettingRepository') protected scheduleSettingRepositoryGetter: Getter<ScheduleSettingRepository>, @repository.getter('ScheduleRepository') protected scheduleRepositoryGetter: Getter<ScheduleRepository>, @repository.getter('UserHasServiceRepository') protected userHasServiceRepositoryGetter: Getter<UserHasServiceRepository>, @repository.getter('ScheduleHasUserHasServiceRepository') protected scheduleHasUserHasServiceRepositoryGetter: Getter<ScheduleHasUserHasServiceRepository>,
  ) {
    super(UserExtended, dataSource);
    this.scheduleHasUserHasServices = this.createHasManyRepositoryFactoryFor('scheduleHasUserHasServices', scheduleHasUserHasServiceRepositoryGetter,);
    this.registerInclusionResolver('scheduleHasUserHasServices', this.scheduleHasUserHasServices.inclusionResolver);
    this.userHasServices = this.createHasManyRepositoryFactoryFor('userHasServices', userHasServiceRepositoryGetter,);
    this.registerInclusionResolver('userHasServices', this.userHasServices.inclusionResolver);
    this.schedules = this.createHasManyRepositoryFactoryFor('schedules', scheduleRepositoryGetter,);
    this.registerInclusionResolver('schedules', this.schedules.inclusionResolver);
    this.scheduleSettings = this.createHasManyRepositoryFactoryFor('scheduleSettings', scheduleSettingRepositoryGetter,);
    this.registerInclusionResolver('scheduleSettings', this.scheduleSettings.inclusionResolver);
    this.creditCards = this.createHasManyRepositoryFactoryFor('creditCards', creditCardRepositoryGetter,);
    this.registerInclusionResolver('creditCards', this.creditCards.inclusionResolver);
    this.addresses = this.createHasManyRepositoryFactoryFor('addresses', addressRepositoryGetter,);
    this.registerInclusionResolver('addresses', this.addresses.inclusionResolver);
    this.company = this.createHasOneRepositoryFactoryFor('company', companyRepositoryGetter);
    this.registerInclusionResolver('company', this.company.inclusionResolver);
    this.person = this.createHasOneRepositoryFactoryFor('person', personRepositoryGetter);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
