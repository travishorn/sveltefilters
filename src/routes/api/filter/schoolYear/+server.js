import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { DISTRICT_ID } from '$env/static/private';

export async function GET() {
	const queryResult = await db.raw(
		`
SELECT          e.schoolYear value,
                CONCAT(e.schoolYear - 1, '-', RIGHT(e.schoolYear, 2)) label
FROM            Enrollment e
WHERE           e.districtId = :districtId
GROUP BY        e.schoolYear
ORDER BY        e.schoolYear DESC
	`,
		{
			districtId: DISTRICT_ID
		}
	);

	/**
	 * @typedef QueryResult
	 * @property {number} value
	 * @property {string} label
	 */

	const formatted = queryResult[0].map((/** @type {QueryResult} */ row) => {
		return {
			value: row.value.toString(),
			label: row.label
		};
	});

	return json(formatted);
}
