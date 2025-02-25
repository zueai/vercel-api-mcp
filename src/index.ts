import { WorkerEntrypoint } from "cloudflare:workers"
import { ProxyToSelf } from "workers-mcp"
import {
	cancelDeployment,
	deleteDeployment,
	getDeployment,
	getDeploymentEvents,
	getDeploymentFileContents,
	getDeployments,
	listDeploymentFiles
} from "./vercel/deployments"
import {
	createRecord,
	getRecords,
	removeRecord,
	updateRecord
} from "./vercel/dns"
import { getDomain, getDomainConfig, getDomains } from "./vercel/domains"
import {
	addProjectDomain,
	createProjectEnv,
	editProjectEnv,
	filterProjectEnvs,
	getProjectDomain,
	getProjectDomains,
	getProjectEnv,
	getProjects,
	removeProjectDomain,
	removeProjectEnv,
	updateProject,
	updateProjectDomain,
	verifyProjectDomain
} from "./vercel/projects"

export default class MyWorker extends WorkerEntrypoint<Env> {
	/**
	 * Get deployment events by deployment ID and build ID.
	 * @param deploymentId {string} The ID or URL of the deployment.
	 * @param options {string} JSON string of optional parameters:
	 *   - direction {string} Direction of logs: "forward" or "backward".
	 *   - follow {number} Whether to follow logs (1 for true, 0 for false).
	 *   - limit {number} Maximum number of logs to return.
	 *   - name {string} Name of the build to get logs for.
	 *   - since {number} Timestamp to get logs from.
	 *   - until {number} Timestamp to get logs until.
	 *   - statusCode {string} Filter logs by status code (e.g., "5xx").
	 *   - delimiter {number} Whether to include delimiter in logs (1 for true, 0 for false).
	 *   - builds {number} Whether to include builds (1 for true, 0 for false).
	 *   - teamId {string} Team ID for team-owned deployments.
	 *   - slug {string} Team slug for team-owned deployments.
	 * @return {Promise<any>} The deployment events.
	 */
	async getVercelDeploymentEvents(deploymentId: string, options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await getDeploymentEvents(this.env, deploymentId, parsedOptions)
	}

	/**
	 * Get a deployment by ID or URL.
	 * @param deploymentId {string} The ID or URL of the deployment.
	 * @param options {string} JSON string of optional parameters:
	 *   - withGitRepoInfo {string} Whether to include git repo info ("true" or "false").
	 *   - teamId {string} Team ID for team-owned deployments.
	 *   - slug {string} Team slug for team-owned deployments.
	 * @return {Promise<any>} The deployment details.
	 */
	async getVercelDeployment(deploymentId: string, options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await getDeployment(this.env, deploymentId, parsedOptions)
	}

	/**
	 * Cancel a deployment.
	 * @param deploymentId {string} The ID of the deployment to cancel.
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned deployments.
	 *   - slug {string} Team slug for team-owned deployments.
	 * @return {Promise<any>} The response from canceling the deployment.
	 */
	async cancelVercelDeployment(deploymentId: string, options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await cancelDeployment(this.env, deploymentId, parsedOptions)
	}

	/**
	 * List deployment files.
	 * @param deploymentId {string} The ID of the deployment.
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned deployments.
	 *   - slug {string} Team slug for team-owned deployments.
	 * @return {Promise<any>} The deployment files.
	 */
	async listVercelDeploymentFiles(deploymentId: string, options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await listDeploymentFiles(this.env, deploymentId, parsedOptions)
	}

	/**
	 * Get deployment file contents.
	 * @param deploymentId {string} The ID of the deployment.
	 * @param fileId {string} The ID of the file.
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned deployments.
	 *   - slug {string} Team slug for team-owned deployments.
	 * @return {Promise<any>} The file contents.
	 */
	async getVercelDeploymentFileContents(
		deploymentId: string,
		fileId: string,
		options = "{}"
	) {
		const parsedOptions = JSON.parse(options)
		return await getDeploymentFileContents(
			this.env,
			deploymentId,
			fileId,
			parsedOptions
		)
	}

