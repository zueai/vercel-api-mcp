// //fetch wrapper for vercel api (we dont use this because we can just use the vercel sdk)

// export async function req(endpoint: string, options: RequestInit, env: Env) {
// 	const response = await fetch(`https://api.vercel.com${endpoint}`, {
// 		...options,
// 		headers: {
// 			...options.headers,
// 			Authorization: `Bearer ${env.VERCEL_API_TOKEN}`
// 		}
// 	})
// 	return response.json()
// }
