import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { DISTRICT_ID } from '$env/static/private';

export async function GET({ url }) {
	const queryResult = await db.raw(
		`
SELECT          s.name,
                COUNT(DISTINCT e.studentId) enrollment
FROM            Enrollment e
JOIN            Site s
ON              s.districtId = e.districtId
AND             s.schoolYear = e.schoolYear
AND             s.id = e.siteId
WHERE           e.districtId = :districtId
AND             e.schoolYear = :schoolYear
AND             e.enrollDate <= UTC_DATE
AND             (e.withdrawDate IS NULL OR e.withdrawDate > UTC_DATE)
GROUP BY        s.name
ORDER BY        s.name
	`,
		{
			districtId: DISTRICT_ID,
			schoolYear: url.searchParams.get('schoolYear')
		}
	);

	return json(queryResult[0]);
}
