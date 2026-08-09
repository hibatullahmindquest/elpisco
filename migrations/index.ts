import * as migration_20260809_013645_initial from './20260809_013645_initial';
import * as migration_20260809_014416_add_projects_pages_navigation from './20260809_014416_add_projects_pages_navigation';
import * as migration_20260809_021510_add_site_settings from './20260809_021510_add_site_settings';
import * as migration_20260809_022715_add_seo from './20260809_022715_add_seo';
import * as migration_20260809_030052_add_tracking from './20260809_030052_add_tracking';
import * as migration_20260809_043924_add_redirects_enquiries from './20260809_043924_add_redirects_enquiries';
import * as migration_20260809_053152_add_faq_testimonials_credentials_careers from './20260809_053152_add_faq_testimonials_credentials_careers';
import * as migration_20260809_064509_extend_enquiries_for_assessment_wizard from './20260809_064509_extend_enquiries_for_assessment_wizard';
import * as migration_20260809_073329_add_founders_and_homepage from './20260809_073329_add_founders_and_homepage';
import * as migration_20260809_090422_add_pages_layout_blocks from './20260809_090422_add_pages_layout_blocks';
import * as migration_20260809_091500_seed_about_page_content from './20260809_091500_seed_about_page_content';
import * as migration_20260809_092819_remove_homepage_global from './20260809_092819_remove_homepage_global';
import * as migration_20260809_092842_add_page_blocks_batch2 from './20260809_092842_add_page_blocks_batch2';
import * as migration_20260809_093518_add_numbered_list_headline_cta from './20260809_093518_add_numbered_list_headline_cta';
import * as migration_20260809_094000_seed_process_page_content from './20260809_094000_seed_process_page_content';
import * as migration_20260809_094015_seed_why_elpis_page_content from './20260809_094015_seed_why_elpis_page_content';
import * as migration_20260809_094030_seed_faq_page_content from './20260809_094030_seed_faq_page_content';
import * as migration_20260809_094045_seed_careers_page_content from './20260809_094045_seed_careers_page_content';
import * as migration_20260809_094100_seed_services_page_content from './20260809_094100_seed_services_page_content';
import * as migration_20260809_094115_seed_contact_page_content from './20260809_094115_seed_contact_page_content';
import * as migration_20260809_094130_seed_home_page_content from './20260809_094130_seed_home_page_content';
import * as migration_20260809_095403_restore_images_and_headline_accent from './20260809_095403_restore_images_and_headline_accent';
import * as migration_20260809_095500_restore_images_and_two_tone_headlines from './20260809_095500_restore_images_and_two_tone_headlines';

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
    name: '20260809_053152_add_faq_testimonials_credentials_careers',
  },
  {
    up: migration_20260809_064509_extend_enquiries_for_assessment_wizard.up,
    down: migration_20260809_064509_extend_enquiries_for_assessment_wizard.down,
    name: '20260809_064509_extend_enquiries_for_assessment_wizard',
  },
  {
    up: migration_20260809_073329_add_founders_and_homepage.up,
    down: migration_20260809_073329_add_founders_and_homepage.down,
    name: '20260809_073329_add_founders_and_homepage',
  },
  {
    up: migration_20260809_090422_add_pages_layout_blocks.up,
    down: migration_20260809_090422_add_pages_layout_blocks.down,
    name: '20260809_090422_add_pages_layout_blocks',
  },
  {
    up: migration_20260809_091500_seed_about_page_content.up,
    down: migration_20260809_091500_seed_about_page_content.down,
    name: '20260809_091500_seed_about_page_content',
  },
  {
    up: migration_20260809_092819_remove_homepage_global.up,
    down: migration_20260809_092819_remove_homepage_global.down,
    name: '20260809_092819_remove_homepage_global',
  },
  {
    up: migration_20260809_092842_add_page_blocks_batch2.up,
    down: migration_20260809_092842_add_page_blocks_batch2.down,
    name: '20260809_092842_add_page_blocks_batch2',
  },
  {
    up: migration_20260809_093518_add_numbered_list_headline_cta.up,
    down: migration_20260809_093518_add_numbered_list_headline_cta.down,
    name: '20260809_093518_add_numbered_list_headline_cta',
  },
  {
    up: migration_20260809_094000_seed_process_page_content.up,
    down: migration_20260809_094000_seed_process_page_content.down,
    name: '20260809_094000_seed_process_page_content',
  },
  {
    up: migration_20260809_094015_seed_why_elpis_page_content.up,
    down: migration_20260809_094015_seed_why_elpis_page_content.down,
    name: '20260809_094015_seed_why_elpis_page_content',
  },
  {
    up: migration_20260809_094030_seed_faq_page_content.up,
    down: migration_20260809_094030_seed_faq_page_content.down,
    name: '20260809_094030_seed_faq_page_content',
  },
  {
    up: migration_20260809_094045_seed_careers_page_content.up,
    down: migration_20260809_094045_seed_careers_page_content.down,
    name: '20260809_094045_seed_careers_page_content',
  },
  {
    up: migration_20260809_094100_seed_services_page_content.up,
    down: migration_20260809_094100_seed_services_page_content.down,
    name: '20260809_094100_seed_services_page_content',
  },
  {
    up: migration_20260809_094115_seed_contact_page_content.up,
    down: migration_20260809_094115_seed_contact_page_content.down,
    name: '20260809_094115_seed_contact_page_content',
  },
  {
    up: migration_20260809_094130_seed_home_page_content.up,
    down: migration_20260809_094130_seed_home_page_content.down,
    name: '20260809_094130_seed_home_page_content',
  },
  {
    up: migration_20260809_095403_restore_images_and_headline_accent.up,
    down: migration_20260809_095403_restore_images_and_headline_accent.down,
    name: '20260809_095403_restore_images_and_headline_accent',
  },
  {
    up: migration_20260809_095500_restore_images_and_two_tone_headlines.up,
    down: migration_20260809_095500_restore_images_and_two_tone_headlines.down,
    name: '20260809_095500_restore_images_and_two_tone_headlines',
  },
];
