import * as migration_20260618_141023 from './20260618_141023';
import * as migration_20260618_141256 from './20260618_141256';

export const migrations = [
  {
    up: migration_20260618_141023.up,
    down: migration_20260618_141023.down,
    name: '20260618_141023',
  },
  {
    up: migration_20260618_141256.up,
    down: migration_20260618_141256.down,
    name: '20260618_141256'
  },
];
