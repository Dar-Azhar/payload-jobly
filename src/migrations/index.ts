import * as migration_20250413_044201_initial from './20250413_044201_initial';
import * as migration_20250413_061412_initial from './20250413_061412_initial';

export const migrations = [
  {
    up: migration_20250413_044201_initial.up,
    down: migration_20250413_044201_initial.down,
    name: '20250413_044201_initial',
  },
  {
    up: migration_20250413_061412_initial.up,
    down: migration_20250413_061412_initial.down,
    name: '20250413_061412_initial'
  },
];
