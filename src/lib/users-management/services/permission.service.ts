import { RoleRepository } from "../repositories/role.repository";

export class PermissionService {
  private roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

}
