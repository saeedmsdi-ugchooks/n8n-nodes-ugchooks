import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class UgcHooksOAuth2Api implements ICredentialType {
	name = 'ugcHooksOAuth2Api';
	displayName = 'UGCHooks OAuth2 API';
	documentationUrl = 'https://github.com/saeedmsdi-ugchooks/n8n-nodes-ugchooks#authentication';
	icon = { light: 'file:ugchooks.svg', dark: 'file:ugchooks.svg' } as const;
	extends = ['oAuth2Api'];
	properties: INodeProperties[] = [
		{
			displayName: 'Use Dynamic Client Registration',
			name: 'useDynamicClientRegistration',
			type: 'hidden',
			default: true,
		},
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'hidden',
			default: 'https://ugchooks.app/v1',
		},
		{
			displayName: 'Resource URL',
			name: 'resourceUrl',
			type: 'hidden',
			default: 'https://ugchooks.app/v1',
		},
	];
}
