import vscode from 'vscode'

declare global {
  /**
   * BaseTreeItem 参数
   */
  interface BaseTreeItemOptions {
    /** 标题 */
    title: string
    /** 附表图 */
    subTitle: string
    /** 可折叠状态 0:不可折叠 1:折叠 2:展开 */
    collapsible?: 0 | 1 | 2
    /** 类型:图标 */
    type: string
    /** 索引 */
    index?: number
    /** 选中事件 */
    command?: vscode.Command
  }

  interface SwaggerJson {
    swagger: string
    host: string
    basePath: string
    info: {
      description: string
      version: string
      title: string
      contact: any
    }
    tags?: SwaggerJsonTagsItem[]
    paths: {
      [key: string]: {
        [key: string]: {
          tags?: string[]
          summary: string
          operationId: string
          description: string
          consumes: string[]
          produces: string[]
          parameters?: {
            name: string
            in: string
            description: string
            required: boolean
            type?: string
            schema?: SwaggerJsonSchema
          }[]
          responses: {
            [key: string]: {
              description: string
              schema?: SwaggerJsonSchema
            }
          }
          deprecated: boolean
        }
      }
    }
    definitions: SwaggerJsonDefinitions
  }

  interface SwaggerJsonDefinitions {
    [key: string]: SwaggerJsonDefinitionsItem
  }

  interface SwaggerJsonDefinitionsItem {
    type: string
    required?: string[]
    properties: {
      [key: string]: {
        type?: string
        description?: string
        originalRef?: string
        items?: SwaggerJsonSchema
      }
    }
    title: string
  }

  interface SwaggerJsonTagsItem {
    name: string
    description: string
  }

  interface SwaggerJsonSchema {
    originalRef: string
    $ref: string
  }

  interface SwaggerJsonTreeItem {
    type: string
    title: string
    subTitle: string
    method?: string

    children?: SwaggerJsonTreeItem[]
  }

  interface TreeInterfaceParamsItem {
    name: string
    in?: string
    description: string
    required: boolean
    type: string
  }

  interface TreeInterfaceResponseItem {
    description: string
    required: boolean
    type: string
  }

  interface TreeInterface {
    type: string
    method: 'get' | 'post'
    params: TreeInterfaceParamsItem[]
    response: { [key: string]: TreeInterfaceResponseItem }
    title: string
    path: string
    subTitle: string
    operationId: string
    produces: string[]
    deprecated: boolean
  }
}
