export class CreateModelDto {
  entityName: string;
  attributes: ModelAttribute[];
}

interface AttributeType {
  typeName: string;
  importable: boolean;
}

export interface ModelAttribute {
  required: boolean;
  name: string;
  type: string | AttributeType;
}

export interface ImportableModelAttribute {
  required: boolean;
  name: string;
  type: AttributeType;
}
