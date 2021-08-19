import {inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Module, Project, ProjectRelations} from '../models';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
>
{
  modules: HasManyRepositoryFactory<Module, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Project, dataSource);
  }
}
