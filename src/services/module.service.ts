import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ComponentRepository, ModuleRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ModuleService {
  constructor(
    /* Add @inject to inject parameters */
    @repository(ModuleRepository) public moduleRepository: ModuleRepository,
    @repository(ComponentRepository) public componentRepository: ComponentRepository,
  ) { }

  /*
   * Add service methods here
   */
  async findAndPopulate() {
    // Get all components to populate modules
    var components = await this.componentRepository.find();

    // Get modules and populate components field with data from component repository
    var modules = await this.moduleRepository.find();
    modules = modules.map(module => {
      module.components = components.filter(component => module.components?.map(el => el.toString()).includes(component.id?.toString()));
      return module;
    });

    return modules;
  }
}