	/**
	 * List deployments.
	 * @param options {string} JSON string of optional parameters:
	 *   - app {string} Filter by app name.
	 *   - from {number} Timestamp to get deployments from.
	 *   - limit {number} Maximum number of deployments to return.
	 *   - projectId {string} Filter by project ID.
	 *   - target {string} Filter by target environment (e.g., "production").
	 *   - to {number} Timestamp to get deployments until.
	 *   - users {string} Comma-separated list of user IDs to filter by.
	 *   - since {number} Timestamp to get deployments since.
	 *   - until {number} Timestamp to get deployments until.
	 *   - state {string} Filter by deployment state (e.g., "BUILDING,READY").
	 *   - teamId {string} Team ID for team-owned deployments.
	 *   - slug {string} Team slug for team-owned deployments.
	 * @return {Promise<any>} The list of deployments.
	 */
	async getVercelDeployments(options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await getDeployments(this.env, parsedOptions)
	}

	/**
	 * Delete a deployment.
	 * @param deploymentId {string} The ID of the deployment to delete.
	 * @param options {string} JSON string of optional parameters:
	 *   - url {string} URL of the deployment to delete (alternative to ID).
	 *   - teamId {string} Team ID for team-owned deployments.
	 *   - slug {string} Team slug for team-owned deployments.
	 * @return {Promise<any>} The response from deleting the deployment.
	 */
	async deleteVercelDeployment(deploymentId: string, options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await deleteDeployment(this.env, deploymentId, parsedOptions)
	}

	/**
	 * List DNS records for a domain.
	 * @param domain {string} The domain to list DNS records for.
	 * @param options {string} JSON string of optional parameters:
	 *   - limit {string} Maximum number of DNS records to return.
	 *   - since {string} Timestamp to get DNS records from.
	 *   - until {string} Timestamp to get DNS records until.
	 *   - teamId {string} Team ID for team-owned domains.
	 *   - slug {string} Team slug for team-owned domains.
	 * @return {Promise<any>} The list of DNS records.
	 */
	async getVercelDNSRecords(domain: string, options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await getRecords(this.env, domain, parsedOptions)
	}

	/**
	 * Create a DNS record for a domain.
	 * @param domain {string} The domain to create the DNS record for.
	 * @param recordData {string} JSON string of the DNS record data. Format depends on record type:
	 *   For A records: {"name": "subdomain", "type": "A", "value": "192.0.2.42", "ttl": 60}
	 *   For AAAA records: {"name": "subdomain", "type": "AAAA", "value": "2001:DB8::42", "ttl": 60}
	 *   For CNAME records: {"name": "subdomain", "type": "CNAME", "value": "example.com", "ttl": 60}
	 *   For MX records: {"name": "subdomain", "type": "MX", "value": "mail.example.com", "mxPriority": 10, "ttl": 60}
	 *   For SRV records: {"type": "SRV", "srv": {"priority": 10, "weight": 20, "port": 80, "target": "example.com"}, "ttl": 60}
	 *   For TXT records: {"type": "TXT", "value": "verification=1234abcd", "ttl": 60}
	 *   All records can include an optional "comment" field.
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned domains.
	 *   - slug {string} Team slug for team-owned domains.
	 * @return {Promise<any>} The created DNS record.
	 */
	async createVercelDNSRecord(
		domain: string,
		recordData: string,
		options = "{}"
	) {
		const parsedRecordData = JSON.parse(recordData)
		const parsedOptions = JSON.parse(options)
		return await createRecord(
			this.env,
			domain,
			parsedRecordData,
			parsedOptions
		)
	}

	/**
	 * Update a DNS record.
	 * @param recordId {string} The ID of the DNS record to update.
	 * @param recordData {string} JSON string of the DNS record data to update. Can include:
	 *   - name {string} The name of the DNS record (subdomain).
	 *   - type {string} The type of the record (A, AAAA, CNAME, MX, SRV, TXT, etc).
	 *   - value {string} The value for the record.
	 *   - ttl {number} Time to live in seconds.
	 *   - mxPriority {number} Priority for MX records.
	 *   - srv {object} SRV record data (priority, weight, port, target).
	 *   - https {object} HTTPS record data (priority, target, params).
	 *   - comment {string} A comment to add context on what this DNS record is for.
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned domains.
	 *   - slug {string} Team slug for team-owned domains.
	 * @return {Promise<any>} The updated DNS record.
	 */
	async updateVercelDNSRecord(
		recordId: string,
		recordData: string,
		options = "{}"
	) {
		const parsedRecordData = JSON.parse(recordData)
		const parsedOptions = JSON.parse(options)
		return await updateRecord(
			this.env,
			recordId,
			parsedRecordData,
			parsedOptions
		)
	}

