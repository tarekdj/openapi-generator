import * as querystring from "querystring";
import * as url from "url";

import * as isomorphicFetch from "isomorphic-fetch";

interface Dictionary<T> { [index: string]: T; }
export interface FetchAPI { (url: string, init?: any): Promise<any>; }

const BASE_PATH = "http://petstore.swagger.io/v2";

export interface FetchArgs {
    url: string;
    options: any; 
}

export class BaseAPI {
    basePath: string;
    fetch: FetchAPI;

    constructor(fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) {
        this.basePath = basePath;
        this.fetch = fetch;
    }
}

export interface Category {
    "id"?: number;
    "name"?: string;
}

export interface Order {
    "id"?: number;
    "petId"?: number;
    "quantity"?: number;
    "shipDate"?: Date;
    /**
     * Order Status
     */
    "status"?: OrderStatusEnum;
    "complete"?: boolean;
}

export type OrderStatusEnum = "placed" | "approved" | "delivered";
export interface Pet {
    "id"?: number;
    "category"?: Category;
    "name": string;
    "photoUrls": Array<string>;
    "tags"?: Array<Tag>;
    /**
     * pet status in the store
     */
    "status"?: PetStatusEnum;
}

export type PetStatusEnum = "available" | "pending" | "sold";
export interface Tag {
    "id"?: number;
    "name"?: string;
}

export interface User {
    "id"?: number;
    "username"?: string;
    "firstName"?: string;
    "lastName"?: string;
    "email"?: string;
    "password"?: string;
    "phone"?: string;
    /**
     * User Status
     */
    "userStatus"?: number;
}



/**
 * PetApi - fetch parameter creator
 */
