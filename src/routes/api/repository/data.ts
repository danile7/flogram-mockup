const libraries = [
	{
		name: 'test',
		directoryStructure:
			[{
				'id': '000001',
				'path': [],
				'parentId': [],
				'items': [
					{
						'id': '000002',
						'mimeType': '#directory',
						'name': 'src',
						'size': -1,
						'chDate': 1645859590,
						'owner': 'mano (1000)',
						'group': 'mano (1000)',
						'permissions': 'drwxr-xr-x'
					},
					{
						'id': '000003',
						'mimeType': 'text/plain',
						'name': 'index.flo',
						'size': 4,
						'chDate': 1645859445,
						'owner': 'mano (1000)',
						'group': 'mano (1000)',
						'permissions': '-rw-r--r--'
					},
					{
						'id': '000004',
						'mimeType': 'text/plain',
						'name': 'math.flo',
						'size': 46789,
						'chDate': 1645859490,
						'owner': 'mano (1000)',
						'group': 'mano (1000)',
						'permissions': '-rw-r--r--'
					},
					{
						'id': '000005',
						'mimeType': 'text/plain',
						'name': 'string.flo',
						'size': 3028,
						'chDate': 1645859526,
						'owner': 'mano (1000)',
						'group': 'mano (1000)',
						'permissions': '-rw-r--r--'
					},
					{
						'id': '000006',
						'mimeType': 'text/plain; charset=utf-8',
						'name': 'array.flo',
						'size': 2511,
						'chDate': 1645859469,
						'owner': 'mano (1000)',
						'group': 'mano (1000)',
						'permissions': '-rw-r--r--'
					}
				]
			},
				{
					'id': '000002',
					'parentId': ['000001'],
					'path': [
						'src'
					],
					'items': [
						{
							'id': '000014',
							'mimeType': '#directory',
							'name': 'lib',
							'size': -1,
							'chDate': 1645859613,
							'owner': 'mano (1000)',
							'group': 'mano (1000)',
							'permissions': 'drwxr-xr-x'
						},
						{
							'id': '000015',
							'mimeType': 'text/plain',
							'name': 'txt.txt',
							'size': 5,
							'chDate': 1632594862,
							'owner': 'mano (1000)',
							'group': 'mano (1000)',
							'permissions': '-rw-r--r--'
						}
					]
				},
				{
					'id': '000014',
					'parentId': ['000001', '000002'],
					'path': [
						'src',
						'lib'
					],
					'items': [
						{
							'id': '000016',
							'mimeType': '#directory',
							'name': 'config',
							'size': -1,
							'chDate': 1645297788,
							'owner': 'mano (1000)',
							'group': 'mano (1000)',
							'permissions': 'drwxr-xr-x'
						},
						{
							'id': '000018',
							'mimeType': '#directory',
							'name': 'app',
							'size': -1,
							'chDate': 1645297788,
							'owner': 'mano (1000)',
							'group': 'mano (1000)',
							'permissions': 'drwxr-xr-x'
						},
						{
							'id': '000017',
							'mimeType': 'text/plain',
							'name': 'empty',
							'size': 0,
							'chDate': 1645859613,
							'owner': 'mano (1000)',
							'group': 'mano (1000)',
							'permissions': '-rw-r--r--'
						}
					]
				},
				{
					'id': '000016',
					'parentId': ['000001', '000002', '000014'],
					'path': [
						'src',
						'lib',
						'config'
					],
					'items': []
				},
				{
					'id': '000018',
					'parentId': ['000001', '000002', '000014'],
					'path': [
						'src',
						'lib',
						'app'
					],
					'items': []
				}]
	}
];


export default libraries;