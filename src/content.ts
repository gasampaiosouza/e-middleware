interface ICustomersData {
	readonly [key: string]: {
		// this must match everything! "https", "www", an so on.
		STORE_SITE: string;

		APP_KEY: string;
		APP_TOKEN: string;
	};
}

const CUSTOMERS_DATA: ICustomersData = {
	imaginarium: {
		STORE_SITE: 'https://loja.imaginarium.com.br',
		APP_KEY: 'vtexappkey-imaginarium-QSYLXA',
		APP_TOKEN:
			'ZIODZCAQEVCBYLMATIMPARUCRFZDOOMHQVOTVOFQCGHRHPWKEIXGKLQHNMLTDXCQIVLDWTEECVNUKDVBJPYGQGWEFHFJDLNFDRILETNKESDPYVWKRJKOYVZCZGYPNUBR',
	},

	aleatory: {
		STORE_SITE: 'https://www.aleatorystore.com.br',
		APP_KEY: 'vtexappkey-aleatory-ICHDNL',
		APP_TOKEN:
			'FPBYNCLJFCXZCFEZZERWFGMCMJAKIVKNLTWHUJNULOFGPFKUDJVUSTPYCYMEBAAKRKNIIWEQQXKRBGMGZGHZZPVSDYFVWJTLOUOFRBLGEEDUIYWWMFFUTAKBOVFKRJUH',
	},
};

export { CUSTOMERS_DATA };
