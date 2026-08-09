import * as migration_20260809_013645_initial from './20260809_013645_initial';
import * as migration_20260809_014416_add_projects_pages_navigation from './20260809_014416_add_projects_pages_navigation';
import * as migration_20260809_021510_add_site_settings from './20260809_021510_add_site_settings';
import * as migration_20260809_022715_add_seo from './20260809_022715_add_seo';
import * as migration_20260809_030052_add_tracking from './20260809_030052_add_tracking';
import * as migration_20260809_043924_add_redirects_enquiries from './20260809_043924_add_redirects_enquiries';
import * as migration_20260809_053152_add_faq_testimonials_credentials_careers from './20260809_053152_add_faq_testimonials_credentials_careers';

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
    name: '20260809_021510_add_site_settings',
  },
  {
    up: migration_20260809_022715_add_seo.up,
    down: migration_20260809_022715_add_seo.down,
    name: '20260809_022715_add_seo',
  },
  {
    up: migration_20260809_030052_add_tracking.up,
    down: migration_20260809_030052_add_tracking.down,
    name: '20260809_030052_add_tracking',
  },
  {
    up: migration_20260809_043924_add_redirects_enquiries.up,
    down: migration_20260809_043924_add_redirects_enquiries.down,
    name: '20260809_043924_add_redirects_enquiries',
  },
  {
    up: migration_20260809_053152_add_faq_testimonials_credentials_careers.up,
    down: migration_20260809_053152_add_faq_testimonials_credentials_careers.down,
    name: '20260809_053152_add_faq_testimonials_credentials_careers'
  },
];
