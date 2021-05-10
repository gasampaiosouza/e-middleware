module.exports = {
	rootDir: '.',
	// roots: ['./src'],
	transform: { '^.+\\.ts?$': 'ts-jest' },
	testEnvironment: 'node',
	testRegex: '/tests?/.*\\.(test|spec)?\\.(ts|tsx)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleNameMapper: {
		'~/(.*)': '<rootDir>/$1',
		'@src(.*)': '<rootDir>/src/$1',
		'@controllers(.*)': '<rootDir>/src/controllers/$1',
		'@models(.*)': '<rootDir>/src/models/$1',
		'@routes(.*)': '<rootDir>/src/routes/$1',
		'@views(.*)': '<rootDir>/src/views/$1',
		'@utils(.*)': '<rootDir>/src/utils/$1',
		'@helpers/(.*)': '<rootDir>/src/helpers/$1',
		'@root/(.*)': '<rootDir>/src/$1',
	},
};
