import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig
} from 'openapi-client-axios'

/**
 * loopback.Count
 */
export interface LoopbackCount {
  count?: number
}
/**
 * NewSite
 * (tsType: Omit<Site, 'id'>, schemaOptions: { title: 'NewSite', exclude: [ 'id' ] })
 */
export interface NewSite {
  name: string
  domain: string
  maxDepth: string
  updateFrequency: 'Diaria' | 'Semanal' | 'Desactivado'
  lastUpdate?: string // date-time
  extractor?: string
  userId?: string
  icon?: string
}
/**
 * NewSnapshotInSite
 * (tsType: @loopback/repository-json-schema#Optional<Omit<Snapshot, 'id'>, 'siteId'>, schemaOptions: { title: 'NewSnapshotInSite', exclude: [ 'id' ], optional: [ 'siteId' ] })
 */
export interface NewSnapshotInSite {
  date?: string // date-time
  siteId?: string
  pages?: {
    [key: string]: any
  }[]
}
/**
 * Site
 */
export interface Site {
  id?: string
  name: string
  domain: string
  maxDepth: string
  updateFrequency: 'Diaria' | 'Semanal' | 'Desactivado'
  lastUpdate?: string // date-time
  extractor?: string
  userId?: string
  icon?: string
}
/**
 * Site.Filter
 */
export interface SiteFilter {
  offset?: number
  /**
   * example:
   * 100
   */
  limit?: number
  skip?: number
  order?: string | string[]
  /**
   * Site.Fields
   */
  fields?: /* Site.Fields */
  | {
        id?: boolean
        name?: boolean
        domain?: boolean
        maxDepth?: boolean
        updateFrequency?: boolean
        lastUpdate?: boolean
        extractor?: boolean
        userId?: boolean
        icon?: boolean
      }
    | (
        | 'id'
        | 'name'
        | 'domain'
        | 'maxDepth'
        | 'updateFrequency'
        | 'lastUpdate'
        | 'extractor'
        | 'userId'
        | 'icon'
      )[]
  /**
   * Site.IncludeFilter
   */
  include?: /* Site.IncludeFilter.Items */ (SiteIncludeFilterItems | string)[]
}
/**
 * Site.Filter
 */
export interface SiteFilter1 {
  offset?: number
  /**
   * example:
   * 100
   */
  limit?: number
  skip?: number
  order?: string | string[]
  /**
   * Site.WhereFilter
   */
  where?: {
    [name: string]: any
  }
  /**
   * Site.Fields
   */
  fields?: /* Site.Fields */
  | {
        id?: boolean
        name?: boolean
        domain?: boolean
        maxDepth?: boolean
        updateFrequency?: boolean
        lastUpdate?: boolean
        extractor?: boolean
        userId?: boolean
        icon?: boolean
      }
    | (
        | 'id'
        | 'name'
        | 'domain'
        | 'maxDepth'
        | 'updateFrequency'
        | 'lastUpdate'
        | 'extractor'
        | 'userId'
        | 'icon'
      )[]
  /**
   * Site.IncludeFilter
   */
  include?: /* Site.IncludeFilter.Items */ (SiteIncludeFilterItems | string)[]
}
/**
 * Site.IncludeFilter.Items
 */
export interface SiteIncludeFilterItems {
  relation?: 'snapshots'
  scope?: /* Site.ScopeFilter */ SiteScopeFilter
}
/**
 * SitePartial
 * (tsType: Partial<Site>, schemaOptions: { partial: true })
 */
export interface SitePartial {
  id?: string
  name?: string
  domain?: string
  maxDepth?: string
  updateFrequency?: 'Diaria' | 'Semanal' | 'Desactivado'
  lastUpdate?: string // date-time
  extractor?: string
  userId?: string
  icon?: string
}
/**
 * Site.ScopeFilter
 */
export interface SiteScopeFilter {
  offset?: number
  /**
   * example:
   * 100
   */
  limit?: number
  skip?: number
  order?: string | string[]
  where?: {
    [name: string]: any
  }
  fields?:
    | {
        [name: string]: any
      }
    | string[]
  include?: {
    [name: string]: any
  }[]
}
/**
 * SiteWithRelations
 * (tsType: SiteWithRelations, schemaOptions: { includeRelations: true })
 */
