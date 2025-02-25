import { Vercel } from "@vercel/sdk"

/**
 * Gets deployment events by deployment ID and build ID
 * @param env {Env} The environment containing the Vercel token
 * @param deploymentId {string} The ID or URL of the deployment
 * @param options {object} Optional parameters for the request
 * @return {Promise<any>} The deployment events
 */
export async function getDeploymentEvents(
	env: Env,
	deploymentId: string,
	options?: {
		direction?: "forward" | "backward"
		follow?: number
		limit?: number
		name?: string
		since?: number
		until?: number
		statusCode?: string
		delimiter?: number
		builds?: number
		teamId?: string
		slug?: string
	}
) {
	const vercel = new Vercel({
		bearerToken: env.VERCEL_API_TOKEN
	})

	const response = await vercel.deployments.getDeploymentEvents({
		idOrUrl: deploymentId,
		...options
	})

	return {
		content: [
			{
				type: "text",
				text: JSON.stringify(response, null, 2)
			}
		]
	}
}

/**
 * Gets a deployment by ID or URL
 * @param env {Env} The environment containing the Vercel token
 * @param deploymentId {string} The ID or URL of the deployment
 * @param options {object} Optional parameters for the request
 * @return {Promise<any>} The deployment details
 */
export async function getDeployment(
	env: Env,
	deploymentId: string,
	options?: {
		withGitRepoInfo?: string
		teamId?: string
		slug?: string
	}
) {
	const vercel = new Vercel({
		bearerToken: env.VERCEL_API_TOKEN
	})

	const response = await vercel.deployments.getDeployment({
		idOrUrl: deploymentId,
		...options
	})

	return {
		content: [
			{
				type: "text",
				text: JSON.stringify(response, null, 2)
			}
		]
	}
}

/**
 * Cancels a deployment
 * @param env {Env} The environment containing the Vercel token
 * @param deploymentId {string} The ID of the deployment to cancel
 * @param options {object} Optional parameters for the request
 * @return {Promise<any>} The response from canceling the deployment
 */
export async function cancelDeployment(
	env: Env,
	deploymentId: string,
	options?: {
		teamId?: string
		slug?: string
	}
) {
	const vercel = new Vercel({
		bearerToken: env.VERCEL_API_TOKEN
	})

	const response = await vercel.deployments.cancelDeployment({
		id: deploymentId,
		...options
	})

	return {
		content: [
			{
				type: "text",
				text: JSON.stringify(response, null, 2)
			}
		]
	}
}

/**
 * Lists deployment files
 * @param env {Env} The environment containing the Vercel token
 * @param deploymentId {string} The ID of the deployment
 * @param options {object} Optional parameters for the request
 * @return {Promise<any>} The deployment files
 */
export async function listDeploymentFiles(
	env: Env,
	deploymentId: string,
	options?: {
		teamId?: string
		slug?: string
	}
) {
	const vercel = new Vercel({
		bearerToken: env.VERCEL_API_TOKEN
	})

	const response = await vercel.deployments.listDeploymentFiles({
		id: deploymentId,
		...options
	})

	return {
		content: [
			{
				type: "text",
				text: JSON.stringify(response, null, 2)
			}
		]
	}
}

/**
 * Gets deployment file contents
 * @param env {Env} The environment containing the Vercel token
 * @param deploymentId {string} The ID of the deployment
 * @param fileId {string} The ID of the file
 * @param options {object} Optional parameters for the request
 * @return {Promise<any>} The file contents
 */
export async function getDeploymentFileContents(
	env: Env,
	deploymentId: string,
	fileId: string,
	options?: {
		teamId?: string
		slug?: string
	}
) {
	const vercel = new Vercel({
		bearerToken: env.VERCEL_API_TOKEN
	})

	const response = await vercel.deployments.getDeploymentFileContents({
		id: deploymentId,
		fileId: fileId,
		...options
	})

	return {
		content: [
			{
				type: "text",
				text: JSON.stringify(response, null, 2)
			}
		]
	}
}

/**
 * Lists deployments
 * @param env {Env} The environment containing the Vercel token
 * @param options {object} Optional parameters for the request
 * @return {Promise<any>} The list of deployments
 */
export async function getDeployments(
	env: Env,
	options?: {
		app?: string
		from?: number
		limit?: number
		projectId?: string
		target?: string
		to?: number
		users?: string
		since?: number
		until?: number
		state?: string
		teamId?: string
		slug?: string
	}
) {
	const vercel = new Vercel({
		bearerToken: env.VERCEL_API_TOKEN
	})

	const response = await vercel.deployments.getDeployments({
		...options
	})

	return {
		content: [
			{
				type: "text",
				text: JSON.stringify(response, null, 2)
			}
		]
	}
}

/**
 * Deletes a deployment
 * @param env {Env} The environment containing the Vercel token
 * @param deploymentId {string} The ID of the deployment to delete
 * @param options {object} Optional parameters for the request
 * @return {Promise<any>} The response from deleting the deployment
 */
export async function deleteDeployment(
	env: Env,
	deploymentId: string,
	options?: {
		url?: string
		teamId?: string
		slug?: string
	}
) {
	const vercel = new Vercel({
		bearerToken: env.VERCEL_API_TOKEN
	})

	const response = await vercel.deployments.deleteDeployment({
		id: deploymentId,
		...options
	})

	return {
		content: [
			{
				type: "text",
				text: JSON.stringify(response, null, 2)
			}
		]
	}
}