export const PetApiFetchParamCreactor = {
    /** 
     * Add a new pet to the store
     * 
     * @param body Pet object that needs to be added to the store
     */
    addPet(params: {  body?: Pet; }): FetchArgs {
        const baseUrl = `/pet`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "POST" };

        let contentTypeHeader: Dictionary<string>;
        contentTypeHeader = { "Content-Type": "application/json" };
        if (params["body"]) {
            fetchOptions.body = JSON.stringify(params["body"] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Deletes a pet
     * 
     * @param petId Pet id to delete
     * @param apiKey 
     */
    deletePet(params: {  petId: number; apiKey?: string; }): FetchArgs {
        // verify required parameter "petId" is set
        if (params["petId"] == null) {
            throw new Error("Missing required parameter petId when calling deletePet");
        }
        const baseUrl = `/pet/{petId}`
            .replace(`{${"petId"}}`, `${ params.petId }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "DELETE" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Finds Pets by status
     * Multiple status values can be provided with comma seperated strings
     * @param status Status values that need to be considered for filter
     */
    findPetsByStatus(params: {  status?: Array<string>; }): FetchArgs {
        const baseUrl = `/pet/findByStatus`;
        let urlObj = url.parse(baseUrl, true);
        urlObj.query = Object.assign({}, urlObj.query, { 
            "status": params.status,
        });
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Finds Pets by tags
     * Muliple tags can be provided with comma seperated strings. Use tag1, tag2, tag3 for testing.
     * @param tags Tags to filter by
     */
    findPetsByTags(params: {  tags?: Array<string>; }): FetchArgs {
        const baseUrl = `/pet/findByTags`;
        let urlObj = url.parse(baseUrl, true);
        urlObj.query = Object.assign({}, urlObj.query, { 
            "tags": params.tags,
        });
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Find pet by ID
     * Returns a pet when ID &lt; 10.  ID &gt; 10 or nonintegers will simulate API error conditions
     * @param petId ID of pet that needs to be fetched
     */
    getPetById(params: {  petId: number; }): FetchArgs {
        // verify required parameter "petId" is set
        if (params["petId"] == null) {
            throw new Error("Missing required parameter petId when calling getPetById");
        }
        const baseUrl = `/pet/{petId}`
            .replace(`{${"petId"}}`, `${ params.petId }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Update an existing pet
     * 
     * @param body Pet object that needs to be added to the store
     */
    updatePet(params: {  body?: Pet; }): FetchArgs {
        const baseUrl = `/pet`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "PUT" };

        let contentTypeHeader: Dictionary<string>;
        contentTypeHeader = { "Content-Type": "application/json" };
        if (params["body"]) {
            fetchOptions.body = JSON.stringify(params["body"] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Updates a pet in the store with form data
     * 
     * @param petId ID of pet that needs to be updated
     * @param name Updated name of the pet
     * @param status Updated status of the pet
     */
    updatePetWithForm(params: {  petId: string; name?: string; status?: string; }): FetchArgs {
        // verify required parameter "petId" is set
        if (params["petId"] == null) {
            throw new Error("Missing required parameter petId when calling updatePetWithForm");
        }
        const baseUrl = `/pet/{petId}`
            .replace(`{${"petId"}}`, `${ params.petId }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "POST" };

        let contentTypeHeader: Dictionary<string>;
        contentTypeHeader = { "Content-Type": "application/x-www-form-urlencoded" };
        fetchOptions.body = querystring.stringify({ 
            "name": params.name,
            "status": params.status,
        });
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * uploads an image
     * 
     * @param petId ID of pet to update
     * @param additionalMetadata Additional data to pass to server
     * @param file file to upload
     */
    uploadFile(params: {  petId: number; additionalMetadata?: string; file?: any; }): FetchArgs {
        // verify required parameter "petId" is set
        if (params["petId"] == null) {
            throw new Error("Missing required parameter petId when calling uploadFile");
        }
        const baseUrl = `/pet/{petId}/uploadImage`
            .replace(`{${"petId"}}`, `${ params.petId }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "POST" };

        let contentTypeHeader: Dictionary<string>;
        contentTypeHeader = { "Content-Type": "application/x-www-form-urlencoded" };
        fetchOptions.body = querystring.stringify({ 
            "additionalMetadata": params.additionalMetadata,
            "file": params.file,
        });
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
}

/**
 * PetApi - functional programming interface
 */
export const PetApiFp = {
    /** 
     * Add a new pet to the store
     * 
     * @param body Pet object that needs to be added to the store
     */
    addPet(params: { body?: Pet;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = PetApiFetchParamCreactor.addPet(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Deletes a pet
     * 
     * @param petId Pet id to delete
     * @param apiKey 
     */
    deletePet(params: { petId: number; apiKey?: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = PetApiFetchParamCreactor.deletePet(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Finds Pets by status
     * Multiple status values can be provided with comma seperated strings
     * @param status Status values that need to be considered for filter
     */
    findPetsByStatus(params: { status?: Array<string>;  }): (fetch: FetchAPI, basePath?: string) => Promise<Array<Pet>> {
        const fetchArgs = PetApiFetchParamCreactor.findPetsByStatus(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Finds Pets by tags
     * Muliple tags can be provided with comma seperated strings. Use tag1, tag2, tag3 for testing.
     * @param tags Tags to filter by
     */
    findPetsByTags(params: { tags?: Array<string>;  }): (fetch: FetchAPI, basePath?: string) => Promise<Array<Pet>> {
        const fetchArgs = PetApiFetchParamCreactor.findPetsByTags(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Find pet by ID
     * Returns a pet when ID &lt; 10.  ID &gt; 10 or nonintegers will simulate API error conditions
     * @param petId ID of pet that needs to be fetched
     */
    getPetById(params: { petId: number;  }): (fetch: FetchAPI, basePath?: string) => Promise<Pet> {
        const fetchArgs = PetApiFetchParamCreactor.getPetById(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Update an existing pet
     * 
     * @param body Pet object that needs to be added to the store
     */
    updatePet(params: { body?: Pet;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = PetApiFetchParamCreactor.updatePet(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Updates a pet in the store with form data
     * 
     * @param petId ID of pet that needs to be updated
     * @param name Updated name of the pet
     * @param status Updated status of the pet
     */
    updatePetWithForm(params: { petId: string; name?: string; status?: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = PetApiFetchParamCreactor.updatePetWithForm(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * uploads an image
     * 
     * @param petId ID of pet to update
     * @param additionalMetadata Additional data to pass to server
     * @param file file to upload
     */
    uploadFile(params: { petId: number; additionalMetadata?: string; file?: any;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = PetApiFetchParamCreactor.uploadFile(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
};

/**
 * PetApi - object-oriented interface
 */
export class PetApi extends BaseAPI {
    /** 
     * Add a new pet to the store
     * 
     * @param body Pet object that needs to be added to the store
     */
    addPet(params: {  body?: Pet; }) {
        return PetApiFp.addPet(params)(this.fetch, this.basePath);
    }
    /** 
     * Deletes a pet
     * 
     * @param petId Pet id to delete
     * @param apiKey 
     */
    deletePet(params: {  petId: number; apiKey?: string; }) {
        return PetApiFp.deletePet(params)(this.fetch, this.basePath);
    }
    /** 
     * Finds Pets by status
     * Multiple status values can be provided with comma seperated strings
     * @param status Status values that need to be considered for filter
     */
    findPetsByStatus(params: {  status?: Array<string>; }) {
        return PetApiFp.findPetsByStatus(params)(this.fetch, this.basePath);
    }
    /** 
     * Finds Pets by tags
     * Muliple tags can be provided with comma seperated strings. Use tag1, tag2, tag3 for testing.
     * @param tags Tags to filter by
     */
    findPetsByTags(params: {  tags?: Array<string>; }) {
        return PetApiFp.findPetsByTags(params)(this.fetch, this.basePath);
    }
    /** 
     * Find pet by ID
     * Returns a pet when ID &lt; 10.  ID &gt; 10 or nonintegers will simulate API error conditions
     * @param petId ID of pet that needs to be fetched
     */
    getPetById(params: {  petId: number; }) {
        return PetApiFp.getPetById(params)(this.fetch, this.basePath);
    }
    /** 
     * Update an existing pet
     * 
     * @param body Pet object that needs to be added to the store
     */
    updatePet(params: {  body?: Pet; }) {
        return PetApiFp.updatePet(params)(this.fetch, this.basePath);
    }
    /** 
     * Updates a pet in the store with form data
     * 
     * @param petId ID of pet that needs to be updated
     * @param name Updated name of the pet
     * @param status Updated status of the pet
     */
    updatePetWithForm(params: {  petId: string; name?: string; status?: string; }) {
        return PetApiFp.updatePetWithForm(params)(this.fetch, this.basePath);
    }
    /** 
     * uploads an image
     * 
     * @param petId ID of pet to update
     * @param additionalMetadata Additional data to pass to server
     * @param file file to upload
     */
    uploadFile(params: {  petId: number; additionalMetadata?: string; file?: any; }) {
        return PetApiFp.uploadFile(params)(this.fetch, this.basePath);
    }
}


/**
 * StoreApi - fetch parameter creator
 */
export const StoreApiFetchParamCreactor = {
    /** 
     * Delete purchase order by ID
     * For valid response try integer IDs with value &lt; 1000. Anything above 1000 or nonintegers will generate API errors
     * @param orderId ID of the order that needs to be deleted
     */
    deleteOrder(params: {  orderId: string; }): FetchArgs {
        // verify required parameter "orderId" is set
        if (params["orderId"] == null) {
            throw new Error("Missing required parameter orderId when calling deleteOrder");
        }
        const baseUrl = `/store/order/{orderId}`
            .replace(`{${"orderId"}}`, `${ params.orderId }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "DELETE" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Returns pet inventories by status
     * Returns a map of status codes to quantities
     */
    getInventory(): FetchArgs {
        const baseUrl = `/store/inventory`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Find purchase order by ID
     * For valid response try integer IDs with value &lt;&#x3D; 5 or &gt; 10. Other values will generated exceptions
     * @param orderId ID of pet that needs to be fetched
     */
    getOrderById(params: {  orderId: string; }): FetchArgs {
        // verify required parameter "orderId" is set
        if (params["orderId"] == null) {
            throw new Error("Missing required parameter orderId when calling getOrderById");
        }
        const baseUrl = `/store/order/{orderId}`
            .replace(`{${"orderId"}}`, `${ params.orderId }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Place an order for a pet
     * 
     * @param body order placed for purchasing the pet
     */
    placeOrder(params: {  body?: Order; }): FetchArgs {
        const baseUrl = `/store/order`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "POST" };

        let contentTypeHeader: Dictionary<string>;
        contentTypeHeader = { "Content-Type": "application/json" };
        if (params["body"]) {
            fetchOptions.body = JSON.stringify(params["body"] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
}

/**
 * StoreApi - functional programming interface
 */
export const StoreApiFp = {
    /** 
     * Delete purchase order by ID
     * For valid response try integer IDs with value &lt; 1000. Anything above 1000 or nonintegers will generate API errors
     * @param orderId ID of the order that needs to be deleted
     */
    deleteOrder(params: { orderId: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = StoreApiFetchParamCreactor.deleteOrder(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Returns pet inventories by status
     * Returns a map of status codes to quantities
     */
    getInventory(): (fetch: FetchAPI, basePath?: string) => Promise<{ [key: string]: number; }> {
        const fetchArgs = StoreApiFetchParamCreactor.getInventory();
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Find purchase order by ID
     * For valid response try integer IDs with value &lt;&#x3D; 5 or &gt; 10. Other values will generated exceptions
     * @param orderId ID of pet that needs to be fetched
     */
    getOrderById(params: { orderId: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<Order> {
        const fetchArgs = StoreApiFetchParamCreactor.getOrderById(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Place an order for a pet
     * 
     * @param body order placed for purchasing the pet
     */
    placeOrder(params: { body?: Order;  }): (fetch: FetchAPI, basePath?: string) => Promise<Order> {
        const fetchArgs = StoreApiFetchParamCreactor.placeOrder(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
};

/**
 * StoreApi - object-oriented interface
 */
export class StoreApi extends BaseAPI {
    /** 
     * Delete purchase order by ID
     * For valid response try integer IDs with value &lt; 1000. Anything above 1000 or nonintegers will generate API errors
     * @param orderId ID of the order that needs to be deleted
     */
    deleteOrder(params: {  orderId: string; }) {
        return StoreApiFp.deleteOrder(params)(this.fetch, this.basePath);
    }
    /** 
     * Returns pet inventories by status
     * Returns a map of status codes to quantities
     */
    getInventory() {
        return StoreApiFp.getInventory()(this.fetch, this.basePath);
    }
    /** 
     * Find purchase order by ID
     * For valid response try integer IDs with value &lt;&#x3D; 5 or &gt; 10. Other values will generated exceptions
     * @param orderId ID of pet that needs to be fetched
     */
    getOrderById(params: {  orderId: string; }) {
        return StoreApiFp.getOrderById(params)(this.fetch, this.basePath);
    }
    /** 
     * Place an order for a pet
     * 
     * @param body order placed for purchasing the pet
     */
    placeOrder(params: {  body?: Order; }) {
        return StoreApiFp.placeOrder(params)(this.fetch, this.basePath);
    }
}


/**
 * UserApi - fetch parameter creator
 */
export const UserApiFetchParamCreactor = {
    /** 
     * Create user
     * This can only be done by the logged in user.
     * @param body Created user object
     */
    createUser(params: {  body?: User; }): FetchArgs {
        const baseUrl = `/user`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "POST" };

        let contentTypeHeader: Dictionary<string>;
        contentTypeHeader = { "Content-Type": "application/json" };
        if (params["body"]) {
            fetchOptions.body = JSON.stringify(params["body"] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Creates list of users with given input array
     * 
     * @param body List of user object
     */
    createUsersWithArrayInput(params: {  body?: Array<User>; }): FetchArgs {
        const baseUrl = `/user/createWithArray`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "POST" };

        let contentTypeHeader: Dictionary<string>;
        contentTypeHeader = { "Content-Type": "application/json" };
        if (params["body"]) {
            fetchOptions.body = JSON.stringify(params["body"] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Creates list of users with given input array
     * 
     * @param body List of user object
     */
    createUsersWithListInput(params: {  body?: Array<User>; }): FetchArgs {
        const baseUrl = `/user/createWithList`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "POST" };

        let contentTypeHeader: Dictionary<string>;
        contentTypeHeader = { "Content-Type": "application/json" };
        if (params["body"]) {
            fetchOptions.body = JSON.stringify(params["body"] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Delete user
     * This can only be done by the logged in user.
     * @param username The name that needs to be deleted
     */
    deleteUser(params: {  username: string; }): FetchArgs {
        // verify required parameter "username" is set
        if (params["username"] == null) {
            throw new Error("Missing required parameter username when calling deleteUser");
        }
        const baseUrl = `/user/{username}`
            .replace(`{${"username"}}`, `${ params.username }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "DELETE" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Get user by user name
     * 
     * @param username The name that needs to be fetched. Use user1 for testing. 
     */
    getUserByName(params: {  username: string; }): FetchArgs {
        // verify required parameter "username" is set
        if (params["username"] == null) {
            throw new Error("Missing required parameter username when calling getUserByName");
        }
        const baseUrl = `/user/{username}`
            .replace(`{${"username"}}`, `${ params.username }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Logs user into the system
     * 
     * @param username The user name for login
     * @param password The password for login in clear text
     */
    loginUser(params: {  username?: string; password?: string; }): FetchArgs {
        const baseUrl = `/user/login`;
        let urlObj = url.parse(baseUrl, true);
        urlObj.query = Object.assign({}, urlObj.query, { 
            "username": params.username,
            "password": params.password,
        });
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Logs out current logged in user session
     * 
     */
    logoutUser(): FetchArgs {
        const baseUrl = `/user/logout`;
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "GET" };

        let contentTypeHeader: Dictionary<string>;
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
    /** 
     * Updated user
     * This can only be done by the logged in user.
     * @param username name that need to be deleted
     * @param body Updated user object
     */
    updateUser(params: {  username: string; body?: User; }): FetchArgs {
        // verify required parameter "username" is set
        if (params["username"] == null) {
            throw new Error("Missing required parameter username when calling updateUser");
        }
        const baseUrl = `/user/{username}`
            .replace(`{${"username"}}`, `${ params.username }`);
        let urlObj = url.parse(baseUrl, true);
        let fetchOptions: RequestInit = { method: "PUT" };

        let contentTypeHeader: Dictionary<string>;
        contentTypeHeader = { "Content-Type": "application/json" };
        if (params["body"]) {
            fetchOptions.body = JSON.stringify(params["body"] || {});
        }
        if (contentTypeHeader) {
            fetchOptions.headers = contentTypeHeader;
        }
        return {
            url: url.format(urlObj),
            options: fetchOptions,
        };
    },
}

/**
 * UserApi - functional programming interface
 */
export const UserApiFp = {
    /** 
     * Create user
     * This can only be done by the logged in user.
     * @param body Created user object
     */
    createUser(params: { body?: User;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = UserApiFetchParamCreactor.createUser(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Creates list of users with given input array
     * 
     * @param body List of user object
     */
    createUsersWithArrayInput(params: { body?: Array<User>;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = UserApiFetchParamCreactor.createUsersWithArrayInput(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Creates list of users with given input array
     * 
     * @param body List of user object
     */
    createUsersWithListInput(params: { body?: Array<User>;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = UserApiFetchParamCreactor.createUsersWithListInput(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Delete user
     * This can only be done by the logged in user.
     * @param username The name that needs to be deleted
     */
    deleteUser(params: { username: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = UserApiFetchParamCreactor.deleteUser(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Get user by user name
     * 
     * @param username The name that needs to be fetched. Use user1 for testing. 
     */
    getUserByName(params: { username: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<User> {
        const fetchArgs = UserApiFetchParamCreactor.getUserByName(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Logs user into the system
     * 
     * @param username The user name for login
     * @param password The password for login in clear text
     */
    loginUser(params: { username?: string; password?: string;  }): (fetch: FetchAPI, basePath?: string) => Promise<string> {
        const fetchArgs = UserApiFetchParamCreactor.loginUser(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Logs out current logged in user session
     * 
     */
    logoutUser(): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = UserApiFetchParamCreactor.logoutUser();
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
    /** 
     * Updated user
     * This can only be done by the logged in user.
     * @param username name that need to be deleted
     * @param body Updated user object
     */
    updateUser(params: { username: string; body?: User;  }): (fetch: FetchAPI, basePath?: string) => Promise<any> {
        const fetchArgs = UserApiFetchParamCreactor.updateUser(params);
        return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
            return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    throw response;
                }
            });
        };
    },
};

/**
 * UserApi - object-oriented interface
 */
export class UserApi extends BaseAPI {
    /** 
     * Create user
     * This can only be done by the logged in user.
     * @param body Created user object
     */
    createUser(params: {  body?: User; }) {
        return UserApiFp.createUser(params)(this.fetch, this.basePath);
    }
    /** 
     * Creates list of users with given input array
     * 
     * @param body List of user object
     */
    createUsersWithArrayInput(params: {  body?: Array<User>; }) {
        return UserApiFp.createUsersWithArrayInput(params)(this.fetch, this.basePath);
    }
    /** 
     * Creates list of users with given input array
     * 
     * @param body List of user object
     */
    createUsersWithListInput(params: {  body?: Array<User>; }) {
        return UserApiFp.createUsersWithListInput(params)(this.fetch, this.basePath);
    }
    /** 
     * Delete user
     * This can only be done by the logged in user.
     * @param username The name that needs to be deleted
     */
    deleteUser(params: {  username: string; }) {
        return UserApiFp.deleteUser(params)(this.fetch, this.basePath);
    }
    /** 
     * Get user by user name
     * 
     * @param username The name that needs to be fetched. Use user1 for testing. 
     */
    getUserByName(params: {  username: string; }) {
        return UserApiFp.getUserByName(params)(this.fetch, this.basePath);
    }
    /** 
     * Logs user into the system
     * 
     * @param username The user name for login
     * @param password The password for login in clear text
     */
    loginUser(params: {  username?: string; password?: string; }) {
        return UserApiFp.loginUser(params)(this.fetch, this.basePath);
    }
    /** 
     * Logs out current logged in user session
     * 
     */
    logoutUser() {
        return UserApiFp.logoutUser()(this.fetch, this.basePath);
    }
    /** 
     * Updated user
     * This can only be done by the logged in user.
     * @param username name that need to be deleted
     * @param body Updated user object
     */
    updateUser(params: {  username: string; body?: User; }) {
        return UserApiFp.updateUser(params)(this.fetch, this.basePath);
    }
}

