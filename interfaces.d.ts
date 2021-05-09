export interface IBodyType {
	_where: string | Record<string, unknown>;
	_fields: string | Array<string>;
	_sort: string;
	_keyword: string;
	_schema: string;
}