	/**
	 * Delete a DNS record.
	 * @param domain {string} The domain the DNS record belongs to.
	 * @param recordId {string} The ID of the DNS record to delete.
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned domains.
	 *   - slug {string} Team slug for team-owned domains.
	 * @return {Promise<any>} The response from deleting the DNS record.
	 */
	async deleteVercelDNSRecord(
		domain: string,
		recordId: string,
		options = "{}"
	) {
		const parsedOptions = JSON.parse(options)
		return await removeRecord(this.env, domain, recordId, parsedOptions)
	}

	/**
	 * Get a Domain's configuration
	 * @param domain {string} The domain to get configuration for
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned domains
	 *   - slug {string} Team slug for team-owned domains
	 * @return {Promise<any>} The domain configuration
	 */
	async getVercelDomainConfig(domain: string, options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await getDomainConfig(this.env, domain, parsedOptions)
	}

	/**
	 * Get information for a single domain
	 * @param domain {string} The domain to get information for
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned domains
	 *   - slug {string} Team slug for team-owned domains
	 * @return {Promise<any>} The domain information
	 */
	async getVercelDomain(domain: string, options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await getDomain(this.env, domain, parsedOptions)
	}

	/**
	 * List all domains for the authenticated user or team
	 * @param options {string} JSON string of optional parameters:
	 *   - limit {number} Maximum number of domains to return (default 20)
	 *   - since {number} Get domains created after this timestamp
	 *   - until {number} Get domains created before this timestamp
	 *   - teamId {string} Team ID for team-owned domains
	 *   - slug {string} Team slug for team-owned domains
	 * @return {Promise<any>} List of domains
	 */
	async getVercelDomains(options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await getDomains(this.env, parsedOptions)
	}

	/**
	 * Retrieve a list of projects
	 * @param options {string} JSON string of optional parameters:
	 *   - gitForkProtection {string} Control git fork protection ("0" or "1")
	 *   - repoUrl {string} Filter by repository URL
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} List of projects
	 */
	async getVercelProjects(options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await getProjects(this.env, parsedOptions)
	}

	/**
	 * Update an existing project
	 * @param idOrName {string} The ID or name of the project
	 * @param projectData {string} JSON string of the project data to update
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} The updated project
	 */
	async updateVercelProject(
		idOrName: string,
		projectData: string,
		options = "{}"
	) {
		const parsedProjectData = JSON.parse(projectData)
		const parsedOptions = JSON.parse(options)
		return await updateProject(
			this.env,
			idOrName,
			parsedProjectData,
			parsedOptions
		)
	}

	/**
	 * Retrieve project domains by project id or name
	 * @param idOrName {string} The ID or name of the project
	 * @param options {string} JSON string of optional parameters:
	 *   - production {string} Filter by production domains ("true" or "false")
	 *   - customEnvironmentId {string} Filter by custom environment ID
	 *   - redirects {string} Filter by redirects ("true" or "false")
	 *   - redirect {string} Filter by specific redirect
	 *   - limit {number} Maximum number of domains to return
	 *   - since {number} Get domains created after this timestamp
	 *   - until {number} Get domains created before this timestamp
	 *   - order {string} Order of domains ("ASC" or "DESC")
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} List of project domains
	 */
	async getVercelProjectDomains(idOrName: string, options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await getProjectDomains(this.env, idOrName, parsedOptions)
	}

	/**
	 * Get a project domain
	 * @param idOrName {string} The ID or name of the project
	 * @param domain {string} The domain name
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} The project domain
	 */
	async getVercelProjectDomain(
		idOrName: string,
		domain: string,
		options = "{}"
	) {
		const parsedOptions = JSON.parse(options)
		return await getProjectDomain(this.env, idOrName, domain, parsedOptions)
	}

	/**
	 * Update a project domain
	 * @param idOrName {string} The ID or name of the project
	 * @param domain {string} The domain name
	 * @param domainData {string} JSON string of the domain data to update
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} The updated project domain
	 */
	async updateVercelProjectDomain(
		idOrName: string,
		domain: string,
		domainData: string,
		options = "{}"
	) {
		const parsedDomainData = JSON.parse(domainData)
		const parsedOptions = JSON.parse(options)
		return await updateProjectDomain(
			this.env,
			idOrName,
			domain,
			parsedDomainData,
			parsedOptions
		)
	}

	/**
	 * Remove a domain from a project
	 * @param idOrName {string} The ID or name of the project
	 * @param domain {string} The domain name
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} The response from removing the domain
	 */
	async removeVercelProjectDomain(
		idOrName: string,
		domain: string,
		options = "{}"
	) {
		const parsedOptions = JSON.parse(options)
		return await removeProjectDomain(
			this.env,
			idOrName,
			domain,
			parsedOptions
		)
	}

