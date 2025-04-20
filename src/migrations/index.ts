import * as migration_20250413_044201_initial from './20250413_044201_initial';

export const migrations = [
  {
    up: migration_20250413_044201_initial.up,
    down: migration_20250413_044201_initial.down,
    name: '20250413_044201_initial',
  },

];
