import { IClass } from './interfaces';

export default class ClassesManager {
  private static _instance: ClassesManager | null;

  public readonly classes: Map<string, IClass>;

  private constructor(classes: IClass[]) {
    this.classes = new Map<string, IClass>(
      classes.map((class_) => [class_.name, class_]),
    );
  }

  public static instance(classes?: IClass[]): ClassesManager {
    if (!ClassesManager._instance) {
      return ClassesManager.reset(classes);
    }

    return ClassesManager._instance;
  }

  public static reset(classes?: IClass[]): ClassesManager {
    ClassesManager._instance = new ClassesManager(classes ?? []);

    return ClassesManager._instance;
  }
}
