import axios, { Method, AxiosRequestConfig } from 'axios';
import { IResponse } from '../@types';
import { BASE_PATH_API } from '../client/const/setting';
import { createSearch } from '../client/utils/href.utils';

export const API_PREFIX = BASE_PATH_API;
export const TOKEN_NAME = 'jwt-token';
export const USER = 'user';

export function IsJsonString(str: string) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

export class ApiService {
	private PREFIX_API?: string;
	constructor({ PREFIX_API }: { PREFIX_API?: string }) {
		this.PREFIX_API = PREFIX_API || API_PREFIX;
	}

	get authorizationHeader(): { [key: string]: string } {
		const token = localStorage.getItem(TOKEN_NAME);
		if (token && IsJsonString(token)) {
			return {
				Authorization: JSON.parse(token),
			};
		}
		return {};
	}

	protected async baseRequest<TBody, TData>(
		url: string,
		method: Method,
		body?: TBody,
		additional?: AxiosRequestConfig
	): Promise<IResponse<{}, string, TData>> {
		try {
			const response = await axios({
				url: `${this.PREFIX_API}/${url}`,
				method: method,
				data: body,
				headers: {
					'Content-Type': 'application/json',
					//...this.authorizationHeader,
				},
				...additional,
			});

			return {
				...response.data,
			};
		} catch (err: any) {
			let error_msg = '';
			if (err.response) {
				if (err.response.status === 401) {
					localStorage.removeItem(TOKEN_NAME);
					localStorage.removeItem(USER);
					document.location.reload();
				}
				if ([404, 500, 504].includes(err.response.status)) {
					return {
						error:
							`${err.response.status}: ${err.response.statusText}!`.toString(),
					};
				}

				return {
					error: err.response.data.error.message.toString(),
				};
			}

			return {
				error: error_msg,
			};
		}
	}

	public post<TBody, TData>(
		url: string,
		body: TBody,
		additional?: AxiosRequestConfig
	) {
		return this.baseRequest<TBody, TData>(url, 'POST', body, additional);
	}

	public put<TBody, TData>(url: string, body: TBody) {
		return this.baseRequest<TBody, TData>(url, 'PUT', body);
	}

	public delete<TBody, TData>(url: string, body?: TBody) {
		return this.baseRequest<TBody, TData>(url, 'DELETE', body);
	}

	public get<TData>(
		url: string,
		body?: { [key: string]: string | number | object },
		additional?: AxiosRequestConfig
	) {
		const query = body ? createSearch(body) : '';

		return this.baseRequest<any, TData>(
			`${url}?${query}`,
			'GET',
			undefined,
			additional
		);
	}
}

export const apiService = new ApiService({});
