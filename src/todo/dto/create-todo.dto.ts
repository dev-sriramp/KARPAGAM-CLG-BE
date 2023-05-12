import { GetDto, ListDto } from 'src/helpers/objectParser';

export class CreateTodoDto {
  
  public title: string;

 
  public content: string;

  
  public user_id: string;

 
}

export class TodoListDto extends ListDto {}
export class TodoGet extends GetDto {}
