export const defaultPermissions = [
  {
    _id: {
      $oid: '6084bc523d86eb9e708c9a4b',
    },
    name: 'admin',
    projectId: '1',
    routes: [
      {
        source: '/',
        name: 'Dashboard',
      },
      {
        source: '/profile',
        name: 'Perfil',
        actions: [
          {
            $oid: '6084be503d86eb9e708c9a4d',
          },
          {
            $oid: '6084be7a3d86eb9e708c9a4e',
          },
          {
            $oid: '6084bde93d86eb9e708c9a4c',
          },
        ],
      },
      {
        source: '/users',
        name: 'Usuários',
        actions: [
          {
            $oid: '6084bde93d86eb9e708c9a4c',
          },
          {
            $oid: '6084bebe3d86eb9e708c9a51',
          },
          {
            $oid: '6084be7a3d86eb9e708c9a4e',
          },
        ],
      },
    ],
    ownerId: 'cbae830f-9db6-4c62-a288-6a88e7e4396e',
    creatorId: 'acf5068a-ea1b-48e0-b31f-674abc94505c',
  },
];