	/**
	 * Add a domain to a project
	 * @param idOrName {string} The ID or name of the project
	 * @param domainData {string} JSON string of the domain data to add. Format:
	 *   {"name": "example.com", "redirect": null, "redirectStatusCode": null}
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} The added project domain
	 */
	async addVercelProjectDomain(
		idOrName: string,
		domainData: string,
		options = "{}"
	) {
		const parsedDomainData = JSON.parse(domainData)
		const parsedOptions = JSON.parse(options)
		return await addProjectDomain(
			this.env,
			idOrName,
			parsedDomainData,
			parsedOptions
		)
	}

	/**
	 * Verify project domain
	 * @param idOrName {string} The ID or name of the project
	 * @param domain {string} The domain name
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} The verification result
	 */
	async verifyVercelProjectDomain(
		idOrName: string,
		domain: string,
		options = "{}"
	) {
		const parsedOptions = JSON.parse(options)
		return await verifyProjectDomain(
			this.env,
			idOrName,
			domain,
			parsedOptions
		)
	}

	/**
	 * Retrieve the environment variables of a project by id or name
	 * @param idOrName {string} The ID or name of the project
	 * @param options {string} JSON string of optional parameters:
	 *   - target {string} Comma-separated list of targets (e.g., "production,preview")
	 *   - decrypt {string} Whether to decrypt the environment variables ("true" or "false")
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} The project environment variables
	 */
	async filterVercelProjectEnvs(idOrName: string, options = "{}") {
		const parsedOptions = JSON.parse(options)

		// Convert comma-separated target string to array if it exists
		if (parsedOptions.target && typeof parsedOptions.target === "string") {
			parsedOptions.target = parsedOptions.target.split(",")
		}

		// Keep decrypt as a string value of "true" or "false"
		// SDK expects this as a string enum, not a boolean

		return await filterProjectEnvs(this.env, idOrName, parsedOptions)
	}

	/**
	 * Retrieve the decrypted value of an environment variable of a project by id
	 * @param idOrName {string} The ID or name of the project
	 * @param envId {string} The ID of the environment variable
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} The environment variable
	 */
	async getVercelProjectEnv(idOrName: string, envId: string, options = "{}") {
		const parsedOptions = JSON.parse(options)
		return await getProjectEnv(this.env, idOrName, envId, parsedOptions)
	}

	/**
	 * Create one or more environment variables
	 * @param idOrName {string} The ID or name of the project
	 * @param envData {string} JSON string of the environment variable data. Format:
	 *   {"key": "MY_KEY", "value": "my value", "target": ["production", "preview"]}
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} The created environment variables
	 */
	async createVercelProjectEnv(
		idOrName: string,
		envData: string,
		options = "{}"
	) {
		const parsedEnvData = JSON.parse(envData)
		const parsedOptions = JSON.parse(options)
		return await createProjectEnv(
			this.env,
			idOrName,
			parsedEnvData,
			parsedOptions
		)
	}

	/**
	 * Remove an environment variable
	 * @param idOrName {string} The ID or name of the project
	 * @param envId {string} The ID of the environment variable
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} The response from removing the environment variable
	 */
	async removeVercelProjectEnv(
		idOrName: string,
		envId: string,
		options = "{}"
	) {
		const parsedOptions = JSON.parse(options)
		return await removeProjectEnv(this.env, idOrName, envId, parsedOptions)
	}

	/**
	 * Edit an environment variable
	 * @param idOrName {string} The ID or name of the project
	 * @param envId {string} The ID of the environment variable
	 * @param envData {string} JSON string of the environment variable data to update. Format:
	 *   {"key": "MY_KEY", "value": "updated value", "target": ["production", "preview"]}
	 * @param options {string} JSON string of optional parameters:
	 *   - teamId {string} Team ID for team-owned projects
	 *   - slug {string} Team slug for team-owned projects
	 * @return {Promise<any>} The updated environment variable
	 */
	async editVercelProjectEnv(
		idOrName: string,
		envId: string,
		envData: string,
		options = "{}"
	) {
		const parsedEnvData = JSON.parse(envData)
		const parsedOptions = JSON.parse(options)
		return await editProjectEnv(
			this.env,
			idOrName,
			envId,
			parsedEnvData,
			parsedOptions
		)
	}

	/**
	 * @ignore
	 **/
	async fetch(request: Request): Promise<Response> {
		return new ProxyToSelf(this).fetch(request)
	}
}
