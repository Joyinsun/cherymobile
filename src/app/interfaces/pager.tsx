"use strict";

interface IPager<T> {
	currentPage: number;

	pageSize: number;

	pageTotal?: number;

	recordTotal?: number;

	list: Array<T>;

}

export default IPager;
