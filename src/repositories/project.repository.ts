import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Module, Project, ProjectRelations} from '../models';
import {ModuleRepository} from './module.repository';

export class ProjectRepository extends DefaultCrudRepository<
  Project,
  typeof Project.prototype.id,
  ProjectRelations
>
{
  modules: HasManyRepositoryFactory<Module, typeof Project.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('ModuleRepository') moduleRepositoryGetter: Getter<ModuleRepository>,
  ) {
    super(Project, dataSource);
    this.modules = this.createHasManyRepositoryFactoryFor(
      'modules',
      moduleRepositoryGetter,
    );

    this.registerInclusionResolver('modules', this.modules.inclusionResolver);
  }
}