export interface SiteWithRelations {
  id?: string
  name: string
  domain: string
  maxDepth: string
  updateFrequency: 'Diaria' | 'Semanal' | 'Desactivado'
  lastUpdate?: string // date-time
  extractor?: string
  userId?: string
  icon?: string
  snapshots?: /**
   * SnapshotWithRelations
   * (tsType: SnapshotWithRelations, schemaOptions: { includeRelations: true })
   */
  SnapshotWithRelations[]
}
/**
 * Snapshot
 */
export interface Snapshot {
  id?: string
  date?: string // date-time
  siteId?: string
  pages?: {
    [key: string]: any
  }[]
}
/**
 * SnapshotPartial
 * (tsType: Partial<Snapshot>, schemaOptions: { partial: true })
 */
export interface SnapshotPartial {
  id?: string
  date?: string // date-time
  siteId?: string
  pages?: {
    [key: string]: any
  }[]
}
/**
 * SnapshotWithRelations
 * (tsType: SnapshotWithRelations, schemaOptions: { includeRelations: true })
 */
export interface SnapshotWithRelations {
  id?: string
  date?: string // date-time
  siteId?: string
  pages?: {
    [key: string]: any
  }[]
}

declare namespace Paths {
  namespace ServiceStatusControllerCheckDomainStatus {
    namespace Parameters {
      export type Url = string
    }
    export interface PathParameters {
      url: Parameters.Url
    }
    namespace Responses {
      export type $200 = boolean
      /**
       * example:
       * http://example.com
       */
      export type $500 = string
    }
  }
  namespace SiteControllerCount {
    namespace Parameters {
      /**
       * Site.WhereFilter
       */
      export interface Where {
        [name: string]: any
      }
    }
    export interface QueryParameters {
      where?: /* Site.WhereFilter */ Parameters.Where
    }
    namespace Responses {
      export type $200 = /* loopback.Count */ Components.Schemas.LoopbackCount
    }
  }
  namespace SiteControllerCreate {
    export type RequestBody =
      /**
       * NewSite
       * (tsType: Omit<Site, 'id'>, schemaOptions: { title: 'NewSite', exclude: [ 'id' ] })
       */
      Components.Schemas.NewSite
    namespace Responses {
      export type $200 = /* Site */ Components.Schemas.Site
    }
  }
  namespace SiteControllerDeleteById {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    namespace Responses {
      /**
       * Site DELETE success
       */
      export type $204 = any
    }
  }
  namespace SiteControllerFind {
    namespace Parameters {
      export type Filter = /* Site.Filter */ Components.Schemas.SiteFilter1
    }
    export interface QueryParameters {
      filter?: Parameters.Filter
    }
    namespace Responses {
      export type $200 =
        /**
         * SiteWithRelations
         * (tsType: SiteWithRelations, schemaOptions: { includeRelations: true })
         */
        Components.Schemas.SiteWithRelations[]
    }
  }
  namespace SiteControllerFindById {
    namespace Parameters {
      export type Filter = /* Site.Filter */ Components.Schemas.SiteFilter
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export interface QueryParameters {
      filter?: Parameters.Filter
    }
    namespace Responses {
      export type $200 =
        /**
         * SiteWithRelations
         * (tsType: SiteWithRelations, schemaOptions: { includeRelations: true })
         */
        Components.Schemas.SiteWithRelations
    }
  }
  namespace SiteControllerReplaceById {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody = /* Site */ Components.Schemas.Site
    namespace Responses {
      /**
       * Site PUT success
       */
      export type $204 = any
    }
  }
  namespace SiteControllerUpdateAll {
    namespace Parameters {
      /**
       * Site.WhereFilter
       */
      export interface Where {
        [name: string]: any
      }
    }
    export interface QueryParameters {
      where?: /* Site.WhereFilter */ Parameters.Where
    }
    export type RequestBody =
      /**
       * SitePartial
       * (tsType: Partial<Site>, schemaOptions: { partial: true })
       */
      Components.Schemas.SitePartial
    namespace Responses {
      export type $200 = /* loopback.Count */ Components.Schemas.LoopbackCount
    }
  }
  namespace SiteControllerUpdateById {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody =
      /**
       * SitePartial
       * (tsType: Partial<Site>, schemaOptions: { partial: true })
       */
      Components.Schemas.SitePartial
    namespace Responses {
      /**
       * Site PATCH success
       */
      export type $204 = any
    }
  }
  namespace SiteSnapshotControllerCreate {
    namespace Parameters {
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export type RequestBody =
      /**
       * NewSnapshotInSite
       * (tsType: @loopback/repository-json-schema#Optional<Omit<Snapshot, 'id'>, 'siteId'>, schemaOptions: { title: 'NewSnapshotInSite', exclude: [ 'id' ], optional: [ 'siteId' ] })
       */
      Components.Schemas.NewSnapshotInSite
    namespace Responses {
      export type $200 = /* Snapshot */ Components.Schemas.Snapshot
    }
  }
  namespace SiteSnapshotControllerDelete {
    namespace Parameters {
      export type Id = string
      /**
       * Snapshot.WhereFilter
       */
      export interface Where {
        [name: string]: any
      }
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export interface QueryParameters {
      where?: /* Snapshot.WhereFilter */ Parameters.Where
    }
    namespace Responses {
      export type $200 = /* loopback.Count */ Components.Schemas.LoopbackCount
    }
  }
  namespace SiteSnapshotControllerFind {
    namespace Parameters {
      export interface Filter {
        [name: string]: any
      }
      export type Id = string
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export interface QueryParameters {
      filter?: Parameters.Filter
    }
    namespace Responses {
      export type $200 = /* Snapshot */ Components.Schemas.Snapshot[]
    }
  }
  namespace SiteSnapshotControllerPatch {
    namespace Parameters {
      export type Id = string
      /**
       * Snapshot.WhereFilter
       */
      export interface Where {
        [name: string]: any
      }
    }
    export interface PathParameters {
      id: Parameters.Id
    }
    export interface QueryParameters {
      where?: /* Snapshot.WhereFilter */ Parameters.Where
    }
    export type RequestBody =
      /**
       * SnapshotPartial
       * (tsType: Partial<Snapshot>, schemaOptions: { partial: true })
       */
      Components.Schemas.SnapshotPartial
    namespace Responses {
      export type $200 = /* loopback.Count */ Components.Schemas.LoopbackCount
    }
  }
}

export interface OperationMethods {
  /**
   * ServiceStatusController.checkDomainStatus
   */
  'ServiceStatusController.checkDomainStatus'(
    parameters?: Parameters<Paths.ServiceStatusControllerCheckDomainStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.ServiceStatusControllerCheckDomainStatus.Responses.$200>
  /**
   * SiteController.count
   */
  'SiteController.count'(
    parameters?: Parameters<Paths.SiteControllerCount.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteControllerCount.Responses.$200>
  /**
   * SiteSnapshotController.find
   */
  'SiteSnapshotController.find'(
    parameters?: Parameters<
      Paths.SiteSnapshotControllerFind.PathParameters &
        Paths.SiteSnapshotControllerFind.QueryParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteSnapshotControllerFind.Responses.$200>
  /**
   * SiteSnapshotController.create
   */
  'SiteSnapshotController.create'(
    parameters?: Parameters<Paths.SiteSnapshotControllerCreate.PathParameters> | null,
    data?: Paths.SiteSnapshotControllerCreate.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteSnapshotControllerCreate.Responses.$200>
  /**
   * SiteSnapshotController.patch
   */
  'SiteSnapshotController.patch'(
    parameters?: Parameters<
      Paths.SiteSnapshotControllerPatch.PathParameters &
        Paths.SiteSnapshotControllerPatch.QueryParameters
    > | null,
    data?: Paths.SiteSnapshotControllerPatch.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteSnapshotControllerPatch.Responses.$200>
  /**
   * SiteSnapshotController.delete
   */
  'SiteSnapshotController.delete'(
    parameters?: Parameters<
      Paths.SiteSnapshotControllerDelete.PathParameters &
        Paths.SiteSnapshotControllerDelete.QueryParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteSnapshotControllerDelete.Responses.$200>
  /**
   * SiteController.findById
   */
  'SiteController.findById'(
    parameters?: Parameters<
      Paths.SiteControllerFindById.PathParameters & Paths.SiteControllerFindById.QueryParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteControllerFindById.Responses.$200>
  /**
   * SiteController.replaceById
   */
  'SiteController.replaceById'(
    parameters?: Parameters<Paths.SiteControllerReplaceById.PathParameters> | null,
    data?: Paths.SiteControllerReplaceById.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteControllerReplaceById.Responses.$204>
  /**
   * SiteController.updateById
   */
  'SiteController.updateById'(
    parameters?: Parameters<Paths.SiteControllerUpdateById.PathParameters> | null,
    data?: Paths.SiteControllerUpdateById.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteControllerUpdateById.Responses.$204>
  /**
   * SiteController.deleteById
   */
  'SiteController.deleteById'(
    parameters?: Parameters<Paths.SiteControllerDeleteById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteControllerDeleteById.Responses.$204>
  /**
   * SiteController.find
   */
  'SiteController.find'(
    parameters?: Parameters<Paths.SiteControllerFind.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteControllerFind.Responses.$200>
  /**
   * SiteController.create
   */
  'SiteController.create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SiteControllerCreate.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteControllerCreate.Responses.$200>
  /**
   * SiteController.updateAll
   */
  'SiteController.updateAll'(
    parameters?: Parameters<Paths.SiteControllerUpdateAll.QueryParameters> | null,
    data?: Paths.SiteControllerUpdateAll.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.SiteControllerUpdateAll.Responses.$200>
}

export interface PathsDictionary {
  ['/ping/{url}']: {
    /**
     * ServiceStatusController.checkDomainStatus
     */
    'get'(
      parameters?: Parameters<Paths.ServiceStatusControllerCheckDomainStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.ServiceStatusControllerCheckDomainStatus.Responses.$200>
  }
  ['/sites/count']: {
    /**
     * SiteController.count
     */
    'get'(
      parameters?: Parameters<Paths.SiteControllerCount.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteControllerCount.Responses.$200>
  }
  ['/sites/{id}/snapshots']: {
    /**
     * SiteSnapshotController.create
     */
    'post'(
      parameters?: Parameters<Paths.SiteSnapshotControllerCreate.PathParameters> | null,
      data?: Paths.SiteSnapshotControllerCreate.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteSnapshotControllerCreate.Responses.$200>
    /**
     * SiteSnapshotController.patch
     */
    'patch'(
      parameters?: Parameters<
        Paths.SiteSnapshotControllerPatch.PathParameters &
          Paths.SiteSnapshotControllerPatch.QueryParameters
      > | null,
      data?: Paths.SiteSnapshotControllerPatch.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteSnapshotControllerPatch.Responses.$200>
    /**
     * SiteSnapshotController.find
     */
    'get'(
      parameters?: Parameters<
        Paths.SiteSnapshotControllerFind.PathParameters &
          Paths.SiteSnapshotControllerFind.QueryParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteSnapshotControllerFind.Responses.$200>
    /**
     * SiteSnapshotController.delete
     */
    'delete'(
      parameters?: Parameters<
        Paths.SiteSnapshotControllerDelete.PathParameters &
          Paths.SiteSnapshotControllerDelete.QueryParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteSnapshotControllerDelete.Responses.$200>
  }
  ['/sites/{id}']: {
    /**
     * SiteController.replaceById
     */
    'put'(
      parameters?: Parameters<Paths.SiteControllerReplaceById.PathParameters> | null,
      data?: Paths.SiteControllerReplaceById.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteControllerReplaceById.Responses.$204>
    /**
     * SiteController.updateById
     */
    'patch'(
      parameters?: Parameters<Paths.SiteControllerUpdateById.PathParameters> | null,
      data?: Paths.SiteControllerUpdateById.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteControllerUpdateById.Responses.$204>
    /**
     * SiteController.findById
     */
    'get'(
      parameters?: Parameters<
        Paths.SiteControllerFindById.PathParameters & Paths.SiteControllerFindById.QueryParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteControllerFindById.Responses.$200>
    /**
     * SiteController.deleteById
     */
    'delete'(
      parameters?: Parameters<Paths.SiteControllerDeleteById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteControllerDeleteById.Responses.$204>
  }
  ['/sites']: {
    /**
     * SiteController.create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SiteControllerCreate.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteControllerCreate.Responses.$200>
    /**
     * SiteController.updateAll
     */
    'patch'(
      parameters?: Parameters<Paths.SiteControllerUpdateAll.QueryParameters> | null,
      data?: Paths.SiteControllerUpdateAll.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteControllerUpdateAll.Responses.$200>
    /**
     * SiteController.find
     */
    'get'(
      parameters?: Parameters<Paths.SiteControllerFind.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.SiteControllerFind.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
