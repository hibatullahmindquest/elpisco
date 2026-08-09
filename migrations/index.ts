import * as migration_20260809_013645_initial from './20260809_013645_initial';
import * as migration_20260809_014416_add_projects_pages_navigation from './20260809_014416_add_projects_pages_navigation';
import * as migration_20260809_021510_add_site_settings from './20260809_021510_add_site_settings';

export const migrations = [
  {
    up: migration_20260809_013645_initial.up,
    down: migration_20260809_013645_initial.down,
    name: '20260809_013645_initial',
  },
  {
    up: migration_20260809_014416_add_projects_pages_navigation.up,
    down: migration_20260809_014416_add_projects_pages_navigation.down,
    name: '20260809_014416_add_projects_pages_navigation',
  },
  {
    up: migration_20260809_021510_add_site_settings.up,
    down: migration_20260809_021510_add_site_settings.down,
    name: '20260809_021510_add_site_settings'
  },
];
