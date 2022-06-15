// eslint-disable-next-line no-useless-escape
export const REG_EXP_EMAIL = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

export const isEmail = (email: string) => {
	return REG_EXP_EMAIL.test(email);
};
