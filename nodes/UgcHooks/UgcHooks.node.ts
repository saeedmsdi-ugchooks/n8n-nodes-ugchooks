import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { executeOperations, type Operation, type ResourceRoute } from './transport';
import operations from './operations.json';
import routes from './routes.json';

export class UgcHooks implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'UGCHooks',
		name: 'ugcHooks',
		icon: {
			light: 'file:ugchooks.svg',
			dark: 'file:ugchooks.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Turn product links into TikTok and Reels posts with UGCHooks',
		defaults: {
			name: 'UGCHooks',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'ugcHooksOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Batch',
						value: 'batch',
					},
				],
				default: 'batch',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Profile',
						value: 'get_profile',
						description: 'Read your UGCHooks account email and credit balance',
						action: 'Get profile in ugchooks',
					},
				],
				default: 'get_profile',
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Create',
						value: 'create_batch',
						description:
							'Turn a public product link into a batch with a brief and the first 10 posts. Free, does not spend credits.',
						action: 'Create a batch in ugchooks',
					},
					{
						name: 'Get',
						value: 'get_batch',
						description:
							'Read a batch: brief, posts with captions and hashtags, locked parts and saved render links',
						action: 'Get a batch in ugchooks',
					},
					{
						name: 'Get Many',
						value: 'list_batches',
						description: 'List your newest 100 batches',
						action: 'Get many batches in ugchooks',
					},
					{
						name: 'Write Part',
						value: 'write_part',
						description:
							'Write 10 more posts (part 0 to 9). Parts 1 to 9 need the batch unlocked in the app.',
						action: 'Write a part of a batch in ugchooks',
					},
				],
				default: 'create_batch',
				displayOptions: {
					show: {
						resource: ['batch'],
					},
				},
			},
			{
				displayName: 'Product URL',
				name: 'create_batch__url',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://yourapp.com',
				description: 'Public product, website or App Store / Google Play link',
				displayOptions: {
					show: {
						operation: ['create_batch'],
						resource: ['batch'],
					},
				},
			},
			{
				displayName: 'Batch ID',
				name: 'get_batch__batchId',
				type: 'string',
				default: '',
				required: true,
				description: 'The batch ID from Create or Get Many',
				displayOptions: {
					show: {
						operation: ['get_batch'],
						resource: ['batch'],
					},
				},
			},
			{
				displayName: 'Batch ID',
				name: 'write_part__batchId',
				type: 'string',
				default: '',
				required: true,
				description: 'The batch ID from Create or Get Many',
				displayOptions: {
					show: {
						operation: ['write_part'],
						resource: ['batch'],
					},
				},
			},
			{
				displayName: 'Part',
				name: 'write_part__part',
				type: 'number',
				default: 1,
				required: true,
				typeOptions: {
					minValue: 0,
					maxValue: 9,
					numberPrecision: 0,
				},
				description: 'Part number, 0 to 9. Each part has 10 posts.',
				displayOptions: {
					show: {
						operation: ['write_part'],
						resource: ['batch'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return executeOperations(
			this,
			'https://ugchooks.app',
			'ugcHooksOAuth2Api',
			operations as unknown as Operation[],
			routes as Record<string, ResourceRoute>,
		);
	}
}
