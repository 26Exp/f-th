import i18n from '@i18n';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import SettingsAppNavigation from '@/app/(control-panel)/apps/settings/SettingsAppNavigation';

i18n.addResourceBundle('en', 'navigation', en);
i18n.addResourceBundle('tr', 'navigation', tr);
i18n.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'dashboards',
		title: 'Dashboards',
		subtitle: 'Unique dashboard designs',
		type: 'group',
		icon: 'heroicons-outline:home',
		translate: 'DASHBOARDS',
		children: [
			{
				id: 'dashboards.project',
				title: 'Project',
				type: 'item',
				icon: 'heroicons-outline:clipboard-document-check',
				url: '/dashboards/project'
			},
			{
				id: 'dashboards.analytics',
				title: 'Analytics',
				type: 'item',
				icon: 'heroicons-outline:chart-pie',
				url: '/dashboards/analytics'
			},
			{
				id: 'dashboards.finance',
				title: 'Finance',
				type: 'item',
				icon: 'heroicons-outline:banknotes',
				url: '/dashboards/finance'
			},
			{
				id: 'dashboards.crypto',
				title: 'Crypto',
				type: 'item',
				icon: 'heroicons-outline:currency-dollar',
				url: '/dashboards/crypto'
			}
		]
	},
	{
		id: 'apps',
		title: 'Applications',
		subtitle: 'Custom made application designs',
		type: 'group',
		icon: 'heroicons-outline:cube',
		translate: 'APPLICATIONS',
		children: [
			{
				id: 'apps.academy',
				title: 'Academy',
				type: 'item',
				icon: 'heroicons-outline:academic-cap',
				url: '/apps/academy',
				translate: 'ACADEMY'
			},
			{
				id: 'apps.calendar',
				title: 'Calendar',
				subtitle: '3 upcoming events',
				type: 'item',
				icon: 'heroicons-outline:calendar',
				url: '/apps/calendar',
				translate: 'CALENDAR'
			},
			{
				id: 'apps.messenger',
				title: 'Messenger',
				type: 'item',
				icon: 'heroicons-outline:chat-bubble-bottom-center',
				url: '/apps/messenger',
				translate: 'MESSENGER'
			},
			{
				id: 'apps.contacts',
				title: 'Contacts',
				type: 'item',
				icon: 'heroicons-outline:user-group',
				url: '/apps/contacts',
				translate: 'CONTACTS'
			},
			{
				id: 'apps.ecommerce',
				title: 'ECommerce',
				type: 'collapse',
				icon: 'heroicons-outline:shopping-cart',
				translate: 'ECOMMERCE',
				children: [
					{
						id: 'e-commerce-products',
						title: 'Products',
						type: 'item',
						url: '/apps/e-commerce/products',
						end: true
					},
					{
						id: 'e-commerce-product-detail',
						title: 'Product Detail',
						type: 'item',
						url: '/apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print'
					},
					{
						id: 'e-commerce-new-product',
						title: 'New Product',
						type: 'item',
						url: '/apps/e-commerce/products/new'
					},
					{
						id: 'e-commerce-orders',
						title: 'Orders',
						type: 'item',
						url: '/apps/e-commerce/orders',
						end: true
					},
					{
						id: 'e-commerce-order-detail',
						title: 'Order Detail',
						type: 'item',
						url: '/apps/e-commerce/orders/1'
					}
				]
			},
			{
				id: 'apps.file-manager',
				title: 'File Manager',
				type: 'item',
				icon: 'heroicons-outline:cloud',
				url: '/apps/file-manager',
				end: true,
				translate: 'FILE_MANAGER'
			},
			{
				id: 'apps.help-center',
				title: 'Help Center',
				type: 'collapse',
				icon: 'heroicons-outline:information-circle',
				url: '/apps/help-center',
				children: [
					{
						id: 'apps.help-center.home',
						title: 'Home',
						type: 'item',
						url: '/apps/help-center',
						end: true
					},
					{
						id: 'apps.help-center.faqs',
						title: 'FAQs',
						type: 'item',
						url: '/apps/help-center/faqs'
					},
					{
						id: 'apps.help-center.guides',
						title: 'Guides',
						type: 'item',
						url: '/apps/help-center/guides'
					},
					{
						id: 'apps.help-center.support',
						title: 'Support',
						type: 'item',
						url: '/apps/help-center/support'
					}
				]
			},
			{
				id: 'apps.mailbox',
				title: 'Mailbox',
				type: 'item',
				icon: 'heroicons-outline:envelope',
				url: '/apps/mailbox/folders/inbox',
				translate: 'MAIL',
				badge: {
					title: '27',
					classes: 'px-8 bg-pink-600 text-white rounded-full'
				}
			},
			{
				id: 'apps.notes',
				title: 'Notes',
				type: 'item',
				icon: 'heroicons-outline:pencil-square',
				url: '/apps/notes',
				translate: 'NOTES'
			},
			{
				id: 'apps.scrumboard',
				title: 'Scrumboard',
				type: 'item',
				icon: 'heroicons-outline:view-columns',
				url: '/apps/scrumboard',
				translate: 'SCRUMBOARD'
			},
			{
				id: 'apps.tasks',
				title: 'Tasks',
				subtitle: '12 remaining tasks',
				type: 'item',
				icon: 'heroicons-outline:check-circle',
				url: '/apps/tasks',
				translate: 'TASKS'
			},
			{
				id: 'apps.profile',
				title: 'Profile',
				type: 'item',
				icon: 'heroicons-outline:user-circle',
				url: '/apps/profile'
			},
			{
				id: 'apps.notifications',
				title: 'Notifications',
				type: 'item',
				icon: 'heroicons-outline:bell',
				url: '/apps/notifications'
			},
			{
				...SettingsAppNavigation,
				type: 'item',
				badge: {
					title: 'NEW'
				}
			}
		]
	},
	{
		id: 'pages',
		title: 'Pages',
		subtitle: 'Custom made page designs',
		type: 'group',
		icon: 'heroicons-outline:document',
		children: [
			{
				id: 'pages.activities',
				title: 'Activities',
				type: 'item',
				icon: 'heroicons-outline:bars-3-bottom-left',
				url: '/pages/activities'
			},
			{
				id: 'pages.authentication',
				title: 'Authentication',
				type: 'collapse',
				icon: 'heroicons-outline:lock-closed',
				children: [
					{
						id: 'pages.authentication.sign-in',
						title: 'Sign in',
						type: 'collapse',
						children: [
							{
								id: 'pages.authentication.sign-in.classic',
								title: 'Classic',
								type: 'item',
								url: '/pages/authentication/sign-in/classic'
							},
							{
								id: 'pages.authentication.sign-in.modern',
								title: 'Modern',
								type: 'item',
								url: '/pages/authentication/sign-in/modern'
							},
							{
								id: 'pages.authentication.sign-in.modern-reversed',
								title: 'Modern Reversed',
								type: 'item',
								url: '/pages/authentication/sign-in/modern-reversed'
							},
							{
								id: 'pages.authentication.sign-in.split-screen',
								title: 'Split Screen',
								type: 'item',
								url: '/pages/authentication/sign-in/split-screen'
							},
							{
								id: 'pages.authentication.sign-in.split-screen-reversed',
								title: 'Split Screen Reversed',
								type: 'item',
								url: '/pages/authentication/sign-in/split-screen-reversed'
							},
							{
								id: 'pages.authentication.sign-in.full-screen',
								title: 'Full Screen',
								type: 'item',
								url: '/pages/authentication/sign-in/full-screen'
							},
							{
								id: 'pages.authentication.sign-in.full-screen-reversed',
								title: 'Full Screen Reversed',
								type: 'item',
								url: '/pages/authentication/sign-in/full-screen-reversed'
							}
						]
					},
					{
						id: 'pages.authentication.sign-up',
						title: 'Sign up',
						type: 'collapse',
						children: [
							{
								id: 'pages.authentication.sign-up.classic',
								title: 'Classic',
								type: 'item',
								url: '/pages/authentication/sign-up/classic'
							},
							{
								id: 'pages.authentication.sign-up.modern',
								title: 'Modern',
								type: 'item',
								url: '/pages/authentication/sign-up/modern'
							},
							{
								id: 'pages.authentication.sign-up.modern-reversed',
								title: 'Modern Reversed',
								type: 'item',
								url: '/pages/authentication/sign-up/modern-reversed'
							},
							{
								id: 'pages.authentication.sign-up.split-screen',
								title: 'Split Screen',
								type: 'item',
								url: '/pages/authentication/sign-up/split-screen'
							},
							{
								id: 'pages.authentication.sign-up.split-screen-reversed',
								title: 'Split Screen Reversed',
								type: 'item',
								url: '/pages/authentication/sign-up/split-screen-reversed'
							},
							{
								id: 'pages.authentication.sign-up.full-screen',
								title: 'Full Screen',
								type: 'item',
								url: '/pages/authentication/sign-up/full-screen'
							},
							{
								id: 'pages.authentication.sign-up.full-screen-reversed',
								title: 'Full Screen Reversed',
								type: 'item',
								url: '/pages/authentication/sign-up/full-screen-reversed'
							}
						]
					},
					{
						id: 'pages.authentication.sign-out',
						title: 'Sign out',
						type: 'collapse',
						children: [
							{
								id: 'pages.authentication.sign-out.classic',
								title: 'Classic',
								type: 'item',
								url: '/pages/authentication/sign-out/classic'
							},
							{
								id: 'pages.authentication.sign-out.modern',
								title: 'Modern',
								type: 'item',
								url: '/pages/authentication/sign-out/modern'
							},
							{
								id: 'pages.authentication.sign-out.modern-reversed',
								title: 'Modern Reversed',
								type: 'item',
								url: '/pages/authentication/sign-out/modern-reversed'
							},
							{
								id: 'pages.authentication.sign-out.split-screen',
								title: 'Split Screen',
								type: 'item',
								url: '/pages/authentication/sign-out/split-screen'
							},
							{
								id: 'pages.authentication.sign-out.split-screen-reversed',
								title: 'Split Screen Reversed',
								type: 'item',
								url: '/pages/authentication/sign-out/split-screen-reversed'
							},
							{
								id: 'pages.authentication.sign-out.full-screen',
								title: 'Full Screen',
								type: 'item',
								url: '/pages/authentication/sign-out/full-screen'
							},
							{
								id: 'pages.authentication.sign-out.full-screen-reversed',
								title: 'Full Screen Reversed',
								type: 'item',
								url: '/pages/authentication/sign-out/full-screen-reversed'
							}
						]
					},
					{
						id: 'pages.authentication.forgot-password',
						title: 'Forgot password',
						type: 'collapse',
						children: [
							{
								id: 'pages.authentication.forgot-password.classic',
								title: 'Classic',
								type: 'item',
								url: '/pages/authentication/forgot-password/classic'
							},
							{
								id: 'pages.authentication.forgot-password.modern',
								title: 'Modern',
								type: 'item',
								url: '/pages/authentication/forgot-password/modern'
							},
							{
								id: 'pages.authentication.forgot-password.modern-reversed',
								title: 'Modern Reversed',
								type: 'item',
								url: '/pages/authentication/forgot-password/modern-reversed'
							},
							{
								id: 'pages.authentication.forgot-password.split-screen',
								title: 'Split Screen',
								type: 'item',
								url: '/pages/authentication/forgot-password/split-screen'
							},
							{
								id: 'pages.authentication.forgot-password.split-screen-reversed',
								title: 'Split Screen Reversed',
								type: 'item',
								url: '/pages/authentication/forgot-password/split-screen-reversed'
							},
							{
								id: 'pages.authentication.forgot-password.full-screen',
								title: 'Full Screen',
								type: 'item',
								url: '/pages/authentication/forgot-password/full-screen'
							},
							{
								id: 'pages.authentication.forgot-password.full-screen-reversed',
								title: 'Full Screen Reversed',
								type: 'item',
								url: '/pages/authentication/forgot-password/full-screen-reversed'
							}
						]
					},
					{
						id: 'pages.authentication.reset-password',
						title: 'Reset password',
						type: 'collapse',
						children: [
							{
								id: 'pages.authentication.reset-password.classic',
								title: 'Classic',
								type: 'item',
								url: '/pages/authentication/reset-password/classic'
							},
							{
								id: 'pages.authentication.reset-password.modern',
								title: 'Modern',
								type: 'item',
								url: '/pages/authentication/reset-password/modern'
							},
							{
								id: 'pages.authentication.reset-password.modern-reversed',
								title: 'Modern Reversed',
								type: 'item',
								url: '/pages/authentication/reset-password/modern-reversed'
							},
							{
								id: 'pages.authentication.reset-password.split-screen',
								title: 'Split Screen',
								type: 'item',
								url: '/pages/authentication/reset-password/split-screen'
							},
							{
								id: 'pages.authentication.reset-password.split-screen-reversed',
								title: 'Split Screen Reversed',
								type: 'item',
								url: '/pages/authentication/reset-password/split-screen-reversed'
							},
							{
								id: 'pages.authentication.reset-password.full-screen',
								title: 'Full Screen',
								type: 'item',
								url: '/pages/authentication/reset-password/full-screen'
							},
							{
								id: 'pages.authentication.reset-password.full-screen-reversed',
								title: 'Full Screen Reversed',
								type: 'item',
								url: '/pages/authentication/reset-password/full-screen-reversed'
							}
						]
					},
					{
						id: 'pages.authentication.unlock-session',
						title: 'Unlock session',
						type: 'collapse',
						children: [
							{
								id: 'pages.authentication.unlock-session.classic',
								title: 'Classic',
								type: 'item',
								url: '/pages/authentication/unlock-session/classic'
							},
							{
								id: 'pages.authentication.unlock-session.modern',
								title: 'Modern',
								type: 'item',
								url: '/pages/authentication/unlock-session/modern'
							},
							{
								id: 'pages.authentication.unlock-session.modern-reversed',
								title: 'Modern Reversed',
								type: 'item',
								url: '/pages/authentication/unlock-session/modern-reversed'
							},
							{
								id: 'pages.authentication.unlock-session.split-screen',
								title: 'Split Screen',
								type: 'item',
								url: '/pages/authentication/unlock-session/split-screen'
							},
							{
								id: 'pages.authentication.unlock-session.split-screen-reversed',
								title: 'Split Screen Reversed',
								type: 'item',
								url: '/pages/authentication/unlock-session/split-screen-reversed'
							},
							{
								id: 'pages.authentication.unlock-session.full-screen',
								title: 'Full Screen',
								type: 'item',
								url: '/pages/authentication/unlock-session/full-screen'
							},
							{
								id: 'pages.authentication.unlock-session.full-screen-reversed',
								title: 'Full Screen Reversed',
								type: 'item',
								url: '/pages/authentication/unlock-session/full-screen-reversed'
							}
						]
					},
					{
						id: 'pages.authentication.confirmation-required',
						title: 'Confirmation required',
						type: 'collapse',
						children: [
							{
								id: 'pages.authentication.confirmation-required.classic',
								title: 'Classic',
								type: 'item',
								url: '/pages/authentication/confirmation-required/classic'
							},
							{
								id: 'pages.authentication.confirmation-required.modern',
								title: 'Modern',
								type: 'item',
								url: '/pages/authentication/confirmation-required/modern'
							},
							{
								id: 'pages.authentication.confirmation-required.modern-reversed',
								title: 'Modern Reversed',
								type: 'item',
								url: '/pages/authentication/confirmation-required/modern-reversed'
							},
							{
								id: 'pages.authentication.confirmation-required.split-screen',
								title: 'Split Screen',
								type: 'item',
								url: '/pages/authentication/confirmation-required/split-screen'
							},
							{
								id: 'pages.authentication.confirmation-required.split-screen-reversed',
								title: 'Split Screen Reversed',
								type: 'item',
								url: '/pages/authentication/confirmation-required/split-screen-reversed'
							},
							{
								id: 'pages.authentication.confirmation-required.full-screen',
								title: 'Full Screen',
								type: 'item',
								url: '/pages/authentication/confirmation-required/full-screen'
							},
							{
								id: 'pages.authentication.confirmation-required.full-screen-reversed',
								title: 'Full Screen Reversed',
								type: 'item',
								url: '/pages/authentication/confirmation-required/full-screen-reversed'
							}
						]
					}
				]
			},
			{
				id: 'pages.coming-soon',
				title: 'Coming Soon',
				type: 'collapse',
				icon: 'heroicons-outline:clock',
				url: '/pages/coming-soon',
				children: [
					{
						id: 'pages.coming-soon.classic',
						title: 'Classic',
						type: 'item',
						url: '/pages/coming-soon/classic'
					},
					{
						id: 'pages.coming-soon.modern',
						title: 'Modern',
						type: 'item',
						url: '/pages/coming-soon/modern'
					},
					{
						id: 'pages.coming-soon.modern-reversed',
						title: 'Modern Reversed',
						type: 'item',
						url: '/pages/coming-soon/modern-reversed'
					},
					{
						id: 'pages.coming-soon.split-screen',
						title: 'Split Screen',
						type: 'item',
						url: '/pages/coming-soon/split-screen'
					},
					{
						id: 'pages.coming-soon.split-screen-reversed',
						title: 'Split Screen Reversed',
						type: 'item',
						url: '/pages/coming-soon/split-screen-reversed'
					},
					{
						id: 'pages.coming-soon.full-screen',
						title: 'Full Screen',
						type: 'item',
						url: '/pages/coming-soon/full-screen'
					},
					{
						id: 'pages.coming-soon.full-screen-reversed',
						title: 'Full Screen Reversed',
						type: 'item',
						url: '/pages/coming-soon/full-screen-reversed'
					}
				]
			},
			{
				id: 'pages.error',
				title: 'Error',
				type: 'collapse',
				icon: 'heroicons-outline:exclamation-circle',
				children: [
					{
						id: 'pages.error.401',
						title: '401',
						type: 'item',
						url: '/pages/error/401'
					},
					{
						id: 'pages.error.404',
						title: '404',
						type: 'item',
						url: '/pages/error/404'
					},
					{
						id: 'pages.error.500',
						title: '500',
						type: 'item',
						url: '/pages/error/500'
					}
				]
			},
			{
				id: 'pages.invoice',
				title: 'Invoice',
				type: 'collapse',
				icon: 'heroicons-outline:calculator',
				children: [
					{
						id: 'pages.invoice.compact',
						title: 'Compact',
						type: 'item',
						url: '/pages/invoice/compact'
					},
					{
						id: 'pages.invoice.modern',
						title: 'Modern',
						type: 'item',
						url: '/pages/invoice/modern'
					}
				]
			},
			{
				id: 'pages.maintenance',
				title: 'Maintenance',
				type: 'item',
				icon: 'heroicons-outline:exclamation-triangle',
				url: '/pages/maintenance'
			},
			{
				id: 'pages.pricing',
				title: 'Pricing',
				type: 'collapse',
				icon: 'heroicons-outline:banknotes',
				children: [
					{
						id: 'pages.pricing.modern',
						title: 'Modern',
						type: 'item',
						url: '/pages/pricing/modern'
					},
					{
						id: 'pages.pricing.simple',
						title: 'Simple',
						type: 'item',
						url: '/pages/pricing/simple'
					},
					{
						id: 'pages.pricing.single',
						title: 'Single',
						type: 'item',
						url: '/pages/pricing/single'
					},
					{
						id: 'pages.pricing.table',
						title: 'Table',
						type: 'item',
						url: '/pages/pricing/table'
					}
				]
			},
			{
				id: 'pages.search',
				title: 'Search',
				type: 'collapse',
				icon: 'search',
				children: [
					{
						id: 'pages.search.classic-search',
						title: 'Classic Search',
						type: 'item',
						url: '/pages/search/classic'
					},
					{
						id: 'pages.search.modern-search',
						title: 'Modern Search',
						type: 'item',
						url: '/pages/search/modern'
					}
				]
			}
		]
	}
];

export default navigationConfig;
